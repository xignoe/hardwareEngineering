import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Bundle analyzer - only in analyze mode
    ...(mode === 'analyze' ? [
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap', // Better visualization
      })
    ] : [])
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    // PostCSS configuration is automatically loaded from postcss.config.js
    postcss: './postcss.config.js'
  },
  build: {
    // Enable minification
    minify: 'terser',
    // Configure terser options for better compression
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
        passes: 2, // Run compression twice for better results
      },
      mangle: {
        safari10: true, // Fix Safari 10 issues
      },
      format: {
        comments: false, // Remove comments
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Configure chunk splitting for better caching
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: (id) => {
          // Vendor chunk for React and React DOM
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            // Other node_modules go to a separate chunk
            return 'libs';
          }
          
          // Data chunks for question sections (enables code splitting)
          if (id.includes('src/data/sections/')) {
            const sectionName = id.split('/').pop()?.replace('.ts', '');
            return `section-${sectionName}`;
          }
          
          // Main data loader
          if (id.includes('src/data/')) {
            return 'data';
          }
          
          // Component chunks for large components
          if (id.includes('src/components/')) {
            return 'components';
          }
        },
        // Optimize chunk file names for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash].[ext]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        },
      },
      // Enable tree shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
    // Set chunk size warning limit (500kb)
    chunkSizeWarningLimit: 500,
    // Disable source maps for production (reduces bundle size)
    sourcemap: false,
    // Target modern browsers for better optimization
    target: 'es2020',
    // Enable CSS minification
    cssMinify: true,
    // Enable asset inlining for small files
    assetsInlineLimit: 4096, // 4kb
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    // Force pre-bundling of these dependencies
    force: false,
    // Exclude large dependencies that should be code-split
    exclude: [],
  },
  // Configure for static site generation
  base: './', // Use relative paths for static deployment
  // Production server configuration
  preview: {
    port: 4173,
    strictPort: true,
    // Enable compression
    headers: {
      'Cache-Control': 'public, max-age=31536000', // 1 year cache for assets
    },
  },
  // Development server optimizations
  server: {
    hmr: {
      overlay: false, // Disable error overlay in development
    },
    // Enable compression in development
    middlewareMode: false,
  },
  // Enable experimental features for better performance
  esbuild: {
    // Remove console.log in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    // Enable legal comments removal
    legalComments: 'none',
    // Target modern browsers for better optimization
    target: 'es2020',
  },
  
  // Define global constants for optimization
  define: {
    // Remove development-only code in production
    __DEV__: mode === 'development',
    // Enable performance monitoring only in development
    __PERFORMANCE_MONITORING__: mode === 'development',
  },
}))
