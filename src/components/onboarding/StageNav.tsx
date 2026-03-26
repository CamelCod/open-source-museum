"use client";

import { Check } from "lucide-react";
import { clsx } from "clsx";

const STAGE_NAMES = [
  "Setup",
  "Mechanics",
  "Discovery",
  "Issue Selection",
  "Execution",
  "Simulator",
  "After Your PR",
];

interface StageNavProps {
  currentStage: number;
  completedStages: number[];
  onStageClick: (stage: number) => void;
}

export default function StageNav({
  currentStage,
  completedStages,
  onStageClick,
}: StageNavProps) {
  return (
    <nav aria-label="Onboarding stages" className="flex flex-col gap-1">
      {STAGE_NAMES.map((name, i) => {
        const stage = i + 1;
        const isCompleted = completedStages.includes(stage);
        const isCurrent = stage === currentStage;
        const isClickable = isCompleted || isCurrent;

        return (
          <button
            key={stage}
            onClick={() => isClickable && onStageClick(stage)}
            aria-current={isCurrent ? "step" : undefined}
            aria-label={`Stage ${stage}: ${name}${isCompleted ? " (completed)" : ""}`}
            disabled={!isClickable}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors",
              isCurrent && "bg-blue-600/20 text-blue-400",
              isCompleted && !isCurrent && "text-zinc-300 hover:bg-zinc-800 cursor-pointer",
              !isCompleted && !isCurrent && "text-zinc-600 cursor-not-allowed"
            )}
          >
            <span
              className={clsx(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border",
                isCurrent && "bg-blue-600 border-blue-500 text-white",
                isCompleted && !isCurrent && "bg-green-900/40 border-green-700 text-green-400",
                !isCompleted && !isCurrent && "border-zinc-700 text-zinc-600"
              )}
            >
              {isCompleted && !isCurrent ? <Check size={12} /> : stage}
            </span>
            <span className="text-sm font-medium">{name}</span>
          </button>
        );
      })}
    </nav>
  );
}
