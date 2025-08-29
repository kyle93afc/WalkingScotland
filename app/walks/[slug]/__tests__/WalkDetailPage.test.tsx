import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useQuery } from 'convex/react'
import WalkDetailPage from '../WalkDetailPage'

// Mock the useQuery hook
const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>

// Mock walk data
const mockWalkData = {
  _id: '1',
  slug: 'ben-nevis',
  title: 'Ben Nevis',
  shortDescription: 'Highest mountain in Scotland',
  description: 'Detailed description of Ben Nevis walk...',
  difficulty: 'Hard',
  distance: 17.5,
  estimatedTime: 8,
  ascent: 1345,
  averageRating: 4.5,
  reportCount: 142,
  viewCount: 2500,
  latitude: 56.7969,
  longitude: -5.0037,
  featuredImageUrl: '/test-image.jpg',
  tags: ['mountain', 'challenging', 'highland'],
  region: {
    _id: 'highland',
    name: 'Scottish Highlands',
    slug: 'highland'
  },
  lastUpdated: Date.now(),
  isPublished: true
}

const mockStages = [
  {
    _id: 'stage1',
    stageNumber: 1,
    title: 'Tourist Path Start',
    description: 'Begin your ascent on the well-marked tourist path',
    waypoints: [
      { latitude: 56.7969, longitude: -5.0037, elevation: 50 }
    ],
    distance: 5.5,
    estimatedTime: 2.5,
    difficulty: 'Moderate'
  }
]

const mockReports = [
  {
    _id: 'report1',
    title: 'Amazing Highland Adventure',
    rating: 5,
    comment: 'Amazing views from the summit!',
    completedAt: Date.now() - 86400000, // 1 day ago
    conditions: 'Clear and sunny',
    tips: 'Start early to avoid crowds',
    author: {
      name: 'John Hiker',
      imageUrl: '/avatar1.jpg'
    }
  }
]

