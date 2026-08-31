'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  ArrowLeft,
  RefreshCw,
  Settings,
  Volume2,
  VolumeX,
  X,
  Paperclip,
  CheckCheck,
  Check,
  Star,
  ShieldCheck,
  Bot,
  Sparkles,
  Info,
  Clock,
  MapPin,
  Smile,
} from 'lucide-react';
import { AgentPersona, ChatMessage, ChatSettings } from '@/lib/chat/types';
import { sendGroqChatRequest, calculateRealisticHumanTypingDelay } from '@/lib/chat/groqClient';
import { chatAudio } from '@/lib/chat/audioHelper';
import Image from 'next/image';

interface LiveAgentViewProps {
  agent: AgentPersona;
  messages: ChatMessage[];
  settings: ChatSettings;
  onSendMessage: (text: string) => void;
  onReceiveAgentMessage: (text: string) => void;
  onTransferAgent: () => void;
  onBackToFaq: () => void;
  onOpenSettings: () => void;
  onEndChat: () => void;
  onToggleSound: () => void;
}

const QUICK_PROMPTS = [
  'How do I avoid liquidation in volatile markets?',
  'What are your Maker & Taker fee tiers?',
  'Explain Momo AI Signal Engine confluence',
  'How to enable 2FA & address whitelisting?',
];

