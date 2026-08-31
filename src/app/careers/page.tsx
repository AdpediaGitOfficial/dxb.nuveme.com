import { CareersIntro } from "@/components/careers/CareersIntro";
import { LifeAtNuve } from "@/components/careers/LifeAtNuve";
import { OpenRoles } from "@/components/careers/OpenRoles";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { careersHero, openRoles } from "@/content/careers";
import { site } from "@/content/site";
import { ORGANISATION_ID, breadcrumbSchema, graph } from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Build a career in Dubai real estate with NUVÉ Properties. See our open roles, how we work, and what a people-first brokerage actually offers.",
  path: "/careers",
  keywords: [
    "Dubai real estate jobs",
    "property consultant Dubai",
    "NUVÉ Properties careers",
    "real estate broker vacancies Dubai",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Careers", path: "/careers" },
];

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number.parseInt(params.page ?? "1", 10);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(trail),
          /*
            One JobPosting per open role. `hiringOrganization` points at the
            same @id the rest of the site uses, so the graph resolves rather
            than declaring an unrelated employer.
          */
          ...openRoles.map((role) => ({
            "@type": "JobPosting",
            "@id": `${absoluteUrl("/careers")}#${role.slug}`,
            title: role.title,
            description: [role.summary, ...role.responsibilities].join(" "),
            employmentType:
              role.commitment.toLowerCase() === "full time"
                ? "FULL_TIME"
                : "PART_TIME",
            hiringOrganization: { "@id": ORGANISATION_ID },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                streetAddress: site.address.street,
                addressLocality: site.address.locality,
                addressRegion: site.address.region,
                addressCountry: site.address.country,
              },
            },
            directApply: true,
          })),
        )}
      />

      <PageHero
        eyebrow={careersHero.eyebrow}
        title={careersHero.title}
        poster={{
          src: "/images/hero/hero-poster.webp",
          alt: "Aerial view over Dubai Marina and the coastline at dusk",
        }}
        video="/video/hero.mp4"
        trail={trail}
      />

      <CareersIntro />
      <LifeAtNuve />
      <OpenRoles page={Number.isFinite(page) ? page : 1} />
    </>
  );
}
