import  { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
const coins = [
  { label: "Tether(USDT)", value: "USDT" },

];

const currencies = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" }
];

type ActionType = "Buy" | "Sell" | "Exchange";

export default function WalletUser() {
  const [action, setAction] = useState<ActionType>("Buy");
  const [selectedCoin, setSelectedCoin] = useState<string>(coins[0].value);
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>(currencies[0].value);

  const total = amount; // Here you might calculate fees or conversion

  return (
    <div className="max-w-sm bg-gray-800 text-white rounded-2xl p-6 space-y-6">
      {/* Balance Header */}
      <div className="space-y-2">
        <p className="text-sm text-gray-400">Total Balance</p>
        <h2 className="text-3xl font-semibold">$15,453.05</h2>
        <div className="inline-flex items-center text-green-400 text-sm font-medium">
        <FaArrowUp size={14} />
          <span>+12.34%</span>
        </div>
      </div>

      {/* Action Tabs */}
      <div className="flex space-x-2 bg-gray-700 rounded-full p-1">
        {(["Buy", "Sell", "Exchange"] as ActionType[]).map((act) => (
          <button
            key={act}
            onClick={() => setAction(act)}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors 
              ${action === act ? "bg-white text-gray-900" : "text-gray-300 hover:bg-gray-600"}`}
          >
            {act}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Coin Selector */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Coin</label>
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="w-full bg-gray-700 text-white text-sm rounded-lg p-2"
          >
            {coins.map((coin) => (
              <option key={coin.value} value={coin.value}>
                {coin.label}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Amount</label>
          <div className="flex">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="flex-1 bg-gray-700 text-white text-sm rounded-l-lg p-2 focus:outline-none"
              placeholder="0.00"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-700 text-white text-sm rounded-r-lg p-2"
            >
              {currencies.map((cur) => (
                <option key={cur.value} value={cur.value}>
                  {cur.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Total Display */}
        <div className="flex justify-between text-sm text-gray-400">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Action Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl font-medium">
          {action} {coins.find(c => c.value === selectedCoin)?.label.split(" ")[0]}
        </button>
      </div>
    </div>
  );
}
