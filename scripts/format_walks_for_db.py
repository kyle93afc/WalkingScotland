#!/usr/bin/env python3
"""
Format scraped WalkHighlands data for insertion into Convex database.
"""

import json
import re
from typing import List, Dict, Any
import unicodedata

def create_slug(title: str) -> str:
    """Create URL-friendly slug from title"""
    # Normalize unicode characters
    slug = unicodedata.normalize('NFKD', title)
    # Convert to lowercase and replace spaces/special chars with hyphens
    slug = re.sub(r'[^\w\s-]', '', slug.lower())
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug.strip('-')

def map_region_name(region: str) -> str:
    """Map scraped region names to our database region slugs"""
    region_mapping = {
        'Skye': 'isle-of-skye',
        'Fortwilliam': 'fort-william', 
        'Torridon': 'torridon-gairloch',
        'Cairngorms': 'cairngorms-aviemore',
        'Lochlomond': 'loch-lomond',
        'Argyll': 'argyll-oban',
        'Ullapool': 'ullapool-assynt',
        'Perthshire': 'perthshire'
    }
    
    return region_mapping.get(region, region.lower().replace(' ', '-'))

def map_difficulty(difficulty_level: int, difficulty_desc: str) -> str:
    """Map difficulty to our schema values"""
    if difficulty_level <= 1:
        return "Easy"
    elif difficulty_level == 2:
        return "Moderate"  
    elif difficulty_level == 3:
        return "Hard"
    else:
        return "Strenuous"

def extract_route_type(title: str, description: str) -> str:
    """Determine route type from title and description"""
    title_lower = title.lower()
    desc_lower = description.lower()
    
    if any(word in title_lower or word in desc_lower for word in ['circuit', 'circular', 'loop', 'round']):
        return "Circular"
    elif any(word in title_lower or word in desc_lower for word in ['out and back', 'return', 'there and back']):
        return "Out and Back"
    else:
        return "Linear"

def generate_tags(title: str, region: str, difficulty: str, distance_km: float) -> List[str]:
    """Generate relevant tags for a walk"""
    tags = []
    
    title_lower = title.lower()
    
    # Distance-based tags
    if distance_km and distance_km <= 3:
        tags.append("short-walk")
    elif distance_km and distance_km >= 10:
        tags.append("long-distance")
        
    # Family-friendly (easy + short)
    if difficulty == "Easy" and distance_km and distance_km <= 5:
        tags.append("family-friendly")
    
    # Feature-based tags from title
    feature_tags = {
        'beach': ['beach', 'coastal'],
        'bay': ['beach', 'coastal'],
        'castle': ['historic', 'castle'],
        'waterfall': ['waterfall'],
        'falls': ['waterfall'],
        'loch': ['loch'],
        'glen': ['glen'],
        'forest': ['forest'],
        'wood': ['forest'],  
        'trail': ['trail'],
        'island': ['island'],
        'lighthouse': ['lighthouse'],
        'quarry': ['historic', 'industrial'],
        'bridge': ['bridge'],
        'village': ['historic'],
        'church': ['historic'],
        'hide': ['wildlife'],
        'reserve': ['wildlife'],
        'hill': ['hill'],
        'mountain': ['mountain'],
    }
    
    for keyword, tag_list in feature_tags.items():
        if keyword in title_lower:
            tags.extend(tag_list)
    
    # Region-based tags
    if 'skye' in region.lower():
        tags.append('skye')
    elif 'cairngorms' in region.lower():
        tags.append('cairngorms')
    elif 'torridon' in region.lower():
        tags.append('torridon')
    
    # Remove duplicates and return
    return list(set(tags))

def estimate_ascent(distance_km: float, difficulty: str) -> int:
    """Estimate ascent based on distance and difficulty (rough approximation)"""
    if not distance_km:
        return 50
        
    base_ascent_per_km = {
        "Easy": 25,      # 25m per km
        "Moderate": 75,  # 75m per km  
        "Hard": 125,     # 125m per km
        "Strenuous": 200 # 200m per km
    }
    
    ascent_rate = base_ascent_per_km.get(difficulty, 50)
    estimated_ascent = int(distance_km * ascent_rate)
    
    # Add some variation to make it more realistic
    return min(max(estimated_ascent, 10), 2000)  # Cap between 10m and 2000m

