#!/usr/bin/env tsx

/**
 * Netlify development and testing runner
 * Provides utilities for running tests, development server, and function testing
 */

import { execSync, spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { NetlifyDevSetup } from './dev-setup';
import { initializeMockNetlifyEnvironment, cleanupMockNetlifyEnvironment } from '../../lib/utils/test/netlify-mock-environment';
import type { HandlerEvent, HandlerContext } from '@netlify/functions';

interface TestRunnerOptions {
    mode: 'test' | 'dev' | 'build' | 'deploy' | 'function-test';
    verbose?: boolean;
    watch?: boolean;
    coverage?: boolean;
    filter?: string;
}

class NetlifyDevTestRunner {
    private readonly projectRoot: string;

    constructor() {
        this.projectRoot = process.cwd();
    }

    /**
     * Run the specified mode
     */
    async run(options: TestRunnerOptions): Promise<void> {
        console.log(`🚀 Running Netlify ${options.mode} mode...\n`);

        try {
            switch (options.mode) {
                case 'test':
                    await this.runTests(options);
                    break;
                case 'dev':
                    await this.runDevelopment(options);
                    break;
                case 'build':
                    await this.runBuild(options);
                    break;
                case 'deploy':
                    await this.runDeploy(options);
                    break;
                case 'function-test':
                    await this.runFunctionTests(options);
                    break;
                default:
                    throw new Error(`Unknown mode: ${options.mode}`);
            }
        } catch (error) {
            console.error(`❌ ${options.mode} failed:`, error.message);
            process.exit(1);
        }
    }

    /**
     * Run Netlify-specific tests
     */
    private async runTests(options: TestRunnerOptions): Promise<void> {
        console.log('Running Netlify function tests...');

        const testCommand = [
            'vitest',
            options.watch ? '--watch' : '--run',
            options.coverage ? '--coverage' : '',
            options.filter ? `--grep="${options.filter}"` : '',
            'lib/utils/test/**/*.test.ts',
            'lib/**/*.netlify.test.ts',
        ].filter(Boolean).join(' ');

        if (options.verbose) {
            console.log(`Executing: ${testCommand}`);
        }

        execSync(testCommand, { 
            stdio: 'inherit',
            env: {
                ...process.env,
                NODE_ENV: 'test',
                NETLIFY: 'true',
            },
        });

        console.log('✅ Netlify tests completed successfully');
    }

    /**
     * Run development server with Netlify CLI
     */
    private async runDevelopment(options: TestRunnerOptions): Promise<void> {
        console.log('Starting Netlify development server...');

        // Ensure setup is complete
        const setup = new NetlifyDevSetup();
        await setup.setup();

        // Check if netlify.toml exists
        const netlifyTomlPath = join(this.projectRoot, 'netlify.toml');
        if (!existsSync(netlifyTomlPath)) {
            throw new Error('netlify.toml not found. Run setup first.');
        }

        // Build functions first
        console.log('Building Netlify functions...');
        execSync('pnpm build:netlify', { stdio: 'inherit' });

        // Start Netlify dev server
        const devProcess = spawn('netlify', ['dev'], {
            stdio: 'inherit',
            env: {
                ...process.env,
                NODE_ENV: 'development',
                NETLIFY_DEV: 'true',
            },
        });

        // Handle process termination
        process.on('SIGINT', () => {
            console.log('\n🛑 Stopping development server...');
            devProcess.kill('SIGINT');
            process.exit(0);
        });

        devProcess.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Development server exited with code ${code}`);
                process.exit(code);
            }
        });
    }

    /**
     * Run build process
     */
    private async runBuild(options: TestRunnerOptions): Promise<void> {
        console.log('Building for Netlify deployment...');

        const buildSteps = [
            'pnpm build:netlify',
            'tsx scripts/workflow/build-netlify-packagejson.ts',
        ];

        for (const step of buildSteps) {
            if (options.verbose) {
                console.log(`Executing: ${step}`);
            }
            execSync(step, { stdio: 'inherit' });
        }

        console.log('✅ Build completed successfully');
        console.log('📁 Output directory: netlify/functions');
        console.log('📁 Static files: netlify/static');
    }

    /**
     * Run deployment
     */
    private async runDeploy(options: TestRunnerOptions): Promise<void> {
        console.log('Deploying to Netlify...');

        // Build first
        await this.runBuild(options);

        // Deploy
        const deployCommand = options.filter === 'production' ? 
            'netlify deploy --prod' : 
            'netlify deploy';

        if (options.verbose) {
            console.log(`Executing: ${deployCommand}`);
        }

        execSync(deployCommand, { stdio: 'inherit' });

        console.log('✅ Deployment completed successfully');
    }

    /**
     * Run interactive function tests
     */
    private async runFunctionTests(options: TestRunnerOptions): Promise<void> {
        console.log('Running interactive Netlify function tests...');

        // Initialize mock environment
        const mockEnv = initializeMockNetlifyEnvironment({
            functionTimeout: 30000,
            enableFunctionLogs: true,
            simulateLatency: true,
            simulateColdStarts: true,
        });

        try {
            // Load the Netlify function
            const functionPath = join(this.projectRoot, 'netlify/functions/rsshub.js');
            if (!existsSync(functionPath)) {
                console.log('Building function first...');
                execSync('pnpm build:netlify', { stdio: 'inherit' });
            }

            // Import the function handler
            const { handler } = await import(functionPath);
            const wrappedHandler = mockEnv.createMockHandler(handler);

            // Run test scenarios
            await this.runTestScenarios(wrappedHandler, mockEnv, options);

        } finally {
            cleanupMockNetlifyEnvironment();
        }
    }

    /**
     * Run various test scenarios
     */
    private async runTestScenarios(
        handler: (event: HandlerEvent, context: HandlerContext) => Promise<any>,
        mockEnv: any,
        options: TestRunnerOptions
    ): Promise<void> {
        const scenarios = [
            {
                name: 'RSS Feed Request',
                event: {
                    path: '/rss/github/issue/DIYgod/RSSHub',
                    httpMethod: 'GET',
                    headers: { 'accept': 'application/rss+xml' },
                    queryStringParameters: null,
                    body: null,
                    isBase64Encoded: false,
                },
            },
            {
                name: 'JSON API Request',
                event: {
                    path: '/rss/github/issue/DIYgod/RSSHub',
                    httpMethod: 'GET',
                    headers: { 'accept': 'application/json' },
                    queryStringParameters: { format: 'json' },
                    body: null,
                    isBase64Encoded: false,
                },
            },
            {
                name: 'OpenAPI Documentation',
                event: {
                    path: '/api',
                    httpMethod: 'GET',
                    headers: { 'accept': 'text/html' },
                    queryStringParameters: null,
                    body: null,
                    isBase64Encoded: false,
                },
            },
            {
                name: 'Health Check',
                event: {
                    path: '/healthz',
                    httpMethod: 'GET',
                    headers: {},
                    queryStringParameters: null,
                    body: null,
                    isBase64Encoded: false,
                },
            },
        ];

        for (const scenario of scenarios) {
            if (options.filter && !scenario.name.toLowerCase().includes(options.filter.toLowerCase())) {
                continue;
            }

            console.log(`\n🧪 Testing: ${scenario.name}`);
            
            try {
                const context = {
                    functionName: 'rsshub',
                    functionVersion: '$LATEST',
                    invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:rsshub',
                    memoryLimitInMB: '1008',
                    awsRequestId: `test-${Date.now()}`,
                    logGroupName: '/aws/lambda/rsshub',
                    logStreamName: `test-stream-${Date.now()}`,
                    getRemainingTimeInMillis: () => 30000,
                    done: () => {},
                    fail: () => {},
                    succeed: () => {},
                    callbackWaitsForEmptyEventLoop: true,
                };

                const startTime = Date.now();
                const response = await handler(scenario.event as HandlerEvent, context);
                const duration = Date.now() - startTime;

                console.log(`   ✅ Status: ${response.statusCode}`);
                console.log(`   ⏱️  Duration: ${duration}ms`);
                console.log(`   📦 Body size: ${response.body?.length || 0} bytes`);
                
                if (options.verbose && response.body) {
                    const preview = response.body.substring(0, 200);
                    console.log(`   📄 Preview: ${preview}${response.body.length > 200 ? '...' : ''}`);
                }

            } catch (error) {
                console.log(`   ❌ Error: ${error.message}`);
                if (options.verbose) {
                    console.log(`   📋 Stack: ${error.stack}`);
                }
            }
        }

        // Show metrics
        console.log('\n📊 Function Metrics:');
        const metrics = mockEnv.getMetrics('rsshub');
        console.log(`   Invocations: ${metrics.invocations}`);
        console.log(`   Errors: ${metrics.errors}`);
        console.log(`   Cold Starts: ${metrics.coldStarts}`);
        console.log(`   Avg Execution Time: ${metrics.averageExecutionTime.toFixed(2)}ms`);
        console.log(`   Peak Memory: ${(metrics.memoryUsage.peak / 1024 / 1024).toFixed(2)}MB`);

        // Show recent logs
        if (options.verbose) {
            console.log('\n📝 Recent Logs:');
            const logs = mockEnv.getLogs('rsshub').slice(-10);
            logs.forEach(log => {
                console.log(`   [${log.level.toUpperCase()}] ${log.message}`);
            });
        }
    }
}

// CLI interface
function parseArgs(): TestRunnerOptions {
    const args = process.argv.slice(2);
    const options: TestRunnerOptions = {
        mode: 'test',
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        switch (arg) {
            case 'test':
            case 'dev':
            case 'build':
            case 'deploy':
            case 'function-test':
                options.mode = arg;
                break;
            case '--verbose':
            case '-v':
                options.verbose = true;
                break;
            case '--watch':
            case '-w':
                options.watch = true;
                break;
            case '--coverage':
            case '-c':
                options.coverage = true;
                break;
            case '--filter':
            case '-f':
                options.filter = args[++i];
                break;
            case '--help':
            case '-h':
                printHelp();
                process.exit(0);
                break;
        }
    }

    return options;
}

function printHelp(): void {
    console.log(`
Netlify Development and Testing Runner

Usage: tsx scripts/netlify/dev-test-runner.ts <mode> [options]

Modes:
  test          Run Netlify function tests
  dev           Start development server with Netlify CLI
  build         Build for Netlify deployment
  deploy        Deploy to Netlify
  function-test Run interactive function tests

Options:
  --verbose, -v     Enable verbose output
  --watch, -w       Watch mode (for tests)
  --coverage, -c    Enable coverage (for tests)
  --filter, -f      Filter tests/scenarios by name
  --help, -h        Show this help

Examples:
  tsx scripts/netlify/dev-test-runner.ts test --watch
  tsx scripts/netlify/dev-test-runner.ts dev --verbose
  tsx scripts/netlify/dev-test-runner.ts function-test --filter="RSS"
  tsx scripts/netlify/dev-test-runner.ts deploy --filter="production"
`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const options = parseArgs();
    const runner = new NetlifyDevTestRunner();
    runner.run(options).catch(console.error);
}

export { NetlifyDevTestRunner };