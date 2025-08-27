# Walking Scotland Brownfield Enhancement PRD

## Intro Project Analysis and Context

### Existing Project Overview

**Analysis Source:** IDE-based fresh analysis

**Current Project State:**
Your Walking Scotland application is a sophisticated walking platform built on a solid technical foundation (Next.js 15 + Convex + Clerk), but it's experiencing significant synchronization issues between the database schema and UI components, plus contains substantial SaaS template content that needs removal.

### Available Documentation Analysis

**Available Documentation:**
- ✅ Tech Stack Documentation (basic in CLAUDE.md)
- ❌ Source Tree/Architecture 
- ❌ Coding Standards
- ❌ API Documentation
- ❌ External API Documentation  
- ❌ UX/UI Guidelines
- ❌ Technical Debt Documentation

**Critical Gap:** No comprehensive technical documentation exists, making this cleanup/synchronization project essential.

### Enhancement Scope Definition

**Enhancement Type:**
☑️ **Major Feature Modification** - Converting SaaS template to focused walking app
☑️ **Bug Fix and Stability Improvements** - Fixing database/UI synchronization
☑️ **UI/UX Overhaul** - Removing irrelevant content, focusing on Scottish walking

**Enhancement Description:**
Transform the current hybrid SaaS template/walking app into a clean, fully functional Scottish walking application by fixing database synchronization issues, removing template content, and ensuring all components work together seamlessly.

**Impact Assessment:**
☑️ **Major Impact** - Architectural changes required across database functions, UI components, authentication system, and content structure.

### Goals and Background Context

**Goals:**
• Fix critical synchronization between Convex database schema and UI components
• Remove all SaaS template remnants and focus exclusively on Scottish walking
• Ensure functional data flow from database through all user-facing components
• Create a cohesive, professional Scottish walking application experience
• Simplify authentication system to match walking app requirements

**Background Context:**
The current application started as a SaaS template but evolved into a walking platform without proper cleanup. Critical functionality is broken due to mismatched database fields, missing Convex functions, and non-existent components. The sophisticated database schema for walks, regions, reports, and user stats exists but lacks proper backend implementation. Users cannot access core features because the UI expects data structures and API endpoints that don't exist.

### Change Log
| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|---------|
| Initial PRD Creation | 2025-08-27 | v1.0 | Created comprehensive cleanup and synchronization PRD | John (PM Agent) |

## Requirements

### Functional

**FR1:** Fix RegionMap import error in WalkDiscovery.tsx by replacing non-existent `RegionMap` with existing `ScotlandRegionMap` component
**FR2:** Create missing Convex functions `walkStages.getStagesByWalkId` and `walkReports.getReportsByWalk` to support existing UI calls
**FR3:** Resolve field name mismatch by updating all UI references from `walk.rating` to `walk.averageRating` to match database schema
**FR4:** Replace mock data in WalkDetailPage with proper Convex queries for real-time database integration
**FR5:** Remove all SaaS template content from testimonials, replacing with authentic Scottish walking testimonials
**FR6:** Update features section to highlight walking-specific capabilities instead of task management tools
**FR7:** Simplify authentication system by removing billing/subscription features while maintaining user management
**FR8:** Clean up package.json naming from "elite-next-starter" to proper Walking Scotland identifiers
**FR9:** Remove payment-gated dashboard sections and replace with walking-focused user features

### Non Functional

**NFR1:** All database queries must maintain existing performance characteristics during synchronization fixes
**NFR2:** UI components must remain responsive during the transition from mock data to real Convex queries
**NFR3:** Authentication changes must not break existing user sessions or data integrity
**NFR4:** Content updates must maintain SEO optimization for Scottish walking keywords
**NFR5:** Component refactoring must preserve existing accessibility standards

### Compatibility Requirements

**CR1:** Existing database schema must remain intact - only add missing Convex functions, don't modify tables
**CR2:** Current Convex/Clerk integration must be preserved while removing unnecessary billing features
**CR3:** Next.js App Router structure and TailwindCSS styling must remain consistent throughout cleanup
**CR4:** Mapbox integration and existing geographic data must continue functioning without interruption

## User Interface Enhancement Goals

### Integration with Existing UI

