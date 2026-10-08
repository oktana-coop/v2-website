import { expect, test as base } from '@playwright/test';

import { downloads, VERSION_PLACEHOLDER } from '../../src/lib/downloads';

const LATEST_RELEASE_URL =
  'https://api.github.com/repos/oktana-coop/v2/releases/latest';

export const FAKE_RELEASE_VERSION = '9.9.9';

export const fakeAssetUrl = (file: string) =>
  `https://github.com/oktana-coop/v2/releases/download/v${FAKE_RELEASE_VERSION}/${file}`;

const fakeRelease = {
  tag_name: `v${FAKE_RELEASE_VERSION}`,
  assets: downloads
    .flatMap((platform) => platform.assets)
    .map((asset) => {
      const name = asset.file.replaceAll(
        VERSION_PLACEHOLDER,
        FAKE_RELEASE_VERSION
      );
      return { name, browser_download_url: fakeAssetUrl(name) };
    }),
};

type Fixtures = {
  releaseApiFails: boolean;
};

export const test = base.extend<Fixtures>({
  releaseApiFails: [false, { option: true }],

  // Answers the GitHub releases API with a fake release, so that tests don't
  // depend on GitHub or its rate limits
  page: async ({ page, releaseApiFails }, use) => {
    await page.route(LATEST_RELEASE_URL, (route) =>
      releaseApiFails
        ? route.fulfill({ status: 503 })
        : route.fulfill({ json: fakeRelease })
    );
    await use(page);
  },
});

export { expect };
