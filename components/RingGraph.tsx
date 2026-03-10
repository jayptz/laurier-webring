"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

type Member = {
  name: string;
  website: string;
  year?: string;
};

type RingGraphProps = {
  members: Member[];
  count?: number;
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

export function RingGraph({ members, count = 40 }: RingGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !members.length) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const nodeRadius = 8;
    const defaultNodeColor = "#B8B8B8";
    const highlightedNodeColor = "#4B2E83";
    const defaultEdgeColor = "#E5E5E5";

    // build node data (expand to `count` members)
    const sites: SimNode[] = [];
    for (let i = 0; i < count; i += 1) {
      const source = members[i % members.length];
      sites.push({
        id: `node-${i}`,
        name: `${source.name}${Math.floor(i / members.length) > 0 ? ` ${Math.floor(i / members.length) + 1}` : ""}`,
        website: source.website,
        year: source.year ?? "",
      });
    }

    // ring links
    const links: SimLink[] = sites.map((site, index) => ({
      source: site.id,
      target: sites[(index + 1) % sites.length].id,
    }));

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("cursor", "move");

    const g = svg.append("g");

    // zoom + pan
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
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
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(nodeRadius * 2))
      .alphaDecay(0.02)
      .velocityDecay(0.4);

    // edges
    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", defaultEdgeColor)
      .attr("stroke-opacity", 1)
      .attr("stroke-width", 1);

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

    node
      .append("circle")
      .attr("r", nodeRadius)
      .attr("fill", defaultNodeColor)
      .on("mouseover", function () {
        d3.select(this).attr("fill", highlightedNodeColor);
        svg.style("cursor", "pointer");
      })
      .on("mouseout", function (_event, d) {
        d3.select(this).attr("fill", getNodeColor(d));
        svg.style("cursor", "move");
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

      const padding = 50;
      minX -= padding;
      minY -= padding;
      maxX += padding;
      maxY += padding;

      const w = container.clientWidth || width;
      const h = container.clientHeight || height;

      const scale =
        Math.min(w / (maxX - minX), h / (maxY - minY)) * 0.7;
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

          const scale =
            Math.min(width / (maxX - minX), height / (maxY - minY)) * 0.9;
          const centerX = (minX + maxX) / 2;
          const centerY = (minY + maxY) / 2;

          svg
            .transition()
            .duration(750)
            .call(
              zoom.transform,
              d3.zoomIdentity
                .translate(width / 2, height / 2)
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
      simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
      simulation.alpha(0.3).restart();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      simulation.stop();
      window.removeEventListener("resize", handleResize);
      container.innerHTML = "";
    };
  }, [members, count]);

  return (
    <div
      ref={containerRef}
      className="h-[360px] w-full rounded-xl border border-purple-100"
    />
  );
}
