import { LegalDocument } from "@/components/layout/LegalDocument";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: `The terms governing use of the ${site.name} website and the property information published on it.`,
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      title="Terms of Service"
      updated="30 August 2026"
      trail={[
        { name: "Home", path: "/" },
        { name: "Terms of Service", path: "/terms-of-service" },
      ]}
      sections={[
        {
          heading: "Using this site",
          body: [
            `By accessing this website you agree to these terms. If you do not accept them, please stop using the site. ${site.legalName} may update these terms; the version published here is the one that applies.`,
          ],
        },
        {
          heading: "Property information",
          body: [
            "Listings, prices, availability, floor areas, handover dates and payment plans are indicative and subject to change without notice. Areas may be stated as built-up or net and can vary from the final registered measurement.",
            "Nothing on this site is an offer or a contract. All transactions are subject to a signed agreement, developer or landlord approval, and registration with the Dubai Land Department where applicable.",
          ],
        },
        {
          heading: "No professional advice",
          body: [
            "Content on this site is provided for general information. It is not legal, tax, mortgage or investment advice, and you should take independent professional advice before committing to a transaction.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            `All text, photography, renders, marks and layout on this site belong to ${site.legalName} or its licensors and may not be reproduced without written permission. Developer names and logos remain the property of their owners and appear here to identify projects we represent.`,
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai, and the Dubai courts have exclusive jurisdiction over any dispute arising from them.",
          ],
        },
      ]}
    />
  );
}
