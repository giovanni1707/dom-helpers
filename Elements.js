(function(global) {
  'use strict';

  // Import Enhanced UpdateUtility if available
  let EnhancedUpdateUtility;
  if (typeof require !== 'undefined') {
    try {
      EnhancedUpdateUtility = require('./src/enhanced-update-utility.js');
    } catch (e) {
      // EnhancedUpdateUtility not available in this environment
    }
  } else if (typeof global !== 'undefined' && global.EnhancedUpdateUtility) {
    EnhancedUpdateUtility = global.EnhancedUpdateUtility;
  }

  class ProductionElementsHelper {
    constructor(options = {}) {
      this.cache = new Map();
      this.weakCache = new WeakMap();
      this.options = {
        enableLogging: options.enableLogging ?? false,
        autoCleanup: options.autoCleanup ?? true,
        cleanupInterval: options.cleanupInterval ?? 30000,
        maxCacheSize: options.maxCacheSize ?? 1000,
        debounceDelay: options.debounceDelay ?? 16,
        ...options
      };

      this.stats = {
        hits: 0,
        misses: 0,
        cacheSize: 0,
        lastCleanup: Date.now()
      };

      this.pendingUpdates = new Set();
      this.cleanupTimer = null;
      this.isDestroyed = false;

      this._initProxy();
      this._initMutationObserver();
      this._scheduleCleanup();
    }

    _initProxy() {
      this.Elements = new Proxy(this, {
        get: (target, prop) => target._getElement(prop),
        has: (target, prop) => target._hasElement(prop),
        ownKeys: (target) => target._getKeys(),
        getOwnPropertyDescriptor: (target, prop) => {
          if (target._hasElement(prop)) {
            return { enumerable: true, configurable: true, value: target._getElement(prop) };
          }
          return undefined;
        }
      });
    }

    _getElement(id) {
      if (typeof id !== 'string') {
        this._warn(`Invalid element ID type: ${typeof id}`);
        return null;
      }

      if (this.cache.has(id)) {
        const element = this.cache.get(id);
        if (element && document.contains(element)) {
          this.stats.hits++;
          return this._enhanceElementWithUpdate(element);
        } else {
          this.cache.delete(id);
        }
      }

      const element = document.getElementById(id);
      if (element) {
        this._addToCache(id, element);
        this.stats.misses++;
        return this._enhanceElementWithUpdate(element);
      }

      this.stats.misses++;
      this._warn(`Element with id '${id}' not found`);
      return null;
    }

    _hasElement(id) {
      if (typeof id !== 'string') return false;
      
      if (this.cache.has(id)) {
        const element = this.cache.get(id);
        if (element && document.contains(element)) {
          return true;
        }
        this.cache.delete(id);
      }
      
      return !!document.getElementById(id);
    }

    _getKeys() {
      return Array.from(document.querySelectorAll("[id]")).map(el => el.id);
    }

    _addToCache(id, element) {
      if (this.cache.size >= this.options.maxCacheSize) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }

      this.cache.set(id, element);
      this.stats.cacheSize = this.cache.size;

      this.weakCache.set(element, {
        id,
        cachedAt: Date.now(),
        accessCount: 1
      });
    }

    _initMutationObserver() {
      const debouncedUpdate = this._debounce((mutations) => {
        this._processMutations(mutations);
      }, this.options.debounceDelay);

      this.observer = new MutationObserver(debouncedUpdate);
      this.observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['id']
      });
    }

    _processMutations(mutations) {
      if (this.isDestroyed) return;

      const addedIds = new Set();
      const removedIds = new Set();

      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.id) addedIds.add(node.id);
            const childrenWithIds = node.querySelectorAll?.('[id]') || [];
            childrenWithIds.forEach(child => addedIds.add(child.id));
          }
        });

        mutation.removedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.id) removedIds.add(node.id);
            const childrenWithIds = node.querySelectorAll?.('[id]') || [];
            childrenWithIds.forEach(child => removedIds.add(child.id));
          }
        });

        if (mutation.type === 'attributes' && mutation.attributeName === 'id') {
          const oldId = mutation.oldValue;
          const newId = mutation.target.id;
          
          if (oldId && oldId !== newId) {
            removedIds.add(oldId);
          }
          if (newId && newId !== oldId) {
            addedIds.add(newId);
          }
        }
      });

      addedIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          this._addToCache(id, element);
        }
      });

      removedIds.forEach(id => {
        this.cache.delete(id);
      });

      this.stats.cacheSize = this.cache.size;
    }

    _scheduleCleanup() {
      if (!this.options.autoCleanup || this.isDestroyed) return;

      this.cleanupTimer = setTimeout(() => {
        this._performCleanup();
        this._scheduleCleanup();
      }, this.options.cleanupInterval);
    }

    _performCleanup() {
      if (this.isDestroyed) return;

      const beforeSize = this.cache.size;
      const staleIds = [];

      for (const [id, element] of this.cache) {
        if (!element || !document.contains(element)) {
          staleIds.push(id);
        }
      }

      staleIds.forEach(id => this.cache.delete(id));

      this.stats.cacheSize = this.cache.size;
      this.stats.lastCleanup = Date.now();

      this._log(`Cleanup completed. Removed ${beforeSize - this.cache.size} stale entries.`);
    }

    _debounce(func, delay) {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
      };
    }

    _log(message) {
      if (this.options.enableLogging) {
        console.log(`[Elements] ${message}`);
      }
    }

    _warn(message) {
      if (this.options.enableLogging) {
        console.warn(`[Elements] ${message}`);
      }
    }

    // Enhanced element with comprehensive update method
    _enhanceElementWithUpdate(element) {
      if (!element || element._hasEnhancedUpdateMethod) {
        return element;
      }

      // Use EnhancedUpdateUtility if available, otherwise create comprehensive inline update method
      if (EnhancedUpdateUtility && EnhancedUpdateUtility.enhanceElementWithUpdate) {
        return EnhancedUpdateUtility.enhanceElementWithUpdate(element);
      }

      // Comprehensive fallback: create enhanced update method inline
      try {
        Object.defineProperty(element, 'update', {
          value: (updates = {}) => {
            if (!updates || typeof updates !== 'object') {
              console.warn('[DOM Helpers] .update() called with invalid updates object');
              return element;
            }

            try {
              Object.entries(updates).forEach(([key, value]) => {
                this._applyEnhancedUpdate(element, key, value);
              });
            } catch (error) {
              console.warn(`[DOM Helpers] Error in .update(): ${error.message}`);
            }

            return element; // Return for chaining
          },
          writable: false,
          enumerable: false,
          configurable: true
        });

        // Mark as enhanced
        Object.defineProperty(element, '_hasEnhancedUpdateMethod', {
          value: true,
          writable: false,
          enumerable: false,
          configurable: false
        });
      } catch (error) {
        // Fallback: attach as regular property
        element.update = (updates = {}) => {
          if (!updates || typeof updates !== 'object') {
            console.warn('[DOM Helpers] .update() called with invalid updates object');
            return element;
          }

          try {
            Object.entries(updates).forEach(([key, value]) => {
              this._applyEnhancedUpdate(element, key, value);
            });
          } catch (error) {
            console.warn(`[DOM Helpers] Error in .update(): ${error.message}`);
          }

          return element;
        };
        element._hasEnhancedUpdateMethod = true;
      }

      return element;
    }

    // Comprehensive update application method
    _applyEnhancedUpdate(element, key, value) {
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
          this._handleClassListUpdate(element, value);
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

        // 5. addEventListener - enhanced event handling
        if (key === 'addEventListener' && Array.isArray(value) && value.length >= 2) {
          const [eventType, handler, options] = value;
          element.addEventListener(eventType, handler, options);
          return;
        }

        // 6. removeEventListener - support for removing event listeners
        if (key === 'removeEventListener' && Array.isArray(value) && value.length >= 2) {
          const [eventType, handler, options] = value;
          element.removeEventListener(eventType, handler, options);
          return;
        }

        // 7. dataset - support for data attributes
        if (key === 'dataset' && typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([dataKey, dataValue]) => {
            element.dataset[dataKey] = dataValue;
          });
          return;
        }

        // 8. Handle DOM methods (value should be an array of arguments)
        if (typeof element[key] === 'function') {
          if (Array.isArray(value)) {
            element[key](...value);
          } else {
            element[key](value);
          }
          return;
        }

        // 9. Handle regular DOM properties
        if (key in element) {
          element[key] = value;
          return;
        }

        // 10. Fallback to setAttribute
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          element.setAttribute(key, value);
          return;
        }

        console.warn(`[DOM Helpers] Unknown property or method: ${key}`);
      } catch (error) {
        console.warn(`[DOM Helpers] Failed to apply update ${key}: ${error.message}`);
      }
    }

    // Handle classList updates with enhanced functionality
    _handleClassListUpdate(element, classListUpdates) {
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

    // Public API
    getStats() {
      return {
        ...this.stats,
        hitRate: this.stats.hits / (this.stats.hits + this.stats.misses) || 0,
        uptime: Date.now() - this.stats.lastCleanup
      };
    }

    clearCache() {
      this.cache.clear();
      this.stats.cacheSize = 0;
      this._log('Cache cleared manually');
    }

    destroy() {
      this.isDestroyed = true;
      
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }

      if (this.cleanupTimer) {
        clearTimeout(this.cleanupTimer);
        this.cleanupTimer = null;
      }

      this.cache.clear();
      this._log('Elements helper destroyed');
    }

    isCached(id) {
      return this.cache.has(id);
    }

    getCacheSnapshot() {
      return Array.from(this.cache.keys());
    }

    // Enhanced methods for destructuring support
    destructure(...ids) {
      const result = {};
      const missing = [];
      
      ids.forEach(id => {
        const element = this.Elements[id];
        if (element) {
          result[id] = element;
        } else {
          missing.push(id);
          result[id] = null;
        }
      });
      
      if (missing.length > 0 && this.options.enableLogging) {
        this._warn(`Missing elements during destructuring: ${missing.join(', ')}`);
      }
      
      return result;
    }

    getRequired(...ids) {
      const elements = this.destructure(...ids);
      const missing = ids.filter(id => !elements[id]);
      
      if (missing.length > 0) {
        throw new Error(`Required elements not found: ${missing.join(', ')}`);
      }
      
      return elements;
    }

    async waitFor(...ids) {
      const maxWait = 5000;
      const checkInterval = 100;
      const startTime = Date.now();
      
      while (Date.now() - startTime < maxWait) {
        const elements = this.destructure(...ids);
        const allFound = ids.every(id => elements[id]);
        
        if (allFound) {
          return elements;
        }
        
        await new Promise(resolve => setTimeout(resolve, checkInterval));
      }
      
      throw new Error(`Timeout waiting for elements: ${ids.join(', ')}`);
    }
  }

  // Auto-initialize with sensible defaults
  const ElementsHelper = new ProductionElementsHelper({
    enableLogging: false,
    autoCleanup: true,
    cleanupInterval: 30000,
    maxCacheSize: 1000
  });

  // Global API - Simple and clean
  const Elements = ElementsHelper.Elements;

  // Additional utilities
  Elements.helper = ElementsHelper;
  Elements.stats = () => ElementsHelper.getStats();
  Elements.clear = () => ElementsHelper.clearCache();
  Elements.destroy = () => ElementsHelper.destroy();
  Elements.destructure = (...ids) => ElementsHelper.destructure(...ids);
  Elements.getRequired = (...ids) => ElementsHelper.getRequired(...ids);
  Elements.waitFor = (...ids) => ElementsHelper.waitFor(...ids);
  Elements.isCached = (id) => ElementsHelper.isCached(id);
  Elements.configure = (options) => {
    Object.assign(ElementsHelper.options, options);
    return Elements;
  };

  // Export for different environments
  if (typeof module !== 'undefined' && module.exports) {
    // Node.js/CommonJS
    module.exports = { Elements, ProductionElementsHelper };
  } else if (typeof define === 'function' && define.amd) {
    // AMD/RequireJS
    define([], function() {
      return { Elements, ProductionElementsHelper };
    });
  } else {
    // Browser globals
    global.Elements = Elements;
    global.ProductionElementsHelper = ProductionElementsHelper;
  }

  // Auto-cleanup on page unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      ElementsHelper.destroy();
    });
  }

})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
