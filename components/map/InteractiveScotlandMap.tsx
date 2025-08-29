'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Mountain, 
  Search, 
  ChevronLeft, 
  Home,
  Users, 
  TrendingUp,
  Compass,
  Info
} from 'lucide-react';
import Link from 'next/link';

// Types
interface ScotlandRegion {
  id: string;
  name: string;
  description: string;
  walkCount: number;
  popularityScore: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  subRegions?: SubRegion[];
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  center: {
    lat: number;
    lng: number;
  };
  polygon: [number, number][];
}

interface SubRegion {
  id: string;
  name: string;
  description: string;
  walkCount: number;
  center: {
    lat: number;
    lng: number;
  };
  polygon: [number, number][];
}

interface MapView {
  level: 'scotland' | 'region' | 'subregion';
  selectedRegion?: ScotlandRegion;
  selectedSubRegion?: SubRegion;
}

interface InteractiveScotlandMapProps {
  regions: any[]; // Convex regions data
  onRegionSelect?: (regionSlug: string) => void;
  className?: string;
}

// Mock Scotland regions data with realistic boundaries
const SCOTLAND_REGIONS: ScotlandRegion[] = [
  {
    id: 'highlands',
    name: 'Highlands',
    description: 'Scotland\'s most dramatic landscapes with towering peaks and ancient glens',
    walkCount: 156,
    popularityScore: 95,
    difficulty: 'Expert',
    bounds: { north: 58.5, south: 56.8, east: -2.1, west: -6.2 },
    center: { lat: 57.4, lng: -4.2 },
    polygon: [[-6.2, 58.5], [-2.1, 58.5], [-2.1, 56.8], [-6.2, 56.8], [-6.2, 58.5]],
    subRegions: [
      {
        id: 'fort-william',
        name: 'Fort William & Ben Nevis',
        description: 'Home to Britain\'s highest peak',
        walkCount: 45,
        center: { lat: 56.82, lng: -5.11 },
        polygon: [[-5.5, 57.1], [-4.7, 57.1], [-4.7, 56.5], [-5.5, 56.5], [-5.5, 57.1]]
      },
      {
        id: 'torridon',
        name: 'Torridon & Wester Ross',
        description: 'Ancient Torridonian sandstone peaks',
        walkCount: 38,
        center: { lat: 57.55, lng: -5.5 },
        polygon: [[-6.0, 58.0], [-5.0, 58.0], [-5.0, 57.1], [-6.0, 57.1], [-6.0, 58.0]]
      },
      {
        id: 'cairngorms',
        name: 'Cairngorms National Park',
        description: 'Britain\'s largest national park',
        walkCount: 73,
        center: { lat: 57.1, lng: -3.6 },
        polygon: [[-4.2, 57.7], [-2.9, 57.7], [-2.9, 56.8], [-4.2, 56.8], [-4.2, 57.7]]
      }
    ]
  },
  {
    id: 'southern-uplands',
    name: 'Southern Uplands & Borders',
    description: 'Rolling hills and historic border country',
    walkCount: 67,
    popularityScore: 72,
    difficulty: 'Moderate',
    bounds: { north: 55.8, south: 54.9, east: -2.0, west: -5.2 },
    center: { lat: 55.4, lng: -3.5 },
    polygon: [[-5.2, 55.8], [-2.0, 55.8], [-2.0, 54.9], [-5.2, 54.9], [-5.2, 55.8]],
    subRegions: [
      {
        id: 'galloway',
        name: 'Galloway Hills',
        description: 'Scotland\'s hidden gem in the southwest',
        walkCount: 28,
        center: { lat: 55.0, lng: -4.4 },
        polygon: [[-5.0, 55.3], [-3.8, 55.3], [-3.8, 54.7], [-5.0, 54.7], [-5.0, 55.3]]
      },
      {
        id: 'borders',
        name: 'Scottish Borders',
        description: 'Historic border country with gentle hills',
        walkCount: 39,
        center: { lat: 55.5, lng: -2.8 },
        polygon: [[-3.5, 55.8], [-2.0, 55.8], [-2.0, 55.2], [-3.5, 55.2], [-3.5, 55.8]]
      }
    ]
  },
  {
    id: 'central-scotland',
    name: 'Central Scotland',
    description: 'Accessible peaks and historic landscapes near Scotland\'s cities',
    walkCount: 89,
    popularityScore: 88,
    difficulty: 'Easy',
    bounds: { north: 56.8, south: 55.8, east: -2.8, west: -4.8 },
    center: { lat: 56.3, lng: -3.8 },
    polygon: [[-4.8, 56.8], [-2.8, 56.8], [-2.8, 55.8], [-4.8, 55.8], [-4.8, 56.8]],
    subRegions: [
      {
        id: 'trossachs',
        name: 'Loch Lomond & Trossachs',
        description: 'Scotland\'s first national park',
        walkCount: 52,
        center: { lat: 56.3, lng: -4.3 },
        polygon: [[-4.8, 56.6], [-3.8, 56.6], [-3.8, 56.0], [-4.8, 56.0], [-4.8, 56.6]]
      },
      {
        id: 'lothians',
        name: 'Edinburgh & Lothians',
        description: 'Urban walks and coastal paths',
        walkCount: 37,
        center: { lat: 55.9, lng: -3.2 },
        polygon: [[-3.6, 56.1], [-2.8, 56.1], [-2.8, 55.7], [-3.6, 55.7], [-3.6, 56.1]]
      }
    ]
  },
  {
    id: 'islands',
    name: 'Scottish Islands',
    description: 'Dramatic coastal walks on Scotland\'s beautiful islands',
    walkCount: 124,
    popularityScore: 92,
    difficulty: 'Challenging',
    bounds: { north: 58.9, south: 55.3, east: -1.1, west: -7.6 },
    center: { lat: 57.3, lng: -6.2 },
    polygon: [[-7.6, 58.9], [-1.1, 58.9], [-1.1, 55.3], [-7.6, 55.3], [-7.6, 58.9]],
    subRegions: [
      {
        id: 'skye',
        name: 'Isle of Skye',
        description: 'The most famous of Scotland\'s islands',
        walkCount: 67,
        center: { lat: 57.3, lng: -6.2 },
        polygon: [[-6.7, 57.7], [-5.6, 57.7], [-5.6, 56.9], [-6.7, 56.9], [-6.7, 57.7]]
      },
      {
        id: 'mull',
        name: 'Isle of Mull',
        description: 'Diverse landscapes from peaks to coast',
        walkCount: 34,
        center: { lat: 56.5, lng: -6.0 },
        polygon: [[-6.5, 56.8], [-5.5, 56.8], [-5.5, 56.2], [-6.5, 56.2], [-6.5, 56.8]]
      },
      {
        id: 'arran',
        name: 'Isle of Arran',
        description: 'Scotland in miniature',
        walkCount: 23,
        center: { lat: 55.6, lng: -5.2 },
        polygon: [[-5.4, 55.8], [-5.0, 55.8], [-5.0, 55.4], [-5.4, 55.4], [-5.4, 55.8]]
      }
    ]
  }
];

