"use server";

import { consultation } from "@/content/services";
import { site } from "@/content/site";
import { field, forLog, LIMITS } from "@/lib/forms";

export interface ConsultationFormState {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<
    Record<"name" | "language" | "timeSlot" | "message", string>
  >;
}

/**
 * Handles the "Let's Find Your Perfect Property" request.
 *
 * The artboard draws four fields — name, language, time slot and message — and
 * no email or phone, so a submission carries no way to reply to the sender.
 * That is reproduced here rather than quietly patched; add a contact field to
 * the design and this action before the form goes live.
 *
 * Validation runs on the server so it holds whether or not the client bundle
 * loaded. The delivery step is isolated at the bottom: swap the `console.info`
 * for the CRM call and nothing else about the form changes.
 */
export async function requestConsultation(
  _previous: ConsultationFormState,
  formData: FormData,
): Promise<ConsultationFormState> {
  // Honeypot: a real person never fills a field they cannot see.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Thank you — we will be in touch." };
  }

  const name = field(formData, "name", LIMITS.name);
  const language = field(formData, "language");
  const timeSlot = field(formData, "timeSlot");
  const message = field(formData, "message", LIMITS.message);

  const errors: ConsultationFormState["errors"] = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!consultation.languages.includes(language as never)) {
    errors.language = "Please choose a language.";
  }
  if (!consultation.timeSlots.includes(timeSlot as never)) {
    errors.timeSlot = "Please choose a time slot.";
  }
  if (message.length < 10) {
    errors.message =
      "Tell us a little more so we can help — 10 characters or more.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  // TODO: forward to the CRM / transactional email provider.
  console.info(
    `[consultation] ${forLog(name)} — ${forLog(language)}, ${forLog(timeSlot)}, ${message.length} chars`,
  );

  return {
    status: "success",
    message: `Thank you, ${name}. An advisor will call you in the ${timeSlot.toLowerCase()} window, or reach us directly on ${site.contact.phone}.`,
  };
}
