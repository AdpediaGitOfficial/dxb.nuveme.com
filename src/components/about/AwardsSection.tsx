import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { awards, awardsIntro } from "@/content/about";
import type { Award } from "@/types";

/**
 * "Our Achievements" — the copy on the left, the trophies scrolling on the
 * right.
 *
 * On the artboard this block and the footer share one black rectangle divided
 * by a hairline, which is what `SiteFooter`'s own top border already draws, so
 * this section only needs to be the panel above it. Its padding is set from
 * the trophy row (202 above, 110 below) so that centring the text column puts
 * the eyebrow back on its measured baseline at 6919.
 *
 * The row is the same rail as the developer logos: the track holds the set
 * twice and travels 50%, linear, pausing on hover and standing still under
 * `prefers-reduced-motion`. It runs at the partner rail's *speed* rather than
 * its period. Measured at 1920: the logo set is 1259px over 42s, so 29.98px/s;
 * this set is 1108px, which is 37s at the same rate. Reusing 42s would have
 * run it 12% slow. Both sets are sized in vw, so the ratio holds at any width.
 *
 * The black gradient at each end is drawn in the file (nodes 981:1286/1287)
 * and doubles as the mask the rail scrolls out of.
 *
 * The arch watermark is the same exported element the FAQ section uses; the
 * 4% and 6% fill opacities are baked into the file and must not be re-applied
 * (DESIGN-SYSTEM.md §10.3).
 */
export function AwardsSection() {
  return (
    <section
      aria-labelledby="awards-title"
      className="panel relative isolate overflow-hidden py-14 sm:py-16 lg:pb-[5.73vw] lg:pt-[10.52vw]"
    >
      <Container className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-[-10.52vw] hidden aspect-[542/691] w-[22.94%] bg-contain bg-right-top bg-no-repeat lg:block"
          style={{ backgroundImage: "url(/icons/ui/arch-mark.svg)" }}
        />

        <div className="relative grid gap-12 lg:grid-cols-[32.1%_57.13%] lg:items-center lg:justify-between lg:gap-0">
          <div>
            <p className="eyebrow">{awardsIntro.eyebrow}</p>
            <h2
              id="awards-title"
              className="display-2 text-balance-title mt-6 lg:mt-[2.24vw] lg:max-w-[27.81vw]"
            >
              {awardsIntro.title}
            </h2>
            <p className="prose-body mt-6 tracking-[-0.02em] lg:mt-[2.083vw]">
              {awardsIntro.description}
            </p>
          </div>

          {/*
            `group` so hovering anywhere on the band pauses the scroll —
            catching only the trophies would stutter across the gutters.
          */}
          <div className="group relative overflow-hidden">
            <ul
              className="marquee-track flex w-max items-center group-hover:[animation-play-state:paused]"
              style={{ "--marquee-duration": "37s" } as React.CSSProperties}
            >
              {awards.map((award) => (
                <TrophyItem key={award.id} award={award} />
              ))}
              {/* The second set is what makes the loop seamless; it is decorative. */}
              {awards.map((award) => (
                <TrophyItem key={`${award.id}-loop`} award={award} duplicate />
              ))}
            </ul>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-[13.2%] bg-[linear-gradient(to_right,#000_0%,rgba(0,0,0,0)_100%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-[13.2%] bg-[linear-gradient(to_left,#000_0%,rgba(0,0,0,0)_100%)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * One trophy at its drawn size: a 155 × 254 slot on a 122 gutter, which is the
 * 277 pitch of the artboard. Clamped at the bottom so the plaques stay legible
 * on a phone, where 8vw would be 30px.
 */
function TrophyItem({
  award,
  duplicate = false,
}: {
  award: Award;
  duplicate?: boolean;
}) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      className="shrink-0 px-[clamp(1.5rem,3.177vw,3.8125rem)]"
    >
      <div className="relative aspect-[155/254] w-[clamp(5.5rem,8.072vw,9.6875rem)]">
        <Image
          src={award.image.src}
          alt={duplicate ? "" : `${award.title} — ${award.issuer}`}
          fill
          sizes="(min-width: 1024px) 9vw, 30vw"
          className="object-contain"
        />
      </div>
    </li>
  );
}
