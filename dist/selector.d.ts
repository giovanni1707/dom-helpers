/**
 * Selector Helper - TypeScript Declarations
 */

export interface SelectorStats {
  hits: number;
  misses: number;
  cacheSize: number;
  hitRate: number;
  uptime: number;
  lastCleanup: number;
  selectorBreakdown: Record<string, number>;
}

export interface SelectorOptions {
  enableLogging?: boolean;
  autoCleanup?: boolean;
  cleanupInterval?: number;
  maxCacheSize?: number;
  debounceDelay?: number;
  enableSmartCaching?: boolean;
}

export interface EnhancedSelectorCollection {
  readonly length: number;
  readonly _originalNodeList: NodeList;
  readonly _selector: string;
  readonly _cachedAt: number;

  // Standard NodeList methods
  item(index: number): Element | null;
  entries(): IterableIterator<[number, Element]>;
  keys(): IterableIterator<number>;
  values(): IterableIterator<Element>;

  // Enhanced array methods
  toArray(): Element[];
  forEach(callback: (element: Element, index: number, collection: EnhancedSelectorCollection) => void, thisArg?: any): void;
  map<T>(callback: (element: Element, index: number, collection: EnhancedSelectorCollection) => T, thisArg?: any): T[];
  filter(callback: (element: Element, index: number, collection: EnhancedSelectorCollection) => boolean, thisArg?: any): Element[];
  find(callback: (element: Element, index: number, collection: EnhancedSelectorCollection) => boolean, thisArg?: any): Element | undefined;
  some(callback: (element: Element, index: number, collection: EnhancedSelectorCollection) => boolean, thisArg?: any): boolean;
  every(callback: (element: Element, index: number, collection: EnhancedSelectorCollection) => boolean, thisArg?: any): boolean;
  reduce<T>(callback: (previousValue: T, currentValue: Element, currentIndex: number, collection: EnhancedSelectorCollection) => T, initialValue: T): T;

  // Utility methods
  first(): Element | null;
  last(): Element | null;
  at(index: number): Element | null;
  isEmpty(): boolean;

  // DOM manipulation helpers
  addClass(className: string): EnhancedSelectorCollection;
  removeClass(className: string): EnhancedSelectorCollection;
  toggleClass(className: string): EnhancedSelectorCollection;
  setProperty(prop: string, value: any): EnhancedSelectorCollection;
  setAttribute(attr: string, value: string): EnhancedSelectorCollection;
  setStyle(styles: Partial<CSSStyleDeclaration>): EnhancedSelectorCollection;
  on(event: string, handler: EventListener): EnhancedSelectorCollection;
  off(event: string, handler: EventListener): EnhancedSelectorCollection;

  // Filtering helpers
  visible(): Element[];
  hidden(): Element[];
  enabled(): Element[];
  disabled(): Element[];

  // Query within results
  within(selector: string): EnhancedSelectorCollection;

  // Array-like access
  [index: number]: Element;
  [Symbol.iterator](): Iterator<Element>;
}

export interface SelectorQueryProxy {
  [key: string]: Element | null;
  (selector: string): Element | null;
}

export interface SelectorQueryAllProxy {
  [key: string]: EnhancedSelectorCollection;
  (selector: string): EnhancedSelectorCollection;
}

export interface ScopedQueries {
  within(container: Element | string, selector: string): Element | null;
  withinAll(container: Element | string, selector: string): EnhancedSelectorCollection;
}

export interface SelectorAPI {
  query: SelectorQueryProxy;
  queryAll: SelectorQueryAllProxy;
  Scoped: ScopedQueries;
  
  // Utility methods
  helper: ProductionSelectorHelper;
  stats(): SelectorStats;
  clear(): void;
  destroy(): void;
  waitFor(selector: string, timeout?: number): Promise<Element>;
  waitForAll(selector: string, minCount?: number, timeout?: number): Promise<EnhancedSelectorCollection>;
  configure(options: SelectorOptions): SelectorAPI;
}

export declare class ProductionSelectorHelper {
  constructor(options?: SelectorOptions);
  
  readonly cache: Map<string, any>;
  readonly weakCache: WeakMap<Element, any>;
  readonly options: Required<SelectorOptions>;
  readonly stats: {
    hits: number;
    misses: number;
    cacheSize: number;
    lastCleanup: number;
    selectorTypes: Map<string, number>;
  };
  readonly isDestroyed: boolean;

  // Public methods
  getStats(): SelectorStats;
  clearCache(): void;
  destroy(): void;
  waitForSelector(selector: string, timeout?: number): Promise<Element>;
  waitForSelectorAll(selector: string, minCount?: number, timeout?: number): Promise<EnhancedSelectorCollection>;

  // Proxy properties
  readonly query: SelectorQueryProxy;
  readonly queryAll: SelectorQueryAllProxy;
  readonly Scoped: ScopedQueries;
}

export declare const Selector: SelectorAPI;

// Default export
export default Selector;
