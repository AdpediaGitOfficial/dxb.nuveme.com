import { communities } from "@/content/communities";
import type { Community } from "@/types";

export async function listCommunities(limit?: number): Promise<Community[]> {
  return limit ? communities.slice(0, limit) : communities;
}

export async function getCommunityBySlug(slug: string): Promise<Community | null> {
  return communities.find((community) => community.slug === slug) ?? null;
}

export async function listCommunitySlugs(): Promise<string[]> {
  return communities.map((community) => community.slug);
}
