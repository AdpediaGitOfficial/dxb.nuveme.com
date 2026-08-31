/**
 * Domain types for the NUVÉ Properties site.
 *
 * These describe the shape the UI consumes. The content modules under
 * `src/content` are the current source of truth; when listings move to a CMS
 * or the DLD feed, only the repositories in `src/lib/repositories` change —
 * these types and every component stay as they are.
 */

export type ListingIntent = "buy" | "rent" | "off-plan";

export type PropertyKind =
  | "apartment"
  | "villa"
  | "townhouse"
  | "penthouse"
  | "waterfront"
  | "off-plan";

export interface ImageAsset {
  /** Path under /public or an absolute CDN URL. */
  src: string;
  /** Always describe the subject — this is read aloud and indexed. */
  alt: string;
  width: number;
  height: number;
}

export interface Money {
  amount: number;
  currency: "AED";
}

export interface Property {
  slug: string;
  name: string;
  /** Marketing headline used on the detail page. */
  headline: string;
  description: string;
  community: string;
  communitySlug: string;
  city: string;
  intent: ListingIntent;
  kind: PropertyKind;
  price: Money;
  /** Rentals are quoted per year in Dubai. */
  pricePeriod?: "year" | "month";
  bedrooms: number;
  bathrooms: number;
  /** Built-up area in square metres. */
  areaSqm: number;
  developer?: string;
  handover?: string;
  /** Dubai Land Department permit number — required on UAE listing pages. */
  permitNumber?: string;
  features: string[];
  image: ImageAsset;
  gallery?: ImageAsset[];
  featured?: boolean;
  publishedAt: string;
}

export interface Community {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: ImageAsset;
  /** Approximate centroid, used for LocalBusiness / Place structured data. */
  geo?: { latitude: number; longitude: number };
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: "google";
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

/** A featured development shown in the Signature Properties carousel. */
export interface SignatureProject {
  slug: string;
  name: string;
  developer: string;
  community: string;
  description: string;
  /** The amenities listed in the slide-in panel. */
  highlights: Array<{ title: string; description: string }>;
  price: Money;
  priceLabel: string;
  image: ImageAsset;
  href: string;
}

export interface Partner {
  name: string;
  logo: ImageAsset;
  /**
   * Rendered height in artboard pixels. The logos are not a uniform size in
   * the design — each is set to its own optical weight — so the rail cannot
   * just clamp them all to one height.
   */
  height: number;
  href?: string;
}

export interface Stat {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  /** The card paragraph. Also the `description` in the service structured data. */
  summary: string;
  image: ImageAsset;
}

export interface NavLink {
  label: string;
  href: string;
  /** Rendered in the mobile drawer and used for aria-current matching. */
  children?: NavLink[];
}

/**
 * The three "From Vision to Value" columns on the About page — a label, a
 * ghosted ordinal and a short statement, split by full-height hairlines.
 */
export interface AboutPillar {
  id: string;
  label: string;
  ordinal: string;
  body: string;
}

export interface TeamGroup {
  id: "management" | "consultants";
  label: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  group: TeamGroup["id"];
  image: ImageAsset;
}

/** A row in the "Our core values" table: ordinal, serif title, description. */
export interface CoreValue {
  id: string;
  ordinal: string;
  title: string;
  description: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  image: ImageAsset;
}

/** A role on the careers page. */
export interface JobOpening {
  slug: string;
  title: string;
  /** "In person", "Hybrid", "Remote". */
  location: string;
  /** "Full time", "Part time", "Contract". */
  commitment: string;
  /** The two-line précis shown on the card. */
  summary: string;
  /** Opened by "View more". */
  responsibilities: string[];
}

/** One headed run of an article. The first block usually has no heading. */
export interface PostSection {
  heading?: string;
  paragraphs: string[];
}

/** An article on the blog. */
export interface Post {
  slug: string;
  title: string;
  /** The two-line précis on the index card. */
  excerpt: string;
  /** The lede under the title on the article page — wider than the excerpt. */
  standfirst: string;
  author: string;
  body: PostSection[];
  /** ISO date-time — drives ordering, the byline and `datePublished`. */
  publishedAt: string;
  image: ImageAsset;
}
