import Link from "next/link";

interface Stage7FeedbackProps {
  onComplete: () => void;
}

export default function Stage7Feedback({ onComplete }: Stage7FeedbackProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">After Your PR</h2>
      <p className="text-zinc-400 mb-8">
        Submitting is only the beginning. Here&apos;s what happens next.
      </p>

      <div className="space-y-6">
        {[
          {
            step: "The review process",
            body: "A maintainer will read your changes and leave comments. This can take hours or days depending on the project. Don't panic — silence is normal. Most maintainers are volunteers.",
          },
          {
            step: "Responding to feedback",
            body: "If a maintainer requests changes, don't take it personally. Push additional commits to the same branch — your PR updates automatically. Respond to comments politely and ask for clarification if needed.",
            code: "# After making requested changes:\ngit add .\ngit commit -m \"fix: address review feedback\"\ngit push origin your-branch-name",
          },
          {
            step: "What 'merged' means",
            body: "When a maintainer merges your PR, your code becomes part of the project. Your name appears in the git history forever. You're now an open-source contributor.",
          },
          {
            step: "Finding your second contribution",
            body: "Look in the same repo — maintainers often leave encouraging comments suggesting related issues. Or browse the discovery engine for your next project.",
          },
        ].map(({ step, body, code }) => (
          <div key={step} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <p className="font-semibold text-white mb-2">{step}</p>
            <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
            {code && (
              <pre className="mt-3 rounded-lg bg-zinc-950 border border-zinc-700 p-3 text-xs text-green-400 font-mono overflow-x-auto">
                {code}
              </pre>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-blue-950/30 border border-blue-800/50 p-6 text-center">
        <p className="text-white font-bold text-lg mb-1">You&apos;re ready.</p>
        <p className="text-zinc-400 text-sm mb-4">
          Find a real project to contribute to, or contribute to this one.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/onboarding?stage=3"
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
          >
            Browse Projects →
          </Link>
          <a
            href="https://github.com/CamelCod/open-source-museum/issues?q=is%3Aopen+label%3A%22good+first+issue%22"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View good first issues in the Open Source Museum repository"
            className="px-5 py-2 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-sm font-medium transition-colors"
          >
            Contribute to This Project
          </a>
        </div>
      </div>

      <button
        onClick={onComplete}
        className="mt-6 px-5 py-2 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-400 text-sm transition-colors"
      >
        Mark complete ✓
      </button>
    </div>
  );
}
