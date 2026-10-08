import { expect, fakeAssetUrl, test } from '../shared/fixtures';

test.describe('download button', () => {
  test('macOS visitors download the universal dmg', async ({ page }) => {
    await page.goto('/?os=macos');

    await expect(
      page.getByRole('link', { name: 'Download for macOS (Alpha)' })
    ).toHaveAttribute('href', fakeAssetUrl('v2-9.9.9-universal.dmg'));
  });

  test('Windows visitors download the installer', async ({ page }) => {
    await page.goto('/?os=windows');

    await expect(
      page.getByRole('link', { name: 'Download for Windows (Alpha)' })
    ).toHaveAttribute('href', fakeAssetUrl('v2-Setup-9.9.9.exe'));
  });

  test('Linux visitors get a button that opens the install dialog', async ({
    page,
  }) => {
    await page.goto('/?os=linux');

    const button = page.getByRole('link', { name: 'Install on Linux (Alpha)' });
    await expect(button).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(button).toHaveAttribute('href', '/downloads#linux');
  });

  test.describe('when the releases API fails', () => {
    test.use({ releaseApiFails: true });

    test('macOS visitors are sent to the releases page', async ({ page }) => {
      await page.goto('/?os=macos');

      await expect(
        page.getByRole('link', { name: 'Download for macOS' })
      ).toHaveAttribute(
        'href',
        'https://github.com/oktana-coop/v2/releases/latest'
      );
    });

    test('Linux visitors still get the install button', async ({ page }) => {
      await page.goto('/?os=linux');

      await expect(
        page.getByRole('link', { name: 'Install on Linux (Alpha)' })
      ).toBeVisible();
    });
  });
});
