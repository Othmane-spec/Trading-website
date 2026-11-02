"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import {
  TrendingUp,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Check,
  ChevronDown,
  Loader2,
  Users,
  GraduationCap,
  BarChart3,
  Zap,
} from "lucide-react";
import { site } from "@/config/site";
import { TiltCard } from "@/components/ui/TiltCard";

export default function Home() {
  const prefersReduced = useReducedMotion();

  // Navigation & Interactive states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeAnalysisTf, setActiveAnalysisTf] = useState("H1");
  const [activeAnalysisPoint, setActiveAnalysisPoint] = useState<number | null>(null);

  // Modal Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    phone: "",
    city: "",
    country: "",
    experience: "Beginner",
    consent: false,
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalOpen]);

  const openModal = () => {
    setFormSuccess(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setFormSuccess(false);
    }, 300);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API registration request
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
    }, 700);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const cleanPhone = site.whatsapp?.phoneNumber?.replace(/[^0-9]/g, "") || "1234567890";
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    site.whatsapp?.message || "Hello PRINTFOREX, I would like to learn more about your community."
  )}`;

  const faqs = [
    {
      q: "What is PRINTFOREX?",
      a: "PRINTFOREX is an institutional-grade trading education community and analytical research platform. We provide comprehensive educational material, market structure analysis, daily setups, and discipline coaching to help individuals understand foreign exchange markets responsibly.",
    },
    {
      q: "Who is this community designed for?",
      a: "Our community is built for ambitious individuals at all levels—from complete novices who want to learn how financial markets work from the ground up, to intermediate traders seeking structured institutional execution frameworks and risk discipline.",
    },
    {
      q: "What services and resources are included?",
      a: "Members gain access to daily market technicals, currency and gold scenario planning, educational modules on liquidity and order blocks, Telegram discussion groups, and step-by-step risk management calculators.",
    },
    {
      q: "Do I need previous financial experience to join?",
      a: "No. No previous experience is required. We structure our onboarding pathways to take beginners through terminology, charting software setup, and fundamental concepts before introducing advanced market setups.",
    },
    {
      q: "How do I get started with PRINTFOREX?",
      a: "Simply click on 'Join Our Community' anywhere on this page, fill out the simple registration form with your experience level, and you will receive instant redirection to our official Telegram channel and direct support concierge.",
    },
    {
      q: "Are trading signals guaranteed profits?",
      a: "No. In financial markets, no profits can ever be guaranteed. Our signals and setups represent high-probability technical interpretations paired with strict risk parameters. We emphasize that every trade entails real financial risk.",
    },
    {
      q: "What is your risk management approach?",
      a: "We advocate risking no more than 1% to 2% of total account capital per idea, strictly defining stop losses before entering any position, and maintaining asymmetric Risk-to-Reward parameters of at least 1:2 or higher.",
    },
    {
      q: "How can I reach out to the PRINTFOREX support team?",
      a: "You can reach our team immediately via the WhatsApp floating button at the bottom-right of your screen, through our Telegram official handle, or by completing the registration form.",
    },
  ];

  // Motion animation presets
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-brand-void text-[#F5F5F2] font-sans antialiased selection:bg-brand-gold selection:text-black overflow-x-hidden custom-scrollbar">
      {/* ── BEGIN: StickyNavBar ── */}
      <header
        className="sticky top-0 z-40 w-full backdrop-blur-xl bg-brand-void/85 border-b border-brand-border/60 transition-all duration-300"
        data-purpose="site-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="#hero" className="flex items-center gap-3 group">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-elevated to-brand-card border border-brand-gold/40 flex items-center justify-center p-2 shadow-gold-sm group-hover:border-brand-gold transition duration-300"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <TrendingUp className="w-full h-full text-brand-gold" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-white flex items-center gap-1.5">
                PRINT<span className="text-brand-gold">FOREX</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-brand-slateText font-medium">
                Trading Education &amp; Community
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav
            aria-label="Main Links"
            className="hidden md:flex items-center space-x-7 text-sm font-medium text-brand-slateText"
          >
            {site.nav.map((item) => (
              <a
                key={item.href}
                className="hover:text-brand-gold transition-colors duration-200 relative group py-1"
                href={item.href}
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Primary Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <motion.button
              aria-label="Join PRINTFOREX Community Modal"
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-brand-gold/60 cursor-pointer hover:shadow-gold-glow transition-all duration-300"
              onClick={openModal}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-brand-goldLight via-brand-gold to-brand-goldDark transition-all duration-300" />
              <span className="relative px-5 py-2.5 rounded-full bg-brand-void text-xs sm:text-sm font-semibold text-brand-goldLight flex items-center gap-2 group-hover:bg-transparent group-hover:text-black transition-all duration-300">
                <span>Join Our Community</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:text-black" />
              </span>
            </motion.button>

            {/* Mobile Menu Hamburger */}
            <button
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 rounded-lg bg-brand-card border border-brand-border text-brand-slateText hover:text-white cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="md:hidden border-b border-brand-border/60 bg-brand-dark/95 backdrop-blur-xl px-4 py-5 space-y-3 overflow-hidden"
            >
              <div className="flex flex-col space-y-3 text-sm font-medium text-brand-slateText">
                {site.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="hover:text-brand-gold py-1 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <button
                className="w-full mt-2 py-3 rounded-xl gold-gradient-bg text-black font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal();
                }}
              >
                <span>Join Our Community</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* ── END: StickyNavBar ── */}

      <main>
        {/* ── BEGIN: HeroSection ── */}
        <section
          className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 lg:py-24 bg-grid-pattern"
          data-purpose="hero-experience"
          id="hero"
        >
          {/* Ambient Lighting Blooms with Gentle Pulse */}
          <motion.div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[500px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none"
            animate={
              prefersReduced
                ? undefined
                : {
                    scale: [1, 1.08, 1],
                    opacity: [0.12, 0.18, 0.12],
                  }
            }
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"
            animate={
              prefersReduced
                ? undefined
                : {
                    scale: [1, 1.12, 1],
                    opacity: [0.06, 0.1, 0.06],
                  }
            }
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Hero Left Column: Narrative Content */}
              <motion.div
                className="lg:col-span-7 flex flex-col items-start text-left space-y-7"
                initial={prefersReduced ? undefined : "hidden"}
                animate={prefersReduced ? undefined : "visible"}
                variants={staggerContainer}
              >
                {/* Eyebrow Badge */}
                <motion.div
                  variants={fadeInUp}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-card/90 border border-brand-gold/30 shadow-sm backdrop-blur-md"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                  <span className="text-xs uppercase font-semibold tracking-wider text-brand-goldLight">
                    Discipline · Knowledge · Strategy
                  </span>
                </motion.div>

                {/* Big Headline */}
                <motion.h1
                  variants={fadeInUp}
                  className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]"
                >
                  Think Beyond <br className="hidden sm:block" />
                  <span className="gold-gradient-text">The Market.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={fadeInUp}
                  className="text-base sm:text-lg text-brand-slateText max-w-xl font-normal leading-relaxed"
                >
                  A premier trading ecosystem built on institutional market structure, rigorous risk
                  awareness, and continuous education. Stop chasing noise; master execution.
                </motion.p>

                {/* CTA Cluster */}
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
                >
                  <motion.button
                    className="px-7 py-4 rounded-xl gold-gradient-bg text-black font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-gold-glow hover:brightness-110 active:scale-95 transition duration-200 cursor-pointer"
                    onClick={openModal}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Join Our Community</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </motion.button>
                  <motion.a
                    className="px-7 py-4 rounded-xl bg-brand-card/80 hover:bg-brand-elevated border border-brand-border hover:border-brand-gold/40 text-brand-slateText hover:text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
                    href="#services"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Explore Our Services</span>
                  </motion.a>
                </motion.div>

                {/* Trust Badge Line */}
                <motion.div
                  variants={fadeInUp}
                  className="pt-4 flex flex-wrap items-center gap-6 text-xs text-brand-slateText border-t border-brand-border/40 w-full"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-gold" />
                    <span>Strict Risk Management Focus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-success" />
                    <span>Daily Institutional Technicals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-gold" />
                    <span>Interactive Telegram Support</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Hero Right Column: Interactive 3D Tilt Market Visual Sculpture */}
              <motion.div
                className="lg:col-span-5 relative flex justify-center"
                initial={prefersReduced ? undefined : { opacity: 0, scale: 0.95, y: 30 }}
                animate={prefersReduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Glow Aura */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/15 to-transparent rounded-3xl filter blur-2xl -z-10" />

                <TiltCard
                  tiltAmount={6}
                  glareEffect={true}
                  className="w-full max-w-md rounded-2xl bg-gradient-to-b from-brand-card to-brand-dark p-6 border border-brand-border/80 shadow-2xl relative overflow-hidden backdrop-blur-sm"
                >
                  {/* Golden Corner Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-xl pointer-events-none" />

                  {/* Terminal Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-border/60">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                      <span className="ml-2 font-mono text-xs text-brand-slateText">
                        PRINT_MARKET_RADAR // EURUSD
                      </span>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-brand-success/15 text-brand-success font-semibold">
                      LIVE SETUP
                    </span>
                  </div>

                  {/* Visual Simulated Market Candlestick & Bull Representation */}
                  <div className="relative py-4 flex flex-col gap-4">
                    {/* Bull Silhouette & Golden Stat Banner */}
                    <div className="relative rounded-xl p-4 bg-gradient-to-r from-brand-elevated to-brand-card border border-brand-gold/20 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-brand-goldMuted border border-brand-gold/40 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-brand-gold" />
                        </div>
                        <div>
                          <div className="text-xs text-brand-slateText uppercase tracking-wider font-semibold">
                            Bullish Invalidation
                          </div>
                          <div className="text-lg font-bold font-mono text-brand-goldLight">
                            1.08420 → 1.09650
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-brand-success bg-brand-success/10 px-2.5 py-1 rounded">
                        R:R 1:3.4
                      </span>
                    </div>

                    {/* Simulation Visual Chart Grid with radar beam animation */}
                    <div className="h-44 w-full bg-brand-void/80 rounded-xl p-3 border border-brand-border/60 flex flex-col justify-between relative overflow-hidden font-mono text-[10px]">
                      {/* Scanning vertical beam line */}
                      {!prefersReduced && (
                        <motion.div
                          className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-brand-gold to-transparent pointer-events-none opacity-40 z-20"
                          animate={{ x: [0, 270, 0] }}
                          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                        />
                      )}

                      {/* Horizontal price lines */}
                      <div className="absolute inset-x-0 top-1/4 border-b border-dashed border-brand-border/40 flex justify-end pr-2 text-brand-slateText/60">
                        1.09400 (TP2)
                      </div>
                      <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-brand-gold/30 flex justify-end pr-2 text-brand-gold/80">
                        1.08950 (OB Zone)
                      </div>
                      <div className="absolute inset-x-0 bottom-6 border-b border-dashed border-red-500/30 flex justify-end pr-2 text-red-400/70">
                        1.08380 (SL)
                      </div>

                      {/* Candlesticks simulation SVG */}
                      <svg className="w-full h-full z-10" preserveAspectRatio="none" viewBox="0 0 280 120">
                        {/* Candles */}
                        <line stroke="#334155" strokeWidth="1.5" x1="20" x2="20" y1="90" y2="40" />
                        <rect fill="#EF4444" height="25" rx="1" width="6" x="17" y="55" />

                        <line stroke="#334155" strokeWidth="1.5" x1="50" x2="50" y1="85" y2="35" />
                        <rect fill="#10B981" height="15" rx="1" width="6" x="47" y="60" />

                        <line stroke="#334155" strokeWidth="1.5" x1="80" x2="80" y1="95" y2="60" />
                        <rect fill="#EF4444" height="20" rx="1" width="6" x="77" y="70" />

                        {/* Liquidity Sweep Wick with glow */}
                        <line stroke="#D4AF37" strokeWidth="1.8" x1="110" x2="110" y1="108" y2="50" />
                        <rect fill="#10B981" height="30" rx="1" width="6" x="107" y="65" />

                        {/* Expansion impulses */}
                        <line stroke="#D4AF37" strokeWidth="1.5" x1="140" x2="140" y1="80" y2="35" />
                        <rect fill="#10B981" height="30" rx="1" width="6" x="137" y="40" />

                        <line stroke="#D4AF37" strokeWidth="1.5" x1="170" x2="170" y1="65" y2="25" />
                        <rect fill="#10B981" height="25" rx="1" width="6" x="167" y="30" />

                        <line stroke="#334155" strokeWidth="1.5" x1="200" x2="200" y1="50" y2="20" />
                        <rect fill="#EF4444" height="12" rx="1" width="6" x="197" y="32" />

                        <line stroke="#D4AF37" strokeWidth="1.5" x1="230" x2="230" y1="45" y2="10" />
                        <rect fill="#10B981" height="22" rx="1" width="6" x="227" y="15" />

                        {/* Target trend line */}
                        <path
                          d="M 20 75 Q 110 110, 230 20"
                          fill="none"
                          stroke="#D4AF37"
                          strokeDasharray="3,3"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>

                    {/* Live Metrics Footer */}
                    <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                      <div className="p-2 rounded-lg bg-brand-void/60 border border-brand-border/40">
                        <span className="block text-[10px] text-brand-slateText">SESSION</span>
                        <span className="text-xs font-semibold text-white">London / NY</span>
                      </div>
                      <div className="p-2 rounded-lg bg-brand-void/60 border border-brand-border/40">
                        <span className="block text-[10px] text-brand-slateText">BIAS</span>
                        <span className="text-xs font-semibold text-brand-success">High Liquidity</span>
                      </div>
                      <div className="p-2 rounded-lg bg-brand-void/60 border border-brand-border/40">
                        <span className="block text-[10px] text-brand-slateText">FRAME</span>
                        <span className="text-xs font-semibold text-brand-goldLight">H4 Institutional</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </section>
        {/* ── END: HeroSection ── */}

        {/* ── BEGIN: BrandPhilosophySection ── */}
        <section
          className="py-20 lg:py-28 bg-brand-dark/60 border-t border-brand-border/50 relative overflow-hidden"
          data-purpose="brand-philosophy"
          id="philosophy"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
                Our Philosophy
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
                Trading is a process, not a shortcut.
              </h2>
              <p className="mt-4 text-brand-slateText text-base sm:text-lg">
                At PRINTFOREX, we believe that understanding the markets, building disciplined daily
                habits, and prioritizing risk management are the fundamental pillars of consistent,
                long-term mastery.
              </p>
            </motion.div>

            {/* 3 Core Principles Grid with 3D Physics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: "01",
                  title: "Education First",
                  desc: "Before risking capital, understand mechanics. We break down market structure, liquidity voids, and institutional psychology so you make informed, confident choices.",
                  tagline: "Foundation over speculation",
                },
                {
                  num: "02",
                  title: "Methodical Discipline",
                  desc: "A system is useless without the execution discipline to follow it. We emphasize emotional detachment, clear trade journals, and systematic consistency over impulsive hype.",
                  tagline: "Plan the trade, trade the plan",
                },
                {
                  num: "03",
                  title: "Capital Preservation",
                  desc: "Longevity is the true competitive edge in Forex. We prioritize asymmetric risk-to-reward ratios, portfolio defense protocols, and strict drawdown controls before offense.",
                  tagline: "Protect capital at all times",
                },
              ].map((pillar, idx) => (
                <motion.div
                  key={pillar.num}
                  initial={prefersReduced ? undefined : { opacity: 0, y: 28 }}
                  whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TiltCard
                    tiltAmount={4}
                    glareEffect={true}
                    className="p-8 rounded-2xl bg-brand-card/70 border border-brand-border hover:border-brand-gold/50 transition duration-300 relative group flex flex-col justify-between h-full shadow-lg"
                  >
                    <div>
                      <div className="text-4xl font-display font-bold text-brand-gold/40 group-hover:text-brand-gold transition duration-300 mb-6">
                        {pillar.num}
                      </div>
                      <h3 className="font-display text-xl font-bold text-white mb-3">{pillar.title}</h3>
                      <p className="text-sm text-brand-slateText leading-relaxed">{pillar.desc}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-brand-border/50 flex items-center text-xs text-brand-goldLight font-medium">
                      <span>{pillar.tagline}</span>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* ── END: BrandPhilosophySection ── */}

        {/* ── BEGIN: ServicesSection ── */}
        <section
          className="py-20 lg:py-28 relative bg-brand-void overflow-hidden"
          data-purpose="services-showcase"
          id="services"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex flex-col md:flex-row md:items-end justify-between mb-16"
              initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
                  What We Offer
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
                  Everything starts with knowledge.
                </h2>
              </div>
              <p className="mt-4 md:mt-0 text-brand-slateText max-w-md text-sm sm:text-base">
                Structured services built to elevate market comprehension from initial foundations to
                advanced institutional trade execution.
              </p>
            </motion.div>

            {/* 4-Card Service Grid with Hover Spring Elevation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: GraduationCap,
                  title: "Trading Education",
                  desc: "Structured modules starting from market fundamentals, forex mechanics, price action reading, and smart money concepts.",
                  bullets: ["Complete beginner to pro track", "Institutional orderflow dynamics"],
                  cta: "Explore Syllabus →",
                },
                {
                  icon: BarChart3,
                  title: "Market Analysis",
                  desc: "Daily and weekly institutional markups across major currency pairs, indices, and gold with macroeconomic context.",
                  bullets: ["Daily London / NY open briefings", "Key liquidity pool mappings"],
                  cta: "Sample Breakdown →",
                },
                {
                  icon: Zap,
                  title: "High-Conviction Signals",
                  desc: "Curated opportunities delivered directly via Telegram with exact entry conditions, stop losses, and multi-tier take profits.",
                  bullets: ["Precise entry & invalidation", "Live execution alerts"],
                  cta: "Signal Protocol →",
                },
                {
                  icon: ShieldCheck,
                  title: "Risk Management",
                  desc: "Frameworks designed to shield trading balance against volatile market drawdowns with mathematical precision.",
                  bullets: ["Position sizing formulas", "Maximum drawdown safeguards"],
                  cta: "Risk Framework →",
                },
              ].map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
                    whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={prefersReduced ? undefined : { y: -6 }}
                    className="rounded-2xl p-6 bg-brand-card/90 border border-brand-border hover:border-brand-gold/50 transition-colors duration-300 flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-brand-goldMuted border border-brand-gold/30 flex items-center justify-center mb-6 text-brand-gold"
                        whileHover={{ scale: 1.1, rotate: 6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>
                      <h3 className="font-display text-lg font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-xs sm:text-sm text-brand-slateText leading-relaxed mb-4">
                        {service.desc}
                      </p>
                      <ul className="space-y-2 text-xs text-brand-slateText/90 mb-6 font-mono">
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-center gap-1.5">
                            <span className="text-brand-gold">✓</span> {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <motion.button
                      className="w-full py-2.5 rounded-lg border border-brand-border text-xs font-semibold text-brand-gold hover:bg-brand-gold/10 transition cursor-pointer"
                      onClick={openModal}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {service.cta}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        {/* ── END: ServicesSection ── */}

        {/* ── BEGIN: MarketAnalysisExperience ── */}
        <section
          className="py-20 bg-brand-card/30 border-y border-brand-border/60 relative overflow-hidden"
          data-purpose="market-analysis-demo"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-12"
              initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
                Actionable Intel
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
                Understand the Market Beyond the Numbers.
              </h2>
              <p className="text-xs sm:text-sm text-brand-slateText mt-3">
                Illustrative market breakdown — structured analysis identifying high-probability
                institutional footprints.
              </p>
            </motion.div>

            {/* Analytical Terminal Container */}
            <motion.div
              className="rounded-2xl bg-brand-void border border-brand-border overflow-hidden shadow-2xl"
              initial={prefersReduced ? undefined : { opacity: 0, scale: 0.98 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Terminal Toolbar */}
              <div className="bg-brand-dark px-6 py-4 border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-bold text-white">XAUUSD / GOLD</span>
                  {/* Interactive Timeframe tabs */}
                  <div className="flex items-center gap-1 bg-brand-void/80 p-1 rounded-lg border border-brand-border/50">
                    {["H1", "M15", "M5"].map((tf) => (
                      <button
                        key={tf}
                        className={`text-xs px-2.5 py-0.5 rounded font-mono transition-colors cursor-pointer ${
                          activeAnalysisTf === tf
                            ? "bg-brand-gold/20 text-brand-goldLight font-bold"
                            : "text-brand-slateText hover:text-white"
                        }`}
                        onClick={() => setActiveAnalysisTf(tf)}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-brand-slateText font-mono hidden sm:inline">
                    TREND: BULLISH BIAS
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-brand-slateText">
                    Fair Value Gap [FVG]: <strong className="text-brand-gold">ACTIVE</strong>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
                </div>
              </div>

              {/* Deep Chart Anatomy Visualization */}
              <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-brand-dark/80 rounded-xl p-5 border border-brand-border/70 relative">
                    <div className="flex justify-between items-center text-xs font-mono text-brand-slateText mb-4">
                      <span>SWING ANALYSIS (LONDON HIGH SWEEP)</span>
                      <span className="text-brand-goldLight font-bold">2,384.40 → 2,418.00</span>
                    </div>

                    {/* Graphic representation */}
                    <div className="h-56 relative bg-brand-card/40 rounded-lg p-3 border border-brand-border/40 overflow-hidden flex items-center justify-center">
                      {/* Candlesticks & Liquidity graphics */}
                      <div className="absolute inset-0 flex items-center justify-between px-6 opacity-80 pointer-events-none">
                        <motion.div
                          className="w-12 h-32 border-l border-r border-brand-gold/40 bg-brand-gold/5 flex flex-col justify-center items-center text-[10px] font-mono text-brand-gold"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span>ORDER</span>
                          <span>BLOCK</span>
                        </motion.div>
                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-60" />
                        <motion.div
                          className="w-20 h-24 border border-brand-success/50 bg-brand-success/10 rounded flex items-center justify-center text-[10px] font-mono text-brand-success text-center px-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          TARGET LIQUIDITY
                        </motion.div>
                      </div>

                      <motion.div
                        className="z-10 text-center"
                        animate={prefersReduced ? undefined : { y: [0, -3, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <span className="text-xs font-mono uppercase bg-brand-void/90 px-3 py-1.5 rounded-full border border-brand-border text-brand-slateText shadow-md">
                          Clean Liquidity Sweep + Institutional Rejection
                        </span>
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-mono">
                      {[
                        { label: "ENTRY ZONE", val: "2,392.20", color: "text-white" },
                        { label: "INVALIDATION (SL)", val: "2,386.50", color: "text-red-400" },
                        { label: "FIRST TARGET", val: "2,408.00", color: "text-brand-success" },
                        { label: "FINAL TARGET", val: "2,424.00", color: "text-brand-goldLight" },
                      ].map((item, idx) => (
                        <motion.div
                          key={item.label}
                          className="p-2.5 rounded bg-brand-void border border-brand-border/50 hover:border-brand-gold/40 transition-colors"
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className="text-brand-slateText block text-[10px]">{item.label}</span>
                          <span className={`font-bold ${item.color}`}>{item.val}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Analysis Commentary Column with Confluence Gauge Animation */}
                <div className="bg-brand-dark/90 p-6 rounded-xl border border-brand-border space-y-4">
                  <h4 className="font-display font-bold text-white text-base">Key Technical Takeaway</h4>
                  <p className="text-xs text-brand-slateText leading-relaxed">
                    Liquidity resting above previous Asian session highs was swept cleanly during
                    pre-London volatility. Price mitigated the 62% Fibonacci discount zone with immediate
                    institutional reaction.
                  </p>

                  <div className="space-y-3 pt-2 border-t border-brand-border/60 text-xs">
                    {/* Animated Confluence Meter */}
                    <div>
                      <div className="flex items-center justify-between text-brand-slateText mb-1.5">
                        <span>Confluence Score:</span>
                        <span className="font-bold text-brand-gold">9.2 / 10</span>
                      </div>
                      <div className="h-1.5 w-full bg-brand-card rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-brand-goldLight to-brand-gold"
                          initial={prefersReduced ? { width: "92%" } : { width: "0%" }}
                          whileInView={{ width: "92%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-brand-slateText">
                      <span>Calculated Risk:</span>
                      <span className="font-bold text-white">1% Portfolio Default</span>
                    </div>
                    <div className="flex items-center justify-between text-brand-slateText">
                      <span>Execution Channel:</span>
                      <span className="font-bold text-brand-goldLight">PRINTFOREX Telegram</span>
                    </div>
                  </div>

                  <motion.button
                    className="w-full mt-4 py-3 rounded-lg gold-gradient-bg text-black font-semibold text-xs text-center shadow-gold-sm hover:brightness-105 transition cursor-pointer"
                    onClick={openModal}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Access Daily Full Analysis
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        {/* ── END: MarketAnalysisExperience ── */}

        {/* ── BEGIN: MethodologySection ── */}
        <section
          className="py-20 lg:py-28 bg-brand-dark/40 relative overflow-hidden"
          data-purpose="trading-methodology"
          id="methodology"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-16"
              initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
                Methodology
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
                A structured approach to trading.
              </h2>
              <p className="mt-3 text-brand-slateText text-sm sm:text-base">
                From first principles to routine execution, every member follows a clear, repeatable
                4-phase framework.
              </p>
            </motion.div>

            {/* 4 Step Timeline with Animated Sequence */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {[
                {
                  num: "01",
                  phase: "Phase 1",
                  title: "Learn",
                  desc: "Build an institutional foundation. Master terminology, pip calculus, order types, currency correlation, and market participants.",
                  action: "Knowledge Acquisition →",
                },
                {
                  num: "02",
                  phase: "Phase 2",
                  title: "Analyse",
                  desc: "Decode market conditions before taking action. Map higher timeframe direction, mark key supply/demand imbalances and macro news releases.",
                  action: "Structural Insight →",
                },
                {
                  num: "03",
                  phase: "Phase 3",
                  title: "Plan",
                  desc: "Formulate strict scenario plans. Define exact entry triggers, stop-loss invalidation levels, multi-target take profits, and position sizes.",
                  action: "Tactical Setup →",
                },
                {
                  num: "04",
                  phase: "Phase 4",
                  title: "Manage",
                  desc: "Control the open position without emotion. Scale partials at predetermined targets, trail stops, and conduct honest trade reviews in your journal.",
                  action: "Capital Evolution →",
                },
              ].map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
                  whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={prefersReduced ? undefined : { y: -6 }}
                  className="p-6 rounded-2xl bg-brand-card border border-brand-border hover:border-brand-gold/40 transition-colors duration-300 relative group flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold text-brand-gold font-mono text-xs font-bold flex items-center justify-center group-hover:bg-brand-gold group-hover:text-black transition-colors duration-300">
                        {step.num}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-brand-slateText">
                        {step.phase}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-brand-slateText leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-brand-border/40 text-[11px] font-mono text-brand-gold group-hover:translate-x-1 transition-transform duration-200">
                    {step.action}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* ── END: MethodologySection ── */}

        {/* ── BEGIN: CommunityTelegramSection ── */}
        <section
          className="py-20 lg:py-28 relative bg-brand-void overflow-hidden"
          data-purpose="telegram-community"
          id="community"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="rounded-3xl bg-gradient-to-r from-brand-card via-brand-dark to-brand-card border border-brand-gold/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-gold-glow"
              initial={prefersReduced ? undefined : { opacity: 0, scale: 0.98 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
            >
              {/* Atmospheric lighting */}
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-semibold text-brand-goldLight">
                    {/* Telegram paper plane icon */}
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.535-.194 1.006.128.832.925z" />
                    </svg>
                    <span>Active Telegram Hub</span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                    Learn Together. <br />
                    <span className="gold-gradient-text">Grow Through Knowledge.</span>
                  </h2>

                  <p className="text-sm sm:text-base text-brand-slateText max-w-xl leading-relaxed">
                    Connect with passionate traders who share technical breakdowns, macroeconomic
                    forecasts, and disciplined habits. Get direct access to signals, educational drops,
                    and Q&amp;A sessions.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <motion.button
                      className="px-8 py-4 rounded-xl gold-gradient-bg text-black font-bold text-sm flex items-center justify-center gap-3 shadow-gold-sm hover:brightness-110 active:scale-95 transition duration-200 cursor-pointer"
                      onClick={openModal}
                      whileHover={{ scale: 1.025 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.535-.194 1.006.128.832.925z" />
                      </svg>
                      <span>Join Our Community</span>
                    </motion.button>

                    <motion.a
                      className="px-8 py-4 rounded-xl bg-brand-elevated border border-brand-border text-white hover:border-brand-gold/40 text-sm font-semibold flex items-center justify-center gap-3 transition cursor-pointer"
                      href={whatsappUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>Chat on WhatsApp</span>
                    </motion.a>
                  </div>
                </div>

                {/* Telegram Channel Interactive Mockup Widget */}
                <div className="lg:col-span-5">
                  <TiltCard
                    tiltAmount={4}
                    className="bg-brand-void/90 rounded-2xl border border-brand-border/90 p-5 shadow-2xl backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-brand-border/60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-goldMuted border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.535-.194 1.006.128.832.925z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">PRINTFOREX VIP Channel</div>
                          <div className="text-[11px] text-brand-slateText font-mono">
                            Members Worldwide
                          </div>
                        </div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-success animate-pulse" />
                    </div>

                    {/* Messages stream preview */}
                    <div className="space-y-3 py-4 text-xs font-sans">
                      <motion.div
                        className="bg-brand-card/80 p-3 rounded-xl border border-brand-border/40"
                        whileHover={{ scale: 1.015 }}
                      >
                        <div className="flex justify-between items-center text-[10px] text-brand-gold font-mono mb-1">
                          <span>DAILY RECAP</span>
                          <span>08:15 GMT</span>
                        </div>
                        <p className="text-white/90">
                          EUR/USD reaction at 1.0895 order block reached TP1 (+42 pips). Move stop-loss to
                          entry (breakeven). Let remaining volume run into New York session.
                        </p>
                      </motion.div>

                      <motion.div
                        className="bg-brand-card/80 p-3 rounded-xl border border-brand-border/40"
                        whileHover={{ scale: 1.015 }}
                      >
                        <div className="flex justify-between items-center text-[10px] text-brand-goldLight font-mono mb-1">
                          <span>EDUCATIONAL DROP</span>
                          <span>13:40 GMT</span>
                        </div>
                        <p className="text-white/90">
                          New video walkthrough uploaded: &quot;Recognizing Premium vs. Discount Pricing
                          in London Open Swings.&quot;
                        </p>
                      </motion.div>
                    </div>

                    <div className="pt-2">
                      <div className="p-2.5 rounded-lg bg-brand-elevated border border-brand-border flex items-center justify-between text-xs font-mono text-brand-slateText">
                        <span>Instant access on registration</span>
                        <span className="text-brand-gold font-bold">100% Free</span>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        {/* ── END: CommunityTelegramSection ── */}

        {/* ── BEGIN: FaqSection ── */}
        <section
          className="py-20 lg:py-28 bg-brand-dark/30 border-t border-brand-border/40 relative overflow-hidden"
          data-purpose="faq-accordion"
          id="faq"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
                Clarifications
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-brand-slateText text-sm sm:text-base">
                Transparent answers to everything you need to know about joining and learning with
                PRINTFOREX.
              </p>
            </motion.div>

            {/* Accordion Container with AnimatePresence */}
            <div className="space-y-4" id="faq-accordion-group">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <motion.div
                    key={faq.q}
                    className="rounded-xl bg-brand-card border border-brand-border/80 overflow-hidden transition-colors"
                    data-purpose="faq-item"
                    initial={prefersReduced ? undefined : { opacity: 0, y: 15 }}
                    whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                  >
                    <button
                      aria-expanded={isOpen}
                      className="w-full px-6 py-5 text-left font-display font-semibold text-white flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                      onClick={() => toggleFaq(index)}
                      type="button"
                    >
                      <span className="text-base sm:text-lg">{faq.q}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ChevronDown className="w-5 h-5 text-brand-gold" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 text-sm text-brand-slateText leading-relaxed pb-5 border-t border-brand-border/40 pt-4">
                            <p>{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        {/* ── END: FaqSection ── */}

        {/* ── BEGIN: FinalCtaSection ── */}
        <section
          className="py-20 lg:py-28 relative bg-brand-void overflow-hidden"
          data-purpose="final-conversion-callout"
        >
          {/* Glow Background Elements with Gentle Breathing */}
          <motion.div
            className="absolute inset-0 bg-radial from-brand-gold/15 via-transparent to-transparent opacity-60 pointer-events-none"
            animate={
              prefersReduced
                ? undefined
                : {
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }
            }
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-brand-card to-brand-void border border-brand-gold/40 shadow-gold-glow"
              initial={prefersReduced ? undefined : { opacity: 0, y: 30 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65 }}
            >
              <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
                Start Your Journey
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-4 tracking-tight">
                Ready to Take the Next Step?
              </h2>
              <p className="mt-4 text-brand-slateText text-base sm:text-lg max-w-2xl mx-auto">
                Discover our community, explore institutional services, and connect with fellow traders
                committed to disciplined longevity.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  className="w-full sm:w-auto px-8 py-4 rounded-xl gold-gradient-bg text-black font-bold text-base shadow-gold-sm hover:brightness-110 active:scale-95 transition cursor-pointer"
                  onClick={openModal}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Join Our Community →
                </motion.button>
                <motion.a
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-elevated border border-brand-border hover:border-brand-gold/50 text-white font-medium text-base flex items-center justify-center gap-2.5 transition cursor-pointer"
                  href={whatsappUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Talk to Us on WhatsApp</span>
                </motion.a>
              </div>
              <p className="text-[11px] text-brand-slateText/70 font-mono mt-6">
                Instant Access · No Credit Card Required · Active Global Community
              </p>
            </motion.div>
          </div>
        </section>
        {/* ── END: FinalCtaSection ── */}
      </main>

      {/* ── BEGIN: MainFooter ── */}
      <footer
        className="bg-brand-void border-t border-brand-border/60 py-16 text-brand-slateText text-sm"
        data-purpose="global-footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-card border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="font-display font-bold text-xl text-white">
                  PRINT<span className="text-brand-gold">FOREX</span>
                </span>
              </div>
              <p className="text-xs text-brand-slateText max-w-sm leading-relaxed">
                Trading education and community dedicated to empowering traders through disciplined
                execution, rigorous risk management, and structural market literacy.
              </p>
              <div className="text-xs font-mono text-brand-gold">Think Beyond the Market.</div>
            </div>

            {/* Links Column 1: Ecosystem */}
            <div>
              <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider mb-4">
                Ecosystem
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a className="hover:text-brand-gold transition" href="#services">
                    Trading Academy
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-gold transition" href="#services">
                    Market Analysis
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-gold transition" href="#services">
                    High-Probability Signals
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-gold transition" href="#services">
                    Risk Architecture
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Column 2: Community */}
            <div>
              <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider mb-4">
                Community
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a className="hover:text-brand-gold transition" href="#community">
                    Telegram VIP Channel
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-brand-gold transition"
                    href={whatsappUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    WhatsApp Concierge
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-gold transition" href="#methodology">
                    Our Methodology
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-gold transition" href="#faq">
                    FAQ Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Column 3: Legal & Security */}
            <div>
              <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider mb-4">
                Compliance
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link className="hover:text-brand-gold transition" href="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-brand-gold transition" href="/terms">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-brand-gold transition" href="/risk-disclaimer">
                    Risk Disclosure
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-brand-gold transition" href="/risk-disclaimer">
                    Affiliate Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Regulatory Risk Disclaimer */}
          <div className="pt-8 border-t border-brand-border/40 text-[11px] leading-relaxed text-brand-slateText/70 space-y-3">
            <p>
              <strong>High Risk Disclaimer:</strong> Foreign exchange trading (Forex) and CFDs carry a
              high level of risk and may not be suitable for all investors. The high degree of leverage
              can work against you as well as for you. Before deciding to trade foreign exchange, you
              should carefully consider your investment objectives, level of experience, and risk appetite.
              There is a possibility that you could sustain a loss of some or all of your initial
              investment. PRINTFOREX provides strictly educational resources and market information;
              nothing contained herein shall be construed as financial advice or an investment
              recommendation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-brand-border/20 text-xs">
              <div>© 2026 PRINTFOREX. All rights reserved.</div>
              <div className="font-mono text-[10px] text-brand-slateText/60">
                DISCIPLINE · KNOWLEDGE · INTEGRITY
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* ── END: MainFooter ── */}

      {/* ── BEGIN: InteractiveRegistrationModal with AnimatePresence ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            aria-labelledby="modal-headline"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            data-purpose="user-conversion-modal"
            role="dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              className="w-full max-w-xl bg-brand-dark rounded-2xl border border-brand-gold/40 shadow-gold-glow overflow-hidden relative flex flex-col max-h-[92vh]"
              id="modal-box"
              initial={{ scale: 0.94, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 15, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close Button */}
              <button
                aria-label="Close Modal"
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-brand-elevated border border-brand-border text-brand-slateText hover:text-white flex items-center justify-center transition cursor-pointer"
                onClick={closeModal}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Scrollable Form Container */}
              <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                {!formSuccess ? (
                  /* VIEW 1: REGISTRATION FORM */
                  <div id="modal-form-view">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="font-display font-bold text-base text-brand-gold tracking-wider">
                          PRINT<span className="text-white">FOREX</span>
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white" id="modal-headline">
                        Join Our Community
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-slateText mt-1">
                        Tell us a little about yourself and become part of the PRINTFOREX trading community.
                      </p>
                    </div>

                    <form className="space-y-4 text-xs" onSubmit={handleFormSubmit}>
                      {/* Row: Full Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-medium text-white mb-1" htmlFor="fullName">
                            Full Name <span className="text-brand-gold">*</span>
                          </label>
                          <input
                            className="w-full rounded-lg bg-brand-card border border-brand-border text-white text-xs px-3.5 py-2.5 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
                            id="fullName"
                            placeholder="e.g. John Doe"
                            required
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-white mb-1" htmlFor="email">
                            Email Address <span className="text-brand-gold">*</span>
                          </label>
                          <input
                            className="w-full rounded-lg bg-brand-card border border-brand-border text-white text-xs px-3.5 py-2.5 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
                            id="email"
                            placeholder="name@example.com"
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Row: Age & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-medium text-white mb-1" htmlFor="age">
                            Age <span className="text-brand-gold">*</span>
                          </label>
                          <input
                            className="w-full rounded-lg bg-brand-card border border-brand-border text-white text-xs px-3.5 py-2.5 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
                            id="age"
                            max="100"
                            min="18"
                            placeholder="18+"
                            required
                            type="number"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-white mb-1" htmlFor="phone">
                            Phone Number <span className="text-brand-gold">*</span>
                          </label>
                          <input
                            className="w-full rounded-lg bg-brand-card border border-brand-border text-white text-xs px-3.5 py-2.5 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
                            id="phone"
                            placeholder="+1 (555) 000-0000"
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Row: City & Country */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-medium text-white mb-1" htmlFor="city">
                            City <span className="text-brand-gold">*</span>
                          </label>
                          <input
                            className="w-full rounded-lg bg-brand-card border border-brand-border text-white text-xs px-3.5 py-2.5 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
                            id="city"
                            placeholder="Your City"
                            required
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-white mb-1" htmlFor="country">
                            Country <span className="text-brand-gold">*</span>
                          </label>
                          <select
                            className="w-full rounded-lg bg-brand-card border border-brand-border text-white text-xs px-3.5 py-2.5 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition cursor-pointer"
                            id="country"
                            required
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          >
                            <option disabled value="">
                              Select country
                            </option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="France">France</option>
                            <option value="Morocco">Morocco</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="Canada">Canada</option>
                            <option value="Germany">Germany</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Other">Other Country</option>
                          </select>
                        </div>
                      </div>

                      {/* Experience Level Selectors */}
                      <div>
                        <label className="block font-medium text-white mb-2">
                          Trading Experience Level <span className="text-brand-gold">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { val: "Beginner", title: "Beginner", desc: "Just getting started" },
                            { val: "Intermediate", title: "Intermediate", desc: "Some live trades" },
                            { val: "Advanced", title: "Advanced", desc: "Active consistency" },
                            { val: "Professional", title: "Professional", desc: "Prop firm / full-time" },
                          ].map((item) => (
                            <label
                              key={item.val}
                              className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition ${
                                formData.experience === item.val
                                  ? "border-brand-gold bg-brand-elevated"
                                  : "border-brand-border bg-brand-card hover:border-brand-gold/50"
                              }`}
                            >
                              <input
                                checked={formData.experience === item.val}
                                className="text-brand-gold focus:ring-brand-gold cursor-pointer"
                                name="experience"
                                type="radio"
                                value={item.val}
                                onChange={() => setFormData({ ...formData, experience: item.val })}
                              />
                              <div className="ml-2.5">
                                <span className="block text-white font-medium">{item.title}</span>
                                <span className="block text-[10px] text-brand-slateText">{item.desc}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Legal Agreement Checkbox */}
                      <div className="flex items-start gap-2 pt-2">
                        <input
                          checked={formData.consent}
                          className="mt-0.5 rounded border-brand-border bg-brand-card text-brand-gold focus:ring-brand-gold cursor-pointer"
                          id="consent"
                          required
                          type="checkbox"
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        />
                        <label
                          className="text-[11px] text-brand-slateText leading-tight cursor-pointer"
                          htmlFor="consent"
                        >
                          I agree to the{" "}
                          <Link className="text-brand-goldLight underline" href="/privacy">
                            Privacy Policy
                          </Link>{" "}
                          and consent to PRINTFOREX processing my contact info to manage community
                          registration and direct updates. *
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-3">
                        <motion.button
                          className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-sm shadow-gold-sm hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
                          disabled={isSubmitting}
                          id="submit-btn"
                          type="submit"
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 text-black animate-spin" />
                              <span>Processing Registration...</span>
                            </>
                          ) : (
                            <>
                              <span>Join Our Community</span>
                              <ArrowRight className="w-4 h-4 text-black" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </div>
                ) : (
                  /* VIEW 2: SUCCESS VIEW with Spring Animation */
                  <div className="text-center py-6" id="modal-success-view">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-brand-success/20 border-2 border-brand-success mx-auto flex items-center justify-center text-brand-success mb-5"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <Check className="w-8 h-8" />
                    </motion.div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      Welcome to PRINTFOREX!
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-slateText max-w-sm mx-auto mt-2 leading-relaxed">
                      Your registration has been successfully confirmed. You are now cleared to join our
                      private Telegram channel and access analysis setups.
                    </p>
                    <div className="mt-8 space-y-3">
                      <motion.a
                        className="w-full py-3.5 px-6 rounded-xl gold-gradient-bg text-black font-bold text-sm flex items-center justify-center gap-2 shadow-gold-sm hover:brightness-110 transition cursor-pointer"
                        href={site.telegramUrl || "https://t.me/"}
                        rel="noopener noreferrer"
                        target="_blank"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.535-.194 1.006.128.832.925z" />
                        </svg>
                        <span>Join Our Telegram Community →</span>
                      </motion.a>
                      <motion.a
                        className="w-full py-3 px-6 rounded-xl bg-brand-elevated border border-brand-border text-white text-xs font-semibold hover:border-brand-gold/40 flex items-center justify-center gap-2 transition cursor-pointer"
                        href={whatsappUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Talk to Our Team on WhatsApp</span>
                      </motion.a>
                    </div>
                    <button
                      className="mt-6 text-xs text-brand-slateText hover:text-white underline transition cursor-pointer"
                      onClick={closeModal}
                    >
                      Close Window
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ── END: InteractiveRegistrationModal ── */}
    </div>
  );
}
