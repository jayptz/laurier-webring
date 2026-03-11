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
  "id": "your-name",
  "name": "Your Name",
  "url": "https://your-site.com",
  "tags": ["SWE", "AI"],
  "blurb": "A short description of what you do."
}
```

2. Open a pull request
3. Once merged, add the webring widget to your site's footer:

```html
<!-- WLU WebRing Widget -->
<div style="display:flex;justify-content:center;padding:16px 0;">
  <nav style="display:inline-flex;align-items:center;gap:16px;border:1px solid #E5E0FF;border-radius:9999px;background:#fff;padding:8px 20px;font-family:system-ui,sans-serif;font-size:14px;">
    <a href="https://laurier-webring.vercel.app/api/prev?from=YOUR_ID" style="color:#4B2E83;text-decoration:none;font-weight:500;">&larr; Prev</a>
    <a href="https://laurier-webring.vercel.app" style="display:flex;align-items:center;gap:6px;text-decoration:none;">
      <img src="https://laurier-webring.vercel.app/wlu-logo.png" alt="WLU" width="24" height="24">
      <span style="font-weight:600;color:#4B2E83;">WLU</span>
    </a>
    <a href="https://laurier-webring.vercel.app/api/next?from=YOUR_ID" style="color:#4B2E83;text-decoration:none;font-weight:500;">Next &rarr;</a>
  </nav>
</div>
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
