import xxhash from 'xxhash-wasm';
import type { MiddlewareHandler } from 'hono';

import { config } from '@/config';
import RequestInProgressError from '@/errors/types/request-in-progress';
import cacheModule from '@/utils/cache/index';
import { netlifyCacheMonitor } from '@/utils/netlify-cache-monitor';
import { Data } from '@/types';

const bypassList = new Set(['/', '/robots.txt', '/logo.png', '/favicon.ico']);

/**
 * Enhanced cache middleware optimized for Netlify deployment
 * Provides CDN-compatible cache headers and fallback mechanisms
 */
const netlifyCache: MiddlewareHandler = async (ctx, next) => {
    if (!cacheModule.status.available || bypassList.has(ctx.req.path)) {
        await next();
        return;
    }

    const startTime = Date.now();
    const requestPath = ctx.req.path;
    const limit = ctx.req.query('limit') ? `:${ctx.req.query('limit')}` : '';
    const { h64ToString } = await xxhash();
    const key = 'rsshub:koa-redis-cache:' + h64ToString(requestPath + limit);
    const controlKey = 'rsshub:path-requested:' + h64ToString(requestPath + limit);

    // Check if request is already in progress
    const isRequesting = await cacheModule.globalCache.get(controlKey);

    if (isRequesting === '1') {
        let retryTimes = process.env.NODE_ENV === 'test' ? 1 : 10;
        let bypass = false;
        while (retryTimes > 0) {
            // eslint-disable-next-line no-await-in-loop
            await new Promise((resolve) => setTimeout(resolve, process.env.NODE_ENV === 'test' ? 3000 : 6000));
            // eslint-disable-next-line no-await-in-loop
            if ((await cacheModule.globalCache.get(controlKey)) !== '1') {
                bypass = true;
                break;
            }
            retryTimes--;
        }
        if (!bypass) {
            throw new RequestInProgressError('This path is currently fetching, please come back later!');
        }
    }

    // Try to get cached value
    const value = await cacheModule.globalCache.get(key);
    const responseTime = Date.now() - startTime;

    if (value) {
        ctx.status(200);
        ctx.header('RSSHub-Cache-Status', 'HIT');
        
        // Record cache hit for monitoring
        netlifyCacheMonitor.recordCacheHit(responseTime);
        
        // Set Netlify CDN-compatible cache headers for cache hits
        setNetlifyCacheHeaders(ctx, requestPath, true);
        
        ctx.set('data', JSON.parse(value));
        await next();
        return;
    }

    // Mark request as in progress
    await cacheModule.globalCache.set(controlKey, '1', config.cache.requestTimeout);

    try {
        await next();
    } catch (error) {
        await cacheModule.globalCache.set(controlKey, '0', config.cache.requestTimeout);
        throw error;
    }

    const data: Data = ctx.get('data');
    if (ctx.res.headers.get('Cache-Control') !== 'no-cache' && data) {
        data.lastBuildDate = new Date().toUTCString();
        ctx.set('data', data);
        const body = JSON.stringify(data);
        
        // Store in cache with appropriate TTL
        const cacheTTL = getCacheTTLForRoute(requestPath);
        await cacheModule.globalCache.set(key, body, cacheTTL);
        
        // Record cache miss for monitoring
        const totalTime = Date.now() - startTime;
        netlifyCacheMonitor.recordCacheMiss(totalTime);
        
        // Set Netlify CDN-compatible cache headers for fresh content
        setNetlifyCacheHeaders(ctx, requestPath, false);
    } else {
        // Record cache miss even if no data to cache
        const totalTime = Date.now() - startTime;
        netlifyCacheMonitor.recordCacheMiss(totalTime);
    }

    // Clear the in-progress flag
    await cacheModule.globalCache.set(controlKey, '0', config.cache.requestTimeout);
};

/**
 * Set cache headers optimized for Netlify CDN
 */
function setNetlifyCacheHeaders(ctx: any, requestPath: string, isHit: boolean) {
    const cacheTTL = getCacheTTLForRoute(requestPath);
    const maxAge = Math.min(cacheTTL, 3600); // Cap at 1 hour for CDN
    const staleWhileRevalidate = Math.min(cacheTTL * 2, 7200); // Cap at 2 hours
    
    // Set cache headers for Netlify CDN
    if (isHit) {
        // For cache hits, use shorter max-age to ensure freshness
        ctx.header('Cache-Control', `public, max-age=${Math.min(maxAge, 300)}, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`);
    } else {
        // For fresh content, use full cache duration
        ctx.header('Cache-Control', `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`);
    }
    
    // Add Netlify-specific headers
    ctx.header('Netlify-CDN-Cache-Control', `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`);
    ctx.header('Vary', 'Accept-Encoding, User-Agent');
    
    // Add cache tags for better cache management
    const cacheTag = getCacheTagForRoute(requestPath);
    if (cacheTag) {
        ctx.header('Cache-Tag', cacheTag);
    }
}

/**
 * Get cache TTL based on route configuration
 */
function getCacheTTLForRoute(requestPath: string): number {
    // Default cache TTL
    let ttl = config.cache.routeExpire;
    
    // Route-specific cache configurations
    if (requestPath.includes('/api/')) {
        // API routes - shorter cache
        ttl = Math.min(ttl, 300); // 5 minutes
    } else if (requestPath.match(/\/(rss|atom|feed)/)) {
        // RSS/Atom feeds - standard cache
        ttl = config.cache.routeExpire;
    } else if (requestPath.includes('/hot') || requestPath.includes('/trending')) {
        // Hot/trending content - shorter cache
        ttl = Math.min(ttl, 600); // 10 minutes
    } else if (requestPath.includes('/static') || requestPath.includes('/assets')) {
        // Static assets - longer cache
        ttl = Math.max(ttl, 3600); // At least 1 hour
    }
    
    return ttl;
}

/**
 * Get cache tag for route-based cache invalidation
 */
function getCacheTagForRoute(requestPath: string): string | null {
    const pathParts = requestPath.split('/').filter(Boolean);
    
    if (pathParts.length === 0) return 'homepage';
    
    // Create cache tag based on route structure
    const routeBase = pathParts[0];
    
    // Common route patterns
    if (routeBase === 'api') return 'api';
    if (pathParts.includes('rss') || pathParts.includes('atom')) return 'feeds';
    if (pathParts.includes('hot') || pathParts.includes('trending')) return 'trending';
    
    // Use the first path segment as cache tag
    return routeBase;
}

export default netlifyCache;