"use client";

import { useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { getDiscoveryProjects, getTimelineGrowthForLanguage } from "@/lib/data/loader";
import type { DiscoveryProject } from "@/types";

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

const ALL_PROJECTS = getDiscoveryProjects();
const LANGUAGES = ["Any", ...Array.from(new Set(ALL_PROJECTS.map((p) => p.language))).sort()];
const LABELS = ["Any", "good first issue", "help wanted", "documentation"];
const DIFFICULTIES = ["Any", "beginner", "intermediate"];

interface Stage3DiscoveryProps {
  onComplete: () => void;
}

export default function Stage3Discovery({ onComplete }: Stage3DiscoveryProps) {
  const [language, setLanguage] = useState("Any");
  const [difficulty, setDifficulty] = useState("Any");
  const [label, setLabel] = useState("Any");

  const filtered = useMemo(() => {
    return ALL_PROJECTS.filter((p: DiscoveryProject) => {
      if (language !== "Any" && p.language !== language) return false;
      if (difficulty !== "Any" && p.difficulty !== difficulty) return false;
      if (label !== "Any" && !p.labels.includes(label)) return false;
      return true;
    }).slice(0, 20);
  }, [language, difficulty, label]);

  const growthPct = getTimelineGrowthForLanguage(language);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Project Discovery</h2>
      <p className="text-zinc-400 mb-6">
        Find a project you&apos;d enjoy contributing to. Filter by what you know.
      </p>

      {language !== "Any" && growthPct > 0 && (
        <div className="rounded-xl bg-blue-950/30 border border-blue-800/50 px-4 py-3 mb-5 text-sm text-blue-300">
          The global open-source ecosystem has grown{" "}
          <strong>{growthPct}%</strong> in the last 5 years.
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Filter by language"
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>{l === "Any" ? "All languages" : l}</option>
          ))}
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          aria-label="Filter by difficulty"
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
        >
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>{d === "Any" ? "Any difficulty" : d.charAt(0).toUpperCase() + d.slice(1)}</option>
          ))}
        </select>

        <select
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          aria-label="Filter by label"
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
        >
          {LABELS.map((l) => (
            <option key={l} value={l}>{l === "Any" ? "Any label" : l}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-zinc-500 py-8 text-center">
          No projects match your filters. Try broadening your search.
        </p>
      ) : (
        <div className="space-y-2 mb-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.name} on GitHub`}
                      className="font-semibold text-white hover:text-blue-400 transition-colors"
                    >
                      {project.name}
                    </a>
                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                      {project.language}
                    </span>
                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full capitalize">
                      {project.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                    {project.description.slice(0, 100)}{project.description.length > 100 ? "…" : ""}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-zinc-500">
                    <span>★ {project.stars.toLocaleString()}</span>
                    <span>{project.forks.toLocaleString()} forks</span>
                    <span>Last commit {timeAgo(project.lastCommit)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.labels.slice(0, 3).map((lbl) => (
                      <span
                        key={lbl}
                        className="text-xs bg-blue-950/50 text-blue-400 border border-blue-800/50 px-2 py-0.5 rounded-full"
                      >
                        {lbl}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.name} on GitHub`}
                  className="shrink-0 p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onComplete}
        className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
      >
        Continue to Step 4 →
      </button>
    </div>
  );
}
