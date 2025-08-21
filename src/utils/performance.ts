/**
 * Performance monitoring utilities
 * Tracks key performance metrics for optimization
 */

import { PERFORMANCE_CONFIG } from '../config/performance';

// Performance metrics interface
export interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  
  // Additional metrics
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  
  // Custom metrics
  sectionLoadTime?: number;
  questionRenderTime?: number;
}

// Performance observer for Core Web Vitals
class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (PERFORMANCE_CONFIG.enabled && 
        typeof window !== 'undefined' && 
        'PerformanceObserver' in window) {
      this.initializeObservers();
    }
  }

  private initializeObservers(): void {
    // Largest Contentful Paint (LCP)
    this.observeMetric('largest-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      this.reportMetric('LCP', lastEntry.startTime);
    });

    // First Input Delay (FID)
    this.observeMetric('first-input', (entries) => {
      const firstEntry = entries[0] as any; // FID entries have processingStart
      this.metrics.fid = firstEntry.processingStart - firstEntry.startTime;
      this.reportMetric('FID', this.metrics.fid);
    });

    // Cumulative Layout Shift (CLS)
    this.observeMetric('layout-shift', (entries) => {
      let clsValue = 0;
      for (const entry of entries) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.metrics.cls = clsValue;
      this.reportMetric('CLS', clsValue);
    });

    // First Contentful Paint (FCP)
    this.observeMetric('paint', (entries) => {
      for (const entry of entries) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
          this.reportMetric('FCP', entry.startTime);
        }
      }
    });

    // Navigation timing for TTFB
    this.observeMetric('navigation', (entries) => {
      const navEntry = entries[0] as PerformanceNavigationTiming;
      this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
      this.reportMetric('TTFB', this.metrics.ttfb);
    });
  }

  private observeMetric(type: string, callback: (entries: PerformanceEntry[]) => void): void {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      
      observer.observe({ type, buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn(`Failed to observe ${type}:`, error);
    }
  }

  private reportMetric(name: string, value: number): void {
    // Only log in development
    if (PERFORMANCE_CONFIG.enabled) {
      console.log(`Performance ${name}:`, `${value.toFixed(2)}ms`);
      
      // Check against thresholds
      const threshold = PERFORMANCE_CONFIG.thresholds[name.toLowerCase() as keyof typeof PERFORMANCE_CONFIG.thresholds];
      if (threshold && value > threshold) {
        console.warn(`Performance warning: ${name} (${value.toFixed(2)}ms) exceeds threshold (${threshold}ms)`);
      }
    }
    
    // Sample for production analytics
    if (!import.meta.env.DEV && Math.random() < PERFORMANCE_CONFIG.sampleRate) {
      // In production, you could send to analytics
      // analytics.track('performance', { metric: name, value });
    }
  }

  // Custom timing for section loading
  public measureSectionLoad(sectionId: string, startTime: number): void {
    const loadTime = performance.now() - startTime;
    this.metrics.sectionLoadTime = loadTime;
    this.reportMetric(`Section Load (${sectionId})`, loadTime);
  }

  // Custom timing for question rendering
  public measureQuestionRender(questionId: string, startTime: number): void {
    const renderTime = performance.now() - startTime;
    this.metrics.questionRenderTime = renderTime;
    this.reportMetric(`Question Render (${questionId})`, renderTime);
  }

  // Get current metrics
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Cleanup observers
  public disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions for manual performance measurement
export const performance_utils = {
  // Mark the start of an operation
  mark: (name: string): void => {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(`${name}-start`);
    }
  },

  // Mark the end of an operation and measure duration
  measure: (name: string): number => {
    if (typeof performance !== 'undefined' && performance.mark && performance.measure) {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name)[0];
      return measure?.duration || 0;
    }
    return 0;
  },

  // Get resource loading times
  getResourceTiming: (): PerformanceResourceTiming[] => {
    if (typeof performance !== 'undefined' && performance.getEntriesByType) {
      return performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    }
    return [];
  },

  // Get navigation timing
  getNavigationTiming: (): PerformanceNavigationTiming | null => {
    if (typeof performance !== 'undefined' && performance.getEntriesByType) {
      const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      return entries[0] || null;
    }
    return null;
  }
};

// React hook for performance monitoring
export function usePerformanceMonitoring() {
  return {
    measureSectionLoad: performanceMonitor.measureSectionLoad.bind(performanceMonitor),
    measureQuestionRender: performanceMonitor.measureQuestionRender.bind(performanceMonitor),
    getMetrics: performanceMonitor.getMetrics.bind(performanceMonitor),
    mark: performance_utils.mark,
    measure: performance_utils.measure
  };
}