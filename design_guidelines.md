# Design Guidelines: Admin Leaderboard Competition System

## Design Approach: Material Design (Data-Focused)

**Rationale:** This is a utility-focused admin dashboard requiring clear data presentation, efficient workflows, and strong visual feedback for actions. Material Design provides:
- Excellent data table patterns
- Clear button hierarchy for quick actions
- Strong Arabic/RTL support
- Gamification-friendly elevation and color system

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background: 222 15% 12% (deep slate)
- Surface: 222 15% 18% (elevated panels)
- Surface Elevated: 222 15% 22% (cards, top 3 podium)
- Primary: 47 100% 55% (motivational gold)
- Success: 142 70% 45% (positive actions)
- Error: 0 65% 55% (negative actions)
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 70%

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Primary: 47 90% 50%
- Success: 142 65% 42%
- Error: 0 70% 50%
- Text Primary: 222 25% 15%
- Text Secondary: 222 15% 45%

**Accent Colors:**
- Gold Medal: 45 100% 55%
- Silver Medal: 0 0% 75%
- Bronze Medal: 30 55% 50%
- Warning: 38 92% 50% (for delays)
- Info: 210 75% 55%

### B. Typography

**Font Families:**
- Arabic: 'Cairo', 'IBM Plex Sans Arabic' via Google Fonts
- Numbers/UI: 'Inter' for Latin numerals

**Hierarchy:**
- Page Title: text-4xl font-bold (للوحة الرئيسية)
- Section Headers: text-2xl font-semibold
- Card Titles: text-xl font-semibold
- Body Text: text-base font-normal
- Stats/Numbers: text-3xl font-bold (for point displays)
- Table Headers: text-sm font-semibold uppercase tracking-wide
- Table Cells: text-sm font-normal
- Button Text: text-sm font-medium

### C. Layout System

**Spacing Scale:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 consistently
- Component padding: p-6 to p-8
- Card spacing: gap-6
- Section margins: mb-8 to mb-12
- Button padding: px-4 py-2 to px-6 py-3

**Container Structure:**
- Max width: max-w-7xl mx-auto
- Page padding: px-4 md:px-6 lg:px-8
- Responsive breakpoints: md:, lg:, xl:

### D. Component Library

**Top 3 Podium Section:**
- Large elevated card at page top
- 3-column grid: 2nd place (silver/left) - 1st place (gold/center, larger) - 3rd place (bronze/right)
- Each with: crown icon, admin photo/avatar, name, total points (large number)
- Center position elevated higher with scale-105
- Gold gradient background for 1st, subtle metallic shimmer for 2nd/3rd
- Shadow-xl for depth

**Leaderboard Table:**
- Full-width data table with alternating row colors
- Columns: Rank | Avatar | Admin Name | Total Points | Attendance | Delays | Absences | Actions
- Sticky header with shadow on scroll
- Rank column shows medal emojis for top 3, numbers for rest
- Hover state on rows with subtle background change

**Quick Action Buttons:**
- Compact button group for each admin row
- Color-coded: Success (green) for positive, Error (red) for negative, Warning (amber) for delays
- Icon + text labels in Arabic
- Grouped by category: Attendance | Activities | Penalties

**Statistics Cards:**
- Grid of 4 summary cards below podium
- Each card: Large number, label, trend indicator
- Cards: Total Admins | Total Points Distributed | Active Period | Next Reward In
- Subtle gradient backgrounds

**Admin Management Panel:**
- Floating action button (bottom-right) to add new admin
- Modal form for adding/editing admin details
- Form fields: Name, Initial Points, Photo Upload

**Points Adjustment Section:**
- Inline input field for manual point adjustment
- +/- buttons with immediate feedback
- Confirmation tooltip for large changes

### E. Component Details

**Buttons:**
- Primary: Solid gold background, white text
- Secondary: Outlined with primary color
- Success: Solid green for positive actions
- Destructive: Solid red for negative actions
- Size: Default (h-10), Small (h-8) for table actions
- All with hover:brightness-110 transition

**Cards:**
- Rounded corners: rounded-xl
- Elevation: shadow-lg for podium, shadow-md for others
- Border: 1px subtle border in dark mode
- Background blur for glassmorphic effect on podium

**Tables:**
- Dense spacing for data efficiency
- Zebra striping: even rows slightly darker
- Hover highlight with transition
- Mobile: Stack into cards on small screens

**Badges/Tags:**
- Small rounded-full badges for status
- Color-coded by type (active, warning, success)
- Used for attendance status indicators

**Modals/Dialogs:**
- Centered overlay with backdrop blur
- White/dark surface with rounded corners
- Header with title and close button
- Footer with action buttons (cancel/confirm)

### F. Animations (Minimal)

**Use Only:**
- Point counter animation when values change (count-up effect)
- Smooth transitions on hover states (200ms)
- Fade-in for newly added admins
- Confetti burst animation when announcing Top 3 winners (subtle, once per period)
- Smooth scroll to top when leaderboard updates

**Avoid:**
- Constant motion or distracting effects
- Parallax or scroll-triggered animations
- Looping animations

## Images

**No hero images** - This is a data-focused admin dashboard. Visual focus is on:
- Admin avatars/photos (circular, 48px for table, 96px for podium)
- Crown icons for top 3 (large, stylized SVG icons from Heroicons or custom)
- Trophy/medal graphics for podium section

Use placeholder avatars with colorful gradients and initials for admins without photos.

## RTL (Right-to-Left) Considerations

- All text aligned right by default
- Table columns flow right-to-left
- Button groups reverse order
- Navigation and UI elements mirror horizontally
- Number formatting respects Arabic numeral preferences

## Accessibility

- High contrast ratios (4.5:1 minimum)
- Keyboard navigation for all actions
- Screen reader labels in Arabic
- Focus indicators on all interactive elements
- Color not the only indicator of status (use icons too)