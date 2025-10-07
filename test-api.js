import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import FormData from 'form-data';
import fetch from 'node-fetch';

async function testCompressionAPI() {
  console.log('🧪 Starting comprehensive compression API test...');
  
  try {
    // Create a test image
    const testImagePath = './test-upload.jpg';
    console.log('📷 Creating test image...');
    
    await sharp({
      create: {
        width: 800,
        height: 600,
        channels: 3,
        background: { r: 100, g: 150, b: 200 }
      }
    })
    .jpeg({ quality: 90 })
    .toFile(testImagePath);
    
    const originalStats = fs.statSync(testImagePath);
    console.log(`✅ Test image created: ${originalStats.size} bytes`);

    // Test 1: Upload the image
    console.log('\n🔄 Testing image upload...');
    const formData = new FormData();
    formData.append('files', fs.createReadStream(testImagePath), {
      filename: 'test-image.jpg',
      contentType: 'image/jpeg'
    });

    const uploadResponse = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`);
    }

    const uploadResult = await uploadResponse.json();
    console.log('✅ Upload successful:', uploadResult);
    
    if (!uploadResult.results || uploadResult.results.length === 0) {
      throw new Error('No files in upload response');
    }

    const uploadedFile = uploadResult.results[0];
    const fileId = uploadedFile.id;

    // Test 2: Process/Compress the image
    console.log('\n🔄 Testing image compression...');
    const processResponse = await fetch('http://localhost:5000/api/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jobIds: [fileId],
        settings: {
          outputFormat: 'jpeg',
          customQuality: 75,
          compressionAlgorithm: 'standard',
          optimizeForWeb: true,
          progressiveJpeg: false
        }
      })
    });

    if (!processResponse.ok) {
      const errorText = await processResponse.text();
      throw new Error(`Compression failed: ${processResponse.status} ${processResponse.statusText} - ${errorText}`);
    }

    const processResult = await processResponse.json();
    console.log('✅ Compression API response:', processResult);

    // Test 3: Check job status (if applicable)
    if (processResult.jobs && processResult.jobs.length > 0) {
      const jobId = processResult.jobs[0].id;
      console.log(`\n🔄 Checking job status for: ${jobId}`);
      
      let attempts = 0;
      const maxAttempts = 30; // 30 seconds timeout
      
      while (attempts < maxAttempts) {
        const statusResponse = await fetch(`http://localhost:5000/api/job/${jobId}/status`);
        if (statusResponse.ok) {
          const statusResult = await statusResponse.json();
          console.log(`📊 Job status (attempt ${attempts + 1}):`, statusResult);
          
          if (statusResult.status === 'completed') {
            console.log('✅ Job completed successfully!');
            break;
          } else if (statusResult.status === 'failed') {
            console.error('❌ Job failed:', statusResult.error);
            break;
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        attempts++;
      }
      
      if (attempts >= maxAttempts) {
        console.warn('⚠️ Job status check timed out');
      }
    }

    // Test 4: Check job status after processing
    console.log('\n🔄 Checking job status...');
    const statusResponse = await fetch(`http://localhost:5000/api/job/${fileId}/status`);
    
    if (statusResponse.ok) {
      const statusResult = await statusResponse.json();
      console.log('✅ Job status response:', statusResult);
    } else {
      const errorText = await statusResponse.text();
      console.log('❌ Status check failed:', statusResponse.status, errorText);
    }

    // Cleanup
    fs.unlinkSync(testImagePath);
    console.log('\n🎉 Compression API test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
    
    // Try to get more details from server logs
    console.log('\n📋 Check server terminal for detailed error logs');
  }
}

testCompressionAPI();