import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🚀 SHARP PERFORMANCE OPTIMIZATION - Utilize 4 vCPU + 16GB RAM server
sharp.cache({ 
  memory: 2048,  // Use 2GB cache memory 
  files: 200,    // Cache up to 200 files
  items: 1000    // Cache up to 1000 operations
});
sharp.concurrency(4);  // Utilize all 4 vCPUs for parallel processing
sharp.simd(true);      // Enable SIMD instructions for faster processing

console.log('🚀 Sharp Performance Optimized: 2GB cache, 4 CPU cores, SIMD enabled');

const testImagePath = path.join(__dirname, 'IMG_0535.jpg');

async function testOptimizedWebOptimized() {
  console.log('🚀 Testing OPTIMIZED Web-Optimized JPEG Performance');
  console.log('=' .repeat(50));
  
  try {
    const stats = await fs.stat(testImagePath);
    console.log(`📁 Input: IMG_0535.jpg (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    
    const outputPath = path.join(__dirname, 'optimized-web-test.jpg');
    
    const startTime = Date.now();
    
    // OPTIMIZED: Remove slow operations, use streaming approach
    const optimizedSharp = sharp(testImagePath, {
      sequentialRead: true,  // Better for large files
      limitInputPixels: false  // No artificial limits
    });
    
    await optimizedSharp
      .jpeg({ 
        quality: 80,
        progressive: false,  // Progressive was causing slowdown
        mozjpeg: true       // Enable mozjpeg for better compression
      })
      .toFile(outputPath);
    
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;
    
    const outputStats = await fs.stat(outputPath);
    const compressionRatio = ((stats.size - outputStats.size) / stats.size * 100).toFixed(1);
    
    console.log(`⏱️  OPTIMIZED TIME: ${processingTime.toFixed(2)} seconds`);
    console.log(`📦 Output size: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Compression: ${compressionRatio}%`);
    
    // Compare with target
    if (processingTime < 1) {
      console.log('🎉 SUCCESS: Under 1 second processing time achieved!');
    } else if (processingTime < 2) {
      console.log('✅ GOOD: Under 2 seconds - significant improvement!');
    } else {
      console.log('⚠️  Still room for improvement...');
    }
    
    // Calculate improvement from the original 13.89 seconds
    const originalTime = 13.89;
    const improvement = ((originalTime - processingTime) / originalTime * 100).toFixed(1);
    
    console.log(`\n📈 IMPROVEMENT from original: ${improvement}% faster!`);
    console.log(`🚀 Speed increase: ${(originalTime / processingTime).toFixed(1)}x faster`);
    
    return { processingTime, outputSize: outputStats.size, compressionRatio };
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

// Test the optimized version
testOptimizedWebOptimized();