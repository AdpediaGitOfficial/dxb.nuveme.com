"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Splits a drawn figure into the part that counts and the text around it:
 * "980" → ("", "980", ""), "AED 3B" → ("AED ", "3", "B").
 */
const FIGURE = /^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/;

/** `useLayoutEffect` warns when React renders this on the server. */
const useBeforePaint =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Approximates `--ease-editorial` — cubic-bezier(0.22, 1, 0.36, 1). The figure
 * covers most of its ground early and settles onto the final number rather
 * than arriving at speed, which is what stops it reading as a slot machine.
 */
const ease = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Rebuilds the drawn figure around a running number, so every frame reads the
 * way the final one does — same prefix, same grouping, same decimal places.
 * Module scope rather than a closure so the effects below can depend on the
 * primitives that shape it instead of on a function that changes identity on
 * every render.
 */
function formatFigure(
  n: number,
  prefix: string,
  suffix: string,
  decimals: number,
  grouped: boolean,
) {
  const body = grouped
    ? n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : n.toFixed(decimals);
  return prefix + body + suffix;
}

interface CountUpProps {
  /** The final figure, exactly as it should read when the count lands. */
  value: string;
  /** Milliseconds from zero to `value`. */
  duration?: number;
  className?: string;
}

/**
 * A figure that counts up to its value the first time it is scrolled into
 * view, then stays there.
 *
 * Decorative by construction: the root is `aria-hidden`, so a caller has to
 * carry the real figure in its own accessible text. `StatsPanel` does that
 * with an `sr-only` span, which also lets it read the raised "+" as part of
 * the same string instead of announcing a number that ticks.
 *
 * The animation is skipped entirely under `prefers-reduced-motion`, and the
 * server renders the final value — so with no JavaScript, a reader who asked
 * for stillness, or a crawler, the figure is simply the number.
 *
 * **The count runs in normal flow, so a suffix beside it moves while it
 * counts.** That is deliberate. A fixed box would hold the suffix still, but
 * no box can both match the drawn width and contain the count: Saol is
 * unlicensed, and the Playfair fallback ships no tabular figures, where "0" is
 * the widest digit — "000" measures 54.5px against the drawn "980" at 49.3px
 * (§10.24). Holding the final geometry exactly is worth more than holding the
 * "+" still for 1.6 seconds.
 */
export function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const match = FIGURE.exec(value);
  const [prefix, digits, suffix] = match
    ? [match[1] ?? "", match[2] ?? "", match[3] ?? ""]
    : ["", "", ""];

  const target = Number(digits.replace(/,/g, ""));
  const decimals = digits.split(".")[1]?.length ?? 0;
  const grouped = digits.includes(",");
  const animatable = Boolean(match) && Number.isFinite(target);

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  /**
   * Drop to zero before the browser paints, never during `useState` — the
   * server sent the final value and hydration has to match it.
   */
  useBeforePaint(() => {
    if (!animatable) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDisplay(formatFigure(0, prefix, suffix, decimals, grouped));
    setArmed(true);
    // Every dependency is derived from `value`, so this settles on mount and
    // does not run again for a figure that never changes.
  }, [animatable, prefix, suffix, decimals, grouped]);

  useEffect(() => {
    const node = ref.current;
    if (!armed || !node) return;

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      start ||= now;
      const t = Math.min((now - start) / duration, 1);
      setDisplay(
        formatFigure(ease(t) * target, prefix, suffix, decimals, grouped),
      );
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        // Once only: the figure is a fact, not an effect to replay on
        // every pass.
        observer.disconnect();
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [armed, duration, target, prefix, suffix, decimals, grouped]);

  return (
    <span ref={ref} aria-hidden="true" className={cn(className)}>
      {display}
    </span>
  );
}
