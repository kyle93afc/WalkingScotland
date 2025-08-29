# Walking Scotland Source Tree Architecture

## Overview
This document provides a comprehensive guide to the Walking Scotland project structure, explaining the organization, purpose, and relationships between directories and key files.

## Project Root Structure

```
WalkingScotland/
├── 📁 app/                          # Next.js 15 App Router pages and layouts
├── 📁 components/                   # Reusable React components
├── 📁 convex/                       # Backend database functions and schema
├── 📁 docs/                         # Project documentation
├── 📁 hooks/                        # Custom React hooks
├── 📁 lib/                          # Utility functions and configurations
├── 📁 public/                       # Static assets and images
├── 📁 scripts/                      # Python data processing scripts
├── 📁 __tests__/                    # Integration tests
├── 📄 package.json                  # Project dependencies and scripts
├── 📄 CLAUDE.md                     # AI development guidelines
├── 📄 README.md                     # Project overview and setup
├── 📄 middleware.ts                 # Next.js authentication middleware
├── 📄 next.config.ts                # Next.js configuration
└── 📄 *.json                        # Walk data files for seeding
```

## Application Directory (`app/`)

### Next.js App Router Structure
```
app/
├── 📁 (landing)/                    # Public marketing pages
│   ├── 📄 page.tsx                  # Homepage with hero and features
│   ├── 📄 hero-section.tsx          # Main hero section component
│   ├── 📄 featured-walks.tsx        # Showcase of popular walks
│   ├── 📄 region-showcase.tsx       # Scottish regions overview
│   ├── 📄 testimonials.tsx          # User testimonials and reviews
│   ├── 📄 features-one.tsx          # Platform features highlight
│   ├── 📄 faqs.tsx                  # Frequently asked questions
│   └── 📄 call-to-action.tsx        # User engagement section
├── 📁 dashboard/                    # Protected user area
│   ├── 📄 page.tsx                  # User dashboard home
│   ├── 📄 layout.tsx                # Dashboard layout with sidebar
│   ├── 📄 app-sidebar.tsx           # Navigation sidebar component
│   ├── 📄 site-header.tsx           # Dashboard header
│   ├── 📄 data-table.tsx            # Generic data table component
│   ├── 📄 chart-area-interactive.tsx # Walking statistics charts
│   └── 📁 payment-gated/            # Subscription features (to be removed)
├── 📁 walks/                        # Core walking functionality (PRIMARY DISCOVERY)
│   ├── 📄 page.tsx                  # Walk discovery page with region browsing
│   ├── 📄 WalkDiscovery.tsx         # Enhanced walk browsing with region cards
│   ├── 📁 [slug]/                   # Individual walk pages
│   │   ├── 📄 page.tsx              # Route handler for walk detail
│   │   ├── 📄 WalkDetailPage.tsx    # Walk detail component
│   │   └── 📁 __tests__/            # Component tests
│   └── 📁 __tests__/                # Walk discovery tests
├── 📁 regions/                      # Scottish regions functionality
│   └── 📁 [slug]/                   # Individual region pages
│       └── 📄 page.tsx              # Region detail with walks list
├── 📁 admin/                        # Administrative features
│   └── 📁 seed/                     # Database seeding interface
│       └── 📄 page.tsx              # Admin seeding page
├── 📄 layout.tsx                    # Root app layout with providers
├── 📄 globals.css                   # Global styles and TailwindCSS
├── 📄 not-found.tsx                 # 404 error page
└── 📄 favicon.ico                   # App icon
```

## Components Directory (`components/`)

