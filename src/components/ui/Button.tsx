import Link from "next/link";
import type { ButtonHTMLAttributes, Ref, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "bracket" | "ghost";
type Size = "sm" | "md" | "lg";
type Casing = "upper" | "sentence";

const base =
  "inline-flex items-center justify-center gap-3 font-sans font-light transition-colors duration-300 ease-(--ease-editorial) disabled:pointer-events-none disabled:opacity-50";

/**
 * Casing is a prop rather than a utility passed in `className`, because
 * Tailwind resolves `uppercase` and `normal-case` by stylesheet order, not by
 * the order they appear on the element — an override there would not win.
 * The design sets most buttons in caps; "Know more" is sentence case.
 */
const casings: Record<Casing, string> = {
  upper: "uppercase tracking-[0.16em]",
  sentence: "tracking-[0.09em]",
};

const variants: Record<Variant, string> = {
  solid: "bg-bone text-ink hover:bg-bone-strong",
  /**
   * The secondary action: the site's glass pane (§9). Every unselected or
   * secondary control on a dark ground is this material, so the outline
   * variant is the pane rather than a plain hairline.
   */
  outline: "glass-pane text-bone hover:bg-white/[0.06]",
  /**
   * The "Know more" treatment: a hairline rule either side of the label rather
   * than a full box.
   *
   * On hover the white wipes across from the left rule to the right one. The
   * fill is a `::before` scaled on its x-axis from a hairline to full width,
   * so it grows out of the left rule rather than appearing behind the label —
   * a background-colour change would just cross-fade. It sits at `-z-10`
   * inside an `isolate` stacking context so it paints under the label without
   * dropping behind the page.
   *
   * The label's flip to ink is delayed on the way in so it turns dark as the
   * edge reaches it; the delay is dropped on the way out so it does not sit
   * dark over black while the fill retreats.
   */
  bracket: [
    "relative isolate overflow-hidden text-bone",
    "border-l border-l-bone",
    "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0",
    "before:bg-bone before:transition-transform before:duration-600",
    "before:ease-(--ease-wipe) before:motion-reduce:transition-none",
    "after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-hairline-strong",
    "duration-[180ms] hover:text-ink hover:delay-[170ms] hover:before:scale-x-100",
  ].join(" "),
  ghost: "text-bone-muted hover:text-bone",
};

/**
 * Hands emphasis to the bracket link beside it.
 *
 * In a CTA pair the solid button is the loud one, but "Know more" wipes to
 * solid white on hover — so without this both read as primary at the same
 * moment. While the link is hovered the solid button drops its fill and takes
 * the bracket's own resting treatment: a bone rule on the left, a hairline on
 * the right. Without those two rules it is bare text on the panel and stops
 * looking like a control at all.
 *
 * The rules are pseudo-elements rather than borders on purpose. A `border-l`
 * appearing on hover adds a pixel to the button and nudges the link beside it;
 * `::before` and `::after` are out of flow, so the swap costs no layout. They
 * are present at rest and simply transparent.
 *
 * Pairs with `group/cta` on the wrapper — see DESIGN-SYSTEM.md §8.
 */
export const cedeEmphasis = [
  "relative",
  "before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-transparent",
  "after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-transparent",
  "group-has-[a:hover]/cta:bg-transparent group-has-[a:hover]/cta:text-bone",
  "group-has-[a:hover]/cta:before:bg-bone",
  "group-has-[a:hover]/cta:after:bg-hairline-strong",
].join(" ");

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.6875rem]",
  md: "h-12 px-7 text-xs",
  lg: "h-[3.75rem] px-10 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  casing?: Casing;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "solid",
  size = "md",
  casing = "upper",
  className,
  children,
  ref,
  ...props
}: CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    /** So a dialog can put focus back on the control that opened it. */
    ref?: Ref<HTMLButtonElement>;
  }) {
  return (
    <button
      ref={ref}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        casings[casing],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends CommonProps {
  href: string;
  /** Set for outbound links so `rel` and `target` are applied consistently. */
  external?: boolean;
  "aria-label"?: string;
}

export function ButtonLink({
  href,
  variant = "solid",
  size = "md",
  casing = "upper",
  className,
  children,
  external = false,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    casings[casing],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
