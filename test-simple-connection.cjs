const fetch = require('node-fetch');

async function quickCR2Test() {
  console.log('🧪 Testing CR2 API endpoint...');
  
  try {
    const response = await fetch('http://localhost:5000/api/test', {
      method: 'GET'
    });
    
    if (response.ok) {
      console.log('✅ Server is responding on localhost:5000');
      
      // Test a simple upload to see the server processing
      console.log('📤 Testing basic server health...');
      const healthResponse = await fetch('http://localhost:5000/health/r2');
      const healthData = await healthResponse.json();
      console.log('🏥 Health check:', healthData);
      
    } else {
      console.log('❌ Server not responding properly:', response.status);
    }
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('💡 Make sure the server is running with: npm run dev-win');
  }
}

quickCR2Test();