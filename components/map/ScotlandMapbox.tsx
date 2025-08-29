'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as topojson from 'topojson-client';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

// Map electoral regions to walking regions with distinctive colors and styling
const regionMapping = {
  'Highlands and Islands PER': {
    name: 'Highlands & Islands',
    slug: 'highlands-islands',
    walkCount: 145,
    color: '#10b981', // Emerald green - for the vast wilderness
    hoverColor: '#059669',
    borderColor: '#065f46'
  },
  'Central Scotland PER': {
    name: 'Central Scotland',
    slug: 'central-scotland',
    walkCount: 68,
    color: '#3b82f6', // Bright blue - for central connectivity
    hoverColor: '#2563eb',
    borderColor: '#1d4ed8'
  },
  'South Scotland PER': {
    name: 'Southern Uplands',
    slug: 'southern-uplands',
    walkCount: 42,
    color: '#8b5cf6', // Purple - for rolling hills
    hoverColor: '#7c3aed',
    borderColor: '#6d28d9'
  },
  'North East Scotland PER': {
    name: 'North East Scotland',
    slug: 'north-east-scotland',
    walkCount: 34,
    color: '#f59e0b', // Amber - for coastal golden light
    hoverColor: '#d97706',
    borderColor: '#b45309'
  },
  'Mid Scotland and Fife PER': {
    name: 'Mid Scotland & Fife',
    slug: 'mid-scotland-fife',
    walkCount: 28,
    color: '#ef4444', // Red - for dramatic landscapes
    hoverColor: '#dc2626',
    borderColor: '#b91c1c'
  },
  'West Scotland PER': {
    name: 'West Scotland',
    slug: 'west-scotland',
    walkCount: 52,
    color: '#06b6d4', // Cyan - for western sea views
    hoverColor: '#0891b2',
    borderColor: '#0e7490'
  },
  'Glasgow PER': {
    name: 'Glasgow Region',
    slug: 'glasgow-region',
    walkCount: 15,
    color: '#f97316', // Orange - for urban energy
    hoverColor: '#ea580c',
    borderColor: '#c2410c'
  },
  'Lothian PER': {
    name: 'Lothian',
    slug: 'lothian',
    walkCount: 22,
    color: '#84cc16', // Lime green - for accessible walking
    hoverColor: '#65a30d',
    borderColor: '#4d7c0f'
  }
};

interface ScotlandMapboxProps {
  onRegionClick?: (regionSlug: string) => void;
  className?: string;
}

