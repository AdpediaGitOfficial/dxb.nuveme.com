import { LegalDocument } from "@/components/layout/LegalDocument";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information submitted through this website.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      updated="30 August 2026"
      trail={[
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy-policy" },
      ]}
      sections={[
        {
          heading: "What we collect",
          body: [
            `When you submit an enquiry, register interest in a property or contact us by phone, email or WhatsApp, ${site.name} collects the details you provide — typically your name, email address, phone number and the substance of your enquiry.`,
            "We also collect standard technical information such as your IP address, browser type and the pages you view, which is used only to keep the site secure and to understand which content is useful.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your information to respond to your enquiry, arrange viewings, prepare property shortlists and meet our obligations under UAE real estate regulation, including Dubai Land Department requirements.",
            "We do not sell your personal information. We share it only with the parties needed to complete a transaction you have asked us to progress — for example a developer, conveyancer or the Dubai Land Department.",
          ],
        },
        {
          heading: "Marketing",
          body: [
            "If you opt in, we may send occasional updates about new launches and market movements. Every message includes a way to unsubscribe, and withdrawing consent has no effect on any active transaction.",
          ],
        },
        {
          heading: "Retention and your rights",
          body: [
            "Enquiry records are retained for as long as needed to serve you and to satisfy legal and tax obligations, after which they are deleted or anonymised.",
            `You may request access to, correction of, or deletion of your personal information at any time by writing to ${site.contact.email}.`,
          ],
        },
        {
          heading: "Cookies",
          body: [
            "This site uses only the cookies required for it to function. If analytics or advertising cookies are introduced, you will be asked for consent before they are set.",
          ],
        },
      ]}
    />
  );
}
