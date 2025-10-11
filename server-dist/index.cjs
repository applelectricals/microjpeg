"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc3) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc3 = __getOwnPropDesc(from, key)) || desc3.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  adminAuditLogs: () => adminAuditLogs,
  anonymousSessionScopes: () => anonymousSessionScopes,
  apiCompressRequestSchema: () => apiCompressRequestSchema,
  apiKeys: () => apiKeys,
  apiUsage: () => apiUsage,
  appSettings: () => appSettings,
  compressionJobs: () => compressionJobs,
  conversions: () => conversions,
  createApiKeySchema: () => createApiKeySchema,
  fileProcessing: () => fileProcessing,
  leadMagnetSignups: () => leadMagnetSignups,
  loginSchema: () => loginSchema,
  operationLog: () => operationLog2,
  pageUsage: () => pageUsage,
  paymentTransactions: () => paymentTransactions,
  rewardTransactions: () => rewardTransactions,
  sessions: () => sessions,
  signupSchema: () => signupSchema,
  socialShares: () => socialShares,
  specialFormatTrials: () => specialFormatTrials,
  uploads: () => uploads,
  userReferrals: () => userReferrals,
  userRewards: () => userRewards,
  userUsage: () => userUsage,
  users: () => users
});
var import_pg_core, users, sessions, apiKeys, uploads, compressionJobs, leadMagnetSignups, conversions, fileProcessing, pageUsage, rewardTransactions, socialShares, userReferrals, userRewards, adminAuditLogs, appSettings, operationLog2, userUsage, paymentTransactions, apiUsage, apiCompressRequestSchema, createApiKeySchema, anonymousSessionScopes, loginSchema, signupSchema, specialFormatTrials;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    import_pg_core = require("drizzle-orm/pg-core");
    users = (0, import_pg_core.pgTable)("users", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      email: (0, import_pg_core.varchar)("email", { length: 255 }),
      password: (0, import_pg_core.varchar)("password", { length: 255 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    sessions = (0, import_pg_core.pgTable)("sessions", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      userId: (0, import_pg_core.integer)("user_id"),
      token: (0, import_pg_core.varchar)("token", { length: 255 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    apiKeys = (0, import_pg_core.pgTable)("api_keys", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      key: (0, import_pg_core.varchar)("key", { length: 255 }),
      userId: (0, import_pg_core.integer)("user_id"),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    uploads = (0, import_pg_core.pgTable)("uploads", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      userId: (0, import_pg_core.integer)("user_id"),
      filename: (0, import_pg_core.varchar)("filename", { length: 255 }),
      size: (0, import_pg_core.integer)("size"),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    compressionJobs = (0, import_pg_core.pgTable)("compression_jobs", {
      id: (0, import_pg_core.varchar)("id", { length: 255 }).primaryKey(),
      userId: (0, import_pg_core.varchar)("user_id", { length: 255 }),
      sessionId: (0, import_pg_core.varchar)("session_id", { length: 255 }),
      originalFilename: (0, import_pg_core.varchar)("original_filename", { length: 255 }).notNull(),
      originalPath: (0, import_pg_core.varchar)("original_path", { length: 500 }),
      compressedPath: (0, import_pg_core.varchar)("compressed_path", { length: 500 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }).default("pending"),
      errorMessage: (0, import_pg_core.text)("error_message"),
      fileSize: (0, import_pg_core.integer)("file_size"),
      compressedSize: (0, import_pg_core.integer)("compressed_size"),
      outputFormat: (0, import_pg_core.varchar)("output_format", { length: 20 }),
      quality: (0, import_pg_core.integer)("quality"),
      resizePercentage: (0, import_pg_core.integer)("resize_percentage"),
      webOptimization: (0, import_pg_core.varchar)("web_optimization", { length: 50 }),
      metadata: (0, import_pg_core.jsonb)("metadata"),
      compressionSettings: (0, import_pg_core.jsonb)("compression_settings"),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow(),
      updatedAt: (0, import_pg_core.timestamp)("updated_at"),
      compressionAlgorithm: (0, import_pg_core.varchar)("compression_algorithm", { length: 50 }).default("standard"),
      hasTransparency: (0, import_pg_core.boolean)("has_transparency").default(false),
      hasAnimation: (0, import_pg_core.boolean)("has_animation").default(false),
      isProgressive: (0, import_pg_core.boolean)("is_progressive").default(false),
      width: (0, import_pg_core.integer)("width"),
      height: (0, import_pg_core.integer)("height"),
      inputFormat: (0, import_pg_core.varchar)("input_format", { length: 20 }),
      processingTime: (0, import_pg_core.integer)("processing_time")
    });
    leadMagnetSignups = (0, import_pg_core.pgTable)("lead_magnet_signups", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      email: (0, import_pg_core.varchar)("email", { length: 255 }),
      source: (0, import_pg_core.varchar)("source", { length: 100 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    conversions = (0, import_pg_core.pgTable)("conversions", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      userId: (0, import_pg_core.integer)("user_id"),
      fromFormat: (0, import_pg_core.varchar)("from_format", { length: 50 }),
      toFormat: (0, import_pg_core.varchar)("to_format", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    fileProcessing = (0, import_pg_core.pgTable)("file_processing", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      userId: (0, import_pg_core.integer)("user_id"),
      fileId: (0, import_pg_core.varchar)("file_id", { length: 255 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    pageUsage = (0, import_pg_core.pgTable)("page_usage", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      sessionId: (0, import_pg_core.varchar)("session_id", { length: 255 }),
      pageIdentifier: (0, import_pg_core.varchar)("page_identifier", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    rewardTransactions = (0, import_pg_core.pgTable)("reward_transactions", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      userId: (0, import_pg_core.integer)("user_id"),
      amount: (0, import_pg_core.decimal)("amount", { precision: 10, scale: 2 }),
      type: (0, import_pg_core.varchar)("type", { length: 50 }),
      description: (0, import_pg_core.varchar)("description", { length: 255 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    socialShares = (0, import_pg_core.pgTable)("social_shares", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      userId: (0, import_pg_core.integer)("user_id"),
      platform: (0, import_pg_core.varchar)("platform", { length: 50 }),
      url: (0, import_pg_core.varchar)("url", { length: 255 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    userReferrals = (0, import_pg_core.pgTable)("user_referrals", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      referrerId: (0, import_pg_core.integer)("referrer_id"),
      referredId: (0, import_pg_core.integer)("referred_id"),
      code: (0, import_pg_core.varchar)("code", { length: 100 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    userRewards = (0, import_pg_core.pgTable)("user_rewards", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      referrerId: (0, import_pg_core.integer)("referrer_id"),
      referredId: (0, import_pg_core.integer)("referred_id"),
      code: (0, import_pg_core.varchar)("code", { length: 100 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    adminAuditLogs = (0, import_pg_core.pgTable)("admin_AuditLogs", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      referrerId: (0, import_pg_core.integer)("referrer_id"),
      referredId: (0, import_pg_core.integer)("referred_id"),
      code: (0, import_pg_core.varchar)("code", { length: 100 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    appSettings = (0, import_pg_core.pgTable)("app_Settings", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      referrerId: (0, import_pg_core.integer)("referrer_id"),
      referredId: (0, import_pg_core.integer)("referred_id"),
      code: (0, import_pg_core.varchar)("code", { length: 100 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    operationLog2 = (0, import_pg_core.pgTable)("operation_Log", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      userId: (0, import_pg_core.varchar)("user_id", { length: 255 }),
      sessionId: (0, import_pg_core.varchar)("session_id", { length: 255 }),
      operationType: (0, import_pg_core.varchar)("operation_type", { length: 50 }),
      // 'regular' or 'raw'
      fileFormat: (0, import_pg_core.varchar)("file_format", { length: 20 }),
      // e.g., 'jpg', 'cr2'
      fileSizeMb: (0, import_pg_core.integer)("file_size_mb"),
      pageIdentifier: (0, import_pg_core.varchar)("page_identifier", { length: 100 }),
      wasBypassed: (0, import_pg_core.boolean)("was_bypassed").default(false),
      bypassReason: (0, import_pg_core.varchar)("bypass_reason", { length: 255 }),
      actedByAdminId: (0, import_pg_core.varchar)("acted_by_admin_id", { length: 255 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    userUsage = (0, import_pg_core.pgTable)("userUsage", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      userId: (0, import_pg_core.varchar)("user_id", { length: 255 }),
      // Can be 'anonymous' for guest users
      sessionId: (0, import_pg_core.varchar)("session_id", { length: 255 }),
      // Regular image counters
      regularHourly: (0, import_pg_core.integer)("regular_hourly").default(0),
      regularDaily: (0, import_pg_core.integer)("regular_daily").default(0),
      regularMonthly: (0, import_pg_core.integer)("regular_monthly").default(0),
      // RAW image counters  
      rawHourly: (0, import_pg_core.integer)("raw_hourly").default(0),
      rawDaily: (0, import_pg_core.integer)("raw_daily").default(0),
      rawMonthly: (0, import_pg_core.integer)("raw_monthly").default(0),
      // Bandwidth tracking
      monthlyBandwidthMb: (0, import_pg_core.integer)("monthly_bandwidth_mb").default(0),
      // Reset timestamps
      hourlyResetAt: (0, import_pg_core.timestamp)("hourly_reset_at").defaultNow(),
      dailyResetAt: (0, import_pg_core.timestamp)("daily_reset_at").defaultNow(),
      monthlyResetAt: (0, import_pg_core.timestamp)("monthly_reset_at").defaultNow(),
      // Metadata
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow(),
      updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow()
    });
    paymentTransactions = (0, import_pg_core.pgTable)("payment_Transactions", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      referrerId: (0, import_pg_core.integer)("referrer_id"),
      referredId: (0, import_pg_core.integer)("referred_id"),
      code: (0, import_pg_core.varchar)("code", { length: 100 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    apiUsage = (0, import_pg_core.pgTable)("api_Usage", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      referrerId: (0, import_pg_core.integer)("referrer_id"),
      referredId: (0, import_pg_core.integer)("referred_id"),
      code: (0, import_pg_core.varchar)("code", { length: 100 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    apiCompressRequestSchema = (0, import_pg_core.pgTable)("api_CompressRequestSchema", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      referrerId: (0, import_pg_core.integer)("referrer_id"),
      referredId: (0, import_pg_core.integer)("referred_id"),
      code: (0, import_pg_core.varchar)("code", { length: 100 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    createApiKeySchema = (0, import_pg_core.pgTable)("create_ApiKeySchema", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      referrerId: (0, import_pg_core.integer)("referrer_id"),
      referredId: (0, import_pg_core.integer)("referred_id"),
      code: (0, import_pg_core.varchar)("code", { length: 100 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    anonymousSessionScopes = (0, import_pg_core.pgTable)("anonymous_SessionScopes", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      referrerId: (0, import_pg_core.integer)("referrer_id"),
      referredId: (0, import_pg_core.integer)("referred_id"),
      code: (0, import_pg_core.varchar)("code", { length: 100 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    loginSchema = (0, import_pg_core.pgTable)("login_Schema", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      referrerId: (0, import_pg_core.integer)("referrer_id"),
      referredId: (0, import_pg_core.integer)("referred_id"),
      code: (0, import_pg_core.varchar)("code", { length: 100 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    signupSchema = (0, import_pg_core.pgTable)("signup_Schema", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      referrerId: (0, import_pg_core.integer)("referrer_id"),
      referredId: (0, import_pg_core.integer)("referred_id"),
      code: (0, import_pg_core.varchar)("code", { length: 100 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
    specialFormatTrials = (0, import_pg_core.pgTable)("special_FormatTrials", {
      id: (0, import_pg_core.serial)("id").primaryKey(),
      referrerId: (0, import_pg_core.integer)("referrer_id"),
      referredId: (0, import_pg_core.integer)("referred_id"),
      code: (0, import_pg_core.varchar)("code", { length: 100 }),
      status: (0, import_pg_core.varchar)("status", { length: 50 }),
      createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
    });
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  db: () => db,
  pool: () => pool
});
var import_serverless, import_neon_serverless, import_ws, pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    import_serverless = require("@neondatabase/serverless");
    import_neon_serverless = require("drizzle-orm/neon-serverless");
    import_ws = __toESM(require("ws"), 1);
    init_schema();
    import_serverless.neonConfig.webSocketConstructor = import_ws.default;
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new import_serverless.Pool({ connectionString: process.env.DATABASE_URL });
    db = (0, import_neon_serverless.drizzle)({ client: pool, schema: schema_exports });
  }
});

// server/r2Service.ts
var r2Service_exports = {};
__export(r2Service_exports, {
  R2Service: () => R2Service,
  R2_FOLDERS: () => R2_FOLDERS,
  default: () => r2Service_default,
  r2Service: () => r2Service
});
var import_client_s3, import_s3_request_presigner, import_fs2, import_crypto3, R2Service, r2Config, requiredEnvVars, missingVars, r2Service, R2_FOLDERS, r2Service_default;
var init_r2Service = __esm({
  "server/r2Service.ts"() {
    "use strict";
    import_client_s3 = require("@aws-sdk/client-s3");
    import_s3_request_presigner = require("@aws-sdk/s3-request-presigner");
    import_fs2 = __toESM(require("fs"), 1);
    import_crypto3 = __toESM(require("crypto"), 1);
    R2Service = class {
      s3Client;
      bucketName;
      accountId;
      baseUrl;
      cdnUrl;
      constructor(config) {
        this.bucketName = config.bucketName;
        this.accountId = config.accountId;
        this.baseUrl = `https://${config.accountId}.r2.cloudflarestorage.com`;
        this.cdnUrl = `https://pub-${config.accountId}.r2.dev`;
        this.s3Client = new import_client_s3.S3Client({
          region: config.region || "auto",
          endpoint: this.baseUrl,
          credentials: {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey
          },
          // R2 specific configuration
          forcePathStyle: true
        });
        console.log(`\u{1F310} R2 Service initialized for bucket: ${this.bucketName}`);
      }
      /**
       * Upload file to R2 with optimized key structure
       */
      async uploadFile(filePath, fileName, options = {}) {
        try {
          const {
            folder = "compressed",
            contentType = "image/jpeg",
            cacheControl = "public, max-age=31536000",
            // 1 year cache
            metadata = {}
          } = options;
          const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const fileHash = import_crypto3.default.createHash("md5").update(fileName + Date.now()).digest("hex").substring(0, 8);
          const key = `${folder}/${date}/${fileHash}_${fileName}`;
          const fileContent = await import_fs2.default.promises.readFile(filePath);
          const stats = await import_fs2.default.promises.stat(filePath);
          console.log(`\u{1F4E4} Uploading to R2: ${key} (${stats.size} bytes)`);
          const uploadCommand = new import_client_s3.PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: fileContent,
            ContentType: contentType,
            CacheControl: cacheControl,
            Metadata: {
              ...metadata,
              uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
              originalName: fileName,
              size: stats.size.toString()
            }
          });
          const result = await this.s3Client.send(uploadCommand);
          const uploadResult = {
            key,
            url: `${this.baseUrl}/${this.bucketName}/${key}`,
            cdnUrl: `${this.cdnUrl}/${key}`,
            size: stats.size,
            etag: result.ETag?.replace(/"/g, "")
          };
          console.log(`\u2705 Successfully uploaded to R2: ${uploadResult.cdnUrl}`);
          return uploadResult;
        } catch (error) {
          console.error(`\u274C R2 upload failed for ${fileName}:`, error);
          throw new Error(`Failed to upload ${fileName} to R2: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      /**
       * Upload buffer to R2 (for in-memory files)
       */
      async uploadBuffer(buffer, fileName, options = {}) {
        try {
          const {
            folder = "compressed",
            contentType = "image/jpeg",
            cacheControl = "public, max-age=31536000",
            metadata = {}
          } = options;
          const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const fileHash = import_crypto3.default.createHash("md5").update(fileName + Date.now()).digest("hex").substring(0, 8);
          const key = `${folder}/${date}/${fileHash}_${fileName}`;
          console.log(`\u{1F4E4} Uploading buffer to R2: ${key} (${buffer.length} bytes)`);
          const uploadCommand = new import_client_s3.PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: buffer,
            ContentType: contentType,
            CacheControl: cacheControl,
            Metadata: {
              ...metadata,
              uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
              originalName: fileName,
              size: buffer.length.toString()
            }
          });
          const result = await this.s3Client.send(uploadCommand);
          const uploadResult = {
            key,
            url: `${this.baseUrl}/${this.bucketName}/${key}`,
            cdnUrl: `${this.cdnUrl}/${key}`,
            size: buffer.length,
            etag: result.ETag?.replace(/"/g, "")
          };
          console.log(`\u2705 Successfully uploaded buffer to R2: ${uploadResult.cdnUrl}`);
          return uploadResult;
        } catch (error) {
          console.error(`\u274C R2 buffer upload failed for ${fileName}:`, error);
          throw new Error(`Failed to upload ${fileName} buffer to R2: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      /**
       * Get file metadata from R2
       */
      async getFileInfo(key) {
        try {
          const command = new import_client_s3.HeadObjectCommand({
            Bucket: this.bucketName,
            Key: key
          });
          const result = await this.s3Client.send(command);
          return {
            key,
            size: result.ContentLength,
            lastModified: result.LastModified,
            contentType: result.ContentType,
            etag: result.ETag?.replace(/"/g, ""),
            metadata: result.Metadata
          };
        } catch (error) {
          console.error(`\u274C Failed to get file info for ${key}:`, error);
          return null;
        }
      }
      /**
       * Delete file from R2
       */
      async deleteFile(key) {
        try {
          const command = new import_client_s3.DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key
          });
          await this.s3Client.send(command);
          console.log(`\u{1F5D1}\uFE0F Deleted from R2: ${key}`);
          return true;
        } catch (error) {
          console.error(`\u274C Failed to delete ${key} from R2:`, error);
          return false;
        }
      }
      /**
       * Generate presigned URL for temporary access
       */
      async getPresignedUrl(key, expiresIn = 3600) {
        try {
          const command = new import_client_s3.GetObjectCommand({
            Bucket: this.bucketName,
            Key: key
          });
          const presignedUrl = await (0, import_s3_request_presigner.getSignedUrl)(this.s3Client, command, { expiresIn });
          return presignedUrl;
        } catch (error) {
          console.error(`\u274C Failed to generate presigned URL for ${key}:`, error);
          throw error;
        }
      }
      /**
       * Get CDN URL for public access
       */
      getCdnUrl(key) {
        return `${this.cdnUrl}/${key}`;
      }
      /**
       * Health check for R2 service
       */
      async healthCheck() {
        try {
          const testKey = "health-check-" + Date.now();
          const testContent = Buffer.from("health check");
          await this.uploadBuffer(testContent, "health-check.txt", {
            folder: "system",
            contentType: "text/plain",
            metadata: { type: "health-check" }
          });
          await this.deleteFile(`system/${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}/${testKey.substring(0, 8)}_health-check.txt`);
          return {
            status: "healthy",
            details: {
              bucket: this.bucketName,
              cdnUrl: this.cdnUrl,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            }
          };
        } catch (error) {
          console.error("\u274C R2 health check failed:", error);
          return {
            status: "unhealthy",
            details: {
              error: error instanceof Error ? error.message : "Unknown error",
              bucket: this.bucketName,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            }
          };
        }
      }
      /**
       * Batch upload multiple files
       */
      async uploadBatch(files) {
        const results = [];
        const errors = [];
        console.log(`\u{1F4E6} Starting batch upload of ${files.length} files to R2`);
        for (const file of files) {
          try {
            const result = await this.uploadFile(file.path, file.name, file.options);
            results.push(result);
          } catch (error) {
            console.error(`\u274C Batch upload failed for ${file.name}:`, error);
            errors.push({ file: file.name, error: error instanceof Error ? error.message : "Unknown error" });
          }
        }
        console.log(`\u2705 Batch upload completed: ${results.length} successful, ${errors.length} failed`);
        if (errors.length > 0) {
          console.warn("Batch upload errors:", errors);
        }
        return results;
      }
    };
    r2Config = {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      accountId: process.env.R2_ACCOUNT_ID,
      bucketName: process.env.R2_BUCKET_NAME
    };
    requiredEnvVars = ["R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_ACCOUNT_ID", "R2_BUCKET_NAME"];
    missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
    if (missingVars.length > 0) {
      throw new Error(`Missing required R2 environment variables: ${missingVars.join(", ")}`);
    }
    r2Service = new R2Service(r2Config);
    R2_FOLDERS = {
      COMPRESSED: "compressed",
      ORIGINALS: "originals",
      THUMBNAILS: "thumbnails",
      BULK: "bulk",
      RAW: "raw",
      SYSTEM: "system"
    };
    r2Service_default = r2Service;
  }
});

// server/config/operationLimits.ts
function getFileType(filename) {
  const extension = filename.split(".").pop()?.toLowerCase() || "";
  if (OPERATION_CONFIG.formats.regular.includes(extension)) {
    return "regular";
  }
  if (OPERATION_CONFIG.formats.raw.includes(extension)) {
    return "raw";
  }
  return "unknown";
}
var OPERATION_CONFIG;
var init_operationLimits = __esm({
  "server/config/operationLimits.ts"() {
    "use strict";
    OPERATION_CONFIG = {
      // File format classifications
      formats: {
        regular: ["jpg", "jpeg", "png", "webp", "gif", "bmp", "svg", "avif", "tiff", "tif"],
        raw: ["cr2", "cr3", "arw", "nef", "nrw", "dng", "orf", "raf", "rw2", "pef", "srw"],
        video: ["mp4", "avi", "mov", "wmv"]
        // Future expansion
      },
      // Size limits by type
      maxFileSize: {
        regular: {
          anonymous: 10 * 1024 * 1024,
          // 10MB
          free: 10 * 1024 * 1024,
          // 10MB
          premium: 50 * 1024 * 1024,
          // 50MB
          enterprise: 200 * 1024 * 1024
          // 200MB
        },
        raw: {
          anonymous: 25 * 1024 * 1024,
          // 25MB
          free: 50 * 1024 * 1024,
          // 50MB
          premium: 100 * 1024 * 1024,
          // 100MB
          enterprise: 500 * 1024 * 1024
          // 500MB
        }
      },
      // Operation limits by user type
      limits: {
        anonymous: {
          regular: { monthly: 500, daily: 25, hourly: 5 },
          raw: { monthly: 20, daily: 10, hourly: 5 },
          totalBandwidthMB: 1e3
          // 1GB monthly
        },
        free: {
          regular: { monthly: 500, daily: 50, hourly: 10 },
          raw: { monthly: 100, daily: 25, hourly: 10 },
          totalBandwidthMB: 2e3
          // 2GB monthly
        },
        premium: {
          regular: { monthly: 1e4, daily: 1e3, hourly: 100 },
          raw: { monthly: 500, daily: 50, hourly: 10 },
          totalBandwidthMB: 5e4
          // 50GB monthly
        },
        enterprise: {
          regular: { monthly: 5e4, daily: 5e3, hourly: 500 },
          raw: { monthly: 5e3, daily: 500, hourly: 50 },
          totalBandwidthMB: 5e5
          // 500GB monthly
        }
      },
      // Special page overrides (optional)
      pageOverrides: {
        "/convert/cr2-to-jpg": {
          anonymous: { monthly: 10, daily: 3 },
          free: { monthly: 20, daily: 5 }
        }
      }
    };
  }
});

// server/services/DualUsageTracker.ts
var DualUsageTracker_exports = {};
__export(DualUsageTracker_exports, {
  DualUsageTracker: () => DualUsageTracker
});
function getCachedUsage(key) {
  const cached = usageCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  usageCache.delete(key);
  return null;
}
function setCachedUsage(key, data) {
  usageCache.set(key, {
    data,
    timestamp: Date.now()
  });
}
var import_drizzle_orm2, usageCache, CACHE_TTL, DualUsageTracker;
var init_DualUsageTracker = __esm({
  "server/services/DualUsageTracker.ts"() {
    "use strict";
    init_db();
    init_operationLimits();
    init_schema();
    import_drizzle_orm2 = require("drizzle-orm");
    usageCache = /* @__PURE__ */ new Map();
    CACHE_TTL = 3e4;
    DualUsageTracker = class {
      userId;
      sessionId;
      userType;
      auditContext;
      constructor(userId2, sessionId, userType, auditContext) {
        this.userId = userId2;
        this.sessionId = sessionId;
        this.userType = userType;
        this.auditContext = auditContext;
      }
      // Check if operation is allowed with bypass support
      async canPerformOperation(filename, fileSize, pageIdentifier) {
        try {
          console.log("\u{1F527} DualUsageTracker.canPerformOperation called:", { filename, fileSize, pageIdentifier, userType: this.userType });
          const fileType = getFileType(filename);
          if (fileType === "unknown") {
            return {
              allowed: false,
              reason: "Unsupported file format. Please upload JPG, PNG, WEBP, AVIF, SVG, TIFF or RAW files (CR2, ARW, DNG, NEF, ORF, RAF, RW2, CRW)."
            };
          }
          if (this.auditContext?.superBypass) {
            console.log("\u{1F513} Superuser bypass: Operation allowed without limit checks");
            return {
              allowed: true,
              reason: "superuser_bypass",
              wasBypassed: true
            };
          }
          let maxSize = OPERATION_CONFIG.maxFileSize[fileType][this.userType];
          if (pageIdentifier && pageIdentifier.includes("convert") && fileType === "raw" && this.userType === "anonymous") {
            maxSize = 25 * 1024 * 1024;
          }
          if (fileSize > maxSize) {
            const maxMB = Math.round(maxSize / 1024 / 1024);
            const currentMB = Math.round(fileSize / 1024 / 1024);
            let upgradeMessage = "";
            if (this.userType === "anonymous") {
              upgradeMessage = " Upgrade to Premium for up to 50MB files or Enterprise for up to 200MB files.";
            } else if (this.userType === "free") {
              upgradeMessage = " Upgrade to Premium for up to 50MB files or Enterprise for up to 200MB files.";
            } else if (this.userType === "premium") {
              upgradeMessage = " Upgrade to Enterprise for up to 200MB files.";
            }
            return {
              allowed: false,
              reason: `File size (${currentMB}MB) exceeds the ${maxMB}MB limit.${upgradeMessage}`
            };
          }
          const usage = await this.getCurrentUsage();
          const limits = this.getLimits(fileType, pageIdentifier);
          if (fileType === "raw") {
            if (usage.rawDaily >= limits.daily) {
              return {
                allowed: false,
                reason: `Daily RAW limit reached (${limits.daily}). Resets at midnight.`,
                usage,
                limits
              };
            }
            if (usage.rawMonthly >= limits.monthly) {
              return {
                allowed: false,
                reason: `Monthly RAW limit reached (${limits.monthly}). Upgrade for higher limits.`,
                usage,
                limits
              };
            }
          } else {
            if (usage.regularDaily >= limits.daily) {
              return {
                allowed: false,
                reason: `Daily limit reached (${limits.daily}). Resets at midnight.`,
                usage,
                limits
              };
            }
            if (usage.regularMonthly >= limits.monthly) {
              return {
                allowed: false,
                reason: `Monthly limit reached (${limits.monthly}). Upgrade for higher limits.`,
                usage,
                limits
              };
            }
          }
          console.log("\u2705 Operation allowed within limits");
          return {
            allowed: true,
            usage,
            limits
          };
        } catch (error) {
          console.error("Error in canPerformOperation:", error);
          return {
            allowed: true,
            reason: "error_fallback",
            wasBypassed: true
          };
        }
      }
      // Record successful operation with audit trail (with database fallback)
      async recordOperation(filename, fileSize, pageIdentifier) {
        try {
          console.log("\u{1F4DD} DualUsageTracker.recordOperation called:", { filename, fileSize, pageIdentifier, userType: this.userType });
          const fileType = getFileType(filename);
          if (fileType === "unknown") {
            console.log("\u26A0\uFE0F Skipping record of unknown file type");
            return;
          }
          const validFileSize = isNaN(fileSize) || fileSize < 0 ? 0 : fileSize;
          await this.incrementUsage(fileType);
          const wasBypassed = this.auditContext?.superBypass || false;
          await db.insert(operationLog2).values({
            userId: this.userId || "anonymous",
            sessionId: this.sessionId,
            operationType: fileType,
            fileFormat: filename.split(".").pop() || "",
            fileSizeMb: Math.round(validFileSize / 1024 / 1024),
            pageIdentifier,
            wasBypassed,
            bypassReason: this.auditContext?.bypassReason || null,
            actedByAdminId: this.auditContext?.adminUserId || null
          });
          if (wasBypassed) {
            console.log(`\u{1F4DD} Operation logged with bypass: ${fileType} file by ${this.auditContext?.adminUserId || "system"}`);
          }
        } catch (error) {
          console.error("Error recording operation (database may not be updated):", error);
          console.log("\u{1F504} Continuing without operation recording (fallback mode)");
        }
      }
      // Get current usage with automatic reset (with database fallback)
      async getCurrentUsage() {
        try {
          console.log("\u{1F4CA} DualUsageTracker.getCurrentUsage called for:", { userType: this.userType, userId: this.userId });
          const cacheKey = `usage_${this.userId || "anonymous"}_${this.sessionId}`;
          const cached = getCachedUsage(cacheKey);
          if (cached) {
            console.log("\u26A1 Using cached usage data - performance boost!");
            return cached;
          }
          const now = /* @__PURE__ */ new Date();
          const usageResult = await db.select().from(userUsage).where((0, import_drizzle_orm2.and)(
            (0, import_drizzle_orm2.eq)(userUsage.userId, this.userId || "anonymous"),
            (0, import_drizzle_orm2.eq)(userUsage.sessionId, this.sessionId)
          )).limit(1);
          let usage;
          if (!usageResult || usageResult.length === 0) {
            const [newUsage] = await db.insert(userUsage).values({
              userId: this.userId || "anonymous",
              sessionId: this.sessionId,
              regularHourly: 0,
              regularDaily: 0,
              regularMonthly: 0,
              rawHourly: 0,
              rawDaily: 0,
              rawMonthly: 0,
              monthlyBandwidthMb: 0,
              hourlyResetAt: new Date(now.getTime() + 60 * 60 * 1e3),
              // 1 hour from now
              dailyResetAt: new Date(now.getTime() + 24 * 60 * 60 * 1e3),
              // 1 day from now
              monthlyResetAt: new Date(now.getFullYear(), now.getMonth() + 1, 1)
              // Next month
            }).returning();
            usage = newUsage;
          } else {
            usage = usageResult[0];
          }
          const hourlyReset = new Date(usage.hourlyResetAt || /* @__PURE__ */ new Date());
          const dailyReset = new Date(usage.dailyResetAt || /* @__PURE__ */ new Date());
          const monthlyReset = new Date(usage.monthlyResetAt || /* @__PURE__ */ new Date());
          let updateData = {};
          let needsUpdate = false;
          if (now.getTime() - hourlyReset.getTime() > 36e5) {
            updateData.regularHourly = 0;
            updateData.rawHourly = 0;
            updateData.hourlyResetAt = now;
            usage.regularHourly = 0;
            usage.rawHourly = 0;
            needsUpdate = true;
          }
          if (now.getTime() - dailyReset.getTime() > 864e5) {
            updateData.regularDaily = 0;
            updateData.rawDaily = 0;
            updateData.dailyResetAt = now;
            usage.regularDaily = 0;
            usage.rawDaily = 0;
            needsUpdate = true;
          }
          if (now.getTime() - monthlyReset.getTime() > 2592e6) {
            updateData.regularMonthly = 0;
            updateData.rawMonthly = 0;
            updateData.monthlyBandwidthMb = 0;
            updateData.monthlyResetAt = now;
            usage.regularMonthly = 0;
            usage.rawMonthly = 0;
            needsUpdate = true;
          }
          if (needsUpdate) {
            await db.update(userUsage).set(updateData).where((0, import_drizzle_orm2.and)(
              (0, import_drizzle_orm2.eq)(userUsage.userId, this.userId || "anonymous"),
              (0, import_drizzle_orm2.eq)(userUsage.sessionId, this.sessionId)
            ));
          }
          setCachedUsage(cacheKey, usage);
          console.log("\u{1F4BE} Cached usage data for faster future requests");
          return usage;
        } catch (error) {
          console.error("Error getting current usage (database may not be updated):", error);
          console.log("\u{1F504} Falling back to default usage values");
          const defaultUsage = {
            regularHourly: 0,
            regularDaily: 0,
            regularMonthly: 0,
            rawHourly: 0,
            rawDaily: 0,
            rawMonthly: 0,
            monthlyBandwidthMb: 0,
            hourlyResetAt: /* @__PURE__ */ new Date(),
            dailyResetAt: /* @__PURE__ */ new Date(),
            monthlyResetAt: /* @__PURE__ */ new Date()
          };
          const cacheKey = `usage_${this.userId || "anonymous"}_${this.sessionId}`;
          setCachedUsage(cacheKey, defaultUsage);
          return defaultUsage;
        }
      }
      // Increment usage counters (with database fallback)
      async incrementUsage(fileType) {
        try {
          console.log("\u{1F4C8} DualUsageTracker.incrementUsage called:", { fileType, userType: this.userType });
          if (fileType === "raw") {
            await db.update(userUsage).set({
              rawMonthly: import_drizzle_orm2.sql`${userUsage.rawMonthly} + 1`,
              rawDaily: import_drizzle_orm2.sql`${userUsage.rawDaily} + 1`,
              rawHourly: import_drizzle_orm2.sql`${userUsage.rawHourly} + 1`,
              updatedAt: /* @__PURE__ */ new Date()
            }).where((0, import_drizzle_orm2.and)(
              (0, import_drizzle_orm2.eq)(userUsage.userId, this.userId || "anonymous"),
              (0, import_drizzle_orm2.eq)(userUsage.sessionId, this.sessionId)
            ));
          } else {
            await db.update(userUsage).set({
              regularMonthly: import_drizzle_orm2.sql`${userUsage.regularMonthly} + 1`,
              regularDaily: import_drizzle_orm2.sql`${userUsage.regularDaily} + 1`,
              regularHourly: import_drizzle_orm2.sql`${userUsage.regularHourly} + 1`,
              updatedAt: /* @__PURE__ */ new Date()
            }).where((0, import_drizzle_orm2.and)(
              (0, import_drizzle_orm2.eq)(userUsage.userId, this.userId || "anonymous"),
              (0, import_drizzle_orm2.eq)(userUsage.sessionId, this.sessionId)
            ));
          }
          console.log(`\u2705 Usage incremented: ${fileType} operation for ${this.userType} user`);
          const cacheKey = `usage_${this.userId || "anonymous"}_${this.sessionId}`;
          usageCache.delete(cacheKey);
          console.log("\u{1F5D1}\uFE0F Cache invalidated after usage increment");
        } catch (error) {
          console.error("Error incrementing usage (database may not be updated):", error);
          console.log("\u{1F504} Continuing without usage increment (fallback mode)");
        }
      }
      // Get limits for file type
      getLimits(fileType, pageIdentifier) {
        const baseLimits = OPERATION_CONFIG.limits[this.userType][fileType];
        if (pageIdentifier && OPERATION_CONFIG.pageOverrides[pageIdentifier]) {
          const pageOverride = OPERATION_CONFIG.pageOverrides[pageIdentifier];
          const override = pageOverride[this.userType];
          if (override) {
            return { ...baseLimits, ...override };
          }
        }
        return baseLimits;
      }
      // This method is no longer needed as we handle updates inline
      async updateResets(usage) {
      }
      // Get usage statistics for display
      async getUsageStats(hasLaunchOffer = false) {
        const usage = await this.getCurrentUsage();
        const regularLimits = OPERATION_CONFIG.limits[this.userType].regular;
        const rawLimits = OPERATION_CONFIG.limits[this.userType].raw;
        const adjustedRegularLimits = { ...regularLimits };
        if (this.userType === "free" && hasLaunchOffer) {
          adjustedRegularLimits.monthly = regularLimits.monthly + 100;
        }
        return {
          regular: {
            monthly: { used: usage.regularMonthly, limit: adjustedRegularLimits.monthly },
            daily: { used: usage.regularDaily, limit: adjustedRegularLimits.daily },
            hourly: { used: usage.regularHourly, limit: adjustedRegularLimits.hourly }
          },
          raw: {
            monthly: { used: usage.rawMonthly, limit: rawLimits.monthly },
            daily: { used: usage.rawDaily, limit: rawLimits.daily },
            hourly: { used: usage.rawHourly, limit: rawLimits.hourly }
          },
          combined: {
            monthly: {
              used: usage.regularMonthly + usage.rawMonthly,
              limit: adjustedRegularLimits.monthly + rawLimits.monthly
            }
          }
        };
      }
    };
  }
});

// server/queueService.ts
var queueService_exports = {};
__export(queueService_exports, {
  JOB_TYPES: () => JOB_TYPES,
  QUEUE_PRIORITIES: () => QUEUE_PRIORITIES,
  addJobToQueue: () => addJobToQueue,
  bulkQueue: () => bulkQueue,
  getJobStatus: () => getJobStatus,
  getQueueServiceStatus: () => getQueueServiceStatus,
  imageQueue: () => imageQueue,
  initializeQueueService: () => initializeQueueService,
  rawQueue: () => rawQueue,
  redis: () => redis,
  shutdownQueueService: () => shutdownQueueService
});
async function initializeQueueService() {
  console.log("\u{1F680} Queue service disabled - Redis has been eliminated for performance");
  return false;
}
async function getQueueServiceStatus() {
  return {
    redis: false,
    queues: {
      imageQueue: false,
      rawQueue: false,
      bulkQueue: false
    }
  };
}
async function shutdownQueueService() {
  console.log("\u2705 Queue service shutdown complete (Redis eliminated)");
}
var addJobToQueue, getJobStatus, redis, imageQueue, rawQueue, bulkQueue, QUEUE_PRIORITIES, JOB_TYPES;
var init_queueService = __esm({
  "server/queueService.ts"() {
    "use strict";
    addJobToQueue = () => {
      console.log("Queue service disabled - Redis eliminated");
      return null;
    };
    getJobStatus = () => {
      console.log("Queue service disabled - Redis eliminated");
      return null;
    };
    redis = null;
    imageQueue = null;
    rawQueue = null;
    bulkQueue = null;
    QUEUE_PRIORITIES = null;
    JOB_TYPES = null;
  }
});

// server/pageRules.ts
var pageRules_exports = {};
__export(pageRules_exports, {
  ALLOWED_PAGE_IDENTIFIERS: () => ALLOWED_PAGE_IDENTIFIERS2,
  PAGE_RULES: () => PAGE_RULES,
  getPageLimits: () => getPageLimits,
  isValidPageIdentifier: () => isValidPageIdentifier,
  validateFileFormat: () => validateFileFormat,
  validateFileSize: () => validateFileSize,
  validateUsageLimits: () => validateUsageLimits
});
function getPageLimits(pageIdentifier) {
  return PAGE_RULES[pageIdentifier] || null;
}
function isValidPageIdentifier(pageIdentifier) {
  return ALLOWED_PAGE_IDENTIFIERS2.includes(pageIdentifier);
}
function validateFileSize(file, pageIdentifier) {
  const limits = getPageLimits(pageIdentifier);
  if (!limits) {
    return { valid: false, error: "Invalid page identifier" };
  }
  if (file.size > limits.maxFileSize) {
    const maxMB = Math.round(limits.maxFileSize / (1024 * 1024));
    const fileMB = Math.round(file.size / (1024 * 1024));
    if (pageIdentifier === "free-no-auth" && limits.maxFileSize === 10 * 1024 * 1024) {
      return {
        valid: false,
        error: `File size (${fileMB}MB) exceeds the ${maxMB}MB limit for free users. Upgrade to Premium for up to 50MB files or Enterprise for up to 200MB files.`
      };
    }
    return {
      valid: false,
      error: `File size (${fileMB}MB) exceeds ${maxMB}MB limit for ${limits.displayName}`
    };
  }
  return { valid: true };
}
function validateFileFormat(filename, pageIdentifier) {
  const limits = getPageLimits(pageIdentifier);
  if (!limits) {
    return { valid: false, error: "Invalid page identifier" };
  }
  const extension = "." + filename.split(".").pop()?.toLowerCase();
  const mimeType = filename.toLowerCase().includes("jpeg") || filename.toLowerCase().includes("jpg") ? "image/jpeg" : filename.toLowerCase().includes("png") ? "image/png" : filename.toLowerCase().includes("webp") ? "image/webp" : filename.toLowerCase().includes("avif") ? "image/avif" : filename.toLowerCase().includes("svg") ? "image/svg+xml" : filename.toLowerCase().includes("tiff") || filename.toLowerCase().includes("tif") ? "image/tiff" : extension;
  const isSupported = limits.inputFormats.includes(mimeType) || limits.inputFormats.includes(extension);
  if (!isSupported) {
    return {
      valid: false,
      error: `File format not supported for ${limits.displayName}. Supported formats: ${limits.inputFormats.join(", ")}`
    };
  }
  return { valid: true };
}
function validateUsageLimits(currentUsage, pageIdentifier) {
  const limits = getPageLimits(pageIdentifier);
  if (!limits) {
    return { canOperate: false, error: "Invalid page identifier" };
  }
  if (currentUsage.monthly >= limits.monthly) {
    return { canOperate: false, error: "Monthly limit reached", limit: "monthly" };
  }
  if (currentUsage.daily >= limits.daily) {
    return { canOperate: false, error: "Daily limit reached", limit: "daily" };
  }
  if (currentUsage.hourly >= limits.hourly) {
    return { canOperate: false, error: "Hourly limit reached", limit: "hourly" };
  }
  return { canOperate: true };
}
var PAGE_RULES, ALLOWED_PAGE_IDENTIFIERS2;
var init_pageRules = __esm({
  "server/pageRules.ts"() {
    "use strict";
    PAGE_RULES = {
      // 1. Free Plan (Without Sign in) - Main Landing Page
      "free-no-auth": {
        pageIdentifier: "free-no-auth",
        displayName: "Free Plan (No Sign-in)",
        monthly: 500,
        daily: 25,
        hourly: 5,
        maxFileSize: 10 * 1024 * 1024,
        // 10MB
        maxConcurrentUploads: 1,
        inputFormats: [
          // Standard image MIME types
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/avif",
          "image/svg+xml",
          "image/tiff",
          "image/tif",
          // RAW formats by extension (since MIME types vary)
          ".jpg",
          ".jpeg",
          ".png",
          ".webp",
          ".avif",
          ".svg",
          ".tiff",
          ".tif",
          ".cr2",
          ".arw",
          ".dng",
          ".nef",
          ".orf",
          ".raf",
          ".rw2",
          ".crw",
          // Additional RAW MIME types that some browsers might use
          "image/x-adobe-dng",
          "image/x-canon-cr2",
          "image/x-nikon-nef",
          "image/x-sony-arw"
        ],
        outputFormats: ["jpeg", "png", "webp", "avif"],
        autoConversionFormat: "jpeg",
        requiresAuth: false,
        requiresPayment: false,
        specialRules: [
          "No file duplicates in output modal",
          "Files persist in output modal until browser refresh/close",
          "Download All as ZIP functionality",
          "Individual file downloads",
          "Session ID constant during session",
          "Usage stats maintained for returning users"
        ]
      },
      // 2. Free Plan (With Sign in) - /compress-free
      "free-auth": {
        pageIdentifier: "free-auth",
        displayName: "Free Plan (With Sign-in)",
        monthly: 500,
        daily: 25,
        hourly: 5,
        maxFileSize: 10 * 1024 * 1024,
        // 10MB
        maxConcurrentUploads: 1,
        inputFormats: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/avif",
          "image/svg+xml",
          "image/tiff",
          "image/tif",
          ".cr2",
          ".arw",
          ".dng",
          ".nef",
          ".orf",
          ".raf",
          ".rw2"
        ],
        outputFormats: ["jpeg", "png", "webp", "avif"],
        autoConversionFormat: "jpeg",
        requiresAuth: true,
        requiresPayment: false,
        specialRules: [
          "Authentication required",
          "No file duplicates in output modal",
          "Files persist in output modal until browser refresh/close",
          "Download All as ZIP functionality",
          "Individual file downloads",
          "Session ID constant during session",
          "Usage stats maintained for authenticated user"
        ]
      },
      // 3. Test Premium Plan - $1/month - /test-premium  
      "test-1-dollar": {
        pageIdentifier: "test-1-dollar",
        displayName: "Test Premium Plan ($1)",
        monthly: 300,
        // Actually 300 operations for 1 day (24 hours)
        daily: 300,
        hourly: 20,
        maxFileSize: 50 * 1024 * 1024,
        // 50MB
        maxConcurrentUploads: 3,
        inputFormats: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/avif",
          "image/svg+xml",
          "image/tiff",
          "image/tif",
          ".cr2",
          ".arw",
          ".dng",
          ".nef",
          ".orf",
          ".raf",
          ".rw2"
        ],
        outputFormats: ["jpeg", "png", "webp", "avif"],
        autoConversionFormat: "jpeg",
        requiresAuth: true,
        requiresPayment: true,
        paymentAmount: 1,
        subscriptionDuration: 1,
        // 24 hours
        specialRules: [
          "Authentication and PayPal payment confirmation ($1) required",
          "Subscription expires after 24 hours",
          "No file duplicates in output modal",
          "Files persist in output modal until browser refresh/close",
          "Download All as ZIP functionality",
          "Individual file downloads",
          "Session ID constant during session",
          "Usage stats maintained for authenticated user"
        ]
      },
      // 4. Premium Plan - $29/month - /compress-premium
      "premium-29": {
        pageIdentifier: "premium-29",
        displayName: "Premium Plan ($29)",
        monthly: 1e4,
        daily: 334,
        // Roughly 10000/30 days
        hourly: 100,
        maxFileSize: 50 * 1024 * 1024,
        // 50MB
        maxConcurrentUploads: 3,
        inputFormats: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/avif",
          "image/svg+xml",
          "image/tiff",
          "image/tif",
          ".cr2",
          ".arw",
          ".dng",
          ".nef",
          ".orf",
          ".raf",
          ".rw2"
        ],
        outputFormats: ["jpeg", "png", "webp", "avif"],
        autoConversionFormat: "jpeg",
        requiresAuth: true,
        requiresPayment: true,
        paymentAmount: 29,
        subscriptionDuration: 30,
        // 30 days
        specialRules: [
          "Authentication and PayPal payment confirmation ($29) required",
          "Subscription renews monthly",
          "No file duplicates in output modal",
          "Files persist in output modal until browser refresh/close",
          "Download All as ZIP functionality",
          "Individual file downloads",
          "Session ID constant during session",
          "Usage stats maintained for authenticated user"
        ]
      },
      // 5. Enterprise Plan - $99/month - /compress-enterprise
      "enterprise-99": {
        pageIdentifier: "enterprise-99",
        displayName: "Enterprise Plan ($99)",
        monthly: 5e4,
        daily: 1667,
        // Roughly 50000/30 days
        hourly: 999999,
        // No rate limits
        maxFileSize: 200 * 1024 * 1024,
        // 200MB
        maxConcurrentUploads: 5,
        inputFormats: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/avif",
          "image/svg+xml",
          "image/tiff",
          "image/tif",
          ".cr2",
          ".arw",
          ".dng",
          ".nef",
          ".orf",
          ".raf",
          ".rw2"
        ],
        outputFormats: ["jpeg", "png", "webp", "avif"],
        autoConversionFormat: "jpeg",
        requiresAuth: true,
        requiresPayment: true,
        paymentAmount: 99,
        subscriptionDuration: 30,
        // 30 days
        specialRules: [
          "Authentication and PayPal payment confirmation ($99) required",
          "No rate limits (unlimited hourly operations)",
          "Subscription renews monthly",
          "No file duplicates in output modal",
          "Files persist in output modal until browser refresh/close",
          "Download All as ZIP functionality",
          "Individual file downloads",
          "Session ID constant during session",
          "Usage stats maintained for authenticated user"
        ]
      },
      // 6. CR2 to JPG (Without Sign In) - /convert/cr2-to-jpg
      "cr2-free": {
        pageIdentifier: "cr2-free",
        displayName: "CR2 to JPG Converter (Free)",
        monthly: 100,
        daily: 10,
        hourly: 5,
        // Reasonable hourly limit
        maxFileSize: 25 * 1024 * 1024,
        // 25MB
        maxConcurrentUploads: 1,
        inputFormats: [".cr2"],
        // Only CR2 files
        outputFormats: ["jpeg"],
        // Only JPG output
        autoConversionFormat: "jpeg",
        requiresAuth: false,
        requiresPayment: false,
        specialRules: [
          "CR2 files only",
          "Auto-converts to JPG on upload",
          "No file duplicates in output modal",
          "Files persist in output modal until browser refresh/close",
          "Download All as ZIP functionality",
          "Individual file downloads",
          "Session ID constant during session",
          "Usage stats maintained for returning users"
        ]
      },
      // 7. CR2 to PNG (Without Sign In) - /convert/cr2-to-png
      "cr2-to-png": {
        pageIdentifier: "cr2-to-png",
        displayName: "CR2 to PNG Converter (Free)",
        monthly: 100,
        daily: 10,
        hourly: 5,
        // Reasonable hourly limit
        maxFileSize: 25 * 1024 * 1024,
        // 25MB for RAW files
        maxConcurrentUploads: 1,
        inputFormats: [".cr2", ".cr3"],
        // CR2 and CR3 files
        outputFormats: ["png"],
        // Only PNG output
        autoConversionFormat: "png",
        requiresAuth: false,
        requiresPayment: false,
        specialRules: [
          "CR2 and CR3 files only",
          "Auto-converts to PNG on upload",
          "No file duplicates in output modal",
          "Files persist in output modal until browser refresh/close",
          "Download All as ZIP functionality",
          "Individual file downloads",
          "Session ID constant during session",
          "Usage stats maintained for returning users"
        ]
      },
      // ✅ NEW SEO-FRIENDLY URL STRUCTURE PAGE RULES
      // Main compress landing page - /compress (shows all options)
      "/compress": {
        pageIdentifier: "/compress",
        displayName: "Main Compress Landing",
        monthly: 500,
        daily: 25,
        hourly: 5,
        maxFileSize: 10 * 1024 * 1024,
        // 10MB
        maxConcurrentUploads: 1,
        inputFormats: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/avif",
          "image/svg+xml",
          "image/tiff",
          "image/tif",
          ".cr2",
          ".arw",
          ".dng",
          ".nef",
          ".orf",
          ".raf",
          ".rw2"
        ],
        outputFormats: ["jpeg", "png", "webp", "avif"],
        autoConversionFormat: "jpeg",
        requiresAuth: false,
        requiresPayment: false,
        specialRules: [
          "Landing page showing all compression options",
          "Same limits as main landing page"
        ]
      },
      // Free compression - /compress/free
      "/compress/free": {
        pageIdentifier: "/compress/free",
        displayName: "Free Compression (New URL)",
        monthly: 500,
        daily: 25,
        hourly: 5,
        maxFileSize: 10 * 1024 * 1024,
        // 10MB
        maxConcurrentUploads: 1,
        inputFormats: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/avif",
          "image/svg+xml",
          "image/tiff",
          "image/tif",
          ".cr2",
          ".arw",
          ".dng",
          ".nef",
          ".orf",
          ".raf",
          ".rw2"
        ],
        outputFormats: ["jpeg", "png", "webp", "avif"],
        autoConversionFormat: "jpeg",
        requiresAuth: true,
        requiresPayment: false,
        specialRules: [
          "Authentication required",
          "SEO-friendly URL structure",
          "Same features as /compress-free"
        ]
      },
      // Pro compression - /compress/pro  
      "/compress/pro": {
        pageIdentifier: "/compress/pro",
        displayName: "Pro Compression (New URL)",
        monthly: 1e4,
        daily: 334,
        hourly: 100,
        maxFileSize: 50 * 1024 * 1024,
        // 50MB
        maxConcurrentUploads: 3,
        inputFormats: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/avif",
          "image/svg+xml",
          "image/tiff",
          "image/tif",
          ".cr2",
          ".arw",
          ".dng",
          ".nef",
          ".orf",
          ".raf",
          ".rw2"
        ],
        outputFormats: ["jpeg", "png", "webp", "avif"],
        autoConversionFormat: "jpeg",
        requiresAuth: true,
        requiresPayment: true,
        paymentAmount: 29,
        subscriptionDuration: 30,
        specialRules: [
          "Authentication and payment required",
          "SEO-friendly URL structure",
          "Same features as /compress-premium"
        ]
      },
      // Enterprise compression - /compress/enterprise
      "/compress/enterprise": {
        pageIdentifier: "/compress/enterprise",
        displayName: "Enterprise Compression (New URL)",
        monthly: 5e4,
        daily: 1667,
        hourly: 999999,
        maxFileSize: 200 * 1024 * 1024,
        // 200MB
        maxConcurrentUploads: 5,
        inputFormats: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/avif",
          "image/svg+xml",
          "image/tiff",
          "image/tif",
          ".cr2",
          ".arw",
          ".dng",
          ".nef",
          ".orf",
          ".raf",
          ".rw2"
        ],
        outputFormats: ["jpeg", "png", "webp", "avif"],
        autoConversionFormat: "jpeg",
        requiresAuth: true,
        requiresPayment: true,
        paymentAmount: 99,
        subscriptionDuration: 30,
        specialRules: [
          "Authentication and payment required",
          "SEO-friendly URL structure",
          "Same features as /compress-enterprise"
        ]
      },
      // Bulk processing - /compress/bulk
      "/compress/bulk": {
        pageIdentifier: "/compress/bulk",
        displayName: "Bulk Image Compression (New URL)",
        monthly: 500,
        daily: 25,
        hourly: 5,
        maxFileSize: 10 * 1024 * 1024,
        // 10MB
        maxConcurrentUploads: 1,
        inputFormats: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/avif",
          "image/svg+xml",
          "image/tiff",
          "image/tif"
        ],
        outputFormats: ["jpeg", "png", "webp", "avif"],
        autoConversionFormat: "jpeg",
        requiresAuth: false,
        requiresPayment: false,
        specialRules: [
          "SEO-friendly URL structure",
          "Same features as /bulk-image-compression"
        ]
      },
      // RAW processing - /compress/raw
      "/compress/raw": {
        pageIdentifier: "/compress/raw",
        displayName: "RAW File Compression (New URL)",
        monthly: 500,
        daily: 25,
        hourly: 5,
        maxFileSize: 25 * 1024 * 1024,
        // 25MB (larger for RAW files)
        maxConcurrentUploads: 1,
        inputFormats: [".cr2", ".arw", ".dng", ".nef", ".orf", ".raf", ".rw2"],
        outputFormats: ["jpeg", "png", "webp", "avif"],
        autoConversionFormat: "jpeg",
        requiresAuth: false,
        requiresPayment: false,
        specialRules: [
          "SEO-friendly URL structure",
          "Same features as /compress-raw-files",
          "Optimized for RAW file processing"
        ]
      },
      // CR2 to PNG conversion - /convert/cr2-to-png
      "/convert/cr2-to-png": {
        pageIdentifier: "/convert/cr2-to-png",
        displayName: "CR2 to PNG Converter",
        monthly: 20,
        daily: 10,
        hourly: 5,
        maxFileSize: 25 * 1024 * 1024,
        // 25MB (larger for RAW files)
        maxConcurrentUploads: 1,
        inputFormats: [".cr2", ".cr3"],
        outputFormats: ["png"],
        autoConversionFormat: "png",
        requiresAuth: false,
        requiresPayment: false,
        specialRules: [
          "CR2/CR3 to PNG conversion only",
          "Quality and size controls available",
          "Uses dual-counter system for RAW operations"
        ]
      }
    };
    ALLOWED_PAGE_IDENTIFIERS2 = Object.keys(PAGE_RULES);
  }
});

// server/userLimits.ts
var userLimits_exports = {};
__export(userLimits_exports, {
  USER_LIMITS: () => USER_LIMITS,
  determineUserType: () => determineUserType,
  getUserLimits: () => getUserLimits
});
function getUserLimits(userType) {
  return USER_LIMITS[userType];
}
function determineUserType(subscription) {
  if (!subscription || !subscription.plan) {
    return "free";
  }
  const plan = subscription.plan.toLowerCase();
  if (plan.includes("premium") || plan.includes("pro")) {
    return "premium";
  }
  if (plan.includes("enterprise") || plan.includes("business")) {
    return "enterprise";
  }
  return "free";
}
var USER_LIMITS;
var init_userLimits = __esm({
  "server/userLimits.ts"() {
    "use strict";
    USER_LIMITS = {
      free: {
        monthly: { raw: 100, regular: 500, total: 500 },
        daily: { raw: 10, regular: 25, total: 25 },
        hourly: { raw: 5, regular: 5, total: 5 },
        maxFileSize: 10 * 1024 * 1024,
        // 10MB
        concurrent: 1
      },
      premium: {
        monthly: { total: 1e4 },
        daily: { total: 500 },
        hourly: { total: 100 },
        maxFileSize: 50 * 1024 * 1024,
        // 50MB
        concurrent: 3
      },
      enterprise: {
        monthly: { total: 5e4 },
        daily: { total: 5e3 },
        hourly: { total: 1e3 },
        maxFileSize: 200 * 1024 * 1024,
        // 200MB
        concurrent: 5
      }
    };
  }
});

// server/index.prod.ts
var import_config = require("dotenv/config");
var import_express8 = __toESM(require("express"), 1);
var import_express_session3 = __toESM(require("express-session"), 1);
var import_cors = __toESM(require("cors"), 1);

// server/routes.ts
var import_express6 = __toESM(require("express"), 1);
var import_http = require("http");
var import_crypto5 = require("crypto");
var import_multer2 = __toESM(require("multer"), 1);
var import_sharp4 = __toESM(require("sharp"), 1);
var import_path4 = __toESM(require("path"), 1);
var import_compression = __toESM(require("compression"), 1);
var import_promises = __toESM(require("fs/promises"), 1);
var import_fs4 = require("fs");
var import_archiver = __toESM(require("archiver"), 1);
var import_child_process3 = require("child_process");
var import_util3 = require("util");

// server/storage.ts
init_schema();
init_db();
var import_drizzle_orm = require("drizzle-orm");
var DatabaseStorage = class {
  // In-memory storage for guest files (temporary)
  guestFiles = /* @__PURE__ */ new Map();
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where((0, import_drizzle_orm.eq)(users.id, id));
    return user;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where((0, import_drizzle_orm.eq)(users.email, email));
    return user;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async updateUser(id, updates) {
    const [user] = await db.update(users).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm.eq)(users.id, id)).returning();
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async createCompressionJob(insertJob) {
    try {
      const minimalJob = {
        id: insertJob.id || `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        originalFilename: insertJob.originalFilename,
        status: insertJob.status || "pending",
        ...insertJob.userId && { userId: insertJob.userId },
        ...insertJob.sessionId && { sessionId: insertJob.sessionId },
        ...insertJob.outputFormat && { outputFormat: insertJob.outputFormat },
        ...insertJob.originalPath && { originalPath: insertJob.originalPath }
      };
      const [job] = await db.insert(compressionJobs).values(minimalJob).returning();
      return job;
    } catch (error) {
      console.error("Error creating compression job:", error);
      const fallbackJob = {
        id: insertJob.id || `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        originalFilename: insertJob.originalFilename,
        status: insertJob.status || "pending",
        userId: insertJob.userId || null,
        sessionId: insertJob.sessionId || null,
        outputFormat: insertJob.outputFormat || null,
        originalPath: insertJob.originalPath || null,
        compressedPath: null,
        errorMessage: null,
        fileSize: null,
        compressedSize: null,
        quality: null,
        resizePercentage: null,
        webOptimization: null,
        metadata: null,
        compressionSettings: null,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: null,
        compressionAlgorithm: null,
        hasTransparency: false,
        hasAnimation: false,
        isProgressive: false,
        width: null,
        height: null,
        inputFormat: null,
        processingTime: null
      };
      return fallbackJob;
    }
  }
  async getCompressionJob(id) {
    const [job] = await db.select().from(compressionJobs).where((0, import_drizzle_orm.eq)(compressionJobs.id, id));
    return job;
  }
  async getJobsByIds(ids) {
    if (ids.length === 0) return [];
    const jobs = await db.select().from(compressionJobs).where((0, import_drizzle_orm.inArray)(compressionJobs.id, ids));
    return jobs;
  }
  async updateCompressionJob(id, updates) {
    const [updatedJob] = await db.update(compressionJobs).set(updates).where((0, import_drizzle_orm.eq)(compressionJobs.id, id)).returning();
    return updatedJob;
  }
  async getAllCompressionJobs(userId2) {
    const jobs = await db.select().from(compressionJobs).where(userId2 ? (0, import_drizzle_orm.eq)(compressionJobs.userId, userId2) : void 0).orderBy((0, import_drizzle_orm.desc)(compressionJobs.createdAt));
    return jobs;
  }
  async deleteCompressionJob(id) {
    const result = await db.delete(compressionJobs).where((0, import_drizzle_orm.eq)(compressionJobs.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }
  async getCompressionJobsBySession(sessionId) {
    const jobs = await db.select().from(compressionJobs).where((0, import_drizzle_orm.eq)(compressionJobs.sessionId, sessionId)).orderBy((0, import_drizzle_orm.desc)(compressionJobs.createdAt));
    return jobs;
  }
  async findExistingJob(userId2, sessionId, originalFilename, outputFormat) {
    if (userId2) {
      const [job2] = await db.select().from(compressionJobs).where(
        (0, import_drizzle_orm.and)(
          (0, import_drizzle_orm.eq)(compressionJobs.userId, userId2),
          (0, import_drizzle_orm.eq)(compressionJobs.originalFilename, originalFilename),
          (0, import_drizzle_orm.eq)(compressionJobs.outputFormat, outputFormat)
        )
      ).orderBy((0, import_drizzle_orm.desc)(compressionJobs.createdAt)).limit(1);
      return job2;
    }
    const [job] = await db.select().from(compressionJobs).where(
      (0, import_drizzle_orm.and)(
        (0, import_drizzle_orm.eq)(compressionJobs.sessionId, sessionId),
        (0, import_drizzle_orm.eq)(compressionJobs.originalFilename, originalFilename),
        (0, import_drizzle_orm.eq)(compressionJobs.outputFormat, outputFormat)
      )
    ).orderBy((0, import_drizzle_orm.desc)(compressionJobs.createdAt)).limit(1);
    return job;
  }
  async getUserByVerificationToken(token) {
    const [user] = await db.select().from(users).where((0, import_drizzle_orm.eq)(users.emailVerificationToken, token));
    return user;
  }
  async verifyUserEmail(id) {
    const [user] = await db.update(users).set({
      isEmailVerified: "true",
      emailVerificationToken: null,
      emailVerificationExpires: null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where((0, import_drizzle_orm.eq)(users.id, id)).returning();
    return user;
  }
  async togglePremiumStatus(userId2) {
    const currentUser = await this.getUser(userId2);
    if (!currentUser) return void 0;
    const newPremiumStatus = !currentUser.isPremium;
    const [user] = await db.update(users).set({
      isPremium: newPremiumStatus,
      updatedAt: /* @__PURE__ */ new Date()
    }).where((0, import_drizzle_orm.eq)(users.id, userId2)).returning();
    return user;
  }
  async updateUserStripeInfo(userId2, stripeCustomerId, stripeSubscriptionId) {
    const updates = {
      stripeCustomerId,
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (stripeSubscriptionId) {
      updates.stripeSubscriptionId = stripeSubscriptionId;
      updates.subscriptionStatus = "active";
    }
    const [user] = await db.update(users).set(updates).where((0, import_drizzle_orm.eq)(users.id, userId2)).returning();
    return user;
  }
  async updateSubscriptionStatus(userId2, status, endDate) {
    const [user] = await db.update(users).set({
      subscriptionStatus: status,
      subscriptionEndDate: endDate,
      updatedAt: /* @__PURE__ */ new Date()
    }).where((0, import_drizzle_orm.eq)(users.id, userId2)).returning();
    return user;
  }
  async updateUserTier(userId2, tierData) {
    const [user] = await db.update(users).set({
      ...tierData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where((0, import_drizzle_orm.eq)(users.id, userId2)).returning();
    return user;
  }
  // Guest file operations
  setGuestFile(id, buffer, originalName) {
    this.guestFiles.set(id, { buffer, originalName });
    setTimeout(() => {
      this.guestFiles.delete(id);
    }, 60 * 60 * 1e3);
  }
  getGuestFile(id) {
    return this.guestFiles.get(id) || null;
  }
  // Social sharing and rewards operations
  async createSocialShare(shareData) {
    const [share] = await db.insert(socialShares).values(shareData).returning();
    return share;
  }
  async getUserShares(userId2, limit = 10) {
    const shares = await db.select().from(socialShares).where((0, import_drizzle_orm.eq)(socialShares.userId, userId2)).orderBy(socialShares.sharedAt).limit(limit);
    return shares;
  }
  async getUserRewards(userId2) {
    const [rewards] = await db.select().from(userRewards).where((0, import_drizzle_orm.eq)(userRewards.userId, userId2));
    return rewards;
  }
  async addRewardPoints(userId2, points, source, relatedId) {
    let [rewards] = await db.select().from(userRewards).where((0, import_drizzle_orm.eq)(userRewards.userId, userId2));
    if (!rewards) {
      [rewards] = await db.insert(userRewards).values({
        userId: userId2,
        totalPoints: points,
        totalEarned: points,
        sharePoints: source === "social_share" ? points : 0,
        referralPoints: source === "referral" ? points : 0
      }).returning();
    } else {
      const newTotalPoints = rewards.totalPoints + points;
      const newTotalEarned = rewards.totalEarned + points;
      const newSharePoints = rewards.sharePoints + (source === "social_share" ? points : 0);
      const newReferralPoints = rewards.referralPoints + (source === "referral" ? points : 0);
      [rewards] = await db.update(userRewards).set({
        totalPoints: newTotalPoints,
        totalEarned: newTotalEarned,
        sharePoints: newSharePoints,
        referralPoints: newReferralPoints,
        updatedAt: /* @__PURE__ */ new Date()
      }).where((0, import_drizzle_orm.eq)(userRewards.userId, userId2)).returning();
    }
    await db.insert(rewardTransactions).values({
      userId: userId2,
      type: "earned",
      source,
      points,
      description: `Earned ${points} points from ${source.replace("_", " ")}`,
      relatedId
    });
    return rewards;
  }
  async updateUserDiscount(userId2, discountPercent) {
    const [rewards] = await db.update(userRewards).set({
      currentDiscountPercent: discountPercent,
      updatedAt: /* @__PURE__ */ new Date()
    }).where((0, import_drizzle_orm.eq)(userRewards.userId, userId2)).returning();
    return rewards;
  }
  async getUserReferral(userId2) {
    const [referral] = await db.select().from(userReferrals).where((0, import_drizzle_orm.eq)(userReferrals.userId, userId2));
    return referral;
  }
  async createUserReferral(userId2, referralCode) {
    const [referral] = await db.insert(userReferrals).values({
      userId: userId2,
      referralCode
    }).returning();
    return referral;
  }
  // Lead magnet operations
  async getLeadMagnetSignup(email) {
    const [signup] = await db.select().from(leadMagnetSignups).where((0, import_drizzle_orm.eq)(leadMagnetSignups.email, email));
    return signup;
  }
  async getLeadMagnetSignupCountByIP(ipAddress) {
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const signups = await db.select().from(leadMagnetSignups).where(
      (0, import_drizzle_orm.and)(
        (0, import_drizzle_orm.eq)(leadMagnetSignups.ipAddress, ipAddress),
        (0, import_drizzle_orm.gte)(leadMagnetSignups.signedUpAt, today)
      )
    );
    return signups.length;
  }
  async createLeadMagnetSignup(signupData) {
    const [signup] = await db.insert(leadMagnetSignups).values(signupData).returning();
    return signup;
  }
  async deleteLeadMagnetSignup(id) {
    const result = await db.delete(leadMagnetSignups).where((0, import_drizzle_orm.eq)(leadMagnetSignups.id, id));
    return result.rowCount > 0;
  }
  async checkLeadMagnetCredits(email) {
    const signup = await this.getLeadMagnetSignup(email);
    if (!signup || signup.status !== "active") {
      return { hasCredits: false, creditsRemaining: 0, expiresAt: null };
    }
    if (signup.expiresAt && /* @__PURE__ */ new Date() > signup.expiresAt) {
      return { hasCredits: false, creditsRemaining: 0, expiresAt: signup.expiresAt };
    }
    const creditsRemaining = signup.creditsGranted - signup.creditsUsed;
    return {
      hasCredits: creditsRemaining > 0,
      creditsRemaining,
      expiresAt: signup.expiresAt
    };
  }
  async useLeadMagnetCredits(email, creditsToUse) {
    const creditCheck = await this.checkLeadMagnetCredits(email);
    if (!creditCheck.hasCredits || creditCheck.creditsRemaining < creditsToUse) {
      return false;
    }
    const signup = await this.getLeadMagnetSignup(email);
    if (!signup) return false;
    const newCreditsUsed = signup.creditsUsed + creditsToUse;
    await db.update(leadMagnetSignups).set({
      creditsUsed: newCreditsUsed,
      lastUsed: /* @__PURE__ */ new Date()
    }).where((0, import_drizzle_orm.eq)(leadMagnetSignups.email, email));
    return true;
  }
  // Bonus operations claim methods - using purchasedCredits field as tracker
  async claimBonusOperations(userId2) {
    const user = await this.getUser(userId2);
    if (!user) {
      return { success: false };
    }
    if (user.purchasedCredits > 0) {
      return { success: false, alreadyClaimed: true };
    }
    await this.updateUser(userId2, { purchasedCredits: 100 });
    return { success: true };
  }
  async hasClaimedBonusOperations(userId2) {
    const user = await this.getUser(userId2);
    return (user?.purchasedCredits || 0) > 0;
  }
};
var storage = new DatabaseStorage();

// server/emailService.ts
var import_mail = require("@sendgrid/mail");
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var fs = __toESM(require("fs"), 1);
var path = __toESM(require("path"), 1);
var EmailService = class {
  mailService = null;
  transporter = null;
  isConfigured = false;
  useSendGrid = false;
  logoAttachment = null;
  constructor() {
    try {
      const logoPath = path.join(process.cwd(), "attached_assets/MICROJPEG_LOGO_1756492872982.png");
      const logoBuffer = fs.readFileSync(logoPath);
      console.log("\u2705 Loaded Micro JPEG logo for emails");
      this.logoAttachment = {
        content: logoBuffer.toString("base64"),
        filename: "microjpeg-logo.png",
        type: "image/png",
        disposition: "inline",
        content_id: "microjpeg-logo"
      };
    } catch (error) {
      console.warn("\u26A0\uFE0F Could not load email logo, emails will be sent without logo:", error.message);
      this.logoAttachment = null;
    }
    if (process.env.SENDGRID_API_KEY) {
      this.mailService = new import_mail.MailService();
      this.mailService.setApiKey(process.env.SENDGRID_API_KEY);
      this.isConfigured = true;
      this.useSendGrid = true;
      console.log("SendGrid email service is configured and ready");
    } else {
      this.transporter = import_nodemailer.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: "ethereal.user@ethereal.email",
          pass: "ethereal.pass"
        }
      });
      this.transporter.verify((error) => {
        if (error) {
          console.warn("Email service not configured properly. Emails will be logged to console.");
        } else {
          console.log("Development email service is ready");
          this.isConfigured = true;
        }
      });
    }
  }
  async sendEmail(emailConfig) {
    try {
      if (this.useSendGrid && this.mailService) {
        console.log(`Attempting to send email via SendGrid...`);
        console.log(`TO: ***MASKED***`);
        console.log(`FROM: ***MASKED***`);
        console.log(`SUBJECT: ${emailConfig.subject}`);
        const emailData = {
          to: emailConfig.to,
          from: emailConfig.from,
          subject: emailConfig.subject,
          html: emailConfig.html
        };
        if (this.logoAttachment) {
          emailData.attachments = [this.logoAttachment];
        }
        const result = await this.mailService.send(emailData);
        console.log(`\u2713 Email sent successfully via SendGrid`);
        console.log(`SendGrid response status:`, result[0]?.statusCode);
        return true;
      } else if (this.transporter && this.isConfigured) {
        const info = await this.transporter.sendMail(emailConfig);
        console.log("Email sent via nodemailer:", info.messageId);
        console.log("Preview URL:", import_nodemailer.default.getTestMessageUrl(info));
        return true;
      } else {
        console.log("=== EMAIL WOULD BE SENT ===");
        console.log(`To: ***MASKED***`);
        console.log(`Subject: ${emailConfig.subject}`);
        console.log(`From: ***MASKED***`);
        console.log("=== END EMAIL ===");
        return true;
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  }
  generateVerificationToken() {
    return import_crypto.default.randomBytes(32).toString("hex");
  }
  async sendVerificationEmail(email, token, firstName) {
    const baseUrl = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}` : "http://localhost:5000";
    const verificationUrl = `${baseUrl}/verify-email?token=${token}`;
    console.log(`Sending verification email to: ${email ? "***MASKED***" : "NONE"}`);
    console.log(`Verification URL generated: ${!!verificationUrl}`);
    console.log(`SENDGRID_FROM_EMAIL configured: ${!!process.env.SENDGRID_FROM_EMAIL}`);
    let fromEmail = process.env.SENDGRID_FROM_EMAIL;
    if (!fromEmail || !fromEmail.includes("@") || fromEmail.includes("DMARC")) {
      console.log("Invalid SENDGRID_FROM_EMAIL - using fallback verified sender");
      fromEmail = '"Micro JPEG" <compressjpg@microjpeg.com>';
      console.log("Fallback email configured");
    }
    console.log(`Email sender configured: ${!!fromEmail}`);
    fromEmail = '"Micro JPEG" <compressjpg@microjpeg.com>';
    console.log(`Using verified sender configuration`);
    const emailContent = {
      from: fromEmail,
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Verify Your Email</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .logo-img { max-width: 120px; height: auto; margin-bottom: 10px; }
            .brand-text { font-size: 24px; font-weight: bold; margin: 10px 0 5px 0; }
            .tagline { font-size: 14px; opacity: 0.9; margin-top: 5px; }
            .content { background: #f9fafb; padding: 30px; }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
              color: white; 
              padding: 12px 30px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 20px 0;
              box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="cid:microjpeg-logo" alt="Micro JPEG Logo" class="logo-img" />
              <div class="brand-text">microjpeg</div>
              <div class="tagline">PICTURE PERFECT</div>
            </div>
            <div class="content">
              <h2>Welcome${firstName ? ` ${firstName}` : ""}!</h2>
              <p>Thank you for signing up for Micro JPEG. To complete your registration and start compressing images, please verify your email address.</p>
              
              <p style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </p>
              
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #e5e7eb; padding: 10px; border-radius: 5px;">
                ${verificationUrl}
              </p>
              
              <p><strong>This verification link will expire in 24 hours.</strong></p>
              
              <p>If you didn't create an account with us, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    const success = await this.sendEmail(emailContent);
    if (!success && !this.isConfigured) {
      console.log("DEVELOPMENT: Verification URL for", email, ":", verificationUrl);
    }
    return success;
  }
  async sendSubscriptionConfirmation(email, firstName, details) {
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: "Welcome to Premium! Your Subscription is Active",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Premium Subscription Activated</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .premium-badge { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 10px 0; }
            .details-box { background: white; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>\u{1F389} Welcome to Premium!</h1>
            </div>
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p>Congratulations! Your premium subscription has been successfully activated. You now have unlimited access to all premium features.</p>
              
              <div class="premium-badge">\u{1F451} Premium Member</div>
              
              <div class="details-box">
                <h3>Subscription Details</h3>
                <p><strong>Plan:</strong> ${details.planName}</p>
                <p><strong>Amount:</strong> ${details.amount}</p>
                <p><strong>Billing:</strong> ${details.billingPeriod}</p>
                <p><strong>Next billing date:</strong> ${details.nextBillingDate.toLocaleDateString()}</p>
                <p><strong>Subscription ID:</strong> ${details.subscriptionId}</p>
              </div>

              <h3>What's included in Premium:</h3>
              <ul>
                <li>\u2705 Unlimited file compressions</li>
                <li>\u2705 No file size restrictions</li>
                <li>\u2705 Priority processing</li>
                <li>\u2705 Advanced compression settings</li>
                <li>\u2705 Batch download capabilities</li>
              </ul>

              <p>Start enjoying your premium benefits right away! Head over to the compression tool and upload files of any size.</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
              <p>Subscription ID: ${details.subscriptionId}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendInvoiceEmail(email, firstName, details) {
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: `Invoice ${details.invoiceNumber} - Payment Received`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Payment Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .invoice-box { background: white; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { 
              display: inline-block; 
              background: #2563eb; 
              color: white; 
              padding: 12px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
            .success { color: #059669; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Payment Received \u2705</h1>
            </div>
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p class="success">Your payment has been successfully processed. Thank you for your subscription!</p>
              
              <div class="invoice-box">
                <h3>Invoice Details</h3>
                <p><strong>Invoice Number:</strong> ${details.invoiceNumber}</p>
                <p><strong>Amount Paid:</strong> ${details.amount}</p>
                <p><strong>Payment Date:</strong> ${details.paidDate.toLocaleDateString()}</p>
                <p><strong>Description:</strong> ${details.description}</p>
                <p><strong>Service Period:</strong> ${details.period.start.toLocaleDateString()} - ${details.period.end.toLocaleDateString()}</p>
              </div>

              ${details.invoiceUrl ? `
                <p style="text-align: center;">
                  <a href="${details.invoiceUrl}" class="button">View Full Invoice</a>
                </p>
              ` : ""}

              <p>This payment confirms your premium subscription for the current billing period. Your premium features remain active.</p>
              
              <p>If you have any questions about this payment or your subscription, please don't hesitate to contact our support team.</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
              <p>Invoice: ${details.invoiceNumber}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendPaymentConfirmation(email, firstName, details) {
    const isCredits = details.credits && details.credits > 0;
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: isCredits ? `\u{1F389} ${details.credits} Credits Added to Your Account!` : "Payment Confirmation - Thank You!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${isCredits ? "Credits Purchase Confirmation" : "Payment Confirmation"}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: ${isCredits ? "linear-gradient(135deg, #3b82f6, #1d4ed8)" : "#059669"}; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .payment-box { background: white; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .credits-highlight { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; }
            .credit-count { font-size: 36px; font-weight: bold; margin: 10px 0; }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
            .success { color: #059669; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${isCredits ? "\u{1F389} Credits Purchased!" : "\u2705 Payment Successful"}</h1>
            </div>
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p class="success">Your payment has been successfully processed!</p>
              
              ${isCredits ? `
                <div class="credits-highlight">
                  <h3>\u{1F680} Credits Added to Your Account</h3>
                  <div class="credit-count">${details.credits}</div>
                  <p>Credits are now available for image compression</p>
                </div>
              ` : ""}
              
              <div class="payment-box">
                <h3>Payment Details</h3>
                <p><strong>Amount:</strong> ${details.amount}</p>
                ${isCredits ? `<p><strong>Credits Purchased:</strong> ${details.credits}</p>` : ""}
                <p><strong>Payment Date:</strong> ${details.paymentDate.toLocaleDateString()}</p>
                <p><strong>Payment Method:</strong> ${details.paymentMethod}</p>
                <p><strong>Transaction ID:</strong> ${details.transactionId}</p>
              </div>

              ${isCredits ? `
                <h3>How to Use Your Credits</h3>
                <ul>
                  <li>\u{1F4A1} 1 credit = 1 MB of image processing</li>
                  <li>\u{1F4C1} Smaller files use fewer credits automatically</li>
                  <li>\u267E\uFE0F Credits never expire</li>
                  <li>\u{1F504} Use them across all our compression tools</li>
                </ul>
                
                <p>Start compressing images now with your new credits!</p>
              ` : `
                <p>Your premium subscription is now active and you can start enjoying unlimited file compression with no size restrictions.</p>
              `}
              
              <p>Thank you for choosing Micro JPEG!</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
              <p>Transaction: ${details.transactionId}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendSubscriptionCancellation(email, firstName) {
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: "Subscription Cancelled - We're Sorry to See You Go",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Subscription Cancelled</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #6b7280; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Subscription Cancelled</h1>
            </div>
            <div class="content">
              <h2>Hello ${firstName},</h2>
              <p>We're sorry to see you go! Your premium subscription has been successfully cancelled.</p>
              
              <p><strong>What happens next:</strong></p>
              <ul>
                <li>Your premium features will remain active until the end of your current billing period</li>
                <li>No future charges will be made to your payment method</li>
                <li>You can continue using the free version with 10MB file size limits</li>
                <li>You can resubscribe at any time to regain premium benefits</li>
              </ul>
              
              <p>If you cancelled by mistake or would like to provide feedback about your experience, please don't hesitate to contact our support team.</p>
              
              <p>Thank you for being a premium member. We hope to see you again in the future!</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendUsageLimitWarning(email, firstName, usagePercent, tierName) {
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: `\u26A0\uFE0F You've used ${usagePercent}% of your daily limit`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Usage Limit Warning</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .warning-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .upgrade-box { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .button { 
              display: inline-block; 
              background: #3b82f6; 
              color: white; 
              padding: 12px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 10px 0;
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>\u26A0\uFE0F Daily Limit Warning</h1>
            </div>
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p>You've used <strong>${usagePercent}%</strong> of your daily compression limit on your ${tierName} plan.</p>
              
              <div class="warning-box">
                <h3>\u23F0 Running Low on Compressions</h3>
                <p>You're approaching your daily limit. Your usage resets at midnight automatically.</p>
              </div>

              <div class="upgrade-box">
                <h3>\u{1F680} Need More Compressions?</h3>
                <p>Upgrade to Premium for 50 daily compressions + unlimited format conversions!</p>
                <a href="#" class="button">Upgrade to Premium</a>
              </div>

              <p><strong>Current Plan Benefits:</strong></p>
              <ul>
                <li>20 compressions per day (Free)</li>
                <li>3 format conversions per day</li>
                <li>Resets daily at midnight</li>
              </ul>
              
              <p>Keep compressing with confidence!</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendTierUpgradePromo(email, firstName, currentTier, suggestedTier) {
    const promoData = {
      premium: {
        features: ["50 daily compressions", "Unlimited conversions", "Advanced settings", "AI recommendations", "SVG support"],
        price: "$9.99/month",
        savings: "Save 2 months with yearly billing!"
      },
      business: {
        features: ["150 daily compressions", "All formats (TIFF, RAW)", "Priority processing", "15MB file limit"],
        price: "$29.99/month",
        savings: "Perfect for teams and businesses!"
      },
      enterprise: {
        features: ["Unlimited everything", "Full API access", "No daily limits", "24/7 support"],
        price: "$99.99/month",
        savings: "Built for developers and high-volume users!"
      }
    };
    const promo = promoData[suggestedTier] || promoData.premium;
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: `\u{1F680} Ready to upgrade to ${suggestedTier}? Special offer inside!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Upgrade Your Plan</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .upgrade-box { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 25px; border-radius: 12px; margin: 20px 0; text-align: center; }
            .feature-list { background: white; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 15px 0; }
            .button { 
              display: inline-block; 
              background: #fbbf24; 
              color: #1f2937; 
              padding: 15px 40px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 15px 0;
              font-weight: bold;
              font-size: 16px;
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
            .price { font-size: 24px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>\u{1F680} Ready for More Power?</h1>
            </div>
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p>You've been making great use of your ${currentTier} plan! Ready to unlock even more compression power?</p>
              
              <div class="upgrade-box">
                <h3>\u2728 ${suggestedTier.toUpperCase()} PLAN</h3>
                <div class="price">${promo.price}</div>
                <p>${promo.savings}</p>
                <a href="#" class="button">Upgrade Now</a>
              </div>

              <div class="feature-list">
                <h3>What you'll get with ${suggestedTier}:</h3>
                <ul>
                  ${promo.features.map((feature) => `<li>\u2705 ${feature}</li>`).join("")}
                </ul>
              </div>
              
              <p>Join thousands of users who've upgraded for unlimited compression power!</p>
              
              <p><small>Questions? Reply to this email and our team will help you choose the perfect plan.</small></p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
              <p>Don't want promotional emails? <a href="#">Unsubscribe here</a></p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendPaymentFailureNotification(email, firstName, planName, nextRetryDate) {
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: "\u26A0\uFE0F Payment Failed - Update Your Payment Method",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Payment Failed</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .warning-box { background: #fee2e2; border: 1px solid #dc2626; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .action-box { background: #3b82f6; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .button { 
              display: inline-block; 
              background: #fbbf24; 
              color: #1f2937; 
              padding: 12px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 10px 0;
              font-weight: bold;
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>\u26A0\uFE0F Payment Issue</h1>
            </div>
            <div class="content">
              <h2>Hello ${firstName},</h2>
              <p>We had trouble processing your payment for your ${planName} subscription.</p>
              
              <div class="warning-box">
                <h3>\u26A0\uFE0F Action Required</h3>
                <p>Your premium features may be suspended if payment isn't updated soon.</p>
                ${nextRetryDate ? `<p><strong>Next retry:</strong> ${nextRetryDate.toLocaleDateString()}</p>` : ""}
              </div>

              <div class="action-box">
                <h3>\u{1F527} Fix This Now</h3>
                <p>Update your payment method to keep your premium benefits active.</p>
                <a href="#" class="button">Update Payment Method</a>
              </div>

              <p><strong>Common reasons for payment failure:</strong></p>
              <ul>
                <li>Expired credit card</li>
                <li>Insufficient funds</li>
                <li>Card was declined by bank</li>
                <li>Billing address mismatch</li>
              </ul>
              
              <p>Need help? Contact our support team and we'll assist you right away.</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendDailyUsageReport(email, firstName, stats) {
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: `\u{1F4CA} Your daily compression report - ${stats.compressions} files processed`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Daily Usage Report</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .stats-box { background: white; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .stat-item { display: inline-block; text-align: center; margin: 10px 20px; }
            .stat-number { font-size: 32px; font-weight: bold; color: #3b82f6; }
            .stat-label { font-size: 14px; color: #6b7280; }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>\u{1F4CA} Daily Report</h1>
            </div>
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p>Here's your compression activity summary for today:</p>
              
              <div class="stats-box">
                <h3>Today's Activity</h3>
                <div style="text-align: center;">
                  <div class="stat-item">
                    <div class="stat-number">${stats.compressions}</div>
                    <div class="stat-label">Compressions</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-number">${stats.conversions}</div>
                    <div class="stat-label">Format Conversions</div>
                  </div>
                </div>
                <p style="text-align: center; margin-top: 20px;">
                  <strong>Plan:</strong> ${stats.planName}
                </p>
              </div>
              
              <p>Great job optimizing your images! Your usage resets at midnight for another day of compression power.</p>
              
              ${stats.planName === "Free" ? `
                <p style="background: #dbeafe; padding: 15px; border-radius: 8px;">
                  \u{1F4A1} <strong>Tip:</strong> Upgrade to Premium for 50 daily compressions and unlimited format conversions!
                </p>
              ` : ""}
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendWelcomeEmail(email, firstName) {
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: "Welcome to JPEG Compressor!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Micro JPEG</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="cid:microjpeg-logo" alt="Micro JPEG Logo" class="logo-img" />
              <div class="brand-text">microjpeg</div>
              <div class="tagline">PICTURE PERFECT</div>
              <h2 style="margin-top: 15px; font-size: 20px;">Welcome!</h2>
            </div>
            <div class="content">
              <h2>Hello${firstName ? ` ${firstName}` : ""}!</h2>
              <p>Welcome to Micro JPEG! Your email has been verified and your account is now active.</p>
              
              <p><strong>What you can do with Free tier:</strong></p>
              <ul>
                <li>\u2705 20 compressions per day</li>
                <li>\u2705 3 format conversions per day</li>
                <li>\u2705 Upload files up to 5MB each</li>
                <li>\u2705 All basic formats (JPEG, PNG, WebP, AVIF)</li>
                <li>\u2705 Daily reset at midnight</li>
              </ul>
              
              <p><strong>Want more power?</strong> Upgrade to Premium for 50 daily compressions, unlimited conversions, and advanced features for just $9.99/month!</p>
              
              <p>Start compressing your images today and experience professional-quality optimization!</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  // ===== CREDIT-SPECIFIC EMAIL NOTIFICATIONS =====
  async sendCreditLowWarning(email, firstName, remainingCredits, severity) {
    const colors = {
      warning: { bg: "#f59e0b", border: "#f59e0b", text: "\u26A0\uFE0F" },
      urgent: { bg: "#ef4444", border: "#ef4444", text: "\u{1F6A8}" },
      critical: { bg: "#dc2626", border: "#dc2626", text: "\u274C" }
    };
    const config = colors[severity];
    const subjectText = severity === "critical" ? "Out of Credits" : `${severity === "urgent" ? "Urgent" : ""} Low Credits Alert`;
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: `${config.text} ${subjectText} - ${remainingCredits} Credits Remaining`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Credit Alert</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: ${config.bg}; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .alert-box { background: white; border: 2px solid ${config.border}; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .credit-count { font-size: 48px; font-weight: bold; color: ${config.bg}; margin: 10px 0; }
            .packages-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
            .package-card { background: white; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; text-align: center; }
            .package-card.best-value { border: 2px solid #3b82f6; background: linear-gradient(135deg, #eff6ff, #dbeafe); }
            .button { 
              display: inline-block; 
              background: #3b82f6; 
              color: white; 
              padding: 12px 24px; 
              text-decoration: none; 
              border-radius: 6px; 
              margin: 10px 0;
              font-weight: bold;
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${config.text} Credit Alert</h1>
            </div>
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p>${severity === "critical" ? "You've run out of credits and cannot compress more images." : `You're running low on credits. You have ${remainingCredits} credits remaining.`}</p>
              
              <div class="alert-box">
                <h3>${severity === "critical" ? "No Credits Remaining" : "Credits Running Low"}</h3>
                <div class="credit-count">${remainingCredits}</div>
                <p>Credits left in your account</p>
              </div>

              <h3>\u{1F4B3} Buy More Credits - Instant Delivery</h3>
              <div class="packages-grid">
                <div class="package-card">
                  <h4>Starter Pack</h4>
                  <p><strong>200 Credits</strong></p>
                  <p>$5.00</p>
                  <p>2.5\xA2 per credit</p>
                </div>
                <div class="package-card best-value">
                  <h4>Popular Pack</h4>
                  <p><strong>500 Credits</strong></p>
                  <p>$9.00</p>
                  <p>1.8\xA2 per credit</p>
                  <p style="color: #3b82f6; font-weight: bold;">\u{1F48E} Best Value</p>
                </div>
                <div class="package-card">
                  <h4>Pro Pack</h4>
                  <p><strong>3000 Credits</strong></p>
                  <p>$49.00</p>
                  <p>1.6\xA2 per credit</p>
                </div>
                <div class="package-card">
                  <h4>Business Pack</h4>
                  <p><strong>15000 Credits</strong></p>
                  <p>$199.00</p>
                  <p>1.3\xA2 per credit</p>
                </div>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="/buy-credits" class="button">Buy Credits Now</a>
              </div>

              <h3>\u{1F4A1} Why Credits?</h3>
              <ul>
                <li>\u267E\uFE0F Credits never expire</li>
                <li>\u{1F4A1} 1 credit = 1 MB of processing</li>
                <li>\u{1F4C1} Smaller files use fewer credits automatically</li>
                <li>\u{1F680} Instant delivery - use credits immediately</li>
              </ul>
              
              <p>Thank you for using Micro JPEG!</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendLeadMagnetGuide(email, firstName) {
    const fromEmail = '"Micro JPEG" <compressjpg@microjpeg.com>';
    const emailContent = {
      from: fromEmail,
      to: email,
      subject: "Your Free Credits and Image Optimization Guide",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Your Free Credits + Image Optimization Guide</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 700px; margin: 0 auto; padding: 15px; }
            .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8, #7c3aed); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .logo-img { max-width: 80px; height: auto; margin-bottom: 5px; }
            .brand-text { font-size: 20px; font-weight: bold; margin: 5px 0; }
            .tagline { font-size: 12px; opacity: 0.9; margin: 0; }
            .content { background: #f9fafb; padding: 25px; }
            .credits-highlight { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .credit-count { font-size: 32px; font-weight: bold; margin: 10px 0; }
            .guide-section { background: white; border: 1px solid #e5e7eb; padding: 30px; border-radius: 8px; margin: 20px 0; }
            .guide-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .guide-column { background: #f8fafc; padding: 20px; border-radius: 6px; border-left: 4px solid #3b82f6; }
            .tip-box { background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 6px; }
            .pro-section { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 6px; }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; background: white; border-radius: 0 0 8px 8px; }
            h3 { color: #1e40af; margin-top: 0; }
            h4 { color: #374151; margin-bottom: 10px; }
            ul, ol { margin: 10px 0; padding-left: 20px; }
            li { margin: 5px 0; }
            .feature-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 15px 0; }
            .feature-item { background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 3px solid #3b82f6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="cid:microjpeg-logo" alt="Micro JPEG Logo" class="logo-img" />
              <div class="brand-text">microjpeg</div>
              <div class="tagline">PICTURE PERFECT</div>
              <h2 style="margin-top: 15px; font-size: 20px;">Welcome to Micro JPEG!</h2>
            </div>
            <div class="content">
              <h2>Hello${firstName ? ` ${firstName}` : ""}!</h2>
              <p>Welcome to our exclusive community! Here's your promised gift:</p>
              
              <div class="credits-highlight">
                <h3>1000 Free Credits Added!</h3>
                <div class="credit-count">1000</div>
                <p>Worth $25 - Ready to use immediately</p>
              </div>
              
              <div class="guide-section">
                <h3>\u{1F4DA} Complete Image Optimization Guide</h3>
                <p>Master image compression with our comprehensive guide. Save bandwidth, improve loading times, and reduce storage costs.</p>
                
                <div class="guide-grid">
                  <div class="guide-column">
                    <h4>\u{1F3AF} Quick Start Process</h4>
                    <ol>
                      <li><strong>Upload Images</strong><br>Drag & drop or browse up to 20 files</li>
                      <li><strong>Choose Settings</strong><br>Quality, format, and resize options</li>
                      <li><strong>Smart Compress</strong><br>AI-powered lossless optimization</li>
                      <li><strong>Download Results</strong><br>Individual files or batch ZIP</li>
                    </ol>
                  </div>
                  
                  <div class="guide-column">
                    <h4>\u2699\uFE0F Quality Settings</h4>
                    <ul>
                      <li><strong>High (85%)</strong><br>Professional quality, 60-70% smaller</li>
                      <li><strong>Standard (75%)</strong><br>Recommended balance, 70-80% smaller</li>
                      <li><strong>Small (60%)</strong><br>Web optimized, 80-85% smaller</li>
                      <li><strong>Tiny (45%)</strong><br>Maximum compression, 85-90% smaller</li>
                    </ul>
                  </div>
                </div>
                
                <h4>\u{1F4C1} Format Guide & When to Use Each</h4>
                <div class="feature-grid">
                  <div class="feature-item">
                    <strong>JPEG/JPG</strong><br>
                    Perfect for: Photos, complex images<br>
                    Compression: 70-90% smaller<br>
                    Best for: Photography, artwork
                  </div>
                  <div class="feature-item">
                    <strong>PNG</strong><br>
                    Perfect for: Graphics with transparency<br>
                    Compression: 50-80% smaller<br>
                    Best for: Logos, icons, screenshots
                  </div>
                  <div class="feature-item">
                    <strong>WebP</strong><br>
                    Perfect for: Modern web applications<br>
                    Compression: 80-95% smaller than JPEG<br>
                    Best for: Website images, e-commerce
                  </div>
                  <div class="feature-item">
                    <strong>AVIF</strong><br>
                    Perfect for: Next-gen web optimization<br>
                    Compression: 90-95% smaller than JPEG<br>
                    Best for: Progressive web apps, CDNs
                  </div>
                </div>
                
                <div class="tip-box">
                  <h4>\u{1F4A1} Pro Tips for Maximum Savings</h4>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                      <strong>Batch Processing:</strong><br>
                      \u2022 Upload multiple files simultaneously<br>
                      \u2022 Apply same settings to all images<br>
                      \u2022 Download as convenient ZIP archive<br>
                      \u2022 Process up to 20 images at once
                    </div>
                    <div>
                      <strong>Format Selection:</strong><br>
                      \u2022 Use WebP for 30% better compression<br>
                      \u2022 Choose AVIF for cutting-edge optimization<br>
                      \u2022 Stick with JPEG for maximum compatibility<br>
                      \u2022 Use PNG only when transparency needed
                    </div>
                  </div>
                </div>
                
                <div class="pro-section">
                  <h4>\u{1F680} Advanced Optimization Strategies</h4>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
                    <div>
                      <strong>E-commerce Optimization:</strong><br>
                      \u2022 Product photos: 75% quality JPEG<br>
                      \u2022 Thumbnails: 60% quality for fast loading<br>
                      \u2022 Hero images: WebP format for 40% savings<br>
                      \u2022 Mobile optimization: Resize to 800px width
                    </div>
                    <div>
                      <strong>Website Performance:</strong><br>
                      \u2022 Above-fold images: High priority compression<br>
                      \u2022 Background images: Aggressive compression OK<br>
                      \u2022 Gallery images: Progressive JPEG loading<br>
                      \u2022 CDN optimization: Use modern formats
                    </div>
                  </div>
                </div>
                
                <h4>\u{1F4BC} Business Impact & ROI</h4>
                <div class="feature-grid">
                  <div class="feature-item">
                    <strong>Cost Savings</strong><br>
                    Save $500+ monthly on processing<br>
                    Reduce storage costs by 80%<br>
                    Lower bandwidth expenses
                  </div>
                  <div class="feature-item">
                    <strong>Performance Gains</strong><br>
                    3x faster page loading times<br>
                    Better SEO rankings<br>
                    Improved user experience
                  </div>
                  <div class="feature-item">
                    <strong>Technical Benefits</strong><br>
                    API integration ready<br>
                    Bulk processing capabilities<br>
                    Multiple output formats
                  </div>
                  <div class="feature-item">
                    <strong>Quality Assurance</strong><br>
                    Lossless compression algorithms<br>
                    Visual quality preservation<br>
                    Professional-grade results
                  </div>
                </div>
              </div>
              
              <h3>Your Benefits</h3>
              <ul>
                <li>\u2705 1000 FREE compression credits ($25 value)</li>
                <li>\u2705 Priority email support</li>
                <li>\u2705 Early access to new features</li>
                <li>\u2705 Exclusive optimization tips</li>
              </ul>
              
              <p><strong>Start using your credits now!</strong> Head to our compression tool and begin optimizing your images.</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
              <p>Questions? Reply to this email - we're here to help!</p>
              <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb; font-size: 12px;">
                <a href="mailto:compressjpg@microjpeg.com?subject=Unsubscribe%20Request&body=Please%20unsubscribe%20${email}" 
                   style="color: #666; text-decoration: underline;">
                  Unsubscribe from future emails
                </a> | 
                <a href="mailto:compressjpg@microjpeg.com" style="color: #666; text-decoration: underline;">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendCreditPurchaseReceipt(email, firstName, details) {
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: `Receipt: ${details.credits} Credits Purchased - ${details.packageName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Credit Purchase Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .logo-img { max-width: 120px; height: auto; margin-bottom: 10px; }
            .brand-text { font-size: 24px; font-weight: bold; margin: 10px 0 5px 0; }
            .tagline { font-size: 14px; opacity: 0.9; margin-top: 5px; }
            .content { background: #f9fafb; padding: 30px; }
            .receipt-box { background: white; border: 1px solid #e5e7eb; padding: 25px; border-radius: 8px; margin: 20px 0; }
            .receipt-header { text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 15px; margin-bottom: 20px; }
            .receipt-line { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
            .receipt-total { display: flex; justify-content: space-between; padding: 15px 0; border-top: 2px solid #e5e7eb; margin-top: 15px; font-weight: bold; font-size: 18px; }
            .credits-highlight { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; }
            .credit-count { font-size: 36px; font-weight: bold; margin: 10px 0; }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="cid:microjpeg-logo" alt="Micro JPEG Logo" class="logo-img" />
              <div class="brand-text">microjpeg</div>
              <div class="tagline">PICTURE PERFECT</div>
              <h2 style="margin-top: 15px; font-size: 20px;">\u{1F4C4} Purchase Receipt</h2>
            </div>
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p>Thank you for your credit purchase! Here's your receipt:</p>
              
              <div class="credits-highlight">
                <h3>\u{1F389} Credits Added to Your Account</h3>
                <div class="credit-count">${details.credits}</div>
                <p>Ready to use for image compression</p>
              </div>
              
              <div class="receipt-box">
                <div class="receipt-header">
                  <h3>\u{1F9FE} Receipt Details</h3>
                  <p>Transaction ID: ${details.transactionId}</p>
                </div>
                
                <div class="receipt-line">
                  <span>Package:</span>
                  <span><strong>${details.packageName}</strong></span>
                </div>
                <div class="receipt-line">
                  <span>Credits:</span>
                  <span><strong>${details.credits} credits</strong></span>
                </div>
                <div class="receipt-line">
                  <span>Price per credit:</span>
                  <span>${details.pricePerCredit}</span>
                </div>
                <div class="receipt-line">
                  <span>Purchase date:</span>
                  <span>${(/* @__PURE__ */ new Date()).toLocaleDateString()}</span>
                </div>
                
                <div class="receipt-total">
                  <span>Total Paid:</span>
                  <span>${details.amount}</span>
                </div>
              </div>

              <h3>\u{1F4A1} Using Your Credits</h3>
              <ul>
                <li>\u{1F5BC}\uFE0F Credits are automatically used when compressing images</li>
                <li>\u{1F4CF} 1 credit = 1 MB of image processing</li>
                <li>\u{1F4BE} Smaller files use proportionally fewer credits</li>
                <li>\u267E\uFE0F Credits never expire - use them anytime</li>
              </ul>
              
              <p>Start compressing your images now with your new credits!</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
              <p>Receipt ID: ${details.transactionId}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendPaymentFailureForCredits(email, firstName, packageName, amount) {
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: "\u274C Credit Purchase Failed - Try Again",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Payment Failed</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; }
            .error-box { background: #fee2e2; border: 2px solid #dc2626; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .retry-box { background: #3b82f6; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .button { 
              display: inline-block; 
              background: #fbbf24; 
              color: #1f2937; 
              padding: 12px 30px; 
              text-decoration: none; 
              border-radius: 6px; 
              margin: 10px 0;
              font-weight: bold;
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>\u274C Payment Failed</h1>
            </div>
            <div class="content">
              <h2>Hello ${firstName},</h2>
              <p>We encountered an issue processing your payment for ${packageName} (${amount}).</p>
              
              <div class="error-box">
                <h3>\u26A0\uFE0F Payment Not Processed</h3>
                <p>Your credit card was not charged and no credits were added to your account.</p>
              </div>

              <div class="retry-box">
                <h3>\u{1F504} Try Again</h3>
                <p>Most payment issues are easily resolved. Try your purchase again:</p>
                <a href="/buy-credits" class="button">Retry Purchase</a>
              </div>

              <h3>\u{1F4A1} Common Solutions</h3>
              <ul>
                <li>\u{1F50D} Check your card details are correct</li>
                <li>\u{1F4B3} Ensure your card has sufficient funds</li>
                <li>\u{1F30D} Verify your card works for international payments</li>
                <li>\u{1F4DE} Contact your bank if the issue persists</li>
              </ul>
              
              <p>Need help? Reply to this email and our support team will assist you.</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  // Professional Format Section Email Methods
  async sendSpecialFormatConversionComplete(email, firstName, conversionDetails) {
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 B";
      const k = 1024;
      const sizes = ["B", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };
    const savings = ((conversionDetails.totalOriginalSize - conversionDetails.totalConvertedSize) / conversionDetails.totalOriginalSize * 100).toFixed(1);
    const baseUrl = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}` : "http://localhost:5000";
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpeg.com>',
      to: email,
      subject: `\u{1F389} Professional Format Conversion Complete - ${conversionDetails.filesProcessed} files processed`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Professional Format Conversion Complete</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { 
              background: linear-gradient(135deg, #14b8a6, #0f766e); 
              color: white; 
              padding: 30px; 
              text-align: center; 
              border-radius: 12px 12px 0 0;
            }
            .logo-container { text-align: center; margin-bottom: 15px; }
            .logo-img { max-width: 120px; height: auto; }
            .brand-text { font-size: 24px; font-weight: bold; margin: 10px 0; }
            .tagline { font-size: 14px; opacity: 0.9; }
            .content { background: #f8fafc; padding: 30px; }
            .success-box { 
              background: linear-gradient(135deg, #10b981, #059669); 
              color: white; 
              padding: 25px; 
              border-radius: 12px; 
              margin: 20px 0; 
              text-align: center; 
            }
            .stats-grid { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 15px; 
              margin: 20px 0; 
            }
            .stat-card { 
              background: white; 
              border: 1px solid #e2e8f0; 
              padding: 20px; 
              border-radius: 8px; 
              text-align: center; 
            }
            .stat-number { font-size: 24px; font-weight: bold; color: #14b8a6; }
            .stat-label { font-size: 14px; color: #64748b; margin-top: 5px; }
            .conversion-list { 
              background: white; 
              border: 1px solid #e2e8f0; 
              padding: 20px; 
              border-radius: 8px; 
              margin: 20px 0; 
            }
            .trial-warning { 
              background: #fef3c7; 
              border: 1px solid #f59e0b; 
              padding: 20px; 
              border-radius: 8px; 
              margin: 20px 0; 
              text-align: center; 
            }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #14b8a6, #0f766e); 
              color: white; 
              padding: 12px 30px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 10px 5px;
              font-weight: bold;
            }
            .button-secondary { 
              background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-container">
                ${this.logoAttachment ? '<img src="cid:microjpeg-logo" alt="Micro JPEG" class="logo-img" />' : ""}
                <div class="brand-text">Micro JPEG</div>
                <div class="tagline">Professional Format Conversions</div>
              </div>
              <h1>\u2728 Conversion Complete!</h1>
            </div>
            
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p>Great news! Your professional format conversion has been completed successfully.</p>
              
              <div class="success-box">
                <h3>\u{1F3AF} Mission Accomplished!</h3>
                <p>We've processed <strong>${conversionDetails.filesProcessed} files</strong> with our advanced conversion engine.</p>
              </div>

              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-number">${conversionDetails.filesProcessed}</div>
                  <div class="stat-label">Files Processed</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">${savings}%</div>
                  <div class="stat-label">Size Reduction</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">${formatFileSize(conversionDetails.totalOriginalSize)}</div>
                  <div class="stat-label">Original Size</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">${formatFileSize(conversionDetails.totalConvertedSize)}</div>
                  <div class="stat-label">Final Size</div>
                </div>
              </div>

              <div class="conversion-list">
                <h3>\u{1F4CB} Conversion Summary</h3>
                <p><strong>Input Formats:</strong> ${conversionDetails.originalFormats.join(", ")}</p>
                <p><strong>Output Format:</strong> ${conversionDetails.outputFormat.toUpperCase()}</p>
                <p><strong>Conversion Types:</strong> ${conversionDetails.conversionTypes.join(", ")}</p>
                <p><strong>Processing Engine:</strong> Advanced ImageMagick with professional optimizations</p>
              </div>

              ${conversionDetails.isTrialUser ? `
                <div class="trial-warning">
                  <h3>\u23F0 Trial Status</h3>
                  <p>You have <strong>${conversionDetails.trialRemaining || 0} conversions</strong> remaining in your free trial.</p>
                  <p>Upgrade to premium for unlimited professional format conversions!</p>
                  <a href="${baseUrl}/pricing" class="button">Upgrade to Premium</a>
                </div>
              ` : ""}

              <div style="text-align: center; margin: 30px 0;">
                <a href="${baseUrl}/special-formats" class="button">Convert More Files</a>
                <a href="${baseUrl}" class="button button-secondary">Standard Compression</a>
              </div>

              <p><strong>Professional Features Available:</strong></p>
              <ul>
                <li>\u{1F4F8} RAW file processing (CR2, ARW, NEF, DNG)</li>
                <li>\u{1F3A8} Vector format conversion (SVG)</li>
                <li>\u{1F5A8}\uFE0F Print-ready TIFF processing</li>
                <li>\u26A1 Advanced quality controls</li>
                <li>\u{1F527} Custom resize options</li>
              </ul>
              
              <p>Thank you for choosing Micro JPEG for your professional image processing needs!</p>
            </div>
            
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression and conversion tools.</p>
              <p>Need help? Contact our support team anytime.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendSpecialFormatTrialExhausted(email, firstName) {
    const baseUrl = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}` : "http://localhost:5000";
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpeg.com>',
      to: email,
      subject: "\u26A0\uFE0F Professional Format Trial Exhausted - Upgrade for Unlimited Access",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Professional Format Trial Exhausted</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { 
              background: linear-gradient(135deg, #f59e0b, #d97706); 
              color: white; 
              padding: 30px; 
              text-align: center; 
              border-radius: 12px 12px 0 0;
            }
            .content { background: #f8fafc; padding: 30px; }
            .trial-expired-box { 
              background: #fef3c7; 
              border: 2px solid #f59e0b; 
              padding: 25px; 
              border-radius: 12px; 
              margin: 20px 0; 
              text-align: center; 
            }
            .upgrade-box { 
              background: linear-gradient(135deg, #14b8a6, #0f766e); 
              color: white; 
              padding: 25px; 
              border-radius: 12px; 
              margin: 20px 0; 
              text-align: center; 
            }
            .features-grid { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 15px; 
              margin: 20px 0; 
            }
            .feature-card { 
              background: white; 
              border: 1px solid #e2e8f0; 
              padding: 15px; 
              border-radius: 8px; 
              text-align: center; 
            }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #14b8a6, #0f766e); 
              color: white; 
              padding: 15px 40px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 15px 0;
              font-weight: bold;
              font-size: 16px;
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>\u26A0\uFE0F Trial Limit Reached</h1>
            </div>
            
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p>You've used all 5 conversions in your professional format trial. We hope you enjoyed experiencing our advanced conversion capabilities!</p>
              
              <div class="trial-expired-box">
                <h3>\u{1F680} Ready to Go Pro?</h3>
                <p><strong>Your trial has ended, but the power doesn't have to!</strong></p>
                <p>Upgrade to premium for unlimited professional format conversions.</p>
              </div>

              <div class="upgrade-box">
                <h3>\u{1F48E} Premium Benefits</h3>
                <p>Unlock unlimited access to all professional features!</p>
                <a href="${baseUrl}/pricing" class="button" style="background: #fbbf24; color: #1f2937;">Upgrade Now</a>
              </div>

              <div class="features-grid">
                <div class="feature-card">
                  <h4>\u{1F4F8} RAW Processing</h4>
                  <p>CR2, ARW, NEF, DNG</p>
                </div>
                <div class="feature-card">
                  <h4>\u{1F3A8} Vector Conversion</h4>
                  <p>SVG to raster formats</p>
                </div>
                <div class="feature-card">
                  <h4>\u{1F5A8}\uFE0F TIFF Processing</h4>
                  <p>Print-ready optimization</p>
                </div>
                <div class="feature-card">
                  <h4>\u26A1 Advanced Controls</h4>
                  <p>Quality & resize options</p>
                </div>
              </div>

              <p><strong>What you get with Premium:</strong></p>
              <ul>
                <li>\u2705 Unlimited professional format conversions</li>
                <li>\u2705 No file size limits (vs 25MB trial limit)</li>
                <li>\u2705 Priority processing queue</li>
                <li>\u2705 Advanced quality controls</li>
                <li>\u2705 Custom resize & aspect ratio options</li>
                <li>\u2705 Batch processing capabilities</li>
                <li>\u2705 Professional customer support</li>
              </ul>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${baseUrl}/pricing" class="button">View Pricing Plans</a>
              </div>
              
              <p>You can still use our standard compression tools for JPG, PNG, WebP, and AVIF files with no limits!</p>
              
              <p>Questions about upgrading? Reply to this email and our team will help you choose the perfect plan.</p>
            </div>
            
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression and conversion tools.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  async sendSpecialFormatTrialWarning(email, firstName, usedCount, totalLimit) {
    const baseUrl = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}` : "http://localhost:5000";
    const remaining = totalLimit - usedCount;
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpeg.com>',
      to: email,
      subject: `\u26A0\uFE0F Professional Format Trial - ${remaining} conversions remaining`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Professional Format Trial Warning</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { 
              background: linear-gradient(135deg, #f59e0b, #d97706); 
              color: white; 
              padding: 30px; 
              text-align: center; 
              border-radius: 12px 12px 0 0;
            }
            .content { background: #f8fafc; padding: 30px; }
            .warning-box { 
              background: #fef3c7; 
              border: 2px solid #f59e0b; 
              padding: 25px; 
              border-radius: 12px; 
              margin: 20px 0; 
              text-align: center; 
            }
            .upgrade-box { 
              background: linear-gradient(135deg, #14b8a6, #0f766e); 
              color: white; 
              padding: 25px; 
              border-radius: 12px; 
              margin: 20px 0; 
              text-align: center; 
            }
            .progress-bar { 
              background: #e5e7eb; 
              height: 20px; 
              border-radius: 10px; 
              margin: 15px 0; 
              overflow: hidden; 
            }
            .progress-fill { 
              background: linear-gradient(135deg, #f59e0b, #d97706); 
              height: 100%; 
              width: ${usedCount / totalLimit * 100}%; 
              border-radius: 10px; 
            }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #14b8a6, #0f766e); 
              color: white; 
              padding: 15px 40px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 15px 0;
              font-weight: bold;
              font-size: 16px;
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>\u26A0\uFE0F Trial Usage Warning</h1>
            </div>
            
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p>You're getting close to your professional format conversion limit. Make the most of your remaining conversions!</p>
              
              <div class="warning-box">
                <h3>\u{1F4CA} Trial Status</h3>
                <p><strong>${usedCount} of ${totalLimit}</strong> conversions used</p>
                <div class="progress-bar">
                  <div class="progress-fill"></div>
                </div>
                <p><strong>${remaining} conversions remaining</strong></p>
              </div>

              <div class="upgrade-box">
                <h3>\u{1F680} Want Unlimited Access?</h3>
                <p>Upgrade to premium before your trial ends and get unlimited professional format conversions!</p>
                <a href="${baseUrl}/pricing" class="button" style="background: #fbbf24; color: #1f2937;">Upgrade Now</a>
              </div>

              <p><strong>What you can still do:</strong></p>
              <ul>
                <li>\u{1F4F8} Convert ${remaining} more RAW files (CR2, ARW, NEF, DNG)</li>
                <li>\u{1F3A8} Process ${remaining} more SVG vector files</li>
                <li>\u{1F5A8}\uFE0F Optimize ${remaining} more TIFF print files</li>
                <li>\u26A1 Use advanced quality controls</li>
                <li>\u{1F527} Apply custom resize options</li>
              </ul>

              <p><strong>Premium Benefits:</strong></p>
              <ul>
                <li>\u2705 Unlimited professional format conversions</li>
                <li>\u2705 No file size limits (vs 25MB trial limit)</li>
                <li>\u2705 Priority processing queue</li>
                <li>\u2705 Advanced batch processing</li>
                <li>\u2705 Professional customer support</li>
              </ul>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${baseUrl}/special-formats" class="button">Continue Converting</a>
              </div>
              
              <p>Your trial resets when you start a new browser session. You can still use our standard compression tools for JPG, PNG, WebP, and AVIF files with no limits!</p>
            </div>
            
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression and conversion tools.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    return await this.sendEmail(emailContent);
  }
  // === STANDARD FORMAT EMAIL METHODS ===
  async sendStandardCompressionComplete(email, userName = "User", stats) {
    const fromEmail = '"Micro JPEG" <compressjpg@microjpeg.com>';
    const formatBytes = (bytes) => {
      if (bytes === 0) return "0 B";
      const k = 1024;
      const sizes = ["B", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };
    const emailContent = {
      from: fromEmail,
      to: email,
      subject: `\u2705 ${stats.filesProcessed} Image${stats.filesProcessed > 1 ? "s" : ""} Compressed Successfully - ${stats.sizeSavings} Saved!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Compression Complete</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { 
              background: linear-gradient(135deg, #14b8a6, #0d9488); 
              color: white; 
              padding: 30px; 
              text-align: center; 
              border-radius: 12px 12px 0 0; 
            }
            .logo-img { max-width: 120px; height: auto; margin-bottom: 10px; }
            .brand-text { font-size: 24px; font-weight: bold; margin: 10px 0 5px 0; }
            .tagline { font-size: 14px; opacity: 0.9; margin-top: 5px; }
            .content { background: #f9fafb; padding: 30px; }
            .success-box { 
              background: linear-gradient(135deg, #10b981, #059669); 
              color: white; 
              padding: 25px; 
              border-radius: 12px; 
              margin: 20px 0; 
              text-align: center;
            }
            .stats-grid { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 15px; 
              margin: 20px 0;
            }
            .stat-item { 
              background: white; 
              padding: 20px; 
              border-radius: 8px; 
              border: 1px solid #e5e7eb;
              text-align: center;
            }
            .stat-number { 
              font-size: 24px; 
              font-weight: bold; 
              color: #14b8a6;
              margin-bottom: 5px;
            }
            .compression-bar { 
              background: #e5e7eb; 
              height: 20px; 
              border-radius: 10px; 
              overflow: hidden; 
              margin: 15px 0;
            }
            .compression-fill { 
              background: linear-gradient(135deg, #14b8a6, #0d9488); 
              height: 100%; 
              border-radius: 10px;
            }
            .file-list { 
              background: white; 
              border: 1px solid #e5e7eb; 
              border-radius: 8px; 
              padding: 20px; 
              margin: 20px 0;
            }
            .upgrade-hint { 
              background: #f0f9ff; 
              border: 1px solid #0ea5e9; 
              padding: 20px; 
              border-radius: 8px; 
              margin: 20px 0;
            }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #14b8a6, #0d9488); 
              color: white; 
              padding: 12px 25px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 10px 5px;
              font-weight: bold;
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
            @media (max-width: 600px) {
              .stats-grid { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="cid:microjpeg-logo" alt="Micro JPEG Logo" class="logo-img" />
              <div class="brand-text">microjpeg</div>
              <div class="tagline">PICTURE PERFECT COMPRESSION</div>
            </div>
            <div class="content">
              <h2>Hello ${userName}!</h2>
              
              <div class="success-box">
                <h3>\u{1F389} Compression Complete!</h3>
                <p><strong>${stats.filesProcessed} image${stats.filesProcessed > 1 ? "s" : ""} compressed successfully</strong></p>
                <p>You saved <strong>${stats.sizeSavings}</strong> in file size!</p>
              </div>

              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-number">${formatBytes(stats.totalOriginalSize)}</div>
                  <div>Original Size</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">${formatBytes(stats.totalCompressedSize)}</div>
                  <div>Compressed Size</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">${stats.averageCompressionRatio}%</div>
                  <div>Size Reduction</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">${stats.qualityLevel}%</div>
                  <div>Quality Level</div>
                </div>
              </div>

              <div>
                <h3>\u{1F4CA} Compression Performance</h3>
                <div class="compression-bar">
                  <div class="compression-fill" style="width: ${stats.averageCompressionRatio}%;"></div>
                </div>
                <p><strong>${stats.averageCompressionRatio}% smaller</strong> than original files while maintaining ${stats.qualityLevel}% quality</p>
              </div>

              ${stats.filenames.length > 0 ? `
              <div class="file-list">
                <h3>\u{1F4C1} Processed Files</h3>
                <ul>
                  ${stats.filenames.slice(0, 5).map((filename) => `<li><strong>${filename}</strong></li>`).join("")}
                  ${stats.filenames.length > 5 ? `<li><em>...and ${stats.filenames.length - 5} more files</em></li>` : ""}
                </ul>
              </div>
              ` : ""}

              <div class="upgrade-hint">
                <h3>\u{1F4A1} Need More Compression Power?</h3>
                <p><strong>Upgrade to Premium for:</strong></p>
                <ul>
                  <li>\u267E\uFE0F Unlimited daily compressions</li>
                  <li>\u{1F4C1} No file size restrictions (currently 10MB limit)</li>
                  <li>\u26A1 Priority processing speeds</li>
                  <li>\u{1F3AF} Advanced compression algorithms</li>
                  <li>\u{1F4E6} Batch ZIP downloads</li>
                </ul>
                <a href="https://micro-jpeg.replit.app/pricing" class="button">View Premium Plans</a>
              </div>
              
              <p>Thank you for using Micro JPEG! We hope you're satisfied with the compression results.</p>
              
              <p><em>Processing completed in ${stats.processingTime} seconds</em></p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
              <p>Continue compressing at <a href="https://micro-jpeg.replit.app">micro-jpeg.replit.app</a></p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    console.log(`Sending standard compression complete email to: ${email}`);
    const success = await this.sendEmail(emailContent);
    if (success) {
      console.log(`\u2713 Standard compression complete email sent successfully to ${email}`);
    } else {
      console.error(`\u2717 Failed to send standard compression complete email to ${email}`);
    }
    return success;
  }
  async sendDailyLimitWarning(email, userName = "User", usageInfo) {
    const fromEmail = '"Micro JPEG" <compressjpg@microjpeg.com>';
    const emailContent = {
      from: fromEmail,
      to: email,
      subject: `\u26A0\uFE0F Daily Limit Warning - ${usageInfo.used}/${usageInfo.limit} Compressions Used (${usageInfo.percentage}%)`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Daily Limit Warning</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { 
              background: linear-gradient(135deg, #f59e0b, #d97706); 
              color: white; 
              padding: 30px; 
              text-align: center; 
              border-radius: 12px 12px 0 0; 
            }
            .logo-img { max-width: 120px; height: auto; margin-bottom: 10px; }
            .brand-text { font-size: 24px; font-weight: bold; margin: 10px 0 5px 0; }
            .tagline { font-size: 14px; opacity: 0.9; margin-top: 5px; }
            .content { background: #f9fafb; padding: 30px; }
            .warning-box { 
              background: #fef3c7; 
              border: 2px solid #f59e0b; 
              padding: 20px; 
              border-radius: 12px; 
              margin: 20px 0;
            }
            .usage-bar { 
              background: #e5e7eb; 
              height: 25px; 
              border-radius: 12px; 
              overflow: hidden; 
              margin: 15px 0;
            }
            .usage-fill { 
              background: linear-gradient(135deg, #f59e0b, #d97706); 
              height: 100%; 
              border-radius: 12px;
              position: relative;
            }
            .usage-text { 
              position: absolute; 
              top: 50%; 
              left: 50%; 
              transform: translate(-50%, -50%); 
              color: white; 
              font-weight: bold; 
              font-size: 14px;
            }
            .upgrade-box { 
              background: linear-gradient(135deg, #14b8a6, #0d9488); 
              color: white; 
              padding: 25px; 
              border-radius: 12px; 
              margin: 25px 0; 
              text-align: center;
            }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #14b8a6, #0d9488); 
              color: white; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 15px 10px;
              font-weight: bold;
              box-shadow: 0 4px 6px rgba(20, 184, 166, 0.3);
            }
            .features-list { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 10px; 
              margin: 15px 0;
            }
            .feature-item { color: white; }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
            .countdown { 
              background: #f3f4f6; 
              padding: 15px; 
              border-radius: 8px; 
              text-align: center; 
              margin: 15px 0;
            }
            @media (max-width: 600px) {
              .features-list { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="cid:microjpeg-logo" alt="Micro JPEG Logo" class="logo-img" />
              <div class="brand-text">microjpeg</div>
              <div class="tagline">DAILY USAGE NOTIFICATION</div>
            </div>
            <div class="content">
              <h2>Hello ${userName}!</h2>
              
              <div class="warning-box">
                <h3>\u26A0\uFE0F Daily Limit Warning</h3>
                <p>You've used <strong>${usageInfo.used} out of ${usageInfo.limit}</strong> daily compressions (${usageInfo.percentage}%)</p>
                
                <div class="usage-bar">
                  <div class="usage-fill" style="width: ${usageInfo.percentage}%;">
                    <div class="usage-text">${usageInfo.used}/${usageInfo.limit}</div>
                  </div>
                </div>
                
                <p>You have <strong>${usageInfo.limit - usageInfo.used} compressions remaining</strong> today.</p>
              </div>

              <div class="countdown">
                <h3>\u23F0 Usage Resets In</h3>
                <p><strong>${usageInfo.remainingHours} hours</strong> until your daily limit refreshes</p>
              </div>

              <div class="upgrade-box">
                <h3>\u{1F680} Need Unlimited Compressions?</h3>
                <p><strong>Upgrade to Premium and get:</strong></p>
                <div class="features-list">
                  <div class="feature-item">\u267E\uFE0F Unlimited daily compressions</div>
                  <div class="feature-item">\u{1F4C1} No 10MB file size limit</div>
                  <div class="feature-item">\u26A1 Priority processing speeds</div>
                  <div class="feature-item">\u{1F3AF} Advanced compression controls</div>
                  <div class="feature-item">\u{1F4E6} Batch ZIP downloads</div>
                  <div class="feature-item">\u{1F48E} Premium format conversions</div>
                </div>
                
                <a href="https://micro-jpeg.replit.app/pricing" class="button">View Premium Plans</a>
                <a href="https://micro-jpeg.replit.app/api/login" class="button">Sign In to Upgrade</a>
              </div>

              <h3>\u{1F4A1} Ways to Optimize Usage</h3>
              <ul>
                <li><strong>Batch Process:</strong> Upload multiple images at once to save compressions</li>
                <li><strong>Optimize Settings:</strong> Use our smart quality presets for best results</li>
                <li><strong>Preview First:</strong> Use the preview feature to check results before downloading</li>
              </ul>
              
              <p>Thanks for being an active user of Micro JPEG! We hope our compression service is helping you optimize your images effectively.</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
              <p>Visit <a href="https://micro-jpeg.replit.app">micro-jpeg.replit.app</a> to continue compressing</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    console.log(`Sending daily limit warning email to: ${email}`);
    const success = await this.sendEmail(emailContent);
    if (success) {
      console.log(`\u2713 Daily limit warning email sent successfully to ${email}`);
    } else {
      console.error(`\u2717 Failed to send daily limit warning email to ${email}`);
    }
    return success;
  }
  async sendUpgradePromotion(email, userName = "User", reason) {
    const fromEmail = '"Micro JPEG" <compressjpg@microjpeg.com>';
    const reasons = {
      "file_size_limit": {
        subject: "\u{1F4C1} Upgrade for Unlimited File Sizes - No More 10MB Restrictions!",
        title: "File Too Large?",
        description: "Your file exceeded the 10MB free limit. Upgrade for unlimited file sizes!"
      },
      "daily_limit_reached": {
        subject: "\u{1F680} Daily Limit Reached - Upgrade for Unlimited Compressions!",
        title: "Need More Compressions?",
        description: "You've reached your daily compression limit. Upgrade for unlimited daily access!"
      },
      "advanced_features": {
        subject: "\u26A1 Unlock Advanced Features - Premium Compression Tools Await!",
        title: "Take Your Compression Further",
        description: "Unlock advanced compression algorithms and premium features with our Pro plan!"
      }
    };
    const currentReason = reasons[reason];
    const emailContent = {
      from: fromEmail,
      to: email,
      subject: currentReason.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Upgrade to Premium</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { 
              background: linear-gradient(135deg, #8b5cf6, #7c3aed); 
              color: white; 
              padding: 30px; 
              text-align: center; 
              border-radius: 12px 12px 0 0; 
            }
            .logo-img { max-width: 120px; height: auto; margin-bottom: 10px; }
            .brand-text { font-size: 24px; font-weight: bold; margin: 10px 0 5px 0; }
            .tagline { font-size: 14px; opacity: 0.9; margin-top: 5px; }
            .content { background: #f9fafb; padding: 30px; }
            .promo-box { 
              background: linear-gradient(135deg, #14b8a6, #0d9488); 
              color: white; 
              padding: 30px; 
              border-radius: 12px; 
              margin: 25px 0; 
              text-align: center;
            }
            .pricing-grid { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 20px; 
              margin: 25px 0;
            }
            .pricing-card { 
              background: white; 
              border: 2px solid #e5e7eb; 
              border-radius: 12px; 
              padding: 25px; 
              text-align: center;
            }
            .pricing-card.featured { 
              border-color: #14b8a6; 
              transform: scale(1.05);
            }
            .price { 
              font-size: 36px; 
              font-weight: bold; 
              color: #14b8a6;
              margin: 10px 0;
            }
            .features-list { 
              text-align: left; 
              margin: 20px 0;
            }
            .feature { 
              display: flex; 
              align-items: center; 
              margin: 8px 0;
            }
            .check { 
              color: #10b981; 
              margin-right: 10px; 
              font-weight: bold;
            }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #14b8a6, #0d9488); 
              color: white; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 15px 10px;
              font-weight: bold;
              box-shadow: 0 4px 6px rgba(20, 184, 166, 0.3);
            }
            .comparison-table { 
              background: white; 
              border: 1px solid #e5e7eb; 
              border-radius: 8px; 
              margin: 25px 0;
            }
            .comparison-row { 
              display: grid; 
              grid-template-columns: 2fr 1fr 1fr; 
              padding: 12px 20px; 
              border-bottom: 1px solid #f3f4f6;
            }
            .comparison-header { 
              background: #f9fafb; 
              font-weight: bold;
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
            @media (max-width: 600px) {
              .pricing-grid { grid-template-columns: 1fr; }
              .pricing-card.featured { transform: none; }
              .comparison-row { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="cid:microjpeg-logo" alt="Micro JPEG Logo" class="logo-img" />
              <div class="brand-text">microjpeg</div>
              <div class="tagline">UPGRADE TO PREMIUM</div>
            </div>
            <div class="content">
              <h2>Hello ${userName}!</h2>
              
              <div class="promo-box">
                <h3>\u{1F680} ${currentReason.title}</h3>
                <p>${currentReason.description}</p>
                <a href="https://micro-jpeg.replit.app/pricing" class="button">View All Plans</a>
              </div>

              <div class="pricing-grid">
                <div class="pricing-card">
                  <h3>Free Plan</h3>
                  <div class="price">$0</div>
                  <p>Great for getting started</p>
                  <div class="features-list">
                    <div class="feature"><span class="check">\u2713</span> 15 daily compressions</div>
                    <div class="feature"><span class="check">\u2713</span> 10MB file size limit</div>
                    <div class="feature"><span class="check">\u2713</span> Basic compression</div>
                    <div class="feature"><span class="check">\u2713</span> JPEG output only</div>
                  </div>
                </div>
                
                <div class="pricing-card featured">
                  <h3>Premium Plan</h3>
                  <div class="price">$9.99</div>
                  <p>per month</p>
                  <div class="features-list">
                    <div class="feature"><span class="check">\u2713</span> Unlimited compressions</div>
                    <div class="feature"><span class="check">\u2713</span> No file size limits</div>
                    <div class="feature"><span class="check">\u2713</span> Advanced compression</div>
                    <div class="feature"><span class="check">\u2713</span> Multiple output formats</div>
                    <div class="feature"><span class="check">\u2713</span> Priority processing</div>
                    <div class="feature"><span class="check">\u2713</span> Batch ZIP downloads</div>
                    <div class="feature"><span class="check">\u2713</span> 24/7 support</div>
                  </div>
                  <a href="https://micro-jpeg.replit.app/api/login" class="button">Upgrade Now</a>
                </div>
              </div>

              <div class="comparison-table">
                <div class="comparison-row comparison-header">
                  <div>Feature</div>
                  <div>Free</div>
                  <div>Premium</div>
                </div>
                <div class="comparison-row">
                  <div>Daily Compressions</div>
                  <div>15</div>
                  <div>Unlimited</div>
                </div>
                <div class="comparison-row">
                  <div>File Size Limit</div>
                  <div>10MB</div>
                  <div>No Limit</div>
                </div>
                <div class="comparison-row">
                  <div>Processing Speed</div>
                  <div>Standard</div>
                  <div>Priority</div>
                </div>
                <div class="comparison-row">
                  <div>Output Formats</div>
                  <div>JPEG</div>
                  <div>JPEG, PNG, WebP</div>
                </div>
                <div class="comparison-row">
                  <div>Batch Downloads</div>
                  <div>Individual</div>
                  <div>ZIP Archives</div>
                </div>
              </div>

              <h3>\u{1F3AF} Why Choose Premium?</h3>
              <ul>
                <li><strong>Unlimited Freedom:</strong> No daily limits or file size restrictions</li>
                <li><strong>Advanced Algorithms:</strong> Our best compression technology</li>
                <li><strong>Time Savings:</strong> Priority processing and batch operations</li>
                <li><strong>Professional Results:</strong> Multiple output formats for any use case</li>
                <li><strong>Dedicated Support:</strong> Get help when you need it</li>
              </ul>
              
              <p>Join thousands of professionals who trust Micro JPEG for their image compression needs!</p>
              
              <p style="text-align: center;">
                <a href="https://micro-jpeg.replit.app/pricing" class="button">Compare All Plans</a>
                <a href="https://micro-jpeg.replit.app/api/login" class="button">Start Free Trial</a>
              </p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
              <p>Questions? Contact us at support@microjpeg.com</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    console.log(`Sending upgrade promotion email to: ${email} (reason: ${reason})`);
    const success = await this.sendEmail(emailContent);
    if (success) {
      console.log(`\u2713 Upgrade promotion email sent successfully to ${email}`);
    } else {
      console.error(`\u2717 Failed to send upgrade promotion email to ${email}`);
    }
    return success;
  }
  /**
   * Send web credit purchase confirmation email
   */
  async sendCreditPurchaseConfirmation(email, packageName, credits, price) {
    const displayPrice = `$${(price / 100).toFixed(2)}`;
    const pricePerCredit = `$${(price / credits / 100).toFixed(4)}`;
    const emailContent = {
      from: process.env.SENDGRID_FROM_EMAIL || '"Micro JPEG" <compressjpg@microjpeg.com>',
      to: email,
      subject: `\u{1F389} ${credits} Credits Added to Your Account!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Credit Purchase Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0d9488, #0f766e); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f0fdfa; padding: 30px; border-radius: 0 0 8px 8px; }
            .credits-highlight { background: linear-gradient(135deg, #0d9488, #0f766e); color: white; padding: 25px; border-radius: 12px; text-align: center; margin: 20px 0; }
            .credit-count { font-size: 48px; font-weight: bold; margin: 15px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
            .purchase-box { background: white; border: 2px solid #5eead4; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .usage-guide { background: white; border-left: 4px solid #0d9488; padding: 20px; margin: 20px 0; }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #0d9488, #0f766e); 
              color: white; 
              padding: 12px 30px; 
              text-decoration: none; 
              border-radius: 6px; 
              margin: 10px 5px;
              font-weight: bold;
            }
            .footer { text-align: center; color: #666; font-size: 14px; padding: 20px; }
            .success { color: #059669; font-weight: bold; }
            .highlight { color: #0d9488; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>\u{1F389} Credit Purchase Successful!</h1>
            </div>
            <div class="content">
              <h2>Hello!</h2>
              <p class="success">Your credit purchase has been successfully processed and credits have been added to your account!</p>
              
              <div class="credits-highlight">
                <h3>\u2728 Credits Added to Your Account</h3>
                <div class="credit-count">${credits.toLocaleString()}</div>
                <p style="margin: 0; font-size: 18px;">Credits ready to use!</p>
              </div>
              
              <div class="purchase-box">
                <h3>\u{1F4C4} Purchase Details</h3>
                <p><strong>Package:</strong> ${packageName}</p>
                <p><strong>Credits Purchased:</strong> ${credits.toLocaleString()}</p>
                <p><strong>Amount Paid:</strong> ${displayPrice}</p>
                <p><strong>Price per Credit:</strong> ${pricePerCredit}</p>
                <p><strong>Purchase Date:</strong> ${(/* @__PURE__ */ new Date()).toLocaleDateString()}</p>
              </div>

              <div class="usage-guide">
                <h3>\u{1F4A1} How to Use Your Credits</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li><span class="highlight">1 credit</span> = Compress images up to 1MB in size</li>
                  <li><span class="highlight">Smaller files</span> use fewer credits automatically</li>
                  <li><span class="highlight">Multiple formats</span> supported: JPEG, PNG, WebP, AVIF</li>
                  <li><span class="highlight">Credits never expire</span> - use them anytime</li>
                  <li><span class="highlight">Batch processing</span> available for bulk compression</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <h3>\u{1F680} Ready to Start Compressing?</h3>
                <p>Your credits are immediately available. Start optimizing your images now!</p>
                <a href="https://micro-jpeg.replit.app/" class="button">Start Compressing Images</a>
                <a href="https://micro-jpeg.replit.app/account" class="button" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">View Account Balance</a>
              </div>

              <h3>\u{1F3AF} What You Can Do Next</h3>
              <ul>
                <li>\u{1F5BC}\uFE0F <strong>Compress Images:</strong> Upload your photos and optimize them instantly</li>
                <li>\u{1F504} <strong>Convert Formats:</strong> Change between JPEG, PNG, WebP, and AVIF</li>
                <li>\u{1F4E6} <strong>Batch Process:</strong> Handle multiple files at once</li>
                <li>\u2699\uFE0F <strong>Advanced Settings:</strong> Fine-tune quality and compression options</li>
              </ul>
              
              <p>Thank you for choosing Micro JPEG! If you have any questions, our support team is here to help.</p>
            </div>
            <div class="footer">
              <p>\xA9 2025 Micro JPEG. Professional image compression tools.</p>
              <p>Need help? Contact us at <a href="mailto:support@microjpeg.com">support@microjpeg.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    console.log(`Sending credit purchase confirmation email to: ${email} (${credits} credits, ${displayPrice})`);
    const success = await this.sendEmail(emailContent);
    if (success) {
      console.log(`\u2713 Credit purchase confirmation email sent successfully to ${email}`);
    } else {
      console.error(`\u2717 Failed to send credit purchase confirmation email to ${email}`);
    }
    return success;
  }
};
var emailService = new EmailService();

// server/routes.ts
init_schema();

// server/compressionEngine.ts
var import_sharp = __toESM(require("sharp"), 1);
var import_fs = require("fs");
var import_path = __toESM(require("path"), 1);
var import_child_process = require("child_process");
var import_util = require("util");
import_sharp.default.cache({
  memory: 512,
  // Use only 512MB cache to prevent memory pressure
  files: 50,
  // Small file cache to prevent memory issues
  items: 200
  // Small operation cache
});
import_sharp.default.concurrency(1);
import_sharp.default.simd(true);
console.log("\u{1F680} Ultra-Stable Sharp Performance: 512MB cache, 1 CPU core, SIMD enabled");
var dcraw;
try {
  if (typeof require !== "undefined") {
    dcraw = require("dcraw");
  }
} catch (error) {
  console.log("dcraw not available, RAW processing disabled");
  dcraw = null;
}
var execAsync = (0, import_util.promisify)(import_child_process.exec);
var CompressionEngine = class _CompressionEngine {
  /**
   * Process RAW files using dcraw.js - industry standard RAW processor
   */
  static async processRawWithDcraw(inputPath, outputPath, outputFormat, options = {}) {
    const { quality = 75, width, height } = options;
    try {
      if (!dcraw) {
        throw new Error("dcraw not available in this environment");
      }
      console.log(`Processing RAW file with dcraw: ${inputPath} -> ${outputPath}`);
      const rawBuffer = await import_fs.promises.readFile(inputPath);
      let dcrawOptions = {
        exportAsTiff: true,
        use16BitLinearMode: false,
        // Use 8-bit for better compression
        useExportMode: true,
        verbose: false
      };
      if (outputFormat.toLowerCase() === "dng") {
        dcrawOptions = {
          exportAsTiff: true,
          use16BitLinearMode: true,
          // Preserve bit depth for RAW
          useExportMode: true,
          noAutoBrightness: true,
          // Preserve original exposure
          verbose: false
        };
      }
      const result = dcraw(rawBuffer, dcrawOptions);
      if (!result || result.length === 0) {
        throw new Error("dcraw processing returned empty result");
      }
      console.log(`dcraw processed ${rawBuffer.length} bytes -> ${result.length} bytes`);
      let sharpInstance = (0, import_sharp.default)(result);
      if (width || height) {
        sharpInstance = sharpInstance.resize(width, height, {
          fit: "inside",
          withoutEnlargement: true
        });
      }
      switch (outputFormat.toLowerCase()) {
        case "jpeg":
        case "jpg":
          await sharpInstance.jpeg({
            quality,
            progressive: false,
            // Disable progressive for speed
            mozjpeg: false,
            // Disable mozjpeg for speed
            optimiseCoding: false,
            // Disable optimization for speed
            trellisQuantisation: false
            // Disable trellis for speed
          }).toFile(outputPath);
          break;
        case "png":
          await sharpInstance.png({ quality, compressionLevel: 6, progressive: true }).toFile(outputPath);
          break;
        case "webp":
          await sharpInstance.webp({ quality, effort: 4 }).toFile(outputPath);
          break;
        case "avif":
          await sharpInstance.avif({ quality, effort: 4 }).toFile(outputPath);
          break;
        case "tiff":
          await sharpInstance.tiff({ quality, compression: "lzw" }).toFile(outputPath);
          break;
        case "dng":
          await sharpInstance.tiff({ quality: Math.max(quality, 85), compression: "lzw" }).toFile(outputPath);
          break;
        default:
          await sharpInstance.jpeg({
            quality,
            progressive: false,
            // Disable progressive for speed
            optimiseCoding: false,
            // Disable optimization for speed
            trellisQuantisation: false
            // Disable trellis for speed
          }).toFile(outputPath);
      }
      console.log(`Successfully processed RAW file to ${outputFormat.toUpperCase()}`);
    } catch (error) {
      console.error(`dcraw processing failed:`, error);
      throw new Error(`RAW processing failed: ${error.message}`);
    }
  }
  /**
   * Check if dcraw can handle the RAW format
   */
  static async canDcrawProcess(filePath) {
    try {
      if (!dcraw) {
        return false;
      }
      const rawBuffer = await import_fs.promises.readFile(filePath);
      const metadata = dcraw(rawBuffer, { verbose: true, identify: true });
      return metadata && metadata.length > 0 && !metadata.includes("not a raw file");
    } catch (error) {
      console.error(`dcraw identify failed: ${error.message}`);
      return false;
    }
  }
  /**
   * Process RAW files using ImageMagick as a fallback
   */
  static async processRawWithImageMagick(inputPath, outputPath, outputFormat, options = {}) {
    const { quality = 80, width, height, useUncompressed = false } = options;
    console.log(`ImageMagick processing with quality: ${quality}${useUncompressed ? " (uncompressed)" : ""}`);
    let magickCmd = `magick "${inputPath}"`;
    if (width && height) {
      magickCmd += ` -resize ${width}x${height}`;
    } else if (width) {
      magickCmd += ` -resize ${width}x`;
    } else if (height) {
      magickCmd += ` -resize x${height}`;
    }
    switch (outputFormat.toLowerCase()) {
      case "jpeg":
      case "jpg":
        magickCmd += ` -quality ${quality} -strip -sampling-factor 4:2:0`;
        break;
      case "png":
        magickCmd += ` -quality ${quality} -strip -define png:compression-level=6`;
        break;
      case "webp":
        magickCmd += ` -quality ${quality} -define webp:method=4`;
        break;
      case "avif":
        magickCmd += ` -quality ${quality}`;
        break;
      case "tiff":
        if (useUncompressed) {
          magickCmd += ` -compress none`;
        } else {
          magickCmd += ` -quality ${quality} -compress jpeg`;
        }
        break;
    }
    magickCmd += ` "${outputPath}"`;
    console.log(`ImageMagick command: ${magickCmd}`);
    try {
      const { stdout, stderr } = await execAsync(magickCmd);
      if (stderr && !stderr.includes("consider using the `magick` tool")) {
        console.warn("ImageMagick stderr:", stderr);
      }
    } catch (error) {
      throw new Error(`ImageMagick processing failed: ${error.message}`);
    }
  }
  /**
   * Check if ImageMagick can handle the file format
   */
  static async canImageMagickProcess(filePath) {
    try {
      console.log(`Testing ImageMagick identify on: ${filePath}`);
      const { stdout, stderr } = await execAsync(`magick identify "${filePath}"`);
      console.log(`ImageMagick identify stdout: ${stdout}`);
      console.log(`ImageMagick identify stderr: ${stderr}`);
      return stdout.length > 0 && !stdout.includes("no decode delegate");
    } catch (error) {
      console.error(`ImageMagick identify failed: ${error.message}`);
      return false;
    }
  }
  /**
   * Analyze image and provide compression recommendations
   */
  static async analyzeImage(imagePath) {
    const sharpInstance = (0, import_sharp.default)(imagePath);
    const metadata = await sharpInstance.metadata();
    const stats = await import_fs.promises.stat(imagePath);
    const originalSize = stats.size;
    const { width = 0, height = 0, channels = 3, space = "srgb", hasAlpha = false } = metadata;
    let recommendedQuality = 75;
    const pixelCount = width * height;
    if (pixelCount > 2e6) {
      recommendedQuality = 70;
    } else if (pixelCount > 5e5) {
      recommendedQuality = 75;
    } else {
      recommendedQuality = 80;
    }
    if (channels >= 3 && !hasAlpha) {
      recommendedQuality += 5;
    }
    const estimatedCompressedSize = Math.round(originalSize * (recommendedQuality / 100) * 0.3);
    const compressionRatio = (originalSize - estimatedCompressedSize) / originalSize;
    let compressionEfficiency = "good";
    if (compressionRatio > 0.7) compressionEfficiency = "excellent";
    else if (compressionRatio > 0.5) compressionEfficiency = "good";
    else if (compressionRatio > 0.3) compressionEfficiency = "fair";
    else compressionEfficiency = "poor";
    const optimizationSuggestions = [];
    if (width > 2e3 || height > 2e3) {
      optimizationSuggestions.push("Consider resizing for web use (max 1920px width)");
    }
    if (originalSize > 1024 * 1024) {
      optimizationSuggestions.push("Image is large - progressive JPEG recommended");
    }
    if (hasAlpha) {
      optimizationSuggestions.push("Consider PNG or WebP for images with transparency");
    }
    if (space !== "srgb") {
      optimizationSuggestions.push("Convert to sRGB color space for web compatibility");
    }
    if (recommendedQuality < 70) {
      optimizationSuggestions.push("High resolution detected - can use aggressive compression");
    }
    return {
      originalSize,
      estimatedCompressedSize,
      recommendedQuality,
      compressionEfficiency,
      optimizationSuggestions,
      colorSpaceInfo: {
        hasAlpha,
        colorSpace: space || "unknown",
        channels
      }
    };
  }
  /**
   * Advanced compression with target file size
   */
  static async compressToTargetSize(inputPath, outputPath, targetSize, options = {}) {
    const { maxQuality = 95, minQuality = 10, webOptimized = true } = options;
    let currentQuality = 75;
    let iterations = 0;
    const maxIterations = 4;
    while (iterations < maxIterations) {
      iterations++;
      let sharpInstance = (0, import_sharp.default)(inputPath, {
        sequentialRead: true,
        // Faster for large files
        limitInputPixels: false,
        // Remove pixel limit
        density: 72
        // Optimized density
      });
      sharpInstance = sharpInstance.jpeg({
        quality: currentQuality,
        progressive: false,
        // Disabled for speed
        mozjpeg: false,
        // Disabled for speed - was slower
        optimiseScans: false,
        // Disabled for speed
        overshootDeringing: false,
        // Disabled for speed
        trellisQuantisation: false
        // Disabled for speed
      });
      const tempPath = `${outputPath}.temp`;
      await sharpInstance.toFile(tempPath);
      const stats2 = await import_fs.promises.stat(tempPath);
      const currentSize = stats2.size;
      console.log(`Iteration ${iterations}: Quality ${currentQuality}% = ${currentSize} bytes (target: ${targetSize})`);
      if (Math.abs(currentSize - targetSize) / targetSize < 0.1) {
        await import_fs.promises.rename(tempPath, outputPath);
        return { finalSize: currentSize, qualityUsed: currentQuality, iterations };
      }
      if (currentSize > targetSize) {
        const reductionFactor = Math.min(0.9, Math.sqrt(targetSize / currentSize));
        currentQuality = Math.max(minQuality, Math.round(currentQuality * reductionFactor));
      } else {
        const increaseFactor = Math.min(1.1, Math.sqrt(targetSize / currentSize));
        currentQuality = Math.min(maxQuality, Math.round(currentQuality * increaseFactor));
      }
      try {
        await import_fs.promises.unlink(tempPath);
      } catch (error) {
      }
      if (iterations > 1 && Math.abs(currentSize - targetSize) / targetSize < 0.15) {
        await import_fs.promises.rename(tempPath, outputPath);
        return { finalSize: currentSize, qualityUsed: currentQuality, iterations };
      }
    }
    const stats = await import_fs.promises.stat(`${outputPath}.temp`);
    await import_fs.promises.rename(`${outputPath}.temp`, outputPath);
    return {
      finalSize: stats.size,
      qualityUsed: currentQuality,
      iterations
    };
  }
  /**
   * Enhanced compression with advanced settings and timeout
   */
  static async compressWithAdvancedSettings(inputPath, outputPath, quality, outputFormat, options = {}, timeoutMs = 12e4, originalFilename) {
    const {
      compressionAlgorithm = "standard",
      resizeQuality = "lanczos",
      progressive = false,
      optimizeScans = false,
      arithmeticCoding = false,
      webOptimized = true
    } = options;
    const filenameToCheck = originalFilename || inputPath;
    const pathParts = filenameToCheck.toLowerCase().split(".");
    const inputExtension = pathParts.length > 1 ? pathParts[pathParts.length - 1] : "";
    const isRawFormat = ["dng", "cr2", "arw", "nef", "orf", "raf", "rw2"].includes(inputExtension);
    console.log(`Compression input: ${inputPath}, Extension: ${inputExtension}, Is RAW: ${isRawFormat}, Output format: ${outputFormat}`);
    if (isRawFormat) {
      console.log(`Processing RAW file ${inputExtension?.toUpperCase()} with ImageMagick...`);
      try {
        const canProcess = await _CompressionEngine.canImageMagickProcess(inputPath);
        if (!canProcess) {
          throw new Error(`\u274C RAW format ${inputExtension?.toUpperCase()} processing is currently unavailable. RAW file support requires additional system components that are not installed. Please convert your RAW file to JPEG, PNG, or WEBP format first using your camera's software or photo editing tools, then upload the converted file for compression.`);
        }
        console.log(`RAW file detected: ${inputExtension?.toUpperCase()}, performing two-stage compression...`);
        const tempUncompressedPath = `${outputPath}.temp.tiff`;
        await _CompressionEngine.processRawWithImageMagick(
          inputPath,
          tempUncompressedPath,
          "tiff",
          { quality: 100, useUncompressed: true }
          // Uncompressed for baseline
        );
        const adjustedQuality = Math.min(95, Math.max(quality || 85, 75));
        console.log(`Two-stage compression: RAW -> uncompressed TIFF -> ${outputFormat} at ${adjustedQuality}% quality`);
        const resizeOptions = {
          quality: adjustedQuality
        };
        await _CompressionEngine.processRawWithImageMagick(
          tempUncompressedPath,
          outputPath,
          outputFormat,
          resizeOptions
        );
        const tempStats = await import_fs.promises.stat(tempUncompressedPath);
        await import_fs.promises.unlink(tempUncompressedPath);
        console.log(`RAW compression baseline: Original ${inputPath} -> Uncompressed: ${tempStats.size} bytes`);
        const outputStats = await import_fs.promises.stat(outputPath);
        return {
          finalSize: outputStats.size,
          qualityUsed: adjustedQuality,
          baselineSize: tempStats.size
          // Use uncompressed TIFF size as baseline for ratio calculation
        };
      } catch (error) {
        throw new Error(`Failed to process RAW ${inputExtension?.toUpperCase()} file: ${error.message}`);
      }
    }
    let sharpInstance;
    try {
      sharpInstance = (0, import_sharp.default)(inputPath, {
        sequentialRead: true,
        // Faster for large files
        limitInputPixels: false,
        // Remove pixel limit
        density: 72,
        // Optimized density
        failOnError: false
        // Don't fail on minor errors
      });
      sharpInstance = sharpInstance.timeout({ seconds: 30 });
    } catch (error) {
      throw new Error(`Failed to process ${inputExtension?.toUpperCase()} file: ${error.message}`);
    }
    const resizeKernel = this.getResizeKernel(resizeQuality);
    if (resizeKernel) {
      sharpInstance = sharpInstance.resize({ kernel: resizeKernel });
    }
    if (webOptimized) {
      try {
        sharpInstance = sharpInstance.rotate();
      } catch (error) {
        console.warn("Web optimization rotate failed, continuing without it:", error.message);
      }
    }
    switch (outputFormat) {
      case "jpeg":
        sharpInstance = this.applyJpegSettings(sharpInstance, quality, compressionAlgorithm, progressive, optimizeScans, arithmeticCoding);
        break;
      case "webp":
        sharpInstance = this.applyWebpSettings(sharpInstance, quality, compressionAlgorithm);
        break;
      case "avif":
        sharpInstance = this.applyAvifSettings(sharpInstance, quality, compressionAlgorithm);
        break;
      case "png":
        sharpInstance = sharpInstance.png({
          palette: true,
          colours: 128,
          // Reduce colors for smaller file size when converting
          compressionLevel: 6,
          // Balanced compression for speed
          effort: 4
          // Low effort for faster processing
        });
        break;
      case "tiff":
        const tiffCompression = options.tiffCompression || "lzw";
        const tiffPredictor = options.tiffPredictor || "horizontal";
        console.log(`\u{1F5BC}\uFE0F TIFF compression: inputPath=${inputPath}, outputPath=${outputPath}, algorithm=${tiffCompression}, quality=${quality}, predictor=${tiffPredictor}`);
        sharpInstance = sharpInstance.tiff({
          compression: tiffCompression,
          quality: tiffCompression === "jpeg" ? quality : void 0,
          // Quality only applies to JPEG compression within TIFF
          predictor: tiffPredictor,
          // Additional TIFF options for better control
          pyramid: false,
          // Set to true for multi-resolution TIFF
          tile: false,
          // Set to true for tiled TIFF (better for large images)
          tileWidth: 256,
          tileHeight: 256,
          xres: 72,
          // Resolution in DPI
          yres: 72
        });
        break;
    }
    const compressionPromise = sharpInstance.toFile(outputPath);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`Compression timeout after ${timeoutMs}ms`)), timeoutMs);
    });
    await Promise.race([compressionPromise, timeoutPromise]);
    const stats = await import_fs.promises.stat(outputPath);
    if (outputFormat === "tiff") {
      console.log(`\u2705 TIFF compression completed: outputPath=${outputPath}, finalSize=${stats.size} bytes, quality=${quality}`);
    }
    return { finalSize: stats.size, qualityUsed: quality };
  }
  /**
   * Get Sharp resize kernel based on quality setting
   */
  static getResizeKernel(resizeQuality) {
    switch (resizeQuality) {
      case "lanczos":
        return "lanczos3";
      case "bicubic":
        return "cubic";
      case "bilinear":
        return "mitchell";
      case "nearest":
        return "nearest";
      default:
        return void 0;
    }
  }
  /**
   * Apply JPEG-specific compression settings
   */
  static applyJpegSettings(sharpInstance, quality, algorithm, progressive, optimizeScans, arithmeticCoding) {
    const jpegOptions = {
      quality,
      progressive,
      optimiseScans: optimizeScans
    };
    switch (algorithm) {
      case "aggressive":
        return sharpInstance.jpeg({
          ...jpegOptions,
          quality: Math.max(quality - 10, 10),
          // More aggressive compression
          optimiseScans: true,
          overshootDeringing: false
        });
      case "lossless":
        return sharpInstance.jpeg({
          ...jpegOptions,
          quality: 100,
          progressive: false
        });
      case "mozjpeg":
        return sharpInstance.jpeg({
          ...jpegOptions,
          mozjpeg: true,
          optimiseScans: true
        });
      case "progressive":
        return sharpInstance.jpeg({
          ...jpegOptions,
          progressive: true,
          optimiseScans: true
        });
      default:
        return sharpInstance.jpeg(jpegOptions);
    }
  }
  /**
   * Apply WebP-specific compression settings
   */
  static applyWebpSettings(sharpInstance, quality, algorithm) {
    const webpOptions = { quality };
    switch (algorithm) {
      case "aggressive":
        return sharpInstance.webp({
          ...webpOptions,
          quality: Math.max(quality - 5, 10),
          effort: 6,
          // Higher compression effort
          nearLossless: false
        });
      case "lossless":
        return sharpInstance.webp({
          lossless: true,
          nearLossless: false
        });
      default:
        return sharpInstance.webp(webpOptions);
    }
  }
  /**
   * Apply AVIF-specific compression settings
   */
  static applyAvifSettings(sharpInstance, quality, algorithm) {
    const avifOptions = {
      quality,
      effort: 3
      // Fast compression (1=fastest, 9=slowest) - reduced from default
    };
    switch (algorithm) {
      case "aggressive":
        return sharpInstance.avif({
          ...avifOptions,
          quality: Math.max(quality - 5, 10),
          effort: 2,
          // Very fast compression for aggressive mode
          lossless: false
        });
      case "lossless":
        return sharpInstance.avif({
          lossless: true,
          effort: 1
          // Fastest possible for lossless
        });
      default:
        return sharpInstance.avif(avifOptions);
    }
  }
  /**
   * Apply PNG-specific compression settings
   */
  static applyPngSettings(sharpInstance, algorithm) {
    switch (algorithm) {
      case "aggressive":
        return sharpInstance.png({
          compressionLevel: 6,
          // Balanced compression for speed
          palette: true,
          colours: 64
          // Aggressively reduce colors for smaller files
        });
      case "lossless":
        return sharpInstance.png({
          compressionLevel: 3,
          // Very low compression for speed
          palette: false
          // No palette for true lossless
        });
      default:
        return sharpInstance.png({
          compressionLevel: 4,
          // Low compression for speed
          palette: true,
          colours: 128
          // Moderate color reduction
        });
    }
  }
  /**
   * Generate multiple responsive image sizes
   */
  static async generateResponsiveSizes(inputPath, outputDir, baseName, options) {
    const results = [];
    for (const width of options.sizes) {
      const outputPath = import_path.default.join(outputDir, `${baseName}-${width}w.${options.format === "jpeg" ? "jpg" : options.format}`);
      let sharpInstance = (0, import_sharp.default)(inputPath, {
        sequentialRead: true,
        // Faster for large files
        limitInputPixels: false,
        // Remove pixel limit
        density: 72
        // Optimized density
      });
      sharpInstance = sharpInstance.resize(width, null, {
        kernel: import_sharp.default.kernel.lanczos3,
        withoutEnlargement: true
      });
      switch (options.format) {
        case "webp":
          sharpInstance = sharpInstance.webp({
            quality: options.quality,
            effort: 6,
            smartSubsample: true
          });
          break;
        case "avif":
          sharpInstance = sharpInstance.avif({
            quality: options.quality,
            effort: 3
            // Fast compression for responsive images
          });
          break;
        default:
          sharpInstance = sharpInstance.jpeg({
            quality: options.quality,
            progressive: true,
            mozjpeg: true,
            optimiseScans: true
          });
      }
      await sharpInstance.toFile(outputPath);
      const stats = await import_fs.promises.stat(outputPath);
      results.push({
        width,
        path: outputPath,
        size: stats.size
      });
    }
    return results;
  }
  /**
   * Optimize color space for web
   */
  static async optimizeColorSpace(sharpInstance, webOptimized) {
    if (!webOptimized) return sharpInstance;
    return sharpInstance.toColorspace("srgb").removeAlpha().normalize();
  }
  /**
   * Calculate optimal progressive scan script
   */
  static getProgressiveScanScript(quality, imageSize) {
    const { width, height } = imageSize;
    const pixelCount = width * height;
    if (pixelCount > 1e6 || quality < 70) {
      return "progressive-optimized";
    } else if (pixelCount > 5e5) {
      return "progressive-standard";
    } else {
      return "baseline";
    }
  }
};
var compressionEngine_default = CompressionEngine;

// server/fileCacheService.ts
var FileCacheService = class {
  cache = {};
  CACHE_DURATION = 30 * 60 * 1e3;
  // 30 minutes
  MAX_CACHE_SIZE = 100;
  // Maximum number of cached files
  // Clean up expired files periodically
  constructor() {
    setInterval(() => this.cleanupExpiredFiles(), 5 * 60 * 1e3);
  }
  /**
   * Store a file in cache and return cache ID
   */
  cacheFile(file, sessionId) {
    const fileId = this.generateFileId(file, sessionId);
    this.cache[fileId] = {
      originalPath: file.path,
      originalName: file.filename || file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      uploadedAt: /* @__PURE__ */ new Date(),
      sessionId,
      fileHash: this.generateFileHash(file)
    };
    if (Object.keys(this.cache).length > this.MAX_CACHE_SIZE) {
      this.cleanupOldestFiles();
    }
    console.log(`\u{1F4C1} Cached file: ${file.originalname} as ${fileId}`);
    return fileId;
  }
  /**
   * Get cached file information
   */
  getCachedFile(fileId) {
    const cached = this.cache[fileId];
    if (!cached) return null;
    if (Date.now() - cached.uploadedAt.getTime() > this.CACHE_DURATION) {
      delete this.cache[fileId];
      return null;
    }
    return cached;
  }
  /**
   * Get all cached files for a session
   */
  getSessionFiles(sessionId) {
    const sessionFiles = {};
    for (const [fileId, cached] of Object.entries(this.cache)) {
      if (cached.sessionId === sessionId && Date.now() - cached.uploadedAt.getTime() <= this.CACHE_DURATION) {
        sessionFiles[fileId] = cached;
      }
    }
    return sessionFiles;
  }
  /**
   * Generate unique file ID based on content and session
   */
  generateFileId(file, sessionId) {
    const timestamp2 = Date.now();
    const hash = this.generateFileHash(file);
    return `${sessionId}_${hash}_${timestamp2}`;
  }
  /**
   * Generate file hash for deduplication
   */
  generateFileHash(file) {
    return `${file.originalname}_${file.size}_${file.mimetype}`.replace(/[^a-zA-Z0-9]/g, "_");
  }
  /**
   * Clean up expired files
   */
  cleanupExpiredFiles() {
    const now = Date.now();
    let removedCount = 0;
    for (const [fileId, cached] of Object.entries(this.cache)) {
      if (now - cached.uploadedAt.getTime() > this.CACHE_DURATION) {
        delete this.cache[fileId];
        removedCount++;
      }
    }
    if (removedCount > 0) {
      console.log(`\u{1F9F9} Cleaned up ${removedCount} expired cached files`);
    }
  }
  /**
   * Clean up oldest files when cache is full
   */
  cleanupOldestFiles() {
    const entries = Object.entries(this.cache).sort(([, a], [, b]) => a.uploadedAt.getTime() - b.uploadedAt.getTime());
    const removeCount = Math.floor(entries.length * 0.2);
    for (let i = 0; i < removeCount; i++) {
      delete this.cache[entries[i][0]];
    }
    console.log(`\u{1F9F9} Removed ${removeCount} oldest cached files to free space`);
  }
  /**
   * Clear all cached files for a session
   */
  clearSession(sessionId) {
    let removedCount = 0;
    for (const [fileId, cached] of Object.entries(this.cache)) {
      if (cached.sessionId === sessionId) {
        delete this.cache[fileId];
        removedCount++;
      }
    }
    console.log(`\u{1F5D1}\uFE0F Cleared ${removedCount} cached files for session ${sessionId}`);
  }
  /**
   * Get cache statistics
   */
  getStats() {
    return {
      totalFiles: Object.keys(this.cache).length,
      totalSize: Object.values(this.cache).reduce((sum, file) => sum + file.size, 0),
      oldestFile: Math.min(...Object.values(this.cache).map((f) => f.uploadedAt.getTime())),
      newestFile: Math.max(...Object.values(this.cache).map((f) => f.uploadedAt.getTime()))
    };
  }
};
var fileCacheService = new FileCacheService();

// server/routes.ts
init_db();
var import_drizzle_orm9 = require("drizzle-orm");

// server/qualityAssessment.ts
var import_sharp2 = __toESM(require("sharp"), 1);
async function calculatePSNR(originalPath, compressedPath) {
  try {
    const [originalBuffer, compressedBuffer] = await Promise.all([
      (0, import_sharp2.default)(originalPath).removeAlpha().raw().toBuffer({ resolveWithObject: true }),
      (0, import_sharp2.default)(compressedPath).removeAlpha().raw().toBuffer({ resolveWithObject: true })
    ]);
    const original = originalBuffer.data;
    const compressed = compressedBuffer.data;
    if (original.length !== compressed.length) {
      throw new Error("Image dimensions do not match for PSNR calculation");
    }
    let mse = 0;
    for (let i = 0; i < original.length; i++) {
      const diff = original[i] - compressed[i];
      mse += diff * diff;
    }
    mse /= original.length;
    if (mse === 0) {
      return 100;
    }
    const maxPixelValue = 255;
    const psnr = 20 * Math.log10(maxPixelValue / Math.sqrt(mse));
    return Math.min(Math.max(psnr, 0), 100);
  } catch (error) {
    console.error("Error calculating PSNR:", error);
    return 0;
  }
}
async function calculateSSIM(originalPath, compressedPath) {
  try {
    const [originalBuffer, compressedBuffer] = await Promise.all([
      (0, import_sharp2.default)(originalPath).greyscale().removeAlpha().raw().toBuffer({ resolveWithObject: true }),
      (0, import_sharp2.default)(compressedPath).greyscale().removeAlpha().raw().toBuffer({ resolveWithObject: true })
    ]);
    const { data: original, info: originalInfo } = originalBuffer;
    const { data: compressed, info: compressedInfo } = compressedBuffer;
    if (original.length !== compressed.length) {
      throw new Error("Image dimensions do not match for SSIM calculation");
    }
    const windowSize = Math.min(8, Math.floor(Math.sqrt(original.length / 100)));
    const width = originalInfo.width;
    const height = originalInfo.height;
    let ssimSum = 0;
    let windowCount = 0;
    for (let y = 0; y < height - windowSize; y += windowSize) {
      for (let x = 0; x < width - windowSize; x += windowSize) {
        const ssimWindow = calculateWindowSSIM(original, compressed, x, y, windowSize, width);
        ssimSum += ssimWindow;
        windowCount++;
      }
    }
    const avgSSIM = windowCount > 0 ? ssimSum / windowCount : 0;
    return Math.min(Math.max(avgSSIM, 0), 1);
  } catch (error) {
    console.error("Error calculating SSIM:", error);
    return 0;
  }
}
function calculateWindowSSIM(original, compressed, startX, startY, windowSize, width) {
  const pixels = windowSize * windowSize;
  let sumOriginal = 0;
  let sumCompressed = 0;
  let sumOriginalSq = 0;
  let sumCompressedSq = 0;
  let sumProduct = 0;
  for (let dy = 0; dy < windowSize; dy++) {
    for (let dx = 0; dx < windowSize; dx++) {
      const idx = (startY + dy) * width + (startX + dx);
      const origPixel = original[idx];
      const compPixel = compressed[idx];
      sumOriginal += origPixel;
      sumCompressed += compPixel;
      sumOriginalSq += origPixel * origPixel;
      sumCompressedSq += compPixel * compPixel;
      sumProduct += origPixel * compPixel;
    }
  }
  const meanOriginal = sumOriginal / pixels;
  const meanCompressed = sumCompressed / pixels;
  const varianceOriginal = sumOriginalSq / pixels - meanOriginal * meanOriginal;
  const varianceCompressed = sumCompressedSq / pixels - meanCompressed * meanCompressed;
  const covariance = sumProduct / pixels - meanOriginal * meanCompressed;
  const c1 = (0.01 * 255) ** 2;
  const c2 = (0.03 * 255) ** 2;
  const numerator = (2 * meanOriginal * meanCompressed + c1) * (2 * covariance + c2);
  const denominator = (meanOriginal ** 2 + meanCompressed ** 2 + c1) * (varianceOriginal + varianceCompressed + c2);
  return denominator === 0 ? 1 : numerator / denominator;
}
async function calculateQualityMetrics(originalPath, compressedPath) {
  try {
    const [psnr, ssim] = await Promise.all([
      calculatePSNR(originalPath, compressedPath),
      calculateSSIM(originalPath, compressedPath)
    ]);
    const psnrWeight = 0.6;
    const ssimWeight = 0.4;
    const normalizedPSNR = Math.min(Math.max((psnr - 20) / 30 * 100, 0), 100);
    const normalizedSSIM = ssim * 100;
    const qualityScore = Math.round(
      psnrWeight * normalizedPSNR + ssimWeight * normalizedSSIM
    );
    let qualityGrade;
    if (qualityScore >= 85) {
      qualityGrade = "excellent";
    } else if (qualityScore >= 70) {
      qualityGrade = "good";
    } else if (qualityScore >= 50) {
      qualityGrade = "fair";
    } else {
      qualityGrade = "poor";
    }
    return {
      psnr: Math.round(psnr * 100) / 100,
      // Store with 2 decimal precision
      ssim: Math.round(ssim * 1e4) / 100,
      // Store as percentage with 2 decimal precision
      qualityScore,
      qualityGrade
    };
  } catch (error) {
    console.error("Error calculating quality metrics:", error);
    return {
      psnr: 0,
      ssim: 0,
      qualityScore: 0,
      qualityGrade: "poor"
    };
  }
}

// server/compressionUtils.ts
var import_path2 = __toESM(require("path"), 1);
async function compressToTargetSize(jobId, file, targetSize, options) {
  try {
    console.log(`Starting target size compression for job ${jobId}: ${targetSize} bytes`);
    await storage.updateCompressionJob(jobId, { status: "processing" });
    const outputPath = import_path2.default.join("compressed", `${jobId}.jpg`);
    const result = await compressionEngine_default.compressToTargetSize(
      file.path,
      outputPath,
      targetSize,
      {
        maxQuality: options.maxQuality,
        minQuality: options.minQuality,
        webOptimized: false
        // Disabled for speed - was causing overhead
      }
    );
    const compressionRatio = Math.round((file.size - result.finalSize) / file.size * 100);
    console.log(`Target size compression completed: ${result.finalSize} bytes (${result.qualityUsed}% quality, ${result.iterations} iterations)`);
    await storage.updateCompressionJob(jobId, {
      status: "completed",
      compressedSize: result.finalSize,
      compressionRatio,
      compressedPath: outputPath
    });
    setTimeout(() => {
      calculateQualityMetricsAsync(jobId, file.path, outputPath).catch((error) => {
        console.warn(`Quality analysis skipped for job ${jobId}:`, error.message);
      });
    }, 100);
  } catch (error) {
    console.error(`Target size compression failed for job ${jobId}:`, error);
    await storage.updateCompressionJob(jobId, {
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
function generateOptimizationInsights(params) {
  const insights = [];
  const { originalSize, compressedSize, compressionRatio, quality, algorithm, webOptimized } = params;
  if (compressionRatio > 70) {
    insights.push("Excellent compression achieved!");
  } else if (compressionRatio > 50) {
    insights.push("Good compression ratio");
  } else if (compressionRatio > 20) {
    insights.push("Moderate compression - consider lower quality for web");
  } else {
    insights.push("Limited compression - image may already be optimized");
  }
  if (quality > 85 && originalSize > 5e5) {
    insights.push("High quality setting on large image - consider reducing for web");
  } else if (quality < 60 && compressedSize < originalSize * 0.3) {
    insights.push("Aggressive compression applied - check quality is acceptable");
  }
  if (algorithm === "standard" && compressionRatio < 40) {
    insights.push("Try MozJPEG algorithm for better compression");
  }
  if (!webOptimized && originalSize > 1e5) {
    insights.push("Enable web optimization for better performance");
  }
  if (compressedSize > 2e5) {
    insights.push("Large file size - consider progressive JPEG for better loading");
  } else if (compressedSize > 5e5) {
    insights.push("Very large file - consider resizing or WebP format");
  }
  return insights;
}
async function calculateQualityMetricsAsync(jobId, originalPath, compressedPath) {
  const timeoutMs = 1e4;
  try {
    console.log(`Calculating quality metrics for job ${jobId}...`);
    const qualityMetrics = await Promise.race([
      calculateQualityMetrics(originalPath, compressedPath),
      new Promise(
        (_, reject) => setTimeout(() => reject(new Error("Quality analysis timeout")), timeoutMs)
      )
    ]);
    console.log(`Quality assessment completed - PSNR: ${qualityMetrics.psnr}, SSIM: ${qualityMetrics.ssim}%, Score: ${qualityMetrics.qualityScore}, Grade: ${qualityMetrics.qualityGrade}`);
    await storage.updateCompressionJob(jobId, {
      psnr: Math.round(qualityMetrics.psnr * 100),
      // Store as integer with 2 decimal precision
      ssim: Math.round(qualityMetrics.ssim * 100),
      // Store as integer percentage
      qualityScore: qualityMetrics.qualityScore,
      qualityGrade: qualityMetrics.qualityGrade
    });
    console.log(`Quality metrics updated for job ${jobId}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes("timeout")) {
      console.warn(`Quality assessment timed out for job ${jobId} - skipping`);
    } else {
      console.error(`Quality assessment failed for job ${jobId}:`, error);
    }
  }
}

// server/paymentRoutes.ts
var import_express = require("express");

// server/razorpayService.ts
var import_razorpay = __toESM(require("razorpay"), 1);
var import_crypto2 = __toESM(require("crypto"), 1);
var RazorpayService = class {
  razorpay = null;
  enabled = false;
  constructor() {
    const keyId = process.env.RAZORPAY_KEY_ID?.trim();
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();
    if (keyId && keySecret && keyId !== "" && keySecret !== "") {
      try {
        this.razorpay = new import_razorpay.default({
          key_id: keyId,
          key_secret: keySecret
        });
        this.enabled = true;
        console.log("Razorpay service initialized successfully");
        console.log(`Razorpay Configuration: CONFIGURED`);
      } catch (error) {
        console.error("Razorpay initialization failed:", error);
        console.log(`Razorpay Configuration: INITIALIZATION_FAILED`);
        this.enabled = false;
      }
    } else {
      console.log("Razorpay credentials not found - service disabled");
      console.log(`Razorpay Configuration: MISSING_CREDENTIALS`);
      this.enabled = false;
    }
  }
  async createOrder(amount, currency = "USD", receipt) {
    if (!this.enabled || !this.razorpay) {
      return {
        success: false,
        error: "Razorpay service not available"
      };
    }
    try {
      const options = {
        amount: Math.round(amount),
        // Amount should already be in smallest currency unit
        currency,
        receipt: receipt || `order_${Date.now()}`,
        payment_capture: 1
        // Auto-capture
      };
      const order = await this.razorpay.orders.create(options);
      return {
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      };
    } catch (error) {
      console.error("Razorpay order creation failed:", error);
      console.error("Razorpay error details:", {
        statusCode: error.statusCode,
        error: error.error,
        description: error.error?.description,
        code: error.error?.code
      });
      return {
        success: false,
        error: error?.error?.description || error.message || "Unknown error"
      };
    }
  }
  async createSubscription(planId, customerId, totalCount) {
    if (!this.enabled || !this.razorpay) {
      return {
        success: false,
        error: "Razorpay service not available"
      };
    }
    try {
      const subscriptionData = {
        plan_id: planId,
        customer_id: customerId,
        quantity: 1,
        start_at: Math.floor(Date.now() / 1e3) + 300
        // Start 5 minutes from now
      };
      if (totalCount) {
        subscriptionData.total_count = totalCount;
      }
      const subscription = await this.razorpay.subscriptions.create(subscriptionData);
      return {
        success: true,
        subscriptionId: subscription.id,
        status: subscription.status,
        planId: subscription.plan_id
      };
    } catch (error) {
      console.error("Razorpay subscription creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  verifyPaymentSignature(orderId, paymentId, signature) {
    if (!this.enabled || !process.env.RAZORPAY_KEY_SECRET) {
      return false;
    }
    try {
      const body = orderId + "|" + paymentId;
      const expectedSignature = import_crypto2.default.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");
      return expectedSignature === signature;
    } catch (error) {
      console.error("Signature verification failed:", error);
      return false;
    }
  }
  async getPaymentDetails(paymentId) {
    if (!this.enabled || !this.razorpay) {
      return {
        success: false,
        error: "Razorpay service not available"
      };
    }
    try {
      const payment = await this.razorpay.payments.fetch(paymentId);
      return {
        success: true,
        payment: {
          id: payment.id,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          method: payment.method,
          captured: payment.captured,
          createdAt: payment.created_at
        }
      };
    } catch (error) {
      console.error("Failed to fetch payment details:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  async cancelSubscription(subscriptionId, cancelAtCycleEnd = false) {
    if (!this.enabled || !this.razorpay) {
      return {
        success: false,
        error: "Razorpay service not available"
      };
    }
    try {
      const result = await this.razorpay.subscriptions.cancel(
        subscriptionId,
        cancelAtCycleEnd
      );
      return {
        success: true,
        subscriptionId: result.id,
        status: result.status
      };
    } catch (error) {
      console.error("Subscription cancellation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
};
var razorpayService = new RazorpayService();

// server/paypalService.ts
var import_axios = __toESM(require("axios"), 1);
var PayPalService = class {
  baseURL;
  clientId;
  clientSecret;
  enabled = false;
  constructor() {
    if (process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET) {
      this.clientId = process.env.PAYPAL_CLIENT_ID;
      this.clientSecret = process.env.PAYPAL_CLIENT_SECRET;
      const manualEnv2 = process.env.PAYPAL_ENVIRONMENT?.toLowerCase();
      let isLiveCredentials = false;
      if (manualEnv2 === "live" || manualEnv2 === "production") {
        isLiveCredentials = true;
        console.log("PayPal Environment: LIVE (Manual override)");
      } else if (manualEnv2 === "sandbox" || manualEnv2 === "test") {
        isLiveCredentials = false;
        console.log("PayPal Environment: SANDBOX (Manual override)");
      } else {
        const startsWithA = this.clientId.startsWith("A") && !this.clientId.startsWith("AeG");
        const startsWithBAA = this.clientId.startsWith("BAA");
        if (startsWithBAA) {
          isLiveCredentials = true;
          console.log("PayPal Environment: LIVE (Detected BAA pattern - Production credentials)");
        } else if (this.clientId.startsWith("AeG") || this.clientId.startsWith("sb-")) {
          isLiveCredentials = false;
          console.log("PayPal Environment: SANDBOX (Detected test pattern)");
        } else if (startsWithA) {
          isLiveCredentials = true;
          console.log("PayPal Environment: LIVE (Detected A pattern)");
        } else {
          isLiveCredentials = false;
          console.log("PayPal Environment: SANDBOX (Default fallback)");
        }
      }
      this.baseURL = isLiveCredentials ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
      this.enabled = true;
      console.log("PayPal service initialized successfully");
      console.log(`PayPal Environment: ${this.baseURL.includes("sandbox") ? "SANDBOX" : "LIVE"}`);
      console.log(`PayPal Configuration: ${this.clientId && this.clientSecret ? "CONFIGURED" : "MISSING_CREDENTIALS"}`);
    } else {
      console.log("PayPal credentials not found - service disabled");
      console.log(`PAYPAL_CLIENT_ID: ${process.env.PAYPAL_CLIENT_ID ? "SET" : "MISSING"}`);
      console.log(`PAYPAL_CLIENT_SECRET: ${process.env.PAYPAL_CLIENT_SECRET ? "SET" : "MISSING"}`);
      this.enabled = false;
      this.clientId = "";
      this.clientSecret = "";
      this.baseURL = "";
    }
  }
  async getAccessToken() {
    if (!this.enabled) {
      throw new Error("PayPal service not available");
    }
    try {
      console.log("PayPal getAccessToken - Environment:", process.env.NODE_ENV);
      console.log("PayPal getAccessToken - Environment Type:", this.baseURL.includes("sandbox") ? "SANDBOX" : "LIVE");
      console.log("PayPal getAccessToken - Configuration Status: CONFIGURED");
      const response = await (0, import_axios.default)({
        url: `${this.baseURL}/v1/oauth2/token`,
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Accept-Language": "en_US",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        auth: {
          username: this.clientId,
          password: this.clientSecret
        },
        data: "grant_type=client_credentials"
      });
      console.log("PayPal access token retrieved successfully");
      return response.data.access_token;
    } catch (error) {
      console.error("PayPal access token failed:", error.response?.data || error.message);
      console.error("PayPal credentials check - Client ID exists:", !!this.clientId);
      console.error("PayPal credentials check - Client Secret exists:", !!this.clientSecret);
      throw new Error("Failed to get PayPal access token");
    }
  }
  async createProduct(name, description) {
    if (!this.enabled) {
      return {
        success: false,
        error: "PayPal service not available"
      };
    }
    try {
      const token = await this.getAccessToken();
      const response = await (0, import_axios.default)({
        url: `${this.baseURL}/v1/catalogs/products`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "PayPal-Request-Id": `PRODUCT-${Date.now()}`
        },
        data: {
          name,
          description,
          type: "SERVICE",
          category: "SOFTWARE"
        }
      });
      return {
        success: true,
        productId: response.data.id
      };
    } catch (error) {
      console.error("PayPal product creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  async createSubscriptionPlan(productId, name, description, price, currency = "USD") {
    try {
      const token = await this.getAccessToken();
      const response = await (0, import_axios.default)({
        url: `${this.baseURL}/v1/billing/plans`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "PayPal-Request-Id": `PLAN-${Date.now()}`
        },
        data: {
          product_id: productId,
          name,
          description,
          status: "ACTIVE",
          billing_cycles: [
            {
              frequency: {
                interval_unit: "MONTH",
                interval_count: 1
              },
              tenure_type: "REGULAR",
              sequence: 1,
              total_cycles: name.includes("Test") ? 1 : 0,
              // 1 cycle for test, infinite for others
              pricing_scheme: {
                fixed_price: {
                  value: price,
                  currency_code: currency
                }
              }
            }
          ],
          payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee: {
              value: "0",
              currency_code: currency
            },
            setup_fee_failure_action: "CONTINUE",
            payment_failure_threshold: 3
          }
        }
      });
      return {
        success: true,
        planId: response.data.id
      };
    } catch (error) {
      console.error("PayPal plan creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  async createSubscription(planId, returnUrl, cancelUrl) {
    try {
      const token = await this.getAccessToken();
      const response = await (0, import_axios.default)({
        url: `${this.baseURL}/v1/billing/subscriptions`,
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "PayPal-Request-Id": `SUBSCRIPTION-${Date.now()}`
        },
        data: {
          plan_id: planId,
          subscriber: {
            name: {
              given_name: "Customer",
              surname: "User"
            },
            email_address: "customer@example.com"
          },
          application_context: {
            brand_name: "Micro JPEG",
            locale: "en-US",
            shipping_preference: "NO_SHIPPING",
            user_action: "SUBSCRIBE_NOW",
            payment_method: {
              payer_selected: "PAYPAL",
              payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED"
            },
            return_url: returnUrl,
            cancel_url: cancelUrl
          }
        }
      });
      const subscription = response.data;
      const approvalUrl = subscription.links?.find((link) => link.rel === "approve")?.href;
      return {
        success: true,
        subscriptionId: subscription.id,
        approvalUrl,
        subscription
      };
    } catch (error) {
      console.error("PayPal subscription creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  async getSubscription(subscriptionId) {
    try {
      const token = await this.getAccessToken();
      const response = await (0, import_axios.default)({
        url: `${this.baseURL}/v1/billing/subscriptions/${subscriptionId}`,
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      return {
        success: true,
        subscription: response.data
      };
    } catch (error) {
      console.error("PayPal get subscription failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  async cancelSubscription(subscriptionId, reason = "User requested cancellation") {
    try {
      const token = await this.getAccessToken();
      const response = await (0, import_axios.default)({
        url: `${this.baseURL}/v1/billing/subscriptions/${subscriptionId}/cancel`,
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        data: {
          reason
        }
      });
      return {
        success: response.status === 204,
        message: "Subscription cancelled successfully"
      };
    } catch (error) {
      console.error("PayPal subscription cancellation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
};
var paypalService = new PayPalService();

// server/paymentRouting.ts
function determinePaymentGateway(countryCode, preferredCurrency, userLocation) {
  if (countryCode === "IN" || preferredCurrency === "INR" || userLocation?.toLowerCase().includes("india")) {
    return {
      gateway: "razorpay",
      currency: "INR",
      reason: "India-based customer"
    };
  }
  return {
    gateway: "paypal",
    currency: "USD",
    reason: "International customer"
  };
}
var PRICING_CONFIG = {
  // Subscription plans with regional pricing
  plans: {
    free: {
      INR: { price: 0, currency: "INR" },
      USD: { price: 0, currency: "USD" }
    },
    pro: {
      INR: { price: 799, currency: "INR" },
      // ₹799/month
      USD: { price: 9.99, currency: "USD" }
      // $9.99/month
    },
    enterprise: {
      INR: { price: 2499, currency: "INR" },
      // ₹2499/month
      USD: { price: 29.99, currency: "USD" }
      // $29.99/month
    }
  }
};
function getPlanPricing(plan, currency) {
  return PRICING_CONFIG.plans[plan]?.[currency] || null;
}

// server/paymentRoutes.ts
var router = (0, import_express.Router)();
router.post("/payment/routing", async (req, res) => {
  try {
    const { plan, userLocation, userEmail } = req.body;
    const routing = determinePaymentGateway(void 0, void 0, userLocation);
    const pricing = getPlanPricing(plan, routing.currency);
    if (!pricing) {
      return res.status(400).json({
        success: false,
        error: "Invalid plan or pricing not found"
      });
    }
    let paypalPlanId = "";
    if (routing.gateway === "paypal") {
      const planMapping = {
        pro: process.env.PAYPAL_PRO_PLAN_ID || "P-1234567890",
        enterprise: process.env.PAYPAL_ENTERPRISE_PLAN_ID || "P-0987654321"
      };
      paypalPlanId = planMapping[plan] || "";
    }
    res.json({
      success: true,
      gateway: routing.gateway,
      currency: routing.currency,
      pricing,
      paypalPlanId,
      reason: routing.reason
    });
  } catch (error) {
    console.error("Payment routing error:", error);
    res.status(500).json({
      success: false,
      error: "Payment routing failed"
    });
  }
});
router.post("/payment/razorpay/create-order", async (req, res) => {
  try {
    const { amount, currency = "USD", plan } = req.body;
    console.log(`Creating Razorpay order: plan=${plan}, amount=${amount}, currency=${currency}`);
    const result = await razorpayService.createOrder(
      amount,
      currency,
      `order_${plan}_${Date.now()}`
    );
    if (result.success) {
      res.json({
        success: true,
        order_id: result.orderId,
        amount: result.amount,
        currency: result.currency,
        key: process.env.RAZORPAY_KEY_ID
        // Add the public key for frontend
      });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create order"
    });
  }
});
router.post("/payment/razorpay/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan
    } = req.body;
    const isValid = razorpayService.verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    if (isValid) {
      const sessionData = req.session;
      if (sessionData.userId) {
        await storage.updateUser(sessionData.userId, {
          subscriptionTier: plan,
          subscriptionStatus: "active",
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3),
          // 30 days
          stripeSubscriptionId: razorpay_payment_id
          // Store payment ID
        });
      }
      res.json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Invalid payment signature"
      });
    }
  } catch (error) {
    console.error("Razorpay verification error:", error);
    res.status(500).json({
      success: false,
      error: "Payment verification failed"
    });
  }
});
router.get("/payment/paypal/subscription-success", async (req, res) => {
  try {
    const { subscription_id, plan_id } = req.query;
    const sessionData = req.session;
    if (!subscription_id || !sessionData.userId) {
      return res.redirect("/simple-pricing?error=missing_subscription");
    }
    console.log("PayPal subscription redirect:", { subscription_id, plan_id });
    const result = await paypalService.getSubscription(subscription_id);
    if (result.success && result.subscription.status === "ACTIVE") {
      console.log("PayPal subscription verified as ACTIVE:", result.subscription);
      const plan = result.subscription.plan_id?.includes("test") ? "test_premium" : result.subscription.plan_id?.includes("enterprise") ? "enterprise" : "premium";
      const planPrices = {
        "test_premium": 1,
        "premium": 29,
        "enterprise": 99
      };
      const subscriptionEndDate = plan === "test_premium" ? new Date(Date.now() + 24 * 60 * 60 * 1e3) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3);
      await storage.updateUser(sessionData.userId, {
        subscriptionTier: plan,
        subscriptionStatus: "active",
        subscriptionEndDate,
        stripeSubscriptionId: subscription_id
        // Store PayPal subscription ID
      });
      const amount = planPrices[plan];
      const planDisplayName = plan.replace("_", "-");
      console.log("Subscription activated successfully for user:", sessionData.userId);
      res.redirect(`/subscription-success?plan=${planDisplayName}&amount=${amount}&paypal_subscription_id=${subscription_id}`);
    } else {
      console.error("PayPal subscription verification failed:", result);
      res.redirect("/simple-pricing?error=payment_verification_failed");
    }
  } catch (error) {
    console.error("PayPal subscription verification error:", error);
    res.redirect("/simple-pricing?error=payment_processing_failed");
  }
});
router.post("/payment/paypal/cancel-subscription", async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const result = await paypalService.cancelSubscription(subscriptionId);
    if (result.success) {
      const sessionData = req.session;
      if (sessionData.userId) {
        await storage.updateUser(sessionData.userId, {
          subscriptionStatus: "cancelled"
        });
      }
      res.json({
        success: true,
        message: "Subscription cancelled successfully"
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error("PayPal subscription cancellation error:", error);
    res.status(500).json({
      success: false,
      error: "Subscription cancellation failed"
    });
  }
});
router.post("/payment/razorpay/webhook", async (req, res) => {
  try {
    const event = req.body;
    switch (event.event) {
      case "payment.captured":
        console.log("Payment captured:", event.payload.payment.entity.id);
        break;
      case "subscription.activated":
        console.log("Subscription activated:", event.payload.subscription.entity.id);
        break;
      case "subscription.cancelled":
        console.log("Subscription cancelled:", event.payload.subscription.entity.id);
        break;
      default:
        console.log("Unhandled Razorpay event:", event.event);
    }
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});
router.post("/payment/paypal/webhook", async (req, res) => {
  try {
    const event = req.body;
    switch (event.event_type) {
      case "BILLING.SUBSCRIPTION.ACTIVATED":
        console.log("PayPal subscription activated:", event.resource.id);
        break;
      case "BILLING.SUBSCRIPTION.CANCELLED":
        console.log("PayPal subscription cancelled:", event.resource.id);
        break;
      case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
        console.log("PayPal payment failed:", event.resource.id);
        break;
      default:
        console.log("Unhandled PayPal event:", event.event_type);
    }
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("PayPal webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});
var paymentRoutes_default = router;

// server/routes.ts
init_r2Service();

// server/pageIdentifierMiddleware.ts
var CUSTOM_SLUG_TO_CANONICAL = {
  "free-no-auth": "/",
  "free-auth": "/free",
  "test-1-dollar": "/test-premium",
  "premium-29": "/premium",
  "enterprise-99": "/enterprise"
  // Removed cr2-free and cr2-to-png mappings to prevent SEO conflicts
};
var ALLOWED_PAGE_IDENTIFIERS = [
  // Core compression pages - NEW SEO-friendly structure
  "/",
  "/compress",
  "/free",
  "/premium",
  "/enterprise",
  "/tools/bulk",
  "/tools/raw",
  // Legacy URLs - kept for backwards compatibility
  "/compress-free",
  "/compress-premium",
  "/test-premium",
  "/compress-enterprise",
  "/bulk-image-compression",
  "/compress-raw-files",
  "/convert/cr2-to-jpg",
  "/convert/cr2-to-png",
  // WordPress plugin pages - NEW consolidated structure
  "/wordpress-plugin",
  "/wordpress-plugin/install",
  "/wordpress-plugin/docs",
  "/wordpress-plugin/api",
  "/wordpress-plugin/download",
  // WordPress plugin pages - LEGACY for backwards compatibility
  "/wordpress/details",
  "/wordpress/installation",
  "/wordpress-installation",
  "/wordpress/development",
  "/wordpress-development",
  "/wordpress-image-plugin",
  // Tools pages - NEW professional hierarchy
  "/tools",
  "/tools/compress",
  "/tools/convert",
  "/tools/batch",
  "/tools/optimizer",
  // Web tools pages - LEGACY for backwards compatibility
  "/web/overview",
  "/web/compress",
  "/web/convert",
  // Legal pages - NEW professional hierarchy
  "/legal/terms",
  "/legal/privacy",
  "/legal/cookies",
  "/legal/cancellation",
  "/legal/payment-protection",
  // Legal pages - LEGACY for backwards compatibility
  "/terms-of-service",
  "/privacy-policy",
  "/cookie-policy",
  "/cancellation-policy",
  "/payment-protection",
  // API pages
  "/api-demo",
  "/api-docs",
  "/api-dashboard",
  // Other common pages
  "/features",
  "/simple-pricing",
  "/web/overview",
  "/web/compress",
  "/web/convert",
  // Common variations that should be normalized
  "/free",
  "/premium",
  "/enterprise",
  "/cr2-converter",
  "/pricing"
];
function normalizePageIdentifier(pageId) {
  const cleanPath = pageId === "/" ? "/" : pageId.replace(/\/$/, "");
  if (ALLOWED_PAGE_IDENTIFIERS.includes(cleanPath)) {
    return cleanPath;
  }
  switch (cleanPath) {
    // Main/home variations - main landing page
    case "":
    case "/home":
    case "/landing":
      return "/";
    // Main compress page (shows all options)
    case "/compress":
      return "/compress";
    // Free tier variations - NEW: /free is primary
    case "/free":
      return "/free";
    case "/free":
    case "/free-compress":
    case "/free-signed-compress":
    case "/compress-free":
      return "/free";
    // Premium variations - NEW: /premium is primary  
    case "/premium":
      return "/premium";
    case "/premium":
    case "/pro":
    case "/compress-premium":
      return "/premium";
    // Test premium variations
    case "/test-pro":
    case "/trial":
    case "/test-premium":
      return "/test-premium";
    // Enterprise variations - NEW: /enterprise is primary
    case "/enterprise":
      return "/enterprise";
    case "/business":
    case "/enterprise":
    case "/compress-enterprise":
      return "/enterprise";
    // Bulk processing - NEW: /tools/bulk is primary
    case "/tools/bulk":
      return "/tools/bulk";
    case "/bulk-image-compression":
      return "/tools/bulk";
    // RAW processing - NEW: /tools/raw is primary
    case "/tools/raw":
      return "/tools/raw";
    case "/compress-raw-files":
    // Legacy URL
    case "/raw-converter":
      return "/tools/raw";
    // CR2/RAW conversion variations
    case "/cr2-converter":
    case "/convert-cr2":
      return "/convert/cr2-to-jpg";
    case "/cr2-to-png":
    case "/convert-cr2-to-png":
      return "/convert/cr2-to-png";
    // API variations
    case "/api":
      return "/api-docs";
    // Pricing variations
    case "/pricing":
    case "/plans":
      return "/simple-pricing";
    // WordPress plugin variations - NEW: /wordpress-plugin/* is primary structure
    case "/wordpress/details":
      return "/wordpress-plugin";
    case "/wordpress/installation":
    case "/wordpress-installation":
      return "/wordpress-plugin/install";
    case "/wordpress/development":
    case "/wordpress-development":
      return "/wordpress-plugin/api";
    case "/wordpress-image-plugin":
      return "/wordpress-plugin/docs";
    // Web tools variations - NEW: /tools/* is primary structure
    case "/web/overview":
      return "/tools";
    case "/web/compress":
      return "/tools/compress";
    case "/web/convert":
      return "/tools/convert";
    // Legal page variations - NEW: /legal/* is primary structure
    case "/terms-of-service":
      return "/legal/terms";
    case "/privacy-policy":
      return "/legal/privacy";
    case "/cookie-policy":
      return "/legal/cookies";
    case "/cancellation-policy":
      return "/legal/cancellation";
    case "/payment-protection":
      return "/legal/payment-protection";
    default:
      return cleanPath || "/";
  }
}
function getPageScope(pageId) {
  const normalized = normalizePageIdentifier(pageId);
  switch (normalized) {
    case "/":
      return "main";
    case "/compress":
      return "main";
    // Main compress landing page uses main scope
    case "/free":
      return "free";
    // Free tier gets its own scope  
    case "/premium":
      return "pro";
    case "/test-premium":
      return "test_premium";
    // Test premium gets its own scope
    case "/enterprise":
      return "enterprise";
    // Enterprise gets its own scope
    case "/tools/bulk":
      return "main";
    // Bulk processing uses main scope for now
    case "/tools/raw":
      return "main";
    // RAW processing uses main scope for now
    // ALL conversion pages use main scope for unified dynamic system
    // WordPress plugin pages - all use main scope
    case "/wordpress-plugin":
    case "/wordpress-plugin/install":
    case "/wordpress-plugin/docs":
    case "/wordpress-plugin/api":
    case "/wordpress-plugin/download":
      return "main";
    // Legacy URL support (in case normalization doesn't catch everything)
    case "/compress-free":
      return "free";
    case "/compress-premium":
      return "pro";
    case "/compress-enterprise":
      return "enterprise";
    case "/wordpress/details":
    case "/wordpress/installation":
    case "/wordpress-installation":
    case "/wordpress/development":
    case "/wordpress-development":
    case "/wordpress-image-plugin":
      return "main";
    // Tools pages - all use main scope
    case "/tools":
    case "/tools/compress":
    case "/tools/convert":
    case "/tools/batch":
    case "/tools/optimizer":
      return "main";
    // Web tools pages - LEGACY (all use main scope)
    case "/web/overview":
    case "/web/compress":
    case "/web/convert":
      return "main";
    // Legal pages - all use main scope
    case "/legal/terms":
    case "/legal/privacy":
    case "/legal/cookies":
    case "/legal/cancellation":
    case "/legal/payment-protection":
      return "main";
    // Legacy legal pages - all use main scope  
    case "/terms-of-service":
    case "/privacy-policy":
    case "/cookie-policy":
    case "/cancellation-policy":
    case "/payment-protection":
      return "main";
    default:
      return "main";
  }
}
function sanitizePageIdentifier(input) {
  if (!input || typeof input !== "string") {
    return null;
  }
  if (input.length > 128) {
    return null;
  }
  if (!/^[a-zA-Z0-9/_.-]+$/.test(input)) {
    return null;
  }
  return input;
}
function pageIdentifierMiddleware(req, res, next) {
  if (!req.context) {
    req.context = {};
  }
  let pageIdentifier = null;
  const headerPageId = req.headers["x-page-identifier"];
  if (headerPageId && typeof headerPageId === "string") {
    pageIdentifier = sanitizePageIdentifier(headerPageId);
  }
  if (!pageIdentifier && req.body && req.body.pageIdentifier) {
    pageIdentifier = sanitizePageIdentifier(req.body.pageIdentifier);
  }
  if (!pageIdentifier) {
    const referer = req.headers.referer;
    if (referer) {
      try {
        const refererUrl = new URL(referer);
        pageIdentifier = sanitizePageIdentifier(refererUrl.pathname);
      } catch (error) {
      }
    }
  }
  const rawSlug = pageIdentifier;
  let canonicalPath;
  if (rawSlug && CUSTOM_SLUG_TO_CANONICAL[rawSlug]) {
    canonicalPath = CUSTOM_SLUG_TO_CANONICAL[rawSlug];
  } else {
    canonicalPath = rawSlug ? normalizePageIdentifier(rawSlug) : "/";
  }
  const pageScope = getPageScope(canonicalPath);
  req.context.pageIdentifierSlug = rawSlug;
  req.context.pageIdentifierCanonical = canonicalPath;
  req.context.pageIdentifier = rawSlug || canonicalPath;
  req.context.pageScope = pageScope;
  console.log(`\u{1F527} Page Identifier Middleware:`, {
    original: rawSlug,
    slug: rawSlug,
    canonical: canonicalPath,
    final: rawSlug || canonicalPath,
    scope: pageScope,
    source: headerPageId ? "header" : req.body?.pageIdentifier ? "body" : "referer"
  });
  next();
}

// server/routes.ts
init_DualUsageTracker();
init_operationLimits();

// server/superuser.ts
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var import_drizzle_orm3 = require("drizzle-orm");
init_db();
init_schema();
var SUPERUSER_EMAIL = process.env.SUPERUSER_EMAIL || "admin@microjpeg.com";
var SUPERUSER_PASSWORD = process.env.SUPERUSER_PASSWORD || "SuperAdmin123!";
var ADMIN_UI_ENABLED = process.env.ADMIN_UI_ENABLED === "true";
var ADMIN_SEED_TOKEN = process.env.ADMIN_SEED_TOKEN || "dev-seed-token-2025";
var ensureSuperuser = async (req, res, next) => {
  try {
    const session4 = req.session;
    if (!session4.userId) {
      return res.status(401).json({
        error: "Authentication required",
        message: "Please sign in to access admin functions"
      });
    }
    const [user] = await db.select().from(users).where((0, import_drizzle_orm3.eq)(users.id, session4.userId));
    if (!user || !user.isSuperuser) {
      return res.status(403).json({
        error: "Insufficient privileges",
        message: "Superuser access required"
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Superuser authentication error:", error);
    res.status(500).json({
      error: "Authentication error",
      message: "Failed to verify superuser status"
    });
  }
};
async function logAdminAction(adminUserId, action, targetUserId, targetSessionId, details = {}, ipAddress, userAgent) {
  try {
    await db.insert(adminAuditLogs).values({
      adminUserId,
      action,
      targetUserId,
      targetSessionId,
      details,
      ipAddress,
      userAgent
    });
  } catch (error) {
    console.error("Failed to log admin action:", error);
  }
}
var cachedAppSettings = null;
var settingsCacheTime = 0;
var CACHE_DURATION = 3e4;
async function getAppSettings() {
  const now = Date.now();
  if (cachedAppSettings && now - settingsCacheTime < CACHE_DURATION) {
    return cachedAppSettings;
  }
  try {
    const [settings] = await db.select().from(appSettings).limit(1);
    const result = {
      countersEnforcement: settings?.countersEnforcement || { hourly: true, daily: true, monthly: true },
      adminUiEnabled: settings?.adminUiEnabled || ADMIN_UI_ENABLED,
      superuserBypassEnabled: settings?.superuserBypassEnabled || false
    };
    cachedAppSettings = result;
    settingsCacheTime = now;
    return result;
  } catch (error) {
    console.error("Failed to get app settings:", error);
    return {
      countersEnforcement: { hourly: true, daily: true, monthly: true },
      adminUiEnabled: ADMIN_UI_ENABLED,
      superuserBypassEnabled: false
    };
  }
}
async function updateAppSettings(updates, updatedBy) {
  try {
    const currentSettings = await getAppSettings();
    const newEnforcement = {
      ...currentSettings.countersEnforcement,
      ...updates.countersEnforcement
    };
    const [existingSettings] = await db.select().from(appSettings).limit(1);
    if (existingSettings) {
      await db.update(appSettings).set({
        countersEnforcement: newEnforcement,
        adminUiEnabled: updates.adminUiEnabled ?? currentSettings.adminUiEnabled,
        superuserBypassEnabled: updates.superuserBypassEnabled ?? currentSettings.superuserBypassEnabled,
        updatedAt: /* @__PURE__ */ new Date(),
        updatedBy
      }).where((0, import_drizzle_orm3.eq)(appSettings.id, existingSettings.id));
    } else {
      await db.insert(appSettings).values({
        countersEnforcement: newEnforcement,
        adminUiEnabled: updates.adminUiEnabled ?? currentSettings.adminUiEnabled,
        superuserBypassEnabled: updates.superuserBypassEnabled ?? currentSettings.superuserBypassEnabled,
        updatedBy
      });
    }
    cachedAppSettings = null;
    console.log("\u2705 App settings updated:", updates);
  } catch (error) {
    console.error("Failed to update app settings:", error);
    throw error;
  }
}
async function hasSuperuserBypass(req) {
  try {
    const session4 = req.session;
    if (!session4?.superBypassEnabled) {
      return false;
    }
    if (!session4.userId) {
      return false;
    }
    const [user] = await db.select().from(users).where((0, import_drizzle_orm3.eq)(users.id, session4.userId));
    if (!user || !user.isSuperuser) {
      console.warn(`\u{1F6A8} Session ${session4.userId} has bypass enabled but user is not superuser`);
      return false;
    }
    const appSettings2 = await getAppSettings();
    if (!appSettings2.superuserBypassEnabled) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error checking superuser bypass:", error);
    return false;
  }
}
function setSuperuserBypass(req, enabled, reason) {
  const session4 = req.session;
  session4.superBypassEnabled = enabled;
  if (enabled && reason) {
    session4.superBypassReason = reason;
  } else {
    delete session4.superBypassReason;
  }
}

// server/routes.ts
init_schema();

// server/conversionMiddleware.ts
init_DualUsageTracker();
var PAGE_CONFIGS = {
  // Universal Format Pages (auto-convert to JPG)
  "/": {
    type: "universal",
    requiresAuth: false,
    requiresPayment: false,
    planName: "free",
    autoOutput: "jpg",
    limits: {
      maxFileSize: 10 * 1024 * 1024,
      // 10MB
      monthlyLimit: 500,
      dailyLimit: 25,
      hourlyLimit: 5,
      concurrent: 1
    },
    allowedOutputs: ["jpg", "png", "webp", "avif", "tiff"]
  },
  "/compress-free": {
    type: "universal",
    requiresAuth: true,
    requiresPayment: false,
    planName: "free-authenticated",
    autoOutput: "jpg",
    limits: {
      maxFileSize: 10 * 1024 * 1024,
      // 10MB
      monthlyLimit: 500,
      dailyLimit: 25,
      hourlyLimit: 5,
      concurrent: 1
    },
    allowedOutputs: ["jpg", "png", "webp", "avif"]
  },
  "/test-premium": {
    type: "universal",
    requiresAuth: true,
    requiresPayment: true,
    paymentAmount: 1,
    planName: "test-premium",
    autoOutput: "jpg",
    limits: {
      maxFileSize: 50 * 1024 * 1024,
      // 50MB
      dailyLimit: 300,
      // 300 operations for 1 day only
      hourlyLimit: 20,
      concurrent: 3
    },
    allowedOutputs: ["jpg", "png", "webp", "avif"]
  },
  "/compress-premium": {
    type: "universal",
    requiresAuth: true,
    requiresPayment: true,
    paymentAmount: 29,
    planName: "premium",
    autoOutput: "jpg",
    limits: {
      maxFileSize: 50 * 1024 * 1024,
      // 50MB
      monthlyLimit: 1e4,
      hourlyLimit: 100,
      concurrent: 3
    },
    allowedOutputs: ["jpg", "png", "webp", "avif"]
  },
  "/compress-enterprise": {
    type: "universal",
    requiresAuth: true,
    requiresPayment: true,
    paymentAmount: 99,
    planName: "enterprise",
    autoOutput: "jpg",
    limits: {
      maxFileSize: 200 * 1024 * 1024,
      // 200MB
      monthlyLimit: 5e4,
      concurrent: 5
    },
    allowedOutputs: ["jpg", "png", "webp", "avif"]
  }
};
var CONVERSION_MATRIX = {
  // JPG outputs
  "avif-to-jpg": { input: "avif", output: "jpg", type: "convert" },
  "jpg-to-jpg": { input: "jpg", output: "jpg", type: "compress" },
  "png-to-jpg": { input: "png", output: "jpg", type: "convert" },
  "arw-to-jpg": { input: "arw", output: "jpg", type: "convert" },
  "cr2-to-jpg": { input: "cr2", output: "jpg", type: "convert" },
  "crw-to-jpg": { input: "crw", output: "jpg", type: "convert" },
  "dng-to-jpg": { input: "dng", output: "jpg", type: "convert" },
  "nef-to-jpg": { input: "nef", output: "jpg", type: "convert" },
  "orf-to-jpg": { input: "orf", output: "jpg", type: "convert" },
  "raf-to-jpg": { input: "raf", output: "jpg", type: "convert" },
  "tiff-to-jpg": { input: "tiff", output: "jpg", type: "convert" },
  "svg-to-jpg": { input: "svg", output: "jpg", type: "convert" },
  "webp-to-jpg": { input: "webp", output: "jpg", type: "convert" },
  // PNG outputs
  "avif-to-png": { input: "avif", output: "png", type: "convert" },
  "jpg-to-png": { input: "jpg", output: "png", type: "convert" },
  "png-to-png": { input: "png", output: "png", type: "compress" },
  "arw-to-png": { input: "arw", output: "png", type: "convert" },
  "cr2-to-png": { input: "cr2", output: "png", type: "convert" },
  "crw-to-png": { input: "crw", output: "png", type: "convert" },
  "dng-to-png": { input: "dng", output: "png", type: "convert" },
  "nef-to-png": { input: "nef", output: "png", type: "convert" },
  "orf-to-png": { input: "orf", output: "png", type: "convert" },
  "raf-to-png": { input: "raf", output: "png", type: "convert" },
  "tiff-to-png": { input: "tiff", output: "png", type: "convert" },
  "svg-to-png": { input: "svg", output: "png", type: "convert" },
  "webp-to-png": { input: "webp", output: "png", type: "convert" },
  // TIFF outputs
  "avif-to-tiff": { input: "avif", output: "tiff", type: "convert" },
  "jpg-to-tiff": { input: "jpg", output: "tiff", type: "convert" },
  "png-to-tiff": { input: "png", output: "tiff", type: "convert" },
  "arw-to-tiff": { input: "arw", output: "tiff", type: "convert" },
  "cr2-to-tiff": { input: "cr2", output: "tiff", type: "convert" },
  "crw-to-tiff": { input: "crw", output: "tiff", type: "convert" },
  "dng-to-tiff": { input: "dng", output: "tiff", type: "convert" },
  "nef-to-tiff": { input: "nef", output: "tiff", type: "convert" },
  "orf-to-tiff": { input: "orf", output: "tiff", type: "convert" },
  "raf-to-tiff": { input: "raf", output: "tiff", type: "convert" },
  "tiff-to-tiff": { input: "tiff", output: "tiff", type: "compress" },
  "svg-to-tiff": { input: "svg", output: "tiff", type: "convert" },
  "webp-to-tiff": { input: "webp", output: "tiff", type: "convert" },
  // WebP outputs
  "avif-to-webp": { input: "avif", output: "webp", type: "convert" },
  "jpg-to-webp": { input: "jpg", output: "webp", type: "convert" },
  "png-to-webp": { input: "png", output: "webp", type: "convert" },
  "arw-to-webp": { input: "arw", output: "webp", type: "convert" },
  "cr2-to-webp": { input: "cr2", output: "webp", type: "convert" },
  "crw-to-webp": { input: "crw", output: "webp", type: "convert" },
  "dng-to-webp": { input: "dng", output: "webp", type: "convert" },
  "nef-to-webp": { input: "nef", output: "webp", type: "convert" },
  "orf-to-webp": { input: "orf", output: "webp", type: "convert" },
  "raf-to-webp": { input: "raf", output: "webp", type: "convert" },
  "tiff-to-webp": { input: "tiff", output: "webp", type: "convert" },
  "svg-to-webp": { input: "svg", output: "webp", type: "convert" },
  "webp-to-webp": { input: "webp", output: "webp", type: "compress" },
  // AVIF outputs
  "avif-to-avif": { input: "avif", output: "avif", type: "compress" },
  "jpg-to-avif": { input: "jpg", output: "avif", type: "convert" },
  "png-to-avif": { input: "png", output: "avif", type: "convert" },
  "arw-to-avif": { input: "arw", output: "avif", type: "convert" },
  "cr2-to-avif": { input: "cr2", output: "avif", type: "convert" },
  "crw-to-avif": { input: "crw", output: "avif", type: "convert" },
  "dng-to-avif": { input: "dng", output: "avif", type: "convert" },
  "nef-to-avif": { input: "nef", output: "avif", type: "convert" },
  "orf-to-avif": { input: "orf", output: "avif", type: "convert" },
  "raf-to-avif": { input: "raf", output: "avif", type: "convert" },
  "tiff-to-avif": { input: "tiff", output: "avif", type: "convert" },
  "svg-to-avif": { input: "svg", output: "avif", type: "convert" },
  "webp-to-avif": { input: "webp", output: "avif", type: "convert" },
  // SVG outputs
  "avif-to-svg": { input: "avif", output: "svg", type: "convert" },
  "jpg-to-svg": { input: "jpg", output: "svg", type: "convert" },
  "png-to-svg": { input: "png", output: "svg", type: "convert" },
  "arw-to-svg": { input: "arw", output: "svg", type: "convert" },
  "cr2-to-svg": { input: "cr2", output: "svg", type: "convert" },
  "crw-to-svg": { input: "crw", output: "svg", type: "convert" },
  "dng-to-svg": { input: "dng", output: "svg", type: "convert" },
  "nef-to-svg": { input: "nef", output: "svg", type: "convert" },
  "orf-to-svg": { input: "orf", output: "svg", type: "convert" },
  "raf-to-svg": { input: "raf", output: "svg", type: "convert" },
  "tiff-to-svg": { input: "tiff", output: "svg", type: "convert" },
  "svg-to-svg": { input: "svg", output: "svg", type: "compress" },
  "webp-to-svg": { input: "webp", output: "svg", type: "convert" }
};
var FORMAT_TYPES = {
  RAW: ["arw", "cr2", "cr3", "crw", "dng", "nef", "orf", "raf", "rw2"],
  REGULAR: ["jpg", "jpeg", "png", "webp", "avif", "tiff", "svg"],
  LOSSLESS: ["png", "tiff", "svg"],
  LOSSY: ["jpg", "jpeg", "webp", "avif"]
};
var SINGLE_CONVERSION_LIMITS = {
  RAW: {
    maxFileSize: 25 * 1024 * 1024,
    // 25MB for RAW files
    monthlyLimit: 100,
    dailyLimit: 10,
    hourlyLimit: 5,
    concurrent: 1
  },
  REGULAR: {
    maxFileSize: 10 * 1024 * 1024,
    // 10MB for regular files
    monthlyLimit: 500,
    dailyLimit: 25,
    hourlyLimit: 5,
    concurrent: 1
  }
};
var planGatingMiddleware = async (req, res, next) => {
  const path7 = req.path;
  const pageConfig = PAGE_CONFIGS[path7];
  if (!pageConfig) {
    return next();
  }
  req.pageConfig = pageConfig;
  req.isUniversalFormatPage = true;
  req.autoOutputFormat = pageConfig.autoOutput;
  req.allowedOutputFormats = [...pageConfig.allowedOutputs];
  if (pageConfig.requiresAuth) {
    const session4 = req.session;
    if (!session4?.userId) {
      return res.status(401).json({
        error: "Authentication required",
        message: "Please sign in to access this plan",
        redirectUrl: "/auth/signin"
      });
    }
  }
  if (pageConfig.requiresPayment) {
    const session4 = req.session;
    const hasValidPayment = await checkPaymentStatus(
      session4?.userId,
      pageConfig.paymentAmount,
      pageConfig.planName
    );
    if (!hasValidPayment) {
      return res.status(402).json({
        error: "Payment required",
        message: `Please complete payment of $${pageConfig.paymentAmount} to access this plan`,
        paymentUrl: `/payment/confirm?plan=${pageConfig.planName}&amount=${pageConfig.paymentAmount}`
      });
    }
    if (pageConfig.planName === "test-premium") {
      const session5 = req.session;
      const paymentDate = session5?.paymentDate;
      if (paymentDate) {
        const hoursSincePayment = (Date.now() - new Date(paymentDate).getTime()) / (1e3 * 60 * 60);
        if (hoursSincePayment >= 24) {
          return res.status(403).json({
            error: "Plan expired",
            message: "Your test premium plan has expired after 24 hours",
            redirectUrl: "/simple-pricing"
          });
        }
      }
    }
    if (pageConfig.planName === "premium" || pageConfig.planName === "enterprise") {
      const session5 = req.session;
      const planExpiry = session5?.planExpiry;
      if (planExpiry && new Date(planExpiry) < /* @__PURE__ */ new Date()) {
        return res.status(403).json({
          error: "Subscription expired",
          message: "Your monthly subscription has expired. Please renew to continue.",
          paymentUrl: `/payment/renew?plan=${pageConfig.planName}`
        });
      }
    }
  }
  next();
};
var conversionPageMiddleware = async (req, res, next) => {
  try {
    const path7 = req.path;
    if (PAGE_CONFIGS[path7]) {
      return next();
    }
    const pathMatch = req.path.match(/^\/(convert|compress)\/([a-z0-9]+-to-[a-z0-9]+)$/);
    if (!pathMatch) {
      return next();
    }
    const [, operationType, conversionKey] = pathMatch;
    const route = conversionKey;
    if (!CONVERSION_MATRIX[route]) {
      return res.status(404).json({
        error: "Invalid conversion route",
        message: `Conversion ${route} is not supported`
      });
    }
    const config = CONVERSION_MATRIX[route];
    req.conversionRoute = route;
    req.conversionConfig = config;
    req.pageIdentifier = `/${operationType}/${route}`;
    req.formatType = FORMAT_TYPES.RAW.includes(config.input) ? "RAW" : "REGULAR";
    req.autoOutputFormat = config.output;
    req.allowedOutputFormats = [config.output];
    console.log(`[ConversionMiddleware] Processing ${req.pageIdentifier} - ${config.type}: ${config.input} -> ${config.output}`);
    next();
  } catch (error) {
    console.error("[ConversionMiddleware] Error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to process conversion request"
    });
  }
};
var conversionValidationMiddleware = async (req, res, next) => {
  let limits;
  if (req.isUniversalFormatPage && req.pageConfig) {
    limits = req.pageConfig.limits;
  } else if (req.conversionConfig) {
    const { input } = req.conversionConfig;
    limits = FORMAT_TYPES.RAW.includes(input) ? SINGLE_CONVERSION_LIMITS.RAW : SINGLE_CONVERSION_LIMITS.REGULAR;
  } else {
    return next();
  }
  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files) {
      if (file.size > limits.maxFileSize) {
        return res.status(400).json({
          error: "File too large",
          message: `Maximum file size is ${limits.maxFileSize / (1024 * 1024)}MB`
        });
      }
      if (req.conversionConfig && "originalname" in file) {
        const { input } = req.conversionConfig;
        const fileExt = file.originalname.split(".").pop()?.toLowerCase();
        if (fileExt !== input && !(input === "jpg" && fileExt === "jpeg")) {
          return res.status(400).json({
            error: "Invalid file format",
            message: `This page only accepts ${input.toUpperCase()} files`
          });
        }
      }
    }
  }
  const sessionId = req.sessionID;
  const session4 = req.session;
  const userId2 = session4?.userId;
  const identifier = req.pageIdentifier || req.path;
  try {
    let userType = "anonymous";
    if (userId2) {
      const storage3 = global.storage;
      const user = await storage3?.getUser(userId2);
      userType = user?.subscriptionTier || "free";
    }
    let auditContext;
    const isSuperuserBypass = await hasSuperuserBypass(req);
    if (isSuperuserBypass) {
      auditContext = {
        adminUserId: userId2,
        superBypass: true,
        bypassReason: session4.superBypassReason || "admin_testing",
        ipAddress: req.ip,
        userAgent: req.get("User-Agent")
      };
      console.log(`\u{1F513} Superuser bypass active for ${userId2 || "session " + sessionId}`);
    }
    const tracker = new DualUsageTracker(userId2, sessionId, userType, auditContext);
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const result = await tracker.canPerformOperation(
          file.originalname || "unknown.jpg",
          file.size,
          identifier
        );
        if (!result.allowed && !isSuperuserBypass) {
          let retryAfter;
          if (result.reason?.includes("Hourly")) retryAfter = 3600;
          else if (result.reason?.includes("Daily")) retryAfter = 86400;
          return res.status(429).json({
            error: result.reason?.includes("limit") ? "Usage limit exceeded" : "Operation not allowed",
            message: result.reason,
            retryAfter,
            upgradeUrl: result.reason?.includes("Monthly") ? "/simple-pricing" : void 0,
            limits: result.limits,
            usage: result.usage
          });
        }
        if (!result.allowed && isSuperuserBypass) {
          console.log(`\u{1F513} Superuser bypass: Allowing operation despite limits for ${file.originalname}`);
        }
        if (result.wasBypassed) {
          console.log(`\u26A0\uFE0F Operation bypassed: ${result.reason} for ${file.originalname}`);
        }
      }
    } else {
      const defaultFilename = req.autoOutputFormat ? `test.${req.autoOutputFormat}` : "test.jpg";
      const result = await tracker.canPerformOperation(
        defaultFilename,
        1024 * 1024,
        // 1MB default size
        identifier
      );
      if (!result.allowed && !isSuperuserBypass) {
        let retryAfter;
        if (result.reason?.includes("Hourly")) retryAfter = 3600;
        else if (result.reason?.includes("Daily")) retryAfter = 86400;
        return res.status(429).json({
          error: result.reason?.includes("limit") ? "Usage limit exceeded" : "Operation not allowed",
          message: result.reason,
          retryAfter,
          upgradeUrl: result.reason?.includes("Monthly") ? "/simple-pricing" : void 0,
          limits: result.limits,
          usage: result.usage
        });
      }
      if (!result.allowed && isSuperuserBypass) {
        console.log(`\u{1F513} Superuser bypass: Allowing operation despite limits for default request`);
      }
      if (result.wasBypassed) {
        console.log(`\u26A0\uFE0F Operation bypassed: ${result.reason}`);
      }
    }
    req.usageTracker = tracker;
  } catch (error) {
    console.error("[ConversionValidation] Error checking limits:", error);
    if (await hasSuperuserBypass(req)) {
      console.log("\u{1F513} Bypass active - ignoring limit check failure");
    } else {
      return res.status(500).json({
        error: "Usage validation error",
        message: "Failed to validate operation limits"
      });
    }
  }
  next();
};
async function checkPaymentStatus(userId2, requiredAmount, planName) {
  try {
    return true;
  } catch (error) {
    console.error("[PaymentCheck] Error:", error);
    return false;
  }
}
var registerConversionRoutes = (app2) => {
  Object.keys(PAGE_CONFIGS).forEach((path7) => {
    console.log(`[ConversionRoutes] Registering universal format page: ${path7}`);
    app2.get(
      path7,
      planGatingMiddleware,
      conversionPageMiddleware,
      (req, res, next) => {
        next();
      }
    );
    app2.post(
      `/api${path7}`,
      planGatingMiddleware,
      conversionPageMiddleware,
      conversionValidationMiddleware,
      (req, res) => {
        res.json({
          message: "Processing conversion",
          autoOutput: req.autoOutputFormat,
          allowedOutputs: req.allowedOutputFormats
        });
      }
    );
  });
  Object.keys(CONVERSION_MATRIX).forEach((route) => {
    const config = CONVERSION_MATRIX[route];
    const path7 = `/${config.type}/${route}`;
    console.log(`[ConversionRoutes] Registering single conversion page: ${path7}`);
    app2.get(
      path7,
      conversionPageMiddleware,
      (req, res, next) => {
        next();
      }
    );
    app2.post(
      `/api${path7}`,
      conversionPageMiddleware,
      conversionValidationMiddleware,
      (req, res) => {
        res.json({
          message: "Processing conversion",
          route: path7,
          autoOutput: req.autoOutputFormat
        });
      }
    );
  });
};

// server/subscriptionTierMiddleware.ts
var import_drizzle_orm4 = require("drizzle-orm");
init_db();
init_schema();
var subscriptionTierAccessControl = async (req, res, next) => {
  try {
    const session4 = req.session;
    const path7 = req.path;
    if (!session4?.userId) {
      return next();
    }
    const [user] = await db.select({ subscriptionTier: users.subscriptionTier, subscriptionStatus: users.subscriptionStatus }).from(users).where((0, import_drizzle_orm4.eq)(users.id, session4.userId)).limit(1);
    if (!user) {
      return next();
    }
    const { subscriptionTier, subscriptionStatus } = user;
    const tierRestrictions = {
      test_premium: {
        blockedRoutes: ["/premium", "/enterprise", "/api/premium", "/api/enterprise"],
        redirectRoute: "/test-premium",
        allowedRoutes: ["/test-premium", "/free", "/", "/api/test-premium", "/api/free"]
      },
      free: {
        blockedRoutes: ["/premium", "/enterprise", "/test-premium", "/api/premium", "/api/enterprise", "/api/test-premium"],
        redirectRoute: "/free",
        allowedRoutes: ["/free", "/", "/api/free"]
      }
    };
    if (subscriptionTier === "test_premium" && subscriptionStatus === "active") {
      const restrictions = tierRestrictions.test_premium;
      if (restrictions.blockedRoutes.some((route) => path7.startsWith(route))) {
        return res.status(403).json({
          error: "Access denied",
          message: "Your Test Premium plan does not include access to this feature",
          subscriptionTier: "test_premium",
          redirectUrl: restrictions.redirectRoute,
          upgradeRequired: true
        });
      }
      if (path7 === "/free" || path7 === "/compress-free") {
        return res.redirect(302, restrictions.redirectRoute);
      }
    }
    if (subscriptionTier === "free" || !subscriptionTier) {
      const restrictions = tierRestrictions.free;
      if (restrictions.blockedRoutes.some((route) => path7.startsWith(route))) {
        return res.status(403).json({
          error: "Access denied",
          message: "Please upgrade your subscription to access this feature",
          subscriptionTier: subscriptionTier || "free",
          redirectUrl: restrictions.redirectRoute,
          upgradeRequired: true
        });
      }
    }
    next();
  } catch (error) {
    console.error("Subscription tier access control error:", error);
    next();
  }
};
var tierBasedRouting = async (req, res, next) => {
  try {
    const session4 = req.session;
    const path7 = req.path;
    if (!session4?.userId || !["/", "/dashboard", "/home"].includes(path7)) {
      return next();
    }
    const [user] = await db.select({ subscriptionTier: users.subscriptionTier, subscriptionStatus: users.subscriptionStatus }).from(users).where((0, import_drizzle_orm4.eq)(users.id, session4.userId)).limit(1);
    if (!user) {
      return next();
    }
    const { subscriptionTier, subscriptionStatus } = user;
    if (subscriptionTier === "test_premium" && subscriptionStatus === "active") {
      return res.redirect(302, "/test-premium");
    }
    if (subscriptionTier === "pro" && subscriptionStatus === "active") {
      return res.redirect(302, "/premium");
    }
    if (subscriptionTier === "enterprise" && subscriptionStatus === "active") {
      return res.redirect(302, "/enterprise");
    }
    if (path7 === "/" || path7 === "/dashboard") {
      return res.redirect(302, "/free");
    }
    next();
  } catch (error) {
    console.error("Tier-based routing error:", error);
    next();
  }
};
var apiTierAccessControl = async (req, res, next) => {
  try {
    const session4 = req.session;
    const path7 = req.path;
    if (!path7.startsWith("/api/") || !session4?.userId) {
      return next();
    }
    const [user] = await db.select({ subscriptionTier: users.subscriptionTier, subscriptionStatus: users.subscriptionStatus }).from(users).where((0, import_drizzle_orm4.eq)(users.id, session4.userId)).limit(1);
    if (!user) {
      return next();
    }
    const { subscriptionTier, subscriptionStatus } = user;
    const apiAccessRules = {
      test_premium: {
        allowedEndpoints: ["/api/compress", "/api/convert", "/api/test-premium", "/api/free", "/api/auth", "/api/universal-usage-stats"],
        blockedEndpoints: ["/api/premium", "/api/enterprise", "/api/bulk", "/api/priority"]
      },
      free: {
        allowedEndpoints: ["/api/compress", "/api/convert", "/api/free", "/api/auth", "/api/universal-usage-stats"],
        blockedEndpoints: ["/api/premium", "/api/enterprise", "/api/test-premium", "/api/bulk", "/api/priority"]
      }
    };
    if (subscriptionTier === "test_premium" && subscriptionStatus === "active") {
      const rules = apiAccessRules.test_premium;
      if (rules.blockedEndpoints.some((endpoint) => path7.startsWith(endpoint))) {
        return res.status(403).json({
          error: "API access denied",
          message: "Your Test Premium plan does not include access to this API endpoint",
          subscriptionTier: "test_premium",
          upgradeRequired: true
        });
      }
    }
    if ((subscriptionTier === "free" || !subscriptionTier) && subscriptionStatus !== "active") {
      const rules = apiAccessRules.free;
      if (rules.blockedEndpoints.some((endpoint) => path7.startsWith(endpoint))) {
        return res.status(403).json({
          error: "API access denied",
          message: "Please upgrade your subscription to access this API endpoint",
          subscriptionTier: subscriptionTier || "free",
          upgradeRequired: true
        });
      }
    }
    next();
  } catch (error) {
    console.error("API tier access control error:", error);
    next();
  }
};

// server/replitAuth.ts
var client = __toESM(require("openid-client"), 1);
var import_passport = require("openid-client/passport");
var import_passport2 = __toESM(require("passport"), 1);
var import_express_session = __toESM(require("express-session"), 1);
var import_memoizee = __toESM(require("memoizee"), 1);
var import_connect_pg_simple = __toESM(require("connect-pg-simple"), 1);
if (!process.env.REPLIT_DOMAINS) {
  console.warn("REPLIT_DOMAINS not provided - Replit authentication will be disabled");
}
var getOidcConfig = (0, import_memoizee.default)(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID
    );
  },
  { maxAge: 3600 * 1e3 }
);
function updateUserSession(user, tokens) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}
var isAuthenticated = async (req, res, next) => {
  if (!process.env.REPLIT_DOMAINS) {
    return next();
  }
  const user = req.user;
  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const now = Math.floor(Date.now() / 1e3);
  if (now <= user.expires_at) {
    return next();
  }
  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

// server/payment.ts
init_db();
init_schema();
var import_drizzle_orm5 = require("drizzle-orm");
var PLANS = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    operations: 500,
    features: ["500 operations/month", "10MB file limit", "API access", "Community support"]
  },
  "test-premium": {
    id: "test-premium",
    name: "Test Premium",
    price: 1,
    operations: 300,
    features: ["300 operations (24-hour access)", "50MB file limit", "All Premium features", "Priority support"]
  },
  premium: {
    id: "premium",
    name: "Premium",
    price: 29,
    operations: 1e4,
    features: ["10,000 operations/month", "50MB file limit", "Priority processing", "API access", "Email support"]
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    operations: 5e4,
    features: ["50,000 operations/month", "200MB file limit", "Custom integrations", "SLA guarantee", "Priority support"]
  }
};
async function processPayPalPayment(req, res) {
  try {
    const { plan, paypal_payment_id, billing } = req.body;
    if (!plan || !PLANS[plan]) {
      return res.status(400).json({ error: "Invalid plan selected" });
    }
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const planConfig = PLANS[plan];
    const subscriptionEndDate = /* @__PURE__ */ new Date();
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
    await db.update(users).set({
      subscriptionTier: plan,
      subscriptionStatus: "active",
      subscriptionStartDate: /* @__PURE__ */ new Date(),
      subscriptionEndDate,
      monthlyOperations: 0,
      updatedAt: /* @__PURE__ */ new Date()
    }).where((0, import_drizzle_orm5.eq)(users.id, userId2));
    await db.insert(paymentTransactions).values({
      userId: userId2,
      amount: planConfig.price,
      currency: "USD",
      paymentMethod: "paypal",
      paymentId: paypal_payment_id,
      status: "completed",
      plan,
      billingDetails: JSON.stringify(billing)
    });
    const [user] = await db.select().from(users).where((0, import_drizzle_orm5.eq)(users.id, userId2));
    if (user?.email) {
      console.log(`PayPal payment confirmed for ${user.email} - Plan: ${planConfig.name}, Amount: $${planConfig.price}`);
    }
    res.json({
      success: true,
      message: "PayPal payment processed and subscription updated",
      subscription: {
        plan: planConfig.name,
        operations: planConfig.operations,
        features: planConfig.features
      }
    });
  } catch (error) {
    console.error("PayPal payment processing failed:", error);
    res.status(500).json({
      error: "PayPal payment processing failed",
      message: error.message
    });
  }
}
async function getSubscriptionStatus(req, res) {
  try {
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const [user] = await db.select().from(users).where((0, import_drizzle_orm5.eq)(users.id, userId2));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const plan = user.subscriptionTier || "free";
    const planConfig = PLANS[plan];
    res.json({
      success: true,
      subscription: {
        plan: planConfig.name,
        status: user.subscriptionStatus || "inactive",
        operations: planConfig.operations,
        operationsUsed: user.monthlyOperations || 0,
        startDate: user.subscriptionStartDate,
        endDate: user.subscriptionEndDate,
        features: planConfig.features
      }
    });
  } catch (error) {
    console.error("Failed to get subscription status:", error);
    res.status(500).json({
      error: "Failed to get subscription status",
      message: error.message
    });
  }
}
async function cancelSubscription(req, res) {
  try {
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    await db.update(users).set({
      subscriptionTier: "free",
      subscriptionStatus: "cancelled",
      updatedAt: /* @__PURE__ */ new Date()
    }).where((0, import_drizzle_orm5.eq)(users.id, userId2));
    res.json({
      success: true,
      message: "Subscription cancelled successfully. You will retain access until the end of your current billing period."
    });
  } catch (error) {
    console.error("Failed to cancel subscription:", error);
    res.status(500).json({
      error: "Failed to cancel subscription",
      message: error.message
    });
  }
}

// server/paypal.ts
var import_paypal_server_sdk = require("@paypal/paypal-server-sdk");
var { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
if (!PAYPAL_CLIENT_ID) {
  throw new Error("Missing PAYPAL_CLIENT_ID");
}
if (!PAYPAL_CLIENT_SECRET) {
  throw new Error("Missing PAYPAL_CLIENT_SECRET");
}
var manualEnv = process.env.PAYPAL_ENVIRONMENT?.toLowerCase();
var isLiveEnvironment = false;
if (manualEnv === "live" || manualEnv === "production") {
  isLiveEnvironment = true;
} else if (manualEnv === "sandbox" || manualEnv === "test") {
  isLiveEnvironment = false;
} else {
  const startsWithBAA = PAYPAL_CLIENT_ID.startsWith("BAA");
  isLiveEnvironment = startsWithBAA;
}
var client2 = new import_paypal_server_sdk.Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET
  },
  timeout: 0,
  environment: isLiveEnvironment ? import_paypal_server_sdk.Environment.Production : import_paypal_server_sdk.Environment.Sandbox,
  logging: {
    logLevel: import_paypal_server_sdk.LogLevel.Info,
    logRequest: {
      logBody: true
    },
    logResponse: {
      logHeaders: true
    }
  }
});
var ordersController = new import_paypal_server_sdk.OrdersController(client2);
var oAuthAuthorizationController = new import_paypal_server_sdk.OAuthAuthorizationController(client2);
async function getClientToken() {
  const auth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
  ).toString("base64");
  const { result } = await oAuthAuthorizationController.requestToken(
    {
      authorization: `Basic ${auth}`
    },
    { intent: "sdk_init", response_type: "client_token" }
  );
  return result.accessToken;
}
async function createPaypalOrder(req, res) {
  try {
    const { amount, currency, intent } = req.body;
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({
        error: "Invalid amount. Amount must be a positive number."
      });
    }
    if (!currency) {
      return res.status(400).json({ error: "Invalid currency. Currency is required." });
    }
    if (!intent) {
      return res.status(400).json({ error: "Invalid intent. Intent is required." });
    }
    const collect = {
      body: {
        intent: "CAPTURE",
        // Must be uppercase
        purchaseUnits: [
          {
            amount: {
              currencyCode: currency,
              value: amount
            }
          }
        ]
      },
      prefer: "return=minimal"
    };
    const { body, ...httpResponse } = await ordersController.createOrder(collect);
    const jsonResponse = JSON.parse(String(body));
    const httpStatusCode = httpResponse.statusCode;
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
}
async function capturePaypalOrder(req, res) {
  try {
    const { orderID } = req.params;
    const collect = {
      id: orderID,
      prefer: "return=minimal"
    };
    const { body, ...httpResponse } = await ordersController.captureOrder(collect);
    const jsonResponse = JSON.parse(String(body));
    const httpStatusCode = httpResponse.statusCode;
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
}
async function loadPaypalDefault(req, res) {
  const clientToken = await getClientToken();
  res.json({
    clientToken,
    isLiveMode: isLiveEnvironment
    // Tell frontend which environment to use
  });
}

// server/auth.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"), 1);
var import_express_session2 = __toESM(require("express-session"), 1);
var import_connect_pg_simple2 = __toESM(require("connect-pg-simple"), 1);
var isAuthenticated2 = async (req, res, next) => {
  const session4 = req.session;
  if (!session4.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await storage.getUser(session4.userId);
    if (!user) {
      req.session.destroy(() => {
      });
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
async function hashPassword(password) {
  const saltRounds = 12;
  return import_bcryptjs2.default.hash(password, saltRounds);
}
async function verifyPassword(password, hashedPassword) {
  return import_bcryptjs2.default.compare(password, hashedPassword);
}

// server/routes.ts
init_schema();
init_schema();

// server/unifiedPlanConfig.ts
var UNIFIED_PLANS = {
  // Free Plan (Without Sign in) - Root page
  anonymous: {
    id: "anonymous",
    name: "anonymous",
    displayName: "Free (No Signup)",
    description: "500 operations/month - no signup required!",
    monthlyPrice: 0,
    limits: {
      monthlyOperations: 500,
      maxFileSize: 10 * 1024 * 1024,
      // 10MB
      maxOperationsPerDay: 25,
      maxOperationsPerHour: null,
      // No hourly limit
      maxConcurrentUploads: 1,
      processingTimeout: 30,
      allowedFormats: "*",
      // All image formats supported
      overageRate: 0
    },
    features: [
      "500 operations/month",
      "All image formats supported",
      "Max 10MB file size",
      "Max 25 operations/day",
      "1 concurrent upload"
    ],
    requiresSignup: false
  },
  // Free Plan (With Sign in) - /compress-free
  free: {
    id: "free",
    name: "free",
    displayName: "Free (With Signup)",
    description: "500 operations/month with account benefits",
    monthlyPrice: 0,
    limits: {
      monthlyOperations: 500,
      maxFileSize: 10 * 1024 * 1024,
      // 10MB
      maxOperationsPerDay: 25,
      maxOperationsPerHour: null,
      // No hourly limit
      maxConcurrentUploads: 1,
      processingTimeout: 30,
      allowedFormats: "*",
      // All image formats supported
      overageRate: 0
    },
    features: [
      "500 operations/month",
      "All image formats supported",
      "Max 10MB file size",
      "Max 25 operations/day",
      "1 concurrent upload"
    ],
    requiresSignup: true
  },
  // Test Premium Plan - $1/month - /test-premium
  test_premium: {
    id: "test_premium",
    name: "test_premium",
    displayName: "Test Premium ($1/month)",
    description: "300 operations for 1 day",
    monthlyPrice: 100,
    // $1.00
    limits: {
      monthlyOperations: 300,
      // 300 operations for 1 day
      maxFileSize: 50 * 1024 * 1024,
      // 50MB
      maxOperationsPerDay: 300,
      // all 300 can be used in 1 day
      maxOperationsPerHour: null,
      // No hourly limit
      maxConcurrentUploads: 3,
      processingTimeout: 60,
      allowedFormats: "*",
      // All image formats supported
      overageRate: 0
    },
    features: [
      "300 operations for 1 day",
      "All image formats supported",
      "Max 50MB file size",
      "Max 20 operations/hour",
      "3 concurrent uploads"
    ],
    requiresSignup: true,
    stripePriceId: "price_test_premium"
  },
  // Premium Plan - $29/month - /compress-premium
  pro: {
    id: "pro",
    name: "pro",
    displayName: "Premium ($29/month)",
    description: "10,000 operations/month with premium features",
    monthlyPrice: 2900,
    // $29.00
    limits: {
      monthlyOperations: 1e4,
      maxFileSize: 50 * 1024 * 1024,
      // 50MB
      maxOperationsPerDay: null,
      // no daily limit
      maxOperationsPerHour: 100,
      maxConcurrentUploads: 3,
      processingTimeout: 60,
      allowedFormats: "*",
      // All image formats supported
      overageRate: 0
    },
    features: [
      "10,000 operations/month",
      "All image formats supported",
      "Max 50MB file size",
      "Max 100 operations/hour",
      "3 concurrent uploads"
    ],
    requiresSignup: true,
    stripePriceId: "price_premium_monthly"
  },
  // Enterprise Plan - $99/month - /compress-enterprise
  enterprise: {
    id: "enterprise",
    name: "enterprise",
    displayName: "Enterprise ($99/month)",
    description: "50,000 operations/month with SLA guarantee",
    monthlyPrice: 9900,
    // $99.00
    limits: {
      monthlyOperations: 5e4,
      maxFileSize: 200 * 1024 * 1024,
      // 200MB
      maxOperationsPerDay: null,
      // no daily limit
      maxOperationsPerHour: null,
      // No rate limits
      maxConcurrentUploads: 5,
      processingTimeout: 120,
      allowedFormats: "*",
      // All image formats supported
      overageRate: 0
    },
    features: [
      "50,000 operations/month",
      "All image formats supported",
      "Max 200MB file size",
      "No rate limits",
      "5 concurrent uploads"
    ],
    requiresSignup: true,
    stripePriceId: "price_enterprise_monthly"
  },
  // CR2 to JPG (Without Sign In) - /convert/cr2-to-jpg
  "cr2-free": {
    id: "cr2-free",
    name: "cr2-free",
    displayName: "CR2 to JPG (No Signup)",
    description: "100 operations/month - CR2 to JPG only",
    monthlyPrice: 0,
    limits: {
      monthlyOperations: 100,
      maxFileSize: 25 * 1024 * 1024,
      // 25MB
      maxOperationsPerDay: 10,
      maxOperationsPerHour: 5,
      // Max 5 operations/hour as per rules
      maxConcurrentUploads: 1,
      processingTimeout: 60,
      allowedFormats: ["cr2"],
      // Only CR2 to JPG
      overageRate: 0
    },
    features: [
      "100 operations/month",
      "Only CR2 to JPG",
      "Max 25MB file size",
      "Max 10 operations/day",
      "1 concurrent upload"
    ],
    requiresSignup: false
  }
};
function getUnifiedPlan(planId) {
  return UNIFIED_PLANS[planId] || UNIFIED_PLANS.anonymous;
}
function getUserPlan(user) {
  if (!user) return UNIFIED_PLANS.anonymous;
  if (user.subscriptionPlan && UNIFIED_PLANS[user.subscriptionPlan]) {
    return UNIFIED_PLANS[user.subscriptionPlan];
  }
  return UNIFIED_PLANS.free;
}

// server/routes.ts
var import_stripe3 = __toESM(require("stripe"), 1);

// server/apiRoutes.ts
var import_express2 = require("express");
var import_multer = __toESM(require("multer"), 1);
var import_fs3 = require("fs");
var import_path3 = __toESM(require("path"), 1);

// server/apiAuth.ts
var import_crypto4 = __toESM(require("crypto"), 1);
var import_bcryptjs3 = __toESM(require("bcryptjs"), 1);
init_db();
init_schema();
var import_drizzle_orm7 = require("drizzle-orm");

// server/paymentProtection.ts
var import_stripe = __toESM(require("stripe"), 1);
init_db();
init_schema();
var import_drizzle_orm6 = require("drizzle-orm");
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required Stripe secret: STRIPE_SECRET_KEY");
}
var stripe = new import_stripe.default(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil"
});
async function handlePaymentFailure(customerId, invoiceId, failureReason) {
  try {
    const [user] = await db.select().from(users).where((0, import_drizzle_orm6.eq)(users.stripeCustomerId, customerId)).limit(1);
    if (!user) {
      console.error(`No user found for Stripe customer: ${customerId}`);
      return;
    }
    const invoice = await stripe.invoices.retrieve(invoiceId);
    const amountDue = invoice.amount_due / 100;
    console.log(`Payment failure for user ${user.id}: $${amountDue} - ${failureReason}`);
    const attemptCount = invoice.attempt_count || 0;
    if (attemptCount === 1) {
      await sendPaymentReminder(user, amountDue, failureReason);
    } else if (attemptCount === 2) {
      await sendPaymentWarning(user, amountDue);
    } else if (attemptCount >= 3) {
      await suspendApiAccess(user.id, amountDue, "payment_failed");
      await sendSuspensionNotice(user, amountDue);
    }
    if (attemptCount < 3) {
      await schedulePaymentRetry(invoice.id, 3);
    }
  } catch (error) {
    console.error("Error handling payment failure:", error);
  }
}
async function suspendApiAccess(userId2, amountDue, reason) {
  try {
    await db.update(apiKeys).set({
      isActive: false,
      suspendedAt: /* @__PURE__ */ new Date(),
      suspensionReason: `Payment failure: $${amountDue} - ${reason}`
    }).where((0, import_drizzle_orm6.eq)(apiKeys.userId, userId2));
    await db.update(users).set({
      accountStatus: "suspended",
      suspendedAt: /* @__PURE__ */ new Date(),
      suspensionReason: reason
    }).where((0, import_drizzle_orm6.eq)(users.id, userId2));
    console.log(`API access suspended for user ${userId2} - Amount due: $${amountDue}`);
  } catch (error) {
    console.error("Error suspending API access:", error);
  }
}
async function restoreApiAccess(userId2) {
  try {
    await db.update(apiKeys).set({
      isActive: true,
      suspendedAt: null,
      suspensionReason: null
    }).where((0, import_drizzle_orm6.eq)(apiKeys.userId, userId2));
    await db.update(users).set({
      accountStatus: "active",
      suspendedAt: null,
      suspensionReason: null
    }).where((0, import_drizzle_orm6.eq)(users.id, userId2));
    console.log(`API access restored for user ${userId2}`);
  } catch (error) {
    console.error("Error restoring API access:", error);
  }
}
async function sendPaymentReminder(user, amountDue, reason) {
  if (!user.email) return;
  const subject = "Payment Reminder - Micro JPEG API";
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h2 style="color: #2563eb;">Payment Reminder</h2>
      
      <p>Hi there,</p>
      
      <p>We had trouble processing your payment for the Micro JPEG API service:</p>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <strong>Amount Due:</strong> $${amountDue.toFixed(2)}<br>
        <strong>Reason:</strong> ${reason}<br>
        <strong>Service:</strong> API Compression Usage
      </div>
      
      <p>Please update your payment method to continue using our API services. We'll automatically retry the payment in 3 days.</p>
      
      <div style="margin: 30px 0;">
        <a href="https://billing.stripe.com/p/login/test_123" 
           style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
          Update Payment Method
        </a>
      </div>
      
      <p>If you have any questions, please contact our support team.</p>
      
      <p>Best regards,<br>Micro JPEG Team</p>
    </div>
  `;
  await emailService.sendEmail(user.email, subject, html);
}
async function sendPaymentWarning(user, amountDue) {
  if (!user.email) return;
  const subject = "Payment Warning - API Service Suspension Notice";
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h2 style="color: #dc2626;">Payment Warning</h2>
      
      <p>Hi there,</p>
      
      <p><strong>This is our second attempt to collect payment for your Micro JPEG API usage.</strong></p>
      
      <div style="background: #fef2f2; border: 1px solid #fca5a5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <strong>\u26A0\uFE0F Service Suspension Warning</strong><br><br>
        <strong>Amount Due:</strong> $${amountDue.toFixed(2)}<br>
        <strong>Action Required:</strong> Update payment method immediately<br>
        <strong>Suspension Date:</strong> After next failed payment attempt
      </div>
      
      <p>To avoid service interruption, please update your payment method now:</p>
      
      <div style="margin: 30px 0;">
        <a href="https://billing.stripe.com/p/login/test_123" 
           style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
          Update Payment Method Now
        </a>
      </div>
      
      <p><strong>What happens if payment fails again?</strong></p>
      <ul>
        <li>Your API keys will be immediately deactivated</li>
        <li>All API requests will be blocked</li>
        <li>Service will remain suspended until payment is received</li>
      </ul>
      
      <p>Contact support if you need assistance: support@microjpeg.com</p>
      
      <p>Best regards,<br>Micro JPEG Team</p>
    </div>
  `;
  await emailService.sendEmail(user.email, subject, html);
}
async function sendSuspensionNotice(user, amountDue) {
  if (!user.email) return;
  const subject = "API Service Suspended - Payment Required";
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h2 style="color: #dc2626;">Service Suspended</h2>
      
      <p>Hi there,</p>
      
      <p><strong>Your Micro JPEG API service has been suspended due to non-payment.</strong></p>
      
      <div style="background: #fef2f2; border: 1px solid #fca5a5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <strong>\u{1F6AB} Service Status: SUSPENDED</strong><br><br>
        <strong>Outstanding Balance:</strong> $${amountDue.toFixed(2)}<br>
        <strong>Suspension Date:</strong> ${(/* @__PURE__ */ new Date()).toLocaleDateString()}<br>
        <strong>API Keys:</strong> Deactivated
      </div>
      
      <p><strong>To restore service immediately:</strong></p>
      <ol>
        <li>Update your payment method</li>
        <li>Pay the outstanding balance</li>
        <li>Service will be automatically restored within 15 minutes</li>
      </ol>
      
      <div style="margin: 30px 0;">
        <a href="https://billing.stripe.com/p/login/test_123" 
           style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
          Pay Now to Restore Service
        </a>
      </div>
      
      <p><strong>Important:</strong> Continued non-payment may result in account termination and debt collection proceedings.</p>
      
      <p>Need help? Contact support: support@microjpeg.com</p>
      
      <p>Best regards,<br>Micro JPEG Team</p>
    </div>
  `;
  await emailService.sendEmail(user.email, subject, html);
}
async function schedulePaymentRetry(invoiceId, daysFromNow) {
  try {
    const retryDate = /* @__PURE__ */ new Date();
    retryDate.setDate(retryDate.getDate() + daysFromNow);
    console.log(`Payment retry scheduled for invoice ${invoiceId} on ${retryDate.toISOString()}`);
  } catch (error) {
    console.error("Error scheduling payment retry:", error);
  }
}
async function handlePaymentSuccess(customerId, invoiceId, tier = "pro", endDate) {
  try {
    const [user] = await db.select().from(users).where((0, import_drizzle_orm6.eq)(users.stripeCustomerId, customerId)).limit(1);
    if (!user) {
      console.error(`No user found for Stripe customer: ${customerId}`);
      return;
    }
    await db.update(users).set({
      subscriptionTier: tier,
      subscriptionStatus: "active",
      subscriptionEndDate: endDate,
      accountStatus: "active",
      suspendedAt: null,
      suspensionReason: null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where((0, import_drizzle_orm6.eq)(users.id, user.id));
    console.log(`User ${user.id} activated with tier: ${tier}${endDate ? `, expires: ${endDate}` : ""}`);
    if (user.accountStatus === "suspended") {
      await restoreApiAccess(user.id);
      await sendServiceRestoredEmail(user);
    }
    if (tier === "test_premium") {
      await sendTestPremiumWelcomeEmail(user, endDate);
    }
  } catch (error) {
    console.error("Error handling payment success:", error);
  }
}
async function sendServiceRestoredEmail(user) {
  if (!user.email) return;
  const subject = "API Service Restored - Thank You!";
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h2 style="color: #059669;">Service Restored</h2>
      
      <p>Hi there,</p>
      
      <p><strong>Great news! Your Micro JPEG API service has been restored.</strong></p>
      
      <div style="background: #f0fdf4; border: 1px solid #86efac; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <strong>\u2705 Service Status: ACTIVE</strong><br><br>
        <strong>Payment:</strong> Received and processed<br>
        <strong>API Keys:</strong> Reactivated<br>
        <strong>Restored:</strong> ${(/* @__PURE__ */ new Date()).toLocaleString()}
      </div>
      
      <p>Your API keys are now active and ready to use. Thank you for your payment!</p>
      
      <p>To prevent future service interruptions, consider:</p>
      <ul>
        <li>Setting up automatic payment notifications</li>
        <li>Keeping your payment method up to date</li>
        <li>Monitoring your usage through our dashboard</li>
      </ul>
      
      <p>Thank you for using Micro JPEG API!</p>
      
      <p>Best regards,<br>Micro JPEG Team</p>
    </div>
  `;
  await emailService.sendEmail(user.email, subject, html);
}
async function checkOutstandingDebt(userId2) {
  try {
    const [user] = await db.select().from(users).where((0, import_drizzle_orm6.eq)(users.id, userId2)).limit(1);
    if (!user?.stripeCustomerId) {
      return { hasDebt: false, amount: 0, daysPastDue: 0 };
    }
    const invoices = await stripe.invoices.list({
      customer: user.stripeCustomerId,
      status: "open",
      limit: 10
    });
    let totalDebt = 0;
    let daysPastDue = 0;
    for (const invoice of invoices.data) {
      totalDebt += invoice.amount_due / 100;
      if (invoice.due_date) {
        const dueDate = new Date(invoice.due_date * 1e3);
        const daysPast = Math.floor((Date.now() - dueDate.getTime()) / (1e3 * 60 * 60 * 24));
        daysPastDue = Math.max(daysPastDue, daysPast);
      }
    }
    return {
      hasDebt: totalDebt > 0,
      amount: totalDebt,
      daysPastDue: Math.max(0, daysPastDue)
    };
  } catch (error) {
    console.error("Error checking outstanding debt:", error);
    return { hasDebt: false, amount: 0, daysPastDue: 0 };
  }
}
async function sendTestPremiumWelcomeEmail(user, endDate) {
  if (!user.email) return;
  const subject = "\u{1F680} Welcome to Test Premium - 24 Hours of Premium Features!";
  const expiryFormatted = endDate.toLocaleDateString() + " at " + endDate.toLocaleTimeString();
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <div style="background: linear-gradient(135deg, #AD0000 0%, #FF4444 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">\u{1F680} Welcome to Test Premium!</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">24 hours of unlimited Premium features</p>
      </div>
      
      <div style="padding: 30px; background: white; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
        <p>Hi ${user.firstName || "there"},</p>
        
        <p><strong>Congratulations! Your $1 Test Premium access is now active.</strong></p>
        
        <div style="background: #f0fdf4; border-left: 4px solid #AD0000; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 15px 0; color: #AD0000;">\u2728 Your Test Premium Benefits:</h3>
          <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
            <li><strong>300 operations</strong> for 24 hours</li>
            <li><strong>50MB file size limit</strong> (5x bigger than Free)</li>
            <li><strong>All formats including RAW</strong> (CR2, ARW, DNG, NEF, etc.)</li>
            <li><strong>Advanced quality controls</strong></li>
            <li><strong>No ads</strong> - clean, professional interface</li>
            <li><strong>3 concurrent uploads</strong></li>
            <li><strong>Priority processing</strong></li>
            <li><strong>API access</strong></li>
          </ul>
        </div>

        <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>\u23F0 Your Test Premium expires:</strong> ${expiryFormatted}</p>
        </div>
        
        <p><strong>Ready to test?</strong> Head to your compression page and experience the difference!</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL || "https://microjpeg.com"}/test-premium" 
             style="background: #AD0000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Start Testing Premium Features \u2192
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <h3 style="color: #AD0000;">\u{1F4A1} Love the Premium experience?</h3>
        <p>After your 24-hour test, upgrade to our full Premium plan:</p>
        <ul style="line-height: 1.6;">
          <li><strong>$29/month</strong> for 10,000 operations</li>
          <li>Everything from Test Premium</li>
          <li>Monthly billing, cancel anytime</li>
          <li>Priority support</li>
        </ul>
        
        <p>Questions? Reply to this email - we're here to help!</p>
        
        <p>Happy compressing!<br>
        The Micro JPEG Team</p>
      </div>
    </div>
  `;
  await emailService.sendEmail(user.email, subject, html);
}

// server/apiAuth.ts
var ApiKeyManager = class {
  /**
   * Generate a new API key with proper formatting
   */
  static generateApiKey() {
    const randomBytes = import_crypto4.default.randomBytes(24).toString("hex");
    const fullKey = `sk_test_${randomBytes}`;
    const keyHash = import_bcryptjs3.default.hashSync(fullKey, 10);
    const keyPrefix = fullKey.substring(0, 15);
    return { fullKey, keyHash, keyPrefix };
  }
  /**
   * Create a new API key for a user
   */
  static async createApiKey(userId2, name, permissions = ["compress", "convert"], rateLimit = 1e3, expiresAt) {
    const { fullKey, keyHash, keyPrefix } = this.generateApiKey();
    const [apiKey] = await db.insert(apiKeys).values({
      userId: userId2,
      name,
      keyHash,
      keyPrefix,
      permissions,
      // Store array directly in JSONB
      rateLimit,
      expiresAt
    }).returning();
    return {
      apiKey: {
        ...apiKey,
        permissions: apiKey.permissions
        // Cast directly as array
      },
      fullKey
      // Only return the full key once during creation
    };
  }
  /**
   * Validate an API key and return key info
   */
  static async validateApiKey(providedKey) {
    if (!providedKey || !providedKey.startsWith("sk_")) {
      return null;
    }
    const activeKeys = await db.select().from(apiKeys).innerJoin(users, (0, import_drizzle_orm7.eq)(apiKeys.userId, users.id)).where((0, import_drizzle_orm7.and)(
      (0, import_drizzle_orm7.eq)(apiKeys.isActive, true)
      // Check if key hasn't expired
    ));
    for (const { api_keys: key, users: user } of activeKeys) {
      if (import_bcryptjs3.default.compareSync(providedKey, key.keyHash)) {
        if (key.expiresAt && /* @__PURE__ */ new Date() > key.expiresAt) {
          return null;
        }
        await db.update(apiKeys).set({
          lastUsedAt: /* @__PURE__ */ new Date(),
          usageCount: (key.usageCount || 0) + 1
        }).where((0, import_drizzle_orm7.eq)(apiKeys.id, key.id));
        return {
          id: key.id,
          userId: key.userId,
          name: key.name,
          permissions: key.permissions,
          // JSONB array stored directly
          rateLimit: key.rateLimit || 1e3,
          user: {
            id: user.id,
            email: user.email,
            subscriptionTier: user.subscriptionTier,
            subscriptionStatus: user.subscriptionStatus,
            isPremium: user.isPremium,
            purchasedCredits: user.purchasedCredits,
            monthlyOperations: user.monthlyOperations
          }
        };
      }
    }
    return null;
  }
  /**
   * Check rate limit for API key
   */
  static async checkRateLimit(apiKeyId, rateLimit) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1e3);
    const recentUsage = await db.select().from(apiUsage).where((0, import_drizzle_orm7.and)(
      (0, import_drizzle_orm7.eq)(apiUsage.apiKeyId, apiKeyId)
      // Use >= for timestamp comparison
    ));
    return recentUsage.length < rateLimit;
  }
  /**
   * Log API usage for analytics and rate limiting
   */
  static async logUsage(apiKeyId, userId2, endpoint, method, statusCode, responseTime, bytesProcessed, bytesReturned, ipAddress, userAgent) {
    await db.insert(apiUsage).values({
      apiKeyId,
      userId: userId2,
      endpoint,
      method,
      statusCode,
      responseTime,
      bytesProcessed,
      bytesReturned,
      ipAddress,
      userAgent
    });
  }
};
var authenticateApiKey = async (req, res, next) => {
  const startTime = Date.now();
  try {
    const authHeader = req.headers.authorization;
    const apiKeyFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
    const apiKeyFromQuery = req.query.api_key;
    const providedKey = apiKeyFromHeader || apiKeyFromQuery;
    if (!providedKey) {
      return res.status(401).json({
        error: "API key required",
        message: 'Please provide your API key in the Authorization header as "Bearer sk_test_..." or as api_key query parameter'
      });
    }
    const keyInfo = await ApiKeyManager.validateApiKey(providedKey);
    if (!keyInfo) {
      return res.status(401).json({
        error: "Invalid API key",
        message: "The provided API key is invalid, expired, or inactive"
      });
    }
    const debtStatus = await checkOutstandingDebt(keyInfo.userId);
    if (debtStatus.hasDebt && debtStatus.daysPastDue > 7) {
      return res.status(402).json({
        error: "Payment Required",
        message: `Your API access is suspended due to outstanding payment of $${debtStatus.amount.toFixed(2)}. Please update your payment method to restore service.`,
        paymentRequired: true,
        amountDue: debtStatus.amount,
        daysPastDue: debtStatus.daysPastDue
      });
    }
    const withinRateLimit = await ApiKeyManager.checkRateLimit(keyInfo.id, keyInfo.rateLimit);
    if (!withinRateLimit) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        message: `You have exceeded your rate limit of ${keyInfo.rateLimit} requests per hour`
      });
    }
    req.apiKey = keyInfo;
    next();
    res.on("finish", () => {
      const responseTime = Date.now() - startTime;
      ApiKeyManager.logUsage(
        keyInfo.id,
        keyInfo.userId,
        req.path,
        req.method,
        res.statusCode,
        responseTime,
        req.get("content-length") ? parseInt(req.get("content-length")) : void 0,
        res.get("content-length") ? parseInt(res.get("content-length")) : void 0,
        req.ip,
        req.get("user-agent")
      ).catch(console.error);
    });
  } catch (error) {
    console.error("API authentication error:", error);
    return res.status(500).json({
      error: "Authentication error",
      message: "An error occurred while authenticating your API key"
    });
  }
};
var requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.apiKey) {
      return res.status(401).json({
        error: "Authentication required",
        message: "This endpoint requires API authentication"
      });
    }
    if (!req.apiKey.permissions.includes(permission)) {
      return res.status(403).json({
        error: "Insufficient permissions",
        message: `Your API key does not have the required permission: ${permission}`
      });
    }
    next();
  };
};

// server/apiRoutes.ts
init_schema();
var import_uuid = require("uuid");

// server/rateLimiter.ts
var rateLimitStore = /* @__PURE__ */ new Map();
function rateLimitMiddleware(req, res, next) {
  const apiKey = req.apiKey;
  if (!apiKey) {
    return res.status(401).json({
      error: "Authentication required",
      message: "API key is required for rate limiting"
    });
  }
  const now = /* @__PURE__ */ new Date();
  const keyId = apiKey.id;
  const currentHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
  let rateLimitEntry = rateLimitStore.get(keyId);
  if (!rateLimitEntry || rateLimitEntry.resetTime <= now) {
    rateLimitEntry = {
      requests: 0,
      resetTime: new Date(currentHour.getTime() + 60 * 60 * 1e3)
      // Next hour
    };
    rateLimitStore.set(keyId, rateLimitEntry);
  }
  const rateLimit = apiKey.rateLimit || 1e3;
  if (rateLimitEntry.requests >= rateLimit) {
    const resetIn = Math.ceil((rateLimitEntry.resetTime.getTime() - now.getTime()) / 1e3);
    return res.status(429).json({
      error: "Rate limit exceeded",
      message: `You have exceeded your rate limit of ${rateLimit} requests per hour`,
      rateLimit: {
        limit: rateLimit,
        remaining: 0,
        resetTime: rateLimitEntry.resetTime.toISOString(),
        resetIn
      }
    });
  }
  rateLimitEntry.requests++;
  rateLimitStore.set(keyId, rateLimitEntry);
  res.set({
    "X-RateLimit-Limit": rateLimit.toString(),
    "X-RateLimit-Remaining": (rateLimit - rateLimitEntry.requests).toString(),
    "X-RateLimit-Reset": rateLimitEntry.resetTime.toISOString()
  });
  next();
}

// server/apiRoutes.ts
var import_child_process2 = require("child_process");
var import_util2 = require("util");
var import_sharp3 = __toESM(require("sharp"), 1);
var router2 = (0, import_express2.Router)();
var storage2 = import_multer.default.memoryStorage();
var upload = (0, import_multer.default)({
  storage: storage2,
  limits: {
    fileSize: 200 * 1024 * 1024,
    // 200MB max (will be checked per tier)
    files: 10
    // Up to 10 files per batch
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/svg+xml",
      "image/tiff",
      "image/tif",
      // RAW formats
      "image/arw",
      "image/cr2",
      "image/dng",
      "image/nef",
      "image/orf",
      "image/raf",
      "image/rw2",
      "application/octet-stream"
      // Some RAW files may have this MIME type
    ];
    const fileExtension = file.originalname.toLowerCase().split(".").pop();
    const validExtensions = ["jpg", "jpeg", "png", "webp", "avif", "svg", "tiff", "tif", "arw", "cr2", "dng", "nef", "orf", "raf", "rw2"];
    const isValidExtension = validExtensions.includes(fileExtension || "");
    if (allowedTypes.includes(file.mimetype) || isValidExtension) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype} (.${fileExtension})`));
    }
  }
});
var specialFormatUpload = (0, import_multer.default)({
  storage: storage2,
  limits: {
    fileSize: 150 * 1024 * 1024,
    // 150MB limit for professional formats
    files: 5
    // Up to 5 special format files per batch
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      // RAW formats
      "image/arw",
      "image/cr2",
      "image/dng",
      "image/nef",
      "image/orf",
      "image/raf",
      "image/rw2",
      "application/octet-stream",
      // Some RAW files may have this MIME type
      // SVG formats
      "image/svg+xml",
      "text/xml",
      // TIFF formats
      "image/tiff",
      "image/tif"
    ];
    const fileExtension = file.originalname.toLowerCase().split(".").pop();
    const isValidExtension = ["arw", "cr2", "dng", "nef", "orf", "raf", "rw2", "svg", "tiff", "tif"].includes(fileExtension || "");
    if (allowedMimeTypes.includes(file.mimetype) || isValidExtension) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported special format: ${file.mimetype} (.${fileExtension})`));
    }
  }
});
router2.get("/status", (req, res) => {
  res.json({
    status: "operational",
    version: "1.0.0",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    endpoints: {
      compress: "/api/v1/compress",
      batch: "/api/v1/batch",
      webhook: "/api/v1/webhook",
      "special-convert": "/api/v1/special/convert",
      "special-batch": "/api/v1/special/batch",
      "special-formats": "/api/v1/special/formats"
    },
    supportedFormats: {
      input: ["JPEG", "JPG", "PNG", "WEBP", "AVIF", "SVG", "TIFF", "TIF", "ARW", "CR2", "DNG", "NEF", "ORF", "RAF", "RW2"],
      output: ["JPEG", "PNG", "WEBP", "AVIF", "TIFF"]
    },
    tierLimits: {
      free: { maxFileSize: "10MB", operations: 500 },
      premium: { maxFileSize: "50MB", operations: 1e4 },
      enterprise: { maxFileSize: "200MB", operations: 5e4 }
    }
  });
});
router2.post(
  "/compress",
  authenticateApiKey,
  rateLimitMiddleware,
  requirePermission("compress"),
  upload.single("image"),
  async (req, res) => {
    const startTime = Date.now();
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "Missing file",
          message: 'Please provide an image file in the "image" field'
        });
      }
      const fileSize = req.file.size;
      const user = req.apiKey?.user;
      const tierConfig = getUserTier(user);
      const fileSizeCheck = checkFileLimit(user, fileSize);
      if (!fileSizeCheck.allowed) {
        const maxSizeMB = Math.round(tierConfig.limits.maxFileSize / (1024 * 1024));
        return res.status(413).json({
          error: "File size limit exceeded",
          message: `Maximum file size for ${tierConfig.displayName} tier is ${maxSizeMB}MB`,
          tier: tierConfig.displayName,
          maxFileSize: tierConfig.limits.maxFileSize,
          currentFileSize: fileSize,
          upgrade: tierConfig.id === "free" ? "Upgrade to Premium for 50MB files or Enterprise for 200MB files" : tierConfig.id === "pro" ? "Upgrade to Enterprise for 200MB files" : null
        });
      }
      const settingsInput = req.body.settings ? JSON.parse(req.body.settings) : {};
      const parseResult = apiCompressRequestSchema.safeParse(settingsInput);
      if (!parseResult.success) {
        return res.status(400).json({
          error: "Invalid settings",
          message: "Compression settings validation failed",
          details: parseResult.error.issues
        });
      }
      const settings = parseResult.data;
      const tempDir = import_path3.default.join(process.cwd(), "temp");
      const uploadsDir = import_path3.default.join(tempDir, "uploads");
      const outputDir = import_path3.default.join(tempDir, "compressed");
      await import_fs3.promises.mkdir(uploadsDir, { recursive: true });
      await import_fs3.promises.mkdir(outputDir, { recursive: true });
      const fileId = (0, import_uuid.v4)();
      const originalExtension = import_path3.default.extname(req.file.originalname);
      const inputPath = import_path3.default.join(uploadsDir, `${fileId}${originalExtension}`);
      await import_fs3.promises.writeFile(inputPath, req.file.buffer);
      let outputFormat = settings.outputFormat;
      if (outputFormat === "jpeg" && !req.file.originalname.toLowerCase().includes(".jpg") && !req.file.originalname.toLowerCase().includes(".jpeg")) {
      }
      const outputExtension = outputFormat === "jpeg" ? ".jpg" : `.${outputFormat}`;
      const outputPath = import_path3.default.join(outputDir, `compressed_${fileId}${outputExtension}`);
      const result = await CompressionEngine.compressWithAdvancedSettings(
        inputPath,
        outputPath,
        settings.quality,
        outputFormat,
        {
          compressionAlgorithm: settings.compressionAlgorithm,
          resizeQuality: settings.resizeQuality,
          progressive: settings.progressive,
          webOptimized: settings.webOptimization
        }
      );
      const originalStats = await import_fs3.promises.stat(inputPath);
      const compressedStats = await import_fs3.promises.stat(outputPath);
      const compressionRatio = Math.round((originalStats.size - compressedStats.size) / originalStats.size * 100);
      const compressedBuffer = await import_fs3.promises.readFile(outputPath);
      await import_fs3.promises.unlink(inputPath).catch(() => {
      });
      await import_fs3.promises.unlink(outputPath).catch(() => {
      });
      const processingTime = Date.now() - startTime;
      res.json({
        success: true,
        result: {
          id: fileId,
          originalFilename: req.file.originalname,
          originalSize: originalStats.size,
          compressedSize: compressedStats.size,
          compressionRatio,
          outputFormat,
          qualityUsed: result.qualityUsed,
          processingTime,
          data: compressedBuffer.toString("base64")
          // Return as base64 for API
        },
        usage: {
          apiKeyId: req.apiKey.id,
          bytesProcessed: originalStats.size,
          bytesReturned: compressedStats.size
        }
      });
    } catch (error) {
      console.error("API compression error:", error);
      res.status(500).json({
        error: "Compression failed",
        message: error.message || "An unexpected error occurred during compression"
      });
    }
  }
);
router2.post(
  "/batch",
  authenticateApiKey,
  rateLimitMiddleware,
  requirePermission("batch"),
  upload.array("images", 10),
  async (req, res) => {
    const startTime = Date.now();
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({
          error: "Missing files",
          message: 'Please provide image files in the "images" field'
        });
      }
      const settingsInput = req.body.settings ? JSON.parse(req.body.settings) : {};
      const parseResult = apiCompressRequestSchema.safeParse(settingsInput);
      if (!parseResult.success) {
        return res.status(400).json({
          error: "Invalid settings",
          message: "Compression settings validation failed",
          details: parseResult.error.issues
        });
      }
      const settings = parseResult.data;
      const tempDir = import_path3.default.join(process.cwd(), "temp");
      const uploadsDir = import_path3.default.join(tempDir, "uploads");
      const outputDir = import_path3.default.join(tempDir, "compressed");
      await import_fs3.promises.mkdir(uploadsDir, { recursive: true });
      await import_fs3.promises.mkdir(outputDir, { recursive: true });
      const results = [];
      let totalBytesProcessed = 0;
      let totalBytesReturned = 0;
      for (const file of files) {
        try {
          const fileId = (0, import_uuid.v4)();
          const originalExtension = import_path3.default.extname(file.originalname);
          const inputPath = import_path3.default.join(uploadsDir, `${fileId}${originalExtension}`);
          await import_fs3.promises.writeFile(inputPath, file.buffer);
          const outputFormat = settings.outputFormat;
          const outputExtension = outputFormat === "jpeg" ? ".jpg" : `.${outputFormat}`;
          const outputPath = import_path3.default.join(outputDir, `compressed_${fileId}${outputExtension}`);
          const result = await CompressionEngine.compressWithAdvancedSettings(
            inputPath,
            outputPath,
            settings.quality,
            outputFormat,
            {
              compressionAlgorithm: settings.compressionAlgorithm,
              resizeQuality: settings.resizeQuality,
              progressive: settings.progressive,
              webOptimized: settings.webOptimization
            }
          );
          const originalStats = await import_fs3.promises.stat(inputPath);
          const compressedStats = await import_fs3.promises.stat(outputPath);
          const compressionRatio = Math.round((originalStats.size - compressedStats.size) / originalStats.size * 100);
          const compressedBuffer = await import_fs3.promises.readFile(outputPath);
          totalBytesProcessed += originalStats.size;
          totalBytesReturned += compressedStats.size;
          results.push({
            id: fileId,
            originalFilename: file.originalname,
            originalSize: originalStats.size,
            compressedSize: compressedStats.size,
            compressionRatio,
            outputFormat,
            qualityUsed: result.qualityUsed,
            data: compressedBuffer.toString("base64"),
            success: true
          });
          await import_fs3.promises.unlink(inputPath).catch(() => {
          });
          await import_fs3.promises.unlink(outputPath).catch(() => {
          });
        } catch (error) {
          results.push({
            originalFilename: file.originalname,
            success: false,
            error: error.message
          });
        }
      }
      const processingTime = Date.now() - startTime;
      res.json({
        success: true,
        results,
        summary: {
          totalFiles: files.length,
          successfulFiles: results.filter((r) => r.success).length,
          failedFiles: results.filter((r) => !r.success).length,
          totalBytesProcessed,
          totalBytesReturned,
          totalCompressionRatio: Math.round((totalBytesProcessed - totalBytesReturned) / totalBytesProcessed * 100),
          processingTime
        },
        usage: {
          apiKeyId: req.apiKey.id,
          bytesProcessed: totalBytesProcessed,
          bytesReturned: totalBytesReturned
        }
      });
    } catch (error) {
      console.error("API batch compression error:", error);
      res.status(500).json({
        error: "Batch compression failed",
        message: error.message || "An unexpected error occurred during batch compression"
      });
    }
  }
);
router2.get(
  "/usage",
  authenticateApiKey,
  rateLimitMiddleware,
  async (req, res) => {
    try {
      res.json({
        apiKey: {
          id: req.apiKey.id,
          name: req.apiKey.name,
          permissions: req.apiKey.permissions,
          rateLimit: req.apiKey.rateLimit
        },
        usage: {
          currentHour: 0,
          // Would be calculated from apiUsage table
          remainingRequests: req.apiKey.rateLimit,
          resetTime: new Date(Date.now() + 60 * 60 * 1e3).toISOString()
        }
      });
    } catch (error) {
      console.error("API usage check error:", error);
      res.status(500).json({
        error: "Usage check failed",
        message: error.message
      });
    }
  }
);
var execAsync2 = (0, import_util2.promisify)(import_child_process2.exec);
router2.get("/special/formats", authenticateApiKey, rateLimitMiddleware, async (req, res) => {
  res.json({
    supportedFormats: {
      input: {
        raw: {
          formats: ["ARW", "CR2", "DNG", "NEF", "ORF", "RAF", "RW2"],
          description: "Camera RAW files from professional cameras",
          maxFileSize: "150MB",
          processingTime: "15-30 seconds"
        },
        vector: {
          formats: ["SVG"],
          description: "Scalable Vector Graphics",
          maxFileSize: "50MB",
          processingTime: "5-10 seconds"
        },
        formats: {
          formats: ["TIFF", "TIF"],
          description: "Tagged Image File Format",
          maxFileSize: "150MB",
          processingTime: "10-20 seconds"
        }
      },
      output: ["JPEG", "PNG", "WebP", "AVIF", "TIFF"],
      pricing: {
        perConversion: "$0.10",
        monthlyPlan: "$29.99/month for 500 conversions",
        enterprisePlan: "Custom pricing for 1000+ conversions/month"
      }
    }
  });
});
router2.post(
  "/special/convert",
  authenticateApiKey,
  rateLimitMiddleware,
  requirePermission("special-convert"),
  specialFormatUpload.single("file"),
  async (req, res) => {
    const startTime = Date.now();
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "Missing file",
          message: 'Please provide a special format file in the "file" field'
        });
      }
      const { outputFormat = "jpeg", quality = 85, resize, width, height, maintainAspect = "true" } = req.body;
      const validOutputFormats = ["jpeg", "png", "webp", "avif", "tiff"];
      if (!validOutputFormats.includes(outputFormat.toLowerCase())) {
        return res.status(400).json({
          error: "Invalid output format",
          message: `Supported output formats: ${validOutputFormats.join(", ")}`
        });
      }
      const tempDir = import_path3.default.join(process.cwd(), "temp");
      const uploadsDir = import_path3.default.join(tempDir, "uploads");
      const outputDir = import_path3.default.join(tempDir, "converted");
      await import_fs3.promises.mkdir(uploadsDir, { recursive: true });
      await import_fs3.promises.mkdir(outputDir, { recursive: true });
      const fileId = (0, import_uuid.v4)();
      const originalExtension = import_path3.default.extname(req.file.originalname);
      const inputPath = import_path3.default.join(uploadsDir, `${fileId}${originalExtension}`);
      await import_fs3.promises.writeFile(inputPath, req.file.buffer);
      const fileExtension = req.file.originalname.toLowerCase().split(".").pop();
      const outputExtension = outputFormat === "jpeg" ? "jpg" : outputFormat;
      const outputPath = import_path3.default.join(outputDir, `converted_${fileId}.${outputExtension}`);
      let conversionResult;
      if (["arw", "cr2", "dng", "nef", "orf", "raf", "rw2"].includes(fileExtension || "")) {
        conversionResult = await convertRawFileAPI(inputPath, outputPath, outputFormat, quality, resize, width, height, maintainAspect);
      } else if (fileExtension === "svg") {
        conversionResult = await convertSvgFileAPI(inputPath, outputPath, outputFormat, quality, resize, width, height, maintainAspect);
      } else if (["tiff", "tif"].includes(fileExtension || "")) {
        conversionResult = await convertTiffFileAPI(inputPath, outputPath, outputFormat, quality, resize, width, height, maintainAspect);
      } else {
        throw new Error(`Unsupported file format: ${fileExtension}`);
      }
      const originalStats = await import_fs3.promises.stat(inputPath);
      const compressedStats = await import_fs3.promises.stat(outputPath);
      const compressionRatio = Math.round((originalStats.size - compressedStats.size) / originalStats.size * 100);
      const convertedBuffer = await import_fs3.promises.readFile(outputPath);
      await import_fs3.promises.unlink(inputPath).catch(() => {
      });
      await import_fs3.promises.unlink(outputPath).catch(() => {
      });
      const processingTime = Date.now() - startTime;
      res.json({
        success: true,
        result: {
          id: fileId,
          originalFilename: req.file.originalname,
          originalSize: originalStats.size,
          convertedSize: compressedStats.size,
          compressionRatio,
          inputFormat: fileExtension?.toUpperCase(),
          outputFormat: outputFormat.toUpperCase(),
          processingTime,
          data: convertedBuffer.toString("base64")
        },
        usage: {
          apiKeyId: req.apiKey.id,
          bytesProcessed: originalStats.size,
          bytesReturned: compressedStats.size
        }
      });
    } catch (error) {
      console.error("API special format conversion error:", error);
      res.status(500).json({
        error: "Conversion failed",
        message: error.message || "An unexpected error occurred during conversion"
      });
    }
  }
);
router2.post(
  "/special/batch",
  authenticateApiKey,
  rateLimitMiddleware,
  requirePermission("special-batch"),
  specialFormatUpload.array("files", 5),
  async (req, res) => {
    const startTime = Date.now();
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({
          error: "Missing files",
          message: 'Please provide special format files in the "files" field'
        });
      }
      const { outputFormat = "jpeg", quality = 85, resize, width, height, maintainAspect = "true" } = req.body;
      const validOutputFormats = ["jpeg", "png", "webp", "avif", "tiff"];
      if (!validOutputFormats.includes(outputFormat.toLowerCase())) {
        return res.status(400).json({
          error: "Invalid output format",
          message: `Supported output formats: ${validOutputFormats.join(", ")}`
        });
      }
      const tempDir = import_path3.default.join(process.cwd(), "temp");
      const uploadsDir = import_path3.default.join(tempDir, "uploads");
      const outputDir = import_path3.default.join(tempDir, "converted");
      await import_fs3.promises.mkdir(uploadsDir, { recursive: true });
      await import_fs3.promises.mkdir(outputDir, { recursive: true });
      const results = [];
      let totalBytesProcessed = 0;
      let totalBytesReturned = 0;
      for (const file of files) {
        try {
          const fileId = (0, import_uuid.v4)();
          const originalExtension = import_path3.default.extname(file.originalname);
          const inputPath = import_path3.default.join(uploadsDir, `${fileId}${originalExtension}`);
          await import_fs3.promises.writeFile(inputPath, file.buffer);
          const fileExtension = file.originalname.toLowerCase().split(".").pop();
          const outputExtension = outputFormat === "jpeg" ? "jpg" : outputFormat;
          const outputPath = import_path3.default.join(outputDir, `converted_${fileId}.${outputExtension}`);
          let conversionResult;
          if (["arw", "cr2", "dng", "nef", "orf", "raf", "rw2"].includes(fileExtension || "")) {
            conversionResult = await convertRawFileAPI(inputPath, outputPath, outputFormat, quality, resize, width, height, maintainAspect);
          } else if (fileExtension === "svg") {
            conversionResult = await convertSvgFileAPI(inputPath, outputPath, outputFormat, quality, resize, width, height, maintainAspect);
          } else if (["tiff", "tif"].includes(fileExtension || "")) {
            conversionResult = await convertTiffFileAPI(inputPath, outputPath, outputFormat, quality, resize, width, height, maintainAspect);
          } else {
            throw new Error(`Unsupported file format: ${fileExtension}`);
          }
          const originalStats = await import_fs3.promises.stat(inputPath);
          const compressedStats = await import_fs3.promises.stat(outputPath);
          const compressionRatio = Math.round((originalStats.size - compressedStats.size) / originalStats.size * 100);
          const convertedBuffer = await import_fs3.promises.readFile(outputPath);
          totalBytesProcessed += originalStats.size;
          totalBytesReturned += compressedStats.size;
          results.push({
            id: fileId,
            originalFilename: file.originalname,
            originalSize: originalStats.size,
            convertedSize: compressedStats.size,
            compressionRatio,
            inputFormat: fileExtension?.toUpperCase(),
            outputFormat: outputFormat.toUpperCase(),
            data: convertedBuffer.toString("base64"),
            success: true
          });
          await import_fs3.promises.unlink(inputPath).catch(() => {
          });
          await import_fs3.promises.unlink(outputPath).catch(() => {
          });
        } catch (error) {
          results.push({
            originalFilename: file.originalname,
            success: false,
            error: error.message
          });
        }
      }
      const processingTime = Date.now() - startTime;
      res.json({
        success: true,
        results,
        summary: {
          totalFiles: files.length,
          successfulFiles: results.filter((r) => r.success).length,
          failedFiles: results.filter((r) => !r.success).length,
          totalBytesProcessed,
          totalBytesReturned,
          totalCompressionRatio: Math.round((totalBytesProcessed - totalBytesReturned) / totalBytesProcessed * 100),
          processingTime
        },
        usage: {
          apiKeyId: req.apiKey.id,
          bytesProcessed: totalBytesProcessed,
          bytesReturned: totalBytesReturned
        }
      });
    } catch (error) {
      console.error("API special format batch conversion error:", error);
      res.status(500).json({
        error: "Batch conversion failed",
        message: error.message || "An unexpected error occurred during batch conversion"
      });
    }
  }
);
async function convertRawFileAPI(inputPath, outputPath, outputFormat, quality, resize, width, height, maintainAspect) {
  console.log(`Converting RAW file ${inputPath} to ${outputFormat}...`);
  const tiffPath = inputPath + ".tiff";
  await execAsync2(`dcraw_emu -w -T "${inputPath}"`);
  const tiffExists = await import_fs3.promises.access(tiffPath).then(() => true).catch(() => false);
  if (!tiffExists) {
    throw new Error("Failed to convert RAW file to TIFF");
  }
  let convertCmd = `convert "${tiffPath}"`;
  if (resize === "true" && width && height) {
    const resizeOption = maintainAspect === "true" ? `${width}x${height}>` : `${width}x${height}!`;
    convertCmd += ` -resize "${resizeOption}"`;
  }
  switch (outputFormat.toLowerCase()) {
    case "jpeg":
      convertCmd += ` -quality ${quality}`;
      break;
    case "png":
      convertCmd += ` -define png:compression-level=8`;
      break;
    case "webp":
      convertCmd += ` -quality ${quality}`;
      break;
    case "avif":
      convertCmd += ` -quality ${quality}`;
      break;
    case "tiff":
      convertCmd += ` -compress lzw`;
      break;
  }
  convertCmd += ` "${outputPath}"`;
  await execAsync2(convertCmd);
  await import_fs3.promises.unlink(tiffPath).catch(() => {
  });
  return { success: true };
}
async function convertSvgFileAPI(inputPath, outputPath, outputFormat, quality, resize, width, height, maintainAspect) {
  console.log(`Converting SVG file ${inputPath} to ${outputFormat}...`);
  let convertCmd = `convert "${inputPath}"`;
  convertCmd = `convert -density 300 "${inputPath}"`;
  if (resize === "true" && width && height) {
    const resizeOption = maintainAspect === "true" ? `${width}x${height}>` : `${width}x${height}!`;
    convertCmd += ` -resize "${resizeOption}"`;
  }
  switch (outputFormat.toLowerCase()) {
    case "jpeg":
      convertCmd += ` -quality ${quality} -background white -flatten`;
      break;
    case "png":
      convertCmd += ` -define png:compression-level=8`;
      break;
    case "webp":
      convertCmd += ` -quality ${quality}`;
      break;
    case "avif":
      convertCmd += ` -quality ${quality}`;
      break;
    case "tiff":
      convertCmd += ` -compress lzw`;
      break;
  }
  convertCmd += ` "${outputPath}"`;
  await execAsync2(convertCmd);
  return { success: true };
}
async function convertTiffFileAPI(inputPath, outputPath, outputFormat, quality, resize, width, height, maintainAspect) {
  console.log(`Converting TIFF file ${inputPath} to ${outputFormat}...`);
  let sharpInstance = (0, import_sharp3.default)(inputPath);
  if (resize === "true" && width && height) {
    const resizeOptions = {
      width: parseInt(width.toString()),
      height: parseInt(height.toString()),
      fit: maintainAspect === "true" ? "inside" : "fill",
      withoutEnlargement: true
    };
    sharpInstance = sharpInstance.resize(resizeOptions);
  }
  switch (outputFormat.toLowerCase()) {
    case "jpeg":
      sharpInstance = sharpInstance.jpeg({ quality: parseInt(quality.toString()) });
      break;
    case "png":
      sharpInstance = sharpInstance.png({ compressionLevel: 8, palette: true });
      break;
    case "webp":
      sharpInstance = sharpInstance.webp({ quality: parseInt(quality.toString()) });
      break;
    case "avif":
      sharpInstance = sharpInstance.avif({ quality: parseInt(quality.toString()) });
      break;
    case "tiff":
      sharpInstance = sharpInstance.tiff({ compression: "lzw" });
      break;
  }
  await sharpInstance.toFile(outputPath);
  return { success: true };
}
router2.get("/pricing", authenticateApiKey, rateLimitMiddleware, (req, res) => {
  try {
    const pricing = {
      tiers: Object.values(API_PRICING_TIERS),
      payPerUse: {
        standardCompression: {
          rate: PAY_PER_USE_RATES.standardCompression,
          displayRate: `$${(PAY_PER_USE_RATES.standardCompression / 100).toFixed(3)}`,
          description: "Per standard image compression"
        },
        formatConversion: {
          rate: PAY_PER_USE_RATES.formatConversion,
          displayRate: `$${(PAY_PER_USE_RATES.formatConversion / 100).toFixed(3)}`,
          description: "Per format conversion (JPEG\u2192PNG, etc.)"
        },
        specialFormatConversion: {
          rate: PAY_PER_USE_RATES.specialFormatConversion,
          displayRate: `$${(PAY_PER_USE_RATES.specialFormatConversion / 100).toFixed(2)}`,
          description: "Per special format conversion (RAW, SVG, TIFF)"
        },
        batchProcessing: {
          rate: PAY_PER_USE_RATES.batchProcessing,
          displayRate: `$${(PAY_PER_USE_RATES.batchProcessing / 100).toFixed(3)}`,
          description: "Per batch request (multiple files)"
        }
      },
      calculator: {
        description: "Use these rates to calculate costs for your expected usage",
        example: "For 1000 special format conversions: 1000 \xD7 $0.10 = $100.00"
      }
    };
    res.json(pricing);
  } catch (error) {
    console.error("Error fetching pricing:", error);
    res.status(500).json({
      error: "Failed to fetch pricing",
      message: "An error occurred while retrieving pricing information"
    });
  }
});

// server/webhooks.ts
var import_express3 = require("express");
var import_stripe2 = __toESM(require("stripe"), 1);
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required Stripe secret: STRIPE_SECRET_KEY");
}
if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("Missing required Stripe webhook secret: STRIPE_WEBHOOK_SECRET");
}
var stripe2 = new import_stripe2.default(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil"
});
var router3 = (0, import_express3.Router)();
router3.post("/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe2.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log(`Received Stripe webhook: ${event.type}`);
  try {
    switch (event.type) {
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object);
        break;
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;
      case "invoice.payment_action_required":
        await handlePaymentActionRequired(event.data.object);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    res.status(200).json({ received: true });
  } catch (error) {
    console.error(`Error processing webhook ${event.type}:`, error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});
async function handleInvoicePaymentFailed(invoice) {
  console.log(`Payment failed for invoice: ${invoice.id}`);
  if (invoice.customer && typeof invoice.customer === "string") {
    await handlePaymentFailure(
      invoice.customer,
      invoice.id || "",
      "payment_failed"
    );
  }
}
async function handleInvoicePaymentSucceeded(invoice) {
  console.log(`Payment succeeded for invoice: ${invoice.id}`);
  if (invoice.customer && typeof invoice.customer === "string") {
    let tier = "free_registered";
    let endDate = void 0;
    if (invoice.subscription) {
      try {
        const subscription = await stripe2.subscriptions.retrieve(invoice.subscription);
        const priceId = subscription.items.data[0]?.price.id;
        if (priceId === "price_test_premium_placeholder") {
          tier = "test_premium";
          endDate = new Date(Date.now() + 24 * 60 * 60 * 1e3);
        } else if (priceId && priceId.includes("pro")) {
          tier = "pro";
        } else if (priceId && priceId.includes("enterprise")) {
          tier = "enterprise";
        }
      } catch (error) {
        console.error("Error retrieving subscription:", error);
      }
    }
    await handlePaymentSuccess(
      invoice.customer,
      invoice.id || "",
      tier,
      endDate
    );
  }
}
async function handleSubscriptionDeleted(subscription) {
  console.log(`Subscription deleted: ${subscription.id}`);
  if (typeof subscription.customer === "string") {
    await handlePaymentFailure(
      subscription.customer,
      "subscription_cancelled",
      "subscription_cancelled"
    );
  }
}
async function handlePaymentActionRequired(invoice) {
  console.log(`Payment action required for invoice: ${invoice.id}`);
}
async function handleSubscriptionUpdated(subscription) {
  console.log(`Subscription updated: ${subscription.id}, status: ${subscription.status}`);
  if (typeof subscription.customer === "string") {
    const priceId = subscription.items.data[0]?.price.id;
    let tier = "free_registered";
    let endDate = void 0;
    if (priceId === "price_test_premium_placeholder") {
      tier = "test_premium";
      endDate = new Date(Date.now() + 24 * 60 * 60 * 1e3);
    } else if (priceId && priceId.includes("pro")) {
      tier = "pro";
    } else if (priceId && priceId.includes("enterprise")) {
      tier = "enterprise";
    }
    if (subscription.status === "past_due") {
      await handlePaymentFailure(
        subscription.customer,
        "subscription_past_due",
        "subscription_past_due"
      );
    } else if (subscription.status === "active") {
      await handlePaymentSuccess(
        subscription.customer,
        "subscription_updated",
        tier,
        endDate
      );
    }
  }
}

// server/apiManagement.ts
var import_express4 = require("express");
init_schema();
var import_zod = require("zod");
init_db();
init_schema();
var import_drizzle_orm8 = require("drizzle-orm");
var router4 = (0, import_express4.Router)();
router4.get("/keys", isAuthenticated2, async (req, res) => {
  try {
    const userId2 = req.user.id;
    const userApiKeys = await db.select({
      id: apiKeys.id,
      name: apiKeys.name,
      keyPrefix: apiKeys.keyPrefix,
      permissions: apiKeys.permissions,
      rateLimit: apiKeys.rateLimit,
      usageCount: apiKeys.usageCount,
      lastUsedAt: apiKeys.lastUsedAt,
      expiresAt: apiKeys.expiresAt,
      isActive: apiKeys.isActive,
      createdAt: apiKeys.createdAt
    }).from(apiKeys).where((0, import_drizzle_orm8.eq)(apiKeys.userId, userId2)).orderBy(apiKeys.createdAt);
    const formattedKeys = userApiKeys.map((key) => ({
      ...key,
      permissions: key.permissions
      // JSONB array stored directly
    }));
    res.json({
      success: true,
      apiKeys: formattedKeys
    });
  } catch (error) {
    console.error("Error fetching API keys:", error);
    res.status(500).json({
      error: "Failed to fetch API keys",
      message: error.message
    });
  }
});
router4.post("/keys", isAuthenticated2, async (req, res) => {
  try {
    const userId2 = req.user.id;
    const parseResult = createApiKeySchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Invalid input",
        message: "API key creation data validation failed",
        details: parseResult.error.issues
      });
    }
    const { name, permissions, rateLimit, expiresAt } = parseResult.data;
    const existingKeys = await db.select({ count: apiKeys.id }).from(apiKeys).where((0, import_drizzle_orm8.and)(
      (0, import_drizzle_orm8.eq)(apiKeys.userId, userId2),
      (0, import_drizzle_orm8.eq)(apiKeys.isActive, true)
    ));
    if (existingKeys.length >= 5) {
      return res.status(400).json({
        error: "API key limit reached",
        message: "You can have a maximum of 5 active API keys"
      });
    }
    const result = await ApiKeyManager.createApiKey(
      userId2,
      name,
      permissions,
      rateLimit,
      expiresAt
    );
    res.status(201).json({
      success: true,
      message: "API key created successfully",
      apiKey: {
        id: result.apiKey.id,
        name: result.apiKey.name,
        keyPrefix: result.apiKey.keyPrefix,
        permissions: result.apiKey.permissions,
        rateLimit: result.apiKey.rateLimit,
        expiresAt: result.apiKey.expiresAt,
        createdAt: result.apiKey.createdAt
      },
      fullKey: result.fullKey
      // Only shown once!
    });
  } catch (error) {
    console.error("Error creating API key:", error);
    res.status(500).json({
      error: "Failed to create API key",
      message: error.message
    });
  }
});
router4.put("/keys/:keyId", isAuthenticated2, async (req, res) => {
  try {
    const userId2 = req.user.id;
    const keyId = req.params.keyId;
    const updateSchema = import_zod.z.object({
      name: import_zod.z.string().min(1).max(50).optional(),
      permissions: import_zod.z.array(import_zod.z.enum(["compress", "convert", "batch", "webhook"])).optional(),
      rateLimit: import_zod.z.number().min(100).max(1e4).optional(),
      isActive: import_zod.z.boolean().optional()
    });
    const parseResult = updateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Invalid input",
        message: "Update data validation failed",
        details: parseResult.error.issues
      });
    }
    const updates = parseResult.data;
    const updateData = { ...updates };
    const [updatedKey] = await db.update(apiKeys).set(updateData).where((0, import_drizzle_orm8.and)(
      (0, import_drizzle_orm8.eq)(apiKeys.id, keyId),
      (0, import_drizzle_orm8.eq)(apiKeys.userId, userId2)
    )).returning();
    if (!updatedKey) {
      return res.status(404).json({
        error: "API key not found",
        message: "The specified API key does not exist or does not belong to you"
      });
    }
    res.json({
      success: true,
      message: "API key updated successfully",
      apiKey: {
        id: updatedKey.id,
        name: updatedKey.name,
        keyPrefix: updatedKey.keyPrefix,
        permissions: updatedKey.permissions,
        // JSONB array
        rateLimit: updatedKey.rateLimit,
        expiresAt: updatedKey.expiresAt,
        isActive: updatedKey.isActive,
        updatedAt: updatedKey.updatedAt
      }
    });
  } catch (error) {
    console.error("Error updating API key:", error);
    res.status(500).json({
      error: "Failed to update API key",
      message: error.message
    });
  }
});
router4.delete("/keys/:keyId", isAuthenticated2, async (req, res) => {
  try {
    const userId2 = req.user.id;
    const keyId = req.params.keyId;
    const [deactivatedKey] = await db.update(apiKeys).set({ isActive: false }).where((0, import_drizzle_orm8.and)(
      (0, import_drizzle_orm8.eq)(apiKeys.id, keyId),
      (0, import_drizzle_orm8.eq)(apiKeys.userId, userId2)
    )).returning();
    if (!deactivatedKey) {
      return res.status(404).json({
        error: "API key not found",
        message: "The specified API key does not exist or does not belong to you"
      });
    }
    res.json({
      success: true,
      message: "API key deactivated successfully"
    });
  } catch (error) {
    console.error("Error deactivating API key:", error);
    res.status(500).json({
      error: "Failed to deactivate API key",
      message: error.message
    });
  }
});
router4.get("/keys/:keyId/usage", isAuthenticated2, async (req, res) => {
  try {
    const userId2 = req.user.id;
    const keyId = req.params.keyId;
    const [apiKey] = await db.select().from(apiKeys).where((0, import_drizzle_orm8.and)(
      (0, import_drizzle_orm8.eq)(apiKeys.id, keyId),
      (0, import_drizzle_orm8.eq)(apiKeys.userId, userId2)
    ));
    if (!apiKey) {
      return res.status(404).json({
        error: "API key not found",
        message: "The specified API key does not exist or does not belong to you"
      });
    }
    res.json({
      success: true,
      usage: {
        totalRequests: apiKey.usageCount || 0,
        rateLimit: apiKey.rateLimit || 1e3,
        lastUsedAt: apiKey.lastUsedAt,
        currentPeriodStart: new Date(Date.now() - 60 * 60 * 1e3).toISOString(),
        // Last hour
        currentPeriodEnd: new Date(Date.now() + 60 * 60 * 1e3).toISOString(),
        // Next hour
        // These would be calculated from apiUsage table in real implementation
        currentPeriodRequests: 0,
        remainingRequests: apiKey.rateLimit || 1e3
      }
    });
  } catch (error) {
    console.error("Error fetching API key usage:", error);
    res.status(500).json({
      error: "Failed to fetch API key usage",
      message: error.message
    });
  }
});

// server/apiDocs.ts
var import_express5 = require("express");
var router5 = (0, import_express5.Router)();
router5.get("/docs", (req, res) => {
  const docs = {
    title: "Micro JPEG API Documentation",
    version: "1.0.0",
    description: "Professional image compression API with advanced quality settings",
    baseUrl: `${req.protocol}://${req.get("host")}/api/v1`,
    authentication: {
      type: "Bearer Token",
      description: "Include your API key in the Authorization header",
      example: "Authorization: Bearer sk_test_1234567890abcdef"
    },
    endpoints: {
      status: {
        method: "GET",
        path: "/status",
        description: "Check API health and get endpoint information",
        authentication: false,
        response: {
          status: "operational",
          version: "1.0.0",
          timestamp: "2025-08-27T05:58:37.922Z",
          endpoints: {
            compress: "/api/v1/compress",
            batch: "/api/v1/batch",
            "special-convert": "/api/v1/special/convert",
            "special-batch": "/api/v1/special/batch",
            "special-formats": "/api/v1/special/formats",
            "pricing": "/api/v1/pricing"
          }
        }
      },
      compress: {
        method: "POST",
        path: "/compress",
        description: "Compress a single image with advanced settings",
        authentication: true,
        permissions: ["compress"],
        parameters: {
          image: {
            type: "file",
            required: true,
            description: "Image file to compress (JPEG, PNG, WebP, AVIF)"
          },
          settings: {
            type: "json",
            required: false,
            description: "Compression settings object",
            properties: {
              quality: {
                type: "number",
                range: "10-100",
                default: 75,
                description: "Compression quality percentage"
              },
              outputFormat: {
                type: "string",
                enum: ["jpeg", "webp", "avif", "png"],
                default: "jpeg",
                description: "Output image format"
              },
              compressionAlgorithm: {
                type: "string",
                enum: ["standard", "aggressive", "lossless", "mozjpeg", "progressive"],
                default: "standard",
                description: "Compression algorithm to use"
              },
              resizeQuality: {
                type: "string",
                enum: ["lanczos", "bicubic", "bilinear", "nearest"],
                default: "lanczos",
                description: "Resize quality algorithm"
              },
              webOptimization: {
                type: "boolean",
                default: true,
                description: "Enable web optimization"
              },
              progressive: {
                type: "boolean",
                default: false,
                description: "Enable progressive JPEG encoding"
              }
            }
          }
        },
        response: {
          success: true,
          result: {
            id: "uuid",
            originalFilename: "image.jpg",
            originalSize: 125037,
            compressedSize: 92376,
            compressionRatio: 26,
            outputFormat: "jpeg",
            qualityUsed: 75,
            processingTime: 245,
            data: "base64_encoded_image_data"
          }
        }
      },
      batch: {
        method: "POST",
        path: "/batch",
        description: "Compress multiple images in batch",
        authentication: true,
        permissions: ["batch"],
        parameters: {
          images: {
            type: "file[]",
            required: true,
            description: "Array of image files to compress (max 10)"
          },
          settings: {
            type: "json",
            required: false,
            description: "Same compression settings as single compress endpoint"
          }
        },
        response: {
          success: true,
          results: ["array of compression results"],
          summary: {
            totalFiles: 2,
            successfulFiles: 2,
            failedFiles: 0,
            totalBytesProcessed: 250074,
            totalBytesReturned: 184752,
            totalCompressionRatio: 26,
            processingTime: 2045
          }
        }
      },
      usage: {
        method: "GET",
        path: "/usage",
        description: "Get API key usage statistics",
        authentication: true,
        response: {
          apiKey: {
            id: "uuid",
            name: "My API Key",
            permissions: ["compress", "convert"],
            rateLimit: 1e3
          },
          usage: {
            currentHour: 45,
            remainingRequests: 955,
            resetTime: "2025-08-27T06:58:37.922Z"
          }
        }
      },
      specialFormats: {
        method: "GET",
        path: "/special/formats",
        description: "Get supported special formats and pricing information",
        authentication: true,
        permissions: ["special-convert"],
        response: {
          supportedFormats: {
            input: {
              raw: {
                formats: ["ARW", "CR2", "DNG", "NEF", "ORF", "RAF", "RW2"],
                description: "Camera RAW files from professional cameras",
                maxFileSize: "150MB",
                processingTime: "15-30 seconds"
              },
              vector: {
                formats: ["SVG"],
                description: "Scalable Vector Graphics",
                maxFileSize: "50MB",
                processingTime: "5-10 seconds"
              },
              formats: {
                formats: ["TIFF", "TIF"],
                description: "Tagged Image File Format",
                maxFileSize: "150MB",
                processingTime: "10-20 seconds"
              }
            },
            output: ["JPEG", "PNG", "WebP", "AVIF", "TIFF"],
            pricing: {
              perConversion: "$0.10",
              monthlyPlan: "$29.99/month for 500 conversions",
              enterprisePlan: "Custom pricing for 1000+ conversions/month"
            }
          }
        }
      },
      specialConvert: {
        method: "POST",
        path: "/special/convert",
        description: "Convert a single special format file (RAW, SVG, TIFF) to standard formats",
        authentication: true,
        permissions: ["special-convert"],
        parameters: {
          file: {
            type: "file",
            required: true,
            description: "Special format file to convert (RAW, SVG, TIFF)"
          },
          outputFormat: {
            type: "string",
            enum: ["jpeg", "png", "webp", "avif", "tiff"],
            default: "jpeg",
            description: "Output image format"
          },
          quality: {
            type: "number",
            range: "10-100",
            default: 85,
            description: "Output quality percentage"
          },
          resize: {
            type: "string",
            enum: ["true", "false"],
            default: "false",
            description: "Whether to resize the output image"
          },
          width: {
            type: "number",
            description: "Output width (when resize=true)"
          },
          height: {
            type: "number",
            description: "Output height (when resize=true)"
          },
          maintainAspect: {
            type: "string",
            enum: ["true", "false"],
            default: "true",
            description: "Maintain aspect ratio when resizing"
          }
        },
        response: {
          success: true,
          result: {
            id: "uuid",
            originalFilename: "IMG_001.arw",
            originalSize: 36474880,
            convertedSize: 518486,
            compressionRatio: 98,
            inputFormat: "ARW",
            outputFormat: "JPEG",
            processingTime: 12836,
            data: "base64-encoded-converted-file"
          },
          usage: {
            apiKeyId: "api-key-id",
            bytesProcessed: 36474880,
            bytesReturned: 518486
          }
        }
      },
      specialBatch: {
        method: "POST",
        path: "/special/batch",
        description: "Convert multiple special format files in a single request",
        authentication: true,
        permissions: ["special-batch"],
        parameters: {
          files: {
            type: "file[]",
            required: true,
            description: "Array of special format files to convert (max 5 files)"
          },
          outputFormat: {
            type: "string",
            enum: ["jpeg", "png", "webp", "avif", "tiff"],
            default: "jpeg",
            description: "Output format for all files"
          },
          quality: {
            type: "number",
            range: "10-100",
            default: 85,
            description: "Output quality for all files"
          }
        },
        response: {
          success: true,
          results: "Array of conversion results",
          summary: {
            totalFiles: 5,
            successfulFiles: 5,
            failedFiles: 0,
            totalBytesProcessed: 182374400,
            totalBytesReturned: 2592430,
            totalCompressionRatio: 98,
            processingTime: 64180
          }
        }
      }
    },
    errors: {
      "401": {
        description: "Authentication required or invalid API key",
        example: {
          error: "Invalid API key",
          message: "The provided API key is invalid, expired, or inactive"
        }
      },
      "403": {
        description: "Insufficient permissions",
        example: {
          error: "Insufficient permissions",
          message: "Your API key does not have the required permission: batch"
        }
      },
      "429": {
        description: "Rate limit exceeded",
        example: {
          error: "Rate limit exceeded",
          message: "You have exceeded your rate limit of 1000 requests per hour"
        }
      },
      "400": {
        description: "Bad request - invalid input",
        example: {
          error: "Invalid settings",
          message: "Compression settings validation failed"
        }
      }
    },
    examples: {
      curl_compress: `curl -X POST ${req.protocol}://${req.get("host")}/api/v1/compress \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@photo.jpg" \\
  -F 'settings={"quality":80,"outputFormat":"webp","compressionAlgorithm":"aggressive"}'`,
      curl_batch: `curl -X POST ${req.protocol}://${req.get("host")}/api/v1/batch \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "images=@photo1.jpg" \\
  -F "images=@photo2.png" \\
  -F 'settings={"quality":75,"outputFormat":"avif"}'`,
      curl_special_convert: `curl -X POST ${req.protocol}://${req.get("host")}/api/v1/special/convert \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@IMG_001.arw" \\
  -F "outputFormat=jpeg" \\
  -F "quality=85" \\
  -F "resize=true" \\
  -F "width=2560" \\
  -F "height=2560"`,
      curl_special_batch: `curl -X POST ${req.protocol}://${req.get("host")}/api/v1/special/batch \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "files=@photo1.arw" \\
  -F "files=@photo2.nef" \\
  -F "files=@vector.svg" \\
  -F "outputFormat=png" \\
  -F "quality=90"`,
      javascript: `// Using fetch API
const formData = new FormData();
formData.append('image', imageFile);
formData.append('settings', JSON.stringify({
  quality: 80,
  outputFormat: 'webp',
  compressionAlgorithm: 'aggressive'
}));

const response = await fetch('/api/v1/compress', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const result = await response.json();`,
      javascript_special: `// Convert a RAW file to JPEG
const formData = new FormData();
formData.append('file', rawFile); // File input from <input type="file">
formData.append('outputFormat', 'jpeg');
formData.append('quality', '85');
formData.append('resize', 'true');
formData.append('width', '2560');
formData.append('height', '2560');

const response = await fetch('/api/v1/special/convert', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const result = await response.json();

// Convert the base64 data back to a file
const convertedFile = new Blob([
  Uint8Array.from(atob(result.result.data), c => c.charCodeAt(0))
], { type: 'image/jpeg' });`
    }
  };
  res.json(docs);
});

// server/routes.ts
var execAsync3 = (0, import_util3.promisify)(import_child_process3.exec);
var normalizeFormat = (format) => {
  const normalized = format.toLowerCase().trim();
  const formatMap = {
    // JPEG aliases
    "jpg": "jpeg",
    "jpeg": "jpeg",
    // TIFF aliases  
    "tif": "tiff",
    "tiff": "tiff",
    // Other formats (no change needed)
    "png": "png",
    "webp": "webp",
    "avif": "avif",
    "svg": "svg",
    // RAW formats (keep as-is for processing)
    "cr2": "cr2",
    "cr3": "cr3",
    "arw": "arw",
    "dng": "dng",
    "nef": "nef",
    "orf": "orf",
    "raf": "raf",
    "crw": "crw"
  };
  return formatMap[normalized] || normalized;
};
var getFileExtension = (format) => {
  const normalized = normalizeFormat(format);
  const extensionMap = {
    "jpeg": "jpg",
    // JPEG files use .jpg extension
    "tiff": "tiff",
    // TIFF files use .tiff extension
    "png": "png",
    "webp": "webp",
    "avif": "avif",
    "svg": "svg"
  };
  return extensionMap[normalized] || normalized;
};
function generateBrandedFilename(originalFilename, inputFormat, outputFormat, operation = "compress", includeTimestamp = false) {
  const nameWithoutExt = import_path4.default.parse(originalFilename).name;
  const formatMap = {
    "jpeg": "jpg",
    "jpg": "jpg",
    "png": "png",
    "webp": "webp",
    "avif": "avif",
    "tiff": "tiff",
    "tif": "tiff",
    "svg": "svg"
  };
  const displayInputFormat = formatMap[inputFormat.toLowerCase()] || inputFormat.toLowerCase();
  const displayOutputFormat = formatMap[outputFormat.toLowerCase()] || outputFormat.toLowerCase();
  const extension = displayOutputFormat === "jpg" ? "jpg" : displayOutputFormat;
  let brandedName;
  if (operation === "compress" && inputFormat.toLowerCase() === outputFormat.toLowerCase()) {
    brandedName = `microjpeg_${displayInputFormat}_compressed`;
  } else {
    brandedName = `microjpeg_${displayInputFormat}_to_${displayOutputFormat}`;
  }
  const cleanName = nameWithoutExt.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 50);
  brandedName += `_${cleanName}`;
  if (includeTimestamp) {
    brandedName += `_${Date.now()}`;
  }
  brandedName += `.${extension}`;
  return brandedName;
}
function getMimeTypeForDownload(format) {
  const mimeTypes = {
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "webp": "image/webp",
    "avif": "image/avif",
    "tiff": "image/tiff",
    "tif": "image/tiff",
    "svg": "image/svg+xml"
  };
  return mimeTypes[format.toLowerCase()] || "application/octet-stream";
}
function generateZipReadmeContent(files, operation = "compress") {
  const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
  const fileCount = files.length;
  let content = `========================================
MICROJPEG - Image Processing Report
========================================

Processed Date: ${timestamp2}
Total Files: ${fileCount}
Operation: ${operation.toUpperCase()}
Download Type: Batch ZIP Archive

----------------------------------------
PROCESSED FILES:
----------------------------------------
`;
  files.forEach((file, index) => {
    const ext = import_path4.default.extname(file.name).slice(1).toLowerCase();
    const format = normalizeFormat(ext);
    content += `
${index + 1}. File: ${file.name}
   Format: ${format.toUpperCase()}
   Operation: ${operation.toUpperCase()}
`;
  });
  content += `
----------------------------------------
MICROJPEG BRANDING INFO:
----------------------------------------

All files in this ZIP have been processed by MicroJPEG
and follow our branded naming convention:

\u2022 Compressed files: microjpeg_[format]_compressed_[filename].[ext]
\u2022 Converted files: microjpeg_[input]_to_[output]_[filename].[ext]
\u2022 ZIP archives: microjpeg_batch_[operation]_[timestamp].zip

----------------------------------------
Thank you for using MicroJPEG!
Visit us at: https://microjpeg.com
Support: support@microjpeg.com
----------------------------------------
`;
  return content;
}
async function processCompressionJob(jobId, originalPath, originalFilename, settings, userId2, sessionId, userType = "anonymous", pageIdentifier = "free-no-auth") {
  try {
    let rawOutputFormat;
    if (settings.outputFormat === "keep-original") {
      const extension = originalFilename.split(".").pop()?.toLowerCase();
      if (extension === "tif" || extension === "tiff") {
        rawOutputFormat = "tiff";
      } else if (extension && ["jpg", "jpeg", "png", "webp", "avif", "svg"].includes(extension)) {
        rawOutputFormat = extension;
      } else {
        console.warn(`\u26A0\uFE0F Unknown file extension '${extension}' for ${originalFilename}, defaulting to JPEG`);
        rawOutputFormat = "jpeg";
      }
    } else {
      rawOutputFormat = settings.outputFormat;
    }
    const normalizedFormat = normalizeFormat(rawOutputFormat);
    const outputExtension = getFileExtension(normalizedFormat);
    const outputPath = import_path4.default.join("converted", `${jobId}.${outputExtension}`);
    const quality = settings.customQuality || 75;
    const outputFormat = normalizedFormat;
    console.log(`\u{1F5BC}\uFE0F Processing job ${jobId}: rawFormat=${rawOutputFormat}, normalizedFormat=${normalizedFormat}, outputExtension=${outputExtension}, quality=${quality}, originalFile=${originalFilename}`);
    const result = await compressionEngine_default.compressWithAdvancedSettings(
      originalPath,
      outputPath,
      quality,
      outputFormat,
      {
        compressionAlgorithm: settings.compressionAlgorithm || "standard",
        progressive: settings.progressiveJpeg || false,
        optimizeScans: settings.optimizeScans || false,
        arithmeticCoding: settings.arithmeticCoding || false,
        webOptimized: settings.optimizeForWeb !== false,
        // TIFF-specific options
        tiffCompression: settings.tiffCompression || "lzw",
        tiffPredictor: settings.tiffPredictor || "horizontal"
      }
    );
    const originalStats = await import_promises.default.stat(originalPath);
    const compressionRatio = originalStats.size > 0 ? Math.round((originalStats.size - result.finalSize) / originalStats.size * 100) : 0;
    let thumbnailPath;
    try {
      const previewsDir = import_path4.default.join(process.cwd(), "previews");
      await import_promises.default.mkdir(previewsDir, { recursive: true });
      thumbnailPath = import_path4.default.join(previewsDir, jobId + "_thumb.jpg");
      const thumbnailCommand = `convert "${outputPath}" -resize "256x256>" -quality 60 -strip "${thumbnailPath}"`;
      console.log(`\u{1F5BC}\uFE0F Generating thumbnail for ${outputFormat}: ${thumbnailCommand}`);
      await execAsync3(thumbnailCommand);
      console.log(`\u2705 Thumbnail generated: ${thumbnailPath}`);
    } catch (thumbnailError) {
      console.warn(`\u26A0\uFE0F Thumbnail generation failed for ${jobId}:`, thumbnailError);
      thumbnailPath = void 0;
    }
    let r2UploadResult = null;
    try {
      console.log(`\u{1F4E4} Uploading compressed image to R2: ${jobId}.${outputExtension}`);
      r2UploadResult = await r2Service.uploadFile(outputPath, `${jobId}.${outputExtension}`, {
        folder: R2_FOLDERS.COMPRESSED,
        contentType: `image/${outputFormat}`,
        metadata: {
          jobId,
          originalFilename,
          originalSize: originalStats.size.toString(),
          compressedSize: result.finalSize.toString(),
          compressionRatio: compressionRatio.toString(),
          quality: quality.toString(),
          outputFormat,
          userId: userId2 || "anonymous",
          sessionId,
          processedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      });
      console.log(`\u2705 Successfully uploaded to R2: ${r2UploadResult.cdnUrl}`);
      try {
        await import_promises.default.unlink(outputPath);
        console.log(`\u{1F5D1}\uFE0F Cleaned up local compressed file: ${outputPath}`);
      } catch (cleanupError) {
        console.warn(`Failed to clean up compressed file ${outputPath}:`, cleanupError);
      }
    } catch (r2Error) {
      console.error(`\u274C Failed to upload to R2: ${r2Error instanceof Error ? r2Error.message : "Unknown error"}`);
    }
    await storage.updateCompressionJob(jobId, {
      status: "completed",
      compressedSize: result.finalSize,
      compressionRatio,
      compressedPath: outputPath,
      qualityLevel: quality.toString(),
      outputFormat,
      // R2 CDN data
      r2Key: r2UploadResult?.key,
      cdnUrl: r2UploadResult?.cdnUrl,
      completedAt: /* @__PURE__ */ new Date()
    });
    try {
      const dualTracker = new DualUsageTracker(userId2, sessionId, userType);
      await dualTracker.recordOperation(originalFilename, originalStats.size, pageIdentifier);
      console.log(`\u2705 DualUsageTracker recorded operation: ${originalFilename} (${originalStats.size} bytes) on ${pageIdentifier}`);
    } catch (recordError) {
      console.error(`\u274C Failed to record operation in processCompressionJob:`, recordError);
    }
    console.log(`Successfully processed job ${jobId}: ${originalStats.size} \u2192 ${result.finalSize} bytes (${compressionRatio}% reduction)`);
  } catch (error) {
    console.error(`Failed to process job ${jobId}:`, error);
    await storage.updateCompressionJob(jobId, {
      status: "failed",
      errorMessage: `Processing failed: ${error.message}`
    });
  }
}
function getSessionIdFromRequest(req) {
  return req.session?.id || req.sessionID || "anonymous";
}
function requireScopeFromAuth(req, res, next) {
  req.trackingScope = "default";
  req.planId = "free";
  req.scopeEnforced = true;
  next();
}
var stripe3 = null;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("STRIPE_SECRET_KEY not provided - Stripe payments will be disabled");
  } else {
    stripe3 = new import_stripe3.default(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-08-27.basil"
    });
    console.log("\u2705 Stripe initialized successfully");
  }
} catch (error) {
  console.error("Failed to initialize Stripe:", error);
  console.warn("Stripe payments will be disabled");
}
var upload2 = (0, import_multer2.default)({
  dest: "uploads/",
  limits: {
    fileSize: 200 * 1024 * 1024
    // 200MB limit (supports Enterprise users)
  },
  fileFilter: (req, file, cb) => {
    const supportedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/svg+xml",
      "image/tiff",
      "image/tif",
      // RAW formats (browsers might use different MIME types)
      "image/x-adobe-dng",
      "image/x-canon-cr2",
      "image/x-nikon-nef",
      "image/x-sony-arw",
      "application/octet-stream"
      // Fallback for RAW files that browsers can't identify
    ];
    const fileName = file.originalname.toLowerCase();
    const hasValidExtension = fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".webp") || fileName.endsWith(".avif") || fileName.endsWith(".svg") || fileName.endsWith(".tiff") || fileName.endsWith(".tif") || fileName.endsWith(".cr2") || fileName.endsWith(".arw") || fileName.endsWith(".dng") || fileName.endsWith(".nef") || fileName.endsWith(".orf") || fileName.endsWith(".raf") || fileName.endsWith(".rw2") || fileName.endsWith(".crw");
    if (supportedTypes.includes(file.mimetype) || hasValidExtension) {
      cb(null, true);
    } else {
      cb(new Error(`File format not supported. Supported formats: JPG, PNG, WEBP, AVIF, SVG, TIFF, RAW (CR2, ARW, DNG, NEF, ORF, RAF, RW2)`));
    }
  }
});
var specialUpload = (0, import_multer2.default)({
  dest: "uploads/",
  limits: {
    fileSize: 200 * 1024 * 1024
    // 200MB limit for special formats (same as regular upload)
  },
  fileFilter: (req, file, cb) => {
    const specialAllowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/tiff",
      "image/svg+xml",
      "image/x-adobe-dng",
      "image/x-canon-cr2",
      "image/CR2",
      // Some browsers use this MIME type for CR2 files
      "image/x-nikon-nef",
      "image/x-sony-arw"
    ];
    const fileName = file.originalname.toLowerCase();
    const hasValidExtension = fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".tiff") || fileName.endsWith(".tif") || fileName.endsWith(".svg") || fileName.endsWith(".dng") || fileName.endsWith(".cr2") || fileName.endsWith(".nef") || fileName.endsWith(".arw");
    console.log(`Special upload: ${file.originalname}, MIME: ${file.mimetype}, Valid extension: ${hasValidExtension}`);
    if (specialAllowedTypes.includes(file.mimetype) || hasValidExtension) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, RAW (ARW, CR2, DNG, NEF), SVG, and TIFF files are allowed for special format conversions"));
    }
  }
});
async function ensureDirectories() {
  try {
    await import_promises.default.mkdir("uploads", { recursive: true });
    await import_promises.default.mkdir("compressed", { recursive: true });
  } catch (error) {
    console.log("Directories already exist or created successfully");
  }
}
async function registerRoutes(app2) {
  app2.get("/api/test", (req, res) => {
    res.json({ message: "API is working!" });
  });
  await ensureDirectories();
  app2.use((0, import_compression.default)({
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return import_compression.default.filter(req, res);
    },
    level: 6,
    // Balanced compression level
    threshold: 1024
    // Only compress files larger than 1KB
  }));
  app2.use("/assets", (req, res, next) => {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("Expires", new Date(Date.now() + 31536e6).toUTCString());
    next();
  });
  app2.use("/api", (req, res, next) => {
    if (req.method === "GET" && !req.path.includes("/auth/")) {
      res.setHeader("Cache-Control", "public, max-age=300");
    } else {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    }
    next();
  });
  app2.use(subscriptionTierAccessControl);
  app2.use(tierBasedRouting);
  app2.use("/api", apiTierAccessControl);
  app2.use("/api", pageIdentifierMiddleware);
  app2.use("/paypal", pageIdentifierMiddleware);
  registerConversionRoutes(app2);
  app2.get("/health/r2", async (req, res) => {
    try {
      const { r2Service: r2Service2 } = await Promise.resolve().then(() => (init_r2Service(), r2Service_exports));
      const healthStatus = await r2Service2.healthCheck();
      if (healthStatus.status === "healthy") {
        res.json({
          status: "healthy",
          r2: healthStatus.details
        });
      } else {
        res.status(503).json({
          status: "unhealthy",
          r2: healthStatus.details
        });
      }
    } catch (error) {
      res.status(503).json({
        status: "error",
        message: "R2 service not available",
        error: error.message
      });
    }
  });
  app2.get("/health/redis", async (req, res) => {
    res.json({
      status: "healthy",
      redis: "eliminated",
      message: "Redis has been eliminated for improved performance"
    });
  });
  app2.get("/api/job/:jobId/status", async (req, res) => {
    try {
      const { jobId } = req.params;
      const { getJobStatus: getJobStatus2 } = await Promise.resolve().then(() => (init_queueService(), queueService_exports));
      const jobStatus = await getJobStatus2(jobId);
      if (!jobStatus) {
        return res.status(404).json({
          error: "Job not found",
          jobId
        });
      }
      res.json({
        success: true,
        job: jobStatus
      });
    } catch (error) {
      console.error("Error getting job status:", error);
      res.status(500).json({
        error: "Failed to get job status",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/queue/add", async (req, res) => {
    try {
      const { jobType, jobData, options = {} } = req.body;
      const { addJobToQueue: addJobToQueue2 } = await Promise.resolve().then(() => (init_queueService(), queueService_exports));
      if (!jobType || !jobData) {
        return res.status(400).json({
          error: "Missing required fields: jobType, jobData"
        });
      }
      const job = await addJobToQueue2(jobType, jobData, "standard", options);
      res.json({
        success: true,
        jobId: job.id,
        message: `Job added to queue successfully`
      });
    } catch (error) {
      console.error("Error adding job to queue:", error);
      res.status(500).json({
        error: "Failed to add job to queue",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.use("/api/v1", router2);
  app2.use("/api", router4);
  app2.use("/api", paymentRoutes_default);
  app2.use("/webhooks", import_express6.default.raw({ type: "application/json" }), router3);
  app2.use("/api/v1", router5);
  app2.get("/api/preview/:id", (req, res) => {
    try {
      const { id } = req.params;
      if (!id.match(/^[a-zA-Z0-9_-]+$/)) {
        return res.status(400).json({ error: "Invalid preview ID" });
      }
      const previewPath = import_path4.default.join(process.cwd(), "previews", id + "_thumb.jpg");
      import_promises.default.access(previewPath).then(() => {
        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Cache-Control", "public, max-age=86400");
        const fileStream = (0, import_fs4.createReadStream)(previewPath);
        fileStream.pipe(res);
      }).catch(() => {
        res.status(404).json({ error: "Preview not found" });
      });
    } catch (error) {
      console.error("Error serving preview:", error);
      res.status(500).json({ error: "Failed to serve preview" });
    }
  });
  app2.get("/api/download/wordpress-plugin", (req, res, next) => {
    const pluginPath = import_path4.default.join(process.cwd(), "micro-jpeg-api-wordpress-plugin.zip");
    console.log("WordPress plugin download requested, serving from:", pluginPath);
    res.sendFile(pluginPath, (err) => {
      if (err) {
        console.error("WordPress plugin send file error:", err);
        res.status(404).json({ error: "WordPress plugin not found" });
      } else {
        console.log("WordPress plugin sent successfully");
      }
    });
  });
  app2.get("/api/download/:id", (req, res) => {
    try {
      const { id } = req.params;
      if (!id.match(/^[a-zA-Z0-9_-]+$/)) {
        return res.status(400).json({ error: "Invalid download ID" });
      }
      const findAndServeFile = async () => {
        try {
          const job = await storage.getCompressionJob(id);
          if (job && job.outputFormat) {
            console.log(`\u{1F53D} Download request for job ${id}: expected format=${job.outputFormat}`);
            const getExtension = (format) => {
              switch (format.toLowerCase()) {
                case "jpeg":
                case "jpg":
                  return "jpg";
                case "png":
                  return "png";
                case "webp":
                  return "webp";
                case "avif":
                  return "avif";
                case "tiff":
                  return "tiff";
                case "svg":
                  return "svg";
                default:
                  return format.toLowerCase();
              }
            };
            const correctExt = getExtension(job.outputFormat);
            const directories = ["converted", "compressed"];
            for (const dir of directories) {
              const filePath = import_path4.default.join(process.cwd(), dir, `${id}.${correctExt}`);
              try {
                await import_promises.default.access(filePath);
                const contentType = getMimeTypeForDownload(correctExt);
                const inputFormat = job.inputFormat || import_path4.default.extname(job.originalFilename || "").slice(1) || "jpg";
                const outputFormat = job.outputFormat;
                const operation = inputFormat.toLowerCase() === outputFormat.toLowerCase() ? "compress" : "convert";
                const brandedFilename = generateBrandedFilename(
                  job.originalFilename || `download_${id}`,
                  inputFormat,
                  outputFormat,
                  operation
                );
                const stats = await import_promises.default.stat(filePath);
                res.setHeader("Content-Type", contentType);
                res.setHeader("Content-Length", stats.size);
                res.setHeader("Content-Disposition", `attachment; filename="${brandedFilename}"`);
                res.setHeader("Cache-Control", "public, max-age=3600");
                console.log(`\u2705 Serving correct format: ${filePath} (${contentType})`);
                const fileStream = (0, import_fs4.createReadStream)(filePath);
                return fileStream.pipe(res);
              } catch (err) {
                continue;
              }
            }
          }
        } catch (dbError) {
          console.log(`\u26A0\uFE0F Could not get job from database: ${dbError}, falling back to file extension search`);
        }
        const possibleExtensions = ["tiff", "png", "webp", "avif", "svg", "jpg", "jpeg"];
        for (const ext of possibleExtensions) {
          const convertedPath = import_path4.default.join(process.cwd(), "converted", `${id}.${ext}`);
          try {
            await import_promises.default.access(convertedPath);
            const contentType = getMimeTypeForDownload(ext);
            const brandedFilename = generateBrandedFilename(
              `download_${id}`,
              "unknown",
              // Input format unknown in fallback
              ext,
              "convert"
              // Assume conversion since it's in converted directory
            );
            const stats = await import_promises.default.stat(convertedPath);
            res.setHeader("Content-Type", contentType);
            res.setHeader("Content-Length", stats.size);
            res.setHeader("Content-Disposition", `attachment; filename="${brandedFilename}"`);
            res.setHeader("Cache-Control", "public, max-age=3600");
            console.log(`\u{1F4C1} Serving from converted: ${convertedPath} (${contentType})`);
            const fileStream = (0, import_fs4.createReadStream)(convertedPath);
            return fileStream.pipe(res);
          } catch (err) {
            continue;
          }
        }
        for (const ext of possibleExtensions) {
          const compressedPath = import_path4.default.join(process.cwd(), "compressed", `${id}.${ext}`);
          try {
            await import_promises.default.access(compressedPath);
            const contentType = getMimeTypeForDownload(ext);
            const brandedFilename = generateBrandedFilename(
              `download_${id}`,
              ext,
              // Assume same format for compression
              ext,
              "compress"
              // Assume compression since it's in compressed directory
            );
            const stats = await import_promises.default.stat(compressedPath);
            res.setHeader("Content-Type", contentType);
            res.setHeader("Content-Length", stats.size);
            res.setHeader("Content-Disposition", `attachment; filename="${brandedFilename}"`);
            res.setHeader("Cache-Control", "public, max-age=3600");
            console.log(`\u{1F4C1} Serving from compressed: ${compressedPath} (${contentType})`);
            const fileStream = (0, import_fs4.createReadStream)(compressedPath);
            return fileStream.pipe(res);
          } catch (err) {
            continue;
          }
        }
        res.status(404).json({ error: "Download file not found" });
      };
      findAndServeFile().catch((error) => {
        console.error("Error serving download:", error);
        res.status(500).json({ error: "Failed to serve download" });
      });
    } catch (error) {
      console.error("Error processing download:", error);
      res.status(500).json({ error: "Failed to process download" });
    }
  });
  app2.post("/api/upload", upload2.array("files", 20), async (req, res) => {
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }
      const isUserAuthenticated = req.isAuthenticated && req.isAuthenticated();
      const user = isUserAuthenticated ? req.user : null;
      const sessionId = req.body.sessionId || req.sessionID;
      const userId2 = user?.claims?.sub || null;
      const userPlan = getUserPlan(user);
      if (files.length > 20) {
        return res.status(400).json({
          error: "Batch size limit exceeded",
          message: "Maximum 20 files per batch"
        });
      }
      const results = [];
      console.log(`Creating ${files.length} upload jobs for user ${userId2 || "guest"}`);
      for (const file of files) {
        try {
          const jobId = (0, import_crypto5.randomUUID)();
          const originalPath = file.path;
          const originalFormat = file.originalname.split(".").pop()?.toLowerCase() || "unknown";
          const job = await storage.createCompressionJob({
            userId: userId2,
            sessionId,
            originalFilename: file.originalname,
            originalPath,
            status: "uploaded"
            // New status for uploaded but not processed
          });
          results.push({
            id: job.id,
            originalName: file.originalname,
            originalSize: file.size,
            status: "uploaded"
          });
          console.log(`Created upload job ${job.id} for file ${file.originalname}`);
        } catch (error) {
          console.error(`Failed to create upload job for ${file.originalname}:`, error);
          return res.status(500).json({
            error: `Failed to upload ${file.originalname}: ${error instanceof Error ? error.message : "Unknown error"}`
          });
        }
      }
      res.json({
        results,
        message: `Successfully uploaded ${files.length} file${files.length > 1 ? "s" : ""}. Use advanced settings to process them.`
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({
        error: "Failed to upload files",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/process", async (req, res) => {
    const isUserAuthenticated = req.isAuthenticated && req.isAuthenticated();
    const user = isUserAuthenticated ? req.user : null;
    const planLimits = user ? getUnifiedPlan("free") : getUnifiedPlan("anonymous");
    const timeoutMs = planLimits.limits.processingTimeout * 1e3;
    req.setTimeout(timeoutMs);
    res.setTimeout(timeoutMs);
    try {
      const { jobIds, settings } = req.body;
      if (!jobIds || !Array.isArray(jobIds) || jobIds.length === 0) {
        return res.status(400).json({ error: "No job IDs provided" });
      }
      console.log("Compression settings received:", settings);
      const isUserAuthenticated2 = req.isAuthenticated && req.isAuthenticated();
      const user2 = isUserAuthenticated2 ? req.user : null;
      const sessionId = req.sessionID;
      const userId2 = user2?.claims?.sub || null;
      let userType = "anonymous";
      if (user2) {
        const userData = await storage.getUser(user2?.claims?.sub);
        userType = userData?.subscriptionTier || "free";
      }
      const pageIdentifier = "advanced-process";
      const jobs = await storage.getJobsByIds(jobIds);
      if (jobs.length === 0) {
        return res.status(404).json({ error: "No valid jobs found to process" });
      }
      for (const job of jobs) {
        const dualTracker = new DualUsageTracker(userId2, sessionId, userType);
        const usageCheck = await dualTracker.canPerformOperation(job.originalFilename, job.fileSize || 0, pageIdentifier);
        if (!usageCheck.allowed) {
          return res.status(429).json({
            error: "Usage limit exceeded",
            message: "You have reached your compression limit",
            usage: usageCheck.usage
          });
        }
      }
      const results = [];
      for (const job of jobs) {
        try {
          await storage.updateCompressionJob(job.id, {
            status: "processing",
            compressionSettings: settings
          });
          await processCompressionJob(job.id, job.originalPath, job.originalFilename, settings, userId2, sessionId, userType, pageIdentifier);
          const updatedJob = await storage.getCompressionJob(job.id);
          results.push({
            id: job.id,
            status: updatedJob?.status || "completed",
            originalName: job.originalFilename
          });
        } catch (error) {
          console.error(`Failed to start processing job ${job.id}:`, error);
          await storage.updateCompressionJob(job.id, {
            status: "failed",
            errorMessage: `Processing failed: ${error.message}`
          });
        }
      }
      res.json({
        results,
        message: `Started processing ${results.length} file${results.length > 1 ? "s" : ""}`
      });
    } catch (error) {
      console.error("Process error:", error);
      res.status(500).json({ error: "Failed to process files" });
    }
  });
  app2.post("/api/compress", upload2.array("files", 20), requireScopeFromAuth, async (req, res) => {
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }
      console.log("Authentication check:", {
        hasIsAuthenticated: !!req.isAuthenticated,
        isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false,
        hasUser: !!req.user,
        sessionID: req.sessionID,
        session: req.session
      });
      const isUserAuthenticated = req.isAuthenticated && req.isAuthenticated();
      let user = isUserAuthenticated ? req.user : null;
      if (!user && req.session && req.session.userId) {
        console.log("Using session userId as fallback:", req.session.userId);
        try {
          user = await storage.getUser(req.session.userId);
          console.log("Fetched user data from session fallback:", {
            id: user?.id,
            isPremium: user?.isPremium,
            subscriptionStatus: user?.subscriptionStatus
          });
        } catch (error) {
          console.log("Error fetching user from session fallback:", error.message);
        }
      }
      if (user && user.id) {
        console.log("User authenticated, ensuring complete data for ID:", user.id);
      } else {
        console.log("No authenticated user found");
      }
      let pageIdentifier = "free-no-auth";
      let sessionId = req.sessionID;
      let settings = {
        quality: 80,
        outputFormat: "keep-original",
        resizeOption: "keep-original",
        resizePercentage: 100,
        compressionAlgorithm: "standard",
        webOptimization: "optimize-web"
      };
      if (req.body.settings) {
        try {
          const parsedSettings = JSON.parse(req.body.settings);
          settings = { ...settings, ...parsedSettings };
          pageIdentifier = parsedSettings.pageIdentifier || pageIdentifier;
          sessionId = parsedSettings.sessionId || sessionId;
        } catch (error) {
          console.error("Failed to parse settings:", error);
        }
      }
      const { getPageLimits: getPageLimits2, isValidPageIdentifier: isValidPageIdentifier2, validateFileSize: validateFileSize2, validateFileFormat: validateFileFormat2, ALLOWED_PAGE_IDENTIFIERS: ALLOWED_PAGE_IDENTIFIERS3 } = await Promise.resolve().then(() => (init_pageRules(), pageRules_exports));
      if (!isValidPageIdentifier2(pageIdentifier)) {
        return res.status(400).json({
          error: "Invalid page identifier",
          message: `Page identifier "${pageIdentifier}" is not allowed`,
          allowedPages: ALLOWED_PAGE_IDENTIFIERS3
        });
      }
      const pageLimits = getPageLimits2(pageIdentifier);
      if (!pageLimits) {
        return res.status(400).json({
          error: "Invalid page configuration",
          message: `No limits configured for page identifier: ${pageIdentifier}`,
          pageIdentifier
        });
      }
      console.log(`\u{1F527} COMPRESSION: pageIdentifier="${pageIdentifier}", sessionId="${sessionId}"`);
      if (pageLimits.requiresAuth && !user) {
        return res.status(401).json({
          error: "Authentication required",
          message: `${pageLimits.displayName} requires user authentication`,
          pageIdentifier
        });
      }
      if (pageLimits.requiresPayment && user) {
        const hasActiveSubscription = user.isPremium && user.subscriptionStatus === "active";
        const hasValidTestPremium = user.testPremiumExpiresAt && new Date(user.testPremiumExpiresAt) > /* @__PURE__ */ new Date();
        if (pageIdentifier === "test-1-dollar" && !hasValidTestPremium) {
          return res.status(402).json({
            error: "Payment required",
            message: "Test Premium ($1) subscription required for this page",
            pageIdentifier,
            requiredPayment: pageLimits.paymentAmount,
            subscriptionType: "test-premium"
          });
        }
        if ((pageIdentifier === "premium-29" || pageIdentifier === "enterprise-99") && !hasActiveSubscription) {
          return res.status(402).json({
            error: "Payment required",
            message: `${pageLimits.displayName} subscription required for this page`,
            pageIdentifier,
            requiredPayment: pageLimits.paymentAmount,
            subscriptionType: pageIdentifier === "premium-29" ? "premium" : "enterprise"
          });
        }
        console.log(`\u2705 Payment verification passed for ${pageIdentifier}: user has required subscription`);
      }
      for (const file of files) {
        const sizeValidation = validateFileSize2(file, pageIdentifier);
        if (!sizeValidation.valid) {
          return res.status(400).json({
            error: "File size limit exceeded",
            message: sizeValidation.error,
            pageIdentifier,
            fileName: file.originalname
          });
        }
        const formatValidation = validateFileFormat2(file.originalname, pageIdentifier);
        if (!formatValidation.valid) {
          return res.status(400).json({
            error: "File format not supported",
            message: formatValidation.error,
            pageIdentifier,
            fileName: file.originalname
          });
        }
      }
      if (files.length > 20) {
        return res.status(400).json({
          error: "Batch size limit exceeded",
          message: "Maximum 20 files per batch"
        });
      }
      const getPagePlan = (pageId) => {
        switch (pageId) {
          case "free-no-auth":
          case "/":
            return "anonymous";
          case "free-auth":
          case "/compress-free":
            return "free";
          case "test-1-dollar":
          case "/test-premium":
            return "test_premium";
          case "premium-29":
          case "/compress-premium":
            return "pro";
          case "enterprise-99":
          case "/compress-enterprise":
            return "enterprise";
          case "cr2-free":
          case "/convert/cr2-to-jpg":
            return "cr2-free";
          default:
            return null;
        }
      };
      const planId = getPagePlan(pageIdentifier);
      if (!planId) {
        return res.status(400).json({
          error: "Invalid page identifier",
          message: `Unsupported page identifier: ${pageIdentifier}`,
          pageIdentifier
        });
      }
      const limits = getUnifiedPlan(planId);
      console.log(`\u{1F527} Page-specific limits for ${pageIdentifier} (${planId}):`, limits);
      const finalSessionId = sessionId || getSessionIdFromRequest(req);
      let userType = "anonymous";
      if (user) {
        const userData = await storage.getUser(user?.claims?.sub);
        userType = userData?.subscriptionTier || "free";
      }
      const dualTracker = new DualUsageTracker(user?.claims?.sub, finalSessionId, userType);
      for (const file of files) {
        const canPerform = await dualTracker.canPerformOperation(file.originalname, file.size, pageIdentifier);
        if (!canPerform.allowed) {
          return res.status(429).json({
            error: "Usage limit exceeded",
            message: canPerform.reason,
            pageIdentifier,
            usage: canPerform.usage,
            limits: canPerform.limits
          });
        }
      }
      console.log(`\u2705 DualUsageTracker check passed for ${pageIdentifier}: ${files.length} operations allowed`);
      if (!user) {
        settings.compressionAlgorithm = "standard";
      }
      console.log("Compression settings received:", settings);
      console.log("Files to process:", files.map((f) => ({ name: f.originalname, ext: f.originalname.split(".").pop() })));
      console.log("=== PROCESSING FILES WITH SHARP + IMAGEMAGICK ===");
      const cachedFileIds = [];
      for (const file of files) {
        const cacheId = fileCacheService.cacheFile(file, req.sessionID);
        cachedFileIds.push(cacheId);
        console.log(`\u{1F4C1} Cached ${file.originalname} as ${cacheId}`);
      }
      const jobPromises = [];
      const jobMetadata = [];
      for (const file of files) {
        const fileExtension = file.originalname.split(".").pop()?.toLowerCase() || "jpg";
        console.log(`File: ${file.originalname}, extension: ${fileExtension}, settings.outputFormat: ${settings.outputFormat}`);
        let outputFormats = Array.isArray(settings.outputFormat) ? settings.outputFormat : settings.outputFormat === "keep-original" ? [fileExtension] : [settings.outputFormat];
        console.log(`Determined outputFormats: [${outputFormats.join(", ")}]`);
        for (const outputFormat of outputFormats) {
          console.log(`Preparing compression job for user ${user?.id}, file: ${file.originalname}, format: ${outputFormat}`);
          const jobPromise = storage.createCompressionJob({
            userId: user?.id || null,
            sessionId: req.sessionID,
            originalFilename: file.originalname,
            status: "pending",
            outputFormat,
            originalPath: file.path
          });
          jobPromises.push(jobPromise);
          jobMetadata.push({ file, outputFormat });
        }
      }
      console.log(`\u{1F680} Creating ${jobPromises.length} jobs in batch...`);
      const createdJobs = await Promise.all(jobPromises);
      const jobs = createdJobs.map((job, index) => ({
        job,
        file: jobMetadata[index].file,
        outputFormat: jobMetadata[index].outputFormat
      }));
      console.log(`\u2705 Created ${jobs.length} jobs in batch`);
      const updatePromises = [];
      const results = [];
      for (const { job, file, outputFormat } of jobs) {
        try {
          const getFileExtension2 = (format) => {
            switch (format) {
              case "jpeg":
              case "jpg":
                return "jpg";
              case "png":
                return "png";
              case "webp":
                return "webp";
              case "avif":
                return "avif";
              case "tiff":
                return "tiff";
              case "dng":
                return "dng";
              case "cr2":
                return "cr2";
              case "nef":
                return "nef";
              case "arw":
                return "arw";
              case "orf":
                return "orf";
              case "raf":
                return "raf";
              case "rw2":
                return "rw2";
              default:
                return format;
            }
          };
          const fileExtension = getFileExtension2(outputFormat);
          const outputPath = import_path4.default.join("compressed", `${job.id}.${fileExtension}`);
          console.log(`Processing ${file.originalname} -> ${outputFormat.toUpperCase()} (parallel)`);
          const inputFormat = getFileFormat(file.originalname);
          const fileExtName = file.originalname.split(".").pop()?.toLowerCase() || "";
          const isRawFile = ["dng", "cr2", "nef", "arw", "orf", "raf", "rw2"].includes(fileExtName);
          console.log(`File: ${file.originalname}, inputFormat: ${inputFormat}, fileExt: ${fileExtName}, isRawFile: ${isRawFile}`);
          let result;
          if (isRawFile || inputFormat === "svg" || inputFormat === "svg" && outputFormat === "tiff") {
            console.log(`Using professional formats conversion engine for ${file.originalname} -> ${outputFormat}`);
            try {
              const shouldResize = settings.resizeOption === "resize-percentage" && settings.resizePercentage && settings.resizePercentage < 100 || settings.resize && settings.resizePercentage && settings.resizePercentage < 100;
              result = await processSpecialFormatConversion(
                file.path,
                outputPath,
                isRawFile ? "raw" : fileExtName,
                // Professional formats engine expects 'raw' for all RAW files
                outputFormat,
                {
                  quality: settings.quality,
                  resize: shouldResize,
                  resizePercentage: settings.resizePercentage,
                  width: 0,
                  // Will be calculated dynamically from actual image dimensions
                  height: 0,
                  // Will be calculated dynamically from actual image dimensions
                  maintainAspect: true
                }
              );
              console.log(`RAW conversion result:`, result);
            } catch (error) {
              console.error(`RAW conversion failed for ${file.originalname}:`, error);
              throw error;
            }
          } else {
            let sharpOperation = (0, import_sharp4.default)(file.path);
            if (settings.resizeOption === "resize-percentage" && settings.resizePercentage && settings.resizePercentage < 100) {
              const metadata = await sharpOperation.metadata();
              console.log(`Original dimensions: ${metadata.width}x${metadata.height}, Resize to: ${settings.resizePercentage}%`);
              if (metadata.width && metadata.height) {
                const targetWidth = Math.round(metadata.width * (settings.resizePercentage / 100));
                const targetHeight = Math.round(metadata.height * (settings.resizePercentage / 100));
                console.log(`Target dimensions: ${targetWidth}x${targetHeight}`);
                sharpOperation = sharpOperation.resize(targetWidth, targetHeight, {
                  fit: "inside",
                  withoutEnlargement: true
                });
              }
            }
            const formatOptions = {
              quality: settings.quality,
              ...outputFormat === "png" && { compressionLevel: 8 },
              ...outputFormat === "webp" && { effort: 4 },
              ...outputFormat === "avif" && { effort: 2 },
              // Faster AVIF processing
              ...outputFormat === "tiff" && {
                compression: "lzw",
                // LZW compression for TIFF
                predictor: "horizontal",
                // Better compression for photos
                quality: settings.quality
                // Quality setting for TIFF
              }
            };
            console.log(`\u{1F5BC}\uFE0F Sharp compression: ${file.originalname} -> ${outputFormat} with options:`, formatOptions);
            sharpOperation = sharpOperation.toFormat(outputFormat, formatOptions).toFile(outputPath);
            await Promise.race([
              sharpOperation,
              new Promise(
                (_, reject) => setTimeout(() => reject(new Error(`Processing timeout after 30 seconds for ${outputFormat}`)), 3e4)
              )
            ]);
            const stats = await import_promises.default.stat(outputPath);
            result = { success: true, outputSize: stats.size };
          }
          const originalStats = await import_promises.default.stat(file.path);
          const compressedStats = await import_promises.default.stat(outputPath);
          const compressionRatio = Math.round((1 - compressedStats.size / originalStats.size) * 100);
          const jobUpdate = storage.updateCompressionJob(job.id, {
            status: "completed",
            compressedPath: outputPath,
            compressedSize: compressedStats.size,
            compressionRatio,
            outputFormat
          });
          updatePromises.push(jobUpdate);
          const resultData = {
            id: job.id,
            // Use actual job ID
            originalName: file.originalname,
            originalSize: originalStats.size,
            compressedSize: compressedStats.size,
            compressionRatio,
            downloadUrl: `/api/download/${job.id}`,
            originalFormat: file.mimetype.split("/")[1].toUpperCase(),
            outputFormat: outputFormat.toUpperCase(),
            wasConverted: settings.outputFormat !== "keep-original",
            compressedFileName: import_path4.default.basename(outputPath),
            settings: {
              quality: settings.quality,
              outputFormat: settings.outputFormat,
              resizeOption: settings.resizeOption,
              compressionAlgorithm: settings.compressionAlgorithm || "standard",
              webOptimization: settings.webOptimization || "optimize-web"
            }
          };
          console.log(`${outputFormat.toUpperCase()} compression result for ${file.originalname}:`, {
            size: `${originalStats.size} -> ${compressedStats.size}`,
            ratio: `${compressionRatio}%`,
            quality: result?.qualityUsed || settings.quality
            // Use actual quality used
          });
          results.push(resultData);
        } catch (jobError) {
          console.error(`Error compressing ${file.originalname} to ${outputFormat}:`, jobError);
          const errorUpdate = storage.updateCompressionJob(job.id, {
            status: "failed",
            errorMessage: jobError instanceof Error ? jobError.message : "Compression failed"
          });
          updatePromises.push(errorUpdate);
          results.push({
            id: job.id,
            originalName: file.originalname,
            error: "Compression failed"
          });
        }
      }
      console.log(`\u{1F680} Executing ${updatePromises.length} database updates in batch...`);
      try {
        await Promise.allSettled(updatePromises);
        console.log(`\u2705 Completed ${updatePromises.length} database updates in batch`);
      } catch (batchError) {
        console.error("Batch database update error:", batchError);
      }
      const processedFiles = /* @__PURE__ */ new Set();
      for (const { file } of jobs) {
        if (!processedFiles.has(file.path)) {
          try {
            await import_promises.default.unlink(file.path);
            processedFiles.add(file.path);
          } catch (unlinkError) {
            console.log(`Could not clean up ${file.path}:`, unlinkError);
          }
        }
      }
      const successfulJobs = results.filter((r) => !r.error);
      if (successfulJobs.length > 0) {
        for (const result of successfulJobs) {
          try {
            console.log(`\u{1F527} Recording operation: ${result.originalName} (${result.originalSize} bytes) on page ${pageIdentifier}`);
            await dualTracker.recordOperation(result.originalName, result.originalSize, pageIdentifier);
            console.log(`\u2705 Operation recorded successfully for ${result.originalName}`);
          } catch (recordError) {
            console.error(`\u274C Failed to record operation for ${result.originalName}:`, recordError);
          }
        }
        console.log(`\u2705 Recorded ${successfulJobs.length} successful operations via DualUsageTracker`);
      }
      const batchId = (0, import_crypto5.randomUUID)();
      const successfulFiles = results.filter((r) => !r.error && r.compressedFileName).map((r) => r.compressedFileName);
      global.batchFiles = global.batchFiles || {};
      global.batchFiles[batchId] = {
        files: successfulFiles,
        timestamp: Date.now()
      };
      res.json({
        results,
        batchId,
        batchDownloadUrl: `/api/download-zip/${batchId}`,
        cachedFileIds
        // ✅ OPTIMIZATION: Include cached file IDs for future conversions
      });
    } catch (error) {
      console.error("Compression error:", error);
      res.status(500).json({ error: "Compression failed" });
    }
  });
  function getOptimalEngine(inputFormat, outputFormat) {
    const rawFormats = ["dng", "cr2", "nef", "arw", "orf", "raf", "rw2"];
    const sharpFormats = ["jpg", "jpeg", "png", "webp", "avif"];
    if (rawFormats.includes(inputFormat.toLowerCase())) {
      return "dcraw";
    }
    if (inputFormat === "svg" || outputFormat === "tiff" || inputFormat === "tiff") {
      return "imagemagick";
    }
    if (sharpFormats.includes(inputFormat.toLowerCase()) && sharpFormats.includes(outputFormat.toLowerCase())) {
      return "sharp";
    }
    return "imagemagick";
  }
  async function processWithSharp(inputPath, outputPath, outputFormat, settings) {
    let sharpOperation = (0, import_sharp4.default)(inputPath);
    if (settings?.resizeOption === "resize-percentage" && settings?.resizePercentage && settings.resizePercentage < 100) {
      const metadata = await sharpOperation.metadata();
      if (metadata.width && metadata.height) {
        const targetWidth = Math.round(metadata.width * (settings.resizePercentage / 100));
        const targetHeight = Math.round(metadata.height * (settings.resizePercentage / 100));
        sharpOperation = sharpOperation.resize(targetWidth, targetHeight, {
          fit: "inside",
          withoutEnlargement: true
        });
      }
    }
    const formatOptions = {
      quality: settings?.quality || 80,
      ...outputFormat === "png" && { compressionLevel: 8 },
      ...outputFormat === "webp" && { effort: 4 },
      // Fast WebP
      ...outputFormat === "avif" && { effort: 2 }
      // Fast AVIF
    };
    await sharpOperation.toFormat(outputFormat, formatOptions).toFile(outputPath);
    return { success: true, engine: "sharp" };
  }
  async function processWithImageMagick(inputPath, outputPath, outputFormat, settings) {
    const execAsync4 = (0, import_util3.promisify)(import_child_process3.exec);
    const quality = settings?.quality || 80;
    let command = `magick "${inputPath}"`;
    if (settings?.resizeOption === "resize-percentage" && settings?.resizePercentage && settings.resizePercentage < 100) {
      command += ` -resize ${settings.resizePercentage}%`;
    }
    command += ` -quality ${quality}`;
    if (outputFormat === "tiff") {
      command += ` -compress lzw`;
    }
    command += ` "${outputPath}"`;
    await execAsync4(command);
    return { success: true, engine: "imagemagick" };
  }
  app2.post("/api/convert-cached", requireScopeFromAuth, async (req, res) => {
    try {
      const { cachedFileIds, outputFormat, settings } = req.body;
      if (!cachedFileIds || !Array.isArray(cachedFileIds) || cachedFileIds.length === 0) {
        return res.status(400).json({ error: "No cached file IDs provided" });
      }
      if (!outputFormat) {
        return res.status(400).json({ error: "Output format not specified" });
      }
      console.log(`\u{1F504} Converting ${cachedFileIds.length} cached files to ${outputFormat}`);
      const cachedFiles = [];
      for (const fileId of cachedFileIds) {
        const cached = fileCacheService.getCachedFile(fileId);
        if (!cached) {
          return res.status(404).json({
            error: `Cached file not found: ${fileId}`
          });
        }
        cachedFiles.push({ fileId, cached });
      }
      const sessionId = req.sessionID;
      const hasAccess = cachedFiles.every(({ cached }) => cached.sessionId === sessionId);
      if (!hasAccess) {
        return res.status(403).json({ error: "Access denied to cached files" });
      }
      const results = [];
      const jobs = [];
      for (const { fileId, cached } of cachedFiles) {
        const job = await storage.createCompressionJob({
          userId: req.user?.id || null,
          sessionId,
          originalFilename: cached.originalName,
          status: "pending",
          outputFormat,
          originalPath: cached.originalPath
        });
        jobs.push({ job, cached, fileId });
      }
      for (const { job, cached } of jobs) {
        try {
          const inputFormat = cached.originalName.split(".").pop()?.toLowerCase() || "";
          const engine = getOptimalEngine(inputFormat, outputFormat);
          console.log(`\u{1F527} Converting ${cached.originalName} using ${engine} engine: ${inputFormat} \u2192 ${outputFormat}`);
          const outputPath = import_path4.default.join("compressed", `${job.id}.${outputFormat}`);
          let result;
          if (engine === "sharp") {
            result = await processWithSharp(cached.originalPath, outputPath, outputFormat, settings);
          } else if (engine === "imagemagick") {
            result = await processWithImageMagick(cached.originalPath, outputPath, outputFormat, settings);
          } else {
            result = await processSpecialFormatConversion(cached.originalPath, outputPath, inputFormat, outputFormat, settings);
          }
          const originalStats = await import_promises.default.stat(cached.originalPath);
          const compressedStats = await import_promises.default.stat(outputPath);
          const compressionRatio = Math.round((1 - compressedStats.size / originalStats.size) * 100);
          await storage.updateCompressionJob(job.id, {
            status: "completed",
            compressedPath: outputPath,
            compressedSize: compressedStats.size,
            compressionRatio,
            outputFormat
          });
          results.push({
            id: job.id,
            originalName: cached.originalName,
            originalSize: originalStats.size,
            compressedSize: compressedStats.size,
            compressionRatio,
            downloadUrl: `/api/download/${job.id}`,
            originalFormat: cached.mimetype.split("/")[1]?.toUpperCase() || "UNKNOWN",
            outputFormat: outputFormat.toUpperCase(),
            wasConverted: true,
            engine
          });
        } catch (error) {
          console.error(`Conversion failed for ${cached.originalName}:`, error);
          await storage.updateCompressionJob(job.id, {
            status: "failed",
            error: error.message
          });
          results.push({
            error: `Failed to convert ${cached.originalName}: ${error.message}`,
            originalName: cached.originalName
          });
        }
      }
      res.json({ results });
    } catch (error) {
      console.error("Cached conversion error:", error);
      res.status(500).json({ error: "Cached conversion failed" });
    }
  });
  app2.get("/api/download/compressed/:jobId", async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const job = await storage.getCompressionJob(jobId);
      if (!job || job.status !== "completed") {
        return res.status(404).json({ error: "Compressed file not found" });
      }
      const originalName = job.originalFilename;
      const outputFormat = job.outputFormat || "jpeg";
      const extension = outputFormat === "jpeg" ? ".jpg" : `.${outputFormat}`;
      const baseName = import_path4.default.parse(originalName).name;
      const downloadName = `${baseName}_compressed${extension}`;
      if (job.cdnUrl) {
        console.log(`\u{1F310} CDN redirect: ${job.cdnUrl}`);
        res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);
        res.setHeader("Cache-Control", "public, max-age=86400");
        return res.redirect(301, job.cdnUrl);
      }
      if (!job.compressedPath) {
        return res.status(404).json({ error: "Compressed file not found" });
      }
      const stats = await import_promises.default.stat(job.compressedPath);
      res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Length", stats.size.toString());
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.setHeader("Accept-Ranges", "bytes");
      const range = req.headers.range;
      if (range) {
        const [start, end] = range.replace(/bytes=/, "").split("-").map(Number);
        const actualEnd = end || stats.size - 1;
        const contentLength = actualEnd - start + 1;
        res.status(206);
        res.setHeader("Content-Range", `bytes ${start}-${actualEnd}/${stats.size}`);
        res.setHeader("Content-Length", contentLength.toString());
        const fileStream = (0, import_fs4.createReadStream)(job.compressedPath, {
          start,
          end: actualEnd,
          highWaterMark: 1024 * 1024
          // 1MB chunks for large files
        });
        fileStream.pipe(res);
      } else {
        const fileStream = (0, import_fs4.createReadStream)(job.compressedPath, {
          highWaterMark: 1024 * 1024
          // 1MB chunks (was default 64KB)
        });
        fileStream.pipe(res);
      }
      console.log(`\u{1F4C1} Optimized download: ${job.compressedPath} (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
    } catch (error) {
      console.error("Download error:", error);
      if (!res.headersSent) {
        res.status(404).json({ error: "File not found" });
      }
    }
  });
  app2.get("/api/image/:jobId", async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const job = await storage.getCompressionJob(jobId);
      if (!job || job.status !== "completed") {
        return res.status(404).json({ error: "Image not found" });
      }
      if (job.cdnUrl) {
        console.log(`\u{1F310} Serving from CDN: ${job.cdnUrl}`);
        return res.redirect(302, job.cdnUrl);
      }
      if (!job.compressedPath) {
        return res.status(404).json({ error: "Image not found" });
      }
      await import_promises.default.access(job.compressedPath);
      const outputFormat = job.outputFormat || "jpeg";
      let contentType = "image/jpeg";
      switch (outputFormat.toLowerCase()) {
        case "png":
          contentType = "image/png";
          break;
        case "webp":
          contentType = "image/webp";
          break;
        case "avif":
          contentType = "image/avif";
          break;
        case "tiff":
        case "tif":
          contentType = "image/tiff";
          break;
        case "jpg":
        case "jpeg":
          contentType = "image/jpeg";
          break;
        default:
          contentType = "image/jpeg";
      }
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=3600");
      console.log(`\u{1F4C1} Serving local file: ${job.compressedPath}`);
      res.sendFile(import_path4.default.resolve(job.compressedPath));
    } catch (error) {
      console.error("Image serving error:", error);
      res.status(404).json({ error: "Image not found" });
    }
  });
  app2.get("/api/download-zip/:batchId", async (req, res) => {
    try {
      const batchId = req.params.batchId;
      const compressedDir = "compressed";
      global.batchFiles = global.batchFiles || {};
      const batchInfo = global.batchFiles[batchId];
      if (!batchInfo) {
        return res.status(404).json({ error: "Batch not found or expired" });
      }
      const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1e3;
      if (batchInfo.timestamp < twentyFourHoursAgo) {
        delete global.batchFiles[batchId];
        return res.status(404).json({ error: "Batch expired" });
      }
      const validFiles = [];
      for (const filename of batchInfo.files) {
        try {
          let filePath = import_path4.default.join(compressedDir, filename);
          try {
            await import_promises.default.access(filePath);
            validFiles.push({
              name: filename,
              path: filePath
            });
            continue;
          } catch (err) {
            filePath = import_path4.default.join("converted", filename);
            await import_promises.default.access(filePath);
            validFiles.push({
              name: filename,
              path: filePath
            });
          }
        } catch (err) {
          console.log(`File ${filename} not found in either compressed/ or converted/, skipping`);
        }
      }
      if (validFiles.length === 0) {
        return res.status(404).json({ error: "No files found for download" });
      }
      console.log(`Creating ZIP for batch ${batchId} with ${validFiles.length} files:`, validFiles.map((f) => f.name));
      const zipFilename = `microjpeg_batch_compress_${Date.now()}.zip`;
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename="${zipFilename}"`);
      res.setHeader("Transfer-Encoding", "chunked");
      const archive = (0, import_archiver.default)("zip", {
        zlib: {
          level: 6,
          // Balanced compression (was 9 - too slow!)
          chunkSize: 64 * 1024
          // 64KB chunks
        },
        statConcurrency: 4
        // Process 4 files concurrently
      });
      archive.on("error", (err) => {
        console.error("Archive error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to create archive" });
        }
      });
      archive.pipe(res);
      for (const file of validFiles) {
        try {
          await import_promises.default.access(file.path);
          const fileExt = import_path4.default.extname(file.name).slice(1).toLowerCase();
          const format = normalizeFormat(fileExt);
          const cleanName = file.name.replace(/^compressed_\d+_/, "");
          const baseNameWithoutExt = import_path4.default.parse(cleanName).name;
          const brandedName = generateBrandedFilename(
            baseNameWithoutExt + import_path4.default.extname(cleanName),
            format,
            format,
            "compress",
            // Assume compression for batch
            false
            // No additional timestamp
          );
          archive.file(file.path, { name: brandedName });
        } catch (err) {
          console.error(`Failed to add file ${file.name} to archive:`, err);
        }
      }
      const readmeContent = generateZipReadmeContent(validFiles, "compress");
      archive.append(readmeContent, { name: "microjpeg_README.txt" });
      await archive.finalize();
    } catch (error) {
      console.error("ZIP download error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to create ZIP archive" });
      }
    }
  });
  app2.post("/api/create-session-zip", async (req, res) => {
    try {
      const { resultIds } = req.body;
      if (!resultIds || !Array.isArray(resultIds) || resultIds.length === 0) {
        return res.status(400).json({ error: "No result IDs provided" });
      }
      const validFiles = [];
      for (const resultId of resultIds) {
        try {
          const job = await storage.getCompressionJob(resultId);
          if (job && job.compressedPath && job.status === "completed") {
            await import_promises.default.access(job.compressedPath);
            const filename = import_path4.default.basename(job.compressedPath);
            validFiles.push({
              name: filename,
              path: job.compressedPath,
              originalName: job.originalFilename
            });
          } else {
            const specialFormatExtensions = ["tiff", "avif", "webp", "png", "jpg", "jpeg"];
            let filePath = null;
            for (const ext of specialFormatExtensions) {
              const potentialPath = import_path4.default.join("converted", `${resultId}.${ext}`);
              try {
                await import_promises.default.access(potentialPath);
                filePath = potentialPath;
                break;
              } catch (error) {
              }
            }
            if (filePath) {
              const filename = import_path4.default.basename(filePath);
              validFiles.push({
                name: filename,
                path: filePath,
                originalName: `converted_image.${import_path4.default.extname(filePath).substring(1)}`
              });
            }
          }
        } catch (err) {
          console.log(`File for result ${resultId} not found, skipping`);
        }
      }
      if (validFiles.length === 0) {
        return res.status(404).json({ error: "No valid files found for download" });
      }
      const batchId = (0, import_crypto5.randomUUID)();
      const fileNames = validFiles.map((f) => f.name);
      global.batchFiles = global.batchFiles || {};
      global.batchFiles[batchId] = {
        files: fileNames,
        timestamp: Date.now()
      };
      console.log(`Created comprehensive ZIP batch ${batchId} with ${validFiles.length} files from session`);
      res.json({
        batchId,
        batchDownloadUrl: `/api/download-zip/${batchId}`,
        fileCount: validFiles.length
      });
    } catch (error) {
      console.error("Session ZIP creation error:", error);
      res.status(500).json({ error: "Failed to create session ZIP" });
    }
  });
  app2.get("/api/auth/user", async (req, res) => {
    console.log("GET /api/auth/user called");
    console.log("Session ID:", req.sessionID);
    console.log("Session userId:", req.session.userId);
    console.log("Session data:", JSON.stringify(req.session, null, 2));
    if (!req.session.userId) {
      console.log("No userId in session, returning 401");
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        console.log("User not found in database, destroying session");
        req.session.destroy(() => {
        });
        return res.status(401).json({ message: "Unauthorized" });
      }
      console.log("User found:", user.email);
      req.user = user;
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Database error in /api/auth/user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/claim-bonus-operations", isAuthenticated, async (req, res) => {
    try {
      const user = req.user;
      const userId2 = user?.id;
      if (!userId2) {
        return res.status(401).json({ error: "User ID not found" });
      }
      console.log(`\u{1F381} Bonus operations claim attempt by user: ${userId2}`);
      const result = await storage.claimBonusOperations(userId2);
      if (result.success) {
        console.log(`\u2705 Bonus operations claimed successfully for user: ${userId2}`);
        res.json({
          success: true,
          message: "Bonus operations claimed successfully! You now have 600 monthly operations."
        });
      } else if (result.alreadyClaimed) {
        console.log(`\u26A0\uFE0F Bonus operations already claimed for user: ${userId2}`);
        res.status(400).json({
          success: false,
          error: "Bonus operations already claimed",
          message: "You have already claimed your bonus operations"
        });
      } else {
        console.log(`\u274C Bonus operations claim failed for user: ${userId2}`);
        res.status(500).json({
          success: false,
          error: "Failed to claim bonus operations"
        });
      }
    } catch (error) {
      console.error("Bonus operations claim error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  });
  app2.get("/api/universal-usage-stats", async (req, res) => {
    try {
      res.setHeader("Cache-Control", "public, max-age=10");
      const sessionId = req.sessionID;
      const userId2 = req.user?.id;
      const cacheKey = `universal_stats_${userId2 || "anon"}_${sessionId}`;
      const cached = global.universalStatsCache?.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < 15e3) {
        console.log("\u26A1 Using cached universal stats for performance");
        return res.json(cached.data);
      }
      if (!global.universalStatsCache) {
        global.universalStatsCache = /* @__PURE__ */ new Map();
      }
      let userType = "anonymous";
      let hasBonusOperations = false;
      if (userId2) {
        try {
          const userPromise = storage.getUser(userId2);
          const timeoutPromise = new Promise(
            (_, reject) => setTimeout(() => reject(new Error("User lookup timeout")), 3e3)
          );
          const user = await Promise.race([userPromise, timeoutPromise]);
          userType = user?.subscriptionTier || "free";
          hasBonusOperations = (user?.purchasedCredits || 0) > 0;
        } catch (error) {
          console.error("Error getting user in universal-usage-stats (using fallback):", error);
          userType = "anonymous";
        }
      }
      try {
        const tracker = new DualUsageTracker(userId2, sessionId, userType);
        const statsPromise = tracker.getUsageStats();
        const timeoutPromise = new Promise(
          (_, reject) => setTimeout(() => reject(new Error("Stats lookup timeout")), 5e3)
        );
        const stats = await Promise.race([statsPromise, timeoutPromise]);
        if (userType === "free_registered" && hasBonusOperations) {
          stats.regular.monthly.limit = 600;
          stats.combined.monthly.limit = stats.raw.monthly.limit + 600;
        }
        const response = {
          userType,
          stats,
          limits: OPERATION_CONFIG.limits[userType]
        };
        global.universalStatsCache.set(cacheKey, {
          data: response,
          timestamp: Date.now()
        });
        if (global.universalStatsCache.size > 100) {
          const entries = Array.from(global.universalStatsCache.entries());
          const oldEntries = entries.slice(0, entries.length - 100);
          oldEntries.forEach(([key]) => global.universalStatsCache.delete(key));
        }
        console.log(`\u26A1 Stats API completed: userId=${userId2}, userType=${userType}`);
        res.json(response);
      } catch (statsError) {
        console.error("Stats lookup failed, using fallback:", statsError);
        const fallbackResponse = {
          userType,
          stats: {
            regular: { daily: { used: 0, limit: 100 }, monthly: { used: 0, limit: 1e3 } },
            raw: { daily: { used: 0, limit: 100 }, monthly: { used: 0, limit: 1e3 } },
            combined: { daily: { used: 0, limit: 100 }, monthly: { used: 0, limit: 1e3 } }
          },
          limits: OPERATION_CONFIG.limits[userType] || OPERATION_CONFIG.limits.anonymous
        };
        res.json(fallbackResponse);
      }
    } catch (error) {
      console.error("Critical error in universal-usage-stats:", error);
      res.json({
        userType: "anonymous",
        stats: {
          regular: { daily: { used: 0, limit: 100 }, monthly: { used: 0, limit: 1e3 } },
          raw: { daily: { used: 0, limit: 100 }, monthly: { used: 0, limit: 1e3 } },
          combined: { daily: { used: 0, limit: 100 }, monthly: { used: 0, limit: 1e3 } }
        },
        limits: OPERATION_CONFIG.limits.anonymous
      });
    }
  });
  app2.post("/api/check-operation", async (req, res) => {
    try {
      console.log("\u{1F527} /api/check-operation called with:", req.body);
      const { filename, fileSize, pageIdentifier } = req.body;
      const sessionId = req.sessionID;
      const userId2 = req.user?.id;
      console.log("\u{1F527} Check operation params:", {
        filename,
        fileSize,
        pageIdentifier: pageIdentifier || "not provided",
        sessionId,
        userId: userId2 || "anonymous"
      });
      let userType = "anonymous";
      if (userId2) {
        try {
          const user = await storage.getUser(userId2);
          userType = user?.subscriptionTier || "free";
        } catch (error) {
          console.error("Error getting user in check-operation:", error);
          userType = "anonymous";
        }
      }
      console.log("\u{1F527} Determined userType:", userType);
      const tracker = new DualUsageTracker(userId2, sessionId, userType);
      console.log("\u{1F527} About to call canPerformOperation...");
      const result = await tracker.canPerformOperation(filename, fileSize, pageIdentifier);
      console.log("\u{1F527} canPerformOperation result:", result);
      res.json(result);
    } catch (error) {
      console.error("Error in /api/check-operation:", error);
      console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
      res.status(500).json({
        message: "Internal server error",
        allowed: false,
        reason: "Server error"
      });
    }
  });
  app2.get("/api/usage-stats/:pageIdentifier?", async (req, res) => {
    try {
      console.log(`\u{1F527} UNIFIED USAGE STATS: pageIdentifier=${req.params.pageIdentifier}`);
      const { pageIdentifier } = req.params;
      const sessionId = getSessionIdFromRequest(req);
      const { getPageLimits: getPageLimits2, isValidPageIdentifier: isValidPageIdentifier2, ALLOWED_PAGE_IDENTIFIERS: ALLOWED_PAGE_IDENTIFIERS3 } = await Promise.resolve().then(() => (init_pageRules(), pageRules_exports));
      if (!isValidPageIdentifier2(pageIdentifier)) {
        return res.status(400).json({
          error: "Invalid page identifier",
          message: `Page identifier "${pageIdentifier}" is not allowed`,
          allowedPages: ALLOWED_PAGE_IDENTIFIERS3
        });
      }
      const pageLimits = getPageLimits2(pageIdentifier);
      const PAGE_LIMITS = {
        daily: pageLimits.daily,
        hourly: pageLimits.hourly,
        monthly: pageLimits.monthly
      };
      const isUserAuthenticated = req.isAuthenticated && req.isAuthenticated();
      const userId2 = isUserAuthenticated && req.user ? req.user.claims?.sub : req.session?.userId || void 0;
      let userType = "anonymous";
      if (userId2) {
        const user = await storage.getUser(userId2);
        userType = user?.subscriptionTier || "free";
      }
      const dualTracker = new DualUsageTracker(userId2, sessionId, userType);
      const statsResult = await dualTracker.getUsageStats();
      const usage = statsResult.regular;
      return res.json({
        pageIdentifier,
        operations: {
          dailyUsed: usage.regularDaily,
          dailyLimit: PAGE_LIMITS.daily,
          used: usage.regularMonthly,
          limit: PAGE_LIMITS.monthly
        }
      });
    } catch (error) {
      console.error("Error fetching page-specific usage stats:", error);
      res.status(500).json({
        error: "Failed to fetch usage statistics",
        message: "Internal server error"
      });
    }
  });
  app2.get("/api/usage-stats", requireScopeFromAuth, async (req, res) => {
    try {
      const isUserAuthenticated = req.isAuthenticated && req.isAuthenticated();
      let userId2 = isUserAuthenticated && req.user ? req.user.claims?.sub : req.session?.userId || void 0;
      if (!userId2 && req.session && req.session.userId) {
        console.log(`\u{1F41B} DEBUG usage-stats: Using session userId fallback: ${req.session.userId}`);
        userId2 = req.session.userId;
      }
      const sessionId = getSessionIdFromRequest(req);
      const pageIdentifier = req.context?.pageIdentifier || "/";
      const scope = req.trackingScope;
      console.log(`\u{1F527} PAGE IDENTIFIER usage-stats: userId=${userId2}, pageIdentifier=${pageIdentifier}, scope=${scope}, sessionId=${sessionId}`);
      const operationStats = { monthlyUsed: 0, monthlyLimit: 500, dailyUsed: 0, dailyLimit: 25, hourlyUsed: 0, hourlyLimit: 5 };
      let leadMagnetCredits = null;
      if (isUserAuthenticated && req.user?.email) {
        try {
          leadMagnetCredits = await storage.checkLeadMagnetCredits(req.user.email);
        } catch (error) {
          console.log("No lead magnet credits found for user");
        }
      }
      const legacyStats = { operations: { monthly: { used: 0, limit: 500 } } };
      let totalAvailableOperations = operationStats.monthlyUsed;
      let totalOperationLimit = operationStats.monthlyLimit;
      let bonusCredits = 0;
      if (leadMagnetCredits?.hasCredits) {
        bonusCredits = leadMagnetCredits.creditsRemaining;
        totalOperationLimit = (operationStats.monthlyLimit || 0) + leadMagnetCredits.creditsGranted;
      }
      const unifiedStats = {
        // New unified operation structure
        operations: {
          used: operationStats.monthlyUsed,
          limit: totalOperationLimit,
          remaining: totalOperationLimit ? Math.max(0, totalOperationLimit - operationStats.monthlyUsed) : null,
          planId: operationStats.planId,
          planName: operationStats.planName,
          isAnonymous: operationStats.isAnonymous,
          dailyUsed: operationStats.dailyUsed,
          dailyLimit: operationStats.dailyLimit,
          hourlyUsed: operationStats.hourlyUsed,
          hourlyLimit: operationStats.hourlyLimit,
          // Lead magnet bonus info
          bonusCredits,
          bonusCreditsExpiry: leadMagnetCredits?.expiresAt || null
        },
        // Legacy credit structure for backward compatibility
        totalCredits: legacyStats.usage?.totalCredits || 0,
        usedCredits: legacyStats.usage?.usedCredits || 0,
        remainingCredits: legacyStats.usage?.remainingCredits || 0,
        freeCredits: legacyStats.usage?.freeCredits || 0,
        purchasedCredits: legacyStats.usage?.purchasedCredits || 0,
        // Keep existing structure for now
        usage: legacyStats.usage
      };
      res.json(unifiedStats);
    } catch (error) {
      console.error("Error fetching usage stats:", error);
      res.status(500).json({ message: "Failed to fetch usage statistics" });
    }
  });
  async function getPageSpecificUsageStats(pageIdentifier, req, res) {
    try {
      const isUserAuthenticated = req.isAuthenticated && req.isAuthenticated();
      let userId2 = isUserAuthenticated && req.user ? req.user.claims?.sub : req.session?.userId || void 0;
      if (!userId2 && req.session && req.session.userId) {
        console.log(`\u{1F41B} DEBUG ${pageIdentifier} usage-stats: Using session userId fallback: ${req.session.userId}`);
        userId2 = req.session.userId;
      }
      const sessionId = getSessionIdFromRequest(req);
      console.log(`\u{1F527} PAGE SPECIFIC usage-stats: pageIdentifier=${pageIdentifier}, userId=${userId2}, sessionId=${sessionId}`);
      const operationStats = { monthlyUsed: 0, monthlyLimit: 500, dailyUsed: 0, dailyLimit: 25, hourlyUsed: 0, hourlyLimit: 5 };
      let leadMagnetCredits = null;
      if (isUserAuthenticated && req.user?.email) {
        try {
          leadMagnetCredits = await storage.checkLeadMagnetCredits(req.user.email);
        } catch (error) {
          console.log("No lead magnet credits found for user");
        }
      }
      const legacyStats = { operations: { monthly: { used: 0, limit: 500 } } };
      let totalAvailableOperations = operationStats.monthlyUsed;
      let totalOperationLimit = operationStats.monthlyLimit;
      let bonusCredits = 0;
      if (leadMagnetCredits?.hasCredits) {
        bonusCredits = leadMagnetCredits.creditsRemaining;
        totalOperationLimit = (operationStats.monthlyLimit || 0) + leadMagnetCredits.creditsGranted;
      }
      const unifiedStats = {
        // Page identifier for verification
        pageIdentifier,
        // New unified operation structure
        operations: {
          used: operationStats.monthlyUsed,
          limit: totalOperationLimit,
          remaining: totalOperationLimit ? Math.max(0, totalOperationLimit - operationStats.monthlyUsed) : null,
          planId: operationStats.planId,
          planName: operationStats.planName,
          isAnonymous: operationStats.isAnonymous,
          dailyUsed: operationStats.dailyUsed,
          dailyLimit: operationStats.dailyLimit,
          hourlyUsed: operationStats.hourlyUsed,
          hourlyLimit: operationStats.hourlyLimit,
          // Lead magnet bonus info
          bonusCredits,
          bonusCreditsExpiry: leadMagnetCredits?.expiresAt || null
        },
        // Legacy credit structure for backward compatibility
        totalCredits: legacyStats.usage?.totalCredits || 0,
        usedCredits: legacyStats.usage?.usedCredits || 0,
        remainingCredits: legacyStats.usage?.remainingCredits || 0,
        freeCredits: legacyStats.usage?.freeCredits || 0,
        purchasedCredits: legacyStats.usage?.purchasedCredits || 0,
        // Keep existing structure for now
        usage: legacyStats.usage
      };
      res.json(unifiedStats);
    } catch (error) {
      console.error(`Error fetching ${pageIdentifier} usage stats:`, error);
      res.status(500).json({ message: "Failed to fetch usage statistics" });
    }
  }
  app2.get("/api/usage-stats/main", requireScopeFromAuth, async (req, res) => {
    const pageIdentifier = req.context?.pageIdentifier || req.context?.pageIdentifierCanonical || "/";
    await getPageSpecificUsageStats(pageIdentifier, req, res);
  });
  app2.get("/api/usage-stats/free", requireScopeFromAuth, async (req, res) => {
    const pageIdentifier = req.context?.pageIdentifier || req.context?.pageIdentifierCanonical || "/compress-free";
    await getPageSpecificUsageStats(pageIdentifier, req, res);
  });
  app2.get("/api/usage-stats/premium", requireScopeFromAuth, async (req, res) => {
    const pageIdentifier = req.context?.pageIdentifier || req.context?.pageIdentifierCanonical || "/compress-premium";
    await getPageSpecificUsageStats(pageIdentifier, req, res);
  });
  app2.get("/api/usage-stats/test-premium", requireScopeFromAuth, async (req, res) => {
    const pageIdentifier = req.context?.pageIdentifier || req.context?.pageIdentifierCanonical || "/test-premium";
    await getPageSpecificUsageStats(pageIdentifier, req, res);
  });
  app2.get("/api/usage-stats/enterprise", requireScopeFromAuth, async (req, res) => {
    const pageIdentifier = req.context?.pageIdentifier || req.context?.pageIdentifierCanonical || "/compress-enterprise";
    await getPageSpecificUsageStats(pageIdentifier, req, res);
  });
  app2.get("/api/usage-stats/cr2-converter", requireScopeFromAuth, async (req, res) => {
    const pageIdentifier = req.context?.pageIdentifier || req.context?.pageIdentifierCanonical || "/convert/cr2-to-jpg";
    await getPageSpecificUsageStats(pageIdentifier, req, res);
  });
  app2.get("/api/usage", async (req, res) => {
    try {
      const isUserAuthenticated = req.isAuthenticated && req.isAuthenticated();
      const userId2 = isUserAuthenticated && req.user ? req.user.claims?.sub : req.session?.userId;
      if (!userId2) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { determineUserType: determineUserType2, USER_LIMITS: USER_LIMITS2 } = await Promise.resolve().then(() => (init_userLimits(), userLimits_exports));
      const userType = determineUserType2(req.user?.subscription);
      const limits = USER_LIMITS2[userType];
      const usage = { monthlyUsed: 0 };
      res.json({
        used: usage.monthlyUsed,
        limit: limits.monthly.total,
        remaining: limits.monthly.total - usage.monthlyUsed
      });
    } catch (error) {
      console.error("Error fetching usage:", error);
      res.status(500).json({ error: "Failed to fetch usage data" });
    }
  });
  app2.post("/api/record-usage", async (req, res) => {
    try {
      const isUserAuthenticated = req.isAuthenticated && req.isAuthenticated();
      const userId2 = isUserAuthenticated && req.user ? req.user.claims?.sub : req.session?.userId;
      if (!userId2) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error recording usage:", error);
      res.status(500).json({ error: "Failed to record usage" });
    }
  });
  app2.post("/api/loyalty-share", async (req, res) => {
    try {
      const { platform, postUrl } = req.body;
      if (!platform) {
        return res.status(400).json({ error: "Platform is required" });
      }
      const rewards = {
        "twitter": 10,
        "linkedin": 15,
        "facebook": 10,
        "instagram": 12,
        "pinterest": 8,
        "reddit": 15
      };
      const operationsToAdd = rewards[platform];
      if (!operationsToAdd) {
        return res.status(400).json({ error: "Invalid platform" });
      }
      const isUserAuthenticated = req.isAuthenticated && req.isAuthenticated();
      const userId2 = isUserAuthenticated && req.user ? req.user.claims?.sub : void 0;
      const sessionId = req.headers["x-session-id"];
      const identifier = userId2 || sessionId;
      if (!identifier) {
        return res.status(400).json({ error: "Unable to identify user session" });
      }
      const today = /* @__PURE__ */ new Date();
      const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      const rateLimitKey = `loyalty_${identifier}_${platform}_${dateKey}`;
      if (UsageTracker.hasClaimedTodayReward(rateLimitKey)) {
        return res.status(429).json({
          error: "Daily limit reached",
          message: `You can only earn rewards once per day per platform. Try again tomorrow!`,
          nextClaimTime: "tomorrow"
        });
      }
      UsageTracker.markRewardClaimed(rateLimitKey);
      if (postUrl) {
        console.log(`URL verification: User ${identifier} shared on ${platform}: ${postUrl}`);
      }
      await UsageTracker.addBonusOperations(userId2, sessionId, operationsToAdd, `Social share on ${platform}`);
      res.json({
        success: true,
        operations: operationsToAdd,
        platform,
        message: `You earned ${operationsToAdd} bonus operations for sharing on ${platform}!`,
        nextClaimTime: "tomorrow"
      });
    } catch (error) {
      console.error("Loyalty share tracking error:", error);
      res.status(500).json({ error: "Failed to process loyalty share" });
    }
  });
  app2.get("/api/subscription-info", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      let effectiveTier = user.subscriptionTier || "free_registered";
      let subscriptionStatus = user.subscriptionStatus || "inactive";
      let isExpired = false;
      if (effectiveTier === "test_premium" && user.subscriptionEndDate) {
        const now = /* @__PURE__ */ new Date();
        const endDate = new Date(user.subscriptionEndDate);
        if (now > endDate) {
          effectiveTier = "free_registered";
          subscriptionStatus = "expired";
          isExpired = true;
        }
      }
      let isPremium = false;
      if (isExpired || subscriptionStatus === "expired" || subscriptionStatus === "cancelled") {
        isPremium = false;
      } else if (user.isPremium === true) {
        isPremium = true;
      } else if (effectiveTier === "pro" || effectiveTier === "enterprise") {
        isPremium = subscriptionStatus === "active";
      } else if (effectiveTier === "test_premium") {
        isPremium = subscriptionStatus === "active";
      } else {
        isPremium = false;
      }
      const subscriptionInfo = {
        isPremium,
        subscriptionStatus,
        subscriptionTier: effectiveTier,
        subscriptionPlan: effectiveTier,
        // Legacy field
        subscriptionEndDate: user.subscriptionEndDate || null,
        stripeCustomerId: user.stripeCustomerId || null,
        stripeSubscriptionId: user.stripeSubscriptionId || null,
        timeUntilExpiry: effectiveTier === "test_premium" && user.subscriptionEndDate ? Math.max(0, new Date(user.subscriptionEndDate).getTime() - (/* @__PURE__ */ new Date()).getTime()) : null
      };
      res.json(subscriptionInfo);
    } catch (error) {
      console.error("Error fetching subscription info:", error);
      res.status(500).json({ message: "Failed to fetch subscription info" });
    }
  });
  app2.post("/api/auth/check-email", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const existingUser = await storage.getUserByEmail(email);
      res.json({ available: !existingUser });
    } catch (error) {
      console.error("Error checking email:", error);
      res.status(500).json({ message: "Failed to check email" });
    }
  });
  app2.post("/api/auth/signup", async (req, res) => {
    try {
      const result = signupSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors
        });
      }
      const { email, password, firstName, lastName } = result.data;
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
      const verificationToken = emailService.generateVerificationToken();
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1e3);
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        profileImageUrl: null,
        isEmailVerified: "false",
        emailVerificationToken: verificationToken,
        emailVerificationExpires: verificationExpires,
        lastLogin: null
      });
      try {
        await emailService.sendVerificationEmail(
          user.email,
          verificationToken,
          user.firstName || void 0
        );
        console.log(`Verification email sent to ${user.email}`);
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError);
      }
      req.session.userId = user.id;
      await storage.updateUser(user.id, { lastLogin: /* @__PURE__ */ new Date() });
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({
        user: userWithoutPassword,
        message: "Account created successfully. Please check your email to verify your account."
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors
        });
      }
      const { email, password } = result.data;
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const isValidPassword = await verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      req.session.userId = user.id;
      await new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            console.error("Session save error:", err);
            reject(err);
          } else {
            console.log("Session saved successfully for user:", user.id);
            resolve(void 0);
          }
        });
      });
      await storage.updateUser(user.id, { lastLogin: /* @__PURE__ */ new Date() });
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  });
  app2.get("/api/auth/verify-email/:token", async (req, res) => {
    try {
      const { token } = req.params;
      if (!token) {
        return res.status(400).json({ message: "Verification token is required" });
      }
      const user = await storage.getUserByVerificationToken(token);
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired verification token" });
      }
      if (user.emailVerificationExpires && user.emailVerificationExpires < /* @__PURE__ */ new Date()) {
        return res.status(400).json({ message: "Verification token has expired" });
      }
      if (user.isEmailVerified === "true") {
        return res.status(400).json({ message: "Email is already verified" });
      }
      const verifiedUser = await storage.verifyUserEmail(user.id);
      try {
        await emailService.sendWelcomeEmail(
          verifiedUser.email,
          verifiedUser.firstName || void 0
        );
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
      }
      res.json({
        message: "Email verified successfully! Welcome to JPEG Compressor.",
        user: {
          id: verifiedUser.id,
          email: verifiedUser.email,
          firstName: verifiedUser.firstName,
          lastName: verifiedUser.lastName,
          isEmailVerified: true
        }
      });
    } catch (error) {
      console.error("Error verifying email:", error);
      res.status(500).json({ message: "Failed to verify email" });
    }
  });
  app2.post("/api/auth/resend-verification", isAuthenticated, async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.isEmailVerified === "true") {
        return res.status(400).json({ message: "Email is already verified" });
      }
      const verificationToken = emailService.generateVerificationToken();
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1e3);
      await storage.updateUser(user.id, {
        emailVerificationToken: verificationToken,
        emailVerificationExpires: verificationExpires
      });
      try {
        await emailService.sendVerificationEmail(
          user.email,
          verificationToken,
          user.firstName || void 0
        );
        res.json({ message: "Verification email sent successfully" });
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError);
        res.status(500).json({ message: "Failed to send verification email" });
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      res.status(500).json({ message: "Failed to resend verification email" });
    }
  });
  app2.post("/api/cancel-subscription", isAuthenticated, async (req, res) => {
    try {
      const user = req.user;
      if (!user || !user.stripeSubscriptionId) {
        return res.status(404).json({ error: "No active subscription found" });
      }
      const subscription = await stripe3.subscriptions.update(user.stripeSubscriptionId, {
        cancel_at_period_end: true
      });
      res.json({
        message: "Subscription cancelled successfully",
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        currentPeriodEnd: new Date(subscription.current_period_end * 1e3).toISOString()
      });
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/subscription/status", isAuthenticated, async (req, res) => {
    try {
      const user = req.user;
      if (!user || !user.stripeSubscriptionId) {
        return res.json({ status: "inactive", subscription: null });
      }
      const subscription = await stripe3.subscriptions.retrieve(user.stripeSubscriptionId);
      res.json({
        status: subscription.status,
        subscription: {
          id: subscription.id,
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          plan: subscription.items.data[0]?.price?.nickname || "Premium Plan"
        }
      });
    } catch (error) {
      console.error("Error fetching subscription:", error);
      res.status(500).json({ message: "Failed to fetch subscription" });
    }
  });
  app2.post("/api/webhooks/stripe", import_express6.default.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe3.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || "");
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    console.log(`Processing webhook event: ${event.type}`);
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customer = await stripe3.customers.retrieve(subscription.customer);
        if ("email" in customer && customer.email) {
          const user = await storage.getUserByEmail(customer.email);
          if (user) {
            await storage.updateSubscriptionStatus(
              user.id,
              subscription.status,
              new Date(subscription.current_period_end * 1e3)
            );
            if (subscription.status === "active") {
              try {
                const priceId = subscription.items.data[0]?.price?.id;
                let planName = "Premium";
                let amount = "$9.99";
                if (priceId?.includes("business")) {
                  planName = "Business";
                  amount = "$29.99";
                } else if (priceId?.includes("enterprise")) {
                  planName = "Enterprise";
                  amount = "$99.99";
                }
                await emailService.sendSubscriptionConfirmation(
                  customer.email,
                  user.firstName || "Valued Customer",
                  {
                    planName,
                    amount,
                    billingPeriod: "monthly",
                    nextBillingDate: new Date(subscription.current_period_end * 1e3),
                    subscriptionId: subscription.id
                  }
                );
                console.log(`${planName} subscription confirmation email sent to ${customer.email}`);
              } catch (emailError) {
                console.error("Failed to send subscription confirmation email:", emailError);
              }
            }
          }
        }
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customer = await stripe3.customers.retrieve(subscription.customer);
        if ("email" in customer && customer.email) {
          const user = await storage.getUserByEmail(customer.email);
          if (user) {
            await storage.updateSubscriptionStatus(user.id, "canceled");
            try {
              await emailService.sendSubscriptionCancellation(
                customer.email,
                user.firstName || "Valued Customer"
              );
              console.log(`Subscription cancellation email sent to ${customer.email}`);
            } catch (emailError) {
              console.error("Failed to send cancellation email:", emailError);
            }
          }
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        if (invoice.customer && invoice.customer_email) {
          const user = await storage.getUserByEmail(invoice.customer_email);
          if (user) {
            try {
              await emailService.sendInvoiceEmail(
                invoice.customer_email,
                user.firstName || "Valued Customer",
                {
                  invoiceNumber: invoice.number || `INV-${invoice.id?.slice(-8) || "UNKNOWN"}`,
                  amount: `$${((invoice.amount_paid || 0) / 100).toFixed(2)}`,
                  paidDate: new Date((invoice.status_transitions?.paid_at || Date.now() / 1e3) * 1e3),
                  description: "Premium JPEG Compressor Subscription",
                  invoiceUrl: invoice.hosted_invoice_url || "",
                  period: {
                    start: new Date(invoice.period_start * 1e3),
                    end: new Date(invoice.period_end * 1e3)
                  }
                }
              );
              console.log(`Invoice email sent to ${invoice.customer_email}`);
            } catch (emailError) {
              console.error("Failed to send invoice email:", emailError);
            }
          }
        }
        break;
      }
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        if (paymentIntent.metadata.packageId) {
          try {
            console.log(`Processing credit purchase payment: ${paymentIntent.id}`);
            const { creditPurchases: creditPurchases2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
            const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
            const { eq: eq11 } = await import("drizzle-orm");
            await db2.update(creditPurchases2).set({
              status: "completed",
              completedAt: /* @__PURE__ */ new Date()
            }).where(eq11(creditPurchases2.stripePaymentIntentId, paymentIntent.id));
            const userId2 = paymentIntent.metadata.userId;
            if (userId2 && userId2 !== "guest") {
              const credits = parseInt(paymentIntent.metadata.credits);
              const user = await storage.getUser(userId2);
              if (user) {
                const newCredits = (user.purchasedCredits || 0) + credits;
                await storage.updateUser(userId2, {
                  purchasedCredits: newCredits
                });
                console.log(`Added ${credits} credits to user ${userId2}. Total: ${newCredits}`);
                if (user.email) {
                  try {
                    await emailService.sendPaymentConfirmation(
                      user.email,
                      user.firstName || "Valued Customer",
                      {
                        amount: `$${(paymentIntent.amount / 100).toFixed(2)}`,
                        paymentDate: /* @__PURE__ */ new Date(),
                        paymentMethod: "Credit Card",
                        transactionId: paymentIntent.id,
                        credits
                      }
                    );
                    const packageName = paymentIntent.metadata.packageName || `${credits} Credits`;
                    const pricePerCredit = `${(paymentIntent.amount / 100 / credits).toFixed(3)}\xA2`;
                    await emailService.sendCreditPurchaseReceipt(
                      user.email,
                      user.firstName || "Valued Customer",
                      {
                        packageName,
                        credits,
                        amount: `$${(paymentIntent.amount / 100).toFixed(2)}`,
                        transactionId: paymentIntent.id,
                        pricePerCredit
                      }
                    );
                    console.log(`Credit purchase confirmation and receipt sent to ${user.email}`);
                  } catch (emailError) {
                    console.error("Failed to send credit purchase confirmation email:", emailError);
                  }
                }
              }
            }
            console.log(`Successfully processed credit purchase for ${paymentIntent.metadata.credits} credits`);
          } catch (error) {
            console.error("Error processing credit purchase:", error);
          }
        } else if (paymentIntent.customer && paymentIntent.receipt_email) {
          const user = await storage.getUserByEmail(paymentIntent.receipt_email);
          if (user) {
            try {
              await emailService.sendPaymentConfirmation(
                paymentIntent.receipt_email,
                user.firstName || "Valued Customer",
                {
                  amount: `$${(paymentIntent.amount / 100).toFixed(2)}`,
                  paymentDate: /* @__PURE__ */ new Date(),
                  paymentMethod: "Credit Card",
                  transactionId: paymentIntent.id
                }
              );
              console.log(`Payment confirmation email sent to ${paymentIntent.receipt_email}`);
            } catch (emailError) {
              console.error("Failed to send payment confirmation email:", emailError);
            }
          }
        }
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        if (invoice.customer && invoice.customer_email) {
          const user = await storage.getUserByEmail(invoice.customer_email);
          if (user) {
            try {
              await emailService.sendPaymentFailureNotification(
                invoice.customer_email,
                user.firstName || "Valued Customer",
                "Premium",
                // Plan name - could be determined from invoice
                invoice.next_payment_attempt ? new Date(invoice.next_payment_attempt * 1e3) : void 0
              );
              console.log(`Payment failure notification sent to ${invoice.customer_email}`);
            } catch (emailError) {
              console.error("Failed to send payment failure email:", emailError);
            }
          }
        }
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        if (paymentIntent.metadata.packageId && paymentIntent.metadata.userId) {
          try {
            const userId2 = paymentIntent.metadata.userId;
            const user = await storage.getUser(userId2);
            if (user && user.email) {
              const packageName = paymentIntent.metadata.packageName || `${paymentIntent.metadata.credits} Credits`;
              const amount = `$${(paymentIntent.amount / 100).toFixed(2)}`;
              await emailService.sendPaymentFailureForCredits(
                user.email,
                user.firstName || "Valued Customer",
                packageName,
                amount
              );
              console.log(`Credit purchase failure notification sent to ${user.email}`);
              const { creditPurchases: creditPurchases2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
              const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
              const { eq: eq11 } = await import("drizzle-orm");
              await db2.update(creditPurchases2).set({
                status: "failed",
                completedAt: /* @__PURE__ */ new Date()
              }).where(eq11(creditPurchases2.stripePaymentIntentId, paymentIntent.id));
            }
          } catch (error) {
            console.error("Failed to process credit purchase payment failure:", error);
          }
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
  });
  app2.post("/api/monitor-usage", async (req, res) => {
    try {
      const { email, firstName, tierName, compressions, conversions: conversions2, usagePercent } = req.body;
      if (!email || !firstName || !tierName) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      if (usagePercent >= 80) {
        try {
          await emailService.sendUsageLimitWarning(email, firstName, usagePercent, tierName);
          console.log(`Usage warning email sent to ${email} (${usagePercent}% usage)`);
        } catch (emailError) {
          console.error("Failed to send usage warning email:", emailError);
        }
      }
      if (usagePercent >= 90 && tierName.toLowerCase() === "free") {
        try {
          await emailService.sendTierUpgradePromo(email, firstName, "free", "premium");
          console.log(`Upgrade promo email sent to ${email}`);
        } catch (emailError) {
          console.error("Failed to send upgrade promo email:", emailError);
        }
      }
      res.json({ success: true, message: "Usage monitoring completed" });
    } catch (error) {
      console.error("Error monitoring usage:", error);
      res.status(500).json({ error: "Failed to monitor usage" });
    }
  });
  app2.post("/api/send-daily-report", async (req, res) => {
    try {
      const { email, firstName, stats } = req.body;
      if (!email || !firstName || !stats) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      await emailService.sendDailyUsageReport(email, firstName, stats);
      console.log(`Daily usage report sent to ${email}`);
      res.json({ success: true, message: "Daily report sent" });
    } catch (error) {
      console.error("Error sending daily report:", error);
      res.status(500).json({ error: "Failed to send daily report" });
    }
  });
  app2.post("/api/track-operation", async (req, res) => {
    try {
      const { operationType, fileFormat, fileSizeMb, interface: interfaceType } = req.body;
      const sessionId = req.headers["x-session-id"];
      if (!operationType || !fileFormat || !fileSizeMb) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const userId2 = req.session?.userId;
      const pageIdentifier = req.context?.pageIdentifier || "/";
      let userType = "anonymous";
      if (userId2) {
        const user = await storage.getUser(userId2);
        userType = user?.subscriptionTier || "free";
      }
      const dualTracker = new DualUsageTracker(userId2, sessionId, userType);
      const fakeFilename = `file.${fileFormat}`;
      const fileSizeBytes = fileSizeMb * 1024 * 1024;
      await dualTracker.recordOperation(fakeFilename, fileSizeBytes, pageIdentifier);
      console.log(`Tracked ${operationType}: ${fileFormat} file (${fileSizeMb}MB) for ${userId2 ? "user " + userId2 : "session " + sessionId}`);
      res.json({ success: true, message: "Operation tracked successfully" });
    } catch (error) {
      console.error("Error tracking operation:", error);
      res.status(500).json({ error: "Failed to track operation" });
    }
  });
  app2.post("/api/dev/create-master-user", async (req, res) => {
    try {
      if (process.env.NODE_ENV === "production") {
        return res.status(403).json({ message: "This endpoint is only available in development" });
      }
      const masterEmail = "master@microjpeg.com";
      const masterPassword = "MasterTest123!";
      const existingUser = await storage.getUserByEmail(masterEmail);
      if (existingUser) {
        return res.json({
          message: "Master user already exists",
          email: masterEmail,
          password: masterPassword,
          userId: existingUser.id
        });
      }
      const hashedPassword = await hashPassword(masterPassword);
      const masterUser = await storage.createUser({
        email: masterEmail,
        password: hashedPassword,
        firstName: "Master",
        lastName: "Test",
        profileImageUrl: null,
        isEmailVerified: "true",
        // Pre-verified
        emailVerificationToken: null,
        emailVerificationExpires: null,
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        subscriptionPlan: "free",
        subscriptionStatus: "inactive",
        subscriptionEndDate: null,
        isPremium: false,
        lastLogin: null
      });
      res.json({
        message: "Master test user created successfully",
        email: masterEmail,
        password: masterPassword,
        userId: masterUser.id,
        instructions: "Use this user to test all subscription tiers. Use /api/dev/set-user-tier to switch tiers."
      });
    } catch (error) {
      console.error("Error creating master user:", error);
      res.status(500).json({ message: "Failed to create master user" });
    }
  });
  app2.post("/api/dev/set-user-tier", isAuthenticated, async (req, res) => {
    try {
      if (process.env.NODE_ENV === "production") {
        return res.status(403).json({ message: "This endpoint is only available in development" });
      }
      const { tier } = req.body;
      const sessionUser = req.user;
      if (!sessionUser) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!["free", "premium", "business", "enterprise"].includes(tier)) {
        return res.status(400).json({ message: "Invalid tier. Must be: free, premium, business, or enterprise" });
      }
      let updateData = {
        subscriptionPlan: tier,
        subscriptionStatus: tier === "free" ? "inactive" : "active",
        isPremium: tier !== "free",
        subscriptionEndDate: tier === "free" ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3)
        // 30 days from now
      };
      const updatedUser = await storage.updateUserTier(sessionUser.id, updateData);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        message: `User tier set to ${tier.toUpperCase()}`,
        userId: updatedUser.id,
        tier,
        isPremium: updatedUser.isPremium,
        subscriptionStatus: updatedUser.subscriptionStatus,
        subscriptionPlan: updatedUser.subscriptionPlan
      });
    } catch (error) {
      console.error("Error setting user tier:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/dev/user-tier-info", isAuthenticated, async (req, res) => {
    try {
      if (process.env.NODE_ENV === "production") {
        return res.status(403).json({ message: "This endpoint is only available in development" });
      }
      const sessionUser = req.user;
      if (!sessionUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const user = await storage.getUser(sessionUser.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const userPlan = getUserPlan(user);
      res.json({
        userId: user.id,
        email: user.email,
        currentTier: userPlan.id,
        // User tier information removed
        isPremium: user.isPremium,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionPlan: user.subscriptionPlan,
        subscriptionEndDate: user.subscriptionEndDate,
        // Tier limits removed - using page-specific limits instead
        availableTiers: ["free", "premium", "business", "enterprise"]
      });
    } catch (error) {
      console.error("Error getting user tier info:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/compression-limits", isAuthenticated, async (req, res) => {
    try {
      const sessionUser = req.user;
      if (!sessionUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const user = await storage.getUser(sessionUser.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      let isPremium = false;
      if (user.isPremium) {
        isPremium = true;
      } else if (user.stripeSubscriptionId) {
        try {
          const subscription = await stripe3.subscriptions.retrieve(user.stripeSubscriptionId);
          isPremium = subscription.status === "active";
        } catch (error) {
          console.error("Error checking subscription:", error);
          isPremium = false;
        }
      }
      if (isPremium) {
        return res.json({
          isPremium: true,
          limit: null,
          // Unlimited compressions
          used: 0,
          remaining: null,
          resetTime: null,
          maxFileSize: null
          // No file size limit for premium
        });
      }
      res.json({
        isPremium: false,
        limit: null,
        // Unlimited compressions for free users too
        used: 0,
        remaining: null,
        resetTime: null,
        maxFileSize: 10 * 1024 * 1024
        // 10MB limit for free users
      });
    } catch (error) {
      console.error("Error fetching compression limits:", error);
      res.status(500).json({ message: "Failed to fetch compression limits" });
    }
  });
  app2.post("/api/dev/toggle-premium", isAuthenticated, async (req, res) => {
    try {
      if (process.env.NODE_ENV !== "development") {
        return res.status(403).json({ message: "This endpoint is only available in development" });
      }
      const sessionUser = req.user;
      if (!sessionUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const updatedUser = await storage.togglePremiumStatus(sessionUser.id);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        message: `Premium status ${updatedUser.isPremium ? "enabled" : "disabled"}`,
        isPremium: updatedUser.isPremium,
        userId: updatedUser.id
      });
    } catch (error) {
      console.error("Error toggling premium status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/compress-legacy", requireScopeFromAuth, upload2.array("images", 20), async (req, res) => {
    const user = req.user;
    const planLimits = user ? getUnifiedPlan("free") : getUnifiedPlan("anonymous");
    const timeoutMs = planLimits.limits.processingTimeout * 1e3;
    req.setTimeout(timeoutMs);
    res.setTimeout(timeoutMs);
    try {
      console.log("Upload request received:", { filesCount: req.files?.length || 0 });
      const files = req.files;
      if (!files || files.length === 0) {
        console.log("No files found in request");
        return res.status(400).json({ error: "No files uploaded" });
      }
      const user2 = req.user;
      const sessionId = req.body.sessionId || req.sessionID;
      const userId2 = user2?.id || null;
      if (user2) {
        if (files.length > 20) {
          return res.status(400).json({
            error: "Maximum 20 files per batch",
            limit: 20,
            current: files.length,
            upgradeRequired: false
          });
        }
      } else {
        const anonPlan = getUnifiedPlan("anonymous");
        if (files.length > anonPlan.limits.maxConcurrentUploads) {
          return res.status(400).json({
            error: `Free users can only upload ${anonPlan.limits.maxConcurrentUploads} file at a time. Sign up for batch uploads!`,
            limit: anonPlan.limits.maxConcurrentUploads,
            current: files.length
          });
        }
        for (const file of files) {
          if (file.size > anonPlan.limits.maxFileSize) {
            const maxSizeMB = Math.round(anonPlan.limits.maxFileSize / (1024 * 1024));
            return res.status(413).json({
              error: `File "${file.originalname}" exceeds the ${maxSizeMB}MB limit for free users. Sign up for larger files!`,
              limit: anonPlan.limits.maxFileSize,
              fileSize: file.size,
              fileName: file.originalname
            });
          }
        }
      }
      const {
        qualityLevel = "medium",
        resizeOption = "none",
        outputFormat = "jpeg",
        customQuality = 75,
        compressionAlgorithm = "standard",
        optimizeForWeb = true,
        progressiveJpeg = false,
        optimizeScans = false,
        arithmeticCoding = false,
        customWidth,
        customHeight,
        bulkMode = false
        // New: enable fast processing for bulk uploads
      } = req.body;
      for (const file of files) {
        const pageIdentifier = req.context?.pageIdentifier || "/";
        const dualTracker = new DualUsageTracker(userId2, req.sessionID, "anonymous");
        const operationCheck = await dualTracker.canPerformOperation(file.originalname, file.size, pageIdentifier);
        if (!operationCheck.allowed) {
          return res.status(429).json({
            error: "Operation limit exceeded",
            message: operationCheck.reason,
            usage: operationCheck.usage,
            limits: operationCheck.limits,
            upgradeRequired: !user2
          });
        }
      }
      const isBulkUpload = files.length >= 3 || bulkMode;
      const jobs = [];
      for (const file of files) {
        console.log(`Creating compression job for user ${userId2}, file: ${file.originalname}`);
        const job = await storage.createCompressionJob({
          userId: userId2,
          // Add userId for user association
          originalFilename: file.originalname,
          status: "pending",
          outputFormat,
          originalPath: file.path,
          compressedSize: null,
          compressionRatio: null,
          errorMessage: null,
          compressedPath: null
        });
        console.log(`Created job ${job.id} for user ${userId2}`);
        jobs.push(job);
        compressImage(job.id, file, {
          qualityLevel,
          resizeOption,
          outputFormat,
          customQuality: parseInt(customQuality) || 75,
          compressionAlgorithm,
          optimizeForWeb: false,
          // Always disabled for speed
          progressiveJpeg: false,
          // Always disabled for speed
          optimizeScans: false,
          // Always disabled for speed
          arithmeticCoding: false,
          // Always false for speed
          customWidth: customWidth ? parseInt(customWidth) : void 0,
          customHeight: customHeight ? parseInt(customHeight) : void 0,
          fastMode: true
          // Always enable fast mode for speed
        }).catch((error) => {
          console.error(`Compression failed for job ${job.id}:`, error);
        });
      }
      res.json({ jobs });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload files" });
    }
  });
  app2.get("/api/jobs/:id", isAuthenticated, async (req, res) => {
    const userId2 = req.user?.id;
    try {
      res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      });
      const job = await storage.getCompressionJob(req.params.id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      let jobWithPreview = { ...job };
      if (job.originalPath) {
        try {
          const imageBuffer = await import_promises.default.readFile(job.originalPath);
          const base64Image = imageBuffer.toString("base64");
          jobWithPreview.originalPreviewDataUrl = `data:image/jpeg;base64,${base64Image}`;
        } catch (fileError) {
          console.warn(`Could not read original preview for job ${job.id}:`, fileError);
        }
      }
      if (job.status === "completed" && job.compressedPath) {
        try {
          const compressedBuffer = await import_promises.default.readFile(job.compressedPath);
          const base64Compressed = compressedBuffer.toString("base64");
          let mimeType;
          switch (job.outputFormat) {
            case "webp":
              mimeType = "image/webp";
              break;
            case "avif":
              mimeType = "image/avif";
              break;
            case "png":
              mimeType = "image/png";
              break;
            default:
              mimeType = "image/jpeg";
              break;
          }
          jobWithPreview.compressedPreviewDataUrl = `data:${mimeType};base64,${base64Compressed}`;
        } catch (fileError) {
          console.warn(`Could not read compressed preview for job ${job.id}:`, fileError);
        }
      }
      res.json(jobWithPreview);
    } catch (error) {
      console.error("Get job error:", error);
      res.status(500).json({ error: "Failed to get job status" });
    }
  });
  app2.get("/api/jobs", async (req, res) => {
    try {
      res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      });
      const sessionId = req.query.sessionId || req.sessionID;
      const user = req.user;
      console.log(`/api/jobs called - User authenticated: ${!!req.isAuthenticated?.()}, User ID: ${user?.id}, Session ID: ${sessionId}`);
      let jobs;
      if (req.isAuthenticated?.() && user?.id) {
        console.log(`Fetching jobs for authenticated user: ${user.id}`);
        jobs = await storage.getAllCompressionJobs(user.id);
        console.log(`Found ${jobs.length} jobs for user ${user.id}`);
      } else {
        console.log(`Fetching jobs for guest session: ${sessionId}`);
        jobs = await storage.getCompressionJobsBySession(sessionId);
        console.log(`Found ${jobs.length} jobs for session ${sessionId}`);
      }
      res.json(jobs || []);
    } catch (error) {
      console.error("Get jobs error:", error);
      res.status(500).json({ error: "Failed to get jobs" });
    }
  });
  app2.get("/api/preview/original/:id", async (req, res) => {
    try {
      console.log(`Requesting original preview for job: ${req.params.id}`);
      const job = await storage.getCompressionJob(req.params.id);
      if (!job) {
        console.log(`Job not found: ${req.params.id}`);
        return res.status(404).json({ error: "Original image not found" });
      }
      if (!job.originalPath) {
        console.log(`No original path for job: ${req.params.id}`);
        return res.status(404).json({ error: "Original image path not found" });
      }
      console.log(`Original path for job ${req.params.id}: ${job.originalPath}`);
      try {
        await import_promises.default.access(job.originalPath);
        console.log(`Original file exists: ${job.originalPath}`);
      } catch (accessError) {
        console.log(`Original file does not exist: ${job.originalPath}`, accessError);
        return res.status(404).json({ error: "Original image file not found" });
      }
      res.set({
        "Cache-Control": "public, max-age=3600",
        "Content-Type": "image/jpeg"
      });
      const stream = (0, import_fs4.createReadStream)(job.originalPath);
      stream.pipe(res);
      stream.on("error", (streamError) => {
        console.error(`Stream error for job ${req.params.id}:`, streamError);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to stream original image" });
        }
      });
    } catch (error) {
      console.error(`Error serving original preview for job ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to load original preview" });
    }
  });
  app2.get("/api/preview/compressed/:id", async (req, res) => {
    try {
      const job = await storage.getCompressionJob(req.params.id);
      if (!job || !job.compressedPath || job.status !== "completed") {
        return res.status(404).json({ error: "Compressed image not found" });
      }
      try {
        await import_promises.default.access(job.compressedPath);
      } catch {
        return res.status(404).json({ error: "Compressed image file not found" });
      }
      let mimeType;
      switch (job.outputFormat) {
        case "webp":
          mimeType = "image/webp";
          break;
        case "avif":
          mimeType = "image/avif";
          break;
        case "png":
          mimeType = "image/png";
          break;
        default:
          mimeType = "image/jpeg";
          break;
      }
      res.set({
        "Cache-Control": "public, max-age=3600",
        "Content-Type": mimeType
      });
      const stream = (0, import_fs4.createReadStream)(job.compressedPath);
      stream.pipe(res);
      stream.on("error", (streamError) => {
        console.error("Stream error:", streamError);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to stream compressed image" });
        }
      });
    } catch (error) {
      console.error(`Error serving compressed preview for job ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to load compressed preview" });
    }
  });
  app2.get("/api/download/:id", async (req, res) => {
    try {
      const job = await storage.getCompressionJob(req.params.id);
      if (!job || !job.compressedPath) {
        const specialFormatExtensions = ["tiff", "avif", "webp", "png", "jpg", "jpeg"];
        let filePath = null;
        for (const ext2 of specialFormatExtensions) {
          const potentialPath = import_path4.default.join("converted", `${req.params.id}.${ext2}`);
          try {
            await import_promises.default.access(potentialPath);
            filePath = potentialPath;
            break;
          } catch (error) {
          }
        }
        if (!filePath) {
          return res.status(404).json({ error: "Compressed file not found" });
        }
        const stats = await import_promises.default.stat(filePath);
        const ext = import_path4.default.extname(filePath).substring(1).toLowerCase();
        let contentType2;
        switch (ext) {
          case "png":
            contentType2 = "image/png";
            break;
          case "jpg":
          case "jpeg":
            contentType2 = "image/jpeg";
            break;
          case "webp":
            contentType2 = "image/webp";
            break;
          case "avif":
            contentType2 = "image/avif";
            break;
          case "tiff":
            contentType2 = "image/tiff";
            break;
          default:
            contentType2 = "application/octet-stream";
        }
        const downloadName = `converted_image.${ext}`;
        res.setHeader("Content-Type", contentType2);
        res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);
        res.setHeader("Content-Length", stats.size.toString());
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.setHeader("Accept-Ranges", "bytes");
        const fileStream = (0, import_fs4.createReadStream)(filePath, {
          highWaterMark: 1024 * 1024
          // 1MB chunks for faster streaming
        });
        fileStream.pipe(res);
        console.log(`Special format download: ${filePath} (${stats.size} bytes) as ${downloadName}`);
        return;
      }
      console.log(`=== DOWNLOAD DEBUG ===`);
      console.log(`Job ID: ${job.id}`);
      console.log(`Output Format: ${job.outputFormat}`);
      console.log(`Compressed Path: ${job.compressedPath}`);
      console.log(`Original Filename: ${job.originalFilename}`);
      const originalName = job.originalFilename.replace(/\.[^/.]+$/, "");
      let extension, contentType;
      switch (job.outputFormat) {
        case "webp":
          extension = "webp";
          contentType = "image/webp";
          break;
        case "avif":
          extension = "avif";
          contentType = "image/avif";
          break;
        case "png":
          extension = "png";
          contentType = "image/png";
          break;
        case "tiff":
          extension = "tiff";
          contentType = "image/tiff";
          break;
        case "jpeg":
        default:
          extension = "jpg";
          contentType = "image/jpeg";
          break;
      }
      const filename = `compressed_${originalName}.${extension}`;
      console.log(`Download filename: ${filename}`);
      console.log(`Content-Type: ${contentType}`);
      console.log(`Extension: ${extension}`);
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      try {
        const stats = await import_promises.default.stat(job.compressedPath);
        console.log(`File size: ${stats.size} bytes`);
        console.log(`=== END DOWNLOAD DEBUG ===`);
        res.setHeader("Content-Length", stats.size);
        const stream = (0, import_fs4.createReadStream)(job.compressedPath);
        stream.pipe(res);
        stream.on("error", (streamError) => {
          console.error("Download stream error:", streamError);
          if (!res.headersSent) {
            res.status(500).json({ error: "Failed to download file" });
          }
        });
      } catch (localFileError) {
        console.log(`Local file not found: ${job.compressedPath}, checking R2 CDN...`);
        if (job.cdnUrl) {
          console.log(`Redirecting to R2 CDN: ${job.cdnUrl}`);
          res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
          return res.redirect(302, job.cdnUrl);
        } else {
          console.error(`No local file or R2 CDN URL available for job ${req.params.id}`);
          return res.status(404).json({ error: "Compressed file not found" });
        }
      }
    } catch (error) {
      console.error("Download error:", error);
      res.status(500).json({ error: "Failed to download file" });
    }
  });
  app2.post("/api/download-all", async (req, res) => {
    try {
      const { jobIds } = req.body;
      if (!jobIds || !Array.isArray(jobIds) || jobIds.length === 0) {
        return res.status(400).json({ error: "Job IDs array is required" });
      }
      const jobs = [];
      for (const jobId of jobIds) {
        const job = await storage.getCompressionJob(jobId);
        if (job && job.status === "completed" && job.compressedPath) {
          jobs.push(job);
        }
      }
      if (jobs.length === 0) {
        return res.status(404).json({ error: "No completed files found" });
      }
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", 'attachment; filename="compressed_images.zip"');
      const archive = (0, import_archiver.default)("zip", {
        zlib: { level: 9 }
        // Maximum compression
      });
      archive.on("error", (err) => {
        console.error("Archive error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to create ZIP archive" });
        }
      });
      archive.pipe(res);
      for (const job of jobs) {
        try {
          const filename = `compressed_${job.originalFilename}`;
          archive.file(job.compressedPath, { name: filename });
        } catch (fileError) {
          console.warn(`Could not add file ${job.originalFilename} to archive:`, fileError);
        }
      }
      await archive.finalize();
      console.log(`ZIP download completed for ${jobs.length} files`);
    } catch (error) {
      console.error("Download all error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to create ZIP download" });
      }
    }
  });
  app2.delete("/api/jobs/:id", isAuthenticated, async (req, res) => {
    const userId2 = req.user?.id;
    try {
      const job = await storage.getCompressionJob(req.params.id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      try {
        try {
          await import_promises.default.access(job.originalPath);
          await import_promises.default.unlink(job.originalPath);
          console.log(`Deleted original file: ${job.originalPath}`);
        } catch (accessError) {
          console.warn(`Original file ${job.originalPath} already deleted or not found`);
        }
        if (job.compressedPath) {
          try {
            await import_promises.default.access(job.compressedPath);
            await import_promises.default.unlink(job.compressedPath);
            console.log(`Deleted compressed file: ${job.compressedPath}`);
          } catch (accessError) {
            console.warn(`Compressed file ${job.compressedPath} already deleted or not found`);
          }
        }
      } catch (fileError) {
        console.warn("Failed to delete files:", fileError);
      }
      await storage.deleteCompressionJob(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete job error:", error);
      res.status(500).json({ error: "Failed to delete job" });
    }
  });
  app2.delete("/api/jobs", async (req, res) => {
    try {
      const sessionId = req.query.sessionId || req.sessionID;
      const user = req.user;
      let jobs;
      if (req.isAuthenticated?.() && user?.id) {
        console.log(`Clearing jobs for authenticated user: ${user.id}`);
        jobs = await storage.getAllCompressionJobs(user.id);
      } else {
        console.log(`Clearing jobs for guest session: ${sessionId}`);
        jobs = await storage.getCompressionJobsBySession(sessionId);
      }
      for (const job of jobs) {
        try {
          try {
            await import_promises.default.access(job.originalPath);
            await import_promises.default.unlink(job.originalPath);
            console.log(`Deleted original file for job ${job.id}: ${job.originalPath}`);
          } catch (accessError) {
            console.warn(`Original file for job ${job.id} already deleted: ${job.originalPath}`);
          }
          if (job.compressedPath) {
            try {
              await import_promises.default.access(job.compressedPath);
              await import_promises.default.unlink(job.compressedPath);
              console.log(`Deleted compressed file for job ${job.id}: ${job.compressedPath}`);
            } catch (accessError) {
              console.warn(`Compressed file for job ${job.id} already deleted: ${job.compressedPath}`);
            }
          }
          await storage.deleteCompressionJob(job.id);
        } catch (fileError) {
          console.warn(`Failed to delete files for job ${job.id}:`, fileError);
          try {
            await storage.deleteCompressionJob(job.id);
          } catch (storageError) {
            console.warn(`Failed to delete job ${job.id} from storage:`, storageError);
          }
        }
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Clear all jobs error:", error);
      res.status(500).json({ error: "Failed to clear jobs" });
    }
  });
  app2.get("/api/analyze/:id", async (req, res) => {
    try {
      const job = await storage.getCompressionJob(req.params.id);
      if (!job || !job.originalPath) {
        return res.status(404).json({ error: "Job or file not found" });
      }
      const analysis = await compressionEngine_default.analyzeImage(job.originalPath);
      res.json(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: "Failed to analyze image" });
    }
  });
  app2.post("/api/compress-target-size", requireScopeFromAuth, upload2.array("images", 10), async (req, res) => {
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }
      const { targetSize, maxQuality = 95, minQuality = 30 } = req.body;
      if (!targetSize) {
        return res.status(400).json({ error: "Target size is required" });
      }
      const targetSizeBytes = parseInt(targetSize) * 1024;
      const jobs = [];
      for (const file of files) {
        const job = await storage.createCompressionJob({
          originalFilename: file.originalname,
          status: "pending",
          outputFormat: "jpeg",
          originalPath: file.path,
          compressedSize: null,
          compressionRatio: null,
          errorMessage: null,
          compressedPath: null
        });
        jobs.push(job);
        compressToTargetSize(job.id, file, targetSizeBytes, {
          maxQuality: parseInt(maxQuality),
          minQuality: parseInt(minQuality)
        }).catch((error) => {
          console.error(`Target size compression failed for job ${job.id}:`, error);
        });
      }
      res.json({ jobs, message: `Compressing to target size: ${targetSize}KB` });
    } catch (error) {
      console.error("Target size compression error:", error);
      res.status(500).json({ error: "Failed to start target size compression" });
    }
  });
  app2.post("/api/guest/compress", requireScopeFromAuth, upload2.array("files"), async (req, res) => {
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files provided" });
      }
      const GUEST_MAX_FILES = 3;
      const GUEST_FILE_SIZE_LIMIT = 5 * 1024 * 1024;
      const GUEST_QUALITY = 80;
      if (files.length > GUEST_MAX_FILES) {
        return res.status(400).json({ error: `Guest mode limited to ${GUEST_MAX_FILES} files` });
      }
      const results = [];
      for (const file of files) {
        if (file.size > GUEST_FILE_SIZE_LIMIT) {
          return res.status(400).json({
            error: `File ${file.originalname} is too large (max 5MB in guest mode)`
          });
        }
        const jobId = (0, import_crypto5.randomUUID)();
        const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
        try {
          console.log(`Processing file: ${file.originalname}, path: ${file.path}, size: ${file.size}`);
          try {
            await import_promises.default.access(file.path);
          } catch (accessError) {
            console.error(`File does not exist at path: ${file.path}`);
            throw new Error(`File not found: ${file.path}`);
          }
          const fileBuffer = await import_promises.default.readFile(file.path);
          console.log(`File buffer size: ${fileBuffer.length}`);
          if (fileBuffer.length === 0) {
            throw new Error("Empty file buffer");
          }
          const compressedBuffer = await (0, import_sharp4.default)(fileBuffer).jpeg({ quality: GUEST_QUALITY, progressive: true }).toBuffer();
          storage.setGuestFile(jobId, compressedBuffer, file.originalname);
          const compressionRatio = (file.size - compressedBuffer.length) / file.size * 100;
          results.push({
            id: jobId,
            originalName: file.originalname,
            originalSize: file.size,
            compressedSize: compressedBuffer.length,
            compressionRatio,
            quality: GUEST_QUALITY
          });
        } catch (error) {
          console.error(`Error compressing ${file.originalname}:`, error);
          return res.status(500).json({
            error: `Failed to compress ${file.originalname}`
          });
        } finally {
          try {
            await import_promises.default.unlink(file.path);
          } catch (cleanupError) {
            console.error(`Failed to cleanup temp file ${file.path}:`, cleanupError);
          }
        }
      }
      const pageIdentifier = req.context?.pageIdentifier || "/";
      const dualTracker = new DualUsageTracker(userId, req.sessionID, "anonymous");
      for (const file of files) {
        await dualTracker.recordOperation(file.originalname, file.size, pageIdentifier);
      }
      res.json({ files: results });
    } catch (error) {
      console.error("Guest compression error:", error);
      res.status(500).json({ error: "Failed to process files" });
    }
  });
  app2.get("/api/guest/download/:fileId", async (req, res) => {
    try {
      const { fileId } = req.params;
      const guestFile = storage.getGuestFile(fileId);
      if (!guestFile) {
        return res.status(404).json({ error: "File not found" });
      }
      res.set({
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${guestFile.originalName}"`,
        "Content-Length": guestFile.buffer.length
      });
      res.send(guestFile.buffer);
    } catch (error) {
      console.error("Guest download error:", error);
      res.status(500).json({ error: "Failed to download file" });
    }
  });
  app2.post("/api/social/share", async (req, res) => {
    try {
      const { platform, compressionJobId, shareText, imageStats } = req.body;
      if (!platform || !compressionJobId || !imageStats) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const validPlatforms = ["twitter", "linkedin", "facebook", "instagram"];
      if (!validPlatforms.includes(platform)) {
        return res.status(400).json({ error: "Invalid platform" });
      }
      let userId2 = null;
      let sessionId = null;
      if (req.isAuthenticated && req.isAuthenticated() && req.user) {
        userId2 = req.user.id;
      } else {
        sessionId = req.sessionID || (0, import_crypto5.randomUUID)();
      }
      const platformRewards = {
        twitter: 5,
        linkedin: 7,
        facebook: 6,
        instagram: 8
      };
      const rewardPoints = platformRewards[platform];
      const shareData = {
        userId: userId2,
        sessionId,
        compressionJobId,
        platform,
        shareUrl: `${req.protocol}://${req.get("host")}?ref=${compressionJobId}`,
        shareText,
        imageStats,
        rewardPointsEarned: rewardPoints
      };
      const share = await storage.createSocialShare(shareData);
      let discountMessage = "";
      if (userId2) {
        try {
          const updatedRewards = await storage.addRewardPoints(userId2, rewardPoints, "social_share", share.id);
          const newDiscountPercent = calculateDiscountFromPoints(updatedRewards.totalPoints);
          if (newDiscountPercent > updatedRewards.currentDiscountPercent) {
            await storage.updateUserDiscount(userId2, newDiscountPercent);
            discountMessage = `You unlocked a ${newDiscountPercent}% discount on your next subscription!`;
          }
        } catch (rewardError) {
          console.error("Error updating rewards:", rewardError);
        }
      }
      res.json({
        success: true,
        shareId: share.id,
        rewardPoints: userId2 ? rewardPoints : 0,
        discountMessage,
        message: userId2 ? `Share recorded! You earned ${rewardPoints} reward points.` : "Share recorded! Sign up to start earning reward points."
      });
    } catch (error) {
      console.error("Social sharing error:", error);
      res.status(500).json({ error: "Failed to record social share" });
    }
  });
  app2.get("/api/social/stats", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated() || !req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const userId2 = req.user.id;
      const rewards = await storage.getUserRewards(userId2);
      const recentShares = await storage.getUserShares(userId2, 10);
      const referralInfo = await storage.getUserReferral(userId2);
      res.json({
        rewards: {
          totalPoints: rewards?.totalPoints || 0,
          currentDiscountPercent: rewards?.currentDiscountPercent || 0,
          sharePoints: rewards?.sharePoints || 0,
          referralPoints: rewards?.referralPoints || 0,
          nextDiscountThreshold: rewards?.nextDiscountThreshold || 1
        },
        recentShares: recentShares || [],
        referral: referralInfo ? {
          referralCode: referralInfo.referralCode,
          totalReferrals: referralInfo.totalReferrals,
          totalEarned: referralInfo.totalEarned
        } : null
      });
    } catch (error) {
      console.error("Error fetching social stats:", error);
      res.status(500).json({ error: "Failed to fetch social stats" });
    }
  });
  app2.post("/api/social/referral", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated() || !req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const userId2 = req.user.id;
      let referralInfo = await storage.getUserReferral(userId2);
      if (!referralInfo) {
        const referralCode = generateReferralCode();
        referralInfo = await storage.createUserReferral(userId2, referralCode);
      }
      res.json({
        referralCode: referralInfo.referralCode,
        referralUrl: `${req.protocol}://${req.get("host")}?ref=${referralInfo.referralCode}`,
        totalReferrals: referralInfo.totalReferrals,
        totalEarned: referralInfo.totalEarned
      });
    } catch (error) {
      console.error("Error managing referral code:", error);
      res.status(500).json({ error: "Failed to manage referral code" });
    }
  });
  app2.post("/api/social-share", async (req, res) => {
    const { platform, timestamp: timestamp2 } = req.body;
    const points = {
      twitter: 5,
      linkedin: 7,
      facebook: 6,
      instagram: 8,
      twitter_app: 5,
      linkedin_app: 7,
      facebook_app: 6,
      instagram_app: 8,
      twitter_results: 5,
      linkedin_results: 7,
      facebook_results: 6,
      instagram_results: 8
    };
    const earnedPoints = points[platform] || 0;
    console.log(`Social share tracked: ${platform} at ${timestamp2}, earned ${earnedPoints} points`);
    res.json({
      success: true,
      platform,
      points: earnedPoints,
      timestamp: timestamp2
    });
  });
  app2.get("/api/trial-status", async (req, res) => {
    try {
      const sessionId = req.query.sessionId || req.sessionID;
      const TRIAL_LIMIT = 5;
      const sessionKey = `special_trial_${sessionId}`;
      let trialUsage = 0;
      if (!global.trialUsage) {
        global.trialUsage = /* @__PURE__ */ new Map();
      }
      trialUsage = global.trialUsage.get(sessionKey) || 0;
      const remaining = Math.max(0, TRIAL_LIMIT - trialUsage);
      const allowed = remaining > 0;
      console.log(`Trial status check - SessionID: ${sessionId}, SessionKey: ${sessionKey}, Usage: ${trialUsage}, Remaining: ${remaining}`);
      res.json({
        allowed,
        remaining,
        total: TRIAL_LIMIT,
        used: trialUsage,
        message: remaining === 0 ? "Free trial exhausted. Upgrade to premium for unlimited professional format conversions." : `${remaining} free conversions remaining`
      });
    } catch (error) {
      console.error("Trial status check error:", error);
      res.status(500).json({ error: "Failed to check trial status" });
    }
  });
  app2.post("/api/lead-magnet", async (req, res) => {
    try {
      const { email, firstName } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Valid email address is required" });
      }
      const ipAddress = req.ip || req.connection.remoteAddress || "unknown";
      const userAgent = req.headers["user-agent"] || "unknown";
      const existingSignup = await storage.getLeadMagnetSignup(email);
      if (existingSignup) {
        return res.status(409).json({
          error: "Email already registered for free credits",
          message: "This email has already received the free credits and guide. Check your inbox or contact support."
        });
      }
      const ipSignupCount = await storage.getLeadMagnetSignupCountByIP(ipAddress);
      if (ipSignupCount >= 3) {
        return res.status(429).json({
          error: "Too many signups from this location",
          message: "Maximum 3 signups per day from the same location. Please try again tomorrow."
        });
      }
      console.log(`Processing lead magnet signup for: ${email}`);
      const expiresAt = /* @__PURE__ */ new Date();
      expiresAt.setDate(expiresAt.getDate() + 90);
      const signupRecord = await storage.createLeadMagnetSignup({
        email,
        firstName: firstName || null,
        ipAddress,
        userAgent,
        creditsGranted: 1e3,
        creditsUsed: 0,
        status: "active",
        expiresAt
      });
      const success = await emailService.sendLeadMagnetGuide(email, firstName);
      if (success) {
        console.log(`\u2713 Lead magnet guide sent successfully to ${email}`);
        res.json({
          success: true,
          message: "Guide sent successfully! Check your email for your free credits and optimization guide.",
          credits: 1e3,
          expiresAt: expiresAt.toISOString()
        });
      } else {
        await storage.deleteLeadMagnetSignup(signupRecord.id);
        console.error(`\u2717 Failed to send lead magnet guide to ${email}`);
        res.status(500).json({
          error: "Failed to send guide. Please try again."
        });
      }
    } catch (error) {
      console.error("Lead magnet endpoint error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.post("/api/test-emails", async (req, res) => {
    try {
      const { emailType, testEmail } = req.body;
      if (!testEmail || !emailType) {
        return res.status(400).json({ error: "Email address and email type are required" });
      }
      let result;
      const testFirstName = "TestUser";
      switch (emailType) {
        case "conversion_complete":
          result = await emailService.sendSpecialFormatConversionComplete(
            testEmail,
            testFirstName,
            {
              filesProcessed: 3,
              originalFormats: ["RAW", "SVG", "TIFF"],
              outputFormat: "jpeg",
              totalOriginalSize: 15728640,
              // 15MB
              totalConvertedSize: 3145728,
              // 3MB
              conversionTypes: ["RAW \u2192 JPEG", "SVG \u2192 JPEG", "TIFF \u2192 JPEG"],
              isTrialUser: true,
              trialRemaining: 2
            }
          );
          break;
        case "trial_warning":
          result = await emailService.sendSpecialFormatTrialWarning(
            testEmail,
            testFirstName,
            4,
            // Used 4 of 5
            5
            // Total limit
          );
          break;
        case "trial_exhausted":
          result = await emailService.sendSpecialFormatTrialExhausted(
            testEmail,
            testFirstName
          );
          break;
        // === STANDARD FORMAT EMAIL TESTS ===
        case "standard_compression_complete":
          result = await emailService.sendStandardCompressionComplete(
            testEmail,
            testFirstName,
            {
              filesProcessed: 5,
              totalOriginalSize: 25165824,
              // 24MB
              totalCompressedSize: 3145728,
              // 3MB
              averageCompressionRatio: 87,
              qualityLevel: 85,
              processingTime: 12,
              filenames: ["vacation-photo-1.jpg", "landscape-shot.jpg", "portrait-selfie.jpg", "product-image.jpg", "event-group-photo.jpg"],
              sizeSavings: "21MB (87% reduction)"
            }
          );
          break;
        case "daily_limit_warning":
          result = await emailService.sendDailyLimitWarning(
            testEmail,
            testFirstName,
            {
              used: 12,
              limit: 15,
              percentage: 80,
              remainingHours: 6
            }
          );
          break;
        case "upgrade_file_size":
          result = await emailService.sendUpgradePromotion(
            testEmail,
            testFirstName,
            "file_size_limit"
          );
          break;
        case "upgrade_daily_limit":
          result = await emailService.sendUpgradePromotion(
            testEmail,
            testFirstName,
            "daily_limit_reached"
          );
          break;
        case "upgrade_advanced_features":
          result = await emailService.sendUpgradePromotion(
            testEmail,
            testFirstName,
            "advanced_features"
          );
          break;
        default:
          return res.status(400).json({
            error: "Invalid email type. Use: conversion_complete, trial_warning, trial_exhausted, standard_compression_complete, daily_limit_warning, upgrade_file_size, upgrade_daily_limit, upgrade_advanced_features"
          });
      }
      res.json({
        success: result,
        message: result ? `${emailType} email sent successfully to ${testEmail}` : "Failed to send email",
        emailType,
        recipient: testEmail
      });
    } catch (error) {
      console.error("Email test error:", error);
      res.status(500).json({
        error: "Failed to send test email",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/reset-raw-usage", async (req, res) => {
    try {
      console.log("\u{1F527} Universal RAW reset initiated for all anonymous users");
      const result = await db.update(userUsage).set({
        rawMonthly: 0,
        rawDaily: 0,
        rawHourly: 0,
        updatedAt: /* @__PURE__ */ new Date()
      }).where((0, import_drizzle_orm9.eq)(userUsage.userId, "anonymous"));
      console.log("\u{1F527} Universal reset result:", result);
      res.json({
        success: true,
        message: "All RAW usage counters reset to 0",
        resetType: "universal_anonymous"
      });
    } catch (error) {
      console.error("Reset error:", error);
      res.status(500).json({ error: "Failed to reset counters", details: error.message });
    }
  });
  app2.post("/api/convert-special", specialUpload.array("files", 20), async (req, res) => {
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }
      const { outputFormat, quality, resize, width, height, maintainAspect, resizePercentage } = req.body;
      if (!outputFormat) {
        return res.status(400).json({ error: "Output format is required" });
      }
      const qualityValue = quality ? parseInt(quality, 10) : 85;
      const shouldResize = resize === "true";
      const resizePercentageValue = resizePercentage ? parseInt(resizePercentage, 10) : 100;
      const customWidth = !shouldResize || resizePercentageValue === 100 ? width ? parseInt(width, 10) : 2560 : 0;
      const customHeight = !shouldResize || resizePercentageValue === 100 ? height ? parseInt(height, 10) : 2560 : 0;
      const maintainAspectRatio = maintainAspect !== "false";
      console.log(`\u{1F527} CR2 RESIZE DEBUG: resize=${resize}, shouldResize=${shouldResize}, resizePercentage=${resizePercentageValue}, width=${customWidth}, height=${customWidth}`);
      console.log(`\u{1F527} CR2 RAW BODY:`, JSON.stringify(req.body, null, 2));
      const isUserAuthenticated = req.isAuthenticated && req.isAuthenticated();
      const user = isUserAuthenticated ? req.user : null;
      const sessionId = req.body.sessionId || req.sessionID;
      const userId2 = user?.id || null;
      let isPremiumUser = false;
      if (isUserAuthenticated && user && user.stripeSubscriptionId) {
        try {
          const subscription = await stripe3.subscriptions.retrieve(user.stripeSubscriptionId);
          isPremiumUser = subscription.status === "active";
        } catch (error) {
          console.warn("Failed to check subscription status:", error);
        }
      }
      if (!isUserAuthenticated) {
        const sessionKey = `special_trial_${sessionId}`;
        const TRIAL_LIMIT = 5;
        if (!global.trialUsage) {
          global.trialUsage = /* @__PURE__ */ new Map();
        }
        const trialUsage = global.trialUsage.get(sessionKey) || 0;
        const remaining = Math.max(0, TRIAL_LIMIT - trialUsage);
        if (remaining <= 0) {
          return res.status(403).json({
            error: "Trial limit exceeded",
            message: "Free trial exhausted. Upgrade to premium for unlimited professional format conversions.",
            requiresUpgrade: true
          });
        }
      }
      if (isUserAuthenticated && !isPremiumUser) {
        return res.status(403).json({
          error: "Premium subscription required",
          message: "Special format conversions require a premium subscription. Please upgrade to continue.",
          requiresUpgrade: true
        });
      }
      const userPlan = getUserPlan(user);
      if (files.length > 20) {
        return res.status(400).json({
          error: "Batch size limit exceeded",
          message: "Maximum 20 files per batch"
        });
      }
      const results = [];
      console.log(`Processing ${files.length} special format conversions for user ${userId2 || "guest"}`);
      for (const file of files) {
        try {
          const jobId = (0, import_crypto5.randomUUID)();
          const originalFormat = getFileFormat(file.originalname);
          const outputExtension = outputFormat === "jpeg" ? "jpg" : outputFormat;
          const outputPath = import_path4.default.join("converted", `${jobId}.${outputExtension}`);
          console.log(`Converting ${file.originalname} (${originalFormat}) to ${outputFormat}`);
          console.log(`Input file path: ${file.path}`);
          console.log(`Output file path: ${outputPath}`);
          const originalStats = await import_promises.default.stat(file.path);
          console.log(`Original file size: ${originalStats.size} bytes`);
          console.log(`\u{1F527} CALLING processSpecialFormatConversion with:`, {
            quality: qualityValue,
            resize: shouldResize,
            width: customWidth,
            height: customHeight,
            maintainAspect: maintainAspectRatio,
            resizePercentage: resizePercentageValue
          });
          const conversionResult = await processSpecialFormatConversion(
            file.path,
            outputPath,
            originalFormat,
            outputFormat,
            {
              quality: qualityValue,
              resize: shouldResize,
              width: customWidth,
              height: customHeight,
              maintainAspect: maintainAspectRatio,
              resizePercentage: resizePercentageValue
            }
          );
          const convertedStats = await import_promises.default.stat(outputPath);
          const job = {
            id: jobId,
            originalFilename: file.originalname,
            originalSize: originalStats.size,
            compressedSize: convertedStats.size,
            outputFormat,
            status: "completed"
          };
          console.log(`Conversion completed: ${file.originalname} -> ${outputPath}`);
          let previewUrl;
          let downloadUrl;
          try {
            const thumbnailPath = await generateThumbnailFromRaw(outputPath, import_path4.default.dirname(outputPath), jobId);
            if (thumbnailPath) {
              previewUrl = `/api/preview/${jobId}`;
              console.log(`\u2705 Thumbnail generated for ${outputFormat}: ${thumbnailPath}`);
            }
          } catch (thumbnailError) {
            console.warn(`\u26A0\uFE0F Thumbnail generation failed for ${jobId} (${outputFormat}):`, thumbnailError);
          }
          downloadUrl = `/api/download/${jobId}`;
          results.push({
            id: job.id,
            originalName: file.originalname,
            originalSize: originalStats.size,
            compressedSize: convertedStats.size,
            // Use consistent naming with compression endpoint
            originalFormat,
            outputFormat,
            status: "completed",
            downloadUrl,
            // Always include download URL
            ...previewUrl && { previewUrl }
            // Include preview URL if thumbnail was generated
          });
          console.log(`Successfully converted ${file.originalname}: ${originalStats.size} \u2192 ${convertedStats.size} bytes`);
          if (sessionId) {
            try {
              const pageIdentifier = "/convert/cr2-to-png";
              const userType = isUserAuthenticated ? "authenticated" : "anonymous";
              const dualTracker = new (await Promise.resolve().then(() => (init_DualUsageTracker(), DualUsageTracker_exports))).DualUsageTracker(
                userId2 || void 0,
                sessionId,
                userType
              );
              await dualTracker.recordOperation(file.originalname, convertedStats.size, pageIdentifier);
              console.log("\u2705 DualUsageTracker updated for RAW conversion");
            } catch (error) {
              console.log("\u26A0\uFE0F Failed to update DualUsageTracker:", error);
            }
          }
          if (!isUserAuthenticated) {
            const sessionKey = `special_trial_${sessionId}`;
            const currentUsage = global.trialUsage.get(sessionKey) || 0;
            const newUsage = currentUsage + 1;
            global.trialUsage.set(sessionKey, newUsage);
            console.log(`Trial usage incremented - SessionID: ${sessionId}, SessionKey: ${sessionKey}, Usage: ${newUsage}/5`);
            if (newUsage === 4) {
              console.log("Trial warning threshold reached (4/5 conversions used)");
            }
            if (newUsage >= 5) {
              console.log("Trial limit exhausted - sending notification email");
            }
          }
        } catch (error) {
          console.error(`Failed to convert ${file.originalname}:`, error);
          results.push({
            originalName: file.originalname,
            status: "failed",
            error: error instanceof Error ? error.message : "Unknown error"
          });
        }
      }
      const completedResults = results.filter((r) => r.status === "completed");
      if (completedResults.length > 0) {
        const totalOriginalSize = completedResults.reduce((sum, r) => sum + (r.originalSize || 0), 0);
        const totalConvertedSize = completedResults.reduce((sum, r) => sum + (r.convertedSize || 0), 0);
        const originalFormats = [...new Set(completedResults.map((r) => r.originalFormat).filter(Boolean))];
        const conversionTypes = originalFormats.map((format) => `${format?.toUpperCase()} \u2192 ${outputFormat.toUpperCase()}`);
        const sessionKey = `special_trial_${sessionId}`;
        const currentTrialUsage = global.trialUsage?.get(sessionKey) || 0;
        const trialRemaining = Math.max(0, 5 - currentTrialUsage);
        const shouldSendEmail = !isUserAuthenticated;
        if (shouldSendEmail) {
          console.log("Email notification skipped for guest user (no email collected)");
        }
      }
      res.json({
        message: `Processed ${files.length} file(s)`,
        results,
        totalFilesProcessed: completedResults.length
      });
    } catch (error) {
      console.error("Special format conversion error:", error);
      res.status(500).json({
        error: "Failed to process special format conversion",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/payment/paypal/process", isAuthenticated, processPayPalPayment);
  app2.get("/api/subscription/status", isAuthenticated, getSubscriptionStatus);
  app2.post("/api/subscription/cancel", isAuthenticated, cancelSubscription);
  app2.get("/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });
  app2.post("/paypal/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });
  app2.post("/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });
  app2.post("/api/activate-paypal-subscription", isAuthenticated, async (req, res) => {
    try {
      const { orderId, paymentId, amount, plan } = req.body;
      const userId2 = req.user?.id;
      if (!userId2) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
      }
      if (!orderId || !paymentId || !amount || !plan) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
      const subscriptionEndDate = /* @__PURE__ */ new Date();
      if (plan === "test_premium") {
        subscriptionEndDate.setHours(subscriptionEndDate.getHours() + 24);
      } else {
        subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
      }
      let subscriptionTier = "premium";
      if (plan === "test_premium") {
        subscriptionTier = "test_premium";
      } else if (plan === "enterprise") {
        subscriptionTier = "enterprise";
      }
      await storage.updateUser(userId2, {
        subscriptionTier,
        subscriptionStatus: "active",
        subscriptionEndDate,
        stripeSubscriptionId: paymentId
        // Store PayPal payment ID
      });
      console.log(`PayPal subscription activated for user ${userId2}: Plan=${plan}, Payment=${paymentId}`);
      res.json({
        success: true,
        message: "Subscription activated successfully",
        plan,
        validUntil: subscriptionEndDate
      });
    } catch (error) {
      console.error("PayPal subscription activation error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to activate subscription"
      });
    }
  });
  app2.post("/api/create-subscription", isAuthenticated, async (req, res) => {
    try {
      const { planId, email, password, firstName, lastName } = req.body;
      const userId2 = req.user?.id;
      if (!userId2) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
      }
      if (!planId) {
        return res.status(400).json({ success: false, message: "Plan ID is required" });
      }
      const planMapping = {
        "test-premium": "pro",
        "pro": "pro",
        "enterprise": "enterprise",
        "free": "free"
      };
      const plan = planMapping[planId] || "free";
      const subscriptionEndDate = /* @__PURE__ */ new Date();
      if (plan !== "free") {
        subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
      }
      await db.update(users).set({
        subscriptionTier: plan,
        subscriptionStatus: plan === "free" ? "inactive" : "active",
        subscriptionStartDate: /* @__PURE__ */ new Date(),
        subscriptionEndDate: plan === "free" ? null : subscriptionEndDate,
        monthlyOperations: 0,
        // Reset operations count
        updatedAt: /* @__PURE__ */ new Date()
      }).where((0, import_drizzle_orm9.eq)(users.id, userId2));
      res.json({
        success: true,
        message: `Successfully upgraded to ${plan} plan`,
        subscription: {
          plan,
          status: plan === "free" ? "inactive" : "active",
          endDate: plan === "free" ? null : subscriptionEndDate
        }
      });
    } catch (error) {
      console.error("Legacy subscription creation failed:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create subscription",
        error: error.message
      });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const emailContent = `
        Contact Form Submission:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject || "No subject"}
        
        Message:
        ${message}
      `;
      await emailService.sendEmail({
        to: "support@microjpeg.com",
        subject: `Contact Form: ${subject || "New message from " + name}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, "<br>")
      });
      console.log(`Contact form submitted by ${name} (${email})`);
      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  app2.post("/api/feedback", async (req, res) => {
    try {
      const { message, email } = req.body;
      if (!message) {
        return res.status(400).json({ message: "Feedback message is required" });
      }
      const emailContent = `
        Feedback Submission:
        
        User Email: ${email || "Anonymous"}
        
        Feedback:
        ${message}
      `;
      await emailService.sendEmail({
        to: "feedback@microjpeg.com",
        subject: "New Feedback Submission",
        text: emailContent,
        html: emailContent.replace(/\n/g, "<br>")
      });
      console.log(`Feedback submitted by ${email || "anonymous"}`);
      res.json({ success: true, message: "Feedback sent successfully" });
    } catch (error) {
      console.error("Error processing feedback:", error);
      res.status(500).json({ message: "Failed to send feedback" });
    }
  });
  registerResetEndpoints(app2);
  const httpServer = (0, import_http.createServer)(app2);
  return httpServer;
}
function generateReferralCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
function calculateDiscountFromPoints(points) {
  if (points >= 100) return 25;
  if (points >= 50) return 15;
  if (points >= 20) return 10;
  if (points >= 10) return 5;
  return 0;
}
async function compressImage(jobId, file, options) {
  try {
    console.log(`Starting advanced compression for job ${jobId} with algorithm: ${options.compressionAlgorithm}`);
    await storage.updateCompressionJob(jobId, { status: "processing" });
    console.log(`Updated job ${jobId} status to processing`);
    let quality = options.customQuality;
    if (!quality) {
      switch (options.qualityLevel) {
        case "high":
          quality = 85;
          break;
        case "medium":
          quality = 75;
          break;
        case "low":
          quality = 50;
          break;
        default:
          quality = 75;
      }
    }
    let sharpInstance = (0, import_sharp4.default)(file.path, {
      // Enable advanced processing
      unlimited: true,
      sequentialRead: true
    });
    const metadata = await sharpInstance.metadata();
    console.log(`Image metadata for job ${jobId}:`, {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      colorSpace: metadata.space,
      hasAlpha: metadata.hasAlpha
    });
    console.log(`Fast mode enabled for job ${jobId} - minimal processing for speed`);
    if (options.resizeOption !== "none" && metadata.width && metadata.height) {
      let targetWidth, targetHeight;
      if (options.resizeOption === "custom" && options.customWidth && options.customHeight) {
        targetWidth = options.customWidth;
        targetHeight = options.customHeight;
      } else {
        const scale = parseFloat(options.resizeOption) / 100;
        targetWidth = Math.round(metadata.width * scale);
        targetHeight = Math.round(metadata.height * scale);
      }
      sharpInstance = sharpInstance.resize(targetWidth, targetHeight, {
        kernel: options.fastMode ? import_sharp4.default.kernel.nearest : import_sharp4.default.kernel.lanczos3,
        // Fast vs high-quality resampling
        withoutEnlargement: true,
        withoutReduction: false
      });
    }
    let fileExtension;
    let mimeType;
    switch (options.outputFormat) {
      case "png":
        fileExtension = "png";
        mimeType = "image/png";
        break;
      case "webp":
        fileExtension = "webp";
        mimeType = "image/webp";
        break;
      case "avif":
        fileExtension = "avif";
        mimeType = "image/avif";
        break;
      default:
        fileExtension = "jpg";
        mimeType = "image/jpeg";
    }
    const outputPath = import_path4.default.join("compressed", `${jobId}.${fileExtension}`);
    console.log(`Output path for job ${jobId}: ${outputPath}`);
    if (options.outputFormat === "png") {
      const pngOptions = {
        compressionLevel: options.pngCompressionLevel || 6,
        // 0-9, 6 is default
        quality: quality >= 95 ? void 0 : quality,
        // Only use quality for lossy PNG
        effort: options.pngOptimization === "size" ? 10 : 4,
        // Higher effort for smaller files
        palette: quality < 80,
        // Use palette for aggressive compression
        colors: quality < 60 ? 64 : quality < 80 ? 128 : 256,
        // Reduce colors for smaller files
        dither: 1
        // Add dithering to reduce banding
      };
      if (metadata.width && metadata.height && metadata.width * metadata.height > 5e5) {
        pngOptions.progressive = true;
      }
      sharpInstance = sharpInstance.png(pngOptions);
    } else if (options.outputFormat === "webp") {
      sharpInstance = sharpInstance.webp({
        quality,
        effort: 6,
        // Maximum compression effort
        lossless: quality >= 95,
        nearLossless: quality >= 90 && quality < 95,
        smartSubsample: true
      });
    } else if (options.outputFormat === "avif") {
      sharpInstance = sharpInstance.avif({
        quality,
        effort: 9,
        // Maximum compression effort
        lossless: quality >= 95,
        chromaSubsampling: quality < 90 ? "4:2:0" : "4:4:4"
      });
    } else {
      const jpegOptions = {
        quality,
        mozjpeg: options.fastMode ? false : options.compressionAlgorithm === "mozjpeg",
        // Skip MozJPEG for speed
        progressive: options.fastMode ? false : options.progressiveJpeg || options.compressionAlgorithm === "progressive",
        optimiseScans: options.fastMode ? false : options.optimizeScans,
        overshootDeringing: true,
        // Reduce ringing artifacts
        trellisQuantisation: options.compressionAlgorithm === "mozjpeg"
      };
      if (options.arithmeticCoding && options.compressionAlgorithm === "mozjpeg") {
        jpegOptions.arithmeticCoding = true;
      }
      if (options.optimizeForWeb && quality < 85) {
        jpegOptions.chromaSubsampling = "4:2:0";
      } else if (quality >= 85) {
        jpegOptions.chromaSubsampling = "4:4:4";
      }
      sharpInstance = sharpInstance.jpeg(jpegOptions);
    }
    if (options.optimizeForWeb) {
      sharpInstance = sharpInstance.withMetadata({}).normalize();
    }
    const startTime = Date.now();
    await sharpInstance.toFile(outputPath);
    const compressionTime = Date.now() - startTime;
    console.log(`Compression completed for job ${jobId} in ${compressionTime}ms using ${options.compressionAlgorithm} algorithm`);
    console.log(`Advanced compression completed for job ${jobId}, file saved to ${outputPath}`);
    const stats = await import_promises.default.stat(outputPath);
    const compressedSize = stats.size;
    const compressionRatio = Math.round((file.size - compressedSize) / file.size * 100);
    const compressionEfficiency = compressionRatio > 0 ? "Excellent" : compressionRatio > -10 ? "Good" : "Limited";
    console.log(`Job ${jobId} - Original: ${file.size} bytes, Compressed: ${compressedSize} bytes`);
    console.log(`Compression ratio: ${compressionRatio}% (${compressionEfficiency}), Algorithm: ${options.compressionAlgorithm}`);
    console.log(`Quality setting: ${quality}%, Web optimized: ${options.optimizeForWeb}`);
    const updatedJob = await storage.updateCompressionJob(jobId, {
      status: "completed",
      compressedSize,
      compressionRatio,
      compressedPath: outputPath,
      // Store compression settings for reference
      qualityLevel: options.qualityLevel,
      resizeOption: options.resizeOption,
      outputFormat: options.outputFormat
    });
    console.log(`Successfully updated job ${jobId} to completed status with ${options.compressionAlgorithm} compression`);
    const optimizationInsights = generateOptimizationInsights({
      originalSize: file.size,
      compressedSize,
      compressionRatio,
      quality,
      algorithm: options.compressionAlgorithm,
      webOptimized: options.optimizeForWeb
    });
    console.log(`Optimization insights for job ${jobId}:`, optimizationInsights.join("; "));
    if (compressionRatio > 0) {
      console.log(`\u2705 Successful compression: ${compressionRatio}% size reduction`);
    } else {
      console.log(`\u26A0\uFE0F File size increased by ${Math.abs(compressionRatio)}% - consider different settings`);
    }
    setTimeout(() => {
      calculateQualityMetricsInBackground(jobId, file.path, outputPath).catch((error) => {
        console.warn(`Quality analysis skipped for job ${jobId}:`, error.message);
      });
    }, 100);
  } catch (error) {
    console.error(`Compression failed for job ${jobId}:`, error);
    await storage.updateCompressionJob(jobId, {
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
function getFileFormat(filename) {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const rawFormats = ["cr2", "nef", "arw", "dng", "orf", "raf", "pef", "crw", "erf", "dcr", "k25", "kdc", "mrw", "raw", "sr2", "srf"];
  if (rawFormats.includes(ext)) return "raw";
  if (ext === "svg") return "svg";
  if (["tiff", "tif"].includes(ext)) return "tiff";
  return ext;
}
async function generateThumbnailFromRaw(inputPath, outputDir, jobId) {
  try {
    const previewsDir = import_path4.default.join(process.cwd(), "previews");
    await import_promises.default.mkdir(previewsDir, { recursive: true });
    const thumbnailPath = import_path4.default.join(previewsDir, jobId + "_thumb.jpg");
    const thumbnailCommand = `convert "${inputPath}" -resize "256x256>" -quality 60 -strip "${thumbnailPath}"`;
    console.log(`\u{1F5BC}\uFE0F Generating thumbnail from ${inputPath}: ${thumbnailCommand}`);
    await execAsync3(thumbnailCommand);
    console.log(`\u2705 Fast thumbnail generated: ${thumbnailPath}`);
    return thumbnailPath;
  } catch (error) {
    console.warn(`\u26A0\uFE0F Fast thumbnail generation failed for ${jobId}:`, error);
    return void 0;
  }
}
async function processSpecialFormatConversion(inputPath, outputPath, inputFormat, outputFormat, options = {
  quality: 85,
  resize: false,
  width: 2560,
  height: 2560,
  maintainAspect: true
}) {
  const outputDir = import_path4.default.dirname(outputPath);
  await import_promises.default.mkdir(outputDir, { recursive: true });
  let sharpInstance;
  try {
    if (inputFormat === "raw") {
      console.log(`Converting RAW file ${inputPath} to ${outputFormat} using dcraw_emu + ImageMagick...`);
      const inputExists = await import_promises.default.access(inputPath).then(() => true).catch(() => false);
      console.log(`Input file exists: ${inputExists}`);
      const tempPpmPath = inputPath + "_temp.ppm";
      const dcrawCommand = `dcraw_emu -w -T "${inputPath}"`;
      console.log(`Running dcraw_emu command: ${dcrawCommand}`);
      await execAsync3(dcrawCommand);
      const baseName = inputPath.replace(/\.[^/.]+$/, "");
      const tempTiffPath = baseName + ".tiff";
      console.log(`Expected TIFF output: ${tempTiffPath}`);
      const tiffExists = await import_promises.default.access(tempTiffPath).then(() => true).catch(() => false);
      console.log(`TIFF file created: ${tiffExists}`);
      let convertCommand;
      let resizeParam = "";
      const shouldResizeImage = options.resize === true || options.resize === "true";
      const hasValidPercentage = options.resizePercentage && options.resizePercentage < 100 && options.resizePercentage > 0;
      console.log(`\u{1F527} RESIZE CONDITIONS: shouldResizeImage=${shouldResizeImage}, hasValidPercentage=${hasValidPercentage}, resizePercentage=${options.resizePercentage}`);
      if (shouldResizeImage && hasValidPercentage || hasValidPercentage) {
        const identifyCommand = `identify -ping -format "%wx%h" "${tempTiffPath}"`;
        console.log(`\u{1F527} RESIZE DEBUG: Running identify command: ${identifyCommand}`);
        const dimensionsOutput = await execAsync3(identifyCommand);
        const dimensions = dimensionsOutput.stdout.trim();
        const [actualWidth, actualHeight] = dimensions.split("x").map(Number);
        console.log(`\u{1F527} RAW actual dimensions: ${actualWidth}x${actualHeight}, Resize to: ${options.resizePercentage}%`);
        const targetWidth = Math.round(actualWidth * (options.resizePercentage / 100));
        const targetHeight = Math.round(actualHeight * (options.resizePercentage / 100));
        console.log(`\u{1F527} RAW target dimensions: ${targetWidth}x${targetHeight}`);
        resizeParam = `-resize "${targetWidth}x${targetHeight}!"`;
      } else {
        console.log(`\u{1F527} RESIZE DEBUG: No resize requested - options.resize=${options.resize}, options.resizePercentage=${options.resizePercentage}`);
      }
      switch (outputFormat) {
        case "jpeg":
          convertCommand = `convert "${tempTiffPath}" -quality ${options.quality} ${resizeParam} "${outputPath}"`;
          break;
        case "png":
          convertCommand = `convert "${tempTiffPath}" -define png:compression-level=8 ${resizeParam} "${outputPath}"`;
          break;
        case "webp":
          convertCommand = `convert "${tempTiffPath}" -quality ${options.quality} ${resizeParam} "${outputPath}"`;
          break;
        case "tiff":
          convertCommand = `convert "${tempTiffPath}" -compress jpeg -quality ${options.quality} ${resizeParam} "${outputPath}"`;
          break;
        case "avif":
          convertCommand = `convert "${tempTiffPath}" -quality ${options.quality} ${resizeParam} "${outputPath}"`;
          break;
        default:
          throw new Error(`Unsupported output format: ${outputFormat}`);
      }
      console.log(`Running ImageMagick convert command: ${convertCommand}`);
      let thumbnailPromise;
      if (outputFormat === "tiff") {
        const outputFilename = import_path4.default.basename(outputPath, import_path4.default.extname(outputPath));
        thumbnailPromise = generateThumbnailFromRaw(tempTiffPath, import_path4.default.dirname(outputPath), outputFilename);
      }
      await execAsync3(convertCommand);
      const outputExists = await import_promises.default.access(outputPath).then(() => true).catch(() => false);
      console.log(`Output file created: ${outputExists}`);
      let previewPath2;
      if (outputFormat === "tiff") {
        try {
          const previewsDir = import_path4.default.dirname(outputPath).replace("/converted", "/previews");
          await import_promises.default.mkdir(previewsDir, { recursive: true });
          const outputFilename = import_path4.default.basename(outputPath, import_path4.default.extname(outputPath));
          previewPath2 = import_path4.default.join(previewsDir, outputFilename + ".jpg");
          const previewCommand = `convert "${tempTiffPath}" -resize "512x512>" -quality 70 "${previewPath2}"`;
          console.log(`Generating TIFF preview: ${previewCommand}`);
          await execAsync3(previewCommand);
          console.log(`TIFF preview generated: ${previewPath2}`);
        } catch (previewError) {
          console.warn(`Failed to generate TIFF preview:`, previewError);
          previewPath2 = void 0;
        }
      }
      try {
        await import_promises.default.unlink(tempTiffPath);
        console.log(`Cleaned up temporary TIFF file: ${tempTiffPath}`);
      } catch (cleanupError) {
        console.warn(`Failed to clean up temporary TIFF file ${tempTiffPath}:`, cleanupError);
      }
      let thumbnailPath;
      if (thumbnailPromise) {
        try {
          thumbnailPath = await thumbnailPromise;
          console.log(`Thumbnail generated: ${thumbnailPath}`);
        } catch (thumbnailError) {
          console.warn(`Thumbnail generation failed:`, thumbnailError);
        }
      }
      const stats2 = await import_promises.default.stat(outputPath);
      return { success: true, outputSize: stats2.size, previewPath: thumbnailPath || previewPath2 };
    } else if (inputFormat === "svg") {
      sharpInstance = (0, import_sharp4.default)(inputPath, {
        density: 300
        // High DPI for SVG rasterization
      });
    } else if (inputFormat === "tiff") {
      sharpInstance = (0, import_sharp4.default)(inputPath);
    } else {
      sharpInstance = (0, import_sharp4.default)(inputPath);
    }
    if (options.resize) {
      const resizeOptions = {
        width: options.width,
        height: options.height,
        fit: options.maintainAspect ? "inside" : "fill",
        withoutEnlargement: true
      };
      sharpInstance = sharpInstance.resize(resizeOptions);
    }
    switch (outputFormat) {
      case "jpeg":
        await sharpInstance.jpeg({
          quality: options.quality,
          progressive: true,
          mozjpeg: true
        }).toFile(outputPath);
        break;
      case "png":
        await sharpInstance.png({
          quality: options.quality,
          compressionLevel: 8,
          adaptiveFiltering: true
        }).toFile(outputPath);
        break;
      case "webp":
        await sharpInstance.webp({
          quality: options.quality,
          effort: 4
        }).toFile(outputPath);
        break;
      case "tiff":
        await sharpInstance.tiff({
          compression: "jpeg",
          quality: options.quality,
          predictor: "horizontal"
        }).toFile(outputPath);
        break;
      case "avif":
        await sharpInstance.avif({
          quality: 90,
          effort: 4
        }).toFile(outputPath);
        break;
      default:
        throw new Error(`Unsupported output format: ${outputFormat}`);
    }
    const stats = await import_promises.default.stat(outputPath);
    let previewPath;
    if (outputFormat === "tiff") {
      try {
        const previewsDir = import_path4.default.dirname(outputPath).replace("/converted", "/previews");
        await import_promises.default.mkdir(previewsDir, { recursive: true });
        const outputFilename = import_path4.default.basename(outputPath, import_path4.default.extname(outputPath));
        previewPath = import_path4.default.join(previewsDir, outputFilename + ".jpg");
        await (0, import_sharp4.default)(outputPath).resize(512, 512, { fit: "inside", withoutEnlargement: true }).jpeg({ quality: 70, progressive: true }).toFile(previewPath);
        console.log(`TIFF preview generated: ${previewPath}`);
      } catch (previewError) {
        console.warn(`Failed to generate TIFF preview:`, previewError);
        previewPath = void 0;
      }
    }
    return { success: true, outputSize: stats.size, previewPath };
  } catch (error) {
    console.error(`Conversion error (${inputFormat} \u2192 ${outputFormat}):`, error);
    throw new Error(`Failed to convert ${inputFormat} to ${outputFormat}: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
async function calculateQualityMetricsInBackground(jobId, originalPath, compressedPath) {
  const timeoutMs = 1e4;
  try {
    console.log(`Calculating quality metrics for job ${jobId} in background...`);
    const qualityMetrics = await Promise.race([
      calculateQualityMetrics(originalPath, compressedPath),
      new Promise(
        (_, reject) => setTimeout(() => reject(new Error("Quality analysis timeout")), timeoutMs)
      )
    ]);
    console.log(`Quality assessment completed - PSNR: ${qualityMetrics.psnr}, SSIM: ${qualityMetrics.ssim}%, Score: ${qualityMetrics.qualityScore}, Grade: ${qualityMetrics.qualityGrade}`);
    await storage.updateCompressionJob(jobId, {
      psnr: Math.round(qualityMetrics.psnr * 100),
      // Store as integer with 2 decimal precision
      ssim: Math.round(qualityMetrics.ssim * 100),
      // Store as integer percentage
      qualityScore: qualityMetrics.qualityScore,
      qualityGrade: qualityMetrics.qualityGrade
    });
    console.log(`Quality metrics updated for job ${jobId}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes("timeout")) {
      console.warn(`Quality assessment timed out for job ${jobId} - skipping`);
    } else {
      console.error(`Quality assessment failed for job ${jobId}:`, error);
    }
  }
}
function registerResetEndpoints(app2) {
  app2.post("/api/dev-reset-counter", async (req, res) => {
    try {
      const sessionId = req.headers["x-session-id"] || req.body?.sessionId || req.body?.clientSessionId;
      const pageIdentifier = req.headers["x-page-identifier"] || req.body?.pageIdentifier || "cr2-free";
      console.log(`\u{1F527} DEV: Reset counter request - sessionId: ${sessionId}, pageIdentifier: ${pageIdentifier}`);
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID required" });
      }
      let clearedSystems = 0;
      const cacheKeys = [
        `usage:${sessionId}:${pageIdentifier}`,
        `session:${sessionId}:${pageIdentifier}`,
        `counters:${sessionId}:${pageIdentifier}`,
        `daily:${sessionId}:${pageIdentifier}`,
        `monthly:${sessionId}:${pageIdentifier}`
      ];
      try {
        await db.delete(anonymousSessionScopes).where(
          (0, import_drizzle_orm9.and)(
            (0, import_drizzle_orm9.eq)(anonymousSessionScopes.sessionId, sessionId),
            (0, import_drizzle_orm9.eq)(anonymousSessionScopes.scope, pageIdentifier)
          )
        );
        console.log(`\u{1F527} DEV: Cleared anonymousSessionScopes for session: ${sessionId}, scope: ${pageIdentifier}`);
        clearedSystems++;
      } catch (dbError) {
        console.warn("\u{1F527} DEV: anonymousSessionScopes clear failed (might not exist):", dbError);
      }
      try {
        const userUsageDeleted = await db.delete(userUsage).where(
          (0, import_drizzle_orm9.and)(
            (0, import_drizzle_orm9.eq)(userUsage.sessionId, sessionId),
            (0, import_drizzle_orm9.eq)(userUsage.userId, "anonymous")
          )
        );
        console.log(`\u{1F527} DEV: CLEARED DualUsageTracker userUsage for session: ${sessionId}`);
        clearedSystems++;
      } catch (dbError) {
        console.error("\u{1F527} DEV: userUsage clear failed:", dbError);
      }
      try {
        await db.delete(operationLog).where((0, import_drizzle_orm9.eq)(operationLog.sessionId, sessionId));
        console.log(`\u{1F527} DEV: Cleared operationLog for session: ${sessionId}`);
        clearedSystems++;
      } catch (dbError) {
        console.warn("\u{1F527} DEV: operationLog clear failed:", dbError);
      }
      res.json({
        success: true,
        message: `ALL tracking systems reset for session ${sessionId}`,
        cleared: {
          sessionId,
          pageIdentifier,
          systems: clearedSystems,
          redisEliminated: true,
          database: ["anonymousSessionScopes", "userUsage", "operationLog"]
        }
      });
    } catch (error) {
      console.error("\u{1F527} DEV: Counter reset failed:", error);
      res.status(500).json({ error: "Reset failed", details: error instanceof Error ? error.message : "Unknown error" });
    }
  });
  app2.post("/api/dev-nuclear-reset", async (req, res) => {
    try {
      console.log(`\u{1F6A8} DEV: NUCLEAR RESET - Clearing ALL anonymous usage data`);
      let clearedItems = 0;
      try {
        const result = await db.delete(userUsage).where((0, import_drizzle_orm9.eq)(userUsage.userId, "anonymous"));
        console.log(`\u{1F6A8} DEV: Cleared ALL anonymous userUsage records`);
        clearedItems++;
      } catch (error) {
        console.error("Nuclear reset userUsage failed:", error);
      }
      try {
        await db.delete(anonymousSessionScopes);
        console.log(`\u{1F6A8} DEV: Cleared ALL anonymousSessionScopes`);
        clearedItems++;
      } catch (error) {
        console.error("Nuclear reset anonymousSessionScopes failed:", error);
      }
      try {
        await db.delete(operationLog).where((0, import_drizzle_orm9.eq)(operationLog.userId, null));
        console.log(`\u{1F6A8} DEV: Cleared ALL anonymous operationLog records`);
        clearedItems++;
      } catch (error) {
        console.error("Nuclear reset operationLog failed:", error);
      }
      res.json({
        success: true,
        message: `NUCLEAR RESET: All anonymous usage data cleared`,
        clearedSystems: clearedItems
      });
    } catch (error) {
      console.error("\u{1F6A8} DEV: Nuclear reset failed:", error);
      res.status(500).json({ error: "Nuclear reset failed", details: error instanceof Error ? error.message : "Unknown error" });
    }
  });
  app2.post("/api/admin/superuser/bypass", ensureSuperuser, async (req, res) => {
    try {
      const { enabled, reason } = req.body;
      if (typeof enabled !== "boolean") {
        return res.status(400).json({
          error: "Invalid request",
          message: "enabled field must be a boolean"
        });
      }
      setSuperuserBypass(req, enabled, reason);
      await updateAppSettings(
        { superuserBypassEnabled: enabled },
        req.user.id
      );
      await logAdminAction(
        req.user.id,
        enabled ? "BYPASS_ENABLED" : "BYPASS_DISABLED",
        void 0,
        req.sessionID,
        { reason: reason || "No reason provided", globalSetting: enabled },
        req.ip,
        req.get("User-Agent")
      );
      console.log(`\u{1F527} Superuser bypass ${enabled ? "ENABLED" : "DISABLED"} by ${req.user.email} (global setting: ${enabled})`);
      res.json({
        success: true,
        bypassEnabled: enabled,
        message: `Superuser bypass ${enabled ? "enabled" : "disabled"} globally and for current session`,
        reason: reason || null
      });
    } catch (error) {
      console.error("Error managing superuser bypass:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to manage bypass settings"
      });
    }
  });
  app2.get("/api/admin/app-settings", ensureSuperuser, async (req, res) => {
    try {
      const settings = await getAppSettings();
      res.json({
        success: true,
        settings: {
          countersEnforcement: settings.countersEnforcement,
          adminUiEnabled: settings.adminUiEnabled,
          superuserBypassEnabled: settings.superuserBypassEnabled
        }
      });
    } catch (error) {
      console.error("Error fetching app settings:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to fetch app settings"
      });
    }
  });
  app2.put("/api/admin/app-settings", ensureSuperuser, async (req, res) => {
    try {
      const { countersEnforcement, adminUiEnabled, superuserBypassEnabled } = req.body;
      if (countersEnforcement && typeof countersEnforcement !== "object") {
        return res.status(400).json({
          error: "Invalid request",
          message: "countersEnforcement must be an object"
        });
      }
      if (adminUiEnabled !== void 0 && typeof adminUiEnabled !== "boolean") {
        return res.status(400).json({
          error: "Invalid request",
          message: "adminUiEnabled must be a boolean"
        });
      }
      if (superuserBypassEnabled !== void 0 && typeof superuserBypassEnabled !== "boolean") {
        return res.status(400).json({
          error: "Invalid request",
          message: "superuserBypassEnabled must be a boolean"
        });
      }
      await updateAppSettings(
        { countersEnforcement, adminUiEnabled, superuserBypassEnabled },
        req.user.id
      );
      await logAdminAction(
        req.user.id,
        "APP_SETTINGS_UPDATED",
        void 0,
        void 0,
        { updates: { countersEnforcement, adminUiEnabled } },
        req.ip,
        req.get("User-Agent")
      );
      console.log(`\u2699\uFE0F App settings updated by ${req.user.email}:`, { countersEnforcement, adminUiEnabled });
      const updatedSettings = await getAppSettings();
      res.json({
        success: true,
        message: "App settings updated successfully",
        settings: {
          countersEnforcement: updatedSettings.countersEnforcement,
          adminUiEnabled: updatedSettings.adminUiEnabled,
          superuserBypassEnabled: updatedSettings.superuserBypassEnabled
        }
      });
    } catch (error) {
      console.error("Error updating app settings:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to update app settings"
      });
    }
  });
  app2.get("/api/admin/audit-logs", ensureSuperuser, async (req, res) => {
    try {
      const { limit = 50, offset = 0 } = req.query;
      const logs = await db.select().from(adminAuditLogs).orderBy(desc(adminAuditLogs.createdAt)).limit(Math.min(Number(limit), 100)).offset(Number(offset));
      res.json({
        success: true,
        logs,
        pagination: {
          limit: Number(limit),
          offset: Number(offset),
          hasMore: logs.length === Number(limit)
        }
      });
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to fetch audit logs"
      });
    }
  });
  app2.post("/api/admin/counters/reset", ensureSuperuser, async (req, res) => {
    try {
      const { userId: userId2, sessionId, resetType } = req.body;
      if (!userId2 && !sessionId) {
        return res.status(400).json({
          error: "Invalid request",
          message: "Either userId or sessionId must be provided"
        });
      }
      if (!["hourly", "daily", "monthly", "all"].includes(resetType)) {
        return res.status(400).json({
          error: "Invalid request",
          message: "resetType must be one of: hourly, daily, monthly, all"
        });
      }
      let updateData = { updatedAt: /* @__PURE__ */ new Date() };
      if (resetType === "hourly" || resetType === "all") {
        updateData.regularHourly = 0;
        updateData.rawHourly = 0;
        updateData.hourlyResetAt = /* @__PURE__ */ new Date();
      }
      if (resetType === "daily" || resetType === "all") {
        updateData.regularDaily = 0;
        updateData.rawDaily = 0;
        updateData.dailyResetAt = /* @__PURE__ */ new Date();
      }
      if (resetType === "monthly" || resetType === "all") {
        updateData.regularMonthly = 0;
        updateData.rawMonthly = 0;
        updateData.monthlyBandwidthMb = 0;
        updateData.monthlyResetAt = /* @__PURE__ */ new Date();
      }
      let whereCondition;
      if (userId2) {
        whereCondition = (0, import_drizzle_orm9.eq)(userUsage.userId, userId2);
      } else {
        whereCondition = (0, import_drizzle_orm9.eq)(userUsage.sessionId, sessionId);
      }
      await db.update(userUsage).set(updateData).where(whereCondition);
      await logAdminAction(
        req.user.id,
        "COUNTERS_RESET",
        userId2,
        sessionId,
        { resetType, updateData },
        req.ip,
        req.get("User-Agent")
      );
      console.log(`\u{1F504} Counters reset (${resetType}) by ${req.user.email} for ${userId2 ? "user " + userId2 : "session " + sessionId}`);
      res.json({
        success: true,
        message: `${resetType} counters reset successfully`,
        resetType,
        target: userId2 ? { userId: userId2 } : { sessionId }
      });
    } catch (error) {
      console.error("Error resetting counters:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to reset counters"
      });
    }
  });
  app2.get("/api/admin/status", ensureSuperuser, async (req, res) => {
    try {
      const session4 = req.session;
      const bypassEnabled = session4?.superBypassEnabled === true;
      const bypassReason = session4?.superBypassReason;
      const appSettings2 = await getAppSettings();
      res.json({
        success: true,
        superuser: {
          id: req.user.id,
          email: req.user.email,
          bypassEnabled,
          bypassReason: bypassReason || null
        },
        appSettings: {
          countersEnforcement: appSettings2.countersEnforcement,
          adminUiEnabled: appSettings2.adminUiEnabled,
          superuserBypassEnabled: appSettings2.superuserBypassEnabled
        }
      });
    } catch (error) {
      console.error("Error fetching admin status:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to fetch admin status"
      });
    }
  });
}

// server/viteStatic.ts
var import_express7 = __toESM(require("express"), 1);
var import_path5 = __toESM(require("path"), 1);
var import_fs5 = __toESM(require("fs"), 1);
function serveStatic(app2) {
  const distPath = import_path5.default.resolve(process.cwd(), "dist");
  console.log(`\u{1F3D7}\uFE0F  Setting up static file serving from: ${distPath}`);
  if (!import_fs5.default.existsSync(distPath)) {
    console.error(`\u274C Static files directory not found: ${distPath}`);
  } else {
    console.log(`\u2705 Static files directory found: ${distPath}`);
    const files = import_fs5.default.readdirSync(distPath);
    console.log(`\u{1F4C1} Files in dist: ${files.join(", ")}`);
  }
  app2.use(import_express7.default.static(distPath));
  app2.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    if (import_path5.default.extname(req.path)) return next();
    const indexPath = import_path5.default.join(distPath, "index.html");
    if (!import_fs5.default.existsSync(indexPath)) {
      console.error(`\u274C index.html not found at: ${indexPath}`);
      return res.status(404).send("index.html not found");
    }
    res.sendFile(indexPath);
  });
}

// server/testPremiumExpiry.ts
init_db();
init_schema();
var import_drizzle_orm10 = require("drizzle-orm");
var TestPremiumExpiryManager = class {
  /**
   * Check for expired test-premium subscriptions and downgrade them
   */
  static async checkExpiredSubscriptions() {
    try {
      const now = /* @__PURE__ */ new Date();
      const expiredUsers = await db.select().from(users).where(
        (0, import_drizzle_orm10.and)(
          (0, import_drizzle_orm10.eq)(users.subscriptionTier, "test_premium"),
          (0, import_drizzle_orm10.eq)(users.subscriptionStatus, "active"),
          (0, import_drizzle_orm10.lt)(users.subscriptionEndDate, now)
        )
      );
      console.log(`Found ${expiredUsers.length} expired test-premium subscriptions`);
      for (const user of expiredUsers) {
        await this.expireTestPremiumSubscription(user);
      }
      if (expiredUsers.length > 0) {
        console.log(`Expired ${expiredUsers.length} test-premium subscriptions`);
      }
    } catch (error) {
      console.error("Error checking expired test-premium subscriptions:", error);
    }
  }
  /**
   * Expire a single test-premium subscription
   */
  static async expireTestPremiumSubscription(user) {
    try {
      await db.update(users).set({
        subscriptionTier: "free_registered",
        subscriptionStatus: "inactive",
        subscriptionEndDate: null,
        updatedAt: /* @__PURE__ */ new Date()
      }).where((0, import_drizzle_orm10.eq)(users.id, user.id));
      await this.sendExpiryEmail(user);
      console.log(`Test-premium subscription expired for user ${user.id} (${user.email})`);
    } catch (error) {
      console.error(`Error expiring test-premium for user ${user.id}:`, error);
    }
  }
  /**
   * Send test-premium expiry notification with upgrade options
   */
  static async sendExpiryEmail(user) {
    if (!user.email) return;
    const subject = "\u23F0 Your Test Premium has expired - Ready for the full experience?";
    const html = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">\u23F0 Test Premium Expired</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Hope you loved the Premium experience!</p>
        </div>
        
        <div style="padding: 30px; background: white; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <p>Hi ${user.firstName || "there"},</p>
          
          <p>Your 24-hour Test Premium access has expired, but we hope you enjoyed the premium features!</p>
          
          <div style="background: #f0fdf4; border-left: 4px solid #AD0000; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
            <h3 style="margin: 0 0 15px 0; color: #AD0000;">\u{1F199} Ready to Upgrade?</h3>
            <p style="margin: 0 0 15px 0;">You're now back on the Free plan with 500 operations/month and 10MB file limit.</p>
            <p style="margin: 0; font-weight: bold;">Miss those premium features? Upgrade to our full Premium plan!</p>
          </div>

          <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #d97706;">\u{1F48E} Premium Plan Benefits:</h3>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
              <li><strong>10,000 operations/month</strong> (33x more than Free)</li>
              <li><strong>50MB file size limit</strong> (5x bigger than Free)</li>
              <li><strong>All formats including RAW</strong> (CR2, ARW, DNG, NEF, etc.)</li>
              <li><strong>Advanced quality controls</strong></li>
              <li><strong>No ads</strong> - clean, professional interface</li>
              <li><strong>3 concurrent uploads</strong></li>
              <li><strong>Priority processing</strong></li>
              <li><strong>API access</strong></li>
              <li><strong>Email support</strong></li>
            </ul>
            <p style="margin: 15px 0 0 0; font-size: 18px; font-weight: bold; color: #d97706;">Just $29/month - Cancel anytime!</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || "https://microjpeg.com"}/subscribe?plan=pro" 
               style="background: #AD0000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 15px;">
              Upgrade to Premium \u2192
            </a>
            <a href="${process.env.FRONTEND_URL || "https://microjpeg.com"}/compress-free" 
               style="background: transparent; color: #AD0000; border: 2px solid #AD0000; padding: 13px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Continue with Free
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <h3 style="color: #AD0000;">\u{1F914} Have questions about Premium?</h3>
          <p>We'd love to help! Reply to this email or reach out to our support team.</p>
          
          <p><strong>Fun fact:</strong> The average Premium user saves 2-3 hours per week with our advanced features and higher limits!</p>
          
          <p>Thanks for testing Premium with us!<br>
          The Micro JPEG Team</p>
        </div>
      </div>
    `;
    try {
      await emailService.sendEmail({
        from: "noreply@microjpeg.com",
        to: user.email,
        subject,
        html
      });
    } catch (error) {
      console.error("Failed to send expiry email:", error);
    }
  }
  /**
   * Get time until test-premium expires for a user
   */
  static async getTimeUntilExpiry(userId2) {
    try {
      const [user] = await db.select().from(users).where((0, import_drizzle_orm10.eq)(users.id, userId2)).limit(1);
      if (!user || user.subscriptionTier !== "test_premium" || !user.subscriptionEndDate) {
        return null;
      }
      const now = /* @__PURE__ */ new Date();
      const expiry = new Date(user.subscriptionEndDate);
      const timeLeft = expiry.getTime() - now.getTime();
      return timeLeft > 0 ? timeLeft : 0;
    } catch (error) {
      console.error("Error getting time until expiry:", error);
      return null;
    }
  }
  /**
   * Start the expiry check interval (runs every 5 minutes)
   */
  static startExpiryChecker() {
    if (process.env.NODE_ENV === "production") {
      console.log("Background expiry checker disabled in production deployment");
      return;
    }
    const interval = 5 * 60 * 1e3;
    console.log("Starting test-premium expiry checker (every 5 minutes)");
    this.checkExpiredSubscriptions();
    setInterval(() => {
      this.checkExpiredSubscriptions();
    }, interval);
  }
};

// server/index.prod.ts
init_queueService();
var app = (0, import_express8.default)();
app.set("trust proxy", 1);
app.set("etag", false);
app.use((0, import_cors.default)({
  origin: "https://microjpeg.com",
  credentials: true
}));
app.use(import_express8.default.json({ limit: "200mb" }));
app.use(import_express8.default.urlencoded({ extended: false, limit: "200mb" }));
app.use(
  (0, import_express_session3.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: "none"
    }
  })
);
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});
app.use((req, res, next) => {
  const start = Date.now();
  const path7 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path7.startsWith("/api")) {
      console.log(`${req.method} ${path7} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});
(async () => {
  await initializeQueueService();
  const httpServer = await registerRoutes(app);
  app.use((err, req, res, next) => {
    const status = err.statusCode || err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  console.log("\u{1F680} Starting in production mode - serving static files");
  serveStatic(app);
  const port = parseInt(process.env.PORT || "3000", 10);
  const hostname = "0.0.0.0";
  const server = httpServer.listen(port, hostname, () => {
    console.log(`\u{1F31F} Production server running on port ${port} on ${hostname}`);
    TestPremiumExpiryManager.startExpiryChecker();
  });
  process.on("SIGTERM", async () => {
    console.log("\u{1F504} Received SIGTERM, shutting down gracefully...");
    await shutdownQueueService();
    server.close(() => {
      console.log("\u2705 Server shut down gracefully");
      process.exit(0);
    });
  });
  process.on("SIGINT", async () => {
    console.log("\u{1F504} Received SIGINT, shutting down gracefully...");
    await shutdownQueueService();
    server.close(() => {
      console.log("\u2705 Server shut down gracefully");
      process.exit(0);
    });
  });
})();
