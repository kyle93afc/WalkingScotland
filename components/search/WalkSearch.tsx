'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Star,
  SlidersHorizontal,
  Mountain
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface SearchFilters {
  searchTerm: string;
  difficulty: string[];
  regions: string[];
  minDistance: number;
  maxDistance: number;
  minDuration: number;
  maxDuration: number;
  tags: string[];
  sortBy: string;
}

const defaultFilters: SearchFilters = {
  searchTerm: '',
  difficulty: [],
  regions: [],
  minDistance: 0,
  maxDistance: 50,
  minDuration: 0,
  maxDuration: 12,
  tags: [],
  sortBy: 'popularity',
};

const difficultyOptions = [
  { value: 'Easy', label: 'Easy', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'Moderate', label: 'Moderate', color: 'bg-amber-100 text-amber-700' },
  { value: 'Hard', label: 'Hard', color: 'bg-red-100 text-red-700' },
  { value: 'Strenuous', label: 'Strenuous', color: 'bg-purple-100 text-purple-700' },
];

const regionOptions = [
  { value: 'highlands', label: 'Highlands' },
  { value: 'islands', label: 'Islands' },
  { value: 'southern-uplands', label: 'Southern Uplands' },
  { value: 'central-belt', label: 'Central Belt' },
];

const tagOptions = [
  'munro', 'corbett', 'donald', 'waterfall', 'coastal', 'forest', 
  'historic', 'family-friendly', 'dog-friendly', 'circular', 'linear',
  'wildlife', 'photography', 'challenging', 'easy-access'
];

const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'distance', label: 'Distance (shortest first)' },
  { value: 'difficulty', label: 'Difficulty (easiest first)' },
  { value: 'recent', label: 'Recently Added' },
];

// Removed mock data - now using real Convex queries

interface WalkSearchProps {
  onResultsChange?: (results: any[]) => void;
  initialFilters?: Partial<SearchFilters>;
  showFilters?: boolean;
  compact?: boolean;
  className?: string;
}

export default function WalkSearch({ 
  onResultsChange,
  initialFilters = {},
  showFilters = true,
  compact = false,
  className = ''
}: WalkSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    ...defaultFilters,
    ...initialFilters,
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Get walks from Convex
  const walks = useQuery(api.walks.getPublishedWalks, { limit: 100 });

  // Filter and search walks
  const filteredResults = useMemo(() => {
    if (!walks) return [];
    
    let results = walks.filter(walk => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          walk.title.toLowerCase().includes(searchLower) ||
          walk.shortDescription.toLowerCase().includes(searchLower) ||
          walk.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          (walk.region?.name && walk.region.name.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Difficulty filter
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(walk.difficulty)) {
        return false;
      }

      // Distance filter
      if (walk.distance < filters.minDistance || walk.distance > filters.maxDistance) {
        return false;
      }

      // Duration filter
      if (walk.estimatedTime < filters.minDuration || walk.estimatedTime > filters.maxDuration) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => walk.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }

      return true;
    });

    // Sort results
    results.sort((a, b) => {
      switch (filters.sortBy) {
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

    return results;
  }, [walks, filters]);

  // Call onResultsChange when results update
  useEffect(() => {
    onResultsChange?.(filteredResults);
  }, [filteredResults, onResultsChange]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'difficulty' | 'regions' | 'tags', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const activeFilterCount = 
    filters.difficulty.length +
    filters.regions.length +
    filters.tags.length +
    (filters.searchTerm ? 1 : 0) +
    (filters.minDistance !== defaultFilters.minDistance ? 1 : 0) +
    (filters.maxDistance !== defaultFilters.maxDistance ? 1 : 0) +
    (filters.minDuration !== defaultFilters.minDuration ? 1 : 0) +
    (filters.maxDuration !== defaultFilters.maxDuration ? 1 : 0);

  if (compact) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Compact search bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search walks..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="size-4" />
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          {filteredResults.length} walk{filteredResults.length !== 1 ? 's' : ''} found
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search walks, regions, or tags..."
          value={filters.searchTerm}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
          className="pl-12 h-12 text-lg"
        />
      </div>

      {showFilters && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear all
                    </Button>
                    <Badge variant="secondary">
                      {activeFilterCount} active
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Difficulty */}
              <div>
                <h4 className="text-sm font-medium mb-3">Difficulty</h4>
                <div className="space-y-2">
                  {difficultyOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.difficulty.includes(option.value)}
                        onChange={() => toggleArrayFilter('difficulty', option.value)}
                        className="rounded border-gray-300"
                      />
                      <Badge variant="outline" className={option.color}>
                        {option.label}
                      </Badge>
                    </label>
                  ))}
                </div>
              </div>

              {/* Regions */}
              <div>
                <h4 className="text-sm font-medium mb-3">Regions</h4>
                <div className="space-y-2">
                  {regionOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.regions.includes(option.value)}
                        onChange={() => toggleArrayFilter('regions', option.value)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Distance Range */}
              <div>
                <h4 className="text-sm font-medium mb-3">Distance (km)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Min: {filters.minDistance}km</label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={filters.minDistance}
                      onChange={(e) => updateFilter('minDistance', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Max: {filters.maxDistance}km</label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={filters.maxDistance}
                      onChange={(e) => updateFilter('maxDistance', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Duration Range */}
              <div>
                <h4 className="text-sm font-medium mb-3">Duration (hours)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Min: {filters.minDuration}h</label>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      value={filters.minDuration}
                      onChange={(e) => updateFilter('minDuration', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Max: {filters.maxDuration}h</label>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      value={filters.maxDuration}
                      onChange={(e) => updateFilter('maxDuration', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <Badge
                      key={tag}
                      variant={filters.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => toggleArrayFilter('tags', tag)}
                    >
                      {tag}
                      {filters.tags.includes(tag) && (
                        <X className="size-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="text-sm font-medium mb-3">Sort by</h4>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {filteredResults.length} walk{filteredResults.length !== 1 ? 's' : ''} found
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((walk) => (
            <Card key={walk._id} className="group hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={walk.featuredImageUrl}
                  alt={walk.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    {walk.difficulty}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <Link href={`/walks/${walk.slug}`} className="group-hover:text-emerald-600 transition-colors">
                  <h4 className="font-semibold text-lg leading-tight mb-2">{walk.title}</h4>
                </Link>
                
                <div className="flex items-center gap-1 mb-2 text-sm text-muted-foreground">
                  <MapPin className="size-3" />
                  <span>{walk.region?.name || 'Unknown Region'}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {walk.shortDescription}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3 text-gray-400" />
                    <span>{walk.distance}km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-3 text-gray-400" />
                    <span>{walk.estimatedTime}h</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-sm">{walk.averageRating}</span>
                    <span className="text-xs text-muted-foreground">({walk.reportCount || 0})</span>
                  </div>
                  
                  <div className="flex gap-1">
                    {walk.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResults.length === 0 && walks && (
          <div className="text-center py-12">
            <Mountain className="size-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No walks found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}