const difficultyColors = {
  'Easy': 'bg-green-500',
  'Moderate': 'bg-yellow-500', 
  'Challenging': 'bg-orange-500',
  'Expert': 'bg-red-500'
};

export default function InteractiveScotlandMap({ 
  regions, 
  onRegionSelect,
  className = ""
}: InteractiveScotlandMapProps) {
  const [mapView, setMapView] = useState<MapView>({ level: 'scotland' });
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter regions based on search
  const filteredRegions = SCOTLAND_REGIONS.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    region.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegionClick = useCallback((region: ScotlandRegion) => {
    setIsLoading(true);
    setTimeout(() => {
      setMapView({ level: 'region', selectedRegion: region });
      setIsLoading(false);
    }, 300);
  }, []);

  const handleSubRegionClick = useCallback((subRegion: SubRegion) => {
    if (onRegionSelect) {
      // Convert sub-region to slug and navigate
      const slug = subRegion.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      onRegionSelect(slug);
    }
  }, [onRegionSelect]);

  const handleBackToScotland = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setMapView({ level: 'scotland' });
      setIsLoading(false);
    }, 300);
  }, []);

  const MapOverlay = () => (
    <div className="absolute top-6 left-6 right-6 z-10">
      <div className="flex items-center justify-between mb-4">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          {mapView.level !== 'scotland' && (
            <Button
              onClick={handleBackToScotland}
              variant="secondary"
              size="sm"
              className="bg-white/90 backdrop-blur-sm shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Scotland
            </Button>
          )}
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            <Home className="w-3 h-3 mr-1" />
            {mapView.level === 'scotland' ? 'Scotland Overview' : 
             mapView.level === 'region' ? mapView.selectedRegion?.name :
             'Sub-region View'}
          </Badge>
        </div>

        {/* Search */}
        {mapView.level === 'scotland' && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search regions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/90 backdrop-blur-sm shadow-lg border-0 w-64"
            />
          </div>
        )}
      </div>
    </div>
  );

  const InfoPanel = () => {
    if (mapView.level === 'scotland') {
      const region = hoveredRegion ? SCOTLAND_REGIONS.find(r => r.id === hoveredRegion) : null;
      
      return (
        <Card className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm shadow-xl border-0 z-10">
          <CardContent className="p-6">
            {region ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{region.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className={`${difficultyColors[region.difficulty]} text-white`}>
                      {region.difficulty}
                    </Badge>
                    <Badge variant="secondary">
                      {region.walkCount} walks
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{region.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Popularity: {region.popularityScore}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mountain className="w-4 h-4" />
                      <span>{region.subRegions?.length || 0} sub-regions</span>
                    </div>
                  </div>
                  <Button onClick={() => handleRegionClick(region)} className="bg-emerald-600 hover:bg-emerald-700">
                    Explore Region
                    <Compass className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Discover Scotland's Walking Regions
                </h3>
                <p className="text-gray-600">
                  Hover over or click any region to explore the walks and landscapes that await you.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  return (
    <div className={`relative w-full h-screen bg-slate-100 ${className}`}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="w-full h-full relative">
        {/* Mapbox will be implemented here */}
        <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <Mountain className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Interactive Scotland Map
            </h2>
            <p className="text-gray-600 max-w-md">
              {mapView.level === 'scotland' 
                ? "Full Scotland view with clickable regions" 
                : `Exploring ${mapView.selectedRegion?.name} with sub-regions`}
            </p>
            
            {/* Temporary region buttons for demo */}
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg">
              {(mapView.level === 'scotland' ? filteredRegions : mapView.selectedRegion?.subRegions || []).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (mapView.level === 'scotland') {
                      handleRegionClick(item as ScotlandRegion);
                    } else {
                      handleSubRegionClick(item as SubRegion);
                    }
                  }}
                  onMouseEnter={() => mapView.level === 'scotland' && setHoveredRegion(item.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  className={`p-4 rounded-lg text-left transition-all duration-200 ${
                    hoveredRegion === item.id 
                      ? 'bg-emerald-100 shadow-lg scale-105' 
                      : 'bg-white shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.walkCount} walks</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <MapOverlay />
        <InfoPanel />
      </div>
    </div>
  );
}