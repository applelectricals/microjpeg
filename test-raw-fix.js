const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testRawProcessing() {
  console.log('🧪 Testing RAW Processing Fixes...');
  
  try {
    // Test with a simple form-data payload (simulating RAW file upload)
    const form = new FormData();
    
    // Create a dummy file to simulate RAW upload
    const testFilePath = path.join(__dirname, 'test-raw-dummy.cr2');
    fs.writeFileSync(testFilePath, Buffer.from('dummy RAW content for testing'));
    
    form.append('files', fs.createReadStream(testFilePath), {
      filename: 'test.cr2',
      contentType: 'application/octet-stream'
    });
    form.append('outputFormat', 'jpeg');
    form.append('quality', '85');
    
    console.log('📤 Sending request to landing page compression endpoint...');
    
    const response = await axios.post('http://localhost:5000/api/compress', form, {
      headers: {
        ...form.getHeaders()
      },
      timeout: 10000
    });
    
    console.log('✅ Response Status:', response.status);
    console.log('📊 Response Data:', JSON.stringify(response.data, null, 2));
    
    // Check if the response contains the expected structure
    if (response.data && response.data.results) {
      const result = response.data.results[0];
      console.log('\n🔍 Analyzing first result:');
      console.log(`- Original Size: ${result.originalSize} (type: ${typeof result.originalSize})`);
      console.log(`- Compressed Size: ${result.compressedSize} (type: ${typeof result.compressedSize})`);
      console.log(`- Compression Ratio: ${result.compressionRatio} (type: ${typeof result.compressionRatio})`);
      console.log(`- Has NaN values: ${isNaN(result.originalSize) || isNaN(result.compressedSize) || isNaN(result.compressionRatio)}`);
      
      if (!isNaN(result.originalSize) && !isNaN(result.compressedSize) && !isNaN(result.compressionRatio)) {
        console.log('\n✅ SUCCESS: No NaN values detected! The fix is working.');
      } else {
        console.log('\n❌ FAILURE: NaN values still present in the response.');
      }
    }
    
    // Clean up test file
    fs.unlinkSync(testFilePath);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testRawProcessing();