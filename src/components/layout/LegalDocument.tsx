import type { Crumb } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Panel } from "@/components/layout/Panel";

interface LegalSection {
  heading: string;
  body: string[];
}

/**
 * Shared shell for policy pages so they stay structurally identical and easy
 * to keep in review.
 */
export function LegalDocument({
  title,
  updated,
  trail,
  sections,
}: {
  title: string;
  updated: string;
  trail: Crumb[];
  sections: LegalSection[];
}) {
  return (
    <Panel>
      <PageHeader
        eyebrow="Legal"
        title={title}
        description={`Last updated ${updated}.`}
        trail={trail}
      />

      <Container className="py-16 lg:py-24">
        <div className="max-w-[70ch] space-y-12">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="display-3">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-prose text-[0.9375rem] leading-relaxed text-bone-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </Panel>
  );
}
