"use client";

import { useEffect } from "react";

import { Container } from "@/components/layout/Container";
import { Panel } from "@/components/layout/Panel";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with the project's error reporter (Sentry, Datadog, …).
    console.error(error);
  }, [error]);

  return (
    <Panel>
      <Container className="flex min-h-[70svh] flex-col justify-center py-32 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="display-2 mx-auto mt-6 max-w-[18ch]">
        We could not load this page
      </h1>
      <p className="prose-lede mx-auto mt-6 max-w-[48ch]">
        Please try again. If the problem continues, contact our team and we will
        help you directly.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/" variant="outline">
          Back to home
        </ButtonLink>
      </div>
      </Container>
    </Panel>
  );
}
