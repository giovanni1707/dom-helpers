# Collections Helper Documentation 📦

**High-performance class/tag/name-based DOM collections with intelligent caching**

## Overview

Collections Helper provides efficient access to DOM element collections using `getElementsByClassName`, `getElementsByTagName`, and `getElementsByName` with intelligent caching, enhanced array-like methods, and automatic cleanup.

## Installation

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/collections.min.js"></script>
```

### NPM
```bash
npm install dom-helpers
```

```javascript
import { Collections } from 'dom-helpers/collections';
// or
const { Collections } = require('dom-helpers/collections');
```

## API Reference

### Basic Usage

Collections Helper uses **exact matching** for all collection types:

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
```

### Enhanced Collection Methods

All collections are enhanced with array-like methods:

```javascript
const buttons = Collections.ClassName.button;

// Basic properties
buttons.length          // Live count of elements
buttons[0]              // First element (indexed access)

// Navigation methods
buttons.first()         // First element or null
buttons.last()          // Last element or null
buttons.at(-1)          // Last element (negative indexing)
buttons.isEmpty()       // Check if collection is empty

// Array conversion and iteration
buttons.toArray()       // Convert to regular array
buttons.forEach((btn, index) => {
    btn.style.color = 'blue';
});

// Array-like methods
buttons.map(btn => btn.textContent)
buttons.filter(btn => btn.disabled)
buttons.find(btn => btn.classList.contains('primary'))
buttons.some(btn => btn.disabled)
buttons.every(btn => btn.tagName === 'BUTTON')

// Iteration support
for (const button of buttons) {
    console.log(button.textContent);
}
```

### Utility Methods

#### `Collections.stats()`
Get performance statistics:
```javascript
const stats = Collections.stats();
console.log(`Hit rate: ${(stats.hitRate * 100).toFixed(1)}%`);
console.log(`Cache size: ${stats.cacheSize}`);
```

#### `Collections.clear()`
Clear all caches:
```javascript
Collections.clear();
```

#### `Collections.destroy()`
Cleanup all resources:
```javascript
Collections.destroy();
```

#### `Collections.configure(options)`
Configure the helper:
```javascript
Collections.configure({
    enableLogging: true,
    maxCacheSize: 2000,
    cleanupInterval: 60000
});
```

#### `Collections.isCached(type, value)`
Check if a collection is cached:
```javascript
if (Collections.isCached('className', 'button')) {
    console.log('Button collection is cached');
}
```

#### `Collections.getMultiple(requests)`
Get multiple collections in one operation:
```javascript
const results = Collections.getMultiple([
    { type: 'className', value: 'button', as: 'buttons' },
    { type: 'tagName', value: 'input', as: 'inputs' },
    { type: 'name', value: 'settings', as: 'checkboxes' }
]);

console.log(`Found ${results.buttons.length} buttons`);
console.log(`Found ${results.inputs.length} inputs`);
console.log(`Found ${results.checkboxes.length} checkboxes`);
```

#### `Collections.waitFor(type, value, minCount, timeout)`
Wait for collections to appear:
```javascript
try {
    const buttons = await Collections.waitFor('className', 'dynamic-btn', 2, 5000);
    console.log(`Found ${buttons.length} dynamic buttons`);
} catch (error) {
    console.error('Timeout waiting for dynamic buttons');
}
```

## Configuration Options

```javascript
Collections.configure({
    enableLogging: false,      // Enable console logging
    autoCleanup: true,         // Automatic cache cleanup
    cleanupInterval: 30000,    // Cleanup interval in ms
    maxCacheSize: 1000,        // Maximum cached collections
    debounceDelay: 16         // Mutation observer debounce
});
```

## Examples

### Styling Elements by Class
```javascript
// Style all buttons
Collections.ClassName.button.forEach((btn, index) => {
    btn.style.background = `hsl(${index * 30}, 70%, 50%)`;
    btn.style.margin = '5px';
});

// Style navigation items
Collections.ClassName['nav-item'].forEach(item => {
    item.addEventListener('click', handleNavClick);
});
```

