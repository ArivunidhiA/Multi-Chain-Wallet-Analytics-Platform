import React from 'react';

const TransactionTable = ({ transactions }) => {
  const formatHash = (hash) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-md p-6 glow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <span className="glow-icon">📊</span>
          <span>Recent Transactions</span>
        </h3>
        <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-all duration-300 hover:scale-105">
          View all 20 →
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Hash</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Chain</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Type</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">Value</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">Gas</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 10).map((tx, index) => (
              <tr 
                key={index} 
                className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="py-3 px-4 text-sm font-mono text-gray-200 group-hover:text-white transition-colors duration-300">
                  {formatHash(tx.hash)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-200 group-hover:text-white transition-colors duration-300">{tx.chain}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold transition-all duration-300 group-hover:scale-110 ${
                      tx.type === 'receive'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30 group-hover:bg-green-500/30 group-hover:shadow-lg group-hover:shadow-green-500/50'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30 group-hover:bg-blue-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/50'
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-right font-medium text-white group-hover:scale-105 transition-transform duration-300">
                  {tx.value.toFixed(4)} ETH
                </td>
                <td className="py-3 px-4 text-sm text-right text-gray-300 group-hover:text-white transition-colors duration-300">
                  {tx.gasCost.toFixed(6)} ETH
                </td>
                <td className="py-3 px-4 text-sm text-right text-gray-300 group-hover:text-white transition-colors duration-300">
                  {formatDate(tx.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;

