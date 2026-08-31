import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Community } from "@/types";

interface CommunityCardProps {
  community: Community;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function CommunityCard({
  community,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: CommunityCardProps) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/communities/${community.slug}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-current/5">
          <Image
            src={community.image.src}
            alt={community.image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-(--ease-editorial) group-hover:scale-[1.04]"
          />
        </div>

        <h3 className="display-3 mt-6 transition-colors group-hover:opacity-80">
          {community.name}
        </h3>
        <p className="mt-2 font-prose text-sm opacity-60">
          {community.tagline}
        </p>
      </Link>
    </article>
  );
}
