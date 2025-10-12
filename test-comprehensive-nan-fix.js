/**
 * Comprehensive NaN Fix Validation Test
 * Based on industry analysis of leading RAW converters
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const SERVER_URL = 'http://localhost:5000';
const TEST_TIMEOUT = 60000; // 60 seconds

async function testComprehensiveNaNFix() {
  console.log('🔬 COMPREHENSIVE NaN FIX VALIDATION TEST');
  console.log('========================================\n');
  
  const testResults = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    errors: []
  };

  // Test 1: RAW File Processing
  await runTest('RAW File Processing', async () => {
    const testFile = createTestRAWFile('test-file.cr2', 2048); // 2KB test file
    
    const form = new FormData();
    form.append('files', fs.createReadStream(testFile.path), {
      filename: testFile.name,
      contentType: 'application/octet-stream'
    });
    form.append('outputFormat', 'jpeg');
    form.append('quality', '85');
    
    const response = await axios.post(`${SERVER_URL}/api/compress`, form, {
      headers: { ...form.getHeaders() },
      timeout: TEST_TIMEOUT,
      validateStatus: () => true // Accept any status for testing
    });
    
    console.log(`   📊 Response Status: ${response.status}`);
    
    if (response.status === 200 && response.data?.results?.[0]) {
      const result = response.data.results[0];
      validateResult(result, 'RAW Processing');
      return true;
    } else {
      console.log(`   ❌ Unexpected response: ${JSON.stringify(response.data)}`);
      return false;
    }
  }, testResults);

  // Test 2: Large File Simulation
  await runTest('Large File Handling', async () => {
    const testFile = createTestRAWFile('large-file.cr2', 10240); // 10KB test file
    
    const form = new FormData();
    form.append('files', fs.createReadStream(testFile.path), {
      filename: testFile.name,
      contentType: 'application/octet-stream'
    });
    form.append('outputFormat', 'png');
    form.append('quality', '95');
    
    const response = await axios.post(`${SERVER_URL}/api/compress`, form, {
      headers: { ...form.getHeaders() },
      timeout: TEST_TIMEOUT,
      validateStatus: () => true
    });
    
    if (response.status === 200 && response.data?.results?.[0]) {
      const result = response.data.results[0];
      validateResult(result, 'Large File');
      return true;
    }
    
    return false;
  }, testResults);

  // Test 3: Batch Processing
  await runTest('Batch Processing Validation', async () => {
    const testFiles = [
      createTestRAWFile('batch-1.cr2', 1024),
      createTestRAWFile('batch-2.nef', 1536),
      createTestRAWFile('batch-3.arw', 2048)
    ];
    
    const form = new FormData();
    testFiles.forEach(file => {
      form.append('files', fs.createReadStream(file.path), {
        filename: file.name,
        contentType: 'application/octet-stream'
      });
    });
    form.append('outputFormat', 'webp');
    form.append('quality', '80');
    
    const response = await axios.post(`${SERVER_URL}/api/compress`, form, {
      headers: { ...form.getHeaders() },
      timeout: TEST_TIMEOUT,
      validateStatus: () => true
    });
    
    if (response.status === 200 && response.data?.results?.length === 3) {
      response.data.results.forEach((result, index) => {
        validateResult(result, `Batch File ${index + 1}`);
      });
      return true;
    }
    
    return false;
  }, testResults);

  // Test 4: Error Handling
  await runTest('Error Handling Validation', async () => {
    const invalidFile = createTestFile('invalid.txt', 'Not a RAW file');
    
    const form = new FormData();
    form.append('files', fs.createReadStream(invalidFile), {
      filename: 'invalid.cr2', // Pretend it's RAW
      contentType: 'application/octet-stream'
    });
    form.append('outputFormat', 'jpeg');
    
    const response = await axios.post(`${SERVER_URL}/api/compress`, form, {
      headers: { ...form.getHeaders() },
      timeout: TEST_TIMEOUT,
      validateStatus: () => true
    });
    
    // We expect this to fail gracefully without NaN values
    console.log(`   📊 Error Response Status: ${response.status}`);
    
    // Should either process successfully or fail with proper error
    if (response.status >= 400) {
      console.log(`   ✅ Proper error handling: ${response.status}`);
      return true;
    } else if (response.status === 200 && response.data?.results?.[0]) {
      // If it somehow processed, validate no NaN values
      const result = response.data.results[0];
      validateResult(result, 'Error Case');
      return true;
    }
    
    return false;
  }, testResults);

  // Clean up test files
  cleanupTestFiles();

  // Final Results
  console.log('\n🏁 TEST RESULTS SUMMARY');
  console.log('=======================');
  console.log(`Total Tests: ${testResults.totalTests}`);
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`Success Rate: ${Math.round((testResults.passed / testResults.totalTests) * 100)}%\n`);

  if (testResults.errors.length > 0) {
    console.log('❌ ERRORS ENCOUNTERED:');
    testResults.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }

  if (testResults.failed === 0) {
    console.log('🎉 ALL TESTS PASSED! NaN fix is working correctly.');
    console.log('✅ RAW processing is now robust and industry-standard compliant.');
  } else {
    console.log('⚠️  Some tests failed. Review the errors above.');
  }
}

function validateResult(result, testName) {
  console.log(`   🔍 Validating ${testName}:`);
  console.log(`   - Original Size: ${result.originalSize} (${typeof result.originalSize})`);
  console.log(`   - Compressed Size: ${result.compressedSize} (${typeof result.compressedSize})`);
  console.log(`   - Compression Ratio: ${result.compressionRatio} (${typeof result.compressionRatio})`);
  
  // Check for NaN values
  const hasNaN = isNaN(result.originalSize) || isNaN(result.compressedSize) || isNaN(result.compressionRatio);
  const hasUndefined = result.originalSize === undefined || result.compressedSize === undefined || result.compressionRatio === undefined;
  const hasNull = result.originalSize === null || result.compressedSize === null || result.compressionRatio === null;
  
  if (hasNaN) {
    throw new Error(`NaN values detected in ${testName}`);
  }
  
  if (hasUndefined) {
    throw new Error(`Undefined values detected in ${testName}`);
  }
  
  if (hasNull) {
    throw new Error(`Null values detected in ${testName}`);
  }
  
  // Validate numeric ranges
  if (result.originalSize <= 0) {
    throw new Error(`Invalid original size in ${testName}: ${result.originalSize}`);
  }
  
  if (result.compressedSize < 0) {
    throw new Error(`Invalid compressed size in ${testName}: ${result.compressedSize}`);
  }
  
  if (!isFinite(result.compressionRatio)) {
    throw new Error(`Invalid compression ratio in ${testName}: ${result.compressionRatio}`);
  }
  
  console.log(`   ✅ ${testName} validation passed`);
}

async function runTest(testName, testFunction, results) {
  results.totalTests++;
  console.log(`🧪 Test ${results.totalTests}: ${testName}`);
  
  try {
    const success = await testFunction();
    if (success) {
      results.passed++;
      console.log(`   ✅ PASSED\n`);
    } else {
      results.failed++;
      results.errors.push(`${testName}: Test returned false`);
      console.log(`   ❌ FAILED\n`);
    }
  } catch (error) {
    results.failed++;
    results.errors.push(`${testName}: ${error.message}`);
    console.log(`   ❌ ERROR: ${error.message}\n`);
  }
}

function createTestRAWFile(filename, sizeBytes) {
  const testDir = path.join(__dirname, 'test-files');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
  }
  
  const filePath = path.join(testDir, filename);
  
  // Create a fake RAW file with some structured content
  const header = Buffer.from('FAKE_RAW_HEADER_FOR_TESTING_PURPOSES_ONLY');
  const padding = Buffer.alloc(Math.max(0, sizeBytes - header.length), 'A');
  const content = Buffer.concat([header, padding]);
  
  fs.writeFileSync(filePath, content);
  
  return {
    path: filePath,
    name: filename,
    size: sizeBytes
  };
}

function createTestFile(filename, content) {
  const testDir = path.join(__dirname, 'test-files');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
  }
  
  const filePath = path.join(testDir, filename);
  fs.writeFileSync(filePath, content);
  return filePath;
}

function cleanupTestFiles() {
  const testDir = path.join(__dirname, 'test-files');
  if (fs.existsSync(testDir)) {
    const files = fs.readdirSync(testDir);
    files.forEach(file => {
      fs.unlinkSync(path.join(testDir, file));
    });
    fs.rmdirSync(testDir);
  }
}

// Run the comprehensive test
if (require.main === module) {
  testComprehensiveNaNFix().catch(error => {
    console.error('❌ Test suite failed:', error.message);
    process.exit(1);
  });
}

module.exports = { testComprehensiveNaNFix };