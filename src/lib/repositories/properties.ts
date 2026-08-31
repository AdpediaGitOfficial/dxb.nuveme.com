import { properties } from "@/content/properties";
import type { ListingIntent, Property, PropertyKind } from "@/types";

/**
 * Listing data access.
 *
 * Every function is async on purpose: today it resolves from a local module,
 * but the signatures already match a network-backed CMS or DLD feed, so
 * swapping the source will not ripple into pages or components.
 */

export interface PropertyQuery {
  intent?: ListingIntent;
  kind?: PropertyKind;
  community?: string;
  /** Free-text search across name, community and description. */
  q?: string;
  limit?: number;
}

function matches(property: Property, query: PropertyQuery): boolean {
  if (query.intent && property.intent !== query.intent) return false;
  if (query.kind && property.kind !== query.kind) return false;
  if (query.community && property.communitySlug !== query.community) return false;

  if (query.q) {
    const haystack =
      `${property.name} ${property.community} ${property.headline} ${property.description}`.toLowerCase();
    if (!haystack.includes(query.q.toLowerCase().trim())) return false;
  }

  return true;
}

export async function listProperties(query: PropertyQuery = {}): Promise<Property[]> {
  const results = properties
    .filter((property) => matches(property, query))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return query.limit ? results.slice(0, query.limit) : results;
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  return properties.find((property) => property.slug === slug) ?? null;
}

export async function listPropertySlugs(): Promise<string[]> {
  return properties.map((property) => property.slug);
}

/**
 * Related listings for a detail page: same community first, then the same
 * kind, never the property itself.
 */
export async function listRelatedProperties(
  property: Property,
  limit = 3,
): Promise<Property[]> {
  const scored = properties
    .filter((candidate) => candidate.slug !== property.slug)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.communitySlug === property.communitySlug ? 2 : 0) +
        (candidate.kind === property.kind ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((entry) => entry.candidate);
}
