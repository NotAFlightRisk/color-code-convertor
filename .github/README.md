<h1 align="center">Color Code Convertor 🎨</h1>
<p align="center">
<i>Paste a color in any format, get all seventeen others</i>
<br />
<b>🌐 <a href="https://color-code-convertor.peng.li/">color-code-convertor.peng.li</a></b><br />
</p>

## About

A super quick app to convert between color code format representations.

<p align="center">
  <a href="https://color-code-convertor.peng.li/">
    <img src="https://pixelflare.cc/iain/screenshots/color-code-convertor" width="700" />
  </a>
</p>

---

## Deployment

### Option 1: Quick deploy

Fork the repo, login to any static hosting provider, and import it. Or just use the 1-click deploy button below 👇

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNotAFlightRisk%2Fcolor-code-convertor)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=NotAFlightRisk/color-code-convertor)   

### Option 2: Docker

There's a light-weight multi-arch image on [DockerHub](https://hub.docker.com/r/notaflightrisk/color-code-convertor) and GHCR ([`ghcr.io/notaflightrisk/color-code-convertor`](https://github.com/NotAFlightRisk/color-code-convertor/pkgs/container/color-code-convertor)).
Providing you've got Docker installed, just run:

```shell
docker run -p 8080:8080 notaflightrisk/color-code-convertor
```

### Option 3: From a release

Grab `site.zip` off the [latest release](https://github.com/NotAFlightRisk/color-code-convertor/releases/latest), unzip it, and point any static host at the folder.

### Option 4: Build from source

Follow the [Development](#development) steps, then run `npm run build`, and then serve up the `build/` directory.

---

## Development

You'll need [Node](https://nodejs.org/) 22 or newer, plus [Git](https://git-scm.com/). The app is built with [SvelteKit](https://svelte.dev/docs/kit) app.

```bash
git clone git@github.com:NotAFlightRisk/color-code-convertor.git
cd color-code-convertor
npm install
npm run dev
```

The dev server is then on [localhost:5173](http://localhost:5173).<br>
Before committing, you should also run: `npm run check` (types), `npm test` (tests) and `npm run preview` (serve a production build locally).

You can also build the container with `docker build -t color-code-convertor .`

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=1335365165)   

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
