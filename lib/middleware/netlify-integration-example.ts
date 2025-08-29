/**
 * Example of how to integrate Netlify cache middleware in the app
 * This file demonstrates the usage pattern for the Netlify cache optimizations
 */

import { Hono } from 'hono';
import netlifyCache from './netlify-cache';
import headerMiddleware from './header';

// Example app setup with Netlify cache
const app = new Hono();

// Apply Netlify cache middleware before other middleware
if (process.env.NETLIFY === 'true') {
    // Use Netlify-optimized cache middleware
    app.use('*', netlifyCache);
} else {
    // Use standard cache middleware for other environments
    const { default: standardCache } = await import('./cache');
    app.use('*', standardCache);
}

// Apply header middleware after cache
app.use('*', headerMiddleware);

// Example route that benefits from caching
app.get('/example/feed', async (ctx) => {
    // This route will be cached with Netlify CDN optimization
    const data = {
        title: 'Example Feed',
        items: [
            { title: 'Item 1', link: 'https://example.com/1' },
            { title: 'Item 2', link: 'https://example.com/2' },
        ],
        lastBuildDate: new Date().toUTCString(),
    };
    
    ctx.set('data', data);
    return ctx.text('RSS feed content here');
});

export default app;