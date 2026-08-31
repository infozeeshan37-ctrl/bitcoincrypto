'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Bot,
  Percent,
  Lock,
  LayoutGrid,
  Users,
  Settings,
  Volume2,
  VolumeX,
  X,
  ArrowRight,
} from 'lucide-react';
import { FAQ_CATEGORIES, PRESTORED_FAQS } from '@/lib/chat/faqData';
import { FAQItem } from '@/lib/chat/types';
import Link from 'next/link';

interface FAQViewProps {
  onStartLiveChat: (initialQuestion?: string) => void;
  onOpenSettings: () => void;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all: <LayoutGrid size={15} />,
  platform: <ShieldCheck size={15} />,
  trading: <TrendingUp size={15} />,
  signals: <Bot size={15} />,
  fees: <Percent size={15} />,
  security: <Lock size={15} />,
};

export default function FAQView({
  onStartLiveChat,
  onOpenSettings,
  onClose,
  soundEnabled,
  onToggleSound,
}: FAQViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(PRESTORED_FAQS[0].id);

  // Filter FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    return PRESTORED_FAQS.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchQuestion = faq.question.toLowerCase().includes(q);
      const matchAnswer = faq.answer.toLowerCase().includes(q);
      const matchTags = faq.tags.some((t) => t.toLowerCase().includes(q));

      return matchQuestion || matchAnswer || matchTags;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Header Bar */}
      <div className="relative p-5 pb-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Animated Mascot Mini Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot size={22} className="text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white tracking-tight">TradingMomo Support</h3>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Desk 24/7
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Instant Knowledge Base & Live Specialists</p>
            </div>
          </div>

          {/* Quick Header Action Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleSound}
              className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
              title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
              title="Groq API & Chat Settings"
            >
              <Settings size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="mt-4 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search trading guides, leverage, liquidation, fees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-950/80 border border-slate-700/70 focus:border-amber-500/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 -mb-1 pb-1">
          {FAQ_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                }`}
              >
                {CATEGORY_ICONS[cat.id]}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main FAQ Accordion List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {/* Direct Agent Connect Hero Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-800/90 to-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <Users size={18} className="text-amber-400" />
              </div>
            </div>
            <div>
              <div className="font-semibold text-xs text-amber-300 flex items-center gap-1.5">
                Direct Human Support Desk
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Prefer to speak with an assigned trading specialist?
              </p>
            </div>
          </div>
          <button
            onClick={() => onStartLiveChat()}
            className="px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all shrink-0 active:scale-95"
          >
            <span>Chat Live</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* FAQs List */}
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Search size={22} />
            </div>
            <p className="text-sm font-semibold text-slate-300">No matching questions found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Try searching with different keywords or connect directly with our live trading specialist.
            </p>
            <button
              onClick={() => onStartLiveChat(searchQuery)}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <MessageSquare size={14} />
              Ask Live Desk: &quot;{searchQuery}&quot;
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-800/90 border-amber-500/40 shadow-lg'
                    : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/70'
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-3.5 text-left flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-amber-400 shrink-0">
                      <Sparkles size={15} />
                    </span>
                    <span className="text-xs font-semibold text-slate-100 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 mt-0.5 ${
                      isExpanded ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {/* Expandable Answer Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-700/40 text-xs text-slate-300 space-y-3 animate-fadeIn">
                    <div className="whitespace-pre-line leading-relaxed text-slate-300">
                      {faq.answer}
                    </div>

                    {/* Tag Pills */}
                    {faq.tags && faq.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {faq.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-slate-900/80 text-slate-400 border border-slate-700/50 rounded-md text-[10px]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Quick Action Buttons */}
                    {faq.quickActions && faq.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700/30">
                        {faq.quickActions.map((action, idx) => {
                          if (action.actionType === 'open_url' && action.payload) {
                            return (
                              <Link
                                key={idx}
                                href={action.payload}
                                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-700 text-amber-300 border border-amber-500/20 rounded-lg text-[11px] font-medium inline-flex items-center gap-1.5 transition-colors"
                              >
                                <span>{action.label}</span>
                                <ExternalLink size={12} />
                              </Link>
                            );
                          }

                          if (action.actionType === 'ask_agent') {
                            return (
                              <button
                                key={idx}
                                onClick={() => onStartLiveChat(action.payload || faq.question)}
                                className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors"
                              >
                                <MessageSquare size={12} />
                                <span>{action.label}</span>
                              </button>
                            );
                          }

                          return null;
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Footer Action Bar */}
      <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Average response time: <strong>&lt; 45s</strong></span>
        </div>
        <button
          onClick={() => onStartLiveChat()}
          className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 group"
        >
          <span>Open Live Agent</span>
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
