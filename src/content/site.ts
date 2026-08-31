import type { NavLink } from "@/types";

/**
 * Single source of truth for organisation-level facts. Everything that ends up
 * in metadata, structured data, the footer or the contact page reads from here.
 */
export const site = {
  name: "NUVÉ Properties",
  legalName: "NUVÉ Properties LLC",
  shortName: "NUVÉ",
  tagline: "Where exceptional living begins",
  description:
    "NUVÉ Properties connects clients with Dubai's top residential and investment opportunities, providing expert knowledge and personalised service across buying, renting and off-plan.",
  locale: "en_AE",
  language: "en",
  foundingYear: 2019,

  contact: {
    email: "info@nuveproperties.com",
    phone: "+971 55 139 5500",
    /** E.164 — used for tel: links and structured data. */
    phoneE164: "+971551395500",
    whatsapp: "971551395500",
  },

  address: {
    street: "510, The Offices at Ibn Battuta Gate",
    locality: "Jebel Ali",
    region: "Dubai",
    country: "AE",
    countryName: "United Arab Emirates",
    postalCode: "",
  },

  geo: { latitude: 25.0447, longitude: 55.1195 },

  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },

  socials: [
    { name: "Instagram", href: "https://www.instagram.com/nuveproperties" },
    { name: "Facebook", href: "https://www.facebook.com/nuveproperties" },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/nuveproperties",
    },
    { name: "YouTube", href: "https://www.youtube.com/@nuveproperties" },
    { name: "X", href: "https://x.com/nuveproperties" },
    { name: "TikTok", href: "https://www.tiktok.com/@nuveproperties" },
  ],
} as const;

/** Primary navigation — mirrors the "Quick Links" column in the design. */
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Communities", href: "/communities" },
  { label: "Services", href: "/services" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

/** "Property Types" column in the footer — each maps to a filtered listing view. */
export const propertyTypeNav: NavLink[] = [
  { label: "Luxury Villas", href: "/properties?type=villa" },
  { label: "Apartments", href: "/properties?type=apartment" },
  { label: "Townhouses", href: "/properties?type=townhouse" },
  { label: "Penthouses", href: "/properties?type=penthouse" },
  { label: "Waterfront Homes", href: "/properties?type=waterfront" },
  { label: "Off-Plan Properties", href: "/off-plan" },
];

/**
 * The header drawer's navigation.
 *
 * It is deliberately not `primaryNav`. That list is the footer's "Quick Links"
 * column exactly as every artboard draws it — seven links, FAQs among them —
 * and changing it would change the drawn footer. The header carries the
 * routes the business wants people to walk: FAQs drops out, List Your
 * Property comes in alongside Blog and Careers.
 *
 * If the footer should follow, delete this and add the entries to
 * `primaryNav` instead.
 */
export const headerNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Communities", href: "/communities" },
  { label: "Services", href: "/services" },
  { label: "Off-Plan", href: "/off-plan" },
  { label: "List Your Property", href: "/list-your-property" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];
