import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/Section";
import { partners } from "@/content/partners";
import type { Partner } from "@/types";

/**
 * The developer logo rail.
 *
 * Vertical rhythm from the artboard (section 1912 x 638): the eyebrow sits 80
 * from the top, the rail at 399, and 151 of the section remains below it.
 *
 * The rail scrolls continuously and pauses on hover. Each logo keeps its own
 * measured height — 25 / 36 / 23 / 42 / 23 at the artboard — because the
 * design sets them to optical weight rather than a single clamp, and the
 * ~252px spacing between them is the design's gap.
 */
export function PartnersSection() {
  return (
    <section
      aria-labelledby="partners-title"
      className="panel overflow-hidden py-14 sm:py-16 lg:pb-[7.865vw] lg:pt-[4.167vw]"
    >
      <Container>
        {/* asideWidth 27.3% = the design's 471px measure, which breaks the
            supporting paragraph to three lines. */}
        <SectionIntro
          eyebrow="Our Trusted Partners"
          headingId="partners-title"
          title="Partnering with Dubai's most renowned developers"
          description="We partner with UAE's top developers to offer clients access to iconic residences and investments, ensuring quality and value."
          asideWidth="27.3%"
        />
      </Container>

      {/*
        The rail is a fixed 88px band in the design and the logos centre in it.
        `group` so hovering anywhere on the band pauses the scroll — catching
        only the logos would stutter as the cursor crossed the gaps.
      */}
      <div className="group relative mt-14 flex items-center lg:mt-[7.8vw] lg:h-[4.583vw]">
        {/*
          `shrink-0` is load-bearing: the track is a flex item, so without it
          the browser shrinks the box to fit the band while the `shrink-0`
          logos overflow it. The animation travels 50% of the *box*, which was
          1259 against a real set width of 1986 — the loop snapped back 727px
          every cycle. With the box at its true width the travel is exactly one
          set, and the duration below holds the same 30px/s it was running at.
        */}
        <ul
          className="marquee-track flex h-full w-max shrink-0 items-center group-hover:[animation-play-state:paused]"
          style={{ "--marquee-duration": "66s" } as React.CSSProperties}
        >
          {partners.map((partner) => (
            <LogoItem key={partner.name} partner={partner} />
          ))}
          {/* The second set is what makes the loop seamless; it is decorative. */}
          {partners.map((partner) => (
            <LogoItem key={`${partner.name}-loop`} partner={partner} duplicate />
          ))}
        </ul>
      </div>
    </section>
  );
}

function LogoItem({
  partner,
  duplicate = false,
}: {
  partner: Partner;
  duplicate?: boolean;
}) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      className="flex shrink-0 items-center justify-center px-[6.56vw]"
    >
      <Image
        src={partner.logo.src}
        alt={duplicate ? "" : partner.logo.alt}
        width={partner.logo.width}
        height={partner.logo.height}
        sizes="20vw"
        className="w-auto opacity-80 transition-opacity duration-300 hover:opacity-100"
        style={{
          // The artboard height, scaled with the canvas and floored so the
          // smallest wordmarks stay legible on a phone.
          height: `clamp(${partner.height * 0.62}px, ${(partner.height * 0.05208).toFixed(3)}vw, ${partner.height * 1.1}px)`,
        }}
      />
    </li>
  );
}
