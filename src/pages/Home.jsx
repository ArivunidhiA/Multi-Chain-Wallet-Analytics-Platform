import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkGradientBg } from '../components/ui/elegant-dark-pattern';

const Home = () => {
  const navigate = useNavigate();

  return (
    <DarkGradientBg>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            Multi-Chain Wallet Analytics
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Track your portfolio across Ethereum, Polygon, Arbitrum, Base, and Optimism in real-time.
            Sub-2 second response times powered by advanced caching and concurrent RPC calls.
          </p>
          <button
            onClick={() => navigate('/demo')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span className="glow-icon">▶️</span>
              <span>Watch Live Demo</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>


        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-md p-6 glow-card group animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl mb-4 glow-icon animate-float">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-indigo-300">Fast Response</h3>
            <p className="text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
              Lightning-fast portfolio analysis with intelligent caching and concurrent blockchain queries
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-md p-6 glow-card group animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl mb-4 glow-icon animate-float">🔗</div>
            <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-indigo-300">5+ Chains</h3>
            <p className="text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
              Unified view across Ethereum, Polygon, Arbitrum, Base, and Optimism networks
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-md p-6 glow-card group animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl mb-4 glow-icon animate-float">📊</div>
            <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-indigo-300">Real-time Data</h3>
            <p className="text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
              Live balance updates, transaction history, and gas analytics with instant USD conversion
            </p>
          </div>
        </div>
      </div>
    </DarkGradientBg>
  );
};

export default Home;

