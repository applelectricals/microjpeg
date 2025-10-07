import { pgTable, serial, varchar, integer, timestamp, decimal, boolean, jsonb, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }),
  password: varchar('password', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id'),
  token: varchar('token', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const apiKeys = pgTable('api_keys', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }),
  userId: integer('user_id'),
  createdAt: timestamp('created_at').defaultNow()
});

export const uploads = pgTable('uploads', {
  id: serial('id').primaryKey(),
  userId: integer('user_id'),
  filename: varchar('filename', { length: 255 }),
  size: integer('size'),
  createdAt: timestamp('created_at').defaultNow()
});

export const compressionJobs = pgTable('compression_jobs', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 }),
  sessionId: varchar('session_id', { length: 255 }),
  originalFilename: varchar('original_filename', { length: 255 }).notNull(),
  originalPath: varchar('original_path', { length: 500 }),
  compressedPath: varchar('compressed_path', { length: 500 }),
  status: varchar('status', { length: 50 }).default('pending'),
  errorMessage: text('error_message'),
  fileSize: integer('file_size'),
  compressedSize: integer('compressed_size'),
  outputFormat: varchar('output_format', { length: 20 }),
  quality: integer('quality'),
  resizePercentage: integer('resize_percentage'),
  webOptimization: varchar('web_optimization', { length: 50 }),
  metadata: jsonb('metadata'),
  compressionSettings: jsonb('compression_settings'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  compressionAlgorithm: varchar('compression_algorithm', { length: 50 }).default('standard'),
  hasTransparency: boolean('has_transparency').default(false),
  hasAnimation: boolean('has_animation').default(false),
  isProgressive: boolean('is_progressive').default(false),
  width: integer('width'),
  height: integer('height'),
  inputFormat: varchar('input_format', { length: 20 }),
  processingTime: integer('processing_time')
});

export const leadMagnetSignups = pgTable('lead_magnet_signups', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }),
  source: varchar('source', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const conversions = pgTable('conversions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id'),
  fromFormat: varchar('from_format', { length: 50 }),
  toFormat: varchar('to_format', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const fileProcessing = pgTable('file_processing', {
  id: serial('id').primaryKey(),
  userId: integer('user_id'),
  fileId: varchar('file_id', { length: 255 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const pageUsage = pgTable('page_usage', {
  id: serial('id').primaryKey(),
  sessionId: varchar('session_id', { length: 255 }),
  pageIdentifier: varchar('page_identifier', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const rewardTransactions = pgTable('reward_transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id'),
  amount: decimal('amount', { precision: 10, scale: 2 }),
  type: varchar('type', { length: 50 }),
  description: varchar('description', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const socialShares = pgTable('social_shares', {
  id: serial('id').primaryKey(),
  userId: integer('user_id'),
  platform: varchar('platform', { length: 50 }),
  url: varchar('url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const userReferrals = pgTable('user_referrals', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const userRewards = pgTable('user_rewards', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const adminAuditLogs = pgTable('admin_AuditLogs', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const appSettings = pgTable('app_Settings', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const operationLog = pgTable('operation_Log', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }),
  sessionId: varchar('session_id', { length: 255 }),
  operationType: varchar('operation_type', { length: 50 }), // 'regular' or 'raw'
  fileFormat: varchar('file_format', { length: 20 }), // e.g., 'jpg', 'cr2'
  fileSizeMb: integer('file_size_mb'),
  pageIdentifier: varchar('page_identifier', { length: 100 }),
  wasBypassed: boolean('was_bypassed').default(false),
  bypassReason: varchar('bypass_reason', { length: 255 }),
  actedByAdminId: varchar('acted_by_admin_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const userUsage = pgTable('userUsage', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }), // Can be 'anonymous' for guest users
  sessionId: varchar('session_id', { length: 255 }),
  
  // Regular image counters
  regularHourly: integer('regular_hourly').default(0),
  regularDaily: integer('regular_daily').default(0),
  regularMonthly: integer('regular_monthly').default(0),
  
  // RAW image counters  
  rawHourly: integer('raw_hourly').default(0),
  rawDaily: integer('raw_daily').default(0),
  rawMonthly: integer('raw_monthly').default(0),
  
  // Bandwidth tracking
  monthlyBandwidthMb: integer('monthly_bandwidth_mb').default(0),
  
  // Reset timestamps
  hourlyResetAt: timestamp('hourly_reset_at').defaultNow(),
  dailyResetAt: timestamp('daily_reset_at').defaultNow(),
  monthlyResetAt: timestamp('monthly_reset_at').defaultNow(),
  
  // Metadata
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const paymentTransactions = pgTable('payment_Transactions', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const apiUsage = pgTable('api_Usage', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const apiCompressRequestSchema = pgTable('api_CompressRequestSchema', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const createApiKeySchema = pgTable('create_ApiKeySchema', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const anonymousSessionScopes = pgTable('anonymous_SessionScopes', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const loginSchema = pgTable('login_Schema', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const signupSchema = pgTable('signup_Schema', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const specialFormatTrials = pgTable('special_FormatTrials', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

// Type exports
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;
export type CompressionJob = typeof compressionJobs.$inferSelect;
export type InsertCompressionJob = typeof compressionJobs.$inferInsert;
export type UserUsage = typeof userUsage.$inferSelect;
export type InsertUserUsage = typeof userUsage.$inferInsert;
export type OperationLog = typeof operationLog.$inferSelect;
export type InsertOperationLog = typeof operationLog.$inferInsert;








