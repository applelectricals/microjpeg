import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testImagePath = path.join(__dirname, 'IMG_0535.jpg');

// Import your optimized compression engine
async function testOptimizedEngine() {
  console.log('🚀 Testing OPTIMIZED CompressionEngine Performance');
  console.log('=' .repeat(50));
  
  try {
    // Dynamic import of your compression engine
    const { default: CompressionEngine } = await import('./server/compressionEngine.js');
    
    const stats = await fs.stat(testImagePath);
    console.log(`📁 Input: IMG_0535.jpg (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    
    const outputPath = path.join(__dirname, 'optimized-engine-test.jpg');
    
    const startTime = Date.now();
    
    // Test your optimized compression engine method
    const result = await CompressionEngine.compressWithAdvancedSettings(
      testImagePath,
      outputPath,
      80, // quality
      'jpeg',
      {
        webOptimized: true,
        progressive: false,
        compressionAlgorithm: 'standard'
      },
      30000, // 30 second timeout
      'IMG_0535.jpg'
    );
    
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;
    
    const outputStats = await fs.stat(outputPath);
    const compressionRatio = ((stats.size - outputStats.size) / stats.size * 100).toFixed(1);
    
    console.log(`⏱️  OPTIMIZED ENGINE TIME: ${processingTime.toFixed(2)} seconds`);
    console.log(`📦 Output size: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Compression: ${compressionRatio}%`);
    console.log(`🔧 Engine result:`, result);
    
    // Compare with previous performance
    const previousTime = 8.52; // From our test
    const improvement = ((previousTime - processingTime) / previousTime * 100).toFixed(1);
    
    console.log(`\n📈 IMPROVEMENT: ${improvement}% faster than before!`);
    
    if (processingTime < 1) {
      console.log('🎉 SUCCESS: Under 1 second processing time achieved!');
    } else if (processingTime < 2) {
      console.log('✅ GOOD: Under 2 seconds - significant improvement!');
    } else {
      console.log('⚠️  Still room for improvement...');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

testOptimizedEngine();