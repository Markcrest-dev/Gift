# 🎁 Festow - Next.js Application

A modern, full-featured Christmas gifting application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** that allows users to send and receive gifts globally with options for cash or cryptocurrency redemption.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge)

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Icons**: Font Awesome 6.5.1
- **Fonts**: Playfair Display (headings), Inter (body)

## ✨ Features

### 🏠 Pages Implemented
- ✅ **Landing Page** - Hero section, How It Works, Features, Testimonials
- ✅ **Authentication** - Login and Signup pages with form validation
- ✅ **Marketplace** - Responsive product grid with search and filters
- ✅ **Dashboard** - User statistics, recent activity, quick actions
- ✅ **About** - Mission statement and company values
- ✅ **Contact** - Contact form with information cards

### 🎨 Design System
- Custom Christmas theme colors (Ruby Red #C41E3A, Forest Green #0F5132, Gold #FFD700)
- Responsive typography scale
- Smooth animations (fade-in, snowfall effect)
- Mobile-first responsive design
- Consistent spacing and shadows

### 📱 Responsive Breakpoints
- **Mobile**: < 768px (1 column layouts)
- **Tablet**: 768px - 1024px (2 column layouts)
- **Desktop**: > 1024px (3-4 column layouts)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Run the development server**
```bash
npm run dev
```

3. **Open in browser**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
Gift/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── login/page.tsx     # Login page
│   │   ├── signup/page.tsx    # Signup page
│   │   ├── marketplace/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles with Tailwind
│   └── components/
│       ├── layout/            # Layout components
│       │   ├── Navbar.tsx     # Responsive navbar
│       │   └── Footer.tsx     # Footer component
│       ├── effects/           # Effect components
│       │   └── Snowfall.tsx   # Christmas snowfall
│       └── ui/                # UI components
├── design/                     # Original HTML/CSS/JS code (archived)
├── public/                     # Static assets
└── package.json
```

## 🎯 Key Features

### Responsive Navigation
- Desktop: Full horizontal navigation with auth buttons
- Mobile: Hamburger menu with slide-in drawer
- Fixed position with smooth scrolling

### Responsive Grid Layouts
- **Landing Page**: 3-column feature grid (mobile: 1 col, tablet: 2 col, desktop: 3 col)
- **Marketplace**: 4-column product grid (mobile: 1 col, tablet: 2 col, desktop: 4 col)
- **Dashboard**: Stats grid adapts from 4 columns to 1 column
- **Footer**: 4-column footer collapses to single column on mobile

### Mobile-First Approach
All components use Tailwind's responsive utilities:
- Base styles for mobile
- `md:` prefix for tablet (768px+)
- `lg:` prefix for desktop (1024px+)
- `xl:` prefix for large desktop (1280px+)

## 🎨 Design Highlights

### Color Palette
- **Ruby Red**: `#C41E3A` - Primary brand color
- **Deep Crimson**: `#8B0000` - Darker accent
- **Forest Green**: `#0F5132` - Christmas green
- **Gold**: `#D4AF37` - Festive accent
- **Bright Gold**: `#FFD700` - Highlights

### Typography
- **Headings**: Playfair Display (Serif) - Elegant and festive
- **Body**: Inter (Sans-serif) - Clean and readable

### Animations
- Snowfall effect across all pages
- Fade-in animations on scroll
- Smooth hover transitions
- Mobile-friendly touch interactions

## 📱 Responsive Testing

Test the application at different viewport widths:
- **Mobile (375px)**: iPhone SE
- **Tablet (768px)**: iPad
- **Desktop (1280px)**: Standard laptop
- **Large Desktop (1920px)**: Full HD monitor

## 🔧 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📄 Demo Account

For testing the login page:
- **Email**: demo@gift.com
- **Password**: Demo123!

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`

## 🎉 Migration Notes

This project was migrated from vanilla HTML/CSS/JS to Next.js + TypeScript + Tailwind CSS. The original code is preserved in the `design/` folder for reference.

### What Changed
- ✅ HTML files → Next.js React components (TypeScript)
- ✅ Separate CSS files → Tailwind CSS utility classes
- ✅ Vanilla JavaScript → TypeScript with React hooks
- ✅ Static pages → Dynamic server-side rendering
- ✅ Manual responsive CSS → Tailwind responsive utilities

### Benefits of Migration
- 🚀 Better performance with Next.js optimizations
- 📱 Improved mobile responsiveness with Tailwind
- 🔒 Type safety with TypeScript
- ⚡ Faster development with component reusability
- 🎨 Consistent design system

## 📞 Support

For questions or issues:
- Email: support@festow.com
- GitHub Issues: Create an issue in the repository

---

**Built with ❤️ for the Christmas season 🎄**

*Migrated to Next.js + TypeScript + Tailwind CSS on December 17, 2024*
