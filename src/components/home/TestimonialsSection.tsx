import { Container } from "@/components/layout/Container";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { testimonials } from "@/content/testimonials";

/**
 * The one light section in the page — a deliberate contrast break between the
 * listing grid and the partner rail, matching the source design.
 */
export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="on-paper py-14 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_37%] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">Client Testimonials</p>
            <h2
              id="testimonials-title"
              className="display-2 text-balance-title mt-5 max-w-[20ch]"
            >
              Trusted by homeowners, investors &amp; families
            </h2>
          </div>
          <p className="prose-lede lg:text-right">
            Every property journey is unique, but our commitment is the same.
            Our expertise and guidance help clients find exceptional homes and
            investment opportunities in Dubai.
          </p>
        </div>

        {/*
          Four columns split by hairline rules. The design puts the divider
          20px before each column's card (6.27% of a card width), running the
          full column height — not as a rule above each one.
        */}
        <ul className="group/cards mt-14 grid gap-x-[8.57%] gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <li key={testimonial.id} className="relative">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-[-6.27%] hidden w-px bg-ink/20 lg:block"
                />
              )}
              <TestimonialCard
                testimonial={testimonial}
                index={index}
                // The artboard fills the first column; the rest reach that
                // state on hover.
                active={index === 0}
                className="h-full"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
