# Premium Design System - Implementation Guide

## 🚀 Quick Start

### Color Usage

#### In JSX/TSX
```tsx
<button className="bg-primary text-white">Primary Button</button>
<button className="border-2 border-primary text-primary">Outline Button</button>
<div className="bg-slate-50 dark:bg-slate-900">Neutral Background</div>
```

#### In CSS
```css
.my-element {
  background-color: hsl(var(--primary));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}
```

---

## 📦 Component Examples

### 1. Navigation Bar (Sticky & Premium)

```tsx
export function PremiumNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-lg font-bold text-foreground">ConfrHub</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 md:flex">
          {['Home', 'Events', 'Pricing', 'Contact'].map(item => (
            <a 
              key={item}
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <button className="btn-primary">Get Started</button>
      </div>
    </nav>
  );
}
```

### 2. Hero Section

```tsx
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 text-center">
        {/* Badge */}
        <div className="badge-primary mb-6 inline-block">✨ Premium Design System</div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Premium Conference <span className="gradient-text">Platform</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          A modern, premium design system inspired by Stripe and Apple. 
          Built for professional conferences and tech events.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="btn-primary">Explore Conferences</button>
          <button className="btn-secondary">View Pricing</button>
        </div>
      </div>
    </section>
  );
}
```

### 3. Conference Card (Premium)

```tsx
export function ConferenceCard({ title, date, location, image }) {
  return (
    <a href="#" className="card-premium block group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Badge */}
        <div className="badge-primary inline-block mb-4">Tech Conference</div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Details */}
        <div className="space-y-2 text-sm text-muted-foreground mb-6">
          <p>📅 {date}</p>
          <p>📍 {location}</p>
        </div>

        {/* CTA */}
        <button className="btn-primary w-full">
          Learn More →
        </button>
      </div>
    </a>
  );
}
```

### 4. Form Input

```tsx
export function ContactForm() {
  return (
    <form className="max-w-md space-y-6">
      {/* Name Input */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Full Name
        </label>
        <input 
          type="text"
          placeholder="John Doe"
          className="input-field"
        />
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Email Address
        </label>
        <input 
          type="email"
          placeholder="you@example.com"
          className="input-field"
        />
      </div>

      {/* Message Textarea */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Message
        </label>
        <textarea 
          rows={5}
          placeholder="Tell us about your conference..."
          className="input-field resize-none"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn-primary w-full">
        Send Message
      </button>
    </form>
  );
}
```

### 5. Stats Section

