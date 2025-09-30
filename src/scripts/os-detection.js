import { latestVersion } from '../constants/app-version';

import AppleIcon from '../assets/icons/fa-apple.svg?raw';
import WindowsIcon from '../assets/icons/fa-windows.svg?raw';
import LinuxIcon from '../assets/icons/fa-linux.svg?raw';

// OS Detection and Download Button Update
function initOSDetection() {
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

  const os = detectOS();

  switch (os) {
    case 'Windows':
      downloadBtnText.textContent = 'Download for Windows (Early Access)';
      downloadBtnIcon.innerHTML = WindowsIcon;
      downloadBtnLink.href = `https://github.com/oktana-coop/v2/releases/download/v${latestVersion}/v2-Setup-${latestVersion}.exe`;
      break;
    case 'Linux':
    case 'Android':
      downloadBtnText.textContent = 'Download for Linux (Early Access)';
      downloadBtnIcon.innerHTML = LinuxIcon;
      downloadBtnLink.href = `https://github.com/oktana-coop/v2/releases/download/v${latestVersion}/v2-${latestVersion}.AppImage`;
      break;
    case 'Mac OS':
    case 'iOS':
    default:
      downloadBtnText.textContent = 'Download for macOS (Early Access)';
      // downloadBtnIcon.innerHTML = AppleIcon;
      downloadBtnLink.href = `https://github.com/oktana-coop/v2/releases/download/v${latestVersion}/v2-${latestVersion}-universal.dmg`;
      break;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initOSDetection);
