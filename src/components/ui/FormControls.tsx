"use client";

import { cn } from "@/lib/utils";

/**
 * The form primitives shared by the enquiry forms.
 *
 * Both artboards draw the same object — a hairline well with the field's name
 * used as placeholder text — at different sizes: the consultation form on the
 * service page is 54 tall on a 40%-white hairline with 16px labels, the contact
 * form 60 tall on a 25%-white hairline with 18px. The measurements stay with
 * each form; what lives here is the behaviour they share.
 *
 * Placeholder text is paired with a visually-hidden `<label>` in every case: a
 * placeholder disappears the moment someone types and is not a name a screen
 * reader can rely on.
 */
export function FieldWell({
  children,
  error,
  borderClass = "border-[0.5px] border-white/40",
  wellClass,
  className,
}: {
  children: React.ReactNode;
  error?: string;
  /**
   * The drawn height of the well. It belongs on the bordered box, not on the
   * control inside it: the artboards measure 54 and 60 including the stroke,
   * so putting the height on the control adds the border on top and throws the
   * field pitch out by a pixel per well.
   */
  wellClass?: string;
  /**
   * The drawn hairline, weight included — the artboards use 0.5px and 0.556px,
   * and the weight is part of the box, so it cannot be defaulted here without
   * throwing the field pitch out by a pixel per well.
   */
  borderClass?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className={cn(
          "relative",
          error ? "border-[0.5px] border-[#ff9b8a]" : borderClass,
          wellClass,
        )}
      >
        {children}
      </div>
      {error && <p className="mt-2 text-xs text-[#ff9b8a]">{error}</p>}
    </div>
  );
}

/**
 * A native `<select>` with the drawn chevron.
 *
 * Native rather than a custom listbox: the design's chevron is the platform
 * one, and the native control is keyboard and screen-reader complete without
 * any of it being rebuilt. The placeholder is the disabled first option, which
 * is what the artboard shows before a choice is made.
 */
export function SelectControl({
  id,
  name,
  label,
  options,
  className,
  chevronClass,
}: {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
  className: string;
  chevronClass?: string;
}) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className={cn(className, "pr-10")}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-ink text-bone">
            {option}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        fill="none"
        className={cn(
          "pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-bone/90",
          chevronClass,
        )}
      >
        <path d="M2 4.5 6 8.5 10 4.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </>
  );
}

/** The live region every enquiry form ends with. Takes no space until it speaks. */
export function FormStatus({
  status,
  message,
}: {
  status: "idle" | "success" | "error";
  message: string;
}) {
  return (
    <p
      aria-live="polite"
      className={cn(
        !message && "sr-only",
        message && "mt-4 text-sm",
        status === "error" && "text-[#ff9b8a]",
        status === "success" && "text-bone",
      )}
    >
      {message}
    </p>
  );
}
