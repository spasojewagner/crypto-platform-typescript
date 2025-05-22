import  { useEffect, useState } from 'react';
import axios from 'axios';
import animatedlogo from '../assets/images/logo3.gif';
// import { useNavigate } from 'react-router-dom';
import ServicesSection from './ServicesSection';
import NewsSection from './news/NewsSection ';
import PlatformIntroduction from './PlatformIntroduction ';

// Типска дефиниција за једну кованицу
interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export default function CryptoDashboard() {
  const [tab, setTab] = useState<'popular' | 'new'>('popular');
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const navigate=useNavigate()

  // Fetch market data
  const fetchCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const vsCurrency = 'usd';
      const order = tab === 'popular' ? 'market_cap_desc' : 'market_cap_asc';
      const perPage = 10;
      const page = 1;
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&order=${order}&per_page=${perPage}&page=${page}&price_change_percentage=24h`;
      const response = await axios.get<Coin[]>(url);
      setCoins(response.data);
    } catch (err: any) {
      setError('Грешка при учитавању података');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [tab]);

  return (
    // ✅ Background wrapper
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Decorative blurs */}
      <div className="absolute top-[-200px] left-[-150px] w-[400px] h-[400px] bg-purple-600 rounded-full opacity-30 filter blur-3xl animate-blob"></div>
      <div className="absolute top-[50%] right-[-200px] w-[500px] h-[500px] bg-pink-600 rounded-full opacity-30 filter blur-2xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-200px] left-[30%] w-[600px] h-[600px] bg-green-500 rounded-full opacity-20 filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className=" p-8 flex">
        {/* Welcome секција */}
        <div className="flex items-center flex-col justify-center-safe">
          <img src={animatedlogo} alt="Logo" className="w-[500px] " />
          <div className="text-white flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-light">
              Send <span className="font-semibold">Crypto</span>
            </h1>
            <h1 className="text-4xl md:text-5xl font-light">
              across the <span className="font-semibold text-gray-400">world</span>
            </h1>
            <p className="text-sm text-gray-300 mt-4">
              Explore the crypto world.
            </p>
            <p className="text-sm text-gray-300 font-semibold">
              Buy and sell cryptocurrencies easily on Crypto Serbia.
            </p>
            <button className=" max-w-2xs bg-blue-600 text-white font-medium text-lg rounded-md hover:bg-blue-700 transition duration-300 mt-5 p-3 w-45">
              Send Now
            </button>
          </div>
        </div>

        {/* Crypto list секција */}
        <div className="bg-gray-800 bg-opacity-60 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-4">
              <button
                className={`pb-2 ${tab === 'popular' ? 'border-b-2 border-yellow-400' : 'text-gray-400'}`}
                onClick={() => setTab('popular')}
              >
                Popular
              </button>
              <button
                className={`pb-2 ${tab === 'new' ? 'border-b-2 border-yellow-400' : 'text-gray-400'}`}
                onClick={() => setTab('new')}
              >
                New Listing
              </button>
            </div>
            <a href="#" className="text-sm text-gray-300 hover:text-white">
              View All {coins.length}+ Coins &rarr;
            </a>
          </div>

          {loading && <div className="text-center">Учитавање...</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}

          {!loading && !error && (
            <ul>
              {coins.map((coin) => (
                <li key={coin.id} className="flex justify-between py-3 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <img src={coin.image} alt={coin.symbol} className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="text-sm font-medium">
                        {coin.symbol.toUpperCase()} {coin.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      ${coin.current_price.toLocaleString()}
                    </div>
                    <div className={`text-xs ${coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        <ServicesSection/>
        <NewsSection/>
        <PlatformIntroduction/>
      </div>
    </div>
  );
}
