import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

const PortfolioDashboard = ({ chains, transactions, analytics }) => {
  // Prepare data for charts
  const chainValueData = chains.map(chain => ({
    name: chain.name,
    value: chain.usdValue,
    balance: chain.balance,
    txCount: chain.txCount
  }));

  const chainTxData = chains.map(chain => ({
    name: chain.name,
    transactions: chain.txCount
  }));

  // Transaction volume over time (mock data for last 7 days)
  const volumeData = [
    { date: 'Day 1', volume: 2.5, count: 12 },
    { date: 'Day 2', volume: 3.2, count: 18 },
    { date: 'Day 3', volume: 1.8, count: 9 },
    { date: 'Day 4', volume: 4.1, count: 22 },
    { date: 'Day 5', volume: 2.9, count: 15 },
    { date: 'Day 6', volume: 3.7, count: 20 },
    { date: 'Day 7', volume: 4.5, count: 25 }
  ];

  // Gas cost by chain
  const gasData = chains.map(chain => ({
    name: chain.name,
    gas: (chain.txCount * 0.003).toFixed(4)
  }));

  const totalValue = chains.reduce((sum, chain) => sum + chain.usdValue, 0);

  return (
    <div className="space-y-6">
      {/* Portfolio Value Distribution - Pie Chart */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 glow-card animate-fade-in">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <span className="glow-icon">📊</span>
          <span>Portfolio Value Distribution</span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chainValueData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chainValueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Value']}
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Transaction Volume Over Time - Line Chart */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 glow-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <span className="glow-icon">📈</span>
            <span>Transaction Volume (7 Days)</span>
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ color: '#fff' }} />
              <Line type="monotone" dataKey="volume" stroke="#6366f1" strokeWidth={2} name="Volume (ETH)" />
              <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} name="Count" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Count by Chain - Bar Chart */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 glow-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <span className="glow-icon">📊</span>
            <span>Transactions by Chain</span>
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chainTxData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', color: '#fff' }}
              />
              <Bar dataKey="transactions" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chain Value Comparison - Bar Chart */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 glow-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <span className="glow-icon">💎</span>
          <span>Portfolio Value by Chain</span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chainValueData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis type="number" stroke="#9ca3af" />
            <YAxis dataKey="name" type="category" stroke="#9ca3af" width={100} />
            <Tooltip
              formatter={(value) => [`$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Value']}
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', color: '#fff' }}
            />
            <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]}>
              {chainValueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
          <div className="text-sm text-gray-300 mb-1">Total Value</div>
          <div className="text-2xl font-bold text-white">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
          <div className="text-sm text-gray-300 mb-1">Active Chains</div>
          <div className="text-2xl font-bold text-white">{chains.length}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
          <div className="text-sm text-gray-300 mb-1">Total Transactions</div>
          <div className="text-2xl font-bold text-white">
            {chains.reduce((sum, chain) => sum + chain.txCount, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
          <div className="text-sm text-gray-300 mb-1">Avg Gas Cost</div>
          <div className="text-2xl font-bold text-white">
            {analytics?.gasEfficiency?.avgGasCost || '0.0032'} ETH
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;

