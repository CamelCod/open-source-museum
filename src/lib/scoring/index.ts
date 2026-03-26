import type { Milestone } from "@/types";

export function computeSignificanceScore(
  milestone: Milestone,
  maxStars: number,
  maxForks: number
): number {
  const normalizedStars = maxStars > 0 ? (milestone.stars / maxStars) * 100 : 0;
  const normalizedForks = maxForks > 0 ? (milestone.forks / maxForks) * 100 : 0;

  const score =
    normalizedStars * 0.3 +
    normalizedForks * 0.3 +
    milestone.dependencyScore * 0.25 +
    milestone.industryAdoptionScore * 0.15;

  return Math.min(100, Math.max(0, Math.round(score * 10) / 10));
}

export function rankMilestones(milestones: Milestone[]): Milestone[] {
  const maxStars = Math.max(...milestones.map((m) => m.stars));
  const maxForks = Math.max(...milestones.map((m) => m.forks));

  return [...milestones]
    .map((m) => ({
      ...m,
      significanceScore:
        m.significanceScore ?? computeSignificanceScore(m, maxStars, maxForks),
    }))
    .sort((a, b) => (b.significanceScore ?? 0) - (a.significanceScore ?? 0));
}

export const CATEGORY_COLORS: Record<string, string> = {
  Infrastructure: "#3b82f6",
  Frontend: "#f59e0b",
  "AI/ML": "#8b5cf6",
  DevOps: "#10b981",
  Languages: "#ef4444",
  Tooling: "#6366f1",
  Platform: "#ec4899",
};

export const ERA_LABELS: Array<{ label: string; startYear: number; endYear: number }> = [
  { label: "The Unix Age", startYear: 1991, endYear: 2004 },
  { label: "The Platform Age", startYear: 2005, endYear: 2012 },
  { label: "The Cloud Age", startYear: 2013, endYear: 2019 },
  { label: "The AI Age", startYear: 2020, endYear: 2026 },
];

export function getEraForYear(year: number): string {
  for (const era of ERA_LABELS) {
    if (year >= era.startYear && year <= era.endYear) return era.label;
  }
  return "The AI Age";
}
