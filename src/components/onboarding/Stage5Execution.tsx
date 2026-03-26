import CodeBlock from "@/components/shared/CodeBlock";

interface Stage5ExecutionProps {
  onComplete: () => void;
}

export default function Stage5Execution({ onComplete }: Stage5ExecutionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Execution Guide</h2>
      <p className="text-zinc-400 mb-8">
        Follow these steps every time you make a contribution.
      </p>

      <ol className="space-y-8">
        {[
          {
            n: 1,
            title: "Fork the repository",
            desc: "On GitHub, click the Fork button at the top-right of the repo page. This creates your own copy.",
          },
          {
            n: 2,
            title: "Clone your fork",
            code: "git clone git@github.com:YOUR_USERNAME/REPO_NAME.git\ncd REPO_NAME",
          },
          {
            n: 3,
            title: "Create a feature branch",
            desc: "Never work directly on main. Branch names should describe what you're doing.",
            code: "git checkout -b fix/typo-in-readme\n# or\ngit checkout -b feat/add-dark-mode",
          },
          {
            n: 4,
            title: "Make your changes and commit",
            desc: "Keep commits focused. One logical change per commit.",
            code: 'git add path/to/changed/file\ngit commit -m "fix: correct typo in README contributing section"',
          },
          {
            n: 5,
            title: "Push your branch",
            code: "git push origin fix/typo-in-readme",
          },
          {
            n: 6,
            title: "Open a Pull Request",
            desc: "GitHub will show a banner to create a PR after you push. Click it, then fill in the template below.",
          },
        ].map((step) => (
          <li key={step.n} className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-blue-900/40 border border-blue-700 text-blue-400 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
              {step.n}
            </span>
            <div className="flex-1">
              <p className="font-semibold text-white mb-1">{step.title}</p>
              {step.desc && <p className="text-sm text-zinc-400 mb-2">{step.desc}</p>}
              {step.code && <CodeBlock code={step.code} />}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-xl border border-zinc-700 bg-zinc-900/40 p-5">
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-semibold">
          PR Description Template
        </p>
        <CodeBlock
          code={`## What this PR does
<!-- One sentence description -->

## Why
<!-- The problem this solves or the issue it closes -->
Closes #

## How I tested it
- [ ] Ran the test suite
- [ ] Manually verified the change works
- [ ] No regressions in related functionality`}
          language="markdown"
        />
      </div>

      <button
        onClick={onComplete}
        className="mt-6 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
      >
        Continue to Step 6 →
      </button>
    </div>
  );
}
