# NUVÉ design system

Everything here was measured off the Figma file and verified against the built
page. Follow it when adding a page and you will not need to reopen Figma.

**Source:** [NUVE](https://www.figma.com/design/CgVUqw6maYFLVXCPomFEaT/NUVE?node-id=981-431),
page `981:430` ("Latest"). Eleven 1920-wide artboards, one per route. Node ids
are cited throughout so any value can be re-checked.

| Artboard | Node | Height | Route |
| --- | --- | --- | --- |
| Nuve (home) | `981:431` | 9158 | `/` |
| about us | `981:1052` | 7897 | `/about` |
| service | `981:1288` | 6349 | `/services` |
| careers | `981:1486` | 4574 | `/careers` |
| contact | `981:1650` | 4656 | `/contact` |
| List Your Property | `981:1841` | 4687 | `/list-your-property` |
| explore communities | `981:2023` | 5625 | `/communities` |
| blog | `981:2235` | 4435 | `/blog` |
| blog details | `981:2416` | 5420 | `/blog/[slug]` |
| rent | `981:2586` | 5538 | — |
| Nuve - off plan | `981:2911` | 8375 | `/off-plan` |

---

## 1. The proportional rule

The artboard is a fixed 1920px canvas with a 1726px content column. The
container reproduces that as `min(89.9vw, 1726px)`, so:

> **1 design px = 0.05208vw**

Convert every Figma measurement with that factor and the layout holds at any
width instead of only at 1920. Clamp both ends so small screens stay readable
and the artboard size pins on large ones.

```
font-size: clamp(<floor>, <px × 0.05208>vw, <px>px)
```

Worked examples: 60px heading → `3.125vw`; 20px body → `1.042vw`; 483px
crosshair → `25.155vw`.

**Use `cqw` instead when the element repeats at different sizes** — a card in a
three-, four- or five-column grid. Put `@container` on the card and measure
against the card, not the viewport. See §7.

---

## 2. Tokens

All in `src/app/globals.css` under `@theme`.

| Token | Value | Use |
| --- | --- | --- |
| `--color-paper` | `#ffffff` | Page ground |
| `--color-ink` | `#000000` | Dark panels |
| `--color-surface` | `#0e0e0e` | Raised blocks inside a panel |
| `--color-hairline` | `rgba(255,255,255,0.12)` | Rules on dark |
| `--color-hairline-strong` | `rgba(255,255,255,0.24)` | Emphasised rules |
| `--color-bone` … `-faint` | white at 1 / .88 / .7 / .6 / .4 | Text on dark |
| `--rail` | `0.25rem` (4px) | Gutter framing every dark panel |
| `--container-shell` | `107.875rem` (1726px) | Content column |
| `--canvas-shell` | `120rem` (1920px) | Outer cap — see §3 |
| `--ease-editorial` | `cubic-bezier(0.22, 1, 0.36, 1)` | Hovers, small moves |
| `--ease-wipe` | `cubic-bezier(0.62, 0.04, 0.3, 0.98)` | Wipes, slides, marquee |

**Typefaces.** Saol Display for headings, Lexend Deca for everything else.
Saol is licensed and absent — `@font-face` points at `public/fonts/` and
`--font-display` falls back to Playfair Display. See §10 for the two values
that want reverting when Saol lands.

---

## 3. Ground, panels and the rail

The page ground is **white**. Dark sections are panels laid on it, inset by the
4px rail so a hairline of ground frames each one — sides and top, reading as a
seam where two panels meet.

```
@utility panel     → bg ink, text bone, margin-inline & margin-top = --rail
@utility on-paper  → bg paper, text ink
```

Home page band order (measured):

| Section | Ground |
| --- | --- |
| Hero | dark, full-bleed (no rail) |
| About | panel |
| Signature Properties | **paper** |
| Premium Listings | panel |
| Client Testimonials | **paper** |
| Our Trusted Partners | panel |
| Prime Destinations | **paper** |
| FAQ + footer | panel |

About page band order (measured, node 981:1052):

| Section | Ground |
| --- | --- |
| Hero | dark, full-bleed (no rail) |
| A Legacy of Trust | panel |
| From Vision to Value | **paper** |
| A Message from Our Founders | panel |
| Our Story | panel (full-bleed photograph) |
| Meet Our Team | panel |
| Our core values | **paper** |
| Our Achievements + footer | panel |

Service page band order (measured, node 981:1288):

| Section | Ground |
| --- | --- |
| Hero | dark, full-bleed (no rail) |
| Our Expertise, Your Advantage | **paper** |
| Let's Find Your Perfect Property | panel (full-bleed photograph) |
| Our Trusted Partners + footer | panel |

Careers page band order (measured, node 981:1486):

| Section | Ground |
| --- | --- |
| Hero | dark, full-bleed (no rail) |
| Build Your Future With NUVÉ | panel |
| Life at NUVÉ | **paper** |
| Ready To Build Your Career + footer | panel |

Contact page band order (measured, node 981:1650):

| Section | Ground |
| --- | --- |
| Hero | dark, full-bleed (no rail) |
| Your Next Property Move Starts Here | panel |
| Office map | panel (full-bleed map) |
| Frequently Asked Questions + footer | panel |

The FAQ block is the same object as the home page's, down to the 46.8% list
and the arch watermark, so `FaqSection` drops in unchanged.

Off-plan band order (measured, node 981:2911):

| Section | Ground |
| --- | --- |
| Hero | dark, full-bleed (no rail) |
| Discover NUVÉ Properties | **paper** heading, full-bleed showcase |
| Exclusive Off-Plan Developments | panel |
| Let NUVÉ Guide You | **paper** |
| Looking To Buy A Property | panel |
| Frequently Asked Questions + footer | panel |

Communities band order (measured, node 981:2023):

| Section | Ground |
| --- | --- |
| Hero | dark, full-bleed (no rail) |
| discover Dubai's biggest communities | panel |
| Explore Dubai's Top Off-Plan Investments | **paper** |
| Frequently Asked Questions + footer | panel |

The FAQ block is the same object as the home and contact pages', so
`FaqSection` drops in unchanged.

List Your Property band order (measured, node 981:1841):

| Section | Ground |
| --- | --- |
| Hero | dark, full-bleed (no rail) |
| Why list your property with us? | panel |
| Listing enquiry | **paper** |
| How Does It Work? + footer | panel |

Article page band order (measured, node 981:2416):

| Section | Ground |
| --- | --- |
| Hero | dark, full-bleed (no rail) |
| Article + recent-posts rail | **paper** |
| Let's Find Your Perfect Property | panel (full-bleed photograph) |
| Footer | panel |

Blog page band order (measured, node 981:2235):

| Section | Ground |
| --- | --- |
| Hero | dark, full-bleed (no rail) |
| Insights That Keep You Ahead | **paper** |
| Let's Find Your Perfect Property | panel (full-bleed photograph) |
| Footer | panel |

The consultation band is the same object as the service page's, so
`ConsultationSection` drops in unchanged.

The one older interior page — `explore communities`, written before its
artboard landed — is still a single `<Panel>` from masthead to the end of
content.

**The container cap is on the content, not the border box.** `max-width` bounds
the padded box, so capping at 1726 would leave 1726 − 2×97 = 1532 of content
and narrow the whole site above 1440. Hence `--canvas-shell` (1920) as the
outer cap with the gutter clamped at its 97px artboard value:

```
mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-[min(5.05vw,6.0625rem)]
max-w-(--canvas-shell)
```

Verified content column: 1287 @1440 · 1718 @1920 · 1726 @2560.

Everything inside a panel sits ~4px in from the artboard on each side, because
the design measures its 97px gutter from the page edge while the container sits
inside the rail. Consistent site-wide; left as is.

---

## 4. Type ramp

`.eyebrow` `.display-1/2/3` `.prose-lede` in `globals.css`. **Colours come from
`currentColor`** (eyebrow at 60% opacity, lede at 72%) so the same ramp reads on
either ground — never hardcode ink or bone on these.

| Class | Figma | vw | Clamp |
| --- | --- | --- | --- |
| `.eyebrow` | 20px, 0.3em tracking | 1.042 | 0.6875rem – 1.25rem |
| `.display-1` | 100px | 5.209 | 2.5rem – 6.25rem |
| `.display-2` | 60px | 3.125 | 1.75rem – 3.75rem |
| `.display-3` | 36px | 1.875 | 1.25rem – 2.25rem |
| `.prose-lede` | 20px, 1.45 | 1.042 | 0.9375rem – 1.25rem |
| `.prose-body` | 20px, 1.4 | 1.042 | 0.9375rem – 1.25rem |

**Two body ramps are drawn, not one.** The home artboard sets body copy in
Lexend Light at 1.45 with a -0.02em track at 72% ink — that is `.prose-lede`.
The interior artboards set it in Lexend **ExtraLight** at 1.4, untracked, at
80% — that is `.prose-body` (node 981:1088). Use the second on interior pages.

The interior hero (`PageHero`) is its own pair and does not use `.eyebrow`:
the eyebrow is 22px at 0.3em in **full** white rather than 60%, and the display
line is 80px (`4.167vw`) rather than the home hero's 100px.

Eyebrows are **not** uppercased — the design sets them in sentence or title case
with wide tracking ("Curated luxury real estate"). No `text-transform`.

Don't cap headings with `ch` units. Playfair is wider than Saol, so an `18ch`
cap that fits in Figma breaks to an extra line here and shifts everything below
it. Give the heading its column and let it wrap naturally.

---

## 5. Section rhythm

Standard section padding is `py-14 sm:py-16 lg:py-20`. Sections that deviate,
with the measured reason:

| Section | Padding | Why |
| --- | --- | --- |
| About | `lg:py-16` | Figma gives the panel 80% of a 638px section |
| Signature | `lg:pt-[5.729vw] lg:pb-0` | The band ends flush on the carousel |
| Partners | `lg:pt-[4.167vw] lg:pb-[7.865vw]` | Eyebrow at 80, 151 below the rail |
| FAQ | `lg:pt-[4.167vw] lg:pb-[6.25vw]` | Eyebrow at 80 |

About page (node 981:1052):

| Section | Padding | Why |
| --- | --- | --- |
| A Legacy of Trust | `lg:py-[4.43vw]` | 655 × 681 figures panel centred in an 850 band |
| From Vision to Value | `lg:pt-[5.73vw] lg:pb-[7.5vw]` | Eyebrow at 110, rules end 144 above the fold |
| Founders | `lg:pt-[5.52vw] lg:pb-[5.94vw]` | The letter sets the height; the card overhangs it |
| Our Story | `lg:aspect-[1912/950]` | The band is sized by its photograph |
| Meet Our Team | `lg:pt-[5.73vw] lg:pb-[4.58vw]` | Eyebrow at 110 |
| Our core values | `lg:pt-[7.81vw] lg:pb-[7.29vw]` | Eyebrow at 150 |
| Our Achievements | `lg:pt-[10.52vw] lg:pb-[5.73vw]` | Set from the trophy row, not the text |

Service page (node 981:1288):

| Section | Padding | Why |
| --- | --- | --- |
| Our Expertise | `lg:pt-[6.77vw] lg:pb-[4.43vw]` | Eyebrow at 130 below the hero |
| Consultation | `lg:aspect-[1912/1000]` | The band is sized by its photograph |
| Trusted Partners | `lg:pt-[4.32vw] lg:pb-[4.79vw]` | Eyebrow at 83 |

Careers page (node 981:1486):

| Section | Padding | Why |
| --- | --- | --- |
| Build Your Future | `lg:py-[4.4vw]` | Same 655 × 681 block centred in an 850 band as the About Legacy section |
| Life at NUVÉ | `lg:pt-[7.29vw] lg:pb-[6.25vw]` | Eyebrow at 140; the photo's foot sets the floor |
| Ready To Build | `lg:pt-[6.09vw] lg:pb-[5.73vw]` | Eyebrow at 117 |

Contact page (node 981:1650):

| Section | Padding | Why |
| --- | --- | --- |
| Enquiry | `lg:py-[7.29vw]` | 140 top and bottom; the photograph spans the column |
| Office map | `lg:aspect-[1912/883]` | The band is sized by the map |
| FAQ | unchanged | Eyebrow at 80, 120 below the list — the home values |

Blog page (node 981:2235):

| Section | Padding | Why |
| --- | --- | --- |
| Insights | `lg:py-[6.77vw]` | Eyebrow at 130 below the hero, 130 above the band |

Off-plan page (node 981:2911):

| Section | Padding | Why |
| --- | --- | --- |
| Showcase | `lg:pt-[6.77vw]` | Eyebrow at 130; the strip runs to the panel below |
| Listings | `lg:pt-[6.56vw] lg:pb-[5.208vw]` | Eyebrow at 126, pagination 100 above the fold |
| Guide | `lg:pt-[10.99vw] lg:pb-[6.98vw]` | Eyebrow at 211 |
| Looking to buy | `lg:py-[5.938vw]` | 114 either side of an 865-tall block |

Communities page (node 981:2023):

| Section | Padding | Why |
| --- | --- | --- |
| Communities grid | `lg:pt-[6.56vw] lg:pb-[6.77vw]` | Eyebrow at 126 |
| Off-plan | `lg:py-[7.292vw]` | 140 either side of an 865-tall block |

List Your Property (node 981:1841):

| Section | Padding | Why |
| --- | --- | --- |
| Why list | `lg:pt-[6.25vw] lg:pb-[3.698vw]` | Eyebrow at 120; the sixth reason ends 71 above the fold |
| Listing enquiry | `lg:pt-[6.77vw] lg:pb-[4.74vw]` | The photograph hangs 34 above and below the form |
| How Does It Work | `lg:pt-[3.073vw] lg:pb-[5.833vw]` | Eyebrow at 59, steps at 261 |

**Heading measures are set in `vw`, not `%`.** A percentage is resolved against
the grid column the heading lands in, which is narrower than the content column
by the gap and the aside — passing `45.25%` for a 781px measure produced 463.
`SectionIntro` takes a `titleClassName` for this: `lg:max-w-[40.68vw]` is 781px,
`lg:max-w-[27.81vw]` is 534px, and both scale with §1.

**Supporting column width is per-section, and it decides the line count.** Pass
`asideWidth` to `SectionIntro`:

| Section | Figma | Share | Lines |
| --- | --- | --- | --- |
| Signature | 639px | 37% | 2 |
| Testimonials | 639px | 37% | 3 |
| Prime Destinations | 515px | 29.8% | 3 |
| Partners | 471px | 27.3% | 3 |
| FAQ | 547px | 31.7% | 2 |

---

## 6. Glass surfaces

Four, all distinct. Copy the exact values.

| Surface | Fill | Blur | Node |
| --- | --- | --- | --- |
| Hero search bar | `rgba(0,0,0,0.2)` | 7.5px | 981:465 |
| Search field wells | `rgba(0,0,0,0.7)` | — | 981:471 |
| Carousel detail panel | `rgba(0,0,0,0.4)` | 14px | I981:535;621:250 |
| Listing card plate | `rgba(0,0,0,0.45)` | 14px | 981:839 |
| Card WhatsApp pill | none, `0.6px rgba(255,255,255,0.48)` border | 7.5px | 981:842 |

The **search bar is one continuous notched panel**, not a tab strip plus a bar.
Its Figma outline `M0 65H665V0H1061V65H1726V208H0Z` becomes a proportional
clip-path: the notch spans 38.5%–61.5% and rises the tab row's height. The
active tab is the same glass with a hairline border — a solid fill breaks the
frosted surface.

The card plate is **inset from the card edges** (11px sides, 20px bottom), not
bled to them. A gradient scrim is the wrong thing: the plate is an object
sitting on the photo.

---

## 7. Component geometry

Measured values; all verified in the browser.

**Listing card** (`PropertyCard`) — card is a `@container`, everything in `cqw`
against it (450px artboard card):

```
plate inset 11/450 → 2.44%    padding 17/450 → 3.78cqw
price 25px → 5.56cqw          name 20px → 4.44cqw
location & specs 16px → 3.56cqw   expand control 44/450 → 9.78cqw
```

**Listing grid** — breaks out of the content column: cards run 25px from the
section edge (1857 of 1912, 97%) while the heading stays in the column. Gutters
**19px between columns, 28px between rows** (`lg:gap-x-[0.99vw] lg:gap-y-[1.458vw]`).

**Gutter crosshair** — `public/icons/ui/crosshair-grid.svg`, one 483px unit
centred on each of the three column boundaries at the row boundary, `lg` only.
Its strokes are **off-centre in the box** (vertical at x=249.25, horizontal at
y=237.75 of 483), so position by the strokes, not the box centre:

```
left: calc(<24.74 | 50 | 75.26>% - 12.981vw)   top: calc(50% - 12.382vw)
```

**Stats panel** (`StatsPanel`, 655 × 681) — `cqw` against the panel:

```
figure 4.9cqw (see §10)   label 3.05cqw    body 2.9cqw
left inset 6.56cqw        right column +13.21cqw
top 9.3cqw / bottom 8.85cqw   body measure 31.15cqw
```

Top row hangs from the top, bottom row sits on the floor, crosshair
(`crosshair.svg`, gradient strokes fading at both ends) centred at 46.3%.

**Testimonial card** (319 × 405) — padding 40 top/bottom, 18 left, 17 right;
quote 20px at leading 1.3; name ~22px, role ~14px, ordinal ~18px.

Two drawn states. **The first column is filled**: `981:798` is a solid `#000`
fill with *no* stroke, its quote white at 60% and its stars gold (`#FBBD00`).
The other three (`981:773`, `981:781`, `981:791`) have no fill and a
`0.6px rgba(0,0,0,0.4)` inside stroke, with the quote black at 60% and black
stars. Hover takes an outlined card to the filled state.

The filled column is a state the file commits to, not a hover demonstration —
an earlier pass read it as the latter and shipped all four outlined, so
`TestimonialCard` now takes `active` and the section sets it on index 0. The
active card hands the fill over while another card is hovered, so only one is
ever filled; the selector that does it is in §8.

Columns are split by vertical hairlines 20px before each card (6.27% of a
card), full column height — not rules above each one.

**Carousel** — 1912 × 1000 (`aspect-1912/1000`). Detail panel 36.2% wide,
parked at `translate-x-full` and revealed by an IntersectionObserver at 0.45.

**About: vision columns** — rules at 0, 607 and 1214 of the 1726 column, so
the three are *not* equal: `lg:grid-cols-[35.17%_35.17%_29.66%]`. Each rule is
0.5px at 40% ink and runs the full 478px of the row, 37 clear at each end. The
label sits 38 right of its rule; the ordinal is Saol 180 at **8%** ink (10%
fill inside a layer at 80% opacity), pinned to the 123px box the glyphs occupy
so the rhythm holds in the Playfair fallback.

**About: founder card** — a 737 × 639 block whose top is 37 *above* the first
line of the letter and whose foot clears the panel by 46. The panel height is
set by the letter, so the card is positioned absolutely rather than left to
stretch the grid row. Plate 368 wide in `#0f0f0f` with the quotation mark cut
out of its lower-left corner; portrait 352 wide starting 272 into the block.

**About: story band** — 1912 × 950. The photograph carries a black gradient
from 60% to clear, top to bottom (verified by sampling: the band reads 0.44×
the source at its top edge and 0.85× two-thirds down). The biography plate is
45% black over a **28px** backdrop blur — the same object as the listing-card
plate at twice the blur — spanning the content column, 70 above the band foot,
text inset 42.

**About: team card** — 425 × 549 with **8px** gutters; caption plate inset 12
on three sides at 28% black over a 28px blur, the name 41 below the plate top.
Portraits are black and white: three of the four carry a −100% saturation
filter in the file and the fourth does not, which is a slip — the set is
desaturated in CSS. Tabs are 2 × 214 × 65 pinned right, the active one solid
white on black text, the idle one a 0.6px white-50% hairline over a 15px blur.

**About: values table** — photograph 489 × 516 at the content edge; table 1147
wide from x 676, columns `[10.29%_32.26%_57.45%]`. The rules are **not**
centred between rows: 23 below the row they close and 45 above the next, which
is what lands the last one exactly on the foot of the photograph.

**About: awards row** — 986 wide, right-aligned; four 155 × 254 trophies on a
122 gutter, so a 277 pitch. It scrolls on the same rail as the partner logos
(see §8). Both ends are faded into the panel by a 130px black gradient, which
is what the rail scrolls out of: in the render the outer two trophies mean 63
and 68 against 103 for the inner two.

The trophy cards are **not** rounded by the node — `cornerRadius` is 0 on all
four. The rounded card, its 3px inset inside the 155 × 254 slot and its ~10px
radius are all baked into the source photograph, and Figma has no transparent
export for it: every export mattes the node onto **white**, so a naive alpha
knock-out leaves a white halo around each card. The assets are rebuilt by
un-matteing the 3× export against an analytic rounded-rect mask fitted to the
render (inset 3, radius 10 — the best of a 4 × 6 sweep scored on the corner
patches). Composited back over black, the result differs from the design render
by a mean of 2.8/255. If these are ever re-exported, do the same — do not
threshold the white away.

**Service card** — a 567 × 363 photograph, the title 26 below it, the body 11
below that, the arrow 18 under the last line: 583 in all. Columns run on a 579
pitch (12 gutter) and rows on a 644 pitch (61 gutter). The arrow is pushed to
the foot of the card so a row shares a baseline whatever length the copy runs
to. The body measure is 88% of the card (499 of 567) — the artboard sets it to
499, 514, 539 and 567 on different cards, which is a slip rather than a rhythm.

**Consultation panel** — the band is 1912 × 1000 with the form on a 660-wide
glass panel flush to its right edge, at 40% black over a 28px backdrop blur
(node 981:1370). Its content column is inset 38 from the panel's left and lines
up with the page's own content edge on the right, so the two insets are *not*
equal (38 / 93). Field wells are 529 × 54 on a 0.5px 40%-white hairline at an
89 pitch, the message box is 182, the submit bar is solid `--color-ink` with
white 18px Lexend. The artboard draws no email or phone field, so a submission
carries no way to reply — see §12.

**Careers: monogram block** — the same 655 × 681 `--color-surface` block the
About page fills with figures, holding instead a solid-white arch monogram at
**15%** opacity, inset 87 from its left and 61 from its top (node 981:1525).
This is a different asset from `arch-mark.svg`, whose 4%/6% opacities are baked
in — do not stack the two treatments.

**Careers: cut-out photograph** — the node box (824 × 842 at x 1036) is far
bigger than the picture, because the source is a transparent cut-out whose top
280px are empty; the box even overlaps the dark panel above, where the artboard
simply shows black through it. Measure the *content*, not the node: 726 × 601
at x 1086, starting 137 below the section top and stopping 11 short of the
content column's right edge. A white gradient covers its bottom 20.5% (node
981:1534), fading the group's feet into the page ground.

