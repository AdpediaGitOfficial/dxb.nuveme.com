/**
 * Copy for the List Your Property page, transcribed from the artboard
 * (node 981:1841).
 */

export const listPropertyHero = {
  eyebrow: "Explore Sales",
  title: "Why List Your Property With NUVÉ Properties",
} as const;

export const whyList = {
  eyebrow: "Get Started With NUVÉ",
  title: "Why list your property with us?",
  description:
    "Your property deserves the right strategy. With targeted marketing and expert negotiation, NUVÉ positions your property for better opportunities and confident results.",
  image: {
    src: "/images/list-property/dubai-coastline.webp",
    alt: "The Dubai coastline at dawn, the Downtown skyline rising behind the beachfront",
    width: 2400,
    height: 627,
  },
  benefits: [
    {
      title: "Your Property Deserves More Than a Listing — It Deserves a Strategy",
      body: "At NUVÉ Properties, we don't just list homes; we craft a tailored marketing and sales strategy around every property. From professional photography and video tours to premium placements on Dubai's top portals and social media exposure, we ensure your property stands out to the right buyers — both locally and globally.",
    },
    {
      title: "Access to Qualified Buyers & Investors",
      body: "Our network is built on trust and relationships. With direct access to thousands of qualified buyers, investors, and brokers across Dubai and overseas, we maximize visibility and minimize time on market — ensuring you get the best price in the shortest time.",
    },
    {
      title: "Expert Negotiators, Trusted Advisors",
      body: "Every NUVÉ consultant is trained to do more than sell — they consult, advise, and protect your interests. Whether it's off-plan or secondary, we ensure every negotiation leads to a win-win deal, backed by market intelligence and complete transparency.",
    },
    {
      title: "Seamless End-to-End Process",
      body: "From valuation to transfer, NUVÉ handles every step — marketing, client viewings, paperwork, developer coordination, NOC, DLD transfer, and after-sale support. You focus on what matters; we handle the rest.",
    },
    {
      title: "Brand You Can Trust",
      body: "With a combined legacy of leadership at top developers like Emaar and years of experience closing high-value transactions, NUVÉ stands for integrity, results, and relationships. Our reputation is built on referrals — because our clients never forget how we made them feel.",
    },
    {
      title: "From Vision to Value – The NUVÉ Way",
      body: "When you list with NUVÉ, you don't just work with a brokerage — you partner with a team that's redefining real estate through passion, precision, and people-first values. We turn your property into a success story worth sharing.",
    },
  ],
} as const;

export const listForm = {
  image: {
    src: "/images/list-property/emaar-downtown.webp",
    alt: "Two Emaar residential towers at sunset with the Burj Khalifa behind them",
    width: 1400,
    height: 1134,
  },
  /**
   * None of these option sets are drawn — the artboard shows the fields empty.
   * They are the choices a Dubai listing enquiry needs to be actionable.
   */
  propertyTypes: [
    "Apartment",
    "Villa",
    "Townhouse",
    "Penthouse",
    "Plot",
    "Commercial",
  ],
  purposes: ["Sell", "Rent", "Either"],
  bedrooms: ["Studio", "1", "2", "3", "4", "5+"],
} as const;

export const howItWorks = {
  eyebrow: "A Smarter Way to Sell Your Property",
  title: "How Does It Work?",
  description:
    "Easily list your property with NUVÉ. Our platform helps you showcase it to buyers or renters quickly.",
  steps: [
    {
      title: "Accurate Property Valuation",
      body: "Data-backed property valuation within 24 hours, ensuring you list at the right price for maximum returns.",
    },
    {
      title: "Hassle-Free Documentation",
      body: "We guide you through all the paperwork, making the signing process quick, clear, and convenient.",
    },
    {
      title: "Maximum Market Exposure",
      body: "Targeted digital marketing and premium portal visibility to showcase your property on platforms.",
    },
    {
      title: "Optimised Returns on Investment",
      body: "Our strategic approach focuses on achieving the best possible price, helping you maximize your return.",
    },
  ],
} as const;
