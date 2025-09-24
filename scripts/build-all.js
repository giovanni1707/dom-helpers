#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

// Ensure dist directory exists
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const srcDir = path.join(__dirname, '..', 'src');

console.log('🔨 Building all distribution files...');

/**
 * Read and process a source file
 */
function readSourceFile(filename) {
  const filePath = path.join(srcDir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Source file not found: ${filename}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Write output file
 */
function writeOutputFile(filename, content) {
  const outputPath = path.join(distDir, filename);
  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`✅ Created: ${filename} (${(content.length / 1024).toFixed(1)}KB)`);
}

/**
 * Minify code using Terser
 */
async function minifyCode(code, filename) {
  try {
    const result = await minify(code, {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true,
        pure_funcs: ['console.debug'],
        passes: 2
      },
      mangle: {
        reserved: [
          // Preserve public API names
          'Elements',
          'Collections',
          'Selector',
          'DOMHelpers',
          'ProductionElementsHelper',
          'ProductionCollectionHelper',
          'ProductionSelectorHelper',
          // Preserve common method names
          'configure',
          'stats',
          'clear',
          'destroy',
          'getStats',
          'clearAll',
          'destroyAll',
          'isReady',
          'ClassName',
          'TagName',
          'Name',
          'query',
          'queryAll',
          'Scoped',
          'waitFor',
          'waitForAll'
        ]
      },
      format: {
        comments: function(node, comment) {
          // Keep license and important comments
          const text = comment.value;
          return text.includes('license') || 
                 text.includes('License') || 
                 text.includes('MIT') ||
                 text.includes('@version') ||
                 text.includes('DOM Helpers');
        }
      }
    });
    
    if (result.error) {
      throw result.error;
    }
    
    const originalSize = code.length;
    const minifiedSize = result.code.length;
    const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
    
    console.log(`🗜️  ${filename}: ${(originalSize / 1024).toFixed(1)}KB → ${(minifiedSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
    
    return result.code;
    
  } catch (error) {
    console.error(`❌ Failed to minify ${filename}:`, error.message);
    throw error;
  }
}

/**
 * Extract helper code from UMD wrapper for embedding
 */
function extractHelperCode(content) {
  // Remove the outer UMD wrapper and return the inner code
  const match = content.match(/\(function\(global\)\s*\{\s*'use strict';([\s\S]*)\}\)\(typeof window[^)]+\);?\s*$/);
  
  if (!match) {
    // If no UMD wrapper found, return content as-is
    return content;
  }
  
  return match[1].trim();
}

/**
 * Build individual Elements Helper files
 */
async function buildElements() {
  console.log('📦 Building Elements Helper...');
  
  const elementsContent = readSourceFile('elements-helper.js');
  
  // Individual minified file: elements.min.js
  const elementsMinified = await minifyCode(elementsContent, 'elements.min.js');
  writeOutputFile('elements.min.js', elementsMinified);
  
  console.log('✅ Elements Helper built successfully');
}

/**
 * Build individual Collections Helper files
 */
async function buildCollections() {
  console.log('📦 Building Collections Helper...');
  
  const collectionsContent = readSourceFile('collections.js');
  
  // Individual minified file: collections.min.js
  const collectionsMinified = await minifyCode(collectionsContent, 'collections.min.js');
  writeOutputFile('collections.min.js', collectionsMinified);
  
  console.log('✅ Collections Helper built successfully');
}

/**
 * Build individual Selector Helper files
 */
async function buildSelector() {
  console.log('📦 Building Selector Helper...');
  
  const selectorContent = readSourceFile('querySelector-helper.js');
  
  // Individual minified file: selector.min.js
  const selectorMinified = await minifyCode(selectorContent, 'selector.min.js');
  writeOutputFile('selector.min.js', selectorMinified);
  
  console.log('✅ Selector Helper built successfully');
}

/**
 * Build Combined Bundle files
 */
async function buildCombined() {
  console.log('📦 Building Combined Bundle...');
  
  const updateUtilityContent = readSourceFile('enhanced-update-utility.js');
  const elementsContent = readSourceFile('elements-helper.js');
  const collectionsContent = readSourceFile('collections.js');
  const selectorContent = readSourceFile('querySelector-helper.js');
  
  // Remove EnhancedUpdateUtility imports from individual helpers for combined bundle
  const cleanElementsContent = elementsContent.replace(/\/\/ Import Enhanced UpdateUtility[\s\S]*?EnhancedUpdateUtility = global\.EnhancedUpdateUtility;\s*}/g, '');
  const cleanCollectionsContent = collectionsContent.replace(/\/\/ Import Enhanced UpdateUtility[\s\S]*?EnhancedUpdateUtility = global\.EnhancedUpdateUtility;\s*}/g, '');
  const cleanSelectorContent = selectorContent.replace(/\/\/ Import Enhanced UpdateUtility[\s\S]*?EnhancedUpdateUtility = global\.EnhancedUpdateUtility;\s*}/g, '');
  
  // Create combined unminified bundle: dom-helpers.bundle.js
  const combinedBundle = `/**
 * DOM Helpers - Combined Bundle (Unminified)
 * High-performance vanilla JavaScript DOM utilities with intelligent caching
 * 
 * Includes:
 * - Update Utility (Universal .update() method)
 * - Elements Helper (ID-based DOM access)
 * - Collections Helper (Class/Tag/Name-based DOM access)
 * - Selector Helper (querySelector/querySelectorAll with caching)
 * 
 * @version 2.1.0
 * @license MIT
 */

(function(global) {
  'use strict';

  // ===== UPDATE UTILITY =====
  ${extractHelperCode(updateUtilityContent)}

  // ===== ELEMENTS HELPER =====
  ${extractHelperCode(cleanElementsContent)}

  // ===== COLLECTIONS HELPER =====
  ${extractHelperCode(cleanCollectionsContent)}

  // ===== SELECTOR HELPER =====
  ${extractHelperCode(cleanSelectorContent)}

  // ===== COMBINED API =====
  const DOMHelpers = {
    // Individual helpers
    Elements: global.Elements,
    Collections: global.Collections,
    Selector: global.Selector,
    
    // Helper classes
    ProductionElementsHelper: global.ProductionElementsHelper,
    ProductionCollectionHelper: global.ProductionCollectionHelper,
    ProductionSelectorHelper: global.ProductionSelectorHelper,
    
    // Utility methods
    version: '2.0.0',
    
    // Check if all helpers are available
    isReady() {
      return !!(this.Elements && this.Collections && this.Selector);
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
      
      if (this.Selector && typeof this.Selector.stats === 'function') {
        stats.selector = this.Selector.stats();
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
      
      if (this.Selector && typeof this.Selector.clear === 'function') {
        this.Selector.clear();
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
      
      if (this.Selector && typeof this.Selector.destroy === 'function') {
        this.Selector.destroy();
      }
    },
    
    // Configure all helpers
    configure(options = {}) {
      if (this.Elements && typeof this.Elements.configure === 'function') {
        this.Elements.configure(options.elements || options);
      }
      
      if (this.Collections && typeof this.Collections.configure === 'function') {
        this.Collections.configure(options.collections || options);
      }
      
      if (this.Selector && typeof this.Selector.configure === 'function') {
        this.Selector.configure(options.selector || options);
      }
      
      return this;
    }
  };

  // Export for different environments
  if (typeof module !== 'undefined' && module.exports) {
    // Node.js/CommonJS
    module.exports = {
      DOMHelpers,
      Elements: global.Elements,
      Collections: global.Collections,
      Selector: global.Selector,
      ProductionElementsHelper: global.ProductionElementsHelper,
      ProductionCollectionHelper: global.ProductionCollectionHelper,
      ProductionSelectorHelper: global.ProductionSelectorHelper
    };
  } else if (typeof define === 'function' && define.amd) {
    // AMD/RequireJS
    define([], function() {
      return {
        DOMHelpers,
        Elements: global.Elements,
        Collections: global.Collections,
        Selector: global.Selector,
        ProductionElementsHelper: global.ProductionElementsHelper,
        ProductionCollectionHelper: global.ProductionCollectionHelper,
        ProductionSelectorHelper: global.ProductionSelectorHelper
      };
    });
  } else {
    // Browser globals
    global.DOMHelpers = DOMHelpers;
  }

  // Auto-cleanup on page unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      DOMHelpers.destroyAll();
    });
  }

})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
`;

  // Write unminified combined bundle
  writeOutputFile('dom-helpers.bundle.js', combinedBundle);
  
  // Create minified combined bundle: dom-helpers.min.js
  const combinedMinified = await minifyCode(combinedBundle, 'dom-helpers.min.js');
  writeOutputFile('dom-helpers.min.js', combinedMinified);
  
  console.log('✅ Combined bundle built successfully');
}

/**
 * Create TypeScript declaration files
 */
function createTypeScriptDeclarations() {
  console.log('📝 Creating TypeScript declarations...');
  
  // Elements Helper declarations
  const elementsDeclaration = `/**
 * Elements Helper - TypeScript Declarations
 */

export interface ElementsStats {
  hits: number;
  misses: number;
  cacheSize: number;
  hitRate: number;
  uptime: number;
  lastCleanup: number;
}

export interface ElementsOptions {
  enableLogging?: boolean;
  autoCleanup?: boolean;
  cleanupInterval?: number;
  maxCacheSize?: number;
  debounceDelay?: number;
}

export interface ElementsProxy {
  [key: string]: HTMLElement | null;
  stats(): ElementsStats;
  clear(): void;
  destroy(): void;
  configure(options: ElementsOptions): ElementsProxy;
  isCached(id: string): boolean;
  destructure(...ids: string[]): Record<string, HTMLElement | null>;
  getRequired(...ids: string[]): Record<string, HTMLElement>;
  waitFor(...ids: string[]): Promise<Record<string, HTMLElement>>;
}

export declare class ProductionElementsHelper {
  constructor(options?: ElementsOptions);
  getStats(): ElementsStats;
  clearCache(): void;
  destroy(): void;
  isCached(id: string): boolean;
  getCacheSnapshot(): string[];
  destructure(...ids: string[]): Record<string, HTMLElement | null>;
  getRequired(...ids: string[]): Record<string, HTMLElement>;
  waitFor(...ids: string[]): Promise<Record<string, HTMLElement>>;
}

export declare const Elements: ElementsProxy;
`;

  // Collections Helper declarations
  const collectionsDeclaration = `/**
 * Collections Helper - TypeScript Declarations
 */

export interface CollectionsStats {
  hits: number;
  misses: number;
  cacheSize: number;
  hitRate: number;
  uptime: number;
  lastCleanup: number;
}

export interface CollectionsOptions {
  enableLogging?: boolean;
  autoCleanup?: boolean;
  cleanupInterval?: number;
  maxCacheSize?: number;
  debounceDelay?: number;
}

export interface EnhancedCollection {
  readonly length: number;
  item(index: number): Element | null;
  namedItem?(name: string): Element | null;
  toArray(): Element[];
  forEach(callback: (element: Element, index: number, collection: EnhancedCollection) => void, thisArg?: any): void;
  map<T>(callback: (element: Element, index: number, collection: EnhancedCollection) => T, thisArg?: any): T[];
  filter(callback: (element: Element, index: number, collection: EnhancedCollection) => boolean, thisArg?: any): Element[];
  find(callback: (element: Element, index: number, collection: EnhancedCollection) => boolean, thisArg?: any): Element | undefined;
  some(callback: (element: Element, index: number, collection: EnhancedCollection) => boolean, thisArg?: any): boolean;
  every(callback: (element: Element, index: number, collection: EnhancedCollection) => boolean, thisArg?: any): boolean;
  first(): Element | null;
  last(): Element | null;
  at(index: number): Element | null;
  isEmpty(): boolean;
  [index: number]: Element;
  [Symbol.iterator](): Iterator<Element>;
}

export interface CollectionProxy {
  [key: string]: EnhancedCollection;
}

export interface CollectionsAPI {
  ClassName: CollectionProxy;
  TagName: CollectionProxy;
  Name: CollectionProxy;
  stats(): CollectionsStats;
  clear(): void;
  destroy(): void;
  configure(options: CollectionsOptions): CollectionsAPI;
  isCached(type: string, value: string): boolean;
  getMultiple(requests: Array<{type: string, value: string, as?: string}>): Record<string, EnhancedCollection>;
  waitFor(type: string, value: string, minCount?: number, timeout?: number): Promise<EnhancedCollection>;
}

export declare class ProductionCollectionHelper {
  constructor(options?: CollectionsOptions);
  getStats(): CollectionsStats;
  clearCache(): void;
  destroy(): void;
  isCached(type: string, value: string): boolean;
  getCacheSnapshot(): string[];
  getMultiple(requests: Array<{type: string, value: string, as?: string}>): Record<string, EnhancedCollection>;
  waitForElements(type: string, value: string, minCount?: number, timeout?: number): Promise<EnhancedCollection>;
}

export declare const Collections: CollectionsAPI;
`;

  // Combined DOM Helpers declarations
  const domHelpersDeclaration = `/**
 * DOM Helpers - Combined TypeScript Declarations
 */

import { ElementsProxy, ElementsStats, ElementsOptions, ProductionElementsHelper } from './elements';
import { CollectionsAPI, CollectionsStats, CollectionsOptions, ProductionCollectionHelper } from './collections';
import { SelectorAPI, SelectorStats, SelectorOptions, ProductionSelectorHelper } from './selector';

export interface DOMHelpersStats {
  elements?: ElementsStats;
  collections?: CollectionsStats;
  selector?: SelectorStats;
}

export interface DOMHelpersOptions {
  elements?: ElementsOptions;
  collections?: CollectionsOptions;
  selector?: SelectorOptions;
}

export interface DOMHelpersAPI {
  Elements: ElementsProxy;
  Collections: CollectionsAPI;
  Selector: SelectorAPI;
  ProductionElementsHelper: typeof ProductionElementsHelper;
  ProductionCollectionHelper: typeof ProductionCollectionHelper;
  ProductionSelectorHelper: typeof ProductionSelectorHelper;
  version: string;
  isReady(): boolean;
  getStats(): DOMHelpersStats;
  clearAll(): void;
  destroyAll(): void;
  configure(options: DOMHelpersOptions): DOMHelpersAPI;
}

export declare const DOMHelpers: DOMHelpersAPI;
export declare const Elements: ElementsProxy;
export declare const Collections: CollectionsAPI;
export declare const Selector: SelectorAPI;
export { ProductionElementsHelper, ProductionCollectionHelper, ProductionSelectorHelper };

// Re-export types
export * from './elements';
export * from './collections';
export * from './selector';
`;

  // Write declaration files
  fs.writeFileSync(path.join(distDir, 'elements.d.ts'), elementsDeclaration, 'utf8');
  fs.writeFileSync(path.join(distDir, 'collections.d.ts'), collectionsDeclaration, 'utf8');
  fs.writeFileSync(path.join(distDir, 'dom-helpers.d.ts'), domHelpersDeclaration, 'utf8');
  
  console.log('✅ TypeScript declarations created');
}

/**
 * Main build function
 */
async function buildAll() {
  try {
    console.log('🚀 Starting complete build process...\n');
    
    // Build individual helpers
    await buildElements();
    await buildCollections();
    await buildSelector();
    
    // Build combined bundle
    await buildCombined();
    
    // Create TypeScript declarations
    createTypeScriptDeclarations();
    
    console.log('\n🎉 All distribution files built successfully!');
    console.log('\nGenerated files:');
    console.log('📁 Individual minified files:');
    console.log('  - elements.min.js');
    console.log('  - collections.min.js');
    console.log('  - selector.min.js');
    console.log('📁 Combined bundle files:');
    console.log('  - dom-helpers.bundle.js (unminified)');
    console.log('  - dom-helpers.min.js (minified)');
    console.log('📁 TypeScript declarations:');
    console.log('  - elements.d.ts');
    console.log('  - collections.d.ts');
    console.log('  - dom-helpers.d.ts');
    
  } catch (error) {
    console.error(`❌ Build failed:`, error.message);
    process.exit(1);
  }
}

// Run the build
buildAll();
