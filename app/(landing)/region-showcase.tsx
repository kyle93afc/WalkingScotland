'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mountain, Thermometer, Users, Eye } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

// Helper function to get highlight tags for a region based on its name
function getRegionHighlights(regionName: string): string[] {
  const name = regionName.toLowerCase();
  
  if (name.includes('skye')) return ['Old Man of Storr', 'Quiraing', 'Cuillin Ridge', 'Dunvegan'];
  if (name.includes('mull')) return ['Ben More', 'Tobermory', 'Fingals Cave', 'Duart Castle'];
  if (name.includes('fort william')) return ['Ben Nevis', 'Glen Coe', 'Glen Nevis', 'Steall Falls'];
  if (name.includes('cairngorms')) return ['Cairn Gorm', 'Loch Morlich', 'Aviemore', 'Braemar'];
  if (name.includes('torridon')) return ['Liathach', 'Beinn Alligin', 'Beinn Eighe', 'Applecross'];
  if (name.includes('loch lomond')) return ['Ben Lomond', 'Trossachs', 'Luss', 'Balloch'];
  if (name.includes('arran')) return ['Goat Fell', 'Brodick', 'Corrie', 'Lochranza'];
  if (name.includes('borders')) return ['Eildon Hills', 'St Abbs Head', 'Melrose', 'Kelso'];
  if (name.includes('dumfries')) return ['Merrick', 'Galloway Forest', 'Wanlockhead', 'Castle Douglas'];
  if (name.includes('edinburgh')) return ['Arthur\'s Seat', 'Pentland Hills', 'Holyrood Park', 'Calton Hill'];
  
  // Default highlights based on region type
  if (name.includes('isle') || name.includes('island') || name.includes('hebrides') || name.includes('orkney') || name.includes('shetland')) {
    return ['Coastal walks', 'Sea cliffs', 'Wildlife', 'Culture'];
  }
  
  return ['Mountain walks', 'Scenic views', 'Wildlife', 'Heritage'];
}

// Helper function to get difficulty level for a region
function getRegionDifficulty(regionName: string): string {
  const name = regionName.toLowerCase();
  
  if (name.includes('sutherland') || name.includes('torridon') || name.includes('skye') || name.includes('fort william')) {
    return 'Expert';
  }
  if (name.includes('borders') || name.includes('fife') || name.includes('edinburgh') || name.includes('glasgow')) {
    return 'Easy';
  }
  if (name.includes('cairngorms') || name.includes('highlands')) {
    return 'Challenging';
  }
  
  return 'Moderate';
}

// Helper function to get coordinates for regions
function getRegionCoordinates(regionName: string): { x: number; y: number } {
  const name = regionName.toLowerCase();
  
  if (name.includes('highland')) return { x: 35, y: 25 };
  if (name.includes('skye')) return { x: 15, y: 30 };
  if (name.includes('borders') || name.includes('southern')) return { x: 45, y: 75 };
  if (name.includes('central') || name.includes('edinburgh') || name.includes('glasgow')) return { x: 40, y: 60 };
  if (name.includes('cairngorms')) return { x: 50, y: 40 };
  
  return { x: 40, y: 50 }; // default center
}

