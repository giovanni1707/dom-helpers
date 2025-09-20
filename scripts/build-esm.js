const fs = require('fs');
const path = require('path');

// Read the source file
const srcPath = path.join(__dirname, '../src/elements-helper.js');
const distPath = path.join(__dirname, '../dist/elements-helper.esm.js');

let content = fs.readFileSync(srcPath, 'utf8');

// Convert UMD to ES Module
content = content.replace(
  /\(function\(global\) \{[\s\S]*?'use strict';/,
  `'use strict';`
);

// Remove the UMD wrapper ending and replace with ES module exports
content = content.replace(
  /\/\/ Export for different environments[\s\S]*?\}\)\(typeof window[\s\S]*?\);$/,
  `// ES Module exports
export { Elements, ProductionElementsHelper };
export default Elements;`
);

// Ensure dist directory exists
const distDir = path.dirname(distPath);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Write the ES module version
fs.writeFileSync(distPath, content);

console.log('✅ ES Module build completed: dist/elements-helper.esm.js');
