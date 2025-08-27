'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Mountain, Clock, TrendingUp, Star } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { notFound } from 'next/navigation';

interface RegionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function RegionPage({ params }: RegionPageProps) {
  const { slug } = React.use(params);
  const region = useQuery(api.regions.getRegionBySlug, { slug });
  const regionWalks = useQuery(
    api.walks.getWalksByRegion,
    region ? { regionId: region._id } : "skip"
  );

  if (region === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Mountain className="size-12 text-emerald-600 mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading region...</p>
        </div>
      </div>
    );
  }

  if (region === null) {
    notFound();
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={region.imageUrl}
          alt={region.name}
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-6">
            <div className="mx-auto max-w-7xl">
              <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/20 mb-4">
                <Link href="/regions">
                  <ArrowLeft className="size-4 mr-2" />
                  All Regions
                </Link>
              </Button>
              
              <div className="mb-4">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {region.walkCount} walks available
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {region.name}
              </h1>
              
              <p className="text-xl text-gray-200 max-w-2xl">
                {region.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 -mt-12 relative z-10">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <Mountain className="size-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{region.walkCount}</div>
              <div className="text-sm text-muted-foreground">Available Walks</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <TrendingUp className="size-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{region.popularityScore}</div>
              <div className="text-sm text-muted-foreground">Popularity Score</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <Star className="size-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {regionWalks ? Math.round(regionWalks.reduce((sum, walk) => sum + walk.averageRating, 0) / regionWalks.length * 10) / 10 : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Walks in Region */}
        {regionWalks && regionWalks.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Walks in {region.name}
              </h2>
              <Badge variant="secondary">
                {regionWalks.length} walks
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionWalks.map((walk) => (
                <Link href={`/walks/${walk.slug}`} key={walk._id}>
                  <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image
                        src={walk.featuredImageUrl}
                        alt={walk.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <Badge 
                          variant={
                            walk.difficulty === 'Easy' ? 'secondary' :
                            walk.difficulty === 'Moderate' ? 'default' :
                            walk.difficulty === 'Hard' ? 'destructive' :
                            'destructive'
                          }
                          className="text-xs"
                        >
                          {walk.difficulty}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-lg leading-tight group-hover:text-emerald-600 transition-colors mb-2">
                        {walk.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {walk.shortDescription}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          <span>{walk.distance}km</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-3" />
                          <span>{walk.estimatedTime}h</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mountain className="size-3" />
                          <span>{walk.ascent}m</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="size-3" />
                          <span>{walk.averageRating.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {walk.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Card className="p-8 text-center">
            <Mountain className="size-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No walks available yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Walks for this region haven't been added yet. Check back later for updates.
            </p>
            <Button asChild>
              <Link href="/walks">Browse All Walks</Link>
            </Button>
          </Card>
        )}

        {/* CTA */}
        <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Ready to explore {region.name}?
            </h3>
            <p className="text-muted-foreground mb-6">
              Discover the best walking routes and hidden gems in this region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/walks">Browse All Walks</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/regions">Explore Other Regions</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}