const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testNaNFix() {
  console.log('🧪 Testing NaN Fix for RAW Processing...\n');
  
  try {
    // Test with a simulated RAW file upload
    const form = new FormData();
    
    // Create a test file that simulates a RAW file
    const testFilePath = path.join(__dirname, 'test-cr2-fix.cr2');
    const testContent = Buffer.from('TEST RAW FILE CONTENT FOR NaN FIX VALIDATION');
    fs.writeFileSync(testFilePath, testContent);
    
    form.append('files', fs.createReadStream(testFilePath), {
      filename: 'test-raw-file.cr2',
      contentType: 'application/octet-stream'
    });
    form.append('outputFormat', 'jpeg');
    form.append('quality', '85');
    form.append('resizeOption', 'keep-original');
    
    console.log('📤 Sending request to compression endpoint...');
    console.log('🎯 Target: http://localhost:5000/api/compress');
    console.log('📁 File: test-raw-file.cr2');
    console.log('📄 Output: JPEG\n');
    
    const response = await axios.post('http://localhost:5000/api/compress', form, {
      headers: {
        ...form.getHeaders()
      },
      timeout: 30000,
      validateStatus: function (status) {
        return status < 500; // Accept any status under 500 to see the response
      }
    });
    
    console.log(`✅ Response Status: ${response.status}\n`);
    
    if (response.status === 200 && response.data && response.data.results) {
      const result = response.data.results[0];
      
      console.log('🔍 Analyzing Result Structure:');
      console.log('================================');
      console.log(`📊 Original Size: ${result.originalSize} (type: ${typeof result.originalSize})`);
      console.log(`📊 Compressed Size: ${result.compressedSize} (type: ${typeof result.compressedSize})`);
      console.log(`📊 Compression Ratio: ${result.compressionRatio} (type: ${typeof result.compressionRatio})`);
      console.log(`📊 Download URL: ${result.downloadUrl}`);
      console.log(`📊 Output Format: ${result.outputFormat}`);
      console.log(`📊 Was Converted: ${result.wasConverted}\n`);
      
      // NaN Detection
      const hasNaN = isNaN(result.originalSize) || isNaN(result.compressedSize) || isNaN(result.compressionRatio);
      const hasUndefined = result.originalSize === undefined || result.compressedSize === undefined || result.compressionRatio === undefined;
      const hasNull = result.originalSize === null || result.compressedSize === null || result.compressionRatio === null;
      
      console.log('🔍 NaN/Undefined/Null Detection:');
      console.log('=================================');
      console.log(`❌ Has NaN values: ${hasNaN}`);
      console.log(`❌ Has undefined values: ${hasUndefined}`);
      console.log(`❌ Has null values: ${hasNull}\n`);
      
      if (!hasNaN && !hasUndefined && !hasNull) {
        console.log('🎉 SUCCESS! No NaN, undefined, or null values detected.');
        console.log('✅ The RAW processing fix is working correctly!');
        console.log('🎯 All numeric values are properly calculated and returned.');
      } else {
        console.log('❌ FAILURE! Issues still present:');
        if (hasNaN) console.log('  - NaN values detected');
        if (hasUndefined) console.log('  - Undefined values detected');  
        if (hasNull) console.log('  - Null values detected');
      }
      
    } else {
      console.log('❌ Unexpected response structure or status');
      console.log('📄 Response Data:', JSON.stringify(response.data, null, 2));
    }
    
    // Clean up test file
    fs.unlinkSync(testFilePath);
    console.log('\n🧹 Test file cleaned up');
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    
    if (error.response) {
      console.error(`📤 Response Status: ${error.response.status}`);
      console.error(`📄 Response Data:`, error.response.data);
    }
    
    if (error.code === 'ECONNREFUSED') {
      console.error('🔌 Server appears to be offline. Please ensure the server is running on port 5000.');
    }
  }
}

// Run the test
testNaNFix();