/**
 * Copy for the off-plan page, transcribed from the artboard (node 981:2911).
 */

export const offPlanHero = {
  eyebrow: "Off-Plan",
  title: "Buy Before It Is Built",
} as const;

export const showcase = {
  eyebrow: "Luxury Properties",
  title: "Discover NUVÉ Properties",
  /**
   * The artboard's carousel component holds one photograph and three dots, so
   * two of the three slides are empty. The drawn image leads; the other two
   * are pulled from the off-plan listings themselves, which is what the
   * section is showcasing.
   */
  lead: {
    src: "/images/off-plan/showcase-white-villa.webp",
    alt: "A white contemporary villa behind palms, with a sculptural feature in the garden",
    width: 2400,
    height: 1200,
  },
} as const;

export const listings = {
  eyebrow: "Properties for off-plan",
  title: "Exclusive Off-Plan Developments",
} as const;

/** Drawn as a control labelled "Sort" with "Newest First" selected. */
export const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export const guide = {
  eyebrow: "Find the Property That Fits You",
  title: "Let NUVÉ Guide You To Your Perfect Property!",
  paragraphs: [
    "As seasoned property experts, we understand how challenging it can be to navigate through the myriad of options available in Dubai's property market.",
    "Dont know where to begin? You don't need to sift through countless listings on various UAE property websites. Follow the simple steps on the screen to get a personalized selection of properties that match your preferences.",
  ],
  cta: { label: "Enquiry now" },
  image: {
    src: "/images/careers/life-at-nuve.webp",
    alt: "Five NUVÉ advisors in suits standing together, photographed in black and white",
    width: 1300,
    height: 1076,
  },
} as const;

export const buying = {
  eyebrow: "Start your Dubai property journey.",
  title: "Looking To Buy A Property In Dubai?",
  /**
   * The artboard repeats this paragraph twice to fill the column; it is
   * carried once.
   */
  paragraphs: [
    "Dubai is a city with a thriving real estate market. Our meticulously curated listings of apartments for sale offer you the best of what the property market has to offer. The properties in our listings provide a unique blend of sophistication, comfort, and unparalleled views in this dynamic city.",
    "Immerse yourself in our diverse range of flats for sale in Dubai. Whether you prefer the bustling cityscape or serene waterfront, we have the perfect address for you.",
  ],
  image: {
    src: "/images/communities/off-plan-skyline.webp",
    alt: "Dubai towers rising through low cloud at sunrise, seen from above",
    width: 1400,
    height: 1463,
  },
} as const;

/** Cards to a page, as drawn (two rows of two). */
export const OFF_PLAN_PER_PAGE = 4;
