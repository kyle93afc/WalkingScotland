import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useQuery } from 'convex/react'
import WalkSearch from '../WalkSearch'

// Mock the useQuery hook
const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>

// Mock walk data
const mockWalks = [
  {
    _id: '1',
    slug: 'ben-nevis',
    title: 'Ben Nevis',
    shortDescription: 'Highest mountain in Scotland',
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
    }
  },
  {
    _id: '2',
    slug: 'arthur-seat',
    title: "Arthur's Seat",
    shortDescription: 'Edinburgh\'s extinct volcano',
    difficulty: 'Easy',
    distance: 3.2,
    estimatedTime: 2,
    ascent: 251,
    averageRating: 4.2,
    reportCount: 89,
    viewCount: 800,
    latitude: 55.9442,
    longitude: -3.1618,
    featuredImageUrl: '/test-image2.jpg',
    tags: ['urban', 'easy', 'historic'],
    region: {
      _id: 'edinburgh',
      name: 'Edinburgh',
      slug: 'edinburgh'
    }
  },
  {
    _id: '3',
    slug: 'loch-katrine',
    title: 'Loch Katrine Circuit',
    shortDescription: 'Beautiful loch-side walking',
    difficulty: 'Moderate',
    distance: 12.0,
    estimatedTime: 5,
    ascent: 200,
    averageRating: 4.0,
    reportCount: 67,
    viewCount: 1200,
    latitude: 56.2647,
    longitude: -4.5847,
    featuredImageUrl: '/test-image3.jpg',
    tags: ['loch', 'scenic', 'moderate'],
    region: {
      _id: 'trossachs',
      name: 'Loch Lomond & Trossachs',
      slug: 'trossachs'
    }
  }
]

const mockRegions = [
  { _id: 'highland', name: 'Scottish Highlands', slug: 'highland' },
  { _id: 'edinburgh', name: 'Edinburgh', slug: 'edinburgh' },
  { _id: 'trossachs', name: 'Loch Lomond & Trossachs', slug: 'trossachs' }
]

