import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { sessionManager } from "./sessionManager";
import { getCurrentPageIdentifier } from "./pageIdentifier";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const isFormData = data instanceof FormData;
  
  // Add stable session ID and page identifier to all requests
  const sessionId = sessionManager.getSessionId();
  const pageIdentifier = getCurrentPageIdentifier();
  const headers: Record<string, string> = {
    'X-Session-Id': sessionId,
    'X-Page-Identifier': pageIdentifier,
  };
  
  if (data && !isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  // For FormData, also add session ID and page identifier to the form data
  if (isFormData && data instanceof FormData) {
    data.append('sessionId', sessionId); // CRITICAL: Use exact field name as requested
    data.append('pageIdentifier', pageIdentifier);
  }
  
  const res = await fetch(url, {
    method,
    headers,
    body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Add stable session ID and page identifier to query requests
    const sessionId = sessionManager.getSessionId();
    const pageIdentifier = getCurrentPageIdentifier();
    
    // 🚀 PERFORMANCE: Add timeout to prevent long waits for auth checks
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    try {
      const res = await fetch(queryKey.join("/") as string, {
        credentials: "include",
        headers: {
          'X-Session-Id': sessionId,
          'X-Page-Identifier': pageIdentifier,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    } catch (error) {
      clearTimeout(timeoutId);
      // If it's an auth check that times out, return null instead of throwing
      if (unauthorizedBehavior === "returnNull" && (
        (error as Error)?.name === 'AbortError' || 
        (error as Error)?.message?.includes('timeout')
      )) {
        return null;
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 0, // Allow refetching for real-time data
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
