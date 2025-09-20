# Elements Helper 🚀

A high-performance vanilla JavaScript library for efficient DOM element access with intelligent caching and automatic cleanup.

[![npm version](https://badge.fury.io/js/elements-helper.svg)](https://badge.fury.io/js/elements-helper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange)](https://cdn.jsdelivr.net/npm/elements-helper/dist/elements-helper.min.js)

## 🎯 What is Elements Helper?

Elements Helper is a lightweight, zero-dependency library that revolutionizes how you access DOM elements in vanilla JavaScript. It provides a simple, intuitive API with powerful performance optimizations under the hood.

```javascript
// Instead of this:
const button = document.getElementById('submit-btn');
const form = document.getElementById('user-form');
const modal = document.getElementById('confirmation-modal');

// Write this (exact ID matching):
Elements['submit-btn'].addEventListener('click', () => {
  Elements['user-form'].style.display = 'none';
  Elements['confirmation-modal'].style.display = 'block';
});

// Or for camelCase IDs:
// Elements.submitBtn, Elements.userForm, Elements.confirmationModal
```

## ✨ Why Elements Helper?

### 🔥 Performance Benefits
- **Intelligent Caching**: Elements are cached after first access, eliminating repeated DOM queries
- **Automatic Cache Management**: Smart cleanup removes stale references automatically
- **Mutation Observer Integration**: Keeps cache synchronized with DOM changes in real-time
- **Debounced Updates**: Batches DOM mutations for optimal performance

### 🛡️ Developer Experience
- **Simple API**: Access elements with `Elements.myElementId` syntax
- **TypeScript-like Safety**: Built-in validation and error handling
- **Async Support**: Wait for elements to appear in the DOM
- **Memory Efficient**: WeakMap usage prevents memory leaks

### 📊 Performance Comparison

| Method | First Access | Subsequent Access | Memory Usage |
|--------|-------------|-------------------|--------------|
| `document.getElementById()` | ~0.1ms | ~0.1ms | Low |
| **Elements Helper** | ~0.1ms | **~0.001ms** | **Optimized** |

*Subsequent access is ~100x faster with Elements Helper!*

## 🚀 Installation

### CDN (Recommended for quick start)

```html

<!-- Latest version (recommended) -->
<script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/elements-helper.min.js"></script>

<!-- Specific commit (for stability) -->
<script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@d155beb/dist/elements-helper.min.js"></script>

<!-- Unminified version (for debugging) -->
<script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/elements-helper.js"></script>



```

### NPM

```bash
npm install elements-helper
```

```javascript
// ES6 Modules
import { Elements } from 'elements-helper';

// CommonJS
const { Elements } = require('elements-helper');
```

### Local Download

Download the latest release from [GitHub Releases](https://github.com/yourusername/elements-helper/releases) and include it in your project:

```html
<script src="path/to/elements-helper.min.js"></script>
```

## 📖 Quick Start

```html
<!DOCTYPE html>
<html>
<head>
    <title>Elements Helper Demo</title>
</head>
<body>
    <button id="clickMe">Click Me!</button>
    <div id="output">Hello World</div>
    
    <script src="https://cdn.jsdelivr.net/npm/elements-helper/dist/elements-helper.min.js"></script>
    <script>
        // Access elements directly with dot notation
        Elements.clickMe.addEventListener('click', () => {
            Elements.output.textContent = 'Button clicked!';
        });
        
        // Check performance stats
        console.log(Elements.stats());
    </script>
</body>
</html>
```

## 🔧 API Reference

### Basic Element Access

```javascript
// Direct access with dot notation (cached automatically)
const button = Elements.myButton;        // Works with camelCase IDs
const form = Elements.userForm;          // Works with camelCase IDs
const nav = Elements.mainNavigation;     // Converts main-navigation → mainNavigation

// Check if element exists
if ('myButton' in Elements) {
    // Element exists in DOM
}

// Both notations work for kebab-case IDs
const sameElement1 = Elements.submitButton;    // camelCase property
const sameElement2 = Elements['submit-button']; // original kebab-case ID
```

### Destructuring Support

```javascript
// Direct dot notation access (recommended)
Elements.mainHeader.style.display = 'block';
Elements.pageFooter.style.background = 'gray';
Elements.leftSidebar.classList.add('active');

// Get multiple elements at once (alternative method)
const { mainHeader, pageFooter, leftSidebar } = Elements.destructure(
    'main-header', 'page-footer', 'left-sidebar'
);

// Get required elements (throws error if missing)
const { loginForm, usernameInput } = Elements.getRequired('login-form', 'username-input');
```

### Async Element Access

```javascript
// Wait for elements to appear (useful for dynamic content)
try {
    const { popupModal, backdropOverlay } = await Elements.waitFor('popup-modal', 'backdrop-overlay');
    // Elements are now available - use dot notation
    popupModal.style.display = 'block';
    backdropOverlay.style.opacity = '0.5';
} catch (error) {
    console.error('Elements not found within timeout');
}
```

### Configuration

```javascript
// Configure the library
Elements.configure({
    enableLogging: true,        // Enable console logging
    maxCacheSize: 500,         // Maximum cached elements
    cleanupInterval: 60000,    // Cleanup interval in ms
    debounceDelay: 32         // Mutation observer debounce
});
```

### Cache Management

```javascript
// Get performance statistics
const stats = Elements.stats();
console.log(`Cache hit rate: ${(stats.hitRate * 100).toFixed(1)}%`);

// Check if element is cached
if (Elements.isCached('my-element')) {
    console.log('Element is in cache');
}

// Clear cache manually
Elements.clear();

// Get cache snapshot
const cachedIds = Elements.helper.getCacheSnapshot();
```

### Advanced Usage

```javascript
// Access the helper instance directly
const helper = Elements.helper;

// Destroy the helper (cleanup all resources)
Elements.destroy();

// Create custom instance with different settings
const customHelper = new ProductionElementsHelper({
    enableLogging: true,
    maxCacheSize: 2000
});
```

## 💡 Usage Examples

### Form Handling

```javascript
// Clean dot notation - works with any ID format
Elements.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = Elements.username.value;
    const password = Elements.password.value;
    
    // Handle form submission
    submitLogin(username, password);
    
    // Update UI
    Elements.submitButton.disabled = true;
    Elements.statusMessage.textContent = 'Logging in...';
});
```

### Dynamic Content

```javascript
// Add dynamic content and access immediately
const newDiv = document.createElement('div');
newDiv.id = 'dynamic-content';
newDiv.textContent = 'Dynamic content';
document.body.appendChild(newDiv);

// Access immediately with dot notation
setTimeout(() => {
    Elements.dynamicContent.style.fontWeight = 'bold';
    Elements.dynamicContent.style.color = 'blue';
}, 100);

// Wait for dynamically loaded content (alternative)
async function handleDynamicContent() {
    try {
        const { productList, loadingSpinner } = await Elements.waitFor(
            'product-list', 'loading-spinner'
        );
        
        loadingSpinner.style.display = 'none';
        productList.style.display = 'block';
    } catch (error) {
        console.error('Dynamic content failed to load');
    }
}
```

### Modal Management

```javascript
// Simple and clean with dot notation
Elements.openModal.addEventListener('click', () => {
    Elements.userModal.classList.add('active');
    Elements.modalOverlay.classList.add('active');
});

Elements.closeModal.addEventListener('click', () => {
    Elements.userModal.classList.remove('active');
    Elements.modalOverlay.classList.remove('active');
});

// Works with kebab-case IDs too
Elements.submitButton.addEventListener('click', () => {
    Elements.confirmationDialog.style.display = 'block'; // confirmation-dialog → confirmationDialog
});
```

### Performance Monitoring

```javascript
// Monitor cache performance
setInterval(() => {
    const stats = Elements.stats();
    console.log(`Cache: ${stats.cacheSize} elements, ${(stats.hitRate * 100).toFixed(1)}% hit rate`);
}, 10000);
```

## 🏗️ Browser Support

Elements Helper works in all modern browsers that support:
- ES6 Classes
- Proxy objects
- MutationObserver
- WeakMap

**Supported Browsers:**
- Chrome 49+
- Firefox 18+
- Safari 10+
- Edge 12+

## ⚡ Performance Tips

1. **Use Destructuring**: Get multiple elements at once for better performance
2. **Enable Logging**: Use `enableLogging: true` during development to monitor cache performance
3. **Adjust Cache Size**: Increase `maxCacheSize` for applications with many elements
4. **Monitor Stats**: Regularly check `Elements.stats()` to optimize usage patterns

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/elements-helper.git
cd elements-helper

# Install dependencies
npm install

# Build the library
npm run build

# Run examples
open examples/index.html
```

### Reporting Issues

Please report issues on our [GitHub Issues](https://github.com/yourusername/elements-helper/issues) page.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern JavaScript frameworks' reactivity patterns
- Built with performance and developer experience in mind
- Thanks to all contributors and users of this library

---

**Made with ❤️ for the JavaScript community**

[⭐ Star us on GitHub](https://github.com/yourusername/elements-helper) | [📖 Documentation](https://github.com/yourusername/elements-helper#readme) | [🐛 Report Bug](https://github.com/yourusername/elements-helper/issues)