export default function RegionShowcase() {
  const regions = useQuery(api.regions.getAllRegions) || [];
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  
  // Transform Convex regions to match the expected format and add featured status
  const transformedRegions = regions.map(region => ({
    ...region,
    id: region._id,
    highlights: getRegionHighlights(region.name),
    difficulty: getRegionDifficulty(region.name),
    featured: region.popularityScore >= 85, // Mark high-popularity regions as featured
    activeWalkers: Math.floor(Math.random() * 30) + 10, // Mock active walkers for demo
    temperature: Math.floor(Math.random() * 15) + 5 + '°C', // Mock temperature
    condition: ['Clear views', 'Light clouds', 'Sunny spells', 'Perfect conditions'][Math.floor(Math.random() * 4)],
    coordinates: getRegionCoordinates(region.name) // Add coordinates for map
  }));

  React.useEffect(() => {
    if (transformedRegions.length > 0 && !selectedRegion) {
      setSelectedRegion(transformedRegions[0]);
    }
  }, [transformedRegions, selectedRegion]);


  // Show loading state
  if (regions === undefined) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Mountain className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Loading regions...</h2>
            <p className="text-slate-600">Discovering Scotland&apos;s walking regions</p>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no regions
  if (regions.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Mountain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No regions available</h2>
            <p className="text-slate-600 mb-6">Regions haven&apos;t been seeded yet. Set up the database to see Scottish walking regions.</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/admin/seed">Seed Database</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            Explore Scotland&apos;s Regions
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            From Highlands to
            <span className="block text-emerald-600">Southern Uplands</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover the diverse landscapes of Scotland, each with its own character, 
            challenges, and breathtaking beauty waiting to be explored.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-100 to-purple-100 rounded-xl overflow-hidden">
                {/* Simplified Scotland Map */}
                <div className="absolute inset-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <pattern id="tartan" patternUnits="userSpaceOnUse" width="10" height="10">
                        <rect width="10" height="10" fill="#059669"/>
                        <rect width="2" height="10" fill="#7c3aed"/>
                        <rect width="10" height="2" fill="#7c3aed"/>
                      </pattern>
                    </defs>
                    
                    {/* Simplified Scotland outline */}
                    <path
                      d="M30,15 Q40,10 50,15 L55,20 Q60,15 65,20 L70,25 Q75,20 80,30 L85,40 Q80,50 75,55 L70,60 Q65,65 60,70 L55,75 Q50,80 45,85 L40,90 Q35,85 30,80 L25,75 Q20,70 15,65 L10,60 Q15,50 20,40 L25,30 Q20,20 30,15 Z"
                      fill="url(#tartan)"
                      fillOpacity="0.3"
                      stroke="#059669"
                      strokeWidth="0.5"
                      className="transition-all duration-300 hover:fill-opacity-50"
                    />
                  </svg>

                  {/* Region markers */}
                  {transformedRegions.map((region) => (
                    <button
                      key={region.id}
                      className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-300 transform hover:scale-125 ${
                        selectedRegion?.id === region.id
                          ? 'bg-emerald-500 scale-125'
                          : hoveredRegion === region.id
                          ? 'bg-purple-500 scale-110'
                          : 'bg-slate-600'
                      }`}
                      style={{
                        left: `${region.coordinates.x}%`,
                        top: `${region.coordinates.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => setSelectedRegion(region)}
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                    >
                      <span className="sr-only">{region.name}</span>
                    </button>
                  ))}
                </div>

                {/* Live data overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-slate-700">Live Conditions</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-sm text-slate-600">
                    Total Active: <span className="font-bold text-emerald-600">
                      {transformedRegions.reduce((sum, region) => sum + region.activeWalkers, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Region Details */}
          <div className="space-y-6">
            {selectedRegion && (
              <Card className="overflow-hidden border-0 shadow-xl">
                <div className="aspect-video relative">
                  <Image
                    src={selectedRegion.imageUrl}
                    alt={selectedRegion.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{selectedRegion.name}</h3>
                    <p className="text-sm text-slate-200 italic">{selectedRegion.name} Region</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-slate-600 mb-4">{selectedRegion.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">
                        <span className="font-bold text-emerald-600">{selectedRegion.activeWalkers}</span> active
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">{selectedRegion.temperature}</span>
                    </div>
                  </div>

                  {/* Difficulty and condition */}
                  <div className="flex items-center gap-2 mb-4">
                    <Badge 
                      className={selectedRegion.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        selectedRegion.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        selectedRegion.difficulty === 'Challenging' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'}
                    >
                      <Mountain className="w-3 h-3 mr-1" />
                      {selectedRegion.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                      <Eye className="w-3 h-3 mr-1" />
                      {selectedRegion.condition}
                    </Badge>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-2">Highlights</h4>
                    <div className="space-y-1">
                      {selectedRegion.highlights.map((highlight) => (
                        <div key={highlight} className="text-sm text-slate-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                    <Link href={`/regions/${selectedRegion.slug}`}>
                      Explore {selectedRegion.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick region switcher */}
            <div className="grid grid-cols-2 gap-2">
              {transformedRegions.slice(0, 4).map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    selectedRegion?.id === region.id
                      ? 'bg-emerald-100 border-2 border-emerald-300'
                      : 'bg-white border-2 border-slate-200 hover:border-emerald-200'
                  }`}
                >
                  <div className="font-medium text-sm text-slate-900">{region.name}</div>
                  <div className="text-xs text-slate-500">{region.activeWalkers} active</div>
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8 border-emerald-200 text-emerald-700 hover:bg-emerald-50" asChild>
            <Link href="/walks">
              Browse by Region
              <Mountain className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}