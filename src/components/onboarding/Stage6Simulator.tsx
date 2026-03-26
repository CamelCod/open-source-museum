"use client";

import { useState } from "react";
import { Check, ExternalLink } from "lucide-react";
import { getSimulatorIssues } from "@/lib/data/loader";

const CHECKLIST = [
  "Forked the simulator repo",
  "Cloned it locally",
  "Created a feature branch",
  "Made a change and committed",
  "Pushed and opened a Pull Request",
];

interface Stage6SimulatorProps {
  onComplete: () => void;
}

export default function Stage6Simulator({ onComplete }: Stage6SimulatorProps) {
  const issues = getSimulatorIssues();
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (item: string) => {
    const next = new Set(checked);
    next.has(item) ? next.delete(item) : next.add(item);
    setChecked(next);
  };

  const allChecked = CHECKLIST.every((c) => checked.has(c));

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">PR Simulator</h2>
      <p className="text-zinc-400 mb-6">
        Practice the full PR workflow in a safe sandbox. Real GitHub — zero stakes.
      </p>

      <div className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-5 mb-6">
        <p className="text-white font-semibold mb-1">How it works</p>
        <p className="text-sm text-zinc-400">
          This is a real GitHub repository with real issues. Fork it, pick one of the
          practice issues below, make the change locally, and submit a real PR. Automated
          feedback will be posted within seconds.
        </p>
        <a
          href="https://github.com/CamelCod/open-source-museum/tree/main/simulator"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the PR simulator repository on GitHub"
          className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
        >
          Open Simulator Repo <ExternalLink size={14} />
        </a>
      </div>

      <p className="text-sm font-semibold text-zinc-300 mb-3">Practice issues</p>
      <div className="space-y-2 mb-8">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white text-sm">{issue.title}</p>
                <p className="text-xs text-zinc-500 mt-1">{issue.description.slice(0, 100)}…</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {issue.labels.map((l) => (
                    <span key={l} className="text-xs bg-blue-950/50 text-blue-400 border border-blue-800/50 px-2 py-0.5 rounded-full">
                      {l}
                    </span>
                  ))}
                  <span className="text-xs text-zinc-600">~{issue.estimatedMinutes} min</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm font-semibold text-zinc-300 mb-3">Track your progress</p>
      <div className="space-y-2 mb-6">
        {CHECKLIST.map((item) => (
          <button
            key={item}
            onClick={() => toggle(item)}
            aria-label={`Mark "${item}" as ${checked.has(item) ? "incomplete" : "complete"}`}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors ${
              checked.has(item)
                ? "border-green-800 bg-green-950/20 text-green-300"
                : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-600"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                checked.has(item)
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-zinc-600"
              }`}
            >
              {checked.has(item) && <Check size={10} />}
            </span>
            <span className="text-sm">{item}</span>
          </button>
        ))}
      </div>

      {allChecked && (
        <div className="rounded-xl bg-green-950/40 border border-green-800 p-4 mb-4">
          <p className="text-green-400 font-semibold">You submitted your first PR. That&apos;s real.</p>
        </div>
      )}

      <button
        onClick={onComplete}
        className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
      >
        Continue to Step 7 →
      </button>
    </div>
  );
}
