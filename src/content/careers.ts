import type { JobOpening } from "@/types";

/**
 * Copy for the careers page, transcribed from the careers artboard
 * (node 981:1486).
 */

export const careersHero = {
  eyebrow: "Explore Careers",
  title: "Build Your Legacy With Us",
} as const;

export const careersIntro = {
  eyebrow: "Build Your Future With NUVÉ",
  title: "Build a career that shapes the future of real estate.",
  body: "At NUVÉ Properties, we're not just constructing a real estate business; we're cultivating a vibrant team fueled by ambition, integrity, and a commitment to growth. We invite you to be part of a collaborative environment where your innovative ideas are not only welcomed but celebrated, where your potential is recognized and nurtured, and where every achievement is a collective victory. Whether you bring years of experience or are embarking on your career journey, you'll find a welcoming space at NUVÉ that encourages your development and success.",
} as const;

export const lifeAtNuve = {
  eyebrow: "Life at NUVÉ",
  title: "Driven by purpose. united by people.",
  lede: "We believe success and happiness go hand in hand. At NUVÉ you'll find:",
  points: [
    "Freedom & Responsibility – You own your growth while enjoying the support of a seasoned leadership team.",
    "Healthy Competition – We push each other to excel without losing respect or camaraderie.",
    "People-First Environment – From training to mentorship to after-sales support, our focus is on lifting our people as much as our clients.",
    "Legacy Building – We're not only selling properties, we're shaping futures — yours included.",
  ],
  image: {
    src: "/images/careers/life-at-nuve.webp",
    alt: "Five NUVÉ advisors in suits standing together, photographed in black and white",
    width: 1300,
    height: 1076,
  },
} as const;

export const openRolesIntro = {
  eyebrow: "Join the team shaping the future.",
  title: "Ready To Build Your Career With NUVÉ?",
  description:
    "We're looking for talented, driven individuals to join our team. If you're ready to work hard and be part of something bigger, we'd love to hear from you.",
} as const;

/**
 * The artboard draws one role — Property Consultant — twice, and its body is a
 * run-on with the separators lost and the last line cut off mid-word
 * ("Consistent with calls and follow-"). It is set out here as a summary plus
 * the responsibilities it was listing, which is what the copy is; the second
 * card was a duplicate rather than a second vacancy, so only one is carried.
 *
 * The drawn pagination runs to 01–04. It is generated from this list, so it
 * appears once there is more than one page of roles.
 */
export const openRoles: JobOpening[] = [
  {
    slug: "property-consultant",
    title: "Property Consultant",
    location: "In person",
    commitment: "Full time",
    summary:
      "Selling off-plan and secondary-market homes across Dubai, from first enquiry to handover — for people who negotiate well, follow up relentlessly and want the deal to be right rather than quick.",
    responsibilities: [
      "Excellent communication and negotiation skills",
      "Strong knowledge of off-plan and secondary-market properties",
      "Self-motivated, goal-oriented and a strong team player",
      "Familiarity with CRM systems and property listing portals is a plus",
      "Consistent with calls and follow-ups",
    ],
  },
];

/** Roles to a page, as drawn. */
export const ROLES_PER_PAGE = 2;
