import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/Section";
import { services, servicesIntro } from "@/content/services";

/**
 * "Our Expertise, Your Advantage" — the eleven service lines, three to a row on
 * the page ground.
 *
 * Card geometry from the artboard: a 567 × 363 photograph, the title 26 below
 * it, the body 11 below that, and the arrow 18 under the last line. Columns are
 * on a 579 pitch, so the gutter is 12; rows are on a 644 pitch, which leaves 61
 * between the arrow and the next photograph.
 *
 * The heading is capped at 800 rather than the drawn 687: Playfair breaks that
 * measure to three lines where Saol takes two, and the design is unambiguously
 * a two-line heading (DESIGN-SYSTEM.md §10.5).
 *
 * The body measure is 88% of the card (499 of 567). The artboard sets it to
 * 499, 514, 539 and 567 on different cards, which is a slip rather than a
 * rhythm — one measure is used here so the three columns read as a set.
 *
 * The arrow is pushed to the foot of the card so the row shares a baseline
 * whatever length the copy runs to.
 */
export function ServiceGrid() {
  return (
    <section
      aria-labelledby="services-title"
      className="on-paper py-14 sm:py-16 lg:pb-[4.43vw] lg:pt-[6.77vw]"
    >
      <Container>
        <SectionIntro
          eyebrow={servicesIntro.eyebrow}
          title={servicesIntro.title}
          description={servicesIntro.description}
          headingId="services-title"
          asideWidth="26.5%"
          titleClassName="lg:max-w-[41.7vw]"
          alignY="center"
        />

        <ul className="mt-12 grid gap-12 sm:grid-cols-2 lg:mt-[3.646vw] lg:grid-cols-3 lg:gap-x-[0.625vw] lg:gap-y-[3.177vw]">
          {services.map((service) => (
            <li
              key={service.slug}
              id={service.slug}
              className="flex scroll-mt-32 flex-col"
            >
              <div className="relative aspect-[567/363] w-full bg-black/5">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>

              <h3 className="mt-5 font-display leading-[1.2] text-xl lg:mt-[1.354vw] lg:text-[clamp(1rem,1.25vw,1.5rem)]">
                {service.title}
              </h3>

              <p className="mt-3 font-prose font-light leading-[1.2] text-black/80 text-sm lg:mt-[0.573vw] lg:max-w-[88%] lg:text-[clamp(0.8125rem,0.938vw,1.125rem)]">
                {service.summary}
              </p>

              <ArrowMark className="mt-6 lg:mt-[0.938vw]" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** The 28 × 28 outbound arrow that closes each card. Decorative. */
function ArrowMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      fill="none"
      className={`mt-auto h-7 w-7 shrink-0 text-black/80 ${className ?? ""}`}
    >
      <path
        d="M7 21 21 7M10 7h11v11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}
