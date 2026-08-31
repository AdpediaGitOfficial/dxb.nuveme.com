import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { offPlan } from "@/content/communities";

/**
 * "Explore Dubai's Top Off-Plan Investments" — the copy on the left, an 828 ×
 * 865 photograph on the right.
 *
 * Measured from nodes 981:2109–981:2114: the block runs 2904–3769 with the
 * eyebrow 97 in, the heading on a 755 measure and the body on 689. The
 * photograph spans the full height of the block, which is taller than the
 * text, so it is stretched to the row rather than given a fixed aspect.
 */
export function OffPlanSection() {
  return (
    <section
      aria-labelledby="off-plan-title"
      className="on-paper py-14 sm:py-16 lg:py-[7.292vw]"
    >
      <Container className="grid gap-12 lg:grid-cols-[46.75%_47.97%] lg:items-center lg:justify-between lg:gap-0">
        <div>
          <p className="eyebrow">{offPlan.eyebrow}</p>

          <h2
            id="off-plan-title"
            className="display-2 text-balance-title mt-6 lg:mt-[2.24vw] lg:max-w-[39.32vw]"
          >
            {offPlan.title}
          </h2>

          <div className="mt-6 space-y-6 lg:mt-[2.083vw] lg:max-w-[35.88vw] lg:space-y-[1.458vw]">
            {offPlan.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 28)} className="prose-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 828 x 865 as drawn — the text column is shorter and centres against it. */}
        <div className="relative min-h-[22rem] bg-black/5 lg:aspect-[828/865] lg:min-h-0">
          <Image
            src={offPlan.image.src}
            alt={offPlan.image.alt}
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
