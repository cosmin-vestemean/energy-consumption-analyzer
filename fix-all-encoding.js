// Comprehensive encoding fix script for all UTF-8 characters including emojis
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
  'pv-configuration.html',
  'index.html'
];

// Comprehensive character encoding fixes
const encodingFixes = {
  // Mathematical symbols
  '├Ś': '×',
  '├Ě': '÷',
  'Ôîł': '⌈',
  'Ôîë': '⌉',
  '¤â': 'σ',
  '╬╝': 'μ',
  
  // Currency and checkmarks
  'ÔéČ': '€',
  'Ôťů': '✓',
  
  // Emojis - These are multi-byte UTF-8 sequences that got corrupted
  '­čôŐ': '📊',  // Bar chart
  'ÔśÇ´ŞĆ': '☀️',  // Sun
  '­čĺ░': '💰',  // Money bag
  '­čôł': '📈',  // Chart increasing
  '­čÄ»': '🎯',  // Direct hit
  '­čöŹ': '🔍',  // Magnifying glass
  '­čô▒': '📱',  // Mobile phone
  '­čôÜ': '📚',  // Books
  '­čöÁ': '🔋',  // Battery
  '­ččó': '⭐',  // Star
  '­ččá': '⚡',  // Lightning
  '­čöž': '🔧',  // Wrench
  '­čöő': '🔌',  // Electric plug
  '­čÜÇ': '🚀',  // Rocket
  '­čĺí': '💡',  // Light bulb
  '­čôő': '📈',  // Chart with upward trend
  '­čôľ': '📕',  // Closed book
  '­čôů': '📊',  // Bar chart (alternative)
  '­čôî': '📌',  // Pushpin
  '­čîč': '🌍',  // Earth globe
  '­čô×': '📞',  // Telephone receiver
  
  // Additional Romanian characters that might be corrupted
  'Ôćĺ': '→',
  'ÔćÉ': '←',
  '╚Ť': 'ș',
  '╚ť': 'Ș',
  '╚Ť─â': 'ș',
};

function fixEncoding(text) {
  let fixed = text;
  
  // Sort by length (longest first) to avoid partial replacements
  const entries = Object.entries(encodingFixes).sort((a, b) => b[0].length - a[0].length);
  
  for (const [wrong, correct] of entries) {
    // Use split/join instead of regex to avoid special character issues
    fixed = fixed.split(wrong).join(correct);
  }
  
  return fixed;
}

function fixFile(filename) {
  const filePath = path.join(docsDir, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ File not found: ${filename}`);
    return;
  }
  
  console.log(`Fixing encoding in ${filename}...`);
  
  // Read the file with UTF-8 encoding
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Count issues before fixing
  let issueCount = 0;
  for (const [wrong] of Object.entries(encodingFixes)) {
    issueCount += (content.match(new RegExp(wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  }
  
  if (issueCount === 0) {
    console.log(`  ✓ ${filename} - No issues found`);
    return;
  }
  
  // Fix encoding issues
  const fixedContent = fixEncoding(content);
  
  // Write back with UTF-8 encoding
  fs.writeFileSync(filePath, fixedContent, 'utf8');
  
  console.log(`  ✓ ${filename} - Fixed ${issueCount} encoding issues`);
}

// Process all files
console.log('═══════════════════════════════════════════════');
console.log('  Comprehensive UTF-8 Encoding Fix');
console.log('═══════════════════════════════════════════════\n');

let totalFixed = 0;

files.forEach(file => {
  try {
    fixFile(file);
    totalFixed++;
  } catch (error) {
    console.error(`✗ Error fixing ${file}:`, error.message);
  }
});

console.log('\n═══════════════════════════════════════════════');
console.log(`✓ Processed ${totalFixed} of ${files.length} files`);
console.log('═══════════════════════════════════════════════\n');
