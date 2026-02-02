# Responsive Design Quick Reference

## Responsive Breakpoints

```
Mobile:   < 768px   (base, sm)
Tablet:   768px - 1024px (md)
Desktop:  > 1024px  (lg, xl)
```

## Common Responsive Patterns Used

### 1. Stacking Layout
```jsx
// Mobile: column, Desktop: row
<div className="flex flex-col lg:flex-row gap-8">
  <div className="lg:w-1/2">Column 1</div>
  <div className="lg:w-1/2">Column 2</div>
</div>
```

### 2. Grid Layouts
```jsx
// Mobile: 1 col, Tablet: 2 col, Desktop: 3 col
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* items */}
</div>
```

### 3. Responsive Text
```jsx
// Mobile: 2xl, Tablet: 4xl, Desktop: 5xl
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
  Heading
</h1>
```

### 4. Hide/Show Elements
```jsx
// Hide on mobile, show on desktop
<div className="hidden md:block">
  Desktop only content
</div>

// Show on mobile, hide on desktop
<div className="md:hidden">
  Mobile only content
</div>
```

### 5. Responsive Padding/Margin
```jsx
{/* Mobile: 4, Tablet: 6, Desktop: 8 */}
<div className="px-4 md:px-6 lg:px-8">
  Content
</div>
```

## Key Responsive Classes

### Spacing
```
p-4 sm:p-6 md:p-8   // Padding
m-4 sm:m-6 md:m-8   // Margin
gap-4 md:gap-6 lg:gap-8  // Gap
```

### Sizing
```
w-full sm:w-1/2 lg:w-1/3  // Width
h-10 sm:h-12 md:h-14     // Height
```

### Display
```
hidden md:block      // Hide on mobile, show on tablet+
block md:hidden      // Show on mobile, hide on tablet+
flex flex-col md:flex-row  // Direction change
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

### Typography
```
text-base md:text-lg lg:text-xl
text-sm sm:text-base md:text-lg
```

## Mobile-First Development Approach

```jsx
// ✅ CORRECT: Start with mobile, add desktop enhancements
<div className="px-4 md:px-8">
  <h1 className="text-2xl md:text-4xl lg:text-5xl">
    Title
  </h1>
</div>

// ❌ WRONG: Don't use min-width media queries in Tailwind
// Tailwind handles this with responsive prefixes only
```

## Admin Table Responsiveness

### Before (Not Responsive)
```jsx
<table className="min-w-full">
  <thead>
    <tr>
      <th>Col 1</th>
      <th>Col 2</th>
    </tr>
  </thead>
</table>
```

### After (Responsive)
```jsx
<div className="bg-white rounded-lg shadow-lg overflow-x-auto horizontal-scroll">
  <table className="w-full min-w-max divide-y divide-gray-200">
    <thead className="bg-gray-50 sticky top-0">
      <tr>
        <th className="px-4 sm:px-6 py-3">Col 1</th>
        <th className="px-4 sm:px-6 py-3">Col 2</th>
      </tr>
    </thead>
  </table>
</div>
```

## Forms - Responsive Layouts

### Single Column (Mobile)
```jsx
<div className="space-y-4">
  <input />
  <input />
  <textarea />
</div>
```

### Two Columns (Desktop)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <input />
  <input />
  <div className="md:col-span-2">
    <textarea />
  </div>
</div>
```

## Navigation Patterns

### Hamburger Menu (Mobile)
```jsx
{isMobile && (
  <>
    <button onClick={() => setIsOpen(!isOpen)}>
      <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`} />
    </button>
    {isOpen && <MobileMenu />}
  </>
)}
```

### Desktop Navigation
```jsx
<nav className="hidden md:flex items-center space-x-6">
  {menuItems.map(item => <a key={item}>{item}</a>)}
</nav>
```

## Image Responsiveness

### Fluid Image
```jsx
<div className="relative h-64 md:h-96 lg:h-screen w-full">
  <Image
    src={imageUrl}
    alt="Description"
    fill
    className="object-cover"
  />
</div>
```

### Responsive Container
```jsx
<div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content scales with proper padding */}
</div>
```

## Button Responsiveness

### Single Button
```jsx
<button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4">
  Click Me
</button>
```

### Button Group
```jsx
<div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
  <button className="flex-1">Button 1</button>
  <button className="flex-1">Button 2</button>
</div>
```

## Touch Target Sizing

**Minimum touch target: 44x44px**

```jsx
{/* ✅ GOOD: 10 (40px) or larger */}
<button className="w-10 h-10 md:w-12 md:h-12">
  Touch me
</button>

{/* ❌ BAD: Smaller than 44px */}
<button className="w-6 h-6">
  Too small
</button>
```

## Responsive Images

### Hero Image
```jsx
<section className="relative h-screen overflow-hidden">
  <Image
    src={heroImage}
    alt="Hero"
    fill
    className="object-cover"
    sizes="100vw"
  />
</section>
```

### Card Image
```jsx
<div className="relative h-48 md:h-64 lg:h-80 w-full overflow-hidden rounded">
  <Image
    src={cardImage}
    alt="Card"
    fill
    className="object-cover group-hover:scale-110 transition-transform"
  />
</div>
```

## Common Responsive Classes

### Widths
- `w-4 sm:w-6 md:w-8 lg:w-10` - Icon sizing
- `w-full md:w-1/2 lg:w-1/3` - Column widths
- `max-w-sm md:max-w-2xl lg:max-w-4xl` - Max widths

### Heights
- `h-10 sm:h-12 md:h-14` - Fixed heights
- `h-screen md:h-auto` - Full height to auto

### Text
- `text-xs sm:text-sm md:text-base lg:text-lg`
- `font-normal sm:font-semibold md:font-bold`

### Spacing
- `py-4 md:py-8 lg:py-12` - Vertical padding
- `px-4 md:px-6 lg:px-8` - Horizontal padding
- `gap-2 md:gap-4 lg:gap-6` - Grid gap

## Utility Classes Added

### `.horizontal-scroll`
For mobile-friendly table scrolling:
```jsx
<div className="overflow-x-auto horizontal-scroll">
  <table>{/* Large table */}</table>
</div>
```

### `.container-responsive`
For responsive containers:
```jsx
<div className="container-responsive">
  {/* Auto-padding, max-width at each breakpoint */}
</div>
```

### `.grid-auto-responsive`
For auto-fitting grids:
```jsx
<div className="grid-auto-responsive">
  {/* Auto grid with 280px+ columns */}
</div>
```

## Testing Responsive Design

1. **Chrome DevTools**: Press F12, click device toggle
2. **Mobile Emulation**: Rotate device, check layout
3. **Real Devices**: Test on actual phones/tablets
4. **Breakpoints**: Test at 375px, 768px, 1024px

## Common Issues & Fixes

### Issue: Horizontal scrolling on mobile
```jsx
❌ <div style={{ width: '1200px' }}>
✅ <div className="w-full max-w-4xl mx-auto">
```

### Issue: Text too small on mobile
```jsx
❌ <h1 className="text-5xl">
✅ <h1 className="text-2xl md:text-3xl lg:text-5xl">
```

### Issue: Buttons too small on mobile
```jsx
❌ <button className="px-2 py-1">
✅ <button className="px-4 py-2 md:px-6 md:py-3">
```

### Issue: Images not scaling
```jsx
❌ <img src={url} className="w-1200px h-600px" />
✅ <Image src={url} fill className="object-cover" />
```

---

**Last Updated:** January 20, 2026
**Status:** Ready for Production
