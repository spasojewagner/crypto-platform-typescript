// useMarketChart.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { fetchMarketChart } from '../../http'
import { IMarketChart } from '../../interfaces'

type Params = { id: string; days: number }
type Data = IMarketChart
type Err = Error
type MyOptions = Omit<UseQueryOptions<Data, Err>, 'queryKey' | 'queryFn'>

export default function useMarketChart(
  params: Params,
  options?: MyOptions
) {
  return useQuery<Data, Err>({
    queryKey: ['marketChart', params.id, params.days],
    queryFn: () => fetchMarketChart(params.id, params.days),
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...options,
  })
}
