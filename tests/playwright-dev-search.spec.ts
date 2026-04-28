import { test, expect } from '@playwright/test';
import { PlaywrightDevSearchPage } from './pages/PlaywrightDevSearchPage';

/**
 * Test: Search for "Auto-waiting" on Playwright.dev and verify page title
 * 
 * Steps:
 * 1. Navigate to https://playwright.dev/
 * 2. Open search modal and search for "Auto-waiting"
 * 3. Click first result and verify "Auto-waiting" is in page title
 */
test('Search for Auto-waiting and verify title', async ({ page }) => {
  // Initialize POM
  const searchPage = new PlaywrightDevSearchPage(page);

  // Step 1: Navigate to Playwright.dev
  console.log('📍 Step 1: Navigating to https://playwright.dev/');
  await searchPage.navigateToHome();
  await expect(page).toHaveURL('https://playwright.dev/');
  console.log('✅ Successfully navigated to homepage');

  // Step 2: Search for "Auto-waiting"
  console.log('🔍 Step 2: Opening search modal and searching for "Auto-waiting"');
  await searchPage.performSearch('Auto-waiting');
  console.log('✅ Search completed and result clicked');

  // Step 3: Verify "Auto-waiting" is in the page title
  console.log('🔎 Step 3: Verifying "Auto-waiting" in page title');
  const pageTitle = await searchPage.getPageTitle();
  console.log(`📄 Current page title: "${pageTitle}"`);
  
  await expect(page).toHaveTitle(/Auto-waiting/i);
  console.log('✅ Title verification passed');

  // Additional verification
  const isTermInTitle = await searchPage.verifyTermInTitle('Auto-waiting');
  expect(isTermInTitle).toBe(true);
  console.log('✅ All assertions passed!');
});

/**
 * Test: Verify search input captures the term correctly
 */
test('Verify search input captures "Auto-waiting" term', async ({ page }) => {
  const searchPage = new PlaywrightDevSearchPage(page);

  await searchPage.navigateToHome();
  await searchPage.openSearchModal();
  
  const searchTerm = 'Auto-waiting';
  await searchPage.searchForTerm(searchTerm);
  
  const inputValue = await searchPage.getSearchInputValue();
  console.log(`🔍 Search input value: "${inputValue}"`);
  
  expect(inputValue).toBe(searchTerm);
  console.log('✅ Search input verification passed');
});
