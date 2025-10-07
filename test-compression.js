import CompressionEngine from './server/compressionEngine.ts';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function testCompression() {
  console.log('🧪 Starting compression engine test...');
  
  try {
    // Create a test image using Sharp
    const testImagePath = './test-image.jpg';
    const outputPath = './test-output.jpg';
    
    // Create a simple test image
    await sharp({
      create: {
        width: 200,
        height: 200,
        channels: 3,
        background: { r: 255, g: 0, b: 0 }
      }
    })
    .jpeg()
    .toFile(testImagePath);
    
    console.log('✅ Test image created:', testImagePath);
    
    // Test compression
    const result = await CompressionEngine.compressWithAdvancedSettings(
      testImagePath,
      outputPath,
      75,
      'jpeg',
      {
        compressionAlgorithm: 'standard',
        webOptimized: true
      }
    );
    
    console.log('✅ Compression successful:', result);
    
    // Check file sizes
    const originalStats = fs.statSync(testImagePath);
    const compressedStats = fs.statSync(outputPath);
    
    console.log(`📊 Original size: ${originalStats.size} bytes`);
    console.log(`📊 Compressed size: ${compressedStats.size} bytes`);
    console.log(`📊 Compression ratio: ${((originalStats.size - compressedStats.size) / originalStats.size * 100).toFixed(2)}%`);
    
    // Cleanup
    fs.unlinkSync(testImagePath);
    fs.unlinkSync(outputPath);
    
    console.log('🎉 Compression test completed successfully!');
    
  } catch (error) {
    console.error('❌ Compression test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run test
testCompression();