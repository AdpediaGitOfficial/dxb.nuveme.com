import Image from "next/image";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/blog/PostCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ConsultationSection } from "@/components/services/ConsultationSection";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  articleAside,
  blogIntro,
  getPost,
  listRelated,
  posts,
} from "@/content/posts";
import { ORGANISATION_ID, breadcrumbSchema, graph } from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  // An unknown slug renders the 404 below, so the metadata has to say so too
  // rather than advertising an article that does not exist.
  if (!post) {
    return buildMetadata({
      title: "Page not found",
      description: "This article is no longer available.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    image: {
      url: post.image.src,
      width: post.image.width,
      height: post.image.height,
      alt: post.image.alt,
    },
  });
}

/**
 * The article page (node 981:2416).
 *
 * Two columns on the content column: the article at 1159 and the recent-posts
 * rail at 521, with a 46 gutter. The rail runs longer than the article in the
 * artboard and is left to do so — it is a roll, not a sidebar pinned to the
 * text.
 *
 * Article rhythm, measured: title 40 Saol on an 817 measure, standfirst 20 at
 * 140% on 885, the lead image 1159 × 595, then a meta row of date and author
 * either side of a 25-tall hairline. Body copy is 18 at 140%; a subheading
 * sits 50 below the paragraph before it and 24 above the one after.
 */
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = listRelated(post.slug);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const published = new Date(post.publishedAt);
  const stamp = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dubai",
  }).format(published);

  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "BlogPosting",
          "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
          headline: post.title,
          description: post.excerpt,
          image: absoluteUrl(post.image.src),
          datePublished: post.publishedAt,
          author: { "@type": "Person", name: post.author },
          publisher: { "@id": ORGANISATION_ID },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        })}
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
        // The article's own title is this page's <h1>.
        titleAs="p"
      />

      <div className="on-paper py-14 sm:py-16 lg:py-[6.77vw]">
        <Container className="grid gap-14 lg:grid-cols-[67.15%_30.19%] lg:justify-between lg:gap-0">
          <article>
            <Breadcrumbs
              trail={trail}
              className="mb-6 text-black/50 lg:hidden"
            />

            <h1 className="font-display leading-none text-[clamp(1.75rem,2.083vw,2.5rem)] lg:max-w-[42.55vw]">
              {post.title}
            </h1>

            <p className="mt-3 font-prose font-extralight leading-[1.4] text-black/80 lg:mt-[0.365vw] lg:max-w-[46.09vw] lg:text-[clamp(0.9375rem,1.042vw,1.25rem)]">
              {post.standfirst}
            </p>

            <div className="relative mt-8 aspect-[1159/595] w-full bg-black/5 lg:mt-[2.083vw]">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 67vw, 100vw"
                className="object-cover"
              />
            </div>

            <p className="mt-6 flex items-center gap-4 font-sans font-light leading-[1.4] text-black/80 lg:mt-[1.927vw] lg:gap-[0.938vw] lg:text-[clamp(0.875rem,1.042vw,1.25rem)]">
              <time dateTime={post.publishedAt}>{stamp}</time>
              <span aria-hidden="true" className="h-6 w-px bg-black/60" />
              <span>{post.author}</span>
            </p>

            <div className="mt-8 lg:mt-[1.927vw]">
              {post.body.map((section, index) => (
                <section
                  key={section.heading ?? `section-${index}`}
                  className={index > 0 ? "mt-10 lg:mt-[2.604vw]" : undefined}
                >
                  {section.heading && (
                    <h2 className="font-display leading-[1.4] text-black/80 text-2xl lg:mb-[1.25vw] lg:text-[clamp(1.25rem,1.5625vw,1.875rem)]">
                      {section.heading}
                    </h2>
                  )}

                  <div className="space-y-4 lg:space-y-[0.833vw]">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="font-prose font-extralight leading-[1.4] text-black/80 text-sm lg:text-[clamp(0.8125rem,0.938vw,1.125rem)]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>

          <aside aria-labelledby="recent-posts">
            <h2
              id="recent-posts"
              className="font-display leading-none text-2xl lg:text-[clamp(1.25rem,1.5625vw,1.875rem)]"
            >
              {articleAside.heading}
            </h2>
            <p className="mt-3 font-prose font-extralight leading-[1.4] text-black/80 lg:mt-[0.365vw] lg:text-[clamp(0.9375rem,1.042vw,1.25rem)]">
              {articleAside.description}
            </p>

            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:mt-[2.083vw] lg:grid-cols-1 lg:gap-[1.354vw]">
              {related.map((item) => (
                <PostCard
                  key={item.slug}
                  post={item}
                  imageAspect="aspect-[521/428]"
                />
              ))}
            </ul>
          </aside>
        </Container>
      </div>

      <ConsultationSection />
    </>
  );
}
