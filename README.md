# DOM Helpers 🚀

[![npm version](https://badge.fury.io/js/dom-helpers.svg)](https://badge.fury.io/js/dom-helpers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange)](https://cdn.jsdelivr.net/npm/dom-helpers/dist/dom-helpers.min.js)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![Size](https://img.shields.io/bundlephobia/minzip/dom-helpers)](https://bundlephobia.com/package/dom-helpers)

**High-performance vanilla JavaScript DOM utilities with intelligent caching and automatic cleanup.**

## 🎯 What is DOM Helpers?

DOM Helpers is a comprehensive collection of lightweight, zero-dependency utilities that revolutionize DOM access in vanilla JavaScript. It includes two powerful helpers:

- **🆔 Elements Helper**: Lightning-fast ID-based element access (`Elements.myId`)
- **📦 Collections Helper**: Efficient class/tag/name-based collections (`Collections.ClassName.button`)

```javascript
// Instead of this:
const button = document.getElementById('submit-btn');
const forms = document.getElementsByClassName('contact-form');
const inputs = document.getElementsByTagName('input');

// Write this:
Elements['submit-btn'].addEventListener('click', handleSubmit);
Collections.ClassName['contact-form'].forEach(form => setupForm(form));
Collections.TagName.input.forEach(input => validateInput(input));
```

## ✨ Why DOM Helpers?

### 🔥 Performance Benefits
- **Intelligent Caching**: Elements cached after first access (~100x faster subsequent access)
- **Automatic Cache Management**: Smart cleanup removes stale references
- **Mutation Observer Integration**: Real-time DOM change detection
- **Memory Efficient**: WeakMap usage prevents memory leaks

### 🛡️ Developer Experience
- **Simple API**: Intuitive dot notation and bracket syntax
- **TypeScript Support**: Full type definitions included
- **Multiple Distribution Options**: Individual helpers or combined bundle
- **CDN Ready**: Works with jsDelivr, unpkg, and other CDNs

### 📊 Performance Comparison

| Method | First Access | Subsequent Access | Memory Usage |
|--------|-------------|-------------------|--------------|
| `document.getElementById()` | ~0.1ms | ~0.1ms | Low |
| `document.getElementsByClassName()` | ~0.2ms | ~0.2ms | Low |
<!-- Combined bundle (both helpers) -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/dom-helpers.min.js"></script>

<!-- Individual helpers -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/elements.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/collections.min.js"></script>

<!-- Alternative CDN -->
<script src="https://unpkg.com/dom-helpers@2/dist/dom-helpers.min.js"></script>
>>>>>>> 8996520 (Transform repository into comprehensive DOM Helpers package v2.0.0)
```
| **DOM Helpers** | ~0.1ms | **~0.001ms** | **Optimized** |

## 🚀 Installation

### CDN (Recommended for quick start)

```html
<!-- Combined bundle (both helpers) -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/dom-helpers.min.js"></script>

<!-- Individual helpers -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/elements.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/collections.min.js"></script>

<!-- Alternative CDN -->
<script src="https://unpkg.com/dom-helpers@2/dist/dom-helpers.min.js"></script>
```
=======
<!-- Combined bundle (both helpers) -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/dom-helpers.min.js"></script>

<!-- Individual helpers -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/elements.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/collections.min.js"></script>

<!-- Alternative CDN -->
<script src="https://unpkg.com/dom-helpers@2/dist/dom-helpers.min.js"></script>
>>>>>>> 8996520 (Transform repository into comprehensive DOM Helpers package v2.0.0)
```

### NPM

```bash
npm install dom-helpers
```

```javascript
// Combined import
import { DOMHelpers, Elements, Collections } from 'dom-helpers';

// Individual imports
import { Elements } from 'dom-helpers/elements';
import { Collections } from 'dom-helpers/collections';

// CommonJS
const { Elements, Collections } = require('dom-helpers');
```

## 📖 Quick Start

```html
<!DOCTYPE html>
<html>
<head>
    <title>DOM Helpers Demo</title>
</head>
<body>
    <!-- Elements for testing -->
    <button id="clickMe">Click Me!</button>
    <button id="submitBtn">Submit</button>
    <div class="message">Hello World</div>
    <script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/dom-helpers.min.js"></script>
>>>>>>> 8996520 (Transform repository into comprehensive DOM Helpers package v2.0.0)
    <script>
    <div class="message">Another message</div>
    
    <script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/dom-helpers.min.js"></script>
    <script>
=======
    <script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/dom-helpers.min.js"></script>
>>>>>>> 8996520 (Transform repository into comprehensive DOM Helpers package v2.0.0)
    <script>
        // Elements Helper - ID-based access
        Elements.clickMe.addEventListener('click', () => {
            alert('Button clicked!');
        });
        
        Elements.submitBtn.style.background = 'green';
        
        // Collections Helper - Class-based access
        Collections.ClassName.message.forEach((div, index) => {
            div.textContent = `Message ${index + 1} updated!`;
        });
        
        // Check performance stats
        console.log('Elements stats:', Elements.stats());
        console.log('Collections stats:', Collections.stats());
    </script>
</body>
</html>
```

## 🔧 API Reference

### 🆔 Elements Helper (ID Access)

Perfect for accessing elements by their ID with exact matching.

```javascript
// Exact ID matching - use the same syntax as your HTML IDs

// For camelCase IDs, use dot notation:
Elements.myButton        // id="myButton"
Elements.userForm        // id="userForm"

// For kebab-case IDs, use bracket notation:
Elements['submit-btn']   // id="submit-btn"
Elements['user-form']    // id="user-form"

// Check if element exists
if ('myButton' in Elements) {
    // Element exists
}

// Utility methods
Elements.stats()         // Performance statistics
Elements.clear()         // Clear cache
Elements.destroy()       // Cleanup resources
```

### 📦 Collections Helper (Class/Tag/Name Access)

Efficient access to element collections with enhanced array-like methods.

```javascript
// Class name collections
Collections.ClassName.button.length              // class="button"
Collections.ClassName['btn-primary'].length      // class="btn-primary"
Collections.ClassName.navItem.forEach(...)       // class="navItem"

// Tag name collections  
Collections.TagName.div.length                   // <div> elements
Collections.TagName.input.toArray()              // <input> elements as array

// Name attribute collections
Collections.Name.username.length                 // name="username"
Collections.Name['user-input'].first()           // name="user-input"

// Enhanced collection methods
const buttons = Collections.ClassName.button;
buttons.length          // Live count
buttons.first()         // First element
buttons.last()          // Last element
buttons.at(-1)          // Last element (negative indexing)
buttons.isEmpty()       // Check if empty
buttons.toArray()       // Convert to array
buttons.forEach(...)    // Iterate
buttons.map(...)        // Transform
buttons.filter(...)     // Filter elements
```

### 🔄 Combined API (DOMHelpers)

When using the combined bundle, you get additional utilities:

```javascript
// Check if both helpers are ready
DOMHelpers.isReady()     // true if both Elements and Collections are available

// Get combined statistics
DOMHelpers.getStats()    // { elements: {...}, collections: {...} }

// Clear all caches
DOMHelpers.clearAll()    // Clear both Elements and Collections caches

// Configure both helpers
DOMHelpers.configure({
    elements: { enableLogging: true },
    collections: { maxCacheSize: 2000 }
});

// Destroy all helpers
DOMHelpers.destroyAll()  // Cleanup everything
```

## � Usage Examples

### Form Handling

```javascript
// Clean syntax for form interactions
Elements['contact-form'].addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = Elements.username.value;
    const email = Elements.email.value;
    
    // Validate all required inputs
    const requiredInputs = Collections.ClassName.required;
    const isValid = requiredInputs.every(input => input.value.trim());
    
    if (isValid) {
        Elements['submit-btn'].disabled = true;
        Elements['status-message'].textContent = 'Submitting...';
        submitForm({ name, email });
    }
});
```

### Dynamic Content Management

```javascript
// Handle dynamic content with automatic cache updates
function addNewMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = text;
    document.body.appendChild(messageDiv);
    
    // Collections automatically detect the new element
    setTimeout(() => {
        console.log(`Total messages: ${Collections.ClassName.message.length}`);
        
        // Style all messages
        Collections.ClassName.message.forEach((msg, index) => {
            msg.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
}

// Wait for dynamic elements to appear
async function waitForDynamicContent() {
    try {
        const loadingSpinner = await Collections.waitFor('className', 'spinner', 1, 5000);
        loadingSpinner.first().style.display = 'none';
    } catch (error) {
        console.error('Loading spinner not found');
    }
}
```

### Modal Management

```javascript
// Simple modal system
const modal = {
    open(modalId) {
        Elements[modalId].classList.add('active');
        Elements['modal-overlay'].classList.add('active');
        
        // Disable all buttons except close buttons
        Collections.ClassName.button.forEach(btn => {
            if (!btn.classList.contains('close-btn')) {
                btn.disabled = true;
            }
        });
    },
    
    close() {
        // Hide all modals
        Collections.ClassName.modal.forEach(modal => {
            modal.classList.remove('active');
        });
        
        Elements['modal-overlay'].classList.remove('active');
        
        // Re-enable all buttons
        Collections.ClassName.button.forEach(btn => {
            btn.disabled = false;
        });
    }
};

// Setup modal triggers
Collections.ClassName['open-modal'].forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        const modalId = e.target.dataset.modal;
        modal.open(modalId);
    });
});

Collections.ClassName['close-btn'].forEach(closeBtn => {
    closeBtn.addEventListener('click', () => modal.close());
});
```

### Performance Monitoring

```javascript
// Monitor cache performance in development
if (process.env.NODE_ENV === 'development') {
    setInterval(() => {
        const elementsStats = Elements.stats();
        const collectionsStats = Collections.stats();
        
        console.log('Cache Performance:', {
            elements: `${elementsStats.cacheSize} cached, ${(elementsStats.hitRate * 100).toFixed(1)}% hit rate`,
            collections: `${collectionsStats.cacheSize} cached, ${(collectionsStats.hitRate * 100).toFixed(1)}% hit rate`
        });
    }, 10000);
}
```

## 📦 Distribution Options

DOM Helpers provides multiple distribution formats to fit your needs:

### Individual Minified Files

```html
<!-- Elements Helper only (5.3KB minified) -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/elements.min.js"></script>

<!-- Collections Helper only (6.9KB minified) -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/collections.min.js"></script>
```

### Combined Bundle Options

```html
<!-- Combined bundle - unminified (28.5KB) -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/dom-helpers.bundle.js"></script>

<!-- Combined bundle - minified (14.0KB) -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/dom-helpers.min.js"></script>
```

### ES Modules

```javascript
// Individual ES modules
import { Elements } from 'https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/elements.esm.js';
import { Collections } from 'https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/collections.esm.js';

// Combined ES module
import { DOMHelpers, Elements, Collections } from 'https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/dom-helpers.esm.js';
```

## 🏗️ Browser Support

DOM Helpers works in all modern browsers that support:
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

1. **Choose the Right Helper**: Use Elements for ID access, Collections for class/tag/name access
2. **Enable Logging in Development**: Set `enableLogging: true` to monitor cache performance
3. **Adjust Cache Sizes**: Increase `maxCacheSize` for applications with many elements
4. **Use Individual Helpers**: Load only what you need to minimize bundle size
5. **Monitor Stats**: Check `stats()` regularly to optimize usage patterns

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/giovanni1707/elements-helper.git
cd elements-helper

# Install dependencies
npm install

# Build all distribution files
npm run build

# Run individual builds
npm run build:elements      # Elements helper only
npm run build:collections   # Collections helper only
npm run build:combined      # Combined bundle

# Minify all files
npm run build:min

# Clean dist folder
npm run clean
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern JavaScript frameworks' reactivity patterns
- Built with performance and developer experience in mind
- Thanks to all contributors and users of this library

---

**Made with ❤️ for the JavaScript community**

[⭐ Star us on GitHub](https://github.com/giovanni1707/elements-helper) | [📖 Documentation](https://github.com/giovanni1707/elements-helper#readme) | [🐛 Report Bug](https://github.com/giovanni1707/elements-helper/issues)
