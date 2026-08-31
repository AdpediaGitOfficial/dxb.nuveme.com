import type { Partner } from "@/types";

/**
 * Developer partners shown as a scrolling logo rail. Logos are
 * white-on-transparent PNGs, each at its own artboard height.
 */
export const partners: Partner[] = [
  {
    name: "Emaar",
    height: 25,
    logo: { src: "/images/partners/emaar.png", alt: "Emaar", width: 520, height: 103 },
  },
  {
    name: "Sobha Realty",
    height: 36,
    logo: { src: "/images/partners/sobha.png", alt: "Sobha Realty", width: 482, height: 152 },
  },
  {
    name: "Nakheel",
    height: 23,
    logo: { src: "/images/partners/nakheel.png", alt: "Nakheel", width: 520, height: 90 },
  },
  {
    name: "Meraas",
    height: 42,
    logo: { src: "/images/partners/meraas.png", alt: "Meraas", width: 520, height: 131 },
  },
  {
    name: "DAMAC",
    height: 23,
    logo: { src: "/images/partners/damac.png", alt: "DAMAC", width: 520, height: 64 },
  },
];

/**
 * The developer roster drawn on the service artboard (node 981:1288) — a
 * different, longer set from the five on the home artboard. Both are in the
 * design; nobody has said which is current, so they are kept apart rather than
 * silently merged.
 *
 * The marks are white silhouettes lifted from the render at 2×: Figma masks
 * each vendor logo to white, and every export of a masked node mattes onto
 * white, so there is no way to export them directly. `height` is the drawn
 * height measured off the same render.
 */
export const developerPartners: Partner[] = [
  {
    name: "AMIS",
    height: 28,
    logo: { src: "/images/partners/developers/amis.png", alt: "AMIS", width: 236, height: 57 },
  },
  {
    name: "Meraki Developers",
    height: 36,
    logo: { src: "/images/partners/developers/meraki.png", alt: "Meraki Developers", width: 303, height: 73 },
  },
  {
    name: "Clédor",
    height: 26,
    logo: { src: "/images/partners/developers/cledor.png", alt: "Clédor", width: 333, height: 52 },
  },
  {
    name: "Zaya",
    height: 47,
    logo: { src: "/images/partners/developers/zaya.png", alt: "Zaya", width: 151, height: 94 },
  },
  {
    name: "Sunrise Capital",
    height: 43,
    logo: { src: "/images/partners/developers/sunrise-capital.png", alt: "Sunrise Capital", width: 228, height: 86 },
  },
  {
    name: "Muraba",
    height: 60,
    logo: { src: "/images/partners/developers/muraba.png", alt: "Muraba", width: 182, height: 119 },
  },
  {
    name: "The Luxe Developers",
    height: 72,
    logo: { src: "/images/partners/developers/the-luxe-developers.png", alt: "The Luxe Developers", width: 324, height: 143 },
  },
];
