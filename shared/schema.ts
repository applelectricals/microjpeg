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
  id: serial('id').primaryKey(),
  userId: integer('user_id'),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
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
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const userUsage = pgTable('user_Usage', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id'),
  referredId: integer('referred_id'),
  code: varchar('code', { length: 100 }),
  status: varchar('status', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow()
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








