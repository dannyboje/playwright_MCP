# Git Push Test Automation

This project is configured to automatically run Playwright tests every time code is pushed.

## How It Works

### 1. **Local Pre-Push Hook** (Your Machine)
A Git hook runs tests locally **before** your push is sent to GitHub:
- Tests must pass for the push to succeed
- If tests fail, the push is blocked
- This prevents broken code from reaching the repository

### 2. **GitHub Actions** (Remote CI/CD)
Tests also run on GitHub's servers after every push:
- Runs tests on multiple Node.js versions (18.x, 20.x, LTS)
- Generates detailed test reports
- Blocks merging of PRs with failing tests
- Comments on PRs with test results

## Local Setup

### Initial Setup
After cloning the repository, run:
```bash
./setup-git-hooks.sh
```

Or manually install the pre-push hook:
```bash
chmod +x .git/hooks/pre-push
```

### Running Tests Locally

Run tests in different modes:

```bash
# Run all tests (headless, parallelized)
npm test

# Run tests with browser visible
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Bypassing Pre-Push Hook (Emergency Only)

If you absolutely need to push without running tests:
```bash
git push --no-verify
```

⚠️ **Use with caution** - this bypasses safety checks and may allow broken code into the repository.

## GitHub Actions Workflow

The workflow is defined in [.github/workflows/playwright.yml](.github/workflows/playwright.yml)

### Triggers
- **Push** to `main` or `master` branch
- **Pull Requests** to `main` or `master` branch

### What It Does
1. Checks out code
2. Sets up Node.js environment
3. Installs dependencies
4. Installs Playwright browsers
5. Runs all tests
6. Uploads test reports and results as artifacts
7. Comments on PRs with test status

### Viewing Results
- Test reports are available in GitHub Actions artifacts
- Each workflow run can be viewed in the **Actions** tab
- PR comments show test results for each Node.js version

## Test Configuration

Tests are configured in:
- `playwright.config.ts` - Playwright configuration
- `tests/` - Test files directory

Key test files:
- `tests/playwright-get-started.spec.ts` - Playwright.dev navigation test
- `tests/validate-all-elements.spec.ts` - Page element validation test

## NPM Scripts

```json
{
  "test": "playwright test",              // Run all tests
  "test:headed": "playwright test --headed",  // Run with visible browser
  "test:debug": "playwright test --debug",    // Run in debug mode
  "test:ui": "playwright test --ui"           // Run with UI mode
}
```

## Troubleshooting

### Pre-push hook not running?
```bash
# Check if hooks are executable
ls -la .git/hooks/pre-push

# Make it executable
chmod +x .git/hooks/pre-push

# Or run the setup script
./setup-git-hooks.sh
```

### Tests pass locally but fail on GitHub?
- Check Node.js version mismatch
- Verify all dependencies are installed: `npm ci`
- Review GitHub Actions artifacts for detailed error messages

### Want to skip hook temporarily?
```bash
git push --no-verify
```

## CI/CD Status Badge

Add this to your README for CI status:
```markdown
[![Playwright Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/playwright.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/playwright.yml)
```

## Best Practices

✅ **Do:**
- Write meaningful test names
- Test user-visible functionality
- Keep tests independent
- Run tests before pushing

❌ **Don't:**
- Use `--no-verify` routinely
- Commit failing tests
- Skip flaky tests without fixing them

## See Also

- [Playwright Documentation](https://playwright.dev)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Project test files in `tests/` directory
