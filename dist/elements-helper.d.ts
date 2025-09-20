// TypeScript definitions for Elements Helper

export interface ElementsHelperOptions {
  enableLogging?: boolean;
  autoCleanup?: boolean;
  cleanupInterval?: number;
  maxCacheSize?: number;
  debounceDelay?: number;
}

export interface ElementsStats {
  hits: number;
  misses: number;
  cacheSize: number;
  lastCleanup: number;
  hitRate: number;
  uptime: number;
}

export interface ElementsProxy {
  [elementId: string]: HTMLElement | null;
  
  // Utility methods
  stats(): ElementsStats;
  clear(): void;
  destroy(): void;
  destructure(...ids: string[]): { [key: string]: HTMLElement | null };
  getRequired(...ids: string[]): { [key: string]: HTMLElement };
  waitFor(...ids: string[]): Promise<{ [key: string]: HTMLElement }>;
  isCached(id: string): boolean;
  configure(options: Partial<ElementsHelperOptions>): ElementsProxy;
  
  // Helper instance access
  helper: ProductionElementsHelper;
}

export declare class ProductionElementsHelper {
  constructor(options?: ElementsHelperOptions);
  
  // Public API
  getStats(): ElementsStats;
  clearCache(): void;
  destroy(): void;
  isCached(id: string): boolean;
  getCacheSnapshot(): string[];
  destructure(...ids: string[]): { [key: string]: HTMLElement | null };
  getRequired(...ids: string[]): { [key: string]: HTMLElement };
  waitFor(...ids: string[]): Promise<{ [key: string]: HTMLElement }>;
  
  // Proxy interface
  Elements: ElementsProxy;
}

// Global Elements object
export declare const Elements: ElementsProxy;

// Default export
declare const _default: ElementsProxy;
export default _default;
