import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/Section";
import { whyList } from "@/content/list-property";

/**
 * "Why list your property with us?" — the intro, a full-width banner and six
 * reasons stacked down the content column.
 *
 * Measured from nodes 981:1874–981:1897: the panel runs 904–2675 with the
 * eyebrow at 120, the banner 1726 × 451 at 1251, and the reasons from 1756 on
 * a 148 pitch — a 26 Saol heading, 24 of air, then 20 body at 140%, with 40
 * between one reason and the next.
 */
export function WhyListSection() {
  return (
    <section
      aria-labelledby="why-list-title"
      className="panel py-14 sm:py-16 lg:pb-[3.698vw] lg:pt-[6.25vw]"
    >
      <Container>
        <SectionIntro
          eyebrow={whyList.eyebrow}
          title={whyList.title}
          description={whyList.description}
          headingId="why-list-title"
          asideWidth="29.84%"
          titleClassName="lg:max-w-[35.4vw]"
          alignY="center"
        />

        <div className="relative mt-10 aspect-[1726/451] w-full bg-surface lg:mt-[3.021vw]">
          <Image
            src={whyList.image.src}
            alt={whyList.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <ul className="mt-12 lg:mt-[2.813vw]">
          {whyList.benefits.map((benefit, index) => (
            <li
              key={benefit.title}
              className={index > 0 ? "mt-8 lg:mt-[2.083vw]" : undefined}
            >
              <h3 className="font-display leading-[1.4] text-xl lg:text-[clamp(1.125rem,1.354vw,1.625rem)]">
                {benefit.title}
              </h3>
              <p className="prose-body mt-3 lg:mt-[1.25vw]">{benefit.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
