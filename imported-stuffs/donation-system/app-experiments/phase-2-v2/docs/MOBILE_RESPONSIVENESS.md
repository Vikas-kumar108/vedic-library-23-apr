# Mobile Responsiveness Guide

This document describes how the VedicSkills platform handles different screen sizes.

## Overview

The platform is **mobile-first responsive**, meaning it works on all devices:
- Mobile phones (320px - 767px)
- Tablets (768px - 1023px)
- Desktops (1024px+)

## Breakpoints Used

| Breakpoint | Tailwind Prefix | Screen Width |
|------------|-----------------|--------------|
| Mobile | (default) | < 640px |
| Small | `sm:` | >= 640px |
| Medium | `md:` | >= 768px |
| Large | `lg:` | >= 1024px |
| Extra Large | `xl:` | >= 1280px |

---

## Navigation

### Desktop Navigation
- **File**: `components/site-header.tsx`
- Full horizontal navigation bar with all links visible
- User dropdown menu on right

### Mobile Navigation
- **File**: `components/mobile-nav.tsx`
- Hamburger menu icon (3 lines) appears on left
- Opens slide-out sheet from left side
- Contains all navigation links + user actions
- Closes automatically when a link is clicked

---

## Key Pages and Their Mobile Behavior

### 1. Donate Page (`/donate`)

| Element | Desktop | Mobile |
|---------|---------|--------|
| Hero section | Large padding, big text | Smaller padding, responsive text |
| Impact stats | 4 columns | 2 columns |
| Payment tabs | Full width | Full width, stacked |
| Donation form | Side by side (UPI info + form) | Stacked vertically |

**Responsive classes used:**
```css
grid grid-cols-2 md:grid-cols-4  /* Stats */
grid lg:grid-cols-2              /* Form layout */
py-16 md:py-24                   /* Spacing */
text-4xl md:text-5xl             /* Headings */
```

### 2. Membership Page (`/membership`)

| Element | Desktop | Mobile |
|---------|---------|--------|
| Tier cards | 3 columns | 1 column (stacked) |
| Frequency tabs | Horizontal | Horizontal with scroll |
| Benefits grid | 3 columns | 1 column |

**Responsive classes used:**
```css
grid md:grid-cols-3  /* Membership cards */
```

### 3. Admin Dashboard (`/admin/*`)

| Element | Desktop | Mobile |
|---------|---------|--------|
| Sidebar | Fixed left sidebar (256px) | Hidden |
| Navigation | Vertical sidebar | Horizontal scrollable bar |
| Content | Full width minus sidebar | Full width |

**Responsive classes used:**
```css
hidden lg:flex          /* Sidebar */
lg:hidden               /* Mobile nav */
```

### 4. User Dashboard (`/dashboard`)

| Element | Desktop | Mobile |
|---------|---------|--------|
| Stats cards | 4 columns | 2 columns |
| Recent donations | 2/3 width | Full width |
| Quick actions | 1/3 width | Full width below |

**Responsive classes used:**
```css
grid gap-6 lg:grid-cols-3
lg:col-span-2
```

### 5. Transparency Page (`/transparency`)

| Element | Desktop | Mobile |
|---------|---------|--------|
| Stats | 4 columns | 2 columns |
| Donation list | Side by side with chart | Stacked |

### 6. About Page (`/about`)

| Element | Desktop | Mobile |
|---------|---------|--------|
| Team grid | 4 columns | 2 columns |
| Values grid | 3 columns | 1 column |

---

## Form Components

All forms are mobile-optimized:

### Amount Selection Buttons
```css
grid grid-cols-3 sm:grid-cols-5  /* 3 on mobile, 5 on larger */
```

### Form Fields
```css
grid gap-4 sm:grid-cols-2  /* Stacked on mobile, 2-col on larger */
```

---

## Testing Mobile Responsiveness

### Using Browser DevTools

1. Open Chrome/Firefox DevTools (F12)
2. Click the device toggle icon (or Ctrl+Shift+M)
3. Select a device or set custom dimensions
4. Test these sizes:
   - iPhone SE: 375px
   - iPhone 12: 390px
   - iPad: 768px
   - Desktop: 1280px

### Common Test Cases

1. **Navigation**
   - [ ] Hamburger menu appears on mobile
   - [ ] Menu opens and shows all links
   - [ ] Menu closes after clicking a link
   - [ ] User dropdown works on mobile

2. **Donation Page**
   - [ ] Payment tabs are usable
   - [ ] Amount buttons are tappable (44px+ height)
   - [ ] Form fields are not too small
   - [ ] 80G checkbox and fields work

3. **Admin Panel**
   - [ ] Horizontal nav scrolls on mobile
   - [ ] Tables scroll horizontally
   - [ ] Action buttons are tappable

4. **Forms**
   - [ ] Input fields have proper padding
   - [ ] Buttons are full width on mobile
   - [ ] Error messages are visible

---

## Touch Targets

All interactive elements meet minimum touch target size (44x44px):
- Buttons have minimum `h-10` (40px) with padding
- Links have adequate padding
- Form inputs have proper sizing

---

## Files Modified for Mobile

| File | Changes |
|------|---------|
| `components/site-header.tsx` | Added MobileNav import |
| `components/mobile-nav.tsx` | NEW - Mobile slide-out navigation |
| `app/admin/layout.tsx` | Improved mobile nav styling |
| `app/globals.css` | Added scrollbar-hide utility |

---

## Future Improvements

These could be added to enhance mobile experience:
- [ ] Pull-to-refresh on mobile
- [ ] Swipe gestures for tabs
- [ ] Bottom navigation bar option
- [ ] PWA (Progressive Web App) support
- [ ] Touch-optimized date pickers
