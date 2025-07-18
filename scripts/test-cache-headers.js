#!/usr/bin/env node

/**
 * Test script to verify Cache-Control headers for ISR pages
 * Run with: node scripts/test-cache-headers.js
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const testPaths = [
  { path: '/blog/', expected: 'public, s-maxage=60, stale-while-revalidate=300' },
  { path: '/blog/some-post-slug/', expected: 'public, s-maxage=3600, stale-while-revalidate=86400' },
  { path: '/docs/', expected: 'public, s-maxage=600, stale-while-revalidate=3600' },
  { path: '/docs/getting-started/', expected: 'public, s-maxage=600, stale-while-revalidate=3600' },
];

async function testCacheHeaders() {
  console.log('Testing Cache-Control headers for ISR pages...\n');
  
  const client = BASE_URL.startsWith('https') ? https : http;
  
  for (const test of testPaths) {
    try {
      const url = new URL(test.path, BASE_URL);
      
      const response = await new Promise((resolve, reject) => {
        const req = client.get(url, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve(res));
        });
        
        req.on('error', reject);
        req.setTimeout(5000, () => {
          req.destroy();
          reject(new Error('Request timeout'));
        });
      });
      
      const cacheControl = response.headers['cache-control'];
      const status = response.statusCode;
      
      console.log(`Path: ${test.path}`);
      console.log(`Status: ${status}`);
      console.log(`Cache-Control: ${cacheControl || 'NOT SET'}`);
      
      if (cacheControl === test.expected) {
        console.log('✅ PASS - Expected Cache-Control header found');
      } else if (cacheControl) {
        console.log('⚠️  WARNING - Cache-Control header present but different from expected');
        console.log(`   Expected: ${test.expected}`);
        console.log(`   Found:    ${cacheControl}`);
      } else {
        console.log('❌ FAIL - No Cache-Control header found');
      }
      
      console.log('');
      
    } catch (error) {
      console.log(`Path: ${test.path}`);
      console.log(`❌ ERROR: ${error.message}\n`);
    }
  }
  
  console.log('Cache header testing completed.');
}

if (require.main === module) {
  testCacheHeaders().catch(console.error);
}

module.exports = { testCacheHeaders };