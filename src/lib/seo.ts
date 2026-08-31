import type { Metadata } from "next";

import { site } from "@/content/site";

/**
 * The canonical origin of the deployment. Every absolute URL — canonicals,
 * sitemap entries, Open Graph images, structured data `@id`s — is derived from
 * this, so it must be set per environment.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuveproperties.com"
).replace(/\/$/, "");

/** Joins a route onto the canonical origin. */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

const DEFAULT_OG_IMAGE = {
  url: "/images/og/og-default.webp",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

interface PageMetadataInput {
  /**
   * Page-specific title. A plain string picks up the layout's
   * "%s | NUVÉ Properties" template; `{ absolute }` opts out of it.
   */
  title: string | { absolute: string };
  description: string;
  /** Route path, e.g. "/properties". Used for the canonical link. */
  path: string;
  /** Overrides the shared social card. */
  image?: { url: string; width: number; height: number; alt: string };
  /** Set on thin, duplicated or paginated views. */
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
}

/**
 * Builds a complete, canonical-safe `Metadata` object for a route.
 *
 * Using one helper for every page keeps canonicals, Open Graph and Twitter
 * cards consistent, and means a change to social-card policy is a one-line
 * edit rather than a sweep across the app directory.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
  type = "website",
  publishedTime,
  keywords,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  // Social cards have no title template of their own, so the brand is
  // appended here to match what the <title> tag ends up saying.
  const socialTitle =
    typeof title === "string" ? `${title} | ${site.name}` : title.absolute;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title: socialTitle,
      description,
      locale: site.locale,
      images: [ogImage],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage.url],
    },
  };
}

/** Formats a price for display, e.g. "AED 42,000,000". */
export function formatPrice(
  amount: number,
  currency: "AED" = "AED",
  period?: "year" | "month",
): string {
  const formatted = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

  return period ? `${formatted} / ${period}` : formatted;
}

/** Formats an area in square metres, e.g. "726 m²". */
export function formatArea(areaSqm: number): string {
  return `${new Intl.NumberFormat("en-AE").format(areaSqm)} m²`;
}
