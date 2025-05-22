import React, { useState } from 'react';
import { LuActivity } from "react-icons/lu";

const tabs = [
  { label: 'Crypto', value: 'crypto' },
  { label: 'Cash', value: 'cash' },
];

const WalletDashBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('crypto');

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My assets</h2>
        {/* Optional settings icon */}
        <LuActivity  className="w-6 h-6 text-gray-400 cursor-pointer" />
      </div>

      <div className="text-4xl font-bold mb-2">$0.00</div>

      <div className="border-b border-gray-700 mb-4">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={
                activeTab === tab.value
                  ? 'border-blue-500 text-blue-400 whitespace-nowrap py-4 px-1 border-b-2 font-medium'
                  : 'border-transparent text-gray-400 hover:text-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium'
              }
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="text-4xl font-bold mb-6">$0.00</div>

      <table className="min-w-full table-auto mb-8">
        <thead>
          <tr className="text-left text-gray-400 uppercase text-xs">
            <th className="pb-2">Name</th>
            <th className="pb-2">Balance</th>
            <th className="pb-2">Current price</th>
          </tr>
        </thead>
        <tbody>
          {/* Example empty row */}
          <tr>
            <td className="py-4 text-gray-500" colSpan={3}>
              No assets
            </td>
          </tr>
        </tbody>
      </table>

      <div className="bg-gray-800 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">Staking</h3>
          <p className="text-sm text-gray-400">Earn up to 14.24% APY</p>
          <p className="text-xs text-gray-400 mb-3">Buy and stake eligible assets to earn rewards</p>
          <button className="text-blue-400 text-sm font-medium hover:underline">
            Explore assets
          </button>
        </div>
        <div>
          {/* Placeholder icon */}
          <LuActivity  className="w-12 h-12 text-blue-400" />
        </div>
      </div>
    </div>
  );
};

export default WalletDashBoard;
