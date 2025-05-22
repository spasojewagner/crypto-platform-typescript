import { useQuery } from '@tanstack/react-query'
import { IFormattedMarketCoin } from '../../interfaces'
import { fetchMarketCurrencies } from '../../http/index'

function useMarketCoins() {
  const result = useQuery<IFormattedMarketCoin[]>({
    queryFn: fetchMarketCurrencies,
    queryKey: ['marketCoins'],
  })
  return result
}

export default useMarketCoins
