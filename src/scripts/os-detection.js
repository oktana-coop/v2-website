// OS Detection and Download Button Update
function initOSDetection() {
  // Current version info
  const CURRENT_VERSION = '0.3.48';
  const BASE_URL = `https://github.com/oktana-coop/v2/releases/download/v${CURRENT_VERSION}`;

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

  // Update the button immediately
  const downloadBtn = document.getElementById('download-btn');
  const os = detectOS();

  switch (os) {
    case 'Windows':
      downloadBtn.textContent = 'Download for Windows';
      downloadBtn.href = `${BASE_URL}/v2.Setup.${CURRENT_VERSION}.exe`;
      break;
    case 'Linux':
    case 'Android':
      downloadBtn.textContent = 'Download for Linux';
      downloadBtn.href = `${BASE_URL}/v2-${CURRENT_VERSION}.AppImage`;
      break;
    case 'Mac OS':
    case 'iOS':
    default:
      downloadBtn.textContent = 'Download for macOS';
      downloadBtn.href = `${BASE_URL}/v2-${CURRENT_VERSION}-universal.dmg`;
      break;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initOSDetection);
