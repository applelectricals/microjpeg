# Coolify Fresh Deployment Checklist

## Step 1: Clean Setup
- [ ] Delete both existing Coolify projects completely
- [ ] Create new project in Coolify
- [ ] Connect to GitHub repository: `applelectricals/microjpeg`
- [ ] Set branch to `main`

## Step 2: Required Environment Variables
Copy these from your local .env file:

### Database (CRITICAL)
```
DATABASE_URL=postgresql://...neon.tech/...
```

### Session Security (CRITICAL)
```
SESSION_SECRET=your-secret-key
```

### R2 Storage (CRITICAL)
```
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=microjpeg
```

### Payment Systems
```
STRIPE_SECRET_KEY=sk_test_51...
PAYPAL_CLIENT_ID=BAA6hsJNpH...
PAYPAL_CLIENT_SECRET=...
```

### Email Service
```
SENDGRID_API_KEY=SG.xHQHrLR...
```

### Optional (Redis, Razorpay disabled)
```
REDIS_URL=redis://...
```

## Step 3: Deployment Configuration
- [ ] Set Node.js version to 18 or 20
- [ ] Set build command: `npm run build`
- [ ] Set start command: `npm start`
- [ ] Set port to 5000

## Step 4: Health Checks
After deployment, verify:
- [ ] Container starts successfully (green status)
- [ ] Environment variables loaded (check startup logs)
- [ ] Database connection successful
- [ ] API endpoint responds: `/api/test`
- [ ] Usage stats work: `/api/usage-stats/free-no-auth`

## Step 5: Test Production Features
- [ ] Upload test image
- [ ] Compression works
- [ ] Download works
- [ ] Counters display correctly

## Troubleshooting Tools
If issues occur, use our diagnostic scripts:
- `test-production-api.js` - Test API endpoints
- Server startup logs show environment validation
- Database initialization runs automatically