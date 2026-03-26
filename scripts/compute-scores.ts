import * as fs from "fs";
import * as path from "path";
import type { Milestone } from "../src/types";

const MILESTONES_PATH = path.join(__dirname, "../data/milestones.json");

export function computeScores(milestones: Milestone[]): Milestone[] {
  const maxStars = Math.max(...milestones.map((m) => m.stars));
  const maxForks = Math.max(...milestones.map((m) => m.forks));

  return milestones.map((m) => {
    const normalizedStars = maxStars > 0 ? (m.stars / maxStars) * 100 : 0;
    const normalizedForks = maxForks > 0 ? (m.forks / maxForks) * 100 : 0;

    const score =
      normalizedStars * 0.3 +
      normalizedForks * 0.3 +
      m.dependencyScore * 0.25 +
      m.industryAdoptionScore * 0.15;

    return {
      ...m,
      significanceScore: Math.min(100, Math.max(0, Math.round(score * 10) / 10)),
    };
  });
}

function main() {
  const milestones: Milestone[] = JSON.parse(
    fs.readFileSync(MILESTONES_PATH, "utf-8")
  );

  const scored = computeScores(milestones);
  scored.sort((a, b) => (b.significanceScore ?? 0) - (a.significanceScore ?? 0));

  fs.writeFileSync(MILESTONES_PATH, JSON.stringify(scored, null, 2));

  console.log("\nSignificance Scores\n");
  console.log("Rank  Name                           Score");
  console.log("────  ─────────────────────────────  ─────");
  scored.forEach((m, i) => {
    const rank = String(i + 1).padEnd(4);
    const name = m.name.padEnd(33);
    console.log(`${rank}  ${name}  ${m.significanceScore}`);
  });

  console.log("\nScores computed and saved to data/milestones.json");
}

main();
