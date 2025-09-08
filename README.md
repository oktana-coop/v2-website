# v2 Website

This is the codebase for the [v2 website](https://v2editor.com/).

Built using [Astro](https://astro.build/).

## Development

These are the basic commands used for development:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

### Pages and Routing

Astro is opinionated in how you add routes, so it's good to familiarize with [file-based routing](https://docs.astro.build/en/guides/routing/) if you want to add a new page.

## Deployment

The website is currently deployed to [GitHub Pages](https://docs.github.com/en/pages) using the relevant GitHub action. Every time you push to the `main` branch, a fresh Netlify deployment is triggered.
