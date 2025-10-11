import fs from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function analyzeDownloadPerformance() {
  console.log('🔍 DOWNLOAD PERFORMANCE ANALYSIS');
  console.log('=' .repeat(50));
  
  const testFile = path.join(__dirname, 'IMG_0535.jpg');
  
  try {
    const stats = await fs.stat(testFile);
    console.log(`📁 Test file: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    
    // Test 1: Direct file serving (Express res.download)
    console.log('\n1️⃣ Testing Express res.download() method:');
    const downloadStartTime = Date.now();
    
    // Simulate the current download approach
    const downloadBuffer = await fs.readFile(testFile);
    const downloadEndTime = Date.now();
    const downloadTime = (downloadEndTime - downloadStartTime) / 1000;
    
    console.log(`   ⏱️  File read time: ${downloadTime.toFixed(2)} seconds`);
    console.log(`   📊 Read speed: ${(stats.size / downloadTime / 1024 / 1024).toFixed(1)} MB/s`);
    
    // Test 2: Stream-based serving (createReadStream)
    console.log('\n2️⃣ Testing Stream-based serving:');
    const streamStartTime = Date.now();
    
    const streamChunks = [];
    const stream = createReadStream(testFile, { highWaterMark: 64 * 1024 }); // 64KB chunks
    
    await new Promise((resolve, reject) => {
      stream.on('data', (chunk) => {
        streamChunks.push(chunk);
      });
      stream.on('end', resolve);
      stream.on('error', reject);
    });
    
    const streamEndTime = Date.now();
    const streamTime = (streamEndTime - streamStartTime) / 1000;
    
    console.log(`   ⏱️  Stream time: ${streamTime.toFixed(2)} seconds`);
    console.log(`   📊 Stream speed: ${(stats.size / streamTime / 1024 / 1024).toFixed(1)} MB/s`);
    
    // Test 3: Optimized stream with larger chunks
    console.log('\n3️⃣ Testing Optimized streaming (256KB chunks):');
    const optimizedStartTime = Date.now();
    
    const optimizedChunks = [];
    const optimizedStream = createReadStream(testFile, { highWaterMark: 256 * 1024 }); // 256KB chunks
    
    await new Promise((resolve, reject) => {
      optimizedStream.on('data', (chunk) => {
        optimizedChunks.push(chunk);
      });
      optimizedStream.on('end', resolve);
      optimizedStream.on('error', reject);
    });
    
    const optimizedEndTime = Date.now();
    const optimizedTime = (optimizedEndTime - optimizedStartTime) / 1000;
    
    console.log(`   ⏱️  Optimized time: ${optimizedTime.toFixed(2)} seconds`);
    console.log(`   📊 Optimized speed: ${(stats.size / optimizedTime / 1024 / 1024).toFixed(1)} MB/s`);
    
    // Performance comparison
    console.log('\n📈 PERFORMANCE COMPARISON:');
    console.log('=' .repeat(30));
    
    const methods = [
      { name: 'Express Download', time: downloadTime, speed: stats.size / downloadTime / 1024 / 1024 },
      { name: 'Standard Stream', time: streamTime, speed: stats.size / streamTime / 1024 / 1024 },
      { name: 'Optimized Stream', time: optimizedTime, speed: stats.size / optimizedTime / 1024 / 1024 }
    ];
    
    methods.sort((a, b) => a.time - b.time);
    
    methods.forEach((method, index) => {
      const icon = index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉';
      console.log(`${icon} ${method.name}: ${method.time.toFixed(2)}s (${method.speed.toFixed(1)} MB/s)`);
    });
    
    // Identify bottlenecks
    console.log('\n🔍 POTENTIAL BOTTLENECKS:');
    console.log('=' .repeat(30));
    
    if (downloadTime > 2) {
      console.log('⚠️  File reading is slow (>2s for 5MB)');
      console.log('💡 Consider: SSD storage, reduce disk I/O');
    }
    
    if (streamTime > downloadTime * 1.5) {
      console.log('⚠️  Streaming overhead detected');
      console.log('💡 Consider: Larger chunk sizes, direct file serving');
    }
    
    const slowestSpeed = Math.min(...methods.map(m => m.speed));
    if (slowestSpeed < 10) {
      console.log('⚠️  Very slow download speeds detected (<10 MB/s)');
      console.log('💡 Consider: Storage optimization, network configuration');
    } else if (slowestSpeed < 50) {
      console.log('🟡 Moderate download speeds (10-50 MB/s)');
      console.log('💡 Consider: Optimizing chunk sizes, caching headers');
    } else {
      console.log('✅ Good download speeds (>50 MB/s)');
    }
    
    // Network vs Server analysis
    console.log('\n🌐 NETWORK vs SERVER ANALYSIS:');
    console.log('=' .repeat(35));
    
    console.log('🔧 SERVER-SIDE optimizations:');
    console.log('   • Use streaming with optimal chunk sizes (256KB-1MB)');
    console.log('   • Set proper caching headers (Cache-Control, ETag)');
    console.log('   • Enable compression for text responses');
    console.log('   • Optimize file system (SSD, proper mounting)');
    
    console.log('\n🌍 NETWORK-SIDE considerations:');
    console.log('   • CDN usage (redirect to CDN URLs when available)');
    console.log('   • Gzip/Brotli compression for compatible files');
    console.log('   • Connection keep-alive headers');
    console.log('   • Range request support for resumable downloads');
    
    return {
      fileSize: stats.size,
      downloadTime,
      streamTime,
      optimizedTime,
      recommendedMethod: methods[0].name
    };
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    throw error;
  }
}

analyzeDownloadPerformance().catch(console.error);