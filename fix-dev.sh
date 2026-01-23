#!/bin/bash

# Fix npm cache permissions
echo "Fixing npm cache permissions..."
sudo chown -R $(whoami) "/Users/franlouco/.npm" 2>/dev/null || {
    echo "Please run manually: sudo chown -R $(whoami) /Users/franlouco/.npm"
    exit 1
}

# Clean up
echo "Cleaning up..."
rm -rf node_modules package-lock.json .next

# Reinstall dependencies
echo "Reinstalling dependencies..."
npm install

# Verify styled-jsx is installed (required by Next.js)
if [ ! -d "node_modules/styled-jsx" ]; then
    echo "Installing styled-jsx (Next.js peer dependency)..."
    npm install styled-jsx
fi

echo "Done! You can now run 'npm run dev'"
