# CDN Usage Guide

This guide shows you how to use the DOM Helpers library via CDN, both as individual helpers and as a combined bundle.

## 🌐 CDN Options

### Combined Bundle (All Helpers)
Use this when you want all three helpers: Elements, Collections, and Selector.

```html
<!-- jsDelivr (Recommended) -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/dom-helpers.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/dom-helpers@2/dist/dom-helpers.min.js"></script>
```

**Size:** 24.4KB minified (includes all three helpers)

### Individual Helpers
Use these when you only need specific functionality:

#### Elements Helper (ID-based access)
```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/elements.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/dom-helpers@2/dist/elements.min.js"></script>
```
**Size:** 5.3KB minified

#### Collections Helper (Class/Tag/Name access)
```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/collections.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/dom-helpers@2/dist/collections.min.js"></script>
```
**Size:** 6.9KB minified

#### Selector Helper (querySelector with caching)
```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/selector.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/dom-helpers@2/dist/selector.min.js"></script>
```
**Size:** 9.9KB minified

## 📋 Usage Examples

### Combined Bundle Usage

```html
<!DOCTYPE html>
<html>
<head>
    <title>DOM Helpers - Combined</title>
</head>
<body>
    <div id="my-container">
        <button id="my-button" class="btn primary">Click me</button>
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
    </div>

    <!-- Load combined bundle -->
    <script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/dom-helpers.min.js"></script>
    
    <script>
        // All helpers are available globally
        console.log('DOM Helpers ready:', DOMHelpers.isReady()); // true
        
        // Elements Helper
        const button = Elements.myButton;
        console.log('Button:', button);
        
        // Collections Helper
        const items = Collections.ClassName.item;
        console.log('Items:', items.length);
        
        // Selector Helper
        const container = Selector.query.idMyContainer;
        const buttons = Selector.queryAll('.btn');
        console.log('Container:', container);
        console.log('Buttons:', buttons.length);
        
        // Combined statistics
        const stats = DOMHelpers.getStats();
        console.log('Combined stats:', stats);
        
        // Configure all helpers at once
        DOMHelpers.configure({
            elements: { enableLogging: true },
            collections: { maxCacheSize: 500 },
            selector: { enableSmartCaching: true }
        });
    </script>
</body>
</html>
```

### Individual Helper Usage

#### Elements Helper Only
```html
<!DOCTYPE html>
<html>
<head>
    <title>Elements Helper Only</title>
</head>
<body>
    <button id="submit-btn">Submit</button>
    <div id="content">Content</div>

    <script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/elements.min.js"></script>
    
    <script>
        // Only Elements helper is available
        const submitBtn = Elements.submitBtn;
        const content = Elements.content;
        
        submitBtn.addEventListener('click', () => {
            content.textContent = 'Clicked!';
        });
        
        console.log('Elements stats:', Elements.stats());
    </script>
</body>
</html>
```

#### Collections Helper Only
```html
<!DOCTYPE html>
<html>
<head>
    <title>Collections Helper Only</title>
</head>
<body>
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <button class="btn">Button 1</button>
    <button class="btn">Button 2</button>

    <script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/collections.min.js"></script>
    
    <script>
        // Only Collections helper is available
        const cards = Collections.ClassName.card;
        const buttons = Collections.ClassName.btn;
        
        cards.forEach(card => {
            card.style.border = '1px solid blue';
        });
        
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('Button clicked:', btn.textContent);
            });
        });
        
        console.log('Collections stats:', Collections.stats());
    </script>
</body>
</html>
```

