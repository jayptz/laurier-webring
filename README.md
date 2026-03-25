# 𓅃 WLU WebRing

<img width="1048" height="416" alt="WLU WebRing Banner" src="https://github.com/user-attachments/assets/cde74cf8-c9dd-4c6e-af96-674faabe89e9" />

A community-driven webring for **Wilfrid Laurier University CS students and alumni** to showcase their portfolios and connect with each other.

---

##  Getting Started

```bash
npm install
npm run dev
```

Then open:  
https://laurier.network/

---

## 🔗 Join the WebRing

Want to be part of it? Head over to:  
 https://laurier.network/connect

### Quick Steps

1. **Fork this repo**
2. Add yourself to `data/members.json`:

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

3. Open a **pull request**
4. Once merged, add the **webring widget** to your site

---

##  WebRing Widget

Add this to your site's footer:

```jsx
import React from "react";

const WEBRING_URL = "https://laurier.network";

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

 Replace `"YOUR_ID"` with your ID from `members.json`.

---

## Customizing the Widget

The default widget (shown on the connect page):

<img width="681" height="111" alt="Default Widget" src="https://github.com/user-attachments/assets/ff22fffb-9c0f-4e7e-8be0-67b15c19392a" />

You can fully customize it to match your site’s design.

Example customization (from https://www.jayptz.me/):

<img width="686" height="97" alt="Custom Widget" src="https://github.com/user-attachments/assets/8e22e3f9-4c6d-4759-8050-26a7ef22a129" />

---

## API Routes

| Route | Description |
|------|------------|
| `GET /api/members` | Returns the full member list |
| `GET /api/next?from=<id>` | Redirects to the next member (wraps around) |
| `GET /api/prev?from=<id>` | Redirects to the previous member (wraps around) |
| `GET /api/random` | Redirects to a random member |

---

##  Tech Stack

- **Next.js** (App Router)  
- **Tailwind CSS**  
- **D3.js** (force-directed graph)

---


##  Support

If you like this project:

- ⭐ Star the repo  
-  hare it with other Laurier devs  
-  Add your portfolio  

---

If you're one of us, we welcome you with open arms (or in this case, open PRs).
