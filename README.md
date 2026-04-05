# Ajay Prajapati - Professional Portfolio

A modern, highly interactive portfolio website showcasing cybersecurity expertise and full-stack development skills. Built with cutting-edge technologies and featuring stunning animations, particle effects, and a vibrant neon color scheme.

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Modern Design
- **Vibrant Neon Color Scheme**: Cyan, purple, and green cybersecurity-themed palette
- **Glass Morphism Effects**: Frosted glass cards with backdrop blur
- **Neon Borders & Glows**: Animated glow effects on hover
- **Gradient Animations**: Smooth, flowing gradient backgrounds

### 🚀 Interactive Elements
- **Particle Background**: Animated particle network with connecting lines
- **Typing Animation**: Auto-typing effect cycling through roles
- **Scroll Progress Bar**: Top indicator showing page scroll position
- **Smooth Animations**: Framer Motion powered transitions
- **Hover Effects**: Interactive cards and buttons with scale/glow effects

### 📱 Fully Responsive
- Mobile-first design approach
- Responsive navigation with hamburger menu
- Optimized for all screen sizes
- Touch-friendly interactions

### 🎯 Sections

1. **Hero Section**
   - Typing animation for roles
   - Quick stats display
   - Social media links
   - Animated scroll indicator
   - Profile photo placeholder

2. **About Section**
   - Journey and background
   - Impact statistics
   - Skills overview with icons

3. **Tech Stack Section** ⭐ NEW
   - Categorized technologies
   - Skill level progress bars
   - Technology-specific icons
   - Animated skill bars

4. **Experience Section**
   - Professional experience timeline
   - Education history
   - Certifications with icons
   - Gradient-themed cards

5. **Projects Section**
   - 6 featured projects
   - Live demo and GitHub links
   - Tech stack badges with icons
   - Award highlights
   - Project category icons

6. **Achievements Section**
   - Key highlights with gradient cards
   - 14 competition wins
   - Impact metrics
   - Award badges

7. **Contact Section** ⭐ ENHANCED
   - Working contact form
   - Contact information cards
   - Social media links
   - Availability status

8. **Additional Features**
   - Back to top button
   - Scroll progress indicator
   - Particle background
   - SEO optimized

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ajay-prajapati-portfolio
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

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles & animations
├── components/
│   ├── Navbar.tsx          # Navigation with scroll effect
│   ├── Hero.tsx            # Hero section with typing animation
│   ├── About.tsx           # About section with stats
│   ├── TechStack.tsx       # Tech stack with skill bars ⭐ NEW
│   ├── Experience.tsx      # Experience & education
│   ├── Projects.tsx        # Projects showcase
│   ├── Achievements.tsx    # Awards & competitions
│   ├── Contact.tsx         # Contact section
│   ├── ContactForm.tsx     # Working contact form ⭐ NEW
│   ├── Footer.tsx          # Footer component
│   ├── TypingAnimation.tsx # Typing effect ⭐ NEW
│   ├── ParticleBackground.tsx # Particle animation ⭐ NEW
│   ├── ScrollProgress.tsx  # Scroll indicator ⭐ NEW
│   └── BackToTop.tsx       # Back to top button ⭐ NEW
├── public/                 # Static assets
│   └── robots.txt
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies

⭐ = New/Enhanced Component
```

## 🎨 Customization

### Adding Your Profile Photo

1. Add your photo to the `public` folder (e.g., `public/profile.jpg`)
2. Update `components/Hero.tsx`:

```tsx
<Image 
  src="/profile.jpg" 
  alt="Ajay Prajapati" 
  fill 
  className="object-cover"
/>
```

### Updating Content

All content is stored in component files:
- **About**: `components/About.tsx` - Skills and bio
- **Experience**: `components/Experience.tsx` - Work and education
- **Projects**: `components/Projects.tsx` - Project details
- **Achievements**: `components/Achievements.tsx` - Awards
- **Contact**: `components/Contact.tsx` - Contact info

### Customizing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: "#00d9ff",    // Cyan
  secondary: "#a855f7",  // Purple
  accent: "#10b981",     // Green
  neon: "#7c3aed",       // Neon purple
  cyan: "#06b6d4",       // Cyan variant
  dark: "#0a0e27",       // Dark blue
  darker: "#050816",     // Darker blue
}
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js and deploys
4. Get automatic SSL and CDN

### Other Platforms

Compatible with:
- Netlify
- AWS Amplify
- Railway
- Render
- Any Node.js hosting

## 📊 Performance

- ⚡ Fast page loads with Next.js optimization
- 🎯 SEO optimized with metadata
- 📱 Mobile-first responsive design
- ♿ Accessibility compliant
- 🚀 Optimized animations with Framer Motion

## 🎯 Key Highlights

- 🏆 Award-winning design inspired by top portfolios
- 🎨 Vibrant cybersecurity-themed color scheme
- ⚡ Smooth animations and transitions
- 📱 Fully responsive across all devices
- 🔍 SEO optimized for search engines
- ♿ Accessibility features included
- 🚀 Production-ready and deployable

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Ajay Prajapati**
- LinkedIn: [linkedin.com/in/ajayprajapatii](https://linkedin.com/in/ajayprajapatii)
- GitHub: [github.com/ajayprajapati83](https://github.com/ajayprajapati83)
- Email: 64.ajayprajapati@gmail.com
- Location: Mumbai, Maharashtra, India


---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
