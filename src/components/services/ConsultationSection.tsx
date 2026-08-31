import Image from "next/image";

import { ConsultationForm } from "@/components/services/ConsultationForm";
import { consultation } from "@/content/services";

/**
 * "Let's Find Your Perfect Property" — a full-bleed band with the enquiry form
 * on a glass panel at its right edge.
 *
 * Band 1912 × 1000. The panel is 660 wide and flush to the panel's right edge,
 * at 40% black over a 28px backdrop blur (node 981:1370); its content column is
 * inset 38 from the panel's left and lines up with the page's own content edge
 * on the right, which is why the two insets are not equal.
 *
 * Below `lg` the split has nowhere to go, so the form sits on the photograph
 * full width and the glass is opaque enough to hold the copy.
 */
export function ConsultationSection() {
  return (
    <section
      aria-labelledby="consultation-title"
      className="panel relative isolate overflow-hidden lg:aspect-[1912/1000]"
    >
      <Image
        src={consultation.image.src}
        alt={consultation.image.alt}
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <div className="flex h-full justify-end">
        <div className="w-full bg-black/70 backdrop-blur-[28px] lg:w-[34.52%] lg:bg-black/40">
          {/*
            The panel bleeds past the content column on the right, so the form
            is positioned inside it rather than by `Container`: 5.76% in from
            the panel's left edge, 80.15% wide.
          */}
          <div className="px-6 py-14 sm:px-10 lg:pb-[1.979vw] lg:pl-[5.76%] lg:pr-[14.09%] lg:pt-[3.125vw]">
            <p className="eyebrow">{consultation.eyebrow}</p>
            <h2
              id="consultation-title"
              className="display-2 text-balance-title mt-6 lg:mt-[1.823vw] lg:max-w-[28.44vw]"
            >
              {consultation.title}
            </h2>
            <p className="mt-4 font-prose font-extralight leading-[1.2] text-bone/80 text-sm lg:mt-[1.563vw] lg:text-[clamp(0.8125rem,0.938vw,1.125rem)]">
              {consultation.description}
            </p>

            <div className="mt-8 lg:mt-[2.552vw]">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
