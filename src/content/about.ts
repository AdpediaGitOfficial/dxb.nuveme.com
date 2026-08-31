import type {
  AboutPillar,
  Award,
  CoreValue,
  TeamGroup,
  TeamMember,
} from "@/types";

/**
 * Copy and imagery for the About page.
 *
 * Every string here is transcribed from the source artboard
 * (node 981:1052), so the page reads exactly as it was written rather than as
 * it was paraphrased. Swap the portraits and the consultant roster for real
 * people; everything else is final copy.
 */

export const aboutHero = {
  eyebrow: "Where Vision Becomes Legacy",
  title: "Exceptional spaces, value delivered.",
} as const;

export const legacy = {
  eyebrow: "More Than Property. A Legacy of Trust",
  title: "At NUVÉ Properties, we curate more than properties we craft legacies.",
  paragraphs: [
    "Founded on the belief that people will always matter more than property, NUVÉ Properties is redefining real estate through trusted advice, market expertise, and lasting relationships. With over a decade of experience across Dubai, Abu Dhabi, and international markets, we help clients make confident property decisions by combining strategic investment insight with personalised guidance. Whether purchasing a first home, expanding an investment portfolio, or securing long-term wealth, every recommendation is tailored to individual goals.",
    "Beyond property transactions, we provide a complete 360° real estate experience—from investment advisory, mortgage assistance, and UAE Golden Visa support to property management, resale, and end-to-end transaction services. At NUVÉ, we don't just help clients invest in property—we help them build a future with confidence.",
  ],
} as const;

export const visionIntro = {
  eyebrow: "From Vision to Value",
  title: "Built on vision. driven by purpose. defined by trust.",
  description:
    "A clear vision and a promise to put clients first. We build relationships through trust and meaningful results.",
} as const;

export const pillars: AboutPillar[] = [
  {
    id: "vision",
    label: "Our vision",
    ordinal: "01",
    body: "We're shaping Dubai's real estate future through bold thinking, trusted partnerships, and opportunities designed to create lasting value.",
  },
  {
    id: "mission",
    label: "Our mission",
    ordinal: "02",
    body: "We connect clients with the right opportunities through strategic guidance, market expertise, and a commitment to long-term growth.",
  },
  {
    id: "promise",
    label: "Our promise",
    ordinal: "03",
    body: "We lead with transparency, care, and consistency—supporting you from the first conversation to every step beyond the deal.",
  },
];

export const founderMessage = {
  eyebrow: "A Message from Our Founders",
  title: "Building Trust, One Relationship at a Time",
  paragraphs: [
    "At NUVÉ Properties, we believe real estate is more than buying or selling property—it's about understanding your goals and helping you make confident decisions. With years of experience working with leading developers and investors in Dubai, we bring market knowledge, clarity, and a people-first approach to every relationship.",
    "NUVÉ was built on a simple belief: people come before property. Whether you're purchasing your first home, searching for the right investment, or growing your portfolio, we provide honest guidance, transparent communication, and strategies tailored to your ambitions.",
    "Every recommendation is made with your best interests in mind. Every relationship is built for the long term. At NUVÉ Properties, we don't just help you find property—we help you move forward with confidence.",
  ],
  founder: {
    name: "Navin Gupta",
    role: "Founder & CEO",
    portrait: {
      src: "/images/about/founder-navin.webp",
      alt: "Navin Gupta, founder and chief executive of NUVÉ Properties",
      width: 1120,
      height: 1680,
    },
  },
} as const;

export const story = {
  eyebrow: "Our Story",
  title: "Built on Experience. Driven by Excellence.",
  body: "Navin has spent 15 years mastering real estate, understanding Dubai's market cycles, and negotiating deals. His expertise and trust led to the launch of Upstream Properties, which became one of Emaar's Top 10 agencies in a year. At NUVÉ Properties, he offers a 360° approach—combining market insight and strategic investment expertise. Whether you're an investor or a family seeking a home, his recommendations aim for financial value and confidence. With a background in investment services, Navin advises clients on wealth creation and portfolio growth, merging financial strategy with real estate expertise.",
  image: {
    src: "/images/about/story-interior.webp",
    alt: "A sculpted plaster ceiling above a linen-toned living room, framed by a slatted timber wall",
    width: 2400,
    height: 1345,
  },
} as const;

export const teamIntro = {
  eyebrow: "Meet Our Team",
  title: "The people behind your journeys",
} as const;

