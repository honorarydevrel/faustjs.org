#!/usr/bin/env node

/**
 * Simple test to check Cache-Control headers for ISR pages
 * Run with: node test-cache-headers.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

const testPaths = [
  '/blog/',
  '/docs/',
  '/', // Home page
];

async function testCacheHeaders() {
  console.log('Testing Cache-Control headers...\n');
  
  for (const path of testPaths) {
    try {
      const url = new URL(path, BASE_URL);
      
      const response = await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
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
      
      console.log(`Path: ${path}`);
      console.log(`Status: ${status}`);
      console.log(`Cache-Control: ${cacheControl || 'NOT SET'}`);
      console.log(`Content-Type: ${response.headers['content-type'] || 'NOT SET'}`);
      console.log('---');
      
    } catch (error) {
      console.log(`Path: ${path}`);
      console.log(`❌ ERROR: ${error.message}\n`);
    }
  }
}

if (require.main === module) {
  testCacheHeaders().catch(console.error);
}