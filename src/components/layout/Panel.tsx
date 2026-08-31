import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A dark panel laid on the white page ground.
 *
 * The design frames every black block with a 4px rail of page ground on the
 * sides and top. Interior pages are a single panel from masthead to the end of
 * their content, so the treatment matches the home page's dark sections.
 */
export function Panel({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}) {
  return <Tag className={cn("panel", className)}>{children}</Tag>;
}
