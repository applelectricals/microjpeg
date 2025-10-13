// Add missing columns to compression_jobs table
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function fixCompressionJobsTable() {
  console.log('Adding missing columns to compression_jobs table...');
  
  try {
    // Add compression_algorithm column
    await sql(`
      ALTER TABLE compression_jobs 
      ADD COLUMN IF NOT EXISTS compression_algorithm VARCHAR(50) DEFAULT 'standard'
    `);
    
    // Add other missing columns that might be needed
    await sql(`
      ALTER TABLE compression_jobs 
      ADD COLUMN IF NOT EXISTS has_transparency BOOLEAN DEFAULT false
    `);
    
    await sql(`
      ALTER TABLE compression_jobs 
      ADD COLUMN IF NOT EXISTS has_animation BOOLEAN DEFAULT false
    `);
    
    await sql(`
      ALTER TABLE compression_jobs 
      ADD COLUMN IF NOT EXISTS is_progressive BOOLEAN DEFAULT false
    `);
    
    await sql(`
      ALTER TABLE compression_jobs 
      ADD COLUMN IF NOT EXISTS width INTEGER
    `);
    
    await sql(`
      ALTER TABLE compression_jobs 
      ADD COLUMN IF NOT EXISTS height INTEGER
    `);
    
    await sql(`
      ALTER TABLE compression_jobs 
      ADD COLUMN IF NOT EXISTS input_format VARCHAR(20)
    `);
    
    await sql(`
      ALTER TABLE compression_jobs 
      ADD COLUMN IF NOT EXISTS processing_time INTEGER
    `);
    
    console.log('✅ compression_jobs table updated successfully');
    
    // Check the table structure
    const columns = await sql(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'compression_jobs'
      ORDER BY ordinal_position
    `);
    
    console.log('compression_jobs columns:', columns);
    
  } catch (error) {
    console.error('❌ Error updating compression_jobs table:', error);
  }
}

fixCompressionJobsTable();