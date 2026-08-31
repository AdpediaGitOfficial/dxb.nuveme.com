import { cn } from "@/lib/utils";

/**
 * Monochrome icons are the SVGs exported from the Figma file, served as static
 * files and painted with a CSS mask. That keeps a single cached request per
 * glyph (rather than inlining the same markup into every card) while still
 * letting the icon inherit `currentColor`.
 */
export const icons = {
  menu: "/icons/ui/menu.svg",
  search: "/icons/ui/search.svg",
  pin: "/icons/ui/pin.svg",
  /* Figma ships this one as a PNG mask; CSS masks take either. */
  expand: "/icons/ui/expand.png",
  bed: "/icons/amenity/bed.svg",
  bath: "/icons/amenity/bath.svg",
  area: "/icons/amenity/area.svg",
  location: "/icons/amenity/location.svg",
  instagram: "/icons/social/instagram.svg",
  facebook: "/icons/social/facebook.svg",
  linkedin: "/icons/social/linkedin.svg",
  youtube: "/icons/social/youtube.svg",
  x: "/icons/social/x.svg",
  tiktok: "/icons/social/tiktok.svg",
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
  /** Icons are decorative by default; pass a label when one carries meaning. */
  label?: string;
}

export function Icon({ name, className, label }: IconProps) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        maskImage: `url(${icons[name]})`,
        WebkitMaskImage: `url(${icons[name]})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
