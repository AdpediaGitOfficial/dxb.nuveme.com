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

import { submitEnquiry, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";
import {
  FieldWell,
  FormStatus,
  SelectControl,
} from "@/components/ui/FormControls";
import { consultation } from "@/content/services";
import { cn } from "@/lib/utils";

const INITIAL: ContactFormState = { status: "idle", message: "" };

interface EnquiryDialogProps {
  /** The button's label. */
  label: string;
  /**
   * What the enquiry is about — the page, listing or launch the button sits
   * on. Sent with the message so the reply has context, and used in the
   * dialog's heading.
   */
  subject?: string;
  variant?: "solid" | "bracket";
  className?: string;
}

/**
 * "Enquiry now" — a button that opens the enquiry form in a modal.
 *
 * This is the one place the site opens a dialog, and it is a deliberate
 * exception to §9: a form that has to appear over the page it was launched
 * from cannot be a link, a GET form or a `<details>`.
 *
 * It is a native `<dialog>` driven by `showModal()`, so the focus trap, the
 * Escape key, the inert background and the backdrop are the browser's rather
 * than ours — the same reasoning as the menu's trap, except here the platform
 * already does it. The trigger is the only thing that ships before the dialog
 * is opened; the form posts to the same server action as the contact page, so
 * validation and delivery have one implementation.
 *
 * Fields follow the contact artboard's set minus the time slot, on the panel
 * ground: 0.5px 40%-white hairlines over the dialog's ink.
 */
export function EnquiryDialog({
  label,
  subject,
  variant = "bracket",
  className,
}: EnquiryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  /**
   * Bumped on every open so the form remounts and `useActionState` starts
   * clean. Unmounting on close is not enough on its own — React keeps the
   * action state alive long enough for a previous "thank you" to greet the
   * next person who opens the dialog.
   */
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
      <Button
        ref={triggerRef}
        type="button"
        onClick={show}
        variant={variant}
        size="md"
        casing="sentence"
        className={className}
        aria-haspopup="dialog"
      >
        {label}
      </Button>

      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        // Clicking the backdrop closes: the click lands on the dialog itself
        // rather than on any of its children.
        onClick={(event) => {
          if (event.target === dialogRef.current) dismiss();
        }}
        className={cn(
          "m-auto w-[min(92vw,44rem)] bg-ink p-0 text-bone",
          "backdrop:bg-black/70 backdrop:backdrop-blur-[6px]",
          "open:animate-none",
        )}
      >
        <div className="relative p-7 sm:p-10 lg:p-[2.604vw]">
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
            Share your details to connect with our specialist
          </h2>

          {subject && (
            <p className="prose-body mt-3 lg:mt-[0.833vw]">About {subject}</p>
          )}

          {open && <EnquiryForm key={session} subject={subject} />}
        </div>
      </dialog>
    </>
  );
}

/**
 * Mounted only while the dialog is open so each opening starts clean — a
 * stale success message from a previous submission would otherwise greet the
 * next person to open it.
 */
function EnquiryForm({ subject }: { subject?: string }) {
  const [state, action] = useActionState(submitEnquiry, INITIAL);
  const uid = useId();
  const id = (name: string) => `enquiry-${name}-${uid}`;

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

      {subject && <input type="hidden" name="subject" value={subject} />}

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
        />

        <FieldWell error={state.errors?.language} wellClass={WELL}>
          <SelectControl
            id={id("language")}
            name="language"
            label="Select language"
            options={consultation.languages}
            className={CONTROL}
          />
        </FieldWell>

        <FieldWell
          error={state.errors?.message}
          wellClass="h-32 lg:h-[6.771vw]"
          className="sm:col-span-2"
        >
          <label htmlFor={id("message")} className="sr-only">
            Message
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={4}
            placeholder="Message"
            className={cn(CONTROL, "resize-none py-3 lg:pt-[0.833vw]")}
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
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <FieldWell error={error} wellClass={WELL}>
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
      {pending ? "Sending…" : "Submit"}
    </button>
  );
}
