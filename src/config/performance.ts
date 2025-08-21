/**
 * Performance configuration for build optimization
 * Controls performance monitoring and optimization features
 */

// Performance monitoring configuration
export const PERFORMANCE_CONFIG = {
  // Enable performance monitoring (controlled by build mode)
  enabled: import.meta.env.DEV || false,
  
  // Core Web Vitals thresholds (in milliseconds)
  thresholds: {
    lcp: 2500,  // Largest Contentful Paint
    fid: 100,   // First Input Delay
    cls: 0.1,   // Cumulative Layout Shift
    fcp: 1800,  // First Contentful Paint
    ttfb: 600,  // Time to First Byte
  },
  
  // Custom metrics thresholds
  customThresholds: {
    sectionLoadTime: 500,
    questionRenderTime: 100,
  },
  
  // Sampling rate for performance monitoring (0-1)
  sampleRate: import.meta.env.DEV ? 1.0 : 0.1,
  
  // Enable specific monitoring features
  features: {
    coreWebVitals: true,
    customMetrics: true,
    resourceTiming: import.meta.env.DEV,
    navigationTiming: import.meta.env.DEV,
  }
};

// Build optimization flags
export const BUILD_CONFIG = {
  // Enable code splitting for sections
  enableSectionSplitting: true,
  
  // Enable component lazy loading
  enableLazyLoading: true,
  
  // Enable service worker caching
  enableServiceWorker: true,
  
  // Enable CSS optimization
  enableCSSOptimization: true,
  
  // Enable image optimization
  enableImageOptimization: true,
  
  // Bundle size limits (in KB)
  bundleSizeLimits: {
    vendor: 200,      // React + core libraries
    components: 50,   // Component bundle
    sections: 20,     // Per section bundle
    main: 30,         // Main application code
  }
};

// Static site generation configuration
export const STATIC_CONFIG = {
  // Enable static site generation
  enabled: true,
  
  // Pre-render routes
  routes: [
    '/',
    '/sections',
    '/sections/basic-circuits'
  ],
  
  // Generate sitemap
  generateSitemap: true,
  
  // Generate robots.txt
  generateRobots: true,
  
  // Enable offline support
  enableOffline: true,
};