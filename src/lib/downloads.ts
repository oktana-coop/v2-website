// This doesn't really matter, it's just a placeholder for the links, before they are updated by the script
export const DEFAULT_VERSION = '0.6.6';

export const GITHUB_RELEASES_BASE_URL =
  'https://github.com/oktana-coop/v2/releases/download';

export interface DownloadAsset {
  name: string;
  file: string;
  recommended?: boolean;
}

export interface DownloadPlatform {
  category: string;
  icon: string;
  assets: DownloadAsset[];
}

export const linuxAssets: DownloadAsset[] = [
  { name: 'AppImage', file: `v2-${DEFAULT_VERSION}-x86_64.AppImage` },
  { name: 'AppImage (ARM64)', file: `v2-${DEFAULT_VERSION}-arm64.AppImage` },
  { name: 'Deb', file: `v2-${DEFAULT_VERSION}-amd64.deb` },
  { name: 'Deb (ARM64)', file: `v2-${DEFAULT_VERSION}-arm64.deb` },
  { name: 'RPM', file: `v2-${DEFAULT_VERSION}-x86_64.rpm` },
  { name: 'RPM (ARM64)', file: `v2-${DEFAULT_VERSION}-aarch64.rpm` },
];

export const downloads: DownloadPlatform[] = [
  {
    category: 'macOS',
    icon: 'fa-apple',
    assets: [
      {
        name: 'Universal',
        file: `v2-${DEFAULT_VERSION}-universal.dmg`,
        recommended: true,
      },
      { name: 'Intel', file: `v2-${DEFAULT_VERSION}.dmg` },
      { name: 'Apple Silicon', file: `v2-${DEFAULT_VERSION}-arm64.dmg` },
    ],
  },
  {
    category: 'Windows',
    icon: 'fa-windows',
    assets: [{ name: 'Installer', file: `v2-Setup-${DEFAULT_VERSION}.exe` }],
  },
  {
    category: 'Linux',
    icon: 'fa-linux',
    assets: linuxAssets,
  },
];

// Adds the v2 APT repository and installs v2. After this, v2 updates with the
// rest of the system.
export const APT_INSTALL_COMMANDS = [
  'wget -qO- https://apt.v2editor.com/public.key | sudo gpg --yes --dearmor -o /usr/share/keyrings/v2-archive-keyring.gpg',
  'echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/v2-archive-keyring.gpg] https://apt.v2editor.com stable main" | sudo tee /etc/apt/sources.list.d/v2.list',
  'sudo apt update && sudo apt install v2',
];

export const APT_UNINSTALL_COMMAND = 'sudo apt remove v2';

// Undoes the first two install commands
export const APT_REMOVE_REPOSITORY_COMMAND =
  'sudo rm /etc/apt/sources.list.d/v2.list /usr/share/keyrings/v2-archive-keyring.gpg';
