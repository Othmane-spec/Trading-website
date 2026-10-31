import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/config/site";

export default function TermsPage() {
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
        <span style={{ color: "var(--gold)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 12 }}>
          MEMBERSHIP AGREEMENT
        </span>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", marginBottom: 28, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
          Terms & Conditions
        </h1>
        <div style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: 16, display: "flex", flexDirection: "column", gap: 20 }}>
          <p>
            By accessing the PRINTFOREX platform, participating in discussions, or utilizing our educational frameworks, you agree to comply with and be bound by the following terms of participation.
          </p>
          <h2 style={{ color: "var(--ink)", fontSize: 22, marginTop: 16 }}>Educational Purpose Only</h2>
          <p>
            All content, commentary, webinars, and analytical frameworks published by PRINTFOREX are created strictly for educational and informational purposes. Under no circumstances should any material be construed as financial advice, investment counsel, or an offer or solicitation to purchase or sell any financial instrument.
          </p>
          <h2 style={{ color: "var(--ink)", fontSize: 22, marginTop: 16 }}>Community Conduct</h2>
          <p>
            Members agree to conduct all interactions with respect, intellectual rigor, and integrity. Solicitation of signals, unverified profit claims, abusive rhetoric, and unauthorized distribution of proprietary educational materials will result in immediate termination of membership.
          </p>
          <h2 style={{ color: "var(--ink)", fontSize: 22, marginTop: 16 }}>Limitation of Liability</h2>
          <p>
            PRINTFOREX and its contributors accept no liability for any direct, indirect, consequential, or incidental losses or damages incurred as a result of using information or concepts presented on this platform.
          </p>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "32px 24px", textAlign: "center", color: "var(--soft)", fontSize: 13 }}>
        © 2026 {site.name}. All rights reserved.
      </footer>
    </main>
  );
}
