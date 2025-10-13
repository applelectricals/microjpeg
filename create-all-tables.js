// Create all missing database tables
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function createAllTables() {
  console.log('Creating all missing database tables...');
  
  try {
    // Check what tables exist
    const existingTables = await sql(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('Existing tables:', existingTables.map(t => t.table_name));
    
    // Create users table
    await sql(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" VARCHAR(255) PRIMARY KEY,
        "email" VARCHAR(255) UNIQUE,
        "subscription_tier" VARCHAR(50) DEFAULT 'free',
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create sessions table
    await sql(`
      CREATE TABLE IF NOT EXISTS "sessions" (
        "id" VARCHAR(255) PRIMARY KEY,
        "user_id" VARCHAR(255),
        "data" TEXT,
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create api_keys table
    await sql(`
      CREATE TABLE IF NOT EXISTS "api_keys" (
        "id" SERIAL PRIMARY KEY,
        "key" VARCHAR(255) UNIQUE,
        "user_id" VARCHAR(255),
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create uploads table
    await sql(`
      CREATE TABLE IF NOT EXISTS "uploads" (
        "id" VARCHAR(255) PRIMARY KEY,
        "filename" VARCHAR(255),
        "size" INTEGER,
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create lead_magnet_signups table
    await sql(`
      CREATE TABLE IF NOT EXISTS "lead_magnet_signups" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(255),
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create conversions table
    await sql(`
      CREATE TABLE IF NOT EXISTS "conversions" (
        "id" SERIAL PRIMARY KEY,
        "job_id" VARCHAR(255),
        "input_format" VARCHAR(50),
        "output_format" VARCHAR(50),
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create file_processing table
    await sql(`
      CREATE TABLE IF NOT EXISTS "file_processing" (
        "id" SERIAL PRIMARY KEY,
        "job_id" VARCHAR(255),
        "status" VARCHAR(50),
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create page_usage table
    await sql(`
      CREATE TABLE IF NOT EXISTS "page_usage" (
        "id" SERIAL PRIMARY KEY,
        "page" VARCHAR(255),
        "visits" INTEGER DEFAULT 0,
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create reward_transactions table
    await sql(`
      CREATE TABLE IF NOT EXISTS "reward_transactions" (
        "id" SERIAL PRIMARY KEY,
        "user_id" VARCHAR(255),
        "amount" INTEGER,
        "type" VARCHAR(50),
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create social_shares table
    await sql(`
      CREATE TABLE IF NOT EXISTS "social_shares" (
        "id" SERIAL PRIMARY KEY,
        "platform" VARCHAR(50),
        "url" TEXT,
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create user_referrals table
    await sql(`
      CREATE TABLE IF NOT EXISTS "user_referrals" (
        "id" SERIAL PRIMARY KEY,
        "referrer_id" VARCHAR(255),
        "referred_id" VARCHAR(255),
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create user_rewards table
    await sql(`
      CREATE TABLE IF NOT EXISTS "user_rewards" (
        "id" SERIAL PRIMARY KEY,
        "user_id" VARCHAR(255),
        "reward_type" VARCHAR(50),
        "amount" INTEGER,
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create admin_AuditLogs table
    await sql(`
      CREATE TABLE IF NOT EXISTS "admin_AuditLogs" (
        "id" SERIAL PRIMARY KEY,
        "action" VARCHAR(255),
        "user_id" VARCHAR(255),
        "details" TEXT,
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create app_Settings table
    await sql(`
      CREATE TABLE IF NOT EXISTS "app_Settings" (
        "id" SERIAL PRIMARY KEY,
        "key" VARCHAR(255) UNIQUE,
        "value" TEXT,
        "updated_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create operation_Log table
    await sql(`
      CREATE TABLE IF NOT EXISTS "operation_Log" (
        "id" SERIAL PRIMARY KEY,
        "operation" VARCHAR(255),
        "user_id" VARCHAR(255),
        "session_id" VARCHAR(255),
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create payment_Transactions table
    await sql(`
      CREATE TABLE IF NOT EXISTS "payment_Transactions" (
        "id" SERIAL PRIMARY KEY,
        "user_id" VARCHAR(255),
        "amount" DECIMAL(10,2),
        "status" VARCHAR(50),
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create api_Usage table
    await sql(`
      CREATE TABLE IF NOT EXISTS "api_Usage" (
        "id" SERIAL PRIMARY KEY,
        "api_key" VARCHAR(255),
        "endpoint" VARCHAR(255),
        "requests" INTEGER DEFAULT 0,
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create api_CompressRequestSchema table
    await sql(`
      CREATE TABLE IF NOT EXISTS "api_CompressRequestSchema" (
        "id" SERIAL PRIMARY KEY,
        "request_data" JSONB,
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create create_ApiKeySchema table
    await sql(`
      CREATE TABLE IF NOT EXISTS "create_ApiKeySchema" (
        "id" SERIAL PRIMARY KEY,
        "key_data" JSONB,
        "created_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    console.log('✅ All database tables created successfully');
    
    // Check what tables exist now
    const newTables = await sql(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('Final tables:', newTables.map(t => t.table_name));
    
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
}

createAllTables();