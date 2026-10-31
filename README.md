# PRINTFOREX — Independent Trading Architecture & Education

A modern, high-performance landing page and educational platform for **PRINTFOREX**, built with **Next.js 15**, **React 19**, **TypeScript**, and **Motion for React**. 

Designed with an **editorial-report aesthetic** ("The printed annual"), featuring a strict vertical axis, disciplined typography, dark obsidian surfaces, warm gold accents, and an interactive multi-layer parallax hero.

---

## ✨ Features

- **Interactive Multi-Layer Parallax Hero**:
  - Pointer/cursor tracking powered by spring physics (`damping`, `stiffness`, `mass`).
  - Native CSS Scroll-Driven Animation support with `@supports ((animation-timeline: view()) and (animation-range: entry))` and Motion fallbacks.
  - Multi-plane depth separation (background grid, 3D artwork, and floating telemetry cards).
  - Full accessibility compliance with `prefers-reduced-motion`.
- **Editorial Design System**:
  - Built on a structured 44% axis layout with fluid responsive clamp typography (`Space Grotesk` & `Inter`).
  - Cohesive color tokens: Obsidian `#07090d`, Slate `#0c1017` / `#111722`, and Warm Gold `#d6b36a`.
- **Interactive Modules**:
  - **Perspective Network**: Constellation radar visualization representing collective trader intelligence.
  - **Curriculum Mosaic**: Asymmetric 12-column grid highlighting core market mechanics.
  - **Interactive Market Telemetry**: Live-feel SVG price curve with real-time hover crosshair and timeframe switching (`1D`, `1W`, `1M`, `1Y`).
  - **Operational Protocol**: Stepped 4-phase execution framework (*Observe → Analyze → Plan → Review*).
  - **Accessible FAQ Accordion**: Keyboard-navigable disclosure panels with smooth height transitions.
- **Legal & Compliance Pages**:
  - Dedicated routes for `/privacy`, `/terms`, `/risk-disclaimer`, and custom `/_not-found`.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Animation & Physics**: [Motion for React](https://motion.dev/) (Framer Motion 12)
- **3D & Canvas**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Modern CSS3 (Custom Properties, Grid, Flexbox, Fluid Typography)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.18.0 or newer (v20+ recommended)
- **npm**, **pnpm**, or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd "Trading website"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Hot Module Replacement on port 3000. |
| `npm run build` | Compiles an optimized production build of the application. |
| `npm run start` | Runs the compiled production server. |
| `npm run lint` | Runs Next.js ESLint checks across the codebase. |

---

## 📁 Project Structure

```
├── public/                 # Static assets (3D renders, signatures, icons)
│   ├── 3D_hero.jpeg
│   └── element_signature-.jpeg
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── globals.css     # Complete design system & custom CSS variables
│   │   ├── layout.tsx      # Root HTML layout with Google Fonts & SEO metadata
│   │   ├── not-found.tsx   # Custom 404 page
│   │   ├── page.tsx        # Main landing page
│   │   ├── privacy/        # Privacy Policy route
│   │   ├── risk-disclaimer/# Risk Disclaimer route
│   │   ├── terms/          # Terms of Service route
│   │   ├── robots.ts       # Dynamic robots.txt
│   │   └── sitemap.ts      # Dynamic sitemap.xml
│   ├── components/
│   │   ├── three/          # Three.js / WebGL canvas components
│   │   │   └── HeroScene.tsx
│   │   └── ui/             # Reusable UI & animation components
│   │       ├── HeroParallax.tsx
│   │       └── Reveal.tsx
│   └── config/
│       └── site.ts         # Global site configuration, navigation & contact info
├── .gitignore              # Files and directories ignored by Git
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

## 📤 Pushing to GitHub

To push this repository to your GitHub account:

1. **Stage all changes:**
   ```bash
   git add .
   ```

2. **Commit your changes:**
   ```bash
   git commit -m "Complete redesign: editorial aesthetic, parallax hero, and clean architecture"
   ```

3. **Link your GitHub remote repository (if not already linked):**
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   ```

4. **Set the main branch and push:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

---

## 📄 License & Disclaimer

Educational content and market discussions are for informational purposes only. Trading financial instruments involves significant risk of capital loss. Please refer to `/risk-disclaimer` for complete regulatory disclosures.

