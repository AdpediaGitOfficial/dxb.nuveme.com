"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";

import {
  requestConsultation,
  type ConsultationFormState,
} from "@/app/services/actions";
import {
  FieldWell,
  FormStatus,
  SelectControl,
} from "@/components/ui/FormControls";
import { consultation } from "@/content/services";
import { cn } from "@/lib/utils";

const INITIAL: ConsultationFormState = { status: "idle", message: "" };

/**
 * The four fields drawn on the artboard: three 529 × 54 wells on a 0.5px
 * 40%-white hairline, a 182-tall message box, and a solid black submit bar.
 *
 * The artboard labels each field with placeholder text only. That is kept
 * visually and paired with a visually-hidden `<label>`, because a placeholder
 * disappears the moment someone types and is not a name a screen reader can
 * rely on.
 *
 * Both selects are native `<select>` elements — the drawn chevron is the
 * platform one, and a native control is keyboard and screen-reader complete
 * without any of it being rebuilt.
 */
export function ConsultationForm() {
  const [state, action] = useActionState(requestConsultation, INITIAL);
  const uid = useId();
  const fieldId = (name: string) => `consultation-${name}-${uid}`;

  return (
    <form action={action} noValidate>
      {/* Honeypot — hidden from people, visible to naive bots. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={fieldId("company")}>Company</label>
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* The wells sit on an 89 pitch: 54 tall on a 35 gap. */}
      <div className="space-y-5 lg:space-y-[1.823vw]">
        <FieldWell error={state.errors?.name} wellClass="h-14 lg:h-[2.813vw]">
          <label htmlFor={fieldId("name")} className="sr-only">
            Full name
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            className={CONTROL}
          />
        </FieldWell>

        <FieldWell
          error={state.errors?.language}
          wellClass="h-14 lg:h-[2.813vw]"
        >
          <SelectControl
            id={fieldId("language")}
            name="language"
            label="Select language"
            options={consultation.languages}
            className={CONTROL}
            chevronClass="lg:right-[1.094vw]"
          />
        </FieldWell>

        <FieldWell
          error={state.errors?.timeSlot}
          wellClass="h-14 lg:h-[2.813vw]"
        >
          <SelectControl
            id={fieldId("timeSlot")}
            name="timeSlot"
            label="Select preferred time slot"
            options={consultation.timeSlots}
            className={CONTROL}
            chevronClass="lg:right-[1.094vw]"
          />
        </FieldWell>

        <FieldWell
          error={state.errors?.message}
          wellClass="h-40 lg:h-[9.479vw]"
        >
          <label htmlFor={fieldId("message")} className="sr-only">
            Message
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={5}
            placeholder="Message"
            className={cn(
              CONTROL,
              "h-40 resize-none py-4 lg:h-[9.479vw] lg:pt-[1.094vw]",
            )}
          />
        </FieldWell>
      </div>

      <FormStatus status={state.status} message={state.message} />

      <SubmitBar />
    </form>
  );
}

const CONTROL = cn(
  "w-full appearance-none bg-transparent px-4 font-sans font-light text-bone outline-none",
  "placeholder:text-bone/90 text-base",
  "h-full lg:px-[0.833vw] lg:text-[clamp(0.8125rem,0.833vw,1rem)]",
);

function SubmitBar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "mt-6 flex h-14 w-full items-center justify-center bg-ink font-sans text-bone",
        "transition-colors duration-300 ease-(--ease-editorial) hover:bg-surface",
        // 119 is the drawn gap above the bar; 89 is that gap less the 30 the
        // Playfair heading and Lexend body add above it, which puts the bar
        // back on its measured 38 from the panel floor. Revert with §10.5.
        "disabled:opacity-60 lg:mt-[4.635vw] lg:h-[2.813vw] lg:text-[clamp(0.875rem,0.938vw,1.125rem)]",
      )}
    >
      {pending ? "Sending…" : "Submit"}
    </button>
  );
}
