import { Container } from "@/components/layout/Container";
import { careersIntro } from "@/content/careers";

/**
 * "Build Your Future With NUVÉ" — the editorial column on the left, the
 * monogram block on the right.
 *
 * The panel is the same 850-tall band as the About page's Legacy section, with
 * the same 655 × 681 raised block centred in it (84 above and below), so the
 * padding and the column split are shared. What sits in the block differs: the
 * About page puts the four figures there, this one an arch monogram at 15%.
 *
 * Measured from node 981:1518.
 */
export function CareersIntro() {
  return (
    <section
      aria-labelledby="careers-intro-title"
      className="panel py-14 sm:py-16 lg:py-[4.4vw]"
    >
      <Container className="grid gap-14 lg:grid-cols-[54.4%_37.95%] lg:items-center lg:justify-between lg:gap-0">
        <div>
          <p className="eyebrow">{careersIntro.eyebrow}</p>
          {/* 762px of measure from the artboard, in vw so it holds at any width. */}
          <h2
            id="careers-intro-title"
            className="display-2 text-balance-title mt-6 lg:mt-[2.24vw] lg:max-w-[39.68vw]"
          >
            {careersIntro.title}
          </h2>
          <p className="prose-body mt-8 lg:mt-[2.083vw]">{careersIntro.body}</p>
        </div>

        {/*
          The block is `--color-surface` at 655 × 681; the monogram inside it is
          solid white shown at 15%, inset 87 from its left and 61 from its top
          (node 981:1525). Decorative, so it stays out of the a11y tree.
        */}
        <div className="relative aspect-[655/681] w-full bg-surface">
          <div
            aria-hidden="true"
            className="absolute left-[13.3%] top-[8.96%] h-[91%] w-[73.6%] bg-contain bg-center bg-no-repeat opacity-15"
            style={{ backgroundImage: "url(/icons/ui/monogram-arch.svg)" }}
          />
        </div>
      </Container>
    </section>
  );
}
