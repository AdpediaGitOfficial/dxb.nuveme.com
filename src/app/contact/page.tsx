import { ContactSection } from "@/components/contact/ContactSection";
import { OfficeMap } from "@/components/contact/OfficeMap";
import { FaqSection } from "@/components/home/FaqSection";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactHero } from "@/content/contact";
import { faqs } from "@/content/faqs";
import { site } from "@/content/site";
import {
  ORGANISATION_ID,
  breadcrumbSchema,
  faqSchema,
  graph,
} from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: `Speak to a NUVÉ Properties advisor about buying, selling or investing in Dubai. Call ${site.contact.phone}, email ${site.contact.email}, or visit us at ${site.address.street}, ${site.address.locality}.`,
  path: "/contact",
  keywords: [
    "contact NUVÉ Properties",
    "Dubai real estate agency contact",
    "property enquiry Dubai",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact Us", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), faqSchema(faqs), {
          "@type": "ContactPage",
          "@id": `${absoluteUrl("/contact")}#contact`,
          name: `Contact ${site.name}`,
          url: absoluteUrl("/contact"),
          about: { "@id": ORGANISATION_ID },
        })}
      />

      <PageHero
        eyebrow={contactHero.eyebrow}
        title={contactHero.title}
        // The drawn 889 measure takes two lines in Saol and three in Playfair.
        titleClassName="lg:max-w-[54vw]"
        poster={{
          src: "/images/hero/hero-poster.webp",
          alt: "Aerial view over Dubai Marina and the coastline at dusk",
        }}
        video="/video/hero.mp4"
        trail={trail}
      />

      <ContactSection />
      <OfficeMap />
      <FaqSection faqs={faqs} />
    </>
  );
}