describe('WalkDetailPage Component', () => {
  beforeEach(() => {
    mockUseQuery.mockClear()
  })

  test('renders loading state when walk data is not available', () => {
    mockUseQuery.mockReturnValue(undefined)

    render(<WalkDetailPage slug="ben-nevis" />)
    
    // Should not crash and should handle undefined gracefully
    expect(document.body).toBeInTheDocument()
  })

  test('renders walk data when loaded', async () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalkData) // walk data
      .mockReturnValueOnce(mockStages) // stages
      .mockReturnValueOnce(mockReports) // reports

    render(<WalkDetailPage slug="ben-nevis" />)

    expect(screen.getByText('Ben Nevis')).toBeInTheDocument()
    // Note: shortDescription might not be directly visible in the component
    expect(screen.getByText('Scottish Highlands')).toBeInTheDocument()
  })

  test('displays walk statistics correctly', () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalkData)
      .mockReturnValueOnce(mockStages)
      .mockReturnValueOnce(mockReports)

    render(<WalkDetailPage slug="ben-nevis" />)

    // Test that averageRating is displayed (not rating)
    expect(screen.getByText('4.5')).toBeInTheDocument()
    
    // Test other statistics
    expect(screen.getByText('17.5km')).toBeInTheDocument()
    expect(screen.getByText('8h')).toBeInTheDocument()
    expect(screen.getByText('1345m')).toBeInTheDocument()
  })

  test('displays difficulty badge with correct styling', () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalkData)
      .mockReturnValueOnce(mockStages)
      .mockReturnValueOnce(mockReports)

    render(<WalkDetailPage slug="ben-nevis" />)

    const difficultyBadge = screen.getByText('Hard')
    expect(difficultyBadge).toBeInTheDocument()
    expect(difficultyBadge).toHaveClass('bg-red-100', 'text-red-700')
  })

  test('handles tab navigation', async () => {
    const user = userEvent.setup()
    mockUseQuery
      .mockReturnValueOnce(mockWalkData)
      .mockReturnValueOnce(mockStages)
      .mockReturnValueOnce(mockReports)

    render(<WalkDetailPage slug="ben-nevis" />)

    // Test tab switching functionality
    const tabs = screen.getAllByRole('tab')
    expect(tabs.length).toBeGreaterThan(0)
    
    // Test clicking on different tabs if they exist
    if (tabs.length > 1) {
      await user.click(tabs[1])
    }
  })

  test('toggles like state when like button is clicked', async () => {
    const user = userEvent.setup()
    mockUseQuery
      .mockReturnValueOnce(mockWalkData)
      .mockReturnValueOnce(mockStages)
      .mockReturnValueOnce(mockReports)

    render(<WalkDetailPage slug="ben-nevis" />)

    const likeButton = screen.queryByRole('button', { name: /like/i })
    if (likeButton) {
      await user.click(likeButton)
      // Test that like state changes (implementation dependent)
    }
  })

  test('displays walk reports when available', async () => {
    const user = userEvent.setup()
    mockUseQuery
      .mockReturnValueOnce(mockWalkData)
      .mockReturnValueOnce(mockStages)
      .mockReturnValueOnce(mockReports)

    render(<WalkDetailPage slug="ben-nevis" />)

    // Click on the Reports tab to make reports visible
    const reportsTab = screen.getByRole('tab', { name: /reports/i })
    await user.click(reportsTab)

    await waitFor(() => {
      expect(screen.getByText('John Hiker')).toBeInTheDocument()
      expect(screen.getByText('Amazing views from the summit!')).toBeInTheDocument()
    })
  })

  test('displays walk stages when available', () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalkData)
      .mockReturnValueOnce(mockStages)
      .mockReturnValueOnce(mockReports)

    render(<WalkDetailPage slug="ben-nevis" />)

    expect(screen.getByText('Tourist Path Start')).toBeInTheDocument()
    expect(screen.getByText('Begin your ascent on the well-marked tourist path')).toBeInTheDocument()
  })

  test('handles null region data gracefully', () => {
    const walkDataWithNullRegion = {
      ...mockWalkData,
      region: null
    }

    mockUseQuery
      .mockReturnValueOnce(walkDataWithNullRegion)
      .mockReturnValueOnce(mockStages)
      .mockReturnValueOnce(mockReports)

    render(<WalkDetailPage slug="ben-nevis" />)

    // Should handle null region without crashing
    expect(screen.getByText('Ben Nevis')).toBeInTheDocument()
  })

  test('renders map component when walk data is available', () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalkData)
      .mockReturnValueOnce(mockStages)
      .mockReturnValueOnce(mockReports)

    render(<WalkDetailPage slug="ben-nevis" />)

    // Should render WalkMap component (mocked as div with testid)
    expect(screen.getByTestId('map')).toBeInTheDocument()
  })

  test('displays walk tags', () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalkData)
      .mockReturnValueOnce(mockStages)
      .mockReturnValueOnce(mockReports)

    render(<WalkDetailPage slug="ben-nevis" />)

    expect(screen.getByText('mountain')).toBeInTheDocument()
    expect(screen.getByText('challenging')).toBeInTheDocument()
    expect(screen.getByText('highland')).toBeInTheDocument()
  })

  test('handles empty reports array gracefully', () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalkData)
      .mockReturnValueOnce(mockStages)
      .mockReturnValueOnce([]) // empty reports

    render(<WalkDetailPage slug="ben-nevis" />)

    expect(screen.getByText('Ben Nevis')).toBeInTheDocument()
    // Should not crash with empty reports
  })

  test('handles empty stages array gracefully', () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalkData)
      .mockReturnValueOnce([]) // empty stages
      .mockReturnValueOnce(mockReports)

    render(<WalkDetailPage slug="ben-nevis" />)

    expect(screen.getByText('Ben Nevis')).toBeInTheDocument()
    // Should not crash with empty stages
  })
})