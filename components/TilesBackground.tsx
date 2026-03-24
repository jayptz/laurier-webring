"use client";

import { Tiles } from "./Tiles";

export function TilesBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -left-[15%] -top-[15%] h-[130%] w-[130%] opacity-[0.65]">
        <Tiles rows={56} cols={38} tileSize="md" className="h-full w-full" />
      </div>
    </div>
  );
}
