"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Thermometer, Users, Mountain, Eye } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  gaelicName: string;
  description: string;
  activeWalkers: number;
  temperature: string;
  condition: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  highlights: string[];
  image: string;
  coordinates: { x: number; y: number };
}

const regions: Region[] = [
  {
    id: 'highlands',
    name: 'Scottish Highlands',
    gaelicName: 'Gàidhealtachd na h-Alba',
    description: 'Home to Ben Nevis and the most dramatic mountain scenery in Britain',
    activeWalkers: 45,
    temperature: '8°C',
    condition: 'Clear views',
    difficulty: 'Expert',
    highlights: ['Ben Nevis', 'Glen Coe', 'Cairngorms'],
    image: 'https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    coordinates: { x: 35, y: 25 }
  },
  {
    id: 'skye',
    name: 'Isle of Skye',
    gaelicName: 'An t-Eilean Sgitheanach',
    description: 'Dramatic ridges, fairy pools, and the legendary Cuillin mountains',
    activeWalkers: 23,
    temperature: '12°C',
    condition: 'Partly cloudy',
    difficulty: 'Challenging',
    highlights: ['Cuillin Ridge', 'Old Man of Storr', 'Quiraing'],
    image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    coordinates: { x: 15, y: 30 }
  },
  {
    id: 'southern-uplands',
    name: 'Southern Uplands',
    gaelicName: 'Na Monaidhean Dheasacha',
    description: 'Rolling hills and ancient trails along the English border',
    activeWalkers: 18,
    temperature: '15°C',
    condition: 'Sunny spells',
    difficulty: 'Moderate',
    highlights: ['Southern Upland Way', 'Lowther Hills', 'Galloway Hills'],
    image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    coordinates: { x: 45, y: 75 }
  },
  {
    id: 'central-belt',
    name: 'Central Belt',
    gaelicName: 'A\' Chrios Mheadhanach',
    description: 'Accessible hills and historic routes between Edinburgh and Glasgow',
    activeWalkers: 31,
    temperature: '13°C',
    condition: 'Light rain',
    difficulty: 'Easy',
    highlights: ['Pentland Hills', 'Campsie Fells', 'Ochil Hills'],
    image: 'https://images.pexels.com/photos/3571554/pexels-photo-3571554.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    coordinates: { x: 40, y: 60 }
  }
];

export default function RegionShowcase() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(regions[0]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            Explore Scotland's Regions
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
                  {regions.map((region) => (
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
                      {regions.reduce((sum, region) => sum + region.activeWalkers, 0)}
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
                  <img
                    src={selectedRegion.image}
                    alt={selectedRegion.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{selectedRegion.name}</h3>
                    <p className="text-sm text-slate-200 italic">{selectedRegion.gaelicName}</p>
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
                      variant={
                        selectedRegion.difficulty === 'Easy' ? 'secondary' :
                        selectedRegion.difficulty === 'Moderate' ? 'default' :
                        selectedRegion.difficulty === 'Challenging' ? 'destructive' : 'destructive'
                      }
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

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Explore {selectedRegion.name}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick region switcher */}
            <div className="grid grid-cols-2 gap-2">
              {regions.map((region) => (
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
      </div>
    </section>
  );
}