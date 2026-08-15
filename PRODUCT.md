# Product

<!-- impeccable:product-schema 1 -->

Every fact below is inferred from the one-line brief. This run was unattended, so the init
interview could not happen; anything marked (inferred) is an assumption to confirm.

## Platform

web

## Stack

SvelteKit 2 / Svelte 5, TypeScript, `adapter-static` (fully prerendered). Set by the house
rules in `internal/CLAUDE.md`, not by a stack interview. Colour maths uses culori.

## Users

Developers and designers mid-task, at a desk, on a second monitor (inferred). They have a
colour in one notation and need it in another because the tool in front of them wants a
different one: CSS wants `oklch()`, Figma shows HSB, Xcode wants floats, Android wants
`#AARRGGBB`, the printer wants CMYK. They arrive from a search, need the answer in seconds,
and leave. Some arrive on a phone (inferred).

## Product Purpose

Paste a colour in any notation, see it in every other notation at once, copy the one you
came for in a single click. Success is the whole job finished in one paste and one click,
with no format picker to set first.

## Positioning

Most converters ask which format you are converting from and to. This one reads whatever you
paste, guesses nothing, and shows all seventeen at once, so there is no wrong way to start
and nothing to configure.

## Operating Context

Used alongside a code editor, a design tool and a browser devtools panel. Input arrives by
paste, often still wearing its source syntax: a CSS declaration with the property and
semicolon attached, a quoted string, a Flutter `Color(0x…)` literal. Output leaves by
clipboard, straight into one of those tools.

## Capabilities and Constraints

- Reads: hex (3/4/6/8 digits, with or without `#`), rgb/rgba, hsl/hsla, hsb/hsv, hwb, cmyk,
  lab, lch, oklab, oklch, `color(display-p3 …)`, CSS colour names, decimal, `0xAARRGGBB`,
  Flutter and Swift literals, bare channel lists, and CSS declarations pasted whole.
- Writes all seventeen of those, alpha carried through where the syntax has somewhere to put
  it.
- Two documented ambiguities: bare hex digits beat decimal, so `16711680` is the one decimal
  that reads as a number; and `#` + 8 digits is CSS `RRGGBBAA` while `0x` + 8 digits is ARGB.
- Entirely client-side. No account, no network call, no analytics, no server.
- CMYK is the naive conversion every web tool uses. It is not colour-managed and must never
  be presented as print-accurate.
- Nearest CSS name is CIEDE2000 and is labelled as approximate whenever it is not exact.

## Brand Commitments

Name is `html-color-code-convertor`, Dino's spelling. Ships under NotAFlightRisk at
`html-color-code-convertor.peng.li`.

## Evidence on Hand

None. No users, no testimonials, no benchmarks, no press. Nothing of that kind may be
invented for any surface.

## Product Principles

- One paste is the whole input. Never make someone name the format they are holding.
- Everything at once beats a chosen pair. The value is in not having to decide.
- Copying is the finishing move and must never take more than one click.
- Say where the maths is approximate rather than implying a precision we do not have.
- It works offline and stays fast, because it is only ever needed for eight seconds.

## Accessibility & Inclusion

A colour tool cannot use colour as the only channel. Every swatch is labelled, state changes
are announced, and the whole surface works from the keyboard. Contrast on text must hold no
matter which colour the user pasted.
