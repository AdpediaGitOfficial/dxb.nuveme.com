import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Panel } from "@/components/layout/Panel";
import { PropertySearchForm } from "@/components/home/PropertySearchForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { IntentTabs } from "@/components/ui/IntentTabs";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { breadcrumbSchema, graph, itemListSchema } from "@/lib/jsonld";
import { listProperties } from "@/lib/repositories/properties";
import { buildMetadata } from "@/lib/seo";
import type { ListingIntent, PropertyKind } from "@/types";

const INTENTS: Array<{ value: ListingIntent | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "off-plan", label: "Off-Plan" },
];

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const intent = first(params.intent);
  const isFiltered = Object.keys(params).length > 0;

  const titles: Record<string, string> = {
    buy: "Property for Sale in Dubai",
    rent: "Property for Rent in Dubai",
    "off-plan": "Off-Plan Property in Dubai",
  };

  return buildMetadata({
    // `Object.hasOwn`, not a bare lookup: `?intent=constructor` walks the
    // prototype chain and puts a function where the <title> should be.
    title:
      (intent && Object.hasOwn(titles, intent) ? titles[intent] : undefined) ??
      "Properties for Sale & Rent in Dubai",
    description:
      "Browse NUVÉ Properties' curated collection of Dubai residences — waterfront villas, branded apartments, penthouses and off-plan launches across the Emirate's prime communities.",
    // Filtered views canonicalise to the unfiltered listing so that facet
    // combinations do not compete with each other in the index.
    path: "/properties",
    noIndex: isFiltered && !intent,
  });
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const intent = first(params.intent) as ListingIntent | undefined;
  const kind = first(params.type) as PropertyKind | undefined;
  const q = first(params.q);
  const bedrooms = Number(first(params.bedrooms) ?? 0);

  const all = await listProperties({ intent, kind, q });
  const results = bedrooms
    ? all.filter((property) => property.bedrooms >= bedrooms)
    : all;

  const trail = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(trail),
          itemListSchema(
            results.map((property) => ({
              name: property.name,
              path: `/properties/${property.slug}`,
            })),
            "Dubai property listings",
          ),
        )}
      />

      <Panel>
        <PageHeader
          eyebrow="Premium Listings"
          title="Find the address that defines you"
          description="Every listing is verified, permit-numbered and accompanied by comparable-sale data before it reaches this page."
          trail={trail}
        />

        <Container className="py-12 lg:py-16">
          <PropertySearchForm defaultIntent={intent ?? "buy"} />

          {/*
            The same tab row as the home page, so arriving here from "Rent"
            lands on the control that was just clicked rather than a different
            one. The "All" option is ours -- the artboard only draws the three
            intents, but a listing page needs a way back to the unfiltered set.
          */}
          <IntentTabs
            label="Filter by intent"
            className="mt-10"
            tabs={INTENTS.map((option) => ({
              label: option.label,
              href:
                option.value === "all"
                  ? "/properties"
                  : `/properties?intent=${option.value}`,
              active:
                option.value === "all" ? !intent : option.value === intent,
            }))}
          />

          <p className="mt-8 text-sm text-bone-subtle" role="status">
            {results.length} {results.length === 1 ? "property" : "properties"}
            {q ? ` matching “${q}”` : ""}
          </p>

          {results.length > 0 ? (
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[0.99vw] lg:gap-y-[1.458vw] xl:grid-cols-4">
              {results.map((property, index) => (
                <li key={property.slug}>
                  <PropertyCard
                    property={property}
                    priority={index < 4}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12 border border-hairline p-10 text-center">
              <p className="display-3">No properties match those filters</p>
              <p className="prose-lede mx-auto mt-4 max-w-[46ch]">
                Try widening your search, or tell us what you are looking for
                and we will bring you matching off-market options.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-block border-b border-hairline-strong pb-2 text-xs uppercase tracking-[0.18em] text-bone-muted transition-colors hover:border-bone hover:text-bone"
              >
                Register your requirements
              </Link>
            </div>
          )}
        </Container>
      </Panel>
    </>
  );
}
