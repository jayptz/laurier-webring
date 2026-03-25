"use client";

import { useState } from "react";

export default function CopyToClipboardButton({
  text,
  ariaLabel,
}: {
  text: string;
  ariaLabel: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function onCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = text;
        el.setAttribute("readonly", "true");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }

      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1200);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 1200);
    }
  }

  const label =
    status === "copied"
      ? "Copied"
      : status === "error"
        ? "Copy failed"
        : "Copy";

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={ariaLabel}
      className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-none border border-border bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
    >
      {status === "copied" ? (
        // Check icon
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : status === "error" ? (
        // Warning icon
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      ) : (
        // Clipboard/copy icon
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}

