"use client";

import "./globals.css";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  CircleGauge,
  Menu,
  ShieldAlert,
  Users,
  Wrench,
  X,
  TrendingUp,
} from "lucide-react";
import { site } from "@/config/site";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/ui/Reveal";
import { HeroParallax } from "@/components/ui/HeroParallax";

const services = [
  {
    tag: "Analysis",
    title: "Market Analysis",
    copy: "Read market structure, liquidity zones, and price action context without relying on lagging indicators.",
    icon: BarChart3,
    featured: true,
  },
  {
    tag: "Education",
    title: "Trading Education",
    copy: "Build deep fluency in market mechanics, institutional orders, and technical frameworks from the ground up.",
    icon: BookOpen,
  },
  {
    tag: "Technical",
    title: "Technical Analysis",
    copy: "Explore multi-timeframe fractal patterns, structural breaks, and scenario-based invalidation mapping.",
    icon: TrendingUp,
  },
  {
    tag: "Risk",
    title: "Risk Management",
    copy: "Strict position sizing, mathematically defined downside risk, and asymmetric capital preservation rules.",
    icon: CircleGauge,
  },
  {
    tag: "Dialogue",
    title: "Community Discussions",
    copy: "Examine live setups and retrospective reviews with operators who value process and precision over noise.",
    icon: Users,
  },
  {
    tag: "Resources",
    title: "Tools & Resources",
    copy: "Access structured execution checklists, journaling templates, and proprietary quantitative frameworks.",
    icon: Wrench,
  },
];

