import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { buying } from "@/content/off-plan";

/**
 * "Looking To Buy A Property In Dubai?" — the same block as the communities
 * page's off-plan section, inverted onto a dark panel: copy on the left, an
 * 828 × 865 photograph on the right with the text centred against it.
 *
 * Measured from nodes 981:3065–981:3072.
 */
export function BuyingSection() {
  return (
    <section
      aria-labelledby="buying-title"
      className="panel py-14 sm:py-16 lg:py-[5.938vw]"
    >
      <Container className="grid gap-12 lg:grid-cols-[46.75%_47.97%] lg:items-center lg:justify-between lg:gap-0">
        <div>
          <p className="eyebrow">{buying.eyebrow}</p>

          <h2
            id="buying-title"
            className="display-2 text-balance-title mt-6 lg:mt-[2.24vw] lg:max-w-[39.32vw]"
          >
            {buying.title}
          </h2>

          <div className="mt-6 space-y-6 lg:mt-[2.083vw] lg:max-w-[35.88vw] lg:space-y-[1.458vw]">
            {buying.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 28)} className="prose-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="relative min-h-[22rem] bg-surface lg:aspect-[828/865] lg:min-h-0">
          <Image
            src={buying.image.src}
            alt={buying.image.alt}
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
