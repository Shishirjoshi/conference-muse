# Premium Design System - Stripe/Apple Style

## 🎨 Color Palette

### Light Mode

#### Primary Colors
| Name | Hex | RGB | HSL | Usage |
|------|-----|-----|-----|-------|
| **Primary** | `#0066FF` | `0, 102, 255` | `221° 100% 50%` | CTAs, buttons, links, highlights |
| **Primary Light** | `#E6F0FF` | `230, 240, 255` | `221° 100% 95%` | Backgrounds, hover states |
| **Primary Dark** | `#0052CC` | `0, 82, 204` | `221° 100% 40%` | Pressed states, dark accents |

#### Secondary Colors (Accent Orange)
| Name | Hex | RGB | HSL | Usage |
|------|-----|-----|-----|-------|
| **Secondary** | `#FF5722` | `255, 87, 34` | `11° 100% 57%` | Secondary CTAs, alerts |
| **Secondary Light** | `#FFF3E0` | `255, 243, 224` | `11° 100% 94%` | Secondary backgrounds |
| **Secondary Dark** | `#E64A19` | `230, 74, 25` | `11° 89% 50%` | Secondary pressed states |

#### Accent Colors (Green)
| Name | Hex | RGB | HSL | Usage |
|------|-----|-----|-----|-------|
| **Accent** | `#10B981` | `16, 185, 129` | `160° 84% 39%` | Success, badges, micro-interactions |
| **Accent Light** | `#ECFDF5` | `236, 253, 245` | `160° 76% 97%` | Success backgrounds |

#### Neutral Colors
| Name | Hex | RGB | HSL | Usage |
|------|-----|-----|-----|-------|
| **Background** | `#FFFFFF` | `255, 255, 255` | `0° 0% 100%` | Primary background |
| **Background Alt** | `#F8F9FA` | `248, 249, 250` | `210° 14% 97%` | Alternate sections |
| **Background Soft** | `#F3F4F6` | `243, 244, 246` | `210° 14% 96%` | Card backgrounds |
| **Foreground** | `#111827` | `17, 24, 39` | `218° 41% 11%` | Primary text |
| **Foreground Muted** | `#6B7280` | `107, 114, 128` | `215° 10% 45%` | Secondary text |
| **Border** | `#E5E7EB` | `229, 231, 235` | `210° 15% 91%` | Borders, dividers |
| **Border Light** | `#F0F0F0` | `240, 240, 240` | `0° 0% 94%` | Subtle borders |

#### Semantic Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Success** | `#10B981` | ✓ Success messages, positive actions |
| **Warning** | `#F59E0B` | ⚠ Warning messages, alerts |
| **Error** | `#EF4444` | ✗ Errors, destructive actions |
| **Info** | `#3B82F6` | ℹ Info messages, notices |

### Dark Mode

#### Primary Colors
| Name | Hex | RGB | HSL | Usage |
|------|-----|-----|-----|-------|
| **Primary** | `#3B82F6` | `59, 130, 246` | `217° 91% 60%` | CTAs, buttons, links |
| **Primary Light** | `#1E3A8A` | `30, 58, 138` | `217° 65% 33%` | Backgrounds |
| **Primary Dark** | `#60A5FA` | `96, 165, 250` | `217° 93% 68%` | Hover states |

#### Neutral Colors
| Name | Hex | RGB | HSL | Usage |
|------|-----|-----|-----|-------|
| **Background** | `#0F172A` | `15, 23, 42` | `218° 48% 11%` | Primary dark background |
| **Background Alt** | `#1E293B` | `30, 41, 59` | `215° 34% 18%` | Alternate sections |
| **Background Soft** | `#334155` | `51, 65, 85` | `215° 25% 27%` | Card backgrounds |
| **Foreground** | `#F1F5F9` | `241, 245, 249` | `210° 40% 96%` | Primary text |
| **Foreground Muted** | `#94A3B8` | `148, 163, 184` | `215° 22% 65%` | Secondary text |
| **Border** | `#475569` | `71, 85, 105` | `215° 20% 35%` | Borders |
| **Border Light** | `#1E293B` | `30, 41, 59` | `215° 34% 18%` | Subtle borders |

---

## 🎯 Design Principles

### 1. **Hierarchy & Contrast**
- Primary actions use bold primary blue
- Secondary actions use soft, muted colors
- Text hierarchy: Foreground → Foreground Muted → Border
- WCAG AAA compliance (7:1 contrast minimum)

### 2. **Minimalism**
- Clean, uncluttered design
- Subtle shadows instead of heavy ones
- Generous whitespace
- Single accent color per element

### 3. **Premium Feel**
- Smooth transitions (200-300ms)
- Subtle gradients
- Soft, rounded corners (8-12px)
- Consistent spacing (4px grid)

### 4. **Micro-interactions**
- Hover: Slight color shift + shadow elevation
- Active: Color darken + slight scale
- Focus: Ring + border highlight
- Loading: Pulse animation

---

## 📦 Component Specifications

### Buttons

#### Primary Button
```css
.btn-primary {
  background: #0066FF;
  color: white;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 200ms;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: #0052CC;
  box-shadow: 0 4px 12px rgba(0, 102, 255, 0.25);
  transform: translateY(-2px);
}

.btn-primary:active {
  background: #004099;
  transform: translateY(0);
}

.btn-primary:focus {
  outline: none;
  ring: 2px solid rgba(0, 102, 255, 0.3);
  ring-offset: 2px;
}
```

