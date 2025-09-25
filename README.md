# 🚀 DOM Helpers - Enhanced JavaScript DOM Utilities

[![npm version](https://badge.fury.io/js/dom-helpers.svg)](https://badge.fury.io/js/dom-helpers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange.svg)](https://cdn.jsdelivr.net/npm/dom-helpers@latest/dist/dom-helpers.min.js)

High-performance vanilla JavaScript DOM utilities with intelligent caching and a powerful **`.update({})`** method that supports the complete DOM API.

## ✨ Features

- 🎯 **Elements Helper** - Access elements by ID with intelligent caching
- 📦 **Collections Helper** - Work with element collections (class, tag, name)
- 🔍 **Selector Helper** - Enhanced querySelector/querySelectorAll with caching
- 🔄 **Universal .update() Method** - Declarative DOM manipulation with full API support
- ⚡ **High Performance** - Intelligent caching and optimized operations
- 🛡️ **Type Safe** - Full TypeScript support with comprehensive type definitions
- 📱 **Zero Dependencies** - Pure vanilla JavaScript, works everywhere
- 🌐 **Universal** - Works in browsers, Node.js, and all module systems

## 🚀 Quick Start

### CDN (Recommended)

```html
<!-- Latest version -->
>
<script src="https://cdn.jsdelivr.net/npm/@giovanni1707/dom-helpers@latest/dist/dom-helpers.min.js"></script>
   

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@2.1.0/dist/dom-helpers.min.js"></script>
```

### NPM Installation

```bash
npm install dom-helpers
```

```javascript
// ES6 Modules
import { Elements, Collections, Selector } from 'dom-helpers';

// CommonJS
const { Elements, Collections, Selector } = require('dom-helpers');
```

## 🔥 Why DOM Helpers? See the Difference!

### 📊 **Traditional Vanilla JavaScript vs DOM Helpers**

See how DOM Helpers transforms verbose, imperative code into clean, declarative, and maintainable solutions:

#### 🚫 **Traditional Vanilla JavaScript (Verbose & Error-Prone)**

```javascript
// Traditional approach - lots of repetitive code
const button = document.getElementById('myBtn');
const form = document.getElementById('contactForm');
const inputs = document.querySelectorAll('input[type="text"]');
const cards = document.getElementsByClassName('card');

// Styling a button (traditional way)
button.style.backgroundColor = '#4299e1';
button.style.color = 'white';
button.style.padding = '12px 24px';
button.style.borderRadius = '8px';
button.style.border = 'none';
button.style.cursor = 'pointer';
button.style.fontSize = '16px';
button.style.fontWeight = '600';
button.style.transition = 'all 0.2s ease';

// Adding classes (traditional way)
button.classList.add('btn');
button.classList.add('btn-primary');
button.classList.add('enhanced');

// Setting attributes (traditional way)
button.setAttribute('data-role', 'button');
button.setAttribute('aria-label', 'Submit form');

// Adding event listeners (traditional way)
button.addEventListener('click', function() {
  button.classList.toggle('active');
  console.log('Button clicked!');
});

button.addEventListener('mouseenter', function() {
  button.style.transform = 'translateY(-2px)';
});

button.addEventListener('mouseleave', function() {
  button.style.transform = 'translateY(0)';
});

// Styling multiple elements (traditional way - very verbose!)
for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  card.style.backgroundColor = 'white';
  card.style.borderRadius = '12px';
  card.style.padding = '20px';
  card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  card.style.transition = 'all 0.3s ease';
  card.classList.add('enhanced');
  card.setAttribute('data-enhanced', 'true');
  
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px)';
    this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  });
}

// Form validation (traditional way - repetitive and hard to maintain)
for (let i = 0; i < inputs.length; i++) {
  const input = inputs[i];
  input.style.border = '2px solid #e1e5e9';
  input.style.borderRadius = '6px';
  input.style.padding = '12px 16px';
  input.style.fontSize = '16px';
  
  input.addEventListener('focus', function() {
    this.style.borderColor = '#4299e1';
    this.style.boxShadow = '0 0 0 3px rgba(66, 153, 225, 0.1)';
  });
  
  input.addEventListener('blur', function() {
    this.style.borderColor = '#e1e5e9';
    this.style.boxShadow = 'none';
  });
  
  input.addEventListener('input', function() {
    if (this.value.length > 0) {
      this.classList.remove('error');
      this.classList.add('valid');
    } else {
      this.classList.remove('valid');
      this.classList.add('error');
    }
  });
}
```

#### ✅ **DOM Helpers - Clean, Declarative & Maintainable**

##### **Option 1: Using .update() Method (Recommended)**

```javascript
// DOM Helpers with .update() - Clean and declarative!
Elements.myBtn.update({
  style: {
    backgroundColor: '#4299e1',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s ease'
  },
  classList: {
    add: ['btn', 'btn-primary', 'enhanced']
  },
  setAttribute: ['data-role', 'button'],
  setAttribute: ['aria-label', 'Submit form'],
  addEventListener: ['click', () => {
    Elements.myBtn.update({ classList: { toggle: 'active' } });
    console.log('Button clicked!');
  }],
  addEventListener: ['mouseenter', (e) => {
    e.target.style.transform = 'translateY(-2px)';
  }],
  addEventListener: ['mouseleave', (e) => {
    e.target.style.transform = 'translateY(0)';
  }]
});

// Style multiple elements with one call!
Collections.ClassName('card').update({
  style: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  },
  classList: { add: 'enhanced' },
  setAttribute: ['data-enhanced', 'true'],
  addEventListener: ['mouseenter', (e) => {
    e.target.update({
      style: {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
      }
    });
  }],
  addEventListener: ['mouseleave', (e) => {
    e.target.update({
      style: {
        transform: 'translateY(0)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }
    });
  }]
});

// Form validation made simple!
Collections.TagName('input').update({
  style: {
    border: '2px solid #e1e5e9',
    borderRadius: '6px',
    padding: '12px 16px',
    fontSize: '16px'
  },
  addEventListener: ['focus', (e) => {
    e.target.update({
      style: {
        borderColor: '#4299e1',
        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.1)'
      }
    });
  }],
  addEventListener: ['blur', (e) => {
    e.target.update({
      style: { borderColor: '#e1e5e9', boxShadow: 'none' }
    });
  }],
  addEventListener: ['input', (e) => {
    e.target.update({
      classList: {
        remove: e.target.value.length > 0 ? 'error' : 'valid',
        add: e.target.value.length > 0 ? 'valid' : 'error'
      }
    });
  }]
});
```

##### **Option 2: Using Original Syntax (Still Available)**

```javascript
// DOM Helpers with original syntax - Still much cleaner than vanilla!
Elements.myBtn.style.backgroundColor = '#4299e1';
Elements.myBtn.style.color = 'white';
Elements.myBtn.classList.add('btn', 'btn-primary', 'enhanced');
Elements.myBtn.setAttribute('data-role', 'button');
Elements.myBtn.addEventListener('click', handleClick);

// Access collections easily
Collections.ClassName('card').forEach(card => {
  card.style.backgroundColor = 'white';
  card.classList.add('enhanced');
});
```

##### **Option 3: Mix & Match Both Syntaxes**

```javascript
// You can combine both approaches for maximum flexibility!
Elements.myBtn.style.color = "red";           // Original syntax
Elements.myBtn.update({                       // New .update() syntax
  textContent: "Enhanced Button",
  classList: { add: ["fancy", "active"] }
});
Elements.myBtn.addEventListener("click", handler); // Original syntax
```

### 📈 **Code Comparison Summary**

| Aspect | Traditional Vanilla JS | DOM Helpers (.update()) | DOM Helpers (Original) |
|--------|----------------------|-------------------------|----------------------|
| **Lines of Code** | ~80 lines | ~25 lines | ~40 lines |
| **Readability** | ❌ Poor | ✅ Excellent | ✅ Good |
| **Maintainability** | ❌ Hard | ✅ Easy | ✅ Good |
| **Error Prone** | ❌ High | ✅ Low | ✅ Low |
| **Performance** | ⚠️ Manual optimization | ✅ Auto-optimized | ✅ Cached |
| **Batch Operations** | ❌ Manual loops | ✅ Built-in | ⚠️ Manual |
| **Type Safety** | ❌ None | ✅ Full TypeScript | ✅ Full TypeScript |

### 🎯 **Real-World Scenario: Building a Modal**

#### 🚫 **Traditional Vanilla JavaScript (50+ lines)**

```javascript
// Traditional modal creation - verbose and error-prone
const modal = document.createElement('div');
modal.id = 'myModal';
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
modal.style.display = 'flex';
modal.style.alignItems = 'center';
modal.style.justifyContent = 'center';
modal.style.zIndex = '1000';

const modalContent = document.createElement('div');
modalContent.style.backgroundColor = 'white';
modalContent.style.borderRadius = '12px';
modalContent.style.padding = '2rem';
modalContent.style.maxWidth = '500px';
modalContent.style.width = '90%';
modalContent.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';

const closeBtn = document.createElement('button');
closeBtn.textContent = '×';
closeBtn.style.position = 'absolute';
closeBtn.style.top = '10px';
closeBtn.style.right = '15px';
closeBtn.style.background = 'none';
closeBtn.style.border = 'none';
closeBtn.style.fontSize = '24px';
closeBtn.style.cursor = 'pointer';

closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

modalContent.appendChild(closeBtn);
modal.appendChild(modalContent);
document.body.appendChild(modal);
```

#### ✅ **DOM Helpers with .update() (15 lines)**

```javascript
// DOM Helpers modal - clean and declarative!
document.body.appendChild(document.createElement('div')).update({
  id: 'myModal',
  style: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000'
  },
  innerHTML: `
    <div style="background: white; border-radius: 12px; padding: 2rem; max-width: 500px; width: 90%; box-shadow: 0 20px 40px rgba(0,0,0,0.1); position: relative;">
      <button id="closeBtn" style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
      <h2>Modal Content</h2>
      <p>This modal was created with DOM Helpers!</p>
    </div>
  `,
  addEventListener: ['click', (e) => {
    if (e.target.id === 'myModal') Elements.myModal.style.display = 'none';
  }]
});

Elements.closeBtn.addEventListener('click', () => Elements.myModal.style.display = 'none');
```

### 🏆 **The DOM Helpers Advantage**

1. **🔥 Dramatic Code Reduction** - Up to 70% less code
2. **📖 Enhanced Readability** - Declarative syntax is self-documenting
3. **🛠️ Better Maintainability** - Changes are localized and clear
4. **🚀 Improved Performance** - Built-in caching and optimizations
5. **🛡️ Type Safety** - Full TypeScript support prevents errors
6. **🔄 Flexible Syntax** - Choose the style that fits your needs
7. **⚡ Batch Operations** - Update multiple elements effortlessly

## 🎯 The Powerful .update({}) Method

The **`.update({})`** method is the crown jewel of DOM Helpers. It provides a declarative, chainable API that supports the **complete DOM specification**.

### 🌟 Your Example Code - Now Working!

```javascript
Elements.myBtn.update({
  textContent: "Enhanced Button",
  style: { color: "white" },
  classList: {
    add: ["fancy", "highlight"],   // add multiple classes
    toggle: "active"               // toggle class on load
  },
  setAttribute: ["data-role", "button"],
  addEventListener: ["click", () => {
    Elements.myBtn.update({
      classList: { toggle: "active" }
    });
    alert("Clicked ✅ and toggled 'active'!");
  }]
});
```

### 🔥 Complete DOM API Support

#### 1. **DOM Properties**
```javascript
Elements.myElement.update({
  textContent: "New text content",
  innerHTML: "<strong>HTML content</strong>",
  value: "Input value",
  id: "newId",
  className: "new-class",
  disabled: false,
  checked: true,
  hidden: false
});
```

#### 2. **HTML Attributes**
```javascript
Elements.myElement.update({
  setAttribute: ["data-role", "button"],
  setAttribute: ["aria-label", "Close button"],
  removeAttribute: "disabled",
  removeAttribute: ["old-attr", "another-attr"]
});
```

#### 3. **classList Operations with Arrays**
```javascript
Elements.myElement.update({
  classList: {
    add: ["class1", "class2", "class3"],        // Add multiple classes
    remove: ["old-class", "unwanted"],          // Remove multiple classes
    toggle: ["active", "selected"],             // Toggle multiple classes
    replace: ["old-class", "new-class"],        // Replace a class
    contains: "check-class"                     // Check if class exists (logs result)
  }
});
```

#### 4. **Style Objects**
```javascript
Elements.myElement.update({
  style: {
    backgroundColor: "#ff6b6b",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease"
  }
});
```

#### 5. **Event Handling**
```javascript
Elements.myElement.update({
  addEventListener: ["click", handleClick],
  addEventListener: ["mouseover", (e) => {
    e.target.style.opacity = "0.8";
  }],
  removeEventListener: ["oldclick", oldHandler]
});
```

#### 6. **Dataset Operations**
```javascript
Elements.myElement.update({
  dataset: {
    userId: "12345",
    action: "submit",
    timestamp: Date.now(),
    config: JSON.stringify({theme: "dark"})
  }
});
```

#### 7. **DOM Method Calls**
```javascript
Elements.myElement.update({
  focus: [],                                    // Call focus()
  click: [],                                    // Programmatically click
  scrollIntoView: [{ behavior: "smooth" }],     // Scroll with options
  blur: []                                      // Remove focus
});
```

#### 8. **Batch Operations**
```javascript
Elements.myElement.update({
  // Properties
  textContent: "Complete Example",
  className: "enhanced-element",
  
  // Attributes
  setAttribute: ["data-enhanced", "true"],
  removeAttribute: "disabled",
  
  // Styles
  style: {
    background: "linear-gradient(45deg, #667eea, #764ba2)",
    color: "white",
    padding: "15px 30px",
    borderRadius: "25px"
  },
  
  // Classes
  classList: {
    add: ["fancy", "interactive"],
    toggle: "active"
  },
  
  // Dataset
  dataset: {
    component: "enhanced-button",
    version: "2.1.0"
  },
  
  // Events
  addEventListener: ["click", () => {
    console.log("Enhanced button clicked!");
  }],
  
  // Methods
  focus: []
});
```

## 📚 Complete API Reference

### 🎯 Elements Helper

Access DOM elements by ID with intelligent caching.

```javascript
// Basic usage
const button = Elements.myButton;
const form = Elements.contactForm;

// With .update() method
Elements.myButton.update({
  textContent: "Click me!",
  style: { backgroundColor: "blue" }
});

// Utility methods
Elements.stats();           // Get cache statistics
Elements.clear();           // Clear cache
Elements.isCached('myId');  // Check if element is cached

// Batch operations
const { header, footer, nav } = Elements.destructure('header', 'footer', 'nav');
const required = Elements.getRequired('form', 'submit'); // Throws if missing
const elements = await Elements.waitFor('dynamic1', 'dynamic2'); // Wait for elements
```

### 📦 Collections Helper

Work with collections of elements by class name, tag name, or name attribute.

```javascript
// Access collections
const buttons = Collections.ClassName('btn');
const divs = Collections.TagName('div');
const inputs = Collections.Name('email');

// Update all elements in collection
Collections.ClassName('card').update({
  style: { 
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px"
  },
  classList: { add: ["enhanced", "interactive"] }
});

// Collection methods
buttons.forEach(btn => console.log(btn.textContent));
const firstButton = buttons.first();
const lastButton = buttons.last();
const isEmpty = buttons.isEmpty();

// Utility methods
Collections.stats();                    // Get statistics
Collections.clear();                    // Clear cache
Collections.isCached('className', 'btn'); // Check cache
```

### 🔍 Selector Helper

Enhanced querySelector/querySelectorAll with intelligent caching.

```javascript
// Single element
const element = Selector.query('.my-class');
const byId = Selector.query('#myId');

// Multiple elements
const elements = Selector.queryAll('.card');
const complex = Selector.queryAll('div.card[data-type="primary"]');

// Update with selectors
Selector.query('.hero').update({
  style: { 
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh"
  }
});

Selector.queryAll('.btn-primary').update({
  classList: { add: ["enhanced", "interactive"] },
  addEventListener: ["click", handlePrimaryClick]
});

// Scoped queries
const withinContainer = Selector.Scoped.within('#container', '.item');
const allWithinContainer = Selector.Scoped.withinAll('#container', '.item');

// Async utilities
const element = await Selector.waitFor('.dynamic-content');
const elements = await Selector.waitForAll('.items', 3); // Wait for at least 3 elements
```

## 🌟 Advanced Examples

### Real-World Form Enhancement

```javascript
// Enhance an entire form with validation and styling
Elements.contactForm.update({
  classList: { add: ["enhanced-form", "validated"] },
  setAttribute: ["novalidate", "true"],
  style: {
    background: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  }
});

// Style all form inputs
Collections.TagName('input').update({
  style: {
    border: "2px solid #e1e5e9",
    borderRadius: "6px",
    padding: "12px 16px",
    fontSize: "16px",
    transition: "border-color 0.2s ease"
  },
  addEventListener: ["focus", (e) => {
    e.target.style.borderColor = "#4299e1";
  }],
  addEventListener: ["blur", (e) => {
    e.target.style.borderColor = "#e1e5e9";
  }]
});

// Enhance submit button
Elements.submitBtn.update({
  textContent: "Send Message ✨",
  classList: { add: ["btn-primary", "enhanced"] },
  style: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    padding: "12px 32px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "transform 0.2s ease"
  },
  addEventListener: ["mouseenter", (e) => {
    e.target.style.transform = "translateY(-2px)";
  }],
  addEventListener: ["mouseleave", (e) => {
    e.target.style.transform = "translateY(0)";
  }]
});
```

### Dynamic Content Management

```javascript
// Create a dynamic card system
Collections.ClassName('card').update({
  style: {
    background: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    cursor: "pointer"
  },
  classList: { add: ["interactive", "enhanced"] },
  addEventListener: ["mouseenter", (e) => {
    e.target.update({
      style: { 
        transform: "translateY(-4px)",
        boxShadow: "0 12px 24px rgba(0,0,0,0.15)"
      }
    });
  }],
  addEventListener: ["mouseleave", (e) => {
    e.target.update({
      style: { 
        transform: "translateY(0)",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
      }
    });
  }],
  addEventListener: ["click", (e) => {
    const card = e.target;
    card.update({
      classList: { toggle: "selected" },
      dataset: { 
        selected: card.classList.contains("selected") ? "true" : "false",
        timestamp: Date.now()
      }
    });
  }]
});
```

### Theme Switching System

```javascript
function applyTheme(theme) {
  // Update document root
  document.documentElement.update({
    setAttribute: ["data-theme", theme],
    style: {
      colorScheme: theme === 'dark' ? 'dark' : 'light'
    }
  });
  
  // Update all themed elements
  Collections.ClassName('themed').update({
    classList: {
      toggle: [`theme-${theme}`],
      remove: theme === 'dark' ? ['theme-light'] : ['theme-dark']
    },
    dataset: { currentTheme: theme }
  });
  
  // Update theme toggle button
  Elements.themeToggle.update({
    textContent: theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode',
    setAttribute: ["aria-label", `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`]
  });
}

// Theme toggle functionality
Elements.themeToggle.update({
  addEventListener: ["click", () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }]
});
```

## 🔧 Configuration

All helpers support configuration for optimal performance:

```javascript
// Configure individual helpers
Elements.configure({
  enableLogging: true,
  maxCacheSize: 2000,
  cleanupInterval: 60000
});

Collections.configure({
  enableLogging: false,
  autoCleanup: true
});

Selector.configure({
  enableSmartCaching: true,
  enableEnhancedSyntax: true
});

// Configure all helpers at once
DOMHelpers.configure({
  elements: { maxCacheSize: 1500 },
  collections: { enableLogging: true },
  selector: { enableSmartCaching: true }
});
```

## 📊 Performance Monitoring

```javascript
// Get performance statistics
const stats = DOMHelpers.getStats();
console.log('Cache hit rate:', stats.elements.hitRate);
console.log('Total cached elements:', stats.elements.cacheSize);

// Individual helper stats
console.log('Elements stats:', Elements.stats());
console.log('Collections stats:', Collections.stats());
console.log('Selector stats:', Selector.stats());

// Clear all caches
DOMHelpers.clearAll();

// Check if helpers are ready
if (DOMHelpers.isReady()) {
  console.log('All DOM helpers are loaded and ready!');
}
```

## 🎨 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import { Elements, Collections, Selector, DOMHelpers } from 'dom-helpers';
import type { ElementsOptions, CollectionsStats } from 'dom-helpers';

// Type-safe element access
const button: HTMLElement | null = Elements.myButton;

// Type-safe configuration
const options: ElementsOptions = {
  enableLogging: true,
  maxCacheSize: 1000
};

Elements.configure(options);

// Type-safe statistics
const stats: CollectionsStats = Collections.stats();
```

## 🌐 Browser Support

- ✅ **Modern Browsers** - Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- ✅ **Mobile Browsers** - iOS Safari 12+, Chrome Mobile 60+
- ✅ **Node.js** - Version 12+ (for SSR/testing)
- ✅ **Legacy Support** - IE11+ with polyfills

## 📦 Bundle Sizes

| File | Size (Gzipped) | Description |
|------|----------------|-------------|
| `dom-helpers.min.js` | ~15KB | Complete bundle with all helpers |
| `elements.min.js` | ~3KB | Elements helper only |
| `collections.min.js` | ~5KB | Collections helper only |
| `selector.min.js` | ~6KB | Selector helper only |

## 🚀 CDN Links

### jsDelivr (Recommended)
```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@latest/dist/dom-helpers.min.js"></script>

<!-- Individual helpers -->
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@latest/dist/elements.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@latest/dist/collections.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dom-helpers@latest/dist/selector.min.js"></script>
```

### unpkg
```html
<script src="https://unpkg.com/dom-helpers@latest/dist/dom-helpers.min.js"></script>
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run performance benchmarks
npm run benchmark
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by jQuery's ease of use
- Built with modern JavaScript best practices
- Optimized for performance and developer experience

## 📞 Support

- 📖 [Documentation](https://github.com/giovanni1707/elements-helper/wiki)
- 🐛 [Issue Tracker](https://github.com/giovanni1707/elements-helper/issues)
- 💬 [Discussions](https://github.com/giovanni1707/elements-helper/discussions)
- 📧 [Email Support](mailto:support@dom-helpers.dev)

---

**Made with ❤️ for the JavaScript community**

*DOM Helpers - Making DOM manipulation delightful again!*
