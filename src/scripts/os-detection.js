import { latestVersion } from '../constants/app-version';

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
  const downloadBtn = document.getElementById('download-btn');

  const os = detectOS();

  switch (os) {
    case 'Windows':
      downloadBtn.textContent = 'Download for Windows';
      downloadBtnLink.href = `https://github.com/oktana-coop/v2/releases/download/v${latestVersion}/v2.Setup.${latestVersion}.exe`;
      break;
    case 'Linux':
    case 'Android':
      downloadBtn.textContent = 'Download for Linux';
      downloadBtnLink.href`https://github.com/oktana-coop/v2/releases/download/v${latestVersion}/v2-${latestVersion}.AppImage`;
      break;
    case 'Mac OS':
    case 'iOS':
    default:
      downloadBtn.textContent = 'Download for macOS';
      downloadBtnLink.href = `https://github.com/oktana-coop/v2/releases/download/v${latestVersion}/v2-${latestVersion}-universal.dmg`;
      break;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initOSDetection);
