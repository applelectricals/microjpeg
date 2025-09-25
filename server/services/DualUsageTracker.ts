// server/services/DualUsageTracker.ts

import { db } from '../db';
import { OPERATION_CONFIG, getFileType } from '../config/operationLimits';
import { userUsage, operationLog } from '@shared/schema';
import { eq, and, sql } from 'drizzle-orm';
import { getAppSettings } from '../superuser';

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
    const fileType = getFileType(filename);
    
    if (fileType === 'unknown') {
      return { 
        allowed: false, 
        reason: 'Unsupported file format' 
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

    // Check global enforcement settings
    const appSettings = await getAppSettings();
    const enforceHourly = appSettings.countersEnforcement.hourly;
    const enforceDaily = appSettings.countersEnforcement.daily;
    const enforceMonthly = appSettings.countersEnforcement.monthly;

    // If all enforcement is disabled, allow operation
    if (!enforceHourly && !enforceDaily && !enforceMonthly) {
      console.log('⚠️ Global enforcement disabled: Operation allowed');
      return {
        allowed: true,
        reason: 'enforcement_disabled',
        wasBypassed: true
      };
    }

    // Check file size limit
    const maxSize = OPERATION_CONFIG.maxFileSize[fileType][this.userType];
    if (fileSize > maxSize) {
      return {
        allowed: false,
        reason: `File too large. Maximum ${Math.round(maxSize / 1024 / 1024)}MB for ${fileType} files.`
      };
    }

    // Get current usage
    const usage = await this.getCurrentUsage();
    const limits = this.getLimits(fileType, pageIdentifier);

    // Check limits with enforcement settings
    if (fileType === 'raw') {
      if (enforceHourly && usage.rawHourly >= limits.hourly) {
        return { 
          allowed: false, 
          reason: `Hourly RAW limit reached (${limits.hourly})`,
          usage,
          limits
        };
      }
      if (enforceDaily && usage.rawDaily >= limits.daily) {
        return { 
          allowed: false, 
          reason: `Daily RAW limit reached (${limits.daily})`,
          usage,
          limits
        };
      }
      if (enforceMonthly && usage.rawMonthly >= limits.monthly) {
        return { 
          allowed: false, 
          reason: `Monthly RAW limit reached (${limits.monthly})`,
          usage,
          limits
        };
      }
    } else {
      if (enforceHourly && usage.regularHourly >= limits.hourly) {
        return { 
          allowed: false, 
          reason: `Hourly limit reached (${limits.hourly})`,
          usage,
          limits
        };
      }
      if (enforceDaily && usage.regularDaily >= limits.daily) {
        return { 
          allowed: false, 
          reason: `Daily limit reached (${limits.daily})`,
          usage,
          limits
        };
      }
      if (enforceMonthly && usage.regularMonthly >= limits.monthly) {
        return { 
          allowed: false, 
          reason: `Monthly limit reached (${limits.monthly})`,
          usage,
          limits
        };
      }
    }

    return { 
      allowed: true,
      usage,
      limits
    };
  }

  // Record successful operation with audit trail
  async recordOperation(
    filename: string,
    fileSize: number,
    pageIdentifier: string
  ): Promise<void> {
    const fileType = getFileType(filename);
    
    if (fileType === 'unknown') {
      return; // Don't record unknown file types
    }
    
    // Validate fileSize - if NaN or invalid, default to 0
    const validFileSize = isNaN(fileSize) || fileSize < 0 ? 0 : fileSize;
    
    // Update usage counters
    await this.incrementUsage(fileType);
    
    // Log operation with bypass information
    const wasBypassed = this.auditContext?.superBypass || false;
    
    await db.insert(operationLog).values({
      userId: this.userId || null,
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
  }

  // Get current usage with automatic reset
  private async getCurrentUsage(): Promise<any> {
    const now = new Date();
    
    // Try to get existing usage
    const usageResult = await db.select()
      .from(userUsage)
      .where(and(
        eq(userUsage.userId, this.userId || 'anonymous'),
        eq(userUsage.sessionId, this.sessionId)
      ))
      .limit(1);

    if (!usageResult || usageResult.length === 0) {
      // Create new usage record
      await db.insert(userUsage).values({
        userId: this.userId || 'anonymous',
        sessionId: this.sessionId
      });
      
      return {
        regularMonthly: 0,
        regularDaily: 0,
        regularHourly: 0,
        rawMonthly: 0,
        rawDaily: 0,
        rawHourly: 0
      };
    }

    const usage = usageResult[0];

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

    return usage;
  }

  // Increment usage counters
  private async incrementUsage(fileType: 'regular' | 'raw'): Promise<void> {
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