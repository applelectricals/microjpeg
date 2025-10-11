import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test with your actual 5MB image
const testImagePath = path.join(__dirname, 'IMG_0535.jpg');
const outputDir = path.join(__dirname, 'performance-test-output');

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function testOriginalPerformance() {
  console.log('\n🔧 Testing ORIGINAL Sharp Performance (No Optimizations)...');
  
  // Reset Sharp to default settings
  sharp.cache(false);
  sharp.concurrency(1);
  sharp.simd(false);
  
  const startTime = Date.now();
  
  try {
    // Check if file exists
    const stats = await fs.stat(testImagePath);
    console.log(`📁 Input file: IMG_0535.jpg (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    
    const outputPath = path.join(outputDir, 'original-compression.jpg');
    
    await sharp(testImagePath)
      .jpeg({ 
        quality: 80, 
        progressive: false,
        optimiseScans: false 
      })
      .toFile(outputPath);
    
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;
    
    const outputStats = await fs.stat(outputPath);
    const compressionRatio = ((stats.size - outputStats.size) / stats.size * 100).toFixed(1);
    
    console.log(`⏱️  ORIGINAL TIME: ${processingTime.toFixed(2)} seconds`);
    console.log(`📦 Output size: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Compression: ${compressionRatio}%`);
    
    return processingTime;
    
  } catch (error) {
    console.error('❌ Original test failed:', error.message);
    return null;
  }
}

async function testOptimizedPerformance() {
  console.log('\n🚀 Testing OPTIMIZED Sharp Performance...');
  
  // Apply Sharp optimizations
  sharp.cache({ memory: 2048, files: 200, items: 1000 });
  sharp.concurrency(4);
  sharp.simd(true);
  
  const startTime = Date.now();
  
  try {
    const stats = await fs.stat(testImagePath);
    const outputPath = path.join(outputDir, 'optimized-compression.jpg');
    
    await sharp(testImagePath)
      .jpeg({ 
        quality: 80, 
        progressive: false,
        optimiseScans: false,
        mozjpeg: true // Enable MozJPEG if available
      })
      .toFile(outputPath);
    
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;
    
    const outputStats = await fs.stat(outputPath);
    const compressionRatio = ((stats.size - outputStats.size) / stats.size * 100).toFixed(1);
    
    console.log(`⏱️  OPTIMIZED TIME: ${processingTime.toFixed(2)} seconds`);
    console.log(`📦 Output size: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Compression: ${compressionRatio}%`);
    
    return processingTime;
    
  } catch (error) {
    console.error('❌ Optimized test failed:', error.message);
    return null;
  }
}

async function testMemoryBufferPerformance() {
  console.log('\n💾 Testing MEMORY BUFFER Performance...');
  
  const startTime = Date.now();
  
  try {
    const stats = await fs.stat(testImagePath);
    const inputBuffer = await fs.readFile(testImagePath);
    
    const outputBuffer = await sharp(inputBuffer)
      .jpeg({ 
        quality: 80, 
        progressive: false,
        mozjpeg: true
      })
      .toBuffer();
    
    const outputPath = path.join(outputDir, 'buffer-compression.jpg');
    await fs.writeFile(outputPath, outputBuffer);
    
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;
    
    const compressionRatio = ((stats.size - outputBuffer.length) / stats.size * 100).toFixed(1);
    
    console.log(`⏱️  BUFFER TIME: ${processingTime.toFixed(2)} seconds`);
    console.log(`📦 Output size: ${(outputBuffer.length / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Compression: ${compressionRatio}%`);
    
    return processingTime;
    
  } catch (error) {
    console.error('❌ Buffer test failed:', error.message);
    return null;
  }
}

async function runPerformanceComparison() {
  console.log('🎯 SHARP PERFORMANCE TEST WITH IMG_0535.jpg');
  console.log('=' .repeat(60));
  
  await ensureDir(outputDir);
  
  // Test different approaches
  const originalTime = await testOriginalPerformance();
  const optimizedTime = await testOptimizedPerformance();
  const bufferTime = await testMemoryBufferPerformance();
  
  // Calculate improvements
  console.log('\n📈 PERFORMANCE COMPARISON:');
  console.log('=' .repeat(40));
  
  if (originalTime && optimizedTime) {
    const improvement = ((originalTime - optimizedTime) / originalTime * 100).toFixed(1);
    console.log(`🔧 Sharp Optimizations: ${improvement}% faster`);
  }
  
  if (originalTime && bufferTime) {
    const improvement = ((originalTime - bufferTime) / originalTime * 100).toFixed(1);
    console.log(`💾 Memory Buffers: ${improvement}% faster`);
  }
  
  // Show absolute times
  console.log('\n⏱️  ABSOLUTE TIMES:');
  if (originalTime) console.log(`   Original: ${originalTime.toFixed(2)}s`);
  if (optimizedTime) console.log(`   Optimized: ${optimizedTime.toFixed(2)}s`);
  if (bufferTime) console.log(`   Buffer: ${bufferTime.toFixed(2)}s`);
  
  // Memory usage info
  const memUsage = process.memoryUsage();
  console.log('\n💻 MEMORY USAGE:');
  console.log(`   RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   External: ${(memUsage.external / 1024 / 1024).toFixed(2)} MB`);
}

// Run the test
runPerformanceComparison().catch(console.error);