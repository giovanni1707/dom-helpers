#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const srcDir = path.join(__dirname, '..', 'src');

// Build type from command line argument
const buildType = process.argv[2] || 'all';

console.log(`🔨 Building ${buildType}...`);

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
 * Create ESM version of a UMD module
 */
function createESMVersion(umdContent, moduleName) {
  // Extract the main function content from UMD wrapper
  const functionMatch = umdContent.match(/\(function\(global\)\s*\{([\s\S]*)\}\)\(typeof window[^)]+\);?\s*$/);
  
  if (!functionMatch) {
    throw new Error(`Could not parse UMD structure for ${moduleName}`);
  }
  
  const functionBody = functionMatch[1];
  
  // Create ESM version
  const esmContent = `/**
 * ${moduleName} - ES Module
 * High-performance DOM utility with intelligent caching
 */

${functionBody.trim()}

// ES Module exports
export { ${getExportNames(moduleName).join(', ')} };
`;

  return esmContent;
}

/**
 * Get export names for a module
 */
function getExportNames(moduleName) {
  switch (moduleName) {
    case 'Elements Helper':
      return ['Elements', 'ProductionElementsHelper'];
    case 'Collections Helper':
      return ['Collections', 'ProductionCollectionHelper'];
    case 'DOM Helpers':
      return ['DOMHelpers', 'Elements', 'Collections', 'ProductionElementsHelper', 'ProductionCollectionHelper'];
    default:
      return [];
  }
}

/**
 * Build Elements Helper
 */
function buildElements() {
  console.log('📦 Building Elements Helper...');
  
  const elementsContent = readSourceFile('elements-helper.js');
  
  // UMD version
  writeOutputFile('elements.js', elementsContent);
  
  // ESM version
  const elementsESM = createESMVersion(elementsContent, 'Elements Helper');
  writeOutputFile('elements.esm.js', elementsESM);
  
  console.log('✅ Elements Helper built successfully');
}

/**
 * Build Collections Helper
 */
function buildCollections() {
  console.log('📦 Building Collections Helper...');
  
  const collectionsContent = readSourceFile('collections.js');
  
  // UMD version
  writeOutputFile('collections.js', collectionsContent);
  
  // ESM version
  const collectionsESM = createESMVersion(collectionsContent, 'Collections Helper');
  writeOutputFile('collections.esm.js', collectionsESM);
  
  console.log('✅ Collections Helper built successfully');
}

/**
 * Build Combined Bundle
 */
function buildCombined() {
  console.log('📦 Building Combined Bundle...');
  
  const elementsContent = readSourceFile('elements-helper.js');
  const collectionsContent = readSourceFile('collections.js');
  
  // Create combined UMD bundle
  const combinedContent = `/**
 * DOM Helpers - Combined Bundle
 * High-performance vanilla JavaScript DOM utilities with intelligent caching
 * 
 * Includes:
 * - Elements Helper (ID-based DOM access)
 * - Collections Helper (Class/Tag/Name-based DOM access)
 * 
 * @version 2.0.0
 * @license MIT
 */

(function(global) {
  'use strict';

  // ===== ELEMENTS HELPER =====
  ${extractHelperCode(elementsContent)}

  // ===== COLLECTIONS HELPER =====
  ${extractHelperCode(collectionsContent)}

  // ===== COMBINED API =====
  const DOMHelpers = {
    // Individual helpers
    Elements: global.Elements,
    Collections: global.Collections,
    
    // Helper classes
    ProductionElementsHelper: global.ProductionElementsHelper,
    ProductionCollectionHelper: global.ProductionCollectionHelper,
    
    // Utility methods
    version: '2.0.0',
    
    // Check if both helpers are available
    isReady() {
      return !!(this.Elements && this.Collections);
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
    },
    
    // Destroy all helpers
    destroyAll() {
      if (this.Elements && typeof this.Elements.destroy === 'function') {
        this.Elements.destroy();
      }
      
      if (this.Collections && typeof this.Collections.destroy === 'function') {
        this.Collections.destroy();
      }
    },
    
    // Configure both helpers
    configure(options = {}) {
      if (this.Elements && typeof this.Elements.configure === 'function') {
        this.Elements.configure(options.elements || options);
      }
      
      if (this.Collections && typeof this.Collections.configure === 'function') {
        this.Collections.configure(options.collections || options);
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
      ProductionElementsHelper: global.ProductionElementsHelper,
      ProductionCollectionHelper: global.ProductionCollectionHelper
    };
  } else if (typeof define === 'function' && define.amd) {
    // AMD/RequireJS
    define([], function() {
      return {
        DOMHelpers,
        Elements: global.Elements,
        Collections: global.Collections,
        ProductionElementsHelper: global.ProductionElementsHelper,
        ProductionCollectionHelper: global.ProductionCollectionHelper
      };
    });
  } else {
    // Browser globals
    global.DOMHelpers = DOMHelpers;
  }

})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
`;

  // UMD version
  writeOutputFile('dom-helpers.js', combinedContent);
  
  // ESM version
  const combinedESM = createESMVersion(combinedContent, 'DOM Helpers');
  writeOutputFile('dom-helpers.esm.js', combinedESM);
  
  console.log('✅ Combined bundle built successfully');
}

/**
 * Extract helper code from UMD wrapper
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
 * Main build function
 */
function build() {
  try {
    switch (buildType) {
      case 'elements':
        buildElements();
        break;
      case 'collections':
        buildCollections();
        break;
      case 'combined':
        buildCombined();
        break;
      case 'all':
        buildElements();
        buildCollections();
        buildCombined();
        break;
      default:
        console.error(`❌ Unknown build type: ${buildType}`);
        console.log('Available types: elements, collections, combined, all');
        process.exit(1);
    }
    
    console.log(`🎉 Build completed successfully!`);
    
  } catch (error) {
    console.error(`❌ Build failed:`, error.message);
    process.exit(1);
  }
}

// Run the build
build();
