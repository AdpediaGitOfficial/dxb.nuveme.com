import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { story } from "@/content/about";

/**
 * "Our Story" — a full-bleed interior shot with the founder's biography on a
 * glass plate near its floor.
 *
 * The band is 1912 × 950 on the artboard, so it is given that aspect and the
 * copy is laid on top rather than sized against it. Two measured values carry
 * the look:
 *
 *   • the image is dimmed by a black gradient that starts at 60% and clears by
 *     the bottom edge — verified against the source by sampling both (the
 *     rendered band reads 0.44× the source at the top and 0.85× two-thirds
 *     down);
 *   • the plate is 45% black over a 28px backdrop blur (node 981:1144), the
 *     same object as the listing-card plate but at twice the blur.
 *
 * The plate sits 70 above the band's bottom edge and spans the full content
 * column, with the text inset 42.
 */
export function StoryBand() {
  return (
    <section
      aria-labelledby="story-title"
      className="panel relative isolate flex flex-col overflow-hidden py-16 lg:aspect-[1912/950] lg:py-0"
    >
      <Image
        src={story.image.src}
        alt={story.image.alt}
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_100%)]"
      />

      <Container className="lg:pt-[5.208vw]">
        <p className="eyebrow">{story.eyebrow}</p>
        <h2
          id="story-title"
          className="display-2 text-balance-title mt-6 lg:mt-[1.5vw] lg:max-w-[36.98vw]"
        >
          {story.title}
        </h2>
      </Container>

      <Container className="mt-12 lg:mb-[3.646vw] lg:mt-auto">
        <div className="bg-black/45 p-6 backdrop-blur-[28px] lg:px-[2.19vw] lg:py-[2.135vw]">
          <p className="prose-body tracking-[-0.02em] lg:max-w-[94%]">
            {story.body}
          </p>
        </div>
      </Container>
    </section>
  );
}
