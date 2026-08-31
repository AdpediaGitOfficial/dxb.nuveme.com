import { Container } from "@/components/layout/Container";
import { office, officeMapLinks } from "@/content/contact";

/**
 * The office map band.
 *
 * The artboard shows a greyscale Google map, 1912 × 883, with a place card at
 * the content column's left edge and an expand control in its bottom-right
 * corner. It is drawn as a flat image; what is embedded here is the live
 * Google Maps iframe, desaturated to match, because a screenshot of Google's
 * map is not ours to ship — a static copy needs the Maps Static API and a key,
 * which would also give the greyscale styling natively.
 *
 * The iframe is lazy so it costs nothing until it is scrolled to, and it is the
 * only third-party frame on the site — see DESIGN-SYSTEM.md §12 if that trade
 * is not wanted.
 *
 * Card geometry from nodes 981:1710–981:1717: 429 × 223 at the content column,
 * 60 below the band's top edge, the title 22 in and 27 down, and the two 39 × 39
 * controls ending 26 short of the card's right edge.
 */
export function OfficeMap() {
  return (
    <section
      aria-labelledby="office-title"
      className="panel relative isolate overflow-hidden aspect-[1912/883] min-h-[26rem]"
    >
      <iframe
        title={`Map showing ${office.name}`}
        src={officeMapLinks.embed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full grayscale"
      />

      <Container /* 60 below the band top. A percentage would resolve against the
         band's width, not its height. */
        className="pointer-events-none relative h-full pt-10 lg:pt-[3.125vw]"
      >
        <div className="pointer-events-auto w-full max-w-[26.8rem] bg-ink p-6 lg:w-[24.86%] lg:max-w-none lg:p-[1.146vw]">
          <div className="flex items-start justify-between gap-4">
            <h2
              id="office-title"
              className="font-sans font-light leading-[1.4] text-bone lg:text-[clamp(1rem,1.146vw,1.375rem)]"
            >
              {office.name}
            </h2>

            <div className="flex shrink-0 gap-[0.729vw]">
              <MapAction
                href={officeMapLinks.place}
                label={`Open ${office.name} in Google Maps`}
              >
                <path
                  d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="2.4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </MapAction>

              <MapAction
                href={officeMapLinks.directions}
                label={`Get directions to ${office.name}`}
              >
                <path
                  d="M12 3 4 21l8-3.6 8 3.6L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </MapAction>
            </div>
          </div>

          <address className="mt-3 space-y-1 font-prose font-extralight not-italic leading-[1.4] text-bone/80 text-sm lg:mt-[0.885vw] lg:text-[clamp(0.8125rem,0.938vw,1.125rem)]">
            {office.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
        </div>
      </Container>

      {/* The expand control, 55 × 55 in the band's bottom-right corner. */}
      <a
        href={officeMapLinks.place}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-[8.7%] right-[3.87%] inline-flex h-11 w-11 items-center justify-center bg-ink text-bone transition-colors duration-300 hover:bg-surface lg:h-[2.865vw] lg:w-[2.865vw]"
      >
        <span className="sr-only">Open the map full screen in Google Maps</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
        >
          <path
            d="M9 3H3v6M15 3h6v6M15 21h6v-6M9 21H3v-6"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      </a>
    </section>
  );
}

function MapAction({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center bg-bone text-ink transition-colors duration-300 hover:bg-bone-strong lg:h-[2.031vw] lg:w-[2.031vw]"
    >
      <span className="sr-only">{label}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-[55%] w-[55%]"
      >
        {children}
      </svg>
    </a>
  );
}
