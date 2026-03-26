import Link from "next/link";
import { getMilestones } from "@/lib/data/loader";
import { rankMilestones } from "@/lib/scoring";

export default function HomePage() {
  const milestones = rankMilestones(getMilestones());
  const topMilestone = milestones[0];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-xs text-blue-400 uppercase tracking-widest font-semibold mb-4">
          An open-source project
        </p>
        <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight mb-4">
          The Story of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
            Open Source
          </span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          35 years. Millions of contributors. Software that runs the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/museum"
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            Explore the Museum →
          </Link>
          <Link
            href="/onboarding"
            className="px-8 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-semibold transition-colors"
          >
            Make Your First Contribution
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-3 gap-4 border border-zinc-800 rounded-2xl bg-zinc-900/50 p-6">
          {[
            { value: "20+", label: "Milestones" },
            { value: "35 yrs", label: "Of history" },
            { value: "7 stages", label: "To your first PR" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white">{value}</p>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preview — top milestone */}
      {topMilestone && (
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 font-semibold">
            Most significant milestone
          </p>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
            <span className="text-4xl font-black text-zinc-800">{topMilestone.year}</span>
            <h2 className="text-2xl font-bold text-white mt-1 mb-3">
              {topMilestone.name}
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              {topMilestone.description}
            </p>
            <Link href="/museum" className="text-blue-400 text-sm hover:underline">
              Explore all milestones →
            </Link>
          </div>
        </section>
      )}

      {/* CTA bridge */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-blue-950/60 to-violet-950/60 border border-blue-800/30 p-8 text-center">
          <p className="text-white font-bold text-xl mb-2">
            Inspired by what this community built?
          </p>
          <p className="text-zinc-400 mb-5">
            The onboarding guide takes you from zero to your first merged PR in one session.
          </p>
          <Link
            href="/onboarding"
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            Start Contributing →
          </Link>
        </div>
      </section>
    </div>
  );
}
