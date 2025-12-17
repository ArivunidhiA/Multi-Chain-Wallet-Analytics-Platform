import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkGradientBg } from '../components/ui/elegant-dark-pattern';
import DemoTimeline from '../components/DemoTimeline';
import PortfolioCard from '../components/PortfolioCard';
import ChainBreakdown from '../components/ChainBreakdown';
import TransactionTable from '../components/TransactionTable';
import PortfolioDashboard from '../components/PortfolioDashboard';
import { analyzeWallet, getTransactions, getAnalytics } from '../services/api';

const DEMO_WALLET = '0x742d35Cc6634C0532925a3b844Bc9e7595f89Ac';

const DEMO_STAGES = [
  {
    id: 1,
    time: 0,
    title: 'Wallet Address Entered',
    description: `Analyzing wallet: ${DEMO_WALLET}`,
    status: 'complete'
  },
  {
    id: 2,
    time: 2,
    title: 'Scanning Ethereum',
    description: 'Querying Ethereum mainnet RPC...',
    status: 'loading',
    data: { balance: 2.45, txCount: 127 }
  },
  {
    id: 3,
    time: 4,
    title: 'Scanning Polygon',
    description: 'Querying Polygon RPC endpoint...',
    status: 'loading',
    data: { balance: 150.2, txCount: 89 }
  },
  {
    id: 4,
    time: 6,
    title: 'Scanning Arbitrum',
    description: 'Querying Arbitrum One RPC...',
    status: 'loading',
    data: { balance: 0.85, txCount: 156 }
  },
  {
    id: 5,
    time: 8,
    title: 'Scanning Base',
    description: 'Querying Base network RPC...',
    status: 'loading',
    data: { balance: 1.2, txCount: 203 }
  },
  {
    id: 6,
    time: 10,
    title: 'Scanning Optimism',
    description: 'Querying Optimism RPC endpoint...',
    status: 'loading',
    data: { balance: 0.65, txCount: 94 }
  },
  {
    id: 7,
    time: 12,
    title: 'Calculating Portfolio Value',
    description: 'Aggregating balances and fetching USD prices...',
    status: 'loading'
  },
  {
    id: 8,
    time: 14,
    title: 'Analysis Complete',
    description: 'Portfolio dashboard ready',
    status: 'complete'
  }
];

const CHAINS = [
  { name: 'Ethereum', balance: 2.45, symbol: 'ETH', price: 2280.5, txCount: 127, logo: '⟠', usdValue: 5587.23 },
  { name: 'Polygon', balance: 150.2, symbol: 'MATIC', price: 0.92, txCount: 89, logo: '⬡', usdValue: 138.18 },
  { name: 'Arbitrum', balance: 0.85, symbol: 'ETH', price: 2280.5, txCount: 156, logo: '🔷', usdValue: 1938.43 },
  { name: 'Base', balance: 1.2, symbol: 'ETH', price: 2280.5, txCount: 203, logo: '🔵', usdValue: 2736.6 },
  { name: 'Optimism', balance: 0.65, symbol: 'ETH', price: 2280.5, txCount: 94, logo: '🔴', usdValue: 1482.33 }
];

