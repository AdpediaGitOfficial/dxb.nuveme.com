import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/layout/Section";
import { PostCard } from "@/components/blog/PostCard";
import { Pagination } from "@/components/ui/Pagination";
import { POSTS_PER_PAGE, blogIntro, listPosts } from "@/content/posts";

export const POSTS_ANCHOR = "articles";

/**
 * "Insights That Keep You Ahead" — the article grid on the page ground.
 *
 * Card geometry from nodes 981:2274–981:2311: a 567 × 428 photograph, a 12
 * gap, then a 567 × 156 caption block at 30% `#d9d9d9`. Inside the block the
 * title sits 16 in and 16 down, the excerpt 8 under it and "Read more" 24
 * below that. Columns run on a 579 pitch (12 gutter) and rows on a 636 pitch
 * (40 gutter).
 *
 * The whole card is one link — the drawn "Read more" is the affordance, not a
 * second target, so it is a `<span>` inside the anchor rather than a nested
 * link.
 */
export function BlogIndex({ page }: { page: number }) {
  const all = listPosts();
  const pageCount = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
  const current = Math.min(Math.max(page, 1), pageCount);
  const visible = all.slice(
    (current - 1) * POSTS_PER_PAGE,
    current * POSTS_PER_PAGE,
  );

  const href = (next: number) =>
    `/blog${next > 1 ? `?page=${next}` : ""}#${POSTS_ANCHOR}`;

  return (
    <section
      id={POSTS_ANCHOR}
      aria-labelledby="blog-title"
      className="on-paper py-14 sm:py-16 lg:py-[6.77vw]"
    >
      <Container>
        <SectionIntro
          eyebrow={blogIntro.eyebrow}
          title={blogIntro.title}
          description={blogIntro.description}
          headingId="blog-title"
          asideWidth="26.5%"
          titleClassName="lg:max-w-[41.7vw]"
          alignY="center"
        />

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-[3.698vw] lg:grid-cols-3 lg:gap-x-[0.625vw] lg:gap-y-[2.083vw]">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>

        <Pagination
          current={current}
          pageCount={pageCount}
          href={href}
          label="Article pagination"
          className="mt-10 lg:mt-[4.167vw]"
        />
      </Container>
    </section>
  );
}
