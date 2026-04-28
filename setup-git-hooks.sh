#!/bin/bash

# Git hooks setup script
# Run this to install pre-push hook for local test execution

set -e

HOOKS_DIR=".git/hooks"
REPO_HOOKS_DIR=".githooks"

echo "🔧 Setting up Git hooks..."
echo "=========================="

# Create .githooks directory if it doesn't exist
mkdir -p "$REPO_HOOKS_DIR"

# Copy pre-push hook
if [ ! -f "$HOOKS_DIR/pre-push" ]; then
    cp "$REPO_HOOKS_DIR/pre-push" "$HOOKS_DIR/pre-push" 2>/dev/null || {
        echo "Note: pre-push hook already exists in .git/hooks"
    }
fi

# Make hooks executable
chmod +x "$HOOKS_DIR"/* 2>/dev/null || true

# Configure Git to use hooks directory
git config core.hooksPath "$REPO_HOOKS_DIR" 2>/dev/null || true

echo ""
echo "✅ Git hooks setup complete!"
echo "=========================="
echo ""
echo "Pre-push hook is now active:"
echo "- Tests will run before each push"
echo "- Push will be blocked if tests fail"
echo "- Use 'git push --no-verify' to bypass (use with caution)"
echo ""
