"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  spread?: string;
}

const DEFAULT_TICKERS: TickerItem[] = [
  { symbol: "EUR/USD", price: "1.11885", change: "-0.06%", isPositive: false, spread: "0.2" },
  { symbol: "GBP/USD", price: "1.34220", change: "+0.08%", isPositive: true, spread: "0.4" },
  { symbol: "USD/JPY", price: "158.195", change: "+0.18%", isPositive: true, spread: "0.3" },
  { symbol: "XAU/USD", price: "3,949.50", change: "+0.13%", isPositive: true, spread: "1.2" },
  { symbol: "USD/CAD", price: "1.39120", change: "-0.09%", isPositive: false, spread: "0.5" },
  { symbol: "AUD/USD", price: "0.65840", change: "+0.22%", isPositive: true, spread: "0.3" },
  { symbol: "US30 (Dow)", price: "43,920.0", change: "+0.68%", isPositive: true, spread: "2.0" },
  { symbol: "BTC/USD", price: "77,272.0", change: "+0.59%", isPositive: true, spread: "10.0" },
];

export default function TradingNewsTicker({ initialItems = DEFAULT_TICKERS }: { initialItems?: TickerItem[] }) {
  const { t, isRtl } = useLanguage();
  const [tickerList, setTickerList] = useState<TickerItem[]>(initialItems);

  useEffect(() => {
    let isMounted = true;

    async function loadMarketData() {
      try {
        const res = await fetch("/api/market-data");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.items) && data.items.length > 0 && isMounted) {
            setTickerList(data.items);
          }
        }
      } catch (err) {
        console.warn("Could not fetch live Twelve Data prices:", err);
      }
    }

    // Initial load
    loadMarketData();

    // Poll every 90 seconds (consistent with Twelve Data free tier rate limit)
    const interval = setInterval(loadMarketData, 90000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Format symbol with localized label (e.g., Gold / Or / الذهب)
  const formatSymbol = (sym: string) => {
    if (sym.includes("XAU/USD")) {
      return `XAU/USD (${t.ticker.goldLabel})`;
    }
    return sym;
  };

  // Duplicate list to achieve a continuous smooth infinite loop
  const displayItems = [...tickerList, ...tickerList, ...tickerList];

  return (
    <div className="w-full bg-[#030508] border-y border-brand-border/40 overflow-hidden select-none py-2 relative z-20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Live Indicator Badge */}
        <div className={`flex-shrink-0 flex items-center gap-2 ${isRtl ? "pl-4 border-l ml-4" : "pr-4 border-r mr-4"} border-brand-border/40 z-10 bg-[#030508]`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-brand-gold" />
            <span className="hidden sm:inline">{t.ticker.liveMarkets}</span>
            <span className="text-[8px] px-1 py-0.2 rounded bg-brand-gold/15 text-brand-gold font-mono hidden md:inline">
              {t.ticker.live}
            </span>
          </span>
        </div>

        {/* Scrolling items marquee */}
        <div className="flex-1 overflow-hidden relative">
          <motion.div
            animate={{ x: isRtl ? ["0%", "50%"] : ["0%", "-50%"] }}
            className="flex items-center gap-6 whitespace-nowrap will-change-transform"
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35,
            }}
          >
            {displayItems.map((item, idx) => (
              <div
                key={`${item.symbol}-${idx}`}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-elevated/40 border border-brand-border/30 text-xs font-mono"
              >
                <span className="text-white font-semibold">{formatSymbol(item.symbol)}</span>
                <span className="text-brand-slateText">{item.price}</span>
                <span
                  className={`flex items-center gap-0.5 text-[11px] font-bold ${
                    item.isPositive ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {item.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {item.change}
                </span>
                {item.spread && (
                  <span className="text-[9px] text-brand-slateText/50 uppercase">
                    spd {item.spread}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export { TradingNewsTicker };
