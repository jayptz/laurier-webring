"use client";

import { useEffect, useRef, useState } from "react";

export function WeBringTooltip() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () =>
      window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <span ref={rootRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="cursor-help bg-yellow-200 underline decoration-dotted underline-offset-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-purple/60"
        aria-label="What is a webring?"
        aria-expanded={open}
      >
        webring
      </button>

      <span
        className={[
          "pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-none bg-background/95 px-3 py-2 text-foreground text-xs leading-snug shadow-sm transition-opacity duration-150",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        A webring (or web ring) is a collection of websites linked
        together in a circular structure, usually organized around a
        specific theme, and often educational or social.
      </span>
    </span>
  );
}

