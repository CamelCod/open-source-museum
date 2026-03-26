"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { Milestone, TimelinePoint } from "@/types";
import { CATEGORY_COLORS } from "@/lib/scoring";

interface TimelineChartProps {
  milestones: Milestone[];
  timeline: TimelinePoint[];
  activeYear: number;
  onMilestoneClick: (milestone: Milestone) => void;
}

export default function TimelineChart({
  milestones,
  timeline,
  activeYear,
  onMilestoneClick,
}: TimelineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || milestones.length === 0) return;

    const container = containerRef.current;
    const { width } = container.getBoundingClientRect();
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear().domain([1991, 2026]).range([0, innerW]);
    const yScale = d3
      .scaleLog()
      .domain([1, 500000000])
      .range([innerH, 0])
      .clamp(true);

    const maxScore = d3.max(milestones, (d) => d.significanceScore ?? 50) ?? 100;
    const rScale = d3
      .scaleSqrt()
      .domain([0, maxScore])
      .range([8, 50]);

    // Gridlines
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${innerH})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickValues([1991, 1995, 2000, 2005, 2010, 2015, 2020, 2025])
          .tickSize(-innerH)
          .tickFormat(() => "")
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g.selectAll(".tick line").attr("stroke", "#27272a").attr("stroke-dasharray", "2,4")
      );

    // Timeline area
    if (timeline.length > 0) {
      const area = d3
        .area<TimelinePoint>()
        .x((d) => xScale(d.year))
        .y0(innerH)
        .y1((d) => yScale(Math.max(1, d.totalRepos)))
        .curve(d3.curveCatmullRom);

      g.append("path")
        .datum(timeline)
        .attr("fill", "#3b82f620")
        .attr("d", area);
    }

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickValues([1991, 1995, 2000, 2005, 2010, 2015, 2020, 2025])
          .tickFormat((d) => String(d))
      )
      .call((g) => {
        g.select(".domain").attr("stroke", "#52525b");
        g.selectAll(".tick line").attr("stroke", "#52525b");
        g.selectAll(".tick text").attr("fill", "#71717a").attr("font-size", "11");
      });

    g.append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickValues([1000, 1000000, 100000000, 500000000])
          .tickFormat((d) => {
            const n = Number(d);
            if (n >= 1e9) return `${n / 1e9}B`;
            if (n >= 1e6) return `${n / 1e6}M`;
            if (n >= 1e3) return `${n / 1e3}K`;
            return String(n);
          })
      )
      .call((g) => {
        g.select(".domain").remove();
        g.selectAll(".tick line").remove();
        g.selectAll(".tick text").attr("fill", "#71717a").attr("font-size", "11");
      });

    // Bubbles
    const tooltip = d3.select(tooltipRef.current);

    g.selectAll<SVGCircleElement, Milestone>("circle")
      .data(milestones)
      .join("circle")
      .attr("cx", (d) => xScale(d.year))
      .attr("cy", (d) => {
        const tp = timeline.find((t) => t.year === d.year);
        return yScale(Math.max(1, tp?.totalRepos ?? 1));
      })
      .attr("r", (d) => rScale(d.significanceScore ?? 50))
      .attr("fill", (d) => CATEGORY_COLORS[d.category] ?? "#6366f1")
      .attr("fill-opacity", (d) => (d.year <= activeYear ? 0.85 : 0.15))
      .attr("stroke", (d) => (d.year <= activeYear ? "#fff" : "transparent"))
      .attr("stroke-width", 1.5)
      .attr("cursor", "pointer")
      .on("mouseover", (event, d) => {
        tooltip
          .style("display", "block")
          .style("left", `${event.offsetX + 12}px`)
          .style("top", `${event.offsetY - 10}px`)
          .html(`<strong>${d.name}</strong><br/>${d.year}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.offsetX + 12}px`)
          .style("top", `${event.offsetY - 10}px`);
      })
      .on("mouseout", () => tooltip.style("display", "none"))
      .on("click", (_, d) => onMilestoneClick(d));
  }, [milestones, timeline]);

  // Animate opacity on activeYear change
  useEffect(() => {
    if (!svgRef.current) return;
    d3.select(svgRef.current)
      .selectAll<SVGCircleElement, Milestone>("circle")
      .transition()
      .duration(750)
      .ease(d3.easeCubicInOut)
      .attr("fill-opacity", (d) => (d.year <= activeYear ? 0.85 : 0.15))
      .attr("stroke", (d) => (d.year <= activeYear ? "#fff" : "transparent"));
  }, [activeYear]);

  // Resize observer
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (svgRef.current && containerRef.current) {
        svgRef.current.setAttribute("width", "0");
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <svg ref={svgRef} className="w-full" />
      <div
        ref={tooltipRef}
        className="pointer-events-none absolute hidden bg-zinc-900 border border-zinc-700 text-white text-xs rounded-lg px-3 py-2 shadow-xl z-10"
        style={{ display: "none" }}
      />
    </div>
  );
}
