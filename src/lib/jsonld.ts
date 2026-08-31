import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import type { Community, Faq, Property } from "@/types";

/**
 * schema.org builders.
 *
 * Every graph node carries a stable `@id` rooted at the site origin so that
 * search engines can resolve references between them (a listing points at the
 * agency, the agency points at its own logo, and so on) instead of each page
 * declaring an unrelated island of data.
 */

export const ORGANISATION_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

type JsonLdNode = Record<string, unknown>;

export function organizationSchema(): JsonLdNode {
  return {
    "@type": "RealEstateAgent",
    "@id": ORGANISATION_ID,
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    description: site.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/nuve-properties.svg"),
    },
    image: absoluteUrl("/images/og/og-default.webp"),
    email: site.contact.email,
    telephone: site.contact.phoneE164,
    foundingDate: String(site.foundingYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: {
      "@type": "City",
      name: "Dubai",
      containedInPlace: { "@type": "Country", name: site.address.countryName },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...site.openingHours.days],
        opens: site.openingHours.opens,
        closes: site.openingHours.closes,
      },
    ],
    sameAs: site.socials.map((social) => social.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Property services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: absoluteUrl(`/services#${service.slug}`),
        },
      })),
    },
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: site.name,
    description: site.description,
    inLanguage: site.language,
    publisher: { "@id": ORGANISATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/properties?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  trail: Array<{ name: string; path: string }>,
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(entries: Faq[] = faqs): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: entries.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function propertySchema(property: Property): JsonLdNode {
  const url = absoluteUrl(`/properties/${property.slug}`);

  return {
    "@type": ["Residence", "Product"],
    "@id": `${url}#listing`,
    url,
    name: property.name,
    description: property.description,
    image: absoluteUrl(property.image.src),
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.areaSqm,
      unitCode: "MTK",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.community,
      addressRegion: property.city,
      addressCountry: site.address.country,
    },
    amenityFeature: property.features.map((feature) => ({
      "@type": "LocationFeatureSpecification",
      name: feature,
      value: true,
    })),
    offers: {
      "@type": "Offer",
      url,
      price: property.price.amount,
      priceCurrency: property.price.currency,
      availability: "https://schema.org/InStock",
      businessFunction:
        property.intent === "rent"
          ? "https://purl.org/goodrelations/v1#LeaseOut"
          : "https://purl.org/goodrelations/v1#Sell",
      seller: { "@id": ORGANISATION_ID },
    },
  };
}

export function communitySchema(community: Community): JsonLdNode {
  const url = absoluteUrl(`/communities/${community.slug}`);

  return {
    "@type": "Place",
    "@id": `${url}#place`,
    url,
    name: community.name,
    description: community.description,
    image: absoluteUrl(community.image.src),
    address: {
      "@type": "PostalAddress",
      addressLocality: community.name,
      addressRegion: "Dubai",
      addressCountry: site.address.country,
    },
    ...(community.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: community.geo.latitude,
            longitude: community.geo.longitude,
          },
        }
      : {}),
  };
}

export function itemListSchema(
  items: Array<{ name: string; path: string }>,
  listName: string,
): JsonLdNode {
  return {
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

/** Wraps one or more nodes into a single `@graph` document. */
export function graph(...nodes: JsonLdNode[]): JsonLdNode {
  return { "@context": "https://schema.org", "@graph": nodes };
}
