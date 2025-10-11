import axios from 'axios';

const API_BASE = 'http://localhost:5000';

async function testServerResponse() {
  try {
    console.log('🔍 Testing server connectivity...');
    
    // Test basic server response
    const response = await axios.get(`${API_BASE}/api/test`, {
      timeout: 5000
    });
    
    console.log('✅ Server is responding:', response.data);
    console.log('🚀 Ready to test download optimizations!');
    
    return true;
  } catch (error) {
    console.error('❌ Server test failed:', error.message);
    return false;
  }
}

testServerResponse();