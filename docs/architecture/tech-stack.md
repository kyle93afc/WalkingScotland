# Walking Scotland Tech Stack

## Overview
This document provides a comprehensive overview of the technology stack used in the Walking Scotland application, including versions, integration patterns, and usage guidelines.

## Core Technologies

### Frontend Framework
- **Next.js**: v15.3.5
  - App Router architecture for file-based routing
  - Server-side rendering (SSR) and static generation (SSG)
  - Built-in optimization with Turbopack bundler
  - Integration with Vercel deployment platform

- **React**: v19.0.0
  - Functional components with hooks pattern
  - TypeScript integration for type safety
  - Server components for improved performance

### Language & Type System
- **TypeScript**: v5.x
  - Strict mode enabled for maximum type safety
  - Full type coverage across components and API layers
  - Interface definitions for all data models

### Database & Backend
- **Convex**: v1.26.2
  - Real-time serverless database functions
  - Built-in authentication integration with Clerk
  - Automatic TypeScript type generation
  - WebSocket-based real-time subscriptions

### Authentication & User Management
- **Clerk**: v6.24.0
  - JWT-based authentication with Convex integration
  - User session management and security
  - Webhook integration for user data synchronization
  - Social login providers support

### Styling & UI Components
- **TailwindCSS**: v4.0
  - Utility-first CSS framework
  - Custom design system with consistent spacing/colors
  - PostCSS integration for advanced features
  - Dark mode support built-in

- **shadcn/ui**: Multiple components
  - Radix UI primitives for accessibility
  - Customizable component library
  - Consistent design patterns across app

### Maps & Geospatial
- **Mapbox GL**: v3.14.0
  - Interactive map rendering for walk routes
  - GPS coordinate visualization
  - Custom markers for walk start/end points
  - Integration with react-map-gl for React components

- **react-map-gl**: v8.0.4
  - React wrapper for Mapbox GL JS
  - Declarative map components
  - Event handling for map interactions

## UI Component Libraries

### Core UI Components (Radix UI)
- **@radix-ui/react-avatar**: v1.1.10
- **@radix-ui/react-checkbox**: v1.3.2
- **@radix-ui/react-dialog**: v1.1.14
- **@radix-ui/react-dropdown-menu**: v2.1.15
- **@radix-ui/react-label**: v2.1.7
- **@radix-ui/react-select**: v2.2.6
- **@radix-ui/react-separator**: v1.1.7
- **@radix-ui/react-slot**: v1.2.3
- **@radix-ui/react-switch**: v1.2.5
- **@radix-ui/react-tabs**: v1.1.12
- **@radix-ui/react-toggle**: v1.1.9
- **@radix-ui/react-toggle-group**: v1.1.10
- **@radix-ui/react-tooltip**: v1.2.7

### Data Visualization
- **Recharts**: v2.15.4
  - Chart components for walking statistics
  - Walking progress and achievement visualizations
  - Responsive chart rendering

### Animation & Interactions
- **Framer Motion**: v12.23.3
  - Smooth page transitions
  - Component animations and micro-interactions
  - Gesture handling for mobile interactions

### Icons & Visual Assets
- **Lucide React**: v0.525.0
  - Consistent icon library throughout app
  - Walking and outdoor activity specific icons
  - Customizable size and styling

- **@tabler/icons-react**: v3.34.0
  - Additional icon set for specialized use cases
  - High-quality SVG icons

## Development & Build Tools

### Package Management
- **npm**: Package installation and script management
- **pnpm**: Alternative package manager (lock file present)

### Build & Development
- **Turbopack**: Next.js 15 integrated bundler
  - Fast development builds
  - Hot module replacement (HMR)
  - Optimized production builds

### Code Quality
- **ESLint**: v9.34.0
  - Next.js specific linting rules
  - TypeScript integration
  - Custom rules for walking app conventions

- **TypeScript Compiler**: Strict mode type checking