export default function LiveAgentView({
  agent,
  messages,
  settings,
  onSendMessage,
  onReceiveAgentMessage,
  onTransferAgent,
  onBackToFaq,
  onOpenSettings,
  onEndChat,
  onToggleSound,
}: LiveAgentViewProps) {
  const [inputText, setInputText] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [typingStatusText, setTypingStatusText] = useState('Agent is active');
  const [isConnecting, setIsConnecting] = useState(messages.length <= 1);
  const [connectionStep, setConnectionStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAgentTyping, isConnecting]);

  // Initial connection simulation sequence
  useEffect(() => {
    if (messages.length > 1) {
      setIsConnecting(false);
      return;
    }

    setIsConnecting(true);
    setConnectionStep(1);

    const step1 = setTimeout(() => {
      setConnectionStep(2);
    }, 900);

    const step2 = setTimeout(() => {
      setConnectionStep(3);
      chatAudio.playAgentConnected();
    }, 1800);

    const step3 = setTimeout(() => {
      setIsConnecting(false);
      inputRef.current?.focus();
    }, 2500);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  }, [agent.id]);

  const handleSend = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isAgentTyping) return;

    // Send user message
    onSendMessage(messageContent);
    chatAudio.playMessageSent();
    setInputText('');

    // Start realistic human typing simulation
    setIsAgentTyping(true);
    setTypingStatusText(`${agent.name.split(' ')[0]} is reading your message...`);

    const typingPause = setTimeout(() => {
      setTypingStatusText(`${agent.name.split(' ')[0]} is typing a response...`);
    }, 900);

    try {
      // Build conversation array including latest user message
      const updatedMessages: ChatMessage[] = [
        ...messages,
        {
          id: `usr_${Date.now()}`,
          sender: 'user',
          text: messageContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ];

      // Dispatch request to Groq or local simulation
      const reply = await sendGroqChatRequest({
        messages: updatedMessages,
        agent,
        apiKey: settings.groqApiKey,
        model: settings.selectedModel,
      });

      // Calculate realistic human delay based on reply length and typing speed
      const calculatedDelay = calculateRealisticHumanTypingDelay(
        reply,
        agent.typingSpeedWpm,
        settings.typingDelayMultiplier
      );

      setTimeout(() => {
        setIsAgentTyping(false);
        setTypingStatusText('Agent is active');
        onReceiveAgentMessage(reply);
        chatAudio.playMessageReceived();
      }, calculatedDelay);
    } catch (err) {
      console.error('Error getting agent reply:', err);
      clearTimeout(typingPause);
      setIsAgentTyping(false);
      setTypingStatusText('Agent is active');
      onReceiveAgentMessage(
        `I apologize for the brief pause. As part of TradingMomo's ${agent.department}, could you please clarify your question so I can provide the exact steps?`
      );
      chatAudio.playMessageReceived();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Top Live Agent Header Bar */}
      <div className="relative p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
        {/* Agent Profile Details */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToFaq}
            className="p-1.5 -ml-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Back to Knowledge Base FAQs"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Photo Avatar with Status Dot */}
          <div className="relative shrink-0">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/80 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-white truncate">{agent.name}</h3>
              <span className="p-0.5 rounded-full bg-amber-500/20 text-amber-400" title="Verified Trading Specialist">
                <ShieldCheck size={13} />
              </span>
              <span className="px-1.5 py-0.2 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded text-[9px] font-semibold hidden sm:inline-block">
                {agent.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-[240px]">
              {agent.title}
            </p>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
              <span className="flex items-center gap-0.5 text-amber-400">
                <Star size={10} className="fill-amber-400" />
                {agent.rating}
              </span>
              <span>•</span>
              <span className="flex items-center gap-0.5 truncate">
                <MapPin size={9} />
                {agent.location}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls (Transfer, Settings, Mute, End) */}
        <div className="flex items-center gap-1">
          <button
            onClick={onTransferAgent}
            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Switch / Transfer to another Live Specialist"
          >
            <RefreshCw size={15} />
          </button>
          <button
            onClick={onToggleSound}
            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
            title={settings.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          >
            {settings.soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Groq AI & Speed Settings"
          >
            <Settings size={15} />
          </button>
          <button
            onClick={onEndChat}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="End Session & Rate Agent"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Main Chat Conversation Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {/* Connecting Screen State */}
        {isConnecting ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 animate-fadeIn">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-amber-500/60 flex items-center justify-center shadow-xl">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center animate-spin">
                <Sparkles size={11} className="text-slate-950" />
              </span>
            </div>

            <div>
              <h4 className="font-bold text-sm text-slate-100">
                {connectionStep === 1 && 'Locating Available Trading Specialist...'}
                {connectionStep === 2 && `Assigning ${agent.name}...`}
                {connectionStep >= 3 && 'Establishing Encrypted Trading Support Desk...'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                {connectionStep >= 2
                  ? `${agent.title} (${agent.department})`
                  : 'Connecting you with 24/7 priority live assistance.'}
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full transition-colors ${connectionStep >= 1 ? 'bg-amber-400' : 'bg-slate-700'}`} />
              <span className={`w-2.5 h-2.5 rounded-full transition-colors ${connectionStep >= 2 ? 'bg-amber-400' : 'bg-slate-700'}`} />
              <span className={`w-2.5 h-2.5 rounded-full transition-colors ${connectionStep >= 3 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`} />
            </div>
          </div>
        ) : (
          <>
            {/* Agent Welcome Badge Card */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-amber-400" />
                  Desk Queue: Direct Priority
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Online
                </span>
              </div>
              <p className="leading-relaxed text-slate-300">{agent.bio}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {agent.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-0.5 bg-slate-900/90 text-amber-300 border border-amber-500/20 rounded-md text-[10px] font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Message Thread */}
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1 animate-fadeIn`}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {/* Agent Avatar on agent messages */}
                    {!isUser && (
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-7 h-7 rounded-full object-cover border border-amber-500/40 shrink-0 mb-1"
                      />
                    )}

                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed transition-all ${
                        isUser
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium rounded-br-none shadow-md shadow-amber-500/10'
                          : 'bg-slate-800 text-slate-100 border border-slate-700/80 rounded-bl-none shadow'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>
                    </div>
                  </div>

                  {/* Message Meta Info (Time & Status) */}
                  <div
                    className={`flex items-center gap-1.5 text-[10px] text-slate-500 px-1 ${
                      isUser ? 'mr-1' : 'ml-9'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isUser && (
                      <span className="text-amber-400">
                        <CheckCheck size={12} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Realistic Human Typing Bubble */}
            {isAgentTyping && (
              <div className="flex items-end gap-2 animate-fadeIn">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-7 h-7 rounded-full object-cover border border-amber-500/40 shrink-0 mb-1"
                />
                <div className="p-3.5 bg-slate-800 border border-slate-700/80 rounded-2xl rounded-bl-none flex items-center gap-1.5 shadow">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[11px] text-slate-400 ml-1 font-medium italic">
                    {typingStatusText}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Suggested Quick Prompt Chips (only shown if few messages) */}
      {!isConnecting && messages.length <= 3 && (
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80">
          <div className="text-[10px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
            <Sparkles size={11} className="text-amber-400" />
            Quick trading questions
          </div>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700/60 rounded-lg text-[11px] whitespace-nowrap transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input Composer */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder={`Reply to ${agent.name.split(' ')[0]}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isConnecting}
              className="w-full pl-3.5 pr-10 py-2.5 bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 disabled:opacity-50 transition-all"
            />
            <button
              type="button"
              onClick={() => setInputText((prev) => prev + ' 📈')}
              className="absolute right-3 text-slate-500 hover:text-amber-400 transition-colors"
              title="Add crypto emoji"
            >
              <Smile size={16} />
            </button>
          </div>

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isAgentTyping || isConnecting}
            className="p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 font-bold rounded-xl transition-all shadow-md shadow-amber-500/20 active:scale-95 shrink-0 flex items-center justify-center"
            title="Send message (Enter)"
          >
            <Send size={16} />
          </button>
        </div>

        {/* Engine status indicator footer */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              TradingMomo Verified 24/7 Live Desk
            </span>
          </div>
          <span>Shift + Enter for new line</span>
        </div>
      </div>
    </div>
  );
}
