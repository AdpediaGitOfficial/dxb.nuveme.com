import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/Section";
import { coreValues, valuesIntro } from "@/content/about";

/**
 * "Our core values" — a square photograph beside a three-row table.
 *
 * The table is set as a definition list rather than a grid of cards: each row
 * is an ordinal, a serif title and a paragraph on one baseline, closed by a
 * hairline. The rules are 45 below and 45 above the rows they separate, which
 * makes the last one land exactly on the foot of the photograph.
 *
 * Measured from nodes 981:1114–981:1204. Photograph 489 × 516 at x 97; table
 * 1147 wide from x 676, columns at 0 / 118 / 488.
 */
export function CoreValues() {
  return (
    <section
      aria-labelledby="values-title"
      className="on-paper py-14 sm:py-16 lg:pb-[7.29vw] lg:pt-[7.81vw]"
    >
      <Container>
        <SectionIntro
          eyebrow={valuesIntro.eyebrow}
          title={valuesIntro.title}
          description={valuesIntro.description}
          headingId="values-title"
          asideWidth="37%"
          titleClassName="lg:max-w-[40.68vw]"
        />

        <div className="mt-12 grid gap-10 lg:mt-[5.21vw] lg:grid-cols-[28.33%_66.45%] lg:justify-between lg:gap-0">
          <div className="relative aspect-[489/516] w-full bg-black/5">
            <Image
              src={valuesIntro.image.src}
              alt={valuesIntro.image.alt}
              fill
              sizes="(min-width: 1024px) 29vw, 100vw"
              className="object-cover"
            />
          </div>

          <dl>
            {coreValues.map((value) => (
              <div
                key={value.id}
                className="grid gap-3 border-b-[0.6px] border-b-black/30 py-6 lg:grid-cols-[10.29%_32.26%_57.45%] lg:gap-0 lg:pb-[1.198vw] lg:pt-[2.34vw]"
              >
                <p
                  aria-hidden="true"
                  className="font-sans font-extralight leading-[1.2] tracking-[-0.01em] text-black/80 lg:text-[clamp(0.875rem,1.25vw,1.5rem)] lg:pt-[0.4vw]"
                >
                  {value.ordinal}
                </p>
                <dt className="font-display leading-[1.2] tracking-[-0.01em] text-2xl lg:text-[clamp(1.125rem,1.5625vw,1.875rem)]">
                  {value.title}
                </dt>
                <dd className="font-prose font-light text-black/60 text-sm lg:text-[clamp(0.8125rem,0.938vw,1.125rem)]">
                  {value.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
