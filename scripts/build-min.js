const fs = require('fs');
const path = require('path');

// Simple minification function (basic implementation)
function minify(code) {
  return code
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around operators and punctuation
    .replace(/\s*([{}();,:])\s*/g, '$1')
    .replace(/\s*([=+\-*/<>!&|])\s*/g, '$1')
    // Remove leading/trailing whitespace
    .trim();
}

// Read the source file
const srcPath = path.join(__dirname, '../src/elements-helper.js');
const distPath = path.join(__dirname, '../dist/elements-helper.min.js');

let content = fs.readFileSync(srcPath, 'utf8');

// Add minification header
const header = `/*! Elements Helper v1.0.0 | MIT License | github.com/yourusername/elements-helper */\n`;

// Minify the content
const minified = header + minify(content);

// Ensure dist directory exists
const distDir = path.dirname(distPath);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Write the minified version
fs.writeFileSync(distPath, minified);

const originalSize = content.length;
const minifiedSize = minified.length;
const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);

console.log('✅ Minified build completed: dist/elements-helper.min.js');
console.log(`📊 Size: ${originalSize} bytes → ${minifiedSize} bytes (${savings}% smaller)`);
