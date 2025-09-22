/**
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