**Careers: role card** — a `#0f0f0f` block on the content column with 40 of
padding at the top and sides and 43 at the foot. Title 26 Saol, the précis 22
below it, the meta row 24 under that (two labels either side of a 1px 16-tall
white rule), and two 303 × 71 controls 44 lower on a 19 gutter: "Apply now"
solid bone on ink, "View more" a 0.6px 60%-white hairline over a 15px blur.
Cards sit on a 20 gutter.

**Contact: enquiry form** — an 802-wide block of six fields: name and email
side by side, phone and language beneath, then time slot and message full
width. Wells are 387 × 60 on a 0.556px 25%-white hairline, an 85 pitch with a
28 gutter; the message box is 148 and the submit bar is the same well at 40%
white — outlined, where the service page's is solid. The photograph beside it
is 828 × 865, running from the eyebrow's baseline to the foot of the submit.

**The well's height belongs on the bordered box, not the control.** Both
artboards measure the field including its stroke (54 on the service page, 60
here). Setting the height on the input and the border on its wrapper adds the
stroke on top, which threw the field pitch out by a pixel per well and the
submit bar 6 off its mark. `FieldWell` takes `wellClass` for this.

**Contact: office card** — 429 × 223 at the content column, 60 below the band's
top edge. That offset is `vw`, not a percentage: a percentage padding resolves
against the containing block's *width*, so `pt-[6.8%]` of an 1912-wide band put
the card 117 down instead of 60.

