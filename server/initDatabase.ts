import { db } from './db';
import { sql } from 'drizzle-orm';

export async function initializeProductionDatabase() {
  console.log('🗄️ Initializing Production Database...');
  
  try {
    // Test basic connection
    console.log('Testing database connection...');
    await db.execute(sql`SELECT 1 as test`);
    console.log('✅ Database connection successful');
    
    // Check if compression_jobs table exists
    console.log('Checking compression_jobs table...');
    const tableCheck = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'compression_jobs'
    `);
    
    if (tableCheck.rows.length === 0) {
      console.log('❌ compression_jobs table missing - creating...');
      
      // Create compression_jobs table
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS compression_jobs (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(255),
          session_id VARCHAR(255),
          original_filename VARCHAR(500) NOT NULL,
          compressed_filename VARCHAR(500),
          original_size INTEGER NOT NULL,
          compressed_size INTEGER,
          compression_ratio NUMERIC(5,2),
          status VARCHAR(50) DEFAULT 'pending',
          error_message TEXT,
          original_format VARCHAR(10),
          output_format VARCHAR(10),
          quality INTEGER,
          compression_algorithm VARCHAR(50) DEFAULT 'standard',
          download_url VARCHAR(1000),
          original_url VARCHAR(1000),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          batch_id VARCHAR(255),
          page_identifier VARCHAR(100),
          settings JSONB
        )
      `);
      console.log('✅ compression_jobs table created');
    } else {
      console.log('✅ compression_jobs table exists');
    }
    
    // Check if userUsage table exists
    console.log('Checking userUsage table...');
    const usageTableCheck = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'userUsage'
    `);
    
    if (usageTableCheck.rows.length === 0) {
      console.log('❌ userUsage table missing - creating...');
      
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "userUsage" (
          id SERIAL PRIMARY KEY,
          "userId" VARCHAR(255) NOT NULL,
          "sessionId" VARCHAR(255),
          "regularHourly" INTEGER DEFAULT 0,
          "regularDaily" INTEGER DEFAULT 0,
          "regularMonthly" INTEGER DEFAULT 0,
          "rawHourly" INTEGER DEFAULT 0,
          "rawDaily" INTEGER DEFAULT 0,
          "rawMonthly" INTEGER DEFAULT 0,
          "monthlyBandwidthMb" NUMERIC(10,2) DEFAULT 0,
          "hourlyResetAt" TIMESTAMP,
          "dailyResetAt" TIMESTAMP,
          "monthlyResetAt" TIMESTAMP,
          "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ userUsage table created');
    } else {
      console.log('✅ userUsage table exists');
    }
    
    console.log('🎉 Database initialization complete!');
    return true;
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
}