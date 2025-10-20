// Script to fix encoding issues in documentation HTML files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, 'public', 'docs');

// Files to fix
const files = [
  'client-summary.html',
  'quick-reference.html',
  'technical-formulas.html',
  'data-processing.html',
  'pv-configuration.html'
];

// Character encoding fixes mapping
const encodingFixes = {
  'Ôťů': '✓',
  'ÔéČ': '€',
  '├Ś': '×',
  '├Ě': '÷',
  'Ôîł': '⌈',
  'Ôîë': '⌉',
  '¤â': 'σ',
  '╬╝': 'μ',
  '&#215;': '×',
  '&#8364;': '€',
  '&#247;': '÷',
};

function fixEncoding(text) {
  let fixed = text;
  
  // Replace all corrupted characters
  for (const [wrong, correct] of Object.entries(encodingFixes)) {
    fixed = fixed.split(wrong).join(correct);
  }
  
  return fixed;
}

function fixFile(filename) {
  const filePath = path.join(docsDir, filename);
  
  console.log(`Fixing encoding in ${filename}...`);
  
  // Read the file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix encoding issues
  const fixedContent = fixEncoding(content);
  
  // Write back with UTF-8 BOM to ensure proper encoding
  fs.writeFileSync(filePath, fixedContent, 'utf8');
  
  console.log(`✓ Fixed ${filename}`);
}

// Process all files
console.log('Starting encoding fix...\n');

files.forEach(file => {
  try {
    fixFile(file);
  } catch (error) {
    console.error(`Error fixing ${file}:`, error.message);
  }
});

console.log('\n✓ Encoding fix completed!');
