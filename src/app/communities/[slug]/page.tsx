import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { breadcrumbSchema, communitySchema, graph } from "@/lib/jsonld";
import {
  getCommunityBySlug,
  listCommunitySlugs,
} from "@/lib/repositories/communities";
import { listProperties } from "@/lib/repositories/properties";
import { buildMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await listCommunitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const community = await getCommunityBySlug(slug);

  if (!community) {
    return buildMetadata({
      title: "Community not found",
      description: "This community page is no longer available.",
      path: `/communities/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${community.name} — Property & Lifestyle Guide`,
    description: community.description.slice(0, 155),
    path: `/communities/${community.slug}`,
    image: {
      url: community.image.src,
      width: community.image.width,
      height: community.image.height,
      alt: community.image.alt,
    },
  });
}

export default async function CommunityPage({ params }: { params: Params }) {
  const { slug } = await params;
  const community = await getCommunityBySlug(slug);

  if (!community) notFound();

  const properties = await listProperties({ community: community.slug });
  const trail = [
    { name: "Home", path: "/" },
    { name: "Communities", path: "/communities" },
    { name: community.name, path: `/communities/${community.slug}` },
  ];

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), communitySchema(community))} />

      <article className="panel">
        <div className="relative isolate min-h-[60svh] overflow-hidden pt-28">
          <div className="absolute inset-0 z-0">
            <Image
              src={community.image.src}
              alt={community.image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.66)_55%,rgba(0,0,0,0.45)_100%)]"
            />
          </div>

          <Container className="relative z-10 flex min-h-[calc(60svh-7rem)] flex-col justify-end pb-14">
            <Breadcrumbs trail={trail} />
            <p className="eyebrow mt-8">Prime Destination</p>
            <h1 className="display-2 text-balance-title mt-4 max-w-[16ch]">
              {community.name}
            </h1>
            <p className="prose-lede mt-5 max-w-[52ch]">{community.tagline}</p>
          </Container>
        </div>

        <Container className="grid gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20 lg:py-24">
          <p className="prose-lede">{community.description}</p>

          <div>
            <h2 className="eyebrow">Highlights</h2>
            <ul className="mt-6 space-y-3">
              {community.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 border-b border-hairline pb-3 text-sm text-bone-muted"
                >
                  <span aria-hidden="true" className="mt-2 h-px w-4 bg-hairline-strong" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </Container>

        {properties.length > 0 && (
          <section
            aria-labelledby="community-listings"
            className="border-t border-hairline py-16 lg:py-24"
          >
            <Container>
              <h2 id="community-listings" className="display-2">
                Available in {community.name}
              </h2>
              <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <li key={property.slug}>
                    <PropertyCard
                      property={property}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}
      </article>
    </>
  );
}
