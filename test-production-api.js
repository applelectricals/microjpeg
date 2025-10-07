import fetch from 'node-fetch';

async function testProductionAPI() {
  console.log('🔍 Testing Production API...\n');
  
  try {
    // Test basic health
    console.log('1. Testing basic health check...');
    const healthResponse = await fetch('https://your-domain.com/api/test', {
      method: 'GET',
      timeout: 10000
    });
    
    console.log(`Health Status: ${healthResponse.status}`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.text();
      console.log('Health Response:', healthData);
    } else {
      console.log('❌ Health check failed');
    }
    
    // Test usage stats
    console.log('\n2. Testing usage stats...');
    const usageResponse = await fetch('https://your-domain.com/api/universal-usage-stats', {
      method: 'GET',
      headers: {
        'X-Page-Identifier': 'free-no-auth'
      },
      timeout: 10000
    });
    
    console.log(`Usage Stats Status: ${usageResponse.status}`);
    if (usageResponse.ok) {
      const usageData = await usageResponse.json();
      console.log('Usage Stats:', JSON.stringify(usageData, null, 2));
    } else {
      const errorText = await usageResponse.text();
      console.log('❌ Usage stats failed:', errorText);
    }
    
    // Test database connection
    console.log('\n3. Testing database status...');
    // Add your actual domain here
    
  } catch (error) {
    console.error('❌ Production API test failed:', error);
  }
}

testProductionAPI();