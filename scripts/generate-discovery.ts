import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
import type { DiscoveryProject } from "../src/types";

const DISCOVERY_PATH = path.join(__dirname, "../data/discovery.json");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const SEARCH_QUERIES = [
  "good-first-issue:>5 language:TypeScript stars:>1000",
  "good-first-issue:>5 language:JavaScript stars:>1000",
  "good-first-issue:>5 language:Python stars:>1000",
  "good-first-issue:>5 language:Go stars:>500",
  "good-first-issue:>5 language:Rust stars:>500",
];

async function searchRepos(query: string): Promise<DiscoveryProject[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "open-source-museum-sync",
  };
  if (GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  }

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
    query
  )}&sort=stars&per_page=10`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.warn(`  WARN: search failed (${res.status}) for: ${query}`);
    return [];
  }

  const data = (await res.json()) as {
    items: Array<{
      id: number;
      name: string;
      description: string | null;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      pushed_at: string;
      html_url: string;
      topics: string[];
    }>;
  };

  return data.items.map((item) => ({
    id: String(item.id),
    name: item.name,
    description: item.description ?? "",
    language: item.language ?? "Unknown",
    stars: item.stargazers_count,
    forks: item.forks_count,
    lastCommit: item.pushed_at,
    labels: item.topics.includes("good-first-issue")
      ? ["good first issue", ...item.topics.filter((t) => t !== "good-first-issue")]
      : ["good first issue", ...item.topics],
    repoUrl: item.html_url,
    difficulty:
      item.stargazers_count > 10000 ? "intermediate" : "beginner",
  }));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("Generating discovery.json from GitHub search...\n");

  const all: DiscoveryProject[] = [];
  const seen = new Set<string>();

  for (const query of SEARCH_QUERIES) {
    console.log(`  Searching: ${query}`);
    const results = await searchRepos(query);
    for (const r of results) {
      if (!seen.has(r.repoUrl)) {
        seen.add(r.repoUrl);
        all.push(r);
      }
    }
    await sleep(1000);
  }

  console.log(`\nFound ${all.length} unique repos.`);
  fs.writeFileSync(DISCOVERY_PATH, JSON.stringify(all, null, 2));
  console.log("data/discovery.json updated.");
}

main().catch(console.error);
