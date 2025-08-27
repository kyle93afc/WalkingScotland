'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, TrendingUp, Star, Users, Search, Filter, Grid, List } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import RegionMap from '@/components/map/RegionMap';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';


const difficultyColors: Record<string, string> = {
  'Easy': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Moderate': 'bg-amber-100 text-amber-700 border-amber-200',
  'Hard': 'bg-red-100 text-red-700 border-red-200',
  'Strenuous': 'bg-purple-100 text-purple-700 border-purple-200'
};

export default function WalkDiscovery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');

  // Fetch all walks from Convex
  const walks = useQuery(api.walks.getPublishedWalks, { limit: 100 });
  const regions = useQuery(api.regions.getAllRegions);

  // Filter and sort walks
  const filteredWalks = useMemo(() => {
    if (!walks) return [];
    
    let filtered = walks.filter(walk => {
      const matchesSearch = !searchTerm || 
        walk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        walk.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        walk.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDifficulty = selectedDifficulty === 'all' || walk.difficulty === selectedDifficulty;
      const matchesRegion = selectedRegion === 'all' || walk.region?.slug === selectedRegion;

      return matchesSearch && matchesDifficulty && matchesRegion;
    });

    // Sort walks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.viewCount - a.viewCount;
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'distance':
          return a.distance - b.distance;
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Moderate': 2, 'Hard': 3, 'Strenuous': 4 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });

    return filtered;
  }, [walks, searchTerm, selectedDifficulty, selectedRegion, sortBy]);

  // Calculate map center based on filtered walks
  const mapCenter = useMemo((): [number, number] => {
    if (filteredWalks.length === 0) return [-4.5, 56.5]; // Scotland center
    
    const avgLat = filteredWalks.reduce((sum, walk) => sum + walk.latitude, 0) / filteredWalks.length;
    const avgLng = filteredWalks.reduce((sum, walk) => sum + walk.longitude, 0) / filteredWalks.length;
    
    return [avgLng, avgLat];
  }, [filteredWalks]);

  const WalkCard = ({ walk, isListView = false }: { walk: any, isListView?: boolean }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 bg-white dark:bg-gray-800">
      <div className={`${isListView ? 'flex' : ''}`}>
        {/* Image */}
        <div className={`${isListView ? 'w-48 h-32 flex-shrink-0' : 'aspect-[4/3]'} overflow-hidden relative`}>
          <Image
            src={walk.featuredImageUrl}
            alt={walk.title}
            width={isListView ? 192 : 400}
            height={isListView ? 128 : 300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Difficulty badge */}
          <Badge 
            variant="secondary" 
            className={`absolute top-3 left-3 ${difficultyColors[walk.difficulty]} border`}
          >
            {walk.difficulty}
          </Badge>

          {/* Live activity indicator */}
          {walk.viewCount > 1000 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs font-medium">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <Users className="size-3" />
              <span>{Math.floor(walk.viewCount / 100)}</span>
            </div>
          )}
        </div>

        <CardContent className={`${isListView ? 'flex-1' : ''} p-4`}>
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
                  <span className="font-medium">{walk.averageRating || 0}</span>
                </div>
              </>
            )}
          </div>

          {/* Rating and tags */}
          <div className="flex items-center justify-between">
            {!isListView && (
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-sm">{walk.averageRating || 0}</span>
                <span className="text-xs text-muted-foreground">
                  ({walk.reportCount || 0})
                </span>
              </div>
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
        </CardContent>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Discover Scotland's Best Walks
              </h1>
              <p className="text-muted-foreground mt-2">
                {filteredWalks.length} walks across the Highlands, Islands, and Lowlands
              </p>
            </div>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search walks, regions, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
                <option value="Strenuous">Strenuous</option>
              </select>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                <option value="all">All Regions</option>
                {regions?.map((region) => (
                  <option key={region._id} value={region.slug}>
                    {region.name}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="distance">Shortest First</option>
                <option value="difficulty">Easiest First</option>
              </select>
            </div>

            {/* View mode toggle */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-md p-1">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <Grid className="size-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <List className="size-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                onClick={() => setViewMode('map')}
                className="px-3"
              >
                <MapPin className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {viewMode === 'map' ? (
          <div className="space-y-6">
            <RegionMap
              walks={filteredWalks}
              center={mapCenter}
              height="600px"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWalks.slice(0, 6).map((walk) => (
                <WalkCard key={walk._id} walk={walk} />
              ))}
            </div>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredWalks.map((walk) => (
              <WalkCard key={walk._id} walk={walk} isListView />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWalks.map((walk) => (
              <WalkCard key={walk._id} walk={walk} />
            ))}
          </div>
        )}

        {filteredWalks.length === 0 && (
          <div className="text-center py-12">
            <Search className="size-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No walks found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}