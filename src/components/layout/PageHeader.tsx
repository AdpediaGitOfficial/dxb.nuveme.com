import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  trail: Crumb[];
}

/** Shared masthead for every interior page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  trail,
}: PageHeaderProps) {
  return (
    <header className="border-b border-hairline pb-14 pt-32 sm:pb-20 sm:pt-40">
      <Container>
        <Breadcrumbs trail={trail} />
        <p className="eyebrow mt-8">{eyebrow}</p>
        <h1 className="display-2 text-balance-title mt-5 max-w-[20ch]">
          {title}
        </h1>
        {description && (
          <p className="prose-lede mt-6 max-w-[62ch]">{description}</p>
        )}
      </Container>
    </header>
  );
}
