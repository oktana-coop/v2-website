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
# GitHub Personal Access Token (for higher API rate limits)
GITHUB_TOKEN=your_github_token_here
```

**Getting a GitHub Token:**

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Generate new token (classic)
3. No special permissions needed for public repo releases
4. Copy the token and add it to your `.env` file

## Deployment

### GitHub Pages (Recommended)

The website is deployed to [GitHub Pages](https://docs.github.com/en/pages) using GitHub Actions.

**Setup:**

1. The workflow in `.github/workflows/deploy.yml` automatically uses GitHub's built-in token
2. Push to `main` branch triggers automatic deployment
