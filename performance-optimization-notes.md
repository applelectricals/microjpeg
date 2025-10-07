// Quick performance fix for DualUsageTracker
// Add this to the top of DualUsageTracker.ts to implement caching

const usageCache = new Map();
const CACHE_TTL = 30000; // 30 seconds cache

interface CachedUsage {
  data: any;
  timestamp: number;
}

// Helper function to get cached usage
function getCachedUsage(key: string): any | null {
  const cached = usageCache.get(key) as CachedUsage;
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

// Replace the getCurrentUsage method with this optimized version:
private async getCurrentUsage(): Promise<any> {
  try {
    console.log('📊 DualUsageTracker.getCurrentUsage called for:', { userType: this.userType, userId: this.userId });
    
    // Check cache first
    const cacheKey = `usage_${this.userId || 'anonymous'}_${this.sessionId}`;
    const cached = getCachedUsage(cacheKey);
    if (cached) {
      console.log('⚡ Using cached usage data');
      return cached;
    }
    
    const now = new Date();
  
    // Simplified query - get existing usage without complex joins
    const usageResult = await db.select()
      .from(userUsage)
      .where(and(
        eq(userUsage.userId, this.userId || 'anonymous'),
        eq(userUsage.sessionId, this.sessionId)
      ))
      .limit(1);

    let usage;
    
    if (!usageResult || usageResult.length === 0) {
      // Create new usage record with simplified structure
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
        hourlyResetAt: new Date(now.getTime() + 60 * 60 * 1000),
        dailyResetAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        monthlyResetAt: new Date(now.getFullYear(), now.getMonth() + 1, 1)
      }).returning();
      
      usage = newUsage;
    } else {
      usage = usageResult[0];
      
      // Simplified reset logic - only reset if really needed
      const hourlyReset = new Date(usage.hourlyResetAt || new Date());
      const dailyReset = new Date(usage.dailyResetAt || new Date());
      
      // Only update if really expired (avoid unnecessary DB writes)
      if (now.getTime() - hourlyReset.getTime() > 3600000 || 
          now.getTime() - dailyReset.getTime() > 86400000) {
        
        // Batch update instead of multiple operations
        await db.update(userUsage)
          .set({
            regularHourly: now.getTime() - hourlyReset.getTime() > 3600000 ? 0 : usage.regularHourly,
            rawHourly: now.getTime() - hourlyReset.getTime() > 3600000 ? 0 : usage.rawHourly,
            regularDaily: now.getTime() - dailyReset.getTime() > 86400000 ? 0 : usage.regularDaily,
            rawDaily: now.getTime() - dailyReset.getTime() > 86400000 ? 0 : usage.rawDaily,
            hourlyResetAt: now.getTime() - hourlyReset.getTime() > 3600000 ? now : usage.hourlyResetAt,
            dailyResetAt: now.getTime() - dailyReset.getTime() > 86400000 ? now : usage.dailyResetAt
          })
          .where(and(
            eq(userUsage.userId, this.userId || 'anonymous'),
            eq(userUsage.sessionId, this.sessionId)
          ));
          
        // Update local object
        if (now.getTime() - hourlyReset.getTime() > 3600000) {
          usage.regularHourly = 0;
          usage.rawHourly = 0;
        }
        if (now.getTime() - dailyReset.getTime() > 86400000) {
          usage.regularDaily = 0;
          usage.rawDaily = 0;
        }
      }
    }

    // Cache the result
    setCachedUsage(cacheKey, usage);
    
    return usage;
  } catch (error) {
    console.error('❌ Error in getCurrentUsage:', error);
    // Return default usage on error to prevent blocking
    return {
      regularHourly: 0,
      regularDaily: 0,
      regularMonthly: 0,
      rawHourly: 0,
      rawDaily: 0,
      rawMonthly: 0,
      monthlyBandwidthMb: 0
    };
  }
}