const { createRequire } = require('module');
const require = createRequire(import.meta.url);

async function testDcrawLoading() {
  console.log('Testing dcraw loading with createRequire...');
  
  try {
    const dcraw = require('dcraw');
    console.log('✅ dcraw loaded successfully:', typeof dcraw);
    
    // Test that it's a function
    if (typeof dcraw === 'function') {
      console.log('✅ dcraw is a function and ready to use');
      return true;
    } else {
      console.log('❌ dcraw is not a function:', dcraw);
      return false;
    }
  } catch (error) {
    console.log('❌ Failed to load dcraw:', error.message);
    return false;
  }
}

testDcrawLoading();