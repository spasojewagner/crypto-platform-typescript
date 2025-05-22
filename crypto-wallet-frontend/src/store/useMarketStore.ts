// src/api/binance.ts

// tipovi za callback funkcije
type KlineCallback = (data: {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }) => void;
  type DepthCallback = (data: {
    bids: [number, number][];
    asks: [number, number][];
  }) => void;
  type TickerCallback = (data: {
    symbol: string;
    price: string;
    percent: string;
  }) => void;
  
  // subscribe na candlestick (klines) stream
  export function subscribeKlines(
    symbol: string,
    interval: string,
    onKline: KlineCallback
  ) {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
    );
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const k = msg.k;
      onKline({
        time: k.t / 1000,
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
        volume: parseFloat(k.v),
      });
    };
    return () => ws.close();
  }
  
  // subscribe na orderbook (depth20) stream
  export function subscribeDepth(
    symbol: string,
    onDepth: DepthCallback
  ) {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth20@100ms`
    );
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      onDepth({
        bids: msg.bids.map((b: string[]) => [
          parseFloat(b[0]),
          parseFloat(b[1]),
        ]),
        asks: msg.asks.map((a: string[]) => [
          parseFloat(a[0]),
          parseFloat(a[1]),
        ]),
      });
    };
    return () => ws.close();
  }
  
  // subscribe na sve tickere
  export function subscribeTicker(onTicker: TickerCallback) {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/!ticker@arr`
    );
    ws.onmessage = (event) => {
      const list = JSON.parse(event.data);
      list.forEach((t: any) =>
        onTicker({ symbol: t.s, price: t.c, percent: t.P })
      );
    };
    return () => ws.close();
  }
  