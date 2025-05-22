import React from 'react';

interface BalanceCardProps { balance: number; change: number; }

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, change }) => (
  <div className="bg-gray-800 p-6 rounded-lg w-1/3">
    <div className="text-sm">Total Balance</div>
    <div className="text-3xl font-semibold mt-2">${balance.toLocaleString()}</div>
    <div className={`mt-2 text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>      {change >= 0 ? '+' : ''}{change.toFixed(2)}%
    </div>
  </div>
);

export default BalanceCard;