The UI cleanup will integrate seamlessly with your existing design system:
- **Component Library**: Maintain shadcn/ui components and TailwindCSS v4 styling patterns
- **Design Consistency**: Preserve existing color scheme, typography, and spacing while removing template content
- **Navigation Structure**: Keep current app router structure but update content to focus on walking features
- **Interactive Elements**: Maintain existing Framer Motion animations and user interaction patterns

### Modified/New Screens and Views

**Modified Screens:**
- **Landing Page** (`app/(landing)/page.tsx`) - Replace SaaS features with walking-focused content
- **Featured Walks** (`app/(landing)/featured-walks.tsx`) - Connect to real Convex data instead of mock data
- **Walk Discovery** (`app/walks/WalkDiscovery.tsx`) - Fix component imports and database field references
- **Walk Detail Pages** (`app/walks/[slug]/WalkDetailPage.tsx`) - Replace mock data with live Convex queries
- **Dashboard Area** - Convert from payment-gated to walking statistics and user features

**Content Updates Only:**
- Hero section messaging
- Testimonials section  
- Features showcase
- Footer information

### UI Consistency Requirements

**Visual Consistency:**
- All content updates must use existing typography scale and color palette
- Walking-specific imagery must match current visual style and quality standards
- Interactive elements must maintain consistent hover states and transitions

**Interaction Consistency:**
- Database-connected components must preserve existing loading states and error handling patterns
- Form interactions for user features must follow established validation and feedback patterns
- Navigation behavior must remain consistent during content transformation

**Responsive Behavior:**
- All UI changes must maintain existing mobile-first responsive design patterns
- Content updates must work seamlessly across all current breakpoints
- New walking-focused content must adapt to existing grid and layout systems

## Technical Constraints and Integration Requirements

### Existing Technology Stack

**Languages**: TypeScript
**Frameworks**: Next.js 15 with App Router, React 19
**Database**: Convex with real-time serverless functions  
**Infrastructure**: Vercel deployment, Clerk authentication
**External Dependencies**: Mapbox GL (v3.14.0), shadcn/ui components, TailwindCSS v4

### Integration Approach

**Database Integration Strategy**: Add missing Convex functions to existing schema without modifications - implement `walkStages.getStagesByWalkId`, `walkReports.getReportsByWalk`, and other referenced functions

**API Integration Strategy**: Maintain current Convex query/mutation pattern - replace mock data calls with proper `useQuery` and `useMutation` hooks

**Frontend Integration Strategy**: Update component imports and field references without changing component architecture - fix `RegionMap` imports and `rating`/`averageRating` mismatches

**Testing Integration Strategy**: Verify each fix maintains existing component functionality before proceeding to next changes

### Code Organization and Standards

**File Structure Approach**: Maintain current Next.js App Router organization - no directory restructuring required
**Naming Conventions**: Follow existing camelCase for functions, kebab-case for file names pattern
**Coding Standards**: Preserve current TypeScript strict mode and existing linting rules
**Documentation Standards**: Update inline comments to reflect Scottish walking focus instead of SaaS template references

### Deployment and Operations

**Build Process Integration**: No changes required - existing Next.js + Convex build pipeline will continue
**Deployment Strategy**: Incremental updates through existing Vercel deployment - test each section before releasing
**Monitoring and Logging**: Maintain current Convex function monitoring - add logging for newly implemented functions
**Configuration Management**: Update environment variables for Scottish walking branding only

### Risk Assessment and Mitigation

**Technical Risks**: 
- Database function implementation could introduce performance issues if not properly optimized
- Component refactoring might break existing user interactions

**Integration Risks**:
- Authentication simplification could affect user sessions
- Mock data removal might reveal additional missing backend functions

**Deployment Risks**:
- Content updates could affect SEO rankings if not handled carefully
- Incremental deployment might create inconsistent user experience during transition

**Mitigation Strategies**:
- Implement database functions with same query patterns as existing code
- Test each component fix in isolation before integration
- Use feature flags for content updates to enable rollback
- Maintain existing authentication structure while removing unused features

## Epic and Story Structure

### Epic Approach

**Epic Structure Decision**: Single comprehensive epic with rationale

Based on analysis of the existing project, this enhancement should be structured as a **single comprehensive epic** because the synchronization issues are deeply interconnected. Fixing UI components requires implementing corresponding database functions, content cleanup affects multiple pages that share components, and authentication changes impact the entire application flow.

