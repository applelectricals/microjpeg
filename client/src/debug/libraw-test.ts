// Simple LibRaw test to debug the RAW processing issue
import LibRaw from 'libraw-wasm';

export async function testLibRawBasic() {
  try {
    console.log('🧪 Testing LibRaw basic functionality...');
    
    // Create a simple test
    const processor = new LibRaw();
    console.log('✅ LibRaw processor created successfully');
    
    // Test with a small buffer (this will fail but show us the error)
    const testBuffer = new Uint8Array([0x00, 0x01, 0x02, 0x03]);
    
    try {
      await processor.open(testBuffer, {});
      console.log('✅ Open call completed (unexpected success)');
    } catch (error) {
      console.log('📝 Expected open error (test buffer is not RAW):', error);
    }
    
    return true;
  } catch (error) {
    console.error('❌ LibRaw basic test failed:', error);
    return false;
  }
}

// Test function that can be called from console
if (typeof window !== 'undefined') {
  (window as any).testLibRaw = testLibRawBasic;
}