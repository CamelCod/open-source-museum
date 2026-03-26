"use client";

import { motion } from "framer-motion";
import { BookOpen, Compass } from "lucide-react";

type Mode = "story" | "explore";

interface ModeToggleProps {
  mode: Mode;
  onToggle: (mode: Mode) => void;
}

export default function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <div className="flex items-center bg-zinc-900 rounded-full p-1 border border-zinc-700 w-fit">
      {(["story", "explore"] as Mode[]).map((m) => (
        <button
          key={m}
          onClick={() => onToggle(m)}
          aria-label={`Switch to ${m} mode`}
          className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 z-10"
        >
          {mode === m && (
            <motion.span
              layoutId="mode-bg"
              className="absolute inset-0 bg-blue-600 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className={`relative z-10 flex items-center gap-1.5 ${mode === m ? "text-white" : "text-zinc-400"}`}>
            {m === "story" ? <BookOpen size={14} /> : <Compass size={14} />}
            {m === "story" ? "Story Mode" : "Explore Mode"}
          </span>
        </button>
      ))}
    </div>
  );
}
