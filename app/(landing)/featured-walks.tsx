'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, TrendingUp, Star, Users } from 'lucide-react';
import Image from 'next/image';

// Mock data - this will be replaced with Convex queries
const featuredWalks = [
  {
    id: '1',
    title: 'Ben Nevis via Tourist Path',
    slug: 'ben-nevis-tourist-path',
    region: 'Highlands',
    difficulty: 'Strenuous',
    distance: 17.2,
    estimatedTime: 8,
    ascent: 1352,
    rating: 4.7,
    reviewCount: 284,
    featuredImageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    shortDescription: 'Scotland\'s highest mountain offering spectacular views from the summit.',
    tags: ['munro', 'iconic', 'challenging'],
    popularityScore: 95,
    recentActivity: 12
  },
  {
    id: '2',
    title: 'Old Man of Storr Circuit',
    slug: 'old-man-of-storr-circuit',
    region: 'Isle of Skye',
    difficulty: 'Moderate',
    distance: 3.8,
    estimatedTime: 2.5,
    ascent: 430,
    rating: 4.8,
    reviewCount: 156,
    featuredImageUrl: 'https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop',
    shortDescription: 'Iconic rock formations with otherworldly landscapes on the Isle of Skye.',
    tags: ['iconic', 'photography', 'family-friendly'],
    popularityScore: 88,
    recentActivity: 8
  },
  {
    id: '3',
    title: 'Loch Katrine Circuit',
    slug: 'loch-katrine-circuit',
    region: 'Trossachs',
    difficulty: 'Easy',
    distance: 12.5,
    estimatedTime: 4,
    ascent: 125,
    rating: 4.5,
    reviewCount: 89,
    featuredImageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    shortDescription: 'Peaceful loch-side walk through pristine Scottish wilderness.',
    tags: ['family-friendly', 'water', 'wildlife'],
    popularityScore: 75,
    recentActivity: 5
  }
];

const difficultyColors = {
  'Easy': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Moderate': 'bg-amber-100 text-amber-700 border-amber-200',
  'Hard': 'bg-red-100 text-red-700 border-red-200',
  'Strenuous': 'bg-purple-100 text-purple-700 border-purple-200'
};

export default function FeaturedWalks() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="size-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
              Most Popular
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Walks
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover Scotland's most breathtaking walks, from iconic Munros to 
            family-friendly trails. Curated by our community of passionate hikers.
          </p>
        </div>

        {/* Featured walks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredWalks.map((walk, index) => (
            <Card key={walk.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 bg-white dark:bg-gray-800">
              <div className="relative">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={walk.featuredImageUrl}
                    alt={walk.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Difficulty badge */}
                <Badge 
                  variant="secondary" 
                  className={`absolute top-3 left-3 ${difficultyColors[walk.difficulty as keyof typeof difficultyColors]} border`}
                >
                  {walk.difficulty}
                </Badge>

                {/* Live activity indicator */}
                {walk.recentActivity > 0 && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs font-medium">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <Users className="size-3" />
                    <span>{walk.recentActivity}</span>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                {/* Title and region */}
                <div className="mb-3">
                  <Link href={`/walks/${walk.slug}`} className="group-hover:text-emerald-600 transition-colors">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                      {walk.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <MapPin className="size-3" />
                    <span>{walk.region}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {walk.shortDescription}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3 text-gray-400" />
                    <span className="font-medium">{walk.distance}km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-3 text-gray-400" />
                    <span className="font-medium">{walk.estimatedTime}h</span>
                  </div>
                </div>

                {/* Rating and reviews */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-sm">{walk.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({walk.reviewCount})
                    </span>
                  </div>

                  {/* Tags */}
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

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/walks">
              View All Walks
              <MapPin className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}