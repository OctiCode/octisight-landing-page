<div align="center">
  <img src="client/public/images/logo/OctiSight_logo-02.svg" alt="OctiSight Logo" width="400"/>
</div>

# OctiSight Landing Page

Modern, responsive landing page for **OctiSight** - Next-generation cybersecurity platform powered by AI. Built with cutting-edge web technologies and best practices for optimal performance and user experience.

## 🏢 Company

**OctiCode** - Innovative cybersecurity solutions provider  
Website: [OctiSight Platform](https://octisight.com)

## 👨‍💻 Developer

**LatrachDev** - Full-stack developer specializing in modern web applications

---

## 📋 Project Overview

OctiSight is a comprehensive vulnerability management platform that provides:
- Complete visibility into security infrastructure
- AI-powered contextual intelligence
- Actionable remediation guidance
- Real-time threat detection and analysis

This landing page showcases the platform's features, pricing, and value proposition with a modern, engaging user interface.

---

## 🚀 Tech Stack

### Core Framework
- **Next.js 16.1.6** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icon library
- **Custom Gotham Font** - Professional typography

### Tools & Development
- **Biome** - Fast formatter and linter
- **Turbopack** - Next-generation bundler
- **Git** - Version control

---

## 📁 Project Structure

```
client/
├── public/
│   ├── fonts/              # Gotham font family (.otf files)
│   ├── images/
│   │   ├── background/     # Background images
│   │   ├── elements/       # UI elements (guard icon, etc.)
│   │   └── logo/           # Brand logos
│   └── videos/             # Demo videos
│
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styles & theme configuration
│   │   ├── layout.tsx      # Root layout with metadata
│   │   └── page.tsx        # Home page composition
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Navigation header
│   │   │   └── Footer.tsx          # Footer with links & social
│   │   │
│   │   ├── sections/home/
│   │   │   ├── HeroSection.tsx     # Hero with animated network canvas
│   │   │   ├── AboutSection.tsx    # About with video player
│   │   │   ├── FeaturesSection.tsx # Platform features grid
│   │   │   ├── WhySection.tsx      # Why choose OctiSight
│   │   │   ├── PricingSection.tsx  # Pricing plans
│   │   │   └── CTASection.tsx      # Call-to-action
│   │   │
│   │   └── ui/             # Reusable UI components (shadcn/ui)
│   │
│   ├── content/
│   │   └── home.ts         # Centralized content management
│   │
│   └── lib/
│       └── utils.ts        # Utility functions
│
├── .gitignore
├── biome.json              # Biome configuration
├── components.json         # shadcn/ui configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies & scripts
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🎨 Key Features

### Sections
1. **Hero Section** - Animated network background with gradient effects
2. **About Section** - Company mission with video demonstration
3. **Features Section** - 2-column responsive grid showcasing platform capabilities
4. **Why Section** - Value propositions with visual elements
5. **Pricing Section** - Three-tier pricing with highlighted popular plan
6. **CTA Section** - Final call-to-action with dual CTAs

### Design Highlights
- ✨ Fully responsive (mobile-first approach)
- 🎭 Smooth animations and transitions
- 🎨 Custom purple/pink gradient brand colors
- 🖼️ Optimized images with Next.js Image component
- 📱 Progressive spacing across breakpoints
- ♿ Accessible components with ARIA labels

### Technical Highlights
- 🚀 Server-side rendering (SSR) with Next.js
- ⚡ Optimized performance with Turbopack
- 🎯 Type-safe with TypeScript
- 🧹 Clean code with Biome formatting
- 📦 Component-based architecture
- 🎨 Centralized content management

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/OctiCode/octisight-landing-page.git
   cd octisight-landing-page/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run Biome linter
npm run format       # Format code with Biome
```

---

## 🎨 Customization

### Content Management
All content is centralized in `src/content/home.ts`:
- Hero section text and CTAs
- About section description
- Features list with icons
- Pricing plans and features
- Footer navigation links

### Theme Configuration
Brand colors and fonts are defined in `src/app/globals.css`:
```css
@theme {
  --color-primary: #5b1166;
  --color-accent: #c530db;
  --color-background: #130015;
  /* ... more colors */
}
```

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

---

## 📝 Code Quality

### Standards
- ✅ TypeScript strict mode
- ✅ Biome formatting and linting
- ✅ Component-based architecture
- ✅ Clean code principles
- ✅ Semantic HTML
- ✅ Accessibility best practices

### Best Practices
- Minimal comments (self-documenting code)
- Type safety throughout
- Consistent naming conventions
- Reusable components
- Performance optimization

---

## 📄 License

Copyright © 2026 OctiCode. All rights reserved.

---

## 🤝 Contributing

This is a proprietary project for OctiCode. For inquiries, please contact the development team.

---

## 📧 Contact

**OctiCode**  
Developer: **LatrachDev**  

For support or questions about OctiSight, visit our website or contact our team.

---

**Built with ❤️ by LatrachDev for OctiCode**
