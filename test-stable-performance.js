import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🚀 STABLE SHARP PERFORMANCE - Balanced for consistency  
sharp.cache({ 
  memory: 1024,  // Use 1GB cache memory for stable performance
  files: 100,    // Moderate file cache to prevent memory issues
  items: 500     // Moderate operation cache
});
sharp.concurrency(2);  // Use 2 cores to prevent resource contention
sharp.simd(true);      // Keep SIMD for speed

console.log('🚀 Stable Sharp Performance: 1GB cache, 2 CPU cores, SIMD enabled');

const testImagePath = path.join(__dirname, 'IMG_0535.jpg');

async function testStablePerformance() {
  console.log('📊 TESTING STABLE PERFORMANCE (Multiple Runs)');
  console.log('=' .repeat(50));
  
  try {
    const stats = await fs.stat(testImagePath);
    console.log(`📁 Input: IMG_0535.jpg (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    
    const times = [];
    const runs = 5; // Test 5 times to check consistency
    
    for (let i = 1; i <= runs; i++) {
      console.log(`\n🏃 Run ${i}/${runs}:`);
      
      const outputPath = path.join(__dirname, `stable-test-run-${i}.jpg`);
      
      const startTime = Date.now();
      
      // STABLE COMPRESSION: Conservative settings for consistent performance
      await sharp(testImagePath, {
        sequentialRead: true,    // Faster for large files
        limitInputPixels: false, // Remove pixel limit
        density: 72,            // Optimized density
        failOnError: false      // Don't fail on minor errors
      })
      .timeout({ seconds: 30 }) // Prevent hanging
      .rotate() // Only essential web optimization
      .jpeg({ 
        quality: 80,
        progressive: false,        // Disabled for speed
        mozjpeg: false,           // Disabled for speed
        optimiseCoding: false,    // Disabled for speed
        trellisQuantisation: false // Disabled for speed
      })
      .toFile(outputPath);
      
      const endTime = Date.now();
      const processingTime = (endTime - startTime) / 1000;
      times.push(processingTime);
      
      const outputStats = await fs.stat(outputPath);
      const compressionRatio = ((stats.size - outputStats.size) / stats.size * 100).toFixed(1);
      
      console.log(`   ⏱️  Time: ${processingTime.toFixed(2)} seconds`);
      console.log(`   📦 Output: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   📊 Compression: ${compressionRatio}%`);
      
      // Brief pause between runs
      if (i < runs) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Calculate statistics
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    const stdDev = Math.sqrt(times.reduce((sq, n) => sq + Math.pow(n - avgTime, 2), 0) / times.length);
    const variance = ((maxTime - minTime) / avgTime * 100);
    
    console.log('\n📈 PERFORMANCE ANALYSIS:');
    console.log('=' .repeat(30));
    console.log(`⏱️  Average Time: ${avgTime.toFixed(2)} seconds`);
    console.log(`🚀 Fastest Time: ${minTime.toFixed(2)} seconds`);
    console.log(`🐌 Slowest Time: ${maxTime.toFixed(2)} seconds`);
    console.log(`📊 Standard Deviation: ${stdDev.toFixed(2)} seconds`);
    console.log(`📈 Variance: ${variance.toFixed(1)}%`);
    
    // Performance consistency rating
    if (variance < 10) {
      console.log('✅ EXCELLENT: Very consistent performance (<10% variance)');
    } else if (variance < 25) {
      console.log('🟡 GOOD: Reasonably consistent performance (<25% variance)');
    } else if (variance < 50) {
      console.log('🟠 MODERATE: Some inconsistency (25-50% variance)');
    } else {
      console.log('❌ POOR: Highly erratic performance (>50% variance)');
    }
    
    console.log('\n🎯 RECOMMENDATIONS:');
    if (avgTime > 15) {
      console.log('⚠️  Average time > 15s - Consider further optimization');
    } else if (avgTime < 5) {
      console.log('🎉 Excellent average performance < 5s');
    } else {
      console.log('✅ Good average performance 5-15s range');
    }
    
    if (variance > 30) {
      console.log('⚠️  High variance - Check memory/CPU resource contention');
      console.log('💡 Consider: Lower cache, reduce concurrency, check system load');
    }
    
    // Clean up test files
    for (let i = 1; i <= runs; i++) {
      try {
        await fs.unlink(path.join(__dirname, `stable-test-run-${i}.jpg`));
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    
    return { avgTime, minTime, maxTime, variance };
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    throw error;
  }
}

// Run the stability test
testStablePerformance().catch(console.error);