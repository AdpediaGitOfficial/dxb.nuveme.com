import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { PropertyQuickView } from "@/components/ui/PropertyQuickView";
import { site } from "@/content/site";
import { formatArea, formatPrice } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  /** Above-the-fold cards opt into eager loading and a fetch priority hint. */
  priority?: boolean;
  className?: string;
  /** Widths the browser should consider — tuned per grid it appears in. */
  sizes?: string;
}

/**
 * A listing card.
 *
 * The detail panel is the design's frosted plate (node 981:839):
 * `rgba(0,0,0,0.45)` over a 14px blur, inset from the card edges rather than
 * bled to them. The card is a container and the panel's dimensions are `cqw`
 * against it, so the same card holds its proportions in a three-, four- or
 * five-column grid instead of only at the artboard's 450px.
 *
 *   panel inset 11/450 → 2.44%   padding 17/450 → 3.78%
 *   price 25px → 5.56cqw         name 20px → 4.44cqw
 *   location and specs 16px → 3.56cqw
 */
export function PropertyCard({
  property,
  priority = false,
  className,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw",
}: PropertyCardProps) {
  const href = `/properties/${property.slug}`;
  const whatsappMessage = encodeURIComponent(
    `Hello ${site.name}, I would like to know more about ${property.name}.`,
  );

  return (
    <article
      className={cn(
        "@container group relative isolate overflow-hidden bg-surface",
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={property.image.src}
          alt={property.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 ease-(--ease-editorial) group-hover:scale-[1.04]"
        />
      </div>

      {/*
        The expand control opens the quick-view overlay — a closer look without
        leaving the page, so it is a real action distinct from the card's link
        to the full listing.
      */}
      <PropertyQuickView property={property} />

      <div className="absolute inset-x-[2.44%] bottom-[4.44%] bg-[rgba(0,0,0,0.45)] p-[3.78cqw] backdrop-blur-[14px]">
        <div className="flex items-start justify-between gap-[3cqw]">
          <p className="min-w-0 font-sans text-[clamp(0.875rem,5.56cqw,1.5625rem)] font-light leading-[1.2] text-bone">
            {formatPrice(
              property.price.amount,
              property.price.currency,
              property.pricePeriod,
            )}
          </p>

          {/* Transparent glass with a hairline edge, not a filled pill. */}
          <a
            href={`https://wa.me/${site.contact.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pane relative z-20 shrink-0 px-[3cqw] py-[1.4cqw] text-center font-sans text-[clamp(0.625rem,3.33cqw,0.9375rem)] font-extralight text-bone transition-colors hover:bg-white hover:text-ink"
          >
            WhatsApp
            <span className="sr-only"> — enquire about {property.name}</span>
          </a>
        </div>

        <h3 className="mt-[1.4cqw] font-sans text-[clamp(0.8125rem,4.44cqw,1.25rem)] font-light leading-[1.2] text-bone">
          {/* Stretched link: the whole card is the target, the WhatsApp
              button sits above it on the z-axis. */}
          <Link
            href={href}
            className="before:absolute before:inset-0 before:z-10"
          >
            {property.name}
          </Link>
        </h3>

        <p className="mt-[2.3cqw] flex items-center gap-[1.8cqw] text-[clamp(0.6875rem,3.56cqw,1rem)] text-bone">
          <Icon name="location" className="h-[1.05em] w-[1.05em]" />
          {property.community}
        </p>

        <dl className="mt-[1.8cqw] flex flex-wrap items-center gap-x-[5.3cqw] gap-y-2 text-[clamp(0.6875rem,3.56cqw,1rem)] text-bone/80">
          <Spec
            icon="bed"
            label="Bedrooms"
            value={`${property.bedrooms} Bed`}
          />
          <Divider />
          <Spec
            icon="bath"
            label="Bathrooms"
            value={`${property.bathrooms} Bath`}
          />
          <Divider />
          <Spec icon="area" label="Area" value={formatArea(property.areaSqm)} />
        </dl>
      </div>
    </article>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: "bed" | "bath" | "area";
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-[1.8cqw]">
      <dt className="sr-only">{label}</dt>
      <Icon name={icon} className="h-[1.05em] w-[1.05em]" />
      <dd>{value}</dd>
    </div>
  );
}

function Divider() {
  return <span aria-hidden="true" className="h-[0.75em] w-px bg-white/40" />;
}
