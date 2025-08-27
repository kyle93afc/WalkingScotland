'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface Walk {
  _id: string;
  title: string;
  latitude: number;
  longitude: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Strenuous';
  distance: number;
  featuredImageUrl: string;
  slug: string;
}

interface RegionMapProps {
  walks: Walk[];
  center: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  onWalkClick?: (walk: Walk) => void;
}

const difficultyColors = {
  Easy: '#10b981',      // emerald-500
  Moderate: '#f59e0b',  // amber-500
  Hard: '#ef4444',      // red-500
  Strenuous: '#7c3aed', // violet-600
};

export default function RegionMap({
  walks,
  center,
  zoom = 9,
  height = '500px',
  className = '',
  onWalkClick,
}: RegionMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      console.error('Mapbox access token is required');
      return;
    }

    if (map.current || !mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: center,
      zoom: zoom,
    });

    // Add controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    map.current.on('load', () => {
      setIsLoaded(true);
    });

    return () => {
      // Clean up markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom]);

  // Add markers for walks
  useEffect(() => {
    if (!map.current || !isLoaded || !walks.length) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    walks.forEach((walk) => {
      // Create custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'walk-marker';
      markerEl.style.cssText = `
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${difficultyColors[walk.difficulty]};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: all 0.2s ease;
      `;

      // Add hover effects
      markerEl.addEventListener('mouseenter', () => {
        markerEl.style.transform = 'scale(1.2)';
      });
      markerEl.addEventListener('mouseleave', () => {
        markerEl.style.transform = 'scale(1)';
      });

      // Create popup content
      const popupContent = `
        <div class="walk-popup p-3 max-w-xs">
          <img src="${walk.featuredImageUrl}" alt="${walk.title}" class="w-full h-24 object-cover rounded mb-2" />
          <h3 class="font-semibold text-sm mb-1">${walk.title}</h3>
          <div class="flex items-center gap-2 text-xs text-gray-600">
            <span class="px-2 py-1 rounded text-white" style="background-color: ${difficultyColors[walk.difficulty]}">${walk.difficulty}</span>
            <span>${walk.distance}km</span>
          </div>
          <button class="w-full mt-2 bg-emerald-600 text-white px-3 py-1 rounded text-xs hover:bg-emerald-700 transition-colors">
            View Details
          </button>
        </div>
      `;

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(popupContent);

      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([walk.longitude, walk.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      // Add click handler
      markerEl.addEventListener('click', () => {
        if (onWalkClick) {
          onWalkClick(walk);
        } else {
          // Default behavior: navigate to walk page
          window.location.href = `/walks/${walk.slug}`;
        }
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all walks
    if (walks.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      walks.forEach(walk => {
        bounds.extend([walk.longitude, walk.latitude]);
      });
      map.current.fitBounds(bounds, { 
        padding: 50,
        maxZoom: 12 
      });
    }
  }, [walks, isLoaded, onWalkClick]);

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
      
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
        <h4 className="text-sm font-semibold mb-2">Difficulty</h4>
        <div className="space-y-1">
          {Object.entries(difficultyColors).map(([difficulty, color]) => (
            <div key={difficulty} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: color }}
              ></div>
              <span>{difficulty}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Walk count */}
      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-sm font-medium">
        {walks.length} walk{walks.length !== 1 ? 's' : ''}
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