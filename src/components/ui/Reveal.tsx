"use client";
import { motion, useReducedMotion } from "motion/react";
import React from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.7,
  className,
  style,
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 28 : 0,
      x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={reduce ? undefined : variants}
      transition={{
        duration: reduce ? 0 : duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      style={{ display: "inline-block", overflow: "hidden" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduce ? 0 : 0.01, delay }}
    >
      <motion.span
        style={{ display: "inline-block" }}
        initial={{ y: reduce ? 0 : "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: reduce ? 0 : 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export function StaggerChildren({
  children,
  stagger = 0.08,
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        staggerChildren: reduce ? 0 : stagger,
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: reduce ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
