// Performance monitoring script for production
import fetch from 'node-fetch';

async function testPerformanceBottlenecks() {
  console.log('🚀 Testing MicroJPEG Performance Bottlenecks...\n');
  
  const baseUrl = 'https://microjpeg.com'; // Update with your actual domain
  
  // Test 1: API Response Times
  console.log('1. Testing API endpoint response times...');
  
  const endpoints = [
    '/api/test',
    '/api/usage-stats/free-no-auth',
    '/api/auth/user',
    '/api/universal-usage-stats'
  ];
  
  for (const endpoint of endpoints) {
    const start = Date.now();
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      const duration = Date.now() - start;
      const status = response.status;
      const data = await response.text();
      
      console.log(`  ${endpoint}: ${duration}ms (${status})`);
      if (duration > 5000) {
        console.log(`    ⚠️  SLOW: ${duration}ms is too slow for user experience`);
      }
      if (duration > 1000) {
        console.log(`    ⚠️  Response: ${data.substring(0, 200)}...`);
      }
    } catch (error) {
      const duration = Date.now() - start;
      console.log(`  ${endpoint}: FAILED after ${duration}ms - ${error.message}`);
    }
  }
  
  // Test 2: Static Asset Loading
  console.log('\n2. Testing static asset loading...');
  
  const assets = [
    '/index.html',
    '/favicon.png',
    '/manifest.json'
  ];
  
  for (const asset of assets) {
    const start = Date.now();
    try {
      const response = await fetch(`${baseUrl}${asset}`, {
        method: 'GET'
      });
      const duration = Date.now() - start;
      const size = parseInt(response.headers.get('content-length') || '0');
      
      console.log(`  ${asset}: ${duration}ms (${Math.round(size/1024)}KB)`);
      if (duration > 2000) {
        console.log(`    ⚠️  SLOW ASSET: ${duration}ms`);
      }
    } catch (error) {
      const duration = Date.now() - start;
      console.log(`  ${asset}: FAILED after ${duration}ms`);
    }
  }
  
  // Test 3: Database Performance Simulation
  console.log('\n3. Testing database operations...');
  
  const dbTests = [
    { name: 'Check Operation', endpoint: '/api/check-operation', method: 'POST', 
      body: JSON.stringify({ pageIdentifier: 'free-no-auth' }) },
    { name: 'Usage Stats', endpoint: '/api/usage-stats/free-no-auth', method: 'GET' }
  ];
  
  for (const test of dbTests) {
    const start = Date.now();
    try {
      const response = await fetch(`${baseUrl}${test.endpoint}`, {
        method: test.method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: test.body
      });
      const duration = Date.now() - start;
      const data = await response.text();
      
      console.log(`  ${test.name}: ${duration}ms (${response.status})`);
      if (duration > 3000) {
        console.log(`    ⚠️  DATABASE SLOW: ${duration}ms indicates DB performance issues`);
        console.log(`    Response: ${data.substring(0, 300)}`);
      }
    } catch (error) {
      const duration = Date.now() - start;
      console.log(`  ${test.name}: FAILED after ${duration}ms - ${error.message}`);
    }
  }
  
  console.log('\n📊 Performance Analysis Complete!');
  console.log('\nRecommendations:');
  console.log('- API responses should be < 1000ms');
  console.log('- Database operations should be < 2000ms'); 
  console.log('- Static assets should be < 500ms');
  console.log('- Any response > 5000ms needs immediate optimization');
}

testPerformanceBottlenecks().catch(console.error);