# Page Object Model (POM) - Playwright Search Test

This document explains the **Page Object Model** implementation for the Playwright.dev search test scenario.

## 📋 Overview

The POM architecture separates **test logic** from **page interactions**, making tests more maintainable, reusable, and readable.

### Project Structure

```
tests/
├── pages/
│   ├── BasePage.ts                      # Base page with common methods
│   └── PlaywrightDevSearchPage.ts       # Search page-specific methods
└── playwright-dev-search.spec.ts        # Test implementation using POM
```

---

## 🏗️ Architecture

### 1. **BasePage.ts** - Base Page Object

Common functionality shared across all pages:

```typescript
export class PlaywrightDevBasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common methods
  async navigateToHome(): Promise<void>
  async getPageTitle(): Promise<string>
  async getCurrentURL(): Promise<string>
}
```

**Purpose:**
- Initialize the Playwright `page` object
- Provide shared navigation and URL methods
- Act as a base for specialized page objects

---

### 2. **PlaywrightDevSearchPage.ts** - Search Page Object

Extends `BasePage` with search-specific functionality:

```typescript
export class PlaywrightDevSearchPage extends PlaywrightDevBasePage {
  // Locators
  private readonly searchButton: Locator;
  private readonly searchInput: Locator;
  private readonly clearButton: Locator;
  private readonly searchResults: Locator;

  // Methods
  async openSearchModal(): Promise<void>
  async searchForTerm(query: string): Promise<void>
  async clickFirstSearchResult(): Promise<void>
  async verifyTermInTitle(term: string): Promise<boolean>
  async performSearch(searchTerm: string): Promise<void>
}
```

**Key Features:**
- **Locators are private** - Encapsulated and centralized
- **Role-based selectors** - Uses `getByRole()` for accessibility
- **Descriptive methods** - Clear business logic
- **Reusable workflows** - `performSearch()` combines multiple steps

---

## 🎯 Locators Used

| Element | Selector | Purpose |
|---------|----------|---------|
| Search Button | `getByRole('button', { name: 'Search' })` | Opens search modal |
| Search Input | `getByRole('searchbox', { name: 'Search' })` | Text input field |
| Clear Button | `getByRole('button', { name: 'Clear the query' })` | Clear search |
| Search Results | `[role="option"]` | Individual result options |

**Why Role-Based Selectors?**
- ✅ Accessible-first approach
- ✅ Resilient to CSS/HTML changes
- ✅ Mirrors how users interact
- ✅ Self-documenting

---

## 📝 Test Implementation

### Test File: `playwright-dev-search.spec.ts`

```typescript
test('Search for Auto-waiting and verify title', async ({ page }) => {
  // 1. Initialize POM
  const searchPage = new PlaywrightDevSearchPage(page);

  // 2. Navigate to homepage
  await searchPage.navigateToHome();
  await expect(page).toHaveURL('https://playwright.dev/');

  // 3. Perform search
  await searchPage.performSearch('Auto-waiting');

  // 4. Verify title
  await expect(page).toHaveTitle(/Auto-waiting/i);
});
```

**Benefits:**
- **Clean and readable** - Business logic is clear
- **No page details** - Test doesn't know about HTML structure
- **Easy to maintain** - Change selectors only in POM
- **Reusable** - Call `performSearch()` in multiple tests

---

## 🔄 Test Execution Flow

```
┌─────────────────────────────────────────────────┐
│ Test: Search for Auto-waiting and verify title  │
└─────────────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
   Step 1:       Step 2:       Step 3:
   Navigate      Search        Verify
   ────────      ──────        ──────
   Go to home    Open modal    Check title
   Verify URL    Enter term    Assert contains
                 Click result  "Auto-waiting"
                 Wait nav
```

---

## 📊 POM Methods Breakdown

### Navigation Methods

```typescript
// Navigate to homepage
async navigateToHome(): Promise<void>

// Get page title
async getPageTitle(): Promise<string>

// Get current URL
async getCurrentURL(): Promise<string>
```

### Search Interaction Methods

