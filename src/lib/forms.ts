/**
 * Shared hardening for the server actions behind the site's forms.
 *
 * Every form posts to a server action, and a server action accepts whatever is
 * sent to it — the browser's `maxlength` is a hint to a person, not a control.
 * Two things follow, and both are handled here rather than remembered at each
 * of the four call sites.
 */

/**
 * Caps a free-text field.
 *
 * Without this a single field can carry the whole request-body allowance
 * (`serverActions.bodySizeLimit`, raised to 5MB in `next.config.ts` so a CV
 * fits), which then has to be validated, interpolated into a reply and
 * logged. These limits are generous next to the drawn fields, and they mean
 * the body limit is never the only thing between a form and the process.
 */
export const LIMITS = {
  name: 120,
  email: 254, // RFC 5321 maximum
  phone: 32,
  short: 120, // language, time slot, property type, purpose, bedrooms
  message: 5000,
} as const;

/** Reads a form field, trimmed and capped. */
export function field(
  formData: FormData,
  key: string,
  max: number = LIMITS.short,
): string {
  return String(formData.get(key) ?? "")
    .trim()
    .slice(0, max);
}

/**
 * Makes a value safe to write to a log line.
 *
 * Anything a person typed reaches `console.info` as part of a single-line
 * record. A newline in a name is enough to forge a second entry — a log reader
 * or an aggregator cannot tell the difference — so control characters are
 * replaced rather than escaped, and the result is capped so one field cannot
 * flood the log. The CV's *filename* goes through here too: it is chosen by
 * the person uploading it and is no more trustworthy than the form fields.
 */
export function forLog(value: string, max = 120): string {
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, max);
}
