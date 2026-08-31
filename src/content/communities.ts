import type { Community } from "@/types";

/**
 * The three communities drawn on the explore-communities artboard
 * (node 981:2023). It repeats them across two rows of cards to fill the grid;
 * only three exist.
 *
 * **Card copy is transcribed; the rest is sample.** Each card's title and
 * one-line summary come from the artboard — where two of the three are cut off
 * mid-word ("a master- planne..", "master-planned_") and are completed here.
 * The longer descriptions, highlights and coordinates are written to give the
 * detail pages something real to render, and should be checked before
 * publishing.
 */
export const communities: Community[] = [
  {
    slug: "the-heights-country-club",
    name: "The Heights Country Club & Wellness by Emaar",
    tagline: "A master-planned golf and wellness community by Emaar",
    description:
      "The Heights Country Club & Wellness is a master-planned Emaar community built around a championship golf course, a wellness club and a run of landscaped parks. Villas and townhouses look onto the fairways, with the clubhouse, courts and pools at the centre of the plan.",
    highlights: [
      "Championship golf course",
      "Dedicated wellness and sports club",
      "Villas and townhouses by Emaar",
      "Landscaped parkland throughout",
    ],
    image: {
      src: "/images/communities/the-heights-country-club.webp",
      alt: "Aerial view of a beachfront villa community with the Dubai skyline behind",
      width: 1134,
      height: 856,
    },
    geo: { latitude: 25.0206, longitude: 55.2415 },
  },
  {
    slug: "dubai-maritime-city",
    name: "Dubai Maritime City",
    tagline: "An emerging waterfront community between Port Rashid and the Drydocks",
    description:
      "Dubai Maritime City is an emerging waterfront community on a man-made peninsula between Port Rashid and the Dubai Drydocks. The residential plots sit on the northern edge, giving the towers water on three sides and the Downtown skyline behind.",
    highlights: [
      "Purpose-built maritime district",
      "Water on three sides",
      "Minutes from Port Rashid",
      "Marina and waterfront promenade",
    ],
    image: {
      src: "/images/communities/dubai-maritime-city.webp",
      alt: "Aerial view of a lakeside community with low-rise residences and landscaped parkland",
      width: 1134,
      height: 858,
    },
    geo: { latitude: 25.2769, longitude: 55.2831 },
  },
  {
    slug: "dubai-south",
    name: "Dubai South",
    tagline: "One of Dubai's fastest-growing master-planned districts",
    description:
      "Dubai South is one of Dubai's fastest-growing master-planned districts, built around Al Maktoum International Airport and the Expo site. It pairs residential neighbourhoods with a logistics and business corridor, and is one of the few areas where land is still being released at scale.",
    highlights: [
      "Beside Al Maktoum International Airport",
      "Expo City on the doorstep",
      "Golf and parkland neighbourhoods",
      "Long-term masterplan with land still releasing",
    ],
    image: {
      src: "/images/communities/dubai-south.webp",
      alt: "A floodlit golf course at dusk with villas and towers beyond",
      width: 1134,
      height: 856,
    },
    geo: { latitude: 24.8964, longitude: 55.1614 },
  },
];

export const communitiesIntro = {
  hero: {
    eyebrow: "Explore Communities",
    title: "Featured Communities In Dubai",
  },
  eyebrow: "Communities",
  title: "discover Dubai's biggest communities",
  description:
    "Explore Dubai's top communities, each with unique lifestyle and investment potential. Find the neighbourhood that suits your living and investing needs.",
} as const;

export const offPlan = {
  eyebrow: "Invest in Dubai's Future, Today",
  title: "Explore Dubai's Top Off-Plan Investments with NUVÉ.",
  paragraphs: [
    "Dubai's property market is one of the most dynamic in the world—offering tax-free returns, high rental yields, and a growing portfolio of luxury developments. Whether you're a seasoned investor or a first-time buyer, NUVÉ Properties provides expert guidance and exclusive access to the latest off-plan projects in Dubai.",
    "From waterfront villas in Emaar The Oasis, Palm Jebel Ali, DAMAC Lagoons to skyline apartments in Downtown Dubai, we connect you with opportunities that match your goals and lifestyle. Our mission is to deliver a personalized, stress-free buying experience while maximizing your investment potential.",
    "At NUVÉ, we go beyond just listings—we offer insights, trend analysis, and market forecasts to help you make smart, strategic decisions. Backed by a team of experienced professionals and a deep understanding of Dubai's real estate ecosystem, we are your trusted partner in discovering premium off-plan developments with exceptional growth potential.",
  ],
  image: {
    src: "/images/communities/off-plan-skyline.webp",
    alt: "Dubai towers rising through low cloud at sunrise, seen from above",
    width: 1400,
    height: 1463,
  },
} as const;

/** Cards to a page, as drawn (two rows of three). */
export const COMMUNITIES_PER_PAGE = 6;