const faqs = [
  {
    q: "What is this trading community about?",
    a: "PRINTFOREX is an institutional-grade educational community focused on systematic market structure, disciplined risk-to-reward frameworks, and rigorous capital preservation rather than speculative noise or signal chasing.",
  },
  {
    q: "Who can join the community?",
    a: "Anyone serious about treating market participation as an analytical craft—from beginners establishing an uncorrupted foundation to experienced traders refining their risk discipline.",
  },
  {
    q: "Do I need previous financial market experience?",
    a: "No. Our educational syllabus begins with foundational market mechanics and progresses systematically to advanced liquidity frameworks, allowing members to develop at a deliberate pace.",
  },
  {
    q: "Are trading results guaranteed?",
    a: "Never. Financial markets inherently carry uncertainty, and past performance is never indicative of future returns. We teach risk quantification and downside protection, never unrealistic profit promises.",
  },
  {
    q: "How can I contact the PRINTFOREX team?",
    a: `Reach our research and admissions desk directly at ${site.contact} for inquiries regarding community membership and institutional curricula.`,
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState("1D");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Sample data points for interactive chart
  const chartPoints = [
    { time: "09:30", price: "1.0815", y: 190 },
    { time: "10:30", price: "1.0828", y: 172 },
    { time: "11:30", price: "1.0820", y: 180 },
    { time: "12:30", price: "1.0845", y: 145 },
    { time: "13:30", price: "1.0838", y: 155 },
    { time: "14:30", price: "1.0862", y: 110 },
    { time: "15:30", price: "1.0854", y: 125 },
    { time: "16:30", price: "1.0880", y: 78 },
    { time: "17:30", price: "1.0895", y: 48 },
  ];

  return (
    <main>
      {/* ── Top Navigation Bar ── */}
      <nav className="nav">
        <a href="#top" className="logo">
          <div className="logo-icon" />
          <span>{site.name}</span>
        </a>

        <div className="navlinks">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="navactions">
          <a href="#services" className="button ghost">
            <span>Explore syllabus</span>
          </a>
          <a href={site.communityUrl} className="button">
            <span>Join community</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        <button
          aria-label="Toggle navigation menu"
          className="menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.communityUrl}
            className="button"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Join our community</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      )}

      {/* ── Hero with Interactive Pointer & Scroll Parallax ── */}
      <HeroParallax />

      {/* ── Philosophy Section ── */}
      <section className="section-wrapper philosophy">
        <Reveal>
          <div className="section-intro">
            <span className="eyebrow">OUR PHILOSOPHY</span>
            <h2>Trading is an analytical discipline, not a shortcut.</h2>
            <p className="copy">
              We reject get-rich narratives and noisy signal channels. Sustainable
              market longevity is engineered through structured observation,
              repeatable execution rules, and rigorous risk budgeting.
            </p>
          </div>
        </Reveal>

        <div className="principles">
          {[
            {
              num: "01",
              title: "Systematic Education",
              copy: "Build an uncompromised conceptual foundation in market mechanics, institutional order flows, and liquidity distribution.",
            },
            {
              num: "02",
              title: "Execution Discipline",
              copy: "Transform subjective speculation into an objective, rule-based protocol governed by predefined invalidation criteria.",
            },
            {
              num: "03",
              title: "Risk Asymmetry",
              copy: "Treat capital preservation as the primary objective. Every position begins with quantified downside before upside evaluation.",
            },
          ].map((principle, index) => (
            <Reveal key={principle.num} delay={index * 0.1}>
              <article className="principle-card">
                <span className="principle-num">{principle.num}</span>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── About Section: Perspective & Collective Intelligence ── */}
      <section id="about" className="section-wrapper about">
        <Reveal direction="left">
          <div className="section-intro" style={{ marginBottom: 32 }}>
            <span className="eyebrow">COLLECTIVE DISCIPLINE</span>
            <h2>Better questions. Clearer thinking.</h2>
            <p className="copy">
              Most traders fail because they operate in isolation or follow crowds.
              PRINTFOREX creates an intellectual sanctuary where serious practitioners
              critique trade theses, verify assumptions, and advance their edge together.
            </p>
          </div>
          <a href="#services" className="button ghost">
            <span>Discover our curriculum</span>
            <ArrowRight size={15} />
          </a>
        </Reveal>

        <Reveal direction="right">
          <div className="network">
            <div className="network-ring r1" />
            <div className="network-ring r2" />
            <div className="node n1" title="Market Structure" />
            <div className="node n2" title="Quantitative Edge" />
            <div className="node n3" title="Risk Management" />
            <div className="node n4" title="Behavioral Discipline" />
            <div className="node n5" title="Execution Precision" />
            <div className="network-center">
              CONNECTED
              <em>PERSPECTIVE</em>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Services / Curriculum Mosaic ── */}
      <section id="services" className="section-wrapper services">
        <Reveal>
          <div className="section-intro">
            <span className="eyebrow">WHAT WE EXPLORE</span>
            <h2>A sharper lens for market participation.</h2>
            <p className="copy">
              Comprehensive modules engineered to eliminate guesswork and replace
              emotional decision-making with institutional precision.
            </p>
          </div>
        </Reveal>

        <div className="service-grid">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.tag}
                delay={index * 0.07}
                className={`service service-${index}`}
              >
                <div>
                  <div className="service-top">
                    <span className="service-tag">{item.tag}</span>
                    <Icon className="service-icon" size={20} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
                <a href="#join" className="service-link">
                  <span>Explore curriculum</span>
                  <ArrowRight size={14} />
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Methodology (4 Stepped Stages) ── */}
      <section id="methodology" className="section-wrapper methodology">
        <Reveal>
          <div className="section-intro">
            <span className="eyebrow">OPERATIONAL PROTOCOL</span>
            <h2>From observation to structured execution.</h2>
            <p className="copy">
              A four-phase operational framework applied before every trading decision.
            </p>
          </div>
        </Reveal>

        <div className="steps">
          {[
            {
              step: "01",
              title: "Observe",
              desc: "Map the macroeconomic landscape, identify liquidity pools, and register key session volatility windows.",
            },
            {
              step: "02",
              title: "Analyze",
              desc: "Diagnose orderflow patterns, determine market phase, and establish conditional if-then scenario trees.",
            },
            {
              step: "03",
              title: "Plan",
              desc: "Calculate position size based on max drawdown parameters, identify strict invalidation levels, and set risk ratios.",
            },
            {
              step: "04",
              title: "Review",
              desc: "Log quantitative trade metrics, audit emotional friction, and iterate edge based on statistical outcomes.",
            },
          ].map((item, i) => (
            <Reveal key={item.step} delay={i * 0.1}>
              <article className="step-card">
                <div className="step-header">
                  <span className="step-num">{item.step}</span>
                  <div className="step-point" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Interactive Market Perspective & Live Chart ── */}
      <section className="section-wrapper market">
        <div className="market-header-row">
          <Reveal>
            <div className="section-intro" style={{ marginBottom: 0 }}>
              <span className="eyebrow">MARKET PERSPECTIVE</span>
              <h2>Read structure, not the noise.</h2>
              <p className="copy">
                Real-time liquidity mapping illustrative of our structural framework.
              </p>
            </div>
          </Reveal>

          <div className="live-badge">
            <span className="live-dot" />
            <span>ILLUSTRATIVE TELEMETRY</span>
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="chart-container">
            <div className="chart-meta-row">
              <div className="chart-symbol">
                <span className="chart-symbol-name">EUR / USD</span>
                <span className="chart-symbol-price">
                  {hoveredPoint !== null
                    ? chartPoints[hoveredPoint].price
                    : "1.0895"}
                </span>
                <span className="chart-symbol-change">+0.74%</span>
              </div>

              <div className="chart-timeframe-tabs">
                {["1D", "1W", "1M", "1Y"].map((tf) => (
                  <button
                    key={tf}
                    className={`timeframe-tab ${
                      activeTimeframe === tf ? "active" : ""
                    }`}
                    onClick={() => setActiveTimeframe(tf)}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="chart-svg-wrap">
              <svg
                viewBox="0 0 1000 240"
                preserveAspectRatio="none"
                className="chart-svg"
                aria-label="Interactive market telemetry"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d6b36a" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#d6b36a" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Subtle horizontal grid lines */}
                <line x1="0" y1="60" x2="1000" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="1000" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="180" x2="1000" y2="180" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                {/* Area under curve */}
                <path
                  d="M0 200 L100 180 L200 172 L300 180 L400 145 L500 155 L600 110 L700 125 L850 78 L1000 48 V240 H0 Z"
                  fill="url(#chartGradient)"
                />

                {/* Main Price Trend Curve */}
                <path
                  d="M0 200 L100 180 L200 172 L300 180 L400 145 L500 155 L600 110 L700 125 L850 78 L1000 48"
                  fill="none"
                  stroke="#d6b36a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Interactive Points */}
                {chartPoints.map((pt, idx) => (
                  <circle
                    key={pt.time}
                    cx={(idx / (chartPoints.length - 1)) * 1000}
                    cy={pt.y}
                    r={hoveredPoint === idx ? "6" : "3.5"}
                    fill={hoveredPoint === idx ? "#ffe1a0" : "#d6b36a"}
                    stroke="#07090d"
                    strokeWidth="2"
                    style={{ cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))}
              </svg>
            </div>

            <div className="chart-axis-labels">
              <span>09:30 UTC</span>
              <span>11:30</span>
              <span>13:30</span>
              <span>15:30</span>
              <span>17:30 UTC</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Community & Benefits Section ── */}
      <section id="community" className="section-wrapper benefits">
        <div className="benefits-grid">
          <Reveal direction="left">
            <div className="benefit-media">
              <img
                src="/element_signature-.jpeg"
                alt="Gold signature structure illustrating thoughtful trading philosophy"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal direction="right">
            <div>
              <div className="section-intro" style={{ marginBottom: 24 }}>
                <span className="eyebrow">WHY PRINTFOREX</span>
                <h2>Learn with deliberate intent.</h2>
                <p className="copy">
                  The financial markets do not reward louder opinions. They reward
                  humility, emotional neutrality, and continuous refinement of edge.
                </p>
              </div>

              <div className="benefit-checklist">
                {[
                  "Structured, non-speculative educational archives",
                  "Daily contextual session analysis and liquidity notes",
                  "Evidence-backed risk budgeting & capital management",
                  "Vetted peer network focused on mastery over gambling",
                ].map((item) => (
                  <div key={item} className="checklist-item">
                    <span className="checklist-arrow">↗</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a href={site.communityUrl} className="button">
                <span>Become part of the community</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The Learning Journey ── */}
      <section className="section-wrapper journey">
        <Reveal>
          <div className="section-intro">
            <span className="eyebrow">THE ROADMAP</span>
            <h2>Start with a considered first step.</h2>
            <p className="copy">
              A transparent progression path designed to protect capital before seeking growth.
            </p>
          </div>
        </Reveal>

        <div className="journey-steps">
          {[
            {
              step: "01",
              title: "Admissions",
              desc: "Request access and complete your onboarding survey to align with community rules.",
            },
            {
              step: "02",
              title: "Foundations",
              desc: "Study the foundational market anatomy modules and pass the risk management assessment.",
            },
            {
              step: "03",
              title: "Simulated Execution",
              desc: "Deploy frameworks in forward-testing demo environments to build statistical conviction.",
            },
            {
              step: "04",
              title: "Deliberate Practice",
              desc: "Transition into live markets with conservative capital allocation and peer feedback.",
            },
          ].map((item, index) => (
            <Reveal key={item.step} delay={index * 0.08}>
              <article className="journey-step-card">
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FAQ Section (Accessible Accordion) ── */}
      <section id="faq" className="section-wrapper faq">
        <Reveal>
          <div className="section-intro" style={{ textAlign: "center", margin: "0 auto 56px" }}>
            <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
            <h2>A clear place to begin.</h2>
            <p className="copy" style={{ margin: "16px auto 0" }}>
              Straightforward answers to how our community operates and what to expect.
            </p>
          </div>
        </Reveal>

        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={faq.q} className="faq-item">
              <button
                className="faq-trigger"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`faq-chevron ${openFaq === idx ? "open" : ""}`}
                  size={18}
                />
              </button>
              {openFaq === idx && (
                <div className="faq-content">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Final Call to Action (Inverted Gold Section) ── */}
      <section id="join" className="final-cta">
        <div className="final-cta-ring" />
        <Reveal>
          <h2>
            Your next step starts with <em>knowledge.</em>
          </h2>
          <p>
            Join a collective of disciplined traders committed to structure,
            risk management, and long-term financial mastery.
          </p>
          <div className="final-actions">
            <a href={site.communityUrl} className="button final-btn">
              <span>Join our community</span>
              <ArrowUpRight size={15} />
            </a>
            <a href={`mailto:${site.contact}`} className="contact-link">
              <span>Speak with our desk</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#top" className="logo">
              <div className="logo-icon" />
              <span>{site.name}</span>
            </a>
            <p>{site.description}</p>
          </div>

          <div className="footer-col">
            <b>Navigation</b>
            {site.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <b>Community</b>
            <a href="#join">Join the community</a>
            <a href={`mailto:${site.contact}`}>{site.contact}</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="footer-col">
            <b>Principles</b>
            <a href="#about">Education First</a>
            <a href="#methodology">Risk Protocol</a>
            <a href="/risk-disclaimer">Risk Disclaimer</a>
          </div>
        </div>

        <div className="footer-disclaimer">
          <p>{site.disclaimer}</p>
        </div>

        <div className="footer-bottom">
          <span>© 2026 {site.name}. All rights reserved.</span>
          <div className="footer-legal-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/risk-disclaimer">Risk Disclaimer</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
