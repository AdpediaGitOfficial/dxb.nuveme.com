import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Full-bleed rows (logo rails, carousels) opt out of the max width. */
  bleed?: boolean;
}

/**
 * The 1726px content column from the 1920px Figma canvas.
 *
 * The cap has to sit on the *content*, not the border box: `max-width` bounds
 * the padded box, so capping at 1726 would leave 1726 − 2×97 = 1532 of content
 * once the gutters were included, narrowing the whole site above ~1920. The
 * outer cap is therefore the full 1920 canvas and the gutter is clamped at its
 * 97px artboard value, which holds the content at exactly 1726 from 1920 up
 * while still scaling below it.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  bleed = false,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-[min(5.05vw,6.0625rem)]",
        !bleed && "max-w-(--canvas-shell)",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
