# WLU WebRing

A webring of Laurier CS student portfolios. Discover projects, meet builders.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Connect Your Site

Want to join the ring? Visit [/connect](http://localhost:3000/connect) for instructions.

### Quick steps

1. Fork this repo and add yourself to `data/members.json`:

```json
{
  "id": "your-id",
  "name": "Your Name",
  "url": "https://your-site.com",
  "tags": ["SWE", "Web"],
  "Role": "Your role / title (shown under your name)",
  "Year": "2027",
  "Github": "",
  "Linkedin": "",
  "X": ""
}
```

2. Open a pull request
3. Once merged, add the webring widget to your site's footer:

```react/jsx
<!-- WLU WebRing Widget (React/JSX) — points to https://laurier.network -->
import React from "react";

const WEBRING_URL = "https://laurier.network"; // e.g. https://laurier.network

export function WluWebRingWidget({ memberId = "YOUR_ID" }) {
  const prevHref = `${WEBRING_URL}/api/prev?from=${encodeURIComponent(memberId)}`;
  const nextHref = `${WEBRING_URL}/api/next?from=${encodeURIComponent(memberId)}`;

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
          ←
        </a>

        <a
          href={WEBRING_URL}
          style={{ display: "flex", justifyContent: "center", textDecoration: "none" }}
          aria-label="WLU WebRing home"
        >
          <img
            src={`${WEBRING_URL}/laurier-goldenhawk.svg`}
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
          →
        </a>
      </nav>
    </div>
  );
}
```

Replace `YOUR_ID` with your member id from `members.json`.

## API Routes

| Route | Description |
|---|---|
| `GET /api/members` | Returns the full member list |
| `GET /api/next?from=<id>` | Redirects to the next member (wraps around) |
| `GET /api/prev?from=<id>` | Redirects to the previous member (wraps around) |
| `GET /api/random` | Redirects to a random member |

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [D3.js](https://d3js.org) (force-directed graph)