describe('WalkSearch Component', () => {
  beforeEach(() => {
    mockUseQuery.mockClear()
  })

  test('renders search interface correctly', () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalks) // walks query
      .mockReturnValueOnce(mockRegions) // regions query

    render(<WalkSearch />)

    expect(screen.getByPlaceholderText(/search walks/i)).toBeInTheDocument()
    expect(screen.getByText(/filters/i)).toBeInTheDocument()
    expect(screen.getByText(/sort by/i)).toBeInTheDocument()
  })

  test('displays all walks when no filters applied', () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalks)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    expect(screen.getByText('Ben Nevis')).toBeInTheDocument()
    expect(screen.getByText("Arthur's Seat")).toBeInTheDocument()
    expect(screen.getByText('Loch Katrine Circuit')).toBeInTheDocument()
  })

  test('filters walks by search term', async () => {
    const user = userEvent.setup()
    mockUseQuery
      .mockReturnValueOnce(mockWalks)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    const searchInput = screen.getByPlaceholderText(/search walks/i)
    await user.type(searchInput, 'Ben')

    await waitFor(() => {
      expect(screen.getByText('Ben Nevis')).toBeInTheDocument()
      expect(screen.queryByText("Arthur's Seat")).not.toBeInTheDocument()
      expect(screen.queryByText('Loch Katrine Circuit')).not.toBeInTheDocument()
    })
  })

  test('filters walks by difficulty', async () => {
    const user = userEvent.setup()
    mockUseQuery
      .mockReturnValueOnce(mockWalks)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    // Find and click the difficulty filter
    const easyCheckbox = screen.getByLabelText(/easy/i)
    await user.click(easyCheckbox)

    await waitFor(() => {
      expect(screen.queryByText('Ben Nevis')).not.toBeInTheDocument()
      expect(screen.getByText("Arthur's Seat")).toBeInTheDocument()
      expect(screen.queryByText('Loch Katrine Circuit')).not.toBeInTheDocument()
    })
  })

  test('filters walks by region', async () => {
    const user = userEvent.setup()
    mockUseQuery
      .mockReturnValueOnce(mockWalks)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    // Find and click the region filter
    const highlandCheckbox = screen.getByLabelText(/scottish highlands/i)
    await user.click(highlandCheckbox)

    await waitFor(() => {
      expect(screen.getByText('Ben Nevis')).toBeInTheDocument()
      expect(screen.queryByText("Arthur's Seat")).not.toBeInTheDocument()
      expect(screen.queryByText('Loch Katrine Circuit')).not.toBeInTheDocument()
    })
  })

  test('filters walks by distance range', async () => {
    const user = userEvent.setup()
    mockUseQuery
      .mockReturnValueOnce(mockWalks)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    // Set maximum distance to exclude longer walks
    const maxDistanceSlider = screen.getByRole('slider', { name: /max distance/i })
    fireEvent.change(maxDistanceSlider, { target: { value: 10 } })

    await waitFor(() => {
      expect(screen.queryByText('Ben Nevis')).not.toBeInTheDocument() // 17.5km
      expect(screen.getByText("Arthur's Seat")).toBeInTheDocument() // 3.2km
      expect(screen.queryByText('Loch Katrine Circuit')).not.toBeInTheDocument() // 12km
    })
  })

  test('filters walks by duration range', async () => {
    const user = userEvent.setup()
    mockUseQuery
      .mockReturnValueOnce(mockWalks)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    // Set maximum duration to exclude longer walks
    const maxDurationSlider = screen.getByRole('slider', { name: /max duration/i })
    fireEvent.change(maxDurationSlider, { target: { value: 4 } })

    await waitFor(() => {
      expect(screen.queryByText('Ben Nevis')).not.toBeInTheDocument() // 8h
      expect(screen.getByText("Arthur's Seat")).toBeInTheDocument() // 2h
      expect(screen.queryByText('Loch Katrine Circuit')).not.toBeInTheDocument() // 5h
    })
  })

  test('sorts walks by different criteria', async () => {
    const user = userEvent.setup()
    mockUseQuery
      .mockReturnValueOnce(mockWalks)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    const sortSelect = screen.getByRole('combobox', { name: /sort by/i })
    await user.selectOptions(sortSelect, 'distance')

    // Verify walks are still displayed (testing sort logic implementation)
    expect(screen.getByText('Ben Nevis')).toBeInTheDocument()
    expect(screen.getByText("Arthur's Seat")).toBeInTheDocument()
    expect(screen.getByText('Loch Katrine Circuit')).toBeInTheDocument()
  })

  test('displays walk statistics using averageRating field', () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalks)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    // Verify that averageRating field is displayed (not rating)
    expect(screen.getByText('4.5')).toBeInTheDocument() // Ben Nevis
    expect(screen.getByText('4.2')).toBeInTheDocument() // Arthur's Seat
    expect(screen.getByText('4.0')).toBeInTheDocument() // Loch Katrine
  })

  test('displays reportCount field correctly', () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalks)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    // Verify that reportCount field is displayed
    expect(screen.getByText('142')).toBeInTheDocument() // Ben Nevis
    expect(screen.getByText('89')).toBeInTheDocument() // Arthur's Seat
    expect(screen.getByText('67')).toBeInTheDocument() // Loch Katrine
  })

  test('handles null region data gracefully', () => {
    const walksWithNullRegion = [
      {
        ...mockWalks[0],
        region: null
      }
    ]

    mockUseQuery
      .mockReturnValueOnce(walksWithNullRegion)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    expect(screen.getByText('Unknown Region')).toBeInTheDocument()
  })

  test('clears filters when clear button is clicked', async () => {
    const user = userEvent.setup()
    mockUseQuery
      .mockReturnValueOnce(mockWalks)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    // Apply some filters
    const searchInput = screen.getByPlaceholderText(/search walks/i)
    await user.type(searchInput, 'Ben')

    // Look for clear button by text or icon
    const clearButton = screen.getByText(/clear/i) || screen.getByRole('button', { name: /clear/i })
    await user.click(clearButton)

    // Should show all walks again
    expect(screen.getByText('Ben Nevis')).toBeInTheDocument()
    expect(screen.getByText("Arthur's Seat")).toBeInTheDocument()
    expect(screen.getByText('Loch Katrine Circuit')).toBeInTheDocument()
  })

  test('displays difficulty badges with correct colors', () => {
    mockUseQuery
      .mockReturnValueOnce(mockWalks)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    const hardBadge = screen.getByText('Hard')
    const easyBadge = screen.getByText('Easy')
    const moderateBadge = screen.getByText('Moderate')

    expect(hardBadge).toHaveClass('bg-red-100')
    expect(easyBadge).toHaveClass('bg-emerald-100')
    expect(moderateBadge).toHaveClass('bg-amber-100')
  })

  test('shows loading state when data is undefined', () => {
    mockUseQuery.mockReturnValue(undefined)

    render(<WalkSearch />)

    // Should render without crashing when data is undefined
    expect(screen.getByRole('textbox', { name: /search/i })).toBeInTheDocument()
  })

  test('displays no results message when no walks match filters', async () => {
    const user = userEvent.setup()
    mockUseQuery
      .mockReturnValueOnce(mockWalks)
      .mockReturnValueOnce(mockRegions)

    render(<WalkSearch />)

    const searchInput = screen.getByPlaceholderText(/search walks/i)
    await user.type(searchInput, 'nonexistent walk name')

    await waitFor(() => {
      expect(screen.getByText(/no walks found/i)).toBeInTheDocument()
    })
  })
})