import Image from "next/image";
import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { HeroMedia } from "@/components/home/HeroMedia";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  poster: { src: string; alt: string };
  /** Omit to ship the still alone; `HeroMedia` decides whether to fetch it. */
  video?: string;
  trail: Crumb[];
  /**
   * Measure of the display line. Defaults to `18ch`; pass a `vw` cap where the
   * artboard's own measure breaks differently in the Playfair fallback
   * (DESIGN-SYSTEM.md §10.5).
   */
  titleClassName?: string;
  /**
   * The hero line is the page's `<h1>` everywhere except the article page,
   * where the masthead is branding and the article's own title is the
   * heading. Pass `"p"` there so the document keeps exactly one `<h1>`.
   */
  titleAs?: "h1" | "p";
  className?: string;
}

/**
 * The masthead every interior artboard opens with: a full-bleed still under a
 * flat 50% scrim, with a centred eyebrow and display line.
 *
 * Geometry from node 981:1057 — a 1920 × 900 frame, so the band is 46.875vw
 * tall, clamped so it neither swallows a phone screen nor grows past its
 * artboard height. The text block is centred on the frame; the eyebrow is
 * 22px at 0.3em and, unlike `.eyebrow` on a section, it is set at full white
 * rather than 60%, and the display line is 80px rather than the 100px of the
 * home hero.
 *
 * The band bleeds to the viewport edge — it is the one dark block in the
 * design that is not inset by the rail.
 *
 * Breadcrumbs are not drawn in the artboard. They are rendered here anyway,
 * quietly, because every route emits `breadcrumbSchema()` and Google expects
 * the markup to describe something a visitor can actually see.
 */
export function PageHero({
  eyebrow,
  title,
  poster,
  video,
  trail,
  titleClassName,
  titleAs: TitleTag = "h1",
  className,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-hero-title"
      className={cn(
        "relative isolate flex flex-col overflow-hidden bg-ink text-bone",
        "min-h-[32rem] lg:min-h-[min(46.875vw,56.25rem)]",
        className,
      )}
    >
      {video ? (
        <HeroMedia poster={poster} video={video} />
      ) : (
        <StillBackdrop poster={poster} />
      )}

      <Container className="relative z-10 pt-28 sm:pt-32">
        <Breadcrumbs trail={trail} className="opacity-70" />
      </Container>

      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-24 text-center sm:pb-28">
        <p className="font-sans font-light tracking-[0.3em] text-[clamp(0.75rem,1.146vw,1.375rem)]">
          {eyebrow}
        </p>
        <TitleTag
          id="page-hero-title"
          className={cn(
            "text-balance-title mx-auto mt-6 font-display leading-none tracking-[-0.01em]",
            "text-[clamp(2.25rem,4.167vw,5rem)]",
            titleClassName ?? "max-w-[18ch]",
          )}
        >
          {title}
        </TitleTag>
      </Container>
    </section>
  );
}

/** The still on its own, for pages whose hero has no footage behind it. */
function StillBackdrop({ poster }: { poster: { src: string; alt: string } }) {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
    </div>
  );
}
