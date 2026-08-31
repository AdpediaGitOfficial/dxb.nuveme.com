# NUVÉ Properties

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4.
A luxury real-estate site built from one Figma artboard.

## Read this before changing anything visual

**[`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md)** carries every measurement taken from
the Figma file, the proportional rule that converts design pixels to `vw`, and
a "gotchas" section (§10) of problems that each cost real debugging time. It
exists so this work does not have to be re-derived from Figma. Read it, and
update it whenever a new measurement is taken.

[`README.md`](README.md) covers architecture, the SEO system, and how to swap
the sample content for real listings.

## The short version

- **1 design px = 0.05208vw.** The artboard is 1920 wide with a 1726 content
  column. Size anything new with that factor and clamp both ends. Use `cqw`
  against a container instead when the element repeats at different sizes.
- **The page ground is white**; dark sections are panels inset by a 4px rail
  (`panel` / `on-paper` utilities). Three sections sit on paper: Signature
  Properties, Client Testimonials, Prime Destinations.
- **Type colours come from `currentColor`** so the same ramp reads on either
  ground. Never hardcode ink or bone on `.eyebrow` / `.prose-lede`.
- **Verify numerically.** Sample pixels and read computed styles; do not judge
  fidelity by eye. Every miss in this project was caught by measuring.

## Conventions

- Server Components by default. Eleven modules ship JavaScript: the header,
  the hero video gate, the signature carousel, the listing quick view, the
  count-up figures, the enquiry dialog, the shared form controls, the three
  forms and the error boundary (`grep -rl '"use client"' src`). Prefer a link,
  a GET form, or `<details>` over new client state — and if a section really
  needs it, record why in `DESIGN-SYSTEM.md` §9.
- Read listings through `src/lib/repositories`, never `src/content` directly.
- Every route uses `buildMetadata()` and emits structured data via `<JsonLd>`.
- Overlays must be portalled to `document.body` — cards open stacking contexts.

## Commands

```bash
npm run dev
```

```bash
npm run typecheck && npm run lint
```

## Known gaps

`public/video/hero.mp4` is an untranscoded 4K master (83 MB, gitignored);
`src/content/*` is sample data; Saol Display is unlicensed so headings fall back
to Playfair. Details in `DESIGN-SYSTEM.md` §12.
