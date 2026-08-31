import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Panel } from "@/components/layout/Panel";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { faqs } from "@/content/faqs";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers on buying property in Dubai as a non-resident, freehold ownership, the UAE Golden Visa, Dubai Land Department registration, Ejari and post-handover support.",
  path: "/faqs",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "FAQs", path: "/faqs" },
];

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), faqSchema(faqs))} />

      <Panel>
        <PageHeader
          eyebrow="Need Help?"
          title="Frequently asked questions"
          description="Questions about buying, selling, or renting with NUVÉ Properties? We have answers to guide you."
          trail={trail}
        />

        <Container className="py-16 lg:py-24">
          <Accordion items={faqs} className="max-w-4xl" />

          <div className="mt-16 max-w-4xl border border-hairline p-10">
            <p className="display-3">Still have a question?</p>
            <p className="prose-lede mt-3 max-w-[52ch]">
              Our advisors answer directly — no call centre, no scripted replies.
            </p>
            <ButtonLink href="/contact" size="lg" className="mt-8">
              Contact us
            </ButtonLink>
          </div>
        </Container>
      </Panel>
    </>
  );
}
