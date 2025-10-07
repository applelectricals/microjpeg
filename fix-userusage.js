// Fix missing userUsage table
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function createUserUsageTable() {
  console.log('Creating userUsage table...');
  
  try {
    await sql(`
      CREATE TABLE IF NOT EXISTS "userUsage" (
        "id" SERIAL PRIMARY KEY,
        "user_id" VARCHAR(255),
        "session_id" VARCHAR(255),
        "regular_hourly" INTEGER DEFAULT 0,
        "regular_daily" INTEGER DEFAULT 0,
        "regular_monthly" INTEGER DEFAULT 0,
        "raw_hourly" INTEGER DEFAULT 0,
        "raw_daily" INTEGER DEFAULT 0,
        "raw_monthly" INTEGER DEFAULT 0,
        "monthly_bandwidth_mb" INTEGER DEFAULT 0,
        "hourly_reset_at" TIMESTAMP DEFAULT NOW(),
        "daily_reset_at" TIMESTAMP DEFAULT NOW(),
        "monthly_reset_at" TIMESTAMP DEFAULT NOW(),
        "created_at" TIMESTAMP DEFAULT NOW(),
        "updated_at" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    console.log('✅ userUsage table created successfully');
  } catch (error) {
    console.error('❌ Error creating userUsage table:', error);
  }
}

createUserUsageTable();