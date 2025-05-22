import { create } from 'zustand'

type State = {
  detailsId: string
  setDetailsId: (id: string) => void
  realtimeData: Record<string, number>
  updateRealtimePrice: (coinId: string, price: number) => void
}

export const useGlobalStore = create<State>()((set) => ({
  detailsId: 'bitcoin',
  setDetailsId: (id) => set(() => ({ detailsId: id })),
  realtimeData: {},
  updateRealtimePrice: (coinId, price) =>
    set((state) => ({
      realtimeData: {
        ...state.realtimeData,
        [coinId]: price,
      },
    })),
}))
