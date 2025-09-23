/**
 * Universal Update Utility for DOM Helpers
 * Provides a chainable .update({}) method for Elements, Collections, and Selector helpers
 * 
 * Features:
 * - Accepts any DOM property and assigns it
 * - Handles style as an object for batch CSS application
 * - Supports DOM method calls with arguments as arrays
 * - Chainable - returns the element or collection
 * - Safe - handles null elements and empty collections gracefully
 * - Works with single elements and collections identically
 */

(function(global) {
  'use strict';

  /**
   * Universal Update Implementation
   * This function can be applied to any element or collection
   */
  function createUpdateMethod(context, isCollection = false) {
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
        applyUpdate(element, key, value);
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
            applyUpdate(element, key, value);
          });
        }
      });
    } catch (error) {
      console.warn(`[DOM Helpers] Error in collection .update(): ${error.message}`);
    }

    return collection; // Return for chaining
  }

  /**
   * Apply a single update to an element
   */
  function applyUpdate(element, key, value) {
    try {
      // Handle special cases first
      if (key === 'style' && typeof value === 'object' && value !== null) {
        // Batch apply CSS styles
        Object.entries(value).forEach(([styleProperty, styleValue]) => {
          if (styleValue !== null && styleValue !== undefined) {
            element.style[styleProperty] = styleValue;
          }
        });
        return;
      }

      // Handle DOM methods (value should be an array of arguments)
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

      // Handle regular DOM properties
      if (key in element) {
        element[key] = value;
        return;
      }

      // If property doesn't exist on element, try setAttribute as fallback
      if (typeof value === 'string' || typeof value === 'number') {
        element.setAttribute(key, value);
        return;
      }

      console.warn(`[DOM Helpers] Unknown property or method: ${key}`);
    } catch (error) {
      console.warn(`[DOM Helpers] Failed to apply update ${key}: ${error.message}`);
    }
  }

  /**
   * Enhanced element wrapper that adds .update() method to any element
   */
  function enhanceElementWithUpdate(element) {
    if (!element || element._hasUpdateMethod) {
      return element;
    }

    // Add update method to the element
    try {
      Object.defineProperty(element, 'update', {
        value: createUpdateMethod(element, false),
        writable: false,
        enumerable: false,
        configurable: true
      });

      // Mark as enhanced to avoid double-enhancement
      Object.defineProperty(element, '_hasUpdateMethod', {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false
      });
    } catch (error) {
      // Fallback: attach as regular property if defineProperty fails
      element.update = createUpdateMethod(element, false);
      element._hasUpdateMethod = true;
    }

    return element;
  }

  /**
   * Enhanced collection wrapper that adds .update() method to any collection
   */
  function enhanceCollectionWithUpdate(collection) {
    if (!collection || collection._hasUpdateMethod) {
      return collection;
    }

    // Add update method to the collection
    try {
      Object.defineProperty(collection, 'update', {
        value: createUpdateMethod(collection, true),
        writable: false,
        enumerable: false,
        configurable: true
      });

      // Mark as enhanced to avoid double-enhancement
      Object.defineProperty(collection, '_hasUpdateMethod', {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false
      });
    } catch (error) {
      // Fallback: attach as regular property if defineProperty fails
      collection.update = createUpdateMethod(collection, true);
      collection._hasUpdateMethod = true;
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
   * Auto-enhance function that adds .update() to elements or collections
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

  // Export the utility functions
  const UpdateUtility = {
    createUpdateMethod,
    enhanceElementWithUpdate,
    enhanceCollectionWithUpdate,
    autoEnhanceWithUpdate,
    isCollection,
    updateSingleElement,
    updateCollection,
    applyUpdate
  };

  // Export for different environments
  if (typeof module !== 'undefined' && module.exports) {
    // Node.js/CommonJS
    module.exports = UpdateUtility;
  } else if (typeof define === 'function' && define.amd) {
    // AMD/RequireJS
    define([], function() {
      return UpdateUtility;
    });
  } else {
    // Browser globals
    global.UpdateUtility = UpdateUtility;
  }

})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
