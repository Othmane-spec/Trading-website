/**
 * Configuration for PRINTFOREX Live Trading News Ticker
 */
export const NEWS_CONFIG = {
  // Master toggle
  enabled: true,

  // Polling interval in ms (default: 5 minutes = 300,000ms)
  refreshIntervalMs: 5 * 60 * 1000,

  // Marquee scroll animation duration in seconds for one full loop
  animationDurationSec: 42,

  // Display toggles
  showCategory: true,
  showInstrument: true,
  showSource: true,
  showTimestamp: true,
  pauseOnHover: true,

  // Maximum items to display on the ticker
  maxItems: 18,

  // Category visual labels and styling
  categoryConfig: {
    forex: {
      label: "FOREX",
      badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    gold: {
      label: "GOLD & COMMODITIES",
      badgeClass: "bg-[#D6B36A]/10 text-[#F2D79A] border-[#D6B36A]/30",
    },
    economic: {
      label: "ECONOMIC",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    breaking: {
      label: "BREAKING",
      badgeClass: "bg-red-500/15 text-red-400 border-red-500/30 animate-pulse",
    },
  },
};
