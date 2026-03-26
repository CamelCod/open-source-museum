"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Milestone } from "@/types";
import MilestoneCard from "./MilestoneCard";

interface ScrollNarrativeProps {
  milestones: Milestone[];
  onYearChange: (year: number) => void;
}

export default function ScrollNarrative({
  milestones,
  onYearChange,
}: ScrollNarrativeProps) {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrolledCount, setScrolledCount] = useState(0);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    milestones.forEach((milestone, i) => {
      const el = sectionRefs.current[i];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onYearChange(milestone.year);
            setScrolledCount((prev) => Math.max(prev, i + 1));
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [milestones, onYearChange]);

  useEffect(() => {
    if (scrolledCount >= 5 && !bannerDismissed) {
      setShowBanner(true);
    }
  }, [scrolledCount, bannerDismissed]);

  return (
    <div className="relative">
      <div className="space-y-8">
        {milestones.map((milestone, i) => (
          <motion.div
            key={milestone.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <MilestoneCard milestone={milestone} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-0 right-0 mx-auto max-w-2xl px-4 z-50"
          >
            <div className="bg-zinc-950 border border-zinc-700 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
              <div>
                <p className="text-white font-semibold">
                  You&apos;ve explored what the open-source community built together.
                </p>
                <p className="text-zinc-400 text-sm mt-0.5">
                  Ready to add your name to the story?
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => { setBannerDismissed(true); setShowBanner(false); }}
                  aria-label="Dismiss banner"
                  className="text-zinc-500 hover:text-white text-sm"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => router.push("/onboarding")}
                  className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
                >
                  Start Contributing →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
