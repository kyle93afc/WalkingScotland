'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

// Enhanced region boundaries with more realistic shapes (still simplified but more accurate than boxes)
const regionBoundaries = {
  "sutherland-caithness": {
    name: "Sutherland & Caithness",
    coordinates: [[[-5.2, 58.4], [-4.8, 58.6], [-4.2, 58.7], [-3.8, 58.8], [-3.1, 58.7], [-2.8, 58.5], [-3.0, 58.3], [-3.5, 58.1], [-4.2, 58.0], [-5.0, 58.2], [-5.2, 58.4]]],
    center: [-4.0, 58.5],
    color: "#ef4444"
  },
  "ullapool-assynt": {
    name: "Ullapool & Assynt",
    coordinates: [[[-5.8, 58.0], [-5.4, 58.2], [-5.0, 58.1], [-4.8, 57.9], [-4.6, 57.8], [-5.2, 57.6], [-5.6, 57.8], [-5.8, 58.0]]],
    center: [-5.2, 57.9],
    color: "#f97316"
  },
  "torridon-gairloch": {
    name: "Torridon & Gairloch",
    coordinates: [[[-5.9, 57.8], [-5.6, 57.9], [-5.3, 57.7], [-5.1, 57.5], [-5.4, 57.3], [-5.7, 57.4], [-5.9, 57.6], [-5.9, 57.8]]],
    center: [-5.5, 57.6],
    color: "#f59e0b"
  },
  "kintail-lochalsh": {
    name: "Kintail & Lochalsh",
    coordinates: [[[-5.7, 57.3], [-5.4, 57.4], [-5.1, 57.3], [-4.9, 57.1], [-5.2, 57.0], [-5.5, 57.1], [-5.7, 57.3]]],
    center: [-5.3, 57.2],
    color: "#eab308"
  },
  "loch-ness-affric": {
    name: "Loch Ness & Affric",
    coordinates: [[[-5.2, 57.4], [-4.8, 57.5], [-4.4, 57.4], [-4.2, 57.2], [-4.5, 57.0], [-4.9, 57.1], [-5.2, 57.4]]],
    center: [-4.7, 57.3],
    color: "#84cc16"
  },
  "moray": {
    name: "Moray",
    coordinates: [[[-3.8, 57.8], [-3.2, 57.9], [-2.6, 57.7], [-2.4, 57.4], [-2.8, 57.2], [-3.4, 57.3], [-3.8, 57.6], [-3.8, 57.8]]],
    center: [-3.1, 57.6],
    color: "#22c55e"
  },
  "fort-william": {
    name: "Fort William",
    coordinates: [[[-5.5, 57.0], [-5.2, 57.1], [-4.8, 56.9], [-4.6, 56.7], [-4.8, 56.5], [-5.2, 56.6], [-5.4, 56.8], [-5.5, 57.0]]],
    center: [-5.0, 56.8],
    color: "#06d6a0"
  },
  "cairngorms-aviemore": {
    name: "Cairngorms & Aviemore",
    coordinates: [[[-4.2, 57.3], [-3.8, 57.4], [-3.4, 57.2], [-3.0, 57.0], [-3.2, 56.8], [-3.6, 56.9], [-4.0, 57.1], [-4.2, 57.3]]],
    center: [-3.6, 57.1],
    color: "#0891b2"
  },
  "perthshire": {
    name: "Perthshire",
    coordinates: [[[-4.8, 56.8], [-4.4, 56.9], [-4.0, 56.7], [-3.6, 56.5], [-3.4, 56.3], [-3.8, 56.1], [-4.2, 56.2], [-4.6, 56.4], [-4.8, 56.6], [-4.8, 56.8]]],
    center: [-4.1, 56.5],
    color: "#0284c7"
  },
  "argyll-oban": {
    name: "Argyll & Oban",
    coordinates: [[[-6.2, 56.8], [-5.8, 56.9], [-5.4, 56.7], [-5.2, 56.4], [-5.0, 56.1], [-5.4, 55.8], [-5.8, 56.0], [-6.0, 56.3], [-6.2, 56.6], [-6.2, 56.8]]],
    center: [-5.6, 56.3],
    color: "#2563eb"
  },
  "loch-lomond": {
    name: "Loch Lomond",
    coordinates: [[[-5.0, 56.3], [-4.6, 56.4], [-4.3, 56.2], [-4.1, 55.9], [-4.4, 55.7], [-4.8, 55.8], [-5.0, 56.0], [-5.0, 56.3]]],
    center: [-4.5, 56.1],
    color: "#4f46e5"
  },
  "aberdeenshire": {
    name: "Aberdeenshire",
    coordinates: [[[-3.4, 57.4], [-2.8, 57.5], [-2.2, 57.3], [-1.8, 57.0], [-2.0, 56.7], [-2.6, 56.8], [-3.2, 57.0], [-3.4, 57.4]]],
    center: [-2.6, 57.1],
    color: "#7c3aed"
  },
  "angus": {
    name: "Angus",
    coordinates: [[[-3.6, 56.9], [-3.2, 57.0], [-2.8, 56.8], [-2.4, 56.6], [-2.6, 56.4], [-3.0, 56.3], [-3.4, 56.5], [-3.6, 56.7], [-3.6, 56.9]]],
    center: [-3.0, 56.6],
    color: "#9333ea"
  },
  "isle-of-skye": {
    name: "Isle of Skye",
    coordinates: [[[-6.5, 57.7], [-6.2, 57.8], [-5.9, 57.6], [-5.8, 57.4], [-6.0, 57.1], [-6.3, 57.0], [-6.6, 57.2], [-6.7, 57.5], [-6.5, 57.7]]],
    center: [-6.2, 57.4],
    color: "#c026d3"
  },
  "isle-of-mull": {
    name: "Isle of Mull",
    coordinates: [[[-6.5, 56.7], [-6.2, 56.8], [-5.9, 56.6], [-5.7, 56.4], [-5.9, 56.2], [-6.2, 56.1], [-6.5, 56.3], [-6.6, 56.5], [-6.5, 56.7]]],
    center: [-6.1, 56.4],
    color: "#db2777"
  },
  "outer-hebrides": {
    name: "Outer Hebrides",
    coordinates: [[[-7.6, 58.5], [-7.2, 58.6], [-6.9, 58.4], [-6.8, 57.8], [-7.0, 57.2], [-7.4, 57.0], [-7.7, 57.4], [-7.8, 58.0], [-7.6, 58.5]]],
    center: [-7.3, 57.8],
    color: "#e11d48"
  },
  "isle-of-arran": {
    name: "Isle of Arran",
    coordinates: [[[-5.4, 55.7], [-5.2, 55.8], [-5.0, 55.6], [-4.9, 55.4], [-5.1, 55.3], [-5.3, 55.4], [-5.4, 55.6], [-5.4, 55.7]]],
    center: [-5.2, 55.5],
    color: "#dc2626"
  },
  "fife-stirling": {
    name: "Fife & Stirling",
    coordinates: [[[-4.2, 56.4], [-3.8, 56.5], [-3.4, 56.3], [-2.8, 56.1], [-2.6, 55.9], [-3.0, 55.8], [-3.6, 55.9], [-4.0, 56.1], [-4.2, 56.4]]],
    center: [-3.4, 56.1],
    color: "#059669"
  },
  "edinburgh-lothian": {
    name: "Edinburgh & Lothian",
    coordinates: [[[-3.6, 56.1], [-3.2, 56.2], [-2.8, 56.0], [-2.4, 55.8], [-2.6, 55.6], [-3.0, 55.7], [-3.4, 55.9], [-3.6, 56.1]]],
    center: [-3.0, 55.9],
    color: "#0d9488"
  },
  "glasgow-ayrshire": {
    name: "Glasgow & Ayrshire",
    coordinates: [[[-5.2, 56.0], [-4.8, 56.1], [-4.4, 55.9], [-4.0, 55.6], [-4.2, 55.3], [-4.6, 55.2], [-5.0, 55.4], [-5.2, 55.7], [-5.2, 56.0]]],
    center: [-4.6, 55.6],
    color: "#0f766e"
  },
  "dumfries-galloway": {
    name: "Dumfries & Galloway",
    coordinates: [[[-5.2, 55.4], [-4.8, 55.5], [-4.4, 55.3], [-4.0, 55.0], [-3.6, 54.8], [-3.2, 54.6], [-3.8, 54.4], [-4.4, 54.5], [-5.0, 54.7], [-5.2, 55.1], [-5.2, 55.4]]],
    center: [-4.2, 55.0],
    color: "#065f46"
  },
  "scottish-borders": {
    name: "Scottish Borders",
    coordinates: [[[-3.6, 55.8], [-3.2, 55.9], [-2.8, 55.7], [-2.4, 55.5], [-2.0, 55.2], [-2.2, 54.9], [-2.6, 55.0], [-3.0, 55.2], [-3.4, 55.4], [-3.6, 55.6], [-3.6, 55.8]]],
    center: [-2.8, 55.4],
    color: "#064e3b"
  },
};

