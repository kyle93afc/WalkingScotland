// Utility for fetching real Scottish administrative boundaries from OpenStreetMap

export interface BoundaryFeature {
  type: 'Feature';
  properties: {
    name: string;
    type: string;
    admin_level?: string;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

export interface BoundaryCollection {
  type: 'FeatureCollection';
  features: BoundaryFeature[];
}

// Mapping from our region slugs to OSM relation IDs or names
const OSM_REGION_MAPPING = {
  'aberdeenshire': { name: 'Aberdeenshire', osm_relation: '1727131' },
  'angus': { name: 'Angus', osm_relation: '1727129' },
  'argyll-oban': { name: 'Argyll and Bute', osm_relation: '1656678' },
  'cairngorms-aviemore': { name: 'Highland', osm_relation: '1656689' }, // Part of Highland
  'dumfries-galloway': { name: 'Dumfries and Galloway', osm_relation: '1656683' },
  'edinburgh-lothian': { name: 'City of Edinburgh', osm_relation: '1656678' },
  'fife-stirling': { name: 'Fife', osm_relation: '1656687' },
  'fort-william': { name: 'Highland', osm_relation: '1656689' },
  'glasgow-ayrshire': { name: 'Glasgow City', osm_relation: '1656681' },
  'isle-of-arran': { name: 'North Ayrshire', osm_relation: '1656684' },
  'isle-of-mull': { name: 'Argyll and Bute', osm_relation: '1656678' },
  'isle-of-skye': { name: 'Highland', osm_relation: '1656689' },
  'kintail-lochalsh': { name: 'Highland', osm_relation: '1656689' },
  'loch-lomond': { name: 'Stirling', osm_relation: '1656688' },
  'loch-ness-affric': { name: 'Highland', osm_relation: '1656689' },
  'moray': { name: 'Moray', osm_relation: '1656690' },
  'outer-hebrides': { name: 'Na h-Eileanan Siar', osm_relation: '1656685' },
  'perthshire': { name: 'Perth and Kinross', osm_relation: '1656686' },
  'scottish-borders': { name: 'Scottish Borders', osm_relation: '1656691' },
  'sutherland-caithness': { name: 'Highland', osm_relation: '1656689' },
  'torridon-gairloch': { name: 'Highland', osm_relation: '1656689' },
  'ullapool-assynt': { name: 'Highland', osm_relation: '1656689' },
};

// Cache for boundary data
const boundaryCache = new Map<string, BoundaryFeature>();

/**
 * Fetch Scottish council boundaries from OpenStreetMap Overpass API
 */
export async function fetchScottishCouncilBoundaries(): Promise<BoundaryCollection> {
  const overpassQuery = `
    [out:json][timeout:25];
    (
      relation["admin_level"="6"]["place"="state"]["name"~"Scotland",i];
      relation(r)["admin_level"="8"];
    );
    out geom;
  `;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(overpassQuery)}`,
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Convert OSM data to GeoJSON format
    const features: BoundaryFeature[] = data.elements
      .filter((element: any) => element.type === 'relation' && element.tags?.name)
      .map((relation: any) => {
        const coordinates = convertOSMGeometryToGeoJSON(relation.geometry);
        
        return {
          type: 'Feature',
          properties: {
            name: relation.tags.name,
            type: relation.tags.type || 'administrative',
            admin_level: relation.tags.admin_level,
          },
          geometry: coordinates.length === 1 ? {
            type: 'Polygon' as const,
            coordinates: coordinates as number[][][],
          } : {
            type: 'MultiPolygon' as const,
            coordinates: [coordinates] as number[][][][],
          },
        } as BoundaryFeature;
      });

    return {
      type: 'FeatureCollection',
      features,
    };
  } catch (error) {
    console.error('Failed to fetch OSM boundaries:', error);
    throw error;
  }
}

/**
 * Get boundary for a specific region slug
 */
export async function getRegionBoundary(regionSlug: string): Promise<BoundaryFeature | null> {
  if (boundaryCache.has(regionSlug)) {
    return boundaryCache.get(regionSlug)!;
  }

  const mapping = OSM_REGION_MAPPING[regionSlug as keyof typeof OSM_REGION_MAPPING];
  if (!mapping) {
    console.warn(`No OSM mapping found for region: ${regionSlug}`);
    return null;
  }

  try {
    // Query for specific relation
    const overpassQuery = `
      [out:json][timeout:25];
      relation(${mapping.osm_relation});
      out geom;
    `;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(overpassQuery)}`,
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.elements && data.elements.length > 0) {
      const relation = data.elements[0];
      const coordinates = convertOSMGeometryToGeoJSON(relation.geometry);
      
      const feature: BoundaryFeature = {
        type: 'Feature',
        properties: {
          name: mapping.name,
          type: 'administrative',
          admin_level: '8',
        },
        geometry: coordinates.length === 1 ? {
          type: 'Polygon' as const,
          coordinates: coordinates as number[][][],
        } : {
          type: 'MultiPolygon' as const,
          coordinates: [coordinates] as number[][][][],
        },
      };

      boundaryCache.set(regionSlug, feature);
      return feature;
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch boundary for ${regionSlug}:`, error);
    return null;
  }
}

/**
 * Convert OSM geometry format to GeoJSON coordinates
 */
function convertOSMGeometryToGeoJSON(geometry: any[]): number[][][] {
  if (!geometry || geometry.length === 0) {
    return [];
  }

  // OSM geometry is an array of ways, convert to coordinate rings
  const rings: number[][][] = [];
  
  for (const way of geometry) {
    if (way.type === 'way' && way.geometry) {
      const coordinates: number[][] = way.geometry.map((node: any) => [node.lon, node.lat]);
      
      // Ensure ring is closed
      if (coordinates.length > 0) {
        const first = coordinates[0];
        const last = coordinates[coordinates.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) {
          coordinates.push([first[0], first[1]]);
        }
        rings.push(coordinates);
      }
    }
  }

  return rings;
}

/**
 * Fallback: Pre-cached simplified boundaries for development
 * These are more accurate than the basic rectangles but still simplified
 */
export const FALLBACK_BOUNDARIES = {
  'isle-of-skye': {
    type: 'Feature',
    properties: { name: 'Isle of Skye' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-6.7361, 57.7329], [-6.6943, 57.7528], [-6.6083, 57.7366], [-6.5363, 57.6914],
        [-6.4583, 57.6234], [-6.3803, 57.5554], [-6.3023, 57.4874], [-6.2243, 57.4194],
        [-6.1803, 57.3354], [-6.1583, 57.2514], [-6.1583, 57.1674], [-6.1803, 57.0834],
        [-6.2243, 56.9994], [-6.2903, 56.9374], [-6.3563, 56.8754], [-6.4443, 56.8354],
        [-6.5323, 56.7954], [-6.6203, 56.7774], [-6.7083, 56.7594], [-6.7743, 56.7634],
        [-6.8403, 56.7674], [-6.8843, 56.7954], [-6.9283, 56.8234], [-6.9503, 56.8674],
        [-6.9723, 56.9114], [-6.9723, 56.9594], [-6.9723, 57.0074], [-6.9503, 57.0514],
        [-6.9283, 57.0954], [-6.8843, 57.1234], [-6.8403, 57.1514], [-6.7743, 57.1554],
        [-6.7083, 57.1594], [-6.6423, 57.1794], [-6.5763, 57.1994], [-6.5323, 57.2394],
        [-6.4883, 57.2794], [-6.4663, 57.3234], [-6.4443, 57.3674], [-6.4443, 57.4154],
        [-6.4443, 57.4634], [-6.4663, 57.5074], [-6.4883, 57.5514], [-6.5323, 57.5914],
        [-6.5763, 57.6314], [-6.6423, 57.6554], [-6.7083, 57.6794], [-6.7361, 57.7329]
      ]]
    }
  }
} as const;