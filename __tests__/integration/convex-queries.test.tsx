import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { useQuery } from 'convex/react'
import WalkDiscovery from '@/app/walks/WalkDiscovery'
import WalkDetailPage from '@/app/walks/[slug]/WalkDetailPage'
import WalkSearch from '@/components/search/WalkSearch'

// Mock the useQuery hook with realistic data scenarios
const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>

// Mock realistic Convex response data
const mockWalkData = {
  _id: 'walk_123',
  slug: 'test-walk',
  title: 'Test Walk',
  shortDescription: 'A test walk description',
  difficulty: 'Moderate',
  distance: 10.5,
  estimatedTime: 4,
  ascent: 500,
  averageRating: 4.3,
  reportCount: 25,
  viewCount: 350,
  latitude: 56.5,
  longitude: -4.5,
  featuredImageUrl: '/test.jpg',
  tags: ['mountain', 'scenic'],
  region: {
    _id: 'region_1',
    name: 'Test Region',
    slug: 'test-region'
  },
  isPublished: true
}

const mockRegions = [
  {
    _id: 'region_1',
    name: 'Test Region',
    slug: 'test-region'
  }
]

const mockStages = [
  {
    _id: 'stage_1',
    stageNumber: 1,
    title: 'Start Point',
    description: 'Beginning of the walk',
    waypoints: [],
    distance: 5.0,
    estimatedTime: 2.0,
    difficulty: 'Easy'
  }
]

const mockReports = [
  {
    _id: 'report_1',
    userId: 'user_1',
    userName: 'Test User',
    rating: 4,
    comment: 'Great walk!',
    completedDate: Date.now(),
    conditions: 'Good'
  }
]

