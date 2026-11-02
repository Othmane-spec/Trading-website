import { NextRequest, NextResponse } from "next/server";
import { getMarketNews } from "@/lib/news/news-provider";
import { NewsApiResponse } from "@/types/market-news";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const forceRefresh = searchParams.get("refresh") === "true";

    const { news, lastUpdated, provider } = await getMarketNews(forceRefresh);

    if (!news || news.length === 0) {
      const emptyResponse: NewsApiResponse = {
        news: [],
        lastUpdated: new Date().toISOString(),
        provider: "None",
        status: "empty",
        message: "No new market updates available.",
      };
      return NextResponse.json(emptyResponse, {
        status: 200,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    }

    const response: NewsApiResponse = {
      news,
      lastUpdated,
      provider,
      status: "success",
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err: any) {
    console.error("Failed to fetch market news:", err);
    const errorResponse: NewsApiResponse = {
      news: [],
      lastUpdated: new Date().toISOString(),
      provider: "None",
      status: "error",
      message: "Market news is temporarily unavailable.",
    };
    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }
}
