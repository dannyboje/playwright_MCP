import { test, expect } from '@playwright/test';

test('Validate all elements on Playwright.dev homepage', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Navigation Elements
  console.log('✓ Validating Navigation Elements');
  await expect(page.getByRole('link', { name: /Playwright logo Playwright/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  // Toggle navigation bar button only visible on mobile view

  // Header/Banner Section
  console.log('✓ Validating Header Section');
  await expect(page.getByRole('heading', { name: /Playwright enables reliable web automation/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Star microsoft/playwright on GitHub' })).toBeVisible();
  await expect(page.getByRole('link', { name: '86k+ stargazers on GitHub' })).toBeVisible();

  // Language Links in Banner
  console.log('✓ Validating Language Links');
  await expect(page.getByRole('link', { name: 'TypeScript' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Python' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: '.NET' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Java' }).first()).toBeVisible();

  // Playwright Test Section
  console.log('✓ Validating Playwright Test Section');
  await expect(page.getByRole('heading', { name: 'Playwright Test' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing documentation' })).toBeVisible();

  // Playwright CLI Section
  console.log('✓ Validating Playwright CLI Section');
  await expect(page.getByRole('heading', { name: 'Playwright CLI' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CLI documentation' })).toBeVisible();

  // Playwright MCP Section
  console.log('✓ Validating Playwright MCP Section');
  await expect(page.getByRole('heading', { name: 'Playwright MCP' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'MCP documentation' })).toBeVisible();

  // Built for Testing Section
  console.log('✓ Validating Built for Testing Section');
  await expect(page.getByRole('heading', { name: 'Built for testing' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Auto-wait and web-first assertions' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Test isolation' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Resilient locators' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Parallelism and sharding' })).toBeVisible();

  // Built for AI Agents Section
  console.log('✓ Validating Built for AI Agents Section');
  await expect(page.getByRole('heading', { name: 'Built for AI agents' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Accessibility snapshots, not screenshots' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'MCP server' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'CLI for coding agents' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Session monitoring' })).toBeVisible();

  // Powerful Tooling Section
  console.log('✓ Validating Powerful Tooling Section');
  await expect(page.getByRole('heading', { name: 'Powerful tooling' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Test generator' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Test generator' }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Trace Viewer' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Trace Viewer' }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'VS Code extension' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'VS Code extension' }).first()).toBeVisible();

  // Browser Support Section
  console.log('✓ Validating Browser Support Section');
  const chromiumImage = page.locator('img[alt="Chromium, Firefox, WebKit"]');
  await expect(chromiumImage).toBeVisible();

  // Companies Section
  console.log('✓ Validating Companies Section');
  await expect(page.getByRole('heading', { name: 'Chosen by companies and open source projects' })).toBeVisible();

  // Footer Links - Learn Section
  console.log('✓ Validating Footer - Learn Section');
  await expect(page.getByRole('link', { name: 'Getting started' }).filter({ has: page.locator('..') })).toBeVisible();
  await expect(page.getByRole('link', { name: /Playwright Training/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Learn Videos' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Feature Videos' })).toBeVisible();

  // Footer Links - Community Section
  console.log('✓ Validating Footer - Community Section');
  await expect(page.getByRole('link', { name: /Stack Overflow/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Discord/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Twitter/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /LinkedIn/ }).first()).toBeVisible();

  // Footer Links - More Section
  console.log('✓ Validating Footer - More Section');
  await expect(page.getByRole('link', { name: /GitHub/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /YouTube/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Blog/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ambassadors' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Microsoft Privacy Statement/ })).toBeVisible();

  // Company Links in List
  console.log('✓ Validating Company Links');
  const companies = ['VS Code', 'Bing', 'Outlook', 'Disney+ Hotstar', 'Material UI', 'ING', 'Adobe', 'React Navigation', 'Accessibility Insights'];
  for (const company of companies) {
    // Use visible: true to get only visible instances
    await expect(page.getByRole('link', { name: company }).first()).toBeVisible();
  }

  console.log('✓ All elements validated successfully!');
});
