'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// You'll need to add your Mapbox token to your environment variables
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface WalkMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  height?: string;
  className?: string;
  gpxData?: any; // GPX data for route overlay
  showRoute?: boolean;
}

export default function WalkMap({
  latitude,
  longitude,
  zoom = 12,
  height = '400px',
  className = '',
  gpxData,
  showRoute = true,
}: WalkMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      console.error('Mapbox access token is required');
      return;
    }

    if (map.current || !mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12', // Great for hiking maps
      center: [longitude, latitude],
      zoom: zoom,
      attributionControl: false, // We'll add custom attribution
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add terrain control for 3D view (premium feature)
    map.current.addControl(
      new mapboxgl.TerrainControl({
        source: 'mapbox-dem',
        exaggeration: 1.5,
      }),
      'top-right'
    );

    // Add marker for walk start point
    new mapboxgl.Marker({
      color: '#10b981', // Emerald green
    })
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          '<div class="p-2"><strong>Walk Start Point</strong></div>'
        )
      )
      .addTo(map.current);

    map.current.on('load', () => {
      setIsLoaded(true);

      // Add terrain data source
      map.current!.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });

      // Set terrain
      map.current!.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Add sky layer for dramatic effect
      map.current!.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15,
        },
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [latitude, longitude, zoom]);

  // Add GPX route when data is available
  useEffect(() => {
    if (!map.current || !isLoaded || !gpxData || !showRoute) return;

    // Add GPX route source and layer
    if (!map.current.getSource('route')) {
      map.current.addSource('route', {
        type: 'geojson',
        data: gpxData,
      });

      // Add route line
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ef4444', // Red route line
          'line-width': 4,
          'line-opacity': 0.8,
        },
      });

      // Add route outline for better visibility
      map.current.addLayer({
        id: 'route-outline',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ffffff',
          'line-width': 6,
          'line-opacity': 0.4,
        },
      }, 'route');

      // Fit map to route bounds
      const bounds = new mapboxgl.LngLatBounds();
      if (gpxData.geometry?.coordinates) {
        gpxData.geometry.coordinates.forEach((coord: [number, number]) => {
          bounds.extend(coord);
        });
        map.current.fitBounds(bounds, { padding: 50 });
      }
    }
  }, [gpxData, isLoaded, showRoute]);

  if (!MAPBOX_TOKEN) {
    return (
      <div 
        className={`bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <p className="text-gray-500">Map configuration required</p>
      </div>
    );
  }

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <div
        ref={mapContainer}
        className="w-full"
        style={{ height }}
      />
      
      {/* Custom attribution */}
      <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 bg-opacity-80 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-400">
        © <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer">Mapbox</a> |
        © <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>
      </div>

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      )}
    </div>
  );
}