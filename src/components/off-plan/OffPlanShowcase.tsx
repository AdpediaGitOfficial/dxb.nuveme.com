import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { showcase } from "@/content/off-plan";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";

/**
 * "Discover NUVÉ Properties" — the full-bleed showcase above the listings.
 *
 * The artboard draws a 1912 × 1000 carousel with three dots. It is built as a
 * scroll-snap strip with the dots as in-page links, so it works with no
 * JavaScript at all: the browser's own smooth scrolling moves between slides,
 * and each slide is a real anchor (DESIGN-SYSTEM.md §9).
 *
 * The dots cannot show which slide is current without script — CSS has no
 * scroll-position selector here — so they are labelled links rather than a
 * fake active state that would lie.
 */
export function OffPlanShowcase({ properties }: { properties: Property[] }) {
  const slides = [
    { id: "showcase-1", ...showcase.lead },
    ...properties.slice(0, 2).map((property, index) => ({
      id: `showcase-${index + 2}`,
      src: property.image.src,
      alt: property.image.alt,
      width: property.image.width,
      height: property.image.height,
    })),
  ];

  return (
    <section
      aria-labelledby="showcase-title"
      className="on-paper pt-14 sm:pt-16 lg:pt-[6.77vw]"
    >
      <Container>
        <p className="eyebrow">{showcase.eyebrow}</p>
        <h2
          id="showcase-title"
          className="mt-6 font-display leading-none lg:mt-[2.24vw] lg:text-[clamp(1.75rem,3.125vw,3.75rem)]"
        >
          {showcase.title}
        </h2>
      </Container>

      <div className="panel mt-10 lg:mt-[4.167vw]">
        <ul className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {slides.map((slide) => (
            <li
              key={slide.id}
              id={slide.id}
              className="relative aspect-[1912/1000] w-full shrink-0 snap-start bg-surface"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={slide.id === "showcase-1"}
                sizes="100vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>

      <nav
        aria-label="Showcase slides"
        className="mt-6 flex items-center justify-center gap-[0.365vw] lg:mt-[1.563vw]"
      >
        {slides.map((slide, index) => (
          <a
            key={slide.id}
            href={`#${slide.id}`}
            className={cn(
              "h-[9px] w-[9px] transition-colors duration-300",
              index === 0 ? "bg-ink" : "bg-black/25 hover:bg-ink",
            )}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </a>
        ))}
      </nav>
    </section>
  );
}
