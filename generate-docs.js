import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTML template
const createTemplate = (title, content, isIndex = false) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Electric Consumption Analyzer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .nav-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #667eea;
        }

        .back-button {
            background: #667eea;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            text-decoration: none;
            transition: background 0.3s;
            font-weight: 500;
        }

        .back-button:hover {
            background: #5568d3;
        }

        .home-button {
            background: #00C49F;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            text-decoration: none;
            transition: background 0.3s;
            font-weight: 500;
        }

        .home-button:hover {
            background: #00a885;
        }

        h1 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 2.5em;
        }

        h2 {
            color: #667eea;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 1.8em;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 10px;
        }

        h3 {
            color: #764ba2;
            margin-top: 25px;
            margin-bottom: 12px;
            font-size: 1.4em;
        }

        h4 {
            color: #555;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 1.1em;
        }

        p {
            margin-bottom: 15px;
            line-height: 1.8;
        }

        ul, ol {
            margin-left: 25px;
            margin-bottom: 15px;
        }

        li {
            margin-bottom: 8px;
        }

        code {
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            color: #c7254e;
        }

        pre {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 20px 0;
            border-left: 4px solid #667eea;
        }

        pre code {
            background: none;
            padding: 0;
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }

        th {
            background: #667eea;
            color: white;
            font-weight: 600;
        }

        tr:hover {
            background: #f9f9f9;
        }

        blockquote {
            border-left: 4px solid #00C49F;
            padding-left: 20px;
            margin: 20px 0;
            color: #666;
            font-style: italic;
        }

        strong {
            color: #667eea;
            font-weight: 600;
        }

        a {
            color: #667eea;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        hr {
            border: none;
            border-top: 2px solid #e0e0e0;
            margin: 30px 0;
        }

        .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }

        .info {
            background: #d1ecf1;
            border-left: 4px solid #0c5460;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }

        .success {
            background: #d4edda;
            border-left: 4px solid #28a745;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }

        @media print {
            body {
                background: white;
            }
            .nav-header {
                display: none;
            }
            .container {
                box-shadow: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="nav-header">
            <a href="${isIndex ? 'javascript:window.close()' : 'index.html'}" class="back-button">
                ← ${isIndex ? 'Back to App' : 'Documentation Hub'}
            </a>
            ${!isIndex ? '<a href="javascript:window.close()" class="home-button">Close Documentation</a>' : ''}
        </div>
        ${content}
    </div>
</body>
</html>`;

// Read markdown files and convert to HTML
const docsDir = path.join(__dirname, 'public', 'docs');
if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
}

const markdownFiles = [
    { input: 'CLIENT_SUMMARY.md', output: 'client-summary.html', title: 'Client Summary' },
    { input: 'QUICK_REFERENCE.md', output: 'quick-reference.html', title: 'Quick Reference Guide' },
    { input: 'TECHNICAL_ANALYSIS_FORMULAS.md', output: 'technical-formulas.html', title: 'Technical Formulas & Analysis' },
    { input: 'DATA_READING_IMPROVEMENTS.md', output: 'data-processing.html', title: 'Data Processing & Validation' }
];

markdownFiles.forEach(file => {
    const inputPath = path.join(__dirname, file.input);
    const outputPath = path.join(docsDir, file.output);
    
    if (fs.existsSync(inputPath)) {
        const markdown = fs.readFileSync(inputPath, 'utf-8');
        const htmlContent = marked(markdown);
        const fullHtml = createTemplate(file.title, htmlContent, false);
        
        fs.writeFileSync(outputPath, fullHtml);
        console.log(`✓ Generated ${file.output}`);
    } else {
        console.log(`✗ File not found: ${file.input}`);
    }
});

console.log('\n✓ All documentation files generated successfully!');
