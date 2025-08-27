'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Clock, 
  TrendingUp, 
  Star, 
  Users, 
  Download, 
  Share2, 
  Heart,
  Camera,
  MessageCircle,
  Navigation,
  Mountain,
  Gauge,
  CalendarDays,
  CloudRain,
  Thermometer,
  Wind
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import WalkMap from '@/components/map/WalkMap';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

// Mock data - will be replaced with real Convex queries
const mockWalk = {
  _id: '1',
  title: 'Ben Nevis via Tourist Path',
  slug: 'ben-nevis-tourist-path',
  description: `Ben Nevis, the highest mountain in Scotland and the whole of the UK, stands at 1,345 metres (4,413 feet) above sea level. This challenging but rewarding walk takes you via the well-maintained Tourist Path (also known as the Pony Track) to the summit.

The route starts from the Glen Nevis Visitor Centre and follows a zigzag path up the western slopes of the mountain. The initial section is relatively gentle, but the gradient increases significantly as you gain height. The path is well-marked but can be challenging in poor weather conditions.

From the summit, on a clear day, you'll be rewarded with spectacular panoramic views across the Scottish Highlands, including views to the Isle of Skye and the surrounding peaks. The summit plateau features the ruins of the old weather observatory and a trig point marking the highest point in Britain.

This is a serious mountain walk that requires proper preparation, suitable clothing, and navigation skills. Weather conditions can change rapidly, and the summit is often shrouded in cloud even when it's clear at the base.`,
  shortDescription: 'Scotland\'s highest mountain offering spectacular views from the summit.',
  region: { _id: '1', name: 'Highlands', slug: 'highlands' },
  difficulty: 'Strenuous' as const,
  distance: 17.2,
  ascent: 1352,
  estimatedTime: 8,
  maxElevation: 1345,
  routeType: 'Out and Back' as const,
  latitude: 56.7969,
  longitude: -5.0036,
  featuredImageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=800&fit=crop',
  tags: ['munro', 'iconic', 'challenging', 'summit'],
  isPublished: true,
  publishedAt: Date.now() - 86400000, // 1 day ago
  viewCount: 15234,
  likeCount: 428,
  reportCount: 84,
  averageRating: 4.7,
  author: {
    _id: 'author1',
    name: 'Highland Walker',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  }
};

const mockReports = [
  {
    _id: 'report1',
    title: 'Fantastic conditions on Ben Nevis',
    content: 'Amazing clear day with views for miles. Started at 7am and reached summit at 11:30am. Trail was busy but manageable. Definitely worth the early start!',
    rating: 5,
    completedAt: Date.now() - 172800000, // 2 days ago
    actualTime: 7.5,
    weatherConditions: 'Clear and sunny',
    trailConditions: 'Good - some loose rocks near summit',
    likeCount: 12,
    commentCount: 3,
    author: {
      _id: 'user1',
      name: 'Sarah MacLeod',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b6d29469?w=150&h=150&fit=crop&crop=face',
    }
  },
  {
    _id: 'report2', 
    title: 'Challenging but rewarding climb',
    content: 'Very tough climb, especially the final push to summit. Weather turned misty halfway up but cleared at the top. Take plenty of water and snacks!',
    rating: 4,
    completedAt: Date.now() - 259200000, // 3 days ago
    actualTime: 9,
    weatherConditions: 'Misty with clearance',
    trailConditions: 'Muddy in places',
    likeCount: 8,
    commentCount: 1,
    author: {
      _id: 'user2',
      name: 'James Campbell',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    }
  }
];

const difficultyColors = {
  'Easy': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Moderate': 'bg-amber-100 text-amber-700 border-amber-200', 
  'Hard': 'bg-red-100 text-red-700 border-red-200',
  'Strenuous': 'bg-purple-100 text-purple-700 border-purple-200'
};

interface WalkDetailPageProps {
  slug: string;
}

