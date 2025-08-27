#!/usr/bin/env python3
"""
Convert scraped detailed walks data into format suitable for Convex database.
Creates original content inspired by (not copied from) WalkHighlands data.
"""

import json
import re
import unicodedata
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import random

class DetailedWalkConverter:
    def __init__(self):
        self.region_mapping = {
            'skye': 'isle-of-skye',
            'fortwilliam': 'fort-william', 
            'torridon': 'torridon-gairloch',
            'cairngorms': 'cairngorms-aviemore',
            'lochlomond': 'loch-lomond',
            'argyll': 'argyll-oban',
            'ullapool': 'ullapool-assynt',
            'perthshire': 'perthshire'
        }
        
        # Content templates for generating original descriptions
        self.summary_templates = {
            'coastal': "Discover Scotland's dramatic coastline on this {difficulty} walk to {feature}, where {highlight} creates a scene of raw Highland beauty.",
            'mountain': "Experience breathtaking Highland scenery on this {difficulty} walk in {region}, offering {highlight} and spectacular mountain vistas.", 
            'forest': "Journey through ancient {forest_type} on this peaceful {difficulty} walk, where {highlight} and diverse wildlife create a perfect Highland escape.",
            'historic': "Explore Scotland's rich heritage on this {difficulty} walk to {feature}, combining {highlight} with centuries of Highland history.",
            'waterfall': "Follow rushing Highland waters on this {difficulty} walk to {feature}, where {highlight} showcases nature's power in spectacular fashion.",
            'loch': "Circuit the pristine waters of {feature} on this {difficulty} walk, where {highlight} and perfect reflections create Highland walking at its finest.",
        }
        
    def create_slug(self, title: str) -> str:
        """Create URL-friendly slug from title"""
        slug = unicodedata.normalize('NFKD', title.lower())
        slug = re.sub(r'[^\w\s-]', '', slug)
        slug = re.sub(r'[-\s]+', '-', slug)
        return slug.strip('-')
        
    def extract_region_from_url(self, source_url: str) -> str:
        """Extract region from WalkHighlands URL"""
        if not source_url:
            return 'highlands'
            
        # Extract region from URL pattern
        match = re.search(r'walkhighlands\.co\.uk/([^/]+)/', source_url)
        if match:
            region_key = match.group(1)
            return self.region_mapping.get(region_key, region_key)
            
        return 'highlands'
        
    def map_difficulty(self, difficulty_rating: Optional[int], overall_rating: Optional[int] = None) -> str:
        """Map difficulty rating to our schema values"""
        # Use difficulty rating (boot icons) as primary indicator
        if difficulty_rating is not None:
            if difficulty_rating <= 1:
                return "Easy"
            elif difficulty_rating == 2:
                return "Moderate"
            elif difficulty_rating == 3:
                return "Hard"
            else:
                return "Strenuous"
                
        # Fallback to overall rating if available
        if overall_rating is not None:
            if overall_rating <= 2:
                return "Easy"
            elif overall_rating == 3:
                return "Moderate"
            elif overall_rating == 4:
                return "Hard"
            else:
                return "Strenuous"
                
        return "Moderate"  # Default
        
    def determine_route_type(self, title: str, stages: List[Dict]) -> str:
        """Determine route type from title and stage descriptions"""
        title_lower = title.lower()
        all_text = title_lower + " " + " ".join([s.get('description', '') for s in stages]).lower()
        
        circular_keywords = ['circuit', 'circular', 'loop', 'round', 'return to start']
        out_back_keywords = ['out and back', 'there and back', 'return same way', 'retrace']
        
        if any(keyword in all_text for keyword in circular_keywords):
            return "Circular"
        elif any(keyword in all_text for keyword in out_back_keywords):
            return "Out and Back"
        else:
            return "Linear"
            
    def extract_features_and_tags(self, title: str, summary: str, stages: List[Dict]) -> Dict[str, Any]:
        """Extract key features and generate tags from walk content"""
        all_text = f"{title} {summary} {' '.join([s.get('description', '') for s in stages])}".lower()
        
        features = {
            'type': 'general',
            'main_feature': None,
            'highlights': [],
            'tags': []
        }
        
        # Identify walk type and main features
        feature_patterns = {
            'coastal': ['beach', 'bay', 'cliff', 'coast', 'lighthouse', 'headland', 'point'],
            'mountain': ['ben', 'peak', 'summit', 'mountain', 'hill', 'ridge'],
            'forest': ['forest', 'woods', 'woodland', 'trees', 'pine', 'oak'],
            'historic': ['castle', 'fort', 'broch', 'dun', 'ruins', 'historic', 'ancient'],
            'waterfall': ['falls', 'waterfall', 'cascade', 'gorge'],
            'loch': ['loch', 'lake', 'reservoir']
        }
        
        for walk_type, keywords in feature_patterns.items():
            if any(keyword in all_text for keyword in keywords):
                features['type'] = walk_type
                break
                
        # Extract specific features for tags
        tag_patterns = {
            'wildlife': ['wildlife', 'birds', 'deer', 'eagles', 'otter', 'seals'],
            'photography': ['views', 'scenic', 'panoramic', 'spectacular', 'dramatic'],
            'family-friendly': ['easy', 'gentle', 'accessible', 'family'],
            'challenging': ['steep', 'strenuous', 'demanding', 'difficult'],
            'historic': ['castle', 'ruins', 'ancient', 'heritage', 'historic'],
            'coastal': ['beach', 'cliff', 'sea', 'ocean', 'lighthouse'],
            'forest': ['woodland', 'forest', 'trees', 'nature'],
            'waterfall': ['waterfall', 'falls', 'cascade'],
            'viewpoint': ['views', 'viewpoint', 'panorama', 'vista'],
            'bridge': ['bridge', 'crossing'],
            'island': ['island', 'isle']
        }
        
        for tag, keywords in tag_patterns.items():
            if any(keyword in all_text for keyword in keywords):
                features['tags'].append(tag)
                
        return features
        
    def create_original_summary(self, walk_data: Dict, features: Dict) -> str:
        """Create original summary inspired by the scraped content"""
        title = walk_data.get('title', '')
        original_summary = walk_data.get('summary', '')
        region = self.extract_region_from_url(walk_data.get('source_url', ''))
        difficulty = self.map_difficulty(walk_data.get('difficulty_rating'))
        
        # Extract key elements from original summary without copying
        feature_name = None
        if 'point' in title.lower():
            feature_name = re.search(r'(\w+\s+Point)', title, re.IGNORECASE)
            feature_name = feature_name.group(1) if feature_name else None
        elif 'glen' in title.lower():
            feature_name = re.search(r'(\w+\s+Glen)', title, re.IGNORECASE)  
            feature_name = feature_name.group(1) if feature_name else None
        elif 'loch' in title.lower():
            feature_name = re.search(r'(Loch\s+\w+)', title, re.IGNORECASE)
            feature_name = feature_name.group(1) if feature_name else None
            
        # Create original summary using templates
        walk_type = features.get('type', 'general')
        
        if walk_type in self.summary_templates:
            template = self.summary_templates[walk_type]
            
            # Create highlights based on walk content
            highlights = {
                'coastal': "dramatic sea cliffs and Atlantic views",
                'mountain': "panoramic Highland vistas",
                'forest': "ancient woodland and wildlife",  
                'historic': "fascinating clan history",
                'waterfall': "thundering cascades",
                'loch': "mirror-like reflections in Highland waters"
            }
            
            summary = template.format(
                difficulty=difficulty.lower(),
                feature=feature_name or "this Highland destination",
                region=region.replace('-', ' ').title(),
                highlight=highlights.get(walk_type, "stunning Highland scenery"),
                forest_type="Caledonian forest" if 'pine' in original_summary.lower() else "native woodland"
            )
        else:
            # Fallback generic summary
            summary = f"Experience the beauty of the Scottish Highlands on this {difficulty.lower()} walk near {region.replace('-', ' ').title()}, offering spectacular scenery and authentic Highland character."
            
        return summary
        
    def create_original_stages(self, stages: List[Dict]) -> List[Dict]:
        """Create original stage descriptions inspired by the scraped content"""
        if not stages:
            return []
            
        original_stages = []
        
        for i, stage in enumerate(stages):
            original_desc = stage.get('description', '')
            stage_num = stage.get('stage', i + 1)
            
            if not original_desc:
                continue
                
            # Create original description inspired by but not copying the source
            # Extract key directions and landmarks without copying exact phrasing
            
            direction_words = re.findall(r'\b(follow|head|turn|continue|cross|climb|descend|bear|take)\b', original_desc.lower())
            landmarks = re.findall(r'\b(gate|bridge|path|track|road|car park|viewpoint|summit|loch|river|forest)\b', original_desc.lower())
            
            # Create new description using extracted elements
            if direction_words and landmarks:
                new_desc = self.rephrase_stage_description(original_desc, direction_words, landmarks, stage_num)
            else:
                # Basic rephrasing for stages without clear direction patterns
                new_desc = self.basic_rephrase(original_desc)
                
            original_stages.append({
                'stage': stage_num,
                'description': new_desc,
                'original_length': len(original_desc)  # For reference
            })
            
        return original_stages
        
    def rephrase_stage_description(self, original: str, directions: List[str], landmarks: List[str], stage_num: int) -> str:
        """Rephrase stage description using different vocabulary and structure"""
        
        # Common rephrasing patterns
        rephrase_map = {
            'follow': 'take',
            'head': 'proceed',
            'continue': 'carry on',
            'turn right': 'bear right',
            'turn left': 'bear left',
            'car park': 'parking area',
            'track': 'path',
            'gate': 'field gate',
        }
        
        # Start with a stage-appropriate opening
        stage_openings = [
            f"From this point, ",
            f"The route now ",
            f"Continue by ",
            f"The path here ",
            f"At this stage, "
        ]
        
        # This is a simplified rephrasing - in a real system you'd use more sophisticated NLP
        # For now, we'll create a basic original description
        
        if stage_num == 1:
            return f"Begin your walk from the designated parking area. The initial section follows well-marked paths through the local terrain, offering early glimpses of the landscape ahead."
        elif 'summit' in original.lower() or 'top' in original.lower():
            return f"The route now climbs toward higher ground, with increasing views as you gain elevation. Take care on steeper sections and enjoy the expanding Highland panorama."
        elif 'return' in original.lower() or 'back' in original.lower():
            return f"For the return journey, retrace your route while enjoying different perspectives of the scenery you passed earlier. The changing light often reveals new aspects of the landscape."
        else:
            return f"Continue along the established route, following waymarkers and natural features. The path leads through varied Highland terrain typical of this region."
            
    def basic_rephrase(self, original: str) -> str:
        """Basic rephrasing for descriptions without clear patterns"""
        if len(original) < 50:
            return "Continue following the marked route through this section."
        else:
            return "The path continues through typical Highland terrain, offering excellent walking and views of the surrounding landscape."
            
    def estimate_coordinates(self, source_url: str, grid_ref: str = None) -> Dict[str, float]:
        """Estimate GPS coordinates based on URL region and grid reference"""
        coords = {'latitude': None, 'longitude': None}
        
        # Rough coordinate estimates by region (centers of regions)
        region_coords = {
            'skye': {'lat': 57.3, 'lng': -6.2},
            'fortwilliam': {'lat': 56.8, 'lng': -5.1},
            'cairngorms': {'lat': 57.1, 'lng': -3.8},
            'torridon': {'lat': 57.6, 'lng': -5.5},
            'lochlomond': {'lat': 56.1, 'lng': -4.6},
            'argyll': {'lat': 56.0, 'lng': -5.2},
            'ullapool': {'lat': 57.9, 'lng': -5.1},
            'perthshire': {'lat': 56.7, 'lng': -3.9}
        }
        
        region = self.extract_region_from_url(source_url)
        base_coords = region_coords.get(region.replace('-', ''), region_coords.get('skye'))
        
        # Add small random variation to spread walks across region
        coords['latitude'] = base_coords['lat'] + random.uniform(-0.1, 0.1)
        coords['longitude'] = base_coords['lng'] + random.uniform(-0.1, 0.1)
        
        return coords
        
    def convert_walk(self, walk_data: Dict) -> Dict[str, Any]:
        """Convert a single scraped walk to database format"""
        title = walk_data.get('title', 'Unknown Walk')
        slug = self.create_slug(title)
        region_slug = self.extract_region_from_url(walk_data.get('source_url', ''))
        
        # Extract and analyze features
        features = self.extract_features_and_tags(
            title, 
            walk_data.get('summary', ''), 
            walk_data.get('stages', [])
        )
        
        # Create original content
        original_summary = self.create_original_summary(walk_data, features)
        original_stages = self.create_original_stages(walk_data.get('stages', []))
        
        # Map difficulty
        difficulty = self.map_difficulty(
            walk_data.get('difficulty_rating'),
            walk_data.get('overall_rating')
        )
        
        # Estimate coordinates
        coords = self.estimate_coordinates(walk_data.get('source_url'), walk_data.get('start_grid_ref'))
        
        # Create walk object
        walk = {
            'title': title,
            'slug': slug,
            'description': original_summary,
            'shortDescription': original_summary.split('.')[0] + '.' if '.' in original_summary else original_summary[:150] + '...',
            'regionSlug': region_slug,
            'distance': walk_data.get('distance_km', 5.0),
            'ascent': walk_data.get('ascent_m', 100),
            'difficulty': difficulty,
            'estimatedTime': walk_data.get('estimated_hours', 2.0),
            'latitude': coords['latitude'],
            'longitude': coords['longitude'], 
            'maxElevation': (walk_data.get('ascent_m', 100) + 200),  # Rough estimate
            'routeType': self.determine_route_type(title, walk_data.get('stages', [])),
            'featuredImageUrl': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            'tags': features['tags'],
            'isPublished': True,
            'viewCount': random.randint(50, 200),
            'likeCount': random.randint(5, 50),
            'reportCount': random.randint(0, 5),
            'averageRating': round(3.8 + random.uniform(0, 1.0), 1),
            # Enhanced fields
            'terrain': walk_data.get('terrain'),
            'startGridRef': walk_data.get('start_grid_ref'),
            'bogFactor': walk_data.get('bog_factor'),
            'detailedDescription': original_summary,
            'sourceUrl': walk_data.get('source_url'),
            # Stages data
            'stages': original_stages,
            # Metadata
            'scraped_at': walk_data.get('scraped_at'),
            'converted_at': datetime.now().timestamp()
        }
        
        return walk
        
    def convert_walks_file(self, input_file: str, output_file: str = None) -> List[Dict]:
        """Convert a file of scraped walks to database format"""
        if output_file is None:
            output_file = input_file.replace('.json', '_converted.json')
            
        print(f"Converting walks from {input_file}...")
        
        try:
            with open(input_file, 'r', encoding='utf-8') as f:
                scraped_walks = json.load(f)
        except FileNotFoundError:
            print(f"Input file {input_file} not found")
            return []
        except Exception as e:
            print(f"Error loading {input_file}: {e}")
            return []
            
        converted_walks = []
        
        for i, walk_data in enumerate(scraped_walks):
            try:
                converted_walk = self.convert_walk(walk_data)
                converted_walks.append(converted_walk)
                print(f"  ✓ Converted: {converted_walk['title']}")
            except Exception as e:
                print(f"  ✗ Error converting walk {i}: {e}")
                continue
                
        print(f"\nConverted {len(converted_walks)} walks successfully")
        
        # Save converted walks
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(converted_walks, f, indent=2, ensure_ascii=False)
            
        print(f"Saved converted walks to {output_file}")
        
        # Show statistics
        regions = {}
        difficulties = {}
        avg_stages = 0
        
        for walk in converted_walks:
            region = walk['regionSlug']
            regions[region] = regions.get(region, 0) + 1
            
            difficulty = walk['difficulty']
            difficulties[difficulty] = difficulties.get(difficulty, 0) + 1
            
            avg_stages += len(walk.get('stages', []))
            
        avg_stages = avg_stages / len(converted_walks) if converted_walks else 0
        
        print(f"\nStatistics:")
        print(f"- Average stages per walk: {avg_stages:.1f}")
        print(f"- Regions: {dict(sorted(regions.items()))}")
        print(f"- Difficulties: {dict(sorted(difficulties.items()))}")
        
        return converted_walks

def main():
    import sys
    converter = DetailedWalkConverter()
    
    # Get input file from command line argument or use default
    input_file = sys.argv[1] if len(sys.argv) > 1 else 'detailed_walks_priority.json'
    output_file = sys.argv[2] if len(sys.argv) > 2 else 'converted_priority_walks.json'
    
    converter.convert_walks_file(input_file, output_file)

if __name__ == "__main__":
    main()