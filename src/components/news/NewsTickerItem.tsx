"use client";

import React from "react";
import { ExternalLink, Flame, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { MarketNews, NewsCategory } from "@/types/market-news";
import { NEWS_CONFIG } from "@/config/news";

interface NewsTickerItemProps {
  item: MarketNews;
}

function formatRelativeTime(isoDate: string): string {
  try {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return "just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return "";
  }
}

function getCategoryIcon(category: NewsCategory) {
  switch (category) {
    case "breaking":
      return <Flame className="w-3 h-3 text-[#FF6B75] animate-pulse" />;
    case "gold":
      return <DollarSign className="w-3 h-3 text-[#F2D79A]" />;
    case "economic":
      return <Calendar className="w-3 h-3 text-[#43D9A3]" />;
    case "forex":
    default:
      return <TrendingUp className="w-3 h-3 text-blue-400" />;
  }
}

export const NewsTickerItem: React.FC<NewsTickerItemProps> = ({ item }) => {
  const categoryMeta = NEWS_CONFIG.categoryConfig[item.category] || NEWS_CONFIG.categoryConfig.forex;
  const timeAgo = formatRelativeTime(item.publishedAt);

  return (
    <div className="inline-flex items-center shrink-0">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        title={`Read verified article on ${item.source}`}
        className="group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 hover:bg-[#171D28] hover:shadow-sm focus:outline-none focus:ring-1 focus:ring-[#D6B36A]/60"
        tabIndex={0}
      >
        {/* Category Badge */}
        {NEWS_CONFIG.showCategory && (
          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase border ${categoryMeta.badgeClass}`}
          >
            {getCategoryIcon(item.category)}
            <span>{categoryMeta.label}</span>
          </span>
        )}

        {/* Financial Instrument Badge */}
        {NEWS_CONFIG.showInstrument && item.instrument && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-tight bg-white/[0.04] text-[#F5F5F2] border border-white/[0.08] group-hover:border-[#D6B36A]/30">
            {item.instrument}
          </span>
        )}

        {/* Headline */}
        <span className="font-medium text-[#F5F5F2] group-hover:text-[#F2D79A] transition-colors duration-200 line-clamp-1 max-w-[280px] sm:max-w-[420px] lg:max-w-[560px]">
          {item.headline}
        </span>

        {/* Source & Time Metadata */}
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#A2A9B5] whitespace-nowrap">
          {NEWS_CONFIG.showSource && <span>· {item.source}</span>}
          {NEWS_CONFIG.showTimestamp && timeAgo && <span>· {timeAgo}</span>}
        </span>

        {/* Verified External Link Icon */}
        <ExternalLink className="w-3 h-3 text-[#A2A9B5] opacity-50 group-hover:opacity-100 group-hover:text-[#F2D79A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
      </a>

      {/* Item Separator */}
      <span className="mx-3.5 text-[#D6B36A]/30 select-none text-[10px]" aria-hidden="true">
        ◆
      </span>
    </div>
  );
};
