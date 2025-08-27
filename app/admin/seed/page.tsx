'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Database, CheckCircle, AlertCircle, Play } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/nextjs';

export default function SeedPage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { isSignedIn } = useAuth();
  const seedAll = useMutation(api.seed.seedAll);
  const seedRegions = useMutation(api.seed.seedRegions);
  const seedWalkHighlandsRegions = useMutation(api.seedNew.seedWalkHighlandsRegions);
  const seedWalks = useMutation(api.seed.seedWalks);

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
              <h4 className="font-medium">Regions Created (31 total):</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• <strong>Highlands:</strong> Sutherland & Caithness, Ullapool & Assynt, Torridon & Gairloch, Kintail & Lochalsh, Loch Ness & Affric, Moray, Fort William, Cairngorms & Aviemore, Perthshire, Argyll & Oban, Loch Lomond, Aberdeenshire, Angus</li>
                <li>• <strong>Islands:</strong> Isle of Skye, Isle of Mull, Outer Hebrides, Isle of Arran, Coll/Tiree & Small Isles, Islay/Jura & Colonsay, Orkney, Shetland, Isle of Bute, Isle of Gigha, Isle of Lismore, Isle of Raasay, Isle of Ulva</li>
                <li>• <strong>Lowlands:</strong> Fife & Stirling, Edinburgh & Lothian, Glasgow & Ayrshire, Dumfries & Galloway, Scottish Borders</li>
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
              After seeding, you can visit the <a href="/walks" className="text-emerald-600 hover:underline">walks page</a> to see all the sample data.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}