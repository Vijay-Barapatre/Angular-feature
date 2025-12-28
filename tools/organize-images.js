const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'src/app/features';
const DEST_DIR = 'src/assets/gallery-images';
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.svg', '.gif']);

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            if (EXTENSIONS.has(path.extname(fullPath).toLowerCase())) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

function main() {
    console.log('Starting image organization...');

    if (!fs.existsSync(DEST_DIR)) {
        fs.mkdirSync(DEST_DIR, { recursive: true });
        console.log(`Created directory: ${DEST_DIR}`);
    }

    const rootDir = process.cwd();
    const headers = [];
    const sourcePath = path.join(rootDir, SOURCE_DIR);

    if (!fs.existsSync(sourcePath)) {
        console.error(`Source directory not found: ${sourcePath}`);
        return;
    }

    const files = getAllFiles(sourcePath);
    console.log(`Found ${files.length} images.`);

    const galleryData = [];

    files.forEach(filePath => {
        // filePath is absolute usually if we used path.join with cwd, but here it is relative to cwd if we passed relative to getAllFiles?
        // Actually path.join('src/app/features', file) keeps it relative.

        // Let's rely on string manipulation for relative paths or parts
        // Normalize to forward slashes for easier splitting
        const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
        const parts = relativePath.split('/');

        // Expecting: src/app/features/<feature>/...
        const featuresIndex = parts.indexOf('features');
        if (featuresIndex === -1) {
            return;
        }

        const featureName = parts[featuresIndex + 1];

        // Try to find 'use-case-X'
        const useCasePart = parts.find(p => p.startsWith('use-case-'));
        let useCaseNumber = '0';
        if (useCasePart) {
            const match = useCasePart.match(/use-case-(\d+)/);
            if (match) {
                useCaseNumber = match[1];
            }
        }

        const originalFileName = path.basename(filePath);
        const newFileName = `${featureName}_${useCaseNumber}_${originalFileName}`;
        const destPath = path.join(DEST_DIR, newFileName);

        try {
            fs.copyFileSync(filePath, destPath);
            console.log(`Copied: ${newFileName}`);

            galleryData.push({
                feature: featureName,
                useCase: useCaseNumber,
                fileName: newFileName,
                absolutePath: destPath
            });
        } catch (err) {
            console.error(`Error copying ${filePath}:`, err);
        }
    });

    generateMarkdown(galleryData);
}

function generateMarkdown(data) {
    const mdPath = 'gallery.md';
    let content = '# Image Gallery\n\n';

    // Group by Feature
    const byFeature = {};
    data.forEach(item => {
        if (!byFeature[item.feature]) {
            byFeature[item.feature] = [];
        }
        byFeature[item.feature].push(item);
    });

    const sortedFeatures = Object.keys(byFeature).sort();

    for (const feature of sortedFeatures) {
        const items = byFeature[feature];
        content += `## ${feature.toUpperCase()}\n\n`;

        // Sort by use case (numeric) then filename
        items.sort((a, b) => {
            const ucA = parseInt(a.useCase);
            const ucB = parseInt(b.useCase);
            if (ucA !== ucB) return ucA - ucB;
            return a.fileName.localeCompare(b.fileName);
        });

        for (const item of items) {
            // For markdown in root, path to assets
            // If gallery.md is in root, path is src/assets/gallery-images/...
            content += `### Use Case ${item.useCase}\n`;
            content += `**File**: \`${item.fileName}\`\n\n`;
            content += `![${item.fileName}](src/assets/gallery-images/${item.fileName})\n\n`;
        }
        content += '---\n\n';
    }

    fs.writeFileSync(mdPath, content);
    console.log(`Generated gallery at ${mdPath}`);
}

main();