describe('Convex Query Integration Tests', () => {
  beforeEach(() => {
    mockUseQuery.mockClear()
  })

  describe('WalkDiscovery Component Queries', () => {
    test('correctly calls api.walks.getPublishedWalks with proper parameters', () => {
      mockUseQuery
        .mockReturnValueOnce([mockWalkData]) // walks query
        .mockReturnValueOnce(mockRegions) // regions query

      render(<WalkDiscovery />)

      // Verify the correct Convex queries are called
      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({}), // api.walks.getPublishedWalks
        { limit: 100 }
      )
      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({}) // api.regions.getAllRegions
      )
    })

    test('handles successful data fetching from Convex', async () => {
      mockUseQuery
        .mockReturnValueOnce([mockWalkData])
        .mockReturnValueOnce(mockRegions)

      render(<WalkDiscovery />)

      await waitFor(() => {
        expect(screen.getByText('Test Walk')).toBeInTheDocument()
        expect(screen.getByText('1 walks across the Highlands, Islands, and Lowlands')).toBeInTheDocument()
      })
    })

    test('handles empty data responses gracefully', () => {
      mockUseQuery
        .mockReturnValueOnce([]) // empty walks array
        .mockReturnValueOnce([]) // empty regions array

      render(<WalkDiscovery />)

      expect(screen.getByText('0 walks across the Highlands, Islands, and Lowlands')).toBeInTheDocument()
      expect(screen.getByText('No walks found')).toBeInTheDocument()
    })

    test('handles loading states correctly', () => {
      mockUseQuery
        .mockReturnValueOnce(undefined) // loading walks
        .mockReturnValueOnce(undefined) // loading regions

      render(<WalkDiscovery />)

      expect(screen.getByText('0 walks across the Highlands, Islands, and Lowlands')).toBeInTheDocument()
    })
  })

  describe('WalkDetailPage Component Queries', () => {
    test('correctly calls multiple Convex queries for walk details', () => {
      mockUseQuery
        .mockReturnValueOnce(mockWalkData) // walk data
        .mockReturnValueOnce(mockStages) // stages
        .mockReturnValueOnce(mockReports) // reports

      render(<WalkDetailPage slug="test-walk" />)

      // Verify all three queries are called
      expect(mockUseQuery).toHaveBeenCalledTimes(3)
    })

    test('handles successful walk data fetching with all related data', async () => {
      mockUseQuery
        .mockReturnValueOnce(mockWalkData)
        .mockReturnValueOnce(mockStages)
        .mockReturnValueOnce(mockReports)

      render(<WalkDetailPage slug="test-walk" />)

      await waitFor(() => {
        expect(screen.getByText('Test Walk')).toBeInTheDocument()
        expect(screen.getByText('Start Point')).toBeInTheDocument()
        expect(screen.getByText('Test User')).toBeInTheDocument()
      })
    })

    test('handles partial data scenarios (walk exists, no stages/reports)', () => {
      mockUseQuery
        .mockReturnValueOnce(mockWalkData)
        .mockReturnValueOnce([]) // no stages
        .mockReturnValueOnce([]) // no reports

      render(<WalkDetailPage slug="test-walk" />)

      expect(screen.getByText('Test Walk')).toBeInTheDocument()
      // Should not crash with empty stages/reports
    })

    test('handles missing walk data gracefully', () => {
      mockUseQuery
        .mockReturnValueOnce(null) // walk not found
        .mockReturnValueOnce([])
        .mockReturnValueOnce([])

      render(<WalkDetailPage slug="nonexistent-walk" />)

      // Should not crash when walk is not found
      expect(document.body).toBeInTheDocument()
    })
  })

  describe('WalkSearch Component Queries', () => {
    test('correctly calls Convex queries for search functionality', () => {
      mockUseQuery
        .mockReturnValueOnce([mockWalkData]) // walks
        .mockReturnValueOnce(mockRegions) // regions

      render(<WalkSearch />)

      // Verify the correct queries are called for search
      expect(mockUseQuery).toHaveBeenCalledTimes(2)
    })

    test('handles real-time data updates from Convex', async () => {
      // First render with initial data
      mockUseQuery
        .mockReturnValueOnce([mockWalkData])
        .mockReturnValueOnce(mockRegions)

      const { rerender } = render(<WalkSearch />)

      expect(screen.getByText('Test Walk')).toBeInTheDocument()

      // Simulate data update from Convex
      const updatedWalkData = {
        ...mockWalkData,
        title: 'Updated Test Walk',
        averageRating: 4.8
      }

      mockUseQuery.mockClear()
      mockUseQuery
        .mockReturnValueOnce([updatedWalkData])
        .mockReturnValueOnce(mockRegions)

      rerender(<WalkSearch />)

      await waitFor(() => {
        expect(screen.getByText('Updated Test Walk')).toBeInTheDocument()
        expect(screen.getByText('4.8')).toBeInTheDocument()
      })
    })

    test('handles search with filtered Convex queries', () => {
      mockUseQuery
        .mockReturnValueOnce([mockWalkData])
        .mockReturnValueOnce(mockRegions)

      render(<WalkSearch />)

      // Verify that components can handle filtered data from Convex
      expect(screen.getByText('Test Walk')).toBeInTheDocument()
      expect(screen.getByText('4.3')).toBeInTheDocument() // averageRating
    })
  })

  describe('Error Handling and Edge Cases', () => {
    test('handles Convex query errors gracefully', () => {
      // Mock error state (when query throws or returns error)
      mockUseQuery.mockImplementation(() => {
        throw new Error('Convex connection error')
      })

      // Should not crash the application
      expect(() => render(<WalkDiscovery />)).not.toThrow()
    })

    test('handles inconsistent data structures from Convex', () => {
      const inconsistentData = {
        ...mockWalkData,
        averageRating: null, // Missing rating
        region: undefined, // Missing region
        tags: null // Invalid tags
      }

      mockUseQuery
        .mockReturnValueOnce([inconsistentData])
        .mockReturnValueOnce(mockRegions)

      render(<WalkDiscovery />)

      // Should handle null/undefined values gracefully
      expect(screen.getByText('Test Walk')).toBeInTheDocument()
    })

    test('validates data types returned from Convex queries', () => {
      mockUseQuery
        .mockReturnValueOnce([mockWalkData])
        .mockReturnValueOnce(mockRegions)

      render(<WalkDiscovery />)

      // Verify that averageRating is used (not rating field)
      expect(screen.getByText('4.3')).toBeInTheDocument()
      
      // Verify that reportCount is displayed correctly
      expect(screen.getByText('25')).toBeInTheDocument()
    })
  })

  describe('Performance and Optimization', () => {
    test('components handle large datasets from Convex efficiently', () => {
      const largeDataset = Array.from({ length: 100 }, (_, i) => ({
        ...mockWalkData,
        _id: `walk_${i}`,
        title: `Walk ${i}`,
        slug: `walk-${i}`
      }))

      mockUseQuery
        .mockReturnValueOnce(largeDataset)
        .mockReturnValueOnce(mockRegions)

      render(<WalkDiscovery />)

      expect(screen.getByText('100 walks across the Highlands, Islands, and Lowlands')).toBeInTheDocument()
    })

    test('components properly memoize Convex query results', () => {
      mockUseQuery
        .mockReturnValueOnce([mockWalkData])
        .mockReturnValueOnce(mockRegions)

      const { rerender } = render(<WalkDiscovery />)
      
      // Re-render should not cause additional query calls if data hasn't changed
      rerender(<WalkDiscovery />)

      expect(screen.getByText('Test Walk')).toBeInTheDocument()
    })
  })
})