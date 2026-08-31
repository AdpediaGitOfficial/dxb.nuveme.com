import { Container } from "@/components/layout/Container";
import { StatsPanel } from "@/components/home/StatsPanel";
import { legacy } from "@/content/about";

/**
 * "More Than Property. A Legacy of Trust" — the editorial column on the left,
 * the 2×2 figures panel on the right.
 *
 * The panel is 850 tall on the artboard with the figures block (655 × 681)
 * centred in it, which leaves 85 above and below: hence `4.43vw` of padding
 * and `items-center` rather than a fixed height. The two columns are the same
 * 54.4% / 37.95% split the home page uses, so `StatsPanel` drops straight in —
 * its content is already the four figures this section names.
 *
 * Measured from node 981:1085.
 *   eyebrow 1048 · heading 1116 (762 wide) · body 1317–1611 (939 wide)
 */
export function LegacySection() {
  return (
    <section
      aria-labelledby="legacy-title"
      className="panel py-14 sm:py-16 lg:py-[4.43vw]"
    >
      <Container className="grid gap-14 lg:grid-cols-[54.4%_37.95%] lg:items-center lg:justify-between lg:gap-0">
        <div>
          <p className="eyebrow">{legacy.eyebrow}</p>

          {/* 762px of measure from the artboard, in vw so it holds at any width. */}
          <h2
            id="legacy-title"
            className="display-2 text-balance-title mt-6 lg:mt-[2.24vw] lg:max-w-[39.68vw]"
          >
            {legacy.title}
          </h2>

          <div className="mt-8 space-y-6 lg:mt-[2.083vw] lg:space-y-[1.458vw]">
            {legacy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="prose-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <StatsPanel />
      </Container>
    </section>
  );
}
