import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  spread?: string;
}

// Fallback baseline data if API is down or rate-limited
const FALLBACK_TICKERS: TickerItem[] = [
  { symbol: "EUR/USD", price: "1.11885", change: "-0.06%", isPositive: false, spread: "0.2" },
  { symbol: "GBP/USD", price: "1.34220", change: "+0.08%", isPositive: true, spread: "0.4" },
  { symbol: "USD/JPY", price: "158.195", change: "+0.18%", isPositive: true, spread: "0.3" },
  { symbol: "XAU/USD (Or)", price: "3,949.50", change: "+0.13%", isPositive: true, spread: "1.2" },
  { symbol: "USD/CAD", price: "1.39120", change: "-0.09%", isPositive: false, spread: "0.5" },
  { symbol: "AUD/USD", price: "0.65840", change: "+0.22%", isPositive: true, spread: "0.3" },
  { symbol: "US30 (Dow)", price: "43,920.0", change: "+0.68%", isPositive: true, spread: "2.0" },
  { symbol: "BTC/USD", price: "77,272.0", change: "+0.59%", isPositive: true, spread: "10.0" },
];

// In-memory cache to strictly respect Twelve Data API rate limits (8 credits/minute)
let cachedData: TickerItem[] = FALLBACK_TICKERS;
let lastFetchTimestamp = 0;
const CACHE_TTL_MS = 90 * 1000; // 90 seconds cache

const DEFAULT_SPREADS: Record<string, string> = {
  "EUR/USD": "0.2",
  "GBP/USD": "0.4",
  "USD/JPY": "0.3",
  "XAU/USD": "1.2",
  "USD/CAD": "0.5",
  "AUD/USD": "0.3",
  "BTC/USD": "10.0",
};

function formatPrice(symbol: string, rawPrice: string | number): string {
  const num = typeof rawPrice === "number" ? rawPrice : parseFloat(rawPrice);
  if (isNaN(num)) return String(rawPrice);

  if (symbol.includes("BTC")) {
    return Math.round(num).toLocaleString("fr-FR");
  }
  if (symbol.includes("XAU")) {
    return num.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (symbol.includes("JPY")) {
    return num.toFixed(3);
  }
  return num.toFixed(5);
}

export async function GET() {
  const now = Date.now();

  // Return cached data if still within TTL
  if (now - lastFetchTimestamp < CACHE_TTL_MS && cachedData.length > 0) {
    return NextResponse.json({
      success: true,
      source: "twelvedata_cache",
      cached: true,
      items: cachedData,
    });
  }

  const apiKey =
    process.env.TWELVE_DATA_API_KEY || "a67f1c344d3144bc8342925980746abd";

  try {
    const symbols = ["EUR/USD", "GBP/USD", "USD/JPY", "XAU/USD", "BTC/USD"];
    const url = `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(
      symbols.join(",")
    )}&apikey=${apiKey}`;

    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn("Twelve Data API response not OK:", res.status);
      return NextResponse.json({
        success: true,
        source: "fallback",
        cached: true,
        items: cachedData,
      });
    }

    const data = await res.json();

    // Check if Twelve Data returned rate limit or error
    if (data.code === 429 || data.status === "error") {
      console.warn("Twelve Data API limit notice:", data.message);
      return NextResponse.json({
        success: true,
        source: "fallback_rate_limited",
        cached: true,
        items: cachedData,
      });
    }

    const newItems: TickerItem[] = [];

    // Format Twelve Data returned quotes
    for (const sym of symbols) {
      const quote = data[sym];
      if (quote && quote.close) {
        const pct = parseFloat(quote.percent_change || "0");
        const isPos = pct >= 0;
        const displayName = sym === "XAU/USD" ? "XAU/USD (Or)" : sym;

        newItems.push({
          symbol: displayName,
          price: formatPrice(sym, quote.close),
          change: `${isPos ? "+" : ""}${pct.toFixed(2)}%`,
          isPositive: isPos,
          spread: DEFAULT_SPREADS[sym] || "0.4",
        });
      }
    }

    // Include additional high-demand instruments from fallback to keep ticker rich
    const extraTickers: TickerItem[] = [
      { symbol: "USD/CAD", price: "1.39120", change: "-0.09%", isPositive: false, spread: "0.5" },
      { symbol: "AUD/USD", price: "0.65840", change: "+0.22%", isPositive: true, spread: "0.3" },
      { symbol: "US30 (Dow)", price: "43,920.0", change: "+0.68%", isPositive: true, spread: "2.0" },
    ];

    if (newItems.length > 0) {
      cachedData = [...newItems, ...extraTickers];
      lastFetchTimestamp = now;
    }

    return NextResponse.json({
      success: true,
      source: "twelvedata_live",
      cached: false,
      items: cachedData,
    });
  } catch (err: any) {
    console.error("Error fetching Twelve Data quotes:", err);
    return NextResponse.json({
      success: true,
      source: "fallback_error",
      cached: true,
      items: cachedData,
    });
  }
}
