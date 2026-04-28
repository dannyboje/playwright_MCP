import { Page, Locator } from '@playwright/test';
import { PlaywrightDevBasePage } from './BasePage';

/**
 * PlaywrightDevSearchPage - Page Object for search functionality
 */
export class PlaywrightDevSearchPage extends PlaywrightDevBasePage {
  // Locators
  private readonly searchButton: Locator;
  private readonly searchInput: Locator;
  private readonly clearButton: Locator;
  private readonly searchResults: Locator;
  private readonly firstSearchResult: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators using role-based selectors
    this.searchButton = page.getByRole('button', { name: 'Search' }).first();
    this.searchInput = page.getByRole('searchbox', { name: 'Search' });
    this.clearButton = page.getByRole('button', { name: 'Clear the query' });
    this.searchResults = page.locator('[role="listbox"]');
    this.firstSearchResult = page.locator('[role="option"]').first();
  }

  /**
   * Click the search button to open search modal
   */
  async openSearchModal(): Promise<void> {
    await this.searchButton.click();
  }

  /**
   * Type search query in search input
   * @param query - Search term to enter
   */
  async searchForTerm(query: string): Promise<void> {
    await this.searchInput.fill(query);
    // Wait for search results to appear
    await this.page.waitForTimeout(500);
  }

  /**
   * Get search input value
   */
  async getSearchInputValue(): Promise<string> {
    return await this.searchInput.inputValue();
  }

  /**
   * Clear the search input
   */
  async clearSearch(): Promise<void> {
    await this.clearButton.click();
  }

  /**
   * Click on first search result
   */
  async clickFirstSearchResult(): Promise<void> {
    // Click the first visible link in search results
    const resultLink = this.page.locator('[role="option"]').first().locator('a');
    await resultLink.click();
  }

  /**
   * Get all search result titles
   */
  async getSearchResultTitles(): Promise<string[]> {
    const options = await this.page.locator('[role="option"]').all();
    const titles = [];
    for (const option of options) {
      titles.push(await option.textContent() || '');
    }
    return titles;
  }

  /**
   * Wait for search results to load
   */
  async waitForSearchResults(): Promise<void> {
    // Wait for at least one search result to appear
    await this.page.locator('[role="option"]').first().waitFor({ state: 'visible' });
  }

  /**
   * Verify if search term is in page title
   * @param term - Term to verify in title
   */
  async verifyTermInTitle(term: string): Promise<boolean> {
    const title = await this.getPageTitle();
    return title.includes(term);
  }

  /**
   * Complete search workflow
   * @param searchTerm - Term to search for
   */
  async performSearch(searchTerm: string): Promise<void> {
    await this.openSearchModal();
    await this.searchForTerm(searchTerm);
    await this.waitForSearchResults();
    await this.clickFirstSearchResult();
  }
}
