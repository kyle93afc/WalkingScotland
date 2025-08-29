'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, TrendingUp, Star, Users, Mountain, Droplets } from 'lucide-react';

const difficultyColors: Record<string, string> = {
  'Easy': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Moderate': 'bg-amber-100 text-amber-700 border-amber-200',
  'Hard': 'bg-red-100 text-red-700 border-red-200',
  'Strenuous': 'bg-purple-100 text-purple-700 border-purple-200'
};

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

interface Walk {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  distance: number;
  estimatedTime: number;
  ascent?: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Strenuous';
  averageRating: number;
  reportCount: number;
  viewCount: number;
  featuredImageUrl: string;
  tags: string[];
  region?: {
    name: string;
  };
  maxElevation?: number;
  bogFactor?: number;
}

interface WalkCardProps {
  walk: Walk;
  variant?: 'featured' | 'discovery';
  isListView?: boolean;
}

export default function WalkCard({ walk, variant = 'discovery', isListView = false }: WalkCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 bg-white dark:bg-gray-800 ${isFeatured ? 'hover:-translate-y-2' : ''}`}>
      <div className={`${isListView ? 'flex' : ''}`}>
        {/* Image */}
        <div className={`${isListView ? 'w-48 h-32 flex-shrink-0' : 'aspect-[4/3]'} overflow-hidden relative`}>
          <Image
            src={walk.featuredImageUrl}
            alt={walk.title}
            width={isListView ? 192 : 400}
            height={isListView ? 128 : 300}
            className={`w-full h-full object-cover transition-transform duration-300 ${isFeatured ? 'group-hover:scale-110' : 'group-hover:scale-105'}`}
          />

          {/* Overlays */}
          {isFeatured && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Status badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {walk.tags?.includes('Munro') && (
                  <Badge className="bg-emerald-600 text-white">Munro</Badge>
                )}
                {walk.tags?.includes('Corbett') && (
                  <Badge className="bg-purple-600 text-white">Corbett</Badge>
                )}
                <Badge variant="secondary" className="bg-white/90 text-slate-800">
                  {walk.distance}km
                </Badge>
              </div>

              {/* Activity indicators */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {walk.bogFactor && (
                  <div className="bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    <div className={`w-2 h-2 rounded-full ${getBogFactorColor(walk.bogFactor)}`} />
                    <span className="text-xs font-medium">{walk.bogFactor}</span>
                  </div>
                )}
                {walk.viewCount > 50 && (
                  <div className="bg-emerald-100 rounded-full px-2 py-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-600">{Math.min(Math.floor(walk.viewCount / 10), 99)}</span>
                  </div>
                )}
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{walk.title}</h3>
                <p className="text-sm text-slate-200">{walk.region?.name || 'Scotland'}</p>
              </div>
            </>
          )}

          {/* Regular card difficulty badge */}
          {!isFeatured && (
            <Badge 
              variant="secondary" 
              className={`absolute top-3 left-3 ${difficultyColors[walk.difficulty]} border`}
            >
              {walk.difficulty}
            </Badge>
          )}

          {/* Live activity indicator for regular cards */}
          {!isFeatured && walk.viewCount > 1000 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs font-medium">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <Users className="size-3" />
              <span>{Math.floor(walk.viewCount / 100)}</span>
            </div>
          )}
        </div>

        <CardContent className={`${isListView ? 'flex-1' : ''} p-${isFeatured ? '6' : '4'}`}>
          {!isFeatured && (
            <>
              {/* Title and region */}
              <div className="mb-3">
                <Link href={`/walks/${walk.slug}`} className="group-hover:text-emerald-600 transition-colors">
                  <h3 className={`font-semibold leading-tight line-clamp-2 ${isListView ? 'text-lg' : 'text-lg'}`}>
                    {walk.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                  <MapPin className="size-3" />
                  <span>{walk.region?.name || 'Unknown Region'}</span>
                </div>
              </div>

              {/* Description */}
              {!isListView && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {walk.shortDescription}
                </p>
              )}

              {/* Stats */}
              <div className={`grid ${isListView ? 'grid-cols-4' : 'grid-cols-2'} gap-4 mb-4 text-sm`}>
                <div className="flex items-center gap-1">
                  <MapPin className="size-3 text-gray-400" />
                  <span className="font-medium">{walk.distance}km</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-3 text-gray-400" />
                  <span className="font-medium">{walk.estimatedTime}h</span>
                </div>
                {isListView && (
                  <>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="size-3 text-gray-400" />
                      <span className="font-medium">{walk.ascent}m</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="size-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {walk.averageRating > 0 ? walk.averageRating.toFixed(1) : 'No ratings yet'}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Rating and tags */}
              <div className="flex items-center justify-between">
                {!isListView && (
                  walk.averageRating > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star className="size-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-sm">{walk.averageRating.toFixed(1)}</span>
                      <span className="text-xs text-muted-foreground">
                        ({walk.reportCount || 0})
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">
                      No ratings yet
                    </div>
                  )
                )}

                {/* Tags */}
                <div className="flex gap-1">
                  {walk.tags.slice(0, isListView ? 3 : 2).map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Featured card content */}
          {isFeatured && (
            <>
              {/* Location */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-slate-600">{walk.region?.name || 'Scotland'}</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">OS Ref</span>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">{walk.shortDescription}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">{walk.distance}km</div>
                  <div className="text-xs text-slate-500">Distance</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-purple-600" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">{walk.estimatedTime}h</div>
                  <div className="text-xs text-slate-500">Duration</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Mountain className="w-3 h-3 text-amber-600" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {walk.maxElevation ? `${walk.maxElevation}m` : 'N/A'}
                  </div>
                  <div className="text-xs text-slate-500">Peak</div>
                </div>
              </div>

              {/* Difficulty Badge */}
              <div className="flex justify-center mb-4">
                <Badge 
                  className={walk.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    walk.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                    walk.difficulty === 'Hard' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'}
                >
                  {walk.difficulty} Route
                </Badge>
              </div>

              {/* Rating and Action */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-sm">
                    {walk.averageRating > 0 ? walk.averageRating.toFixed(1) : 'N/A'}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({walk.reportCount || 0})
                  </span>
                </div>
                
                <div className="flex gap-1">
                  {walk.tags?.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Button for featured cards */}
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 group-hover:bg-emerald-700" asChild>
                <Link href={`/walks/${walk.slug}`}>
                  Plan Your Walk
                </Link>
              </Button>
            </>
          )}
        </CardContent>
      </div>
    </Card>
  );
}