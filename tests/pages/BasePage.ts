import { Page, Locator } from '@playwright/test';

/**
 * PlaywrightDevBasePage - Base Page Object with common functionality
 */
export class PlaywrightDevBasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to Playwright.dev homepage
   */
  async navigateToHome(): Promise<void> {
    await this.page.goto('https://playwright.dev/');
  }

  /**
   * Get the page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get the current URL
   */
  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }
}
