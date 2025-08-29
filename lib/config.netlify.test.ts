import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setConfig, isNetlifyEnvironment, isNetlifyProduction, isNetlifyDevelopment, validateNetlifyEnvironment, getNetlifyConfig, config } from './config';

describe('Netlify Configuration Management', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        // Reset environment
        process.env = { ...originalEnv };
    });

    afterEach(() => {
        // Restore original environment
        process.env = originalEnv;
    });

    describe('Environment Detection', () => {
        it('should detect Netlify production environment', () => {
            setConfig({ NETLIFY: 'true' });
            expect(isNetlifyEnvironment()).toBe(true);
            expect(isNetlifyProduction()).toBe(true);
            expect(isNetlifyDevelopment()).toBe(false);
        });

        it('should detect Netlify development environment', () => {
            setConfig({ NETLIFY_DEV: 'true' });
            expect(isNetlifyEnvironment()).toBe(true);
            expect(isNetlifyProduction()).toBe(false);
            expect(isNetlifyDevelopment()).toBe(true);
        });

        it('should detect non-Netlify environment', () => {
            setConfig({});
            expect(isNetlifyEnvironment()).toBe(false);
            expect(isNetlifyProduction()).toBe(false);
            expect(isNetlifyDevelopment()).toBe(false);
        });
    });

    describe('Netlify Configuration Defaults', () => {
        it('should use default Netlify configuration values', () => {
            setConfig({ NETLIFY: 'true' });
            const netlifyConfig = getNetlifyConfig();
            
            expect(netlifyConfig.functionTimeout).toBe(30000);
            expect(netlifyConfig.maxMemory).toBe(1008);
            expect(netlifyConfig.enableEdgeCaching).toBe(true);
            expect(netlifyConfig.enableFallbackCache).toBe(true);
            expect(netlifyConfig.coldStartOptimization).toBe(true);
            expect(netlifyConfig.memoryMonitoring).toBe(false);
            expect(netlifyConfig.requestIdHeader).toBe('x-nf-request-id');
            expect(netlifyConfig.errorReporting).toBe(true);
            expect(netlifyConfig.performanceLogging).toBe(false);
        });

        it('should use custom Netlify configuration values', () => {
            setConfig({
                NETLIFY: 'true',
                NETLIFY_FUNCTION_TIMEOUT: '25000',
                NETLIFY_MAX_MEMORY: '512',
                NETLIFY_ENABLE_EDGE_CACHING: 'false',
                NETLIFY_ENABLE_FALLBACK_CACHE: 'false',
                NETLIFY_COLD_START_OPTIMIZATION: 'false',
                NETLIFY_MEMORY_MONITORING: 'true',
                NETLIFY_REQUEST_ID_HEADER: 'x-custom-request-id',
                NETLIFY_ERROR_REPORTING: 'false',
                NETLIFY_PERFORMANCE_LOGGING: 'true'
            });
            
            const netlifyConfig = getNetlifyConfig();
            
            expect(netlifyConfig.functionTimeout).toBe(25000);
            expect(netlifyConfig.maxMemory).toBe(512);
            expect(netlifyConfig.enableEdgeCaching).toBe(false);
            expect(netlifyConfig.enableFallbackCache).toBe(false);
            expect(netlifyConfig.coldStartOptimization).toBe(false);
            expect(netlifyConfig.memoryMonitoring).toBe(true);
            expect(netlifyConfig.requestIdHeader).toBe('x-custom-request-id');
            expect(netlifyConfig.errorReporting).toBe(false);
            expect(netlifyConfig.performanceLogging).toBe(true);
        });
    });

    describe('Configuration Validation', () => {
        it('should validate correct Netlify configuration', () => {
            setConfig({
                NETLIFY: 'true',
                NETLIFY_FUNCTION_TIMEOUT: '25000',
                NETLIFY_MAX_MEMORY: '512'
            });
            
            const validation = validateNetlifyEnvironment();
            expect(validation.valid).toBe(true);
            expect(validation.errors).toHaveLength(0);
        });

        it('should reject function timeout exceeding standard limit', () => {
            setConfig({
                NETLIFY: 'true',
                NETLIFY_FUNCTION_TIMEOUT: '35000'
            });
            
            const validation = validateNetlifyEnvironment();
            expect(validation.valid).toBe(false);
            expect(validation.errors.length).toBeGreaterThan(0);
            expect(validation.errors[0]).toContain('NETLIFY_FUNCTION_TIMEOUT cannot exceed 30000ms');
        });

        it('should allow higher timeout for Netlify Pro', () => {
            setConfig({
                NETLIFY: 'true',
                NETLIFY_PRO: 'true',
                NETLIFY_FUNCTION_TIMEOUT: '600000'
            });
            
            const validation = validateNetlifyEnvironment();
            expect(validation.valid).toBe(true);
            expect(validation.errors).toHaveLength(0);
        });

        it('should reject memory exceeding Netlify limit', () => {
            setConfig({
                NETLIFY: 'true',
                NETLIFY_MAX_MEMORY: '2000'
            });
            
            const validation = validateNetlifyEnvironment();
            expect(validation.valid).toBe(false);
            expect(validation.errors.length).toBeGreaterThan(0);
            expect(validation.errors[0]).toContain('NETLIFY_MAX_MEMORY cannot exceed 1008 MB');
        });

        it('should reject memory below reasonable minimum', () => {
            setConfig({
                NETLIFY: 'true',
                NETLIFY_MAX_MEMORY: '64'
            });
            
            const validation = validateNetlifyEnvironment();
            expect(validation.valid).toBe(false);
            expect(validation.errors.length).toBeGreaterThan(0);
            expect(validation.errors[0]).toContain('NETLIFY_MAX_MEMORY should be at least 128 MB');
        });

        it('should reject invalid request ID header format', () => {
            setConfig({
                NETLIFY: 'true',
                NETLIFY_REQUEST_ID_HEADER: 'invalid header name!'
            });
            
            const validation = validateNetlifyEnvironment();
            expect(validation.valid).toBe(false);
            expect(validation.errors.length).toBeGreaterThan(0);
            expect(validation.errors[0]).toContain('NETLIFY_REQUEST_ID_HEADER must be a valid HTTP header name');
        });

        it('should reject validation for non-Netlify environment', () => {
            setConfig({});
            
            const validation = validateNetlifyEnvironment();
            expect(validation.valid).toBe(false);
            expect(validation.errors).toContain('Not running in Netlify environment');
        });
    });

    describe('Cache Type Selection', () => {
        it('should use netlify-fallback cache in Netlify environment', () => {
            setConfig({
                NETLIFY: 'true',
                NETLIFY_ENABLE_FALLBACK_CACHE: 'true'
            });
            
            expect(config.cache.type).toBe('netlify-fallback');
        });

        it('should use memory cache when fallback is disabled', () => {
            setConfig({
                NETLIFY: 'true',
                NETLIFY_ENABLE_FALLBACK_CACHE: 'false'
            });
            
            expect(config.cache.type).toBe('memory');
        });

        it('should use redis cache when available', () => {
            setConfig({
                NETLIFY: 'true',
                NETLIFY_ENABLE_FALLBACK_CACHE: 'false',
                REDIS_URL: 'redis://external-redis:6379/'
            });
            
            expect(config.cache.type).toBe('redis');
        });
    });

    describe('Request Timeout Adjustment', () => {
        it('should adjust request timeout in Netlify environment', () => {
            setConfig({
                NETLIFY: 'true',
                NETLIFY_FUNCTION_TIMEOUT: '25000'
            });
            
            // Should be function timeout minus 5 seconds buffer
            expect(config.requestTimeout).toBe(20000);
        });

        it('should use minimum timeout when function timeout is very low', () => {
            setConfig({
                NETLIFY: 'true',
                NETLIFY_FUNCTION_TIMEOUT: '8000'
            });
            
            // Should use minimum of 5 seconds
            expect(config.requestTimeout).toBe(5000);
        });

        it('should use default timeout in non-Netlify environment', () => {
            setConfig({});
            
            expect(config.requestTimeout).toBe(30000);
        });
    });
});