const TRANSACTIONS = [
  { hash: '0xabc123def4567890123456789012345678901234567890123456789012345678', chain: 'Ethereum', type: 'receive', value: 0.5, gasCost: 0.0023, timestamp: '2024-12-15T14:30:00Z' },
  { hash: '0xdef456abc1237890123456789012345678901234567890123456789012345678', chain: 'Polygon', type: 'send', value: 0.25, gasCost: 0.0001, timestamp: '2024-12-15T12:15:00Z' },
  { hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', chain: 'Arbitrum', type: 'receive', value: 1.2, gasCost: 0.0015, timestamp: '2024-12-14T18:45:00Z' },
  { hash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba', chain: 'Base', type: 'send', value: 0.75, gasCost: 0.0008, timestamp: '2024-12-14T10:20:00Z' },
  { hash: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210', chain: 'Optimism', type: 'receive', value: 0.3, gasCost: 0.0012, timestamp: '2024-12-13T16:30:00Z' },
  { hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890', chain: 'Ethereum', type: 'send', value: 0.15, gasCost: 0.003, timestamp: '2024-12-13T08:15:00Z' },
  { hash: '0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234', chain: 'Polygon', type: 'receive', value: 2.5, gasCost: 0.0002, timestamp: '2024-12-12T20:00:00Z' },
  { hash: '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef', chain: 'Arbitrum', type: 'send', value: 0.4, gasCost: 0.001, timestamp: '2024-12-12T14:30:00Z' },
  { hash: '0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab', chain: 'Base', type: 'receive', value: 0.9, gasCost: 0.0009, timestamp: '2024-12-11T22:45:00Z' },
  { hash: '0x3456789012bcdef3456789012bcdef3456789012bcdef3456789012bcdef3456', chain: 'Optimism', type: 'send', value: 0.2, gasCost: 0.0011, timestamp: '2024-12-11T11:20:00Z' }
];

const Demo = () => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [walletData, setWalletData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiResponseTime, setApiResponseTime] = useState(null);

  // Fetch data when reaching stage 7 (calculating portfolio)
  useEffect(() => {
    if (currentStage === 7 && !loading && !walletData) {
      setLoading(true);
      const startTime = Date.now();
      
      // Fetch all data concurrently
      Promise.all([
        analyzeWallet(DEMO_WALLET),
        getTransactions(),
        getAnalytics()
      ]).then(([wallet, txs, analyticsData]) => {
        const responseTime = Date.now() - startTime;
        setApiResponseTime(responseTime);
        setWalletData(wallet);
        setTransactions(txs.transactions || []);
        setAnalytics(analyticsData);
        setLoading(false);
        console.log(`✅ API Response Time: ${responseTime}ms`);
      }).catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
        // Fallback to mock data on error
        setWalletData({ chains: CHAINS, totalValue: CHAINS.reduce((sum, c) => sum + c.usdValue, 0) });
        setTransactions(TRANSACTIONS);
        setAnalytics({
          totalGasSpent: 0.2345,
          avgTxValue: 1.87,
          mostActiveChain: 'Base',
          gasEfficiency: { avgGasCost: 0.0032 }
        });
      });
    }
  }, [currentStage, loading, walletData]);

  useEffect(() => {
    if (showDashboard) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentStage((prev) => {
          if (prev < DEMO_STAGES.length) {
            return prev + 1;
          } else {
            setShowDashboard(true);
            return prev;
          }
        });
        setElapsedTime((prev) => prev + 2);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, showDashboard]);

  const handleRestart = () => {
    setCurrentStage(1);
    setShowDashboard(false);
    setIsPaused(false);
    setElapsedTime(0);
    setWalletData(null);
    setTransactions([]);
    setAnalytics(null);
    setApiResponseTime(null);
  };

  // Use API data if available, otherwise fallback to mock data
  const chains = walletData?.chains || CHAINS;
  const totalValue = walletData?.totalValue || chains.reduce((sum, chain) => sum + chain.usdValue, 0);
  const totalTxCount = chains.reduce((sum, chain) => sum + chain.txCount, 0);
  const totalGasSpent = analytics?.totalGasSpent || 0.2345;
  const finalAnalytics = analytics || {
    totalGasSpent: 0.2345,
    avgTxValue: 1.87,
    mostActiveChain: 'Base',
    totalTransactions: 669,
    portfolioGrowth: 12.5,
    activeDays: 45,
    largestTransaction: {
      value: 4.85,
      chain: 'Ethereum',
      timestamp: '2024-12-10T08:15:00Z'
    },
    gasEfficiency: {
      mostEfficient: 'Arbitrum',
      avgGasCost: 0.0032
    }
  };

  if (showDashboard) {
    return (
      <DarkGradientBg>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Portfolio Dashboard</h1>
            <div className="space-x-3">
            <button
              onClick={handleRestart}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50"
            >
              <span className="flex items-center space-x-2">
                <span className="glow-icon">🔄</span>
                <span>Restart Demo</span>
              </span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              ← Back Home
            </button>
            </div>
          </div>

          {/* API Response Time Display */}
          {apiResponseTime && (
            <div className="mb-8 animate-fade-in">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-300 mb-1">API Response Time</div>
                <div className={`text-2xl font-bold ${apiResponseTime < 2000 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {apiResponseTime}ms
                </div>
                {apiResponseTime < 2000 && (
                  <div className="text-xs text-green-400 mt-1">✓ Sub-2s achieved</div>
                )}
              </div>
            </div>
          )}

          {/* Portfolio Overview Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <PortfolioCard
              icon="💰"
              title="Total Portfolio Value"
              value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            />
            <PortfolioCard
              icon="🔗"
              title="Active Chains"
              value="5"
              subtitle="All networks"
            />
            <PortfolioCard
              icon="📝"
              title="Total Transactions"
              value={totalTxCount.toLocaleString()}
            />
            <PortfolioCard
              icon="⛽"
              title="Total Gas Spent"
              value={`${totalGasSpent.toFixed(4)} ETH`}
            />
          </div>

          {/* Interactive Dashboard */}
          <div className="mb-8">
            <PortfolioDashboard chains={chains} transactions={transactions} analytics={finalAnalytics} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <ChainBreakdown chains={chains} totalValue={totalValue} />
            <TransactionTable transactions={transactions} />
          </div>

          {/* Technical Implementation Section */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-md p-6 mb-8 glow-card animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              <span className="glow-icon text-3xl">⚙️</span>
              <h2 className="text-2xl font-bold text-white">Technical Implementation</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <span className="glow-icon">🏗️</span>
                  <span>Backend Architecture</span>
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start group transition-all duration-300 hover:text-white">
                    <span className="text-indigo-400 mr-2 glow-icon">•</span>
                    <span><strong>Python FastAPI:</strong> High-performance async API server</span>
                  </li>
                  <li className="flex items-start group transition-all duration-300 hover:text-white">
                    <span className="text-indigo-400 mr-2 glow-icon">•</span>
                    <span><strong>PostgreSQL:</strong> Transaction indexing and historical data storage</span>
                  </li>
                  <li className="flex items-start group transition-all duration-300 hover:text-white">
                    <span className="text-indigo-400 mr-2 glow-icon">•</span>
                    <span><strong className="text-indigo-300">In-Memory Caching:</strong> Sub-2s response times via intelligent cache layers</span>
                  </li>
                  <li className="flex items-start group transition-all duration-300 hover:text-white">
                    <span className="text-indigo-400 mr-2 glow-icon">•</span>
                    <span><strong className="text-purple-300">Concurrent API Calls:</strong> Parallel requests to Netlify Functions</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <span className="glow-icon">✨</span>
                  <span>Key Features</span>
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start group transition-all duration-300 hover:text-white">
                    <span className="text-indigo-400 mr-2 glow-icon">•</span>
                    <span><strong>Real-time Aggregation:</strong> Multi-chain balance and transaction consolidation</span>
                  </li>
                  <li className="flex items-start group transition-all duration-300 hover:text-white">
                    <span className="text-indigo-400 mr-2 glow-icon">•</span>
                    <span><strong>Multi-chain Indexing:</strong> Unified transaction history across 5+ networks</span>
                  </li>
                  <li className="flex items-start group transition-all duration-300 hover:text-white">
                    <span className="text-indigo-400 mr-2 glow-icon">•</span>
                    <span><strong>USD Conversion:</strong> Live price feeds with automatic currency conversion</span>
                  </li>
                  <li className="flex items-start group transition-all duration-300 hover:text-white">
                    <span className="text-indigo-400 mr-2 glow-icon">•</span>
                    <span><strong>Gas Analytics:</strong> Transaction cost tracking and optimization insights</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DarkGradientBg>
    );
  }

  return (
    <DarkGradientBg>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Live Demo</h1>
          <div className="space-x-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50"
            >
              <span className="flex items-center space-x-2">
                <span className="glow-icon">{isPaused ? '▶️' : '⏸️'}</span>
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </span>
            </button>
            <button
              onClick={handleRestart}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <span className="glow-icon">🔄</span>
                <span>Restart</span>
              </span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              ← Home
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg p-8 max-w-3xl mx-auto glow-card animate-fade-in">
          <DemoTimeline stages={DEMO_STAGES} currentStage={currentStage} />
        </div>
      </div>
    </DarkGradientBg>
  );
};

export default Demo;

