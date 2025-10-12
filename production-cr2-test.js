// production-cr2-test.js - Test your live server
const https = require('https');
const http = require('http');
const FormData = require('form-data');
const fs = require('fs');

async function testProductionCR2() {
  console.log('🧪 Testing CR2 processing on production server...');
  
  // Test with a small sample CR2 or use a JPEG renamed to .cr2 for testing
  const testFilePath = process.argv[2] || 'test-sample.cr2';
  
  if (!fs.existsSync(testFilePath)) {
    console.log('❌ Test file not found. Usage: node production-cr2-test.js <path-to-cr2-file>');
    return;
  }
  
  const form = new FormData();
  form.append('file', fs.createReadStream(testFilePath));
  form.append('quality', '80');
  form.append('outputFormat', JSON.stringify(['jpeg']));
  form.append('resizeOption', 'keep-original');
  form.append('resizePercentage', '100');
  form.append('compressionAlgorithm', 'standard');
  form.append('webOptimization', 'optimize-web');
  
  const serverUrl = process.env.SERVER_URL || 'https://your-server.com';
  
  try {
    const fetch = (await import('node-fetch')).default;
    
    console.log(`📡 Making request to: ${serverUrl}/api/compress`);
    console.log(`📁 File: ${testFilePath} (${fs.statSync(testFilePath).size} bytes)`);
    
    const startTime = Date.now();
    const response = await fetch(`${serverUrl}/api/compress`, {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });
    
    const responseTime = Date.now() - startTime;
    console.log(`⏱️  Response time: ${responseTime}ms`);
    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    
    const result = await response.json();
    
    console.log('\n📋 DETAILED ANALYSIS:');
    console.log('===================');
    
    if (result.results && result.results.length > 0) {
      result.results.forEach((job, index) => {
        console.log(`\nJob ${index + 1}:`);
        console.log(`  Status: ${job.status}`);
        console.log(`  Original Size: ${job.originalSize} (${typeof job.originalSize})`);
        console.log(`  Compressed Size: ${job.compressedSize} (${typeof job.compressedSize})`);
        console.log(`  Compression Ratio: ${job.compressionRatio}%`);
        console.log(`  Has NaN values: ${isNaN(job.originalSize) || isNaN(job.compressedSize)}`);
        
        if (job.error) {
          console.log(`  ❌ Error: ${job.error}`);
        }
        
        if (job.status === 'success' && !isNaN(job.compressedSize)) {
          console.log(`  ✅ Processing successful!`);
        } else if (isNaN(job.compressedSize)) {
          console.log(`  ❌ NaN detected in compressed size`);
        }
      });
    } else {
      console.log('❌ No results returned');
    }
    
    console.log('\n📄 Raw Response:');
    console.log(JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.log('❌ Request failed:', error.message);
  }
}

testProductionCR2();