import Link from "next/link";

import { cn } from "@/lib/utils";

export interface IntentTab {
  label: string;
  href: string;
  active?: boolean;
}

/**
 * The listing-intent tab row: Buy / Rent / Off-Plan.
 *
 * Geometry is the home artboard's (group 981:1047 in the tray 981:1045),
 * measured at 1920 and expressed proportionally:
 *
 *   tray 444 x 95, padding 53 across and 23 down
 *   selected pane 100 x 49 -- 34px of label between 33px of padding
 *   63px between glyph edges, both gaps
 *   labels 18px Lexend Deca, 0% tracking, full white
 *   Regular on the selected tab, Light on the others
 *
 * The tray and the pane are the two `glass-*` utilities, so this row and any
 * other group of raised controls stay the same material.
 *
 * Both gaps are measured glyph-to-glyph, which is why the unselected tabs
 * carry the pane's padding and then cancel it with a negative margin: the
 * drawn positions survive, and the hover ground still covers a pane-sized
 * area instead of hugging the letters. Padding without that cancellation
 * widens the second gap to twice the first.
 *
 * Links, not client state -- every intent is its own indexable URL.
 */
export function IntentTabs({
  tabs,
  label,
  className,
}: {
  tabs: IntentTab[];
  /** Names the nav for assistive technology. */
  label: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="glass-rail inline-flex items-center gap-8 px-6 py-3 lg:gap-[3.281vw] lg:px-[2.76vw] lg:py-[1.198vw]">
        {tabs.map((tab) => (
          <li key={tab.href}>
            <Link
              href={tab.href}
              aria-current={tab.active ? "page" : undefined}
              className={cn(
                "flex h-12 items-center justify-center px-6 font-sans text-sm tracking-normal text-bone",
                "transition-colors duration-300 ease-(--ease-editorial)",
                "lg:h-[2.552vw] lg:px-[1.719vw] lg:text-[clamp(0.8125rem,0.9375vw,1.125rem)]",
                tab.active
                  ? "glass-pane font-normal"
                  : cn(
                      "-mx-6 font-light hover:bg-white/[0.06]",
                      "lg:-mx-[1.719vw]",
                    ),
              )}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
