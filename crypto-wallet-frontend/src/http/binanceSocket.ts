// src/utils/binanceSocket.ts
import { useEffect, useRef } from 'react'
import { useGlobalStore } from '../store/useGlobalStore'

// Mapiranje CoinGecko ID-jeva na Binance simbole
export const coinToBinanceSymbol: Record<string, string> = {
  'bitcoin': 'btcusdt',
  'ethereum': 'ethusdt',
  'binancecoin': 'bnbusdt',
  'ripple': 'xrpusdt',
  'cardano': 'adausdt',
  'solana': 'solusdt',
  'dogecoin': 'dogeusdt',
  'polkadot': 'dotusdt',
  'matic-network': 'maticusdt',
  'litecoin': 'ltcusdt',
  // Dodajte više po potrebi
}

// Konfiguracijski parametri
const UPDATE_INTERVAL = 3000; // Minimalno vreme između ažuriranja u ms (3 sekunde)

// Throttle funkcija - ograničava koliko često se nešto izvršava
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let lastValue: any = null;
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    
    // Uvek sačuvaj poslednju vrednost
    lastValue = args;
    
    // Ako je prošlo dovoljno vremena od poslednjeg poziva, odmah izvrši
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    } else if (!timeout) {
      // Inače zakaži izvršavanje za kasnije
      timeout = setTimeout(() => {
        lastCall = Date.now();
        timeout = null;
        if (lastValue) {
          func(...lastValue);
        }
      }, limit - (now - lastCall));
    }
  };
}

// Klasa za upravljanje Binance WebSocket konekcijama
export class BinanceWebSocketManager {
  private static instance: BinanceWebSocketManager
  private connections: Record<string, WebSocket> = {}
  private subscriptions: Record<string, Set<string>> = {} // coin -> callbacks
  private latestPrices: Record<string, number> = {}
  private callbacks: Record<string, Record<string, (price: number) => void>> = {}
  private throttledCallbacks: Record<string, Record<string, (price: number) => void>> = {}

  private constructor() {}

  // Singleton pattern
  public static getInstance(): BinanceWebSocketManager {
    if (!BinanceWebSocketManager.instance) {
      BinanceWebSocketManager.instance = new BinanceWebSocketManager()
    }
    return BinanceWebSocketManager.instance
  }

  // Pretplati se na coin
  public subscribe(coinId: string, callbackId: string, callback: (price: number) => void): void {
    // Pronađi Binance simbol za ovaj coin
    const symbol = coinToBinanceSymbol[coinId]
    if (!symbol) {
      console.warn(`Nemamo Binance simbol za ${coinId}`)
      return
    }

    // Dodaj callback u listu pretplata
    if (!this.subscriptions[coinId]) {
      this.subscriptions[coinId] = new Set()
      this.callbacks[coinId] = {}
      this.throttledCallbacks[coinId] = {}
    }
    
    this.subscriptions[coinId].add(callbackId)
    this.callbacks[coinId][callbackId] = callback;
    
    // Kreiraj throttled verziju callback-a koji će se izvršavati max jednom u UPDATE_INTERVAL
    this.throttledCallbacks[coinId][callbackId] = throttle(callback, UPDATE_INTERVAL);

    // Ako već imamo konekciju, ne radimo ništa
    if (this.connections[symbol] && this.connections[symbol].readyState === WebSocket.OPEN) {
      // Pošalji latest price ako postoji
      if (this.latestPrices[coinId]) {
        this.throttledCallbacks[coinId][callbackId](this.latestPrices[coinId])
      }
      return
    }

    // Povezivanje na Binance WebSocket
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@trade`
    console.log(`Povezivanje na Binance stream: ${wsUrl}`)
    
    const ws = new WebSocket(wsUrl)
    
    ws.onopen = () => {
      console.log(`Binance WebSocket za ${symbol} povezan`)
      this.connections[symbol] = ws
    }
    
    ws.onmessage = (event) => {
      try {
        const tradeData = JSON.parse(event.data)
        const price = parseFloat(tradeData.p)
        
        // Ažuriraj latest price
        this.latestPrices[coinId] = price
        
        // Pozovi sve throttled callbacke za ovaj coin
        if (this.throttledCallbacks[coinId]) {
          Object.values(this.throttledCallbacks[coinId]).forEach(cb => cb(price));
        }
      } catch (e) {
        console.error(`Greška pri parsiranju podataka sa Binance za ${symbol}:`, e)
      }
    }
    
    ws.onerror = (error) => {
      console.error(`Greška na Binance WebSocketu za ${symbol}:`, error)
      delete this.connections[symbol]
    }
    
    ws.onclose = () => {
      console.log(`Binance WebSocket za ${symbol} zatvoren, pokušaj ponovnog povezivanja za 5s`)
      delete this.connections[symbol]
      
      // Ponovo se poveži nakon 5 sekundi ako još ima pretplata
      setTimeout(() => {
        if (this.subscriptions[coinId] && this.subscriptions[coinId].size > 0) {
          this.subscribe(coinId, callbackId, callback)
        }
      }, 5000)
    }
  }

  // Otkaži pretplatu
  public unsubscribe(coinId: string, callbackId: string): void {
    if (!this.subscriptions[coinId]) return
    
    // Ukloni callback iz liste pretplata
    this.subscriptions[coinId].delete(callbackId)
    
    if (this.callbacks[coinId] && this.callbacks[coinId][callbackId]) {
      delete this.callbacks[coinId][callbackId];
    }
    
    if (this.throttledCallbacks[coinId] && this.throttledCallbacks[coinId][callbackId]) {
      delete this.throttledCallbacks[coinId][callbackId];
    }
    
    // Ako nema više pretplata za ovaj coin, zatvori konekciju
    if (this.subscriptions[coinId].size === 0) {
      const symbol = coinToBinanceSymbol[coinId]
      if (symbol && this.connections[symbol]) {
        console.log(`Zatvaranje Binance WebSocketa za ${symbol} - nema više pretplata`)
        this.connections[symbol].close()
        delete this.connections[symbol]
      }
    }
  }
}

// Hook za korišćenje Binance WebSocketa
export function useBinanceWebSocket(coinId: string): number | null {
  const updateRealtimePrice = useGlobalStore((state) => state.updateRealtimePrice)
  const realtimeData = useGlobalStore((state) => state.realtimeData)
  
  // Referenca za praćenje poslednjeg vremena ažuriranja
  const lastUpdateRef = useRef<number>(0);
  
  useEffect(() => {
    // Jedinstveni ID za ovaj hook
    const callbackId = `${coinId}_${Date.now()}`
    const manager = BinanceWebSocketManager.getInstance()
    
    // Callback funkcija koja će biti pozvana kad stigne nova cena
    const priceCallback = (price: number) => {
      updateRealtimePrice(coinId, price)
    }
    
    // Pretplati se
    manager.subscribe(coinId, callbackId, priceCallback)
    
    // Cleanup
    return () => {
      manager.unsubscribe(coinId, callbackId)
    }
  }, [coinId, updateRealtimePrice])
  
  return realtimeData[coinId] || null
}

export default BinanceWebSocketManager.getInstance()