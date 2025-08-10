// OS Detection and Download Button Update
function initOSDetection() {
  // https://stackoverflow.com/a/38241481
  function detectOS() {
    const userAgent = window.navigator.userAgent,
      platform =
        window.navigator?.userAgentData?.platform || window.navigator.platform,
      macosPlatforms = ["macOS", "Macintosh", "MacIntel", "MacPPC", "Mac68K"],
      windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
      iosPlatforms = ["iPhone", "iPad", "iPod"];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = "Mac OS";
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = "iOS";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "Windows";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (/Linux/.test(platform)) {
      os = "Linux";
    }

    return os;
  }

  // Update the button immediately
  const downloadBtn = document.getElementById("download-btn");
  const os = detectOS();

  switch (os) {
    case "Windows":
      downloadBtn.textContent = "Download for Windows";
      downloadBtn.href = "#"; // Replace with actual Windows download URL
      break;
    case "Linux":
      downloadBtn.textContent = "Download for Linux";
      downloadBtn.href = "#"; // Replace with actual Linux download URL
      break;
    case "macOS":
    default:
      downloadBtn.textContent = "Download for macOS";
      downloadBtn.href = "#"; // Replace with actual macOS download URL
      break;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initOSDetection);
