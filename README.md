# Engineering portfolio

Next.js (App Router) + TypeScript, static, no database.

```
npm install
npm run dev        # http://localhost:3000
```

## Where things live

| Path | What |
|---|---|
| `content/projects.ts` | Featured projects: copy, figures, milestones, links. **Edit this, not components.** `composition` picks the homepage layout. |
| `content/robotics.ts` | Competition Robotics (Khronos + Orca) and the link to the separate robotics site. |
| `content/site.ts` | Name, intro, about, career aspirations, contact links. |
| `content/types.ts` | The content schema + `todo()` helper. |
| `components/` | Presentation only. `features/` holds the six homepage compositions; `diagrams/` holds code-drawn figures referenced by id. |
| `app/projects/[slug]/page.tsx` | Case-study template. A project gets a page when `pageReady: true`. |
| `public/projects/<slug>/` | Web-ready photos, CAD renders, figures, and video; set `src: "/projects/<slug>/file.webp"`. |
| `incoming/` | Raw uploads (not committed — see `.gitignore`). |

## Missing content

Anything not supplied yet is written as `todo("what is needed")` and renders as an orange
**MISSING** marker; figures without `src` render as a gridded placeholder. Markers show only in
development (`npm run dev`) and are hidden on the live site. Search `todo(` to find everything left.

Work that isn't finished goes in `planned`, which renders in a separate "Planned — not yet
completed" box, never alongside results.

## Hardware figures

Set `media` to `{ labels: ["Photo", "CAD"], a: {...}, b: {...} }` to get the Photo/CAD toggle.

## System diagrams and galleries

`howItWorks.system` takes stages of nodes (`{ label, sub?, detail }`) and draws an interactive
left-to-right diagram with every detail listed underneath. `howItWorks.gallery` adds extra figures.
Figure numbers are assigned automatically.

## Annotated figures

Add `annotations: [{ x: 32, y: 40, label: "Intake" }]` (percent positions) to any figure with a
`src` to draw numbered callouts and a legend.

## Deploy (Vercel, free Hobby plan)

1. Push this folder to a GitHub repository.
2. On vercel.com, **Add New → Project**, import the repository, and press **Deploy** (no settings to change).
3. Every later push to `main` redeploys automatically.

The site gets a free `*.vercel.app` address; a custom domain can be added under
**Project → Settings → Domains**. Social-preview links use Vercel's production domain automatically.
