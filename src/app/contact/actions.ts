"use server";

import { consultation } from "@/content/services";
import { site } from "@/content/site";
import { field, forLog, LIMITS } from "@/lib/forms";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level messages keyed by input name. */
  errors?: Partial<
    Record<
      "name" | "email" | "phone" | "language" | "timeSlot" | "message",
      string
    >
  >;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Handles the contact form.
 *
 * Validation runs on the server so it holds whether or not the client bundle
 * loaded. The delivery step is deliberately isolated at the bottom: swap the
 * `console.info` for the CRM or transactional-email call and nothing else
 * about the form changes.
 */
export async function submitEnquiry(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: a real person never fills a field they cannot see.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Thank you — we will be in touch." };
  }

  const name = field(formData, "name", LIMITS.name);
  const email = field(formData, "email", LIMITS.email);
  const phone = field(formData, "phone", LIMITS.phone);
  const language = field(formData, "language");
  const timeSlot = field(formData, "timeSlot");
  const message = field(formData, "message", LIMITS.message);
  // Set by `EnquiryDialog` — the listing or page the enquiry was opened from.
  const subject = field(formData, "subject");

  const errors: ContactFormState["errors"] = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email))
    errors.email = "Please enter a valid email address.";
  if (phone.length > 0 && phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }
  // Language and time slot are drawn on the contact artboard but are a
  // preference, not a requirement: an enquiry is still answerable without them.
  if (language && !consultation.languages.includes(language as never)) {
    errors.language = "Please choose a language from the list.";
  }
  if (timeSlot && !consultation.timeSlots.includes(timeSlot as never)) {
    errors.timeSlot = "Please choose a time slot from the list.";
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
    `[enquiry] ${forLog(name)} <${forLog(email)}> ${forLog(phone)} — ` +
      `${forLog(subject) || "general"}, ${forLog(language) || "no language"}, ` +
      `${forLog(timeSlot) || "no slot"}, ${message.length} chars`,
  );

  return {
    status: "success",
    message: `Thank you, ${name}. An advisor will reply within one business day, or reach us directly on ${site.contact.phone}.`,
  };
}
