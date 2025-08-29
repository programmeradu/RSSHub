# RSSHub Netlify Deployment Guide

This guide will help you deploy RSSHub to Netlify Functions.

## Prerequisites

- A Netlify account
- Node.js 18+ installed locally
- pnpm package manager

## Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/DIYgod/RSSHub)

## Manual Deployment

### 1. Prepare Your Repository

1. Fork or clone the RSSHub repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### 2. Build for Netlify

Run the Netlify build command:
```bash
pnpm build:netlify
```

This will:
- Build routes and generate function files
- Bundle the application with Netlify-specific optimizations
- Copy static assets to the appropriate directory
- Generate a Netlify-specific package.json

### 3. Configure Environment Variables

1. Go to your Netlify dashboard
2. Navigate to Site settings > Environment variables
3. Add the required environment variables (see `.env.netlify.example` for reference)

Essential variables:
- `NODE_ENV=production`
- `NETLIFY=true`

Optional but recommended:
- `CACHE_TYPE=memory` (for in-memory caching)
- `LOG_LEVEL=info`
- `REQUEST_TIMEOUT=25000` (leave some buffer for Netlify's 30s timeout)

#### Netlify-Specific Configuration Variables

RSSHub includes specialized configuration for Netlify deployments:

**Function Constraints:**
- `NETLIFY_FUNCTION_TIMEOUT=30000` - Function timeout in milliseconds (max 30s for standard, 900s for Pro)
- `NETLIFY_MAX_MEMORY=1008` - Maximum memory allocation in MB (max 1008MB)

**Performance Optimization:**
- `NETLIFY_ENABLE_EDGE_CACHING=true` - Enable Netlify CDN caching
- `NETLIFY_ENABLE_FALLBACK_CACHE=true` - Use fallback caching when Redis unavailable
- `NETLIFY_COLD_START_OPTIMIZATION=true` - Enable cold start optimizations
- `NETLIFY_MEMORY_MONITORING=false` - Enable memory usage monitoring

**Debugging and Monitoring:**
- `NETLIFY_REQUEST_ID_HEADER=x-nf-request-id` - Header for request tracking
- `NETLIFY_ERROR_REPORTING=true` - Enable error reporting
- `NETLIFY_PERFORMANCE_LOGGING=false` - Enable performance logging

**Pro Features:**
- `NETLIFY_PRO=true` - Enable if using Netlify Pro (allows longer timeouts)

### 4. Deploy to Netlify

#### Option A: Git Integration (Recommended)

1. Connect your repository to Netlify
2. Set build command: `pnpm build:netlify`
3. Set publish directory: `netlify/static`
4. Deploy!

#### Option B: Manual Upload

1. Run `pnpm build:netlify` locally
2. Upload the `netlify` directory to Netlify
3. Configure the function directory as `netlify/functions`

## Configuration

### netlify.toml

The `netlify.toml` file is automatically configured with:

- **Build settings**: Command and directories
- **Function configuration**: Timeout (30s), memory (1008MB)
- **Redirects**: All routes directed to the main function
- **Headers**: Caching and security headers for static assets

### Function Limits

Netlify Functions have the following limits:

- **Timeout**: 30 seconds (free tier), 15 minutes (Pro)
- **Memory**: 1008 MB maximum
- **Bundle size**: 50 MB unzipped
- **Concurrent executions**: 1000 (default)

### Performance Optimization

1. **Caching**: Use in-memory caching (`CACHE_TYPE=memory`)
2. **Timeout**: Set `REQUEST_TIMEOUT=25000` to avoid Netlify timeouts
3. **Memory**: Monitor function memory usage in Netlify dashboard
4. **Cold starts**: First request may be slower due to cold start

## Monitoring and Debugging

### Netlify Dashboard

Monitor your deployment in the Netlify dashboard:
- Function logs under Functions tab
- Performance metrics
- Error tracking

### Environment Variables

Check that all required environment variables are set:
- Site settings > Environment variables
- Verify sensitive tokens are properly configured

### Configuration Validation

RSSHub automatically validates Netlify configuration on startup. If you see validation errors:

1. **Function timeout errors**: Ensure `NETLIFY_FUNCTION_TIMEOUT` doesn't exceed platform limits
2. **Memory limit errors**: Keep `NETLIFY_MAX_MEMORY` within Netlify's 1008MB limit
3. **Header format errors**: Ensure `NETLIFY_REQUEST_ID_HEADER` uses valid HTTP header format

### Common Issues

1. **Function timeout**: Reduce `REQUEST_TIMEOUT` or optimize slow routes
2. **Memory issues**: Monitor memory usage and optimize heavy operations
3. **Cold starts**: Consider using Netlify's background functions for warming
4. **Bundle size**: Ensure the function bundle is under 50MB
5. **Configuration errors**: Check Netlify logs for configuration validation messages

## Custom Domains

1. Add your custom domain in Site settings > Domain management
2. Configure DNS records as instructed by Netlify
3. SSL certificates are automatically provisioned

## Scaling

For high-traffic deployments:
- Consider upgrading to Netlify Pro for higher limits
- Implement external caching (Redis) for better performance
- Use Netlify's edge functions for global distribution

## Support

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [RSSHub Documentation](https://docs.rsshub.app/)
- [GitHub Issues](https://github.com/DIYgod/RSSHub/issues)

## Security

- Never commit sensitive environment variables
- Use Netlify's environment variable management
- Enable access control if needed (`ACCESS_KEY` environment variable)
- Review security headers in `netlify.toml`