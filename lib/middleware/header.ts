import { MiddlewareHandler } from 'hono';
import { routePath } from 'hono/route';
import etagCalculate from 'etag';
import { config } from '@/config';
import { Data } from '@/types';

const isNetlifyEnvironment = process.env.NETLIFY === 'true';

const getNetlifyCacheControl = (routePath: string): string => {
    // Default cache control
    let maxAge = config.cache.routeExpire;
    let staleWhileRevalidate = maxAge * 2;
    
    // Route-specific cache configurations for Netlify CDN
    if (routePath.includes('/api/')) {
        maxAge = Math.min(maxAge, 300); // 5 minutes for API routes
        staleWhileRevalidate = 600; // 10 minutes stale-while-revalidate
    } else if (routePath.match(/\/(hot|trending)/)) {
        maxAge = Math.min(maxAge, 600); // 10 minutes for trending content
        staleWhileRevalidate = 1200; // 20 minutes stale-while-revalidate
    } else if (routePath.includes('/static') || routePath.includes('/assets')) {
        maxAge = Math.max(maxAge, 3600); // At least 1 hour for static assets
        staleWhileRevalidate = 7200; // 2 hours stale-while-revalidate
    }
    
    // Cap values for Netlify CDN optimization
    maxAge = Math.min(maxAge, 3600); // Max 1 hour
    staleWhileRevalidate = Math.min(staleWhileRevalidate, 7200); // Max 2 hours
    
    return `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`;
};

const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/xml; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
};

// Add Netlify-specific headers
if (isNetlifyEnvironment) {
    headers['Vary'] = 'Accept-Encoding, User-Agent';
    headers['X-Netlify-Cache'] = 'MISS'; // Will be updated based on cache status
}

if (config.nodeName) {
    headers['RSSHub-Node'] = config.nodeName;
}

function etagMatches(etag: string, ifNoneMatch: string | null) {
    return ifNoneMatch !== null && ifNoneMatch.split(/,\s*/).includes(etag);
}

const middleware: MiddlewareHandler = async (ctx, next) => {
    // Set basic headers
    for (const key in headers) {
        ctx.header(key, headers[key]);
    }
    ctx.header('Access-Control-Allow-Origin', config.allowOrigin || new URL(ctx.req.url).host);

    await next();
    
    const rPath = routePath(ctx);
    if (rPath !== '/*') {
        ctx.header('X-RSSHub-Route', rPath);
    }

    const data: Data = ctx.get('data');
    if (!data || ctx.res.headers.get('ETag')) {
        return;
    }

    const lastBuildDate = data.lastBuildDate;
    delete data.lastBuildDate;
    const etag = etagCalculate(JSON.stringify(data));

    ctx.header('ETag', etag);

    // Set Netlify-optimized cache headers if not already set by cache middleware
    if (isNetlifyEnvironment && !ctx.res.headers.get('Cache-Control')) {
        const cacheControl = getNetlifyCacheControl(rPath);
        ctx.header('Cache-Control', cacheControl);
        
        // Add cache tag for better cache management
        const pathParts = rPath.split('/').filter(Boolean);
        if (pathParts.length > 0) {
            ctx.header('Cache-Tag', pathParts[0]);
        }
        
        // Update Netlify cache status
        const cacheStatus = ctx.res.headers.get('RSSHub-Cache-Status');
        if (cacheStatus === 'HIT') {
            ctx.header('X-Netlify-Cache', 'HIT');
        } else {
            ctx.header('X-Netlify-Cache', 'MISS');
        }
    } else if (!isNetlifyEnvironment && !ctx.res.headers.get('Cache-Control')) {
        // Default cache control for non-Netlify environments
        ctx.header('Cache-Control', `public, max-age=${config.cache.routeExpire}`);
    }

    const ifNoneMatch = ctx.req.header('If-None-Match') ?? null;
    if (etagMatches(etag, ifNoneMatch)) {
        ctx.status(304);
        ctx.set('no-content', true);
    } else {
        ctx.header('Last-Modified', lastBuildDate);
    }
};

export default middleware;
