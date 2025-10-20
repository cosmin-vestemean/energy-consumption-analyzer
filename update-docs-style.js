// Script to update documentation HTML files with VINCI styling
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, 'public', 'docs');
const files = ['client-summary.html', 'quick-reference.html', 'technical-formulas.html', 'data-processing.html', 'pv-configuration.html'];

const newHeader = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} - Energy Consumption Analyzer</title>
    <link rel="stylesheet" href="docs-style.css">
</head>
<body>
    <div class="header-bar">
        <div class="nav-header">
            <div class="page-title">{{ICON}} {{PAGE_TITLE}}</div>
            <div class="nav-buttons">
                <a href="/docs/index.html" class="home-button">📚 Documentation Hub</a>
                <a href="javascript:window.close()" class="back-button">← Back</a>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="doc-content">`;

const newFooter = `
        </div>
    </div>
</body>
</html>`;

const titles = {
    'client-summary.html': { title: 'Client Summary', icon: '👥', pageTitle: 'Client Summary' },
    'quick-reference.html': { title: 'Quick Reference', icon: '⚡', pageTitle: 'Quick Reference' },
    'technical-formulas.html': { title: 'Technical Formulas', icon: '🔬', pageTitle: 'Technical Formulas' },
    'data-processing.html': { title: 'Data Processing', icon: '📊', pageTitle: 'Data Processing' },
    'pv-configuration.html': { title: 'PV Configuration', icon: '⚙️', pageTitle: 'PV System Configuration' }
};

files.forEach(file => {
    const filePath = path.join(docsDir, file);
    
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extract content between <body> and </body>
        const bodyMatch = content.match(/<body>[\s\S]*?<\/body>/i);
        if (!bodyMatch) {
            console.log(`Skipping ${file} - no body tag found`);
            return;
        }
        
        // Extract the actual content (remove old navigation and container divs)
        let bodyContent = bodyMatch[0]
            .replace(/<body>/i, '')
            .replace(/<\/body>/i, '')
            .trim();
        
        // Remove old navigation headers
        bodyContent = bodyContent.replace(/<div class="nav-header">[\s\S]*?<\/div>/gi, '');
        bodyContent = bodyContent.replace(/<div class="container">/gi, '');
        bodyContent = bodyContent.replace(/<\/div>\s*<\/body>/gi, '');
        
        // Remove trailing </div> tags
        bodyContent = bodyContent.replace(/<\/div>\s*$/g, '').trim();
        
        // Build new header with proper titles
        let header = newHeader
            .replace('{{TITLE}}', titles[file].title)
            .replace('{{ICON}}', titles[file].icon)
            .replace('{{PAGE_TITLE}}', titles[file].pageTitle);
        
        // Create new file content
        const newContent = header + '\n' + bodyContent + '\n' + newFooter;
        
        // Write back
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});

console.log('Documentation files updated successfully!');
