"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";
export type ThemeAccent = "amber" | "emerald" | "blue" | "purple" | "rose" | "slate";

interface ThemeContextType {
  mode: ThemeMode;
  accent: ThemeAccent;
  resolvedTheme: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: ThemeAccent) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ACCENT_PALETTES: {
  id: ThemeAccent;
  name: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  textClass: string;
}[] = [
  {
    id: "amber",
    name: "Bitcoin Gold",
    colorClass: "bg-amber-500",
    borderClass: "border-amber-400",
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-500",
  },
  {
    id: "emerald",
    name: "Cyber Emerald",
    colorClass: "bg-emerald-500",
    borderClass: "border-emerald-400",
    bgClass: "bg-emerald-500/10",
    textClass: "text-emerald-500",
  },
  {
    id: "blue",
    name: "Sapphire Pro",
    colorClass: "bg-blue-500",
    borderClass: "border-blue-400",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-500",
  },
  {
    id: "purple",
    name: "Neon Violet",
    colorClass: "bg-purple-500",
    borderClass: "border-purple-400",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-500",
  },
  {
    id: "rose",
    name: "Crimson Rose",
    colorClass: "bg-rose-500",
    borderClass: "border-rose-400",
    bgClass: "bg-rose-500/10",
    textClass: "text-rose-500",
  },
  {
    id: "slate",
    name: "Minimal Slate",
    colorClass: "bg-slate-500",
    borderClass: "border-slate-400",
    bgClass: "bg-slate-500/10",
    textClass: "text-slate-500",
  },
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");
  const [accent, setAccentState] = useState<ThemeAccent>("amber");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    try {
      const savedMode = (localStorage.getItem("btc_theme_mode") as ThemeMode) || "dark";
      const savedAccent = (localStorage.getItem("btc_theme_accent") as ThemeAccent) || "amber";
      
      setModeState(savedMode);
      setAccentState(savedAccent);
      
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialResolved = savedMode === "system" ? (isSystemDark ? "dark" : "light") : savedMode;
      setResolvedTheme(initialResolved);
      
      applyTheme(savedMode, savedAccent);
    } catch {
      // Fallback
      applyTheme("dark", "amber");
    }
    setMounted(true);
  }, []);

  // System listener for prefers-color-scheme
  useEffect(() => {
    if (!mounted) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (mode === "system") {
        applyTheme("system", accent);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode, accent, mounted]);

  const applyTheme = (targetMode: ThemeMode, targetAccent: ThemeAccent) => {
    const root = document.documentElement;
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const activeResolved = targetMode === "system" ? (isSystemDark ? "dark" : "light") : targetMode;

    if (activeResolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    root.setAttribute("data-theme", activeResolved);
    root.setAttribute("data-accent", targetAccent);
    setResolvedTheme(activeResolved);
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem("btc_theme_mode", newMode);
    } catch {}
    applyTheme(newMode, accent);
  };

  const setAccent = (newAccent: ThemeAccent) => {
    setAccentState(newAccent);
    try {
      localStorage.setItem("btc_theme_accent", newAccent);
    } catch {}
    applyTheme(mode, newAccent);
  };

  const toggleTheme = () => {
    const nextMode = resolvedTheme === "dark" ? "light" : "dark";
    setMode(nextMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        accent,
        resolvedTheme,
        setMode,
        setAccent,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
