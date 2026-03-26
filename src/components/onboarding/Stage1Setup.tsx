"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { clsx } from "clsx";
import CodeBlock from "@/components/shared/CodeBlock";

const STEPS = [
  {
    id: "git",
    title: "Install Git",
    content: (
      <>
        <p className="text-sm text-zinc-400 mb-2">
          Verify Git is installed by running this in your terminal:
        </p>
        <CodeBlock code="git --version" />
        <p className="text-sm text-zinc-400 mt-2">
          If not installed, download from{" "}
          <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            git-scm.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "github",
    title: "Create a GitHub account",
    content: (
      <>
        <p className="text-sm text-zinc-400">
          If you don&apos;t have one, create a free account at{" "}
          <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            github.com/signup
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "ssh",
    title: "Generate an SSH key",
    content: (
      <>
        <p className="text-sm text-zinc-400 mb-2">Run these commands (replace with your email):</p>
        <CodeBlock code={`ssh-keygen -t ed25519 -C "your_email@example.com"`} />
        <p className="text-sm text-zinc-400 my-2">Then copy your public key:</p>
        <CodeBlock code="cat ~/.ssh/id_ed25519.pub" />
        <p className="text-sm text-zinc-400 mt-2">
          Paste the output into{" "}
          <a href="https://github.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            GitHub → Settings → SSH keys
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "config",
    title: "Configure Git identity",
    content: (
      <>
        <p className="text-sm text-zinc-400 mb-2">Tell Git who you are:</p>
        <CodeBlock code={`git config --global user.name "Your Name"\ngit config --global user.email "your_email@example.com"`} />
      </>
    ),
  },
  {
    id: "verify",
    title: "Verify the setup",
    content: (
      <>
        <p className="text-sm text-zinc-400 mb-2">Test your SSH connection:</p>
        <CodeBlock code="ssh -T git@github.com" />
        <p className="text-sm text-zinc-400 mt-2">
          You should see: <code className="text-green-400 bg-zinc-800 px-1 rounded">Hi username! You&apos;ve successfully authenticated</code>
        </p>
      </>
    ),
  },
];

interface Stage1SetupProps {
  onComplete: () => void;
}

export default function Stage1Setup({ onComplete }: Stage1SetupProps) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>("git");

  const toggle = (id: string) => setExpanded(expanded === id ? null : id);
  const check = (id: string) => {
    const next = new Set(completed);
    next.has(id) ? next.delete(id) : next.add(id);
    setCompleted(next);
  };

  const allDone = STEPS.every((s) => completed.has(s.id));

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Environment Setup</h2>
      <p className="text-zinc-400 mb-6">
        Complete each step to prepare your machine for open-source contribution.
      </p>

      <div className="space-y-2">
        {STEPS.map((step) => (
          <div
            key={step.id}
            className={clsx(
              "rounded-xl border transition-colors",
              completed.has(step.id) ? "border-green-800 bg-green-950/20" : "border-zinc-700 bg-zinc-900/50"
            )}
          >
            <div className="flex items-center gap-3 p-4">
              <button
                onClick={() => check(step.id)}
                aria-label={`Mark "${step.title}" as ${completed.has(step.id) ? "incomplete" : "complete"}`}
                className={clsx(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                  completed.has(step.id)
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-zinc-600 hover:border-zinc-400"
                )}
              >
                {completed.has(step.id) && <Check size={12} />}
              </button>
              <button
                onClick={() => toggle(step.id)}
                aria-expanded={expanded === step.id}
                className="flex-1 text-left text-sm font-medium text-white flex items-center justify-between"
              >
                {step.title}
                {expanded === step.id ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
              </button>
            </div>
            {expanded === step.id && (
              <div className="px-4 pb-4 pt-0">{step.content}</div>
            )}
          </div>
        ))}
      </div>

      {allDone && (
        <div className="mt-6 rounded-xl bg-green-950/40 border border-green-800 p-5">
          <p className="text-green-400 font-semibold mb-1">Your environment is ready.</p>
          <p className="text-zinc-400 text-sm mb-4">
            Let&apos;s learn how contributions work.
          </p>
          <button
            onClick={onComplete}
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
          >
            Continue to Step 2 →
          </button>
        </div>
      )}
    </div>
  );
}
