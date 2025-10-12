const http = require('http');

function testServerConnection() {
  console.log('🧪 Testing server connection...');
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/test',
    method: 'GET',
    timeout: 5000
  };
  
  const req = http.request(options, (res) => {
    console.log(`✅ Server responding: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('📊 Response:', data);
      if (res.statusCode === 200) {
        console.log('🎉 Server is working! Now we can test CR2 processing.');
      }
    });
  });
  
  req.on('error', (err) => {
    console.log('❌ Connection failed:', err.message);
    console.log('💡 Server is not running. Start it with: npm run dev-win');
  });
  
  req.on('timeout', () => {
    console.log('⏰ Connection timeout - server might be starting up');
    req.destroy();
  });
  
  req.end();
}

testServerConnection();