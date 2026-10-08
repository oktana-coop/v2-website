import {
  APT_INSTALL_COMMANDS,
  APT_REMOVE_REPOSITORY_COMMAND,
  APT_UNINSTALL_COMMAND,
} from '../../src/lib/downloads';
import { expect, fakeAssetUrl, test } from '../shared/fixtures';
import { readClipboard } from '../shared/helpers';

test.describe('downloads page, Linux section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/downloads#linux');
  });

  test('shows the latest version', async ({ page }) => {
    await expect(page.getByText('v9.9.9')).toBeVisible();
  });

  test('copies the apt commands', async ({ page }) => {
    const linux = page.locator('#linux');

    await linux.getByRole('button', { name: 'Copy' }).click();

    expect(await readClipboard({ page })).toBe(APT_INSTALL_COMMANDS.join('\n'));
  });

  test('shows the uninstall commands when expanded', async ({ page }) => {
    const linux = page.locator('#linux');
    await expect(linux.getByText(APT_UNINSTALL_COMMAND)).toBeHidden();

    await linux.getByText('Uninstall', { exact: true }).click();

    await expect(linux.getByText(APT_UNINSTALL_COMMAND)).toBeVisible();
    await expect(linux.getByText(APT_REMOVE_REPOSITORY_COMMAND)).toBeVisible();
  });

  test('links other formats to the latest release', async ({ page }) => {
    await expect(
      page.locator('#linux').getByRole('link', { name: 'RPM', exact: true })
    ).toHaveAttribute('href', fakeAssetUrl('v2-9.9.9-x86_64.rpm'));
  });

  test.describe('on a phone', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('the page does not scroll horizontally', async ({ page }) => {
      const { pageWidth, viewportWidth } = await page.evaluate(() => ({
        pageWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      }));

      expect(pageWidth).toBe(viewportWidth);
    });
  });
});
