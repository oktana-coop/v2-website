const DEFAULT_VERSION = '0.6.4';

export async function getLatestVersion(): Promise<string> {
  try {
    // Use GitHub token if available for higher rate limits
    const headers: Record<string, string> = {};
    if (import.meta.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      'https://api.github.com/repos/oktana-coop/v2/releases/latest',
      { headers }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.tag_name.replace(/^v/, '');
  } catch (error) {
    console.error('Failed to fetch latest version from GitHub:', error);
    return DEFAULT_VERSION;
  }
}