#### Secondary Button
```css
.btn-secondary {
  background: #F8F9FA;
  color: #111827;
  border: 1px solid #E5E7EB;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms;
}

.btn-secondary:hover {
  background: #F3F4F6;
  border-color: #D1D5DB;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
```

#### Tertiary Button (Outline)
```css
.btn-tertiary {
  background: transparent;
  color: #0066FF;
  border: 2px solid #0066FF;
  padding: 8px 22px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms;
}

.btn-tertiary:hover {
  background: #E6F0FF;
}
```

### Cards

#### Conference Card
```css
.card-conference {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 24px;
  transition: all 300ms;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-conference:hover {
  border-color: #0066FF;
  box-shadow: 0 12px 24px rgba(0, 102, 255, 0.12);
  transform: translateY(-4px);
}
```

#### Glassmorphism Card
```css
.card-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 24px;
}
```

### Form Inputs

#### Text Input
```css
.input-field {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: all 200ms;
  background: white;
  color: #111827;
}

.input-field:hover {
  border-color: #D1D5DB;
}

.input-field:focus {
  outline: none;
  border-color: #0066FF;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.input-field::placeholder {
  color: #9CA3AF;
}
```

### Text Hierarchy

#### Headings
```css
h1 { font-size: 48px; font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
h2 { font-size: 36px; font-weight: 700; line-height: 1.25; letter-spacing: -0.01em; }
h3 { font-size: 28px; font-weight: 700; line-height: 1.3; }
h4 { font-size: 22px; font-weight: 600; line-height: 1.35; }
h5 { font-size: 18px; font-weight: 600; line-height: 1.4; }
h6 { font-size: 16px; font-weight: 600; line-height: 1.4; }
```

#### Body Text
```css
body { font-size: 16px; font-weight: 400; line-height: 1.6; color: #111827; }
p { margin-bottom: 16px; }
.text-sm { font-size: 14px; line-height: 1.5; }
.text-xs { font-size: 12px; line-height: 1.4; }
```

---

## 🎬 Animations & Transitions

### Timing
- Micro interactions: 150-200ms
- Page transitions: 200-300ms
- Loading states: 300-500ms

### Easing
- Default: `cubic-bezier(0.4, 0, 0.2, 1)`
- In: `cubic-bezier(0.4, 0, 1, 1)`
- Out: `cubic-bezier(0, 0, 0.2, 1)`

### Examples
```css
/* Smooth color transition */
transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);

/* Elevation on hover */
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

/* Fade in */
animation: fadeIn 300ms ease-out;

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## ♿ Accessibility

### Contrast Ratios
- Primary text on white: 15:1 (AAA ✓)
- Secondary text on white: 4.5:1 (AA ✓)
- Primary button on white: 8.6:1 (AAA ✓)
- All interactive elements: Minimum 4.5:1

### Focus States
```css
/* Visible focus ring for all interactive elements */
:focus-visible {
  outline: 2px solid #0066FF;
  outline-offset: 2px;
}
```

### Keyboard Navigation
- Tab order follows visual flow
- Focus indicators always visible
- No keyboard traps
- All controls accessible via keyboard

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | < 640px | Small phones |
| Tablet | 640px - 1024px | Tablets |
| Desktop | 1024px - 1280px | Small desktops |
| Large | > 1280px | Large monitors |

---

## 🌙 Dark Mode Implementation

Dark mode uses the same principles with inverted neutrals:
- Background: #0F172A (very dark blue)
- Text: #F1F5F9 (near white)
- Primary: #3B82F6 (lighter blue)
- Borders: #475569 (dark gray)

Toggle support via:
```html
<html class="dark">
```

---

## 📐 Spacing Scale

Based on 4px units:
```
2px (0.5), 4px (1), 8px (2), 12px (3), 16px (4), 
24px (6), 32px (8), 48px (12), 64px (16), 96px (24)
```

---

## 🔤 Typography

### Font Family
- **Primary**: Inter (sans-serif)
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

---

## 💾 CSS Variables

```css
:root {
  /* Colors */
  --primary: #0066FF;
  --primary-light: #E6F0FF;
  --primary-dark: #0052CC;
  
  --secondary: #FF5722;
  
  --accent: #10B981;
  
  --foreground: #111827;
  --foreground-muted: #6B7280;
  
  --background: #FFFFFF;
  --background-alt: #F8F9FA;
  --background-soft: #F3F4F6;
  
  --border: #E5E7EB;
  --border-light: #F0F0F0;
  
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}

.dark {
  --primary: #3B82F6;
  --primary-light: #1E3A8A;
  --primary-dark: #60A5FA;
  
  --foreground: #F1F5F9;
  --foreground-muted: #94A3B8;
  
  --background: #0F172A;
  --background-alt: #1E293B;
  --background-soft: #334155;
  
  --border: #475569;
  --border-light: #1E293B;
}
```

---

## ✅ Implementation Checklist

- [ ] Update tailwind.config.ts
- [ ] Update CSS variables
- [ ] Create button components
- [ ] Create card components
- [ ] Update form inputs
- [ ] Test dark mode toggle
- [ ] Verify accessibility (WCAG)
- [ ] Test animations on low-end devices
- [ ] Mobile responsiveness check
- [ ] Cross-browser compatibility

