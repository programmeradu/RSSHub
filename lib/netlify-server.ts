// This file is for compatibility with Netlify's deployment.

import '@/utils/request-rewriter';
import { config } from '@/config';
import logger from '@/utils/logger';

// Handle Netlify-specific initialization and environment setup
const initializeNetlifyEnvironment = () => {
    // Set Netlify-specific environment variables if not already set
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'production';
    }
    
    // Configure logging for Netlify environment
    if (process.env.NETLIFY) {
        // Netlify environment detected
        logger.info('Initializing RSSHub for Netlify Functions environment');
        
        // Disable file logging in serverless environment
        process.env.NO_LOGFILES = 'true';
        
        // Set appropriate cache type for serverless with fallback support
        if (!process.env.CACHE_TYPE) {
            // Use netlify-fallback cache type for enhanced caching with Redis fallback
            process.env.CACHE_TYPE = 'netlify-fallback';
        }
        
        // Optimize for serverless constraints
        if (!process.env.REQUEST_TIMEOUT) {
            // Set shorter timeout for serverless functions (25 seconds to stay under Netlify's 30s limit)
            process.env.REQUEST_TIMEOUT = '25000';
        }
        
        // Disable clustering in serverless environment
        process.env.ENABLE_CLUSTER = 'false';
        
        // Configure memory limits for Netlify
        if (!process.env.MEMORY_MAX) {
            // Reduce memory cache size for serverless constraints (64 items vs default 256)
            process.env.MEMORY_MAX = '64';
        }
        
        // Configure cache expiration for Netlify CDN optimization
        if (!process.env.CACHE_EXPIRE) {
            // Set cache expiration to 5 minutes for better CDN integration
            process.env.CACHE_EXPIRE = '300';
        }
        
        // Configure content cache expiration
        if (!process.env.CACHE_CONTENT_EXPIRE) {
            // Set content cache to 30 minutes for Netlify optimization
            process.env.CACHE_CONTENT_EXPIRE = '1800';
        }
        
        // Optimize for efficient route loading in serverless environment
        // The existing app-bootstrap handles dynamic route imports efficiently
        // by leveraging the registry system which loads routes on-demand
        
        logger.info('Netlify environment configuration applied with enhanced caching');
    }
};

// Initialize Netlify environment
initializeNetlifyEnvironment();

// Import and configure the RSSHub app for Netlify function execution
export default (await import('./app-bootstrap')).default;