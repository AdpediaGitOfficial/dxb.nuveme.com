# NUVÉ Properties

A production-ready Next.js implementation of the NUVÉ Properties luxury real-estate
site, built from the Figma design
([node 981:431](https://www.figma.com/design/CgVUqw6maYFLVXCPomFEaT/NUVE?node-id=981-431)).

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4

> **Building a new page? Read [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) first.**
> It carries every measurement taken from the Figma file, the proportional
> rule that converts them, and the gotchas worth not rediscovering.

---

## Getting started

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` in every environment — canonical URLs, the sitemap,
`robots.txt` and Open Graph image URLs are all derived from it. `robots.ts`
disallows all crawling unless the origin is the production domain, so preview
deployments cannot be indexed by accident.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (`next/core-web-vitals` + TypeScript) |
| `npm run typecheck` | `tsc --noEmit` |

---

## Architecture

```
src/
├── app/                    Routes, metadata, sitemap, robots, manifest
├── components/
│   ├── layout/             Container, Section, header, footer, breadcrumbs
│   ├── home/               One component per home-page section
│   ├── ui/                 Reusable primitives (cards, buttons, accordion…)
│   └── seo/                JSON-LD emitter
├── content/                Typed content — the current source of truth
├── lib/
│   ├── repositories/       Async data access (the CMS/API seam)
│   ├── jsonld.ts           schema.org builders
│   ├── seo.ts              Metadata factory + formatters
│   └── utils.ts
└── types/                  Domain types
```

### The scaling seam

Pages never import from `src/content` directly for listings — they call the
async functions in `src/lib/repositories`. Those functions already have the
shape a network call would have:

```ts
const featured = await listProperties({ limit: 8 });
const property = await getPropertyBySlug(slug);
```

To move listings onto a CMS, the DLD feed or a developer API, rewrite the bodies
of `listProperties`, `getPropertyBySlug`, `listPropertySlugs` and
`listRelatedProperties`. Pages, components, structured data and the sitemap
all keep working unchanged, because they depend on the `Property` type in
`src/types`, not on where the data came from.

The same applies to communities via `src/lib/repositories/communities.ts`.

### Rendering strategy

Everything is a Server Component by default. Only three components ship
JavaScript:

| Component | Why it is a client component |
| --- | --- |
| `SiteHeader` | Menu state, scroll state, Escape-to-close |
| `SignatureCarousel` | Scroll-snap tracking, and the detail panel that slides in when the carousel reaches the viewport |
| `ContactForm` | `useActionState` for progressive form feedback |

Deliberately **not** client components:

- **Hero search** — a plain GET form posting to `/properties`. Every search
  produces a real, shareable, crawlable URL and works with JS disabled.
- **FAQ accordion** — native `<details>`/`<summary>`, so answers are in the
  initial HTML (and therefore indexable) and expand without JavaScript.
- **Listing intent tabs** — links to `/properties?intent=…` rather than
  client-side filters, so each state is its own indexable URL.

Result: ~102 kB of shared JS, and the home page adds 1.7 kB on top.

---

## SEO

Every page is rendered on the server with its content in the initial HTML.

**Metadata.** `buildMetadata()` in `src/lib/seo.ts` is the single factory for
every route — title, description, canonical, robots directives, Open Graph and
Twitter cards. Using one helper means canonical policy is one edit, not a sweep
across the app directory.

**Structured data** (`src/lib/jsonld.ts`), emitted as a `@graph` with stable
`@id`s so nodes cross-reference each other:

| Schema | Where |
| --- | --- |
| `RealEstateAgent` + `WebSite` (with `SearchAction`) | Root layout, once |
| `FAQPage` | Home, `/faqs` |
| `ItemList` | Home, `/properties`, `/communities`, `/services` |
| `Residence` + `Product` with `Offer` | `/properties/[slug]` |
| `Place` | `/communities/[slug]` |
| `BreadcrumbList` | Every interior page, matching visible breadcrumbs |

**Also covered**

- `sitemap.ts` — static routes plus every listing and community, with real
  `lastModified` dates from the content.
- `robots.ts` — production-only indexing, with the sitemap and host declared.
- `manifest.ts`, SVG favicon, Apple touch icon, theme colour.
- One `<h1>` per page and a clean `h2`/`h3` outline throughout.
- Descriptive `alt` text on every image; decorative art is `aria-hidden`.
- Faceted listing views canonicalise back to `/properties` so filter
  combinations do not compete in the index.
- DLD permit numbers rendered on listing pages, as UAE listing rules require.

### Hero video

`public/video/hero.mp4` is a **4K master — 3840 x 2160, 31.6s, 83 MB at
22 Mbps** — and is gitignored for that reason. It needs transcoding before
launch; a hero loop should be 1080p at 2–4 Mbps, or roughly 8–12 MB:

```bash
ffmpeg -i public/video/hero.mp4 -vf scale=1920:-2 -c:v libx264 -crf 26 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an public/video/hero-1080.mp4
```

Add a WebM alongside it for a further saving, and list it first in
`HeroMedia` so browsers that support it never fetch the MP4:

```bash
ffmpeg -i public/video/hero.mp4 -vf scale=1920:-2 -c:v libvpx-vp9 -crf 34 -b:v 0 -an public/video/hero-1080.webm
```

`HeroMedia` already limits the damage: the poster is the LCP element and ships
in the server HTML, and the `<source>` is only attached after a client check,
so the file is never fetched under `prefers-reduced-motion`, below 768px, or on
Save-Data / 2G-3G connections. The poster is the video's own opening frame, so
the hand-off between still and footage is invisible.

### Performance

- `next/font` self-hosts Lexend Deca and the Playfair Display fallback — no
  render-blocking request to Google, no layout shift.
- All photography is pre-sized WebP under `public/images`, served through
  `next/image` with per-grid `sizes` and AVIF/WebP negotiation.
- The hero is `priority` + `fetchPriority="high"`; everything else is lazy.
- Monochrome icons are static SVGs painted with a CSS mask, so each glyph is
  one cached request rather than repeated inline markup.
- `/images/*` is served with a one-year immutable cache header.

### Accessibility

Skip link, semantic landmarks, labelled sections, visible focus rings,
`aria-current` on active navigation, a live region on the carousel and the
contact form, `prefers-reduced-motion` honoured globally, and form errors
wired up with `aria-invalid` / `aria-describedby`.

---

## Security

Reviewed end to end on 31 August 2026. What is in place, and what is not.

**Headers.** `next.config.ts` sets a Content-Security-Policy plus HSTS,
`nosniff`, `X-Frame-Options`, `Referrer-Policy` and a `Permissions-Policy` that
denies camera, microphone, geolocation and topics. Fonts are self-hosted by
`next/font`, so the policy needs no external font origin; the office map is the
only `frame-src` entry.

`script-src` carries `'unsafe-inline'`, which is the one real weakness: Next
injects an inline bootstrap script on every page and the alternative is a
per-request nonce, which needs middleware this build does not have. The rest of
the policy still does work an XSS cannot undo — `object-src 'none'`,
`base-uri 'self'` (a `<base>` tag cannot rewrite every relative URL) and
`form-action 'self'` (an injected form cannot post elsewhere). Add a nonce
middleware and drop `'unsafe-inline'` if the site ever ships third-party script.

**Forms.** All four server actions validate on the server, so validation holds
whether or not the client bundle loaded, and every enumerated field
(language, time slot, property type, purpose, bedrooms) is checked against its
allow-list rather than trusted. `src/lib/forms.ts` adds two things the browser
cannot enforce:

- **Length caps.** `maxlength` is a hint to a person, not a control. Without a
  server-side cap a single field can carry the whole request-body allowance —
  5MB since the careers CV upload raised it — and that payload then has to be
  validated, echoed into a reply and logged.
- **Log sanitising.** Every value written to a log line goes through `forLog`,
  which strips control characters and caps length. A newline in a name is
  otherwise enough to forge a second log entry that no reader or aggregator can
  distinguish from a real one. The CV's *filename* goes through it too — it is
  chosen by the uploader and is no more trustworthy than the fields.

**Injection.** `JsonLd` escapes `<` so a value containing `</script>` cannot
break out of the structured-data block. It is the only
`dangerouslySetInnerHTML` on the site. Reflected search params are rendered as
text by React, and the one params-driven lookup uses `Object.hasOwn` so
`?intent=constructor` cannot walk the prototype chain into the `<title>`. Every
outbound `target="_blank"` carries `rel="noopener noreferrer"`. There are no
redirects taking user input, and no raw SQL or shell anywhere.

### Known gaps

- **No rate limiting.** The forms are protected by a honeypot, which stops
  naive bots and nothing else. Anyone can submit any form as fast as they can
  post to it. Put a limiter in front of the actions — by IP and by email —
  before launch; this is the largest remaining hole.
- **The CV is validated but never stored**, and the applicant is told it was
  received. See `DESIGN-SYSTEM.md` §12.
- **File type is checked by extension and MIME only**, both of which the
  uploader controls. That is enough while the bytes are discarded; check magic
  bytes, and never serve the file back from an origin that can execute it, once
  storage is wired up.
- **`serverActions.bodySizeLimit` is 5MB for every action**, not only the one
  that takes a file. The length caps mean the text forms cannot exploit that,
  but a per-action limit would be better if Next ever offers one.
- **Two advisories remain**, both against the `postcss@8.4.31` that Next
  bundles. They are build-time issues (source-map path traversal, `</style>`
  escaping) against our own CSS, not attacker input, and the only fix offered
  is a major bump to a Next 16 preview. Re-check on each Next release.

## Design fidelity

**Ground and panels.** The page ground is white. The dark sections are panels
laid on it, inset by a 4px rail (`--rail`) so a hairline of ground frames each
one — left, right, and as a seam where two panels meet. Three sections sit
directly on the ground with dark type: Signature Properties, Client
Testimonials and Prime Destinations. The `panel` and `on-paper` utilities in
`globals.css` carry this, and `.eyebrow` / `.prose-lede` take their colour from
`currentColor` so the same type ramp reads correctly on either ground.

Colours, spacing and the type ramp are tokenised in `src/app/globals.css`
under `@theme`, taken from the Figma file. Photography, developer logos, the
wordmark and every icon are the real exported assets.

**Fonts.** Two faces carry the site: **Saol Display** for headings and
**Lexend Deca** for everything else. Saol is licensed and not in the repo —
`@font-face` rules point at `public/fonts/` and `--font-display` falls back to
Playfair Display until the WOFF2 is dropped in. See `public/fonts/README.md`.

**Responsive.** The design is a single 1920 px artboard with a 1726 px content
column, reproduced as `min(89.9vw, 1726px)`. One design pixel is therefore
0.05208vw, and the whole type ramp is expressed that way — a 60 px Figma
heading is `3.125vw`, clamped at both ends. Type and layout stay in proportion
to the artboard at every width rather than only at 1920. The stats panel goes
further and uses `cqw` against itself, so its internal geometry holds at any
panel size.

---

## Content

`src/content/*` currently holds **sample listings** written to exercise every
field and card state (the Figma file uses `AED 0000000` placeholders
throughout). Replace it with real inventory — or wire up the repositories —
before launch. Prices, permit numbers, handover dates and developer
attributions in that folder are illustrative and not real listings.

The contact form validates server-side and currently logs the enquiry. Point
`submitEnquiry` in `src/app/contact/actions.ts` at the CRM or transactional
email provider; the marked `TODO` is the only line that needs to change.

---

## Routes

| Route | Rendering |
| --- | --- |
| `/` | Static |
| `/properties` | Dynamic (reads search params) |
| `/properties/[slug]` | SSG via `generateStaticParams` |
| `/communities` | Static |
| `/communities/[slug]` | SSG via `generateStaticParams` |
| `/about`, `/services`, `/faqs`, `/contact` | Static |
| `/privacy-policy`, `/terms-of-service` | Static |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Generated |
