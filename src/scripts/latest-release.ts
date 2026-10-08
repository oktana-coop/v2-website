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
      const originalFile = link.dataset.file;
      if (!originalFile) {
        return;
      }

      // Generate the expected filename for the new version
      const expectedFileName = originalFile.replace(
        /\d+\.\d+\.\d+/g,
        release.version
      );
      if (release.assetUrls[expectedFileName]) {
        link.href = release.assetUrls[expectedFileName];
      }
    });
}
