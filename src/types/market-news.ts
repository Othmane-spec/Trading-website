export type NewsCategory = "forex" | "gold" | "economic" | "breaking";

export interface MarketNews {
  id: string;
  headline: string;
  category: NewsCategory;
  instrument?: string;
  source: string;
  publishedAt: string; // ISO 8601 string
  url: string;
  isBreaking: boolean;
  impact?: "low" | "medium" | "high";
}

export interface NewsApiResponse {
  news: MarketNews[];
  lastUpdated: string;
  provider: string;
  status: "success" | "empty" | "error";
  message?: string;
}
