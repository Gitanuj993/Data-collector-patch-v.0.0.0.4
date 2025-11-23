# Stopwatch Application

## Overview

A precision stopwatch application with lap tracking functionality built using React, Express, and TypeScript. The application provides a clean, utility-focused interface for timing activities with the ability to record and rename individual laps. The design follows Material Design principles with Apple HIG influences, prioritizing readability and single-tap actions for efficient user interaction.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for client-side routing (lightweight alternative to React Router)

**UI Component System**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Component variants managed through class-variance-authority (CVA)
- Design system configured for "new-york" style with neutral base colors

**State Management**
- React hooks (useState, useEffect, useRef) for local component state
- TanStack Query (React Query) for server state management and caching
- No global state management library - state kept local to components where possible

**Timer Implementation**
- Uses requestAnimationFrame for high-precision timing updates
- Reference-based time tracking to avoid drift from state updates
- Lap data stored in component state as array of Lap objects

**Styling Approach**
- CSS variables for theming with light/dark mode support
- Monospace fonts for timer display (SF Mono, Roboto Mono, Consolas fallbacks)
- Responsive design using Tailwind breakpoints (mobile-first)
- Custom hover and active elevation effects for interactive elements

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for the API server
- Separate entry points for development (index-dev.ts) and production (index-prod.ts)
- HTTP server creation handled through Node's native http module

**Development vs Production**
- Development: Vite middleware integration for HMR and SSR of index.html
- Production: Static file serving from pre-built dist directory
- Custom logging middleware for API request tracking

**Data Storage Interface**
- Abstract IStorage interface defining CRUD operations
- MemStorage implementation using in-memory Map for development
- Prepared for database integration through interface pattern
- User schema defined but not actively used in stopwatch functionality

**API Structure**
- Routes registered in registerRoutes function
- All API endpoints prefixed with /api
- Storage layer abstraction allows swapping implementations without changing route logic

### External Dependencies

**Database (Configured but Not Required)**
- Drizzle ORM configured for PostgreSQL
- Neon Database serverless driver (@neondatabase/serverless)
- Schema defined in shared/schema.ts with users table
- Migration support through drizzle-kit
- Note: Current stopwatch implementation works entirely client-side without database persistence

**UI Dependencies**
- Radix UI primitives for accessible component foundations
- Lucide React for icon system
- date-fns for potential date formatting
- embla-carousel-react for carousel functionality
- cmdk for command palette interface

**Form Handling**
- React Hook Form with Zod validation through @hookform/resolvers
- Drizzle-zod for schema-based validation generation

**Development Tools**
- tsx for TypeScript execution in development
- esbuild for production server bundling
- Replit-specific plugins for development experience (cartographer, dev-banner, runtime-error-modal)

**Session Management**
- connect-pg-simple for PostgreSQL session storage (configured but not actively used)

### Design System Decisions

**Typography Scale**
- Timer display: text-6xl to text-8xl with font-light weight
- Milliseconds shown at reduced opacity (60%) for visual hierarchy
- System font stacks prioritizing monospace for numbers, sans-serif for labels

**Spacing System**
- Tailwind spacing units: 2, 4, 6, 8 for consistency
- Component padding: p-4 to p-6
- Section gaps: gap-6 to gap-8

**Color System**
- HSL-based color tokens for light/dark theme support
- Primary color: Blue (217° hue, 91% saturation)
- Border overlays using CSS variables for adaptive contrast
- Shadow system with multiple elevation levels

**Interaction Patterns**
- Inline editing for lap names without modal overlays
- Keyboard support (Enter to save, Escape to cancel)
- Disabled states for context-inappropriate actions (lap button when stopped)
- Persistent state visibility (running/stopped indicator)