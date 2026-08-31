import type { NextConfig } from "next";

/**
 * The Content-Security-Policy.
 *
 * Fonts are self-hosted by `next/font`, so no external font origin is needed.
 * The single third-party frame is the office map (`frame-src`); widen this
 * consciously when an analytics or chat vendor is added.
 *
 * **`script-src` carries `'unsafe-inline'`.** Next injects an inline bootstrap
 * script on every page, and the alternative — a per-request nonce — needs
 * middleware this build deliberately does not have (§9: the site ships almost
 * no JavaScript). That weakens the XSS half of the policy, so the rest is
 * doing real work: `object-src 'none'`, `base-uri 'self'` (blocks a `<base>`
 * tag rewriting every relative URL) and `form-action 'self'` (blocks an
 * injected form posting elsewhere) all hold regardless. Revisit if a nonce
 * middleware is ever added.
 *
 * Dev needs `'unsafe-eval'` for React Refresh; production does not get it.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'" +
    (process.env.NODE_ENV === "development" ? " ws: http://localhost:*" : ""),
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

/** Security headers applied to every route. */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Trailing slashes are off so every URL has exactly one canonical form.
  trailingSlash: false,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920, 2400],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Add the listing CDN / CMS host here once listings come from an API.
    remotePatterns: [],
  },

  experimental: {
    optimizePackageImports: ["@/components"],
    serverActions: {
      /**
       * The careers application posts a PDF CV. Server actions cap request
       * bodies at 1MB by default, which a scanned two-page CV clears easily —
       * the upload would fail before `submitApplication` ever ran. The action
       * rejects anything over 5MB itself, so this is the ceiling that lets it
       * do that rather than a limit anyone should rely on.
       */
      bodySizeLimit: "5mb",
    },
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Fingerprinted static art direction can be cached hard.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
