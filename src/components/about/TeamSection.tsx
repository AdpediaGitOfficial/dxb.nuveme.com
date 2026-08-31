import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Pagination } from "@/components/ui/Pagination";
import { team, teamGroups, teamIntro } from "@/content/about";
import { cn } from "@/lib/utils";
import type { TeamGroup } from "@/types";

/** Four portraits to a row, as drawn. */
const PAGE_SIZE = 4;

/** The tab the page opens on when the query string says nothing. */
export const DEFAULT_TEAM_GROUP: TeamGroup["id"] = "management";

export const TEAM_ANCHOR = "team";

export function isTeamGroup(
  value: string | undefined,
): value is TeamGroup["id"] {
  return teamGroups.some((group) => group.id === value);
}

interface TeamSectionProps {
  group: TeamGroup["id"];
  page: number;
}

/**
 * "Meet Our Team" — a tabbed, paginated roster.
 *
 * Both controls are links, not state: each tab and each page is its own
 * crawlable URL under `/about`, and the section is rendered on the server from
 * the query string (DESIGN-SYSTEM.md §9). That keeps the page at zero
 * JavaScript and makes a particular page of the roster shareable.
 *
 * Geometry from nodes 981:1117–981:1188. Cards are 425 × 549 with 8px gutters,
 * the caption plate is inset 12 on three sides at 28% black over a 28px blur,
 * and the tab strip is 2 × 214 × 65 pinned to the right of the content column.
 */
export function TeamSection({ group, page }: TeamSectionProps) {
  const members = team.filter((member) => member.group === group);
  const pageCount = Math.max(1, Math.ceil(members.length / PAGE_SIZE));
  const current = Math.min(Math.max(page, 1), pageCount);
  const visible = members.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const href = (next: { group?: TeamGroup["id"]; page?: number }) => {
    const params = new URLSearchParams();
    const nextGroup = next.group ?? group;
    const nextPage = next.page ?? current;
    if (nextGroup !== DEFAULT_TEAM_GROUP) params.set("team", nextGroup);
    if (nextPage > 1) params.set("page", String(nextPage));
    const query = params.toString();
    return `/about${query ? `?${query}` : ""}#${TEAM_ANCHOR}`;
  };

  return (
    <section
      id={TEAM_ANCHOR}
      aria-labelledby="team-title"
      className="panel py-14 sm:py-16 lg:pb-[4.58vw] lg:pt-[5.73vw]"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <p className="eyebrow">{teamIntro.eyebrow}</p>
            <h2
              id="team-title"
              className="display-2 text-balance-title mt-6 max-w-[31ch] lg:mt-[2.24vw] lg:max-w-[27.81vw]"
            >
              {teamIntro.title}
            </h2>
          </div>

          <nav aria-label="Team groups" className="flex gap-[0.417vw]">
            {teamGroups.map((teamGroup) => {
              const active = teamGroup.id === group;

              return (
                <Link
                  key={teamGroup.id}
                  href={href({ group: teamGroup.id, page: 1 })}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "inline-flex items-center justify-center px-6 font-sans font-light tracking-normal",
                    "h-14 text-sm backdrop-blur-[15px] transition-colors duration-300 ease-(--ease-editorial)",
                    "lg:h-[3.385vw] lg:w-[11.15vw] lg:px-0 lg:text-[clamp(0.75rem,1.042vw,1.25rem)]",
                    active
                      ? "bg-bone text-ink"
                      : // The artboard draws this as a 0.6px white-50 outline
                        // (981:1153). It is built as the site's glass pane
                        // instead, on request, so every unselected control on
                        // the site is the same material — see §9. The selected
                        // tab keeps its drawn solid-white fill.
                        "glass-pane text-bone hover:bg-white/[0.06]",
                  )}
                >
                  {teamGroup.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {visible.length > 0 ? (
          <ul className="mt-12 grid grid-cols-2 gap-[0.417vw] lg:mt-[5.73vw] lg:grid-cols-4">
            {visible.map((member) => (
              <li
                key={member.id}
                className="group relative aspect-[425/549] bg-surface"
              >
                <Image
                  src={member.image.src}
                  alt={member.image.alt}
                  fill
                  sizes="(min-width: 1024px) 23vw, 45vw"
                  /*
                    The roster is drawn in black and white. Three of the four
                    portraits carry a −100% saturation filter in the file and
                    the fourth does not, which is a slip: measured across the
                    render, cards 1, 3 and 4 are R=G=B and card 2 is not. The
                    set is desaturated here.

                    Hovering lifts the filter and the photograph comes up in
                    colour. The exports are full-colour underneath — measured
                    at 9.5–13.5 mean chroma — so this is the real photograph
                    rather than a tint. `hover:` is a `(hover: hover)` media
                    query in Tailwind v4, so a touch device keeps the drawn
                    black and white instead of latching a hover state on tap.
                  */
                  className="object-cover object-top grayscale transition-[filter] duration-600 ease-(--ease-editorial) group-hover:grayscale-0 motion-reduce:transition-none"
                />

                <div className="absolute inset-x-[2.82%] bottom-[2.19%] flex h-[23.86%] flex-col items-center justify-center bg-black/28 text-center backdrop-blur-[28px]">
                  <p className="font-sans text-[clamp(0.875rem,1.25cqw,1.5rem)] text-bone sm:text-[1.1rem] lg:text-[clamp(1rem,1.25vw,1.5rem)]">
                    {member.name}
                  </p>
                  <p className="mt-[0.35em] font-sans font-light text-xs text-bone lg:text-[clamp(0.75rem,0.938vw,1.125rem)]">
                    {member.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="prose-body mt-12 lg:mt-[5.73vw]">
            Consultant profiles are being finalised. Speak to the team directly
            in the meantime.
          </p>
        )}

        <Pagination
          current={current}
          pageCount={pageCount}
          href={(page) => href({ page })}
          label="Team pagination"
          className="mt-8 lg:mt-[2.6vw]"
        />
      </Container>
    </section>
  );
}