**Article page** — two columns on the content column: the article at 1159 and
the recent-posts rail at 521, with a 46 gutter
(`lg:grid-cols-[67.15%_30.19%]`). The rail runs longer than the article in the
artboard and is left to; it is a roll, not a sidebar pinned to the text.

Article rhythm, measured from nodes 981:2448–981:2463: title 40 Saol on an 817
measure, standfirst 20 at 140% on 885, the lead image 1159 × 595, then a meta
row 37 below it with the date and author either side of a 25-tall 0.6px
hairline. Body copy is 18 at 140% in 80% ink; a subheading is Saol 30 at 140%
in 80% ink, sitting 50 below the paragraph before it and 24 above the one
after.

**The hero on an article page is not the `<h1>`.** `PageHero` takes `titleAs`
so the masthead can render as a `<p>` and the article's own title can be the
page's only `<h1>`.

**Off-plan card** — 854 × 809, a bigger and differently-laid-out object from
the home page's listing card. A status badge 100 × 50 inset 18 top-left, and an
818 × 201 glass plate inset 18 on three sides carrying the name (Albert 25),
developer (Lexend 16 at 60%), price (Saol 30) and community (Albert 20), with
the 149 × 143 WhatsApp pill on its right. Both glass surfaces are **30% black
over a 28px blur** — a lighter fill and twice the blur of the home card's
45%/14. Cards run two-up on a 17 gutter both ways.

