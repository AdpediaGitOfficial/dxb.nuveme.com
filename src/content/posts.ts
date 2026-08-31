import type { Post } from "@/types";

/**
 * Blog articles.
 *
 * **Sample content, with one exception.** The first post carries the article
 * copy drawn on the blog-details artboard (node 981:2416) verbatim, including
 * its figures — PRYPCO MINT, the AED 1,000 marketplace minimum, 224 investors
 * from 44 nationalities, an AED 10,714 average. None of that has been checked
 * against a source; it is the client's copy and needs verifying before it is
 * published. Obvious slips in the drawn text are corrected (commas standing in
 * for full stops, "Departi" for "Department", "purcha" for "purchase",
 * "Phase Il" for "Phase II").
 *
 * The remaining five posts are evergreen practitioner topics written to fill
 * the index grid and give the six drawn photographs a home. Replace them.
 */
export const posts: Post[] = [
  {
    slug: "dubai-tokenised-real-estate",
    title: "Dubai Tokenised Real Estate Starts from AED 1,000",
    excerpt:
      "Dubai has lowered the entry point for tokenised real estate resale investments to AED 1,000. Discover what it means for smaller investors.",
    standfirst:
      "Dubai has lowered the entry point for tokenised real estate resale investments to AED 1,000. Discover how it works, its benefits, risks and what investors should check.",
    author: "Alexander Brooks",
    publishedAt: "2026-07-28T18:07:00+04:00",
    image: {
      src: "/images/blog/dubai-maritime-city.webp",
      alt: "Looking straight up between two rows of high-rise towers to a bright sky",
      width: 1134,
      height: 858,
    },
    body: [
      {
        paragraphs: [
          "Dubai has taken another important step towards making property investment more accessible. PRYPCO MINT has reduced the minimum amount required to purchase existing tokenised property shares through its secondary marketplace from AED 2,000 to AED 1,000.",
          "The change does not apply to every investment offered on the platform. New tokenised property launches continue to require a minimum investment of AED 2,000. The lower AED 1,000 threshold applies specifically to marketplace purchases, where approved investors buy tokens connected to properties that have already been fully funded.",
          "Although the adjustment may appear modest, it represents a meaningful development in Dubai's evolving real estate market.",
          "A lower entry point allows more people to gain exposure to property, explore a new investment structure and potentially spread smaller amounts across multiple assets instead of committing all their capital to a single opportunity.",
          "For a city already known for off-plan launches, luxury developments and international property ownership, tokenisation introduces a different route into the market: digital, fractional and potentially more flexible.",
        ],
      },
      {
        heading: "What Does the AED 1,000 Minimum Actually Apply To?",
        paragraphs: [
          "The new minimum is a secondary-market change, not a blanket reduction across all tokenised property investments.",
          "When a property is first listed for tokenised funding, investors can participate from AED 2,000. Once that property has been fully funded and its tokens become eligible for resale, existing holders may list their tokens on the PRYPCO MINT marketplace.",
          "Buyers can now enter those resale opportunities with a minimum purchase of AED 1,000.",
          "This distinction matters because a new property offering and a marketplace purchase are not identical. A new offering allows investors to participate during the property's initial funding stage. A marketplace transaction involves purchasing existing tokens from another investor at the available listed price.",
          "PRYPCO states that marketplace token prices must remain within 15% above or below the latest Dubai Land Department valuation. It also says that tokens can be listed after a three-month lock-in period from the property's original purchase, subject to the platform's conditions and the availability of approved buyers.",
        ],
      },
      {
        heading: "What Is Tokenised Real Estate?",
        paragraphs: [
          "Tokenised real estate divides the economic ownership of a physical property into digital units known as tokens. Each token represents a small interest in the underlying asset.",
          "Instead of purchasing an entire apartment, villa or commercial unit, an investor purchases a fraction of it. Depending on the terms of the opportunity, the investor may receive a proportional share of rental income and may benefit if the property increases in value.",
          "However, both rental income and capital appreciation depend on the performance of the property. Returns are never automatic or guaranteed.",
          "Blockchain technology is used to record the tokens and related transactions. Tokenised property should not be confused with purchasing virtual land or investing in an unregulated cryptocurrency. Dubai's initiative connects digital tokens to physical properties within a regulated framework involving the Dubai Land Department, the Virtual Assets Regulatory Authority, the Central Bank of the UAE and the Dubai Future Foundation.",
          "During the original pilot phase, transactions were conducted in UAE dirhams rather than cryptocurrencies. Investors were also given access to information about the property, including its price, technical details, minimum investment and risk factors.",
        ],
      },
      {
        heading: "How Dubai's Real Estate Tokenisation Programme Developed",
        paragraphs: [
          "Dubai Land Department officially launched the pilot phase of its Real Estate Tokenisation Project through PRYPCO MINT in May 2025.",
          "The initiative was introduced under Dubai's Real Estate Evolution Space programme. According to DLD, it positioned the department as the first real estate registration authority in the Middle East to adopt blockchain-based property tokenisation within an official framework.",
          "The response to the first property demonstrated substantial investor interest. Dubai Land Department reported that the project attracted 224 investors from 44 nationalities. Approximately 70% of them were entering Dubai's real estate market for the first time.",
          "The average individual investment was AED 10,714, while the waiting list exceeded 6,000 requests.",
          "These figures suggested that tokenisation was not only attracting people who already owned property. It was also reaching investors who may previously have considered direct ownership financially out of reach or who preferred to begin with a smaller commitment.",
          "The initiative advanced into Phase II in February 2026, allowing controlled resale activity through a secondary market.",
          "Approximately 7.8 million real estate tokens created during the pilot phase became eligible for resale within the regulated testing framework.",
          "The reduction of the marketplace minimum to AED 1,000 is therefore part of a wider progression. The programme has moved from testing initial funding and investor demand to creating property token ownership certificates and introducing a functioning resale mechanism.",
        ],
      },
    ],
  },
  {
    slug: "dubai-maritime-city",
    title: "Dubai Maritime City",
    excerpt:
      "A purpose-built waterfront district between Port Rashid and Dubai Drydocks, and what its next residential phase means for buyers.",
    standfirst:
      "A purpose-built peninsula between Port Rashid and the Drydocks, laid out as marine industry, offices and waterfront homes. What the next residential phase means for buyers.",
    author: "NUVÉ Advisory",
    publishedAt: "2026-08-04T10:00:00+04:00",
    image: {
      src: "/images/blog/tokenised-real-estate.webp",
      alt: "The Dubai skyline at dusk seen across the water, towers lit from within",
      width: 1134,
      height: 856,
    },
    body: [
      {
        paragraphs: [
          "Dubai Maritime City occupies a man-made peninsula between Port Rashid and the Drydocks, laid out as a mixed district of marine industry, offices and waterfront residences.",
          "The residential plots sit on the northern edge, which is what gives the towers their unusually open outlook: water on three sides and the Downtown skyline behind.",
          "For buyers, the draw is proximity without the Marina's density. For investors, the question is delivery — phasing here has moved more than once, so read the payment plan against the construction milestones rather than the brochure.",
        ],
      },
    ],
  },
  {
    slug: "ejari-registration-explained",
    title: "Ejari registration, explained for tenants",
    excerpt:
      "Every Dubai tenancy contract has to be registered with Ejari. Here is what it covers, who files it, and what it protects you from.",
    standfirst:
      "Every Dubai tenancy contract has to be registered with Ejari. What it covers, who files it, and what it protects you from.",
    author: "NUVÉ Advisory",
    publishedAt: "2026-07-21T10:00:00+04:00",
    image: {
      src: "/images/blog/marina-waterfront.webp",
      alt: "Dubai Marina towers rising above the water with boats moored along the promenade",
      width: 1134,
      height: 856,
    },
    body: [
      {
        paragraphs: [
          "Ejari is the Dubai Land Department's tenancy register. A contract that is not registered exists between you and your landlord, but not in the eyes of the authorities — which matters the moment there is a dispute, a utility connection or a visa application.",
          "Registration is normally the landlord's or agent's responsibility, and needs the signed contract, Emirates ID, passport copy, title deed and the previous DEWA bill.",
          "Keep the certificate. It is the document DEWA, the RTA and the rental dispute centre will each ask for.",
        ],
      },
    ],
  },
  {
    slug: "reading-an-off-plan-payment-plan",
    title: "How to read an off-plan payment plan",
    excerpt:
      "Post-handover terms, escrow milestones and the difference between a construction-linked and a time-linked schedule.",
    standfirst:
      "Post-handover terms, escrow milestones and the difference between a construction-linked and a time-linked schedule.",
    author: "NUVÉ Advisory",
    publishedAt: "2026-07-07T10:00:00+04:00",
    image: {
      src: "/images/blog/golden-hour-skyline.webp",
      alt: "Dubai Marina towers silhouetted against an orange sky at sunset",
      width: 1134,
      height: 856,
    },
    body: [
      {
        paragraphs: [
          "Two schedules dominate Dubai's off-plan market. A construction-linked plan releases your money as the building rises; a time-linked plan takes it on fixed dates whether or not the site has moved.",
          "The first ties your exposure to progress, which is the safer arrangement for a buyer. The second is easier to budget for and often carries a better headline price.",
          "In either case the money should be going into a project escrow account registered with the DLD. Ask for the escrow number before you sign anything.",
        ],
      },
    ],
  },
  {
    slug: "service-charges-what-owners-pay",
    title: "Service charges: what owners actually pay for",
    excerpt:
      "How a building's service charge is set, where the money goes, and the figures worth checking before you buy.",
    standfirst:
      "How a building's service charge is set, where the money goes, and the figures worth checking before you buy.",
    author: "NUVÉ Advisory",
    publishedAt: "2026-06-23T10:00:00+04:00",
    image: {
      src: "/images/blog/marina-towers.webp",
      alt: "A cluster of Dubai Marina towers under construction against a clear blue sky",
      width: 1134,
      height: 858,
    },
    body: [
      {
        paragraphs: [
          "A service charge funds the parts of a building nobody owns individually: the lifts, the chiller plant, the pool, the lobby, the insurance and the reserve fund for the day the roof needs replacing.",
          "Dubai publishes approved rates per square foot by project, which makes this one of the few costs you can verify before committing.",
          "Compare the rate against buildings of similar age and amenity. A tower with a large pool deck and valet parking will always cost more to run than one without, and that difference is permanent.",
        ],
      },
    ],
  },
  {
    slug: "choosing-between-waterfront-communities",
    title: "Choosing between Dubai's waterfront communities",
    excerpt:
      "Palm Jumeirah, Emaar Beachfront, Dubai Creek Harbour and Maritime City each suit a different buyer. A short comparison.",
    standfirst:
      "Palm Jumeirah, Emaar Beachfront, Dubai Creek Harbour and Maritime City each suit a different buyer. A short comparison.",
    author: "NUVÉ Advisory",
    publishedAt: "2026-06-09T10:00:00+04:00",
    image: {
      src: "/images/blog/waterfront-district.webp",
      alt: "A waterfront district of glass towers seen across the bay on a hazy day",
      width: 1134,
      height: 856,
    },
    body: [
      {
        paragraphs: [
          "Waterfront is not one market. Palm Jumeirah trades on address and villa stock; Emaar Beachfront on beach access and new build; Creek Harbour on scale and a longer delivery horizon; Maritime City on price per square foot with an open outlook.",
          "Yield and capital growth pull in different directions across the four, and so does liquidity — the number of comparable resales in a given quarter varies enormously.",
          "Tell us what the property is for and over what horizon, and we will come back with the two or three that fit rather than a tour of all of them.",
        ],
      },
    ],
  },
];

export const blogIntro = {
  hero: {
    eyebrow: "Blog",
    title: "Stay Informed—Stay Ahead With NUVÉ",
  },
  eyebrow: "Insights That Keep You Ahead",
  title: "Explore the latest from Dubai's real estate market",
  description:
    "Get expert insights, market trends, and community updates. Discover ideas for smarter real estate decisions.",
} as const;

export const articleAside = {
  heading: "Our recent blogs",
  description:
    "Stay updated on property news, market trends, and investment opportunities in Dubai's real estate.",
} as const;

/** Cards to a page on the index, as drawn (two rows of three). */
export const POSTS_PER_PAGE = 6;

/** Cards in the article sidebar, as drawn. */
export const ASIDE_POSTS = 4;

export function listPosts(): Post[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** The sidebar roll: the most recent posts other than the one being read. */
export function listRelated(slug: string, limit = ASIDE_POSTS): Post[] {
  return listPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}
