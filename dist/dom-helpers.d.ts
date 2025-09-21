/**
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
