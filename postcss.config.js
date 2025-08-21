export default {
  plugins: {
    autoprefixer: {
      // Add vendor prefixes for better browser compatibility
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie 11'
      ]
    },
    cssnano: {
      // CSS minification and optimization
      preset: ['default', {
        // Preserve important comments
        discardComments: {
          removeAll: false,
        },
        // Optimize CSS custom properties
        reduceIdents: false,
        // Merge duplicate rules
        mergeLonghand: true,
        // Optimize calc() expressions
        calc: true,
        // Remove unused CSS (basic level)
        discardUnused: true,
        // Normalize whitespace
        normalizeWhitespace: true,
        // Advanced optimizations
        mergeRules: true,
        minifySelectors: true,
        minifyParams: true,
        // Optimize z-index values
        zindex: false, // Keep original z-index values for maintainability
        // Optimize font-weight values
        minifyFontValues: true,
        // Convert colors to shorter formats
        colormin: true,
        // Optimize SVG content
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
              active: false
            }
          ]
        }
      }]
    }
  }
};