"use client";

import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  spread?: string;
}

const DEFAULT_TICKERS: TickerItem[] = [
  { symbol: "EUR/USD", price: "1.08420", change: "+0.32%", isPositive: true, spread: "0.2" },
  { symbol: "GBP/USD", price: "1.27180", change: "-0.18%", isPositive: false, spread: "0.4" },
  { symbol: "USD/JPY", price: "154.350", change: "+0.45%", isPositive: true, spread: "0.3" },
  { symbol: "XAU/USD (Or)", price: "2,748.50", change: "+1.24%", isPositive: true, spread: "1.2" },
  { symbol: "USD/CAD", price: "1.39120", change: "-0.09%", isPositive: false, spread: "0.5" },
  { symbol: "AUD/USD", price: "0.65840", change: "+0.22%", isPositive: true, spread: "0.3" },
  { symbol: "US30 (Dow)", price: "43,920.0", change: "+0.68%", isPositive: true, spread: "2.0" },
  { symbol: "NAS100", price: "21,150.8", change: "+1.05%", isPositive: true, spread: "1.5" },
  { symbol: "BTC/USD", price: "91,420.0", change: "+3.85%", isPositive: true, spread: "12.0" },
];

export default function TradingNewsTicker({ items = DEFAULT_TICKERS }: { items?: TickerItem[] }) {
  // Duplicate for seamless infinite loop
  const tickerItems = [...items, ...items, ...items];

  return (
    <div className="w-full bg-[#030508] border-y border-brand-border/40 overflow-hidden select-none py-2 relative z-20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Live Indicator Badge */}
        <div className="flex-shrink-0 flex items-center gap-2 pr-4 border-r border-brand-border/40 mr-4 z-10 bg-[#030508]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold flex items-center gap-1">
            <Activity className="w-3 h-3 text-brand-gold" />
            <span className="hidden sm:inline">Marchés Direct</span>
          </span>
        </div>

        {/* Scrolling items marquee */}
        <div className="flex-1 overflow-hidden relative">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            className="flex items-center gap-6 whitespace-nowrap will-change-transform"
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35,
            }}
          >
            {tickerItems.map((item, idx) => (
              <div
                key={`${item.symbol}-${idx}`}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-elevated/40 border border-brand-border/30 text-xs font-mono"
              >
                <span className="text-white font-semibold">{item.symbol}</span>
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
