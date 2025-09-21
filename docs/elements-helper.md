# Elements Helper Documentation 🆔

**Lightning-fast ID-based DOM element access with intelligent caching**

## Overview

Elements Helper provides a simple, high-performance way to access DOM elements by their ID using exact matching. It uses intelligent caching and automatic cleanup to deliver ~100x faster subsequent access compared to native DOM methods.

## Installation

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/elements.min.js"></script>
```

### NPM
```bash
npm install dom-helpers
```

```javascript
import { Elements } from 'dom-helpers/elements';
// or
const { Elements } = require('dom-helpers/elements');
```

## API Reference

### Basic Usage

Elements Helper uses **exact ID matching** - no automatic conversions:

```javascript
// For camelCase IDs, use dot notation:
Elements.myButton        // id="myButton"
Elements.userForm        // id="userForm"
Elements.submitBtn       // id="submitBtn"

// For kebab-case IDs, use bracket notation:
Elements['submit-btn']   // id="submit-btn"
Elements['user-form']    // id="user-form"
Elements['nav-menu']     // id="nav-menu"

// Check if element exists
if ('myButton' in Elements) {
    // Element exists
}
```

### Methods

#### `Elements.stats()`
Get performance statistics:
```javascript
const stats = Elements.stats();
console.log(`Hit rate: ${(stats.hitRate * 100).toFixed(1)}%`);
console.log(`Cache size: ${stats.cacheSize}`);
```

#### `Elements.clear()`
Clear the cache manually:
```javascript
Elements.clear();
```

#### `Elements.destroy()`
Cleanup all resources:
```javascript
Elements.destroy();
```

#### `Elements.configure(options)`
Configure the helper:
```javascript
Elements.configure({
    enableLogging: true,
    maxCacheSize: 2000,
    cleanupInterval: 60000
});
```

#### `Elements.isCached(id)`
Check if an element is cached:
```javascript
if (Elements.isCached('myButton')) {
    console.log('Element is cached');
}
```

#### `Elements.destructure(...ids)`
Get multiple elements at once:
```javascript
const { loginForm, username, password } = Elements.destructure(
    'loginForm', 'username', 'password'
);
```

#### `Elements.getRequired(...ids)`
Get required elements (throws if missing):
```javascript
try {
    const { form, input } = Elements.getRequired('form', 'input');
    // All elements found
} catch (error) {
    console.error('Required elements missing:', error.message);
}
```

#### `Elements.waitFor(...ids)`
Wait for elements to appear:
```javascript
try {
    const { modal, overlay } = await Elements.waitFor('modal', 'overlay');
    // Elements are now available
} catch (error) {
    console.error('Timeout waiting for elements');
}
```

## Configuration Options

```javascript
Elements.configure({
    enableLogging: false,      // Enable console logging
    autoCleanup: true,         // Automatic cache cleanup
    cleanupInterval: 30000,    // Cleanup interval in ms
    maxCacheSize: 1000,        // Maximum cached elements
    debounceDelay: 16         // Mutation observer debounce
});
```

## Examples

### Form Handling
```javascript
Elements['contact-form'].addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = Elements.username.value;
    const email = Elements.email.value;
    
    if (name && email) {
        Elements['submit-btn'].disabled = true;
        Elements['status-message'].textContent = 'Submitting...';
        submitForm({ name, email });
    }
});
```

### Modal Management
```javascript
Elements.openModal.addEventListener('click', () => {
    Elements['user-modal'].classList.add('active');
    Elements['modal-overlay'].classList.add('active');
});

Elements.closeModal.addEventListener('click', () => {
    Elements['user-modal'].classList.remove('active');
    Elements['modal-overlay'].classList.remove('active');
});
```

### Dynamic Content
```javascript
// Add dynamic content
const newDiv = document.createElement('div');
newDiv.id = 'dynamic-content';
document.body.appendChild(newDiv);

// Access immediately (cache updates automatically)
setTimeout(() => {
    Elements['dynamic-content'].style.color = 'blue';
}, 100);
```

## Performance Tips

1. **Use exact ID matching**: `id="submit-btn"` → `Elements['submit-btn']`
2. **Enable logging in development**: Monitor cache performance
3. **Use destructuring**: Get multiple elements efficiently
4. **Monitor stats**: Check hit rates regularly

## Browser Support

- Chrome 49+
- Firefox 18+
- Safari 10+
- Edge 12+

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import { Elements, ElementsStats, ElementsOptions } from 'dom-helpers/elements';

const stats: ElementsStats = Elements.stats();
