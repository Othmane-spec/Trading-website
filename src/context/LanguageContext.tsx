"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "fr" | "ar";

export interface Translations {
  nav: {
    about: string;
    philosophy: string;
    services: string;
    methodology: string;
    community: string;
    faq: string;
    joinCommunity: string;
  };
  ticker: {
    liveMarkets: string;
    live: string;
    goldLabel: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustRisk: string;
    trustDaily: string;
    trustTelegram: string;
    cardRadarTitle: string;
    cardLiveSetup: string;
    cardBullishInvalidation: string;
    cardSession: string;
    cardBias: string;
    cardBiasValue: string;
    cardFrame: string;
    cardFrameValue: string;
  };
  philosophy: {
    tag: string;
    title: string;
    subtitle: string;
    pillars: Array<{
      num: string;
      title: string;
      desc: string;
      tagline: string;
    }>;
  };
  services: {
    tag: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      desc: string;
      bullets: string[];
      cta: string;
    }>;
  };
  analysis: {
    tag: string;
    title: string;
    subtitle: string;
    asset: string;
    trend: string;
    fvg: string;
    active: string;
    swingHigh: string;
    orderBlock: string;
    targetLiquidity: string;
    sweepBadge: string;
    entryZone: string;
    sl: string;
    tp1: string;
    tp2: string;
    takeawayTitle: string;
    takeawayText: string;
    confluence: string;
    risk: string;
    riskVal: string;
    channel: string;
    channelVal: string;
    cta: string;
  };
  methodology: {
    tag: string;
    title: string;
    subtitle: string;
    steps: Array<{
      num: string;
      phase: string;
      title: string;
      desc: string;
      action: string;
    }>;
  };
  community: {
    hubTag: string;
    titleLine1: string;
    titleLine2: string;
    desc: string;
    ctaTelegram: string;
    ctaWhatsApp: string;
    channelName: string;
    channelSub: string;
    recapTag: string;
    recapText: string;
    eduTag: string;
    eduText: string;
    instantAccess: string;
    freeBadge: string;
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };
  finalCta: {
    tag: string;
    title: string;
    subtitle: string;
    ctaJoin: string;
    ctaWhatsApp: string;
    guarantee: string;
  };
  footer: {
    brandDesc: string;
    motto: string;
    ecosystemTitle: string;
    academy: string;
    analysis: string;
    signals: string;
    riskArch: string;
    communityTitle: string;
    vipTelegram: string;
    whatsappConcierge: string;
    methodologyLink: string;
    faqLink: string;
    complianceTitle: string;
    privacy: string;
    terms: string;
    riskDisclosure: string;
    affiliatePolicy: string;
    adminPortal: string;
    riskNoticeTitle: string;
    riskNoticeText: string;
    rights: string;
    values: string;
  };
  whatsappButton: {
    tooltip: string;
    defaultMessage: string;
  };
  modal: {
    title: string;
    subtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    age: string;
    phone: string;
    city: string;
    cityPlaceholder: string;
    country: string;
    countrySelect: string;
    experienceTitle: string;
    experiences: {
      beginner: { title: string; desc: string };
      intermediate: { title: string; desc: string };
      advanced: { title: string; desc: string };
      professional: { title: string; desc: string };
    };
    consentText: string;
    consentLink: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    successTelegramCta: string;
    successWhatsAppCta: string;
    closeBtn: string;
    errorFallback: string;
    countries: {
      us: string;
      uk: string;
      fr: string;
      ma: string;
      ae: string;
      ca: string;
      de: string;
      ch: string;
      dz: string;
      tn: string;
      sa: string;
      qa: string;
      other: string;
    };
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: "About",
      philosophy: "Philosophy",
      services: "Services",
      methodology: "Methodology",
      community: "Community",
      faq: "FAQ",
      joinCommunity: "Join Our Community",
    },
    ticker: {
      liveMarkets: "Live Markets",
      live: "LIVE",
      goldLabel: "Gold",
    },
    hero: {
      badge: "Discipline · Knowledge · Strategy",
      titleLine1: "Think Beyond",
      titleLine2: "The Market.",
      subtitle:
        "A premier trading ecosystem built on institutional market structure, rigorous risk awareness, and continuous education. Stop chasing noise; master execution.",
      ctaPrimary: "Join Our Community",
      ctaSecondary: "Explore Our Services",
      trustRisk: "Strict Risk Management Focus",
      trustDaily: "Daily Institutional Technicals",
      trustTelegram: "Interactive Telegram Support",
      cardRadarTitle: "PRINT_MARKET_RADAR // EURUSD",
      cardLiveSetup: "LIVE SETUP",
      cardBullishInvalidation: "Bullish Invalidation",
      cardSession: "SESSION",
      cardBias: "BIAS",
      cardBiasValue: "High Liquidity",
      cardFrame: "FRAME",
      cardFrameValue: "H4 Institutional",
    },
    philosophy: {
      tag: "Our Philosophy",
      title: "Trading is a process, not a shortcut.",
      subtitle:
        "At PRINTFOREX, we believe that understanding the markets, building disciplined daily habits, and prioritizing risk management are the fundamental pillars of consistent, long-term mastery.",
      pillars: [
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
      ],
    },
    services: {
      tag: "What We Offer",
      title: "Everything starts with knowledge.",
      subtitle:
        "Structured services built to elevate market comprehension from initial foundations to advanced institutional trade execution.",
      items: [
        {
          title: "Trading Education",
          desc: "Structured modules starting from market fundamentals, forex mechanics, price action reading, and smart money concepts.",
          bullets: ["Complete beginner to pro track", "Institutional orderflow dynamics"],
          cta: "Explore Syllabus →",
        },
        {
          title: "Market Analysis",
          desc: "Daily and weekly institutional markups across major currency pairs, indices, and gold with macroeconomic context.",
          bullets: ["Daily London / NY open briefings", "Key liquidity pool mappings"],
          cta: "Sample Breakdown →",
        },
        {
          title: "High-Conviction Signals",
          desc: "Curated opportunities delivered directly via Telegram with exact entry conditions, stop losses, and multi-tier take profits.",
          bullets: ["Precise entry & invalidation", "Live execution alerts"],
          cta: "Signal Protocol →",
        },
        {
          title: "Risk Management",
          desc: "Frameworks designed to shield trading balance against volatile market drawdowns with mathematical precision.",
          bullets: ["Position sizing formulas", "Maximum drawdown safeguards"],
          cta: "Risk Framework →",
        },
      ],
    },
    analysis: {
      tag: "Actionable Intel",
      title: "Understand the Market Beyond the Numbers.",
      subtitle:
        "Illustrative market breakdown — structured analysis identifying high-probability institutional footprints.",
      asset: "XAUUSD / GOLD",
      trend: "TREND: BULLISH BIAS",
      fvg: "Fair Value Gap [FVG]:",
      active: "ACTIVE",
      swingHigh: "SWING ANALYSIS (LONDON HIGH SWEEP)",
      orderBlock: "ORDER BLOCK",
      targetLiquidity: "TARGET LIQUIDITY",
      sweepBadge: "Clean Liquidity Sweep + Institutional Rejection",
      entryZone: "ENTRY ZONE",
      sl: "INVALIDATION (SL)",
      tp1: "FIRST TARGET",
      tp2: "FINAL TARGET",
      takeawayTitle: "Key Technical Takeaway",
      takeawayText:
        "Liquidity resting above previous Asian session highs was swept cleanly during pre-London volatility. Price mitigated the 62% Fibonacci discount zone with immediate institutional reaction.",
      confluence: "Confluence Score:",
      risk: "Calculated Risk:",
      riskVal: "1% Portfolio Default",
      channel: "Execution Channel:",
      channelVal: "PRINTFOREX Telegram",
      cta: "Access Daily Full Analysis",
    },
    methodology: {
      tag: "Methodology",
      title: "A structured approach to trading.",
      subtitle:
        "From first principles to routine execution, every member follows a clear, repeatable 4-phase framework.",
      steps: [
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
      ],
    },
    community: {
      hubTag: "Active Telegram Hub",
      titleLine1: "Learn Together.",
      titleLine2: "Grow Through Knowledge.",
      desc: "Connect with passionate traders who share technical breakdowns, macroeconomic forecasts, and disciplined habits. Get direct access to signals, educational drops, and Q&A sessions.",
      ctaTelegram: "Join Our Community",
      ctaWhatsApp: "Chat on WhatsApp",
      channelName: "PRINTFOREX VIP Channel",
      channelSub: "Members Worldwide",
      recapTag: "DAILY RECAP",
      recapText:
        "EUR/USD reaction at 1.0895 order block reached TP1 (+42 pips). Move stop-loss to entry (breakeven). Let remaining volume run into New York session.",
      eduTag: "EDUCATIONAL DROP",
      eduText:
        'New video walkthrough uploaded: "Recognizing Premium vs. Discount Pricing in London Open Swings."',
      instantAccess: "Instant access on registration",
      freeBadge: "100% Free",
    },
    faq: {
      tag: "Clarifications",
      title: "Frequently Asked Questions",
      subtitle:
        "Transparent answers to everything you need to know about joining and learning with PRINTFOREX.",
      items: [
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
      ],
    },
    finalCta: {
      tag: "Start Your Journey",
      title: "Ready to Take the Next Step?",
      subtitle:
        "Discover our community, explore institutional services, and connect with fellow traders committed to disciplined longevity.",
      ctaJoin: "Join Our Community →",
      ctaWhatsApp: "Talk to Us on WhatsApp",
      guarantee: "Instant Access · No Credit Card Required · Active Global Community",
    },
    footer: {
      brandDesc:
        "Trading education and community dedicated to empowering traders through disciplined execution, rigorous risk management, and structural market literacy.",
      motto: "Think Beyond the Market.",
      ecosystemTitle: "Ecosystem",
      academy: "Trading Academy",
      analysis: "Market Analysis",
      signals: "High-Probability Signals",
      riskArch: "Risk Architecture",
      communityTitle: "Community",
      vipTelegram: "Telegram VIP Channel",
      whatsappConcierge: "WhatsApp Concierge",
      methodologyLink: "Our Methodology",
      faqLink: "FAQ Support",
      complianceTitle: "Compliance",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      riskDisclosure: "Risk Disclosure",
      affiliatePolicy: "Affiliate Policy",
      adminPortal: "Admin Portal",
      riskNoticeTitle: "High Risk Disclaimer:",
      riskNoticeText:
        "Foreign exchange trading (Forex) and CFDs carry a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade foreign exchange, you should carefully consider your investment objectives, level of experience, and risk appetite. There is a possibility that you could sustain a loss of some or all of your initial investment. PRINTFOREX provides strictly educational resources and market information; nothing contained herein shall be construed as financial advice or an investment recommendation.",
      rights: "© 2026 PRINTFOREX. All rights reserved.",
      values: "DISCIPLINE · KNOWLEDGE · INTEGRITY",
    },
    whatsappButton: {
      tooltip: "Direct WhatsApp Concierge",
      defaultMessage: "Hello PRINTFOREX, I am interested in joining your community.",
    },
    modal: {
      title: "Join Our Community",
      subtitle: "Tell us a little about yourself and become part of the PRINTFOREX trading community.",
      fullName: "Full Name",
      fullNamePlaceholder: "e.g. John Doe",
      email: "Email Address",
      emailPlaceholder: "name@example.com",
      age: "Age",
      phone: "Phone Number",
      city: "City",
      cityPlaceholder: "Your City",
      country: "Country",
      countrySelect: "Select country",
      experienceTitle: "Trading Experience Level",
      experiences: {
        beginner: { title: "Beginner", desc: "Just getting started" },
        intermediate: { title: "Intermediate", desc: "Some live trades" },
        advanced: { title: "Advanced", desc: "Active consistency" },
        professional: { title: "Professional", desc: "Prop firm / full-time" },
      },
      consentText:
        "I agree to the Privacy Policy and consent to PRINTFOREX processing my contact info to manage community registration and direct updates.",
      consentLink: "Privacy Policy",
      submit: "Join Our Community",
      submitting: "Processing Registration...",
      successTitle: "Welcome to PRINTFOREX!",
      successDesc:
        "Your registration has been successfully confirmed. You are now cleared to join our private Telegram channel and access analysis setups.",
      successTelegramCta: "Join Our Telegram Community →",
      successWhatsAppCta: "Talk to Our Team on WhatsApp",
      closeBtn: "Close Window",
      errorFallback: "An unexpected error occurred. Please try again.",
      countries: {
        us: "United States",
        uk: "United Kingdom",
        fr: "France",
        ma: "Morocco",
        ae: "United Arab Emirates",
        ca: "Canada",
        de: "Germany",
        ch: "Switzerland",
        dz: "Algeria",
        tn: "Tunisia",
        sa: "Saudi Arabia",
        qa: "Qatar",
        other: "Other Country",
      },
    },
  },
  fr: {
    nav: {
      about: "À propos",
      philosophy: "Philosophie",
      services: "Services",
      methodology: "Méthodologie",
      community: "Communauté",
      faq: "FAQ",
      joinCommunity: "Rejoindre la Communauté",
    },
    ticker: {
      liveMarkets: "Marchés en Direct",
      live: "DIRECT",
      goldLabel: "Or",
    },
    hero: {
      badge: "Discipline · Savoir · Stratégie",
      titleLine1: "Pensez au-delà",
      titleLine2: "Du Marché.",
      subtitle:
        "Un écosystème de trading d'élite fondé sur la structure de marché institutionnelle, une gestion rigoureuse du risque et une formation continue. Cessez de subir le bruit ; maîtrisez l'exécution.",
      ctaPrimary: "Rejoindre la Communauté",
      ctaSecondary: "Découvrir nos Services",
      trustRisk: "Gestion stricte du capital",
      trustDaily: "Analyses institutionnelles quotidiennes",
      trustTelegram: "Support interactif Telegram",
      cardRadarTitle: "PRINT_MARKET_RADAR // EURUSD",
      cardLiveSetup: "CONFIGURATION DIRECT",
      cardBullishInvalidation: "Invalidation Haussière",
      cardSession: "SESSION",
      cardBias: "BIAIS",
      cardBiasValue: "Forte Liquidité",
      cardFrame: "UNITÉ",
      cardFrameValue: "H4 Institutionnel",
    },
    philosophy: {
      tag: "Notre Philosophie",
      title: "Le trading est un processus, pas un raccourci.",
      subtitle:
        "Chez PRINTFOREX, nous croyons fermement que la compréhension approfondie des marchés, des habitudes quotidiennes rigoureuses et la maîtrise du risque sont les piliers indispensables d'une réussite pérenne.",
      pillars: [
        {
          num: "01",
          title: "L'Éducation d'Abord",
          desc: "Avant d'engager le moindre capital, comprenez la mécanique. Nous décortiquons la structure du marché, les zones de vide de liquidité et la psychologie institutionnelle pour des décisions éclairées.",
          tagline: "Les fondations avant la spéculation",
        },
        {
          num: "02",
          title: "Discipline Méthodique",
          desc: "Une stratégie est inutile sans la discipline stricte pour l'appliquer. Nous prônons le détachement émotionnel, un journal de bord rigoureux et une constance systématique loin de l'euphorie.",
          tagline: "Planifiez le trade, tradez le plan",
        },
        {
          num: "03",
          title: "Préservation du Capital",
          desc: "La longévité est le véritable avantage concurrentiel sur le Forex. Nous privilégions les ratios risque/rendement asymétriques, la défense du portefeuille et un contrôle strict du drawdown.",
          tagline: "Protéger le capital en toute circonstance",
        },
      ],
    },
    services: {
      tag: "Notre Offre",
      title: "Tout commence par la connaissance.",
      subtitle:
        "Des services structurés conçus pour élever votre compréhension des marchés, des bases essentielles jusqu'à l'exécution institutionnelle avancée.",
      items: [
        {
          title: "Formation Trading",
          desc: "Des modules structurés couvrant les bases du Forex, la lecture de l'action des prix et les concepts avancés de Smart Money.",
          bullets: ["Parcours complet débutant à expert", "Dynamique des flux d'ordres institutionnels"],
          cta: "Voir le Programme →",
        },
        {
          title: "Analyses de Marché",
          desc: "Briefings quotidiens et hebdomadaires sur les paires majeures, indices et l'Or accompagnés de leur contexte macroéconomique.",
          bullets: ["Briefings d'ouverture Londres / NY", "Cartographie des zones de liquidité clés"],
          cta: "Exemple d'Analyse →",
        },
        {
          title: "Signaux Haute Conviction",
          desc: "Opportunités filtrées partagées en direct sur Telegram avec conditions d'entrée précises, stop-loss stricts et prises de bénéfices multiples.",
          bullets: ["Entrée et invalidation précises", "Alertes d'exécution en temps réel"],
          cta: "Protocole de Signal →",
        },
        {
          title: "Gestion du Risque",
          desc: "Protocoles mathématiques conçus pour protéger votre capital contre les drawdowns et la volatilité imprévisible du marché.",
          bullets: ["Formules de dimensionnement de position", "Garde-fous de perte maximale"],
          cta: "Guide de Gestion du Risque →",
        },
      ],
    },
    analysis: {
      tag: "Renseignements Concrets",
      title: "Comprendre le Marché au-delà des Chiffres.",
      subtitle:
        "Démonstration d'analyse technique — structure institutionnelle identifiant les empreintes de marché à haute probabilité.",
      asset: "XAUUSD / OR",
      trend: "TENDANCE : BIAIS HAUSSIER",
      fvg: "Fair Value Gap [FVG] :",
      active: "ACTIF",
      swingHigh: "ANALYSE DE SWING (BALAYAGE SOMMET LONDRES)",
      orderBlock: "ORDER BLOCK",
      targetLiquidity: "OBJECTIF LIQUIDITÉ",
      sweepBadge: "Balayage Net de Liquidité + Rejet Institutionnel",
      entryZone: "ZONE D'ENTRÉE",
      sl: "INVALIDATION (SL)",
      tp1: "PREMIER OBJECTIF",
      tp2: "OBJECTIF FINAL",
      takeawayTitle: "Point Clé de l'Analyse",
      takeawayText:
        "La liquidité accumulée au-dessus des sommets de la session asiatique a été balayée lors de la pré-ouverture de Londres. Le prix a réagi instantanément sur la zone de décote Fibonacci 62%.",
      confluence: "Score de Confluence :",
      risk: "Risque Calculé :",
      riskVal: "1% du Portefeuille par Défaut",
      channel: "Canal d'Exécution :",
      channelVal: "Telegram PRINTFOREX",
      cta: "Accéder à l'Analyse Quotidienne",
    },
    methodology: {
      tag: "Méthodologie",
      title: "Une approche structurée et éprouvée.",
      subtitle:
        "Des principes fondamentaux à l'exécution de routine, chaque membre suit un processus clair et reproductible en 4 phases.",
      steps: [
        {
          num: "01",
          phase: "Phase 1",
          title: "Apprendre",
          desc: "Bâtissez un socle institutionnel solide. Maîtrisez le vocabulaire, le calcul des pips, les types d'ordres et les corrélations de devises.",
          action: "Acquisition du Savoir →",
        },
        {
          num: "02",
          phase: "Phase 2",
          title: "Analyser",
          desc: "Décryptez les conditions de marché avant toute action. Identifiez les déséquilibres offre/demande et les annonces macroéconomiques.",
          action: "Vision Structurelle →",
        },
        {
          num: "03",
          phase: "Phase 3",
          title: "Planifier",
          desc: "Formulez des scénarios stricts. Définissez à l'avance les déclencheurs d'entrée, les niveaux d'invalidation et le calcul de la taille de lot.",
          action: "Configuration Tactique →",
        },
        {
          num: "04",
          phase: "Phase 4",
          title: "Gérer",
          desc: "Contrôlez vos positions sans émotion. Prenez des bénéfices partiels, sécurisez à breakeven et tenez un journal de trading rigoureux.",
          action: "Évolution du Capital →",
        },
      ],
    },
    community: {
      hubTag: "Hub Telegram Actif",
      titleLine1: "Apprenez Ensemble.",
      titleLine2: "Évoluez Grâce au Savoir.",
      desc: "Rejoignez une communauté de traders passionnés qui partagent leurs analyses, prévisions macro et discipline au quotidien. Bénéficiez d'un accès direct aux setups et sessions interactives.",
      ctaTelegram: "Rejoindre la Communauté",
      ctaWhatsApp: "Discuter sur WhatsApp",
      channelName: "Canal VIP PRINTFOREX",
      channelSub: "Membres Internationaux",
      recapTag: "RÉCAPITULATIF DU JOUR",
      recapText:
        "La réaction EUR/USD sur l'order block 1.0895 a validé le TP1 (+42 pips). Déplacez le stop-loss à breakeven et laissez courir le volume restant sur New York.",
      eduTag: "MODULE ÉDUCATIF",
      eduText:
        'Nouvelle vidéo disponible : "Identifier les Prix Premium vs Décote lors des ouvertures de Londres."',
      instantAccess: "Accès immédiat dès l'inscription",
      freeBadge: "100% Gratuit",
    },
    faq: {
      tag: "Éclaircissements",
      title: "Foire Aux Questions",
      subtitle:
        "Des réponses transparentes à toutes vos interrogations sur l'adhésion et la formation PRINTFOREX.",
      items: [
        {
          q: "Qu'est-ce que PRINTFOREX ?",
          a: "PRINTFOREX est une communauté de formation au trading et une plateforme de recherche analytique institutionnelle. Nous proposons des ressources éducatives poussées, des analyses de structure de marché et un accompagnement à la discipline.",
        },
        {
          q: "À qui s'adresse cette communauté ?",
          a: "Notre communauté est conçue pour les personnes ambitieuses de tous niveaux : du parfait débutant désireux de comprendre les rouages du marché financier jusqu'au trader intermédiaire recherchant une rigueur d'exécution institutionnelle.",
        },
        {
          q: "Quels services et ressources sont inclus ?",
          a: "Les membres bénéficient d'analyses techniques quotidiennes, de plans de scénarios sur les devises et l'Or, de cours sur les flux d'ordres, d'un accès aux canaux Telegram et de calculateurs de risque.",
        },
        {
          q: "Faut-il une expérience préalable en finance ?",
          a: "Non. Aucune expérience n'est requise. Notre parcours guide pas à pas les novices à travers le vocabulaire, la configuration des logiciels de graphiques et les bases fondamentales.",
        },
        {
          q: "Comment démarrer avec PRINTFOREX ?",
          a: "Cliquez simplement sur 'Rejoindre la Communauté' sur cette page, renseignez vos coordonnées et votre niveau, puis accédez instantanément à notre canal Telegram officiel.",
        },
        {
          q: "Les signaux garantissent-ils des gains ?",
          a: "Non. Sur les marchés financiers, aucun gain ne peut être garanti. Nos configurations sont des interprétations techniques à haute probabilité associées à une gestion stricte du risque.",
        },
        {
          q: "Quelle est votre approche de la gestion du risque ?",
          a: "Nous préconisons de ne jamais risquer plus de 1% à 2% du capital total par opportunité, de toujours fixer un stop-loss avant l'entrée et de cibler un ratio risque/rendement d'au moins 1:2.",
        },
        {
          q: "Comment contacter l'équipe PRINTFOREX ?",
          a: "Vous pouvez nous joindre directement via le bouton flottant WhatsApp en bas à droite de votre écran, via notre Telegram officiel ou en remplissant le formulaire d'inscription.",
        },
      ],
    },
    finalCta: {
      tag: "Commencez Votre Parcours",
      title: "Prêt à Franchir le Pas ?",
      subtitle:
        "Découvrez notre communauté, profitez d'analyses de pointe et échangez avec des traders engagés vers une réussite pérenne.",
      ctaJoin: "Rejoindre la Communauté →",
      ctaWhatsApp: "Nous Contacter sur WhatsApp",
      guarantee: "Accès Immédiat · Aucune Carte Bancaire Requise · Communauté Mondiale Active",
    },
    footer: {
      brandDesc:
        "Formation au trading et communauté dédiée à l'autonomie des traders à travers l'exécution disciplinée, la rigueur du risque et la compréhension institutionnelle du marché.",
      motto: "Pensez au-delà du Marché.",
      ecosystemTitle: "Écosystème",
      academy: "Académie Trading",
      analysis: "Analyses de Marché",
      signals: "Signaux Haute Probabilité",
      riskArch: "Architecture du Risque",
      communityTitle: "Communauté",
      vipTelegram: "Canal VIP Telegram",
      whatsappConcierge: "Concierge WhatsApp",
      methodologyLink: "Notre Méthodologie",
      faqLink: "Support & FAQ",
      complianceTitle: "Conformité",
      privacy: "Politique de Confidentialité",
      terms: "Conditions Générales",
      riskDisclosure: "Avertissement sur les Risques",
      affiliatePolicy: "Politique d'Affiliation",
      adminPortal: "Portail Administrateur",
      riskNoticeTitle: "Avertissement sur les Risques Élevés :",
      riskNoticeText:
        "Le trading sur devises (Forex) et les CFD comportent un niveau de risque élevé qui peut ne pas convenir à tous les investisseurs. L'effet de levier peut jouer en votre faveur comme en votre défaveur. Avant de décider de négocier sur le marché des changes, examinez attentivement vos objectifs d'investissement, votre niveau d'expérience et votre tolérance au risque. PRINTFOREX fournit exclusivement du contenu éducatif et des informations de marché ; rien ici ne constitue un conseil financier.",
      rights: "© 2026 PRINTFOREX. Tous droits réservés.",
      values: "DISCIPLINE · SAVOIR · INTÉGRITÉ",
    },
    whatsappButton: {
      tooltip: "Concierge WhatsApp Direct",
      defaultMessage: "Bonjour PRINTFOREX, je souhaite rejoindre votre communauté.",
    },
    modal: {
      title: "Rejoindre la Communauté",
      subtitle: "Présentez-vous brièvement pour intégrer la communauté de traders PRINTFOREX.",
      fullName: "Nom & Prénom",
      fullNamePlaceholder: "ex. Jean Dupont",
      email: "Adresse Email",
      emailPlaceholder: "nom@exemple.com",
      age: "Âge",
      phone: "Numéro de Téléphone",
      city: "Ville",
      cityPlaceholder: "Votre Ville",
      country: "Pays",
      countrySelect: "Sélectionnez votre pays",
      experienceTitle: "Niveau d'Expérience en Trading",
      experiences: {
        beginner: { title: "Débutant", desc: "Fait ses premiers pas" },
        intermediate: { title: "Intermédiaire", desc: "A déjà tradé en réel" },
        advanced: { title: "Avancé", desc: "Régularité active" },
        professional: { title: "Professionnel", desc: "Prop firm / temps plein" },
      },
      consentText:
        "J'accepte la politique de confidentialité et autorise PRINTFOREX à traiter mes données pour gérer mon inscription et m'envoyer des mises à jour directes.",
      consentLink: "Politique de Confidentialité",
      submit: "Rejoindre la Communauté",
      submitting: "Traitement de l'inscription...",
      successTitle: "Bienvenue chez PRINTFOREX !",
      successDesc:
        "Votre inscription a été validée avec succès. Vous avez désormais accès à notre canal Telegram privé et à nos configurations de marché.",
      successTelegramCta: "Rejoindre le Canal Telegram →",
      successWhatsAppCta: "Contacter l'équipe sur WhatsApp",
      closeBtn: "Fermer la Fenêtre",
      errorFallback: "Une erreur inattendue est survenue. Veuillez réessayer.",
      countries: {
        us: "États-Unis",
        uk: "Royaume-Uni",
        fr: "France",
        ma: "Maroc",
        ae: "Émirats Arabes Unis",
        ca: "Canada",
        de: "Allemagne",
        ch: "Suisse",
        dz: "Algérie",
        tn: "Tunisie",
        sa: "Arabie Saoudite",
        qa: "Qatar",
        other: "Autre Pays",
      },
    },
  },
  ar: {
    nav: {
      about: "من نحن",
      philosophy: "فلسفتنا",
      services: "خدماتنا",
      methodology: "المنهجية",
      community: "المجتمع",
      faq: "الأسئلة الشائعة",
      joinCommunity: "انضم إلى مجتمعنا",
    },
    ticker: {
      liveMarkets: "الأسواق المباشرة",
      live: "مباشر",
      goldLabel: "الذهب",
    },
    hero: {
      badge: "انضباط · معرفة · استراتيجية",
      titleLine1: "فكّر أبعد من",
      titleLine2: "حدود السوق.",
      subtitle:
        "منظومة تداول رائدة قائمة على بنية السوق المؤسسية، وإدارة المخاطر الصارمة، والتعليم المستمر. توقف عن ملاحقة الضجيج وابدأ باحتراف التنفيذ الدقيق.",
      ctaPrimary: "انضم إلى مجتمعنا",
      ctaSecondary: "استكشف خدماتنا",
      trustRisk: "تركيز مطلق على إدارة المخاطر",
      trustDaily: "تحليلات فنية مؤسسية يومية",
      trustTelegram: "دعم تفاعلي عبر تيليجرام",
      cardRadarTitle: "PRINT_MARKET_RADAR // EURUSD",
      cardLiveSetup: "فرصة حية",
      cardBullishInvalidation: "إبطال السيناريو الصاعد",
      cardSession: "الجلسة",
      cardBias: "الاتجاه",
      cardBiasValue: "سيولة عالية",
      cardFrame: "الإطار الزمني",
      cardFrameValue: "4 ساعات مؤسسي",
    },
    philosophy: {
      tag: "فلسفتنا",
      title: "التداول رحلة وانضباط، وليس طريقاً مختصراً.",
      subtitle:
        "في PRINTFOREX، نؤمن بأن الفهم العميق للأسواق، وبناء عادات يومية منضبطة، ووضع إدارة المخاطر في المقام الأول، هي الركائز الأساسية للنجاح المستمر على المدى البعيد.",
      pillars: [
        {
          num: "01",
          title: "التعليم أولاً",
          desc: "قبل المخاطرة بأي رأس مال، افهم آلية حركة الأسواق. نحن نوضح هيكل السوق، ومناطق فراغ السيولة، وسيكولوجية صانع السوق لتتخذ قرارات واثقة ومدروسة.",
          tagline: "الأساس المتين قبل المضاربة",
        },
        {
          num: "02",
          title: "الانضباط المنهجي",
          desc: "أي استراتيجية تفقد قيمتها دون انضباط صارم في تطبيقها. نركز على الحياد العاطفي، وتوثيق الصفقات بدقة، والاستمرارية الثابتة بعيداً عن التسرع.",
          tagline: "خطط لصفقتك، والتزم بخطتك",
        },
        {
          num: "03",
          title: "حماية رأس المال",
          desc: "البقاء والاستمرارية هما الميزة التنافسية الحقيقية في الفوركس. نمنح الأولوية لمعدلات العائد مقابل المخاطرة الإيجابية وحماية المحفظة قبل البحث عن الأرباح.",
          tagline: "احمِ رأس مالك في جميع الأوقات",
        },
      ],
    },
    services: {
      tag: "ما نقدمه",
      title: "كل إنجاز يبدأ باكتساب المعرفة.",
      subtitle:
        "خدمات متكاملة ومصممة للارتقاء بمستوى فهمك للأسواق من المبادئ الأولية وصولاً إلى التنفيذ المؤسسي المتقدم.",
      items: [
        {
          title: "أكاديمية التعليم",
          desc: "مساقات تعليمية تبدأ من أساسيات الفوركس وقراءة حركة الأسعار حتى مفاهيم الأموال الذكية (Smart Money).",
          bullets: ["مسار شامل من المبتدئ إلى المحترف", "ديناميكيات تدفق الأوامر المؤسسية"],
          cta: "استكشف المنهج ←",
        },
        {
          title: "تحليلات الأسواق",
          desc: "تغطية يومية وأسبوعية لأهم أزواج العملات والمؤشرات والذهب مع ربطها بالسياق الاقتصادي الكلي.",
          bullets: ["جلسات افتتاح لندن ونيويورك", "تحديد مناطق السيولة الرئيسية"],
          cta: "نموذج تحليلي ←",
        },
        {
          title: "إشارات عالية الدقة",
          desc: "فرص منتقاة بعناية تصلك مباشرة عبر التيليجرام متضمنة مناطق الدخول، ووقف الخسارة، وأهداف الأرباح المتعددة.",
          bullets: ["نقاط دخول ومستويات إلغاء دقيقة", "تنبيهات فورية للتنفيذ المباشر"],
          cta: "بروتوكول الإشارات ←",
        },
        {
          title: "إدارة المخاطر",
          desc: "معايير وحسابات رياضية لحماية رصيد حسابك من تقلبات الأسواق والتراجعات الحادة بكل أمان.",
          bullets: ["معادلات دقيقة لحجم العقود", "ضوابط للحد الأقصى للتراجع"],
          cta: "دليل إدارة المخاطر ←",
        },
      ],
    },
    analysis: {
      tag: "رؤية فنية قابلة للتنفيذ",
      title: "افهم السوق بعيداً عن مجرد الأرقام.",
      subtitle: "تحليل بياني نموذجي يوضح كيفية تتبع البصمات المؤسسية ذات الاحتمالية العالية.",
      asset: "XAUUSD / الذهب",
      trend: "الاتجاه: زخم صاعد قوي",
      fvg: "فجوة القيمة العادلة [FVG]:",
      active: "نشطة",
      swingHigh: "تحليل القمم السعرية (سحب سيولة قمة لندن)",
      orderBlock: "أوردر بلوك (Order Block)",
      targetLiquidity: "السيولة المستهدفة",
      sweepBadge: "سحب سيولة مثالي + رفض سعري مؤسسي",
      entryZone: "منطقة الدخول",
      sl: "وقف الخسارة (SL)",
      tp1: "الهدف الأول",
      tp2: "الهدف النهائي",
      takeawayTitle: "الخلاصة الفنية الرئيسية",
      takeawayText:
        "تم سحب السيولة المتمركزة فوق قمم الجلسة الآسيوية السابقة خلال فترة ما قبل افتتاح لندن، وتفاعل السعر مباشرة وبدقة مع منطقة خصم فيبوناتشي 62%.",
      confluence: "معدل التوافق الفني:",
      risk: "المخاطرة المحسوبة:",
      riskVal: "1% كحد أقصى للمحفظة",
      channel: "قناة التنفيذ:",
      channelVal: "تيليجرام PRINTFOREX",
      cta: "احصل على التحليل الكامل يومياً",
    },
    methodology: {
      tag: "منهجيتنا",
      title: "نهج احترافي ومدروس للتداول.",
      subtitle:
        "من المبادئ الأساسية وحتى الممارسة اليومية الروتينية، يتبع كل عضو إطار عمل واضح ومكون من 4 مراحل متكاملة.",
      steps: [
        {
          num: "01",
          phase: "المرحلة 1",
          title: "تعلّم",
          desc: "ابنِ أساساً مؤسسياً متيناً. أتقن المصطلحات، وحساب النقاط، وأنواع الأوامر، وارتباط العملات وحركة السيولة.",
          action: "اكتساب المعرفة ←",
        },
        {
          num: "02",
          phase: "المرحلة 2",
          title: "حلّل",
          desc: "افهم بيئة السوق قبل الإقدام على أي خطوة. حدد اتجاه الإطار الزمني الأكبر ومناطق عدم التوازن والأخبار الاقتصادية.",
          action: "رؤية هيكلية متعمقة ←",
        },
        {
          num: "03",
          phase: "المرحلة 3",
          title: "خطّط",
          desc: "ضع خطط سيناريوهات محكمة. حدد شروط الدخول ومستويات وقف الخسارة وأهداف الأرباح وحجم العقد المناسب.",
          action: "تجهيز الخطة التكتيكية ←",
        },
        {
          num: "04",
          phase: "المرحلة 4",
          title: "أدِر",
          desc: "تحكّم في صفقاتك المفتوحة دون عاطفة. أمّن أرباحك جزئياً عند المستويات المستهدفة ووثق كل خطوة في سجل تداولاتك.",
          action: "تطوير واستدامة رأس المال ←",
        },
      ],
    },
    community: {
      hubTag: "مجتمع تيليجرام النشط",
      titleLine1: "نتعلم معاً.",
      titleLine2: "ونرتقي بقوة المعرفة.",
      desc: "تواصل مع نخبة من المتداولين الشغوفين الذين يشاركون تحليلاتهم الفنية وتوقعاتهم اليومية وعاداتهم المنضبطة. احصل على وصول مباشر للإشارات والشروحات وجلسات الأسئلة والأجوبة.",
      ctaTelegram: "انضم إلى مجتمعنا",
      ctaWhatsApp: "تواصل معنا عبر واتساب",
      channelName: "قناة PRINTFOREX VIP",
      channelSub: "متداولون حول العالم",
      recapTag: "الموجز اليومي",
      recapText:
        "حقق تفاعل EUR/USD عند منطقة أوردر بلوك 1.0895 الهدف الأول (+42 نقطة). تم نقل وقف الخسارة إلى نقطة الدخول (نقطة التعادل) مع ترك الجزء المتبقي لجلسة نيويورك.",
      eduTag: "درس تعليمي سريع",
      eduText:
        'تم رفع فيديو تعليمي جديد: "كيف تميز بين مناطق الأسعار الغالية (Premium) والمخفضة (Discount) في افتتاح لندن."',
      instantAccess: "دخول فوري ومباشر بعد التسجيل",
      freeBadge: "مجاني 100%",
    },
    faq: {
      tag: "إيضاحات هامة",
      title: "الأسئلة الأكثر شيوعاً",
      subtitle: "إجابات واضحة وشفافة حول كل ما ترغب في معرفته بخصوص الانضمام والتعلم مع PRINTFOREX.",
      items: [
        {
          q: "ما هو مجتمع PRINTFOREX؟",
          a: "PRINTFOREX هو مجتمع تعليمي ومنصة أبحاث وتحليلات متقدمة لأسواق المال. نقدم مواد تعليمية احترافية، وتحليلات لبنية السوق، وتوجيهاً للانضباط لمساعدة المتداولين على فهم الأسواق المالية بمسؤولية.",
        },
        {
          q: "لمن صُمم هذا المجتمع؟",
          a: "صُمم مجتمعنا للمتداولين الطموحين من كافة المستويات؛ بدءاً من المبتدئين تماماً الذين يرغبون في فهم الأسواق من الصفر، وحتى المتداولين المتوسطين الباحثين عن إطار عمل مؤسسي منضبط.",
        },
        {
          q: "ما هي الخدمات والموارد المتاحة للأعضاء؟",
          a: "يحصل الأعضاء على تحليلات فنية يومية، ومخططات لسيناريوهات العملات والذهب، ودروس في السيولة والأوردر بلوك، ومجموعات نقاش تفاعلية، وأدوات حساب إدارة المخاطر.",
        },
        {
          q: "هل أحتاج إلى خبرة مالية سابقة للانضمام؟",
          a: "كلا، لا يُشترط وجود أي خبرة مسبقة. نبدأ مع الأعضاء الجدد بتوضيح المصطلحات وإعداد برامج الرسوم البيانية قبل الانتقال إلى الاستراتيجيات المتقدمة.",
        },
        {
          q: "كيف أبدأ مع PRINTFOREX؟",
          a: "اضغط بكل بساطة على 'انضم إلى مجتمعنا'، واملأ استمارة التسجيل السريعة مع تحديد مستوى خبرتك، وسيتم تحويلك فوراً إلى قناتنا الرسمية على التيليجرام وخدمة الدعم المباشر.",
        },
        {
          q: "هل الإشارات تضمن تحقيق أرباح مؤكدة؟",
          a: "كلا، لا توجد أي أرباح مضمونة في الأسواق المالية. إشاراتنا وتحليلاتنا تعبر عن قراءات فنية عالية الاحتمالية مقترنة بضوابط مخاطرة صارمة، والتداول ينطوي دائماً على مخاطر مالية حقيقية.",
        },
        {
          q: "ما هو منهجكم في إدارة المخاطر؟",
          a: "نوصي بألا تتجاوز المخاطرة في أي صفقة 1% إلى 2% من إجمالي رأس المال، مع تحديد أمر وقف الخسارة قبل الدخول والالتزام بمعدل عائد إلى مخاطرة لا يقل عن 1:2.",
        },
        {
          q: "كيف يمكنني التواصل مع فريق دعم PRINTFOREX؟",
          a: "يمكنك التواصل معنا فوراً عبر زر الواتساب العائم في أسفل الشاشة، أو عبر حساب التيليجرام الرسمي، أو من خلال تعبئة استمارة التسجيل.",
        },
      ],
    },
    finalCta: {
      tag: "ابدأ رحلتك اليوم",
      title: "هل أنت مستعد لاتخاذ الخطوة التالية؟",
      subtitle:
        "اكتشف مجتمعنا، واستفد من خدماتنا المؤسسية، وتواصل مع نخبة من المتداولين الملتزمين بالانضباط والاستمرارية.",
      ctaJoin: "انضم إلى مجتمعنا ←",
      ctaWhatsApp: "تحدث معنا عبر واتساب",
      guarantee: "وصول فوري · بدون بطاقة ائتمانية · مجتمع عالمي نشط",
    },
    footer: {
      brandDesc:
        "أكاديمية تعليم التداول ومجتمع يهدف إلى تمكين المتداولين من خلال التنفيذ المنضبط، وإدارة المخاطر الصارمة، والفهم الهيكلي لحركة الأسواق.",
      motto: "فكّر أبعد من حدود السوق.",
      ecosystemTitle: "المنظومة",
      academy: "أكاديمية التداول",
      analysis: "تحليلات الأسواق",
      signals: "إشارات عالية الاحتمالية",
      riskArch: "هندسة إدارة المخاطر",
      communityTitle: "المجتمع",
      vipTelegram: "قناة VIP على تيليجرام",
      whatsappConcierge: "خدمة كونسيرج واتساب",
      methodologyLink: "منهجية العمل",
      faqLink: "مركز الأسئلة والدعم",
      complianceTitle: "الامتثال والشفافية",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      riskDisclosure: "إخلاء المسؤولية عن المخاطر",
      affiliatePolicy: "سياسة التسويق بالعمولة",
      adminPortal: "بوابة المسؤول",
      riskNoticeTitle: "تحذير هام من المخاطر العالية:",
      riskNoticeText:
        "ينطوي تداول العملات الأجنبية (الفوركس) وعقود الفروقات (CFDs) على درجة عالية من المخاطرة وقد لا يكون مناسباً لجميع المستثمرين. الرافعة المالية العالية يمكن أن تعمل لصالحك أو ضدك. قبل اتخاذ قرار بالتداول، يجب عليك تقييم أهدافك وخبرتك وقدرتك على تحمل المخاطر. تقدم PRINTFOREX محتوى تعليمياً ومعلومات تحليلية فقط ولا تقدم بأي حال استشارات مالية أو توصيات استثمارية.",
      rights: "© 2026 PRINTFOREX. جميع الحقوق محفوظة.",
      values: "انضباط · معرفة · نزاهة",
    },
    whatsappButton: {
      tooltip: "محادثة فورية عبر واتساب",
      defaultMessage: "مرحباً PRINTFOREX، أود الانضمام إلى مجتمعكم والتعرف على خدماتكم.",
    },
    modal: {
      title: "انضم إلى مجتمعنا",
      subtitle: "أخبرنا قليلاً عن نفسك لتصبح جزءاً من مجتمع المتداولين في PRINTFOREX.",
      fullName: "الاسم الكامل",
      fullNamePlaceholder: "مثال: أحمد محمد",
      email: "البريد الإلكتروني",
      emailPlaceholder: "name@example.com",
      age: "العمر",
      phone: "رقم الهاتف",
      city: "المدينة",
      cityPlaceholder: "مدينتك",
      country: "الدولة",
      countrySelect: "اختر دولتك",
      experienceTitle: "مستوى خبرتك في التداول",
      experiences: {
        beginner: { title: "مبتدئ", desc: "في بداية التعلم" },
        intermediate: { title: "متوسط", desc: "تداولت صفقات حقيقية" },
        advanced: { title: "متقدم", desc: "استمرارية وتحقيق نتائج" },
        professional: { title: "محترف", desc: "شركات تمويل / تفرغ كامل" },
      },
      consentText:
        "أوافق على سياسة الخصوصية وأمنح PRINTFOREX الإذن لمعالجة بياناتي لإتمام الانضمام للمجتمع وتلقي التحديثات المباشرة.",
      consentLink: "سياسة الخصوصية",
      submit: "انضم إلى مجتمعنا",
      submitting: "جاري تأكيد التسجيل...",
      successTitle: "أهلاً بك في PRINTFOREX!",
      successDesc:
        "تم تأكيد تسجيلك بنجاح. يمكنك الآن الانضمام مباشرة إلى قناتنا الخاصة على التيليجرام ومتابعة التحليلات والفرص.",
      successTelegramCta: "الانضمام إلى قناة تيليجرام ←",
      successWhatsAppCta: "التحدث مع فريقنا عبر واتساب",
      closeBtn: "إغلاق النافذة",
      errorFallback: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
      countries: {
        us: "الولايات المتحدة",
        uk: "المملكة المتحدة",
        fr: "فرنسا",
        ma: "المغرب",
        ae: "الإمارات العربية المتحدة",
        ca: "كندا",
        de: "ألمانيا",
        ch: "سويسرا",
        dz: "الجزائر",
        tn: "تونس",
        sa: "المملكة العربية السعودية",
        qa: "قطر",
        other: "دولة أخرى",
      },
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  dir: "ltr" | "rtl";
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // English is default as explicitly requested ("pardefault il doit etre en english")
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("pf_lang") as Language | null;
      if (saved && (saved === "en" || saved === "fr" || saved === "ar")) {
        setLanguageState(saved);
        applyDocumentAttributes(saved);
      } else {
        applyDocumentAttributes("en");
      }
    } catch {
      applyDocumentAttributes("en");
    }
  }, []);

  const applyDocumentAttributes = (lang: Language) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("pf_lang", lang);
    } catch {
      // ignore local storage error
    }
    applyDocumentAttributes(lang);
  };

  const isRtl = language === "ar";
  const dir = isRtl ? "rtl" : "ltr";
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return English default fallback if context is not yet mounted
    return {
      language: "en" as Language,
      setLanguage: () => {},
      t: translations.en,
      dir: "ltr" as const,
      isRtl: false,
    };
  }
  return context;
}
