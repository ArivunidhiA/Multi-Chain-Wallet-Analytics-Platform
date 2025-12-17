import React from 'react';

const PortfolioCard = ({ icon, title, value, subtitle }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-md p-6 glow-card group">
      <div className="flex items-center justify-between mb-2">
        <div className="text-3xl glow-icon animate-float">{icon}</div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white transition-all duration-300 group-hover:scale-105">{value}</div>
          {subtitle && <div className="text-sm text-gray-300 mt-1 transition-opacity duration-300">{subtitle}</div>}
        </div>
      </div>
      <div className="text-sm font-medium text-gray-300 transition-colors duration-300 group-hover:text-white">{title}</div>
    </div>
  );
};

export default PortfolioCard;

