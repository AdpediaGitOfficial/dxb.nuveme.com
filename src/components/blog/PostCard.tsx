import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Post } from "@/types";

/**
 * The article card, used at two widths.
 *
 * Both artboards draw the same object: a photograph 428 tall, a 12 gap, then a
 * 156-tall caption block at 30% `#d9d9d9` with the title 16 in and 16 down,
 * the excerpt 8 under it and "Read more" 24 below that. Only the width changes
 * — 567 in the index grid (node 981:2274), 521 in the article sidebar (node
 * 981:2464) — so the image aspect is the one thing the caller passes in.
 *
 * The whole card is one link; the drawn "Read more" is the affordance, not a
 * second target.
 */
export function PostCard({
  post,
  imageAspect = "aspect-[567/428]",
}: {
  post: Post;
  imageAspect?: string;
}) {
  return (
    <li>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div
          className={cn(
            "relative w-full overflow-hidden bg-black/5",
            imageAspect,
          )}
        >
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-600 ease-(--ease-wipe) group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>

        <div className="mt-3 bg-[#d9d9d9]/30 p-5 lg:mt-[0.625vw] lg:p-[0.833vw]">
          <h3 className="font-sans font-light leading-[1.2] tracking-[-0.01em] lg:text-[clamp(0.9375rem,1.042vw,1.25rem)]">
            {post.title}
          </h3>

          <p className="mt-2 font-prose font-light leading-[1.2] text-black/80 text-sm lg:mt-[0.417vw] lg:line-clamp-2 lg:text-[clamp(0.8125rem,0.938vw,1.125rem)]">
            {post.excerpt}
          </p>

          <span className="mt-5 inline-block font-prose leading-[1.2] lg:mt-[1.25vw] lg:text-[clamp(0.8125rem,0.938vw,1.125rem)]">
            <span className="border-b border-transparent transition-colors duration-300 group-hover:border-current">
              Read more
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}
