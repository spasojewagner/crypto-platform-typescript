import { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import moment from 'moment'

interface USDTChartProps {
  className?: string
}

interface ChartData {
  date: string
  price: number
  timestamp: number
}

const USDTChart: React.FC<USDTChartProps> = ({ className = '' }) => {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [priceChange, setPriceChange] = useState<number>(0)
  const [changeColor, setChangeColor] = useState<string>('#8884d8')

  useEffect(() => {
    const fetchUSDTData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Koristeći CoinGecko proxy sa backend-a
        const response = await axios.get('http://localhost:4000/api/coins/tether/market_chart', {
          params: {
            vs_currency: 'usd',
            days: 7,
            interval: 'daily'
          }
        })
        
        // Formatiranje podataka za grafikon
        const formattedData = response.data.prices.map((item: [number, number]) => ({
          timestamp: item[0],
          date: moment(item[0]).format('DD MMM'),
          price: parseFloat(item[1].toFixed(4))
        }))
        
        setChartData(formattedData)
        
        // Izračunaj promenu cene u poslednjih 7 dana
        if (formattedData.length >= 2) {
          const oldestPrice = formattedData[0].price
          const newestPrice = formattedData[formattedData.length - 1].price
          const change = ((newestPrice - oldestPrice) / oldestPrice) * 100
          setPriceChange(change)
          setChangeColor(change >= 0 ? '#10b981' : '#ef4444')
        }
        
        setIsLoading(false)
      } catch (err) {
        console.error('Greška pri dohvatanju USDT podataka:', err)
        setError('Nije moguće dohvatiti podatke o USDT. Pokušajte ponovo kasnije.')
        setIsLoading(false)
      }
    }
    
    fetchUSDTData()
    
    // Osvežavanje podataka svakih 5 minuta
    const intervalId = setInterval(fetchUSDTData, 5 * 60 * 1000)
    
    return () => clearInterval(intervalId)
  }, [])
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-indigo-900 p-3 rounded-md shadow-lg">
          <p className="text-white font-bold">{payload[0].payload.date}</p>
          <p className="text-indigo-200">
            ${payload[0].value.toFixed(4)}
          </p>
        </div>
      )
    }
    return null
  }
  
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-red-500 text-center">{error}</div>
      </div>
    )
  }
  
  return (
    <div className={`mt-5 mb-2 p-4 rounded-2xl ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">USDT/USD</h2>
          <p className="text-indigo-300">Last 7 days</p>
        </div>
        <div className={`text-lg font-semibold`} style={{ color: changeColor }}>
          {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#8884d8' }}
              tickMargin={10}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis 
              domain={['dataMin - 0.001', 'dataMax + 0.001']}
              tick={{ fill: '#8884d8' }}
              tickMargin={10}
              axisLine={{ stroke: '#374151' }}
              tickFormatter={(value) => `$${value.toFixed(3)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={changeColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: changeColor, stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between mt-4 text-sm text-indigo-300">
        <div>Updated: {moment().format('HH:mm:ss')}</div>
      </div>
    </div>
  )
}

export default USDTChart