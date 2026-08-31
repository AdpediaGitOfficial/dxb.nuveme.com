import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { legalNav, primaryNav, propertyTypeNav, site } from "@/content/site";

const socialIcons: Record<string, IconName> = {
  Instagram: "instagram",
  Facebook: "facebook",
  LinkedIn: "linkedin",
  YouTube: "youtube",
  X: "x",
  TikTok: "tiktok",
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-[var(--rail)] border-t border-hairline bg-surface text-bone">
      <Container className="py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-20">
          <div className="max-w-[42ch]">
            <Link
              href="/"
              className="relative block h-[3.1rem] w-[5.8rem]"
              aria-label={`${site.name} — home`}
            >
              <Image
                src="/brand/nuve-properties.svg"
                alt={site.name}
                fill
                sizes="107px"
                className="object-contain object-left"
              />
            </Link>

            <p className="mt-8 font-prose text-sm leading-relaxed text-bone-subtle">
              {site.description}
            </p>

            <div className="mt-12">
              <h2 className="display-3 text-bone">Get in Touch</h2>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-4 block text-sm text-bone-muted transition-colors hover:text-bone"
              >
                {site.contact.email}
              </a>

              <ul className="mt-8 flex flex-wrap items-center gap-6">
                {site.socials.map((social) => {
                  const icon = socialIcons[social.name];
                  if (!icon) return null;

                  return (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="block text-bone-subtle transition-colors hover:text-bone"
                      >
                        <span className="sr-only">
                          {site.name} on {social.name}
                        </span>
                        <Icon name={icon} className="h-[1.15rem] w-[1.15rem]" />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <address className="mt-10 space-y-1 text-sm not-italic text-bone-subtle">
                <p>{site.address.street},</p>
                <p>
                  {site.address.locality}, {site.address.region},{" "}
                  {site.address.countryName}.
                </p>
                <p className="pt-4">
                  <a
                    href={`tel:${site.contact.phoneE164}`}
                    className="transition-colors hover:text-bone"
                  >
                    {site.contact.phone}
                  </a>
                </p>
              </address>
            </div>
          </div>

          <FooterColumn title="Quick Links" links={primaryNav} />
          <FooterColumn title="Property Types" links={propertyTypeNav} />
        </div>
      </Container>

      <div className="border-t border-hairline">
        <Container className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-bone-faint">
            © {year} {site.name}. All rights reserved
          </p>
          <ul className="flex gap-8">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.6875rem] uppercase tracking-[0.14em] text-bone-faint transition-colors hover:text-bone"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title} className="lg:min-w-[11rem]">
      <h2 className="display-3 text-bone">{title}</h2>
      <ul className="mt-6 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-bone-subtle transition-colors hover:text-bone"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
