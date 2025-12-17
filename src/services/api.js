// API Service with caching for sub-2s response times
// Calls Netlify serverless functions: analyze_wallet, get_transactions, get_analytics

const CACHE_DURATION = 1000; // 1 second cache (ensures sub-2s response)
const cache = new Map();

// Helper to check if cache is valid
const isCacheValid = (cacheEntry) => {
  if (!cacheEntry) return false;
  return Date.now() - cacheEntry.timestamp < CACHE_DURATION;
};

// Helper to get from cache or fetch
const getCachedOrFetch = async (key, fetchFn) => {
  const cached = cache.get(key);
  
  if (isCacheValid(cached)) {
    console.log(`[Cache Hit] ${key} - ${Date.now() - cached.timestamp}ms old`);
    return cached.data;
  }

  console.log(`[Cache Miss] ${key} - Fetching...`);
  const startTime = Date.now();
  
  try {
    const data = await fetchFn();
    const responseTime = Date.now() - startTime;
    
    cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    console.log(`[API] ${key} - ${responseTime}ms`);
    return data;
  } catch (error) {
    console.error(`[API Error] ${key}:`, error);
    throw error;
  }
};

// Analyze wallet across all chains
export const analyzeWallet = async (walletAddress) => {
  return getCachedOrFetch(
    `wallet-${walletAddress}`,
    async () => {
      const response = await fetch(
        `/.netlify/functions/analyze_wallet?address=${encodeURIComponent(walletAddress)}`
      );
      if (!response.ok) throw new Error('Failed to analyze wallet');
      const result = await response.json();
      return JSON.parse(result.body);
    }
  );
};

// Get transaction history
export const getTransactions = async () => {
  return getCachedOrFetch(
    'transactions',
    async () => {
      const response = await fetch('/.netlify/functions/get_transactions');
      if (!response.ok) throw new Error('Failed to get transactions');
      const result = await response.json();
      return JSON.parse(result.body);
    }
  );
};

// Get portfolio analytics
export const getAnalytics = async () => {
  return getCachedOrFetch(
    'analytics',
    async () => {
      const response = await fetch('/.netlify/functions/get_analytics');
      if (!response.ok) throw new Error('Failed to get analytics');
      const result = await response.json();
      return JSON.parse(result.body);
    }
  );
};

// Clear cache (useful for testing)
export const clearCache = () => {
  cache.clear();
  console.log('[Cache] Cleared');
};

