# Stopwatch App Design Guidelines

## Design Approach

**System**: Material Design with Apple HIG influences
**Rationale**: Utility-focused application requiring clear hierarchy, instant readability, and efficient interaction patterns. Drawing from Google Clock and Apple Timer apps for proven stopwatch UX patterns.

## Core Design Principles

1. **Readability First**: Time display dominates the visual hierarchy
2. **Single-Tap Actions**: All primary functions accessible without nested menus
3. **Persistent Context**: Current state always visible (running/stopped)
4. **Efficient Editing**: Inline lap renaming without modal overlays

## Typography

**Time Display**:
- Font: System mono (SF Mono, Roboto Mono, or Consolas)
- Size: text-6xl to text-8xl for main timer (96-128px equivalent)
- Weight: font-light for primary digits, font-normal for milliseconds
- Format: MM:SS.ms with milliseconds in slightly smaller size

**Lap Labels**:
- Font: System sans-serif
- Primary text: text-base (16px)
- Secondary text: text-sm (14px)
- Weight: font-medium for lap names, font-normal for times

## Layout System

**Spacing Units**: Use Tailwind units of 2, 4, 6, and 8 for consistency
- Component padding: p-4 to p-6
- Section spacing: gap-6 to gap-8
- Button spacing: px-8 py-4

**Container Structure**:
```
max-w-2xl mx-auto px-4
Main viewport: min-h-screen flex flex-col
Timer section: flex-shrink-0
Laps section: flex-1 overflow-auto
```

## Component Library

### Main Timer Display
- Centered, large monospace digits
- Milliseconds in reduced opacity (opacity-60)
- Minimum height to prevent layout shift: min-h-[200px]
- Padding: py-12

### Control Buttons
Three primary actions in horizontal row:
- **Start/Stop** (Primary): Large, rounded-full, px-12 py-4
- **Lap** (Secondary): Rounded-lg, px-8 py-3, disabled when stopped
- **Reset** (Tertiary): Rounded-lg, px-6 py-3, only shown when stopped

Button sizing: text-lg font-semibold
Layout: flex gap-4 justify-center items-center

### Lap List Section
**Container**: 
- Scrollable area with max-h-[50vh] on desktop
- Full height on mobile: flex-1 overflow-y-auto
- Border-top divider separating from timer

**Lap Items** (each):
- Grid layout: grid grid-cols-[auto_1fr_auto] gap-4
- Items: [Lap #] [Lap Name (editable)] [Lap Time]
- Padding: px-6 py-4
- Border-bottom dividers between items
- Hover state: subtle background change

**Lap Numbering**:
- Display as "#1", "#2", etc.
- Fixed width: w-12
- Text alignment: text-right
- Styling: text-sm opacity-60

**Editable Lap Names**:
- Default: "Lap 1", "Lap 2"
- Click-to-edit inline (no modal)
- Input styling: border-b-2 outline-none bg-transparent
- Max width: truncate after 30 characters
- Focus state: border becomes visible

**Lap Times**:
- Monospace font
- Right-aligned: text-right
- Format: MM:SS.ms
- Weight: font-medium

### Empty State
When no laps recorded:
- Centered text in lap section
- Icon placeholder (stopwatch icon from chosen library)
- Text: "No laps recorded yet"
- Subtle styling: opacity-40 text-sm

## Icon Selection
**Library**: Heroicons (via CDN)
- Stopwatch/clock icon for empty state
- Pencil icon for edit affordance on hover

## Interaction Patterns

**Start/Stop Toggle**:
- Single button changes label and function
- "Start" → "Stop" when running
- Immediate visual feedback on state change

**Lap Recording**:
- Disabled state when timer stopped
- On tap: Records current time, adds to top of list
- Auto-scrolls to show newest lap
- Lap counter increments automatically

**Lap Renaming**:
- Single-click on lap name activates edit mode
- Enter key or blur saves
- ESC key cancels
- Show subtle pencil icon on hover

**Reset Behavior**:
- Only available when timer is stopped
- Clears all laps and resets timer to 00:00.00
- No confirmation modal (direct action)

## Responsive Behavior

**Mobile** (< 768px):
- Timer: text-5xl (reduced from text-7xl)
- Buttons stack vertically: flex-col gap-3
- Lap list: Full height remaining viewport
- Padding reduced: px-4

**Desktop** (≥ 768px):
- Timer: text-7xl or text-8xl
- Buttons horizontal: flex-row
- Fixed max-height for lap list
- Generous padding: px-6 to px-8

## Accessibility

- Semantic HTML: `<time>` element for timer display
- ARIA labels on all buttons
- Keyboard navigation: Tab through controls, Enter to activate
- Focus indicators on all interactive elements
- Sufficient contrast ratios for all text
- Input fields have visible labels (even if visually hidden)

## Performance Notes

- Use `requestAnimationFrame` for smooth timer updates
- Virtualize lap list if exceeding 50 items
- Debounce rename input saves (300ms)
- No animations except subtle button press feedback

This design prioritizes clarity, efficiency, and mobile-first usability while maintaining a clean, professional aesthetic suitable for a utility application.