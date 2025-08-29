# Netlify Cache Optimization

This document describes the cache optimization features implemented for Netlify deployment.

## Features

### 1. Netlify CDN Integration

The cache system is optimized to work with Netlify's CDN:

- **Smart Cache Headers**: Automatically sets appropriate `Cache-Control`, `s-maxage`, and `stale-while-revalidate` headers
- **Route-Based Caching**: Different cache durations based on route types (API, feeds, trending content, static assets)
- **Cache Tags**: Implements cache tagging for better cache invalidation and management

### 2. Fallback Caching

When Redis is unavailable, the system automatically falls back to memory caching:

- **Automatic Failover**: Seamlessly switches between Redis and memory cache
- **Memory Optimization**: Optimized for Netlify's memory constraints (50MB max cache size)
- **Error Recovery**: Handles Redis connection failures gracefully

### 3. Cache Monitoring

Built-in monitoring and optimization recommendations:

- **Performance Metrics**: Tracks hit rates, response times, and cache utilization
- **Health Checks**: Monitors Redis and memory cache health
- **Optimization Recommendations**: Provides suggestions for cache tuning

## Configuration

### Environment Variables

```bash
# Enable Netlify-optimized caching
CACHE_TYPE=netlify-fallback

# Cache expiration (seconds)
CACHE_EXPIRE=300              # 5 minutes for routes
CACHE_CONTENT_EXPIRE=1800     # 30 minutes for content

# Memory cache limits
MEMORY_MAX=64                 # Max 64 items in memory cache

# Redis configuration (optional)
REDIS_URL=redis://your-redis-url
```

### Cache Headers by Route Type

| Route Type | Max-Age | S-Max-Age | Stale-While-Revalidate |
|------------|---------|-----------|------------------------|
| API routes | 5 min   | 5 min     | 10 min                |
| RSS/Atom feeds | 5 min | 5 min   | 10 min                |
| Hot/Trending | 10 min | 10 min   | 20 min                |
| Static assets | 1 hour | 1 hour   | 2 hours               |

## Usage

### Basic Usage

The cache middleware is automatically applied in Netlify environments:

```typescript
import netlifyCache from '@/middleware/netlify-cache';

// Applied automatically when NETLIFY=true
app.use('*', netlifyCache);
```

### Monitoring

Access cache statistics and health:

```typescript
import { netlifyCacheMonitor } from '@/utils/netlify-cache-monitor';

// Get cache statistics
const stats = netlifyCacheMonitor.getStats();

// Perform health check
const isHealthy = await netlifyCacheMonitor.healthCheck();

// Get optimization recommendations
const recommendations = netlifyCacheMonitor.getOptimizationRecommendations();
```

## Benefits

1. **Improved Performance**: Leverages Netlify's global CDN for faster content delivery
2. **Reduced Function Execution**: Cache hits reduce serverless function invocations
3. **Better Reliability**: Fallback caching ensures availability even when Redis is down
4. **Cost Optimization**: Fewer function executions reduce Netlify costs
5. **Monitoring**: Built-in monitoring helps optimize cache performance

## Troubleshooting

### Common Issues

1. **Low Hit Rate**: Check cache TTL settings and route patterns
2. **Memory Issues**: Monitor memory cache utilization and adjust `MEMORY_MAX`
3. **Redis Connection**: Verify Redis URL and network connectivity

### Debug Mode

Enable debug logging to troubleshoot cache issues:

```bash
DEBUG_INFO=true
LOGGER_LEVEL=debug
```

This will log cache hits, misses, and performance metrics.