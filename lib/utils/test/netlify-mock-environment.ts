/**
 * Mock Netlify environment for development and testing
 * Simulates Netlify's runtime environment, function context, and platform features
 */

import { EventEmitter } from 'node:events';
import { randomUUID } from 'node:crypto';
import type { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';

export interface MockNetlifyEnvironmentConfig {
    functionTimeout: number;
    memoryLimit: number;
    enableEdgeCaching: boolean;
    enableFunctionLogs: boolean;
    simulateLatency: boolean;
    simulateColdStarts: boolean;
    coldStartProbability: number;
    latencyRange: [number, number];
}

export interface FunctionMetrics {
    invocations: number;
    errors: number;
    timeouts: number;
    coldStarts: number;
    averageExecutionTime: number;
    totalExecutionTime: number;
    memoryUsage: {
        peak: number;
        average: number;
    };
}

export interface LogEntry {
    timestamp: string;
    level: 'info' | 'warn' | 'error' | 'debug';
    message: string;
    requestId: string;
    functionName: string;
    metadata?: Record<string, any>;
}

/**
 * Mock Netlify runtime environment
 */
export class MockNetlifyEnvironment extends EventEmitter {
    private config: MockNetlifyEnvironmentConfig;
    private metrics: Map<string, FunctionMetrics> = new Map();
    private logs: LogEntry[] = [];
    private isInitialized = false;
    private coldStartCache = new Set<string>();

    constructor(config: Partial<MockNetlifyEnvironmentConfig> = {}) {
        super();
        
        this.config = {
            functionTimeout: 30000,
            memoryLimit: 1008,
            enableEdgeCaching: true,
            enableFunctionLogs: true,
            simulateLatency: true,
            simulateColdStarts: true,
            coldStartProbability: 0.1,
            latencyRange: [50, 200],
            ...config,
        };
    }

    /**
     * Initialize the mock environment
     */
    initialize(): void {
        if (this.isInitialized) return;

        // Set up Netlify environment variables
        process.env.NETLIFY = 'true';
        process.env.NETLIFY_DEV = 'true';
        process.env.AWS_LAMBDA_FUNCTION_NAME = 'rsshub';
        process.env.AWS_LAMBDA_FUNCTION_VERSION = '$LATEST';
        process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE = this.config.memoryLimit.toString();
        process.env.AWS_LAMBDA_RUNTIME_API = 'mock-runtime-api';
        process.env.AWS_EXECUTION_ENV = 'AWS_Lambda_nodejs22.x';
        process.env.AWS_REGION = 'us-east-1';
        process.env.TZ = 'UTC';

        // Mock Netlify-specific environment variables
        process.env.NETLIFY_FUNCTION_TIMEOUT = this.config.functionTimeout.toString();
        process.env.NETLIFY_MAX_MEMORY = this.config.memoryLimit.toString();
        process.env.NETLIFY_ENABLE_EDGE_CACHING = this.config.enableEdgeCaching.toString();

        // Set up console overrides for logging
        if (this.config.enableFunctionLogs) {
            this.setupLogging();
        }

        this.isInitialized = true;
        this.emit('initialized');
    }

    /**
     * Clean up the mock environment
     */
    cleanup(): void {
        if (!this.isInitialized) return;

        // Remove Netlify environment variables
        delete process.env.NETLIFY;
        delete process.env.NETLIFY_DEV;
        delete process.env.AWS_LAMBDA_FUNCTION_NAME;
        delete process.env.AWS_LAMBDA_FUNCTION_VERSION;
        delete process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE;
        delete process.env.AWS_LAMBDA_RUNTIME_API;
        delete process.env.AWS_EXECUTION_ENV;
        delete process.env.AWS_REGION;

        // Clear metrics and logs
        this.metrics.clear();
        this.logs.length = 0;
        this.coldStartCache.clear();

        this.isInitialized = false;
        this.emit('cleanup');
    }

    /**
     * Create a mock function handler with Netlify environment simulation
     */
    createMockHandler<T extends HandlerResponse>(
        actualHandler: (event: HandlerEvent, context: HandlerContext) => Promise<T>,
        functionName = 'rsshub'
    ): (event: HandlerEvent, context: HandlerContext) => Promise<T> {
        return async (event: HandlerEvent, context: HandlerContext): Promise<T> => {
            const requestId = context.awsRequestId || randomUUID();
            const startTime = Date.now();
            const isColdStart = this.shouldSimulateColdStart(functionName);

            // Initialize metrics if not exists
            if (!this.metrics.has(functionName)) {
                this.metrics.set(functionName, {
                    invocations: 0,
                    errors: 0,
                    timeouts: 0,
                    coldStarts: 0,
                    averageExecutionTime: 0,
                    totalExecutionTime: 0,
                    memoryUsage: { peak: 0, average: 0 },
                });
            }

            const metrics = this.metrics.get(functionName)!;
            metrics.invocations++;

            if (isColdStart) {
                metrics.coldStarts++;
                await this.simulateColdStartDelay();
                this.log('info', `Cold start for function ${functionName}`, requestId, functionName);
            }

            // Simulate network latency
            if (this.config.simulateLatency) {
                await this.simulateNetworkLatency();
            }

            // Create enhanced context with mock features
            const enhancedContext = this.createEnhancedContext(context, functionName, requestId);

            try {
                // Monitor memory usage
                const initialMemory = process.memoryUsage();
                
                // Execute the actual handler with timeout
                const result = await this.executeWithTimeout(
                    actualHandler(event, enhancedContext),
                    this.config.functionTimeout,
                    requestId,
                    functionName
                );

                // Calculate execution metrics
                const executionTime = Date.now() - startTime;
                const finalMemory = process.memoryUsage();
                const memoryUsed = finalMemory.heapUsed - initialMemory.heapUsed;

                // Update metrics
                metrics.totalExecutionTime += executionTime;
                metrics.averageExecutionTime = metrics.invocations > 0 ? metrics.totalExecutionTime / metrics.invocations : 0;
                metrics.memoryUsage.peak = Math.max(metrics.memoryUsage.peak, memoryUsed);
                metrics.memoryUsage.average = (metrics.memoryUsage.average + memoryUsed) / 2;

                this.log('info', `Function executed successfully in ${executionTime}ms`, requestId, functionName, {
                    executionTime,
                    memoryUsed,
                    isColdStart,
                    statusCode: result.statusCode,
                });

                this.emit('functionExecuted', {
                    functionName,
                    requestId,
                    executionTime,
                    memoryUsed,
                    isColdStart,
                    success: true,
                });

                return result;

            } catch (error) {
                metrics.errors++;
                
                if (error.name === 'TimeoutError') {
                    metrics.timeouts++;
                    this.log('error', `Function timeout after ${this.config.functionTimeout}ms`, requestId, functionName);
                } else {
                    this.log('error', `Function error: ${error.message}`, requestId, functionName, { error: error.stack });
                }

                this.emit('functionError', {
                    functionName,
                    requestId,
                    error: error.message,
                    isColdStart,
                });

                throw error;
            }
        };
    }

    /**
     * Get function metrics
     */
    getMetrics(functionName?: string): FunctionMetrics | Map<string, FunctionMetrics> {
        if (functionName) {
            return this.metrics.get(functionName) || {
                invocations: 0,
                errors: 0,
                timeouts: 0,
                coldStarts: 0,
                averageExecutionTime: 0,
                totalExecutionTime: 0,
                memoryUsage: { peak: 0, average: 0 },
            };
        }
        return new Map(this.metrics);
    }

    /**
     * Get function logs
     */
    getLogs(functionName?: string, level?: LogEntry['level']): LogEntry[] {
        let filteredLogs = [...this.logs];
        
        if (functionName) {
            filteredLogs = filteredLogs.filter(log => log.functionName === functionName);
        }
        
        if (level) {
            filteredLogs = filteredLogs.filter(log => log.level === level);
        }
        
        return filteredLogs;
    }

    /**
     * Clear metrics and logs
     */
    reset(): void {
        this.metrics.clear();
        this.logs.length = 0;
        this.coldStartCache.clear();
        this.emit('reset');
    }

    /**
     * Simulate edge caching behavior
     */
    simulateEdgeCache<T>(
        key: string,
        generator: () => Promise<T>,
        ttl = 300000 // 5 minutes
    ): Promise<T> {
        // Simple in-memory cache simulation
        const cache = (global as any).__netlifyEdgeCache || new Map();
        (global as any).__netlifyEdgeCache = cache;

        const cached = cache.get(key);
        if (cached && Date.now() - cached.timestamp < ttl) {
            this.log('debug', `Edge cache hit for key: ${key}`, 'cache', 'edge-cache');
            return Promise.resolve(cached.value);
        }

        return generator().then(value => {
            cache.set(key, { value, timestamp: Date.now() });
            this.log('debug', `Edge cache miss for key: ${key}`, 'cache', 'edge-cache');
            return value;
        });
    }

    private shouldSimulateColdStart(functionName: string): boolean {
        if (!this.config.simulateColdStarts) return false;
        
        const cacheKey = `${functionName}-${Math.floor(Date.now() / 300000)}`; // 5-minute windows
        
        if (this.coldStartCache.has(cacheKey)) {
            return false;
        }
        
        const shouldColdStart = Math.random() < this.config.coldStartProbability;
        if (shouldColdStart) {
            this.coldStartCache.add(cacheKey);
        }
        
        return shouldColdStart;
    }

    private async simulateColdStartDelay(): Promise<void> {
        // Cold starts typically take 100-500ms
        const delay = Math.random() * 400 + 100;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    private async simulateNetworkLatency(): Promise<void> {
        const [min, max] = this.config.latencyRange;
        const delay = Math.random() * (max - min) + min;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    private createEnhancedContext(
        originalContext: HandlerContext,
        functionName: string,
        requestId: string
    ): HandlerContext {
        const startTime = Date.now();
        
        return {
            ...originalContext,
            functionName,
            awsRequestId: requestId,
            getRemainingTimeInMillis: () => {
                const elapsed = Date.now() - startTime;
                return Math.max(0, this.config.functionTimeout - elapsed);
            },
        };
    }

    private async executeWithTimeout<T>(
        promise: Promise<T>,
        timeout: number,
        requestId: string,
        functionName: string
    ): Promise<T> {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                const error = new Error(`Function timeout after ${timeout}ms`);
                error.name = 'TimeoutError';
                reject(error);
            }, timeout);

            promise
                .then(result => {
                    clearTimeout(timer);
                    resolve(result);
                })
                .catch(error => {
                    clearTimeout(timer);
                    reject(error);
                });
        });
    }

    private setupLogging(): void {
        const originalConsole = { ...console };
        
        console.log = (...args) => {
            this.log('info', args.join(' '), 'console', 'function');
            originalConsole.log(...args);
        };
        
        console.error = (...args) => {
            this.log('error', args.join(' '), 'console', 'function');
            originalConsole.error(...args);
        };
        
        console.warn = (...args) => {
            this.log('warn', args.join(' '), 'console', 'function');
            originalConsole.warn(...args);
        };
        
        console.debug = (...args) => {
            this.log('debug', args.join(' '), 'console', 'function');
            originalConsole.debug(...args);
        };
    }

    private log(
        level: LogEntry['level'],
        message: string,
        requestId: string,
        functionName: string,
        metadata?: Record<string, any>
    ): void {
        if (!this.config.enableFunctionLogs) return;

        const logEntry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            requestId,
            functionName,
            metadata,
        };

        this.logs.push(logEntry);
        this.emit('log', logEntry);

        // Keep only last 1000 log entries
        if (this.logs.length > 1000) {
            this.logs.splice(0, this.logs.length - 1000);
        }
    }
}

