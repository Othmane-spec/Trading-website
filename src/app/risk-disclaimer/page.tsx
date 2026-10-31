import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { site } from "@/config/site";

export default function RiskDisclaimerPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)", color: "var(--ink)" }}>
      <nav className="nav">
        <Link href="/" className="logo">
          <div className="logo-icon" />
          <span>{site.name}</span>
        </Link>
        <Link href="/" className="button ghost" style={{ gap: 6 }}>
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </nav>

      <div style={{ maxWidth: 800, margin: "80px auto", padding: "0 24px", flex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--gold)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>
          <AlertTriangle size={15} />
          <span>REGULATORY DISCLOSURE</span>
        </div>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", marginBottom: 28, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
          Risk Disclaimer
        </h1>

        <div style={{ padding: "24px", background: "var(--panel)", border: "1px solid rgba(214, 179, 106, 0.3)", marginBottom: 32 }}>
          <p style={{ color: "var(--ink)", fontWeight: 500, fontSize: 16, lineHeight: 1.6, margin: 0 }}>
            {site.disclaimer}
          </p>
        </div>

        <div style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: 16, display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ color: "var(--ink)", fontSize: 22 }}>High-Risk Financial Instruments</h2>
          <p>
            Trading foreign exchange (Forex), contracts for difference (CFDs), indices, commodities, and other leveraged derivatives carries a substantial degree of risk and is not suitable for all investors. The high degree of leverage can work against you as well as for you, potentially resulting in the loss of all your deposited capital.
          </p>
          <h2 style={{ color: "var(--ink)", fontSize: 22 }}>No Individualized Advice</h2>
          <p>
            Any trade setups, market commentary, charts, or opinions expressed within PRINTFOREX discussions or educational modules reflect general market analysis and theoretical principles. None of the commentary constitutes personalized investment advice tailored to your personal financial situation, risk tolerance, or investment objectives.
          </p>
          <h2 style={{ color: "var(--ink)", fontSize: 22 }}>Capital Responsibility</h2>
          <p>
            You should never risk money that you cannot afford to lose. Before deciding to trade in financial markets, carefully consider your objectives, financial situation, and level of experience. If you have any doubts, we recommend seeking advice from an independent, licensed financial advisor.
          </p>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "32px 24px", textAlign: "center", color: "var(--soft)", fontSize: 13 }}>
        © 2026 {site.name}. All rights reserved.
      </footer>
    </main>
  );
}
