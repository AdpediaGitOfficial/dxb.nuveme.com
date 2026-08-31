"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";

import { submitEnquiry, type ContactFormState } from "@/app/contact/actions";
import {
  FieldWell,
  FormStatus,
  SelectControl,
} from "@/components/ui/FormControls";
import { consultation } from "@/content/services";
import { cn } from "@/lib/utils";

const INITIAL: ContactFormState = { status: "idle", message: "" };

/**
 * The enquiry form from the contact artboard (node 981:1686).
 *
 * Six fields on an 802-wide block: name and email side by side, phone and
 * language beneath them, then the time slot and message full width. Wells are
 * 387 × 60 on a 0.556px 25%-white hairline at an 85 pitch with a 28 gutter,
 * the message box is 148, and the submit bar is the same well at 40% white —
 * outlined, unlike the solid bar on the service page.
 */
export function ContactForm() {
  const [state, action] = useActionState(submitEnquiry, INITIAL);
  const uid = useId();
  const id = (name: string) => `contact-${name}-${uid}`;

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
        <FieldWell
          error={state.errors?.name}
          borderClass={HAIRLINE}
          wellClass="h-14 lg:h-[3.125vw]"
        >
          <label htmlFor={id("name")} className="sr-only">
            Full name
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            className={CONTROL}
          />
        </FieldWell>

        <FieldWell
          error={state.errors?.email}
          borderClass={HAIRLINE}
          wellClass="h-14 lg:h-[3.125vw]"
        >
          <label htmlFor={id("email")} className="sr-only">
            Email
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            className={CONTROL}
          />
        </FieldWell>

        <FieldWell
          error={state.errors?.phone}
          borderClass={HAIRLINE}
          wellClass="h-14 lg:h-[3.125vw]"
        >
          <label htmlFor={id("phone")} className="sr-only">
            Phone
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone"
            className={CONTROL}
          />
        </FieldWell>

        <FieldWell
          error={state.errors?.language}
          borderClass={HAIRLINE}
          wellClass="h-14 lg:h-[3.125vw]"
        >
          <SelectControl
            id={id("language")}
            name="language"
            label="Select language"
            options={consultation.languages}
            className={CONTROL}
            chevronClass="lg:right-[1.667vw]"
          />
        </FieldWell>

        <FieldWell
          error={state.errors?.timeSlot}
          borderClass={HAIRLINE}
          wellClass="h-14 lg:h-[3.125vw]"
          className="sm:col-span-2"
        >
          <SelectControl
            id={id("timeSlot")}
            name="timeSlot"
            label="Select preferred time slot"
            options={consultation.timeSlots}
            className={CONTROL}
            chevronClass="lg:right-[1.667vw]"
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

const HAIRLINE = "border-[0.556px] border-white/25";

const CONTROL = cn(
  "w-full appearance-none bg-transparent px-4 font-sans font-light text-bone outline-none",
  "placeholder:text-bone/90 text-base",
  "h-full lg:px-[0.677vw] lg:text-[clamp(0.875rem,0.938vw,1.125rem)]",
);

function SubmitBar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "mt-6 flex h-14 w-full items-center justify-center border-[0.556px] border-white/40 font-sans text-bone",
        "transition-colors duration-300 ease-(--ease-editorial) hover:bg-bone hover:text-ink",
        "disabled:opacity-60 lg:mt-[2.292vw] lg:h-[3.125vw] lg:text-[clamp(0.875rem,0.938vw,1.125rem)]",
      )}
    >
      {pending ? "Sending…" : "Submit"}
    </button>
  );
}
