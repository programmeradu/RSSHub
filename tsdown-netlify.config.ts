import { defineConfig } from 'tsdown';
import artTemplatesPlugin from './plugins/rollup-plugin-art-templates.ts';

export default defineConfig({
    // Entry point for Netlify function
    entry: ['./lib/netlify-server.ts'],
    
    // Output configuration for Netlify Functions
    outDir: 'netlify/functions',
    
    // Optimization settings for serverless environment
    minify: true,
    shims: true,
    clean: true,
    
    // Bundle optimization for Netlify constraints
    // - 50MB unzipped bundle size limit
    // - Fast cold start requirements
    splitting: false, // Single bundle for function
    
    // Plugins for template processing
    plugins: [artTemplatesPlugin()],
    
    // Copy assets to Netlify static directory for CDN serving
    copy: [
        {
            from: 'lib/assets',
            to: '../static/assets'
        }
    ],
    
    // Target Node.js environment for Netlify Functions (Node 18+)
    target: 'node18',
    
    // Format as ESM for better tree-shaking and modern Node.js support
    format: 'esm',
    
    // Enable source maps for debugging
    sourcemap: true,
    
    // Netlify-specific optimizations
    define: {
        'process.env.NETLIFY': 'true',
        'process.env.NODE_ENV': '"production"'
    }
});