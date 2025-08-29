'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Star, 
  Search,
  Filter,
  Download,
  Share2,
  Eye,
  Mountain
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function MyWalksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'distance' | 'time'>('recent');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  // Get user's walking history
  const walkHistory = useQuery(api.users.getUserWalkHistory, { limit: 50 });
  const userStats = useQuery(api.users.getUserStats);

  // Filter and sort walks based on user selections
  const filteredAndSortedWalks = React.useMemo(() => {
    if (!walkHistory) return [];

    const filtered = walkHistory.filter(report => {
      const matchesSearch = !searchQuery || 
        report.walk?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.walk?.region?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDifficulty = difficultyFilter === 'all' || 
        report.walk?.difficulty === difficultyFilter;

      return matchesSearch && matchesDifficulty && report.walk;
    });

    // Sort the results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return b.completedAt - a.completedAt;
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return (b.walk?.distance || 0) - (a.walk?.distance || 0);
        case 'time':
          return (b.actualTime || b.walk?.estimatedTime || 0) - (a.actualTime || a.walk?.estimatedTime || 0);
        default:
          return b.completedAt - a.completedAt;
      }
    });

    return filtered;
  }, [walkHistory, searchQuery, sortBy, difficultyFilter]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (walkHistory === undefined || userStats === undefined) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!walkHistory || walkHistory.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Walks</h1>
          <p className="text-muted-foreground">Your completed walking adventures</p>
        </div>

        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <Mountain className="size-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No walks completed yet</h3>
            <p className="text-muted-foreground mb-6">
              Start exploring Scottish walks and log your first completion!
            </p>
            <Button asChild>
              <Link href="/walks">
                Discover Walks
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">My Walks</h1>
        <p className="text-muted-foreground">
          You&apos;ve completed {userStats?.totalWalks || 0} walks covering {Math.round(userStats?.totalDistance || 0)} km
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
              <Input
                placeholder="Search walks, regions, or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'recent' | 'rating' | 'distance' | 'time')}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="distance">Longest Distance</SelectItem>
                <SelectItem value="time">Longest Time</SelectItem>
              </SelectContent>
            </Select>

            {/* Difficulty Filter */}
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-32">
                <Filter className="size-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
                <SelectItem value="Strenuous">Strenuous</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="text-sm text-muted-foreground mb-4">
        Showing {filteredAndSortedWalks.length} of {walkHistory.length} walks
      </div>

      {/* Walk Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedWalks.map((report) => {
          if (!report.walk) return null;
          
          const walk = report.walk;
          
          return (
            <Card key={report._id} className="group hover:shadow-lg transition-shadow duration-200">
              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={walk.featuredImageUrl}
                  alt={walk.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Completion Date Badge */}
                <Badge 
                  variant="secondary" 
                  className="absolute top-3 right-3 bg-emerald-600 text-white border-emerald-600"
                >
                  Completed {formatDate(report.completedAt)}
                </Badge>

                {/* Difficulty Badge */}
                <Badge 
                  variant="outline" 
                  className={`absolute top-3 left-3 border-white text-white bg-white/10 backdrop-blur-sm`}
                >
                  {walk.difficulty}
                </Badge>
              </div>

              {/* Content */}
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Title and Region */}
                  <div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      <Link href={`/walks/${walk.slug}`}>
                        {walk.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="size-3" />
                      {walk.region?.name}
                    </p>
                  </div>

                  {/* Walk Stats */}
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <div className="font-medium">{walk.distance}km</div>
                      <div className="text-muted-foreground text-xs">Distance</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{report.actualTime || walk.estimatedTime}h</div>
                      <div className="text-muted-foreground text-xs">Time</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{walk.ascent}m</div>
                      <div className="text-muted-foreground text-xs">Ascent</div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < report.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      Your rating: {report.rating}/5
                    </span>
                  </div>

                  {/* Report Title/Notes Preview */}
                  {report.title !== `Completed ${walk.title}` && (
                    <p className="text-sm font-medium text-primary">{report.title}</p>
                  )}
                  
                  {report.content && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {report.content}
                    </p>
                  )}

                  {/* Conditions */}
                  {(report.weatherConditions || report.trailConditions) && (
                    <div className="flex flex-wrap gap-1 text-xs">
                      {report.weatherConditions && (
                        <Badge variant="outline" className="text-xs">
                          {report.weatherConditions}
                        </Badge>
                      )}
                      {report.trailConditions && (
                        <Badge variant="outline" className="text-xs">
                          {report.trailConditions}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/walks/${walk.slug}`}>
                      <Eye className="size-4 mr-2" />
                      View Walk
                    </Link>
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="size-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAndSortedWalks.length === 0 && walkHistory.length > 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <Search className="size-8 text-gray-400 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">No walks match your filters</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find your walks.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}