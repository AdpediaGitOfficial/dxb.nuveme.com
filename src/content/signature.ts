import type { SignatureProject } from "@/types";

/**
 * The Signature Properties carousel.
 *
 * Each slide carries the detail panel that slides in over the image, so the
 * panel content lives with the slide rather than in the component. The
 * thumbnail strip under the carousel is built from these same images.
 */
export const signatureProjects: SignatureProject[] = [
  {
    slug: "coral-collection-villas",
    name: "The Coral Collection Villas",
    developer: "Nakheel",
    community: "Palm Jumeirah",
    description:
      "Explore luxury residences designed for refined living with exceptional design, world-class amenities, and prestigious locations.",
    highlights: [
      {
        title: "Terrace Trails",
        description:
          "Explore beautiful scenic walking paths that delight nature lovers everywhere.",
      },
      {
        title: "Community Garden",
        description:
          "A communal area for planting and growing various plants together.",
      },
      {
        title: "Oasis Kid's Play Area",
        description:
          "A designated safe zone for children to play and explore.",
      },
    ],
    price: { amount: 42000000, currency: "AED" },
    priceLabel: "Discounted price",
    image: {
      src: "/images/signature/signature-4.webp",
      alt: "Sculpted beachfront towers with rippling balconies above a palm-lined lagoon",
      width: 1920,
      height: 1000,
    },
    href: "/properties/signature-villa-palm-jumeirah-frond-k",
  },
  {
    slug: "creek-harbour-residences",
    name: "Creek Harbour Residences",
    developer: "Emaar",
    community: "Dubai Creek Harbour",
    description:
      "A waterfront address on the creek, with parkland, a marina promenade and uninterrupted sightlines back to the Downtown skyline.",
    highlights: [
      {
        title: "Creek Promenade",
        description: "Two kilometres of waterfront walkway on the doorstep.",
      },
      {
        title: "Wildlife Sanctuary",
        description:
          "Ras Al Khor and its flamingo lagoons sit directly across the water.",
      },
      {
        title: "Marina Berths",
        description: "Private moorings available to residents of the tower.",
      },
    ],
    price: { amount: 9750000, currency: "AED" },
    priceLabel: "Starting from",
    image: {
      src: "/images/signature/signature-1.webp",
      alt: "Living room with a sculptural stone fireplace opening onto parkland",
      width: 1920,
      height: 1000,
    },
    href: "/properties/bluewaters-bay-three-bedroom-residence",
  },
  {
    slug: "beachfront-collection",
    name: "The Beachfront Collection",
    developer: "Emaar",
    community: "Emaar Beachfront",
    description:
      "A gated island address between the Marina and the Palm, with 1.5 kilometres of private beach and a residents' yacht club.",
    highlights: [
      {
        title: "Private Beach",
        description:
          "1.5 kilometres of sand reserved for residents and their guests.",
      },
      {
        title: "Infinity Deck",
        description: "A pool terrace cantilevered over the marina channel.",
      },
      {
        title: "Yacht Club",
        description: "Berthing and concierge for owners at the island marina.",
      },
    ],
    price: { amount: 7200000, currency: "AED" },
    priceLabel: "Starting from",
    image: {
      src: "/images/signature/signature-2.webp",
      alt: "Dining room framed by full-height sliding glass and linen drapes",
      width: 1920,
      height: 1000,
    },
    href: "/properties/emaar-beachfront-seafront-apartment",
  },
  {
    slug: "district-one-west",
    name: "District One West",
    developer: "Nakheel",
    community: "Mohammed Bin Rashid City",
    description:
      "Mansions on the edge of the crystal lagoon, ten minutes from Downtown but wrapped in parkland and open water.",
    highlights: [
      {
        title: "Crystal Lagoon",
        description: "Seven hectares of swimmable lagoon with a sand shore.",
      },
      {
        title: "Cycle Circuit",
        description: "An eight-kilometre track running the community perimeter.",
      },
      {
        title: "Gated Enclave",
        description: "Single-entry security with concierge for every cluster.",
      },
    ],
    price: { amount: 31900000, currency: "AED" },
    priceLabel: "Starting from",
    image: {
      src: "/images/signature/signature-3.webp",
      alt: "Open-plan kitchen with a stone island and dark timber joinery",
      width: 1920,
      height: 1000,
    },
    href: "/properties/district-one-west-lagoon-mansion",
  },
];
