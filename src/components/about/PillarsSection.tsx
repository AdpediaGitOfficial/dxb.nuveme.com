import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/Section";
import { pillars, visionIntro } from "@/content/about";

/**
 * "From Vision to Value" — vision, mission and promise in three columns on the
 * page ground, each opened by a full-height hairline.
 *
 * The rules are not evenly spaced: the artboard puts them at 0, 607 and 1214
 * of the 1726 column, so the third column is the short one. They are drawn as
 * `border-l` on each cell rather than as dividers, because the design runs
 * them the full 478px height of the row — past the top of the label and below
 * the last line of the body — with a 37px inset at each end.
 *
 * The ordinal is Saol at 180px in 8% ink. Its block is pinned to the 123px the
 * glyphs occupy on the artboard so the rhythm below it holds whichever of Saol
 * or the Playfair fallback is rendering.
 *
 * Measured from nodes 981:1113–981:1132.
 */
export function PillarsSection() {
  return (
    <section
      aria-labelledby="pillars-title"
      className="on-paper py-14 sm:py-16 lg:pb-[7.5vw] lg:pt-[5.73vw]"
    >
      <Container>
        <SectionIntro
          eyebrow={visionIntro.eyebrow}
          title={visionIntro.title}
          description={visionIntro.description}
          headingId="pillars-title"
          asideWidth="37%"
          titleClassName="lg:max-w-[40.68vw]"
        />

        <ul className="mt-12 grid gap-10 lg:mt-[5.625vw] lg:grid-cols-[35.17%_35.17%_29.66%] lg:gap-0">
          {pillars.map((pillar) => (
            <li
              key={pillar.id}
              className="border-l-[0.5px] border-l-black/40 pl-6 lg:py-[1.927vw] lg:pl-[1.979vw]"
            >
              <p className="font-sans font-light text-[clamp(1rem,1.25vw,1.5rem)] leading-[1.2] tracking-[0.39em] text-black/80">
                {pillar.label}
              </p>

              <p
                aria-hidden="true"
                className="mt-8 flex h-[3.5rem] items-center font-display leading-none text-[3.5rem] text-black/[0.08] lg:mt-[3.9vw] lg:h-[6.406vw] lg:text-[9.375vw]"
              >
                {pillar.ordinal}
              </p>

              <p className="prose-body mt-8 lg:mt-[4.84vw]">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
