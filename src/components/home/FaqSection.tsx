import { Container } from "@/components/layout/Container";
import { Accordion } from "@/components/ui/Accordion";
import type { Faq } from "@/types";

/**
 * The FAQ block. The decorative arch mark from the design sits behind the
 * right-hand column as a background image so it never enters the a11y tree or
 * competes with the text for contrast.
 */
export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section
      aria-labelledby="faq-title"
      className="panel relative overflow-hidden py-14 sm:py-16 lg:pb-[6.25vw] lg:pt-[4.167vw]"
    >
      {/*
        The arch watermark. Placed off the artboard: 542 x 691 with its right
        edge on the content column (1823) and 318 from the section top. The
        asset carries its own 4% / 6% fills and its viewBox clips the accent
        dot, so no opacity is applied here.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute hidden bg-contain bg-top bg-no-repeat lg:block lg:right-[min(5.05vw,6.0625rem)] lg:top-[16.561vw] lg:h-[35.987vw] lg:w-[28.227vw]"
        style={{ backgroundImage: "url(/icons/ui/arch-mark.svg)" }}
      />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_31.7%] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">Need Help?</p>
            <h2
              id="faq-title"
              className="display-2 text-balance-title mt-5"
            >
              Frequently Asked Questions
            </h2>
          </div>
          <p className="prose-lede lg:text-right">
            Questions about buying, selling, or renting with NUVÉ Properties? We
            have answers to guide you.
          </p>
        </div>

        <Accordion items={faqs} className="mt-14 lg:mt-[5.05vw] lg:max-w-[46.8%]" />
      </Container>
    </section>
  );
}
