import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testImagePath = path.join(__dirname, 'IMG_0535.jpg');

async function testFinalOptimization() {
  console.log('🎯 FINAL OPTIMIZATION TEST - Simulating your compression engine');
  console.log('=' .repeat(60));
  
  try {
    const stats = await fs.stat(testImagePath);
    console.log(`📁 Input: IMG_0535.jpg (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    
    console.log('\n🚀 Testing COMPLETE optimization pipeline...');
    const startTime = Date.now();
    
    // MAXIMUM PERFORMANCE SETTINGS (same as your compression engine now)
    sharp.cache({ 
      memory: 3072,  // 3GB cache
      files: 500,    
      items: 2000    
    });
    sharp.concurrency(4);  // 4 CPU cores
    sharp.simd(true);      // SIMD enabled
    
    // Load input buffer for fastest processing
    const inputBuffer = await fs.readFile(testImagePath);
    
    // Create optimized Sharp instance (matching your engine)
    const sharpInstance = sharp(inputBuffer, {
      sequentialRead: true,    // Faster for large files
      limitInputPixels: false, // Remove pixel limit
      density: 72             // Optimized density
    });
    
    // Apply your exact JPEG settings from the engine
    const outputBuffer = await sharpInstance
      .jpeg({ 
        quality: 80,
        progressive: false,        // Disabled for speed
        mozjpeg: false,           // Disabled for speed
        optimiseCoding: false,    // Disabled for speed
        trellisQuantisation: false // Disabled for speed
      })
      .toBuffer();
    
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;
    
    // Save result
    const outputPath = path.join(__dirname, 'final-optimized-test.jpg');
    await fs.writeFile(outputPath, outputBuffer);
    
    console.log(`⏱️  FINAL OPTIMIZED TIME: ${processingTime.toFixed(2)} seconds`);
    console.log(`📦 Output size: ${(outputBuffer.length / 1024 / 1024).toFixed(2)} MB`);
    
    const compressionRatio = ((stats.size - outputBuffer.length) / stats.size * 100).toFixed(1);
    console.log(`📊 Compression: ${compressionRatio}%`);
    
    // Compare with original performance
    const originalTime = 13.89;
    const improvement = ((originalTime - processingTime) / originalTime * 100).toFixed(1);
    const speedIncrease = (originalTime / processingTime).toFixed(1);
    
    console.log(`\n📈 IMPROVEMENT from original 13.89s: ${improvement}% faster!`);
    console.log(`🚀 Speed increase: ${speedIncrease}x faster`);
    
    if (processingTime < 1) {
      console.log('🎉 SUCCESS: Target achieved - Under 1 second!');
    } else if (processingTime < 2) {
      console.log('✅ EXCELLENT: Under 2 seconds - great improvement!');
    }
    
    // Performance category
    if (processingTime < 0.5) {
      console.log('🏆 PERFORMANCE LEVEL: ULTRA-FAST');
    } else if (processingTime < 1) {
      console.log('🚀 PERFORMANCE LEVEL: VERY FAST');
    } else if (processingTime < 2) {
      console.log('⚡ PERFORMANCE LEVEL: FAST');
    }
    
    console.log('\n🎯 OPTIMIZATION SUMMARY:');
    console.log('✅ 3GB Sharp cache enabled');
    console.log('✅ 4 CPU cores utilized'); 
    console.log('✅ SIMD instructions enabled');
    console.log('✅ Sequential read optimization');
    console.log('✅ Progressive JPEG disabled');
    console.log('✅ MozJPEG disabled for speed');
    console.log('✅ Optimization algorithms disabled');
    console.log('✅ Buffer processing for maximum speed');
    
    return processingTime;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

testFinalOptimization();