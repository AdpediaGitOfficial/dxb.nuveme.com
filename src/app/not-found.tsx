import { Container } from "@/components/layout/Container";
import { Panel } from "@/components/layout/Panel";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Panel>
      <Container className="flex min-h-[70svh] flex-col justify-center py-32 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="display-2 mx-auto mt-6 max-w-[16ch]">
        This address is no longer on the market
      </h1>
      <p className="prose-lede mx-auto mt-6 max-w-[48ch]">
        The page you were looking for has moved or never existed. Browse the
        current collection, or get in touch and we will find the right property
        for you.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <ButtonLink href="/properties">View properties</ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Contact us
        </ButtonLink>
      </div>
      </Container>
    </Panel>
  );
}
