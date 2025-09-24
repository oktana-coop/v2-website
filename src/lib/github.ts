// Fetch latest version from GitHub releases API
export async function getLatestVersion(): Promise<string> {
  try {
    const response = await fetch(
      'https://api.github.com/repos/oktana-coop/v2/releases/latest'
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.tag_name.replace(/^v/, '');
  } catch (error) {
    console.error('Failed to fetch latest version from GitHub:', error);
    return '0.5.0';
  }
}
