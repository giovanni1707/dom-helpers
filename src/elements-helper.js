(function(global) {
  'use strict';

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

    // Convert camelCase to kebab-case
    _camelToKebab(str) {
      return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    }

    // Convert kebab-case to camelCase
    _kebabToCamel(str) {
      return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    }

    // Find element ID by trying both camelCase and kebab-case
    _findElementId(prop) {
      // First try the property as-is (for exact matches)
      if (document.getElementById(prop)) {
        return prop;
      }
      
      // If prop is camelCase, try converting to kebab-case
      const kebabCase = this._camelToKebab(prop);
      if (kebabCase !== prop && document.getElementById(kebabCase)) {
        return kebabCase;
      }
      
      // If prop is kebab-case, try converting to camelCase
      const camelCase = this._kebabToCamel(prop);
      if (camelCase !== prop && document.getElementById(camelCase)) {
        return camelCase;
      }
      
      return prop; // Return original if no matches found
    }

    _getElement(prop) {
      if (typeof prop !== 'string') {
        this._warn(`Invalid element property type: ${typeof prop}`);
        return null;
      }

      // Check cache first with the property name
      if (this.cache.has(prop)) {
        const element = this.cache.get(prop);
        if (element && document.contains(element)) {
          this.stats.hits++;
          return element;
        } else {
          this.cache.delete(prop);
        }
      }

      // Find the actual element ID
      const actualId = this._findElementId(prop);
      
      // Check cache with actual ID
      if (actualId !== prop && this.cache.has(actualId)) {
        const element = this.cache.get(actualId);
        if (element && document.contains(element)) {
          this.stats.hits++;
          // Cache with both the property name and actual ID
          this.cache.set(prop, element);
          return element;
        } else {
          this.cache.delete(actualId);
        }
      }

      const element = document.getElementById(actualId);
      if (element) {
        this._addToCache(prop, element);
        // Also cache with actual ID if different
        if (actualId !== prop) {
          this._addToCache(actualId, element);
        }
        this.stats.misses++;
        return element;
      }

      this.stats.misses++;
      this._warn(`Element with id '${actualId}' not found`);
      return null;
    }

    _hasElement(prop) {
      if (typeof prop !== 'string') return false;
      
      if (this.cache.has(prop)) {
        const element = this.cache.get(prop);
        if (element && document.contains(element)) {
          return true;
        }
        this.cache.delete(prop);
      }
      
      const actualId = this._findElementId(prop);
      return !!document.getElementById(actualId);
    }

    _getKeys() {
      // Return both original IDs and camelCase versions
      const ids = Array.from(document.querySelectorAll("[id]")).map(el => el.id);
      const keys = new Set(ids);
      
      // Add camelCase versions
      ids.forEach(id => {
        const camelCase = this._kebabToCamel(id);
        if (camelCase !== id) {
          keys.add(camelCase);
        }
      });
      
      return Array.from(keys);
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
