import { APT_INSTALL_COMMANDS } from '../../src/lib/downloads';
import { expect, fakeAssetUrl, test } from '../shared/fixtures';
import { openLinuxInstallDialog, readClipboard } from '../shared/helpers';

test.describe('Linux install dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?os=linux');
  });

  test('copies the apt commands', async ({ page }) => {
    const dialog = await openLinuxInstallDialog({ page });

    await dialog.getByRole('button', { name: 'Copy' }).click();

    await expect(dialog.getByRole('button', { name: 'Copied' })).toBeVisible();
    expect(await readClipboard({ page })).toBe(APT_INSTALL_COMMANDS.join('\n'));
  });

  test('Other formats tab links to the latest release', async ({ page }) => {
    const dialog = await openLinuxInstallDialog({ page });

    await dialog.getByRole('tab', { name: 'Other formats' }).click();

    await expect(
      dialog.getByRole('link', { name: 'AppImage', exact: true })
    ).toHaveAttribute('href', fakeAssetUrl('v2-9.9.9-x86_64.AppImage'));
    await expect(dialog.getByRole('button', { name: 'Copy' })).toBeHidden();
  });

  test('closes with the close button', async ({ page }) => {
    const dialog = await openLinuxInstallDialog({ page });

    await dialog.getByRole('button', { name: 'Close' }).click();

    await expect(dialog).toBeHidden();
  });

  test('closes with Escape', async ({ page }) => {
    const dialog = await openLinuxInstallDialog({ page });

    await page.keyboard.press('Escape');

    await expect(dialog).toBeHidden();
  });

  test('closes when clicking the backdrop', async ({ page }) => {
    const dialog = await openLinuxInstallDialog({ page });

    await page.mouse.click(5, 5);

    await expect(dialog).toBeHidden();
  });

  test('reopens on the Ubuntu / Debian tab', async ({ page }) => {
    const dialog = await openLinuxInstallDialog({ page });
    await dialog.getByRole('tab', { name: 'Other formats' }).click();
    await page.keyboard.press('Escape');

    await openLinuxInstallDialog({ page });

    await expect(
      dialog.getByRole('tab', { name: 'Ubuntu / Debian' })
    ).toHaveAttribute('aria-selected', 'true');
  });
});
