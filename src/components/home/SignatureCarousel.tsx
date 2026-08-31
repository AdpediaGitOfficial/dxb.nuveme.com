"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { ButtonLink, cedeEmphasis } from "@/components/ui/Button";
import { EnquiryDialog } from "@/components/ui/EnquiryDialog";
import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { SignatureProject } from "@/types";

interface SignatureCarouselProps {
  projects: SignatureProject[];
  label: string;
}

/**
 * A scroll-snap carousel with the design's detail panel over each slide.
 *
 * Every slide is a real element in the document, so the images and the panel
 * copy are crawlable and the track still swipes natively if the JavaScript
 * never arrives — the controls and the panel reveal only enhance it.
 *
 * The panel is parked off the right edge in the Figma frame (x=1910 of a
 * 1912-wide slide), which is the closed state of a slide-in. It travels in
 * when the carousel reaches the viewport.
 */
export function SignatureCarousel({ projects, label }: SignatureCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [open, setOpen] = useState(true);

  const scrollToIndex = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(next, projects.length - 1));
      track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
      setIndex(clamped);
    },
    [projects.length],
  );

  // Keep the indicator in step with manual swipes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        setIndex(Math.round(track.scrollLeft / track.clientWidth)),
      );
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Bring the panel in once the carousel is properly on screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setRevealed(true);
      },
      { threshold: 0.45 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // `noUncheckedIndexedAccess` is on, so narrow once here rather than
  // guarding at every read site.
  const project = projects[index] ?? projects[0];
  const shown = revealed && open;

  if (!project) return null;

  const panelId = "signature-detail-panel";

  return (
    <div
      ref={rootRef}
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative overflow-hidden">
        <div className="relative">
          <ul
            ref={trackRef}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((item, slideIndex) => (
              <li
                key={item.slug}
                className="relative aspect-16/10 w-full shrink-0 snap-start sm:aspect-1912/1000"
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} of ${projects.length}`}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="100vw"
                  loading={slideIndex === 0 ? "eager" : "lazy"}
                  className="object-cover"
                />
              </li>
            ))}
          </ul>

          {/* Controls sit at the foot of the frame, left of the thumbnails. */}
          <div className="absolute bottom-[3.7%] left-[2.8%] z-20 flex items-end gap-[1.5%]">
            <div className="flex">
              <CarouselButton
                direction="previous"
                disabled={index === 0}
                onClick={() => scrollToIndex(index - 1)}
              />
              <CarouselButton
                direction="next"
                disabled={index === projects.length - 1}
                onClick={() => scrollToIndex(index + 1)}
              />
            </div>

            {/* One thumbnail per slide; each jumps the track to it. */}
            <ul className="hidden gap-[0.6rem] sm:flex">
              {projects.map((item, slideIndex) => (
                <li key={`thumb-${item.slug}`}>
                  <button
                    type="button"
                    onClick={() => scrollToIndex(slideIndex)}
                    aria-current={slideIndex === index ? "true" : undefined}
                    className={cn(
                      "relative block h-[4.2vw] max-h-[6.8rem] w-[6.6vw] max-w-[10.6rem] overflow-hidden",
                      "transition-opacity duration-300 ease-(--ease-wipe)",
                      slideIndex === index
                        ? "opacity-100 outline outline-2 -outline-offset-2 outline-white"
                        : "opacity-55 hover:opacity-85",
                    )}
                  >
                    <span className="sr-only">
                      Show {item.name}
                      {slideIndex === index ? " (current slide)" : ""}
                    </span>
                    <Image
                      src={item.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 11vw, 0px"
                      className="object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/*
          The panel toggle sits outside the panel so it stays reachable once the
          panel has slid away — a control that travels with the panel can close
          it and then cannot bring it back.
        */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={shown}
          aria-controls={panelId}
          className={cn(
            "absolute right-[1.3%] top-[2.5%] z-30 hidden h-[2.55vw] max-h-[3.1rem] w-[2.55vw] max-w-[3.1rem]",
            "glass-pane items-center justify-center text-bone",
            "transition-colors duration-300 hover:bg-white hover:text-ink lg:flex",
          )}
        >
          <span className="sr-only">
            {shown ? "Hide project details" : "Show project details"}
          </span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[45%] w-[45%]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {shown ? (
              <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
            ) : (
              <path
                d="M15 5l-7 7 7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>

        {/*
          The detail panel. 692 of the 1912-wide frame in the design (36.2%),
          frosted at rgba(0,0,0,0.4) over a 14px blur. Below `lg` it becomes a
          static block under the image, where a 36% overlay would be unusable.
        */}
        <aside
          id={panelId}
          aria-label={`${project.name} — details`}
          className={cn(
            "z-10 border-t border-hairline bg-ink lg:bg-[rgba(0,0,0,0.4)] lg:backdrop-blur-[14px]",
            "lg:absolute lg:inset-y-0 lg:right-0 lg:w-[36.2%] lg:border-t-0",
            // An even curve over a longer travel: a hard ease-out makes a panel
            // this size lurch in and then crawl the rest of the distance.
            "lg:transition-transform lg:duration-800 lg:ease-(--ease-wipe) lg:will-change-transform",
            "lg:motion-reduce:transition-none",
            shown ? "lg:translate-x-0" : "lg:translate-x-full",
          )}
        >
          <div className="flex h-full flex-col px-6 py-8 text-bone sm:px-10 lg:px-[3.33vw] lg:pb-[3.4vw] lg:pt-[3.33vw]">
            <h3 className="display-3 text-[clamp(1.5rem,2.083vw,2.5rem)] leading-[1.12]">
              {project.name} by {project.developer}
            </h3>

            <p className="mt-[1.6rem] flex items-center gap-4 text-[clamp(0.6875rem,0.729vw,0.875rem)] uppercase tracking-[0.12em] text-bone-strong lg:mt-[2.6vw]">
              <span>By {project.developer}</span>
              <span
                aria-hidden="true"
                className="h-3 w-px bg-hairline-strong"
              />
              <span className="flex items-center gap-2 normal-case tracking-normal">
                <Icon name="pin" className="h-[1.1em] w-[1.1em]" />
                {project.community}
              </span>
            </p>

            <p className="prose-lede mt-4 text-[clamp(0.875rem,1.042vw,1.25rem)] lg:mt-[1.25vw]">
              {project.description}
            </p>

            <ul className="mt-8 space-y-[1.6rem] lg:mt-[5.2vw] lg:space-y-[2.6vw]">
              {project.highlights.map((highlight) => (
                <li key={highlight.title}>
                  <h4 className="font-sans text-[clamp(0.875rem,0.9375vw,1.125rem)] text-bone">
                    {highlight.title}
                  </h4>
                  <p className="mt-2 max-w-[34ch] font-sans text-[clamp(0.8125rem,0.885vw,1.0625rem)] leading-[1.3] text-bone-subtle">
                    {highlight.description}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 lg:mt-auto">
              <p className="font-sans text-[clamp(0.8125rem,0.9375vw,1.125rem)] text-bone-muted">
                {project.priceLabel}
              </p>
              <p className="mt-1 font-display text-[clamp(1.25rem,1.458vw,1.75rem)]">
                {formatPrice(project.price.amount, project.price.currency)}
              </p>

              {/*
                Only one of the pair is emphasised at a time. "Know more" wipes
                to solid on hover, so without this both read as the primary
                action at once; the enquiry button drops to the quiet
                treatment while that is happening. The only <a> in the pair is
                "Know more" — the enquiry trigger is a <button> and its dialog
                holds no links — so `a:hover` names it without a marker.
              */}
              <div className="group/cta mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <EnquiryDialog
                  label="Enquiry Now"
                  subject={project.name}
                  variant="solid"
                  className={cedeEmphasis}
                />
                <ButtonLink
                  href={project.href}
                  variant="bracket"
                  size="md"
                  casing="sentence"
                >
                  Know more
                </ButtonLink>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <p aria-live="polite" className="sr-only">
        Slide {index + 1} of {projects.length}: {project.name}
      </p>
    </div>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "glass-pane flex h-11 w-11 items-center justify-center text-bone transition-colors",
        "hover:bg-bone hover:text-ink disabled:opacity-35 disabled:hover:bg-black/19 disabled:hover:text-bone",
        direction === "next" && "-ml-px",
      )}
    >
      <span className="sr-only">
        {direction === "next" ? "Next slide" : "Previous slide"}
      </span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cn("h-4 w-4", direction === "previous" && "rotate-180")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
