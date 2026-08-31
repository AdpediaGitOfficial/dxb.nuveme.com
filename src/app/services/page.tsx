import { ConsultationSection } from "@/components/services/ConsultationSection";
import { DeveloperPartners } from "@/components/services/DeveloperPartners";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { services, servicesIntro } from "@/content/services";
import { breadcrumbSchema, graph, itemListSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services — Sales, Advisory, Management & Golden Visa",
  description:
    "Eleven service lines covering the whole property journey in Dubai: off-plan and ready sales, investment advisory, mortgage support, management, relocation, Golden Visa and after-sales care.",
  path: "/services",
  keywords: [
    "Dubai real estate services",
    "Dubai off-plan property",
    "UAE Golden Visa property",
    "Dubai property management",
    "Dubai mortgage support",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(trail),
          itemListSchema(
            services.map((service) => ({
              name: service.title,
              path: `/services#${service.slug}`,
            })),
            "Property services",
          ),
        )}
      />

      <PageHero
        eyebrow={servicesIntro.hero.eyebrow}
        title={servicesIntro.hero.title}
        poster={{
          src: "/images/hero/hero-poster.webp",
          alt: "Aerial view over Dubai Marina and the coastline at dusk",
        }}
        video="/video/hero.mp4"
        trail={trail}
      />

      <ServiceGrid />
      <ConsultationSection />
      <DeveloperPartners />
    </>
  );
}
