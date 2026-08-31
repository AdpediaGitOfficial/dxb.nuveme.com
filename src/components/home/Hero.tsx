import { Container } from "@/components/layout/Container";
import { HeroMedia } from "@/components/home/HeroMedia";
import { PropertySearchForm } from "@/components/home/PropertySearchForm";

/**
 * Above-the-fold hero. The backdrop still is the LCP element and everything
 * layered on it is plain markup rather than an image, which keeps the largest
 * paint cheap; `HeroMedia` decides whether the video is worth fetching.
 *
 * Layers are ordered with positive z-indexes only — a negative z-index would
 * drop the backdrop behind the section's own painting order and out of view.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-bone pb-10 pt-32 sm:pb-14"
    >
      <HeroMedia
        poster={{
          // The video's own opening frame, so the still and the footage are
          // the same scene and the hand-off is invisible.
          src: "/images/hero/hero-poster.webp",
          alt: "Aerial view over Dubai Marina and the coastline at dusk",
        }}
        video="/video/hero.mp4"
        overlayClassName="bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.28)_38%,rgba(0,0,0,0.85)_100%)]"
      />

      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-14 text-center sm:pb-20">
        <p className="eyebrow">Curated luxury real estate</p>
        <h1
          id="hero-title"
          className="display-1 text-balance-title mx-auto mt-6 max-w-[16ch]"
        >
          Where exceptional living begins
        </h1>
      </Container>

      <Container className="relative z-10">
        <PropertySearchForm />
      </Container>
    </section>
  );
}
