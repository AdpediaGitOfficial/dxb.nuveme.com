import { HowItWorks } from "@/components/list-property/HowItWorks";
import { ListFormSection } from "@/components/list-property/ListFormSection";
import { WhyListSection } from "@/components/list-property/WhyListSection";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { howItWorks, listPropertyHero } from "@/content/list-property";
import { site } from "@/content/site";
import { ORGANISATION_ID, breadcrumbSchema, graph } from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "List Your Property",
  description:
    "List your Dubai property with NUVÉ Properties: a data-backed valuation within 24 hours, targeted marketing, qualified buyers and end-to-end handling through to DLD transfer.",
  path: "/list-your-property",
  keywords: [
    "list property Dubai",
    "sell my property Dubai",
    "Dubai property valuation",
    "rent out my property Dubai",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "List Your Property", path: "/list-your-property" },
];

export default function ListYourPropertyPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(trail),
          {
            "@type": "Service",
            "@id": `${absoluteUrl("/list-your-property")}#service`,
            name: "Property listing and sales representation",
            serviceType: "Real estate listing",
            provider: { "@id": ORGANISATION_ID },
            areaServed: { "@type": "City", name: site.address.region },
            url: absoluteUrl("/list-your-property"),
          },
          {
            "@type": "HowTo",
            "@id": `${absoluteUrl("/list-your-property")}#how-it-works`,
            name: howItWorks.title,
            description: howItWorks.description,
            step: howItWorks.steps.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.title,
              text: step.body,
            })),
          },
        )}
      />

      <PageHero
        eyebrow={listPropertyHero.eyebrow}
        title={listPropertyHero.title}
        poster={{
          src: "/images/hero/hero-poster.webp",
          alt: "Aerial view over Dubai Marina and the coastline at dusk",
        }}
        video="/video/hero.mp4"
        trail={trail}
        titleClassName="lg:max-w-[53.28vw]"
      />

      <WhyListSection />
      <ListFormSection />
      <HowItWorks />
    </>
  );
}
