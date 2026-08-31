import { AwardsSection } from "@/components/about/AwardsSection";
import { CoreValues } from "@/components/about/CoreValues";
import { FounderMessage } from "@/components/about/FounderMessage";
import { LegacySection } from "@/components/about/LegacySection";
import { PillarsSection } from "@/components/about/PillarsSection";
import { StoryBand } from "@/components/about/StoryBand";
import { TeamSection, isTeamGroup } from "@/components/about/TeamSection";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutHero, founderMessage, team } from "@/content/about";
import { site } from "@/content/site";
import { ORGANISATION_ID, breadcrumbSchema, graph } from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "NUVÉ Properties curates Dubai's most prestigious residences. Meet the team, the values and the track record behind AED 3B+ in closed property transactions.",
  path: "/about",
  keywords: [
    "NUVÉ Properties about",
    "Dubai real estate agency",
    "Navin Gupta NUVÉ",
    "luxury property consultants Dubai",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
];

/**
 * The team roster is driven by the query string rather than client state, so
 * `?team=consultants&page=2` is a real, shareable, indexable view. See
 * `TeamSection` and DESIGN-SYSTEM.md §9.
 */
export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ team?: string; page?: string }>;
}) {
  const params = await searchParams;
  const group = isTeamGroup(params.team) ? params.team : "management";
  const page = Number.parseInt(params.page ?? "1", 10);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(trail),
          {
            "@type": "AboutPage",
            "@id": `${absoluteUrl("/about")}#about`,
            name: `About ${site.name}`,
            url: absoluteUrl("/about"),
            about: { "@id": ORGANISATION_ID },
          },
          {
            "@type": "Person",
            "@id": `${absoluteUrl("/about")}#founder`,
            name: founderMessage.founder.name,
            jobTitle: founderMessage.founder.role,
            image: absoluteUrl(founderMessage.founder.portrait.src),
            worksFor: { "@id": ORGANISATION_ID },
          },
          ...team.map((member) => ({
            "@type": "Person",
            "@id": `${absoluteUrl("/about")}#${member.id}`,
            name: member.name,
            jobTitle: member.role,
            image: absoluteUrl(member.image.src),
            worksFor: { "@id": ORGANISATION_ID },
          })),
        )}
      />

      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        poster={{
          src: "/images/hero/hero-poster.webp",
          alt: "Aerial view over Dubai Marina and the coastline at dusk",
        }}
        video="/video/hero.mp4"
        trail={trail}
      />

      <LegacySection />
      <PillarsSection />
      <FounderMessage />
      <StoryBand />
      <TeamSection group={group} page={Number.isFinite(page) ? page : 1} />
      <CoreValues />
      <AwardsSection />
    </>
  );
}
