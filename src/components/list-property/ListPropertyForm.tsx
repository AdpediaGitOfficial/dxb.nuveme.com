"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";

import {
  submitListing,
  type ListPropertyFormState,
} from "@/app/list-your-property/actions";
import {
  FieldWell,
  FormStatus,
  SelectControl,
} from "@/components/ui/FormControls";
import { listForm } from "@/content/list-property";
import { consultation } from "@/content/services";
import { cn } from "@/lib/utils";

const INITIAL: ListPropertyFormState = { status: "idle", message: "" };

/**
 * The listing enquiry (node 981:1899).
 *
 * Eight fields on an 802-wide block: name and email, phone and language,
 * property type across the full width, purpose and bedrooms, then the message
 * and an outlined submit bar. Wells are 387 × 60 on a 0.556px 40%-ink
 * hairline, a 25 gutter between columns and an 85 row pitch.
 *
 * Two departures from the drawn form, both noted in DESIGN-SYSTEM.md §12:
 * "Property purpose" is a select here — the artboard gives it no chevron, but
 * free text in a sell-or-rent field produces leads nobody can route — and the
 * "Full name" label is drawn in white, which would be invisible on the paper
 * ground, so it takes the ink of its five siblings.
 */
export function ListPropertyForm() {
  const [state, action] = useActionState(submitListing, INITIAL);
  const uid = useId();
  const id = (name: string) => `listing-${name}-${uid}`;

  return (
    <form action={action} noValidate>
      {/* Honeypot — hidden from people, visible to naive bots. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={id("company")}>Company</label>
        <input
          id={id("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:gap-x-[1.458vw] lg:gap-y-[1.302vw]">
        <Text
          id={id("name")}
          name="name"
          label="Full name"
          autoComplete="name"
          error={state.errors?.name}
        />
        <Text
          id={id("email")}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={state.errors?.email}
        />
        <Text
          id={id("phone")}
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          error={state.errors?.phone}
        />

        <FieldWell
          error={state.errors?.language}
          borderClass={HAIRLINE}
          wellClass={WELL}
        >
          <SelectControl
            id={id("language")}
            name="language"
            label="Select language"
            options={consultation.languages}
            className={CONTROL}
            chevronClass="text-black/90 lg:right-[1.667vw]"
          />
        </FieldWell>

        <FieldWell
          error={state.errors?.propertyType}
          borderClass={HAIRLINE}
          wellClass={WELL}
          className="sm:col-span-2"
        >
          <SelectControl
            id={id("propertyType")}
            name="propertyType"
            label="Property Type"
            options={listForm.propertyTypes}
            className={CONTROL}
            chevronClass="text-black/90 lg:right-[1.667vw]"
          />
        </FieldWell>

        <FieldWell
          error={state.errors?.purpose}
          borderClass={HAIRLINE}
          wellClass={WELL}
        >
          <SelectControl
            id={id("purpose")}
            name="purpose"
            label="Property purpose"
            options={listForm.purposes}
            className={CONTROL}
            chevronClass="text-black/90 lg:right-[1.667vw]"
          />
        </FieldWell>

        <FieldWell
          error={state.errors?.bedrooms}
          borderClass={HAIRLINE}
          wellClass={WELL}
        >
          <SelectControl
            id={id("bedrooms")}
            name="bedrooms"
            label="Bedroom"
            options={listForm.bedrooms}
            className={CONTROL}
            chevronClass="text-black/90 lg:right-[1.667vw]"
          />
        </FieldWell>

        <FieldWell
          error={state.errors?.message}
          borderClass={HAIRLINE}
          wellClass="h-40 lg:h-[7.708vw]"
          className="sm:col-span-2"
        >
          <label htmlFor={id("message")} className="sr-only">
            Message
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            placeholder="Message"
            className={cn(CONTROL, "resize-none py-4 lg:pt-[1.198vw]")}
          />
        </FieldWell>
      </div>

      <FormStatus status={state.status} message={state.message} />

      <SubmitBar />
    </form>
  );
}

const HAIRLINE = "border-[0.556px] border-black/40";
const WELL = "h-14 lg:h-[3.125vw]";

const CONTROL = cn(
  "w-full appearance-none bg-transparent px-4 font-sans font-light text-ink outline-none",
  "placeholder:text-black/90 text-base",
  "h-full lg:px-[0.677vw] lg:text-[clamp(0.875rem,0.938vw,1.125rem)]",
);

function Text({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <FieldWell error={error} borderClass={HAIRLINE} wellClass={WELL}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={label}
        className={CONTROL}
      />
    </FieldWell>
  );
}

function SubmitBar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "mt-6 flex h-14 w-full items-center justify-center border-[0.556px] border-black/40 font-sans text-ink",
        "transition-colors duration-300 ease-(--ease-editorial) hover:bg-ink hover:text-bone",
        "disabled:opacity-60 lg:mt-[2.292vw] lg:h-[3.125vw] lg:text-[clamp(0.875rem,0.938vw,1.125rem)]",
      )}
    >
      {pending ? "Sending…" : "Submit"}
    </button>
  );
}
