# MEDICIPHER Landing Page

A modern, animated landing page for MEDICIPHER - revolutionizing skilled nursing billing and medical documentation workflow with AI-powered software solutions.

## Overview

This is a Next.js landing page featuring smooth scroll animations powered by GSAP, showcasing MEDICIPHER's comprehensive suite of solutions for skilled nursing facilities.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) with App Router
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **Animations:** [GSAP](https://greensock.com/gsap/) with React integration
- **Language:** TypeScript
- **React:** v19

## Project Structure

```
app/
├── _components/
│   ├── Button.tsx          # Reusable button component
│   ├── Navigation.tsx      # Navigation bar
│   ├── ScrollSmoother.tsx  # GSAP scroll smoothing wrapper
│   └── _sections/
│       ├── Hero.tsx        # Hero section with animated imagery
│       └── Features.tsx    # Features showcase section
├── _symbols/
│   └── Logomark.tsx        # MEDICIPHER logo component
├── globals.css             # Global styles
├── layout.tsx              # Root layout
└── page.tsx                # Main landing page
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:9280](http://localhost:9280) with your browser to see the result.

The page auto-updates as you edit files. Start by modifying [app/page.tsx](app/page.tsx).

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Key Features

- **Smooth Scroll Animations:** GSAP-powered animations for engaging user experience
- **Responsive Design:** Fully responsive layout built with Tailwind CSS
- **Modern UI:** Clean, professional interface showcasing MEDICIPHER's value proposition
- **Performance Optimized:** Next.js App Router for optimal loading and SEO
- **TypeScript:** Type-safe development for maintainability

## License

Private project for MEDICIPHER.
