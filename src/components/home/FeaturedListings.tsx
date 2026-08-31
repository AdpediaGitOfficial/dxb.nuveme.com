import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { IntentTabs } from "@/components/ui/IntentTabs";
import { PropertyCard } from "@/components/ui/PropertyCard";
import type { Property } from "@/types";

const INTENT_TABS = [
  { label: "Buy", href: "/properties?intent=buy" },
  { label: "Rent", href: "/properties?intent=rent" },
  { label: "Off-Plan", href: "/properties?intent=off-plan" },
];

/**
 * "Premium Listings" grid.
 *
 * The intent tabs are links into the listing page rather than client-side
 * filters: each state gets a real, indexable URL, and the home page ships no
 * JavaScript for them.
 */
export function FeaturedListings({ properties }: { properties: Property[] }) {
  return (
    <section
      aria-labelledby="listings-title"
      className="panel py-14 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Premium Listings</p>
            <h2
              id="listings-title"
              className="display-2 text-balance-title mt-5 max-w-[16ch]"
            >
              Find the address that defines you
            </h2>
          </div>

          <IntentTabs
            label="Browse listings by intent"
            tabs={INTENT_TABS.map((tab, index) => ({
              ...tab,
              active: index === 0,
            }))}
          />
        </div>
      </Container>

      {/*
        The grid breaks out of the content column: in the design the cards run
        25px from the section edge (1857 of 1912, or 97%) while the heading
        above stays in the column. Gutters are the design's 19px column / 28px
        row, expressed proportionally.
      */}
      <div className="relative mt-12 px-5 sm:px-8 lg:mt-16 lg:px-[1.3vw]">
        <ul className="grid gap-5 sm:grid-cols-2 lg:gap-x-[0.99vw] lg:gap-y-[1.458vw] lg:grid-cols-4">
          {properties.map((property, index) => (
            <li key={property.slug}>
              <PropertyCard
                property={property}
                priority={index < 4}
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw"
              />
            </li>
          ))}
        </ul>

        {/*
          The fading crosshair that sits in the gutters.

          The asset's strokes are deliberately off-centre in its 483px box —
          vertical at x=249.25, horizontal at y=237.75 — which is how Figma
          lands them on x=491 / y=4143 from a box at (241.75, 3905.25). So the
          box is positioned by its strokes, not by its centre: centring it puts
          the outer verticals 8 and 16px off, onto the photographs.

          The overlay is inset to the grid itself, so the gutter fractions
          (24.74% / 50% / 75.26% for the design's 450 card + 19 gap rhythm)
          resolve against the right box. Drawn only at `lg`, where the grid is
          the design's 4x2 and the row boundary is exactly half its height.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 hidden lg:left-[1.3vw] lg:right-[1.3vw] lg:block"
        >
          {[24.74, 50, 75.26].map((gutter) => (
            <span
              key={gutter}
              className="absolute aspect-square w-[25.155vw] bg-contain bg-center bg-no-repeat"
              style={{
                left: `calc(${gutter}% - 12.981vw)`,
                top: "calc(50% - 12.382vw)",
                backgroundImage: "url(/icons/ui/crosshair-grid.svg)",
              }}
            />
          ))}
        </div>
      </div>

      <Container className="mt-12 flex justify-center">
        <Link
          href="/properties"
          className="border-b border-hairline-strong pb-2 text-xs uppercase tracking-[0.18em] text-bone-muted transition-colors hover:border-bone hover:text-bone"
        >
          View all properties
        </Link>
      </Container>
    </section>
  );
}
