import type { Faq } from "@/types";

/**
 * FAQ content. Rendered as an accordion and emitted as FAQPage structured
 * data, so answers should be self-contained and free of markup.
 */
export const faqs: Faq[] = [
  {
    id: "non-uae-residents",
    question: "Can non-UAE residents buy property in Dubai through NUVÉ Properties?",
    answer:
      "Yes. Non-residents can buy freehold property in designated areas of Dubai without holding a UAE residency visa. You will need a valid passport, and NUVÉ Properties coordinates the reservation agreement, the Dubai Land Department transfer and the escrow arrangements on your behalf, remotely if required.",
  },
  {
    id: "why-invest",
    question: "Why invest in Dubai real estate with NUVÉ Properties?",
    answer:
      "Dubai combines no annual property tax, no capital gains tax on residential sales and a rental market that settles in dirhams pegged to the US dollar. NUVÉ Properties adds off-market access to launches, comparable-sale data on every shortlisted unit and a handover team that stays with you after the keys are collected.",
  },
  {
    id: "golden-visa",
    question: "What is the UAE Golden Visa and how does NUVÉ Properties help me qualify?",
    answer:
      "The UAE Golden Visa offers long-term residency for investors, entrepreneurs, and skilled professionals. NUVÉ Properties assists with eligible properties, investments, legal coordination, and your Golden Visa application.",
  },
  {
    id: "dubai-land-department",
    question: "What is the Dubai Land Department (DLD) and why is it important?",
    answer:
      "The Dubai Land Department is the government body that registers every property transaction in the Emirate and issues the title deed. Registration through the DLD is what makes your ownership legally enforceable, and its permit number appears on every compliant listing — including ours.",
  },
  {
    id: "renting",
    question: "How do I rent a property in Dubai with NUVÉ Properties?",
    answer:
      "Share your budget, preferred communities and move-in date, and we shortlist available units and arrange viewings. Once you choose one, we prepare the tenancy contract, register it with Ejari, and coordinate the security deposit, agency fee and utility connection so you can move in on schedule.",
  },
  {
    id: "foreign-ownership",
    question: "Are there any restrictions on foreign ownership?",
    answer:
      "Foreign nationals can own property outright in Dubai's designated freehold areas, which include most of the communities we represent. Outside those zones, ownership is available on a leasehold basis, typically for 10 to 99 years. We confirm the tenure of every property before you commit.",
  },
  {
    id: "freehold",
    question: "What is a freehold property in Dubai?",
    answer:
      "A freehold property gives you full ownership of both the unit and its share of the land, with no time limit and the right to sell, lease or bequeath it. Freehold ownership is registered with the Dubai Land Department and is available to buyers of any nationality in designated areas.",
  },
  {
    id: "after-purchase",
    question: "How does NUVÉ Properties support me after the purchase?",
    answer:
      "After handover we manage snagging and defect resolution with the developer, arrange furnishing and fit-out where needed, and can take on letting and property management. Investors receive an annual portfolio review with rental benchmarking and resale guidance.",
  },
];
