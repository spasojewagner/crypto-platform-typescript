// src/queries/useCoinDetails.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { fetchCoinDetails } from '../../http'
import { ICoinDetails } from '../../interfaces'

type Params = { id: string }
type Data = ICoinDetails
type Err = Error

type MyOptions = Omit<UseQueryOptions<Data, Err>, 'queryKey' | 'queryFn'>

export default function useCoinDetails(
  params: Params,
  options?: MyOptions
) {
  return useQuery<Data, Err>({
    queryKey: ['coinDetails', params.id],
    queryFn: () => fetchCoinDetails(params.id),
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}
