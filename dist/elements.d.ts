/**
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
