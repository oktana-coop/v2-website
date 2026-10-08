import { VERSION_PLACEHOLDER } from '../lib/downloads';

const LATEST_RELEASE_URL =
  'https://api.github.com/repos/oktana-coop/v2/releases/latest';

export interface LatestRelease {
  version: string;
  assetUrls: Record<string, string>;
}

let latestRelease: Promise<LatestRelease | null> | undefined;

export function getLatestRelease(): Promise<LatestRelease | null> {
  latestRelease ??= fetch(LATEST_RELEASE_URL)
    .then(async (response) => {
      if (!response.ok) {
        console.warn('Could not fetch latest version, using fallback');
        return null;
      }

      const data = await response.json();
      const assetUrls: Record<string, string> = {};
      data.assets.forEach(
        (asset: { name: string; browser_download_url: string }) => {
          assetUrls[asset.name] = asset.browser_download_url;
        }
      );

      return { version: data.tag_name.replace(/^v/, ''), assetUrls };
    })
    .catch((error) => {
      console.warn('Failed to fetch latest release:', error);
      return null;
    });

  return latestRelease;
}

// Points every `.download-link` to the matching asset of the latest release
export async function updateDownloadLinks() {
  const release = await getLatestRelease();
  if (!release) {
    return;
  }

  document
    .querySelectorAll<HTMLAnchorElement>('.download-link')
    .forEach((link) => {
      const file = link.dataset.file?.replaceAll(
        VERSION_PLACEHOLDER,
        release.version
      );
      if (file && release.assetUrls[file]) {
        link.href = release.assetUrls[file];
      }
    });
}