## Epic 1: Walking Scotland Application Cleanup and Synchronization

**Epic Goal**: Transform the hybrid SaaS template/walking application into a fully functional, synchronized Scottish walking platform by fixing critical database/UI disconnects, implementing missing backend functions, and removing all template content.

**Integration Requirements**: All changes must preserve existing user data, maintain current authentication sessions, and ensure no downtime for existing functionality while systematically resolving synchronization issues.

### Story 1.1: Implement Missing Convex Backend Functions

As a **developer**,
I want **to create the missing Convex functions that UI components are trying to call**,
so that **database queries work properly and components can display real data instead of failing silently**.

**Acceptance Criteria:**
1. Create `walkStages.getStagesByWalkId` function in convex/walkStages.ts matching existing schema
2. Create `walkReports.getReportsByWalk` function with proper indexing and filtering
3. Implement proper TypeScript types for all new function return values
4. Add error handling and loading states for all new database queries
5. Test functions directly in Convex dashboard before UI integration

**Integration Verification:**
- **IV1:** Existing walk data remains intact and queryable after function implementation
- **IV2:** New functions follow existing Convex query patterns and performance characteristics  
- **IV3:** Database indexing performance does not degrade with new function usage

### Story 1.2: Fix Critical Component Import and Field Reference Errors

As a **user**,
I want **the walk discovery and detail pages to load without JavaScript errors**,
so that **I can browse walks and view detailed information successfully**.

**Acceptance Criteria:**
1. Replace `RegionMap` import with `ScotlandRegionMap` in WalkDiscovery.tsx
2. Update all UI references from `walk.rating` to `walk.averageRating` throughout codebase
3. Connect WalkDetailPage to real Convex queries instead of mock data
4. Verify all component imports resolve correctly
5. Test all affected pages render without console errors

**Integration Verification:**
- **IV1:** Walk browsing functionality continues working for existing users
- **IV2:** Map components display properly with existing geographic data
- **IV3:** Database field changes don't break existing walk records or user interactions

### Story 1.3: Replace Mock Data with Live Database Connections

As a **user**,
I want **to see real walk information and user-generated content**,
so that **the application displays accurate, up-to-date Scottish walking data**.

**Acceptance Criteria:**
1. Replace hardcoded mock data in WalkDetailPage with proper useQuery hooks
2. Connect featured walks display to real database walks with proper filtering
3. Implement real-time updates for walk statistics and user interactions
4. Add proper loading and error states for all database-connected components
5. Test data synchronization across multiple user sessions

**Integration Verification:**
- **IV1:** Existing walk data displays correctly in updated components
- **IV2:** Real-time updates work without breaking cached data or user sessions
- **IV3:** Performance remains acceptable when switching from mock to live data

### Story 1.4: Simplify Authentication System for Walking App Focus

As a **user**,
I want **a streamlined authentication experience focused on walking features**,
so that **I can access my walking data without unnecessary billing or subscription complexity**.

**Acceptance Criteria:**
1. Remove billing/subscription components while preserving user management
2. Update user dashboard to focus on walking statistics and personal data
3. Remove payment-gated content restrictions from walking features  
4. Simplify user registration flow to capture walking-relevant information
5. Preserve all existing user accounts and walking data during transition

**Integration Verification:**
- **IV1:** Existing users can still log in and access their walking data
- **IV2:** User sessions remain stable during authentication system changes
- **IV3:** Walking-specific user features continue functioning properly

### Story 1.5: Transform Content from SaaS Template to Scottish Walking Focus

As a **visitor**,
I want **to see compelling Scottish walking content and testimonials**,
so that **I understand this is a dedicated walking platform and want to explore it further**.

**Acceptance Criteria:**
1. Replace generic SaaS testimonials with authentic Scottish walking experiences
2. Update features section to highlight walking-specific capabilities (route planning, difficulty ratings, weather info)
3. Transform hero section messaging to focus on Scottish walking adventures
4. Update package.json and metadata to reflect Walking Scotland branding
5. Ensure all content maintains SEO optimization for walking-related keywords

**Integration Verification:**
- **IV1:** All existing walking functionality continues working during content updates
- **IV2:** SEO rankings and search visibility are preserved or improved
- **IV3:** Content changes don't break existing component functionality or styling