export default function WalkDetailPage({ slug }: WalkDetailPageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [liked, setLiked] = useState(false);

  // Get real data from Convex
  const walk = useQuery(api.walks.getWalkBySlug, { slug });
  const walkStages = useQuery(api.walkStages.getStagesByWalkId, 
    walk ? { walkId: walk._id } : "skip"
  );
  const reports = useQuery(api.walkReports.getReportsByWalk,
    walk ? { walkId: walk._id, limit: 10 } : "skip"
  );
  
  // Use mock reports as fallback if no real reports exist
  const displayReports = reports && reports.length > 0 ? reports : mockReports;

  // Show loading state while data is being fetched
  if (walk === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="relative h-[60vh] min-h-[400px] bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="mx-auto max-w-4xl p-6 -mt-32 relative z-10">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (walk === null) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Mountain className="size-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Walk not found</h3>
          <p className="text-muted-foreground">The walk you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link href="/walks">Browse Walks</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
    // In real app: await toggleLike({ targetId: walk._id, targetType: 'walk' });
  };

  const handleShare = () => {
    navigator.share?.({ 
      title: walk.title,
      text: walk.shortDescription,
      url: window.location.href 
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={walk.featuredImageUrl}
          alt={walk.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className={`${difficultyColors[walk.difficulty]} border`}>
                {walk.difficulty}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/20 backdrop-blur-sm">
                {walk.routeType}
              </Badge>
              {walk.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-white border-white/40 bg-white/10 backdrop-blur-sm">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{walk.title}</h1>
            
            <div className="flex items-center gap-4 text-lg">
              <div className="flex items-center gap-1">
                <MapPin className="size-5" />
                <span>{walk.region?.name || 'Unknown Region'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="size-5 fill-yellow-400 text-yellow-400" />
                <span>{walk.averageRating}</span>
                <span className="text-gray-300">({walk.reportCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute top-6 right-6 flex gap-2">
          <Button size="sm" variant="secondary" className="bg-white/20 text-white border-white/20 backdrop-blur-sm hover:bg-white/30" onClick={handleLike}>
            <Heart className={`size-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            {walk.likeCount + (liked ? 1 : 0)}
          </Button>
          <Button size="sm" variant="secondary" className="bg-white/20 text-white border-white/20 backdrop-blur-sm hover:bg-white/30" onClick={handleShare}>
            <Share2 className="size-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
                <TabsTrigger value="reports">
                  Reports ({reports && reports.length > 0 ? reports.length : walk.reportCount})
                </TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>About This Walk</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      {walk.description.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Route Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Route Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full mx-auto mb-2">
                          <Navigation className="size-6 text-emerald-600" />
                        </div>
                        <div className="text-2xl font-bold">{walk.distance}km</div>
                        <div className="text-sm text-muted-foreground">Distance</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-2">
                          <Clock className="size-6 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold">{walk.estimatedTime}h</div>
                        <div className="text-sm text-muted-foreground">Est. Time</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full mx-auto mb-2">
                          <TrendingUp className="size-6 text-red-600" />
                        </div>
                        <div className="text-2xl font-bold">{walk.ascent}m</div>
                        <div className="text-sm text-muted-foreground">Ascent</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full mx-auto mb-2">
                          <Mountain className="size-6 text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold">{walk.maxElevation}m</div>
                        <div className="text-sm text-muted-foreference">Max Elevation</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Route Directions - Real walk stages */}
                {walkStages && walkStages.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Route Directions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {walkStages.map((stage, index) => (
                          <div key={stage._id} className="border-l-4 border-emerald-500 pl-4">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                {stage.stageNumber}
                              </div>
                              <div className="flex-1">
                                {stage.title && (
                                  <h4 className="font-semibold text-base mb-1">{stage.title}</h4>
                                )}
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {stage.description}
                                </p>
                                {(stage.distance || stage.duration) && (
                                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                                    {stage.distance && (
                                      <span>📏 {stage.distance}km</span>
                                    )}
                                    {stage.duration && (
                                      <span>⏱️ {Math.round(stage.duration / 60)}min</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="map">
                <Card>
                  <CardContent className="p-0">
                    <WalkMap
                      latitude={walk.latitude}
                      longitude={walk.longitude}
                      zoom={13}
                      height="500px"
                      className="rounded-lg"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                {!reports || reports.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="p-6 text-center">
                      <MessageCircle className="size-8 text-gray-400 mx-auto mb-3" />
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">No walk reports yet</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Be the first to share your experience of this walk! 
                        The reviews below are demo data for preview.
                      </p>
                    </CardContent>
                  </Card>
                ) : null}
                
                {displayReports.map((report) => (
                  <Card key={report._id}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={report.author?.imageUrl} alt={report.author?.name || 'Author'} />
                          <AvatarFallback>{report.author?.name?.charAt(0) || 'A'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{report.title}</h4>
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
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            by {report.author?.name || 'Anonymous'} • {formatDate(report.completedAt)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{report.content}</p>
                      
                      {/* Report details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <div className="text-sm font-medium">Actual Time</div>
                          <div className="text-sm text-muted-foreground">{report.actualTime}h</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Weather</div>
                          <div className="text-sm text-muted-foreground">{report.weatherConditions}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Trail Conditions</div>
                          <div className="text-sm text-muted-foreground">{report.trailConditions}</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                        <Button variant="ghost" size="sm">
                          <Heart className="size-4 mr-2" />
                          {report.likeCount}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="size-4 mr-2" />
                          {report.commentCount}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="photos">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-12">
                      <Camera className="size-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No photos yet</h3>
                      <p className="text-muted-foreground mb-4">Be the first to share photos from this walk!</p>
                      <Button>Upload Photos</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button className="w-full" size="lg">
                    <Download className="size-4 mr-2" />
                    Download GPX
                  </Button>
                  <Button className="w-full" variant="outline" size="lg">
                    Write a Report
                  </Button>
                  <Button className="w-full" variant="outline" size="lg">
                    Add to Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Walk Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Walk Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-medium">{walk.viewCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Likes</span>
                  <span className="font-medium">{walk.likeCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reports</span>
                  <span className="font-medium">{walk.reportCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Added</span>
                  <span className="font-medium">{formatDate(walk.publishedAt!)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Weather Widget (Placeholder) */}
            <Card>
              <CardHeader>
                <CardTitle>Current Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Thermometer className="size-5 text-blue-500" />
                    <div>
                      <div className="font-medium">8°C</div>
                      <div className="text-sm text-muted-foreground">Temperature</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wind className="size-5 text-gray-500" />
                    <div>
                      <div className="font-medium">15 mph</div>
                      <div className="text-sm text-muted-foreground">Wind Speed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CloudRain className="size-5 text-blue-500" />
                    <div>
                      <div className="font-medium">20%</div>
                      <div className="text-sm text-muted-foreground">Chance of Rain</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}