### Form Validation
```javascript
// Validate all required inputs
const requiredInputs = Collections.ClassName.required;
const isValid = requiredInputs.every(input => input.value.trim());

if (!isValid) {
    requiredInputs.filter(input => !input.value.trim())
                  .forEach(input => {
                      input.classList.add('error');
                  });
}

// Handle checkboxes by name
Collections.Name.preferences.forEach(checkbox => {
    checkbox.addEventListener('change', savePreferences);
});
```

### Dynamic Content Management
```javascript
// Add dynamic elements
function addMessage(text) {
    const div = document.createElement('div');
    div.className = 'message';
    div.textContent = text;
    document.body.appendChild(div);
    
    // Collections automatically detect new elements
    setTimeout(() => {
        const messages = Collections.ClassName.message;
        console.log(`Total messages: ${messages.length}`);
        
        // Animate new messages
        messages.forEach((msg, index) => {
            msg.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
}

// Clear all dynamic content
Collections.ClassName['dynamic-item'].forEach(item => {
    item.remove();
});
```

### Modal System
```javascript
// Open modal triggers
Collections.ClassName['open-modal'].forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        const modalId = e.target.dataset.modal;
        document.getElementById(modalId).classList.add('active');
        
        // Disable all buttons except close buttons
        Collections.TagName.button.forEach(btn => {
            if (!btn.classList.contains('close-btn')) {
                btn.disabled = true;
            }
        });
    });
});

// Close modal buttons
Collections.ClassName['close-btn'].forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        // Hide all modals
        Collections.ClassName.modal.forEach(modal => {
            modal.classList.remove('active');
        });
        
        // Re-enable all buttons
        Collections.TagName.button.forEach(btn => {
            btn.disabled = false;
        });
    });
});
```

### Batch Operations
```javascript
// Process multiple collection types
const results = Collections.getMultiple([
    { type: 'className', value: 'card', as: 'cards' },
    { type: 'className', value: 'button', as: 'buttons' },
    { type: 'tagName', value: 'input', as: 'inputs' }
]);

// Apply consistent styling
results.cards.forEach(card => {
    card.style.borderRadius = '8px';
    card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
});

results.buttons.forEach(btn => {
    btn.style.cursor = 'pointer';
});

results.inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = '#007bff';
    });
});
```

## Performance Tips

1. **Use exact matching**: `class="btn-primary"` → `Collections.ClassName['btn-primary']`
2. **Leverage enhanced methods**: Use `.first()`, `.last()`, `.isEmpty()` for better performance
3. **Batch operations**: Use `getMultiple()` for multiple collections
4. **Monitor cache**: Check hit rates with `stats()`
5. **Use appropriate collection type**: ClassName for classes, TagName for tags, Name for name attributes

## Browser Support

- Chrome 49+
- Firefox 18+
- Safari 10+
- Edge 12+

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import { Collections, CollectionsStats, EnhancedCollection } from 'dom-helpers/collections';

const buttons: EnhancedCollection = Collections.ClassName.button;
const stats: CollectionsStats = Collections.stats();
```

## Collection Types

### ClassName Collections
Access elements by their CSS class names:
```javascript
Collections.ClassName.button        // class="button"
Collections.ClassName['btn-lg']     // class="btn-lg"
Collections.ClassName.navItem       // class="navItem"
```

### TagName Collections
Access elements by their HTML tag names:
```javascript
Collections.TagName.div             // <div> elements
Collections.TagName.button          // <button> elements
Collections.TagName.input           // <input> elements
```

### Name Collections
Access elements by their name attribute:
```javascript
Collections.Name.username           // name="username"
Collections.Name['user-prefs']      // name="user-prefs"
Collections.Name.settings           // name="settings"
