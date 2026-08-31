import Image from "next/image";
import Link from "next/link";

import { PropertyQuickView } from "@/components/ui/PropertyQuickView";
import { site } from "@/content/site";
import { formatPrice } from "@/lib/seo";
import type { Property } from "@/types";

/**
 * The off-plan listing card (node 981:3017).
 *
 * Bigger and differently laid out from the home page's `PropertyCard`: 854 ×
 * 809 with a status badge top-left and a 818 × 201 glass plate carrying the
 * name, developer, price and community, with the WhatsApp pill on its right.
 * Both glass surfaces are 30% black over a 28px blur — a lighter fill and
 * twice the blur of the home card's plate.
 *
 * The card is a `@container` and everything inside is sized in `cqw` against
 * it, so the same card holds its proportions in a one- or two-column grid
 * (DESIGN-SYSTEM.md §1).
 *
 *   plate inset 18/854 → 2.11%   plate padding 26/854 → 3.04cqw
 *   name 25px → 2.93cqw          price 30px → 3.51cqw
 *   community 20px → 2.34cqw     developer 16px → 1.87cqw
 */
export function OffPlanCard({
  property,
  priority = false,
}: {
  property: Property;
  priority?: boolean;
}) {
  const message = encodeURIComponent(
    `Hello ${site.name}, I would like to know more about ${property.name}.`,
  );

  return (
    <article className="@container relative isolate overflow-hidden bg-surface">
      <Link href={`/properties/${property.slug}`} className="group block">
        <div className="relative aspect-[854/809] w-full overflow-hidden">
          <Image
            src={property.image.src}
            alt={property.image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-(--ease-editorial) group-hover:scale-[1.04] motion-reduce:transform-none"
          />
        </div>

        {/* Status badge, 100 × 50 inset 18. */}
        <span className="absolute left-[2.11%] top-[2.11%] inline-flex h-[5.86cqw] items-center bg-black/30 px-[2.11cqw] font-sans font-extralight text-bone/80 text-[2.11cqw] backdrop-blur-[28px]">
          {property.intent === "rent" ? "For rent" : "Off-plan"}
        </span>

        <div className="absolute inset-x-[2.11%] bottom-[2.22%] flex items-start justify-between gap-[2cqw] bg-black/30 p-[3.04cqw] backdrop-blur-[28px]">
          <div className="min-w-0">
            <h3 className="font-prose font-light leading-[1.2] text-bone text-[2.93cqw]">
              {property.name}
            </h3>
            <p className="mt-[0.6cqw] font-sans font-extralight text-bone/60 text-[1.87cqw]">
              By {property.developer ?? site.shortName}
            </p>
            <p className="mt-[1.4cqw] font-display leading-[1.4] text-bone text-[3.51cqw]">
              From {formatPrice(property.price.amount)}
            </p>
            <p className="mt-[1.2cqw] font-prose font-light leading-[1.2] text-bone text-[2.34cqw]">
              {property.community}
            </p>
          </div>
        </div>
      </Link>

      {/*
        The same quick view the home grid uses, so a closer look is one click
        from either page. Sized to sit opposite the status badge: square, the
        badge's 5.86cqw height, on the badge's 2.11% inset.
      */}
      <PropertyQuickView
        property={property}
        triggerClassName="right-[2.11%] top-[2.11%] h-[5.86cqw] w-[5.86cqw] min-w-[1.75rem]"
      />

      {/*
        Outside the card's link: a second destination cannot nest inside the
        first. 149 × 143 on a 0.6px 48%-white hairline over a 15px blur.
      */}
      <a
        href={`https://wa.me/${site.contact.whatsapp}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-pane absolute bottom-[4.5%] right-[4.2%] z-10 inline-flex h-[16.74cqw] w-[17.45cqw] items-center justify-center text-bone text-[2.11cqw] transition-colors duration-300 hover:bg-bone hover:text-ink"
      >
        <span className="sr-only">Message us about {property.name} on </span>
        WhatsApp
      </a>
    </article>
  );
}
