"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mountain, MapPin, Clock, TrendingUp, Droplets, Bug } from 'lucide-react';

interface ScottishWalk {
  id: string;
  name: string;
  gaelicName?: string;
  region: string;
  munroStatus: 'Munro' | 'Corbett' | 'Donald' | 'None';
  elevation: number;
  distance: string;
  duration: string;
  bogFactor: 1 | 2 | 3 | 4 | 5;
  midgeSeason: boolean;
  osGridRef: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  image: string;
  description: string;
  highlights: string[];
  elevationGain: number;
}

const featuredWalks: ScottishWalk[] = [
  {
    id: '1',
    name: 'Ben Nevis',
    gaelicName: 'Beinn Nibheis',
    region: 'Scottish Highlands',
    munroStatus: 'Munro',
    elevation: 1345,
    distance: '17km',
    duration: '7-9 hours',
    bogFactor: 2,
    midgeSeason: true,
    osGridRef: 'NN 166 712',
    difficulty: 'Expert',
    image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description: 'Britain\'s highest peak offers challenging conditions and spectacular views across the Highlands.',
    highlights: ['Summit cairn and trig point', 'Observatory ruins', 'Views to Skye on clear days'],
    elevationGain: 1300
  },
  {
    id: '2',
    name: 'Old Man of Storr',
    gaelicName: 'Bodach an Stòir',
    region: 'Isle of Skye',
    munroStatus: 'None',
    elevation: 719,
    distance: '5km',
    duration: '2-3 hours',
    bogFactor: 3,
    midgeSeason: true,
    osGridRef: 'NG 494 539',
    difficulty: 'Moderate',
    image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description: 'Iconic rocky pinnacles and ancient landslide create a mystical landscape on Skye\'s Trotternish Ridge.',
    highlights: ['Dramatic rock formations', 'Trotternish Ridge views', 'Photography paradise'],
    elevationGain: 400
  },
  {
    id: '3',
    name: 'Cairn Gorm',
    gaelicName: 'Càrn Gorm',
    region: 'Cairngorms',
    munroStatus: 'Munro',
    elevation: 1245,
    distance: '12km',
    duration: '5-6 hours',
    bogFactor: 1,
    midgeSeason: false,
    osGridRef: 'NJ 005 040',
    difficulty: 'Challenging',
    image: 'https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description: 'Classic Cairngorms granite dome with excellent winter conditions and sub-arctic plateau.',
    highlights: ['Ptarmigan restaurant', 'Funicular railway option', 'Arctic-alpine flora'],
    elevationGain: 900
  },
  {
    id: '4',
    name: 'Arthur\'s Seat',
    gaelicName: 'Suidhe Artair',
    region: 'Central Belt',
    munroStatus: 'None',
    elevation: 251,
    distance: '4km',
    duration: '1-2 hours',
    bogFactor: 1,
    midgeSeason: false,
    osGridRef: 'NT 275 729',
    difficulty: 'Easy',
    image: 'https://images.pexels.com/photos/3571554/pexels-photo-3571554.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description: 'Edinburgh\'s extinct volcano offers panoramic city views and easy accessibility from the Royal Mile.',
    highlights: ['Edinburgh city panorama', 'Holyrood Park', 'Ancient volcano crater'],
    elevationGain: 200
  },
  {
    id: '5',
    name: 'Ben Lomond',
    gaelicName: 'Beinn Laomainn',
    region: 'Trossachs',
    munroStatus: 'Munro',
    elevation: 974,
    distance: '11km',
    duration: '4-5 hours',
    bogFactor: 2,
    midgeSeason: true,
    osGridRef: 'NN 367 029',
    difficulty: 'Moderate',
    image: 'https://images.pexels.com/photos/2166650/pexels-photo-2166650.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description: 'Scotland\'s most southerly Munro overlooks the pristine waters of Loch Lomond.',
    highlights: ['Loch Lomond views', 'West Highland Way connection', 'Ancient oak woodlands'],
    elevationGain: 900
  },
  {
    id: '6',
    name: 'Schiehallion',
    gaelicName: 'Sìdh Chailleann',
    region: 'Perthshire',
    munroStatus: 'Munro',
    elevation: 1083,
    distance: '9km',
    duration: '4-5 hours',
    bogFactor: 2,
    midgeSeason: false,
    osGridRef: 'NN 714 548',
    difficulty: 'Moderate',
    image: 'https://images.pexels.com/photos/3998365/pexels-photo-3998365.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description: 'The "Fairy Hill of the Caledonians" is famous for its perfect conical shape and historic significance.',
    highlights: ['Perfect pyramid shape', 'Maskelyne\'s experiment site', 'Central Highland views'],
    elevationGain: 750
  }
];

