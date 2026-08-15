# Design

Recorded from the built surface, not from intention. The direction contract lives in
`src/app.html` as the first comment in `<body>`.

## World

A broadcast test card. The pasted colour becomes the bar field across the top and every
notation reads off it like an instrument readout. Control-room dark, because an arbitrary
colour reads truest against a near-black surround and that is what both colour tools and
gallery monitors do.

No radii anywhere. No shadows. No gradients except the two flat layers that put a colour
block on a ground. Structure is carried entirely by 1px hairlines and flat plates.

## Tokens

All in `src/app.css` on `:root`. Nothing hardcoded in a component.

| Token          | Value          | Job                                                 |
| -------------- | -------------- | --------------------------------------------------- |
| `--ink-void`   | `#050607`      | page ground, readout rows                           |
| `--ink-plate`  | `#0c0e10`      | header, slate                                       |
| `--ink-raised` | `#14181b`      | row hover                                           |
| `--rule`       | `#232a2f`      | every hairline                                      |
| `--rule-lit`   | `#3d474e`      | control edges, the input underline at rest          |
| `--bone`       | `#e9ebec`      | body text                                           |
| `--bone-dim`   | `#8d959b`      | legends, footer prose                               |
| `--bone-faint` | `#5a6268`      | ground labels, status, idle icons                   |
| `--lamp`       | `#ffb02e`      | no-signal only, nothing else ever                   |
| `--signal`     | set at runtime | the user's colour, or `--bone` when too dark to see |

`--signal` and `--signal-ink` are written onto `documentElement` by `+page.svelte`, so
selection, caret, focus rings and `accent-color` all come from whatever colour is loaded.
`signalOn()` swaps in bone below 3:1 against the ground, so the focus ring never disappears.

Spacing is `--s1` to `--s7` on a 4px base, plus `--gutter` at `clamp(1rem, 4vw, 3.5rem)`.
Motion uses one curve, `--ease-cut`, an exponential ease-out.

## Type

Two faces, both self-hosted through `@fontsource-variable`.

- **Archivo Variable** at `wdth 78` for legends: 0.6875rem, uppercase, `0.16em` tracking. Every
  label on the page uses the `.legend` class.
- **JetBrains Mono Variable** for every colour value, the source input at
  `clamp(1.5rem, 4.5vw, 2.75rem)`, and inline `code`. Values are `tabular-nums` so columns line up.

The source value is the largest thing on the page by a distance. Nothing else competes.

## Components

- **BarField** - nine lightness bars in OKLCH holding the pasted colour in its true position,
  marked with a doubled rule. Below them, three segments showing the colour over black, grey
  and white, which is where alpha becomes visible. Bars are buttons; clicking one loads it.
- **Slate** - the source input on a plate, underlined rather than boxed, with pick, alpha and
  roll to its right and the signal status directly under it.
- **Readout** - a bank of rows, `repeat(auto-fit, minmax(23rem, 1fr))`, hairline borders on
  each row rather than a gap colour, so a short last row just ends. Whole row is the copy
  button.

## State

Never hue alone. Copied shows the word COPIED and a full-height edge bar. No signal changes
the input's underline to `--lamp` and says what to try instead. The `note` line under a label
carries "closest match" and "AARRGGBB".

## Accessibility

Copy results go through an `aria-live` region. The bar field's readings are duplicated as
visually hidden text naming the hex. Contrast on text is always against a near-black plate,
never against the user's colour, so it holds whatever gets pasted. Focus is visible on every
control. Reduced motion turns off the bar re-key.
