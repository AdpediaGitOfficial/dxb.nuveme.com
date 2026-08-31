"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ButtonLink, cedeEmphasis } from "@/components/ui/Button";
import { EnquiryDialog } from "@/components/ui/EnquiryDialog";
import { Icon } from "@/components/ui/Icon";
import { formatArea, formatPrice } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";

/**
 * The expand control on a listing card, and the detail overlay it opens.
 *
 * The overlay travels in from the left edge, so the card reads as opening out
 * rather than a dialog appearing on top of it. Layout follows the design: the
 * photograph fills the left, a frosted panel carries the detail on the right,
 * and the gallery thumbnails sit under the image.
 *
 * The card itself is already a link to the full listing, so this control is a
 * genuinely different action — a closer look without leaving the page.
 *
 * The overlay is rendered through a portal to `document.body`. Each card sets
 * `isolate` and `container-type`, both of which open a stacking context, so an
 * overlay left inside the card competes only within that card and the cards
 * after it in the grid paint straight over the top of it. Layout containment
 * would also make the card the containing block for a fixed-position child.
 */
export function PropertyQuickView({
  property,
  triggerClassName,
}: {
  property: Property;
  /**
   * Overrides the trigger's size and position. Everything here is sized in
   * `cqw` against the card, and the off-plan card is twice the home card's
   * width — the same `9.78cqw` control would render at 83px there against 41
   * on the home grid. The off-plan card passes the geometry that matches its
   * own status badge instead.
   */
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [frame, setFrame] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Portals need a DOM target, so wait for the client before rendering one.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dialogId = `quickview-${property.slug}`;
  const titleId = `${dialogId}-title`;
  const gallery = property.gallery?.length
    ? property.gallery
    : [property.image];
  const active = gallery[frame] ?? property.image;

  const close = useCallback(() => {
    setShown(false);
    // Let the panel travel back out before it leaves the tree.
    window.setTimeout(() => {
      setOpen(false);
      triggerRef.current?.focus();
    }, 380);
  }, []);

  // Mount first, then flip the transform on the next frame so the browser has
  // a start value to animate from.
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // The enquiry form opens a modal `<dialog>` on top of this panel, and
      // Escape belongs to whatever is nearest the front. The dialog closes
      // itself; without this the same key would take the panel down with it
      // and drop the reader back on the grid.
      //
      // The test is where the key came from, not what is still open: the
      // dialog's own handler is registered when the card mounts, so it runs
      // before this one and `close()` clears the `open` attribute
      // synchronously — by the time we look, `dialog[open]` matches nothing.
      // While the dialog has focus the event originates inside it, whichever
      // handler ran first.
      const target = event.target as Element | null;
      if (target?.closest?.("dialog")) return;
      close();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setFrame(0);
          setOpen(true);
        }}
        aria-controls={dialogId}
        aria-expanded={open}
        className={cn(
          "absolute z-20 flex aspect-square items-center justify-center",
          "bg-white/70 text-ink transition-colors hover:bg-white",
          triggerClassName ??
            "right-[2.44%] top-[2.67%] w-[9.78cqw] min-w-[1.75rem]",
        )}
      >
        <span className="sr-only">Take a closer look at {property.name}</span>
        <Icon name="expand" className="h-[37%] w-[37%]" />
      </button>

      {mounted &&
        createPortal(
          <div
            id={dialogId}
            className={cn(
              "fixed inset-0 z-100 items-center justify-center",
              open ? "flex" : "hidden",
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            inert={!open}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className={cn(
                "absolute inset-0 cursor-default bg-black/80 transition-opacity duration-400",
                shown ? "opacity-100" : "opacity-0",
              )}
            />

            <div
              ref={dialogRef}
              tabIndex={-1}
              className={cn(
                "relative mx-auto flex max-h-[92svh] w-[94vw] max-w-[112rem] flex-col overflow-auto",
                "bg-ink shadow-2xl outline-none lg:flex-row lg:overflow-hidden",
                // Enters from the left, travelling right into place.
                "transition-transform duration-600 ease-(--ease-wipe) motion-reduce:transition-none",
                shown ? "translate-x-0" : "-translate-x-[110%]",
              )}
            >
              <div className="relative lg:w-[68%]">
                <div className="relative aspect-4/3 w-full lg:aspect-16/11">
                  <Image
                    key={active.src}
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="(min-width: 1024px) 64vw, 94vw"
                    className="object-cover"
                  />
                </div>

                {gallery.length > 1 && (
                  <ul className="flex gap-2 bg-ink p-3 lg:absolute lg:bottom-4 lg:left-4 lg:z-10 lg:bg-transparent lg:p-0">
                    {gallery.map((shot, shotIndex) => (
                      <li key={shot.src}>
                        <button
                          type="button"
                          onClick={() => setFrame(shotIndex)}
                          aria-current={
                            shotIndex === frame ? "true" : undefined
                          }
                          className={cn(
                            "relative block h-16 w-24 overflow-hidden transition-opacity duration-300 sm:h-20 sm:w-32",
                            shotIndex === frame
                              ? "opacity-100 outline outline-2 -outline-offset-2 outline-white"
                              : "opacity-55 hover:opacity-85",
                          )}
                        >
                          <span className="sr-only">
                            View image {shotIndex + 1} of {gallery.length}
                          </span>
                          <Image
                            src={shot.src}
                            alt=""
                            fill
                            sizes="128px"
                            className="object-cover"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex flex-col gap-6 bg-[rgba(0,0,0,0.55)] p-7 text-bone backdrop-blur-[14px] sm:p-10 lg:w-[32%] lg:overflow-y-auto">
                <div>
                  <h2
                    id={titleId}
                    className="display-3 text-[clamp(1.375rem,2.083vw,2.5rem)] leading-[1.12]"
                  >
                    {property.name}
                  </h2>
                  <p className="mt-4 flex items-center gap-2 text-sm text-bone-strong">
                    <Icon name="pin" className="h-[1.1em] w-[1.1em]" />
                    {property.community}
                  </p>
                </div>

                <p className="prose-lede text-[clamp(0.875rem,1.042vw,1.25rem)]">
                  {property.description}
                </p>

                <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-hairline py-4 text-sm text-bone/80">
                  <Spec
                    icon="bed"
                    label="Bedrooms"
                    value={`${property.bedrooms} Bed`}
                  />
                  <Divider />
                  <Spec
                    icon="bath"
                    label="Bathrooms"
                    value={`${property.bathrooms} Bath`}
                  />
                  <Divider />
                  <Spec
                    icon="area"
                    label="Area"
                    value={formatArea(property.areaSqm)}
                  />
                </dl>

                <div>
                  <p className="font-sans text-sm text-bone-muted">
                    {property.pricePeriod ? "Annual rent" : "Discounted price"}
                  </p>
                  <p className="mt-1 font-display text-[clamp(1.25rem,1.458vw,1.75rem)]">
                    {formatPrice(
                      property.price.amount,
                      property.price.currency,
                      property.pricePeriod,
                    )}
                  </p>
                </div>

                {/* The pair swaps emphasis on hover — see `SignatureCarousel`. */}
                <div className="group/cta mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
                  <EnquiryDialog
                    label="Enquiry Now"
                    subject={property.name}
                    variant="solid"
                    className={cedeEmphasis}
                  />
                  <ButtonLink
                    href={`/properties/${property.slug}`}
                    variant="bracket"
                    size="md"
                    casing="sentence"
                  >
                    Know more
                  </ButtonLink>
                </div>
              </div>

              <button
                type="button"
                onClick={close}
                className="glass-pane absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-bone transition-colors hover:bg-white hover:text-ink"
              >
                <span className="sr-only">Close</span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: "bed" | "bath" | "area";
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <dt className="sr-only">{label}</dt>
      <Icon name={icon} className="h-[1.05em] w-[1.05em]" />
      <dd>{value}</dd>
    </div>
  );
}

function Divider() {
  return <span aria-hidden="true" className="h-[0.75em] w-px bg-white/40" />;
}
