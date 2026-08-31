/**
 * Emits a `application/ld+json` block.
 *
 * `<` is escaped so a value containing `</script>` cannot terminate the tag
 * early — content comes from a CMS in production, so this is not optional.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
