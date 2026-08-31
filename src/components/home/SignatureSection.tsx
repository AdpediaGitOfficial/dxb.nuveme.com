import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/Section";
import { SignatureCarousel } from "@/components/home/SignatureCarousel";
import { signatureProjects } from "@/content/signature";

/** "Signature Properties" — the editorial intro plus the full-bleed carousel. */
export function SignatureSection() {
  return (
    <section
      aria-labelledby="signature-title"
      className="on-paper pb-14 pt-14 sm:pb-16 sm:pt-16 lg:pb-0 lg:pt-[5.729vw]"
    >
      <Container className="pb-12 lg:pb-16">
        <SectionIntro
          eyebrow="Signature Properties"
          headingId="signature-title"
          title="Discover Dubai's most coveted addresses"
          description="Explore luxury residences designed for refined living with exceptional design, world-class amenities, and prestigious locations."
          asideWidth="37%"
        />
      </Container>

      {/* Inset by the rail like every other full-bleed block in the design. */}
      <div className="mx-[var(--rail)]">
        <SignatureCarousel projects={signatureProjects} label="Signature properties" />
      </div>
    </section>
  );
}
