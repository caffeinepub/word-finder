# Word Finder

## Current State
A functional Word Finder app with a CRT/hacker terminal aesthetic: black background, green phosphor colors, scanline overlays, ASCII art boot sequence, monospace fonts throughout. All logic is in App.tsx as vanilla JS DOM manipulation (no React state), with the word-checking engine, permutation generator, results vault, progress tracking, and stop/reset controls fully working.

## Requested Changes (Diff)

### Add
- New visual design direction: a clean, modern "typographic editorial" aesthetic - white/cream background, warm ink tones, serif display font for title, clean sans for UI. Think premium word game meets literary magazine.
- Soft ambient glow on active elements using warm amber/ink palette instead of neon green.
- Smooth entrance animations on results cards using CSS transitions.
- Results displayed as elegant word cards with clear typography hierarchy.

### Modify
- Completely replace the color system (black+green CRT → cream/warm white + deep ink + amber accent)
- Remove CRT overlay, scanline, and boot sequence (replace with a clean, instant load with subtle fade-in)
- Restyle all UI sections: input, controls, progress, flash, stats, and vault using the new palette and typography
- Replace monospace-only aesthetic with mixed typography: serif or display font for headings/found words, clean sans for labels and UI chrome
- Redesign buttons to be clean filled/outlined style, not terminal brackets
- Redesign the stats bar, progress bar, and vault section with the new visual language
- Simplify the subtitle and labels to feel editorial rather than technical jargon

### Remove
- CRT overlay (#crt-overlay)
- Scanline animation (#scanline)
- Boot sequence / ASCII art (remove from JSX and initApp logic)
- All green neon/phosphor glow effects
- All terminal bracket-style button text like "[ INITIATE SCAN ]"

## Implementation Plan
1. Redesign index.css:
   - New CSS variables: cream/warm white background (#FAF8F4), deep ink (#1A1410), warm amber accent (#C4862A), muted mid-tone for labels
   - Typography: use Fraunces (available in /public/assets/fonts/) for display/headings, Figtree or DMSans for UI text
   - Clean button styles, card-style vault entries, clean progress bar
   - Smooth transitions and subtle entrance animations
2. Update App.tsx:
   - Remove #crt-overlay and #scanline from JSX
   - Remove the entire boot sequence (typeAscii/typeLine/boot screen)
   - Remove #bootup section from JSX
   - Clean up button text ("Search" not "[ INITIATE SCAN ]", "Stop" not "[ STOP SCAN ]", "New Search" not "[ NEW SCAN ]")
   - Remove boot logic from initApp, start directly with the main UI visible
   - Keep all word-finding logic intact (permutations, API calls, vault management, stats, copy)
