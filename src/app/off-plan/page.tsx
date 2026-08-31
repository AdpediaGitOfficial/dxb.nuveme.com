import { BuyingSection } from "@/components/off-plan/BuyingSection";
import { GuideSection } from "@/components/off-plan/GuideSection";
import { OffPlanListings } from "@/components/off-plan/OffPlanListings";
import { OffPlanShowcase } from "@/components/off-plan/OffPlanShowcase";
import { FaqSection } from "@/components/home/FaqSection";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/content/faqs";
import { offPlanHero, sortOptions, type SortValue } from "@/content/off-plan";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  itemListSchema,
} from "@/lib/jsonld";
import { listProperties } from "@/lib/repositories/properties";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Off-Plan Properties in Dubai",
  description:
    "Exclusive off-plan launches in Dubai — Emaar, Nakheel and Palace-branded residences with payment plans, handover dates and escrow-registered developers, curated by NUVÉ Properties.",
  path: "/off-plan",
  keywords: [
    "Dubai off-plan properties",
    "off-plan launches Dubai",
    "Emaar off-plan",
    "Dubai payment plan property",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Off-Plan", path: "/off-plan" },
];

function isSort(value: string | undefined): value is SortValue {
  return sortOptions.some((option) => option.value === value);
}

export default async function OffPlanPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const [all, params] = await Promise.all([
    listProperties({ intent: "off-plan" }),
    searchParams,
  ]);

  const sort: SortValue = isSort(params.sort) ? params.sort : "newest";
  const page = Number.parseInt(params.page ?? "1", 10);

  // `listProperties` already returns newest first, so only the price orders
  // need doing here.
  const properties =
    sort === "newest"
      ? all
      : [...all].sort((a, b) =>
          sort === "price-asc"
            ? a.price.amount - b.price.amount
            : b.price.amount - a.price.amount,
        );

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(trail),
          faqSchema(faqs),
          itemListSchema(
            properties.map((property) => ({
              name: property.name,
              path: `/properties/${property.slug}`,
            })),
            "Off-plan developments",
          ),
        )}
      />

      <PageHero
        eyebrow={offPlanHero.eyebrow}
        title={offPlanHero.title}
        poster={{
          src: "/images/hero/hero-poster.webp",
          alt: "Aerial view over Dubai Marina and the coastline at dusk",
        }}
        video="/video/hero.mp4"
        trail={trail}
      />

      <OffPlanShowcase properties={properties} />
      <OffPlanListings
        properties={properties}
        page={Number.isFinite(page) ? page : 1}
        sort={sort}
      />
      <GuideSection />
      <BuyingSection />
      <FaqSection faqs={faqs} />
    </>
  );
}
