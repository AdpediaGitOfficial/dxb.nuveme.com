
import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/Section";
import { Pagination } from "@/components/ui/Pagination";
import { ROLES_PER_PAGE, openRoles, openRolesIntro } from "@/content/careers";
import { ApplyDialog } from "@/components/careers/ApplyDialog";
import { cn } from "@/lib/utils";
import type { JobOpening } from "@/types";

export const ROLES_ANCHOR = "open-roles";

/**
 * "Ready To Build Your Career With NUVÉ?" — the vacancy list.
 *
 * Card geometry from node 981:1540: a `#0f0f0f` block on the content column,
 * 40 of padding at the top and sides and 43 at the foot, the title 22 above
 * the précis, the meta row 24 under it, and the two 303 × 71 controls 44 below
 * that on a 19 gutter. Cards sit on a 20 gutter.
 *
 * "View more" is a native `<details>`: closed it is the drawn 303-wide box
 * beside "Apply now", open it takes the full row and lists the
 * responsibilities. No JavaScript, and the answer is in the initial HTML
 * (DESIGN-SYSTEM.md §9). Pagination is generated from the roster, so it
 * appears once there is more than one page of roles.
 */
export function OpenRoles({ page }: { page: number }) {
  const pageCount = Math.max(1, Math.ceil(openRoles.length / ROLES_PER_PAGE));
  const current = Math.min(Math.max(page, 1), pageCount);
  const visible = openRoles.slice(
    (current - 1) * ROLES_PER_PAGE,
    current * ROLES_PER_PAGE,
  );

  const href = (next: number) =>
    `/careers${next > 1 ? `?page=${next}` : ""}#${ROLES_ANCHOR}`;

  return (
    <section
      id={ROLES_ANCHOR}
      aria-labelledby="roles-title"
      className="panel py-14 sm:py-16 lg:pb-[5.73vw] lg:pt-[6.09vw]"
    >
      <Container>
        <SectionIntro
          eyebrow={openRolesIntro.eyebrow}
          title={openRolesIntro.title}
          description={openRolesIntro.description}
          headingId="roles-title"
          asideWidth="33.3%"
          titleClassName="lg:max-w-[41.7vw]"
          alignY="center"
        />

        <ul className="mt-12 space-y-5 lg:mt-[4.48vw] lg:space-y-[1.042vw]">
          {visible.map((role) => (
            <RoleCard key={role.slug} role={role} />
          ))}
        </ul>

        <Pagination
          current={current}
          pageCount={pageCount}
          href={href}
          label="Vacancy pagination"
          className="mt-8 lg:mt-[2.6vw]"
        />
      </Container>
    </section>
  );
}

function RoleCard({ role }: { role: JobOpening }) {
  return (
    <li className="bg-[#0f0f0f] p-7 sm:p-10 lg:px-[2.083vw] lg:pb-[2.24vw] lg:pt-[2.083vw]">
      <h3 className="font-display leading-[1.4] text-xl lg:text-[clamp(1.125rem,1.354vw,1.625rem)]">
        {role.title}
      </h3>

      <p className="prose-body mt-3 lg:mt-[1.146vw]">{role.summary}</p>

      <p className="mt-5 flex items-center gap-4 font-sans font-light leading-[1.4] text-bone lg:mt-[1.25vw] lg:gap-[1.042vw] lg:text-[clamp(0.875rem,1.042vw,1.25rem)]">
        {role.location}
        <span aria-hidden="true" className="h-4 w-px bg-bone" />
        {role.commitment}
      </p>

      <div className="mt-7 flex flex-wrap gap-[0.99vw] lg:mt-[2.29vw]">
        <ApplyDialog role={role.slug} roleTitle={role.title} />

        <details className="[&[open]]:basis-full">
          <summary
            className={cn(
              "glass-pane inline-flex h-14 cursor-pointer list-none items-center justify-center px-8",
              // The artboard draws this box as a 0.6px white-60 stroke
              // (981:1548). It carries the site's glass pane instead, so the
              // secondary action is the same material as every other
              // unselected control -- §9. The drawn text treatment stays:
              // 60% ExtraLight is how the artboard marks this as the quieter
              // of the pair, and hover lifts it to full white.
              "font-sans font-extralight text-bone/60",
              "transition-colors duration-300 ease-(--ease-editorial) hover:bg-white/[0.06] hover:text-bone",
              "[&::-webkit-details-marker]:hidden",
              "lg:h-[3.698vw] lg:w-[15.78vw] lg:px-0 lg:text-[clamp(0.875rem,1.042vw,1.25rem)]",
            )}
          >
            View more
          </summary>

          <ul className="mt-6 space-y-3 lg:mt-[1.563vw] lg:space-y-[0.677vw]">
            {role.responsibilities.map((item) => (
              <li key={item} className="prose-body flex gap-3">
                <span aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </li>
  );
}
