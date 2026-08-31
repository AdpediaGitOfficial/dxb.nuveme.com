import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { EnquiryDialog } from "@/components/ui/EnquiryDialog";
import { guide } from "@/content/off-plan";

/**
 * "Let NUVÉ Guide You To Your Perfect Property!" — copy and a call to action
 * beside the team cut-out, on the page ground.
 *
 * The same photograph and white foot-fade as the careers page's Life at NUVÉ
 * block (nodes 981:3054–981:3056): the node box is far larger than the people
 * in it, so the asset is the trimmed content, not the box.
 *
 * The button is the design's `bracket` treatment — a hairline either side of
 * the label with the fill wiping across from the left rule (DESIGN-SYSTEM.md
 * §8), the same control the home page uses for "Know more". It opens the
 * enquiry form in a modal rather than navigating to the contact page, so the
 * listing someone was reading stays behind the dialog.
 */
export function GuideSection() {
  return (
    <section
      aria-labelledby="guide-title"
      className="on-paper py-14 sm:py-16 lg:pb-[6.98vw] lg:pt-[10.99vw]"
    >
      <Container className="grid gap-12 lg:grid-cols-[51.51%_42.93%] lg:items-center lg:justify-between lg:gap-0">
        <div>
          <p className="eyebrow">{guide.eyebrow}</p>

          <h2
            id="guide-title"
            className="display-2 text-balance-title mt-6 lg:mt-[2.24vw] lg:max-w-[45.89vw]"
          >
            {guide.title}
          </h2>

          <div className="mt-6 space-y-5 lg:mt-[2.031vw] lg:max-w-[38.96vw] lg:space-y-[1.146vw]">
            {guide.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 28)}
                className="font-prose font-light leading-[1.3] text-black/80 lg:text-[clamp(0.9375rem,1.042vw,1.25rem)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <EnquiryDialog
            label={guide.cta.label}
            subject="off-plan developments"
            className="mt-10 border-l-ink text-ink after:bg-black/25 before:bg-ink hover:text-bone lg:mt-[2.604vw]"
          />
        </div>

        <div className="relative">
          <Image
            src={guide.image.src}
            alt={guide.image.alt}
            width={guide.image.width}
            height={guide.image.height}
            sizes="(min-width: 1024px) 43vw, 100vw"
            className="h-auto w-full"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[20.5%] bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,#fff_100%)]"
          />
        </div>
      </Container>
    </section>
  );
}
