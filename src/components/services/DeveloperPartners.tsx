import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/Section";
import { developerPartners } from "@/content/partners";
import { developerPartnersIntro } from "@/content/services";
import type { Partner } from "@/types";

/**
 * "Our Trusted Partners" — the developer roster.
 *
 * The artboard lays the seven marks out statically across the content column,
 * but this is the same rail the home page scrolls, so it runs on the same
 * marquee at the same speed: the set measures 1745px, and 58s covers it at
 * 30.1px/s — the rate every rail on the site runs at (DESIGN-SYSTEM.md §8).
 *
 * The band itself is 201 tall, which is the height the drawn mask boxes
 * reserve, with the marks centred in it — the tallest logo is only 72.
 *
 * Each logo keeps its own measured height — 28 / 36 / 26 / 47 / 43 / 60 / 72 —
 * because the design sets them to optical weight rather than one clamp.
 */
export function DeveloperPartners() {
  return (
    <section
      aria-labelledby="developer-partners-title"
      className="panel relative isolate overflow-hidden py-14 sm:py-16 lg:pb-[4.79vw] lg:pt-[4.32vw]"
    >
      <Container className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-4.79vw] right-0 hidden aspect-[542/691] w-[17.44%] bg-contain bg-right-bottom bg-no-repeat lg:block"
          style={{ backgroundImage: "url(/icons/ui/arch-mark.svg)" }}
        />

        <SectionIntro
          eyebrow={developerPartnersIntro.eyebrow}
          title={developerPartnersIntro.title}
          description={developerPartnersIntro.description}
          headingId="developer-partners-title"
          asideWidth="29.7%"
          titleClassName="lg:max-w-[41.7vw]"
          alignY="center"
        />
      </Container>

      {/* `group` so hovering anywhere on the band pauses the scroll. */}
      <div className="group relative mt-14 flex items-center lg:mt-[8.59vw] lg:h-[10.47vw]">
        <ul
          className="marquee-track flex h-full w-max shrink-0 items-center group-hover:[animation-play-state:paused]"
          style={{ "--marquee-duration": "58s" } as React.CSSProperties}
        >
          {developerPartners.map((partner) => (
            <LogoItem key={partner.name} partner={partner} />
          ))}
          {/* The second set is what makes the loop seamless; it is decorative. */}
          {developerPartners.map((partner) => (
            <LogoItem
              key={`${partner.name}-loop`}
              partner={partner}
              duplicate
            />
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
      className="flex shrink-0 items-center justify-center px-[3.23vw]"
    >
      <Image
        src={partner.logo.src}
        alt={duplicate ? "" : partner.logo.alt}
        width={partner.logo.width}
        height={partner.logo.height}
        sizes="20vw"
        className="w-auto opacity-90 transition-opacity duration-300 hover:opacity-100"
        style={{
          height: `clamp(${partner.height * 0.62}px, ${(partner.height * 0.05208).toFixed(3)}vw, ${partner.height * 1.1}px)`,
        }}
      />
    </li>
  );
}