def generate_enhanced_description(walk: Dict) -> str:
    """Generate an enhanced description for the walk"""
    title = walk['title']
    region = walk['region']
    difficulty = walk['difficulty']
    distance = walk.get('distance_km', 0)
    
    # Base description
    base_desc = walk.get('description', f"A {difficulty.lower()} walk in {region}")
    
    # Add more context
    enhanced_parts = [base_desc]
    
    if distance:
        if distance <= 2:
            enhanced_parts.append(f"This short {distance:.1f}km walk is perfect for a quick outdoor adventure.")
        elif distance <= 5:
            enhanced_parts.append(f"At {distance:.1f}km, this walk offers a good balance of exercise and scenery.")
        else:
            enhanced_parts.append(f"This {distance:.1f}km walk provides a substantial outdoor challenge.")
    
    # Add regional context
    region_contexts = {
        'isle-of-skye': "Located on Scotland's most dramatic island, this walk showcases Skye's unique geological formations and breathtaking landscapes.",
        'fort-william': "In the shadow of Ben Nevis, this walk is part of Scotland's outdoor capital, offering Highland drama and natural beauty.",
        'torridon-gairloch': "Set in the heart of the northwest Highlands, this route features ancient sandstone peaks and pristine wilderness.",
        'cairngorms-aviemore': "Within Britain's largest national park, this walk combines ancient forests, wildlife, and Highland scenery.",
        'loch-lomond': "Near Scotland's most famous loch, this walk offers accessible Highland beauty close to major population centers.",
        'argyll-oban': "In Argyll's diverse landscape of sea lochs and hills, this walk showcases western Scotland's maritime Highland character.",
        'ullapool-assynt': "In Scotland's geological wonderland, this walk features some of the country's oldest rocks and most unique landscapes.",
        'perthshire': "In the gateway to the Highlands, this walk combines accessibility with genuine Highland character and history."
    }
    
    region_slug = map_region_name(region)
    if region_slug in region_contexts:
        enhanced_parts.append(region_contexts[region_slug])
    
    return "\n\n".join(enhanced_parts)

def format_walks_for_database(input_file: str = "popular_scottish_walks.json", output_file: str = "formatted_walks.json") -> None:
    """Format scraped walks for database insertion"""
    
    with open(input_file, 'r', encoding='utf-8') as f:
        scraped_walks = json.load(f)
    
    formatted_walks = []
    
    print(f"Processing {len(scraped_walks)} walks...")
    
    for i, walk in enumerate(scraped_walks):
        try:
            # Basic info
            title = walk.get('title', '').strip()
            if not title:
                print(f"Skipping walk {i} - no title")
                continue
            
            region = walk.get('region', '').strip()
            distance_km = walk.get('distance_km', 0) or 0
            duration_minutes = walk.get('duration_minutes', 0) or 0
            
            # Convert duration from minutes to hours
            estimated_time = max(0.5, duration_minutes / 60) if duration_minutes > 0 else max(1.0, distance_km * 0.3)
            
            # Difficulty mapping
            difficulty_level = walk.get('difficulty_level', 1)
            difficulty_desc = walk.get('difficulty', 'Easy')
            difficulty = map_difficulty(difficulty_level, difficulty_desc)
            
            # Generate enhanced content
            slug = create_slug(title)
            region_slug = map_region_name(region)
            route_type = extract_route_type(title, walk.get('description', ''))
            tags = generate_tags(title, region, difficulty, distance_km)
            enhanced_description = generate_enhanced_description(walk)
            
            # Generate short description
            short_description = enhanced_description.split('.')[0] + '.' if '.' in enhanced_description else enhanced_description[:100] + '...'
            
            # Estimate ascent and elevation
            ascent = estimate_ascent(distance_km, difficulty)
            max_elevation = min(ascent + 100, 1500)  # Rough elevation estimate
            
            # Create formatted walk
            formatted_walk = {
                "title": title,
                "slug": slug,
                "description": enhanced_description,
                "shortDescription": short_description,
                "regionSlug": region_slug,  # Will be mapped to regionId during insertion
                "distance": max(0.1, distance_km),  # Minimum 0.1km
                "ascent": ascent,
                "difficulty": difficulty,
                "estimatedTime": round(estimated_time, 1),
                "latitude": 57.0 + (i * 0.001),  # Placeholder coordinates - spread across Scotland
                "longitude": -4.0 - (i * 0.001),
                "maxElevation": max_elevation,
                "routeType": route_type,
                "featuredImageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
                "tags": tags,
                "isPublished": True,
                "publishedAt": f"Date.now() - {i * 3600000}",  # Spread over time
                "viewCount": max(1, 50 - i),  # Decreasing view counts
                "likeCount": max(0, 15 - (i // 5)),
                "reportCount": max(0, 2 - (i // 20)),
                "averageRating": round(4.0 + (0.5 * (1 - i / len(scraped_walks))), 1),
                "sourceUrl": walk.get('source_url', ''),
                "originalRegion": region
            }
            
            formatted_walks.append(formatted_walk)
            
        except Exception as e:
            print(f"Error processing walk {i} ({walk.get('title', 'Unknown')}): {e}")
            continue
    
    print(f"Successfully formatted {len(formatted_walks)} walks")
    
    # Group by region for summary
    region_counts = {}
    for walk in formatted_walks:
        region = walk['regionSlug']
        region_counts[region] = region_counts.get(region, 0) + 1
    
    print("\nWalks by region:")
    for region, count in sorted(region_counts.items()):
        print(f"  {region}: {count} walks")
    
    # Save formatted walks
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(formatted_walks, f, indent=2, ensure_ascii=False)
    
    print(f"\nFormatted walks saved to {output_file}")
    
    # Show some examples
    print("\nSample formatted walks:")
    for walk in formatted_walks[:3]:
        print(f"- {walk['title']} ({walk['regionSlug']}) - {walk['difficulty']}, {walk['distance']}km, {walk['estimatedTime']}h")
        print(f"  Tags: {', '.join(walk['tags'])}")
        print(f"  Description: {walk['shortDescription']}")
        print()

if __name__ == "__main__":
    format_walks_for_database()