import type { Milestone } from "@/types";
import { CATEGORY_COLORS } from "@/lib/scoring";
import ContributeCallout from "./ContributeCallout";

interface MilestoneCardProps {
  milestone: Milestone;
}

export default function MilestoneCard({ milestone }: MilestoneCardProps) {
  const color = CATEGORY_COLORS[milestone.category] ?? "#6366f1";

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-5xl font-black text-zinc-800 leading-none">
            {milestone.year}
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">{milestone.name}</h2>
        </div>
        <span
          className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full mt-2"
          style={{ backgroundColor: color + "33", color }}
        >
          {milestone.category}
        </span>
      </div>

      <p className="text-zinc-300 leading-relaxed mb-6">{milestone.description}</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-zinc-900 rounded-xl p-4">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1 font-semibold">
            Why it mattered
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {milestone.whyItMattered}
          </p>
        </div>
        <div className="bg-zinc-900 rounded-xl p-4">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1 font-semibold">
            What it enabled next
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {milestone.whatItEnabledNext}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        {milestone.stars > 0 && (
          <span className="text-zinc-400">
            ★ <span className="text-white font-medium">{milestone.stars.toLocaleString()}</span> stars
          </span>
        )}
        {milestone.forks > 0 && (
          <span className="text-zinc-400">
            <span className="text-white font-medium">{milestone.forks.toLocaleString()}</span> forks
          </span>
        )}
        {milestone.significanceScore !== undefined && (
          <span className="text-zinc-400">
            Significance:{" "}
            <span className="text-white font-medium">{milestone.significanceScore}</span>
            /100
          </span>
        )}
        {milestone.repoUrl && (
          <a
            href={milestone.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${milestone.name} on GitHub`}
            className="text-blue-400 hover:underline"
          >
            View on GitHub →
          </a>
        )}
      </div>

      <ContributeCallout category={milestone.category} milestoneId={milestone.id} />
    </article>
  );
}
