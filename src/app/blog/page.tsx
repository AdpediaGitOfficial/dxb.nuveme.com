import { BlogIndex } from "@/components/blog/BlogIndex";
import { PageHero } from "@/components/layout/PageHero";
import { ConsultationSection } from "@/components/services/ConsultationSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogIntro, listPosts } from "@/content/posts";
import { breadcrumbSchema, graph, itemListSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Market trends, community guides and practical notes on buying, selling and renting in Dubai, from the NUVÉ Properties advisory team.",
  path: "/blog",
  keywords: [
    "Dubai real estate blog",
    "Dubai property market insights",
    "Dubai investment guides",
  ],
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default async function BlogPage({
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
          itemListSchema(
            listPosts().map((post) => ({
              name: post.title,
              path: `/blog/${post.slug}`,
            })),
            "Articles",
          ),
        )}
      />

      <PageHero
        eyebrow={blogIntro.hero.eyebrow}
        title={blogIntro.hero.title}
        poster={{
          src: "/images/hero/hero-poster.webp",
          alt: "Aerial view over Dubai Marina and the coastline at dusk",
        }}
        video="/video/hero.mp4"
        trail={trail}
      />

      <BlogIndex page={Number.isFinite(page) ? page : 1} />
      <ConsultationSection />
    </>
  );
}
