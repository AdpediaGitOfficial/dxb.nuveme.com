import { Container } from "@/components/layout/Container";
import { StatsPanel } from "@/components/home/StatsPanel";
import { ButtonLink } from "@/components/ui/Button";

/**
 * "About NUVÉ Properties" — the editorial column on the left, the 2×2 figures
 * panel on the right (see `StatsPanel` for that panel's geometry).
 */
export function AboutSection() {
  return (
    <section
      aria-labelledby="about-title"
      className="panel py-14 sm:py-16 lg:py-16"
    >
      <Container className="grid gap-14 lg:grid-cols-[54.4%_37.95%] lg:items-center lg:justify-between lg:gap-0">
        <div>
          <p className="eyebrow">About NUVÉ Properties</p>
          <h2
            id="about-title"
            className="display-2 text-balance-title mt-6"
          >
            Redefining luxury real estate with trust and expertise.
          </h2>

          <div className="mt-8 space-y-5">
            <p className="prose-lede">
              At NUVÉ Properties, we believe every property tells a story, and
              every client deserves a seamless journey. We specialise in
              curating Dubai&apos;s most prestigious residences, waterfront
              villas, branded apartments, and high-value investment
              opportunities.
            </p>
            <p className="prose-lede">
              Driven by market expertise and a client-first approach, we provide
              personalised guidance, exclusive access to premium developments,
              and strategic insights that empower buyers and investors to make
              confident decisions. Whether you&apos;re searching for your dream
              home or expanding your investment portfolio, we&apos;re committed
              to delivering an experience defined by excellence, transparency,
              and lasting value.
            </p>
          </div>

          <ButtonLink
            href="/about"
            variant="bracket"
            size="md"
            casing="sentence"
            className="mt-10"
          >
            Know more
          </ButtonLink>
        </div>

        <StatsPanel />
      </Container>
    </section>
  );
}
