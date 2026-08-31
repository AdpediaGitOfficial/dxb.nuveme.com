import type { Metadata, Viewport } from "next";
import { Lexend_Deca, Playfair_Display } from "next/font/google";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { graph, organizationSchema, websiteSchema } from "@/lib/jsonld";
import { siteUrl } from "@/lib/seo";

import "./globals.css";

/**
 * `next/font` self-hosts each face and inlines the `@font-face` rules, so
 * there is no render-blocking request to Google and no layout shift from a
 * late swap.
 *
 * Two faces carry the whole site: Saol Display for headings and Lexend Deca
 * for everything else. Saol is licensed and not in the repo, so Playfair
 * Display is loaded as its fallback — drop the WOFF2 into `public/fonts` and
 * the `@font-face` rules in `globals.css` take over (see its README).
 */
const lexend = Lexend_Deca({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-lexend",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Luxury Real Estate in Dubai`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.legalName,
  category: "real estate",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: true,
    address: false,
    email: false,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AE"
      data-scroll-behavior="smooth"
      className={`${lexend.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Site-wide graph: emitted once here rather than per page, so the
            Organization and WebSite nodes have a single stable definition
            that page-level nodes can reference by @id. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