### Component Organization by Feature
```
components/
├── 📁 ui/                           # shadcn/ui base components
│   ├── 📄 button.tsx                # Base button component
│   ├── 📄 card.tsx                  # Card layout component
│   ├── 📄 input.tsx                 # Form input component
│   ├── 📄 table.tsx                 # Data table component
│   ├── 📄 chart.tsx                 # Chart wrapper components
│   ├── 📄 sidebar.tsx               # Sidebar navigation
│   └── 📄 [other-ui].tsx            # Additional UI primitives
├── 📁 map/                          # Map-related components
│   ├── 📄 ScotlandRegionMap.tsx     # Scotland regions map (working)
│   ├── 📄 RegionMap.tsx             # Generic region map
│   └── 📄 WalkMap.tsx               # Individual walk route map
├── 📁 search/                       # Search functionality
│   ├── 📄 WalkSearch.tsx            # Walk search and filtering
│   └── 📁 __tests__/                # Search component tests
├── 📁 walks/                        # Walk-specific components
│   ├── 📄 WalkCard.tsx              # Shared walk card component (discovery & featured)
│   └── 📄 WalkCompletionDialog.tsx  # Walk completion dialog
├── 📁 downloads/                    # File download features
│   └── 📄 GpxDownload.tsx           # GPX file download component
├── 📁 uploads/                      # File upload features
│   └── 📄 GpxUpload.tsx             # GPX file upload component
├── 📁 magicui/                      # Third-party UI components
│   ├── 📄 animated-list.tsx         # Animated list component
│   └── 📄 pulsating-button.tsx      # Animated button component
├── 📁 motion-primitives/            # Animation components
│   ├── 📄 infinite-slider.tsx       # Infinite scrolling slider
│   └── 📄 progressive-blur.tsx      # Progressive blur effects
├── 📁 react-bits/                   # Custom interactive components
│   ├── 📄 pixel-card.tsx            # Pixel art style cards
│   ├── 📄 splash-cursor.tsx         # Interactive cursor effects
│   └── 📄 text-cursor.tsx           # Text animation effects
├── 📄 ConvexClientProvider.tsx      # Convex database provider
├── 📄 theme-provider.tsx            # Dark/light theme provider
├── 📄 navigation.tsx                # Main navigation component
├── 📄 footer.tsx                    # Site footer
├── 📄 logo.tsx                      # Brand logo component
├── 📄 mode-toggle.tsx               # Dark mode toggle
└── 📄 custom-clerk-pricing.tsx      # Billing component (to be removed)
```

## Backend Directory (`convex/`)

### Database Functions and Schema
```
convex/
├── 📄 schema.ts                     # Complete database schema definition
├── 📄 walks.ts                      # Walk CRUD operations and queries
├── 📄 regions.ts                    # Scottish regions management
├── 📄 walkStages.ts                 # Walking directions and stages
├── 📄 walkReports.ts                # User-generated walk reports
├── 📄 users.ts                      # User management functions
├── 📄 likes.ts                      # Like/favorite functionality
├── 📄 files.ts                      # File storage (GPX, images)
├── 📄 paymentAttempts.ts            # Payment tracking (to be simplified)
├── 📄 paymentAttemptTypes.ts        # Payment type definitions
├── 📄 seed.ts                       # Database seeding functions
├── 📄 seed_new.ts                   # Enhanced seeding scripts
├── 📄 http.ts                       # Webhook handlers (Clerk integration)
├── 📄 auth.config.ts                # Authentication configuration
├── 📄 README.md                     # Convex-specific documentation
├── 📄 tsconfig.json                 # TypeScript config for Convex
└── 📁 _generated/                   # Auto-generated Convex files
    ├── 📄 api.d.ts                  # TypeScript API definitions
    ├── 📄 api.js                    # JavaScript API client
    ├── 📄 dataModel.d.ts            # Data model types
    ├── 📄 server.d.ts               # Server-side types
    └── 📄 server.js                 # Server-side functions
```

## Documentation Directory (`docs/`)

### Project Documentation Structure
```
docs/
├── 📄 architecture.md               # Comprehensive architecture document
├── 📄 prd.md                       # Product Requirements Document
├── 📁 architecture/                 # Architecture sub-documents
│   ├── 📄 coding-standards.md       # Development standards and patterns
│   ├── 📄 tech-stack.md             # Technology stack documentation
│   ├── 📄 source-tree.md            # This file - project structure guide
│   └── 📄 walk-discovery-consolidation.md # August 2025 consolidation changes
├── 📁 stories/                      # Development stories and tasks
│   ├── 📄 1.1.implement-missing-convex-functions.md
│   ├── 📄 1.2.fix-critical-component-errors.md
│   ├── 📄 1.3.replace-mock-data-with-live-database.md
│   ├── 📄 1.4.simplify-authentication-system.md
│   ├── 📄 1.5.implement-personal-walk-tracking.md
│   └── 📄 1.6.transform-content-to-scottish-walking.md
└── 📁 qa/                           # Quality assurance documentation
    ├── 📁 assessments/              # QA assessment reports
    └── 📁 gates/                    # Quality gates for stories
        ├── 📄 1.1-implement-missing-convex-functions.yml
        └── 📄 1.2-fix-critical-component-errors.yml
```

## Data Files (Root Level)

### Scottish Walking Data
```
📄 converted_all_90_walks.json       # Complete walk dataset
📄 converted_priority_walks.json     # High-priority walks
📄 detailed_walks.json               # Walk details with descriptions
📄 detailed_walks_all_batches.json   # Combined detailed walks
📄 detailed_walks_batch_*.json       # Batch processing files
📄 detailed_walks_priority.json      # Priority walks with details
📄 formatted_walks.json              # Formatted walk data
📄 popular_scottish_walks.json       # Popular walks dataset
```