The WhatsApp pill sits *outside* the card's link: a second destination cannot
nest inside the first, and the quick-view trigger sits outside it for the same
reason.

**The card carries the home grid's quick view**, so a closer look is one click
from either page. Its trigger is sized against this card rather than the home
one: everything in both is `cqw`, and this card is twice the width, so the
home control's `9.78cqw` would render at 83px here against 41 on the home
grid. `PropertyQuickView` takes a `triggerClassName` for that, and the off-plan
card passes its status badge's geometry — square, 5.86cqw, on the badge's 2.11%
inset — so the two controls mirror each other across the top of the card.

**Off-plan sort** — drawn as a select. Built as a `<details>` holding three
links, because a `<select>` needs script to submit on change and a bare GET
form needs an Apply button the artboard does not draw. Every sort order stays a
real URL.

**Community card** — a 567 × 428 photograph, the name 20 below it in Saol 26,
the summary 38 lower at 20/130% in 80% white, and the arrow 60 under that.
Columns run on a 580 pitch (13 gutter), rows on a 635 pitch (61 gutter). The
arrow hangs 7 left of the column edge, as on the service cards, because the
drawn glyph carries its own padding.

**Communities: off-plan block** — 828 × 865 photograph on the right with the
copy centred against it, the text inset 97 from the block's top and foot. The
image is given its drawn aspect rather than stretched to the row: the text
column is the shorter of the two, and letting it drive the height pushed the
photograph to 967.

**List Your Property: reasons** — a 1726 × 451 banner, then six reasons on a
148 pitch: a 26 Saol heading, 24 of air, 20 body at 140%, and 40 to the next.

