'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mountain, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ScotlandRegionMap from '@/components/map/ScotlandRegionMap';

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
    return 'Moderate to Hard';
  }
  if (name.includes('borders') || name.includes('fife') || name.includes('edinburgh') || name.includes('glasgow')) {
    return 'Easy to Moderate';
  }
  
  return 'All levels';
}

export default function RegionShowcase() {
  const regions = useQuery(api.regions.getAllRegions) || [];
  
  // Transform Convex regions to match the expected format and add featured status
  const transformedRegions = regions.map(region => ({
    ...region,
    id: region._id,
    highlights: getRegionHighlights(region.name),
    difficulty: getRegionDifficulty(region.name),
    featured: region.popularityScore >= 85 // Mark high-popularity regions as featured
  }));

  const featuredRegions = transformedRegions.filter(region => region.featured);
  const otherRegions = transformedRegions.filter(region => !region.featured);

  // Show loading state
  if (regions === undefined) {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Mountain className="size-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Loading regions...</h2>
            <p className="text-muted-foreground">Discovering Scotland's walking regions</p>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no regions
  if (regions.length === 0) {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Mountain className="size-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No regions available</h2>
            <p className="text-muted-foreground mb-6">Regions haven't been seeded yet. Set up the database to see Scottish walking regions.</p>
            <Button asChild>
              <Link href="/admin/seed">Seed Database</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mountain className="size-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
              Explore Scotland
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Walking Regions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From the dramatic peaks of the Highlands to the gentle hills of the Borders, 
            discover Scotland's diverse walking regions.
          </p>
        </div>

        {/* Interactive Map Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Explore Scotland Interactively
            </h3>
            <p className="text-muted-foreground">
              Click on any region to discover walking routes and plan your next adventure
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <ScotlandRegionMap 
              regions={transformedRegions}
              onRegionClick={(region) => {
                window.location.href = `/regions/${region.slug}`;
              }}
              height="600px"
              className="w-full"
            />
          </div>
        </div>

        {/* Featured regions - large cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {featuredRegions.map((region) => (
            <Card key={region.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
              <div className="relative">
                <div className="aspect-[16/10] overflow-hidden">
                  <Image
                    src={region.imageUrl}
                    alt={region.name}
                    width={600}
                    height={375}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="mb-3">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/20 backdrop-blur-sm">
                      {region.walkCount} walks
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{region.name}</h3>
                  <p className="text-gray-100 mb-4 line-clamp-2">
                    {region.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {region.highlights.slice(0, 3).map((highlight) => (
                      <Badge key={highlight} variant="outline" className="text-white border-white/40 bg-white/10 backdrop-blur-sm">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Hover button */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Bottom section */}
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mountain className="size-4" />
                      {region.difficulty}
                    </span>
                  </div>
                  <Link href={`/regions/${region.slug}`} className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore Region
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other regions - smaller grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {otherRegions.map((region) => (
            <Card key={region.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 bg-white dark:bg-gray-800">
              <div className="flex">
                {/* Image */}
                <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
                  <Image
                    src={region.imageUrl}
                    alt={region.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <CardContent className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight">{region.name}</h3>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin className="size-3" />
                        <span>{region.walkCount} walks</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {region.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {region.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {region.highlights.slice(0, 2).map((highlight) => (
                        <Badge key={highlight} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/regions/${region.slug}`} className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
            <Link href="/regions">
              View All Regions
              <Mountain className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}