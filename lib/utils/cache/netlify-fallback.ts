import { LRUCache } from 'lru-cache';
import { config } from '@/config';
import logger from '@/utils/logger';
import type CacheModule from './base';

/**
 * Netlify-optimized fallback cache implementation
 * Uses memory cache when Redis is unavailable with enhanced error handling
 */

const status = { available: false };
const clients: {
    memoryCache?: LRUCache<any, any>;
    redisClient?: any;
} = {};

let isRedisAvailable = false;
let redisModule: CacheModule | null = null;

// Initialize Redis if available
const initializeRedis = async () => {
    try {
        if (config.redis.url && config.redis.url !== 'redis://localhost:6379/') {
            const { default: redis } = await import('./redis');
            redisModule = redis;
            redisModule.init();
            
            // Test Redis connection
            if (redisModule.clients.redisClient) {
                await redisModule.clients.redisClient.ping();
                isRedisAvailable = true;
                logger.info('Redis cache initialized successfully for Netlify deployment');
            }
        }
    } catch (error) {
        logger.warn('Redis not available, falling back to memory cache:', error);
        isRedisAvailable = false;
    }
};

// Initialize memory cache as fallback
const initializeMemoryCache = () => {
    clients.memoryCache = new LRUCache({
        ttl: config.cache.routeExpire * 1000,
        max: config.memory.max,
        // Optimize for Netlify's memory constraints
        maxSize: 50 * 1024 * 1024, // 50MB max cache size
        sizeCalculation: (value: string) => {
            return Buffer.byteLength(value, 'utf8');
        },
        // Enable background cleanup
        ttlAutopurge: true,
        allowStale: true, // Allow stale data during high load
    });
    
    logger.info(`Memory cache initialized with max ${config.memory.max} items and 50MB size limit`);
};

const netlifyFallbackCache: CacheModule = {
    init: () => {
        initializeMemoryCache();
        initializeRedis();
        status.available = true;
    },

    get: async (key: string, refresh = true) => {
        if (!key || !status.available) {
            return null;
        }

        // Try Redis first if available
        if (isRedisAvailable && redisModule) {
            try {
                const result = await redisModule.get(key, refresh);
                if (result !== null) {
                    return result;
                }
            } catch (error) {
                logger.warn('Redis get failed, falling back to memory cache:', error);
                isRedisAvailable = false;
            }
        }

        // Fallback to memory cache
        if (clients.memoryCache) {
            try {
                let value = clients.memoryCache.get(key, { updateAgeOnGet: refresh }) as string | undefined;
                if (value) {
                    return value + '';
                }
            } catch (error) {
                logger.error('Memory cache get failed:', error);
            }
        }

        return null;
    },

    set: (key: string, value?: string | Record<string, any>, maxAge = config.cache.contentExpire) => {
        if (!key || !status.available) {
            return;
        }

        // Normalize value
        if (!value || value === 'undefined') {
            value = '';
        }
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }

        // Try Redis first if available
        if (isRedisAvailable && redisModule) {
            try {
                redisModule.set(key, value, maxAge);
            } catch (error) {
                logger.warn('Redis set failed, falling back to memory cache:', error);
                isRedisAvailable = false;
            }
        }

        // Always set in memory cache as fallback
        if (clients.memoryCache) {
            try {
                // Adjust TTL for memory constraints in serverless environment
                const memoryTTL = Math.min(maxAge * 1000, 30 * 60 * 1000); // Cap at 30 minutes
                clients.memoryCache.set(key, value, { ttl: memoryTTL });
            } catch (error) {
                logger.error('Memory cache set failed:', error);
                // If memory cache is full, clear some old entries
                if (error.message?.includes('max') || error.message?.includes('size')) {
                    try {
                        clients.memoryCache.clear();
                        clients.memoryCache.set(key, value, { ttl: maxAge * 1000 });
                        logger.info('Memory cache cleared due to size constraints');
                    } catch (clearError) {
                        logger.error('Failed to clear memory cache:', clearError);
                    }
                }
            }
        }
    },

    clients,
    status,
};

// Enhanced cache with monitoring
const monitoredCache = {
    ...netlifyFallbackCache,
    
    /**
     * Get cache statistics for monitoring
     */
    getStats: () => {
        const stats = {
            redis: {
                available: isRedisAvailable,
                connected: isRedisAvailable && redisModule?.status?.available,
            },
            memory: {
                available: !!clients.memoryCache,
                size: clients.memoryCache?.size || 0,
                calculatedSize: clients.memoryCache?.calculatedSize || 0,
                maxSize: clients.memoryCache?.maxSize || 0,
            },
        };
        return stats;
    },

    /**
     * Health check for cache systems
     */
    healthCheck: async () => {
        const health = {
            redis: false,
            memory: false,
            overall: false,
        };

        // Check Redis
        if (isRedisAvailable && redisModule?.clients.redisClient) {
            try {
                await redisModule.clients.redisClient.ping();
                health.redis = true;
            } catch (error) {
                logger.warn('Redis health check failed:', error);
                isRedisAvailable = false;
            }
        }

        // Check Memory
        if (clients.memoryCache) {
            try {
                const testKey = '__health_check__';
                clients.memoryCache.set(testKey, 'test', { ttl: 1000 });
                const testValue = clients.memoryCache.get(testKey);
                health.memory = testValue === 'test';
                clients.memoryCache.delete(testKey);
            } catch (error) {
                logger.error('Memory cache health check failed:', error);
            }
        }

        health.overall = health.redis || health.memory;
        return health;
    },

    /**
     * Clear all caches (useful for debugging)
     */
    clearAll: async () => {
        try {
            if (isRedisAvailable && redisModule?.clients.redisClient) {
                await redisModule.clients.redisClient.flushdb();
                logger.info('Redis cache cleared');
            }
        } catch (error) {
            logger.warn('Failed to clear Redis cache:', error);
        }

        try {
            if (clients.memoryCache) {
                clients.memoryCache.clear();
                logger.info('Memory cache cleared');
            }
        } catch (error) {
            logger.error('Failed to clear memory cache:', error);
        }
    },
};

export default monitoredCache;