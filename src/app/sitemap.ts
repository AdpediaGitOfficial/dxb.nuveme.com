import type { MetadataRoute } from "next";

import { listPosts } from "@/content/posts";
import { listCommunities } from "@/lib/repositories/communities";
import { listProperties } from "@/lib/repositories/properties";
import { absoluteUrl } from "@/lib/seo";

/** Static routes, with the priority weighting search engines treat as a hint. */
const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/properties", changeFrequency: "daily", priority: 0.9 },
  { path: "/communities", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services", changeFrequency: "monthly", priority: 0.7 },
  { path: "/off-plan", changeFrequency: "weekly", priority: 0.8 },
  { path: "/list-your-property", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, communities] = await Promise.all([
    listProperties(),
    listCommunities(),
  ]);
  const now = new Date();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...properties.map((property) => ({
      url: absoluteUrl(`/properties/${property.slug}`),
      lastModified: new Date(property.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...listPosts().map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...communities.map((community) => ({
      url: absoluteUrl(`/communities/${community.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
