/**
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
