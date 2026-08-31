import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/Section";
import { CommunityCard } from "@/components/ui/CommunityCard";
import type { Community } from "@/types";

/** "Prime Destinations" — the three flagship communities. */
export function DestinationsSection({
  communities,
}: {
  communities: Community[];
}) {
  return (
    <section
      aria-labelledby="destinations-title"
      className="on-paper py-14 sm:py-16 lg:py-20"
    >
      <Container>
        <SectionIntro
          eyebrow="Prime Destinations"
          headingId="destinations-title"
          title="Experience Dubai's most prestigious addresses"
          description="Explore iconic communities designed for luxury living, offering exceptional architecture, vibrant lifestyles, and unmatched connectivity in the heart of Dubai."
          asideWidth="29.8%"
        />

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {communities.map((community) => (
            <li key={community.slug}>
              <CommunityCard community={community} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
