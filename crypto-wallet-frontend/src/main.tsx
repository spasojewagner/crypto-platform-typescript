// index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

// 1. Dodaj defaultOptions kod inicijalizacije QueryClient-a:
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Ne refetch-uj na window focus
      refetchOnWindowFocus: false,
      // Ne retry-uj pri grešci
      retry: false,
      // Podaci ostaju "fresh" 60s pre nego što se ponovo probaju povući
      staleTime: 60_000,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        toastOptions={{
          className: 'bg-main-dark text-white',
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>,
)
