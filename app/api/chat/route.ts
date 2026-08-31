import { NextRequest, NextResponse } from 'next/server';
import { buildAgentSystemPrompt, simulateHumanAgentReply } from '@/lib/chat/groqClient';
import { AGENT_PERSONAS } from '@/lib/chat/agentsData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, agentId, apiKey: clientApiKey, model = 'llama-3.3-70b-versatile' } = body;

    const apiKey = clientApiKey || process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    const agent = AGENT_PERSONAS.find((a) => a.id === agentId) || AGENT_PERSONAS[0];

    // If no API key configured on server or client, return simulated desk reply
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
      .slice(-10)
      .map((m: { sender: string; text: string }) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

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
        max_tokens: 600,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.warn('Groq backend error, fallback to simulation:', err);
      const lastUserMsg = messages?.[messages.length - 1]?.text || '';
      const fallbackReply = simulateHumanAgentReply(lastUserMsg, agent, messages || []);
      return NextResponse.json({
        reply: fallbackReply,
        mode: 'simulated_fallback',
        error: err?.error?.message,
      });
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || '';

    return NextResponse.json({
      reply: replyText.trim(),
      mode: 'live_groq',
      model: model,
      agent: agent.name,
    });
  } catch (error) {
    console.error('Chat API Route exception:', error);
    return NextResponse.json(
      { error: 'Internal server error in chat pipeline' },
      { status: 500 }
    );
  }
}
