import { RingWidget } from "../../components/RingWidget";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";
import { webringPublicUrl } from "@/lib/webringPublicUrl";

function buildReactEmbedSnippet(siteUrl: string) {
  return `<!-- WLU WebRing Widget (React/JSX) — points to ${siteUrl} -->
import React from "react";

const WEBRING_URL = "${siteUrl}"; // e.g. https://laurier.network

export function WluWebRingWidget({ memberId = "YOUR_ID" }) {
  const prevHref = \`\${WEBRING_URL}/api/prev?from=\${encodeURIComponent(memberId)}\`;
  const nextHref = \`\${WEBRING_URL}/api/next?from=\${encodeURIComponent(memberId)}\`;

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
      <nav
        style={{
          display: "grid",
          width: "100%",
          maxWidth: 448,
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          alignItems: "center",
          gap: 12,
          color: "#6B7280",
          fontSize: 16,
        }}
      >
        <a
          href={prevHref}
          style={{ justifySelf: "start", fontWeight: 500, textDecoration: "none", color: "#6B7280" }}
          aria-label="Previous member"
        >
          \u2190
        </a>

        <a
          href={WEBRING_URL}
          style={{ display: "flex", justifyContent: "center", textDecoration: "none" }}
          aria-label="WLU WebRing home"
        >
          <img
            src={\`\${WEBRING_URL}/laurier-goldenhawk.svg\`}
            alt="Golden Hawk"
            width={32}
            height={32}
            style={{ height: 32, width: 32, filter: "grayscale(100%)" }}
          />
        </a>

        <a
          href={nextHref}
          style={{ justifySelf: "end", fontWeight: 500, textDecoration: "none", color: "#6B7280" }}
          aria-label="Next member"
        >
          \u2192
        </a>
      </nav>
    </div>
  );
}`;
}

export default function ConnectPage() {
  const siteUrl = webringPublicUrl();
  const embedSnippet = buildReactEmbedSnippet(siteUrl);
  const memberJsonTemplate = `{
  "id": "your-id",
  "name": "Your Name",
  "url": "https://your-site.com",
  "tags": ["SWE", "Web"],
  "Role": "Your role / title (shown under your name)",
  "Year": "2027",
  "Github": "",
  "Linkedin": "",
  "X": ""
}`;
  return (
    <div className="min-h-screen px-6 py-16 sm:px-12 md:px-20 lg:px-32">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <a
            href="/"
            className="text-sm text-gray-700 underline decoration-purple/30 underline-offset-2 hover:decoration-purple"
          >
            &larr; Back to the <a className="text-purple-700">Wing</a>
          </a>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Connect Your Site
          </h1>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            Add the webring widget to your portfolio to link yourself with other
            Laurier CS students. Visitors can navigate between member sites
            using the &larr; Prev and Next &rarr; buttons. The embed below calls
            this ring at{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
              {siteUrl}
            </code>
            .
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
          <p className="mt-1 text-sm text-gray-500">
            This is what the widget looks like on your site:
          </p>
          <div className="mt-4 flex justify-center rounded-lg border border-border bg-card p-8">
            <RingWidget memberId="your-id" baseUrl={siteUrl} />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            How to Add It
          </h2>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-relaxed text-gray-600">
            <li>
              Open a{" "}
              <a
                href="https://github.com/jayptz/laurier-webring"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 underline decoration-purple/30 underline-offset-2 hover:decoration-purple"
              >
                pull request
              </a>{" "}
              to add yourself to{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                data/members.json
              </code>
            </li>
            <li>
              Once merged, replace{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                YOUR_ID
              </code>{" "}
              in the snippet below with your member id
            </li>
            <li>
              Paste the React/JSX component into your portfolio (e.g. footer)
              where you want the widget to appear
            </li>
          </ol>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            members.json entry (copy/paste)
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Replace the placeholders with your info. Leave socials blank if
            you don&apos;t want the icons shown.
          </p>
          <div className="relative mt-3">
            <CopyToClipboardButton
              text={memberJsonTemplate}
              ariaLabel="Copy members.json template"
            />
            <pre className="overflow-x-auto rounded-lg border border-border bg-card pr-14 p-4 text-xs leading-relaxed text-gray-700">
              <code>{memberJsonTemplate}</code>
            </pre>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            `Github`, `Linkedin`, and `X` must be full URLs (start with
            `https://`), not just usernames.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Embed Snippet
            </h2>
          </div>
          <div className="relative mt-3">
            <CopyToClipboardButton
              text={embedSnippet}
              ariaLabel="Copy widget embed snippet"
            />
            <pre className="overflow-x-auto rounded-lg border border-border bg-card pr-14 p-4 text-xs leading-relaxed text-gray-700">
              <code>{embedSnippet}</code>
            </pre>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Copy/paste this React/JSX component. Replace{" "}
            <code className="text-purple-600">YOUR_ID</code> with your member
            id from `members.json`.
          </p>
        </div>
      </div>
    </div>
  );
}
