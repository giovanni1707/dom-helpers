# Selector Helper Documentation

The Selector Helper provides a high-performance, cached implementation of `querySelector` and `querySelectorAll` with intelligent caching, smart property access, and enhanced collections.

## Features

- **Intelligent Caching**: Automatic caching with DOM mutation detection
- **Smart Property Access**: Use camelCase properties for common selectors
- **Enhanced Collections**: Rich array-like methods for query results
- **Scoped Queries**: Query within specific containers
- **Async Waiting**: Wait for elements to appear in the DOM
- **Performance Monitoring**: Built-in statistics and cache management

## Installation

### CDN (Recommended)
```html
<!-- Individual Selector Helper -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2/dist/selector.min.js"></script>

<!-- Or via unpkg -->
<script src="https://unpkg.com/dom-helpers@2/dist/selector.min.js"></script>
```

### NPM
```bash
npm install dom-helpers
```

```javascript
// ES6 Import
import { Selector } from 'dom-helpers/selector';

// CommonJS
const { Selector } = require('dom-helpers/selector');
```

## Basic Usage

### Simple Queries

```javascript
// Traditional way
const button = document.querySelector('#my-button');
const items = document.querySelectorAll('.list-item');

// With Selector Helper
const button = Selector.query('#my-button');
const items = Selector.queryAll('.list-item');
```

### Smart Property Access

```javascript
// Access elements using camelCase properties
const myButton = Selector.query.myButton;        // → #my-button
const navItems = Selector.queryAll.navItem;      // → .nav-item

// ID shortcuts
const header = Selector.query.idMainHeader;      // → #main-header
const footer = Selector.query.idPageFooter;      // → #page-footer

// Class shortcuts  
const buttons = Selector.queryAll.classBtnPrimary; // → .btn-primary
const cards = Selector.queryAll.classCard;         // → .card

// Direct selectors still work
const complex = Selector.query('div.container > .item:first-child');
```

### Enhanced Collections

```javascript
const items = Selector.queryAll('.item');

// Array-like methods
items.forEach(item => console.log(item.textContent));
const texts = items.map(item => item.textContent);
const visible = items.filter(item => item.offsetParent !== null);

// Utility methods
const first = items.first();
const last = items.last();
const isEmpty = items.isEmpty();

// DOM manipulation
items.addClass('processed')
     .setStyle({ color: 'blue' })
     .on('click', handleClick);

// Filtering helpers
const visibleItems = items.visible();
const enabledItems = items.enabled();
```

## Advanced Features

### Scoped Queries

```javascript
// Query within a specific container
const container = document.querySelector('#main-content');

// Single element within container
const title = Selector.Scoped.within(container, 'h1');
const title2 = Selector.Scoped.within('#main-content', 'h1');

// Multiple elements within container
const links = Selector.Scoped.withinAll(container, 'a');
const buttons = Selector.Scoped.withinAll('#sidebar', '.btn');
```

### Async Element Waiting

```javascript
// Wait for element to appear
try {
  const dynamicElement = await Selector.waitFor('.dynamic-content', 5000);
  console.log('Element appeared:', dynamicElement);
} catch (error) {
  console.log('Element did not appear within timeout');
}

// Wait for multiple elements
try {
  const items = await Selector.waitForAll('.list-item', 3, 10000);
  console.log(`Found ${items.length} items`);
} catch (error) {
  console.log('Not enough elements found');
}
```

### Configuration

```javascript
// Configure the helper
Selector.configure({
  enableLogging: true,        // Enable console logging
  maxCacheSize: 2000,        // Maximum cache entries
  cleanupInterval: 60000,    // Cache cleanup interval (ms)
  enableSmartCaching: true,  // Enable mutation observer
  debounceDelay: 32         // Debounce delay for mutations (ms)
});
```

## Performance Monitoring

### Statistics

```javascript
// Get performance statistics
const stats = Selector.stats();
console.log(stats);
/*
{
  hits: 150,
  misses: 45,
  cacheSize: 32,
  hitRate: 0.769,
  uptime: 45000,
  selectorBreakdown: {
    id: 25,
    class: 18,
    tag: 12,
    complex: 10
  }
}
*/
```

### Cache Management

```javascript
// Clear cache manually
Selector.clear();

// Check if selector is cached
const isCached = Selector.helper.cache.has('single:#my-button');

// Get cache size
const cacheSize = Selector.helper.cache.size;
```

