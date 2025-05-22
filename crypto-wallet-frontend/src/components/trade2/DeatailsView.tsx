import { useEffect, useState, useRef } from 'react'
import MarketChart from './MarketChart'
import PriceChange24h from './PriceChange24h'
import useMarketChart from '../queries/useMarketChart'
import useCoinDetails from '../queries/useCoinDetails'
import { useGlobalStore } from '../../store/useGlobalStore'
import { useBinanceWebSocket, coinToBinanceSymbol } from '../../http/binanceSocket'

type Props = {}

const daysFilters = [7, 30, 365, 'realtime'] as const
type DaysType = (typeof daysFilters)[number]

function DetailsView({}: Props) {
  const coinId = useGlobalStore((state) => state.detailsId)
  const realtimeData = useGlobalStore((state) => state.realtimeData)
  
  const [days, setDays] = useState<DaysType>(365)
  const [realtimeSeries, setRealtimeSeries] = useState<number[][]>([])
  const [realtimeChange24h, setRealtimeChange24h] = useState<number | null>(null)
  
  // Reference to store the previous price
  const previousPriceRef = useRef<number | null>(null)
  // Reference to store the price from 24h ago
  const price24hAgoRef = useRef<number | null>(null)

  // 1) Uvek fetch-uj chartData, ali bez refetch-a na mount/focus:
  const { data: chartData } = useMarketChart(
    { id: coinId, days: days === 'realtime' ? 1 : days },
    {
      // onemogući ponovni REST poziv kada se mount-uje ili fokusira
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 60_000,
      retry: false,
    }
  )

  // 2) Uvek fetch-uj osnovne detalje coina, ali bez refetch-a:
  const { data: details } = useCoinDetails(
    { id: coinId },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 60_000,
      retry: false,
    }
  )

  // Koristi Binance WebSocket za realtime podatke
  const binancePrice = useBinanceWebSocket(coinId)

  // Get the current real-time price
  const currentPrice =
    days === 'realtime' && (binancePrice || realtimeData[coinId]) !== undefined
      ? binancePrice || realtimeData[coinId]
      : details?.market_data.current_price.usd
  
  const high24h = details?.market_data.high_24h.usd
  const low24h = details?.market_data.low_24h.usd

  // Reference the static 24h change from the API
  const staticChangeIn24 = details?.market_data.price_change_percentage_24h

  // Use real-time or static 24h change based on selected view
  const changeIn24 = days === 'realtime' && realtimeChange24h !== null 
    ? realtimeChange24h 
    : staticChangeIn24

  // Initialize the 24h ago price from chart data
  useEffect(() => {
    if (chartData && chartData.prices.length > 0) {
      // Get the price from 24h ago from the chart data
      const pricesArray = chartData.prices;
      const now = Date.now();
      const target = now - 24 * 60 * 60 * 1000; // 24h ago
      
      // Find the closest price point to 24h ago
      let closest = pricesArray[0];
      let closestDiff = Math.abs(closest[0] - target);
      
      for (let i = 1; i < pricesArray.length; i++) {
        const diff = Math.abs(pricesArray[i][0] - target);
        if (diff < closestDiff) {
          closest = pricesArray[i];
          closestDiff = diff;
        }
      }
      
      price24hAgoRef.current = closest[1];
      
      // Initialize previous price
      if (previousPriceRef.current === null && currentPrice) {
        previousPriceRef.current = currentPrice;
      }
    }
  }, [chartData, currentPrice]);

  // Pretplata na Binance WebSocket za realtime podatke
  useEffect(() => {
    if (days !== 'realtime') return

    // Ako imamo nove podatke sa Binance, dodaj ih u seriju
    if (binancePrice) {
      // Update the realtime series with new price
      setRealtimeSeries((prev) => {
        const next = [...prev, [Date.now(), binancePrice]]
        return next.length > 100 ? next.slice(-100) : next
      })
      
      // Calculate real-time 24h change percentage
      if (price24hAgoRef.current && binancePrice) {
        const change = ((binancePrice - price24hAgoRef.current) / price24hAgoRef.current) * 100;
        setRealtimeChange24h(change);
      }
      
      // Update previous price reference
      previousPriceRef.current = binancePrice;
    }

    // Ako nemamo još nijednu tačku, napuni seriju iz REST podataka:
    if (chartData && realtimeSeries.length === 0) {
      setRealtimeSeries(chartData.prices.slice(-20))
    }
  }, [coinId, days, chartData, binancePrice, realtimeSeries.length])

  return (
    <>
      {/* Filteri */}
      <div className="flex gap-5 items-center justify-between mb-4">
        <h1 className="text-xl font-bold bg-indigo-500 p-1 rounded-2xl text-white">
          {coinId.toUpperCase()} 
          {days === 'realtime' && coinToBinanceSymbol[coinId] && (
            <span className="text-xs ml-2">({coinToBinanceSymbol[coinId].toUpperCase()})</span>
          )}
        </h1>
        <div className="flex gap-2">
          {daysFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setDays(filter)
                // resetuj live seriju kad prelaziš
                setRealtimeSeries([])
                // Reset real-time 24h change when switching views
                setRealtimeChange24h(null)
              }}
              className={`px-3 py-1 rounded border ${
                days === filter
                  ? 'bg-indigo-500 text-white'
                  : 'text-indigo-300 hover:bg-indigo-700 hover:text-white'
              }`}
            >
              {filter === 'realtime' ? 'Live' : `${filter}d`}
            </button>
          ))}
        </div>
      </div>

      {/* Graf */}
      <div className="mx-auto w-full min-h-[24rem] mb-6">
        {days === 'realtime' ? (
          realtimeSeries.length > 0 && <MarketChart series={realtimeSeries} />
        ) : (
          chartData && <MarketChart series={chartData.prices} />
        )}
      </div>

      {/* Detalji cene */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4">
        <div className="bg-indigo-900 bg-opacity-10 w-full md:w-52 p-4 rounded-2xl text-indigo-300">
          <div className="opacity-70">Current Price</div>
          <div className="flex justify-between">
            <div className="text-white">${currentPrice?.toFixed(2)}</div>
            {changeIn24 !== undefined && (
              <PriceChange24h changePrice={changeIn24} />
            )}
          </div>
        </div>
        <div className="bg-indigo-900 bg-opacity-10 w-full md:w-52 p-4 rounded-2xl text-indigo-300">
          <div className="opacity-70">Low 24hr</div>
          <div className="text-white">${low24h?.toFixed(2)}</div>
        </div>
        <div className="bg-indigo-900 bg-opacity-10 w-full md:w-52 p-4 rounded-2xl text-indigo-300">
          <div className="opacity-70">High 24hr</div>
          <div className="text-white">${high24h?.toFixed(2)}</div>
        </div>
      </div>
    </>
  )
}

export default DetailsView