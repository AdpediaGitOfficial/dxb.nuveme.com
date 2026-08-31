"use server";

import { listForm } from "@/content/list-property";
import { consultation } from "@/content/services";
import { site } from "@/content/site";
import { field, forLog, LIMITS } from "@/lib/forms";

export interface ListPropertyFormState {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<
    Record<
      | "name"
      | "email"
      | "phone"
      | "language"
      | "propertyType"
      | "purpose"
      | "bedrooms"
      | "message",
      string
    >
  >;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Handles the "list your property" enquiry (node 981:1899).
 *
 * Validation runs on the server so it holds whether or not the client bundle
 * loaded. The delivery step is isolated at the bottom: swap the `console.info`
 * for the CRM call and nothing else about the form changes.
 */
export async function submitListing(
  _previous: ListPropertyFormState,
  formData: FormData,
): Promise<ListPropertyFormState> {
  // Honeypot: a real person never fills a field they cannot see.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Thank you — we will be in touch." };
  }

  const name = field(formData, "name", LIMITS.name);
  const email = field(formData, "email", LIMITS.email);
  const phone = field(formData, "phone", LIMITS.phone);
  const language = field(formData, "language");
  const propertyType = field(formData, "propertyType");
  const purpose = field(formData, "purpose");
  const bedrooms = field(formData, "bedrooms");
  const message = field(formData, "message", LIMITS.message);

  const errors: ListPropertyFormState["errors"] = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email))
    errors.email = "Please enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a phone number we can reach you on.";
  }
  if (!listForm.propertyTypes.includes(propertyType as never)) {
    errors.propertyType = "Please choose a property type.";
  }
  if (!listForm.purposes.includes(purpose as never)) {
    errors.purpose = "Please tell us whether you are selling or renting.";
  }
  // Bedrooms and language are optional: a plot or a commercial unit has no
  // bedroom count, and language is a preference rather than a requirement.
  if (bedrooms && !listForm.bedrooms.includes(bedrooms as never)) {
    errors.bedrooms = "Please choose from the list.";
  }
  if (language && !consultation.languages.includes(language as never)) {
    errors.language = "Please choose a language from the list.";
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
    `[listing] ${forLog(name)} <${forLog(email)}> ${forLog(phone)} — ` +
      `${forLog(purpose)} ${forLog(propertyType)} ${forLog(bedrooms) || "n/a"}, ` +
      `${message.length} chars`,
  );

  return {
    status: "success",
    message: `Thank you, ${name}. A NUVÉ consultant will come back with a valuation, or reach us directly on ${site.contact.phone}.`,
  };
}