### Data Processing Scripts (`scripts/`)
```
scripts/
├── 📄 convert_detailed_walks.py     # Convert walk data formats
├── 📄 detailed_walk_scraper.py      # Scrape detailed walk information
├── 📄 format_walks_for_db.py        # Format data for database import
└── 📄 scrape_walkhighlands.py       # Scrape WalkHighlands website
```

## Configuration Files

### Project Configuration
```
📄 package.json                      # Dependencies, scripts, project metadata
📄 components.json                   # shadcn/ui component configuration
📄 next.config.ts                    # Next.js build and runtime configuration
📄 middleware.ts                     # Authentication and routing middleware
📄 tsconfig.json                     # TypeScript compiler configuration
📄 eslint.config.mjs                 # ESLint linting configuration
📄 postcss.config.mjs                # PostCSS and TailwindCSS configuration
📄 jest.config.js                    # Jest testing configuration
📄 jest.setup.js                     # Jest test setup and globals
```

## Utility Directories

### Custom Hooks (`hooks/`)
```
hooks/
├── 📄 use-mobile.ts                 # Mobile device detection hook
└── 📄 use-toast.ts                  # Toast notification hook
```

### Utilities (`lib/`)
```
lib/
├── 📄 utils.ts                      # General utility functions
└── 📄 boundary-data.ts              # Geographic boundary data
```

### Static Assets (`public/`)
```
public/
├── 📄 hero-section-main-app-dark.png # Hero section screenshot
├── 📄 next.svg                      # Next.js logo
├── 📄 vercel.svg                    # Vercel logo
├── 📄 file.svg                      # File icon
├── 📄 globe.svg                     # Globe icon
└── 📄 window.svg                    # Window icon
```

## Key Integration Points

### Critical File Relationships

1. **Database Schema → UI Components**
   - `convex/schema.ts` defines data structure
   - Components query via `useQuery(api.walks.getWalks)`
   - Field names must match between schema and UI

2. **Authentication Flow**
   - `middleware.ts` → Route protection
   - `convex/auth.config.ts` → JWT configuration
   - `components/ConvexClientProvider.tsx` → Client setup

3. **Component Consistency**
   - `components/walks/WalkCard.tsx` ← Shared component for all walk displays
   - `app/walks/WalkDiscovery.tsx` ← Uses shared WalkCard component
   - `app/(landing)/featured-walks.tsx` ← Uses shared WalkCard component

4. **Data Processing Pipeline**
   - `scripts/*.py` → Process raw walking data
   - `*.json` files → Intermediate data storage
   - `convex/seed.ts` → Import to database

### Common Import Patterns

```typescript
// Convex database queries
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

// UI components
import { Button } from '@/components/ui/button'
import WalkCard from '@/components/walks/WalkCard'

// Utilities
import { formatDistance } from '@/lib/utils'
import { cn } from '@/lib/utils'

// Types
import type { Walk } from '@/convex/_generated/dataModel'
```

## Recent Architectural Changes (August 2025)

### Walk Discovery Consolidation
- **Removed**: Duplicate regions listing page (`app/regions/page.tsx`)
- **Enhanced**: `/walks` page now serves as the primary discovery interface
- **Added**: Region browsing cards at the top of walks page for better UX
- **Updated**: All navigation links now point to `/walks` for consistency

### Component Standardization 
- **Created**: Shared `WalkCard` component (`components/walks/WalkCard.tsx`)
- **Supports**: Both 'discovery' and 'featured' variants with consistent logic
- **Eliminated**: Code duplication across walk display components
- **Fixed**: Rating display consistency - shows actual ratings or "No ratings yet"

### Data Integrity Improvements
- **Removed**: All hardcoded/mock values from components
- **Enhanced**: Proper handling of missing data fields
- **Fixed**: Bog factor and elevation now only display when present in database
- **Improved**: All components properly reflect actual database content

## Development Workflow Integration

### File Modification Priorities
1. **High Impact**: `convex/schema.ts`, `app/layout.tsx`, `middleware.ts`
2. **Medium Impact**: Page components, major UI components
3. **Low Impact**: Individual utility functions, styling tweaks

### Testing File Locations
- Component tests: Adjacent to component files (`__tests__/`)
- Integration tests: Root `__tests__/integration/`
- Convex function tests: Within `convex/` directory

### Build Dependencies
- `convex/` directory must build before frontend
- `components.json` affects shadcn/ui component generation
- `next.config.ts` affects build optimization and deployment