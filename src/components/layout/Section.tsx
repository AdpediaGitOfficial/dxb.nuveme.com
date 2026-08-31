import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Rendered as the section's accessible name and the `id` anchor target. */
  id?: string;
  labelledBy?: string;
  contained?: boolean;
}

export function Section({
  children,
  className,
  id,
  labelledBy,
  contained = true,
}: SectionProps) {
  const body = contained ? <Container>{children}</Container> : children;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-14 sm:py-16 lg:py-20", className)}
    >
      {body}
    </section>
  );
}

interface SectionIntroProps {
  /** Small tracked label — "Signature Properties", "Need Help?". */
  eyebrow: string;
  title: ReactNode;
  /** Right-hand supporting paragraph in the design. */
  description?: ReactNode;
  /** Aligns the description column to the right edge, as in the source layout. */
  align?: "split" | "stacked";
  headingId?: string;
  /** `h1` on the page's primary section, `h2` everywhere else. */
  as?: "h1" | "h2";
  /**
   * Width of the supporting column, as a share of the content column. The
   * design sets this per section rather than using one measure — 37% under
   * Signature Properties, 27.3% under the partner rail — which is what decides
   * how many lines the paragraph breaks to.
   */
  asideWidth?: string;
  /**
   * Measure of the heading. Defaults to the home page's `20ch`; interior
   * sections pass their drawn width as a breakpoint-scoped class — e.g.
   * `lg:max-w-[40.68vw]` for the 781px heading — because a `ch` cap set
   * against Saol breaks to an extra line in the Playfair fallback, and a
   * percentage would be read against the grid column rather than the content
   * column (see DESIGN-SYSTEM.md §1 and §4).
   */
  titleClassName?: string;
  /**
   * How the supporting column sits against the heading. The home artboard
   * bottom-aligns them; the service artboard centres them (heading 1090-1191,
   * aside 1108-1174 - both centred on 1141).
   */
  alignY?: "end" | "center";
  action?: ReactNode;
  className?: string;
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "split",
  headingId,
  as: Heading = "h2",
  action,
  asideWidth = "37%",
  titleClassName,
  alignY = "end",
  className,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "gap-8 lg:gap-16",
        align === "split"
          ? cn(
              "grid lg:grid-cols-[minmax(0,1fr)_var(--aside)]",
              alignY === "center" ? "lg:items-center" : "lg:items-end",
            )
          : "flex flex-col",
        className,
      )}
      style={
        align === "split"
          ? ({ "--aside": asideWidth } as React.CSSProperties)
          : undefined
      }
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <Heading
          id={headingId}
          className={cn(
            "display-2 text-balance-title mt-5",
            titleClassName ?? "max-w-[20ch]",
          )}
        >
          {title}
        </Heading>
      </div>

      {(description || action) && (
        <div
          className={cn(
            "flex flex-col gap-6",
            align === "split" && "lg:items-end lg:text-right",
          )}
        >
          {description && <p className="prose-lede">{description}</p>}
          {action}
        </div>
      )}
    </div>
  );
}
