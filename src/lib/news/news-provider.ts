import { MarketNews } from "@/types/market-news";
import {
  sanitizeHeadline,
  detectInstrument,
  categorizeArticle,
  isBreakingNews,
  extractSourceName,
  deduplicateNews,
} from "./news-normalizer";

// In-memory cache for server-side caching (5 minutes TTL)
interface CacheEntry {
  data: MarketNews[];
  timestamp: number;
  provider: string;
}

let cachedNews: CacheEntry | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Parses Yahoo Finance RSS XML string into raw news items.
 */
function parseRssXml(xml: string, defaultInstrumentHint?: string): MarketNews[] {
  const items: MarketNews[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const rawTitle = block.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "";
    const rawLink = block.match(/<link>([\s\S]*?)<\/link>/)?.[1] || "";
    const rawPubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || "";
    const rawGuid = block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/)?.[1] || "";
    const rawSource = block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] || "";

    const headline = sanitizeHeadline(rawTitle);
    const url = rawLink.trim();

    // Validate minimal requirements
    if (!headline || !url.startsWith("http")) continue;

    let publishedAt = new Date().toISOString();
    if (rawPubDate) {
      const parsedDate = new Date(rawPubDate);
      if (!isNaN(parsedDate.getTime())) {
        publishedAt = parsedDate.toISOString();
      }
    }

    const instrument = detectInstrument(headline, defaultInstrumentHint);
    const category = categorizeArticle(headline, instrument);
    const breaking = isBreakingNews(headline, category);
    const source = extractSourceName(url, rawSource);

    items.push({
      id: rawGuid.trim() || `rss-${Math.abs(hashString(headline + url))}`,
      headline,
      category,
      instrument,
      source,
      publishedAt,
      url,
      isBreaking: breaking,
    });
  }

  return items;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

/**
 * Fetches real financial news from Yahoo Finance RSS feeds.
 */
async function fetchYahooFeeds(): Promise<MarketNews[]> {
  const feeds = [
    {
      url: "https://feeds.finance.yahoo.com/rss/2.0/headline?s=EURUSD=X,GBPUSD=X,USDJPY=X,AUDUSD=X,USDCAD=X,USDCHF=X,NZDUSD=X&region=US&lang=en-US",
      hint: "EURUSD",
    },
    {
      url: "https://feeds.finance.yahoo.com/rss/2.0/headline?s=GC=F,SI=F,PL=F,CL=F&region=US&lang=en-US",
      hint: "GC=F",
    },
    {
      url: "https://feeds.finance.yahoo.com/rss/2.0/headline?s=%5EDXY,%5ETNX,%5EVIX&region=US&lang=en-US",
      hint: "DXY",
    },
  ];

  const results = await Promise.allSettled(
    feeds.map(async ({ url, hint }) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      try {
        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "application/rss+xml, application/xml, text/xml",
          },
          next: { revalidate: 300 }, // 5 minutes revalidation
        });

        if (!res.ok) {
          throw new Error(`Feed fetch failed with HTTP ${res.status}`);
        }

        const xml = await res.text();
        return parseRssXml(xml, hint);
      } finally {
        clearTimeout(timeoutId);
      }
    })
  );

  const allItems: MarketNews[] = [];
  for (const result of results) {
    if (result.status === "fulfilled" && Array.isArray(result.value)) {
      allItems.push(...result.value);
    }
  }

  return allItems;
}

/**
 * Optional Finnhub Provider if key is configured in environment.
 */
async function fetchFinnhubNews(apiKey: string): Promise<MarketNews[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(`https://finnhub.io/api/v1/news?category=forex&token=${encodeURIComponent(apiKey)}`, {
      signal: controller.signal,
      next: { revalidate: 300 },
    });

    if (!res.ok) throw new Error(`Finnhub returned ${res.status}`);
    const data = await res.json();

    if (!Array.isArray(data)) return [];

    return data
      .filter((item: any) => item && item.headline && item.url)
      .map((item: any) => {
        const headline = sanitizeHeadline(item.headline);
        const instrument = detectInstrument(headline);
        const category = categorizeArticle(headline, instrument);
        const publishedAt = item.datetime
          ? new Date(item.datetime * 1000).toISOString()
          : new Date().toISOString();

        return {
          id: String(item.id || Math.abs(hashString(headline))),
          headline,
          category,
          instrument,
          source: item.source || extractSourceName(item.url),
          publishedAt,
          url: item.url,
          isBreaking: isBreakingNews(headline, category),
        };
      });
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Primary news fetching orchestrator.
 * Checks server cache, queries live provider, normalizes and dedupes results.
 */
export async function getMarketNews(forceRefresh = false): Promise<{
  news: MarketNews[];
  lastUpdated: string;
  provider: string;
}> {
  const now = Date.now();

  // Return cached result if valid and not force-refreshed
  if (!forceRefresh && cachedNews && now - cachedNews.timestamp < CACHE_TTL_MS) {
    return {
      news: cachedNews.data,
      lastUpdated: new Date(cachedNews.timestamp).toISOString(),
      provider: cachedNews.provider,
    };
  }

  let articles: MarketNews[] = [];
  let provider = "Yahoo Finance Feeds";

  // Check if 3rd party API keys are configured
  const finnhubKey = process.env.FINNHUB_API_KEY;

  if (finnhubKey) {
    try {
      articles = await fetchFinnhubNews(finnhubKey);
      provider = "Finnhub API";
    } catch {
      // Fallback cleanly to Yahoo feeds
    }
  }

  // If no articles yet, fetch via high-availability financial feeds
  if (articles.length === 0) {
    articles = await fetchYahooFeeds();
    provider = "Yahoo Finance Markets";
  }

  // Normalize, deduplicate, and sort
  const cleanArticles = deduplicateNews(articles);

  if (cleanArticles.length > 0) {
    cachedNews = {
      data: cleanArticles,
      timestamp: now,
      provider,
    };
  } else if (cachedNews) {
    // If current fetch returned 0 items but we have previous cached data, keep the cache
    return {
      news: cachedNews.data,
      lastUpdated: new Date(cachedNews.timestamp).toISOString(),
      provider: cachedNews.provider,
    };
  }

  return {
    news: cleanArticles,
    lastUpdated: new Date(now).toISOString(),
    provider,
  };
}
