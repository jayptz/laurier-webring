"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

import { memberListTableViewportHeight } from "@/lib/memberListLayout";

type Member = {
  name: string;
  website: string;
  year?: string;
};

type RingGraphProps = {
  members: Member[];
};

interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  website: string;
  year: string;
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  source: SimNode | string;
  target: SimNode | string;
}

export function RingGraph({ members }: RingGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !members.length) return;

    const container = containerRef.current;
    // clear any previous render
    while (container.firstChild) container.removeChild(container.firstChild);

    const width = container.clientWidth || 560;
    const height = container.clientHeight || 520;

    const nodeRadius = 8;
    const defaultNodeColor = "#FFD54F"; // Laurier gold
    const highlightedNodeColor = "#4B2E83"; // Laurier purple
    const defaultEdgeColor = "#4B2E83"; // Laurier purple

    // build node data from members
    const sites: SimNode[] = members.map((source, i) => ({
      id: `node-${i}`,
      name: source.name,
      website: source.website,
      year: source.year ?? "",
    }));

    // ring links
    const links: SimLink[] = sites.map((site, index) => ({
      source: site.id,
      target: sites[(index + 1) % sites.length].id,
    }));

    const pad = nodeRadius * 5;
    const rw = Math.max(width - 2 * pad, 1);
    const rh = Math.max(height - 2 * pad, 1);
    sites.forEach((d) => {
      d.x = pad + Math.random() * rw;
      d.y = pad + Math.random() * rh;
    });

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("overflow", "visible")
      .style("cursor", "move")
      .style("overflow", "visible");

    const g = svg.append("g");

    // zoom + pan
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.015, 80])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // force simulation
    const simulation = d3
      .forceSimulation<SimNode>()
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>()
          .id((d) => d.id)
          .distance(200)
      )
      .force("charge", d3.forceManyBody().strength(-420))
      .alphaDecay(0.015)
      .velocityDecay(0.35);

    // edges
    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#7851A9")
      .attr("stroke-opacity", 1)
      .attr("stroke-width", 1.5);

    // nodes
    const node = g
      .append("g")
      .selectAll<SVGGElement, SimNode>("g")
      .data(sites)
      .enter()
      .append("g")
      .call(
        d3
          .drag<SVGGElement, SimNode>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    function showTooltip(event: MouseEvent, d: SimNode) {
      hideTooltip();

      const x = event.clientX + 12;
      const y = event.clientY - 8;

      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "ring-graph-tooltip")
        .style("position", "fixed")
        .style("left", `${x}px`)
        .style("top", `${y}px`)
        .style("background", "#fff")
        .style("color", "#1f2937")
        .style("padding", "10px 14px")
        .style("border", "1px solid #E5E0FF")
        .style("border-radius", "8px")
        .style("font-family", "system-ui, sans-serif")
        .style("font-size", "12px")
        .style("pointer-events", "auto")
        .style("z-index", "99999")
        .style("box-shadow", "0 4px 12px rgba(0,0,0,0.15)")
        .style("max-width", "220px")
        .html(
          `<div style="font-weight:600;color:#4B2E83;">${d.name}</div>` +
            (d.year ? `<div style="margin-top:2px;color:#6b7280;font-size:11px;">${d.year}</div>` : "") +
            `<a href="${d.website.replace(/"/g, "&quot;")}" target="_blank" rel="noopener noreferrer" style="margin-top:8px;display:inline-block;color:#D4A017;font-size:11px;font-weight:500;text-decoration:none;cursor:pointer;">Click to visit →</a>`
        )
        .on("mouseover", cancelHideTooltip)
        .on("mouseout", scheduleHideTooltip);
    }

    let hideTooltipTimer: ReturnType<typeof setTimeout>;
    function hideTooltip() {
      d3.select("body").selectAll(".ring-graph-tooltip").remove();
    }
    function scheduleHideTooltip() {
      clearTimeout(hideTooltipTimer);
      hideTooltipTimer = setTimeout(hideTooltip, 150);
    }
    function cancelHideTooltip() {
      clearTimeout(hideTooltipTimer);
    }

    node
      .append("circle")
      .attr("r", nodeRadius)
      .attr("fill", defaultNodeColor)
      .style("cursor", "pointer");

    node
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        cancelHideTooltip();
        d3.select(this).select("circle").attr("fill", highlightedNodeColor);
        svg.style("cursor", "pointer");
        showTooltip(event as MouseEvent, d);
      })
      .on("mouseout", function (_event, d) {
        d3.select(this).select("circle").attr("fill", getNodeColor(d));
        svg.style("cursor", "move");
        scheduleHideTooltip();
      })
      .on("mousemove", function (event) {
        cancelHideTooltip();
        const t = d3.select("body").selectAll(".ring-graph-tooltip");
        if (!t.empty()) {
          const e = event as MouseEvent;
          t.style("left", `${e.clientX + 12}px`).style("top", `${e.clientY - 8}px`);
        }
      })
      .on("click", (_event, d) => {
        window.open(d.website, "_blank");
      });

    // labels
    node
      .append("text")
      .attr("dx", 12)
      .attr("dy", 4)
      .text((d) => d.website.replace(/^https?:\/\//, "").replace(/\/$/, ""))
      .attr("fill", "#4F587C")
      .style("font-size", "10px")
      .style("font-family", "monospace")
      .style("pointer-events", "none");

    simulation.nodes(sites).on("tick", ticked);
    (simulation.force("link") as d3.ForceLink<SimNode, SimLink>).links(links);

    function ticked() {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    }

    function fitToView() {
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

      node.each((d) => {
        minX = Math.min(minX, d.x!);
        minY = Math.min(minY, d.y!);
        maxX = Math.max(maxX, d.x!);
        maxY = Math.max(maxY, d.y!);
      });

      const padding = 48;
      minX -= padding;
      minY -= padding;
      maxX += padding;
      maxY += padding;

      const w = container.clientWidth || width;
      const h = container.clientHeight || height;

      const bw = Math.max(maxX - minX, 1e-6);
      const bh = Math.max(maxY - minY, 1e-6);
      // Zoom out more than a tight fit so the graph can extend beyond the first view (pan / zoom freely)
      const scale = Math.min(w / bw, h / bh) * 0.72;
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(w / 2, h / 2)
            .scale(scale)
            .translate(-centerX, -centerY)
        );
    }

    function dragstarted(event: d3.D3DragEvent<SVGGElement, SimNode, SimNode>, d: SimNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      svg.style("cursor", "grabbing");
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, SimNode, SimNode>, d: SimNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, SimNode, SimNode>, d: SimNode) {
      if (!event.active) simulation.alphaTarget(0);
      svg.style("cursor", "grab");
      d.fx = null;
      d.fy = null;
    }

    function getNodeColor(d: SimNode) {
      const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;
      const term = (searchInput?.value ?? "").toLowerCase();
      if (!term) return defaultNodeColor;

      const matches =
        d.name.toLowerCase().includes(term) ||
        d.year.toLowerCase().includes(term) ||
        d.website.toLowerCase().includes(term);
      return matches ? highlightedNodeColor : defaultNodeColor;
    }

    function highlightAndZoomToNodes(searchTerm: string) {
      const term = searchTerm.toLowerCase();

      node.selectAll("circle").attr("fill", (d: any) => {
        if (!term) return defaultNodeColor;
        const matches =
          d.name.toLowerCase().includes(term) ||
          d.year.toLowerCase().includes(term) ||
          d.website.toLowerCase().includes(term);
        return matches ? highlightedNodeColor : defaultNodeColor;
      });

      if (term) {
        const matchingNodes = node.filter(
          (d) =>
            d.name.toLowerCase().includes(term) ||
            d.year.toLowerCase().includes(term) ||
            d.website.toLowerCase().includes(term)
        );

        if (matchingNodes.size() > 0) {
          let minX = Infinity,
            minY = Infinity,
            maxX = -Infinity,
            maxY = -Infinity;

          matchingNodes.each((d) => {
            minX = Math.min(minX, d.x!);
            minY = Math.min(minY, d.y!);
            maxX = Math.max(maxX, d.x!);
            maxY = Math.max(maxY, d.y!);
          });

          const padding = 100;
          minX -= padding;
          minY -= padding;
          maxX += padding;
          maxY += padding;

          const cw = container.clientWidth || width;
          const ch = container.clientHeight || height;
          const mw = Math.max(maxX - minX, 1e-6);
          const mh = Math.max(maxY - minY, 1e-6);
          const scale = Math.min(cw / mw, ch / mh) * 0.85;
          const centerX = (minX + maxX) / 2;
          const centerY = (minY + maxY) / 2;

          svg
            .transition()
            .duration(750)
            .call(
              zoom.transform,
              d3.zoomIdentity
                .translate(cw / 2, ch / 2)
                .scale(scale)
                .translate(-centerX, -centerY)
            );
        }
      } else {
        fitToView();
      }
    }

    // hook search input
    const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        highlightAndZoomToNodes((e.target as HTMLInputElement).value);
      });
    }

    // auto fit-to-view once stabilized
    simulation.on("tick", () => {
      ticked();
      if (simulation.alpha() < 0.1) {
        simulation.alphaTarget(0);
        fitToView();
        simulation.on("tick", ticked);
      }
    });

    // resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth || width;
      const newHeight = container.clientHeight || height;
      svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
      simulation.alpha(0.2).restart();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      simulation.stop();
      window.removeEventListener("resize", handleResize);
      container.innerHTML = "";
    };
  }, [members]);

  const count = members.length;
  const countLabel = `${count} ${count === 1 ? "student" : "Hawks"}`;

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-purple-200/35 bg-transparent shadow-none ring-1 ring-purple-200/25">
      <div
        className="pointer-events-none absolute left-3 top-3 z-10 rounded-md border border-purple-200/40 bg-background/90 px-2.5 py-1 text-sm font-medium text-foreground/90 backdrop-blur-sm"
        aria-live="polite"
      >
        {countLabel}
      </div>
      <div
        ref={containerRef}
        className="w-full overflow-hidden"
        style={{ height: memberListTableViewportHeight() }}
      />
    </div>
  );
}
