'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, X } from 'lucide-react';
import { chatAudio } from '@/lib/chat/audioHelper';

interface MomoMascotProps {
  isOpen: boolean;
  unreadCount?: number;
  onClick: () => void;
  onOpenLiveAgent?: () => void;
}

export default function MomoMascot({
  isOpen,
  unreadCount = 0,
  onClick,
  onOpenLiveAgent,
}: MomoMascotProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Natural periodic eye blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleClick = () => {
    chatAudio.playRobotChirp();
    setShowTooltip(false);
    onClick();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto select-none">
      {/* Floating Interactive Tooltip / Notification Banner */}
      {!isOpen && showTooltip && (
        <div className="mb-3 max-w-[280px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-amber-500/30 dark:border-amber-400/30 p-3 rounded-2xl shadow-xl shadow-amber-500/10 text-slate-800 dark:text-slate-100 text-xs animate-bounce transition-all duration-300 relative group">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute -top-2 -left-2 w-5 h-5 bg-slate-200 dark:bg-slate-800 hover:bg-rose-500 hover:text-white rounded-full flex items-center justify-center text-slate-500 transition-colors shadow"
            title="Dismiss notification"
          >
            <X size={12} />
          </button>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-sm">
              <Sparkles size={14} className="animate-spin text-slate-950" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-amber-400 flex items-center gap-1">
                TradingMomo Desk
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                Need trading help, margin info, or want to chat with our 24/7 human desk?
              </p>
              <div className="mt-2 flex gap-1.5">
                <button
                  onClick={handleClick}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-md text-[11px] transition-all shadow-sm active:scale-95"
                >
                  Ask Momo FAQ
                </button>
                {onOpenLiveAgent && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTooltip(false);
                      onOpenLiveAgent();
                    }}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md text-[11px] font-medium transition-colors"
                  >
                    Support Agent
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Tooltip speech bubble arrow */}
          <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white/95 dark:border-t-slate-900/95" />
        </div>
      )}

      {/* Main Mascot Button Trigger */}
      <button
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Open TradingMomo Chat Support"
        className={`group relative flex items-center justify-center rounded-full transition-all duration-300 transform active:scale-95 ${
          isOpen
            ? 'w-14 h-14 bg-slate-900 border-2 border-amber-500/80 shadow-lg text-amber-400'
            : 'w-16 h-16 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-400/80 shadow-2xl hover:shadow-amber-500/25 hover:border-amber-300'
        }`}
      >
        {/* Pulsing Aura Rings */}
        {!isOpen && (
          <>
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 opacity-40 blur-sm group-hover:opacity-75 transition-opacity animate-pulse" />
            <span className="absolute -inset-3 rounded-full bg-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity animate-ping pointer-events-none" />
          </>
        )}

        {/* Unread badge if applicable */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-[11px] font-bold text-white shadow-md animate-bounce">
            {unreadCount}
          </span>
        )}

        {isOpen ? (
          /* When chat is open, show sleek Close / Collapse Icon */
          <div className="relative z-10 flex items-center justify-center">
            <X size={26} className="text-amber-400 transition-transform duration-200 group-hover:rotate-90" />
          </div>
        ) : (
          /* Cute Animated SVG Robot Mascot (Momo) */
          <div className="relative z-10 w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-md overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Robot Body Metallic Gradients */}
                <linearGradient id="momoHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2A324B" />
                  <stop offset="50%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="momoVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#030712" />
                  <stop offset="100%" stopColor="#111827" />
                </linearGradient>
                <linearGradient id="momoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="momoEyeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#67E8F9" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <filter id="eyeGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Antenna Stem */}
              <rect x="47" y="10" width="6" height="15" rx="3" fill="#64748B" />
              
              {/* Glowing Antenna Orb */}
              <circle
                cx="50"
                cy="10"
                r="7"
                fill="url(#momoGoldGrad)"
                className="animate-pulse"
              />
              <circle
                cx="50"
                cy="10"
                r="11"
                fill="#F59E0B"
                opacity="0.3"
                className="animate-ping"
                style={{ animationDuration: '3s' }}
              />

              {/* Robot Ears / Headphone Accents */}
              <rect x="12" y="38" width="8" height="24" rx="4" fill="url(#momoGoldGrad)" />
              <rect x="80" y="38" width="8" height="24" rx="4" fill="url(#momoGoldGrad)" />
              <circle cx="16" cy="50" r="2.5" fill="#0F172A" />
              <circle cx="84" cy="50" r="2.5" fill="#0F172A" />

              {/* Robot Main Head Container */}
              <rect
                x="18"
                y="24"
                width="64"
                height="54"
                rx="16"
                fill="url(#momoHeadGrad)"
                stroke="#F59E0B"
                strokeWidth="2.5"
              />

              {/* Digital Visor / Glass Screen */}
              <rect
                x="25"
                y="34"
                width="50"
                height="32"
                rx="10"
                fill="url(#momoVisorGrad)"
                stroke="#334155"
                strokeWidth="1.5"
              />

              {/* Expressive LED Cyber Eyes */}
              {isBlinking ? (
                // Blinking closed eye slits
                <g stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" filter="url(#eyeGlowFilter)">
                  <line x1="33" y1="48" x2="43" y2="48" />
                  <line x1="57" y1="48" x2="67" y2="48" />
                </g>
              ) : isHovered ? (
                // Happy curved arc eyes on hover
                <g fill="none" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" filter="url(#eyeGlowFilter)">
                  <path d="M 33 49 Q 38 43 43 49" />
                  <path d="M 57 49 Q 62 43 67 49" />
                </g>
              ) : (
                // Normal bright open digital eyes
                <g filter="url(#eyeGlowFilter)">
                  <ellipse cx="38" cy="48" rx="5" ry="6.5" fill="url(#momoEyeGlow)" />
                  <ellipse cx="62" cy="48" rx="5" ry="6.5" fill="url(#momoEyeGlow)" />
                  {/* Eye pupils/sparkles */}
                  <circle cx="39.5" cy="46" r="2" fill="#FFFFFF" />
                  <circle cx="63.5" cy="46" r="2" fill="#FFFFFF" />
                </g>
              )}

              {/* Cute digital blush on cheeks */}
              <ellipse cx="30" cy="58" rx="3.5" ry="1.5" fill="#F43F5E" opacity="0.6" />
              <ellipse cx="70" cy="58" rx="3.5" ry="1.5" fill="#F43F5E" opacity="0.6" />

              {/* Cyber Collar / Tie Detail */}
              <path d="M 44 78 L 50 84 L 56 78 Z" fill="url(#momoGoldGrad)" />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
}