export const teamGroups: TeamGroup[] = [
  { id: "management", label: "Management" },
  { id: "consultants", label: "Consultants" },
];

/**
 * Portraits are placeholders from the design file. The management roster is
 * the one drawn in the artboard; the consultant roster is illustrative until
 * the real team photography lands.
 */
export const team: TeamMember[] = [
  {
    id: "amith-sharma",
    name: "Amith Sharma",
    role: "Chief executive officer",
    group: "management",
    image: {
      src: "/images/about/team/amith-sharma.webp",
      alt: "Amith Sharma, chief executive officer",
      width: 900,
      height: 900,
    },
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Chief operating officer",
    group: "management",
    image: {
      src: "/images/about/team/priya-nair.webp",
      alt: "Priya Nair, chief operating officer",
      width: 900,
      height: 900,
    },
  },
  {
    id: "rahul-metha",
    name: "Rahul Metha",
    role: "Chief technology officer",
    group: "management",
    image: {
      src: "/images/about/team/rahul-metha.webp",
      alt: "Rahul Metha, chief technology officer",
      width: 900,
      height: 900,
    },
  },
  {
    id: "sneha-kapor",
    name: "Sneha Kapor",
    role: "Head of marketing",
    group: "management",
    image: {
      src: "/images/about/team/sneha-kapor.webp",
      alt: "Sneha Kapor, head of marketing",
      width: 900,
      height: 900,
    },
  },
];

export const valuesIntro = {
  eyebrow: "Our core values",
  title: "The principles that define everything we do",
  description:
    "Our values shape decisions and experiences. They keep us focused on doing right, delivering results, and prioritizing clients.",
  image: {
    src: "/images/about/values-windsurf.webp",
    alt: "A windsurfer crossing the water in front of a beachfront residential development",
    width: 1000,
    height: 1055,
  },
} as const;

export const coreValues: CoreValue[] = [
  {
    id: "integrity",
    ordinal: "01",
    title: "Integrity",
    description:
      "Our clients entrust us with some of their most significant decisions, and we honor that responsibility with the highest levels of honesty, respect, and accountability. Trust is not only earned—it is safeguarded each day through transparency, reliability, and principled actions.",
  },
  {
    id: "excellence",
    ordinal: "02",
    title: "Excellence",
    description:
      "Hard work is not a matter of choice—it is the essence of who we are. Our discipline, persistence, and determination have shaped our reputations. We embrace challenges, pursue excellence with unwavering focus, and consistently strive to raise industry standards.",
  },
  {
    id: "customer-centricity",
    ordinal: "03",
    title: "Customer-Centricity",
    description:
      "We believe true success is achieved in an environment built on respect, collaboration, and meaningful relationships. We place people at the center of everything we do. Beyond creating transactions, we foster belonging, loyalty, and lasting connections.",
  },
];

export const awardsIntro = {
  eyebrow: "Our Achievements",
  title: "Excellence Awards",
  description:
    "We're shaping the future of real estate with excellence, integrity, and a legacy of trust and transparency at every step.",
} as const;

export const awards: Award[] = [
  {
    id: "q3-broker-2024",
    title: "Quarter 3 Broker Awards 2024",
    issuer: "Top performer",
    image: {
      src: "/images/about/awards/award-1.webp",
      alt: "Quarter 3 Broker Awards 2024 trophy for top broker excellence",
      width: 340,
      height: 557,
    },
  },
  {
    id: "emaar-q4-2023",
    title: "Emaar Award Q4 2023",
    issuer: "Excellence in real estate",
    image: {
      src: "/images/about/awards/award-2.webp",
      alt: "Emaar Award Q4 2023 trophy for excellence in real estate",
      width: 340,
      height: 557,
    },
  },
  {
    id: "h1-broker-2024",
    title: "H1 Broker Award 2024",
    issuer: "Outstanding performance",
    image: {
      src: "/images/about/awards/award-3.webp",
      alt: "H1 Broker Award 2024 trophy for outstanding performance",
      width: 340,
      height: 557,
    },
  },
  {
    id: "q3-broker-2024-top",
    title: "Quarter 3 Broker Awards 2024",
    issuer: "Top performer",
    image: {
      src: "/images/about/awards/award-4.webp",
      alt: "Quarter 3 Broker Awards 2024 top performer trophy",
      width: 340,
      height: 557,
    },
  },
];
