# Netlify Development and Testing Guide

This guide covers the development and testing utilities for RSSHub's Netlify deployment.

## Quick Start

### 1. Initial Setup

Run the setup script to configure your development environment:

```bash
pnpm dev:netlify:setup
```

This will:
- Install Netlify CLI (if not present)
- Create/update `netlify.toml` configuration
- Generate environment template files
- Add development scripts to package.json
- Create development function wrappers

### 2. Start Development Server

```bash
pnpm dev:netlify
```

This starts the Netlify development server with:
- Local function execution
- Hot reload support
- Environment variable loading
- Request/response logging

The server will be available at `http://localhost:8888` (Netlify dev server) which proxies to your RSSHub app at `http://localhost:1200`.

## Testing

### Unit Tests

Run Netlify-specific unit tests:

```bash
# Run tests once
pnpm test:netlify

# Watch mode
pnpm test:netlify:watch

# With coverage
pnpm test:netlify:coverage
```

### Function Testing

Test the actual Netlify function with realistic scenarios:

```bash
# Run all function tests
pnpm test:netlify:function

# Filter specific scenarios
pnpm test:netlify:function --filter="RSS"

# Verbose output
pnpm test:netlify:function --verbose
```

This will test:
- RSS feed generation
- JSON API responses
- OpenAPI documentation
- Health checks
- Error handling
- Performance metrics

## Development Utilities

### Test Utilities

The testing utilities provide helpers for creating mock Netlify events and contexts:

```typescript
import {
    NetlifyTestScenarios,
    NetlifyResponseValidator,
    NetlifyPerformanceUtils,
    NetlifyTestEnvironment,
} from 'lib/utils/test/netlify-test-utils';

// Create test events
const rssEvent = NetlifyTestScenarios.rssFeedRequest('github/issue/DIYgod/RSSHub');
const jsonEvent = NetlifyTestScenarios.jsonApiRequest('api/test', { limit: '10' });

// Validate responses
const isValidRSS = NetlifyResponseValidator.isValidRSSResponse(response);
const isValidJSON = NetlifyResponseValidator.isValidJSONResponse(response);

// Performance testing
const { result, duration } = await NetlifyPerformanceUtils.measureExecutionTime(
    () => handler(event, context)
);
```

### Mock Environment

The mock environment simulates Netlify's runtime for testing:

```typescript
import { MockNetlifyEnvironment } from 'lib/utils/test/netlify-mock-environment';

const mockEnv = new MockNetlifyEnvironment({
    functionTimeout: 30000,
    simulateLatency: true,
    simulateColdStarts: true,
});

mockEnv.initialize();

// Wrap your handler
const wrappedHandler = mockEnv.createMockHandler(actualHandler);

// Get metrics
const metrics = mockEnv.getMetrics('function-name');
console.log(`Invocations: ${metrics.invocations}`);
console.log(`Cold starts: ${metrics.coldStarts}`);
console.log(`Average execution time: ${metrics.averageExecutionTime}ms`);
```

## Configuration

### Environment Variables

Create `.env.netlify.local` from the template:

```bash
cp .env.netlify.dev .env.netlify.local
```

Key variables for development:

```env
# Netlify-specific
NETLIFY_DEV=true
NETLIFY_FUNCTION_TIMEOUT=30000
NETLIFY_MAX_MEMORY=1008
NETLIFY_ENABLE_EDGE_CACHING=false
NETLIFY_MEMORY_MONITORING=true
NETLIFY_PERFORMANCE_LOGGING=true

# RSSHub
NODE_ENV=development
CACHE_TYPE=memory
LOGGER_LEVEL=debug
ALLOW_LOCALHOST=true
```

### Netlify Configuration

The `netlify.toml` file is automatically generated with:

```toml
[build]
  command = "pnpm build:netlify"
  functions = "netlify/functions"
  publish = "netlify/static"

[dev]
  command = "pnpm dev"
  functionsDir = "netlify/functions"
  targetPort = 1200
  port = 8888

[functions.rsshub]
  timeout = 30

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/rsshub"
  status = 200
```

## Development Workflow

### 1. Local Development

```bash
# Start development server
pnpm dev:netlify

# In another terminal, run tests
pnpm test:netlify:watch
```

### 2. Function Testing

```bash
# Test specific scenarios
pnpm test:netlify:function --filter="RSS"

# Test with verbose output
pnpm test:netlify:function --verbose
```

### 3. Build and Deploy

