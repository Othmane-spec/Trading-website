import { MarketNews, NewsCategory } from "@/types/market-news";

/**
 * Sanitizes untrusted text by removing HTML tags and decoding common entities.
 */
export function sanitizeHeadline(text: string): string {
  if (!text) return "";
  let clean = text
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8212;/g, "—")
    .replace(/&#8211;/g, "–")
    .replace(/\s+/g, " ")
    .trim();

  // Strip common RSS noise prefixes like "BC-" or trailing "(AP)"
  clean = clean.replace(/^BC-\s*/i, "");
  return clean;
}

/**
 * Detects financial instrument from text or query hints.
 */
export function detectInstrument(headline: string, defaultSymbol?: string): string | undefined {
  const upper = headline.toUpperCase();

  // Major Forex Pairs
  if (upper.includes("EUR/USD") || upper.includes("EURUSD")) return "EUR/USD";
  if (upper.includes("GBP/USD") || upper.includes("GBPUSD")) return "GBP/USD";
  if (upper.includes("USD/JPY") || upper.includes("USDJPY")) return "USD/JPY";
  if (upper.includes("AUD/USD") || upper.includes("AUDUSD")) return "AUD/USD";
  if (upper.includes("USD/CAD") || upper.includes("USDCAD")) return "USD/CAD";
  if (upper.includes("USD/CHF") || upper.includes("USDCHF")) return "USD/CHF";
  if (upper.includes("NZD/USD") || upper.includes("NZDUSD")) return "NZD/USD";
  if (upper.includes("EUR/GBP") || upper.includes("EURGBP")) return "EUR/GBP";
  if (upper.includes("EUR/JPY") || upper.includes("EURJPY")) return "EUR/JPY";
  if (upper.includes("GBP/JPY") || upper.includes("GBPJPY")) return "GBP/JPY";
  if (upper.includes("DXY") || upper.includes("DOLLAR INDEX")) return "DXY";

  // Gold & Commodities
  if (upper.includes("XAU/USD") || upper.includes("XAUUSD") || upper.includes("GOLD")) return "XAU/USD";
  if (upper.includes("XAG/USD") || upper.includes("XAGUSD") || upper.includes("SILVER")) return "XAG/USD";
  if (upper.includes("CRUDE") || upper.includes("BRENT") || upper.includes("WTI")) return "OIL";

  // Fallback to default if provided and known
  if (defaultSymbol) {
    if (defaultSymbol.includes("EURUSD")) return "EUR/USD";
    if (defaultSymbol.includes("GBPUSD")) return "GBP/USD";
    if (defaultSymbol.includes("USDJPY")) return "USD/JPY";
    if (defaultSymbol.includes("GC=F")) return "XAU/USD";
    if (defaultSymbol.includes("SI=F")) return "XAG/USD";
    if (defaultSymbol.includes("DXY")) return "DXY";
  }

  return undefined;
}

/**
 * Categorizes an article based on headline and detected instrument.
 */
export function categorizeArticle(headline: string, instrument?: string): NewsCategory {
  const upper = headline.toUpperCase();

  // Check for Breaking criteria
  if (
    upper.includes("BREAKING") ||
    upper.includes("FLASH:") ||
    upper.includes("EMERGENCY") ||
    upper.includes("SURPRISE HIKE") ||
    upper.includes("SURPRISE CUT") ||
    upper.includes("RATE HIKE") ||
    upper.includes("RATE CUT") ||
    upper.includes("FED CUTS") ||
    upper.includes("FED HIKES") ||
    upper.includes("ECB CUTS") ||
    upper.includes("ECB HIKES")
  ) {
    return "breaking";
  }

  // Check for Gold & Commodities
  if (
    instrument === "XAU/USD" ||
    instrument === "XAG/USD" ||
    instrument === "OIL" ||
    upper.includes("GOLD") ||
    upper.includes("SILVER") ||
    upper.includes("BULLION") ||
    upper.includes("COMMODIT")
  ) {
    return "gold";
  }

  // Check for Economic Events
  if (
    upper.includes("CENTRAL BANK") ||
    upper.includes("INFLATION") ||
    upper.includes("CPI") ||
    upper.includes("GDP") ||
    upper.includes("NONFARM") ||
    upper.includes("NFP") ||
    upper.includes("PAYROLL") ||
    upper.includes("FOMC") ||
    upper.includes("POWELL") ||
    upper.includes("LAGARDE") ||
    upper.includes("INTEREST RATE") ||
    upper.includes("JOBLESS") ||
    upper.includes("PMI") ||
    upper.includes("FED") ||
    upper.includes("ECB") ||
    upper.includes("BOE") ||
    upper.includes("BOJ")
  ) {
    return "economic";
  }

  // Default to Forex
  return "forex";
}

/**
 * Determines genuine breaking status.
 */
export function isBreakingNews(headline: string, category: NewsCategory): boolean {
  if (category === "breaking") return true;
  const upper = headline.toUpperCase();
  return (
    upper.includes("BREAKING:") ||
    upper.includes("ALERT:") ||
    upper.includes("URGENT:") ||
    upper.includes("EMERGENCY MEETING")
  );
}

/**
 * Extracts a recognizable source attribution from URL or metadata.
 */
export function extractSourceName(url: string, rawSource?: string): string {
  if (rawSource && rawSource.trim().length > 0 && !rawSource.includes("http")) {
    return rawSource.trim();
  }

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    if (host.includes("finance.yahoo.com") || host.includes("yahoo")) return "Yahoo Finance";
    if (host.includes("reuters")) return "Reuters";
    if (host.includes("bloomberg")) return "Bloomberg";
    if (host.includes("forexlive")) return "ForexLive";
    if (host.includes("fxstreet")) return "FXStreet";
    if (host.includes("proactiveinvestors")) return "Proactive Investors";
    if (host.includes("cnbc")) return "CNBC";
    if (host.includes("marketwatch")) return "MarketWatch";
    if (host.includes("ft.com")) return "Financial Times";
    if (host.includes("wsj")) return "Wall Street Journal";
    return host;
  } catch {
    return "Market Wire";
  }
}

/**
 * Deduplicates and sorts news articles.
 */
export function deduplicateNews(articles: MarketNews[]): MarketNews[] {
  const seenHeadlines = new Set<string>();
  const seenUrls = new Set<string>();
  const unique: MarketNews[] = [];

  for (const item of articles) {
    // Simplified headline key for fuzzy deduplication
    const normKey = item.headline.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!normKey || seenHeadlines.has(normKey) || seenUrls.has(item.url)) {
      continue;
    }
    seenHeadlines.add(normKey);
    seenUrls.add(item.url);
    unique.push(item);
  }

  // Sort by publishedAt descending (newest first)
  return unique.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
