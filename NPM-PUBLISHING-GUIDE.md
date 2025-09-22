# NPM Publishing Guide

This guide will help you publish your DOM Helpers library to NPM.

## 📋 Pre-Publishing Checklist

✅ **Package prepared with scoped name**: `@giovanni1707/dom-helpers`  
✅ **Build files generated**: All distribution files are ready  
✅ **Documentation complete**: README, docs, and examples created  
✅ **Repository pushed**: All changes committed to GitHub  

## 🚀 Step-by-Step Publishing Process

### Step 1: Create NPM Account (if you don't have one)
1. Go to [npmjs.com](https://www.npmjs.com/)
2. Click "Sign Up" and create an account with username `giovanni1707`
3. Verify your email address

### Step 2: Login to NPM
Run this command in your terminal:
```bash
npm login
```
Enter your NPM credentials:
- **Username**: `giovanni1707`
- **Password**: Your NPM password
- **Email**: Your email address
- **One-time password**: If you have 2FA enabled

### Step 3: Verify Login
```bash
npm whoami
```
Should return: `giovanni1707`

### Step 4: Test the Package
```bash
# Test the build process
npm run build

# Check what files will be published
npm pack --dry-run
```

### Step 5: Publish to NPM
```bash
# For scoped packages, you need to specify public access
npm publish --access public
```

## 📦 After Publishing

### Verify Publication
```bash
# Check your published package
npm view @giovanni1707/dom-helpers

# Install and test your package
npm install @giovanni1707/dom-helpers
```

### Update CDN URLs
After successful publication, your package will be available via:

#### **NPM CDN URLs**
```html
<!-- Combined Bundle -->
<script src="https://cdn.jsdelivr.net/npm/@giovanni1707/dom-helpers@2/dist/dom-helpers.min.js"></script>
<script src="https://unpkg.com/@giovanni1707/dom-helpers@2/dist/dom-helpers.min.js"></script>

<!-- Individual Helpers -->
<script src="https://cdn.jsdelivr.net/npm/@giovanni1707/dom-helpers@2/dist/elements.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@giovanni1707/dom-helpers@2/dist/collections.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@giovanni1707/dom-helpers@2/dist/selector.min.js"></script>
```

#### **GitHub CDN URLs** (Alternative)
```html
<!-- Combined Bundle -->
<script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/dom-helpers.min.js"></script>

<!-- Individual Helpers -->
<script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/elements.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/collections.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/selector.min.js"></script>
```

## 💡 Usage Examples After Publishing

### NPM Installation
```bash
npm install @giovanni1707/dom-helpers
```

### ES6 Imports
```javascript
// Import combined bundle
import { DOMHelpers, Elements, Collections, Selector } from '@giovanni1707/dom-helpers';

// Import individual helpers
import { Elements } from '@giovanni1707/dom-helpers/elements';
import { Collections } from '@giovanni1707/dom-helpers/collections';
import { Selector } from '@giovanni1707/dom-helpers/selector';
```

### CommonJS Require
```javascript
// Combined bundle
const { DOMHelpers, Elements, Collections, Selector } = require('@giovanni1707/dom-helpers');

// Individual helpers
const { Elements } = require('@giovanni1707/dom-helpers/elements');
const { Collections } = require('@giovanni1707/dom-helpers/collections');
const { Selector } = require('@giovanni1707/dom-helpers/selector');
```

### CDN Usage
```html
<!DOCTYPE html>
<html>
<head>
    <title>DOM Helpers from NPM CDN</title>
</head>
<body>
    <div id="app">
        <button id="my-button" class="btn">Click me</button>
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
    </div>

    <!-- Load from NPM CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@giovanni1707/dom-helpers@2/dist/dom-helpers.min.js"></script>
    
    <script>
        // All helpers available globally
        const button = Elements.myButton;
        const items = Collections.ClassName.item;
        const app = Selector.query.idApp;
        
        console.log('DOM Helpers ready:', DOMHelpers.isReady());
        console.log('Button:', button);
        console.log('Items:', items.length);
        console.log('App:', app);
    </script>
</body>
</html>
```

## 🔄 Publishing Updates

### Version Updates
```bash
# Patch version (2.0.0 → 2.0.1)
npm version patch

# Minor version (2.0.0 → 2.1.0)
npm version minor

# Major version (2.0.0 → 3.0.0)
npm version major

# Then publish
npm publish --access public
```

### Automatic Publishing with GitHub Actions
You can set up automatic publishing when you push tags:

Create `.github/workflows/publish.yml`:
```yaml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. Package Name Already Taken
```bash
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/dom-helpers
```
**Solution**: Use scoped package name `@giovanni1707/dom-helpers` (already done)

#### 2. Not Logged In
```bash
npm ERR! need auth This command requires you to be logged in.
```
**Solution**: Run `npm login` first

#### 3. Permission Denied for Scoped Package
```bash
npm ERR! 402 Payment Required
```
**Solution**: Add `--access public` flag for scoped packages

#### 4. Build Files Missing
```bash
npm WARN tar ENOENT: no such file or directory, open 'dist/dom-helpers.min.js'
```
**Solution**: Run `npm run build` before publishing

### Verification Commands
```bash
# Check package info
npm view @giovanni1707/dom-helpers

# Check package files
npm view @giovanni1707/dom-helpers files

# Check package versions
npm view @giovanni1707/dom-helpers versions --json

# Download and inspect package
npm pack @giovanni1707/dom-helpers
tar -tf giovanni1707-dom-helpers-2.0.0.tgz
```

## 📊 Package Statistics

After publishing, you can track your package:
- **NPM Page**: https://www.npmjs.com/package/@giovanni1707/dom-helpers
- **Download Stats**: https://npm-stat.com/charts.html?package=@giovanni1707/dom-helpers
- **Bundle Size**: https://bundlephobia.com/package/@giovanni1707/dom-helpers

## 🎯 Next Steps After Publishing

1. **Update README**: Add NPM installation instructions
2. **Create Release**: Tag a release on GitHub
3. **Share**: Announce your package on social media
4. **Monitor**: Watch for issues and feedback
5. **Maintain**: Keep dependencies updated

## 📞 Support

If you encounter issues:
1. Check [NPM Documentation](https://docs.npmjs.com/)
2. Visit [NPM Support](https://www.npmjs.com/support)
3. Check your package at https://www.npmjs.com/package/@giovanni1707/dom-helpers

---

**Ready to publish?** Follow the steps above and your DOM Helpers library will be available to developers worldwide! 🌍
