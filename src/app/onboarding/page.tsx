"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StageNav from "@/components/onboarding/StageNav";
import Stage1Setup from "@/components/onboarding/Stage1Setup";
import Stage2Mechanics from "@/components/onboarding/Stage2Mechanics";
import Stage3Discovery from "@/components/onboarding/Stage3Discovery";
import Stage4IssueSelection from "@/components/onboarding/Stage4IssueSelection";
import Stage5Execution from "@/components/onboarding/Stage5Execution";
import Stage6Simulator from "@/components/onboarding/Stage6Simulator";
import Stage7Feedback from "@/components/onboarding/Stage7Feedback";

const TOTAL_STAGES = 7;

function OnboardingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialStage = Math.min(
    TOTAL_STAGES,
    Math.max(1, parseInt(searchParams.get("stage") ?? "1", 10))
  );

  const [currentStage, setCurrentStage] = useState(initialStage);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const goToStage = (stage: number) => {
    setCurrentStage(stage);
    router.push(`/onboarding?stage=${stage}`, { scroll: true });
  };

  const completeStage = () => {
    if (!completedStages.includes(currentStage)) {
      setCompletedStages((prev) => [...prev, currentStage]);
    }
    if (currentStage < TOTAL_STAGES) {
      goToStage(currentStage + 1);
    }
  };

  const stageProps = { onComplete: completeStage };

  const stageComponents: Record<number, React.ReactNode> = {
    1: <Stage1Setup {...stageProps} />,
    2: <Stage2Mechanics {...stageProps} />,
    3: <Stage3Discovery {...stageProps} />,
    4: <Stage4IssueSelection {...stageProps} />,
    5: <Stage5Execution {...stageProps} />,
    6: <Stage6Simulator {...stageProps} />,
    7: <Stage7Feedback onComplete={() => setCompletedStages((p) => [...p, 7])} />,
  };

  const progress = (currentStage / TOTAL_STAGES) * 100;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Progress bar */}
      <div className="h-1 bg-zinc-800">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={currentStage}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STAGES}
          aria-label={`Stage ${currentStage} of ${TOTAL_STAGES}`}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 flex gap-8">
        {/* Sidebar nav */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-24">
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-4">
              Your progress
            </p>
            <StageNav
              currentStage={currentStage}
              completedStages={completedStages}
              onStageClick={goToStage}
            />
          </div>
        </aside>

        {/* Stage content */}
        <div className="flex-1 min-w-0">
          {stageComponents[currentStage]}

          {/* Prev/Next navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-zinc-800">
            <button
              onClick={() => currentStage > 1 && goToStage(currentStage - 1)}
              disabled={currentStage === 1}
              aria-label="Previous stage"
              className="px-4 py-2 rounded-full border border-zinc-700 text-zinc-400 text-sm disabled:opacity-30 hover:border-zinc-500 transition-colors"
            >
              ← Previous
            </button>
            <span className="text-xs text-zinc-600">
              {currentStage} / {TOTAL_STAGES}
            </span>
            <button
              onClick={() => completedStages.includes(currentStage) && currentStage < TOTAL_STAGES && goToStage(currentStage + 1)}
              disabled={!completedStages.includes(currentStage) || currentStage === TOTAL_STAGES}
              aria-label="Next stage"
              className="px-4 py-2 rounded-full border border-zinc-700 text-zinc-400 text-sm disabled:opacity-30 hover:border-zinc-500 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
      <OnboardingContent />
    </Suspense>
  );
}
