'use client';

import React, { useState } from 'react';
import {
  Key,
  Cpu,
  Clock,
  Volume2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { ChatSettings } from '@/lib/chat/types';
import { GROQ_MODELS } from '@/lib/chat/groqClient';

interface ChatSettingsModalProps {
  settings: ChatSettings;
  onUpdateSettings: (newSettings: Partial<ChatSettings>) => void;
  onClearChatHistory: () => void;
  onClose: () => void;
}

export default function ChatSettingsModal({
  settings,
  onUpdateSettings,
  onClearChatHistory,
  onClose,
}: ChatSettingsModalProps) {
  const [apiKeyInput, setApiKeyInput] = useState(settings.groqApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  const handleSaveKey = () => {
    onUpdateSettings({ groqApiKey: apiKeyInput.trim() });
  };

  const handleTestGroq = async () => {
    const keyToTest = apiKeyInput.trim();
    if (!keyToTest) {
      setTestStatus('error');
      setTestMessage('Please enter a Groq API Key first (gsk_...)');
      return;
    }

    setTestStatus('testing');
    setTestMessage('Contacting Groq API...');

    try {
      const startTime = performance.now();
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${keyToTest}`,
        },
        body: JSON.stringify({
          model: settings.selectedModel,
          messages: [{ role: 'user', content: 'Ping! Respond with the word Pong.' }],
          max_tokens: 10,
        }),
      });

      const elapsed = Math.round(performance.now() - startTime);

      if (res.ok) {
        setTestStatus('success');
        setTestMessage(`Connected successfully! Latency: ${elapsed}ms`);
        onUpdateSettings({ groqApiKey: keyToTest });
      } else {
        const data = await res.json().catch(() => ({}));
        setTestStatus('error');
        setTestMessage(data?.error?.message || `Invalid API response (${res.status})`);
      }
    } catch (err: unknown) {
      setTestStatus('error');
      const msg = err instanceof Error ? err.message : 'Network error testing API';
      setTestMessage(msg);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Key size={16} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Chat & Groq API Settings</h3>
            <p className="text-[11px] text-slate-400">Configure AI models & live desk parameters</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Settings Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar text-xs">
        {/* Groq API Key Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Key size={14} className="text-amber-400" />
              Groq API Key
            </label>
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
            >
              Get Free Groq Key
              <ExternalLink size={11} />
            </a>
          </div>

          <div className="relative flex items-center">
            <input
              type={showKey ? 'text' : 'password'}
              placeholder="gsk_..."
              value={apiKeyInput}
              onChange={(e) => {
                setApiKeyInput(e.target.value);
                setTestStatus('idle');
              }}
              className="w-full pl-3 pr-20 py-2 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="p-1 text-slate-400 hover:text-slate-200"
                title={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button
                type="button"
                onClick={handleSaveKey}
                className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-[10px] transition-all"
              >
                Save
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handleTestGroq}
              disabled={testStatus === 'testing'}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-[11px] font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Sparkles size={12} className="text-amber-400" />
              {testStatus === 'testing' ? 'Testing...' : 'Test Groq Connection'}
            </button>

            {testStatus === 'success' && (
              <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-medium">
                <CheckCircle2 size={13} />
                {testMessage}
              </span>
            )}
            {testStatus === 'error' && (
              <span className="text-rose-400 flex items-center gap-1 text-[11px] font-medium max-w-[200px] truncate">
                <AlertCircle size={13} />
                {testMessage}
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-500 leading-normal">
            Your key is safely stored locally in your browser and used exclusively for your session. If empty, the chat will use our local high-speed desk simulation.
          </p>
        </div>

        {/* Model Selection */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Cpu size={14} className="text-amber-400" />
            Groq AI Model
          </label>
          <div className="space-y-1.5">
            {GROQ_MODELS.map((m) => {
              const isSelected = settings.selectedModel === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onUpdateSettings({ selectedModel: m.id })}
                  className={`w-full p-2.5 rounded-xl text-left border flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/60 text-white'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-xs text-white">{m.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{m.speed}</div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-amber-500 bg-amber-500' : 'border-slate-600'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Realistic Human Typing Cadence */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Clock size={14} className="text-amber-400" />
            Human Typing Simulation Cadence
          </label>
          <p className="text-[11px] text-slate-400 leading-snug">
            Controls how realistically the agent pauses to read and type before responding.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { label: 'Realistic (1x)', value: 1.0, desc: '1.5s - 3.5s delay' },
              { label: 'Brisk (0.5x)', value: 0.5, desc: '0.8s - 1.8s delay' },
              { label: 'Instant (0x)', value: 0.0, desc: 'Immediate answer' },
            ].map((opt) => {
              const isSelected = settings.typingDelayMultiplier === opt.value;
              return (
                <button
                  key={opt.label}
                  onClick={() => onUpdateSettings({ typingDelayMultiplier: opt.value })}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs">{opt.label}</div>
                  <div className={`text-[9px] mt-0.5 ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                    {opt.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio Effects Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <Volume2 size={16} className="text-amber-400" />
            <div>
              <div className="font-semibold text-xs text-slate-200">Interactive Sound Effects</div>
              <div className="text-[10px] text-slate-400">Audio feedback for sends, pings, and mascot</div>
            </div>
          </div>
          <button
            onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`w-10 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
              settings.soundEnabled ? 'bg-amber-500' : 'bg-slate-800'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.soundEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Reset / Clear Chat History */}
        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear your current conversation history?')) {
                onClearChatHistory();
              }
            }}
            className="w-full py-2.5 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Trash2 size={14} />
            Reset Conversation & Re-assign Agent
          </button>
        </div>
      </div>
    </div>
  );
}