### Testing Framework
- **Jest**: v30.1.1
  - Unit testing for components and utilities
  - Integration testing for Convex functions
  - Coverage reporting

- **Testing Library**: v16.3.0
  - React component testing utilities
  - User interaction simulation
  - Accessibility testing helpers

## Utility Libraries

### Data Manipulation
- **Zod**: v3.25.76
  - Runtime type validation
  - API input/output validation
  - Form data validation

### Styling Utilities
- **clsx**: v2.1.1
  - Conditional CSS class composition
  - Dynamic styling based on component state

- **tailwind-merge**: v3.3.1
  - TailwindCSS class conflict resolution
  - Utility class optimization

- **class-variance-authority**: v0.7.1
  - Component variant system
  - Type-safe styling patterns

### Data Tables & Lists
- **@tanstack/react-table**: v8.21.3
  - Advanced table functionality for walk data
  - Sorting, filtering, pagination
  - Walking statistics tables

### Drag & Drop (Dashboard Features)
- **@dnd-kit/core**: v6.3.1
- **@dnd-kit/modifiers**: v9.0.0
- **@dnd-kit/sortable**: v10.0.0
- **@dnd-kit/utilities**: v3.2.2

## External Services Integration

### Deployment Platform
- **Vercel**: 
  - Automatic deployments from git
  - Preview deployments for pull requests
  - Edge functions and serverless API routes
  - Custom domain management

### Authentication Service
- **Clerk Dashboard**:
  - User management interface
  - Authentication method configuration
  - Webhook endpoint management
  - JWT token customization

### Database Service
- **Convex Dashboard**:
  - Function monitoring and debugging
  - Database query optimization
  - Real-time function logs
  - Schema management

### Maps Service
- **Mapbox**:
  - API key management
  - Custom map styling
  - Geocoding services
  - Route optimization

## Development Environment

### Node.js Requirements
- **Node.js**: v20+ (LTS recommended)
- **npm**: v10+ or **pnpm**: v8+

### Required Environment Variables
```bash
# Convex Configuration
CONVEX_DEPLOYMENT=your-deployment-url
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_FRONTEND_API_URL=https://...

# Clerk Webhooks
CLERK_WEBHOOK_SECRET=whsec_...

# Mapbox (Optional for maps)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1...
```

## Architecture Patterns

### Data Flow Architecture
1. **UI Components** → useQuery/useMutation hooks
2. **Convex Functions** → Database operations
3. **Real-time Updates** → WebSocket subscriptions
4. **Authentication** → Clerk JWT validation

### Component Architecture
- **Page Components**: App Router route handlers
- **Feature Components**: Domain-specific functionality (walks, reports)
- **UI Components**: Reusable interface elements
- **Layout Components**: Navigation and page structure

### State Management
- **Server State**: Convex real-time subscriptions
- **Client State**: React hooks (useState, useReducer)
- **Form State**: Controlled components with validation
- **Authentication State**: Clerk useAuth() hook

## Performance Characteristics

### Bundle Size Optimization
- Tree shaking for unused code elimination
- Code splitting at route level
- Dynamic imports for large components
- Image optimization with Next.js Image component

### Database Performance
- Convex automatic query optimization
- Real-time subscriptions with efficient updates
- Index-based queries for walk searches
- Pagination for large datasets

### Caching Strategy
- Next.js automatic page caching
- Convex query result caching
- Static asset caching via Vercel CDN
- Browser caching for images and resources

## Integration Guidelines

### Adding New Dependencies
1. Check compatibility with existing stack versions
2. Verify TypeScript support and type definitions
3. Ensure no conflicts with existing utilities
4. Update this documentation with new additions

### Upgrading Dependencies
1. Test in development environment first
2. Check for breaking changes in major versions
3. Update related configuration files
4. Run full test suite before deployment

### Performance Monitoring
- Monitor Convex function execution times
- Track bundle size changes
- Observe real-time subscription performance
- Monitor Vercel deployment metrics