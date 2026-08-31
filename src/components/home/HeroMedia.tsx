"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface HeroMediaProps {
  poster: { src: string; alt: string };
  video: string;
  /**
   * The scrim laid over the footage. The home hero uses a three-stop gradient
   * so the search bar has a dark floor to sit on; the interior heroes measure
   * a flat 50% black over the whole frame (node 981:1058), which is the
   * default here.
   */
  overlayClassName?: string;
}

/**
 * The hero backdrop: a still that paints immediately, with the video layered
 * over it once the browser has enough to play.
 *
 * The still is the LCP element and ships in the server HTML, so the largest
 * paint never waits on the video. The `<source>` is only attached after a
 * client-side check, which means the file is not fetched at all when it would
 * be a poor trade:
 *
 *   • `prefers-reduced-motion` — a looping backdrop is exactly what that asks
 *     to be spared;
 *   • narrow viewports — this is a 4K master, and phones pay the most for it;
 *   • Save-Data or a 2G/3G effective connection.
 *
 * In each of those cases the still simply stays, which is a complete design.
 */
export function HeroMedia({
  poster,
  video,
  overlayClassName = "bg-black/50",
}: HeroMediaProps) {
  const [source, setSource] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const frugal =
      connection?.saveData === true ||
      /(^|-)[23]g$/.test(connection?.effectiveType ?? "");

    if (!reduced && !narrow && !frugal) setSource(video);
  }, [video]);

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

      {source && (
        <video
          // Decorative: the still above carries the same scene and the alt text.
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setPlaying(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            "transition-opacity duration-1000 ease-(--ease-wipe)",
            playing ? "opacity-100" : "opacity-0",
          )}
        >
          <source src={source} type="video/mp4" />
        </video>
      )}

      <div aria-hidden="true" className={cn("absolute inset-0", overlayClassName)} />
    </div>
  );
}
