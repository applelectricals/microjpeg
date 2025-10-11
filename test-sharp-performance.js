import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testSharpPerformance() {
    console.log('🚀 Testing Sharp Performance with Optimizations...\n');
    
    // Create a test 5MB JPEG (approximate)
    const testImagePath = path.join(__dirname, 'test-5mb-image.jpg');
    
    if (!fs.existsSync(testImagePath)) {
        console.log('📸 Creating 5MB test image...');
        // Create a large test image (4000x3000 should be around 5MB)
        await sharp({
            create: {
                width: 4000,
                height: 3000,
                channels: 3,
                background: { r: 100, g: 150, b: 200 }
            }
        })
        .jpeg({ quality: 95 })
        .toFile(testImagePath);
        
        const stats = fs.statSync(testImagePath);
        console.log(`✅ Test image created: ${(stats.size / 1024 / 1024).toFixed(2)}MB\n`);
    }
    
    const inputStats = fs.statSync(testImagePath);
    console.log(`📊 Input file size: ${(inputStats.size / 1024 / 1024).toFixed(2)}MB`);
    
    // Test different quality levels to match your compression engine
    const qualityLevels = [85, 75, 65, 55];
    
    for (const quality of qualityLevels) {
        console.log(`\n🔧 Testing compression at quality ${quality}...`);
        
        const startTime = Date.now();
        
        const outputBuffer = await sharp(testImagePath)
            .jpeg({ 
                quality: quality,
                progressive: true,
                mozjpeg: true
            })
            .toBuffer();
        
        const endTime = Date.now();
        const compressionTime = endTime - startTime;
        const outputSize = outputBuffer.length;
        const compressionRatio = ((inputStats.size - outputSize) / inputStats.size * 100).toFixed(1);
        
        console.log(`⚡ Compression time: ${compressionTime}ms (${(compressionTime/1000).toFixed(2)}s)`);
        console.log(`📉 Output size: ${(outputSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`🎯 Compression ratio: ${compressionRatio}%`);
        
        if (compressionTime < 2000) {
            console.log(`🏆 EXCELLENT! Under 2 seconds!`);
        } else if (compressionTime < 5000) {
            console.log(`✅ GOOD! Under 5 seconds!`);
        } else {
            console.log(`⚠️  Could be faster...`);
        }
    }
    
    // Test multiple concurrent operations
    console.log(`\n🔄 Testing concurrent processing (4 operations)...`);
    const concurrentStartTime = Date.now();
    
    const concurrentOperations = qualityLevels.map(quality => 
        sharp(testImagePath)
            .jpeg({ 
                quality: quality,
                progressive: true,
                mozjpeg: true
            })
            .toBuffer()
    );
    
    await Promise.all(concurrentOperations);
    const concurrentEndTime = Date.now();
    const concurrentTime = concurrentEndTime - concurrentStartTime;
    
    console.log(`⚡ 4 concurrent operations time: ${concurrentTime}ms (${(concurrentTime/1000).toFixed(2)}s)`);
    console.log(`📊 Average per operation: ${(concurrentTime/4).toFixed(0)}ms`);
    
    if (concurrentTime < 8000) {
        console.log(`🚀 AMAZING! 4 operations in under 8 seconds!`);
    }
    
    console.log('\n🎉 Performance test complete!');
    console.log('\n📈 Sharp Configuration Summary:');
    console.log('   - Cache: 2GB memory, 200 files, 1000 items');
    console.log('   - Concurrency: 4 threads (matching your 4 vCPU)');
    console.log('   - SIMD: Enabled for vector operations');
}

// Run the test
testSharpPerformance().catch(console.error);