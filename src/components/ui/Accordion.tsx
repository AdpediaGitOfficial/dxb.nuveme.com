import { cn } from "@/lib/utils";
import type { Faq } from "@/types";

interface AccordionProps {
  items: Faq[];
  /** Index of the row opened on first paint. */
  defaultOpen?: number;
  className?: string;
  /** Groups rows so opening one closes the rest, where the browser supports it. */
  name?: string;
}

/**
 * Built on native `<details>`, so the answers are in the initial HTML (and
 * therefore indexable), expand without JavaScript, and get keyboard and
 * screen-reader behaviour from the platform. `name` gives exclusive-accordion
 * behaviour in browsers that support it and degrades to independent rows
 * elsewhere.
 */
export function Accordion({
  items,
  defaultOpen,
  className,
  name = "faq",
}: AccordionProps) {
  return (
    <div className={cn("divide-y divide-hairline border-y border-hairline", className)}>
      {items.map((item, index) => (
        <details
          key={item.id}
          name={name}
          open={index === defaultOpen}
          className="group"
        >
          <summary className="flex cursor-pointer list-none items-center gap-5 py-5 text-left text-bone-strong transition-colors hover:text-bone [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-[0.9375rem] font-light sm:text-base">
              {item.question}
            </h3>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-bone-subtle transition-transform duration-300 ease-(--ease-editorial) group-open:-rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>

          <p className="max-w-[80ch] pb-6 font-prose text-sm leading-relaxed text-bone-subtle">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
