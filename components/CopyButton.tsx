"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded px-3 py-1 text-xs text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
