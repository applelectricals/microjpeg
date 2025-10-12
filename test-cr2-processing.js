const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testCR2Processing() {
  console.log('🧪 Testing CR2 processing with the updated server...');
  
  // Check if we have a CR2 file to test with
  const testFiles = ['7.1MB.cr2', 'test.cr2', 'sample.cr2'];
  let testFile = null;
  
  for (const file of testFiles) {
    if (fs.existsSync(file)) {
      testFile = file;
      break;
    }
  }
  
  if (!testFile) {
    console.log('❌ No CR2 test file found. Looking for uploaded files...');
    
    // Check uploads directory
    if (fs.existsSync('uploads')) {
      const uploads = fs.readdirSync('uploads');
      const cr2Files = uploads.filter(f => f.toLowerCase().endsWith('.cr2'));
      if (cr2Files.length > 0) {
        testFile = path.join('uploads', cr2Files[0]);
        console.log(`✅ Found CR2 file in uploads: ${testFile}`);
      }
    }
    
    if (!testFile) {
      console.log('❌ No CR2 file found for testing');
      return;
    }
  }
  
  console.log(`📁 Using test file: ${testFile}`);
  
  try {
    // Create form data
    const form = new FormData();
    form.append('file', fs.createReadStream(testFile));
    form.append('quality', '80');
    form.append('outputFormat', JSON.stringify(['jpeg']));
    form.append('resizeOption', 'keep-original');
    form.append('resizePercentage', '100');
    form.append('compressionAlgorithm', 'standard');
    form.append('webOptimization', 'optimize-web');
    
    console.log('🚀 Sending CR2 processing request...');
    
    const response = await fetch('http://localhost:5000/api/compress', {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });
    
    const result = await response.json();
    
    console.log('📊 Server Response Status:', response.status);
    console.log('📊 Response Data:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.results && result.results.length > 0) {
      const job = result.results[0];
      if (job.error) {
        console.log('❌ Processing failed with error:', job.error);
      } else if (job.status === 'success') {
        console.log('✅ CR2 processing succeeded!');
        console.log(`📏 Original size: ${job.originalSize} bytes`);
        console.log(`📏 Compressed size: ${job.compressedSize} bytes`);
        console.log(`📏 Compression ratio: ${job.compressionRatio}%`);
      } else {
        console.log(`⏳ Processing status: ${job.status}`);
      }
    }
    
  } catch (error) {
    console.log('❌ Request failed:', error.message);
  }
}

testCR2Processing();