#### Selector Helper Only
```html
<!DOCTYPE html>
<html>
<head>
    <title>Selector Helper Only</title>
</head>
<body>
    <div id="app">
        <h1 class="title">My App</h1>
        <button class="btn primary">Primary</button>
        <button class="btn secondary">Secondary</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/selector.min.js"></script>
    
    <script>
        // Only Selector helper is available
        const app = Selector.query.idApp;
        const title = Selector.query.title;
        const buttons = Selector.queryAll.btn;
        
        console.log('App:', app);
        console.log('Title:', title);
        console.log('Buttons:', buttons.length);
        
        // Enhanced collection methods
        buttons.addClass('loaded')
               .on('click', (e) => {
                   console.log('Clicked:', e.target.textContent);
               });
        
        // Scoped queries
        const primaryBtn = Selector.Scoped.within(app, '.btn.primary');
        console.log('Primary button:', primaryBtn);
        
        console.log('Selector stats:', Selector.stats());
    </script>
</body>
</html>
```

## 🎯 When to Use What

### Use Combined Bundle When:
- You need multiple types of DOM access (IDs, classes, and complex selectors)
- Building a comprehensive web application
- You want the convenience of having all helpers available
- Bundle size is not a critical concern (24.4KB is still quite small)

### Use Individual Helpers When:
- You only need specific functionality
- Optimizing for minimal bundle size
- Building lightweight components or widgets
- You have specific performance requirements

## 🚀 Performance Comparison

| Helper | Size | Use Case | Performance |
|--------|------|----------|-------------|
| **Elements** | 5.3KB | ID-based access | Fastest for IDs |
| **Collections** | 6.9KB | Class/Tag/Name access | Optimized for collections |
| **Selector** | 9.9KB | Complex selectors | Cached querySelector |
| **Combined** | 24.4KB | All functionality | Best overall flexibility |

## 🔧 Advanced Configuration

### Combined Bundle Configuration
```javascript
// Configure all helpers with specific options
DOMHelpers.configure({
    // Elements Helper options
    elements: {
        enableLogging: true,
        maxCacheSize: 1000,
        autoCleanup: true
    },
    
    // Collections Helper options
    collections: {
        enableLogging: false,
        maxCacheSize: 500,
        cleanupInterval: 30000
    },
    
    // Selector Helper options
    selector: {
        enableLogging: true,
        enableSmartCaching: true,
        debounceDelay: 16
    }
});

// Get combined statistics
const stats = DOMHelpers.getStats();
console.log('Elements stats:', stats.elements);
console.log('Collections stats:', stats.collections);
console.log('Selector stats:', stats.selector);

// Clear all caches
DOMHelpers.clearAll();

// Destroy all helpers
DOMHelpers.destroyAll();
```

### Individual Helper Configuration
```javascript
// Configure individual helpers
Elements.configure({ enableLogging: true });
Collections.configure({ maxCacheSize: 500 });
Selector.configure({ enableSmartCaching: true });

// Individual statistics
console.log('Elements:', Elements.stats());
console.log('Collections:', Collections.stats());
console.log('Selector:', Selector.stats());
```

## 📚 Documentation Links

- [Elements Helper Documentation](docs/elements-helper.md)
- [Collections Helper Documentation](docs/collections-helper.md)
- [Selector Helper Documentation](docs/selector-helper.md)

## 🌟 Live Examples

- [Combined Bundle Demo](examples/complete-demo.html)
- [Elements Helper Demo](examples/index.html)
- [Collections Helper Demo](examples/shopping-list-app.html)
- [Selector Helper Demo](examples/selector-demo.html)

## 📦 NPM Installation

If you prefer NPM over CDN:

```bash
npm install dom-helpers
```

```javascript
// Import individual helpers
import { Elements } from 'dom-helpers/elements';
import { Collections } from 'dom-helpers/collections';
import { Selector } from 'dom-helpers/selector';

// Import combined bundle
import { DOMHelpers, Elements, Collections, Selector } from 'dom-helpers';
```

## 🔗 GitHub Repository

- **Repository:** [https://github.com/giovanni1707/elements-helper](https://github.com/giovanni1707/elements-helper)
- **Issues:** [https://github.com/giovanni1707/elements-helper/issues](https://github.com/giovanni1707/elements-helper/issues)
- **Releases:** [https://github.com/giovanni1707/elements-helper/releases](https://github.com/giovanni1707/elements-helper/releases)
