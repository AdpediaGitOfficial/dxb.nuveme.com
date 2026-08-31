import { Icon } from "@/components/ui/Icon";
import { communities } from "@/content/communities";
import { cn } from "@/lib/utils";

const INTENTS = [
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "off-plan", label: "Off-Plan" },
] as const;

const PROPERTY_TYPES = [
  { value: "", label: "Property type" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
  { value: "penthouse", label: "Penthouse" },
  { value: "waterfront", label: "Waterfront home" },
];

const BEDROOMS = [
  { value: "", label: "Bedrooms" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

/**
 * A plain GET form pointed at `/properties`.
 *
 * Submitting produces a shareable, crawlable URL and works with JavaScript
 * disabled — no client bundle is shipped for the most-used control on the
 * page. The intent tabs are radio inputs styled to look like tabs.
 *
 * The surface is the design's single frosted panel (node 981:465): one
 * `rgba(0,0,0,0.2)` layer over `backdrop-blur(7.5px)`, clipped to a notched
 * outline so the tab strip reads as a raised tab of the same glass rather than
 * a separate control. The clip path is the Figma outline
 * `M0 65H665V0H1061V65H1726V208H0Z` expressed proportionally: the notch spans
 * 38.5%–61.5% of the width and rises the height of the tab row.
 */
export function PropertySearchForm({
  defaultIntent = "buy",
  className,
}: {
  defaultIntent?: (typeof INTENTS)[number]["value"];
  className?: string;
}) {
  return (
    <form
      action="/properties"
      method="get"
      role="search"
      aria-label="Search properties"
      className={cn("relative w-full [--notch:3.385vw]", className)}
      style={{ ["--notch" as string]: "clamp(2.5rem, 3.385vw, 4.0625rem)" }}
    >
      {/* The glass itself. Decorative: the controls above carry the meaning. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[7.5px] md:[clip-path:polygon(0_var(--notch),38.5%_var(--notch),38.5%_0,61.5%_0,61.5%_var(--notch),100%_var(--notch),100%_100%,0_100%)]"
      />

      <fieldset className="relative flex justify-center border-0 p-0 md:h-(--notch) md:items-center">
        <legend className="sr-only">What are you looking for?</legend>
        <div className="flex items-center gap-[1.5vw] py-3 md:py-0">
          {INTENTS.map((intent) => (
            <label
              key={intent.value}
              className={cn(
                "relative cursor-pointer border border-transparent px-[1.6vw] py-2 text-center font-light text-bone transition-colors",
                "text-[clamp(0.75rem,0.9375vw,1.125rem)]",
                // The selected tab is the same 100 x 49 glass pane the
                // listings row uses — the file draws them as one control
                // (981:467 and 981:1048), so they share the utility.
                "has-checked:glass-pane",
                "not-has-checked:hover:bg-white/[0.06]",
              )}
            >
              <input
                type="radio"
                name="intent"
                value={intent.value}
                defaultChecked={intent.value === defaultIntent}
                className="sr-only"
              />
              {intent.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="relative grid gap-[0.73vw] px-[1.25rem] pb-[1.5rem] pt-[1rem] md:grid-cols-[1fr_1fr_1fr_auto] md:px-[4.48%] md:pb-[1.56vw] md:pt-[1.46vw]">
        <Field label="City, location or project">
          <Icon name="pin" className="h-[1.1em] w-[1.1em] text-bone" />
          <input
            type="search"
            name="q"
            placeholder="City, location or project"
            list="nuve-communities"
            className="w-full bg-transparent font-light text-bone placeholder:text-bone/70 focus:outline-none"
          />
          <datalist id="nuve-communities">
            {communities.map((community) => (
              <option key={community.slug} value={community.name} />
            ))}
          </datalist>
        </Field>

        <Field label="Property type">
          <SelectControl name="type" options={PROPERTY_TYPES} />
        </Field>

        <Field label="Bedrooms">
          <SelectControl name="bedrooms" options={BEDROOMS} />
        </Field>

        <button
          type="submit"
          className="flex h-[4.43vw] min-h-[3.25rem] items-center justify-center gap-[0.5vw] bg-white px-[2.5vw] font-light text-ink transition-colors hover:bg-bone-strong md:min-w-[13.2%]"
        >
          <Icon name="search" className="h-[1.3em] w-[1.3em]" />
          <span className="text-[clamp(0.75rem,0.9375vw,1.125rem)]">
            Search
          </span>
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    // The fields are 70% black over the glass, so they read as inset wells
    // rather than as more of the same frosted surface.
    <label className="flex h-[4.43vw] min-h-[3.25rem] items-center gap-[0.9vw] bg-[rgba(0,0,0,0.7)] px-[1.35vw] text-[clamp(0.75rem,0.9375vw,1.125rem)] focus-within:bg-[rgba(0,0,0,0.82)]">
      <span className="sr-only">{label}</span>
      {children}
    </label>
  );
}

function SelectControl({
  name,
  options,
}: {
  name: string;
  options: { value: string; label: string }[];
}) {
  return (
    <span className="relative flex w-full items-center">
      <select
        name={name}
        defaultValue=""
        className="w-full appearance-none bg-transparent pr-6 font-light text-bone focus:outline-none [&>option]:bg-surface [&>option]:text-bone"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 h-[1.1em] w-[1.1em] text-bone"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