**List Your Property: enquiry form** — 811 × 657 photograph beside an 802-wide
form of eight fields. Wells are 387 × 60 on a 0.556px **40% ink** hairline (the
contact form's is 25% white — the two grounds take different weights), a 25
column gutter and an 85 row pitch, with property type and the message running
full width. The submit bar is outlined, like the contact page's and unlike the
service page's solid one.

**List Your Property: steps** — four 399-wide columns on a 441 pitch, each
opened by a 0.5px 40%-white rule running the full 109 with the content inset
20. The same object as the About page's vision columns at a quarter of the
height.

**Blog card** — a 567 × 428 photograph, a 12 gap, then a 567 × 156 caption
block at 30% `#d9d9d9`. Inside the block the title sits 16 in and 16 down, the
excerpt 8 under it and "Read more" 24 below that. Columns run on a 579 pitch
(12 gutter), rows on a 636 pitch (40 gutter). The whole card is one link — the
drawn "Read more" is the affordance, not a second target.

**`Pagination` is drawn in `currentColor`.** The About and Careers artboards
put it on a black panel at 80%/60% white; the blog artboard puts the same
object on paper at 80%/60% ink. It carries no `bone` or `ink` of its own, and
no hover fill — none of the three draw one, and a bone fill would disappear on
the paper ground.

**Partner rail** — fixed 88px band, logos at their own measured heights
(25 / 36 / 23 / 42 / 23), ~252px apart, scrolling on a 42s loop that pauses on
hover.

**FAQ** — native `<details>`, all closed by default, chevron inline after each
question (not right-aligned), list 46.8% wide. Arch watermark 542 × 691, right
edge on the content column, 318 from the section top.

---

## 8. Interaction patterns

| Pattern | Timing | Notes |
| --- | --- | --- |
| CTA wipe | 600ms `--ease-wipe` | `::before` scaled from the left rule; label flips at 170ms in, no delay out |
| Panel slide-in | 800ms `--ease-wipe` | `translate-x-full` → 0 |
| Quick-view | 600ms `--ease-wipe` | `-translate-x-[110%]` → 0, enters from the left |
| Marquee | 42s linear | Track holds the set twice, travels 50% |
| Hover inversion | 300ms | Testimonial cards |
| CTA emphasis swap | 300ms | "Enquiry Now" quiets while "Know more" is hovered |
| Testimonial handover | 300ms | The filled card reverts while another is hovered |

**Only one control is emphasised at a time**, in a CTA pair and in the
testimonial row. Both started with the same fault: a hover state that *added*
emphasis without taking it from whatever already held it, so two things read as
primary at once.

*The CTA pair* (`cedeEmphasis` in `Button.tsx`). "Know more" is the bracket
treatment and wipes to solid white on hover, which left it and the solid
"Enquiry Now" both reading as primary. The pair sits in a `group/cta`, and the
enquiry button drops to transparent-on-bone while the link is hovered:
`group-has-[a:hover]/cta:`. The only `<a>` in the pair is "Know more" — the
enquiry trigger is a `<button>` and its dialog holds no links — so the selector
names it without a marker attribute.

Handing over the fill is not enough on its own: stripped of it the button is
bare text on the panel and stops looking like a control, so it also takes the
bracket's own two rules — bone on the left, hairline on the right. They are
**pseudo-elements, not borders**. A `border-l` appearing on hover adds a pixel
and nudges the link beside it; `::before` / `::after` are out of flow, so the
swap costs no layout — measured 139.7px wide in both states.

*The testimonial row.* The first card is filled at rest (§7), so it has to give
that up the moment another card takes it. The list is a `group/cards`, each
card carries `data-active`, and the active one reverts under
`group-has-[[data-active=false]:hover]/cards:`.

The `[data-active=false]` part is load-bearing, not decoration. Matching a bare
`:hover` would also match the active card hovering *itself*, and `:has()` takes
the specificity of its argument — `.group\/cards:has(figure:hover) &` at (0,2,1)
outranks `.group:hover &` at (0,2,0) — so the revert would beat the card's own
fill and it would blank out under the pointer. Excluding the active card from
the selector means the two rules can never fire on the same element.

**Every rail runs at one speed, not one period.** `marquee-track` takes a
`--marquee-duration` because a shorter track needs a shorter duration to move
at the same rate. The site rate is **~30px/s**; each rail's duration is its own
set width divided by that. Measured at 1920:

| Rail | Set width | Duration | Speed |
| --- | --- | --- | --- |
| Home partner logos | 1986 | 66s | 30.09px/s |
| Service developer logos | 1745 | 58s | 30.08px/s |
| About award trophies | 1108 | 37s | 29.95px/s |

Sets are sized in `vw`, so the ratios hold at every width; re-measure and
re-derive if a rail's contents change.

**The track must be `shrink-0`.** Where the rail sits in a flex wrapper, the
track is a flex item and the browser shrinks the box to fit the band while the
`shrink-0` logos overflow it. `translate3d(-50%)` then travels half the *box*,
not half the content — the home rail was travelling 1259 against a real set of
1986 and snapping back 727px every cycle. Assert `offsetWidth === scrollWidth`
on the track; if they differ the loop is not seamless, whatever it looks like
at a glance.

Everything honours `prefers-reduced-motion`. The **wipe curve is even on both
ends** — `--ease-editorial` is a hard ease-out that covers 74% in the first 20%
of its duration, which makes a wipe snap then crawl. Use it for hovers, not
travel.

---

## 9. Navigation and zero-JS by default

**Navigation is two lists, not one.** `primaryNav` is the footer's "Quick
Links" column exactly as every artboard draws it — seven links, FAQs among
them. `headerNav` is what the drawer shows, and it is deliberately different:
FAQs is out; List Your Property, Blog and Careers are in. Changing one does not
change the other; if the footer should follow the header, fold `headerNav` back
into `primaryNav`.


Only four components ship JavaScript: `SiteHeader`, `SignatureCarousel`,
`ContactForm`, `PropertyQuickView`. Deliberately not client components:

- **Hero search** — a GET form to `/properties`; every search is a shareable,
  crawlable URL.
- **FAQ** — native `<details>`; answers sit in the initial HTML.
- **Intent tabs** — `IntentTabs`, shared by the home listings row and the
  `/properties` filter. Links, not client state: every intent is its own
  indexable URL. Geometry from the home artboard, measured at 1920:

  | | Node | Value |
  | --- | --- | --- |
  | Tray | `981:1045` | 444 x 95, `#0a0a0a` @ 42%, GLASS effect |
  | Tray padding | | 53 across, 23 down -> `lg:px-[2.76vw] lg:py-[1.198vw]` |
  | Selected pane | `981:1048` | 100 x 49, `#000` @ 19% + `BACKGROUND_BLUR 15` |
  | Pane padding | | 33 either side of the label -> `lg:px-[1.719vw]` |
  | Pane edge | | 0.4px inside gradient, `#121212 -> #dedede 50% -> #3d3d3d`, ~264deg |
  | Gaps | | 63px, pane edge to glyph and glyph to glyph -> `lg:gap-[3.281vw]` |
  | Labels | | Lexend Deca 18px, 0% tracking, full white, `textCase: TITLE` |
  | Weight | | Regular on the selected tab, Light on the others |

  **The tray is a sibling rectangle, not a parent.** Walking up from the tab
  group lands on the artboard, which is why an earlier pass concluded there
  was no rail at all and shipped the row bare. Check what *paints behind* a
  node — siblings at the same coordinates — not only its ancestry.

  The pane is drawn on a near-black ground, so neither the 19% fill nor the
  blur is visible on its own; the gradient hairline is what does the work.
  Keep both anyway — they are what the file specifies, and they matter the
  moment anything sits behind the row.

  Sizing is padding-based rather than a fixed 100px so the pane fits any
  label; on the home row it still measures 100.6 against the drawn 100.

  Both 63px gaps are measured to the glyphs, so the unselected tabs take the
  pane's padding and cancel it with an equal negative margin. Layout advance
  then equals the glyph width — drawn positions land within 0.6px — while the
  hover ground still covers a pane-sized area instead of hugging the letters.
  Plain padding would widen the second gap to twice the first.

  The hairline is a gradient, so it is `border-image` over a transparent
  border rather than `border-color`. That is only safe because the pane has no
  corner radius — `border-image` ignores `border-radius`. Sub-pixel widths
  round up: 0.4px computes to 0.5px.

  No hover state is drawn. Unselected tabs take white at 6% over the
  pane-sized area, which previews the selected pane without inventing a new
  material.

  The inactive labels also carry a 1px *outside* gradient stroke in the file
  (`#504e4e -> #3b3b3b -> #3d3d3d`). It is not reproduced: a dark stroke around
  white text on a black ground is invisible, CSS has no outside text stroke,
  and no gradient one at all. The apparent halo in a screenshot of the render
  is compression ringing, not the stroke.
- **The glass system** — `glass-rail` and `glass-pane` in `globals.css`. The
  file builds every raised control from a translucent fill plus a background
  blur, at three recurring strengths: 15px on controls, 28px on the card
  panels, 50px on the large washes. The hero search bar's selected tab
  (`981:467`) is the *same* 100 x 49 pane as the listings row, which is why
  the pair are utilities rather than one component's private styling.

  Figma gives the tray a GLASS effect, not a background blur — refraction
  0.46, depth 100, light 277deg at 0.1, splay 0.39, blur radius 0. CSS has no
  equivalent for refraction or splay, so `glass-rail` reproduces the fill and
  borrows the file's control blur; the light edge is not attempted. It is an
  approximation of that effect, not a transcription.

  **The About team tabs are half drawn, half systematised.** The artboard
  (`981:1150` / `981:1153`) draws a different control: 214 x 65, solid white
  with ink text when selected, a 0.6px white-50 outline when not. The selected
  tab is still built as drawn. The unselected one was changed on request to
  `glass-pane`, so its outline is now the 0.4px gradient hairline rather than
  the drawn white-50 stroke, and it takes the same white-6% hover as every
  other unselected control.

  That is a deliberate divergence from the file, not a transcription of it —
  the geometry (214 x 65) and the selected state are still the artboard's.
  Anyone reconciling this page against Figma should expect the unselected
  outline to differ.

  **Careers' "View more" is the same trade** (`981:1548`, drawn as a 0.6px
  white-60 stroke on a 303 x 71 box, no fill, blur 15). It carries
  `glass-pane` and the white-6% hover. Its *text* stays as drawn — 60%
  ExtraLight, which is how the artboard marks it as the quieter half of the
  pair beside "Apply now" — and hover lifts it to full white. The material is
  systematised; the type hierarchy is not.

  So the rule across the site is: **primary actions keep their drawn solid
  fill; every other control on a dark ground is `glass-pane`.** Where the
  artboard drew a plain hairline for one of those, the pane replaces it.

  Hover has two tiers, because no hover state is drawn anywhere in the file
  and one signal does not fit both jobs:

  | Tier | Control | Hover |
  | --- | --- | --- |
  | Quiet | tabs, secondary buttons, sort triggers | white 6% |
  | Loud | icon buttons and card CTAs — close, carousel arrows, WhatsApp | invert to white, ink text |

  A close button that only lifts 6% is too quiet to find; a tab that inverts to
  white reads as already selected. The material is uniform, the signal is
  scaled to the job.

  Carrying `glass-pane`: the `outline` button variant (so every `ButtonLink
  variant="outline"` follows), both intent tab rows, the hero search bar's
  selected tab, the About Consultants tab, careers' "View more", the off-plan
  sort trigger, the property-card and off-plan-card WhatsApp buttons, the
  carousel arrows and detail toggle, and the quick-view close.

  **Deliberately not glass**, and why:

  | Left alone | Reason |
  | --- | --- |
  | `Pagination` | Drawn in `border-current` so one component works on the dark pages *and* on the Blog's paper. `glass-pane` is a dark-only material — 19% black under a dark hairline — and would disappear on white. |
  | Form wells and submit bars | Drawn form chrome, measured per artboard (§9); `ListPropertyForm` sits on paper with black hairlines. |
  | `TestimonialCard` | On paper — `border-ink/40`. |
  | The `bracket` variant ("Know more") | Its own drawn treatment with the left-to-right wipe. |
  | The off-plan sort *menu* (not its trigger) | A popover over the cards; it keeps an opaque `bg-ink` so it stays readable. `glass-pane` would make it 19% black — i.e. see-through — over live content. |
  | Section rules, card edges, `divide-*` | Structure, not controls. |

  The dark-only limit is the thing to remember: **before putting `glass-pane`
  on something, check the ground it sits on.** If a control appears on both
  grounds it needs `currentColor`, the way `Pagination` does.
