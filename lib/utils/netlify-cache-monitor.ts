import logger from '@/utils/logger';
import cacheModule from '@/utils/cache/index';

/**
 * Netlify cache monitoring and optimization utilities
 */

interface CacheStats {
    redis: {
        available: boolean;
        connected: boolean;
    };
    memory: {
        available: boolean;
        size: number;
        calculatedSize: number;
        maxSize: number;
    };
    performance: {
        hitRate: number;
        avgResponseTime: number;
        totalRequests: number;
        cacheHits: number;
        cacheMisses: number;
    };
}

class NetlifyCacheMonitor {
    private stats: CacheStats = {
        redis: { available: false, connected: false },
        memory: { available: false, size: 0, calculatedSize: 0, maxSize: 0 },
        performance: { hitRate: 0, avgResponseTime: 0, totalRequests: 0, cacheHits: 0, cacheMisses: 0 }
    };

    private responseTimes: number[] = [];
    private maxResponseTimeHistory = 100;

    constructor() {
        // Start monitoring if in Netlify environment
        if (process.env.NETLIFY === 'true') {
            this.startMonitoring();
        }
    }

    /**
     * Start cache monitoring
     */
    private startMonitoring() {
        // Monitor cache health every 5 minutes
        setInterval(() => {
            this.updateCacheStats();
        }, 5 * 60 * 1000);

        // Log cache stats every 15 minutes
        setInterval(() => {
            this.logCacheStats();
        }, 15 * 60 * 1000);

        logger.info('Netlify cache monitoring started');
    }

    /**
     * Update cache statistics
     */
    private async updateCacheStats() {
        try {
            // Check if cache module has monitoring capabilities
            if (typeof (cacheModule as any).getStats === 'function') {
                const moduleStats = (cacheModule as any).getStats();
                this.stats.redis = moduleStats.redis || this.stats.redis;
                this.stats.memory = moduleStats.memory || this.stats.memory;
            }

            // Update performance metrics
            if (this.responseTimes.length > 0) {
                this.stats.performance.avgResponseTime = 
                    this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length;
            }

            this.stats.performance.hitRate = 
                this.stats.performance.totalRequests > 0 
                    ? this.stats.performance.cacheHits / this.stats.performance.totalRequests 
                    : 0;

        } catch (error) {
            logger.error('Failed to update cache stats:', error);
        }
    }

    /**
     * Record cache hit
     */
    recordCacheHit(responseTime?: number) {
        this.stats.performance.cacheHits++;
        this.stats.performance.totalRequests++;
        
        if (responseTime !== undefined) {
            this.recordResponseTime(responseTime);
        }
    }

    /**
     * Record cache miss
     */
    recordCacheMiss(responseTime?: number) {
        this.stats.performance.cacheMisses++;
        this.stats.performance.totalRequests++;
        
        if (responseTime !== undefined) {
            this.recordResponseTime(responseTime);
        }
    }

    /**
     * Record response time
     */
    private recordResponseTime(time: number) {
        this.responseTimes.push(time);
        
        // Keep only recent response times
        if (this.responseTimes.length > this.maxResponseTimeHistory) {
            this.responseTimes.shift();
        }
    }

    /**
     * Get current cache statistics
     */
    getStats(): CacheStats {
        return { ...this.stats };
    }

    /**
     * Log cache statistics
     */
    private logCacheStats() {
        const stats = this.getStats();
        
        logger.info('Netlify Cache Stats:', {
            redis: stats.redis,
            memory: {
                available: stats.memory.available,
                size: stats.memory.size,
                utilization: stats.memory.maxSize > 0 
                    ? `${Math.round((stats.memory.calculatedSize / stats.memory.maxSize) * 100)}%`
                    : 'N/A'
            },
            performance: {
                hitRate: `${Math.round(stats.performance.hitRate * 100)}%`,
                avgResponseTime: `${Math.round(stats.performance.avgResponseTime)}ms`,
                totalRequests: stats.performance.totalRequests,
                cacheHits: stats.performance.cacheHits,
                cacheMisses: stats.performance.cacheMisses
            }
        });
    }

    /**
     * Perform cache health check
     */
    async healthCheck(): Promise<boolean> {
        try {
            if (typeof (cacheModule as any).healthCheck === 'function') {
                const health = await (cacheModule as any).healthCheck();
                return health.overall;
            }
            
            // Basic health check
            return cacheModule.status.available;
        } catch (error) {
            logger.error('Cache health check failed:', error);
            return false;
        }
    }

    /**
     * Clear all caches (for debugging)
     */
    async clearCaches(): Promise<void> {
        try {
            if (typeof (cacheModule as any).clearAll === 'function') {
                await (cacheModule as any).clearAll();
                logger.info('All caches cleared via monitor');
            } else {
                logger.warn('Cache clearing not supported by current cache module');
            }
        } catch (error) {
            logger.error('Failed to clear caches:', error);
        }
    }

    /**
     * Get cache optimization recommendations
     */
    getOptimizationRecommendations(): string[] {
        const recommendations: string[] = [];
        const stats = this.getStats();

        // Check hit rate
        if (stats.performance.hitRate < 0.5 && stats.performance.totalRequests > 100) {
            recommendations.push('Low cache hit rate detected. Consider increasing cache TTL or reviewing cache keys.');
        }

        // Check memory usage
        if (stats.memory.available && stats.memory.maxSize > 0) {
            const utilization = stats.memory.calculatedSize / stats.memory.maxSize;
            if (utilization > 0.9) {
                recommendations.push('Memory cache utilization is high. Consider reducing cache size or TTL.');
            }
        }

        // Check Redis availability
        if (!stats.redis.available && process.env.REDIS_URL) {
            recommendations.push('Redis is configured but not available. Check Redis connection.');
        }

        // Check response times
        if (stats.performance.avgResponseTime > 5000) {
            recommendations.push('High average response time detected. Consider cache warming or optimization.');
        }

        return recommendations;
    }

    /**
     * Reset performance statistics
     */
    resetStats() {
        this.stats.performance = {
            hitRate: 0,
            avgResponseTime: 0,
            totalRequests: 0,
            cacheHits: 0,
            cacheMisses: 0
        };
        this.responseTimes = [];
        logger.info('Cache performance stats reset');
    }
}

// Export singleton instance
export const netlifyCacheMonitor = new NetlifyCacheMonitor();
export default netlifyCacheMonitor;