const getBogFactorColor = (factor: number) => {
  switch (factor) {
    case 1: return 'bg-green-500';
    case 2: return 'bg-yellow-500';
    case 3: return 'bg-orange-500';
    case 4: return 'bg-red-500';
    case 5: return 'bg-red-700';
    default: return 'bg-gray-500';
  }
};

const getMunroStatusColor = (status: string) => {
  switch (status) {
    case 'Munro': return 'bg-emerald-600 text-white';
    case 'Corbett': return 'bg-purple-600 text-white';
    case 'Donald': return 'bg-blue-600 text-white';
    default: return 'bg-slate-600 text-white';
  }
};

export default function FeaturedWalks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-4">
            <Mountain className="w-4 h-4 mr-2" />
            Highland Heroes
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Scotland's Most
            <span className="block text-emerald-600">Legendary Walks</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From the mighty Munros to mystical island scrambles, discover walks that have 
            defined Scottish mountaineering for generations.
          </p>
        </div>

        {/* Featured Walks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredWalks.map((walk) => (
            <Card 
              key={walk.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
            >
              {/* Walk Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={walk.image}
                  alt={walk.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Status badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {walk.munroStatus !== 'None' && (
                    <Badge className={getMunroStatusColor(walk.munroStatus)}>
                      {walk.munroStatus}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-white/90 text-slate-800">
                    {walk.elevation}m
                  </Badge>
                </div>

                {/* Bog Factor & Midge indicators */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    <div className={`w-2 h-2 rounded-full ${getBogFactorColor(walk.bogFactor)}`} />
                    <span className="text-xs font-medium">{walk.bogFactor}</span>
                  </div>
                  {walk.midgeSeason && (
                    <div className="bg-amber-100 rounded-full px-2 py-1 flex items-center gap-1">
                      <Bug className="w-3 h-3 text-amber-600" />
                      <span className="text-xs font-medium text-amber-600">Midge</span>
                    </div>
                  )}
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{walk.name}</h3>
                  {walk.gaelicName && (
                    <p className="text-sm text-slate-200 italic">{walk.gaelicName}</p>
                  )}
                </div>
              </div>

              <CardContent className="p-6">
                {/* Location and Grid Reference */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-slate-600">{walk.region}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{walk.osGridRef}</span>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{walk.description}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                    </div>
                    <div className="text-sm font-bold text-slate-900">{walk.distance}</div>
                    <div className="text-xs text-slate-500">Distance</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="w-3 h-3 text-purple-600" />
                    </div>
                    <div className="text-sm font-bold text-slate-900">{walk.duration}</div>
                    <div className="text-xs text-slate-500">Duration</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Mountain className="w-3 h-3 text-amber-600" />
                    </div>
                    <div className="text-sm font-bold text-slate-900">+{walk.elevationGain}m</div>
                    <div className="text-xs text-slate-500">Elevation</div>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="flex justify-center mb-4">
                  <Badge 
                    variant={
                      walk.difficulty === 'Easy' ? 'secondary' :
                      walk.difficulty === 'Moderate' ? 'default' :
                      walk.difficulty === 'Challenging' ? 'destructive' : 'destructive'
                    }
                  >
                    {walk.difficulty} Route
                  </Badge>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Highlights</h4>
                  <div className="space-y-1">
                    {walk.highlights.slice(0, 2).map((highlight, index) => (
                      <div key={index} className="text-xs text-slate-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 group-hover:bg-emerald-700">
                  Plan Your Walk
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            Explore All Scottish Walks
          </Button>
        </div>
      </div>
    </section>
  );
}