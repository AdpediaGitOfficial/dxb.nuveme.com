type ClassValue = string | number | null | undefined | false;

/** Minimal class-name joiner — avoids a dependency for what is one line. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
