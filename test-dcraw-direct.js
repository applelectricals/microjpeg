const dcraw = require('dcraw');

console.log('Testing dcraw package...');
console.log('dcraw:', typeof dcraw);
console.log('dcraw methods:', Object.keys(dcraw || {}));

// Test if we can call dcraw
if (dcraw) {
  console.log('✅ dcraw package is available');
  try {
    // Just test if we can access the dcraw function
    console.log('dcraw function type:', typeof dcraw);
    if (typeof dcraw === 'function') {
      console.log('✅ dcraw is a function and ready to use');
    } else {
      console.log('❌ dcraw is not a function:', dcraw);
    }
  } catch (err) {
    console.log('❌ Error testing dcraw function:', err.message);
  }
} else {
  console.log('❌ dcraw package is not available');
}