import 'express';

declare global {
  namespace Express {
    interface Request {
      context?: {
        pageIdentifier?: string;
        pageScope?: string;
        [key: string]: any;
      };
    }
  }
  
  // Global cache for performance optimizations
  var universalStatsCache: Map<string, { data: any; timestamp: number }> | undefined;
}