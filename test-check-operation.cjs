const https = require('http');

const testData = {
  fileSize: 1000000, // 1MB
  fileName: 'test.jpg',
  pageIdentifier: 'main'
};

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/check-operation',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': JSON.stringify(testData).length
  }
};

console.log('Testing /api/check-operation endpoint...');
console.log('Request data:', testData);

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response body:');
    try {
      const jsonResponse = JSON.parse(data);
      console.log(JSON.stringify(jsonResponse, null, 2));
    } catch (e) {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

req.write(JSON.stringify(testData));
req.end();