import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { lifeAtNuve } from "@/content/careers";

/**
 * "Life at NUVÉ" — the culture list beside a cut-out team photograph.
 *
 * The photograph is a transparent cut-out, so its node box (824 × 842 at
 * x 1036) is much larger than the people in it. The asset here is trimmed to
 * the drawn content — 726 × 601 at x 1086, starting 137 below the section top —
 * which is why the widths below do not match the node.
 *
 * The white gradient over its bottom 20.5% is drawn (node 981:1534): it fades
 * the group's feet into the page ground rather than cutting them off.
 *
 * Measured from nodes 981:1529–981:1534.
 */
export function LifeAtNuve() {
  return (
    <section
      aria-labelledby="life-title"
      className="on-paper py-14 sm:py-16 lg:pb-[6.25vw] lg:pt-[7.29vw]"
    >
      <Container className="grid gap-12 lg:grid-cols-[45.6%_42.06%] lg:items-start lg:justify-between lg:gap-0">
        <div>
          <p className="eyebrow">{lifeAtNuve.eyebrow}</p>
          <h2
            id="life-title"
            className="display-2 text-balance-title mt-6 lg:mt-[2.24vw] lg:max-w-[29.74vw]"
          >
            {lifeAtNuve.title}
          </h2>

          <p className="mt-8 font-prose font-light leading-[1.3] text-black/80 lg:mt-[3.59vw] lg:text-[clamp(0.9375rem,1.042vw,1.25rem)]">
            {lifeAtNuve.lede}
          </p>

          <ul className="mt-6 space-y-5 lg:mt-[1.042vw] lg:space-y-[1.354vw]">
            {lifeAtNuve.points.map((point) => (
              <li
                key={point.slice(0, 20)}
                className="flex gap-3 font-prose font-light leading-[1.3] text-black/80 lg:gap-[0.677vw] lg:text-[clamp(0.9375rem,1.042vw,1.25rem)]"
              >
                <span aria-hidden="true">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The drawn photo stops 11 short of the content edge, not on it. */}
        <div className="relative lg:mr-[0.573vw]">
          <Image
            src={lifeAtNuve.image.src}
            alt={lifeAtNuve.image.alt}
            width={lifeAtNuve.image.width}
            height={lifeAtNuve.image.height}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="h-auto w-full"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[20.5%] bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,#fff_100%)]"
          />
        </div>
      </Container>
    </section>
  );
}
