export type MessageSender = 'user' | 'agent' | 'bot' | 'system';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  agentName?: string;
  agentAvatar?: string;
  quickReplies?: string[];
  isAction?: boolean;
}

export interface AgentPersona {
  id: string;
  name: string;
  title: string;
  department: string;
  experience: string;
  specialties: string[];
  avatar: string;
  badge: string;
  rating: number;
  totalChats: number;
  location: string;
  greeting: string;
  bio: string;
  tone: string;
  typingSpeedWpm: number; // For realistic typing delay calculation
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'platform' | 'trading' | 'security' | 'signals' | 'fees';
  tags: string[];
  quickActions?: {
    label: string;
    actionType: 'open_url' | 'ask_agent' | 'custom';
    payload?: string;
  }[];
}

export interface FAQCategory {
  id: 'all' | 'platform' | 'trading' | 'security' | 'signals' | 'fees';
  name: string;
  iconName: string;
  description: string;
}

export interface ChatSettings {
  groqApiKey: string;
  selectedModel: string;
  typingDelayMultiplier: number; // 1.0 = standard human delay, 0.5 = fast, 0 = instant
  soundEnabled: boolean;
  isSimulated: boolean;
}

export type ChatViewMode = 'closed' | 'faq' | 'connecting' | 'live_chat' | 'settings' | 'rating';
