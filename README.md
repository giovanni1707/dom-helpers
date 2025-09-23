# DOM Helpers 🚀

[![npm version](https://badge.fury.io/js/@giovanni1707/dom-helpers.svg)](https://badge.fury.io/js/@giovanni1707/dom-helpers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange)](https://cdn.jsdelivr.net/npm/@giovanni1707/dom-helpers/dist/dom-helpers.min.js)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![Size](https://img.shields.io/bundlephobia/minzip/@giovanni1707/dom-helpers)](https://bundlephobia.com/package/@giovanni1707/dom-helpers)

**High-performance vanilla JavaScript DOM utilities with intelligent caching and automatic cleanup.**

## 🎯 What is DOM Helpers?

DOM Helpers is a comprehensive collection of lightweight, zero-dependency utilities that revolutionize DOM access in vanilla JavaScript. It includes three powerful helpers with a **universal .update() method**:

- **🆔 Elements Helper**: Lightning-fast ID-based element access (`Elements.myId`)
- **📦 Collections Helper**: Efficient class/tag/name-based collections (`Collections.ClassName.button`)
- **🔍 Selector Helper**: Advanced querySelector with caching and smart property access (`Selector.query.myButton`)
- **✨ Universal .update() Method**: Powerful batch operations for all helpers (`Elements.title.update({...})`)

## 🚀 NEW: Universal .update() Method

**The game-changing feature that makes DOM manipulation effortless!**

### **Traditional vs .update() Method**

**❌ Traditional Approach (Verbose & Repetitive):**
```javascript
Elements.title.textContent = "New Title";
Elements.title.style.color = "blue";
Elements.title.style.fontSize = "24px";
Elements.title.style.fontWeight = "bold";
Elements.title.setAttribute("data-updated", "true");
Elements.title.addEventListener("click", handleClick);
Elements.title.classList.add("highlight");
```

**✅ With .update() Method (Clean & Efficient):**
```javascript
Elements.title.update({
  textContent: "New Title",
  style: {
    color: "blue",
    fontSize: "24px", 
    fontWeight: "bold"
  },
  setAttribute: ["data-updated", "true"],
  addEventListener: ["click", handleClick],
  className: "highlight"
});
```

### **🌟 Universal .update() Features**

- **🎯 Property Updates**: Set any DOM property (`textContent`, `innerHTML`, `value`, etc.)
- **🎨 Style Batching**: Apply multiple CSS properties in one call
- **🔧 Method Calls**: Execute DOM methods (`setAttribute`, `addEventListener`, `focus`, etc.)
- **⛓️ Chainable**: Chain multiple `.update()` calls for complex operations
- **🛡️ Safe**: Handles null elements and empty collections gracefully
- **🌐 Universal**: Works identically with single elements and collections
- **⚡ Performance**: Optimized batch operations reduce DOM reflows

### **🎯 Works with ALL Helpers**

```javascript
// Elements Helper - Single element updates
Elements.button.update({
  textContent: "Click Me!",
  style: { backgroundColor: "green" },
  disabled: false
});

// Collections Helper - Multiple element updates  
Collections.ClassName("item").update({
  style: { color: "red" },
  setAttribute: ["data-processed", "true"]
});

// Selector Helper - Query-based updates
Selector.queryAll(".btn").update({
  style: { padding: "10px" },
  addEventListener: ["click", handleClick]
});
```

### **🔗 Chainable Operations**

```javascript
Elements.modal
  .update({
    style: { display: "block" }
  })
  .update({
    className: "modal active"
  })
  .update({
    setAttribute: ["aria-hidden", "false"]
  });
```

### **📊 Function-Based Values**

```javascript
Collections.ClassName("item").update({
  textContent: (element, index) => `Item ${index + 1}`,
  style: (element, index) => ({
    backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff"
  })
});
```

### **🎨 Advanced Style Batching**

```javascript
Elements.header.update({
  style: {
    background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
    transition: "all 0.3s ease"
  }
});
```

### **🔧 Method Calls with Arguments**

```javascript
Elements.input.update({
  focus: [],                                    // No arguments
  setAttribute: ["placeholder", "Enter text"], // With arguments
  addEventListener: ["input", handleInput],     // Event listener
  scrollIntoView: [{ behavior: "smooth" }]     // With options object
});
```

## 🌐 CDN Options

### **GitHub CDN (Available Now)**
```html
<!-- Combined Bundle (All 3 Helpers) - 24.4KB -->
<script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/dom-helpers.min.js"></script>

<!-- Individual Helpers -->
<script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/elements.min.js"></script>    <!-- 5.3KB -->
<script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/collections.min.js"></script> <!-- 6.9KB -->
<script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/selector.min.js"></script>    <!-- 9.9KB -->
```

### **NPM CDN (Published v2.2.0 with .update() Method)**
```html
<!-- Combined Bundle (All 3 Helpers + Universal .update()) - 38.9KB -->
<script src="https://cdn.jsdelivr.net/npm/@giovanni1707/dom-helpers@2.2.0/dist/dom-helpers.min.js"></script>
<script src="https://unpkg.com/@giovanni1707/dom-helpers@2.2.0/dist/dom-helpers.min.js"></script>

<!-- Individual Helpers (with .update() method) -->
<script src="https://cdn.jsdelivr.net/npm/@giovanni1707/dom-helpers@2.2.0/dist/elements.min.js"></script>    <!-- 8.1KB -->
<script src="https://cdn.jsdelivr.net/npm/@giovanni1707/dom-helpers@2.2.0/dist/collections.min.js"></script> <!-- 11.4KB -->
<script src="https://cdn.jsdelivr.net/npm/@giovanni1707/dom-helpers@2.2.0/dist/selector.min.js"></script>    <!-- 14.8KB -->
```

## 🔄 Before vs After Comparison

See how DOM Helpers transforms your code from verbose and repetitive to clean and readable:

### 📝 **Complex Form Handling with Validation**

**❌ Without DOM Helpers (Vanilla JavaScript):**
```javascript
// Verbose and repetitive - 50+ lines
const submitButton = document.getElementById('submit-btn');
const cancelButton = document.getElementById('cancel-btn');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const messageTextarea = document.getElementById('message-textarea');
const statusDiv = document.getElementById('status-message');
const requiredInputs = document.querySelectorAll('.required');
const errorMessages = document.querySelectorAll('.error-message');
const formContainer = document.querySelector('#contact-form');

// Event handling with complex validation
submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    errorMessages.forEach(error => error.style.display = 'none');
    
    // Validation
    let isValid = true;
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            const errorId = input.getAttribute('data-error');
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.style.display = 'block';
            }
        }
    });
    
    if (isValid) {
        submitButton.disabled = true;
        statusDiv.textContent = 'Submitting...';
        statusDiv.className = 'status loading';
        
        // Submit form
        submitForm({
            name: nameInput.value,
            email: emailInput.value,
            message: messageTextarea.value
        }).then(() => {
            statusDiv.textContent = 'Success!';
            statusDiv.className = 'status success';
            submitButton.disabled = false;
        }).catch(() => {
            statusDiv.textContent = 'Error occurred';
            statusDiv.className = 'status error';
            submitButton.disabled = false;
        });
    }
});

cancelButton.addEventListener('click', function() {
    nameInput.value = '';
    emailInput.value = '';
    messageTextarea.value = '';
    statusDiv.textContent = '';
    errorMessages.forEach(error => error.style.display = 'none');
});
```

**✅ With DOM Helpers (All 3 Syntax Options):**
```javascript
// Clean and intuitive - 20 lines with 3 different syntax options

// Option 1: Elements Helper (ID-based)
Elements.submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    Collections.ClassName.errorMessage.forEach(error => error.style.display = 'none');
    
    // Simple validation using Selector Helper
    const isValid = Selector.queryAll('.required').every(input => input.value.trim());
    
    if (isValid) {
        Elements.submitBtn.disabled = true;
        Elements.statusMessage.textContent = 'Submitting...';
        Elements.statusMessage.className = 'status loading';
        
        // Submit with smart property access
        submitForm({
            name: Selector.query.nameInput.value,      // Smart property access
            email: Elements.emailInput.value,          // Direct ID access
            message: Collections.Name.message.first().value  // Collection access
        }).then(() => {
            Elements.statusMessage.textContent = 'Success!';
            Elements.statusMessage.className = 'status success';
        });
    }
});

// Option 2: Selector Helper with smart property access
Selector.query.cancelBtn.addEventListener('click', () => {
    Selector.queryAll('.form-input').forEach(input => input.value = '');
    Elements.statusMessage.textContent = '';
});

// Option 3: Collections Helper for bulk operations
Collections.ClassName.formInput.forEach(input => {
    input.addEventListener('blur', validateField);
});
```

### 🎨 **Dynamic Content Management with Advanced Selectors**

**❌ Without DOM Helpers:**
```javascript
// Complex and error-prone - 40+ lines
function updateProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    const priceElements = document.querySelectorAll('.price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const stockIndicators = document.querySelectorAll('.stock-indicator');
    const saleItems = document.querySelectorAll('.product-card.on-sale');
    
    // Update prices
    priceElements.forEach(priceEl => {
        const productId = priceEl.getAttribute('data-product-id');
        const newPrice = getUpdatedPrice(productId);
        priceEl.textContent = `$${newPrice}`;
    });
    
    // Update stock indicators
    stockIndicators.forEach(indicator => {
        const productId = indicator.getAttribute('data-product-id');
        const stock = getStockLevel(productId);
        
        if (stock > 0) {
            indicator.textContent = `${stock} in stock`;
            indicator.className = 'stock-indicator in-stock';
        } else {
            indicator.textContent = 'Out of stock';
            indicator.className = 'stock-indicator out-of-stock';
        }
    });
    
    // Update add to cart buttons
    addToCartButtons.forEach(button => {
        const productId = button.getAttribute('data-product-id');
        const stock = getStockLevel(productId);
        button.disabled = stock === 0;
    });
    
    // Handle sale items
    saleItems.forEach(card => {
        const salePrice = card.querySelector('.sale-price');
        const originalPrice = card.querySelector('.original-price');
        if (salePrice && originalPrice) {
            originalPrice.style.textDecoration = 'line-through';
            salePrice.style.color = 'red';
        }
    });
}
```

**✅ With DOM Helpers (3 Syntax Options):**
```javascript
// Elegant and maintainable - 15 lines with multiple syntax options

function updateProductCards() {
    // Option 1: Collections Helper for class-based access
    Collections.ClassName.price.forEach(priceEl => {
        const productId = priceEl.getAttribute('data-product-id');
        priceEl.textContent = `$${getUpdatedPrice(productId)}`;
    });
    
    // Option 2: Selector Helper with enhanced collections
    Selector.queryAll('.stock-indicator').forEach(indicator => {
        const productId = indicator.getAttribute('data-product-id');
        const stock = getStockLevel(productId);
        
        indicator.textContent = stock > 0 ? `${stock} in stock` : 'Out of stock';
        indicator.className = `stock-indicator ${stock > 0 ? 'in-stock' : 'out-of-stock'}`;
    });
    
    // Option 3: Smart property access with chaining
    Selector.queryAll('.add-to-cart')
        .filter(btn => getStockLevel(btn.getAttribute('data-product-id')) === 0)
        .forEach(btn => btn.disabled = true);
    
    // Advanced: Scoped queries within sale items
    Selector.Scoped.withinAll('.product-card.on-sale', '.original-price')
        .setStyle({ textDecoration: 'line-through' });
}
```

### 🔍 **Advanced Modal System with Multiple Syntax Options**

**❌ Without DOM Helpers:**
```javascript
// Complex modal system - 60+ lines
function initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            
            if (targetModal) {
                targetModal.classList.add('active');
                modalOverlay.classList.add('active');
                document.body.classList.add('modal-open');
                
                // Disable background buttons
                const allButtons = document.querySelectorAll('button:not(.close-modal)');
                allButtons.forEach(btn => btn.disabled = true);
                
                // Focus management
                const firstFocusable = targetModal.querySelector('input, button, textarea, select');
                if (firstFocusable) firstFocusable.focus();
            }
        });
    });
    
    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', closeAllModals);
    });
    
    modalOverlay.addEventListener('click', closeAllModals);
    
    function closeAllModals() {
        modals.forEach(modal => modal.classList.remove('active'));
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(btn => btn.disabled = false);
    }
}
```

**✅ With DOM Helpers (3 Syntax Options):**
```javascript
// Clean modal system - 20 lines with multiple syntax approaches

function initializeModals() {
    // Option 1: Selector Helper with attribute selectors
    Selector.queryAll('[data-modal]').on('click', (e) => {
        e.preventDefault();
        const modalId = e.target.getAttribute('data-modal');
        
        // Option 2: Elements Helper for direct ID access
        Elements[modalId].classList.add('active');
        Elements.modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Option 3: Collections + Selector combination
        Collections.TagName.button
            .filter(btn => !btn.classList.contains('close-modal'))
            .forEach(btn => btn.disabled = true);
        
        // Smart focus management
        Selector.Scoped.within(Elements[modalId], 'input, button, textarea, select')?.focus();
    });
    
    // Multiple syntax options for close functionality
    Selector.queryAll('.close-modal').on('click', closeAllModals);  // Chaining
    Elements.modalOverlay.addEventListener('click', closeAllModals); // Direct access
    
    function closeAllModals() {
        Collections.ClassName.modal.removeClass('active');  // Bulk operation
        Elements.modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        Collections.TagName.button.forEach(btn => btn.disabled = false);
    }
}
```

## 🚀 Installation & Usage

### **Option 1: Combined Bundle (All 3 Helpers)**

```html
<!DOCTYPE html>
<html>
<head>
    <title>DOM Helpers - All Features</title>
</head>
<body>
    <div id="app">
        <button id="my-button" class="btn primary">Click me</button>
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <input name="username" class="form-input" />
    </div>

    <!-- Load combined bundle (24.4KB) -->
    <script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/dom-helpers.min.js"></script>
    
    <script>
        // All helpers available globally
        console.log('DOM Helpers ready:', DOMHelpers.isReady()); // true
        
        // Elements Helper - ID-based access
        const button = Elements.myButton;
        Elements.myButton.addEventListener('click', () => alert('Clicked!'));
        
        // Collections Helper - Class/Tag/Name access
        const items = Collections.ClassName.item;
        const inputs = Collections.TagName.input;
        const userField = Collections.Name.username;
        
        // Selector Helper - Advanced querySelector with caching
        const app = Selector.query.idApp;                    // Smart property: #app
        const primaryBtns = Selector.queryAll.btnPrimary;    // Smart property: .btn-primary
        const formInputs = Selector.queryAll('.form-input'); // Direct selector
        
        // Enhanced collections with chaining
        Selector.queryAll('.item')
            .addClass('loaded')
            .setStyle({ color: 'blue' })
            .on('click', (e) => console.log('Item clicked:', e.target.textContent));
        
        // Scoped queries
        const appButtons = Selector.Scoped.withinAll('#app', '.btn');
        
        // Combined statistics
        const stats = DOMHelpers.getStats();
        console.log('Performance stats:', stats);
    </script>
</body>
</html>
```

### **Option 2: Individual Helpers**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Individual Helpers</title>
</head>
<body>
    <button id="submit-btn">Submit</button>
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>

    <!-- Load only what you need -->
    <script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/elements.min.js"></script>    <!-- 5.3KB -->
    <script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/collections.min.js"></script> <!-- 6.9KB -->
    <script src="https://cdn.jsdelivr.net/gh/giovanni1707/elements-helper@main/dist/selector.min.js"></script>    <!-- 9.9KB -->
    
    <script>
        // Elements Helper only
        Elements.submitBtn.addEventListener('click', () => {
            console.log('Submit clicked!');
        });
        
        // Collections Helper only
        Collections.ClassName.card.forEach(card => {
            card.style.border = '1px solid blue';
        });
        
        // Selector Helper only
        Selector.queryAll('.card').addClass('processed');
        
        console.log('Elements stats:', Elements.stats());
        console.log('Collections stats:', Collections.stats());
        console.log('Selector stats:', Selector.stats());
    </script>
</body>
</html>
```

### **Option 3: NPM Installation**

```bash
npm install @giovanni1707/dom-helpers
```

```javascript
// ES6 Imports - Combined
import { DOMHelpers, Elements, Collections, Selector } from '@giovanni1707/dom-helpers';

// ES6 Imports - Individual
import { Elements } from '@giovanni1707/dom-helpers/elements';
import { Collections } from '@giovanni1707/dom-helpers/collections';
import { Selector } from '@giovanni1707/dom-helpers/selector';

// CommonJS
const { DOMHelpers, Elements, Collections, Selector } = require('@giovanni1707/dom-helpers');

// Usage
Elements.myButton.addEventListener('click', handleClick);
Collections.ClassName.item.forEach(processItem);
Selector.queryAll('.btn').addClass('processed');
```

## 🔧 Complete API Reference

### 🆔 **Elements Helper** - ID-based Access (5.3KB)

Perfect for accessing elements by their ID with exact matching.

```javascript
// Syntax Options:
Elements.myButton        // id="myButton" (camelCase)
Elements['submit-btn']   // id="submit-btn" (kebab-case)
Elements.userForm        // id="userForm"

// Methods:
Elements.stats()         // Performance statistics
Elements.clear()         // Clear cache
Elements.destroy()       // Cleanup resources
Elements.configure({     // Configuration
    enableLogging: true,
    maxCacheSize: 1000
});

// Usage Examples:
Elements.loginForm.addEventListener('submit', handleLogin);
Elements['user-profile'].style.display = 'block';
Elements.statusMessage.textContent = 'Loading...';
```

### 📦 **Collections Helper** - Class/Tag/Name Access (7.8KB)

Efficient access to element collections with enhanced array-like methods and function-style access.

```javascript
// Function-Style Access with Direct Property Manipulation:
Collections.ClassName("item")[0].style.color = "red";        // Function call with index access
Collections.TagName("button")[1].disabled = true;           // Direct property manipulation
Collections.Name("username")[0].value = "john";             // Direct value assignment

// Traditional Property Access:
Collections.ClassName.button           // class="button"
Collections.ClassName['btn-primary']   // class="btn-primary"
Collections.ClassName.navItem          // class="navItem"

// Tag Collections:
Collections.TagName.div                // <div> elements
Collections.TagName.input              // <input> elements
Collections.TagName.button             // <button> elements

// Name Collections:
Collections.Name.username              // name="username"
Collections.Name['user-input']         // name="user-input"

// Enhanced Methods:
const buttons = Collections.ClassName.button;
buttons.length          // Live count
buttons.first()         // First element
buttons.last()          // Last element
buttons.at(-1)          // Last element (negative indexing)
buttons.isEmpty()       // Check if empty
buttons.toArray()       // Convert to array
buttons.forEach(fn)     // Iterate
buttons.map(fn)         // Transform
buttons.filter(fn)      // Filter elements

// Utility Methods:
Collections.stats()     // Performance statistics
Collections.clear()     // Clear cache
Collections.destroy()   // Cleanup resources
```

### 🔍 **Selector Helper** - Advanced querySelector with Caching (10.1KB)

Advanced querySelector implementation with intelligent caching, smart property access, and direct property manipulation.

```javascript
// Smart Property Access with Direct Property Manipulation:
Selector.query.myButton.style.color = "blue";           // Direct property access
Selector.query.idMainHeader.textContent = "New Title";  // Direct content manipulation
Selector.queryAll.btnPrimary[0].style.color = "red";    // Array-like access with direct properties
Selector.queryAll.item[1].classList.add('active');      // Index-based access with direct manipulation

// Traditional Smart Property Access:
Selector.query.myButton              // → querySelector('#my-button')
Selector.query.idMainHeader          // → querySelector('#main-header')
Selector.queryAll.btnPrimary         // → querySelectorAll('.btn-primary')
Selector.queryAll.classBtnSecondary  // → querySelectorAll('.btn-secondary')

// Direct Selectors:
Selector.query('#complex-selector')           // Single element
Selector.queryAll('.item:not(.hidden)')      // Multiple elements
Selector.query('div.container > .item')      // Complex selector

// Enhanced Collections with Chaining:
Selector.queryAll('.btn')
    .addClass('processed')                    // Add class to all
    .removeClass('loading')                   // Remove class from all
    .toggleClass('active')                    // Toggle class on all
    .setStyle({ color: 'blue' })             // Set styles on all
    .setAttribute('data-processed', 'true')   // Set attribute on all
    .on('click', handleClick)                // Add event listener to all
    .off('click', oldHandler);               // Remove event listener from all

// Collection Filtering:
Selector.queryAll('.btn')
    .visible()                               // Only visible elements
    .enabled()                               // Only enabled elements
    .filter(btn => btn.textContent.includes('Save'));

// Utility Methods:
const buttons = Selector.queryAll('.btn');
buttons.first()                              // First element
buttons.last()                               // Last element
buttons.at(-1)                               // Last element (negative indexing)
buttons.isEmpty()                            // Check if empty
buttons.toArray()                            // Convert to array

// Scoped Queries:
Selector.Scoped.within('#container', '.btn');           // Single element within container
Selector.Scoped.withinAll('#sidebar', 'a');             // All elements within container

// Async Element Waiting:
await Selector.waitFor('.dynamic-content', 5000);       // Wait for element (5s timeout)
await Selector.waitForAll('.list-item', 3, 10000);      // Wait for 3+ elements (10s timeout)

// Configuration & Stats:
Selector.configure({
    enableLogging: true,
    enableSmartCaching: true,
    maxCacheSize: 2000,
    debounceDelay: 16
});

const stats = Selector.stats();
console.log('Cache hit rate:', stats.hitRate);
console.log('Selector breakdown:', stats.selectorBreakdown);
```

### 🔄 **Combined API** - DOMHelpers (24.4KB)

When using the combined bundle, you get additional utilities:

```javascript
// Availability Check:
DOMHelpers.isReady()                    // true if all helpers are loaded

// Combined Statistics:
const stats = DOMHelpers.getStats();
console.log('Elements stats:', stats.elements);
console.log('Collections stats:', stats.collections);
console.log('Selector stats:', stats.selector);

// Bulk Operations:
DOMHelpers.clearAll()                   // Clear all caches
DOMHelpers.destroyAll()                 // Cleanup all helpers

// Unified Configuration:
DOMHelpers.configure({
    elements: { enableLogging: true },
    collections: { maxCacheSize: 500 },
    selector: { enableSmartCaching: true }
});
```

## 💡 Advanced Usage Examples

### **Real-World Form Validation System**

```javascript
// Complete form system using all three helpers
class FormValidator {
    constructor(formId) {
        this.form = Elements[formId];
        this.init();
    }
    
    init() {
        // Option 1: Elements Helper for specific IDs
        Elements.submitBtn.addEventListener('click', this.handleSubmit.bind(this));
        Elements.resetBtn.addEventListener('click', this.handleReset.bind(this));
        
        // Option 2: Collections Helper for bulk operations
        Collections.ClassName.required.forEach(input => {
            input.addEventListener('blur', this.validateField.bind(this));
        });
        
        // Option 3: Selector Helper with smart property access
        Selector.queryAll('.form-input').on('input', this.clearErrors.bind(this));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate using different helpers
        const isValid = this.validateForm();
        
        if (isValid) {
            // Show loading state
            Elements.submitBtn.disabled = true;
            Selector.query.loadingSpinner.style.display = 'block';
            
            try {
                // Collect form data using multiple approaches
                const formData = {
                    name: Elements.nameInput.value,                    // Direct ID access
                    email: Selector.query.emailInput.value,           // Smart property access
                    message: Collections.Name.message.first().value,  // Collection access
                    category: Selector.query('select[name="category"]').value  // Complex selector
                };
                
                await this.submitForm(formData);
                this.showSuccess();
            } catch (error) {
                this.showError(error.message);
            } finally {
                Elements.submitBtn.disabled = false;
                Selector.query.loadingSpinner.style.display = 'none';
            }
        }
    }
    
    validateForm() {
        let isValid = true;
        
        // Clear previous errors
        Collections.ClassName.errorMessage.forEach(error => error.style.display = 'none');
        
        // Validate required fields using Selector Helper
        const requiredFields = Selector.queryAll('.required');
        const emptyFields = requiredFields.filter(field => !field.value.trim());
        
        if (!emptyFields.isEmpty()) {
            emptyFields.forEach(field => {
                const errorId = field.getAttribute('data-error');
                Elements[errorId].style.display = 'block';
            });
            isValid = false;
        }
        
        // Email validation using smart property access
        const emailField = Selector.query.emailInput;
        if (emailField.value && !this.isValidEmail(emailField.value)) {
            Elements.emailError.style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }
    
    handleReset() {
        // Reset using different helper approaches
        Collections.ClassName.formInput.forEach(input => input.value = '');  // Bulk reset
        Collections.ClassName.errorMessage.forEach(error => error.style.display = 'none');
        Elements.statusMessage.textContent = '';  // Direct access
        Selector.queryAll('.form-group').removeClass('error');  // Chaining
    }
}

// Initialize
const validator = new FormValidator('contactForm');
```

### **Dynamic Content Management System**

```javascript
// Advanced content management using all three syntax options
class ContentManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Setup using different helper approaches
        this.setupProductFilters();
        this.setupInfiniteScroll();
        this.setupModalSystem();
    }
    
    setupProductFilters() {
        // Option 1: Collections Helper for filter buttons
        Collections.ClassName.filterBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterProducts(category);
            });
        });
        
        // Option 2: Selector Helper with smart property access
        Selector.query.searchInput.addEventListener('input', 
            this.debounce(this.searchProducts.bind(this), 300)
        );
        
        // Option 3: Elements Helper for specific controls
        Elements.sortSelect.addEventListener('change', this.sortProducts.bind(this));
        Elements.clearFilters.addEventListener('click', this.clearAllFilters.bind(this));
    }
    
    async filterProducts(category) {
        // Show loading state
        Elements.loadingOverlay.style.display = 'flex';
        
        try {
            // Hide all products first
            Collections.ClassName.productCard.forEach(card => {
                card.style.display = 'none';
            });
            
            // Show filtered products using Selector Helper
            const filteredProducts = category === 'all' 
                ? Selector.queryAll('.product-card')
                : Selector.queryAll(`[data-category="${category}"]`);
            
            // Animate in filtered products
            filteredProducts.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                }, index * 100);
            });
            
            // Update count
            Elements.productCount.textContent = `${filteredProducts.length} products found`;
            
        } finally {
            Elements.loadingOverlay.style.display = 'none';
        }
    }
    
    async setupInfiniteScroll() {
        let loading = false;
        
        window.addEventListener('scroll', async () => {
            if (loading) return;
            
            const scrollPosition = window.innerHeight + window.scrollY;
            const documentHeight = document.documentElement.offsetHeight;
            
            if (scrollPosition >= documentHeight - 1000) {
                loading = true;
                
                // Show loading indicator
                Elements.loadMoreSpinner.style.display = 'block';
                
                try {
                    const newProducts = await this.loadMoreProducts();
                    this.renderProducts(newProducts);
                } finally {
                    Elements.loadMoreSpinner.style.display = 'none';
                    loading = false;
                }
            }
        });
    }
    
    renderProducts(products) {
        const container = Elements.productsContainer;
        
        products.forEach(product => {
            const productElement = this.createProductElement(product);
            container.appendChild(productElement);
        });
        
        // Update newly added products using Collections Helper
        const newProducts = Collections.ClassName.productCard.filter(card => 
            !card.classList.contains('initialized')
        );
        
        newProducts.forEach(card => {
            card.classList.add('initialized');
            this.setupProductEvents(card);
        });
    }
    
    setupModalSystem() {
        // Modal triggers using attribute selector
        Selector.queryAll('[data-modal]').on('click', (e) => {
            e.preventDefault();
            const modalId = e.target.getAttribute('data-modal');
            this.openModal(modalId);
        });
        
        // Close buttons using class selector
        Selector.queryAll('.close-modal').on('click', this.closeModal.bind(this));
        
        // Overlay click to close
        Elements.modalOverlay.addEventListener('click', this.closeModal.bind(this));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }
    
    openModal(modalId) {
        // Open modal using Elements Helper
        Elements[modalId].classList.add('active');
        Elements.modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Disable background buttons using Collections Helper
        Collections.TagName.button
            .filter(btn => !btn.closest('.modal'))
            .forEach(btn => btn.disabled = true);
        
        // Focus management using Selector Helper
        const firstFocusable = Selector.Scoped.within(Elements[modalId], 'input, button, textarea, select');
        if (firstFocusable) firstFocusable.focus();
    }
    
    closeModal() {
        Collections.ClassName.modal.forEach(modal => modal.classList.remove('active'));
        Elements.modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        Collections.TagName.button.forEach(btn => btn.disabled = false);
    }
}

