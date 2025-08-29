#!/usr/bin/env tsx

/**
 * Netlify CLI integration setup for local development
 * This script helps set up and configure Netlify CLI for local RSSHub development
 */

import { execSync } from 'node:child_process';
import { existsSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

interface NetlifyDevConfig {
    command: string;
    functionsDir: string;
    publish: string;
    port: number;
    targetPort: number;
}

class NetlifyDevSetup {
    private readonly projectRoot: string;
    private readonly netlifyTomlPath: string;

    constructor() {
        this.projectRoot = process.cwd();
        this.netlifyTomlPath = join(this.projectRoot, 'netlify.toml');
    }

    /**
     * Check if Netlify CLI is installed
     */
    private checkNetlifyCLI(): boolean {
        try {
            execSync('netlify --version', { stdio: 'pipe' });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Install Netlify CLI if not present
     */
    private async installNetlifyCLI(): Promise<void> {
        console.log('Installing Netlify CLI...');
        try {
            execSync('npm install -g netlify-cli', { stdio: 'inherit' });
            console.log('✅ Netlify CLI installed successfully');
        } catch (error) {
            console.error('❌ Failed to install Netlify CLI:', error);
            throw error;
        }
    }

    /**
     * Create or update netlify.toml for development
     */
    private createNetlifyConfig(): void {
        const config = `[build]
  command = "pnpm build:netlify"
  functions = "netlify/functions"
  publish = "netlify/static"

[build.environment]
  NODE_VERSION = "22"

[functions]
  directory = "netlify/functions"

[functions.rsshub]
  timeout = 30

[dev]
  command = "pnpm dev"
  functionsDir = "netlify/functions"
  publish = "netlify/static"
  targetPort = 1200
  port = 8888
  autoLaunch = false

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/rsshub"
  status = 200

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/rsshub"
  status = 200
  force = false

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
`;

        writeFileSync(this.netlifyTomlPath, config);
        console.log('✅ Created/updated netlify.toml for development');
    }

    /**
     * Create development environment file
     */
    private createDevEnvironment(): void {
        const envPath = join(this.projectRoot, '.env.netlify.dev');
        const envContent = `# Netlify Development Environment Variables
# Copy this file to .env.netlify.local and customize as needed

# Netlify-specific settings
NETLIFY_DEV=true
NETLIFY_FUNCTION_TIMEOUT=30000
NETLIFY_MAX_MEMORY=1008
NETLIFY_ENABLE_EDGE_CACHING=false
NETLIFY_ENABLE_FALLBACK_CACHE=true
NETLIFY_COLD_START_OPTIMIZATION=true
NETLIFY_MEMORY_MONITORING=true
NETLIFY_PERFORMANCE_LOGGING=true

# RSSHub Configuration
NODE_ENV=development
CACHE_TYPE=memory
CACHE_EXPIRE=300
LOGGER_LEVEL=debug
ALLOW_LOCALHOST=true

# Optional: Redis for caching (if available)
# REDIS_URL=redis://localhost:6379

# Optional: Proxy settings for development
# PROXY_URI=http://localhost:8080
`;

        if (!existsSync(envPath)) {
            writeFileSync(envPath, envContent);
            console.log('✅ Created .env.netlify.dev template');
        }
    }

    /**
     * Add development scripts to package.json
     */
    private updatePackageScripts(): void {
        const packageJsonPath = join(this.projectRoot, 'package.json');
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

        const newScripts = {
            'dev:netlify': 'netlify dev',
            'dev:netlify:build': 'pnpm build:netlify && netlify dev --offline',
            'netlify:login': 'netlify login',
            'netlify:init': 'netlify init',
            'netlify:deploy:preview': 'pnpm build:netlify && netlify deploy',
            'netlify:deploy:prod': 'pnpm build:netlify && netlify deploy --prod',
            'netlify:functions:list': 'netlify functions:list',
            'netlify:functions:invoke': 'netlify functions:invoke rsshub',
        };

        packageJson.scripts = { ...packageJson.scripts, ...newScripts };
        writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✅ Added Netlify development scripts to package.json');
    }

    /**
     * Create Netlify function development wrapper
     */
    private createFunctionDevWrapper(): void {
        const devFunctionPath = join(this.projectRoot, 'netlify/functions/rsshub-dev.ts');
        const devFunctionContent = `/**
 * Development wrapper for Netlify function
 * This provides better debugging and hot reload capabilities
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createNetlifyHandler } from '../../lib/netlify-server';

// Enable source maps for better debugging
if (process.env.NODE_ENV === 'development') {
    require('source-map-support').install();
}

let handler: Handler | null = null;

// Create handler with hot reload support
const getHandler = async (): Promise<Handler> => {
    if (!handler || process.env.NODE_ENV === 'development') {
        // In development, recreate handler for each request to support hot reload
        handler = await createNetlifyHandler();
    }
    return handler;
};

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const startTime = Date.now();
    
    try {
        const netlifyHandler = await getHandler();
        const result = await netlifyHandler(event, context);
        
        if (process.env.NETLIFY_PERFORMANCE_LOGGING === 'true') {
            const duration = Date.now() - startTime;
            console.log(\`[DEV] Request processed in \${duration}ms - \${event.httpMethod} \${event.path}\`);
        }
        
        return result;
    } catch (error) {
        console.error('[DEV] Function error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                error: 'Internal Server Error',
                message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
                requestId: context.awsRequestId,
            }),
        };
    }
};
`;

        writeFileSync(devFunctionPath, devFunctionContent);
        console.log('✅ Created development function wrapper');
    }

    /**
     * Main setup method
     */
    async setup(): Promise<void> {
        console.log('🚀 Setting up Netlify CLI integration for local development...\n');

        try {
            // Check and install Netlify CLI
            if (!this.checkNetlifyCLI()) {
                await this.installNetlifyCLI();
            } else {
                console.log('✅ Netlify CLI is already installed');
            }

            // Create configuration files
            this.createNetlifyConfig();
            this.createDevEnvironment();
            this.updatePackageScripts();
            this.createFunctionDevWrapper();

            console.log('\n🎉 Netlify development setup complete!');
            console.log('\nNext steps:');
            console.log('1. Copy .env.netlify.dev to .env.netlify.local and customize');
            console.log('2. Run "pnpm dev:netlify" to start development server');
            console.log('3. Run "pnpm netlify:login" to authenticate with Netlify');
            console.log('4. Run "pnpm netlify:init" to link your project');

        } catch (error) {
            console.error('❌ Setup failed:', error);
            process.exit(1);
        }
    }
}

// Run setup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const setup = new NetlifyDevSetup();
    setup.setup().catch(console.error);
}

export { NetlifyDevSetup };