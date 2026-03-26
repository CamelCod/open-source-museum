"use client";

import { useState, useCallback } from "react";
import { getMilestones, getTimeline } from "@/lib/data/loader";
import { rankMilestones } from "@/lib/scoring";
import TimelineChart from "@/components/museum/TimelineChart";
import ScrollNarrative from "@/components/museum/ScrollNarrative";
import ModeToggle from "@/components/museum/ModeToggle";
import TimeSlider from "@/components/museum/TimeSlider";
import CategoryLegend from "@/components/museum/CategoryLegend";
import MilestoneCard from "@/components/museum/MilestoneCard";
import type { Milestone } from "@/types";

const milestones = rankMilestones(getMilestones()).sort((a, b) => a.year - b.year);
const timeline = getTimeline();

type Mode = "story" | "explore";

export default function MuseumPage() {
  const [activeYear, setActiveYear] = useState(1991);
  const [mode, setMode] = useState<Mode>("story");
  const [selected, setSelected] = useState<Milestone | null>(null);

  const handleYearChange = useCallback((year: number) => setActiveYear(year), []);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white mb-1">Open Source Timeline</h1>
          <p className="text-zinc-400 text-sm">
            35 years of the software that shaped the world.
          </p>
        </div>

        {/* Sticky chart + controls */}
        <div className="sticky top-16 z-30 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800 pb-4 mb-8">
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <ModeToggle mode={mode} onToggle={setMode} />
            <CategoryLegend />
          </div>
          <TimelineChart
            milestones={milestones}
            timeline={timeline}
            activeYear={activeYear}
            onMilestoneClick={setSelected}
          />
          {mode === "explore" && (
            <div className="mt-4">
              <TimeSlider year={activeYear} onChange={setActiveYear} />
            </div>
          )}
        </div>

        {/* Selected milestone popup */}
        {selected && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                Selected milestone
              </p>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close milestone detail"
                className="text-zinc-500 hover:text-white text-sm"
              >
                ✕ Close
              </button>
            </div>
            <MilestoneCard milestone={selected} />
          </div>
        )}

        {/* Story mode: scroll through all milestones */}
        {mode === "story" && (
          <ScrollNarrative milestones={milestones} onYearChange={handleYearChange} />
        )}

        {/* Explore mode: show milestones up to activeYear */}
        {mode === "explore" && (
          <div className="space-y-4">
            <p className="text-sm text-zinc-500">
              Showing {milestones.filter((m) => m.year <= activeYear).length} milestones through {activeYear}
            </p>
            {milestones
              .filter((m) => m.year <= activeYear)
              .map((m) => (
                <MilestoneCard key={m.id} milestone={m} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
