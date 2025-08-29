import packageJson from '../../package.json';
import fs from 'node:fs';
import path from 'node:path';

// Create a copy of the package.json for Netlify deployment
const netlifyPackageJson = { ...packageJson };

// Modify package.json for Netlify deployment
netlifyPackageJson.name = 'rsshub-netlify';

// Remove unnecessary fields for deployment
// @ts-ignore
delete netlifyPackageJson.scripts;
// @ts-ignore
delete netlifyPackageJson.main;
// @ts-ignore
delete netlifyPackageJson.files;
// @ts-ignore
delete netlifyPackageJson['lint-staged'];
// @ts-ignore
delete netlifyPackageJson.devDependencies;

// Ensure netlify directories exist
const netlifyDir = 'netlify';
const staticDir = path.join(netlifyDir, 'static');
const assetsDir = path.join(staticDir, 'assets');

if (!fs.existsSync(netlifyDir)) {
    fs.mkdirSync(netlifyDir, { recursive: true });
}

if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true });
}

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Copy static assets from lib/assets to netlify/static/assets
const sourceAssetsDir = 'lib/assets';
if (fs.existsSync(sourceAssetsDir)) {
    const assetFiles = fs.readdirSync(sourceAssetsDir);
    
    for (const file of assetFiles) {
        const sourcePath = path.join(sourceAssetsDir, file);
        const destPath = path.join(assetsDir, file);
        
        if (fs.statSync(sourcePath).isFile()) {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`📁 Copied asset: ${file}`);
        }
    }
}

// Write the modified package.json to netlify directory
fs.writeFileSync(path.join(netlifyDir, 'package.json'), JSON.stringify(netlifyPackageJson, null, 4));

console.log('✅ Generated Netlify package.json');
console.log('✅ Copied static assets to netlify/static/assets');
console.log('✅ Netlify build process completed successfully');