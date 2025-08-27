#!/usr/bin/env python3
"""
Detailed walk scraper that extracts full walk information including stages
from WalkHighlands.co.uk individual walk pages.
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
from typing import List, Dict, Optional
from urllib.parse import urljoin

class DetailedWalkScraper:
    def __init__(self):
        self.base_url = "https://www.walkhighlands.co.uk"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
    def get_page(self, url: str) -> Optional[BeautifulSoup]:
        """Fetch and parse a webpage with error handling"""
        try:
            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            return BeautifulSoup(response.content, 'html.parser')
        except requests.RequestException as e:
            print(f"Error fetching {url}: {e}")
            return None
            
    def extract_walk_title(self, soup: BeautifulSoup) -> str:
        """Extract the walk title"""
        # Try different possible title locations
        title_selectors = [
            'h1',
            '.walk-title',
            'title'
        ]
        
        for selector in title_selectors:
            title_elem = soup.select_one(selector)
            if title_elem:
                title = title_elem.get_text().strip()
                # Clean up title (remove site name etc)
                if ' - WalkHighlands' in title:
                    title = title.split(' - WalkHighlands')[0]
                return title
                
        return "Unknown Walk"
        
    def extract_summary(self, soup: BeautifulSoup) -> str:
        """Extract the walk summary/description"""
        # Look for summary section
        summary_elem = soup.find('div', class_='summary')
        if summary_elem:
            return summary_elem.get_text().strip()
            
        # Alternative: look for first paragraph after title
        paragraphs = soup.find_all('p')
        for p in paragraphs:
            text = p.get_text().strip()
            if len(text) > 100:  # Substantial paragraph
                return text
                
        return ""
        
    def extract_grade_info(self, soup: BeautifulSoup) -> Dict[str, any]:
        """Extract difficulty grade and bog factor"""
        grade_info = {
            'difficulty_rating': None,
            'bog_factor': None,
            'overall_rating': None
        }
        
        # Look for grade images or text
        grade_imgs = soup.find_all('img', src=re.compile(r'grade|boot|difficulty'))
        if grade_imgs:
            grade_info['difficulty_rating'] = len(grade_imgs)
            
        # Look for bog factor
        bog_imgs = soup.find_all('img', src=re.compile(r'bog'))
        if bog_imgs:
            grade_info['bog_factor'] = len(bog_imgs)
            
        # Look for overall rating
        rating_elem = soup.find(text=re.compile(r'\d+/5'))
        if rating_elem:
            rating_match = re.search(r'(\d+)/5', rating_elem)
            if rating_match:
                grade_info['overall_rating'] = int(rating_match.group(1))
                
        return grade_info
        
    def extract_walk_stats(self, soup: BeautifulSoup) -> Dict[str, any]:
        """Extract walk statistics (distance, time, ascent, etc.)"""
        stats = {
            'distance': None,
            'time': None,
            'ascent': None,
            'start_grid_ref': None,
            'terrain': None
        }
        
        # Look for statistics table or section
        stats_text = soup.get_text()
        
        # Extract distance
        distance_match = re.search(r'Distance\s*(\d+(?:\.\d+)?)\s*km', stats_text, re.IGNORECASE)
        if distance_match:
            stats['distance'] = float(distance_match.group(1))
        else:
            # Try alternative format
            distance_match = re.search(r'(\d+(?:\.\d+)?)\s*km', stats_text)
            if distance_match:
                stats['distance'] = float(distance_match.group(1))
                
        # Extract time
        time_match = re.search(r'Time\s*(\d+(?:\.\d+)?)\s*-?\s*(\d+(?:\.\d+)?)?(?:\s*hours?)?', stats_text, re.IGNORECASE)
        if time_match:
            if time_match.group(2):
                # Range given, take the higher value
                stats['time'] = float(time_match.group(2))
            else:
                stats['time'] = float(time_match.group(1))
        else:
            # Try alternative format
            time_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)', stats_text, re.IGNORECASE)
            if time_match:
                stats['time'] = float(time_match.group(1))
                
        # Extract ascent
        ascent_match = re.search(r'Ascent\s*(\d+)\s*m', stats_text, re.IGNORECASE)
        if ascent_match:
            stats['ascent'] = int(ascent_match.group(1))
            
        # Extract grid reference
        grid_match = re.search(r'Grid Ref\s*([A-Z]{2}\d{6})', stats_text, re.IGNORECASE)
        if grid_match:
            stats['start_grid_ref'] = grid_match.group(1)
            
        # Extract terrain description
        terrain_elem = soup.find(text=re.compile(r'Terrain', re.IGNORECASE))
        if terrain_elem:
            # Get the next few words/sentences after "Terrain"
            parent = terrain_elem.parent
            if parent:
                terrain_text = parent.get_text()
                terrain_match = re.search(r'Terrain\s*[:\-]?\s*([^\.]+\.?)', terrain_text, re.IGNORECASE)
                if terrain_match:
                    stats['terrain'] = terrain_match.group(1).strip()
                    
        return stats
        
    def extract_stages(self, soup: BeautifulSoup) -> List[Dict[str, str]]:
        """Extract the detailed stage-by-stage walk description"""
        stages = []
        
        # Look for stage headings and descriptions
        stage_pattern = re.compile(r'Stage\s+(\d+)', re.IGNORECASE)
        
        # Find all elements that might contain stage information
        all_text = soup.find_all(string=stage_pattern)
        
        for stage_text in all_text:
            stage_match = stage_pattern.search(stage_text)
            if stage_match:
                stage_num = int(stage_match.group(1))
                
                # Find the parent element and get the description
                parent = stage_text.parent
                if parent:
                    # Look for the description in the same element or next siblings
                    description = ""
                    
                    # Try to get text from current element
                    parent_text = parent.get_text().strip()
                    if len(parent_text) > 20:  # More than just the stage header
                        description = parent_text
                    else:
                        # Look at next siblings for description
                        next_elem = parent.find_next_sibling()
                        if next_elem:
                            description = next_elem.get_text().strip()
                            
                    # Clean up the description
                    description = re.sub(r'Stage\s+\d+\s*', '', description, flags=re.IGNORECASE).strip()
                    
                    if description:
                        stages.append({
                            'stage': stage_num,
                            'description': description
                        })
                        
        # Alternative approach: look for numbered paragraphs
        if not stages:
            paragraphs = soup.find_all('p')
            stage_num = 1
            for p in paragraphs:
                text = p.get_text().strip()
                if len(text) > 50:  # Substantial paragraph
                    # Check if it looks like a stage description
                    if any(word in text.lower() for word in ['follow', 'path', 'track', 'head', 'continue', 'turn']):
                        stages.append({
                            'stage': stage_num,
                            'description': text
                        })
                        stage_num += 1
                        if stage_num > 10:  # Reasonable limit
                            break
                            
        return stages
        
    def extract_coordinates(self, soup: BeautifulSoup, grid_ref: str = None) -> Dict[str, float]:
        """Extract or estimate GPS coordinates"""
        coords = {'latitude': None, 'longitude': None}
        
        # Look for GPS coordinates in the page
        coords_match = re.search(r'(\d+\.\d+),\s*(-?\d+\.\d+)', soup.get_text())
        if coords_match:
            coords['latitude'] = float(coords_match.group(1))
            coords['longitude'] = float(coords_match.group(2))
            
        # If we have grid reference, we could convert it (simplified approximation)
        elif grid_ref:
            # This is a very rough approximation for Scottish grid refs
            # In a real system, you'd use a proper grid reference conversion library
            if grid_ref.startswith('NG'):  # Skye area
                coords['latitude'] = 57.3  # Approximate
                coords['longitude'] = -6.2
            elif grid_ref.startswith('NN'):  # Central Highlands
                coords['latitude'] = 56.8
                coords['longitude'] = -4.5
                
        return coords
        
    def scrape_walk_details(self, walk_url: str) -> Dict:
        """Scrape detailed information from a single walk page"""
        print(f"Scraping: {walk_url}")
        
        soup = self.get_page(walk_url)
        if not soup:
            return None
            
        # Extract all the information
        title = self.extract_walk_title(soup)
        summary = self.extract_summary(soup)
        grade_info = self.extract_grade_info(soup)
        stats = self.extract_walk_stats(soup)
        stages = self.extract_stages(soup)
        coords = self.extract_coordinates(soup, stats.get('start_grid_ref'))
        
        walk_data = {
            'title': title,
            'summary': summary,
            'source_url': walk_url,
            'difficulty_rating': grade_info.get('difficulty_rating'),
            'bog_factor': grade_info.get('bog_factor'),
            'overall_rating': grade_info.get('overall_rating'),
            'distance_km': stats.get('distance'),
            'estimated_hours': stats.get('time'),
            'ascent_m': stats.get('ascent'),
            'start_grid_ref': stats.get('start_grid_ref'),
            'terrain': stats.get('terrain'),
            'latitude': coords.get('latitude'),
            'longitude': coords.get('longitude'),
            'stages': stages,
            'scraped_at': time.time()
        }
        
        return walk_data
        
    def load_walk_urls(self, source_file: str = "popular_scottish_walks.json") -> List[str]:
        """Load walk URLs from our scraped data"""
        try:
            with open(source_file, 'r', encoding='utf-8') as f:
                walks_data = json.load(f)
            
            urls = []
            for walk in walks_data:
                if 'source_url' in walk and walk['source_url']:
                    urls.append(walk['source_url'])
                    
            print(f"Loaded {len(urls)} walk URLs from {source_file}")
            return urls
            
        except FileNotFoundError:
            print(f"Could not find {source_file}")
            return []
        except Exception as e:
            print(f"Error loading walk URLs: {e}")
            return []

    def scrape_walks_batch(self, urls: List[str], batch_size: int = 15, start_index: int = 0) -> List[Dict]:
        """Scrape walks in batches with progress tracking and error handling"""
        detailed_walks = []
        total_urls = len(urls)
        
        print(f"Starting batch scraping: {len(urls)} URLs, batch size {batch_size}")
        print(f"Starting from index {start_index}")
        
        for i in range(start_index, total_urls, batch_size):
            batch_end = min(i + batch_size, total_urls)
            batch_urls = urls[i:batch_end]
            
            print(f"\n--- Batch {i//batch_size + 1}: URLs {i+1}-{batch_end} of {total_urls} ---")
            
            batch_walks = []
            for j, url in enumerate(batch_urls):
                try:
                    print(f"  [{i+j+1:3d}/{total_urls:3d}] {url}")
                    
                    walk_data = self.scrape_walk_details(url)
                    if walk_data:
                        batch_walks.append(walk_data)
                        print(f"    ✓ Success: {walk_data['title'][:50]}...")
                    else:
                        print(f"    ✗ Failed to scrape walk data")
                        
                except Exception as e:
                    print(f"    ✗ Error: {e}")
                    continue
                    
                # Be respectful to the server
                time.sleep(2.5)
                
            detailed_walks.extend(batch_walks)
            
            # Save progress after each batch
            if batch_walks:
                batch_filename = f"detailed_walks_batch_{i//batch_size + 1}.json"
                with open(batch_filename, 'w', encoding='utf-8') as f:
                    json.dump(batch_walks, f, indent=2, ensure_ascii=False)
                print(f"  Saved {len(batch_walks)} walks to {batch_filename}")
                
            # Longer pause between batches
            if batch_end < total_urls:
                print(f"  Waiting 10 seconds before next batch...")
                time.sleep(10)
                
        print(f"\nCompleted scraping {len(detailed_walks)} walks successfully")
        return detailed_walks

    def scrape_priority_walks(self) -> List[Dict]:
        """Scrape priority walks first (Skye, Ben Nevis area, Glen Coe, Cairngorms)"""
        all_urls = self.load_walk_urls()
        
        # Priority keywords for first batch
        priority_keywords = [
            'skye',
            'storr', 
            'quiraing',
            'nevis',
            'glencoe',
            'ben-',
            'cuillin',
            'cairngorms',
            'fairy'
        ]
        
        priority_urls = []
        remaining_urls = []
        
        for url in all_urls:
            is_priority = any(keyword in url.lower() for keyword in priority_keywords)
            if is_priority:
                priority_urls.append(url)
            else:
                remaining_urls.append(url)
                
        print(f"Found {len(priority_urls)} priority walks")
        print(f"Remaining {len(remaining_urls)} walks")
        
        return self.scrape_walks_batch(priority_urls, batch_size=10)

    def scrape_sample_walks(self) -> List[Dict]:
        """Scrape a sample of detailed walks for testing"""
        # Sample URLs for testing
        sample_urls = [
            'https://www.walkhighlands.co.uk/skye/dun-ardtreck.shtml',
            'https://www.walkhighlands.co.uk/skye/fairyglen.shtml', 
            'https://www.walkhighlands.co.uk/skye/neistpoint.shtml',
            'https://www.walkhighlands.co.uk/fortwilliam/achriabhach.shtml',
            'https://www.walkhighlands.co.uk/cairngorms/loch-vaa.shtml'
        ]
        
        return self.scrape_walks_batch(sample_urls, batch_size=5)

def main():
    import sys
    
    scraper = DetailedWalkScraper()
    
    # Command line argument for different modes
    mode = 'sample'  # default
    if len(sys.argv) > 1:
        mode = sys.argv[1]
    
    if mode == 'priority':
        print("Scraping PRIORITY walks (Skye, Ben Nevis, Glen Coe, Cairngorms)...")
        walks = scraper.scrape_priority_walks()
        output_file = 'detailed_walks_priority.json'
        
    elif mode == 'all':
        print("Scraping ALL 120 walks in batches...")
        all_urls = scraper.load_walk_urls()
        walks = scraper.scrape_walks_batch(all_urls, batch_size=15)
        output_file = 'detailed_walks_all.json'
        
    elif mode == 'batch':
        # Get batch parameters from command line
        start_idx = int(sys.argv[2]) if len(sys.argv) > 2 else 0
        batch_size = int(sys.argv[3]) if len(sys.argv) > 3 else 20
        
        print(f"Scraping BATCH starting at {start_idx}, batch size {batch_size}...")
        all_urls = scraper.load_walk_urls()
        walks = scraper.scrape_walks_batch(all_urls, batch_size=batch_size, start_index=start_idx)
        output_file = f'detailed_walks_batch_{start_idx}_{start_idx + batch_size}.json'
        
    else:  # sample mode
        print("Scraping SAMPLE walks for testing...")
        walks = scraper.scrape_sample_walks()
        output_file = 'detailed_walks_sample.json'
    
    print(f"\nScraped {len(walks)} detailed walks")
    
    if walks:
        # Save to JSON
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(walks, f, indent=2, ensure_ascii=False)
            
        print(f"Saved to {output_file}")
        
        # Show summary statistics
        stages_count = [len(walk.get('stages', [])) for walk in walks]
        avg_stages = sum(stages_count) / len(stages_count) if stages_count else 0
        
        print(f"\nSummary:")
        print(f"- Total walks: {len(walks)}")
        print(f"- Average stages per walk: {avg_stages:.1f}")
        print(f"- Walks with stages: {len([w for w in walks if w.get('stages')])}")
        
        # Show sample walks
        print(f"\nFirst few walks:")
        for i, walk in enumerate(walks[:3]):
            print(f"{i+1}. {walk['title']} - {len(walk.get('stages', []))} stages")
            
    else:
        print("No walks were successfully scraped!")

if __name__ == "__main__":
    main()