export interface IMarketCoin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: Date
  atl: number
  atl_change_percentage: number
  atl_date: Date
  roi: null
  last_updated: Date
  sparkline_in_7d: {
    price: number[]
  }
}

export interface IFormattedMarketCoin
  extends Omit<IMarketCoin, 'sparkline_in_7d'> {
  sparkline_in_7d: {
    price: {
      x: number
      y: number
    }[]
  }
}

export interface IMarketChart {
  prices: number[][]
  market_caps: number[][]
  total_volumes: number[][]
}

export interface ICoinDetails {
  name: string
  symbol: string
  image: {
    thumb: string
  }
  market_data: {
    price_change_24h: number
    price_change_percentage_24h: number
    price_change_percentage_7d: number
    price_change_percentage_14d: number
    price_change_percentage_30d: number
    price_change_percentage_60d: number
    price_change_percentage_200d: number
    price_change_percentage_1y: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    current_price: { usd: number }
    high_24h: { usd: number }
    low_24h: { usd: number }
  }
}