## Collection Methods Reference

### Array-like Methods
- `forEach(callback)` - Execute function for each element
- `map(callback)` - Create array with results of calling function
- `filter(callback)` - Create array with elements that pass test
- `find(callback)` - Find first element that passes test
- `some(callback)` - Test if at least one element passes test
- `every(callback)` - Test if all elements pass test
- `reduce(callback, initial)` - Reduce collection to single value

### Utility Methods
- `first()` - Get first element
- `last()` - Get last element
- `at(index)` - Get element at index (supports negative)
- `isEmpty()` - Check if collection is empty
- `toArray()` - Convert to regular array

### DOM Manipulation
- `addClass(className)` - Add class to all elements
- `removeClass(className)` - Remove class from all elements
- `toggleClass(className)` - Toggle class on all elements
- `setProperty(prop, value)` - Set property on all elements
- `setAttribute(attr, value)` - Set attribute on all elements
- `setStyle(styles)` - Set styles on all elements
- `on(event, handler)` - Add event listener to all elements
- `off(event, handler)` - Remove event listener from all elements

### Filtering Helpers
- `visible()` - Get only visible elements
- `hidden()` - Get only hidden elements
- `enabled()` - Get only enabled elements
- `disabled()` - Get only disabled elements

### Nested Queries
- `within(selector)` - Query within each element of collection

## Examples

### Form Handling
```javascript
// Get form elements
const form = Selector.query.idContactForm;
const inputs = Selector.queryAll.within(form, 'input, textarea');
const submitBtn = Selector.query.idSubmitBtn;

// Validate and style
const invalidInputs = inputs.filter(input => !input.validity.valid);
invalidInputs.addClass('error');

// Handle submission
submitBtn.addEventListener('click', () => {
  const formData = inputs.toArray().reduce((data, input) => {
    data[input.name] = input.value;
    return data;
  }, {});
});
```

### Dynamic Content
```javascript
// Wait for dynamic content to load
async function loadDynamicContent() {
  try {
    // Wait for container to appear
    const container = await Selector.waitFor('.dynamic-container');
    
    // Wait for at least 5 items to load
    const items = await Selector.waitForAll('.dynamic-item', 5);
    
    // Process items
    items.addClass('loaded')
         .setStyle({ opacity: '1' })
         .on('click', handleItemClick);
         
  } catch (error) {
    console.error('Failed to load dynamic content:', error);
  }
}
```

### Performance Optimization
```javascript
// Configure for high-performance scenarios
Selector.configure({
  maxCacheSize: 5000,
  cleanupInterval: 30000,
  enableSmartCaching: true
});

// Monitor performance
setInterval(() => {
  const stats = Selector.stats();
  if (stats.hitRate < 0.8) {
    console.warn('Low cache hit rate:', stats.hitRate);
  }
}, 60000);
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Tips

1. **Use specific selectors**: More specific selectors cache better
2. **Leverage smart properties**: `Selector.query.myButton` is optimized
3. **Batch operations**: Use collection methods for multiple elements
4. **Monitor cache**: Check hit rates and adjust cache size if needed
5. **Use scoped queries**: Limit search scope when possible

## API Reference

### Main API
- `Selector.query` - Single element queries (Proxy)
- `Selector.queryAll` - Multiple element queries (Proxy)
- `Selector.Scoped.within(container, selector)` - Scoped single query
- `Selector.Scoped.withinAll(container, selector)` - Scoped multiple query
- `Selector.waitFor(selector, timeout)` - Async single element wait
- `Selector.waitForAll(selector, minCount, timeout)` - Async multiple wait
- `Selector.configure(options)` - Configure helper
- `Selector.stats()` - Get performance statistics
- `Selector.clear()` - Clear cache
- `Selector.destroy()` - Destroy helper

### Configuration Options
- `enableLogging: boolean` - Enable console logging (default: false)
- `autoCleanup: boolean` - Enable automatic cleanup (default: true)
- `cleanupInterval: number` - Cleanup interval in ms (default: 30000)
- `maxCacheSize: number` - Maximum cache entries (default: 1000)
- `debounceDelay: number` - Mutation debounce delay (default: 16)
- `enableSmartCaching: boolean` - Enable mutation observer (default: true)
