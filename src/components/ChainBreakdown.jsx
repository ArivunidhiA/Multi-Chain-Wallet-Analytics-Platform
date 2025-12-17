import React from 'react';

const ChainBreakdown = ({ chains, totalValue }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-md p-6 glow-card">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <span className="glow-icon">🔗</span>
        <span>Chain Breakdown</span>
      </h3>
      <div className="space-y-4">
        {chains.map((chain, index) => {
          const percentage = totalValue > 0 ? (chain.usdValue / totalValue) * 100 : 0;
          return (
            <div 
              key={index} 
              className="border-b border-white/10 pb-4 last:border-0 last:pb-0 group hover:bg-white/5 rounded-lg p-2 -m-2 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl glow-icon transition-transform duration-300 group-hover:scale-110">{chain.logo}</div>
                  <div>
                    <div className="font-semibold text-white transition-colors duration-300 group-hover:text-indigo-300">{chain.name}</div>
                    <div className="text-sm text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
                      {chain.balance.toFixed(4)} {chain.symbol}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white transition-transform duration-300 group-hover:scale-105">
                    ${chain.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-gray-300">{percentage.toFixed(1)}%</div>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-700 ease-out group-hover:shadow-lg group-hover:shadow-indigo-500/50"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChainBreakdown;