```typescript
// Open search modal
async openSearchModal(): Promise<void>

// Type search query
async searchForTerm(query: string): Promise<void>

// Click first result
async clickFirstSearchResult(): Promise<void>

// Get search input value
async getSearchInputValue(): Promise<string>

// Clear search
async clearSearch(): Promise<void>
```

### Verification Methods

```typescript
// Verify term in title
async verifyTermInTitle(term: string): Promise<boolean>

// Get all result titles
async getSearchResultTitles(): Promise<string[]>

// Wait for results
async waitForSearchResults(): Promise<void>
```

### Workflow Methods

```typescript
// Complete search workflow
async performSearch(searchTerm: string): Promise<void>
```

---

## ✅ Test Coverage

### Test 1: Main Search Flow
**File:** `playwright-dev-search.spec.ts` (Test 1)

**Steps:**
1. Navigate to Playwright.dev
2. Open search modal
3. Type "Auto-waiting"
4. Click first result
5. Verify "Auto-waiting" is in title

**Assertions:**
- URL is `https://playwright.dev/`
- Page title contains "Auto-waiting"
- Can complete full workflow

**Expected Result:** ✅ **PASSED**

### Test 2: Search Input Validation
**File:** `playwright-dev-search.spec.ts` (Test 2)

**Steps:**
1. Navigate to homepage
2. Open search modal
3. Type "Auto-waiting"
4. Verify input value

**Assertions:**
- Input value equals "Auto-waiting"

**Expected Result:** ✅ **PASSED**

---

## 🚀 Running Tests

### Run all search tests
```bash
npm test -- tests/playwright-dev-search.spec.ts
```

### Run specific test
```bash
npm test -- tests/playwright-dev-search.spec.ts -g "Auto-waiting and verify"
```

### Run on specific browser
```bash
npx playwright test tests/playwright-dev-search.spec.ts --project=chromium
npx playwright test tests/playwright-dev-search.spec.ts --project=firefox
```

### View test report
```bash
npx playwright show-report
```

---

## 🎓 Key POM Principles

### 1. **Encapsulation**
- Locators are private
- Only expose necessary methods
- Hide implementation details

### 2. **Single Responsibility**
- Each method does one thing
- Clear, descriptive method names
- Combine methods for workflows

### 3. **Maintainability**
- Change selectors in one place
- Update logic without touching tests
- Easy to understand intent

### 4. **Reusability**
- Methods used across tests
- Avoid duplication
- Share common workflows

### 5. **Readability**
- Self-documenting code
- Clear parameter names
- Logical method ordering

---

## 📚 POM Best Practices

✅ **Do:**
- Use descriptive method names
- Keep locators private
- Group related methods
- Use role-based selectors
- Return meaningful data
- Add JSDoc comments
- Create workflow methods

❌ **Don't:**
- Expose locators publicly
- Use brittle CSS selectors
- Mix test logic with page logic
- Create overly generic methods
- Skip error handling
- Hard-code values

---

## 🔧 Extending the POM

### Add New Method

```typescript
async getAutoWaitingDocLink(): Promise<string> {
  const link = this.page.locator('a[href*="/docs/actionability"]');
  return await link.getAttribute('href') || '';
}
```

### Create New Page Object

```typescript
export class PlaywrightDevDocsPage extends PlaywrightDevBasePage {
  private readonly docHeading: Locator;
  private readonly navMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.docHeading = page.getByRole('heading', { level: 1 });
    this.navMenu = page.getByRole('navigation');
  }

  async getDocTitle(): Promise<string> {
    return await this.docHeading.textContent() || '';
  }
}
```

---

## 📈 Advantages Over Inline Tests

| Aspect | Inline Tests | POM |
|--------|--------------|-----|
| **Readability** | ❌ Verbose | ✅ Clean |
| **Maintainability** | ❌ Fragile | ✅ Robust |
| **Reusability** | ❌ Duplication | ✅ Shared |
| **Scalability** | ❌ Complex | ✅ Modular |
| **Update Time** | ❌ Hours | ✅ Minutes |

---

## 🎯 Summary

The **Page Object Model** provides:
- ✅ Better test organization
- ✅ Easier maintenance
- ✅ Increased reusability
- ✅ Improved readability
- ✅ Scalable architecture

Perfect for growing test suites! 🚀
