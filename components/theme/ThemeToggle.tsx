"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, ThemeMode, ThemeAccent, ACCENT_PALETTES } from "./ThemeProvider";
import { Sun, Moon, Laptop, Palette, Check, ChevronDown, Sparkles } from "lucide-react";

export default function ThemeToggle({
  variant = "dropdown",
  className = "",
}: {
  variant?: "dropdown" | "button" | "compact";
  className?: string;
}) {
  const { mode, accent, resolvedTheme, setMode, setAccent, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simple fast toggle variant
  if (variant === "button") {
    return (
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition ${className}`}
        aria-label="Toggle dark mode"
        title={`Current mode: ${resolvedTheme}. Click to switch to ${resolvedTheme === "dark" ? "light" : "dark"}.`}
      >
        {resolvedTheme === "dark" ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700" />
        )}
      </button>
    );
  }

  const currentPalette = ACCENT_PALETTES.find((p) => p.id === accent) || ACCENT_PALETTES[0];

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition text-xs font-semibold shadow-xs"
        aria-expanded={isOpen}
        aria-label="Theme and color options"
        title="Customize appearance and accent color"
      >
        <div className="flex items-center gap-1">
          {resolvedTheme === "dark" ? (
            <Moon className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-600" />
          )}
          {/* Accent dot indicator */}
          <span className={`w-2 h-2 rounded-full ${currentPalette.colorClass} ring-1 ring-white dark:ring-slate-900`} />
        </div>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Flyout Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-3 space-y-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          
          {/* Appearance Mode Section */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
              <span>Appearance Mode</span>
              <span className="text-amber-500 font-bold capitalize">{mode}</span>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setMode("light")}
                className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition ${
                  mode === "light"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </button>

              <button
                onClick={() => setMode("dark")}
                className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition ${
                  mode === "dark"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-amber-400" />
                <span>Dark</span>
              </button>

              <button
                onClick={() => setMode("system")}
                className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition ${
                  mode === "system"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Laptop className="w-3.5 h-3.5 text-slate-400" />
                <span>Auto</span>
              </button>
            </div>
          </div>

          {/* Accent Color Palette Section */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
              <span className="flex items-center gap-1">
                <Palette className="w-3 h-3 text-slate-400" /> Color Accent
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-bold">{currentPalette.name}</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {ACCENT_PALETTES.map((palette) => {
                const isSelected = accent === palette.id;
                return (
                  <button
                    key={palette.id}
                    onClick={() => setAccent(palette.id)}
                    className={`flex items-center gap-1.5 p-1.5 rounded-xl border text-left transition text-[11px] font-medium ${
                      isSelected
                        ? "bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-500 text-slate-900 dark:text-white font-bold"
                        : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${palette.colorClass} shrink-0 ring-1 ring-slate-200 dark:ring-slate-700`} />
                    <span className="truncate">{palette.name.split(" ")[0]}</span>
                    {isSelected && <Check className="w-2.5 h-2.5 ml-auto text-emerald-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Info */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-between px-1">
            <span>Themes persist automatically</span>
            <span className="font-mono text-[9px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
              v2.0
            </span>
          </div>

        </div>
      )}
    </div>
  );
}
