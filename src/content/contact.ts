import { site } from "@/content/site";

/**
 * Copy for the contact page, transcribed from the contact artboard
 * (node 981:1650).
 */

export const contactHero = {
  eyebrow: "Contact",
  title: "Start Crafting Your Legacy With NUVÉ Today",
} as const;

export const contactIntro = {
  eyebrow: "Your Next Property Move Starts Here",
  title: "Let's turn your property goals into reality.",
  body: "Whether you're looking to buy, sell, or invest in Dubai, our experienced team is here to guide you with trusted advice and tailored solutions. Tell us what you're looking for, and let's take the next step together.",
  image: {
    src: "/images/contact/terrace-skyline.webp",
    alt: "A penthouse terrace at dusk with a fire bowl and infinity pool looking over the Dubai skyline",
    width: 1400,
    height: 1463,
  },
} as const;

/**
 * The office block over the map.
 *
 * The artboard's card is a Google Maps place panel, down to its "No reviews"
 * line and a duplicate of the address in Arabic. What is rendered here is the
 * business's own record from `site`, which is the same place without the
 * scraped furniture.
 */
export const office = {
  name: site.legalName,
  lines: [
    site.address.street,
    `${site.address.locality}, ${site.address.region}`,
    site.address.countryName,
  ],
  /** Used for the "open in Maps" and directions links. */
  query: `${site.legalName}, ${site.address.street}, ${site.address.locality}, ${site.address.region}, ${site.address.countryName}`,
  /**
   * The embed is keyed on coordinates, not the address: querying by name makes
   * Google render its own place panel in the frame's top-left corner, directly
   * under the card the artboard puts there.
   */
  point: `${site.geo.latitude},${site.geo.longitude}`,
} as const;

export const officeMapLinks = {
  place: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.query)}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(office.query)}`,
  embed: `https://www.google.com/maps?q=${office.point}&z=11&output=embed`,
} as const;