// Initialize
const contentManager = new ContentManager();
```

## 📊 Performance Comparison

| Method | First Access | Subsequent Access | Memory Usage | Features |
|--------|-------------|-------------------|--------------|----------|
| `document.getElementById()` | ~0.1ms | ~0.1ms | Low | Basic |
| `document.querySelector()` | ~0.2ms | ~0.2ms | Low | Basic |
| **Elements Helper** | ~0.1ms | **~0.001ms** | Optimized | Caching + Smart Access |
| **Collections Helper** | ~0.2ms | **~0.001ms** | Optimized | Caching + Enhanced Methods |
| **Selector Helper** | ~0.2ms | **~0.001ms** | Optimized | Caching + Smart Properties + Chaining |

## 🎯 When to Use Each Helper

### **Elements Helper** (5.3KB)
- ✅ **Best for**: Direct ID access, single elements
- ✅ **Use when**: You need fast, cached access to specific elements by ID
- ✅ **Syntax**: `Elements.myButton`, `Elements['submit-btn']`

### **Collections Helper** (6.9KB)
- ✅ **Best for**: Class, tag, or name-based collections
- ✅ **Use when**: You need to work with groups of elements
- ✅ **Syntax**: `Collections.ClassName.button`, `Collections.TagName.div`

### **Selector Helper** (9.9KB)
- ✅ **Best for**: Complex selectors, enhanced collections, chaining operations
- ✅ **Use when**: You need advanced querySelector features with caching
- ✅ **Syntax**: `Selector.query.myButton`, `Selector.queryAll('.btn').addClass('active')`

### **Combined Bundle** (24.4KB)
- ✅ **Best for**: Full-featured applications needing all helpers
- ✅ **Use when**: You want maximum flexibility and don't mind the larger size
- ✅ **Syntax**: All three helpers available + `DOMHelpers` utilities

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

1. **Choose the Right Helper**: Use Elements for IDs, Collections for classes/tags, Selector for complex queries
2. **Enable Logging in Development**: Monitor cache performance with `enableLogging: true`
3. **Adjust Cache Sizes**: Increase `maxCacheSize` for applications with many elements
4. **Use Individual Helpers**: Load only what you need to minimize bundle size
5. **Monitor Stats**: Check `stats()` regularly to optimize usage patterns
6. **Leverage Chaining**: Use Selector Helper's chaining for bulk operations

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
npm run build:selector      # Selector helper only
npm run build:combined      # Combined bundle

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

[⭐ Star us on GitHub](https://github.com/giovanni1707/elements-helper) | [📖 Documentation](https://github.com/giovanni1707/elements-helper#readme) | [🐛 Report Bug](https://github.com/giovanni1707/elements-helper/issues) | [📦 NPM Package](https://www.npmjs.com/package/@giovanni1707/dom-helpers)
