import Image from "next/image";

import { ContactForm } from "@/app/contact/ContactForm";
import { Container } from "@/components/layout/Container";
import { contactIntro } from "@/content/contact";

/**
 * "Your Next Property Move Starts Here" — the enquiry form beside a terrace
 * photograph.
 *
 * The panel is 1145 tall with 140 of padding top and bottom. The photograph is
 * 828 × 865 and runs from the eyebrow's baseline to the foot of the submit bar,
 * which is exactly the height of the left column — so it is stretched to the
 * row rather than given a fixed aspect.
 *
 * Measured from nodes 981:1682–981:1707.
 */
export function ContactSection() {
  return (
    <section
      aria-labelledby="contact-title"
      className="panel py-14 sm:py-16 lg:py-[7.29vw]"
    >
      <Container className="grid gap-12 lg:grid-cols-[46.5%_47.97%] lg:items-stretch lg:justify-between lg:gap-0">
        <div>
          <p className="eyebrow">{contactIntro.eyebrow}</p>
          <h2
            id="contact-title"
            className="display-2 text-balance-title mt-6 lg:mt-[2.24vw] lg:max-w-[35.88vw]"
          >
            {contactIntro.title}
          </h2>
          <p className="prose-body mt-6 lg:mt-[2.083vw] lg:max-w-[35.88vw]">
            {contactIntro.body}
          </p>

          <div className="mt-10 lg:mt-[4.167vw]">
            <ContactForm />
          </div>
        </div>

        <div className="relative min-h-[22rem] bg-surface lg:min-h-0">
          <Image
            src={contactIntro.image.src}
            alt={contactIntro.image.alt}
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
