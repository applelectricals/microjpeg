import axios from 'axios';
import fs from 'fs/promises';
import { performance } from 'perf_hooks';

const API_BASE = 'http://localhost:3000';

async function testDownloadSpeed() {
  console.log('🏎️ DOWNLOAD SPEED TEST');
  console.log('=' .repeat(40));
  
  try {
    // First, compress a test file to get a job ID
    console.log('📤 Uploading test file for download test...');
    
    const FormData = (await import('form-data')).default;
    const formData = new FormData();
    
    try {
      await fs.access('IMG_0535.jpg');
      formData.append('file', await fs.readFile('IMG_0535.jpg'), 'IMG_0535.jpg');
    } catch {
      console.log('❌ Test file IMG_0535.jpg not found. Please ensure a test image exists.');
      return;
    }
    
    const uploadResponse = await axios.post(`${API_BASE}/api/compress`, formData, {
      headers: formData.getHeaders(),
      timeout: 30000
    });
    
    const jobId = uploadResponse.data.id || uploadResponse.data.jobId;
    console.log(`✅ Upload complete. Job ID: ${jobId}`);
    
    // Wait for compression to complete
    console.log('⏳ Waiting for compression to complete...');
    let job;
    let attempts = 0;
    const maxAttempts = 30;
    
    while (attempts < maxAttempts) {
      const statusResponse = await axios.get(`${API_BASE}/api/status/${jobId}`);
      job = statusResponse.data;
      
      if (job.status === 'completed') {
        console.log(`✅ Compression completed in ${attempts} attempts`);
        break;
      } else if (job.status === 'failed') {
        console.log('❌ Compression failed');
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }
    
    if (attempts >= maxAttempts) {
      console.log('❌ Compression timeout');
      return;
    }
    
    // Test download speeds
    console.log('\n🚀 Testing download speeds...');
    
    // Test 1: Standard download endpoint
    const downloadStart1 = performance.now();
    const downloadResponse1 = await axios.get(`${API_BASE}/api/download/compressed/${jobId}`, {
      responseType: 'arraybuffer',
      timeout: 30000
    });
    const downloadEnd1 = performance.now();
    const downloadTime1 = (downloadEnd1 - downloadStart1) / 1000;
    const downloadSize1 = downloadResponse1.data.byteLength;
    
    console.log(`📁 Standard download: ${downloadTime1.toFixed(2)}s, ${(downloadSize1/1024/1024).toFixed(2)}MB`);
    console.log(`📊 Speed: ${(downloadSize1/downloadTime1/1024/1024).toFixed(1)} MB/s`);
    
    // Test 2: Alternative download endpoint
    try {
      const downloadStart2 = performance.now();
      const downloadResponse2 = await axios.get(`${API_BASE}/api/download/${jobId}`, {
        responseType: 'arraybuffer',
        timeout: 30000
      });
      const downloadEnd2 = performance.now();
      const downloadTime2 = (downloadEnd2 - downloadStart2) / 1000;
      const downloadSize2 = downloadResponse2.data.byteLength;
      
      console.log(`📁 Alternative download: ${downloadTime2.toFixed(2)}s, ${(downloadSize2/1024/1024).toFixed(2)}MB`);
      console.log(`📊 Speed: ${(downloadSize2/downloadTime2/1024/1024).toFixed(1)} MB/s`);
    } catch (error) {
      console.log('⚠️ Alternative download endpoint not available');
    }
    
    // Test 3: Range request (resumable download)
    try {
      const downloadStart3 = performance.now();
      const downloadResponse3 = await axios.get(`${API_BASE}/api/download/compressed/${jobId}`, {
        responseType: 'arraybuffer',
        headers: {
          'Range': 'bytes=0-1048575' // First 1MB
        },
        timeout: 30000
      });
      const downloadEnd3 = performance.now();
      const downloadTime3 = (downloadEnd3 - downloadStart3) / 1000;
      const downloadSize3 = downloadResponse3.data.byteLength;
      
      console.log(`📁 Range request (1MB): ${downloadTime3.toFixed(2)}s, ${(downloadSize3/1024/1024).toFixed(2)}MB`);
      console.log(`📊 Speed: ${(downloadSize3/downloadTime3/1024/1024).toFixed(1)} MB/s`);
      console.log(`📈 Range support: ${downloadResponse3.status === 206 ? '✅ Enabled' : '❌ Disabled'}`);
    } catch (error) {
      console.log('⚠️ Range requests not supported');
    }
    
    // Performance analysis
    console.log('\n📈 DOWNLOAD PERFORMANCE ANALYSIS:');
    console.log('=' .repeat(40));
    
    const speed1 = downloadSize1/downloadTime1/1024/1024;
    
    if (speed1 > 100) {
      console.log('🟢 EXCELLENT: Download speed > 100 MB/s');
    } else if (speed1 > 50) {
      console.log('🟡 GOOD: Download speed 50-100 MB/s');
      console.log('💡 Consider: CDN usage, network optimization');
    } else if (speed1 > 10) {
      console.log('🟠 MODERATE: Download speed 10-50 MB/s');
      console.log('💡 Check: Server performance, chunk sizes, caching');
    } else {
      console.log('🔴 SLOW: Download speed < 10 MB/s');
      console.log('💡 Issues: Server bottleneck, network problems, or disk I/O');
      console.log('🔧 Solutions:');
      console.log('   • Increase streaming chunk sizes');
      console.log('   • Enable CDN redirects');
      console.log('   • Check disk performance');
      console.log('   • Optimize network configuration');
    }
    
    // Network vs Server diagnosis
    if (downloadTime1 > 2 && downloadSize1 < 5 * 1024 * 1024) {
      console.log('\n🔍 DIAGNOSIS: Likely server-side bottleneck');
      console.log('   File size < 5MB but download > 2s suggests:');
      console.log('   • Slow disk I/O');
      console.log('   • Small streaming chunks');
      console.log('   • CPU bottleneck');
    } else if (downloadTime1 > 5) {
      console.log('\n🔍 DIAGNOSIS: Possible network bottleneck');
      console.log('   • Check internet connection speed');
      console.log('   • Consider CDN usage');
      console.log('   • Verify server location/latency');
    }
    
  } catch (error) {
    console.error('❌ Download speed test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Auto-run the test
testDownloadSpeed().catch(console.error);