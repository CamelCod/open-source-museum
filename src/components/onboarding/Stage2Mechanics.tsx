import { ArrowRight } from "lucide-react";

const STEPS = [
  { label: "Fork", desc: "Copy the repo to your account", color: "#3b82f6" },
  { label: "Clone", desc: "Download it locally", color: "#8b5cf6" },
  { label: "Branch", desc: "Create a safe workspace", color: "#f59e0b" },
  { label: "Commit", desc: "Save your changes with a message", color: "#10b981" },
  { label: "Push", desc: "Upload your branch to GitHub", color: "#ec4899" },
  { label: "Pull Request", desc: "Propose your changes for review", color: "#6366f1" },
];

interface Stage2MechanicsProps {
  onComplete: () => void;
}

export default function Stage2Mechanics({ onComplete }: Stage2MechanicsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Contribution Mechanics</h2>
      <p className="text-zinc-400 mb-8">
        Every open-source contribution follows the same six-step flow.
      </p>

      <div className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-4 mb-6">
        <p className="text-sm font-semibold text-blue-400 mb-1">Mental model</p>
        <p className="text-sm text-zinc-300">
          You&apos;re proposing a change, not breaking into someone&apos;s code.
          Your changes live in your own fork until a maintainer accepts them.
          Nothing you do can hurt the original project.
        </p>
      </div>

      {/* Flow diagram */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className="rounded-xl px-4 py-3 text-center min-w-[100px]"
              style={{ backgroundColor: step.color + "22", borderColor: step.color + "55", border: "1px solid" }}
            >
              <p className="font-bold text-sm" style={{ color: step.color }}>
                {step.label}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">{step.desc}</p>
            </div>
            {i < STEPS.length - 1 && (
              <ArrowRight size={16} className="text-zinc-600 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {[
          { term: "upstream", def: "The original repo you forked from" },
          { term: "origin", def: "Your fork of the repo" },
          { term: "merge", def: "Combine two branches together" },
          { term: "rebase", def: "Replay your commits on top of the latest changes" },
          { term: "review", def: "A maintainer reading and commenting on your PR" },
          { term: "merged", def: "Your PR is accepted and becomes part of the project" },
        ].map(({ term, def }) => (
          <div key={term} className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
            <code className="text-blue-400 text-sm font-mono">{term}</code>
            <p className="text-xs text-zinc-400 mt-1">{def}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onComplete}
        className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
      >
        Continue to Step 3 →
      </button>
    </div>
  );
}
