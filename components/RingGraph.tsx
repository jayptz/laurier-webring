"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

import { ringGraphHeight } from "@/lib/memberListLayout";

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
  // Optional per-edge preferred distance (adds shape variety).
  dist?: number;
}

export function RingGraph({ members }: RingGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Hawk overlay is rendered in-SVG so it stays aligned with zoom/pan.

  useEffect(() => {
    if (!containerRef.current || !members.length) return;

    const container = containerRef.current;
    // clear any previous render
    while (container.firstChild) container.removeChild(container.firstChild);

    let width = container.clientWidth || 560;
    let height = container.clientHeight || 520;

    const nodeRadius = 8;
    const defaultNodeColor = "#FFD54F"; // Laurier gold
    const highlightedNodeColor = "#4B2E83"; // Laurier purple
    const defaultEdgeColor = "#4B2E83"; // Laurier purple

    // "Hawk stepping area" in the middle of the ring.
    // We place the hawk image on top and also repel nodes away from it
    // so the simulation can't "step on it".
    let hawkCx = width / 2;
    let hawkCy = height / 2;
    let hawkW = Math.min(width, height) * 0.53;
    let hawkH = hawkW * 0.62; // approximate aspect for the background artwork
    // Deadzone sizing: slightly larger than the artwork bounds
    // so the entire hawk is covered by the "do not step" area.
    const hawkDeadzoneScale = 1.05;
    let hawkRx = Math.max(1, (hawkW / 2) * hawkDeadzoneScale);
    let hawkRy = Math.max(1, (hawkH / 2) * hawkDeadzoneScale);

    // build node data from members
    const sites: SimNode[] = members.map((source, i) => ({
      id: `node-${i}`,
      name: source.name,
      website: source.website,
      year: source.year ?? "",
    }));

    // ring links (closed loop)
    const links: SimLink[] = sites.map((site, index) => ({
      source: site.id,
      target: sites[(index + 1) % sites.length].id,
    }));

    // Organic layout: client-side randomness for initial positions + per-edge
    // preferred distances, so the settled shape differs every refresh.
    const hawkOuterRadius = Math.max(hawkRx, hawkRy);
    const maxRingRadius = Math.max(1, Math.min(width, height) / 2 - nodeRadius * 2);
    const innerR = hawkOuterRadius + nodeRadius * 4;
    const outerR = Math.max(
      innerR + 28,
      Math.min(maxRingRadius, innerR + Math.min(width, height) * 0.38),
    );
    const meanR = (innerR + outerR) / 2;

    const linkDistance =
      sites.length > 0 ? (2 * Math.PI * meanR) / sites.length : 200;

    // Randomize per-edge preferred lengths slightly (breaks symmetry).
    links.forEach((l) => {
      l.dist = linkDistance * (0.75 + Math.random() * 0.6);
    });

    // Randomize initial positions in a bounded annulus around the hawk.
    // We do this on the client so each refresh looks different.
    sites.forEach((d) => {
      // Also ensure we never spawn *inside* (or touching) the hawk ellipse.
      // (hawkAvoidForce can recover, but this avoids visible overlap at start.)
      const spawnRx = hawkRx + nodeRadius * 2.5;
      const spawnRy = hawkRy + nodeRadius * 2.5;

      const isOutsideHawk = (x: number, y: number) => {
        const dx = x - hawkCx;
        const dy = y - hawkCy;
        const norm = (dx * dx) / (spawnRx * spawnRx) + (dy * dy) / (spawnRy * spawnRy);
        return norm >= 1;
      };

      let x = hawkCx;
      let y = hawkCy;
      let tries = 0;
      while (tries < 40) {
        const r = innerR + Math.random() * (outerR - innerR);
        const theta = Math.random() * 2 * Math.PI;
        x = hawkCx + r * Math.cos(theta);
        y = hawkCy + r * Math.sin(theta);
        if (isOutsideHawk(x, y)) break;
        tries++;
      }

      // If we got unlucky (or the annulus is tight), project out to the ellipse boundary.
      if (!isOutsideHawk(x, y)) {
        const dx = x - hawkCx;
        const dy = y - hawkCy;
        const norm = (dx * dx) / (spawnRx * spawnRx) + (dy * dy) / (spawnRy * spawnRy);
        const s = 1 / Math.sqrt(norm + 1e-9);
        x = hawkCx + dx * s;
        y = hawkCy + dy * s;
      }

      d.x = x;
      d.y = y;
      // Give the system a nudge so it doesn't always start settling from
      // near-identical states.
      d.vx = (Math.random() - 0.5) * 20;
      d.vy = (Math.random() - 0.5) * 20;
    });

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("overflow", "hidden")
      .style("cursor", "move")
      .style("overflow", "hidden");

    const g = svg.append("g");

    // zoom + pan
    let currentZoomTransform = d3.zoomIdentity;
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.015, 80])
      .on("zoom", (event) => {
        currentZoomTransform = event.transform;
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
          .distance((l) => (l.dist ?? linkDistance) as number)
      )
      .force("charge", d3.forceManyBody().strength(-380))
      .force("collide", d3.forceCollide<SimNode>(nodeRadius + 5))
      .alphaDecay(0.015)
      .velocityDecay(0.35);

    // Repel nodes from the hawk ellipse.
    // This makes it "impossible to cross" (at least for the nodes),
    // while the hawk image drawn on top blocks the lines visually.
    const hawkAvoidForce = () => {
      let simNodes: SimNode[] = [];
      const force = (alpha: number) => {
        for (const d of simNodes) {
          const x = d.x ?? hawkCx;
          const y = d.y ?? hawkCy;
          const dx = x - hawkCx;
          const dy = y - hawkCy;
          // Ellipse equation: (dx^2/rx^2) + (dy^2/ry^2) < 1
          const norm = (dx * dx) / (hawkRx * hawkRx) + (dy * dy) / (hawkRy * hawkRy);
          if (norm < 1) {
            // Gentle deadzone handling:
            // If inside the ellipse, partially project the node back toward
            // the ellipse boundary. The correction is small for slight touches
            // and grows with penetration depth.
            const penetration = 1 - norm; // 0..1
            const s = 1 / Math.sqrt(norm + 1e-9); // scale factor to the boundary

            const projectedX = hawkCx + dx * s;
            const projectedY = hawkCy + dy * s;

            // Correction factor: ~0.05 when just touching, up to ~0.65 deeper in.
            const correction = Math.min(0.65, 0.05 + penetration * 0.6);

            d.x = x + (projectedX - x) * correction;
            d.y = y + (projectedY - y) * correction;

            // Damp velocity to avoid "bouncing away" while still letting
            // the simulation settle naturally.
            const velDamp = 0.7 - correction * 0.25; // ~0.69 at touch, ~0.54 deeper
            d.vx = (d.vx ?? 0) * velDamp;
            d.vy = (d.vy ?? 0) * velDamp;
          }
        }
      };

      (force as any).initialize = (nodes: SimNode[]) => {
        simNodes = nodes;
      };

      return force as unknown as d3.Force<SimNode, SimLink>;
    };

    simulation.force("hawkAvoid", hawkAvoidForce());

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
        .style("border", "1px solid #b39670")
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

    // Hawk overlay rendered inside the SVG so it stays aligned with zoom/pan.
    const hawkGroup = g.append("g").attr("pointer-events", "none");
    const hawkImage = hawkGroup
      .append("image")
      .attr("href", "/goldenhawkbg.svg")
      .attr("xlink:href", "/goldenhawkbg.svg")
      .attr("x", hawkCx - hawkW / 2)
      .attr("y", hawkCy - hawkH / 2)
      .attr("width", hawkW)
      .attr("height", hawkH)
      .attr("preserveAspectRatio", "xMidYMid slice")
      // Deadzone logic still uses the ellipse radii; keep the artwork visible.
      .attr("opacity", 1);
    const hawkEllipse = hawkGroup
      .append("ellipse")
      .attr("cx", hawkCx)
      .attr("cy", hawkCy)
      .attr("rx", hawkRx)
      .attr("ry", hawkRy)
      .attr("fill", "none")
      // Hide the visible oval border (deadzone logic still uses hawkRx/hawkRy).
      .attr("stroke", "transparent")
      .attr("stroke-width", 2);

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
      // Keep zoom centered on the hawk deadzone, not just the current node bounds.
      const centerX = hawkCx;
      const centerY = hawkCy;

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
      width = newWidth;
      height = newHeight;

      svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);

      // Keep the hawk centered after layout/viewport changes.
      hawkCx = width / 2;
      hawkCy = height / 2;
      hawkW = Math.min(width, height) * 0.53;
      hawkH = hawkW * 0.62;
      hawkRx = Math.max(1, (hawkW / 2) * hawkDeadzoneScale);
      hawkRy = Math.max(1, (hawkH / 2) * hawkDeadzoneScale);

      hawkImage
        .attr("x", hawkCx - hawkW / 2)
        .attr("y", hawkCy - hawkH / 2)
        .attr("width", hawkW)
        .attr("height", hawkH);
      hawkEllipse
        .attr("cx", hawkCx)
        .attr("cy", hawkCy)
        .attr("rx", hawkRx)
        .attr("ry", hawkRy);

      simulation.alpha(0.2).restart();
    };
    window.addEventListener("resize", handleResize);
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);
    }

    return () => {
      simulation.stop();
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
      container.innerHTML = "";
    };
  }, [members]);

  const count = members.length;
  const countLabel = `${count} ${count === 1 ? "student" : "Hawks"}`;

  return (
    <div className="relative w-full overflow-hidden rounded-none border border-border bg-card shadow-sm ring-0">
      <div
        className="pointer-events-none absolute left-3 top-3 z-10 rounded-md border border-border bg-background/90 px-2.5 py-1 text-sm font-medium text-foreground/90 backdrop-blur-sm"
        aria-live="polite"
      >
        {countLabel}
      </div>

      <div
        ref={containerRef}
        className="w-full overflow-hidden"
        style={{ height: ringGraphHeight() }}
      />
    </div>
  );
}
