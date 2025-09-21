/**
 * DOM Helpers - Combined Bundle
 * A comprehensive collection of high-performance DOM utilities
 * 
 * @version 2.0.0
 * @author Your Name
 * @license MIT
 */

(function(global) {
  'use strict';

  // Import Elements Helper
  const elementsModule = (function() {
    // Elements Helper code will be injected here during build
    // For now, we'll use a placeholder that loads from the separate file
    if (typeof require !== 'undefined') {
      return require('./elements-helper.js');
    }
    return global.Elements ? { Elements: global.Elements, ProductionElementsHelper: global.ProductionElementsHelper } : null;
  })();

  // Import Collections Helper
  const collectionsModule = (function() {
    // Collections Helper code will be injected here during build
    // For now, we'll use a placeholder that loads from the separate file
    if (typeof require !== 'undefined') {
      return require('./collections.js');
    }
    return global.Collections ? { Collections: global.Collections, ProductionCollectionHelper: global.ProductionCollectionHelper } : null;
  })();

  // Combined DOM Helpers API
  const DOMHelpers = {
    // Elements Helper (ID-based access)
    Elements: elementsModule?.Elements || null,
    
    // Collections Helper (Class/Tag/Name-based access)
    Collections: collectionsModule?.Collections || null,
    
    // Helper classes for advanced usage
    ProductionElementsHelper: elementsModule?.ProductionElementsHelper || null,
    ProductionCollectionHelper: collectionsModule?.ProductionCollectionHelper || null,
    
    // Utility methods
    version: '2.0.0',
    
    // Check if both helpers are available
    isReady() {
      return !!(this.Elements && this.Collections);
    },
    
    // Get combined statistics
    getStats() {
      const stats = {};
      
      if (this.Elements && typeof this.Elements.stats === 'function') {
        stats.elements = this.Elements.stats();
      }
      
      if (this.Collections && typeof this.Collections.stats === 'function') {
        stats.collections = this.Collections.stats();
      }
      
      return stats;
    },
    
    // Clear all caches
    clearAll() {
      if (this.Elements && typeof this.Elements.clear === 'function') {
        this.Elements.clear();
      }
      
      if (this.Collections && typeof this.Collections.clear === 'function') {
        this.Collections.clear();
      }
    },
    
    // Destroy all helpers
    destroyAll() {
      if (this.Elements && typeof this.Elements.destroy === 'function') {
        this.Elements.destroy();
      }
      
      if (this.Collections && typeof this.Collections.destroy === 'function') {
        this.Collections.destroy();
      }
    },
    
    // Configure both helpers
    configure(options = {}) {
      if (this.Elements && typeof this.Elements.configure === 'function') {
        this.Elements.configure(options.elements || options);
      }
      
      if (this.Collections && typeof this.Collections.configure === 'function') {
        this.Collections.configure(options.collections || options);
      }
      
      return this;
    }
  };

  // Export for different environments
  if (typeof module !== 'undefined' && module.exports) {
    // Node.js/CommonJS
    module.exports = {
      DOMHelpers,
      Elements: elementsModule?.Elements,
      Collections: collectionsModule?.Collections,
      ProductionElementsHelper: elementsModule?.ProductionElementsHelper,
      ProductionCollectionHelper: collectionsModule?.ProductionCollectionHelper
    };
  } else if (typeof define === 'function' && define.amd) {
    // AMD/RequireJS
    define([], function() {
      return {
        DOMHelpers,
        Elements: elementsModule?.Elements,
        Collections: collectionsModule?.Collections,
        ProductionElementsHelper: elementsModule?.ProductionElementsHelper,
        ProductionCollectionHelper: collectionsModule?.ProductionCollectionHelper
      };
    });
  } else {
    // Browser globals
    global.DOMHelpers = DOMHelpers;
    
    // Also expose individual helpers if not already available
    if (elementsModule?.Elements && !global.Elements) {
      global.Elements = elementsModule.Elements;
      global.ProductionElementsHelper = elementsModule.ProductionElementsHelper;
    }
    
    if (collectionsModule?.Collections && !global.Collections) {
      global.Collections = collectionsModule.Collections;
      global.ProductionCollectionHelper = collectionsModule.ProductionCollectionHelper;
    }
  }

  // Auto-cleanup on page unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      DOMHelpers.destroyAll();
    });
  }

})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
