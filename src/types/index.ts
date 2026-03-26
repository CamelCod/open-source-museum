export type MilestoneCategory =
  | "Infrastructure"
  | "Frontend"
  | "AI/ML"
  | "DevOps"
  | "Languages"
  | "Tooling"
  | "Platform";

export interface Milestone {
  id: string;
  year: number;
  name: string;
  repoUrl?: string;
  category: MilestoneCategory;
  description: string;
  whyItMattered: string;
  whatItEnabledNext: string;
  stars: number;
  forks: number;
  dependencyScore: number; // 0-100
  industryAdoptionScore: number; // 0-100
  significanceScore?: number; // 0-100, computed
}

export interface TimelinePoint {
  year: number;
  totalRepos: number;
  cumulativeGrowthRate: number;
  milestoneCount: number;
}

export interface DiscoveryProject {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastCommit: string; // ISO date
  labels: string[];
  repoUrl: string;
  difficulty: "beginner" | "intermediate";
}

export interface SimulatorIssue {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate";
  estimatedMinutes: number;
  labels: string[];
}
