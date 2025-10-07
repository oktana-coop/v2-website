import AppleIcon from '../assets/icons/fa-apple.svg?raw';
import WindowsIcon from '../assets/icons/fa-windows.svg?raw';

function initOSDetection() {
  // Get version from data attribute set at build time
  const versionElement = document.querySelector('[data-v2-version]');
  if (!versionElement) {
    console.error('Version data not found');
    return;
  }

  const latestVersion = versionElement.dataset.v2Version;
  const baseUrl = `https://github.com/oktana-coop/v2/releases/download/v${latestVersion}`;

  // https://stackoverflow.com/a/38241481
  function detectOS() {
    const userAgent = window.navigator.userAgent,
      platform =
        window.navigator?.userAgentData?.platform || window.navigator.platform,
      macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (/Linux/.test(platform)) {
      os = 'Linux';
    }

    return os;
  }

  const downloadBtnLink = document.getElementById('download-btn-link');
  const downloadBtnText = document.getElementById('download-btn-text');
  const downloadBtnIcon = document.getElementById('download-btn-icon');

  // Check if elements exist (they might not exist on all pages)
  if (!downloadBtnLink || !downloadBtnText || !downloadBtnIcon) {
    return;
  }

  const os = detectOS();

  switch (os) {
    case 'Windows':
      downloadBtnText.textContent = 'Download for Windows';
      downloadBtnIcon.innerHTML = WindowsIcon;
      downloadBtnLink.href = `${baseUrl}/v2.Setup.${latestVersion}.exe`;
      break;
    case 'Linux':
    case 'Android':
      downloadBtnText.textContent = 'Download for Linux';
      downloadBtnIcon.style.display = 'none';
      downloadBtnLink.href = `${baseUrl}/v2-${latestVersion}.AppImage`;
      break;
    case 'Mac OS':
    case 'iOS':
    default:
      downloadBtnText.textContent = 'Download for macOS';
      downloadBtnIcon.innerHTML = AppleIcon;
      downloadBtnLink.href = `${baseUrl}/v2-${latestVersion}-universal.dmg`;
      break;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initOSDetection();
});
