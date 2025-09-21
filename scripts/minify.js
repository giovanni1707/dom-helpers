#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const distDir = path.join(__dirname, '..', 'dist');

console.log('🗜️  Minifying distribution files...');

/**
 * Minify a file using Terser
 */
async function minifyFile(inputFile, outputFile) {
  const inputPath = path.join(distDir, inputFile);
  const outputPath = path.join(distDir, outputFile);
  
  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠️  Warning: ${inputFile} not found, skipping minification`);
    return;
  }
  
  try {
    const code = fs.readFileSync(inputPath, 'utf8');
    const originalSize = code.length;
    
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
          'DOMHelpers',
          'ProductionElementsHelper',
          'ProductionCollectionHelper',
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
          'Name'
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
    
    const minifiedCode = result.code;
    const minifiedSize = minifiedCode.length;
    const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
    
    fs.writeFileSync(outputPath, minifiedCode, 'utf8');
    
    console.log(`✅ ${outputFile}: ${(originalSize / 1024).toFixed(1)}KB → ${(minifiedSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
    
  } catch (error) {
    console.error(`❌ Failed to minify ${inputFile}:`, error.message);
    throw error;
  }
}

/**
 * Main minification function
 */
async function minifyAll() {
  try {
    // Minify individual helpers
    await minifyFile('elements.js', 'elements.min.js');
    await minifyFile('collections.js', 'collections.min.js');
    
    // Minify combined bundle
    await minifyFile('dom-helpers.js', 'dom-helpers.min.js');
    
    // Create TypeScript declaration files
    createTypeScriptDeclarations();
    
    console.log('🎉 Minification completed successfully!');
    
  } catch (error) {
    console.error('❌ Minification failed:', error.message);
    process.exit(1);
  }
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

export interface DOMHelpersStats {
  elements?: ElementsStats;
  collections?: CollectionsStats;
}

export interface DOMHelpersOptions {
  elements?: ElementsOptions;
  collections?: CollectionsOptions;
}

export interface DOMHelpersAPI {
  Elements: ElementsProxy;
  Collections: CollectionsAPI;
  ProductionElementsHelper: typeof ProductionElementsHelper;
  ProductionCollectionHelper: typeof ProductionCollectionHelper;
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
export { ProductionElementsHelper, ProductionCollectionHelper };

// Re-export types
export * from './elements';
export * from './collections';
`;

  // Write declaration files
  fs.writeFileSync(path.join(distDir, 'elements.d.ts'), elementsDeclaration, 'utf8');
  fs.writeFileSync(path.join(distDir, 'collections.d.ts'), collectionsDeclaration, 'utf8');
  fs.writeFileSync(path.join(distDir, 'dom-helpers.d.ts'), domHelpersDeclaration, 'utf8');
  
  console.log('✅ TypeScript declarations created');
}

// Run minification
minifyAll();
