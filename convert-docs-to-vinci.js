// Script to convert original documentation HTML files to VINCI styling
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, 'public', 'docs');

const files = [
    { 
        original: 'client-summary-original.html',
        output: 'client-summary.html',
        title: 'Client Summary',
        icon: '👥',
        pageTitle: 'Client Summary'
    },
    { 
        original: 'quick-reference-original.html',
        output: 'quick-reference.html',
        title: 'Quick Reference',
        icon: '⚡',
        pageTitle: 'Quick Reference'
    },
    { 
        original: 'technical-formulas-original.html',
        output: 'technical-formulas.html',
        title: 'Technical Formulas',
        icon: '🔬',
        pageTitle: 'Technical Formulas'
    },
    { 
        original: 'data-processing-original.html',
        output: 'data-processing.html',
        title: 'Data Processing',
        icon: '📊',
        pageTitle: 'Data Processing'
    },
    { 
        original: 'pv-configuration-original.html',
        output: 'pv-configuration.html',
        title: 'PV Configuration',
        icon: '⚙️',
        pageTitle: 'PV System Configuration'
    }
];

const newHeader = (title, icon, pageTitle) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Energy Consumption Analyzer</title>
    <link rel="stylesheet" href="docs-style.css">
</head>
<body>
    <div class="header-bar">
        <div class="nav-header">
            <div class="page-title">${icon} ${pageTitle}</div>
            <div class="nav-buttons">
                <a href="/docs/index.html" class="home-button">📚 Documentation Hub</a>
                <a href="javascript:window.close()" class="back-button">← Back</a>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="doc-content">
`;

const newFooter = `
        </div>
    </div>
</body>
</html>`;

files.forEach(file => {
    const originalPath = path.join(docsDir, file.original);
    const outputPath = path.join(docsDir, file.output);
    
    if (!fs.existsSync(originalPath)) {
        console.log(`Original file not found: ${file.original}`);
        return;
    }
    
    // Read the original file with proper encoding
    let content = fs.readFileSync(originalPath, 'utf16le');
    
    // If UTF-16LE didn't work, try UTF-8
    if (!content.includes('<body')) {
        content = fs.readFileSync(originalPath, 'utf8');
    }
    
    // Extract content between <body> and </body>
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    
    if (!bodyMatch) {
        console.log(`No body content found in: ${file.original}`);
        return;
    }
    
    let bodyContent = bodyMatch[1].trim();
    
    // Remove the old container div and its styling
    bodyContent = bodyContent.replace(/<div class="container">/, '');
    
    // Remove the nav-header section
    bodyContent = bodyContent.replace(/<div class="nav-header">[\s\S]*?<\/div>/, '');
    
    // Remove trailing </div> (closing container)
    const lastDivIndex = bodyContent.lastIndexOf('</div>');
    if (lastDivIndex !== -1) {
        bodyContent = bodyContent.substring(0, lastDivIndex);
    }
    
    // Clean up extra whitespace
    bodyContent = bodyContent.trim();
    
    // Create the new file
    const newContent = newHeader(file.title, file.icon, file.pageTitle) + '\n' + bodyContent + '\n' + newFooter;
    
    // Write the output file
    fs.writeFileSync(outputPath, newContent, 'utf8');
    console.log(`✓ Converted ${file.original} → ${file.output}`);
});

console.log('\n✅ All documentation files converted successfully!');
