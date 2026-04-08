# Fix npm Dev Server Issues

## Quick Fix (Run these commands in your terminal)

```bash
# 1. Fix npm cache permissions (requires sudo password)
sudo chown -R $(whoami) /Users/franlouco/.npm

# 2. Clean and reinstall
cd /Users/franlouco/Desktop/dev/franlouco-website
rm -rf node_modules package-lock.json .next
npm install

# 3. Start dev server
npm run dev
```

## What was fixed

1. **Added `styled-jsx` to package.json** - This is a required peer dependency of Next.js that was missing
2. **Created `fix-dev.sh` script** - Automated fix script for future issues

## Why this keeps happening

The npm cache directory (`~/.npm`) has root-owned files from a previous npm bug. This prevents npm from writing to its cache, causing installation failures.

## Permanent Solution

After running the fix above, the issue should be resolved. If it happens again, just run:

```bash
sudo chown -R $(whoami) /Users/franlouco/.npm
npm install
```