- **The header menu closes on every navigation out of it**, including a link
  to the route you are already on. A `usePathname()` effect is not enough on
  its own — it does not fire for a same-route click, nor when only the query
  changes — so the panel also closes from a delegated click handler on its
  `<nav>`. See §10.
- **"Enquiry now" opens a modal** — the first of two dialogs, and a deliberate
  exception to this section. A form that has to appear over the page it was
  launched from cannot be a link, a GET form or a `<details>`. It is a native
  `<dialog>` driven by `showModal()`, so the focus trap, the inert background
  and the backdrop are the platform's; it posts to the same server action as
  the contact page, so validation and delivery have one implementation.

  Fields follow the contact artboard's set minus the time slot, on the panel
  ground: 0.5px 40%-white hairlines over the dialog's ink.

  It is wired to every "Enquiry Now" in the design: the signature carousel's
  panel, the listing quick view, and the off-plan guide. Each passes the thing
  being asked about as `subject`, which is shown under the heading and posted
  as a hidden field so the reply has context. The "Know more" beside it stays
  a link — it goes somewhere, and only the enquiry needs to stay on the page.

  The form is keyed on an open counter so each opening remounts it. Unmounting
  on close is not enough on its own — React keeps `useActionState` alive long
  enough for a previous "thank you" to greet the next person who opens it.

  **Every close path runs one `dismiss()`.** Hanging focus return and the
  `open` reset off the `close` event alone looks correct and is not: it is the
  only signal the platform gives for its *own* close paths, but engines do not
  all dispatch it — the preview browser this was built against never does, for
  a hand-built `<dialog>` as much as for these — and when it is missing, focus
  is left on a control inside a hidden dialog and `open` never resets. The
  close button, Escape and the backdrop each call `dismiss()` directly; the
  `close` listener stays as a backstop for paths we do not own. Every step is
  idempotent, so both running costs nothing. §10.26.

  **Inside another overlay, Escape belongs to the dialog.** The quick view is
  a hand-rolled overlay with its own Escape handler, so with the dialog open
  the key would close both and drop the reader back on the grid. The quick
  view ignores Escape that came from inside a `<dialog>`. Test the *origin* of
  the event, not what is still open — see §10.22.
- **"Apply now" opens the application form in a modal** — the second dialog,
  built on the same pattern. No modal is drawn for this on the careers
  artboard, so the chrome is the contact form's. Fields are name, email,
  phone, an optional cover letter and a CV; the role's slug rides along as a
  hidden field so the reply has context.

  The CV is checked by extension *and* MIME type — browsers report
  `application/octet-stream` for a PDF often enough that either test alone
  rejects real applicants — and capped at 5MB. Server actions cap request
  bodies at 1MB by default, which a scanned CV clears easily, so
  `next.config.ts` raises `serverActions.bodySizeLimit` to match; the action
  does the real enforcing.

  The file input keeps its native button, styled through the `file:`
  pseudo-element. The usual trick — a styled `<label>` over a visually-hidden
  input — throws away the "no file chosen" text that tells someone whether the
  attachment took.

  **Nothing is stored.** There is no file backend on this project, so the
  upload is validated, its metadata logged and the bytes dropped, while the
  applicant is told their application was received. Wire the marked step in
  `src/app/careers/actions.ts` to object storage and an ATS before this page
  is live. §12.
- **The statistics count up on first view** — `CountUp` parses the drawn
  figure into the part that counts and the text around it ("AED 12B" → "AED ",
  12, "B"), drops to zero before the first paint, and eases to the real number
  over 1.6s the first time the panel is 60% on screen. Once only — the figure
  is a fact, not an effect to replay.

  The server renders the final number, so it is what a crawler, a reader with
  no JavaScript and anyone who asked for `prefers-reduced-motion` all get; the
  zeroing happens in a layout effect precisely so it never runs on the server
  and never breaks hydration. The visible figure is `aria-hidden` and
  `StatsPanel` carries the real reading — figure *and* raised "+" as one
  `sr-only` string — so a screen reader is never handed a number mid-count.

  The count runs in normal flow, so the "+" moves while it counts. That is a
  decision, not an oversight — see §10.24.
- **The office map** — a lazy Google Maps iframe, and the only third-party
  frame on the site. It is keyed on coordinates rather than the address:
  querying by name makes Google draw its own place panel in the frame's
  top-left corner, directly under the card the artboard puts there.
- **The team portraits come up in colour on hover** — the drawn state is the
  black and white of the artboard (§10.10); hovering a card lifts the
  `grayscale` filter over 0.6s on `--ease-editorial`. The exports are
  full-colour underneath, measured at 9.5–13.5 mean chroma, so this reveals
  the real photograph rather than tinting a grey one. Pure CSS — a `group` on
  the card and `group-hover:grayscale-0` on the image — so it ships no
  JavaScript and is not a §9 exception. Tailwind v4 wraps `hover:` in
  `@media (hover: hover)`, so a touch device keeps the drawn black and white
  instead of latching a hover state on tap; there is no focus state because
  the card is not interactive.
