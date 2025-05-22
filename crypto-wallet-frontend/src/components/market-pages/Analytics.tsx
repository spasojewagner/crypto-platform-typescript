import React, { useEffect } from 'react';
import { FiBarChart2, FiMoreVertical } from 'react-icons/fi';
import {create} from 'zustand';
import Sidebar2 from '../../cryptowallet2/SideBar2';

// Define the shape of our crypto data
interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

// Zustand store state and actions
type CryptoState = {
  data: Cryptocurrency[];
  isLoading: boolean;
  error: string | null;
  fetchCryptos: () => Promise<void>;
};

const useCryptoStore = create<CryptoState>((set) => ({
  data: [],
  isLoading: false,
  error: null,
  fetchCryptos: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
      );
      if (!res.ok) throw new Error('Network response was not ok');
      const items = await res.json();
      const cryptos: Cryptocurrency[] = items.map((item: any) => ({
        id: item.id,
        name: item.name,
        symbol: item.symbol.toUpperCase(),
        logoUrl: item.image,
        price: item.current_price,
        change24h: item.price_change_percentage_24h,
        volume24h: item.total_volume,
        marketCap: item.market_cap,
      }));
      set({ data: cryptos, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

export const Analytics: React.FC = () => {
  const { data, isLoading, error, fetchCryptos } = useCryptoStore();

  useEffect(() => {
    if (data.length === 0 && !isLoading) {
      fetchCryptos();
    }
  }, [data.length, isLoading, fetchCryptos]);

  if (isLoading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="overflow-x-auto bg-gray-900 text-white rounded-lg shadow-lg p-4 flex">
        <div>
        <Sidebar2/>    
        </div>
        
      <table className="w-1000  divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-right">Price</th>
            <th className="px-4 py-2 text-right">24h</th>
            <th className="px-4 py-2 text-right">Volume (24h)</th>
            <th className="px-4 py-2 text-right">Market Cap</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {data.map((coin) => (
            <tr key={coin.id}>
              <td className="px-4 py-3 flex items-center space-x-2">
                <img src={coin.logoUrl} alt={coin.symbol} className="w-6 h-6" />
                <div>
                  <div className="font-medium">{coin.symbol}</div>
                  <div className="text-sm text-gray-400">{coin.name}</div>
                </div>
              </td>
              <td className="px-4 py-3 text-right font-medium">
                ${coin.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td
                className={`px-4 py-3 text-right font-medium ${
                  coin.change24h >= 0 ? 'text-green-400' : 'text-red-500'
                }`}
              >
                {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-right">
                ${Number(coin.volume24h).toLocaleString('en-US', { notation: 'compact' })}
              </td>
              <td className="px-4 py-3 text-right">
                ${Number(coin.marketCap).toLocaleString('en-US', { notation: 'compact' })}
              </td>
              <td className="px-4 py-3 text-center flex justify-center space-x-2">
                <button title="Chart">
                  <FiBarChart2 size={20} />
                </button>
                <button title="More">
                  <FiMoreVertical size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
