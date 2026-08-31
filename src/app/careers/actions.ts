"use server";

import { site } from "@/content/site";
import { field, forLog, LIMITS } from "@/lib/forms";

export interface ApplicationFormState {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level messages keyed by input name. */
  errors?: Partial<
    Record<"name" | "email" | "phone" | "coverLetter" | "resume", string>
  >;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Matches the ceiling in `next.config.ts`; see the note there. */
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

/**
 * Handles a job application.
 *
 * Validation runs on the server so it holds whether or not the client bundle
 * loaded, and the CV is checked by both extension and MIME type — a browser
 * reports `application/octet-stream` for a PDF often enough that either test
 * alone rejects real applicants.
 *
 * **The CV is not stored anywhere.** There is no file backend on this project,
 * so the upload is validated, its metadata logged, and the bytes dropped. Wire
 * the marked step below to object storage (and the notification to the CRM or
 * an ATS) before this page takes real applications — until then an applicant
 * is told their application was received when nothing was kept.
 */
export async function submitApplication(
  _previous: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  // Honeypot: a real person never fills a field they cannot see.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return {
      status: "success",
      message: "Thank you — we have your application.",
    };
  }

  const name = field(formData, "name", LIMITS.name);
  const email = field(formData, "email", LIMITS.email);
  const phone = field(formData, "phone", LIMITS.phone);
  const coverLetter = field(formData, "coverLetter", LIMITS.message);
  const role = field(formData, "role");
  const resume = formData.get("resume");

  const errors: ApplicationFormState["errors"] = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email))
    errors.email = "Please enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 7)
    errors.phone = "Please enter a valid phone number.";

  const file = resume instanceof File && resume.size > 0 ? resume : null;
  if (!file) {
    errors.resume = "Please attach your CV as a PDF.";
  } else if (
    !file.name.toLowerCase().endsWith(".pdf") ||
    (file.type && file.type !== "application/pdf")
  ) {
    errors.resume = "Your CV needs to be a PDF.";
  } else if (file.size > MAX_RESUME_BYTES) {
    errors.resume = "That file is over 5MB. Please attach a smaller PDF.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  // TODO: put `file` in object storage and notify the CRM / ATS. Nothing is
  // persisted until that happens — see the note above.
  console.info(
    `[application] ${forLog(name)} <${forLog(email)}> ${forLog(phone)} — ` +
      `${forLog(role) || "unspecified role"}, ` +
      `CV ${forLog(file?.name ?? "", 80)} (${Math.round((file?.size ?? 0) / 1024)}kB), ` +
      `${coverLetter.length} chars of cover letter`,
  );

  return {
    status: "success",
    message: `Thank you, ${name}. We will read your application and reply within five business days, or reach us directly on ${site.contact.phone}.`,
  };
}
