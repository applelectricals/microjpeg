import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🚀 MAXIMUM SHARP PERFORMANCE OPTIMIZATION
sharp.cache({ 
  memory: 3072,  // Use 3GB cache memory (increase from 2GB)
  files: 500,    // Cache more files
  items: 2000    // Cache more operations
});
sharp.concurrency(4);  // Utilize all 4 vCPUs
sharp.simd(true);      // Enable SIMD instructions

console.log('🚀 MAXIMUM Sharp Performance: 3GB cache, 4 CPU cores, SIMD enabled');

const testImagePath = path.join(__dirname, 'IMG_0535.jpg');

async function testMaximumOptimization() {
  console.log('🚀 Testing MAXIMUM Optimization Performance');
  console.log('=' .repeat(50));
  
  try {
    const stats = await fs.stat(testImagePath);
    console.log(`📁 Input: IMG_0535.jpg (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    
    const outputPath = path.join(__dirname, 'maximum-optimized-test.jpg');
    
    console.log('\n🔥 Testing ULTRA-FAST approach...');
    const startTime = Date.now();
    
    // ULTRA-OPTIMIZED: Minimal operations, maximum speed
    await sharp(testImagePath, {
      sequentialRead: true,
      limitInputPixels: false,
      density: 72  // Lower density for faster processing
    })
    .jpeg({ 
      quality: 80,
      progressive: false,
      mozjpeg: false,  // Disable mozjpeg for speed
      optimiseCoding: false,  // Disable optimization for speed
      trellisQuantisation: false  // Disable trellis for speed
    })
    .toFile(outputPath);
    
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;
    
    const outputStats = await fs.stat(outputPath);
    const compressionRatio = ((stats.size - outputStats.size) / stats.size * 100).toFixed(1);
    
    console.log(`⏱️  ULTRA-FAST TIME: ${processingTime.toFixed(2)} seconds`);
    console.log(`📦 Output size: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Compression: ${compressionRatio}%`);
    
    // Test with buffer processing for even more speed
    console.log('\n🚀 Testing BUFFER approach...');
    const bufferStartTime = Date.now();
    
    const inputBuffer = await fs.readFile(testImagePath);
    const outputBuffer = await sharp(inputBuffer, {
      sequentialRead: true,
      limitInputPixels: false
    })
    .jpeg({ 
      quality: 80,
      progressive: false,
      mozjpeg: false,
      optimiseCoding: false,
      trellisQuantisation: false
    })
    .toBuffer();
    
    const bufferEndTime = Date.now();
    const bufferProcessingTime = (bufferEndTime - bufferStartTime) / 1000;
    
    await fs.writeFile(path.join(__dirname, 'buffer-optimized-test.jpg'), outputBuffer);
    
    console.log(`⏱️  BUFFER TIME: ${bufferProcessingTime.toFixed(2)} seconds`);
    console.log(`📦 Buffer output size: ${(outputBuffer.length / 1024 / 1024).toFixed(2)} MB`);
    
    // Show the best result
    const bestTime = Math.min(processingTime, bufferProcessingTime);
    const bestMethod = bestTime === processingTime ? 'File-to-File' : 'Buffer Processing';
    
    console.log(`\n🏆 BEST RESULT: ${bestMethod} - ${bestTime.toFixed(2)} seconds`);
    
    // Calculate improvement from original
    const originalTime = 13.89;
    const improvement = ((originalTime - bestTime) / originalTime * 100).toFixed(1);
    const speedIncrease = (originalTime / bestTime).toFixed(1);
    
    console.log(`📈 IMPROVEMENT from original: ${improvement}% faster!`);
    console.log(`🚀 Speed increase: ${speedIncrease}x faster`);
    
    if (bestTime < 1) {
      console.log('🎉 SUCCESS: Under 1 second achieved!');
    } else if (bestTime < 2) {
      console.log('✅ EXCELLENT: Under 2 seconds - great improvement!');
    }
    
    return { 
      fileTime: processingTime, 
      bufferTime: bufferProcessingTime,
      bestTime,
      bestMethod 
    };
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

testMaximumOptimization();