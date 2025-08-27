'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mountain, ArrowRight, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function RegionsPage() {
  const regions = useQuery(api.regions.getAllRegions) || [];

  // Group regions by type for display
  const highlandRegions = regions.filter(r => 
    r.name.includes('Highland') || 
    r.name.includes('Sutherland') ||
    r.name.includes('Ullapool') ||
    r.name.includes('Torridon') ||
    r.name.includes('Loch Ness') ||
    r.name.includes('Kintail') ||
    r.name.includes('Fort William') ||
    r.name.includes('Cairngorms') ||
    r.name.includes('Perthshire')
  );

  const islandRegions = regions.filter(r => 
    r.name.includes('Isle') || 
    r.name.includes('Skye') ||
    r.name.includes('Mull') ||
    r.name.includes('Hebrides') ||
    r.name.includes('Arran') ||
    r.name.includes('Islay') ||
    r.name.includes('Orkney') ||
    r.name.includes('Shetland') ||
    r.name.includes('Small Isles')
  );

  const lowlandRegions = regions.filter(r => 
    r.name.includes('Fife') ||
    r.name.includes('Edinburgh') ||
    r.name.includes('Glasgow') ||
    r.name.includes('Dumfries') ||
    r.name.includes('Borders') ||
    r.name.includes('Angus') ||
    r.name.includes('Moray') ||
    r.name.includes('Aberdeenshire') ||
    r.name.includes('Argyll') ||
    r.name.includes('Loch Lomond')
  );

  const RegionCard = ({ region }: { region: any }) => (
    <Link href={`/regions/${region.slug}`} key={region._id}>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 bg-white dark:bg-gray-800 h-full">
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={region.imageUrl}
            alt={region.name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-emerald-600 transition-colors">
              {region.name}
            </h3>
            <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
              {region.walkCount} walks
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {region.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3" />
              <span>Popularity: {region.popularityScore}/100</span>
            </div>
            <div className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Explore
              <ArrowRight className="size-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  const RegionSection = ({ title, regions: sectionRegions, icon: Icon }: { title: string, regions: any[], icon: any }) => (
    sectionRegions.length > 0 && (
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Icon className="size-5 text-emerald-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <Badge variant="secondary" className="ml-2">
            {sectionRegions.length} regions
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sectionRegions.map((region) => (
            <RegionCard key={region._id} region={region} />
          ))}
        </div>
      </div>
    )
  );

  if (regions === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full mb-4">
              <Mountain className="size-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Loading regions...</h3>
            <p className="text-muted-foreground">Discovering Scotland's walking regions</p>
          </div>
        </div>
      </div>
    );
  }

  if (regions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <Mountain className="size-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No regions found</h3>
            <p className="text-muted-foreground mb-4">It looks like no regions have been seeded yet.</p>
            <Button asChild>
              <Link href="/admin/seed">Seed Regions</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Mountain className="size-6 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
              Scotland
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Walking Regions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover Scotland's diverse walking regions, from the dramatic peaks of the Highlands 
            to the peaceful islands and gentle southern uplands.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{regions.length}</div>
              <div className="text-sm text-muted-foreground">Total Regions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {regions.reduce((sum, r) => sum + r.walkCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Walks</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {Math.round(regions.reduce((sum, r) => sum + r.popularityScore, 0) / regions.length)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Popularity</div>
            </CardContent>
          </Card>
        </div>

        {/* Regions by category */}
        <RegionSection title="Highland Regions" regions={highlandRegions} icon={Mountain} />
        <RegionSection title="Island Regions" regions={islandRegions} icon={MapPin} />
        <RegionSection title="Lowland & Other Regions" regions={lowlandRegions} icon={Mountain} />

        {/* Show all regions if categorization doesn't cover everything */}
        {(highlandRegions.length + islandRegions.length + lowlandRegions.length) < regions.length && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              All Regions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {regions.map((region) => (
                <RegionCard key={region._id} region={region} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}