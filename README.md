# Garaga Venkatesh — 3D Animated Developer Portfolio

A production-quality, responsive 3D animated personal portfolio website engineered with Next.js, React, Three.js (React Three Fiber & Drei), GSAP, Framer Motion, Tailwind CSS, shadcn/ui, 21st.dev components, and the UI/UX Pro Max design intelligence engine.

---

## 🌟 Key Features

1. **3D Interactive Hero Scene**:
   - Built with Three.js, React Three Fiber (`@react-three/fiber`), and `@react-three/drei`.
   - Floating interactive dual-mesh TorusKnot with custom distortion material, pulsing wireframe core, and dynamic orbital particles.
   - Graceful fallback for devices without WebGL or with `prefers-reduced-motion` enabled.

2. **Accurate Career Documentation**:
   - Extracted directly from official resume with zero fabrication.
   - Highlights 6 years of experience across Micro Genesis Tech Soft (Aeronautical Development Agency), Tulasi Technologies (Sri Bhagya Lakshmi & Poultry ERPs), and Arowana Software Solutions.

3. **Core Sections**:
   - **Hero**: 3D interactive scene, availability indicator, quick stats, and direct call-to-action buttons.
   - **Professional About**: Verified profile portrait, career narrative, and foundational architectural pillars.
   - **Work Experience**: Interactive chronological timeline with client highlights, environment badges, and metrics.
   - **Interactive Technical Skills**: Filterable skill matrix with animated proficiency indicators (Backend, Frontend, DevOps, Databases).
   - **Featured Projects**: Deep-dive cards for ADA Project Management System, Sri Bhagya Lakshmi ERP, Poultry ERP, and Kafka Telemetry Engine.
   - **Education & Achievements**: Academic qualifications (B.Tech in EEE from JNTUK) and milestone accomplishments.
   - **Contact**: Direct contact info (Email, Phone, Bangalore location), validation-ready contact form, and direct PDF resume download.

4. **Design & Theming**:
   - Cybernetic dark mode theme with glassmorphism cards and neon accent lighting.
   - Integrated dark/light theme switching with `next-themes`.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router + Turbopack) & React 19
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations**: Framer Motion, GSAP
- **Styling**: Tailwind CSS v4, Lucide Icons, `shadcn/ui`
- **Component Registry**: 21st.dev (`@21st-dev/cli`)
- **Design Intelligence**: UI/UX Pro Max (`.agents/skills/`)
- **Typography**: Geist Sans & Geist Mono

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.18.0 or newer)
- npm (v9.0.0 or newer)

### 2. Installation
```bash
# Clone the repository (if not already local)
cd portfilio

# Install all dependencies
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5443](http://localhost:5443)** in your browser.

### 4. Build for Production
```bash
npm run build
```

### 5. Run Production Server
```bash
npm run start
```
Starts the production server on port 5443: **http://localhost:5443**.

---

## 📁 Project Structure

```
portfilio/
├── public/
│   ├── profile.jpg                      # Profile photograph
│   └── Venkatesh_Garaga_Resume.pdf      # Official downloadable PDF resume
├── src/
│   ├── app/
│   │   ├── globals.css                  # Tailwind CSS v4 & theme variables
│   │   ├── layout.tsx                   # SEO Metadata, font configs, ThemeProvider
│   │   └── page.tsx                     # Main aggregated portfolio page
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── hero-canvas.tsx          # Client-side 3D canvas wrapper with WebGL fallback
│   │   │   └── hero-scene.tsx           # React Three Fiber mesh & particle scene
│   │   ├── ui/                          # shadcn/ui components (Button, Card, Badge, Avatar)
│   │   ├── navbar.tsx                   # Floating glassmorphism navbar & dock
│   │   ├── hero-section.tsx             # Hero section with 3D canvas overlay & stats
│   │   ├── about-section.tsx            # Biography, portrait, and architectural pillars
│   │   ├── experience-timeline.tsx      # Chronological work history & deliverables
│   │   ├── skills-interactive.tsx       # Filterable skills matrix with animated meters
│   │   ├── projects-section.tsx         # Detailed enterprise project cards
│   │   ├── education-achievements.tsx   # Qualifications & defense/enterprise milestones
│   │   ├── contact-section.tsx          # Direct communication cards & interactive form
│   │   ├── footer.tsx                   # Technical footer & back-to-top button
│   │   └── theme-provider.tsx           # next-themes provider wrapper
│   ├── data/
│   │   └── portfolio-data.ts            # Centralized typed data extracted from resume
│   └── lib/
│       └── utils.ts                     # Tailwind class merging utility
├── .agents/skills/                      # UI/UX Pro Max design intelligence suite
└── package.json                         # Scripts & dependency definitions
```

---

## 📄 License
MIT &copy; 2026 Garaga Venkatesh
