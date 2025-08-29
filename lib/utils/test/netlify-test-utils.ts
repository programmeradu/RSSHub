/**
 * Test utilities for Netlify function testing
 * Provides helpers for mocking Netlify events, contexts, and testing function handlers
 */

import type { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { randomUUID } from 'node:crypto';

export interface MockNetlifyEventOptions {
    path?: string;
    httpMethod?: string;
    headers?: Record<string, string>;
    queryStringParameters?: Record<string, string> | null;
    body?: string | null;
    isBase64Encoded?: boolean;
    multiValueHeaders?: Record<string, string[]>;
    multiValueQueryStringParameters?: Record<string, string[]> | null;
    requestContext?: Partial<HandlerEvent['requestContext']>;
}

export interface MockNetlifyContextOptions {
    functionName?: string;
    functionVersion?: string;
    invokedFunctionArn?: string;
    memoryLimitInMB?: string;
    awsRequestId?: string;
    logGroupName?: string;
    logStreamName?: string;
    identity?: any;
    clientContext?: any;
    remainingTimeInMillis?: number;
}

/**
 * Creates a mock Netlify function event for testing
 */
export function createMockNetlifyEvent(options: MockNetlifyEventOptions = {}): HandlerEvent {
    const {
        path = '/',
        httpMethod = 'GET',
        headers = {},
        queryStringParameters = null,
        body = null,
        isBase64Encoded = false,
        multiValueHeaders = {},
        multiValueQueryStringParameters = null,
        requestContext = {},
    } = options;

    return {
        path,
        httpMethod,
        headers: {
            'user-agent': 'Mozilla/5.0 (compatible; Netlify-Test/1.0)',
            'x-forwarded-for': '127.0.0.1',
            'x-forwarded-proto': 'https',
            'x-nf-request-id': randomUUID(),
            ...headers,
        },
        multiValueHeaders: {
            'user-agent': ['Mozilla/5.0 (compatible; Netlify-Test/1.0)'],
            ...multiValueHeaders,
        },
        queryStringParameters,
        multiValueQueryStringParameters,
        body,
        isBase64Encoded,
        requestContext: {
            accountId: 'test-account',
            apiId: 'test-api',
            protocol: 'HTTP/1.1',
            httpMethod,
            path,
            stage: 'test',
            requestId: randomUUID(),
            requestTime: new Date().toISOString(),
            requestTimeEpoch: Date.now(),
            identity: {
                cognitoIdentityPoolId: null,
                accountId: null,
                cognitoIdentityId: null,
                caller: null,
                sourceIp: '127.0.0.1',
                principalOrgId: null,
                accessKey: null,
                cognitoAuthenticationType: null,
                cognitoAuthenticationProvider: null,
                userArn: null,
                userAgent: 'Mozilla/5.0 (compatible; Netlify-Test/1.0)',
                user: null,
            },
            ...requestContext,
        },
    };
}

/**
 * Creates a mock Netlify function context for testing
 */
export function createMockNetlifyContext(options: MockNetlifyContextOptions = {}): HandlerContext {
    const {
        functionName = 'rsshub',
        functionVersion = '$LATEST',
        invokedFunctionArn = 'arn:aws:lambda:us-east-1:123456789012:function:rsshub',
        memoryLimitInMB = '1008',
        awsRequestId = randomUUID(),
        logGroupName = '/aws/lambda/rsshub',
        logStreamName = `2024/01/01/[$LATEST]${randomUUID()}`,
        identity = undefined,
        clientContext = undefined,
        remainingTimeInMillis = 30000,
    } = options;

    const context: HandlerContext = {
        callbackWaitsForEmptyEventLoop: true,
        functionName,
        functionVersion,
        invokedFunctionArn,
        memoryLimitInMB,
        awsRequestId,
        logGroupName,
        logStreamName,
        identity,
        clientContext,
        getRemainingTimeInMillis: () => remainingTimeInMillis,
        done: () => {},
        fail: () => {},
        succeed: () => {},
    };

    return context;
}

/**
 * Helper to create common test scenarios
 */
export class NetlifyTestScenarios {
    /**
     * Create a GET request event
     */
    static getRequest(path: string, queryParams?: Record<string, string>): HandlerEvent {
        return createMockNetlifyEvent({
            path,
            httpMethod: 'GET',
            queryStringParameters: queryParams || null,
        });
    }

    /**
     * Create a POST request event
     */
    static postRequest(path: string, body: string, contentType = 'application/json'): HandlerEvent {
        return createMockNetlifyEvent({
            path,
            httpMethod: 'POST',
            headers: {
                'content-type': contentType,
                'content-length': body.length.toString(),
            },
            body,
        });
    }

    /**
     * Create an RSS feed request
     */
    static rssFeedRequest(route: string, params?: Record<string, string>): HandlerEvent {
        return createMockNetlifyEvent({
            path: `/${route}`,
            httpMethod: 'GET',
            headers: {
                'accept': 'application/rss+xml, application/xml, text/xml',
                'user-agent': 'RSS Reader/1.0',
            },
            queryStringParameters: params || null,
        });
    }

    /**
     * Create a JSON API request
     */
    static jsonApiRequest(route: string, params?: Record<string, string>): HandlerEvent {
        return createMockNetlifyEvent({
            path: `/${route}`,
            httpMethod: 'GET',
            headers: {
                'accept': 'application/json',
                'user-agent': 'API Client/1.0',
            },
            queryStringParameters: { ...params, format: 'json' },
        });
    }

    /**
     * Create a request with timeout simulation
     */
    static timeoutRequest(path: string, remainingTime = 1000): { event: HandlerEvent; context: HandlerContext } {
        return {
            event: createMockNetlifyEvent({ path }),
            context: createMockNetlifyContext({ remainingTimeInMillis: remainingTime }),
        };
    }

    /**
     * Create a request with memory constraints
     */
    static memoryConstrainedRequest(path: string, memoryLimit = '128'): { event: HandlerEvent; context: HandlerContext } {
        return {
            event: createMockNetlifyEvent({ path }),
            context: createMockNetlifyContext({ memoryLimitInMB: memoryLimit }),
        };
    }
}

/**
 * Response validation helpers
 */
export class NetlifyResponseValidator {
    /**
     * Validate basic response structure
     */
    static isValidResponse(response: HandlerResponse): boolean {
        return (
            typeof response === 'object' &&
            response !== null &&
            typeof response.statusCode === 'number' &&
            typeof response.body === 'string'
        );
    }

    /**
     * Validate RSS response
     */
    static isValidRSSResponse(response: HandlerResponse): boolean {
        if (!this.isValidResponse(response)) return false;
        
        const contentType = response.headers?.['content-type'] || response.headers?.['Content-Type'];
        return (
            response.statusCode === 200 &&
            (contentType?.includes('application/rss+xml') || 
             contentType?.includes('application/xml') || 
             contentType?.includes('text/xml')) &&
            response.body.includes('<?xml') &&
            response.body.includes('<rss')
        );
    }

    /**
     * Validate JSON response
     */
    static isValidJSONResponse(response: HandlerResponse): boolean {
        if (!this.isValidResponse(response)) return false;
        
        const contentType = response.headers?.['content-type'] || response.headers?.['Content-Type'];
        try {
            JSON.parse(response.body);
            return (
                response.statusCode === 200 &&
                contentType?.includes('application/json')
            );
        } catch {
            return false;
        }
    }

    /**
     * Validate error response
     */
    static isValidErrorResponse(response: HandlerResponse, expectedStatus?: number): boolean {
        if (!this.isValidResponse(response)) return false;
        
        const isErrorStatus = expectedStatus ? 
            response.statusCode === expectedStatus : 
            response.statusCode >= 400;
            
        if (!isErrorStatus) return false;
        
        try {
            const body = JSON.parse(response.body);
            return Boolean(body.error);
        } catch {
            // If body is not JSON, just check status code
            return true;
        }
    }
}

/**
 * Performance testing utilities
 */
export class NetlifyPerformanceUtils {
    /**
     * Measure function execution time
     */
    static async measureExecutionTime<T>(
        fn: () => Promise<T>
    ): Promise<{ result: T; duration: number }> {
        const start = process.hrtime.bigint();
        const result = await fn();
        const end = process.hrtime.bigint();
        const duration = Number(end - start) / 1_000_000; // Convert to milliseconds
        
        return { result, duration };
    }

    /**
     * Test cold start performance
     */
    static async testColdStart(
        handler: (event: HandlerEvent, context: HandlerContext) => Promise<HandlerResponse>,
        event: HandlerEvent,
        context: HandlerContext
    ): Promise<{ response: HandlerResponse; coldStartDuration: number }> {
        // Simulate cold start by clearing require cache
        const moduleKeys = Object.keys(require.cache);
        moduleKeys.forEach(key => {
            if (key.includes('lib/') || key.includes('netlify/')) {
                delete require.cache[key];
            }
        });

        const { result: response, duration: coldStartDuration } = await this.measureExecutionTime(
            () => handler(event, context)
        );

        return { response, coldStartDuration };
    }

    /**
     * Test memory usage during execution
     */
    static async testMemoryUsage<T>(
        fn: () => Promise<T>
    ): Promise<{ result: T; memoryUsage: NodeJS.MemoryUsage }> {
        const initialMemory = process.memoryUsage();
        const result = await fn();
        const finalMemory = process.memoryUsage();
        
        const memoryUsage = {
            rss: finalMemory.rss - initialMemory.rss,
            heapTotal: finalMemory.heapTotal - initialMemory.heapTotal,
            heapUsed: finalMemory.heapUsed - initialMemory.heapUsed,
            external: finalMemory.external - initialMemory.external,
            arrayBuffers: finalMemory.arrayBuffers - initialMemory.arrayBuffers,
        };

        return { result, memoryUsage };
    }
}

/**
 * Environment setup utilities for testing
 */
export class NetlifyTestEnvironment {
    private static originalEnv: NodeJS.ProcessEnv = {};

    /**
     * Set up Netlify test environment
     */
    static setup(envVars: Record<string, string> = {}): void {
        this.originalEnv = { ...process.env };
        
        // Set default Netlify test environment
        process.env.NETLIFY = 'true';
        process.env.NODE_ENV = 'test';
        process.env.NETLIFY_FUNCTION_TIMEOUT = '30000';
        process.env.NETLIFY_MAX_MEMORY = '1008';
        process.env.NETLIFY_ENABLE_EDGE_CACHING = 'false';
        process.env.NETLIFY_ENABLE_FALLBACK_CACHE = 'true';
        process.env.NETLIFY_MEMORY_MONITORING = 'true';
        process.env.NETLIFY_PERFORMANCE_LOGGING = 'true';
        process.env.CACHE_TYPE = 'memory';
        process.env.LOGGER_LEVEL = 'error';
        
        // Apply custom environment variables
        Object.assign(process.env, envVars);
    }

    /**
     * Clean up test environment
     */
    static cleanup(): void {
        process.env = { ...this.originalEnv };
    }

    /**
     * Set up development environment
     */
    static setupDevelopment(): void {
        this.setup({
            NETLIFY_DEV: 'true',
            NODE_ENV: 'development',
            LOGGER_LEVEL: 'debug',
            NETLIFY_PERFORMANCE_LOGGING: 'true',
        });
    }

    /**
     * Set up production-like environment
     */
    static setupProduction(): void {
        this.setup({
            NODE_ENV: 'production',
            LOGGER_LEVEL: 'info',
            NETLIFY_PERFORMANCE_LOGGING: 'false',
            NETLIFY_ENABLE_EDGE_CACHING: 'true',
        });
    }
}