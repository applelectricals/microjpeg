import { useQuery } from "@tanstack/react-query";
import { getCurrentPageIdentifier } from "@/lib/pageIdentifier";

export interface UsageStats {
  pageIdentifier: string;
  operations: {
    daily: { used: number; limit: number };
    hourly: { used: number; limit: number };
    monthly: { used: number; limit: number };
  };
}

/**
 * Canonical hook for usage stats - single source of truth
 * Uses consistent query key: ['/api/usage-stats', pageId]
 */
export function useUsageStats(pageIdentifier?: string) {
  const currentPageId = pageIdentifier || getCurrentPageIdentifier();
  
  console.log('🔧 useUsageStats Debug:', {
    pageIdentifier: currentPageId,
    queryKey: ['/api/usage-stats', currentPageId]
  });
  
  return useQuery<UsageStats>({
    queryKey: ['/api/usage-stats', currentPageId],
    enabled: false, // Disable automatic fetching to improve performance
    refetchInterval: false, // Stop polling every 10 seconds
    staleTime: Infinity, // Cache indefinitely since not actively used
  });
}