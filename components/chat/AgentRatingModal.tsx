'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, X, ThumbsUp } from 'lucide-react';
import { AgentPersona } from '@/lib/chat/types';

interface AgentRatingModalProps {
  agent: AgentPersona;
  onSubmitRating: (rating: number, feedback: string, tags: string[]) => void;
  onClose: () => void;
}

const FEEDBACK_TAGS = [
  '⚡ Super Fast Response',
  '🎯 Solved My Question',
  '📊 Clear Trading Insights',
  '🛡️ Great Security Advice',
  '🤝 Extremely Polite',
];

export default function AgentRatingModal({
  agent,
  onSubmitRating,
  onClose,
}: AgentRatingModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>(['⚡ Super Fast Response']);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      onSubmitRating(rating, comment, selectedTags);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
        <h3 className="font-bold text-sm text-white">Rate Your Session</h3>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar text-xs flex flex-col justify-center items-center text-center">
        {isSubmitted ? (
          <div className="py-8 space-y-3 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="font-bold text-base text-white">Thank You for Your Feedback!</h4>
            <p className="text-slate-400 max-w-xs text-xs">
              Your review for <strong>{agent.name}</strong> helps us maintain tier-1 customer support on TradingMomo.
            </p>
          </div>
        ) : (
          <>
            {/* Agent Avatar */}
            <div className="relative">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-500/80 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-amber-500 text-slate-950 rounded-full">
                <ThumbsUp size={10} />
              </span>
            </div>

            <div>
              <h4 className="font-bold text-sm text-white">{agent.name}</h4>
              <p className="text-[11px] text-slate-400">{agent.title}</p>
            </div>

            {/* Interactive 5 Stars */}
            <div className="flex items-center gap-1.5 py-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={
                        isFilled
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600 hover:text-amber-300'
                      }
                    />
                  </button>
                );
              })}
            </div>

            {/* Feedback Tags */}
            <div className="w-full space-y-1.5 pt-1 text-left">
              <div className="text-[11px] text-slate-400 font-semibold text-center">
                What went well?
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {FEEDBACK_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-sm'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Comment Input */}
            <div className="w-full pt-1">
              <textarea
                placeholder="Optional notes for our quality assurance team..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              Submit Rating & End Chat
            </button>
          </>
        )}
      </div>
    </div>
  );
}
