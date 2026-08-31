'use client';

import React, { useState, useEffect, useCallback } from 'react';
import MomoMascot from './MomoMascot';
import FAQView from './FAQView';
import LiveAgentView from './LiveAgentView';
import AgentRatingModal from './AgentRatingModal';
import { AgentPersona, ChatMessage, ChatSettings, ChatViewMode } from '@/lib/chat/types';
import { AGENT_PERSONAS, getRandomAgent } from '@/lib/chat/agentsData';
import { chatAudio } from '@/lib/chat/audioHelper';

const STORAGE_KEYS = {
  SETTINGS: 'tradingmomo_chat_settings',
  MESSAGES: 'tradingmomo_chat_messages',
  CURRENT_AGENT: 'tradingmomo_current_agent',
};

const DEFAULT_SETTINGS: ChatSettings = {
  groqApiKey: '',
  selectedModel: 'llama-3.3-70b-versatile',
  typingDelayMultiplier: 1.0,
  soundEnabled: true,
  isSimulated: false,
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ChatViewMode>('faq');
  const [agent, setAgent] = useState<AgentPersona>(AGENT_PERSONAS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [settings, setSettings] = useState<ChatSettings>(DEFAULT_SETTINGS);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);

    try {
      // Load sound setting
      const savedSettingsRaw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettingsRaw) {
        const parsed = JSON.parse(savedSettingsRaw);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
        chatAudio.setMuted(!parsed.soundEnabled);
      }

      // Pick or restore agent
      const savedAgentId = localStorage.getItem(STORAGE_KEYS.CURRENT_AGENT);
      const matchedAgent = AGENT_PERSONAS.find((a) => a.id === savedAgentId);
      const initialAgent = matchedAgent || getRandomAgent();
      setAgent(initialAgent);

      // Restore messages or initialize with agent's greeting
      const savedMsgsRaw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (savedMsgsRaw) {
        const parsedMsgs = JSON.parse(savedMsgsRaw);
        if (Array.isArray(parsedMsgs) && parsedMsgs.length > 0) {
          setMessages(parsedMsgs);
        } else {
          setMessages([createAgentGreetingMessage(initialAgent)]);
        }
      } else {
        setMessages([createAgentGreetingMessage(initialAgent)]);
      }
    } catch (e) {
      console.warn('Error loading chat session from storage:', e);
      const random = getRandomAgent();
      setAgent(random);
      setMessages([createAgentGreetingMessage(random)]);
    }
  }, []);

  function createAgentGreetingMessage(targetAgent: AgentPersona): ChatMessage {
    return {
      id: `agent_greet_${Date.now()}`,
      sender: 'agent',
      text: targetAgent.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agentName: targetAgent.name,
      agentAvatar: targetAgent.avatar,
    };
  }

  // Persist messages whenever updated
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to save messages', e);
    }
  }, [messages, isMounted]);

  // Persist settings (e.g. sound toggle)
  const handleUpdateSettings = useCallback((newSettings: Partial<ChatSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (newSettings.soundEnabled !== undefined) {
        chatAudio.setMuted(!newSettings.soundEnabled);
      }
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Transfer to a new random specialist
  const handleTransferAgent = () => {
    const nextAgent = getRandomAgent(agent.id);
    setAgent(nextAgent);
    localStorage.setItem(STORAGE_KEYS.CURRENT_AGENT, nextAgent.id);

    const transferNotice: ChatMessage = {
      id: `sys_transfer_${Date.now()}`,
      sender: 'system',
      text: `🔄 You have been connected with ${nextAgent.name} (${nextAgent.title}).`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newGreeting = createAgentGreetingMessage(nextAgent);
    setMessages((prev) => [...prev, transferNotice, newGreeting]);
    chatAudio.playAgentConnected();
  };

  // User sends a message
  const handleSendMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // Agent sends response
  const handleReceiveAgentMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: `ag_${Date.now()}`,
      sender: 'agent',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agentName: agent.name,
      agentAvatar: agent.avatar,
    };
    setMessages((prev) => [...prev, newMsg]);

    if (!isOpen) {
      setUnreadCount((c) => c + 1);
    }
  };

  // Start live chat (optionally with an initial question from FAQ)
  const handleStartLiveChat = (initialQuestion?: string) => {
    setViewMode('live_chat');
    setIsOpen(true);
    setUnreadCount(0);

    if (initialQuestion && initialQuestion.trim()) {
      setTimeout(() => {
        handleSendMessage(initialQuestion);
      }, 400);
    }
  };

  // Toggle sound
  const handleToggleSound = () => {
    const nextSound = !settings.soundEnabled;
    handleUpdateSettings({ soundEnabled: nextSound });
  };

  if (!isMounted) return null;

  return (
    <div className="fixed z-50 pointer-events-none">
      {/* Floating Chat Modal Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[410px] h-[580px] sm:h-[620px] max-h-[calc(100vh-120px)] pointer-events-auto transition-all duration-300 transform origin-bottom-right animate-fadeIn">
          {viewMode === 'faq' && (
            <FAQView
              onStartLiveChat={handleStartLiveChat}
              onClose={() => setIsOpen(false)}
              soundEnabled={settings.soundEnabled}
              onToggleSound={handleToggleSound}
            />
          )}

          {viewMode === 'live_chat' && (
            <LiveAgentView
              agent={agent}
              messages={messages}
              settings={settings}
              onSendMessage={handleSendMessage}
              onReceiveAgentMessage={handleReceiveAgentMessage}
              onTransferAgent={handleTransferAgent}
              onBackToFaq={() => setViewMode('faq')}
              onEndChat={() => setViewMode('rating')}
              onToggleSound={handleToggleSound}
            />
          )}

          {viewMode === 'rating' && (
            <AgentRatingModal
              agent={agent}
              onSubmitRating={() => {
                setViewMode('faq');
                setIsOpen(false);
              }}
              onClose={() => setViewMode('live_chat')}
            />
          )}
        </div>
      )}

      {/* Cute Robotic Mascot Trigger */}
      <MomoMascot
        isOpen={isOpen}
        unreadCount={unreadCount}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setUnreadCount(0);
        }}
        onOpenLiveAgent={() => handleStartLiveChat()}
      />
    </div>
  );
}