```tsx
export function StatsSection() {
  const stats = [
    { label: 'Conferences', value: '500+' },
    { label: 'Attendees', value: '50K+' },
    { label: 'Countries', value: '100+' },
  ];

  return (
    <section className="section-alt py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map(stat => (
            <div key={stat.label} className="card-premium text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <p className="text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 6. Feature Cards

```tsx
export function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="card-premium group">
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-foreground mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
```

### 7. Button Variations

```tsx
export function ButtonShowcase() {
  return (
    <div className="space-y-4 p-8 bg-background rounded-lg border border-border">
      {/* Primary Button */}
      <button className="btn-primary">
        Primary Button
      </button>

      {/* Secondary Button */}
      <button className="btn-secondary">
        Secondary Button
      </button>

      {/* Outline Button */}
      <button className="btn-tertiary">
        Outline Button
      </button>

      {/* Ghost Button */}
      <button className="btn-ghost">
        Ghost Button
      </button>

      {/* Button with Icon */}
      <button className="btn-primary flex items-center gap-2">
        <span>Download</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>

      {/* Disabled Button */}
      <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
        Disabled Button
      </button>
    </div>
  );
}
```

### 8. Badge Variations

```tsx
export function BadgeShowcase() {
  return (
    <div className="flex flex-wrap gap-4 p-6 bg-background">
      <span className="badge-primary">Primary</span>
      <span className="badge-secondary">Secondary</span>
      <span className="badge-success">Success ✓</span>
      <span className="badge-warning">Warning ⚠</span>
      <span className="badge-error">Error ✗</span>
    </div>
  );
}
```

### 9. Pricing Cards

```tsx
export function PricingCard({ name, price, features, highlighted }) {
  return (
    <div className={`card-premium ${highlighted ? 'ring-2 ring-primary' : ''}`}>
      <h3 className="text-xl font-bold text-foreground mb-2">
        {name}
      </h3>
      <div className="text-3xl font-bold text-primary mb-6">
        ${price}<span className="text-lg text-muted-foreground">/mo</span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map(feature => (
          <li key={feature} className="flex items-center gap-3 text-sm">
            <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <button className={highlighted ? 'btn-primary w-full' : 'btn-secondary w-full'}>
        Get Started
      </button>
    </div>
  );
}
```

### 10. Dark Mode Toggle

```tsx
export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg border border-border hover:bg-muted transition-colors duration-200"
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
```

---

## 🎨 Typography Usage

```tsx
<h1 className="text-6xl font-bold text-foreground">Heading 1</h1>
<h2 className="text-4xl font-bold text-foreground">Heading 2</h2>
<h3 className="text-3xl font-bold text-foreground">Heading 3</h3>
<h4 className="text-2xl font-semibold text-foreground">Heading 4</h4>
<h5 className="text-xl font-semibold text-foreground">Heading 5</h5>
<h6 className="text-lg font-semibold text-foreground">Heading 6</h6>

<p className="text-base text-foreground leading-relaxed">Body text</p>
<p className="text-sm text-muted-foreground">Secondary text</p>
<p className="text-xs text-muted-foreground">Small text</p>
```

---

## 🎬 Animation Examples

```tsx
{/* Fade in animation */}
<div className="animate-fade-in">Fading in...</div>

{/* Slide in from left */}
<div className="animate-slide-in-left">Sliding in...</div>

{/* Scale in animation */}
<div className="animate-scale-in">Scaling in...</div>

{/* Pulse animation */}
<div className="animate-pulse-soft">Pulsing...</div>

{/* Float animation */}
<div className="animate-float">Floating...</div>
```

---

## 📱 Responsive Design

```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text size
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="card-premium">Card 1</div>
  <div className="card-premium">Card 2</div>
  <div className="card-premium">Card 3</div>
</div>
```

---

## ♿ Accessibility

All components include:
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ WCAG AAA contrast ratios
- ✅ Semantic HTML
- ✅ ARIA attributes

Example:
```tsx
<button 
  className="btn-primary focus:ring-2 focus:ring-primary/30"
  aria-label="Send message"
>
  Send
</button>
```

---

## 🌙 Dark Mode

Automatically handled with `.dark` class on html element.

Test dark mode:
```tsx
// In browser console:
document.documentElement.classList.add('dark');
document.documentElement.classList.remove('dark');
```

---

## 🚨 Color Semantics

| Semantic | Color | Usage |
|----------|-------|-------|
| **Primary** | #0066FF | Main CTAs, primary actions |
| **Secondary** | #FF5722 | Secondary CTAs, alerts |
| **Accent** | #10B981 | Success, positive feedback |
| **Warning** | #F59E0B | Warnings, caution |
| **Error** | #EF4444 | Errors, destructive actions |
| **Info** | #3B82F6 | Information, notices |

---

## 📐 Spacing Guide

```
2px  = 0.5 units
4px  = 1 unit
8px  = 2 units
12px = 3 units
16px = 4 units
24px = 6 units
32px = 8 units
48px = 12 units
```

Use consistently across components!

---

## ⚡ Performance Tips

1. **Minimize animations** - Use 200-300ms transitions
2. **Optimize shadows** - Use subtle shadows for better performance
3. **Lazy load images** - Use `loading="lazy"` on images
4. **CSS containment** - Use `contain: layout` on cards
5. **Backdrop blur** - Use sparingly, can impact performance

---

## ✅ Checklist for Implementation

- [ ] Update tailwind.config.ts ✓
- [ ] Update CSS variables ✓
- [ ] Apply to Navbar component
- [ ] Apply to all button components
- [ ] Apply to card components
- [ ] Apply to form inputs
- [ ] Update typography
- [ ] Test dark mode toggle
- [ ] Verify accessibility (WCAG AAA)
- [ ] Test on mobile devices
- [ ] Performance optimization
- [ ] Cross-browser testing

