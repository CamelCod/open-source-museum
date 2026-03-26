import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
import type { Milestone } from "../src/types";

const MILESTONES_PATH = path.join(__dirname, "../data/milestones.json");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchRepoStats(
  repoUrl: string
): Promise<{ stars: number; forks: number } | null> {
  const match = repoUrl.match(/github\.com\/([^/]+\/[^/]+)/);
  if (!match) return null;

  const repo = match[1].replace(/\/$/, "");
  const apiUrl = `https://api.github.com/repos/${repo}`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "open-source-museum-sync",
  };
  if (GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  }

  const res = await fetch(apiUrl, { headers });

  if (!res.ok) {
    console.warn(`  WARN: ${repo} returned ${res.status} — skipping`);
    return null;
  }

  const data = (await res.json()) as {
    stargazers_count: number;
    forks_count: number;
  };
  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const milestones: Milestone[] = JSON.parse(
    fs.readFileSync(MILESTONES_PATH, "utf-8")
  );

  console.log(`Syncing ${milestones.length} milestones from GitHub API...\n`);

  for (const milestone of milestones) {
    if (!milestone.repoUrl) {
      console.log(`  SKIP ${milestone.name} — no repoUrl`);
      continue;
    }

    process.stdout.write(`  Syncing ${milestone.name}... `);
    const stats = await fetchRepoStats(milestone.repoUrl);

    if (stats) {
      milestone.stars = stats.stars;
      milestone.forks = stats.forks;
      console.log(`stars: ${stats.stars.toLocaleString()}, forks: ${stats.forks.toLocaleString()}`);
    }

    await sleep(100);
  }

  fs.writeFileSync(MILESTONES_PATH, JSON.stringify(milestones, null, 2));
  console.log("\nSync complete. data/milestones.json updated.");
}

main().catch(console.error);
