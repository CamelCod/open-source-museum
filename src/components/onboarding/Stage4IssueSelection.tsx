"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

const RED_FLAGS = [
  "No maintainer response in 90+ days",
  "Issue scope is vague or unclear",
  "Already claimed by another contributor",
  "Repo has no recent commits in 6+ months",
];

const GREEN_FLAGS = [
  "Clear description with acceptance criteria",
  "Maintainer responded recently",
  "Labels: good first issue or help wanted",
  "Active PRs in the repo in last 30 days",
];

type Flag = "red" | "green" | null;

interface Stage4IssueSelectionProps {
  onComplete: () => void;
}

export default function Stage4IssueSelection({ onComplete }: Stage4IssueSelectionProps) {
  const allFlags = [
    ...RED_FLAGS.map((f) => ({ text: f, type: "red" as const })),
    ...GREEN_FLAGS.map((f) => ({ text: f, type: "green" as const })),
  ].sort(() => Math.random() - 0.5);

  const [answers, setAnswers] = useState<Record<string, Flag>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = allFlags.every((f) => answers[f.text] !== undefined);

  const correct = allFlags.filter((f) => answers[f.text] === f.type).length;
  const total = allFlags.length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Issue Selection</h2>
      <p className="text-zinc-400 mb-4">
        Not all issues are worth picking up. Learn to spot the difference.
      </p>

      <div className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-4 mb-6 text-sm text-zinc-400">
        <p className="font-semibold text-white mb-1">Before you claim an issue:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Comment first — say you&apos;d like to work on it</li>
          <li>Ask clarifying questions if anything is unclear</li>
          <li>Don&apos;t start coding until a maintainer acknowledges you</li>
        </ul>
      </div>

      <p className="text-sm text-zinc-400 mb-4">
        For each signal below, mark it as a{" "}
        <span className="text-red-400 font-semibold">Red Flag</span> or{" "}
        <span className="text-green-400 font-semibold">Green Flag</span>:
      </p>

      <div className="space-y-3 mb-6">
        {allFlags.map((flag) => {
          const answer = answers[flag.text];
          const isCorrect = submitted && answer === flag.type;
          const isWrong = submitted && answer !== flag.type;

          return (
            <div
              key={flag.text}
              className={`rounded-xl border p-3 transition-colors ${
                isCorrect ? "border-green-700 bg-green-950/20" :
                isWrong ? "border-red-800 bg-red-950/20" :
                "border-zinc-700 bg-zinc-900/40"
              }`}
            >
              <p className="text-sm text-zinc-300 mb-2">{flag.text}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => !submitted && setAnswers({ ...answers, [flag.text]: "red" })}
                  aria-label={`Mark as red flag: ${flag.text}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    answer === "red"
                      ? "bg-red-900/50 border-red-700 text-red-300"
                      : "border-zinc-700 text-zinc-500 hover:border-red-700 hover:text-red-400"
                  }`}
                >
                  <X size={12} /> Red Flag
                </button>
                <button
                  onClick={() => !submitted && setAnswers({ ...answers, [flag.text]: "green" })}
                  aria-label={`Mark as green flag: ${flag.text}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    answer === "green"
                      ? "bg-green-900/50 border-green-700 text-green-300"
                      : "border-zinc-700 text-zinc-500 hover:border-green-700 hover:text-green-400"
                  }`}
                >
                  <Check size={12} /> Green Flag
                </button>
                {submitted && (
                  <span className={`ml-auto text-xs self-center ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect ? "Correct" : `Should be ${flag.type === "red" ? "Red" : "Green"}`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={() => allAnswered && setSubmitted(true)}
          disabled={!allAnswered}
          className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
        >
          Check Answers
        </button>
      ) : (
        <div className="rounded-xl bg-zinc-900 border border-zinc-700 p-4 mb-4">
          <p className="text-white font-semibold">
            {correct}/{total} correct{correct === total ? " — Perfect!" : ""}
          </p>
          <button
            onClick={onComplete}
            className="mt-3 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
          >
            Continue to Step 5 →
          </button>
        </div>
      )}
    </div>
  );
}