- **Team and vacancy pagination** — `Pagination` is built from links, so every
  page is its own URL; it renders nothing below two pages.
- **"View more" on a vacancy** — a native `<details>`. It takes the full row
  when open, so the button drops onto its own line; the artboard draws no open
  state. `display: contents` on a `<details>` does *not* work as a way around
  that — it leaves the panel visible when closed.

Keep it that way. If a new section needs state, ask first whether a link, a
form, or `<details>` does the job.

---

## 10. Gotchas that cost real time

Read this section before debugging anything odd.

1. **`max-width` caps the border box.** Capping the container at 1726 left 1532
   of content. The cap belongs on the content — see §3.
2. **`isolate` and `container-type` both open stacking contexts.** An overlay
   inside a card can never rise above sibling cards, whatever its z-index.
   **Portal overlays to `document.body`.** Layout containment also makes the
   card the containing block for `position: fixed` children.
3. **Figma bakes decorative opacity into exported SVGs.** The arch mark ships
   at 4%/6% `fill-opacity`. Don't strip it and re-apply your own.
4. **Exported crosshairs have off-centre strokes.** Position by the stroke, not
   the box, or the outer ones land on the photographs and vanish.
5. **Playfair is wider and taller than Saol.** Two values are tuned for the
   fallback and want reverting when the licensed WOFF2 lands:
   `StatsPanel` figures `4.9cqw` → `5.5cqw`, and re-check heading measures.
6. **Tailwind v4 `scale-*` uses the `scale` property, not `transform`.**
   `getComputedStyle(el).transform` reads `none`; read `.scale`.
7. **Compare stroke *ink*, not peak luminance.** Chrome spreads a 0.5px stroke
   over more pixels than Figma's renderer, so peaks differ by ~30% at identical
   weight.
8. **Puppeteer element screenshots ignore ancestor clipping** — they render the
   node into its own layer, so a translated-away panel still appears. Assert on
   computed values, not the picture.
9. **`networkidle0` never settles** once the marquee runs. Use
   `domcontentloaded` plus an explicit wait.
10. **Figma image paints carry their own filters, and the node dump does not
    show them.** `fills` reports `IMAGE:FILL` whether or not the paint is
    desaturated. Sample the render — the team portraits read `R=G=B` and would
    otherwise have shipped in colour.
11. **A missing font substitutes silently, per node.** "Building Trust, One
    Relationship at a Time" (981:1136) declares Saol Regular but renders in a
    grotesque in the export, while every other Saol heading on the artboard
    renders as a serif. Read `fontName`, not the picture — and where the two
    disagree, follow the rest of the artboard.
12. **A marquee track in a flex parent silently shrinks.** See §8 — the
    symptom is a loop that jumps, and the test is
    `offsetWidth === scrollWidth`.
13. **Figma has no transparent export for a masked node.** Every export mattes
    onto white, so a white-masked vendor logo exports as white-on-white. The
    service page's seven developer marks are lifted from a 2× render of the
    artboard instead, with alpha taken from luminance and a floor of 22 to cut
    the arch watermark behind the last two.
14. **A U+2028 in the copy breaks the Figma MCP transport.** `use_figma`
    returns "Failed to parse SSE message … EOF while parsing a string" for any
    response containing a LINE SEPARATOR, which reads as a size limit because
    it always fails around the same offset. It is not. Escape non-ASCII before
    returning text:
    `characters.replace(/[^\x20-\x7E]/g, c => '{' + c.charCodeAt(0).toString(16) + '}')`.
15. **A cut-out image's node box is not its picture.** Measure the rendered
    content — see the careers photograph in §7.
16. **`usePathname()` does not change on a same-route or query-only click.**
    The header menu closed itself from a `[pathname]` effect, so picking the
    current page from it did nothing, and every "Property types" link was dead
    while already on `/properties` — the panel stayed open over a page that had
    changed behind it, still scroll-locked. Close on the click as well as on
    the route.
17. **Do not guard a delegated link handler on `event.defaultPrevented`.**
    React calls the `<nav>`'s handler after the `<Link>` on the anchor beneath
    it, and Next calls `preventDefault()` there to take over the navigation —
    so the flag is set for exactly the clicks that worked, and the handler
    skips all of them. Guard on the modifier keys instead.
18. **An overlay that paints its own ground has to set its foreground too.**
    `.eyebrow` and the rest of the ramp take their colour from `currentColor`
    (§4). The menu panel used `bg-ink` rather than the `panel` utility, so
    `currentColor` fell through to `body { color: ink }` and both of its column
    headings rendered black on black. `panel` sets both; a bare `bg-*` sets
    neither.
19. **A hidden preview pane freezes CSS transitions.** `getComputedStyle`
    then reports the *starting* value of anything mid-transition forever — an
    open menu reads `visibility: hidden`, a switched background reads
    `rgba(0,0,0,0)`. Set `element.style.transition = "none"` before asserting,
    or the tooling will invent bugs that are not there. §10.8 is the same
    warning about screenshots.
20. **Artboards carry hidden leftovers at live coordinates.** The blog
    artboard has the communities page's eyebrow, heading and aside sitting at
    exactly the same x/y as its own intro (nodes 981:2267–2269 under
    981:2270), in white, invisible against the white ground and painted over by
    the group above them. Reading the topmost text at a coordinate would have
    published "discover Dubai's biggest communities" on the blog. Check
    z-order and take the copy from the named group, not the position. The About
    artboard has a similar stray (`Group 4244`), as does careers.
21. **Three nodes on the About artboard are set in Albert Sans** (981:1118,
    981:1119, 981:1280) where everything around them is Lexend. Treated as a
    slip and built in Lexend. The service artboard sets fourteen more the same
    way, and they are treated the same.
22. **`dialog[open]` is already false by the time a second Escape handler
    runs.** Two overlays each listening for Escape on `document` fire in
    registration order, and `HTMLDialogElement.close()` drops the `open`
    attribute synchronously — so the outer overlay's "is a dialog open?" guard
    sees nothing and closes itself too. The dialog's listener is registered
    when its card mounts, long before the overlay opens, so it always wins the
    race. Guard on where the key came from — `event.target.closest("dialog")` —
    which holds whichever handler ran first.
23. **`[id^="quickview-"]` matches the headings as well as the panels.** The
    overlay is `quickview-<slug>` and its `<h2>` is `quickview-<slug>-title`,
    and the heading never carries the panel's `hidden` class — so a check for
    "is any panel still open" written that way is true forever. It reported a
    passing test on a guard that was not working. Select the panel by
    `[role="dialog"]`, and confirm with a second, independent signal:
    `document.body.style.overflow` is `hidden` only while a panel is open.

24. **No box can hold the counting figure still.** The obvious way to stop
    the raised "+" drifting while a number counts is a fixed-width box sized
    to the final value. It cannot work here: Saol is unlicensed, and the
    Playfair fallback ships no tabular figures — `font-variant-numeric:
    tabular-nums` measured *identical* to proportional at every digit
    (33.62px for "111" either way). Worse, "0" is its widest digit, so "000"
    measures 54.51px against the drawn "980" at 49.33px. A box matching the
    drawn width overflows mid-count; a box that contains the count is 5px
    wider than the design. The figure is left in normal flow, which holds the
    final geometry exactly and lets the "+" travel for 1.6s. Revisit when the
    licensed Saol WOFF2 lands — if it carries `tnum`, a fixed box becomes
    possible and this is worth redoing.
