# Playwright MCP Test Suite

A comprehensive end-to-end testing project using **Playwright Test** framework with automated CI/CD pipeline, Git hooks, and full documentation.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Available Tests](#available-tests)
- [Running Tests](#running-tests)
- [Test Reports & Allure](#test-reports--allure)
- [CI/CD & Git Automation](#cicd--git-automation)
- [Configuration](#configuration)
- [NPM Scripts](#npm-scripts)
- [Project Files](#project-files)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd playwright_MCP

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps

# Setup Git hooks (for pre-push testing)
./setup-git-hooks.sh
```

### Run Your First Test

```bash
# Run all tests
npm test

# Run tests with visible browser
npm run test:headed

# View interactive UI
npm run test:ui
```

---

## 📚 Project Overview

This project demonstrates a production-ready test automation setup with:

✅ **Playwright Test Framework** - Modern end-to-end testing  
✅ **Multi-Browser Testing** - Chromium, Firefox, WebKit  
✅ **Automated CI/CD** - GitHub Actions on every push  
✅ **Git Hooks** - Pre-push test automation  
✅ **Comprehensive Documentation** - Full setup & usage guides  
✅ **Real-World Test Examples** - Navigation, element validation, assertions  

### Technology Stack

| Component | Version |
|-----------|---------|
| Playwright Test | ^1.59.1 |
| Node.js | 18.x, 20.x, LTS |
| TypeScript | Latest |
| GitHub Actions | Built-in |

---

## 📁 Project Structure

```
playwright_MCP/
├── .github/
│   └── workflows/
│       └── playwright.yml              # GitHub Actions CI/CD workflow
├── .git/
│   └── hooks/
│       └── pre-push                    # Git hook for local test execution
├── tests/
│   ├── example.spec.ts                 # Example test (provided)
│   ├── playwright-get-started.spec.ts  # Test: Navigate & Get Started button
│   └── validate-all-elements.spec.ts   # Test: Validate all page elements
├── textcontexts/
│   └── webtestcontext.txt              # Test generation context
├── playwright-report/                  # Generated HTML test reports
├── allure-report/                      # Generated Allure interactive reports
├── allure-results/                     # Allure test result artifacts
├── test-results/                       # Playwright test results artifacts
├── .gitignore                          # Git ignore patterns
├── playwright.config.ts                # Playwright configuration
├── package.json                        # NPM dependencies & scripts
├── package-lock.json                   # Locked dependency versions
├── setup-git-hooks.sh                  # Git hooks setup script
├── ALLURE_REPORTING.md                 # Allure reporting documentation
├── GIT_TEST_AUTOMATION.md              # Git automation documentation
├── POM_DOCUMENTATION.md                # Page Object Model documentation
├── API_TESTING_GUIDE.md                # API testing with schema validation
└── README.md                           # This file
```

---

## 🧪 Available Tests

### 1. **Playwright.dev Navigation Test**
**File:** `tests/playwright-get-started.spec.ts`

Tests the Playwright documentation website:
- ✅ Navigates to https://playwright.dev/
- ✅ Verifies "Get Started" button is available
- ✅ Clicks the "Get Started" button
- ✅ Confirms navigation to https://playwright.dev/docs/intro
- ✅ Validates "Installation" page heading

**Run:**
```bash
npx playwright test tests/playwright-get-started.spec.ts
```

### 2. **Page Elements Validation Test**
**File:** `tests/validate-all-elements.spec.ts`

Comprehensive validation of all Playwright.dev homepage elements:
- ✅ Navigation elements (logo, search button)
- ✅ Header section (heading, Get Started button, GitHub links)
- ✅ Language links (TypeScript, Python, .NET, Java)
- ✅ Content sections (Playwright Test, CLI, MCP)
- ✅ Feature sections (Auto-wait, Test isolation, Resilient locators, etc.)
- ✅ Company logos (9 companies)
- ✅ Footer links (Learn, Community, More sections)

**Run:**
```bash
npx playwright test tests/validate-all-elements.spec.ts
```

### 3. **Example Test**
**File:** `tests/example.spec.ts`

Starter template demonstrating Playwright basics.

---

## ▶️ Running Tests

### Basic Test Execution

```bash
# Run all tests in parallel (headless)
npm test

# Run specific test file
npm test tests/playwright-get-started.spec.ts

# Run tests matching a pattern
npm test -- --grep "Get Started"

# Run single test
npm test -- --grep "exact test name"
```

### Visual Test Modes

```bash
# Run with visible browser
npm run test:headed

# Run in interactive UI mode
npm run test:ui

# Run in debug mode (step-through)
npm run test:debug
```

### Advanced Options

```bash
# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run with specific configuration
npx playwright test --config=playwright.config.ts

# Generate coverage report
npx playwright test --reporter=coverage

# Update snapshots
npx playwright test --update-snapshots

# Show HTML report
npx playwright show-report
```

---

## � Test Reports & Allure

### Allure Test Reports

This project integrates **Allure Reports** for comprehensive, interactive test analytics:

**Features:**
- 📊 Detailed test statistics and status breakdown
- 📈 Test history and trend analysis
- 🔍 Step-by-step execution logs with attachments
- 🏷️ Test categorization by status, severity, and custom labels
- 📱 Responsive, mobile-friendly dashboard

### Generating Allure Reports

**Complete workflow (test + report + open):**
```bash
npm run test:allure
```

**Individual steps:**
```bash
# Run tests and collect results
npm test

# Generate Allure HTML report
npm run allure:report

# Open report in browser
npm run allure:open
```

### Report Output

After running tests, reports are available in:
- **Playwright HTML Report:** `playwright-report/index.html`
- **Allure Report:** `allure-report/index.html`
- **Test Results:** `test-results/` directory

### Report Directories

```
allure-results/       # Test result JSON files (created by npm test)
allure-report/        # Generated HTML report (created by npm run allure:report)
```

### Viewing Reports

```bash
# Open Allure report
npm run allure:open

# Or manually open in browser
open allure-report/index.html

# View Playwright report
npx playwright show-report
```

For detailed Allure documentation, see [ALLURE_REPORTING.md](ALLURE_REPORTING.md).

---

## �🔄 CI/CD & Git Automation

### GitHub Actions Workflow

Tests automatically run on:
- ✅ Every **push** to `main` or `master` branches
- ✅ Every **pull request** to `main` or `master` branches

**Workflow Configuration:** `.github/workflows/playwright.yml`

#### What Happens:
1. Checkout code
2. Setup Node.js (18.x, 20.x, LTS)
3. Install dependencies
4. Install Playwright browsers
5. Run all tests
6. Upload test reports (30-day retention)
7. Comment on PRs with results

### Local Pre-Push Hook

Tests run **locally before push** to prevent broken code:

```bash
# This runs automatically before git push
git push origin main
# → Pre-push hook executes: npm test
# → If tests fail: push is blocked
# → If tests pass: push continues
```

**Override (Emergency Only):**
```bash
git push --no-verify  # Skip hooks, proceed with push
```

### View Test Results

**Locally:**
```bash
npx playwright show-report
```

**On GitHub:**
- Navigate to **Actions** tab
- Select workflow run
- View artifacts: `playwright-report-node-*` and `test-results-node-*`

---

## ⚙️ Configuration

### Playwright Configuration
**File:** `playwright.config.ts`

Key settings:
- **Test Directory:** `./tests`
- **Parallel Execution:** Enabled (`fullyParallel: true`)
- **Browsers:** Chromium, Firefox, WebKit
- **Reporter:** HTML (generates `playwright-report/`)
- **Retries:** 0 locally, 2 on CI
- **Trace:** Collected on first retry
- **Workers:** All available locally, 1 on CI (for stability)

### Browser Configuration

Tests run on three browsers:

| Browser | Device | Engine |
|---------|--------|--------|
| Chromium | Desktop Chrome | Blink |
| Firefox | Desktop Firefox | Gecko |
| WebKit | Desktop Safari | WebKit |

### TypeScript Configuration

Project supports TypeScript with strict typing:
- `@playwright/test` - Test runner & assertions
- `@types/node` - Node.js types
- ES2020+ target

---

## 📦 NPM Scripts

### Core Test Commands

```bash
npm test                  # Run all tests (headless, parallel)
npm run test:headed      # Run tests with visible browser
npm run test:debug       # Run tests in debug mode
npm run test:ui          # Run tests in interactive UI mode
```

### Allure Reporting Commands

```bash
npm run test:allure      # Run tests + generate Allure report + open it
npm run allure:report    # Generate HTML Allure report from results
npm run allure:open      # Open existing Allure report in browser
```

**Allure Reporting Integration:**
- 📊 Interactive test dashboards with statistics
- 📈 Detailed test history and trends
- 🔍 Step-by-step execution logs with attachments
- 📱 Mobile-friendly responsive UI

See [ALLURE_REPORTING.md](ALLURE_REPORTING.md) for comprehensive Allure documentation.

### Adding Custom Scripts

Edit `package.json` to add more scripts:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:custom": "playwright test --project=chromium --grep 'specific'",
    "test:ci": "playwright test --reporter=github"
  }
}
```

---

## 📄 Project Files

### Test Files

| File | Purpose | Status |
|------|---------|--------|
| `tests/playwright-get-started.spec.ts` | Navigation & button click test | ✅ Passing |
| `tests/validate-all-elements.spec.ts` | Comprehensive page element validation | ✅ Passing |
| `tests/example.spec.ts` | Example/starter test | ✅ Included |

### Configuration Files

| File | Purpose |
|------|---------|
| `playwright.config.ts` | Playwright test configuration |
| `package.json` | NPM dependencies & scripts |
| `package-lock.json` | Locked dependency versions |
| `.gitignore` | Git ignore patterns |

### Automation Files

| File | Purpose |
|------|---------|
| `.github/workflows/playwright.yml` | GitHub Actions CI/CD workflow |
| `.git/hooks/pre-push` | Pre-push test execution hook |
| `setup-git-hooks.sh` | Git hooks installation script |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview (this file) |
| `GIT_TEST_AUTOMATION.md` | Git automation & CI/CD details |
| `textcontexts/webtestcontext.txt` | Test generation context |

---

## 🐛 Troubleshooting

### Pre-push Hook Not Running?

```bash
# Check if executable
ls -la .git/hooks/pre-push

# Make executable
chmod +x .git/hooks/pre-push

# Or use setup script
./setup-git-hooks.sh
```

### Tests Pass Locally but Fail on GitHub?

- Check Node.js version mismatch
- Install dependencies: `npm ci` (not `npm install`)
- Review GitHub Actions artifacts for detailed errors
- Check if environment variables are needed

### Browser Not Found?

```bash
# Install missing browsers
npx playwright install --with-deps

# Install specific browser
npx playwright install chromium
```

### Report Not Generated?

```bash
# Clear old reports
rm -rf playwright-report/ test-results/

# Run tests
npm test

# View report
npx playwright show-report
```

### Git Hook Permission Issues?

```bash
# Reset permissions on hooks
chmod +x .git/hooks/*

# Verify
ls -la .git/hooks/
```

### Need to Skip Hook for a Push?

```bash
git push --no-verify
```

⚠️ Use sparingly - this bypasses test safety checks.

---

## 📝 Writing New Tests

### Test Template

```typescript
import { test, expect } from '@playwright/test';

test('descriptive test name', async ({ page }) => {
  // Navigate
  await page.goto('https://example.com');
  
  // Interact
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Assert
  await expect(page).toHaveURL('https://example.com/success');
  await expect(page.getByRole('heading')).toContainText('Success');
});
```

### Key Assertions

```typescript
// Visibility
await expect(element).toBeVisible();
await expect(element).toBeHidden();

// Content
await expect(element).toContainText('text');
await expect(element).toHaveValue('value');

// URL
await expect(page).toHaveURL('https://...');

// State
await expect(element).toBeEnabled();
await expect(element).toBeDisabled();
```

### Best Practices

✅ **Use meaningful test names** - Describe what is being tested  
✅ **One assertion per test concept** - Keep tests focused  
✅ **Use role-based locators** - `getByRole()`, `getByLabel()`  
✅ **Avoid hard-coded waits** - Use auto-waiting  
✅ **Test user workflows** - Not implementation details  
✅ **Run tests locally first** - Before pushing  

---

## 🔗 Useful Resources

- **Playwright Docs:** https://playwright.dev
- **Playwright API:** https://playwright.dev/docs/api/class-page
- **Best Practices:** https://playwright.dev/docs/best-practices
- **GitHub Actions:** https://docs.github.com/en/actions
- **Test Reports:** `npx playwright show-report`

---

## 📊 Test Statistics

| Metric | Value |
|--------|-------|
| Total Test Files | 3 |
| Test Cases | 12+ |
| Browsers Tested | 3 (Chromium, Firefox, WebKit) |
| Node.js Versions | 3 (18.x, 20.x, LTS) |
| CI/CD Runs | Every push & PR |

---

## ✨ Next Steps

1. **Run tests locally:** `npm test`
2. **Explore test reports:** `npx playwright show-report`
3. **Try UI mode:** `npm run test:ui`
4. **Write new tests:** Create `.spec.ts` files in `tests/`
5. **Push & watch CI:** Commit and see GitHub Actions run
6. **View documentation:** See `GIT_TEST_AUTOMATION.md` for more details

---

## 📞 Support

For issues or questions:
1. Check `GIT_TEST_AUTOMATION.md` for automation-specific help
2. Review test files for examples
3. Check GitHub Actions logs for CI/CD issues
4. Refer to [Playwright Documentation](https://playwright.dev)

---

## 📄 License

ISC

---

**Happy Testing! 🎭**

*Last Updated: April 28, 2026*
