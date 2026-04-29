# Allure Reports Integration

This project integrates **Allure Reports** to provide comprehensive, interactive test reporting with detailed analytics and failure insights.

## Overview

Allure is a flexible, lightweight, multi-language test reporting tool that provides:
- 📊 **Test Statistics**: Pass/fail rates, duration metrics, and trend analysis
- 📈 **Visual Analytics**: Charts and graphs for test results
- 🔍 **Detailed Logs**: Step-by-step test execution logs with attachments
- 🏷️ **Categorization**: Tests organized by status, severity, and custom labels
- 📱 **Responsive UI**: Mobile-friendly interactive dashboard

## Installation

Allure packages are already installed as dev dependencies:

```bash
npm install --save-dev allure-playwright allure-commandline
```

## Configuration

### Playwright Config

Allure reporter is configured in [playwright.config.ts](playwright.config.ts):

```typescript
reporter: [
  ['html'],
  ['allure-playwright'],
],
```

### Directories

- **allure-results/**: Generated test result files (git-ignored)
- **allure-report/**: Generated HTML report (git-ignored)

## NPM Scripts

### Run Tests and Generate Report

```bash
# Run all tests and generate Allure report
npm run test:allure

# This runs:
# 1. npm test (all tests)
# 2. npm run allure:report (generates report)
# 3. npm run allure:open (opens in browser)
```

### Individual Commands

```bash
# Run tests with Allure results collection
npm test

# Generate HTML report from results
npm run allure:report

# Open report in default browser
npm run allure:open

# Run with headed browser
npm test:headed

# Debug mode
npm test:debug

# UI mode
npm test:ui
```

## Usage Guide

### Running Tests with Allure

1. **Run Tests**:
   ```bash
   npm test
   ```
   This executes all tests and collects results in `allure-results/`

2. **Generate Report**:
   ```bash
   npm run allure:report
   ```
   Creates `allure-report/` directory with interactive HTML

3. **View Report**:
   ```bash
   npm run allure:open
   ```
   Opens report in your default browser

### Complete Workflow

```bash
# One command to test and view results
npm run test:allure
```

## Report Features

### Dashboard
- **Overview**: Total tests, pass rate, duration
- **Statistics**: Test status distribution
- **Trends**: Historical test performance

### Test Results
- **Test List**: All tests with status indicators
- **Test Details**: 
  - Step-by-step execution logs
  - Console output and logs
  - Screenshots and attachments
  - Duration metrics
  - Error messages and stack traces

### Categorization
- **By Status**: Passed, Failed, Skipped
- **By Severity**: Blocker, Critical, Normal, Minor, Trivial
- **By Feature**: Tests grouped by functionality

### Timeline
- **Test Duration**: Execution time for each test
- **Timeline View**: Chronological test execution
- **Performance Metrics**: Slow tests identified

## File Structure

```
playwright_MCP/
├── allure-results/           # Test result artifacts (git-ignored)
│   ├── *-result.json        # Test result data
│   └── *-attachment.*       # Logs, screenshots, etc.
├── allure-report/            # Generated HTML report (git-ignored)
│   ├── index.html           # Report entry point
│   ├── widgets/             # Dashboard widgets
│   └── plugins/             # Additional features
└── playwright.config.ts      # Config with allure-playwright reporter
```

## CI/CD Integration

### GitHub Actions

The report is generated and can be archived as an artifact in CI/CD:

```yaml
- name: Run tests
  run: npm test

- name: Generate Allure Report
  if: always()
  run: npm run allure:report

- name: Upload Allure Report
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: allure-report-${{ github.run_id }}
    path: allure-report
    retention-days: 30
```

See [.github/workflows/playwright.yml](.github/workflows/playwright.yml) for current implementation.

## Advanced Usage

### Test Descriptions and Steps

Add descriptive information to tests using `test.describe()` and `test.step()`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Product Search', () => {
  test('should find product by keyword', async ({ page }) => {
    await test.step('Navigate to homepage', async () => {
      await page.goto('https://example.com');
    });

    await test.step('Search for product', async () => {
      await page.fill('[data-testid="search"]', 'laptop');
      await page.click('[data-testid="search-btn"]');
    });

    await test.step('Verify results', async () => {
      const results = await page.locator('[data-testid="result"]');
      expect(await results.count()).toBeGreaterThan(0);
    });
  });
});
```

### Attaching Artifacts

Attach screenshots, videos, and logs:

```typescript
import { test, expect } from '@playwright/test';

test('should capture screenshot on failure', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Attach screenshot
  await page.screenshot({ path: 'screenshot.png' });
  
  // Or use test.info().attach()
  const screenshot = await page.screenshot();
  test.info().attach('screenshot', { body: screenshot, contentType: 'image/png' });
});
```

### Filtering Results

Clean results before generating report:

```bash
# Clean old results
rm -rf allure-results

# Run tests
npm test

# Generate report
npm run allure:report
```

Or use the `--clean` flag:

```bash
npm run allure:report  # Already includes --clean flag
```

## Troubleshooting

### Report Not Generating

**Issue**: `allure-report/` directory not created

**Solution**:
```bash
# Verify allure-commandline is installed
npm list allure-commandline

# Reinstall if needed
npm install --save-dev allure-commandline

# Ensure allure-results/ exists
ls -la allure-results/

# Generate report
npm run allure:report
```

### Opening Report Fails

**Issue**: `npm run allure:open` doesn't open browser

**Solution**:
```bash
# Open manually
open allure-report/index.html          # macOS
xdg-open allure-report/index.html      # Linux
start allure-report/index.html         # Windows

# Or use Python server
cd allure-report && python3 -m http.server 8000
# Visit http://localhost:8000
```

### Results Not Captured

**Issue**: `allure-results/` is empty after tests

**Solution**:
- Verify `allure-playwright` is in devDependencies
- Check `playwright.config.ts` has `['allure-playwright']` in reporters
- Ensure tests actually run: `npm test -- --verbose`

### CI/CD Not Generating Report

**Issue**: Report not generated in GitHub Actions

**Solution**:
- Add `if: always()` to ensure report generation even if tests fail
- Verify artifacts are uploaded with correct path: `allure-report`
- Check workflow file for proper report generation step

## Resources

- [Allure Official Documentation](https://docs.qameta.io/allure/)
- [Allure Playwright Integration](https://github.com/allure-framework/allure-js/tree/master/packages/allure-playwright)
- [Test Reporting Best Practices](https://docs.qameta.io/allure/)

## Best Practices

1. **Use Descriptive Test Names**: Clear test names appear in reports
2. **Add Test Steps**: Use `test.step()` for detailed execution flow
3. **Attach Artifacts**: Capture screenshots and logs on failure
4. **Tag Tests**: Use `@tag` notation for categorization
5. **Regular Cleanup**: Clear old results before major test runs
6. **Integrate in CI/CD**: Archive reports for historical analysis
7. **Monitor Trends**: Review historical data to identify patterns

## Next Steps

- ✅ Allure reporter configured and tested
- 🔄 Consider adding test categories and tags
- 📊 Review trends in CI/CD pipelines
- 🎯 Add custom severity levels and descriptions to tests
- 📱 Set up report archival for historical analysis
