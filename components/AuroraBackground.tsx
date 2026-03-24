"use client";

import Aurora from "./Aurora";

export function AuroraBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    >
      <Aurora
        colorStops={["#5227FF", "#7cff67", "#5227FF"]}
        amplitude={1}
        blend={0.5}
      />
    </div>
  );
}