interface Region {
  _id: string;
  name: string;
  slug: string;
  description: string;
  walkCount: number;
  popularityScore: number;
}

interface ScotlandRegionMapProps {
  regions?: Region[];
  onRegionClick?: (region: Region) => void;
  height?: string;
  className?: string;
}

export default function ScotlandRegionMap({
  regions = [],
  onRegionClick,
  height = '600px',
  className = '',
}: ScotlandRegionMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

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
      center: [-4.2, 56.8], // Center on Scotland
      zoom: 6,
      attributionControl: false,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      if (!map.current) return;

      // Add region polygons
      Object.entries(regionBoundaries).forEach(([slug, regionData]) => {
        const region = regions.find(r => r.slug === slug);
        if (!region) return;

        // Add source for this region
        map.current!.addSource(`region-${slug}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {
              name: regionData.name,
              slug: slug,
              walkCount: region.walkCount,
              description: region.description,
              popularityScore: region.popularityScore,
            },
            geometry: {
              type: 'Polygon',
              coordinates: regionData.coordinates,
            },
          },
        });

        // Add fill layer
        map.current!.addLayer({
          id: `region-fill-${slug}`,
          type: 'fill',
          source: `region-${slug}`,
          paint: {
            'fill-color': regionData.color,
            'fill-opacity': 0.4,
          },
        });

        // Add stroke layer
        map.current!.addLayer({
          id: `region-stroke-${slug}`,
          type: 'line',
          source: `region-${slug}`,
          paint: {
            'line-color': regionData.color,
            'line-width': 2,
            'line-opacity': 0.9,
          },
        });

        // Add label
        map.current!.addLayer({
          id: `region-label-${slug}`,
          type: 'symbol',
          source: `region-${slug}`,
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 11,
            'text-anchor': 'center',
            'text-max-width': 8,
          },
          paint: {
            'text-color': '#1f2937',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
          },
        });

        // Add hover effects
        map.current!.on('mouseenter', `region-fill-${slug}`, () => {
          if (!map.current) return;
          
          map.current.getCanvas().style.cursor = 'pointer';
          setHoveredRegion(slug);
          
          // Increase opacity on hover
          map.current.setPaintProperty(`region-fill-${slug}`, 'fill-opacity', 0.7);
          map.current.setPaintProperty(`region-stroke-${slug}`, 'line-width', 3);
        });

        map.current!.on('mouseleave', `region-fill-${slug}`, () => {
          if (!map.current) return;
          
          map.current.getCanvas().style.cursor = '';
          setHoveredRegion(null);
          
          // Reset opacity
          const opacity = selectedRegion === slug ? 0.6 : 0.4;
          const lineWidth = selectedRegion === slug ? 3 : 2;
          map.current.setPaintProperty(`region-fill-${slug}`, 'fill-opacity', opacity);
          map.current.setPaintProperty(`region-stroke-${slug}`, 'line-width', lineWidth);
        });

        // Add click handler
        map.current!.on('click', `region-fill-${slug}`, () => {
          setSelectedRegion(slug);
          
          // Update all regions to show selected state
          Object.keys(regionBoundaries).forEach((regionSlug) => {
            if (map.current && map.current.getLayer(`region-fill-${regionSlug}`)) {
              const opacity = regionSlug === slug ? 0.6 : 0.4;
              const lineWidth = regionSlug === slug ? 3 : 2;
              map.current.setPaintProperty(`region-fill-${regionSlug}`, 'fill-opacity', opacity);
              map.current.setPaintProperty(`region-stroke-${regionSlug}`, 'line-width', lineWidth);
            }
          });

          if (onRegionClick && region) {
            onRegionClick(region);
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
  }, [regions, onRegionClick, selectedRegion]);

  // Reset selection when regions change
  useEffect(() => {
    setSelectedRegion(null);
  }, [regions]);

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

      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 bg-opacity-95 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-sm">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">
          Discover Scotland's Regions
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Click on any region to explore walking routes and discover breathtaking landscapes across Scotland.
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700 dark:text-gray-300">
            {regions.length} regions
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            {regions.reduce((sum, r) => sum + r.walkCount, 0)} walks
          </span>
        </div>
        
        {hoveredRegion && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
            {(() => {
              const region = regions.find(r => r.slug === hoveredRegion);
              const regionData = regionBoundaries[hoveredRegion as keyof typeof regionBoundaries];
              return region && regionData ? (
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                    {regionData.name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {region.walkCount} walks available
                  </p>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>

      {/* Selected region details */}
      {selectedRegion && (
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 bg-opacity-95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          {(() => {
            const region = regions.find(r => r.slug === selectedRegion);
            const regionData = regionBoundaries[selectedRegion as keyof typeof regionBoundaries];
            return region && regionData ? (
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      {regionData.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {region.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {region.walkCount} walks available
                  </div>
                  <button
                    onClick={() => onRegionClick?.(region)}
                    className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors"
                  >
                    Explore Walks
                  </button>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}

      {/* Tip for better boundaries */}
      <div className="absolute top-4 right-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 p-3 rounded-lg shadow-lg max-w-xs text-xs">
        <p className="text-blue-700 dark:text-blue-300">
          💡 <strong>For Production:</strong> Use real OSM boundaries via the boundary-data.ts utility for accurate regional shapes.
        </p>
      </div>
    </div>
  );
}