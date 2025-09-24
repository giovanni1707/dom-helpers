/**
 * Enhanced Universal Update Utility for DOM Helpers
 * Provides a comprehensive .update({}) method with full DOM API support
 * 
 * Features:
 * - All DOM element properties (textContent, innerHTML, id, etc.)
 * - HTML DOM attributes (setAttribute, getAttribute, removeAttribute, etc.)
 * - classList methods (add, remove, toggle, contains) with array support
 * - HTML DOM Style objects (direct CSS property updates)
 * - Event handling (addEventListener, removeEventListener)
 * - Works with Element objects, HTMLCollection, NodeList, and DOMTokenList
 * - Chainable - returns the element or collection
 * - Safe - handles null elements and empty collections gracefully
 */

(function(global) {
  'use strict';

  /**
   * Enhanced Update Implementation
   * This function can be applied to any element or collection
   */
  function createEnhancedUpdateMethod(context, isCollection = false) {
    return function update(updates = {}) {
      // Safety check - if no updates provided, return context for chaining
      if (!updates || typeof updates !== 'object') {
        console.warn('[DOM Helpers] .update() called with invalid updates object');
        return context;
      }

      // Handle single element updates
      if (!isCollection) {
        return updateSingleElement(context, updates);
      }

      // Handle collection updates
      return updateCollection(context, updates);
    };
  }

  /**
   * Update a single DOM element
   */
  function updateSingleElement(element, updates) {
    // Safety check - if element doesn't exist, log warning and return null for chaining
    if (!element || !element.nodeType) {
      console.warn('[DOM Helpers] .update() called on null or invalid element');
      return element;
    }

    try {
      // Process each update
      Object.entries(updates).forEach(([key, value]) => {
        applyEnhancedUpdate(element, key, value);
      });
    } catch (error) {
      console.warn(`[DOM Helpers] Error in .update(): ${error.message}`);
    }

    return element; // Return for chaining
  }

  /**
   * Update a collection of DOM elements
   */
  function updateCollection(collection, updates) {
    // Safety check - if collection doesn't exist or is empty
    if (!collection) {
      console.warn('[DOM Helpers] .update() called on null collection');
      return collection;
    }

    // Handle different collection types
    let elements = [];
    
    if (collection.length !== undefined) {
      // Array-like collection (NodeList, HTMLCollection, or enhanced collection)
      elements = Array.from(collection);
    } else if (collection._originalCollection) {
      // Enhanced collection from Selector helper
      elements = Array.from(collection._originalCollection);
    } else if (collection._originalNodeList) {
      // Enhanced collection from Selector helper (alternative structure)
      elements = Array.from(collection._originalNodeList);
    } else {
      console.warn('[DOM Helpers] .update() called on unrecognized collection type');
      return collection;
    }

    // If no elements in collection, log info and return for chaining
    if (elements.length === 0) {
      console.info('[DOM Helpers] .update() called on empty collection');
      return collection;
    }

    try {
      // Apply updates to each element in the collection
      elements.forEach(element => {
        if (element && element.nodeType === Node.ELEMENT_NODE) {
          Object.entries(updates).forEach(([key, value]) => {
            applyEnhancedUpdate(element, key, value);
          });
        }
      });
    } catch (error) {
      console.warn(`[DOM Helpers] Error in collection .update(): ${error.message}`);
    }

    return collection; // Return for chaining
  }

  /**
   * Apply a single enhanced update to an element
   */
  function applyEnhancedUpdate(element, key, value) {
    try {
      // Handle special cases first
      
      // 1. Style object - batch apply CSS styles
      if (key === 'style' && typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([styleProperty, styleValue]) => {
          if (styleValue !== null && styleValue !== undefined) {
            element.style[styleProperty] = styleValue;
          }
        });
        return;
      }

      // 2. classList methods - enhanced support with arrays
      if (key === 'classList' && typeof value === 'object' && value !== null) {
        handleClassListUpdate(element, value);
        return;
      }

      // 3. setAttribute - enhanced support
      if (key === 'setAttribute' && Array.isArray(value) && value.length >= 2) {
        element.setAttribute(value[0], value[1]);
        return;
      }

      // 4. removeAttribute - support for removing attributes
      if (key === 'removeAttribute') {
        if (Array.isArray(value)) {
          value.forEach(attr => element.removeAttribute(attr));
        } else if (typeof value === 'string') {
          element.removeAttribute(value);
        }
        return;
      }

      // 5. getAttribute - for reading attributes (mainly for debugging/logging)
      if (key === 'getAttribute' && typeof value === 'string') {
        const attrValue = element.getAttribute(value);
        console.log(`[DOM Helpers] getAttribute('${value}'):`, attrValue);
        return;
      }

      // 6. addEventListener - enhanced event handling
      if (key === 'addEventListener' && Array.isArray(value) && value.length >= 2) {
        const [eventType, handler, options] = value;
        element.addEventListener(eventType, handler, options);
        return;
      }

      // 7. removeEventListener - support for removing event listeners
      if (key === 'removeEventListener' && Array.isArray(value) && value.length >= 2) {
        const [eventType, handler, options] = value;
        element.removeEventListener(eventType, handler, options);
        return;
      }

      // 8. dataset - support for data attributes
      if (key === 'dataset' && typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
        return;
      }

      // 9. Handle DOM methods (value should be an array of arguments)
      if (typeof element[key] === 'function') {
        if (Array.isArray(value)) {
          // Call method with provided arguments
          element[key](...value);
        } else {
          // Call method with single argument or no arguments
          element[key](value);
        }
        return;
      }

      // 10. Handle regular DOM properties
      if (key in element) {
        element[key] = value;
        return;
      }

      // 11. If property doesn't exist on element, try setAttribute as fallback
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        element.setAttribute(key, value);
        return;
      }

      console.warn(`[DOM Helpers] Unknown property or method: ${key}`);
    } catch (error) {
      console.warn(`[DOM Helpers] Failed to apply update ${key}: ${error.message}`);
    }
  }

  /**
   * Handle classList updates with enhanced functionality
   */
  function handleClassListUpdate(element, classListUpdates) {
    Object.entries(classListUpdates).forEach(([method, classes]) => {
      try {
        switch (method) {
          case 'add':
            if (Array.isArray(classes)) {
              element.classList.add(...classes);
            } else if (typeof classes === 'string') {
              element.classList.add(classes);
            }
            break;

          case 'remove':
            if (Array.isArray(classes)) {
              element.classList.remove(...classes);
            } else if (typeof classes === 'string') {
              element.classList.remove(classes);
            }
            break;

          case 'toggle':
            if (Array.isArray(classes)) {
              classes.forEach(cls => element.classList.toggle(cls));
            } else if (typeof classes === 'string') {
              element.classList.toggle(classes);
            }
            break;

          case 'replace':
            if (Array.isArray(classes) && classes.length === 2) {
              element.classList.replace(classes[0], classes[1]);
            }
            break;

          case 'contains':
            // For debugging/logging purposes
            if (Array.isArray(classes)) {
              classes.forEach(cls => {
                console.log(`[DOM Helpers] classList.contains('${cls}'):`, element.classList.contains(cls));
              });
            } else if (typeof classes === 'string') {
              console.log(`[DOM Helpers] classList.contains('${classes}'):`, element.classList.contains(classes));
            }
            break;

          default:
            console.warn(`[DOM Helpers] Unknown classList method: ${method}`);
        }
      } catch (error) {
        console.warn(`[DOM Helpers] Error in classList.${method}: ${error.message}`);
      }
    });
  }

  /**
   * Enhanced element wrapper that adds .update() method to any element
   */
  function enhanceElementWithUpdate(element) {
    if (!element || element._hasEnhancedUpdateMethod) {
      return element;
    }

    // Add enhanced update method to the element
    try {
      Object.defineProperty(element, 'update', {
        value: createEnhancedUpdateMethod(element, false),
        writable: false,
        enumerable: false,
        configurable: true
      });

      // Mark as enhanced to avoid double-enhancement
      Object.defineProperty(element, '_hasEnhancedUpdateMethod', {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false
      });
    } catch (error) {
      // Fallback: attach as regular property if defineProperty fails
      element.update = createEnhancedUpdateMethod(element, false);
      element._hasEnhancedUpdateMethod = true;
    }

    return element;
  }

  /**
   * Enhanced collection wrapper that adds .update() method to any collection
   */
  function enhanceCollectionWithUpdate(collection) {
    if (!collection || collection._hasEnhancedUpdateMethod) {
      return collection;
    }

    // Add enhanced update method to the collection
    try {
      Object.defineProperty(collection, 'update', {
        value: createEnhancedUpdateMethod(collection, true),
        writable: false,
        enumerable: false,
        configurable: true
      });

      // Mark as enhanced to avoid double-enhancement
      Object.defineProperty(collection, '_hasEnhancedUpdateMethod', {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false
      });
    } catch (error) {
      // Fallback: attach as regular property if defineProperty fails
      collection.update = createEnhancedUpdateMethod(collection, true);
      collection._hasEnhancedUpdateMethod = true;
    }

    return collection;
  }

  /**
   * Utility function to determine if something is a collection
   */
  function isCollection(obj) {
    return obj && (
      obj.length !== undefined || 
      obj._originalCollection || 
      obj._originalNodeList ||
      obj instanceof NodeList ||
      obj instanceof HTMLCollection
    );
  }

  /**
   * Auto-enhance function that adds enhanced .update() to elements or collections
   */
  function autoEnhanceWithUpdate(obj) {
    if (!obj) return obj;

    if (isCollection(obj)) {
      return enhanceCollectionWithUpdate(obj);
    } else if (obj.nodeType === Node.ELEMENT_NODE) {
      return enhanceElementWithUpdate(obj);
    }

    return obj;
  }

  /**
   * Utility function to create a comprehensive update example
   */
  function createUpdateExample() {
    return {
      // Basic properties
      textContent: "Enhanced Button",
      innerHTML: "<strong>Enhanced</strong> Button",
      id: "myEnhancedButton",
      className: "btn btn-primary",
      
      // Style object
      style: { 
        color: "white",
        backgroundColor: "#007bff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px"
      },
      
      // classList methods
      classList: {
        add: ["fancy", "highlight"],
        remove: ["old-class"],
        toggle: "active",
        replace: ["btn-old", "btn-new"]
      },
      
      // Attributes
      setAttribute: ["data-role", "button"],
      removeAttribute: "disabled",
      
      // Dataset
      dataset: {
        userId: "123",
        action: "submit"
      },
      
      // Event handling
      addEventListener: ["click", (e) => {
        console.log("Button clicked!", e);
        e.target.classList.toggle("clicked");
      }],
      
      // Method calls
      focus: [],
      scrollIntoView: [{ behavior: "smooth" }]
    };
  }

  // Export the enhanced utility functions
  const EnhancedUpdateUtility = {
    createEnhancedUpdateMethod,
    enhanceElementWithUpdate,
    enhanceCollectionWithUpdate,
    autoEnhanceWithUpdate,
    isCollection,
    updateSingleElement,
    updateCollection,
    applyEnhancedUpdate,
    handleClassListUpdate,
    createUpdateExample
  };

  // Export for different environments
  if (typeof module !== 'undefined' && module.exports) {
    // Node.js/CommonJS
    module.exports = EnhancedUpdateUtility;
  } else if (typeof define === 'function' && define.amd) {
    // AMD/RequireJS
    define([], function() {
      return EnhancedUpdateUtility;
    });
  } else {
    // Browser globals
    global.EnhancedUpdateUtility = EnhancedUpdateUtility;
  }

})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
