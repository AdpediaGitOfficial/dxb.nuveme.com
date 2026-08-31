import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { founderMessage } from "@/content/about";

/**
 * "A Message from Our Founders" — the letter on the left, the founder's card
 * on the right.
 *
 * The card is one drawn shape: a 368 × 639 plate in `#0f0f0f` with a quotation
 * mark cut out of its lower-left corner, with the portrait overlapping its
 * right edge. Below `lg` that composition has nowhere to go, so the portrait
 * and the caption stack and the plate is dropped.
 *
 * Measured from nodes 981:1133–981:1143. Panel 2767–3521; the right-hand block
 * occupies 1086–1823 × 2836–3475, and the portrait sits 272 into it.
 */
export function FounderMessage() {
  const { founder } = founderMessage;

  return (
    <section
      aria-labelledby="founder-title"
      className="panel py-14 sm:py-16 lg:pb-[5.94vw] lg:pt-[5.52vw]"
    >
      <Container className="grid gap-12 lg:grid-cols-[57.3%_42.7%] lg:gap-0">
        <div>
          <p className="eyebrow">{founderMessage.eyebrow}</p>
          <h2
            id="founder-title"
            className="display-2 text-balance-title mt-6 max-w-[90%] lg:mt-[2.24vw]"
          >
            {founderMessage.title}
          </h2>

          <div className="mt-8 space-y-6 lg:mt-[2.03vw] lg:max-w-[88.5%] lg:space-y-[1.458vw]">
            {founderMessage.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="prose-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Below lg: portrait then caption. */}
        <figure className="lg:hidden">
          <div className="relative aspect-[2/3] max-w-xs bg-surface">
            <Image
              src={founder.portrait.src}
              alt={founder.portrait.alt}
              fill
              sizes="(max-width: 1024px) 20rem, 0px"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-5">
            <p className="font-sans text-lg text-bone">{founder.name}</p>
            <p className="font-sans font-extralight text-sm text-bone">
              {founder.role}
            </p>
          </figcaption>
        </figure>

        {/*
          The card is 639 tall in a panel whose content band is only 534: it
          starts 37 above the first line of the letter and finishes 46 short of
          the panel floor. Positioning it absolutely keeps the row height set
          by the letter, as drawn, instead of stretching the panel to fit the
          portrait.
        */}
        <div className="relative hidden lg:block">
          <figure className="absolute inset-x-0 top-[-1.927vw] aspect-[737/639] w-full">
            <QuotePlate className="absolute left-0 top-0 h-full w-[49.93%]" />

            <figcaption className="absolute left-[9.09%] top-[21.28%] w-[21.4%]">
              <p className="font-sans leading-[1.2] tracking-[-0.01em] text-[clamp(1rem,1.354vw,1.625rem)] text-bone">
                {founder.name}
              </p>
              <p className="mt-[0.3em] font-sans font-extralight leading-[1.2] tracking-[-0.01em] text-[clamp(0.8125rem,1.042vw,1.25rem)] text-bone">
                {founder.role}
              </p>
            </figcaption>

            <div className="absolute left-[36.9%] top-0 h-[82.63%] w-[47.76%]">
              <Image
                src={founder.portrait.src}
                alt={founder.portrait.alt}
                fill
                sizes="(min-width: 1024px) 22vw, 0px"
                className="object-cover"
              />
              {/* The card's own 10% wash, and the fade off its lower edge. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/10"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)]"
              />
            </div>
          </figure>
        </div>
      </Container>
    </section>
  );
}

/**
 * The plate behind the founder's name: a rectangle with a quotation mark taken
 * out of its lower-left corner. Exported from node 981:1138 and inlined so the
 * fill can follow the panel rather than being baked into a file.
 */
function QuotePlate({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 368 639"
      preserveAspectRatio="none"
      fill="none"
      className={className}
    >
      <path
        d="M368 0L0 0.835294V358.72H247.019C245.177 534.759 19.6265 539.61 19.6265 539.61C19.6265 539.61 18.6865 532.142 19.6265 639C316.938 586.539 348.596 380.828 351.172 316.955H351.247V315.191C351.642 304.263 367.981 297.416 367.981 297.416C367.981 297.416 367.931 137.021 367.981 34.2471C367.988 20.8727 368 0 368 0Z"
        fill="#0F0F0F"
      />
    </svg>
  );
}
