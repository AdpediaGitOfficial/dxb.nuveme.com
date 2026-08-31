"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { headerNav, propertyTypeNav, site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The design uses a single hamburger at every breakpoint, so the navigation
 * lives in a full-screen overlay. The overlay is always present in the DOM —
 * hidden with `inert` rather than unmounted — so every link stays crawlable
 * and the panel can animate in and out.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /** Escape and the close button: focus goes back to what opened the panel. */
  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  /**
   * Any navigation out of the panel closes it, including a link to the route
   * we are already on.
   *
   * The route effect below is not enough on its own: `usePathname` does not
   * change when you pick the current page from the menu, nor when only the
   * query changes — so every "Property types" link was dead while on
   * `/properties`, and so was the current page's own link. Focus is left alone
   * here because the navigation moves it.
   */
  const dismissOnNavigation = useCallback((event: React.MouseEvent) => {
    // Deliberately not `event.defaultPrevented`: this handler is delegated
    // from the <nav>, so React calls it after the <Link> on the anchor below
    // it, and Next calls preventDefault() there to take over the navigation.
    // Guarding on it skipped every link that actually worked.
    //
    // A modified click opens a new tab and leaves this page where it is, so
    // the panel should stay put for those.
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  }, []);

  // Backstop for history navigation (back/forward) and any link we do not own.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Escape closes, Tab stays inside, and the body scroll lock keeps the page
   * still behind the panel.
   *
   * The trap is needed because the page underneath is not inert while the
   * panel is open — without it Tab walked straight out of the menu and into
   * the forty-odd links behind it.
   */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      const toggle = toggleRef.current;
      if (!panel || !toggle) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      // The toggle is the close button, so it is the head of the cycle.
      const last = focusable.at(-1) ?? toggle;

      if (event.shiftKey && document.activeElement === toggle) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        toggle.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-(--ease-editorial)",
        // The panel starts below the bar, so while it is open the bar has to
        // carry the ground itself — otherwise the page shows through the top
        // 96px of an otherwise solid overlay.
        open && "bg-ink border-b border-transparent",
        !open &&
          scrolled &&
          "border-b border-hairline bg-ink/85 backdrop-blur-md",
        !open && !scrolled && "border-b border-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between sm:h-24">
        <Link
          href="/"
          onClick={dismissOnNavigation}
          className="relative block h-[2.6rem] w-[4.9rem] sm:h-[3.1rem] sm:w-[5.8rem]"
          aria-label={`${site.name} — home`}
        >
          <Image
            src="/brand/nuve-properties.svg"
            alt={site.name}
            fill
            priority
            sizes="93px"
            className="object-contain object-left"
          />
        </Link>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-bone"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
            </svg>
          ) : (
            <Icon name="menu" className="h-5 w-8" />
          )}
        </button>
      </Container>

      <div
        id="site-menu"
        ref={panelRef}
        inert={!open}
        className={cn(
          // `text-bone` is load-bearing, not decoration: `.eyebrow` and the
          // rest of the ramp take their colour from `currentColor`
          // (DESIGN-SYSTEM.md §4), and this overlay paints its own ground with
          // `bg-ink` rather than the `panel` utility — so without a foreground
          // the two column headings inherited the body's ink and rendered
          // black on black.
          "fixed inset-0 top-20 bg-ink text-bone transition-[opacity,visibility] duration-400 ease-(--ease-editorial) sm:top-24",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <Container className="h-full overflow-y-auto pb-16 pt-10 lg:pt-16">
          {/* One handler for every link in the panel, present and future. */}
          <nav
            aria-label="Main"
            onClick={dismissOnNavigation}
            className="grid gap-12 lg:grid-cols-2"
          >
            <ul className="flex flex-col gap-1">
              {headerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                    className="display-3 block py-2 text-bone-strong transition-colors hover:text-bone aria-[current=page]:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-10">
              <div>
                <h2 className="eyebrow">Property types</h2>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {propertyTypeNav.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-bone-muted transition-colors hover:text-bone"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="eyebrow">Get in touch</h2>
                <div className="mt-5 flex flex-col gap-2 text-sm text-bone-muted">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="transition-colors hover:text-bone"
                  >
                    {site.contact.email}
                  </a>
                  <a
                    href={`tel:${site.contact.phoneE164}`}
                    className="transition-colors hover:text-bone"
                  >
                    {site.contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
