'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, ExternalLink, Smartphone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

interface GpxDownloadProps {
  walkTitle: string;
  gpxStorageId?: Id<"_storage">;
  className?: string;
}

export default function GpxDownload({ walkTitle, gpxStorageId, className = '' }: GpxDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  // Get download URL for the GPX file
  const downloadUrl = useQuery(
    api.files.getGpxDownloadUrl, 
    gpxStorageId ? { storageId: gpxStorageId } : "skip"
  );

  const handleDownload = async () => {
    if (!downloadUrl || !gpxStorageId) {
      toast({
        title: 'No GPX file available',
        description: 'This walk does not have a GPX track file',
        variant: 'destructive',
      });
      return;
    }

    setIsDownloading(true);

    try {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${walkTitle.toLowerCase().replace(/\s+/g, '-')}.gpx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Download started',
        description: 'GPX file is being downloaded to your device',
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: 'Download failed',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpenInGoogleMaps = () => {
    // This is a simplified version - in reality you'd need to process the GPX data
    // and create a Google Maps URL with waypoints
    toast({
      title: 'Coming soon',
      description: 'Google Maps integration is being developed',
    });
  };

  const handleShareToApp = (appName: string) => {
    toast({
      title: 'Coming soon',
      description: `${appName} integration is being developed`,
    });
  };

  if (!gpxStorageId) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <FileText className="size-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No GPX Track Available
          </h3>
          <p className="text-muted-foreground mb-4">
            This walk doesn't have a GPS track file yet. 
          </p>
          <Button variant="outline" size="sm">
            Upload GPX File
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="size-5" />
          Download GPS Track
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary download button */}
        <Button 
          onClick={handleDownload}
          disabled={isDownloading || !downloadUrl}
          className="w-full"
          size="lg"
        >
          <Download className="size-4 mr-2" />
          {isDownloading ? 'Downloading...' : 'Download GPX File'}
        </Button>

        {/* App integrations */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Open in Apps
          </h4>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenInGoogleMaps}
              className="flex items-center gap-2"
            >
              <MapPin className="size-4" />
              Google Maps
            </Button>
            
            <Button
              variant="outline" 
              size="sm"
              onClick={() => handleShareToApp('Strava')}
              className="flex items-center gap-2"
            >
              <ExternalLink className="size-4" />
              Strava
            </Button>

            <Button
              variant="outline"
              size="sm" 
              onClick={() => handleShareToApp('AllTrails')}
              className="flex items-center gap-2"
            >
              <Smartphone className="size-4" />
              AllTrails
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShareToApp('Komoot')}
              className="flex items-center gap-2"
            >
              <ExternalLink className="size-4" />
              Komoot
            </Button>
          </div>
        </div>

        {/* Usage instructions */}
        <div className="text-xs text-muted-foreground space-y-2 pt-2 border-t">
          <div className="font-medium">How to use:</div>
          <ul className="space-y-1 list-disc list-inside">
            <li>Download the GPX file to your device</li>
            <li>Import into your preferred GPS app or device</li>
            <li>Follow the route while hiking</li>
            <li>Always carry backup navigation (map & compass)</li>
          </ul>
        </div>

        {/* File info */}
        {downloadUrl && (
          <div className="text-xs text-muted-foreground pt-2 border-t">
            <div className="flex items-center justify-between">
              <span>Format: GPX</span>
              <span>Compatible with most GPS devices</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}