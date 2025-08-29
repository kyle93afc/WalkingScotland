# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a **Walking Scotland** application - a comprehensive Scottish walking routes platform built with Next.js 15, Convex real-time database, and Clerk authentication. The application helps users discover, plan, and share Scottish walking experiences across regions like the Highlands, Cairngorms, and Southern Uplands.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack on http://localhost:3000
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run Next.js linting

### Convex Development
- `npx convex dev` - Start Convex development server (required for database)
- Run this in a separate terminal alongside `npm run dev`

## Architecture Overview

### Tech Stack
- **Next.js 15** with App Router and Turbopack
- **Convex** for real-time database and serverless functions
- **Clerk** for authentication and user management
- **Mapbox GL v3.14** for interactive walk route mapping
- **TailwindCSS v4** with custom UI components (shadcn/ui)
- **TypeScript** throughout

### Key Architectural Patterns

#### Authentication Flow
1. Clerk handles all authentication via `middleware.ts`
2. JWT tokens are configured with "convex" template in Clerk dashboard
3. Users are synced to Convex via webhooks at `/api/clerk-users-webhook`
4. Protected routes redirect unauthenticated users to sign-in

#### Database Architecture
- **Convex** provides real-time sync and serverless functions
- Schema defined in `convex/schema.ts`:
  - `users` table: Synced from Clerk (externalId maps to Clerk ID)
  - `walks` table: Scottish walking routes with GPS coordinates, difficulty, terrain
  - `regions` table: Scottish geographic areas (Highlands, Cairngorms, etc.)
  - `walk_stages` table: Step-by-step walking directions and waypoints
  - `walk_reports` table: User-generated walk experiences and ratings
  - `user_stats` table: Walking achievements (Munros, Corbetts, distance totals)
- All database operations in `convex/` directory

#### Walking-Specific Features
1. **Route Mapping**: Mapbox integration for walk visualization and GPS coordinates
2. **Scottish Domain**: Bog factor ratings, Munro tracking, Ordnance Survey grid references
3. **Community Content**: Walk reports, photos, ratings, and real-time updates
4. **Safety Features**: Live location sharing, weather integration, terrain warnings

### Project Structure
```
app/
├── (landing)/         # Public marketing and walk discovery pages
│   ├── featured-walks.tsx    # Popular Scottish walks showcase
│   ├── region-showcase.tsx   # Scottish regions overview
│   └── testimonials.tsx      # Walker experiences and reviews
├── walks/            # Core walking functionality
│   ├── WalkDiscovery.tsx     # Walk browsing with filters and maps
│   └── [slug]/               # Individual walk detail pages
├── regions/          # Scottish region pages
├── dashboard/        # User dashboard with walking statistics
└── layout.tsx        # Root layout with providers

components/
├── ui/               # shadcn/ui components
├── map/              # Mapping components
│   ├── ScotlandRegionMap.tsx # Scotland regions map
│   ├── WalkMap.tsx           # Individual walk route maps
│   └── RegionMap.tsx         # Generic region mapping
├── search/           # Walk search and filtering
├── downloads/        # GPX file downloads
└── ConvexClientProvider.tsx

convex/
├── schema.ts         # Complete walking database schema
├── walks.ts          # Walk data and queries
├── regions.ts        # Scottish regions management
├── walkStages.ts     # Walking directions and waypoints
├── walkReports.ts    # User-generated walk reports
├── users.ts          # User profiles and walking statistics
└── auth.config.ts    # JWT configuration
```

## Key Integration Points

### Environment Variables Required
- `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_FRONTEND_API_URL` (from Clerk JWT template)
- `CLERK_WEBHOOK_SECRET` (set in Convex dashboard)
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` (for interactive maps - optional)

### Webhook Configuration
Clerk webhooks must be configured to:
- Endpoint: `{your_domain}/api/clerk-users-webhook`
- Events: `user.created`, `user.updated`, `user.deleted`

### Real-time Data Flow
1. UI components use Convex hooks (`useQuery`, `useMutation`)
2. Convex provides automatic real-time updates for walk data and user reports
3. Authentication context from `useAuth()` (Clerk)
4. User data synced between Clerk and Convex
5. Maps integrate with walk coordinates for real-time route visualization

## Walking-Specific Development Guidelines

### Scottish Walking Domain Standards
- Use consistent terminology: "Munro", "Corbett", "Donald", "bog factor"
- Maintain accurate Scottish geographic references and place names
- Follow Ordnance Survey grid reference format (e.g., "NG342359")
- Distance in kilometers, elevation in meters
- Difficulty ratings: "Easy", "Moderate", "Hard", "Strenuous"

### Critical Component Integration Rules
- **Import Fix Required**: `WalkDiscovery.tsx` line 13 uses `RegionMap` but should use `ScotlandRegionMap`
- **Field Name Consistency**: UI must use `walk.averageRating` not `walk.rating` to match database schema
- **Map Component Priority**: Always prefer `ScotlandRegionMap` over generic `RegionMap` for Scottish walks
- **Real Data Integration**: Replace mock data with proper Convex queries using existing functions

### Database Query Patterns
- Use `api.walks.getPublishedWalks` for walk listings
- Use `api.regions.getAllRegions` for region data
- Use `api.walkStages.getStagesByWalkId` for walking directions
- Use `api.walkReports.getReportsByWalk` for user experiences
- Always handle loading states and errors for walk data

## Shadcn Component Installation Rules
When installing shadcn/ui components:
- ALWAYS use `bunx --bun shadcn@latest add [component-name]` instead of `npx`
- If dependency installation fails, manually install with `bun install [dependency-name]`
- Check components.json for existing configuration before installing
- Verify package.json after installation to ensure dependencies were added
- Multiple components can be installed at once: `bunx --bun shadcn@latest add button card drawer`
