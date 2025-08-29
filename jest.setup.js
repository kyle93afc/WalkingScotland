import '@testing-library/jest-dom'

// Mock Convex client
jest.mock('convex/react', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // Filter out Next.js specific props that shouldn't be passed to <img>
    const { fill, priority, ...imgProps } = props
    return <img {...imgProps} />
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  },
}))

// Mock mapbox-gl
jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
    remove: jest.fn(),
    addSource: jest.fn(),
    addLayer: jest.fn(),
    setCenter: jest.fn(),
    setZoom: jest.fn(),
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}))

// Mock components that render maps
global.HTMLCanvasElement.prototype.getContext = jest.fn()

// Mock ScotlandRegionMap component
jest.mock('@/components/map/ScotlandRegionMap', () => {
  return function MockScotlandRegionMap() {
    return <div data-testid="map">Scotland Region Map</div>
  }
})

// Mock WalkMap component
jest.mock('@/components/map/WalkMap', () => {
  return function MockWalkMap() {
    return <div data-testid="map">Walk Map</div>
  }
})