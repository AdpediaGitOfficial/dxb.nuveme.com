import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { ListPropertyForm } from "@/components/list-property/ListPropertyForm";
import { listForm } from "@/content/list-property";

/**
 * The listing enquiry band on the page ground: an 811 × 657 photograph on the
 * left and the 802-wide form on the right, the image hanging 34 above and
 * below the form so the two centre on each other.
 *
 * The monogram behind the form is drawn at roughly 3.5% ink (sampled `#f6f6f6`
 * on white). The exported asset is solid white — the careers page shows it on
 * a dark block — so here it is used as a mask over an ink fill rather than as
 * a picture, which is the only way to recolour it.
 */
export function ListFormSection() {
  return (
    <section
      aria-labelledby="listing-form-title"
      className="on-paper py-14 sm:py-16 lg:pb-[4.74vw] lg:pt-[6.77vw]"
    >
      <h2 id="listing-form-title" className="sr-only">
        Tell us about your property
      </h2>

      <Container className="grid gap-12 lg:grid-cols-[47%_46.5%] lg:items-center lg:justify-between lg:gap-0">
        <div className="relative aspect-[811/657] w-full bg-black/5">
          <Image
            src={listForm.image.src}
            alt={listForm.image.alt}
            fill
            sizes="(min-width: 1024px) 47vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-[-2.5%] -z-10 hidden aspect-[396/509] w-[49.4%] bg-ink opacity-[0.035] lg:block"
            style={{
              maskImage: "url(/icons/ui/monogram-arch.svg)",
              WebkitMaskImage: "url(/icons/ui/monogram-arch.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />

          <ListPropertyForm />
        </div>
      </Container>
    </section>
  );
}
