'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mountain } from 'lucide-react';
import WalkCard from '@/components/walks/WalkCard';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

// No more mock data - using real Convex queries only

export default function FeaturedWalks() {
  // Get featured walks from Convex (sorted by popularity and ratings)
  const featuredWalks = useQuery(api.walks.getFeaturedWalks, { limit: 6 });

  // Show loading state
  if (featuredWalks === undefined) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-4">
              <Mountain className="w-4 h-4 mr-2" />
              Highland Heroes
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Scotland&apos;s Most
              <span className="block text-emerald-600">Legendary Walks</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From the mighty Munros to mystical island scrambles, discover walks that have 
              defined Scottish mountaineering for generations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-100 to-purple-100 animate-pulse" />
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Handle empty state
  if (!featuredWalks || featuredWalks.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Mountain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No featured walks available</h3>
            <p className="text-slate-600 mb-6">Check back soon as we add more amazing Scottish walks!</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/walks">Browse All Walks</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

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
            Scotland&apos;s Most
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
            <WalkCard key={walk._id} walk={walk} variant="featured" />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8 border-emerald-200 text-emerald-700 hover:bg-emerald-50" asChild>
            <Link href="/walks">
              Explore All Scottish Walks
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}