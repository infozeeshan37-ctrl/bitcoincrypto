import { NextRequest, NextResponse } from 'next/server';
import { buildAgentSystemPrompt, simulateHumanAgentReply, DEFAULT_MODELS } from '@/lib/chat/groqClient';
import { AGENT_PERSONAS } from '@/lib/chat/agentsData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, agentId } = body;

    const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    const agent = AGENT_PERSONAS.find((a) => a.id === agentId) || AGENT_PERSONAS[0];

    // If no API key configured on server, return simulated desk reply
    if (!apiKey || apiKey.trim() === '') {
      const lastUserMsg = messages?.[messages.length - 1]?.text || '';
      const reply = simulateHumanAgentReply(lastUserMsg, agent, messages || []);
      return NextResponse.json({
        reply,
        mode: 'simulated',
        agent: agent.name,
      });
    }

    const systemPrompt = buildAgentSystemPrompt(agent);
    const formattedMessages = (messages || [])
      .filter((m: { sender: string }) => m.sender === 'user' || m.sender === 'agent')
      .slice(-12)
      .map((m: { sender: string; text: string }) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

    // Try candidate models in order of capability & availability
    let lastError = null;
    for (const model of DEFAULT_MODELS) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey.trim()}`,
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: systemPrompt },
              ...formattedMessages,
            ],
            temperature: 0.7,
            max_tokens: 650,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.choices?.[0]?.message?.content;
          if (replyText && replyText.trim().length > 0) {
            return NextResponse.json({
              reply: replyText.trim(),
              mode: 'live_groq',
              model: model,
              agent: agent.name,
            });
          }
        } else {
          const err = await response.json().catch(() => ({}));
          lastError = err?.error?.message || `Status ${response.status}`;
          console.warn(`Groq model ${model} failed (${lastError}), attempting next model...`);
        }
      } catch (fetchErr) {
        lastError = fetchErr;
        console.warn(`Groq fetch error with model ${model}:`, fetchErr);
      }
    }

    // If all models failed, fall back to dynamic desk engine
    console.error('All Groq models failed. Last error:', lastError);
    const lastUserMsg = messages?.[messages.length - 1]?.text || '';
    const fallbackReply = simulateHumanAgentReply(lastUserMsg, agent, messages || []);
    return NextResponse.json({
      reply: fallbackReply,
      mode: 'simulated_fallback',
      error: lastError,
    });
  } catch (error) {
    console.error('Chat API Route exception:', error);
    return NextResponse.json(
      { error: 'Internal server error in chat pipeline' },
      { status: 500 }
    );
  }
}
