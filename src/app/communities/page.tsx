import { CommunityGrid } from "@/components/communities/CommunityGrid";
import { OffPlanSection } from "@/components/communities/OffPlanSection";
import { FaqSection } from "@/components/home/FaqSection";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { communitiesIntro } from "@/content/communities";
import { faqs } from "@/content/faqs";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  itemListSchema,
} from "@/lib/jsonld";
import { listCommunities } from "@/lib/repositories/communities";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dubai Communities & Prime Destinations",
  description:
    "Explore Dubai's biggest communities — The Heights Country Club, Dubai Maritime City and Dubai South — with lifestyle, connectivity and off-plan investment context from NUVÉ Properties.",
  path: "/communities",
  keywords: [
    "Dubai communities",
    "Dubai Maritime City",
    "Dubai South property",
    "Dubai off-plan investment",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Communities", path: "/communities" },
];

export default async function CommunitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const [communities, params] = await Promise.all([
    listCommunities(),
    searchParams,
  ]);
  const page = Number.parseInt(params.page ?? "1", 10);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(trail),
          faqSchema(faqs),
          itemListSchema(
            communities.map((community) => ({
              name: community.name,
              path: `/communities/${community.slug}`,
            })),
            "Dubai communities",
          ),
        )}
      />

      <PageHero
        eyebrow={communitiesIntro.hero.eyebrow}
        title={communitiesIntro.hero.title}
        poster={{
          src: "/images/hero/hero-poster.webp",
          alt: "Aerial view over Dubai Marina and the coastline at dusk",
        }}
        video="/video/hero.mp4"
        trail={trail}
      />

      <CommunityGrid
        communities={communities}
        page={Number.isFinite(page) ? page : 1}
      />
      <OffPlanSection />
      <FaqSection faqs={faqs} />
    </>
  );
}
