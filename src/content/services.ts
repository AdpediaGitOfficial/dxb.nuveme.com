import type { Service } from "@/types";

/**
 * The eleven service lines, transcribed from the service artboard
 * (node 981:1288). Also feeds the Organization structured data through
 * `src/lib/jsonld.ts`, so the order here is the order search engines see.
 */
export const services: Service[] = [
  {
    slug: "property-sales",
    title: "Property Sales (Off-Plan & Ready Homes)",
    summary:
      "From exclusive off-plan launches to premium ready properties, NUVÉ connects you to Dubai's most sought-after developments. Our experts ensure a seamless and transparent journey, guiding you from selection to handover with integrity, insight, and passion.",
    image: {
      src: "/images/services/cards/property-sales.webp",
      alt: "A glass-walled villa at dusk, lit from within, set against woodland",
      width: 1134,
      height: 726,
    },
  },
  {
    slug: "property-listing-marketing",
    title: "Property Listing & Marketing",
    summary:
      "Sell or lease your property faster with NUVÉ. We combine professional photography, targeted digital campaigns, and premium portal exposure (Property Finder, Bayut, Dubizzle, etc.) to ensure your listing stands out and reaches the right audience.",
    image: {
      src: "/images/services/cards/property-listing-marketing.webp",
      alt: "An agent in a blue suit holding a small model house in cupped hands",
      width: 1134,
      height: 726,
    },
  },
  {
    slug: "property-valuation",
    title: "Property Valuation",
    summary:
      "Accurate, data-driven, and market-aligned valuations by NUVÉ help you make informed decisions — whether you're selling, refinancing, or building your portfolio. Our valuation experts leverage real-time data, comparable sales, and community insights to determine your property's true market value.",
    image: {
      src: "/images/services/cards/property-valuation.webp",
      alt: "A tablet showing a villa rendering half-drawn as a line plan, marked up with a stylus",
      width: 1134,
      height: 726,
    },
  },
  {
    slug: "investment-advisory",
    title: "Investment Advisory",
    summary:
      "Our advisors craft personalized investment strategies that align with your financial goals and lifestyle aspirations. Whether it's high-yield rentals, long-term capital growth, or diversified portfolios, we guide you in building wealth and legacy through real estate.",
    image: {
      src: "/images/services/cards/investment-advisory.webp",
      alt: "Advisors comparing performance charts on paper and a tablet across a meeting table",
      width: 1134,
      height: 726,
    },
  },
  {
    slug: "property-management",
    title: "Property Management",
    summary:
      "Experience true peace of mind as we take care of every aspect of property management for you. From finding reliable tenants and collecting rent to handling maintenance requests and lease renewals, NUVÉ is dedicated to ensuring your property stays profitable, secure, and completely hassle-free.",
    image: {
      src: "/images/services/cards/property-management.webp",
      alt: "House keys passed across a desk laid with floor plans and a model house",
      width: 1134,
      height: 726,
    },
  },
  {
    slug: "golden-visa",
    title: "Golden Visa Assistance",
    summary:
      "Invest AED 2 million or more in Dubai real estate and secure UAE's 10-year Golden Visa. Our dedicated team manages the entire process — from documentation to residency card issuance — ensuring a smooth, stress-free experience for you and your family.",
    image: {
      src: "/images/services/cards/golden-visa.webp",
      alt: "A passport and residency paperwork handed across a consultation desk",
      width: 1134,
      height: 726,
    },
  },
  {
    slug: "mortgage-financing",
    title: "Mortgage & Financing Support",
    summary:
      "Through our trusted banking partners, we help you obtain competitive mortgage rates and smooth approvals. From pre-qualification to disbursement, we simplify financing for both local and international investors. Our dedicated team is here to support you every step of the way.",
    image: {
      src: "/images/services/cards/mortgage-financing.webp",
      alt: "A model house beside stacked coins and a notebook, charts on the screen behind",
      width: 1134,
      height: 726,
    },
  },
  {
    slug: "relocation-concierge",
    title: "Relocation & Concierge Services",
    summary:
      "Moving to Dubai? We make it effortless. NUVÉ offers end-to-end relocation support — property selection, school guidance, bank account setup, and even business formation — a complete onboarding experience for your new life in Dubai. Let us help you settle in smoothly!",
    image: {
      src: "/images/services/cards/relocation-concierge.webp",
      alt: "A handshake at the entrance gate of a new home",
      width: 1134,
      height: 726,
    },
  },
  {
    slug: "after-sales-support",
    title: "After-Sales Support",
    summary:
      "Our relationship doesn't end at the sale. We assist with title deed transfers, snagging, furnishing, leasing, and portfolio review, ensuring long-term trust and satisfaction beyond every transaction. We're here to support you every step of the way. Your success is our priority.",
    image: {
      src: "/images/services/cards/after-sales-support.webp",
      alt: "A support advisor on a headset talking to a client from a laptop",
      width: 1134,
      height: 726,
    },
  },
  {
    slug: "portfolio-management",
    title: "Real Estate Portfolio Management",
    summary:
      "For multi-property investors, NUVÉ provides comprehensive asset tracking, ROI reports, and reinvestment strategies to optimize performance and strengthen your portfolio's value over time. Additionally, our platform offers personalized insights to help you make informed investment decisions.",
    image: {
      src: "/images/services/cards/portfolio-management.webp",
      alt: "Floor plans and printed reports being reviewed together at a desk",
      width: 1134,
      height: 726,
    },
  },
  {
    slug: "legal-documentation",
    title: "Legal & Documentation Assistance",
    summary:
      "NUVÉ's team supports every aspect of your property documentation from Dubai Land Department registration and Ejari setup to SPA reviews and NOC coordination, ensuring transparency and legal compliance at every stage. We are dedicated to making the process seamless and stress-free for our clients.",
    image: {
      src: "/images/services/cards/legal-documentation.webp",
      alt: "A clipped contract handed between two people across a desk",
      width: 1134,
      height: 726,
    },
  },
];

export const servicesIntro = {
  hero: {
    eyebrow: "NUVÉ - Services",
    title: "From Vision To Value – The NUVÉ Way",
  },
  eyebrow: "Our Expertise, Your Advantage",
  title: "Complete real estate solutions, built around you",
  description:
    "NUVÉ offers comprehensive real estate services, ensuring clarity and expertise. Our solutions simplify decisions and create lasting value.",
} as const;

export const consultation = {
  eyebrow: "The Right Place Awaits",
  title: "Let's Find Your Perfect Property",
  description:
    "We're shaping the future of real estate with excellence, integrity, and a legacy of trust and transparency at every step.",
  image: {
    src: "/images/services/consultation-marina.webp",
    alt: "A swimmer at the edge of an infinity pool looking across the water to the Dubai skyline at sunset",
    width: 2400,
    height: 1255,
  },
  /** Not drawn in the artboard — sensible defaults for a Dubai brokerage. */
  languages: ["English", "Arabic", "Hindi", "Russian", "Mandarin", "French"],
  timeSlots: [
    "Morning (9am – 12pm)",
    "Afternoon (12pm – 4pm)",
    "Evening (4pm – 7pm)",
  ],
} as const;

export const developerPartnersIntro = {
  eyebrow: "Our Trusted Partners",
  title: "Trusted by leading names in real estate",
  description:
    "We collaborate with established developers and industry leaders to bring our clients exceptional properties, trusted opportunities, and lasting value.",
} as const;
