import Link from "next/link";
import { getDiscoveryProjects } from "@/lib/data/loader";
import type { MilestoneCategory } from "@/types";

const CATEGORY_LANGUAGES: Record<MilestoneCategory, string[]> = {
  Infrastructure: ["Go", "C", "Rust"],
  Frontend: ["JavaScript", "TypeScript"],
  "AI/ML": ["Python"],
  DevOps: ["Go", "Python"],
  Languages: ["Rust", "TypeScript", "Go"],
  Tooling: ["JavaScript", "TypeScript", "Python"],
  Platform: ["JavaScript", "TypeScript"],
};

function seededRandom(seed: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % max;
}

interface ContributeCalloutProps {
  category: MilestoneCategory;
  milestoneId: string;
}

export default function ContributeCallout({
  category,
  milestoneId,
}: ContributeCalloutProps) {
  const languages = CATEGORY_LANGUAGES[category] ?? ["TypeScript"];
  const all = getDiscoveryProjects().filter((p) =>
    languages.includes(p.language)
  );

  if (all.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-zinc-700 p-4 bg-zinc-900/50">
        <p className="text-sm text-zinc-400">
          <Link
            href="/onboarding?stage=3"
            className="text-blue-400 hover:underline"
          >
            Explore all beginner-friendly projects →
          </Link>
        </p>
      </div>
    );
  }

  const idx1 = seededRandom(milestoneId, all.length);
  const idx2 = seededRandom(milestoneId + "2", all.length);
  const picks = [all[idx1], all[idx2 === idx1 ? (idx2 + 1) % all.length : idx2]].filter(Boolean);

  return (
    <div className="mt-6 rounded-xl border border-zinc-700 p-4 bg-zinc-900/50">
      <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-semibold">
        Contribute to something like this
      </p>
      <div className="space-y-2">
        {picks.map((project) => (
          <a
            key={project.id}
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} on GitHub`}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800 transition-colors group"
          >
            <div>
              <span className="text-sm text-white font-medium group-hover:text-blue-400 transition-colors">
                {project.name}
              </span>
              <span className="ml-2 text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                {project.language}
              </span>
            </div>
            <div className="text-xs text-zinc-500">
              ★ {project.stars.toLocaleString()}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