export default function ScotlandMapbox({ onRegionClick, className = '' }: ScotlandMapboxProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      console.error('Mapbox token not found');
      return;
    }

    if (map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-4.5, 56.8],
      zoom: 6,
      maxZoom: 10,
      minZoom: 5
    });

    map.current.on('load', async () => {
      if (!map.current) return;

      try {
        // Fetch and convert TopoJSON to GeoJSON
        const response = await fetch('/json/electoral/sco/topo_sper.json');
        const topology = await response.json();
        const geojson = topojson.feature(topology, topology.objects.sper);

        // Add the regions source using converted GeoJSON
        map.current.addSource('scotland-regions', {
          type: 'geojson',
          data: geojson
        });
      } catch (error) {
        console.error('Error loading TopoJSON:', error);
        return;
      }

      // Add fill layer with distinctive colors and enhanced hover effects
      map.current.addLayer({
        id: 'region-fills',
        type: 'fill',
        source: 'scotland-regions',
        paint: {
          'fill-color': [
            'case',
            ['==', ['get', 'NAME'], 'Highlands and Islands PER'], '#10b981',
            ['==', ['get', 'NAME'], 'Central Scotland PER'], '#3b82f6',
            ['==', ['get', 'NAME'], 'South Scotland PER'], '#8b5cf6',
            ['==', ['get', 'NAME'], 'North East Scotland PER'], '#f59e0b',
            ['==', ['get', 'NAME'], 'Mid Scotland and Fife PER'], '#ef4444',
            ['==', ['get', 'NAME'], 'West Scotland PER'], '#06b6d4',
            ['==', ['get', 'NAME'], 'Glasgow PER'], '#f97316',
            ['==', ['get', 'NAME'], 'Lothian PER'], '#84cc16',
            '#64748b'
          ],
          'fill-opacity': 0.8
        }
      });

      // Add distinctive border layer with region-specific colors
      map.current.addLayer({
        id: 'region-borders',
        type: 'line',
        source: 'scotland-regions',
        paint: {
          'line-color': [
            'case',
            ['==', ['get', 'NAME'], 'Highlands and Islands PER'], '#065f46',
            ['==', ['get', 'NAME'], 'Central Scotland PER'], '#1d4ed8',
            ['==', ['get', 'NAME'], 'South Scotland PER'], '#6d28d9',
            ['==', ['get', 'NAME'], 'North East Scotland PER'], '#b45309',
            ['==', ['get', 'NAME'], 'Mid Scotland and Fife PER'], '#b91c1c',
            ['==', ['get', 'NAME'], 'West Scotland PER'], '#0e7490',
            ['==', ['get', 'NAME'], 'Glasgow PER'], '#c2410c',
            ['==', ['get', 'NAME'], 'Lothian PER'], '#4d7c0f',
            '#374151'
          ],
          'line-width': 2,
          'line-opacity': 0.9
        }
      });

      // Add region labels for better identification (centered, one per region)
      map.current.addLayer({
        id: 'region-labels',
        type: 'symbol',
        source: 'scotland-regions',
        layout: {
          'text-field': [
            'case',
            ['==', ['get', 'NAME'], 'Highlands and Islands PER'], 'HIGHLANDS',
            ['==', ['get', 'NAME'], 'Central Scotland PER'], 'CENTRAL',
            ['==', ['get', 'NAME'], 'South Scotland PER'], 'SOUTH',
            ['==', ['get', 'NAME'], 'North East Scotland PER'], 'NORTH EAST',
            ['==', ['get', 'NAME'], 'Mid Scotland and Fife PER'], 'FIFE',
            ['==', ['get', 'NAME'], 'West Scotland PER'], 'WEST',
            ['==', ['get', 'NAME'], 'Glasgow PER'], 'GLASGOW',
            ['==', ['get', 'NAME'], 'Lothian PER'], 'LOTHIAN',
            ''
          ],
          'visibility': [
            'case',
            ['>', ['zoom'], 5.5], 'visible',
            'none'
          ],
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5, 12,
            8, 18
          ],
          'text-transform': 'uppercase',
          'text-letter-spacing': 0.15,
          'symbol-placement': 'point',
          'text-anchor': 'center',
          'text-justify': 'center',
          'text-allow-overlap': false,
          'text-ignore-placement': false,
          'symbol-avoid-edges': true,
          'text-max-width': 10,
          'text-padding': 20,
          'symbol-spacing': 250
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-color': '#000000',
          'text-halo-width': 2.5,
          'text-opacity': 0.85
        }
      });

      // Handle simple hover cursor changes
      const layers = ['region-fills', 'region-borders', 'region-labels'];
      
      layers.forEach(layerId => {
        map.current?.on('mousemove', layerId, () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = 'pointer';
          }
        });

        map.current?.on('mouseleave', layerId, () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = '';
          }
        });
      });

      // Handle clicks on all interactive layers
      layers.forEach(layerId => {
        map.current?.on('click', layerId, (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const electoralRegionName = feature.properties?.NAME;
            const walkingRegion = regionMapping[electoralRegionName as keyof typeof regionMapping];
            
            if (walkingRegion && onRegionClick) {
              onRegionClick(walkingRegion.slug);
            }
            setSelectedRegion(walkingRegion?.slug || null);
          }
        });
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [onRegionClick]);

  if (!MAPBOX_TOKEN) {
    return (
      <Card className={`p-8 bg-gradient-to-br from-red-50 to-red-100 ${className}`}>
        <div className="text-center">
          <div className="text-red-600 mb-2">⚠️ Mapbox Token Required</div>
          <p className="text-sm text-red-500">
            Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your environment variables
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="relative">
        <div 
          ref={mapContainer} 
          className="w-full h-[600px]"
          style={{ background: '#f8fafc' }}
        />
        
        {/* Clean overlay with region info */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <Badge variant="secondary" className="mb-2">
            Choose Your Region
          </Badge>
          <p className="text-sm text-gray-600">
            Click on a region to explore walks
          </p>
        </div>

        {selectedRegion && (
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="text-sm font-medium text-gray-900">
              Selected: {Object.values(regionMapping).find(r => r.slug === selectedRegion)?.name}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}