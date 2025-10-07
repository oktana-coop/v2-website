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

### Environment Variables

For local development, create a `.env` file in the root directory:

```bash
# GitHub Personal Access Token (optional, for higher API rate limits)
GITHUB_TOKEN=your_github_token_here
```

**Getting a GitHub Token:**

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Generate new token (classic)
3. No special permissions needed for public repo releases
4. Copy the token and add it to your `.env` file

**Rate Limits:**

- Without token: 60 requests/hour
- With token: 5,000 requests/hour

### Pages and Routing

Astro is opinionated in how you add routes, so it's good to familiarize with [file-based routing](https://docs.astro.build/en/guides/routing/) if you want to add a new page.

## Deployment

### GitHub Pages (Recommended)

The website is deployed to [GitHub Pages](https://docs.github.com/en/pages) using GitHub Actions.

**Setup:**

1. ✅ **No additional setup required!** The workflow in `.github/workflows/deploy.yml` automatically uses GitHub's built-in token
2. Push to `main` branch triggers automatic deployment
3. The workflow automatically gets 5,000 API requests/hour (no rate limiting issues)

### Other Hosting Platforms

For other platforms, you'll need to set up a personal access token:

**Netlify:**

1. Go to Site settings → Environment variables
2. Add `GITHUB_TOKEN` with your personal access token value

**Vercel:**

1. Go to Project settings → Environment Variables
2. Add `GITHUB_TOKEN` with your personal access token value

**Note:** GitHub Actions automatically provides a `GITHUB_TOKEN` with sufficient permissions, so no manual token setup is needed for GitHub Pages deployment.
