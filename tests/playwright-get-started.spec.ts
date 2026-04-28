import { test, expect } from '@playwright/test';

test('Navigate to Playwright.dev and verify Get Started button navigation', async ({ page }) => {
  // Step 1: Navigate to https://playwright.dev/
  await page.goto('https://playwright.dev/');

  // Step 2: Verify Get Started button is available
  const getStartedButton = page.getByRole('link', { name: 'Get started' });
  await expect(getStartedButton).toBeVisible();

  // Step 3: Click Get Started button
  await getStartedButton.click();

  // Step 4: Confirm that Get Started button took us to https://playwright.dev/docs/intro
  await expect(page).toHaveURL('https://playwright.dev/docs/intro');

  // Verify we're on the Installation page
  await expect(page.locator('h1')).toContainText('Installation');
});
