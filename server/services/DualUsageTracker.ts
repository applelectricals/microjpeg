// server/services/DualUsageTracker.ts

import { db } from '../db';
import { OPERATION_CONFIG, getFileType } from '../config/operationLimits';
import { userUsage, operationLog } from '@shared/schema';
import { eq, and, sql } from 'drizzle-orm';
import { getAppSettings } from '../superuser';

// Performance optimization: Simple in-memory cache
const usageCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 30000; // 30 seconds cache - safe for usage stats

// Helper function to get cached usage
function getCachedUsage(key: string): any | null {
  const cached = usageCache.get(key);
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    return cached.data;
  }
  usageCache.delete(key);
  return null;
}

// Helper function to set cached usage  
function setCachedUsage(key: string, data: any): void {
  usageCache.set(key, {
    data,
    timestamp: Date.now()
  });
}

export interface AuditContext {
  adminUserId?: string;
  bypassReason?: string;
  superBypass?: boolean;
  ipAddress?: string;
  userAgent?: string;
}

export class DualUsageTracker {
  private userId?: string;
  private sessionId: string;
  private userType: 'anonymous' | 'free' | 'premium' | 'enterprise';
  private auditContext?: AuditContext;

  constructor(
    userId: string | undefined, 
    sessionId: string, 
    userType: string,
    auditContext?: AuditContext
  ) {
    this.userId = userId;
    this.sessionId = sessionId;
    this.userType = userType as any;
    this.auditContext = auditContext;
  }