/**
 * Global mock environment instance
 */
let globalMockEnvironment: MockNetlifyEnvironment | null = null;

/**
 * Get or create global mock environment
 */
export function getMockNetlifyEnvironment(config?: Partial<MockNetlifyEnvironmentConfig>): MockNetlifyEnvironment {
    if (!globalMockEnvironment) {
        globalMockEnvironment = new MockNetlifyEnvironment(config);
    }
    return globalMockEnvironment;
}

/**
 * Initialize global mock environment
 */
export function initializeMockNetlifyEnvironment(config?: Partial<MockNetlifyEnvironmentConfig>): MockNetlifyEnvironment {
    const env = getMockNetlifyEnvironment(config);
    env.initialize();
    return env;
}

/**
 * Cleanup global mock environment
 */
export function cleanupMockNetlifyEnvironment(): void {
    if (globalMockEnvironment) {
        globalMockEnvironment.cleanup();
        globalMockEnvironment = null;
    }
}

/**
 * Decorator for automatic mock environment setup in tests
 */
export function withMockNetlifyEnvironment(config?: Partial<MockNetlifyEnvironmentConfig>) {
    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
        if (!descriptor) {
            // Handle case where descriptor is undefined
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {
                value: target[propertyKey],
                writable: true,
                enumerable: true,
                configurable: true,
            };
        }
        
        const originalMethod = descriptor.value;
        
        descriptor.value = async function (...args: any[]) {
            const env = initializeMockNetlifyEnvironment(config);
            
            try {
                return await originalMethod.apply(this, args);
            } finally {
                env.cleanup();
            }
        };
        
        return descriptor;
    };
}