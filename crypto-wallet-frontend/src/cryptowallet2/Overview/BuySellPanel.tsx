import React, { useState } from 'react';

const coins = ['Bitcoin BTC', 'Ethereum ETH', 'Dogecoin DOGE'];
const currencies = ['USD', 'EUR', 'GBP'];

const BuySellPanel: React.FC = () => {
  const [coin, setCoin] = useState(coins[1]);
  const [amount, setAmount] = useState(1342);
  const [mode, setMode] = useState<'Buy' | 'Sell' | 'Exchange'>('Buy');

  return (
    <div className="bg-gray-800 p-6 rounded-lg w-2/3">
      <div className="flex space-x-4 mb-4">
        {(['Buy','Sell','Exchange'] as const).map((m) => (
          <button
            key={m}
            className={`px-4 py-2 rounded ${mode === m ? 'bg-white text-gray-900' : 'bg-gray-700'}`}
            onClick={() => setMode(m)}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Coin</label>
          <select
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
            className="w-full bg-gray-700 p-2 rounded"
          >
            {coins.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Amount</label>
          <div className="flex">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-gray-700 p-2 rounded-l"
            />
            <select
              value={currencies[0]}
              className="bg-gray-700 p-2 rounded-r"
            >
              {currencies.map((cur) => <option key={cur}>{cur}</option>)}
            </select>
          </div>
        </div>
        <button className="w-full bg-indigo-600 py-3 rounded text-white font-semibold">
          {mode} {coin.split(' ')[0]}
        </button>
      </div>
    </div>
  );
};

export default BuySellPanel