#!/usr/bin/env node

/**
 * Generate sitemap.xml for static site optimization
 * This helps with SEO and search engine indexing
 */

const { writeFileSync } = require('fs');
const { join } = require('path');

// Configuration
const SITE_URL = 'https://your-domain.com'; // Update this with actual domain
const DIST_DIR = 'dist';

// Static routes for the study guide
const routes = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/sections',
    changefreq: 'weekly', 
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/sections/basic-circuits',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Generate sitemap XML
function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write sitemap to dist directory
  const sitemapPath = join(DIST_DIR, 'sitemap.xml');
  writeFileSync(sitemapPath, sitemap);
  console.log(`✓ Generated sitemap at ${sitemapPath}`);
}

// Generate robots.txt for SEO
function generateRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

  const robotsPath = join(DIST_DIR, 'robots.txt');
  writeFileSync(robotsPath, robots);
  console.log(`✓ Generated robots.txt at ${robotsPath}`);
}

// Main execution
try {
  generateSitemap();
  generateRobots();
  console.log('✓ Static site generation complete');
} catch (error) {
  console.error('✗ Failed to generate static site files:', error);
  process.exit(1);
}