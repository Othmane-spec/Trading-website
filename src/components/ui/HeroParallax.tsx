"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight, Activity, ShieldCheck, Compass } from "lucide-react";
import { site } from "@/config/site";

export function HeroParallax() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Raw mouse coordinates normalized from -1 to 1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for fluid inertia
  const springConfig = { damping: 25, stiffness: 140, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Scroll-driven transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Layer 1: Background grid & aura
  const scrollBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const mouseBgX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const mouseBgY = useTransform(smoothY, [-1, 1], [-18, 18]);

  // Layer 2: Copy & typography
  const scrollTextY = useTransform(scrollYProgress, [0, 1], ["0%", "65%"]);
  const scrollTextOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const mouseTextX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const mouseTextY = useTransform(smoothY, [-1, 1], [-8, 8]);

  // Layer 3: Central 3D Visual Art
  const scrollArtY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const scrollArtScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const mouseArtX = useTransform(smoothX, [-1, 1], [-32, 32]);
  const mouseArtY = useTransform(smoothY, [-1, 1], [-32, 32]);
  const artRotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const artRotateY = useTransform(smoothX, [-1, 1], [-10, 10]);

  // Layer 4: Floating interactive telemetry cards
  const card1X = useTransform(smoothX, [-1, 1], [42, -42]);
  const card1Y = useTransform(smoothY, [-1, 1], [30, -30]);
  const scrollCard1Y = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);

  const card2X = useTransform(smoothX, [-1, 1], [-38, 38]);
  const card2Y = useTransform(smoothY, [-1, 1], [-25, 25]);
  const scrollCard2Y = useTransform(scrollYProgress, [0, 1], ["0%", "115%"]);

  const card3X = useTransform(smoothX, [-1, 1], [22, -22]);
  const card3Y = useTransform(smoothY, [-1, 1], [-35, 35]);
  const scrollCard3Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Map from [0, 1] to [-1, 1]
    mouseX.set(x * 2 - 1);
    mouseY.set(y * 2 - 1);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      id="top"
      className="hero parallax-wrapper"
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
    >
      {/* ── Background Grid & Depth Radiance ── */}
      <motion.div
        className="hero-grid parallax-layer"
        style={{
          x: prefersReduced ? 0 : mouseBgX,
          y: prefersReduced ? 0 : isMounted ? scrollBgY : 0,
        }}
      />
      <div className="hero-radial-aura" />

      {/* ── Editorial Axis: Hero Copy & CTA ── */}
      <motion.div
        className="hero-copy parallax-layer"
        style={{
          x: prefersReduced ? 0 : mouseTextX,
          y: prefersReduced ? 0 : isMounted ? scrollTextY : 0,
          opacity: prefersReduced ? 1 : isMounted ? scrollTextOpacity : 1,
        }}
      >
        <div className="hero-pretitle">
          <span className="live-dot" />
          <span>Independent Trading Architecture</span>
        </div>

        <h1 className="hero-headline">
          Serious market <br />
          <em>education.</em>
        </h1>

        <p className="lead">
          PRINTFOREX is a quiet, risk-aware community for operators who study
          market structure, build disciplined habits, and quantify uncertainty
          before committing capital.
        </p>

        <div className="hero-buttons">
          <a href={site.communityUrl} className="button primary-btn">
            <span>Join our community</span>
            <ArrowUpRight size={15} />
          </a>
          <a href="#services" className="button ghost">
            <span>Explore syllabus</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="hero-metrics-strip">
          <div className="metric-pill">
            <span className="pill-dot" />
            <span>Process over prediction</span>
          </div>
          <div className="metric-sep">/</div>
          <div className="metric-pill">
            <span>Strict risk parameters</span>
          </div>
          <div className="metric-sep">/</div>
          <div className="metric-pill">
            <span>No get-rich theatrics</span>
          </div>
        </div>
      </motion.div>

      {/* ── Interactive 3D Parallax Stage ── */}
      <div className="hero-stage parallax-layer">
        <motion.div
          className="hero-art-container"
          style={{
            x: prefersReduced ? 0 : mouseArtX,
            y: prefersReduced ? 0 : isMounted ? scrollArtY : 0,
            scale: prefersReduced ? 1 : isMounted ? scrollArtScale : 1,
            rotateX: prefersReduced ? 0 : artRotateX,
            rotateY: prefersReduced ? 0 : artRotateY,
            transformPerspective: 1200,
          }}
        >
          {/* Main 3D Sculpture Image */}
          <div className="hero-image-frame">
            <img
              src="/3D_hero.jpeg"
              alt="Sculptural golden flow representing disciplined market structure"
              className="hero-3d-image"
              loading="eager"
            />
            <div className="hero-image-shine" />
          </div>

          {/* Floating Telemetry Card 1 - Top Right */}
          <motion.div
            className="float-card insight-card"
            style={{
              x: prefersReduced ? 0 : card1X,
              y: prefersReduced ? 0 : isMounted ? scrollCard1Y : 0,
            }}
          >
            <div className="card-header">
              <Compass size={14} className="card-icon" />
              <span>FRAMEWORK</span>
            </div>
            <b>Understand market structure</b>
            <p>Liquidity pools & systematic invalidation levels</p>
          </motion.div>

          {/* Floating Telemetry Card 2 - Bottom Left */}
          <motion.div
            className="float-card risk-card"
            style={{
              x: prefersReduced ? 0 : card2X,
              y: prefersReduced ? 0 : isMounted ? scrollCard2Y : 0,
            }}
          >
            <div className="card-header">
              <ShieldCheck size={14} className="card-icon" />
              <span>CAPITAL CONTROL</span>
            </div>
            <b>Plan before execution</b>
            <p>Pre-calculated R:R ratios & position sizing rules</p>
          </motion.div>

          {/* Floating Telemetry Card 3 - Subtle Live Data Badge */}
          <motion.div
            className="float-card telemetry-card"
            style={{
              x: prefersReduced ? 0 : card3X,
              y: prefersReduced ? 0 : isMounted ? scrollCard3Y : 0,
            }}
          >
            <div className="telemetry-row">
              <Activity size={13} className="telemetry-pulse" />
              <span className="telemetry-label">DISCIPLINE INDEX</span>
              <span className="telemetry-val">99.4%</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient bottom gradient cut */}
      <div className="hero-bottom-cut" />
    </section>
  );
}

