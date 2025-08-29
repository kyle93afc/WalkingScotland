# Walking Scotland Coding Standards

## Overview
This document defines the coding standards and best practices for the Walking Scotland application, ensuring consistency, maintainability, and quality across the codebase.

## Language Standards

### TypeScript
- **Strict Mode**: Always use TypeScript strict mode (`"strict": true`)
- **Type Definitions**: Prefer explicit type definitions over `any`
- **Interface Naming**: Use PascalCase for interfaces (e.g., `WalkData`, `UserProfile`)
- **Type Exports**: Export types from dedicated type files when shared across modules

### JavaScript/TypeScript Patterns
- **Function Style**: Prefer functional components with hooks over class components
- **Arrow Functions**: Use arrow functions for inline functions and callbacks
- **Destructuring**: Use destructuring for props and objects where it improves readability
- **Optional Chaining**: Use optional chaining (`?.`) for safe property access

## File and Directory Naming

### File Naming Conventions
- **Components**: PascalCase (e.g., `WalkDetailPage.tsx`, `ScotlandRegionMap.tsx`)
- **Utilities**: camelCase (e.g., `walkUtils.ts`, `formatDistance.ts`)
- **Pages**: kebab-case for route files (e.g., `[slug]/page.tsx`)
- **Configuration**: kebab-case (e.g., `next.config.ts`, `tailwind.config.js`)

### Directory Organization
- **Components**: Group by feature/domain (e.g., `components/map/`, `components/search/`)
- **Pages**: Follow Next.js App Router conventions
- **Utilities**: Centralize in `lib/` directory
- **Types**: Co-locate with components or centralize in `types/`

## Import/Export Standards

### Import Organization
1. **React imports** (React, hooks)
2. **External library imports** (third-party packages)
3. **Internal imports** (components, utilities, types)
4. **Relative imports** (local files)

### Import Style
- Use absolute imports with `@/` prefix for internal modules
- Use named imports over default imports when possible
- Group imports logically and separate with blank lines

```typescript
import { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'

import { Button } from '@/components/ui/button'
import { formatDistance } from '@/lib/walkUtils'

import type { Walk } from './types'
```

## Component Standards

### Component Structure
- **Props Interface**: Always define props interface above component
- **Component Function**: Use named function exports
- **JSX Return**: Use explicit return statements
- **Conditional Rendering**: Prefer early returns over nested ternary operators

### Example Component Structure
```typescript
interface WalkCardProps {
  walk: Walk
  onSelect?: (walkId: string) => void
}

export function WalkCard({ walk, onSelect }: WalkCardProps) {
  if (!walk) return null

  return (
    <div className="walk-card">
      {/* Component JSX */}
    </div>
  )
}
```

## Convex Integration Standards

### Query Patterns
- Use `useQuery` for data fetching
- Use `useMutation` for data modifications
- Always handle loading and error states
- Prefer server-side filtering over client-side filtering

### Database Field Naming
- Use camelCase for all field names (e.g., `averageRating`, `publishedAt`)
- Maintain consistency between schema definitions and UI usage
- Use descriptive field names that reflect Scottish walking domain

## Styling Standards

### TailwindCSS Guidelines
- **Class Organization**: Group by responsive, layout, spacing, colors, typography
- **Custom Components**: Create reusable component classes in globals.css
- **Responsive Design**: Mobile-first approach with appropriate breakpoints
- **Dark Mode**: Support both light and dark themes consistently

### CSS Class Naming
- Use TailwindCSS utilities primarily
- Create semantic class names for complex components
- Prefix custom classes with component name to avoid conflicts

## Error Handling

### Error Boundaries
- Implement error boundaries for major sections
- Provide user-friendly error messages
- Log errors appropriately for debugging

### API Error Handling
- Always handle Convex query/mutation errors
- Provide loading states for async operations
- Display meaningful error messages to users

## Performance Guidelines

### Component Optimization
- Use `React.memo` for expensive re-renders
- Implement proper dependency arrays for hooks
- Avoid inline object/array creation in render methods

### Database Optimization
- Use appropriate Convex indexes for queries
- Implement pagination for large datasets
- Cache expensive computations where appropriate

## Testing Standards

### Test Organization
- Co-locate test files with components (`component.test.tsx`)
- Use descriptive test names that explain behavior
- Group related tests with `describe` blocks

### Testing Patterns
- Test component behavior, not implementation details
- Mock external dependencies (Convex queries)
- Test both success and error scenarios

## Documentation Standards

### Code Comments
- Use JSDoc comments for public functions and components
- Explain complex business logic with inline comments
- Document Scottish walking domain concepts that may be unfamiliar

### README Updates
- Keep component README files updated with usage examples
- Document any Scottish walking specific terminology
- Include setup instructions for development

## Git Standards

### Commit Messages
- Use conventional commit format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Include story/issue references when applicable

### Branch Naming
- Use descriptive branch names: `feature/story-1-2-fix-imports`
- Include story numbers for traceability
- Use kebab-case for branch names

## Scottish Walking Domain Standards

### Terminology Consistency
- Use consistent terms for walking concepts (e.g., "Munro", "Corbett", "bog factor")
- Maintain accurate Scottish geographic references
- Use proper capitalization for place names and walking terms

### Data Accuracy
- Validate geographic coordinates for accuracy
- Ensure walking difficulty ratings follow established standards
- Maintain consistency in distance/elevation units (kilometers, meters)

### Data Display Standards (August 2025)
- **Rating Display**: Show actual rating when `averageRating > 0`, otherwise show "No ratings yet"
- **Optional Fields**: Only display data fields when they exist in the database (bog factor, elevation, etc.)
- **Hardcoded Values**: Eliminate all hardcoded/mock values - components must reflect actual data
- **Consistent Components**: Use shared components (like `WalkCard`) to ensure consistent data display

## Component Architecture Standards

### Shared Component Design
- **Variant Support**: Components should support multiple variants (e.g., 'discovery', 'featured')
- **Prop Interfaces**: Always define clear TypeScript interfaces for component props
- **Conditional Rendering**: Handle missing data gracefully with conditional display logic
- **Consistent Logic**: Ensure the same business rules apply across all uses of shared components

### Example Shared Component Pattern
```typescript
interface WalkCardProps {
  walk: Walk
  variant?: 'discovery' | 'featured'
  isListView?: boolean
}

export default function WalkCard({ walk, variant = 'discovery', isListView = false }: WalkCardProps) {
  // Handle rating display consistently
  const showRating = walk.averageRating > 0
  
  return (
    <Card className={getVariantStyles(variant)}>
      {/* Conditional data display */}
      {walk.bogFactor && (
        <BogFactorIndicator factor={walk.bogFactor} />
      )}
      
      {/* Rating logic */}
      {showRating ? (
        <RatingDisplay rating={walk.averageRating} count={walk.reportCount} />
      ) : (
        <NoRatingMessage />
      )}
    </Card>
  )
}
```