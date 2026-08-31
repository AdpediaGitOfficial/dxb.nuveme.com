"use client";

import {
  useActionState,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import {
  submitApplication,
  type ApplicationFormState,
} from "@/app/careers/actions";
import { FieldWell, FormStatus } from "@/components/ui/FormControls";
import { cn } from "@/lib/utils";

const INITIAL: ApplicationFormState = { status: "idle", message: "" };

/**
 * "Apply now" — the application form in a modal.
 *
 * The second dialog on the site, and it follows `EnquiryDialog` exactly: a
 * native `<dialog>` driven by `showModal()`, so the focus trap, the inert
 * background and the backdrop are the platform's. The two caveats that
 * component documents apply here too and are handled the same way — Escape is
 * closed explicitly because an injected key is not always treated as a close
 * request, and focus is put back on the trigger by hand because the platform
 * only does that for its own close paths.
 *
 * No modal is drawn for this on the careers artboard; the chrome is the
 * contact form's (§9) so an applicant meets the same fields they would
 * anywhere else on the site.
 */
export function ApplyDialog({
  role,
  roleTitle,
  className,
}: {
  /** Slug, sent with the application so the reply has context. */
  role: string;
  roleTitle: string;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  /** Bumped on every open so the form remounts and starts clean. */
  const [session, setSession] = useState(0);
  const headingId = useId();

  /**
   * Every close path goes through here.
   *
   * The `close` event alone is not enough to hang this on: it is the only
   * signal the platform gives for its own close paths, but engines do not all
   * dispatch it reliably (the preview browser this was built against never
   * does), and when it is missing React's `open` state never resets and focus
   * is left on a control inside a hidden dialog. Doing the work explicitly on
   * the paths we own — and keeping the listener below purely as a backstop for
   * the ones we do not — makes the behaviour the same everywhere. Every step
   * is idempotent, so running both costs nothing.
   */
  const dismiss = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Backstop for close paths we do not own — a `method="dialog"` submit, or
    // an engine that handles Escape itself before our handler sees it.
    const onClose = () => dismiss();

    // A modal `<dialog>` closes itself on Escape, but only when the browser
    // treats the key as a close request, which it does not always do when the
    // key is injected rather than typed.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dialog.open) dismiss();
    };

    dialog.addEventListener("close", onClose);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      dialog.removeEventListener("close", onClose);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dismiss]);

  const show = () => {
    setSession((value) => value + 1);
    setOpen(true);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        className={cn(
          "inline-flex h-14 items-center justify-center bg-bone px-8 font-sans font-light text-ink",
          "transition-colors duration-300 ease-(--ease-editorial) hover:bg-bone-strong",
          "lg:h-[3.698vw] lg:w-[15.78vw] lg:px-0 lg:text-[clamp(0.875rem,1.042vw,1.25rem)]",
          className,
        )}
      >
        Apply now
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        onClick={(event) => {
          if (event.target === dialogRef.current) dismiss();
        }}
        className={cn(
          "m-auto w-[min(92vw,44rem)] bg-ink p-0 text-bone",
          "backdrop:bg-black/70 backdrop:backdrop-blur-[6px]",
          "open:animate-none",
        )}
      >
        <div className="relative max-h-[88svh] overflow-y-auto p-7 sm:p-10 lg:p-[2.604vw]">
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center text-bone/70 transition-colors hover:text-bone lg:right-[1.302vw] lg:top-[1.302vw]"
          >
            <span className="sr-only">Close</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
            </svg>
          </button>

          <h2
            id={headingId}
            className="display-3 text-balance-title max-w-[22ch] pr-12"
          >
            Apply for {roleTitle}
          </h2>

          {open && <ApplyForm key={session} role={role} />}
        </div>
      </dialog>
    </>
  );
}

/** Mounted only while the dialog is open so each opening starts clean. */
function ApplyForm({ role }: { role: string }) {
  const [state, action] = useActionState(submitApplication, INITIAL);
  const uid = useId();
  const id = (name: string) => `apply-${name}-${uid}`;

  return (
    <form action={action} noValidate className="mt-7 lg:mt-[1.823vw]">
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

      <input type="hidden" name="role" value={role} />

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-[1.042vw]">
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
          className="sm:col-span-2"
        />

        <FieldWell
          error={state.errors?.coverLetter}
          wellClass="h-32 lg:h-[6.771vw]"
          className="sm:col-span-2"
        >
          <label htmlFor={id("coverLetter")} className="sr-only">
            Cover letter
          </label>
          <textarea
            id={id("coverLetter")}
            name="coverLetter"
            rows={4}
            placeholder="Cover letter (optional)"
            className={cn(CONTROL, "resize-none py-3 lg:pt-[0.833vw]")}
          />
        </FieldWell>
      </div>

      {/*
        The file input keeps its native button — a label styled to look like
        one and a visually-hidden input is the usual trick, but it drops the
        "no file chosen" state that tells someone the attachment actually
        took. The `file:` pseudo-element carries the design system's solid
        primary instead, so the control reads as ours without being rebuilt.
      */}
      <div className="mt-4 lg:mt-[1.042vw]">
        <label
          htmlFor={id("resume")}
          className="font-sans text-sm text-bone lg:text-[clamp(0.8125rem,0.833vw,1rem)]"
        >
          CV <span className="text-bone/60">(PDF, up to 5MB)</span>
        </label>
        <FieldWell
          error={state.errors?.resume}
          wellClass="mt-2 h-13 lg:mt-[0.521vw] lg:h-[2.813vw]"
        >
          <input
            id={id("resume")}
            name="resume"
            type="file"
            accept="application/pdf,.pdf"
            className={cn(
              "h-full w-full cursor-pointer px-4 font-sans text-bone lg:px-[0.833vw]",
              "text-sm file:mr-4 file:h-full file:cursor-pointer file:border-0",
              "file:bg-bone file:px-4 file:font-sans file:font-light file:text-ink",
              "file:transition-colors hover:file:bg-bone-strong",
              "lg:text-[clamp(0.8125rem,0.833vw,1rem)] lg:file:px-[0.833vw]",
            )}
          />
        </FieldWell>
      </div>

      <FormStatus status={state.status} message={state.message} />

      {state.status !== "success" && <SubmitBar />}
    </form>
  );
}

const WELL = "h-13 lg:h-[2.813vw]";

const CONTROL = cn(
  "w-full appearance-none bg-transparent px-4 font-sans font-light text-bone outline-none",
  "placeholder:text-bone/90 text-base",
  "h-full lg:px-[0.833vw] lg:text-[clamp(0.8125rem,0.833vw,1rem)]",
);

function Text({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
  className,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  className?: string;
}) {
  return (
    <FieldWell error={error} wellClass={WELL} className={className}>
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
        "mt-6 flex h-13 w-full items-center justify-center border-[0.5px] border-white/40 font-sans text-bone",
        "transition-colors duration-300 ease-(--ease-editorial) hover:bg-bone hover:text-ink",
        "disabled:opacity-60 lg:mt-[1.563vw] lg:h-[2.813vw] lg:text-[clamp(0.875rem,0.938vw,1.125rem)]",
      )}
    >
      {pending ? "Sending…" : "Submit application"}
    </button>
  );
}
