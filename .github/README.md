<h1 align="center">Color Code Convertor 🎨</h1>
<p align="center">
<i>Paste a color in any format, get all seventeen others</i>
<br />
<b>🌐 <a href="https://color-code-convertor.peng.li/">color-code-convertor.peng.li</a></b><br />
</p>

## About

Every other converter makes you pick what you're converting from and what you want out. This one doesn't. Paste whatever you've got, and it shows you the lot - hex, rgb, hsl, hsb, hwb, cmyk, lab, lch, oklab, oklch, display-p3, the CSS name, decimal, Android, Flutter and Swift. Click a row to copy it.

It's all client side, so there's no account, no network call and nothing logged. Works offline once it's loaded.

---

## Usage

Paste into the box, or hit the picker, or press <kbd>Ctrl</kbd>+<kbd>V</kbd> anywhere on the page. It'll take a bare `ff0000` without the hash, a whole CSS declaration with the semicolon still attached, a Flutter `Color(0xFFFF0000)` literal, or just `255, 0, 0`.

The band across the top is whatever you've currently got, over a checkerboard so you can see the alpha doing its thing. Under it, the same color at nine lightness steps - click one to load it - then a strip showing it over black, grey and white.

Two rules that are worth knowing, beacuse there's no way to have both:

- Bare hex digits beat decimal, so `16711680` is the one plain number read as a number rather than as `#16711680`
- `#` plus eight digits is CSS `RRGGBBAA`, `0x` plus eight is ARGB, the way Flutter and Android write it

**Note**: CMYK here is the naive conversion, same as every other web tool. Fine for screen work, don't send it to a printer and expect it to match. The CSS name says "closest match" when it isn't exact.

The URL carries the color, so `.../#ff8800` opens on that one.

---

## Deployment

### Option 1: Vercel

Fork the repo, login to Vercel, and import it. Or just use the 1-click deploy button below 👇

[![1-Click Deploy to Vercel](https://img.shields.io/badge/Deploy-Vercel-ffffff?style=for-the-badge&logo=vercel&labelColor=1b2744&link=https%3A%2F%2Fcolor-code-convertor.peng.li)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNotAFlightRisk%2Fcolor-code-convertor&demo-title=Color%20Code%20Convertor&demo-url=https%3A%2F%2Fcolor-code-convertor.peng.li)

### Option 2: Docker

There's a light-weight multi-arch image on DockerHub ([`notaflightrisk/color-code-convertor`](https://hub.docker.com/r/notaflightrisk/color-code-convertor)) and GHCR ([`ghcr.io/notaflightrisk/color-code-convertor`](https://github.com/NotAFlightRisk/color-code-convertor/pkgs/container/color-code-convertor)). Providing you've got Docker installed, just run:

```shell
docker run -p 8080:8080 notaflightrisk/color-code-convertor
```

It's nginx serving static files as a non-root user, so it's about 60MB and there's nothing to configure.

[![Deploy from Docker](https://img.shields.io/badge/Deploy-Docker-2496ED?style=for-the-badge&logo=docker&labelColor=1b2744&link=https%3A%2F%2Fhub.docker.com%2Fr%2Fnotaflightrisk%2Fcolor-code-convertor)](https://hub.docker.com/r/notaflightrisk/color-code-convertor)

### Option 3: From a release

Grab `site.zip` off the [latest release](https://github.com/NotAFlightRisk/color-code-convertor/releases/latest), unzip it, and point any static host at the folder. Netlify, Cloudflare Pages, S3, the `public_html` on some shared box you've had since 2011 - it's all just files.

### Option 4: Build from source

Follow the [Development](#development) steps, then run `npm run build`.<br>
That puts the whole site in `build/`. No server needed, serve it however you like.

---

## Development

You'll need [Node](https://nodejs.org/) 20 or newer, plus [Git](https://git-scm.com/). It's a [SvelteKit](https://svelte.dev/docs/kit) app, so there's nothing else to install.

```bash
git clone git@github.com:NotAFlightRisk/color-code-convertor.git
cd color-code-convertor
npm install
npm run dev
```

The dev server is then on [localhost:5173](http://localhost:5173).<br>
The other scripts you'll want are `npm run check` (types), `npm test` (tests) and `npm run preview` (serve a production build locally).

All the color maths lives in `src/lib/color/`, and it's plain TypeScript with no Svelte in it. `parse.ts` turns whatever was pasted into a color, `formats.ts` turns a color into the seventeen strings. [culori](https://culorijs.org/) does the heavy conversions, except CMYK which it doesn't do, so that one's by hand.

Alternativley, build the container with `docker build -t color-code-convertor .`

[![Open in VS Code](https://img.shields.io/badge/CodeSpaces-Try_Live-007ACC?style=for-the-badge&logo=vscodium&labelColor=1b2744&link=https%3A%2F%2Fgithub.com%2FNotAFlightRisk%2Fcolor-code-convertor)](https://codespaces.new/NotAFlightRisk/color-code-convertor)

---

## Credits

##### Contributors

[![contributors badge](https://readme-contribs.as93.net/contributors/NotAFlightRisk/color-code-convertor?shape=squircle)](https://github.com/NotAFlightRisk/color-code-convertor/graphs/contributors)

---

<!-- License + Copyright -->
<p  align="center">
  <a href="https://github.com/NotAFlightRisk"><img width="64" src="https://pixelflare.cc/iain/gif/penguin-dance.gif" /></a><br>
  <sup>
    <i>Licensed under <a href="../LICENSE">MIT</a>, © <a href="https://peng.li">NotAFlightRisk</a> 2026</i>
  </sup>
</p>

<!--
oooh, hello there! hope you're having a nice day :)
   |\__      |\___
 (:> __)X  (:o ___(
   |/        |/
-->
