# Fonts

## Saol Display — required, not included

The design sets every display heading in **Saol Display** (Schick Toikka). It is
a licensed commercial typeface, so the files cannot be committed here or fetched
automatically. Until they are present the site falls back to Playfair Display,
which is self-hosted through `next/font`.

To switch the site onto the real face:

1. Buy the Saol Display webfont licence and export **WOFF2**.
2. Drop the files into this folder with these exact names:

   ```
   public/fonts/saol-display-regular.woff2
   public/fonts/saol-display-medium.woff2   (optional)
   ```

3. Nothing else to change. `@font-face` rules in `src/app/globals.css` already
   point at these paths, and `--font-display` already lists `"Saol Display"`
   ahead of the fallback. A missing file simply fails to load and the fallback
   renders, so the site is never broken by their absence.

4. One follow-up: `src/components/home/StatsPanel.tsx` sets the figures at
   `4.9cqw` rather than the design's `5.5cqw`, because Playfair's cap height is
   ~23% larger than Saol's at the same em. Restore `5.5cqw` once Saol is live.

## Lexend Deca

The secondary face. Self-hosted via `next/font/google` in `src/app/layout.tsx` —
no files needed here.
