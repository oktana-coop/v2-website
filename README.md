# v2 Website

The codebase for the [v2 website](https://v2editor.com/), built with [Astro](https://astro.build/).

## Development

### Recommended tooling/practices

- Package manager: npm
- Node (version listed on `.nvmrc`)
- Commit style: [Conventional commits](https://www.conventionalcommits.org/)

### Install

```sh
npm install
```

### Run

```sh
npm run dev
```

The site runs at `http://localhost:4321`. To see the download button for another platform, add `?os=linux`, `?os=windows` or `?os=macos` to the URL.

### Testing

End-to-end tests use [Playwright](https://playwright.dev/), running against the production build. Download Playwright's Chromium once:

```sh
npx playwright install chromium
```

Run the tests:

```sh
npm run test:e2e
```

Open the Playwright UI (test timeline, action logs, screenshots):

```sh
npm run test:e2e:ui
```

Test files live in `e2e/`. Results (HTML report, failure screenshots, traces) are written to `e2e-results/`.

### Build

```sh
npm run build
```

This builds the site under the `dist` directory.

## Deployment

The website is deployed to [Netlify](https://www.netlify.com/), using the [`@astrojs/netlify`](https://docs.astro.build/en/guides/integrations-guide/netlify/) adapter.
