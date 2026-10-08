import { expect, type Page } from '@playwright/test';

/**
 * Opens the Linux install dialog from the home page hero button. Expects the
 * page to be showing the home page as a Linux visitor (`/?os=linux`).
 */
export const openLinuxInstallDialog = async ({ page }: { page: Page }) => {
  await page.getByRole('link', { name: 'Install on Linux (Alpha)' }).click();

  const dialog = page.getByRole('dialog', { name: 'Install v2 on Linux' });
  await expect(dialog).toBeVisible();

  return dialog;
};

/**
 * Returns the current clipboard text. Needs the clipboard permissions granted
 * in the Playwright config.
 */
export const readClipboard = ({ page }: { page: Page }) =>
  page.evaluate(() => navigator.clipboard.readText());
