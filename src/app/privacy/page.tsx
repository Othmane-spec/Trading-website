import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/config/site";

export default function PrivacyPage() {
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
          LEGAL & GOVERNANCE
        </span>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", marginBottom: 28, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
          Privacy Policy
        </h1>
        <div style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: 16, display: "flex", flexDirection: "column", gap: 20 }}>
          <p>
            PRINTFOREX (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to respecting the privacy and data security of visitors, members, and subscribers to our educational community platform.
          </p>
          <h2 style={{ color: "var(--ink)", fontSize: 22, marginTop: 16 }}>Information Collection</h2>
          <p>
            We collect personal information solely when voluntarily provided—such as email addresses submitted for community admissions, direct inquiries, or educational newsletter subscriptions. We do not sell, rent, or trade your contact data to third-party marketing brokers.
          </p>
          <h2 style={{ color: "var(--ink)", fontSize: 22, marginTop: 16 }}>Data Usage & Telemetry</h2>
          <p>
            Any diagnostic or behavioral data collected is used solely to enhance platform usability, security, and educational curricula quality. We employ industry-standard encryption protocols to protect all stored information.
          </p>
          <h2 style={{ color: "var(--ink)", fontSize: 22, marginTop: 16 }}>Contact Desk</h2>
          <p>
            For questions regarding data privacy rights, requests for deletion, or jurisdiction-specific disclosures, please contact our administrative desk at <a href={`mailto:${site.contact}`} style={{ color: "var(--gold)", textDecoration: "underline" }}>{site.contact}</a>.
          </p>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "32px 24px", textAlign: "center", color: "var(--soft)", fontSize: 13 }}>
        © 2026 {site.name}. All rights reserved.
      </footer>
    </main>
  );
}
