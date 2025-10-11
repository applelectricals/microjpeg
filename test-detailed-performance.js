import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testImagePath = path.join(__dirname, 'IMG_0535.jpg');
const outputDir = path.join(__dirname, 'batch-test-output');

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function testSingleFileOptimal() {
  console.log('\n🎯 Testing OPTIMAL Single File Settings...');
  
  // Optimal settings for single large file
  sharp.cache({ memory: 512, files: 10, items: 50 }); // Smaller cache for single files
  sharp.concurrency(1); // Single file doesn't benefit from concurrency
  sharp.simd(true); // Keep SIMD for speed
  
  const startTime = Date.now();
  
  try {
    const stats = await fs.stat(testImagePath);
    console.log(`📁 Input: IMG_0535.jpg (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    
    const outputPath = path.join(outputDir, 'optimal-single.jpg');
    
    // Use sequential read for large files
    const result = await sharp(testImagePath, { 
      sequentialRead: true,
      limitInputPixels: false 
    })
    .jpeg({ 
      quality: 80, 
      progressive: false,
      optimiseScans: false,
      optimiseCoding: false, // Disable slow optimizations
      mozjpeg: false // Try without mozjpeg first
    })
    .toFile(outputPath);
    
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;
    
    const outputStats = await fs.stat(outputPath);
    const compressionRatio = ((stats.size - outputStats.size) / stats.size * 100).toFixed(1);
    
    console.log(`⏱️  OPTIMAL TIME: ${processingTime.toFixed(2)} seconds`);
    console.log(`📦 Output: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Compression: ${compressionRatio}%`);
    console.log(`🔧 Sharp info:`, result);
    
    return processingTime;
    
  } catch (error) {
    console.error('❌ Optimal test failed:', error.message);
    return null;
  }
}

async function testBatchProcessing() {
  console.log('\n🚀 Testing BATCH Processing (where concurrency helps)...');
  
  // Settings optimal for batch processing
  sharp.cache({ memory: 2048, files: 200, items: 1000 });
  sharp.concurrency(4);
  sharp.simd(true);
  
  const startTime = Date.now();
  
  try {
    const stats = await fs.stat(testImagePath);
    
    // Simulate processing the same file multiple times (like batch upload)
    const promises = [];
    for (let i = 0; i < 4; i++) {
      const outputPath = path.join(outputDir, `batch-${i}.jpg`);
      
      const promise = sharp(testImagePath, { sequentialRead: true })
        .jpeg({ 
          quality: 80 - (i * 5), // Vary quality slightly
          progressive: false 
        })
        .toFile(outputPath);
        
      promises.push(promise);
    }
    
    await Promise.all(promises);
    
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;
    const avgTimePerFile = processingTime / 4;
    
    console.log(`⏱️  BATCH TIME: ${processingTime.toFixed(2)} seconds (4 files)`);
    console.log(`📊 Avg per file: ${avgTimePerFile.toFixed(2)} seconds`);
    
    return avgTimePerFile;
    
  } catch (error) {
    console.error('❌ Batch test failed:', error.message);
    return null;
  }
}

async function testStreamProcessing() {
  console.log('\n💧 Testing STREAM Processing...');
  
  sharp.cache({ memory: 1024 });
  sharp.concurrency(1);
  
  const startTime = Date.now();
  
  try {
    const stats = await fs.stat(testImagePath);
    const inputBuffer = await fs.readFile(testImagePath);
    
    // Process in memory without file I/O overhead
    const outputBuffer = await sharp(inputBuffer, {
      limitInputPixels: false
    })
    .jpeg({ 
      quality: 80,
      progressive: false,
      optimiseScans: false
    })
    .toBuffer();
    
    const outputPath = path.join(outputDir, 'stream-processed.jpg');
    await fs.writeFile(outputPath, outputBuffer);
    
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;
    
    const compressionRatio = ((stats.size - outputBuffer.length) / stats.size * 100).toFixed(1);
    
    console.log(`⏱️  STREAM TIME: ${processingTime.toFixed(2)} seconds`);
    console.log(`📦 Output: ${(outputBuffer.length / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Compression: ${compressionRatio}%`);
    
    return processingTime;
    
  } catch (error) {
    console.error('❌ Stream test failed:', error.message);
    return null;
  }
}

async function testYourCurrentMethod() {
  console.log('\n🔄 Testing YOUR CURRENT METHOD (from compressionEngine)...');
  
  // Reset to defaults first
  sharp.cache(false);
  sharp.concurrency(1);
  
  const startTime = Date.now();
  
  try {
    const stats = await fs.stat(testImagePath);
    const outputPath = path.join(outputDir, 'current-method.jpg');
    
    // Simulate your current compressionEngine approach
    let sharpInstance = sharp(testImagePath);
    const metadata = await sharpInstance.metadata();
    
    // Apply your current settings
    sharpInstance = sharpInstance
      .withMetadata({}) // Remove metadata (your webOptimized setting)
      .normalize()
      .rotate();
      
    sharpInstance = sharpInstance.jpeg({
      quality: 80,
      progressive: false,
      optimiseScans: false,
      arithmeticCoding: false
    });
    
    await sharpInstance.toFile(outputPath);
    
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;
    
    const outputStats = await fs.stat(outputPath);
    const compressionRatio = ((stats.size - outputStats.size) / stats.size * 100).toFixed(1);
    
    console.log(`⏱️  CURRENT TIME: ${processingTime.toFixed(2)} seconds`);
    console.log(`📦 Output: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Compression: ${compressionRatio}%`);
    console.log(`🔧 Metadata:`, { width: metadata.width, height: metadata.height });
    
    return processingTime;
    
  } catch (error) {
    console.error('❌ Current method test failed:', error.message);
    return null;
  }
}

async function runDetailedPerformanceTest() {
  console.log('🔬 DETAILED SHARP PERFORMANCE ANALYSIS');
  console.log('=' .repeat(50));
  
  await ensureDir(outputDir);
  
  const currentTime = await testYourCurrentMethod();
  const optimalTime = await testSingleFileOptimal();
  const streamTime = await testStreamProcessing();
  const batchTime = await testBatchProcessing();
  
  console.log('\n📊 RESULTS SUMMARY:');
  console.log('=' .repeat(30));
  
  if (currentTime) console.log(`🔄 Current Method: ${currentTime.toFixed(2)}s`);
  if (optimalTime) console.log(`🎯 Optimal Single: ${optimalTime.toFixed(2)}s`);
  if (streamTime) console.log(`💧 Stream Processing: ${streamTime.toFixed(2)}s`);
  if (batchTime) console.log(`🚀 Batch Average: ${batchTime.toFixed(2)}s`);
  
  // Calculate improvements
  if (currentTime && optimalTime) {
    const improvement = ((currentTime - optimalTime) / currentTime * 100).toFixed(1);
    console.log(`\n💡 Single File Improvement: ${improvement}%`);
  }
  
  if (currentTime && streamTime) {
    const improvement = ((currentTime - streamTime) / currentTime * 100).toFixed(1);
    console.log(`💡 Stream Improvement: ${improvement}%`);
  }
}

runDetailedPerformanceTest().catch(console.error);