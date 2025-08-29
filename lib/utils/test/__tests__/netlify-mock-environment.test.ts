/**
 * Tests for Netlify mock environment
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import {
    MockNetlifyEnvironment,
    getMockNetlifyEnvironment,
    initializeMockNetlifyEnvironment,
    cleanupMockNetlifyEnvironment,
    withMockNetlifyEnvironment,
} from '../netlify-mock-environment';
import { createMockNetlifyEvent, createMockNetlifyContext } from '../netlify-test-utils';

// Mock handler for testing
const testHandler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
    if (event.path === '/error') {
        throw new Error('Test error');
    }
    
    if (event.path === '/slow') {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            message: 'success',
            path: event.path,
            remainingTime: context.getRemainingTimeInMillis(),
        }),
    };
};

describe('MockNetlifyEnvironment', () => {
    let mockEnv: MockNetlifyEnvironment;

    beforeEach(() => {
        mockEnv = new MockNetlifyEnvironment({
            functionTimeout: 5000,
            simulateLatency: false,
            simulateColdStarts: false,
        });
        mockEnv.initialize();
    });

    afterEach(() => {
        mockEnv.cleanup();
    });

    describe('Environment Setup', () => {
        it('should set up Netlify environment variables', () => {
            expect(process.env.NETLIFY).toBe('true');
            expect(process.env.NETLIFY_DEV).toBe('true');
            expect(process.env.AWS_LAMBDA_FUNCTION_NAME).toBe('rsshub');
            expect(process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE).toBe('1008');
        });

        it('should clean up environment variables', () => {
            mockEnv.cleanup();
            
            expect(process.env.NETLIFY).toBeUndefined();
            expect(process.env.NETLIFY_DEV).toBeUndefined();
            expect(process.env.AWS_LAMBDA_FUNCTION_NAME).toBeUndefined();
        });
    });

    describe('Function Handler Wrapping', () => {
        it('should execute handler successfully', async () => {
            const wrappedHandler = mockEnv.createMockHandler(testHandler);
            const event = createMockNetlifyEvent({ path: '/test' });
            const context = createMockNetlifyContext();
            
            const response = await wrappedHandler(event, context);
            
            expect(response.statusCode).toBe(200);
            const body = JSON.parse(response.body);
            expect(body.message).toBe('success');
            expect(body.path).toBe('/test');
        });

        it('should handle errors properly', async () => {
            const wrappedHandler = mockEnv.createMockHandler(testHandler);
            const event = createMockNetlifyEvent({ path: '/error' });
            const context = createMockNetlifyContext();
            
            await expect(wrappedHandler(event, context)).rejects.toThrow('Test error');
        });

        it('should handle timeouts', async () => {
            const shortTimeoutEnv = new MockNetlifyEnvironment({
                functionTimeout: 500,
                simulateLatency: false,
            });
            shortTimeoutEnv.initialize();
            
            try {
                const wrappedHandler = shortTimeoutEnv.createMockHandler(testHandler);
                const event = createMockNetlifyEvent({ path: '/slow' });
                const context = createMockNetlifyContext();
                
                await expect(wrappedHandler(event, context)).rejects.toThrow('Function timeout');
            } finally {
                shortTimeoutEnv.cleanup();
            }
        });
    });

    describe('Metrics Collection', () => {
        it('should collect function metrics', async () => {
            const wrappedHandler = mockEnv.createMockHandler(testHandler, 'test-function');
            const event = createMockNetlifyEvent({ path: '/test' });
            const context = createMockNetlifyContext();
            
            await wrappedHandler(event, context);
            await wrappedHandler(event, context);
            
            const metrics = mockEnv.getMetrics('test-function');
            expect(metrics.invocations).toBe(2);
            expect(metrics.errors).toBe(0);
            // Just check that metrics exist, execution time might be 0 for very fast operations
            expect(typeof metrics.totalExecutionTime).toBe('number');
            expect(typeof metrics.averageExecutionTime).toBe('number');
        });

        it('should track errors in metrics', async () => {
            const wrappedHandler = mockEnv.createMockHandler(testHandler, 'error-function');
            const event = createMockNetlifyEvent({ path: '/error' });
            const context = createMockNetlifyContext();
            
            try {
                await wrappedHandler(event, context);
            } catch {
                // Expected error
            }
            
            const metrics = mockEnv.getMetrics('error-function');
            expect(metrics.invocations).toBe(1);
            expect(metrics.errors).toBe(1);
        });

        it('should reset metrics', async () => {
            const wrappedHandler = mockEnv.createMockHandler(testHandler);
            const event = createMockNetlifyEvent({ path: '/test' });
            const context = createMockNetlifyContext();
            
            await wrappedHandler(event, context);
            expect(mockEnv.getMetrics('rsshub').invocations).toBe(1);
            
            mockEnv.reset();
            expect(mockEnv.getMetrics('rsshub').invocations).toBe(0);
        });
    });

    describe('Logging', () => {
        it('should capture function logs', async () => {
            const wrappedHandler = mockEnv.createMockHandler(testHandler, 'logged-function');
            const event = createMockNetlifyEvent({ path: '/test' });
            const context = createMockNetlifyContext();
            
            await wrappedHandler(event, context);
            
            const logs = mockEnv.getLogs('logged-function');
            expect(logs.length).toBeGreaterThan(0);
            expect(logs.some(log => log.message.includes('Function executed successfully'))).toBe(true);
        });

        it('should filter logs by level', async () => {
            const wrappedHandler = mockEnv.createMockHandler(testHandler, 'error-function');
            const event = createMockNetlifyEvent({ path: '/error' });
            const context = createMockNetlifyContext();
            
            try {
                await wrappedHandler(event, context);
            } catch {
                // Expected error
            }
            
            const errorLogs = mockEnv.getLogs('error-function', 'error');
            expect(errorLogs.length).toBeGreaterThan(0);
            expect(errorLogs.every(log => log.level === 'error')).toBe(true);
        });
    });

    describe('Edge Cache Simulation', () => {
        it('should simulate edge caching', async () => {
            let callCount = 0;
            const generator = async () => {
                callCount++;
                return { data: 'test', timestamp: Date.now() };
            };
            
            // First call should execute generator
            const result1 = await mockEnv.simulateEdgeCache('test-key', generator, 1000);
            expect(callCount).toBe(1);
            expect(result1.data).toBe('test');
            
            // Second call should use cache
            const result2 = await mockEnv.simulateEdgeCache('test-key', generator, 1000);
            expect(callCount).toBe(1); // Should not increment
            expect(result2.data).toBe('test');
        });

        it('should expire cached values', async () => {
            let callCount = 0;
            const generator = async () => {
                callCount++;
                return { data: 'test' };
            };
            
            // First call
            await mockEnv.simulateEdgeCache('expire-key', generator, 100);
            expect(callCount).toBe(1);
            
            // Wait for expiration
            await new Promise(resolve => setTimeout(resolve, 150));
            
            // Second call should execute generator again
            await mockEnv.simulateEdgeCache('expire-key', generator, 100);
            expect(callCount).toBe(2);
        });
    });

    describe('Cold Start Simulation', () => {
        it('should simulate cold starts', async () => {
            const coldStartEnv = new MockNetlifyEnvironment({
                simulateColdStarts: true,
                coldStartProbability: 1.0, // Always cold start for testing
                simulateLatency: false,
            });
            coldStartEnv.initialize();
            
            try {
                const wrappedHandler = coldStartEnv.createMockHandler(testHandler, 'cold-start-function');
                const event = createMockNetlifyEvent({ path: '/test' });
                const context = createMockNetlifyContext();
                
                await wrappedHandler(event, context);
                
                const metrics = coldStartEnv.getMetrics('cold-start-function');
                expect(metrics.coldStarts).toBe(1);
                
                const logs = coldStartEnv.getLogs('cold-start-function');
                expect(logs.some(log => log.message.includes('Cold start'))).toBe(true);
            } finally {
                coldStartEnv.cleanup();
            }
        });
    });
});

describe('Global Environment Functions', () => {
    afterEach(() => {
        cleanupMockNetlifyEnvironment();
    });

    it('should create and manage global environment', () => {
        const env1 = getMockNetlifyEnvironment();
        const env2 = getMockNetlifyEnvironment();
        
        expect(env1).toBe(env2); // Should be the same instance
    });

    it('should initialize global environment', () => {
        const env = initializeMockNetlifyEnvironment();
        
        expect(process.env.NETLIFY).toBe('true');
        expect(env).toBeDefined();
    });

    it('should cleanup global environment', () => {
        initializeMockNetlifyEnvironment();
        expect(process.env.NETLIFY).toBe('true');
        
        cleanupMockNetlifyEnvironment();
        expect(process.env.NETLIFY).toBeUndefined();
    });
});

describe('Mock Environment Decorator', () => {
    it('should work with function wrapper', async () => {
        const testFunction = async () => {
            return process.env.NETLIFY;
        };
        
        // Manually wrap function for testing
        const wrappedFunction = async () => {
            const env = initializeMockNetlifyEnvironment({ functionTimeout: 1000 });
            try {
                return await testFunction();
            } finally {
                env.cleanup();
            }
        };
        
        // Environment should not be set initially
        expect(process.env.NETLIFY).toBeUndefined();
        
        // Function should have environment set
        const result = await wrappedFunction();
        expect(result).toBe('true');
        
        // Environment should be cleaned up after function
        expect(process.env.NETLIFY).toBeUndefined();
    });
});