25. **Ancestry is not what paints behind a node.** The intent tabs' tray is a
    sibling rectangle sitting at the same coordinates (`981:1045` behind
    `981:1047`), not a parent, so walking up the tree lands on the artboard
    and reports no background. The row shipped bare because of it. When a
    node looks like it sits on a surface, list the siblings that overlap its
    box before concluding the surface is not in the file.
26. **`HTMLDialogElement.close()` does not always fire a `close` event.** The
    preview browser never dispatches it — not for React's dialogs and not for
    one built by hand in the console — so any state kept in that handler
    silently never runs, and it reads as a component bug when it is not. Drive
    every close path explicitly and keep the listener as a backstop (§9). When
    a dialog behaves oddly, build a bare `<dialog>` in the console first: it
    tells you in one step whether the engine or the component is at fault.
---

## 11. Adding a page

1. Wrap the content in `<Panel>` (dark) or use `on-paper` sections.
2. `<PageHero>` for the masthead where the artboard opens on a full-bleed
   band — 46.875vw tall, a flat 50% scrim, centred type. `<PageHeader>` is the
   older, text-only masthead the pre-design interior pages still use. Neither
   is drawn with breadcrumbs; `PageHero` renders them quietly anyway so the
   `breadcrumbSchema()` every route emits describes something visible.
3. `buildMetadata()` for every route — never hand-roll `Metadata`.
4. Emit `breadcrumbSchema()` plus whatever else fits, via `<JsonLd>`.
5. Add the route to `src/app/sitemap.ts`.
6. Read content through `src/lib/repositories`, never `src/content` directly.
7. Type from `globals.css` classes; size anything new with §1.
8. Check `prefers-reduced-motion`, keyboard focus, and one `<h1>`.
9. `npm run typecheck && npm run lint`.

---

## 12. Still open

- `public/video/hero.mp4` is a 4K master (83 MB). Needs transcoding — commands
  in `README.md`. Gitignored.
- `src/content/*` is sample data; prices, permit numbers and handover dates are
  illustrative.
- **The forms have no rate limiting.** A honeypot stops naive bots and nothing
  else; every server action can be posted to as fast as someone can send. A
  limiter by IP and by email belongs in front of them before launch. Full
  security review in `README.md`.
- **Job applications are not stored.** `submitApplication` validates the CV
  and logs its metadata, then drops the bytes — there is no file backend on
  this project — while telling the applicant their application was received.
  That is a promise the site cannot currently keep. Wire the marked step in
  `src/app/careers/actions.ts` to object storage and notify an ATS or the CRM
  before the careers page goes live.
- **The statistics panel no longer matches the artboard.** The client supplied
  four figures — 20+ years of experience, 100+ registered developers, 5000+
  happy clients, AED 12B+ properties sold — which replace the drawn set (980
  homes for rent, 800 to buy, 100 cities covered, AED 3B closed). The panel's
  geometry is untouched; only the content changed, and `src/content/stats.ts`
  says so at the top. Do not restore these from Figma. The figures arrived as
  numbers and labels only, so three of the four descriptions under them are
  written rather than drawn or supplied — `properties-sold` keeps the
  artboard's line, which still fits. Have the client approve the other three.
- Saol Display not licensed; see §10.5.
- **The consultation form has no reply channel.** The service artboard draws
  name, language, time slot and message and no email or phone, so a submission
  cannot be answered. Built as drawn; add a contact field to the design and to
  `src/app/services/actions.ts` before it goes live.
- **The careers page carries one vacancy.** The artboard draws the same
  Property Consultant card twice and its body is a run-on with the separators
  lost and the last line cut off mid-word ("Consistent with calls and
  follow-"); it is set out in `src/content/careers.ts` as a summary plus the
  responsibilities it was listing. The drawn 01–04 pagination is generated from
  the roster, so it appears once there is more than one page of roles.
- **Careers is not in the drawn footer.** The artboards list seven Quick Links
  and Careers is not one of them, so it is surfaced through `secondaryNav` in
  the header drawer instead of being added to the footer column.
- **The map is an embed, not the drawn image.** The artboard shows a flat
  greyscale Google map; a static copy of Google's map is not ours to ship, so
  the live iframe is embedded and desaturated with `filter: grayscale(1)` to
  match. Rendering the drawn image properly needs a Maps Static API key, which
  would also give the greyscale styling natively and drop the third-party
  frame.
- **The blog's articles are sample content.** The artboard fills six cards
  with two titles and one excerpt repeated, so only the first two entries in
  `src/content/posts.ts` carry drawn copy; the rest are evergreen practitioner
  topics written to fill the grid and give the six drawn photographs a home.
  Bodies are illustrative throughout, and the first post's AED 1,000 figure
  comes from the artboard rather than a checked source.
- **The first article's copy is the client's, unverified.** The blog-details
  artboard carries a full piece on tokenised real estate — PRYPCO MINT, the
  AED 1,000 marketplace minimum, 224 investors from 44 nationalities, an AED
  10,714 average, 7.8 million tokens. It is transcribed verbatim into
  `src/content/posts.ts` and none of it has been checked against a source.
  Obvious slips in the drawn text are corrected (commas standing in for full
  stops, "Departi" for "Department", "purcha" for "purchase", "Phase Il" for
  "Phase II"); the drawn article title is the blog index's heading pasted in,
  so the post's own title is used instead.
- **Three off-plan listings were invented to fill the grid.** The artboard
  draws a two-by-two of the same placeholder card and the sample content had
  one off-plan property, so `properties.ts` gained three more (Avarra by
  Palace, The Oasis, Palm Jebel Ali) reusing existing photography. Prices,
  permit numbers and handover dates are illustrative like the rest of the file.
- **The showcase carousel has one drawn slide.** Its component instance holds a
  single photograph against three dots, so the other two slides are taken from
  the off-plan listings. The dots cannot show which slide is current without
  script, so they are labelled links rather than a fake active state.
- **The community roster changed with the design.** The artboard names The
  Heights Country Club & Wellness, Dubai Maritime City and Dubai South, where
  the pre-design content had Dubai Creek Harbour, Emaar Beachfront and The
  Valley. Card titles and summaries are transcribed — two are cut off mid-word
  in the artboard ("a master- planne..", "master-planned_") and are completed —
  but the longer descriptions, highlights and coordinates are written and want
  checking. No sample property is tagged to any of the three, so the
  "Available in …" section does not appear on their detail pages; the page
  already guards on that, but the sample listings should be retagged before
  launch.
- **Two departures on the listing form.** "Property purpose" is drawn without
  a chevron, so it reads as free text; it is built as a select, because a
  sell-or-rent field taking free text produces leads nobody can route. And its
  "Full name" label is drawn in **white** on the paper ground, where it would
  be invisible — it takes the ink of its five siblings. The option lists for
  type, purpose and bedrooms are not drawn at all and are ours.
- **Two partner rosters are in the design.** The home artboard draws five
  developers (Emaar, Sobha, Nakheel, Meraas, DAMAC), the service artboard seven
  different ones (AMIS, Meraki, Clédor, Zaya, Sunrise Capital, Muraba, The Luxe
  Developers). Both are kept, in `partners` and `developerPartners`, until
  someone says which is current.
- The About team roster holds only the four management portraits drawn in the
  artboard. The consultants tab is wired and indexable but has no people in it
  yet, and the pagination the design shows (01–04) is generated from the roster
  size, so it stays hidden until there is more than one page.
