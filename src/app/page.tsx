import { AboutSection } from "@/components/home/AboutSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { Hero } from "@/components/home/Hero";
import { PartnersSection } from "@/components/home/PartnersSection";
import { SignatureSection } from "@/components/home/SignatureSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/content/faqs";
import { site } from "@/content/site";
import { faqSchema, graph, itemListSchema } from "@/lib/jsonld";
import { listCommunities } from "@/lib/repositories/communities";
import { listProperties } from "@/lib/repositories/properties";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  // `absolute` opts out of the "%s | NUVÉ Properties" template — the brand is
  // already the first word of this title.
  title: { absolute: `${site.name} — Luxury Real Estate in Dubai` },
  description:
    "Buy, rent or invest in Dubai's most prestigious residences. NUVÉ Properties offers curated waterfront villas, branded apartments and off-plan opportunities with expert, client-first guidance.",
  path: "/",
  keywords: [
    "Dubai luxury real estate",
    "buy property in Dubai",
    "Dubai off-plan properties",
    "Palm Jumeirah villas",
    "Emaar Beachfront apartments",
  ],
});

export default async function HomePage() {
  const [featured, communities] = await Promise.all([
    listProperties({ limit: 8 }),
    listCommunities(3),
  ]);

  return (
    <>
      <JsonLd
        data={graph(
          faqSchema(faqs),
          itemListSchema(
            featured.map((property) => ({
              name: property.name,
              path: `/properties/${property.slug}`,
            })),
            "Featured properties",
          ),
        )}
      />

      <Hero />
      <AboutSection />
      <SignatureSection />
      <FeaturedListings properties={featured} />
      <TestimonialsSection />
      <PartnersSection />
      <DestinationsSection communities={communities} />
      <FaqSection faqs={faqs} />
    </>
  );
}
