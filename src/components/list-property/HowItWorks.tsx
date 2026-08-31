import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/Section";
import { howItWorks } from "@/content/list-property";

/**
 * "How Does It Work?" — four steps in a row, each opened by a full-height
 * hairline.
 *
 * Measured from nodes 981:1931–981:1954: the panel runs 3553–4035 with the
 * eyebrow at 59, the steps at 261, and four 399-wide columns on a 441 pitch.
 * Each rule is 0.5px at 40% white and runs the full 109 of the step, with the
 * content inset 20 — the same object as the About page's vision columns at a
 * quarter of the height.
 */
export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="panel py-14 sm:py-16 lg:pb-[5.833vw] lg:pt-[3.073vw]"
    >
      <Container>
        <SectionIntro
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          description={howItWorks.description}
          headingId="how-it-works-title"
          asideWidth="32.45%"
          titleClassName="lg:max-w-[29.74vw]"
          alignY="center"
        />

        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-[5.208vw] lg:grid-cols-4 lg:gap-[2.188vw]">
          {howItWorks.steps.map((step) => (
            <li
              key={step.title}
              className="border-l-[0.5px] border-l-white/40 pl-5 lg:pl-[1.042vw]"
            >
              <h3 className="font-sans font-light leading-[1.2] lg:text-[clamp(1rem,1.25vw,1.5rem)]">
                {step.title}
              </h3>
              <p className="mt-3 font-prose font-extralight leading-[1.4] text-bone/80 text-sm lg:mt-[0.625vw] lg:text-[clamp(0.8125rem,0.938vw,1.125rem)]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
