import React from 'react';

const stats = [
  { label: 'Total Assets', value: '$1,234', highlight: true },
  { label: 'Total Deposits', value: '$2,556' },
  { label: 'APY', value: '+8.6%' },
];

const StatsCards: React.FC = () => (
  <div className="flex space-x-4">
    {stats.map((s) => (
      <div key={s.label} className={`${s.highlight ? 'bg-green-400 text-gray-900' : 'bg-gray-800'} p-4 rounded-lg flex-1`}>        
        <div className="text-sm">{s.label}</div>
        <div className="text-2xl font-semibold mt-1">{s.value}</div>
      </div>
    ))}
  </div>
);

export default StatsCards;