```bash
# Build for deployment
pnpm build:netlify

# Deploy preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

## Debugging

### Function Logs

When running `pnpm dev:netlify`, function logs are displayed in the console:

```
[DEV] Request processed in 245ms - GET /rss/github/issue/DIYgod/RSSHub
[INFO] Cache miss for route: github/issue/DIYgod/RSSHub
[DEBUG] Fetching data from GitHub API
```

### Performance Monitoring

The mock environment provides detailed metrics:

```typescript
const metrics = mockEnv.getMetrics('rsshub');
console.log('Performance Metrics:', {
    invocations: metrics.invocations,
    errors: metrics.errors,
    coldStarts: metrics.coldStarts,
    averageExecutionTime: metrics.averageExecutionTime,
    peakMemoryUsage: metrics.memoryUsage.peak,
});
```

### Memory Usage

Monitor memory usage during development:

```typescript
const { result, memoryUsage } = await NetlifyPerformanceUtils.testMemoryUsage(
    () => handler(event, context)
);

console.log('Memory Usage:', {
    heapUsed: memoryUsage.heapUsed / 1024 / 1024, // MB
    rss: memoryUsage.rss / 1024 / 1024, // MB
});
```

## Testing Scenarios

### RSS Feed Testing

```typescript
// Test RSS feed generation
const event = NetlifyTestScenarios.rssFeedRequest('github/issue/DIYgod/RSSHub', {
    limit: '10',
    format: 'rss',
});

const response = await handler(event, context);
expect(NetlifyResponseValidator.isValidRSSResponse(response)).toBe(true);
```

### JSON API Testing

```typescript
// Test JSON API response
const event = NetlifyTestScenarios.jsonApiRequest('github/issue/DIYgod/RSSHub', {
    limit: '5',
});

const response = await handler(event, context);
expect(NetlifyResponseValidator.isValidJSONResponse(response)).toBe(true);
```

### Error Handling Testing

```typescript
// Test error scenarios
const event = createMockNetlifyEvent({ path: '/invalid-route' });
const response = await handler(event, context);
expect(NetlifyResponseValidator.isValidErrorResponse(response, 404)).toBe(true);
```

### Performance Testing

```typescript
// Test cold start performance
const { response, coldStartDuration } = await NetlifyPerformanceUtils.testColdStart(
    handler,
    event,
    context
);

expect(coldStartDuration).toBeLessThan(5000); // Should start within 5 seconds
```

## Troubleshooting

### Common Issues

1. **Netlify CLI not found**
   ```bash
   npm install -g netlify-cli
   ```

2. **Function timeout**
   - Check `NETLIFY_FUNCTION_TIMEOUT` environment variable
   - Optimize slow routes
   - Implement caching

3. **Memory issues**
   - Monitor memory usage with `NETLIFY_MEMORY_MONITORING=true`
   - Optimize memory-intensive operations
   - Use streaming for large responses

4. **Build failures**
   ```bash
   # Clean and rebuild
   rm -rf netlify/functions dist
   pnpm build:netlify
   ```

### Debug Mode

Enable debug logging:

```env
LOGGER_LEVEL=debug
NETLIFY_PERFORMANCE_LOGGING=true
NETLIFY_MEMORY_MONITORING=true
```

### Function Inspection

Inspect function bundle:

```bash
# Check function size
ls -la netlify/functions/

# Analyze bundle contents
node -e "console.log(require('./netlify/functions/rsshub.js'))"
```

## Advanced Usage

### Custom Test Scenarios

Create custom test scenarios:

```typescript
const customScenario = {
    name: 'Custom RSS Test',
    event: createMockNetlifyEvent({
        path: '/custom/route',
        httpMethod: 'GET',
        headers: { 'user-agent': 'Custom-Bot/1.0' },
        queryStringParameters: { param: 'value' },
    }),
};
```

### Environment Simulation

Simulate different environments:

```typescript
// Production-like environment
NetlifyTestEnvironment.setupProduction();

// Development environment
NetlifyTestEnvironment.setupDevelopment();

// Custom environment
NetlifyTestEnvironment.setup({
    NODE_ENV: 'staging',
    NETLIFY_ENABLE_EDGE_CACHING: 'true',
    CACHE_TYPE: 'redis',
});
```

### Performance Benchmarking

Benchmark function performance:

```typescript
const scenarios = [
    NetlifyTestScenarios.rssFeedRequest('route1'),
    NetlifyTestScenarios.rssFeedRequest('route2'),
    NetlifyTestScenarios.jsonApiRequest('route3'),
];

for (const scenario of scenarios) {
    const { result, duration } = await NetlifyPerformanceUtils.measureExecutionTime(
        () => handler(scenario, context)
    );
    
    console.log(`${scenario.path}: ${duration}ms`);
}
```

## Integration with CI/CD

Add to your CI pipeline:

```yaml
# .github/workflows/netlify-test.yml
- name: Test Netlify Functions
  run: |
    pnpm test:netlify
    pnpm test:netlify:function

- name: Build for Netlify
  run: pnpm build:netlify

- name: Deploy to Netlify
  run: netlify deploy --prod
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```