  // Check if operation is allowed with bypass support
  async canPerformOperation(
    filename: string, 
    fileSize: number,
    pageIdentifier?: string
  ): Promise<{
    allowed: boolean;
    reason?: string;
    limits?: any;
    usage?: any;
    wasBypassed?: boolean;
  }> {
    try {
      console.log('🔧 DualUsageTracker.canPerformOperation called:', { filename, fileSize, pageIdentifier, userType: this.userType });
      
      const fileType = getFileType(filename);
      
      if (fileType === 'unknown') {
        return { 
          allowed: false, 
          reason: 'Unsupported file format. Please upload JPG, PNG, WEBP, AVIF, SVG, TIFF or RAW files (CR2, ARW, DNG, NEF, ORF, RAF, RW2, CRW).' 
        };
      }

      // Check for superuser bypass
      if (this.auditContext?.superBypass) {
        console.log('🔓 Superuser bypass: Operation allowed without limit checks');
        return {
          allowed: true,
          reason: 'superuser_bypass',
          wasBypassed: true
        };
      }

      // Check file size limit based on user type and file type
      let maxSize = OPERATION_CONFIG.maxFileSize[fileType][this.userType];
      
      // Special handling for RAW converter pages (25MB for anonymous users)
      if (pageIdentifier && pageIdentifier.includes('convert') && fileType === 'raw' && this.userType === 'anonymous') {
        maxSize = 25 * 1024 * 1024; // 25MB for RAW conversion pages
      }
      
      if (fileSize > maxSize) {
        const maxMB = Math.round(maxSize / 1024 / 1024);
        const currentMB = Math.round(fileSize / 1024 / 1024);
        
        let upgradeMessage = '';
        if (this.userType === 'anonymous') {
          upgradeMessage = ' Upgrade to Premium for up to 50MB files or Enterprise for up to 200MB files.';
        } else if (this.userType === 'free') {
          upgradeMessage = ' Upgrade to Premium for up to 50MB files or Enterprise for up to 200MB files.';
        } else if (this.userType === 'premium') {
          upgradeMessage = ' Upgrade to Enterprise for up to 200MB files.';
        }
        
        return {
          allowed: false,
          reason: `File size (${currentMB}MB) exceeds the ${maxMB}MB limit.${upgradeMessage}`
        };
      }

      // Get current usage and limits
      const usage = await this.getCurrentUsage();
      const limits = this.getLimits(fileType, pageIdentifier);

      // Check limits based on file type
      if (fileType === 'raw') {
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

      console.log('✅ Operation allowed within limits');
      return { 
        allowed: true,
        usage,
        limits
      };
      
    } catch (error) {
      console.error('Error in canPerformOperation:', error);
      // Fallback - allow operation if there's an unexpected error
      return {
        allowed: true,
        reason: 'error_fallback',
        wasBypassed: true
      };
    }
  }  // Record successful operation with audit trail (with database fallback)
  async recordOperation(
    filename: string,
    fileSize: number,
    pageIdentifier: string
  ): Promise<void> {
    try {
      console.log('📝 DualUsageTracker.recordOperation called:', { filename, fileSize, pageIdentifier, userType: this.userType });
      
      const fileType = getFileType(filename);
      
      if (fileType === 'unknown') {
        console.log('⚠️ Skipping record of unknown file type');
        return;
      }
      
      // Validate fileSize - if NaN or invalid, default to 0
      const validFileSize = isNaN(fileSize) || fileSize < 0 ? 0 : fileSize;
      
      // Update usage counters
      await this.incrementUsage(fileType);
      
      // Log operation with bypass information
      const wasBypassed = this.auditContext?.superBypass || false;
      
      await db.insert(operationLog).values({
        userId: this.userId || 'anonymous',
        sessionId: this.sessionId,
        operationType: fileType,
        fileFormat: filename.split('.').pop() || '',
        fileSizeMb: Math.round(validFileSize / 1024 / 1024),
        pageIdentifier: pageIdentifier,
        wasBypassed: wasBypassed,
        bypassReason: this.auditContext?.bypassReason || null,
        actedByAdminId: this.auditContext?.adminUserId || null
      });

      if (wasBypassed) {
        console.log(`📝 Operation logged with bypass: ${fileType} file by ${this.auditContext?.adminUserId || 'system'}`);
      }
      
    } catch (error) {
      console.error('Error recording operation (database may not be updated):', error);
      console.log('🔄 Continuing without operation recording (fallback mode)');
      // Don't throw - operation recording failure shouldn't block the actual processing
    }
  }

  // Get current usage with automatic reset (with database fallback)
  private async getCurrentUsage(): Promise<any> {
    try {
      console.log('📊 DualUsageTracker.getCurrentUsage called for:', { userType: this.userType, userId: this.userId });
      
      // ⚡ PERFORMANCE FIX: Check cache first
      const cacheKey = `usage_${this.userId || 'anonymous'}_${this.sessionId}`;
      const cached = getCachedUsage(cacheKey);
      if (cached) {
        console.log('⚡ Using cached usage data - performance boost!');
        return cached;
      }
      
      const now = new Date();
    
      // Try to get existing usage
      const usageResult = await db.select()
        .from(userUsage)
        .where(and(
          eq(userUsage.userId, this.userId || 'anonymous'),
          eq(userUsage.sessionId, this.sessionId)
        ))
        .limit(1);

      let usage;

      if (!usageResult || usageResult.length === 0) {
        // Create new usage record
        const [newUsage] = await db.insert(userUsage).values({
          userId: this.userId || 'anonymous',
          sessionId: this.sessionId,
          regularHourly: 0,
          regularDaily: 0,
          regularMonthly: 0,
          rawHourly: 0,
          rawDaily: 0,
          rawMonthly: 0,
          monthlyBandwidthMb: 0,
          hourlyResetAt: new Date(now.getTime() + 60 * 60 * 1000), // 1 hour from now
          dailyResetAt: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 1 day from now
          monthlyResetAt: new Date(now.getFullYear(), now.getMonth() + 1, 1) // Next month
        }).returning();
        
        usage = newUsage;
      } else {
        usage = usageResult[0];
      }

      // Check and reset counters if needed
      const hourlyReset = new Date(usage.hourlyResetAt || new Date());
      const dailyReset = new Date(usage.dailyResetAt || new Date());
      const monthlyReset = new Date(usage.monthlyResetAt || new Date());

      let updateData: any = {};
      let needsUpdate = false;
      
      // Reset hourly
      if (now.getTime() - hourlyReset.getTime() > 3600000) { // 1 hour
        updateData.regularHourly = 0;
        updateData.rawHourly = 0;
        updateData.hourlyResetAt = now;
        usage.regularHourly = 0;
        usage.rawHourly = 0;
        needsUpdate = true;
      }

      // Reset daily
      if (now.getTime() - dailyReset.getTime() > 86400000) { // 24 hours
        updateData.regularDaily = 0;
        updateData.rawDaily = 0;
        updateData.dailyResetAt = now;
        usage.regularDaily = 0;
        usage.rawDaily = 0;
        needsUpdate = true;
      }

      // Reset monthly
      if (now.getTime() - monthlyReset.getTime() > 2592000000) { // 30 days
        updateData.regularMonthly = 0;
        updateData.rawMonthly = 0;
        updateData.monthlyBandwidthMb = 0;
        updateData.monthlyResetAt = now;
        usage.regularMonthly = 0;
        usage.rawMonthly = 0;
        needsUpdate = true;
      }

      if (needsUpdate) {
        await db.update(userUsage)
          .set(updateData)
          .where(and(
            eq(userUsage.userId, this.userId || 'anonymous'),
            eq(userUsage.sessionId, this.sessionId)
          ));
      }

      // ⚡ PERFORMANCE FIX: Cache the result
      setCachedUsage(cacheKey, usage);
      console.log('💾 Cached usage data for faster future requests');

      return usage;
      
    } catch (error) {
      console.error('Error getting current usage (database may not be updated):', error);
      console.log('🔄 Falling back to default usage values');
      // Return default values on error - this allows the system to work even if DB schema is outdated
      const defaultUsage = {
        regularHourly: 0,
        regularDaily: 0,
        regularMonthly: 0,
        rawHourly: 0,
        rawDaily: 0,
        rawMonthly: 0,
        monthlyBandwidthMb: 0,
        hourlyResetAt: new Date(),
        dailyResetAt: new Date(),
        monthlyResetAt: new Date()
      };
      
      // Cache default values briefly to avoid repeated errors
      const cacheKey = `usage_${this.userId || 'anonymous'}_${this.sessionId}`;
      setCachedUsage(cacheKey, defaultUsage);
      
      return defaultUsage;
    }
  }

  // Increment usage counters (with database fallback)
  private async incrementUsage(fileType: 'regular' | 'raw'): Promise<void> {
    try {
      console.log('📈 DualUsageTracker.incrementUsage called:', { fileType, userType: this.userType });
      
      if (fileType === 'raw') {
        await db.update(userUsage)
          .set({
            rawMonthly: sql`${userUsage.rawMonthly} + 1`,
            rawDaily: sql`${userUsage.rawDaily} + 1`,
            rawHourly: sql`${userUsage.rawHourly} + 1`,
            updatedAt: new Date()
          })
          .where(and(
            eq(userUsage.userId, this.userId || 'anonymous'),
            eq(userUsage.sessionId, this.sessionId)
          ));
      } else {
        await db.update(userUsage)
          .set({
            regularMonthly: sql`${userUsage.regularMonthly} + 1`,
            regularDaily: sql`${userUsage.regularDaily} + 1`,
            regularHourly: sql`${userUsage.regularHourly} + 1`,
            updatedAt: new Date()
          })
          .where(and(
            eq(userUsage.userId, this.userId || 'anonymous'),
            eq(userUsage.sessionId, this.sessionId)
          ));
      }
      
      console.log(`✅ Usage incremented: ${fileType} operation for ${this.userType} user`);
      
      // ⚡ PERFORMANCE FIX: Invalidate cache after usage increment
      const cacheKey = `usage_${this.userId || 'anonymous'}_${this.sessionId}`;
      usageCache.delete(cacheKey);
      console.log('🗑️ Cache invalidated after usage increment');
      
    } catch (error) {
      console.error('Error incrementing usage (database may not be updated):', error);
      console.log('🔄 Continuing without usage increment (fallback mode)');
      // Don't throw - usage increment failure shouldn't block the actual processing
    }
  }

  // Get limits for file type
  private getLimits(fileType: 'regular' | 'raw', pageIdentifier?: string): any {
    const baseLimits = OPERATION_CONFIG.limits[this.userType][fileType];
    
    // Check for page-specific overrides
    if (pageIdentifier && OPERATION_CONFIG.pageOverrides[pageIdentifier as keyof typeof OPERATION_CONFIG.pageOverrides]) {
      const pageOverride = OPERATION_CONFIG.pageOverrides[pageIdentifier as keyof typeof OPERATION_CONFIG.pageOverrides];
      const override = pageOverride[this.userType as keyof typeof pageOverride];
      if (override) {
        return { ...baseLimits, ...override };
      }
    }
    
    return baseLimits;
  }

  // This method is no longer needed as we handle updates inline
  private async updateResets(usage: any): Promise<void> {
    // This method is now handled inline in getCurrentUsage()
  }

  // Get usage statistics for display
  async getUsageStats(hasLaunchOffer: boolean = false): Promise<any> {
    const usage = await this.getCurrentUsage();
    const regularLimits = OPERATION_CONFIG.limits[this.userType].regular;
    const rawLimits = OPERATION_CONFIG.limits[this.userType].raw;

    // Add 100 bonus operations to monthly limit for free users who claimed launch offer
    const adjustedRegularLimits = { ...regularLimits };
    if (this.userType === 'free' && hasLaunchOffer) {
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
}