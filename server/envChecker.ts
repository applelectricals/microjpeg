// Environment Variables Checker for Production
// Add this temporarily to your server to debug env vars

export function checkEnvironmentVariables() {
  console.log('🔍 Environment Variables Check:');
  
  const requiredVars = [
    'DATABASE_URL',
    'SESSION_SECRET',
    'R2_ACCOUNT_ID',
    'R2_ACCESS_KEY_ID', 
    'R2_SECRET_ACCESS_KEY',
    'R2_BUCKET_NAME',
    'STRIPE_SECRET_KEY',
    'PAYPAL_CLIENT_ID',
    'SENDGRID_API_KEY'
  ];
  
  const optionalVars = [
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET'
  ];
  
  console.log('\n📋 Required Variables:');
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    const status = value ? '✅ SET' : '❌ MISSING';
    const preview = value ? `${value.substring(0, 10)}...` : 'undefined';
    console.log(`  ${varName}: ${status} (${preview})`);
  });
  
  console.log('\n📋 Optional Variables:');
  optionalVars.forEach(varName => {
    const value = process.env[varName];
    const status = value ? '✅ SET' : '⚠️  NOT SET';
    const preview = value ? `${value.substring(0, 10)}...` : 'undefined';
    console.log(`  ${varName}: ${status} (${preview})`);
  });
  
  console.log('\n🔧 Node Environment:', process.env.NODE_ENV || 'undefined');
  console.log('🔧 Port:', process.env.PORT || '5000');
}