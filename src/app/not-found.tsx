import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/config/site";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)", color: "var(--ink)" }}>
      <nav className="nav">
        <Link href="/" className="logo">
          <div className="logo-icon" />
          <span>{site.name}</span>
        </Link>
        <Link href="/" className="button ghost" style={{ gap: 6 }}>
          <ArrowLeft size={14} />
          <span>Return to Safety</span>
        </Link>
      </nav>

      <div style={{ maxWidth: 640, margin: "140px auto", padding: "0 24px", textAlign: "center", flex: 1 }}>
        <span style={{ color: "var(--gold)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 16 }}>
          404 ERROR / UNMAPPED ROUTE
        </span>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: 20, letterSpacing: "-0.05em", lineHeight: 1.05 }}>
          Structure Not Found
        </h1>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: 16, marginBottom: 36 }}>
          The market condition or URL you are attempting to access does not exist within our current architecture.
        </p>
        <Link href="/" className="button">
          <span>Back to Main Terminal</span>
        </Link>
      </div>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "24px", textAlign: "center", color: "var(--soft)", fontSize: 13 }}>
        © 2026 {site.name}. All rights reserved.
      </footer>
    </main>
  );
}

