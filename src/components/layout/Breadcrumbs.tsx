import Link from "next/link";

import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Visible breadcrumbs. Pair with `breadcrumbSchema()` on the same page —
 * Google requires the markup to match what a visitor can actually see.
 */
export function Breadcrumbs({
  trail,
  className,
}: {
  trail: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-xs", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-bone-faint">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;

          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-bone-subtle">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="transition-colors hover:text-bone"
                >
                  {crumb.name}
                </Link>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
