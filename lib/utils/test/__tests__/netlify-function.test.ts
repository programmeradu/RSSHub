/**
 * Example tests for Netlify function using test utilities
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import {
    NetlifyTestScenarios,
    NetlifyResponseValidator,
    NetlifyPerformanceUtils,
    NetlifyTestEnvironment,
    createMockNetlifyEvent,
    createMockNetlifyContext,
} from '../netlify-test-utils';

// Mock handler for testing
const mockNetlifyHandler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (event.path === '/error') {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
    
    if (event.path === '/timeout') {
        // Simulate long processing
        await new Promise(resolve => setTimeout(resolve, context.getRemainingTimeInMillis() + 1000));
    }
    
    if (event.path.startsWith('/rss/')) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/rss+xml' },
            body: '<?xml version="1.0"?><rss version="2.0"><channel><title>Test Feed</title></channel></rss>',
        };
    }
    
    if (event.queryStringParameters?.format === 'json') {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: 'test', path: event.path }),
        };
    }
    
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: '<html><body>Hello World</body></html>',
    };
};

describe('Netlify Function Test Utilities', () => {
    beforeEach(() => {
        NetlifyTestEnvironment.setup();
    });

    afterEach(() => {
        NetlifyTestEnvironment.cleanup();
    });

    describe('Mock Event Creation', () => {
        it('should create basic GET request event', () => {
            const event = NetlifyTestScenarios.getRequest('/test');
            
            expect(event.httpMethod).toBe('GET');
            expect(event.path).toBe('/test');
            expect(event.headers['user-agent']).toContain('Netlify-Test');
            expect(event.headers['x-nf-request-id']).toBeDefined();
        });

        it('should create POST request event with body', () => {
            const body = JSON.stringify({ test: 'data' });
            const event = NetlifyTestScenarios.postRequest('/api/test', body);
            
            expect(event.httpMethod).toBe('POST');
            expect(event.path).toBe('/api/test');
            expect(event.body).toBe(body);
            expect(event.headers['content-type']).toBe('application/json');
        });

        it('should create RSS feed request', () => {
            const event = NetlifyTestScenarios.rssFeedRequest('rss/test', { limit: '10' });
            
            expect(event.path).toBe('/rss/test');
            expect(event.headers.accept).toContain('application/rss+xml');
            expect(event.queryStringParameters?.limit).toBe('10');
        });

        it('should create JSON API request', () => {
            const event = NetlifyTestScenarios.jsonApiRequest('api/test', { limit: '5' });
            
            expect(event.path).toBe('/api/test');
            expect(event.headers.accept).toBe('application/json');
            expect(event.queryStringParameters?.format).toBe('json');
            expect(event.queryStringParameters?.limit).toBe('5');
        });
    });

    describe('Mock Context Creation', () => {
        it('should create context with default values', () => {
            const context = createMockNetlifyContext();
            
            expect(context.functionName).toBe('rsshub');
            expect(context.memoryLimitInMB).toBe('1008');
            expect(context.getRemainingTimeInMillis()).toBe(30000);
            expect(context.awsRequestId).toBeDefined();
        });

        it('should create context with custom values', () => {
            const context = createMockNetlifyContext({
                functionName: 'custom-function',
                memoryLimitInMB: '512',
                remainingTimeInMillis: 15000,
            });
            
            expect(context.functionName).toBe('custom-function');
            expect(context.memoryLimitInMB).toBe('512');
            expect(context.getRemainingTimeInMillis()).toBe(15000);
        });
    });

    describe('Response Validation', () => {
        it('should validate basic response structure', async () => {
            const event = NetlifyTestScenarios.getRequest('/');
            const context = createMockNetlifyContext();
            const response = await mockNetlifyHandler(event, context);
            
            expect(NetlifyResponseValidator.isValidResponse(response)).toBe(true);
            expect(response.statusCode).toBe(200);
            expect(typeof response.body).toBe('string');
        });

        it('should validate RSS response', async () => {
            const event = NetlifyTestScenarios.rssFeedRequest('rss/test');
            const context = createMockNetlifyContext();
            const response = await mockNetlifyHandler(event, context);
            
            expect(NetlifyResponseValidator.isValidRSSResponse(response)).toBe(true);
            expect(response.body).toContain('<?xml');
            expect(response.body).toContain('<rss');
        });

        it('should validate JSON response', async () => {
            const event = NetlifyTestScenarios.jsonApiRequest('api/test');
            const context = createMockNetlifyContext();
            const response = await mockNetlifyHandler(event, context);
            
            expect(NetlifyResponseValidator.isValidJSONResponse(response)).toBe(true);
            const data = JSON.parse(response.body);
            expect(data.path).toBe('/api/test');
        });

        it('should validate error response', async () => {
            const event = createMockNetlifyEvent({ path: '/error' });
            const context = createMockNetlifyContext();
            const response = await mockNetlifyHandler(event, context);
            
            expect(NetlifyResponseValidator.isValidErrorResponse(response, 500)).toBe(true);
            expect(response.statusCode).toBe(500);
        });
    });

    describe('Performance Testing', () => {
        it('should measure execution time', async () => {
            const event = NetlifyTestScenarios.getRequest('/');
            const context = createMockNetlifyContext();
            
            const { result, duration } = await NetlifyPerformanceUtils.measureExecutionTime(
                () => mockNetlifyHandler(event, context)
            );
            
            expect(result.statusCode).toBe(200);
            expect(duration).toBeGreaterThan(90); // Should be around 100ms
            expect(duration).toBeLessThan(200);
        });

        it('should test memory usage', async () => {
            const event = NetlifyTestScenarios.getRequest('/');
            const context = createMockNetlifyContext();
            
            const { result, memoryUsage } = await NetlifyPerformanceUtils.testMemoryUsage(
                () => mockNetlifyHandler(event, context)
            );
            
            expect(result.statusCode).toBe(200);
            expect(typeof memoryUsage.heapUsed).toBe('number');
            expect(typeof memoryUsage.rss).toBe('number');
        });
    });

    describe('Test Scenarios', () => {
        it('should handle timeout scenario', async () => {
            const { event, context } = NetlifyTestScenarios.timeoutRequest('/timeout', 1000);
            
            // This should timeout or handle gracefully
            const startTime = Date.now();
            try {
                await mockNetlifyHandler(event, context);
            } catch (error) {
                // Expected to timeout
            }
            const duration = Date.now() - startTime;
            
            // Should not take much longer than the remaining time (allow some buffer)
            expect(duration).toBeLessThan(3000);
        });

        it('should handle memory constraints', async () => {
            const { event, context } = NetlifyTestScenarios.memoryConstrainedRequest('/', '128');
            const response = await mockNetlifyHandler(event, context);
            
            expect(context.memoryLimitInMB).toBe('128');
            expect(NetlifyResponseValidator.isValidResponse(response)).toBe(true);
        });
    });

    describe('Environment Setup', () => {
        it('should set up development environment', () => {
            NetlifyTestEnvironment.setupDevelopment();
            
            expect(process.env.NETLIFY_DEV).toBe('true');
            expect(process.env.NODE_ENV).toBe('development');
            expect(process.env.LOGGER_LEVEL).toBe('debug');
        });

        it('should set up production environment', () => {
            NetlifyTestEnvironment.setupProduction();
            
            expect(process.env.NODE_ENV).toBe('production');
            expect(process.env.NETLIFY_ENABLE_EDGE_CACHING).toBe('true');
            expect(process.env.LOGGER_LEVEL).toBe('info');
        });

        it('should clean up environment', () => {
            const originalNodeEnv = process.env.NODE_ENV;
            
            NetlifyTestEnvironment.setup({ NODE_ENV: 'test' });
            expect(process.env.NODE_ENV).toBe('test');
            
            NetlifyTestEnvironment.cleanup();
            expect(process.env.NODE_ENV).toBe(originalNodeEnv);
        });
    });
});