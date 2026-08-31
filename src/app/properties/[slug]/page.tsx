import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { site } from "@/content/site";
import { breadcrumbSchema, graph, propertySchema } from "@/lib/jsonld";
import {
  getPropertyBySlug,
  listPropertySlugs,
  listRelatedProperties,
} from "@/lib/repositories/properties";
import { buildMetadata, formatArea, formatPrice } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

/** Pre-render every listing at build time; new slugs stream in on demand. */
export async function generateStaticParams() {
  const slugs = await listPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return buildMetadata({
      title: "Property not found",
      description: "This listing is no longer available.",
      path: `/properties/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${property.name}, ${property.community}`,
    description: property.description,
    path: `/properties/${property.slug}`,
    type: "article",
    publishedTime: property.publishedAt,
    image: {
      url: property.image.src,
      width: property.image.width,
      height: property.image.height,
      alt: property.image.alt,
    },
  });
}

export default async function PropertyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const related = await listRelatedProperties(property);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: property.name, path: `/properties/${property.slug}` },
  ];

  const enquiry = encodeURIComponent(
    `Hello ${site.name}, I would like to arrange a viewing of ${property.name} in ${property.community}.`,
  );

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), propertySchema(property))} />

      <article className="panel">
        <div className="relative isolate min-h-[70svh] overflow-hidden pt-28">
          <div className="absolute inset-0 z-0">
            <Image
              src={property.image.src}
              alt={property.image.alt}
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.6)_55%,rgba(0,0,0,0.5)_100%)]"
            />
          </div>

          <Container className="relative z-10 flex min-h-[calc(70svh-7rem)] flex-col justify-end pb-14">
            <Breadcrumbs trail={trail} />
            <p className="eyebrow mt-8">{property.community}, {property.city}</p>
            <h1 className="display-2 text-balance-title mt-4 max-w-[18ch]">
              {property.name}
            </h1>
            <p className="prose-lede mt-5 max-w-[52ch]">{property.headline}</p>

            <p className="mt-8 font-display text-3xl sm:text-4xl">
              {formatPrice(
                property.price.amount,
                property.price.currency,
                property.pricePeriod,
              )}
            </p>
          </Container>
        </div>

        <Container className="grid gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20 lg:py-24">
          <div>
            <h2 className="display-3">About this residence</h2>
            <p className="prose-lede mt-6">{property.description}</p>

            <h2 className="display-3 mt-14">Key facts</h2>
            <dl className="mt-6 grid border-t border-l border-hairline sm:grid-cols-2">
              <Fact label="Bedrooms" value={String(property.bedrooms)} icon="bed" />
              <Fact label="Bathrooms" value={String(property.bathrooms)} icon="bath" />
              <Fact label="Built-up area" value={formatArea(property.areaSqm)} icon="area" />
              <Fact label="Community" value={property.community} icon="location" />
              {property.developer && (
                <Fact label="Developer" value={property.developer} />
              )}
              {property.handover && (
                <Fact label="Handover" value={property.handover} />
              )}
            </dl>

            <h2 className="display-3 mt-14">Features</h2>
            <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {property.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 border-b border-hairline pb-3 text-sm text-bone-muted"
                >
                  <span aria-hidden="true" className="mt-2 h-px w-4 bg-hairline-strong" />
                  {feature}
                </li>
              ))}
            </ul>

            {property.permitNumber && (
              <p className="mt-10 text-xs uppercase tracking-[0.14em] text-bone-faint">
                DLD permit number {property.permitNumber}
              </p>
            )}
          </div>

          <aside className="h-fit border border-hairline bg-surface p-8 lg:sticky lg:top-28">
            <p className="eyebrow">Enquire</p>
            <p className="display-3 mt-4">Arrange a private viewing</p>
            <p className="mt-4 font-prose text-sm leading-relaxed text-bone-subtle">
              Speak to the advisor who knows this building — availability,
              comparable sales and service charges included.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink
                href={`https://wa.me/${site.contact.whatsapp}?text=${enquiry}`}
                external
                size="lg"
              >
                WhatsApp us
              </ButtonLink>
              <ButtonLink
                href={`tel:${site.contact.phoneE164}`}
                variant="outline"
                size="lg"
              >
                {site.contact.phone}
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost" size="lg">
                Send an enquiry
              </ButtonLink>
            </div>
          </aside>
        </Container>

        {related.length > 0 && (
          <section
            aria-labelledby="related-title"
            className="border-t border-hairline py-16 lg:py-24"
          >
            <Container>
              <div className="flex items-end justify-between gap-6">
                <h2 id="related-title" className="display-2">
                  You may also like
                </h2>
                <Link
                  href="/properties"
                  className="shrink-0 border-b border-hairline-strong pb-1 text-xs uppercase tracking-[0.16em] text-bone-muted transition-colors hover:border-bone hover:text-bone"
                >
                  All properties
                </Link>
              </div>

              <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <PropertyCard
                      property={item}
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

function Fact({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: "bed" | "bath" | "area" | "location";
}) {
  return (
    <div className="border-b border-r border-hairline p-6">
      <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-bone-faint">
        {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
        {label}
      </dt>
      <dd className="mt-3 font-sans text-lg font-light text-bone">{value}</dd>
    </div>
  );
}
