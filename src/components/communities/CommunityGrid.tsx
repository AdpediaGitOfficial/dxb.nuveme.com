import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/Section";
import { Pagination } from "@/components/ui/Pagination";
import { COMMUNITIES_PER_PAGE, communitiesIntro } from "@/content/communities";
import type { Community } from "@/types";

export const COMMUNITIES_ANCHOR = "communities";

/**
 * "discover Dubai's biggest communities" — the community grid on a dark panel.
 *
 * Card geometry from nodes 981:2058–981:2077: a 567 × 428 photograph, the name
 * 20 below it in Saol 26, the summary 38 lower at 20/130% in 80% white, and the
 * arrow 60 under that. Columns run on a 580 pitch (13 gutter), rows on a 635
 * pitch (61 gutter).
 *
 * The whole card is one link — the drawn arrow is the affordance, not a second
 * target — and the arrow hangs 7 left of the column edge, as it does on the
 * service cards, because the drawn glyph carries its own padding.
 */
export function CommunityGrid({
  communities,
  page,
}: {
  communities: Community[];
  page: number;
}) {
  const pageCount = Math.max(
    1,
    Math.ceil(communities.length / COMMUNITIES_PER_PAGE),
  );
  const current = Math.min(Math.max(page, 1), pageCount);
  const visible = communities.slice(
    (current - 1) * COMMUNITIES_PER_PAGE,
    current * COMMUNITIES_PER_PAGE,
  );

  const href = (next: number) =>
    `/communities${next > 1 ? `?page=${next}` : ""}#${COMMUNITIES_ANCHOR}`;

  return (
    <section
      id={COMMUNITIES_ANCHOR}
      aria-labelledby="communities-title"
      className="panel py-14 sm:py-16 lg:pb-[6.77vw] lg:pt-[6.56vw]"
    >
      <Container>
        <SectionIntro
          eyebrow={communitiesIntro.eyebrow}
          title={communitiesIntro.title}
          description={communitiesIntro.description}
          headingId="communities-title"
          asideWidth="30.77%"
          titleClassName="lg:max-w-[41.7vw]"
          alignY="center"
        />

        <ul className="mt-12 grid gap-12 sm:grid-cols-2 lg:mt-[4.167vw] lg:grid-cols-3 lg:gap-x-[0.677vw] lg:gap-y-[3.177vw]">
          {visible.map((community, index) => (
            <CommunityCardItem
              key={community.slug}
              community={community}
              priority={index < 3}
            />
          ))}
        </ul>

        <Pagination
          current={current}
          pageCount={pageCount}
          href={href}
          label="Community pagination"
          className="mt-10 lg:mt-[3.542vw]"
        />
      </Container>
    </section>
  );
}

function CommunityCardItem({
  community,
  priority,
}: {
  community: Community;
  priority: boolean;
}) {
  return (
    <li>
      <Link href={`/communities/${community.slug}`} className="group block">
        <div className="relative aspect-[567/428] w-full overflow-hidden bg-surface">
          <Image
            src={community.image.src}
            alt={community.image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-600 ease-(--ease-wipe) group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>

        <h3 className="mt-4 font-display leading-none lg:mt-[1.042vw] lg:text-[clamp(1.125rem,1.354vw,1.625rem)]">
          {community.name}
        </h3>

        <p className="mt-2 font-prose font-light leading-[1.3] text-bone/80 text-sm lg:mt-[0.625vw] lg:text-[clamp(0.875rem,1.042vw,1.25rem)]">
          {community.tagline}
        </p>

        <ArrowMark />
      </Link>
    </li>
  );
}

/** The 28 × 28 outbound arrow. Decorative; hangs 7 left of the column edge. */
function ArrowMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      fill="none"
      className="mt-5 h-7 w-7 shrink-0 text-bone lg:mt-[1.042vw] lg:-ml-[0.365vw]"
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
