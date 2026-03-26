import type { Milestone, TimelinePoint, DiscoveryProject, SimulatorIssue } from "@/types";

import milestonesData from "../../../data/milestones.json";
import timelineData from "../../../data/timeline.json";
import discoveryData from "../../../data/discovery.json";
import simulatorIssuesData from "../../../data/simulator-issues.json";

export function getMilestones(): Milestone[] {
  return milestonesData as Milestone[];
}

export function getTimeline(): TimelinePoint[] {
  return timelineData as TimelinePoint[];
}

export function getDiscoveryProjects(): DiscoveryProject[] {
  return discoveryData as DiscoveryProject[];
}

export function getSimulatorIssues(): SimulatorIssue[] {
  return simulatorIssuesData as SimulatorIssue[];
}

export function getMilestoneById(id: string): Milestone | undefined {
  return getMilestones().find((m) => m.id === id);
}

export function getMilestonesByYear(year: number): Milestone[] {
  return getMilestones().filter((m) => m.year === year);
}

export function getTimelineGrowthForLanguage(language: string): number {
  const timeline = getTimeline();
  if (timeline.length < 6) return 0;
  const recent = timeline[timeline.length - 1].totalRepos;
  const fiveYearsAgo = timeline[Math.max(0, timeline.length - 6)].totalRepos;
  if (fiveYearsAgo === 0) return 0;
  return Math.round(((recent - fiveYearsAgo) / fiveYearsAgo) * 100);
}
