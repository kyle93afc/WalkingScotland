'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Database, CheckCircle, AlertCircle, Play } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

export default function SeedPage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { isSignedIn } = useAuth();
  const seedAll = useMutation(api.seed.seedAll);
  const seedRegions = useMutation(api.seed.seedRegions);
  const seedWalkHighlandsRegions = useMutation(api.seed_new.seedWalkHighlandsRegions);
  const seedWalks = useMutation(api.seed.seedWalks);
  const seedScrapedWalks = useMutation(api.seed.seedScrapedWalks);
  const seedDetailedWalks = useMutation(api.seed.seedDetailedWalks);
  const seedAll90Walks = useMutation(api.seed.seedAll90Walks);

  const handleSeedAll = async () => {
    if (!isSignedIn) {
      setError('Please sign in to run seeding');
      return;
    }

    setIsSeeding(true);
    setError(null);
    setResults(null);

    try {
      console.log('Starting database seeding...');
      const result = await seedAll();
      setResults(result);
      console.log('Seeding completed:', result);
    } catch (err: any) {
      console.error('Seeding error:', err);
      setError(err.message || 'Seeding failed');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSeedRegions = async () => {
    if (!isSignedIn) {
      setError('Please sign in to run seeding');
      return;
    }

    setIsSeeding(true);
    setError(null);

    try {
      const result = await seedRegions();
      setResults({ message: 'Regions seeded successfully', regions: Object.keys(result).length });
    } catch (err: any) {
      setError(err.message || 'Region seeding failed');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSeedWalkHighlandsRegions = async () => {
    if (!isSignedIn) {
      setError('Please sign in to run seeding');
      return;
    }

    setIsSeeding(true);
    setError(null);

    try {
      const result = await seedWalkHighlandsRegions();
      setResults({ message: 'Walk Highlands regions seeded successfully', regions: Object.keys(result).length });
    } catch (err: any) {
      setError(err.message || 'Walk Highlands region seeding failed');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSeedWalks = async () => {
    if (!isSignedIn) {
      setError('Please sign in to run seeding');
      return;
    }

    setIsSeeding(true);
    setError(null);

    try {
      const result = await seedWalks();
      setResults(result);
    } catch (err: any) {
      setError(err.message || 'Walk seeding failed');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSeedScrapedWalks = async () => {
    if (!isSignedIn) {
      setError('Please sign in to run seeding');
      return;
    }

    setIsSeeding(true);
    setError(null);

    try {
      const result = await seedScrapedWalks();
      setResults(result);
    } catch (err: any) {
      setError(err.message || 'Scraped walks seeding failed');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSeedDetailedWalks = async () => {
    if (!isSignedIn) {
      setError('Please sign in to run seeding');
      return;
    }

    setIsSeeding(true);
    setError(null);

    try {
      const result = await seedDetailedWalks();
      setResults(result);
    } catch (err: any) {
      setError(err.message || 'Detailed walks seeding failed');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSeedAll90Walks = async () => {
    setIsSeeding(true);
    setError(null);

    try {
      const result = await seedAll90Walks();
      setResults(result);
    } catch (err: any) {
      setError(err.message || 'All 90 walks seeding failed');
    } finally {
      setIsSeeding(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="size-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-4">
              Please sign in to access the database seeding tools.
            </p>
            <Button asChild>
              <a href="/sign-in">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Database Seeding
          </h1>
          <p className="text-muted-foreground">
            Populate the database with initial regions and sample Scottish walks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Walk Highlands Regions */}
          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="size-5 text-emerald-600" />
                Walk Highlands Regions (Recommended)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Creates all 26 authentic Walk Highlands regions matching their exact schema and naming. This provides the most accurate and comprehensive regional structure for Scottish walking.
              </p>
              
              <div className="space-y-2">
                <Badge variant="outline">26 Authentic Regions</Badge>
                <Badge variant="outline">Walk Highlands Schema</Badge>
                <Badge variant="outline">18 Mainland + 8 Islands</Badge>
              </div>

              <Button 
                onClick={handleSeedWalkHighlandsRegions}
                disabled={isSeeding}
                className="w-full"
                size="lg"
              >
                {isSeeding ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : (
                  <Play className="size-4 mr-2" />
                )}
                {isSeeding ? 'Seeding...' : 'Seed Walk Highlands Regions'}
              </Button>
            </CardContent>
          </Card>

          {/* Scraped Popular Walks */}
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="size-5 text-purple-600" />
                Popular Scottish Walks (NEW!)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add 11 carefully curated popular Scottish walks with original descriptions inspired by real WalkHighlands routes. Perfect for Phase 1 launch with diverse difficulty levels and stunning locations.
              </p>
              
              <div className="space-y-2">
                <Badge variant="outline">11 Popular Walks</Badge>
                <Badge variant="outline">Original Descriptions</Badge>
                <Badge variant="outline">8 Regions Covered</Badge>
                <Badge variant="outline">Easy to Moderate</Badge>
              </div>

              <Button 
                onClick={handleSeedScrapedWalks}
                disabled={isSeeding}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                {isSeeding ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : (
                  <Play className="size-4 mr-2" />
                )}
                {isSeeding ? 'Seeding...' : 'Add Popular Walks'}
              </Button>
            </CardContent>
          </Card>

          {/* Detailed Walks with Stages */}
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="size-5 text-blue-600" />
                Detailed Walks with Stage Navigation (PREMIUM!)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add premium walks with detailed stage-by-stage navigation inspired by WalkHighlands. Each walk includes 6+ detailed stages with turn-by-turn directions, making them perfect for serious walkers and premium content.
              </p>
              
              <div className="space-y-2">
                <Badge variant="outline">3 Premium Walks</Badge>
                <Badge variant="outline">18 Navigation Stages</Badge>
                <Badge variant="outline">Original Stage Descriptions</Badge>
                <Badge variant="outline">Skye + Cairngorms</Badge>
                <Badge className="bg-blue-100 text-blue-800">Stage-by-Stage Navigation</Badge>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-1">
                  Premium Features:
                </p>
                <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Detailed turn-by-turn navigation for each stage</li>
                  <li>• GPS coordinates and grid references</li>
                  <li>• Terrain descriptions and safety information</li>
                  <li>• Original content inspired by WalkHighlands expertise</li>
                </ul>
              </div>

              <Button 
                onClick={handleSeedDetailedWalks}
                disabled={isSeeding}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                {isSeeding ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : (
                  <Play className="size-4 mr-2" />
                )}
                {isSeeding ? 'Seeding...' : 'Add Detailed Navigation Walks'}
              </Button>
            </CardContent>
          </Card>

          {/* All 90 Walks Bulk Import */}
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="size-5 text-emerald-600" />
                Import All 90 Walks - COMPLETE COLLECTION 🚀
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Import the complete collection of 90 converted walks with detailed stage-by-stage navigation. This includes all scraped walks from across Scotland, each with original descriptions and turn-by-turn directions.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Badge variant="outline" className="text-center">90 Total Walks</Badge>
                <Badge variant="outline" className="text-center">~460 Navigation Stages</Badge>
                <Badge variant="outline" className="text-center">7 Scottish Regions</Badge>
                <Badge variant="outline" className="text-center">Original Descriptions</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
                  <p className="text-sm text-emerald-800 dark:text-emerald-200 font-medium mb-1">
                    Regional Coverage:
                  </p>
                  <ul className="text-xs text-emerald-700 dark:text-emerald-300 space-y-1">
                    <li>• Isle of Skye: 10 mystical walks</li>
                    <li>• Cairngorms-Aviemore: 15 forest trails</li>
                    <li>• Torridon-Gairloch: 14 Highland walks</li>
                    <li>• Loch Lomond: 15 loch circuits</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-1">
                    Premium Features:
                  </p>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• 5.1 average stages per walk</li>
                    <li>• GPS coordinates & OS grid refs</li>
                    <li>• Terrain & safety information</li>
                    <li>• Copyright-free original content</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium mb-1">
                  ⚠️ This is a bulk import operation:
                </p>
                <ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Will create 90 walks + ~460 stage records</li>
                  <li>• May take 2-3 minutes to complete</li>
                  <li>• Skips walks that already exist</li>
                  <li>• Updates region walk counts automatically</li>
                </ul>
              </div>

              <Button 
                onClick={handleSeedAll90Walks}
                disabled={isSeeding}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                size="lg"
              >
                {isSeeding ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : (
                  <Database className="size-4 mr-2" />
                )}
                {isSeeding ? 'Importing All 90 Walks...' : 'Import Complete 90-Walk Collection'}
              </Button>
            </CardContent>
          </Card>

          {/* Seed All */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="size-5 text-blue-600" />
                Legacy Seed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Creates basic regions and sample walks. Use Walk Highlands regions instead for better accuracy.
              </p>
              
              <div className="space-y-2">
                <Badge variant="secondary">Basic Regions</Badge>
                <Badge variant="outline">8+ Sample Walks</Badge>
              </div>

              <Button 
                onClick={handleSeedAll}
                disabled={isSeeding}
                className="w-full"
                variant="outline"
              >
                {isSeeding ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : (
                  <Play className="size-4 mr-2" />
                )}
                {isSeeding ? 'Seeding...' : 'Legacy Seed'}
              </Button>
            </CardContent>
          </Card>

          {/* Individual Seeding */}
          <Card>
            <CardHeader>
              <CardTitle>Individual Seeding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Seed regions and walks separately. Useful if you want more control over the process.
              </p>

              <div className="space-y-3">
                <Button 
                  onClick={handleSeedWalkHighlandsRegions}
                  disabled={isSeeding}
                  variant="default"
                  className="w-full"
                >
                  {isSeeding ? (
                    <Loader2 className="size-4 mr-2 animate-spin" />
                  ) : (
                    <Database className="size-4 mr-2" />
                  )}
                  Walk Highlands Regions
                </Button>

                <Button 
                  onClick={handleSeedRegions}
                  disabled={isSeeding}
                  variant="outline"
                  className="w-full"
                >
                  {isSeeding ? (
                    <Loader2 className="size-4 mr-2 animate-spin" />
                  ) : (
                    <Database className="size-4 mr-2" />
                  )}
                  Legacy Regions
                </Button>

                <Button 
                  onClick={handleSeedWalks}
                  disabled={isSeeding}
                  variant="outline"
                  className="w-full"
                >
                  {isSeeding ? (
                    <Loader2 className="size-4 mr-2 animate-spin" />
                  ) : (
                    <Database className="size-4 mr-2" />
                  )}
                  Seed Walks Only
                </Button>

                <Button 
                  onClick={handleSeedScrapedWalks}
                  disabled={isSeeding}
                  variant="default"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isSeeding ? (
                    <Loader2 className="size-4 mr-2 animate-spin" />
                  ) : (
                    <Database className="size-4 mr-2" />
                  )}
                  Popular Walks
                </Button>

                <Button 
                  onClick={handleSeedDetailedWalks}
                  disabled={isSeeding}
                  variant="default"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isSeeding ? (
                    <Loader2 className="size-4 mr-2 animate-spin" />
                  ) : (
                    <Database className="size-4 mr-2" />
                  )}
                  Detailed Navigation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {results && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="size-5 text-green-600" />
                Seeding Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="font-medium text-green-800 dark:text-green-200 mb-2">
                  {results.message}
                </p>
                {results.regions && (
                  <p className="text-sm text-green-700 dark:text-green-300">
                    • {results.regions} regions processed
                  </p>
                )}
                {results.walks && (
                  <p className="text-sm text-green-700 dark:text-green-300">
                    • {results.walks} walks processed
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error */}
        {error && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="size-5 text-red-600" />
                Seeding Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>What This Does</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Walk Highlands Regions (26 authentic regions):</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• <strong>Northern Scotland:</strong> Sutherland & Caithness, Ullapool/Assynt/E Ross, Torridon and Gairloch, Loch Ness and Affric, Kintail and Lochalsh</li>
                <li>• <strong>Northeast:</strong> Moray and Nairn, Aberdeenshire</li>
                <li>• <strong>Highlands:</strong> Fort William, Cairngorms and Aviemore, Perthshire</li>
                <li>• <strong>West Coast:</strong> Argyll/Oban & Bute, Loch Lomond & Trossachs</li>
                <li>• <strong>East Central:</strong> Angus, Fife and Stirling</li>
                <li>• <strong>Southwest:</strong> Glasgow/Ayrshire/Lanark, Edinburgh and Lothian, Dumfries and Galloway</li>
                <li>• <strong>Southern:</strong> Borders</li>
                <li>• <strong>Inner Hebrides:</strong> Isle of Skye (& Raasay), Isle of Mull (& Ulva/Iona), Isle of Arran, Small Isles/Coll/Tiree, Islay/Jura & Colonsay</li>
                <li>• <strong>Other Islands:</strong> Outer Hebrides, Orkney, Shetland</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Sample Walks Added:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Ben Nevis via Tourist Path</li>
                <li>• Old Man of Storr Circuit</li>
                <li>• Glen Coe Lost Valley</li>
                <li>• Loch Katrine Circuit</li>
                <li>• And more iconic Scottish walks...</li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground">
              After seeding, you can visit the <Link href="/walks" className="text-emerald-600 hover:underline">walks page</Link> to see all the sample data.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}