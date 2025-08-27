#!/usr/bin/env python3
"""
Web scraper to extract popular Scottish walking routes from WalkHighlands.co.uk
Focuses on high-priority regions for Phase 1 launch.
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
from urllib.parse import urljoin, urlparse
from typing import List, Dict, Optional

class WalkHighlandsScraper:
    def __init__(self):
        self.base_url = "https://www.walkhighlands.co.uk"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        # Priority regions for Phase 1 (most popular/tourism hotspots)
        self.priority_regions = [
            'skye',           # Most popular Scottish island
            'fortwilliam',    # Ben Nevis area (correct name)
            'torridon',       # Dramatic Highland scenery
            'cairngorms',     # National park
            'lochlomond',     # Popular and accessible
            'argyll',         # Includes Glencoe area
            'ullapool',       # Wild Highland beauty
            'perthshire',     # Southern Highlands
        ]
        
    def get_page(self, url: str) -> Optional[BeautifulSoup]:
        """Fetch and parse a webpage with error handling"""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return BeautifulSoup(response.content, 'html.parser')
        except requests.RequestException as e:
            print(f"Error fetching {url}: {e}")
            return None
            
    def extract_difficulty(self, difficulty_cell) -> Dict[str, any]:
        """Extract difficulty rating from boot icons"""
        boot_imgs = difficulty_cell.find_all('img', src=re.compile(r'boot\.gif'))
        difficulty_level = len(boot_imgs)
        
        # Convert to our difficulty scale
        difficulty_map = {
            1: "Easy",
            2: "Moderate", 
            3: "Challenging",
            4: "Hard",
            5: "Very Hard"
        }
        
        return {
            'level': difficulty_level,
            'description': difficulty_map.get(difficulty_level, "Unknown")
        }
        
    def parse_duration(self, duration_str: str) -> Optional[int]:
        """Parse duration string to minutes"""
        if not duration_str:
            return None
            
        duration_str = duration_str.lower().strip()
        
        # Handle various formats like "3 hours", "1.5 hours", "45 mins", "2 days"
        if 'day' in duration_str:
            days = re.search(r'(\d+(?:\.\d+)?)', duration_str)
            if days:
                return int(float(days.group(1)) * 24 * 60)  # days to minutes
                
        if 'hour' in duration_str:
            hours = re.search(r'(\d+(?:\.\d+)?)', duration_str)
            if hours:
                return int(float(hours.group(1)) * 60)  # hours to minutes
                
        if 'min' in duration_str:
            mins = re.search(r'(\d+)', duration_str)
            if mins:
                return int(mins.group(1))
                
        return None
        
    def parse_distance(self, distance_str: str) -> Optional[float]:
        """Parse distance string to kilometers"""
        if not distance_str:
            return None
            
        distance_match = re.search(r'(\d+(?:\.\d+)?)', distance_str.replace(',', '.'))
        if distance_match:
            return float(distance_match.group(1))
        return None
        
    def get_region_walks(self, region: str) -> List[Dict]:
        """Get all walks from a specific region"""
        walks = []
        
        # Try different possible URL patterns for region pages
        possible_urls = [
            f"{self.base_url}/{region}",
            f"{self.base_url}/{region}.shtml", 
            f"{self.base_url}/{region}/index.shtml"
        ]
        
        region_soup = None
        for url in possible_urls:
            region_soup = self.get_page(url)
            if region_soup:
                print(f"Successfully accessed {region} at {url}")
                break
                
        if not region_soup:
            print(f"Could not access region page for {region}")
            return walks
            
        # Look for sub-region links (like skye/cuillin.shtml)
        subregion_links = []
        for link in region_soup.find_all('a', href=True):
            href = link['href']
            if href.endswith('.shtml') and '/' not in href.lstrip('./'):
                full_url = urljoin(f"{self.base_url}/{region}/", href)
                subregion_links.append(full_url)
                
        # If no subregion links found, try to parse walks directly from region page
        if not subregion_links:
            walks.extend(self.parse_walks_from_page(region_soup, region))
        else:
            # Parse walks from each subregion
            for subregion_url in subregion_links[:5]:  # Limit to avoid overloading
                print(f"Parsing subregion: {subregion_url}")
                subregion_soup = self.get_page(subregion_url)
                if subregion_soup:
                    walks.extend(self.parse_walks_from_page(subregion_soup, region))
                time.sleep(1)  # Be respectful to the server
                
        return walks
        
    def parse_walks_from_page(self, soup: BeautifulSoup, region: str) -> List[Dict]:
        """Parse walk information from a page"""
        walks = []
        
        # Look for table rows containing walk information
        tables = soup.find_all('table')
        
        for table in tables:
            rows = table.find_all('tr')
            
            for row in rows:
                cells = row.find_all(['td', 'th'])
                if len(cells) < 3:  # Need at least name, difficulty, distance
                    continue
                    
                # Skip header rows
                if any(cell.find('th') or 'Walk Name' in cell.get_text() for cell in cells):
                    continue
                    
                try:
                    walk_data = self.extract_walk_from_row(cells, region)
                    if walk_data:
                        walks.append(walk_data)
                except Exception as e:
                    print(f"Error parsing walk row: {e}")
                    continue
                    
        return walks
        
    def extract_walk_from_row(self, cells, region: str) -> Optional[Dict]:
        """Extract walk information from table row cells"""
        if len(cells) < 3:
            return None
            
        # First cell usually contains the walk name and link
        name_cell = cells[0]
        name_link = name_cell.find('a')
        
        if not name_link:
            return None
            
        walk_name = name_link.get_text().strip()
        walk_url = urljoin(f"{self.base_url}/{region}/", name_link['href'])
        
        # Extract difficulty (usually second cell)
        difficulty = {'level': 1, 'description': 'Easy'}  # default
        if len(cells) > 1:
            difficulty = self.extract_difficulty(cells[1])
            
        # Extract distance (usually third cell)
        distance = None
        if len(cells) > 2:
            distance_text = cells[2].get_text().strip()
            distance = self.parse_distance(distance_text)
            
        # Extract duration (usually fourth cell)
        duration = None
        if len(cells) > 3:
            duration_text = cells[3].get_text().strip()
            duration = self.parse_duration(duration_text)
            
        return {
            'title': walk_name,
            'region': region.title(),
            'difficulty': difficulty['description'],
            'difficulty_level': difficulty['level'],
            'distance_km': distance,
            'duration_minutes': duration,
            'source_url': walk_url,
            'description': f"A {difficulty['description'].lower()} walk in {region.title()}"
        }
        
    def get_walk_details(self, walk_url: str) -> Dict:
        """Get detailed information from individual walk page"""
        details = {}
        
        soup = self.get_page(walk_url)
        if not soup:
            return details
            
        # Try to extract more detailed description
        description_paragraphs = soup.find_all('p')
        full_description = []
        
        for p in description_paragraphs[:3]:  # First few paragraphs usually contain description
            text = p.get_text().strip()
            if len(text) > 50:  # Filter out short/navigation text
                full_description.append(text)
                
        if full_description:
            details['description'] = ' '.join(full_description)
            
        return details
        
    def scrape_popular_walks(self, limit_per_region: int = 20) -> List[Dict]:
        """Scrape popular walks from priority regions"""
        all_walks = []
        
        for region in self.priority_regions:
            print(f"\\nScraping {region}...")
            region_walks = self.get_region_walks(region)
            
            # Sort by difficulty (easier walks first for broader appeal) 
            # and limit to most manageable ones for Phase 1
            region_walks.sort(key=lambda x: (x.get('difficulty_level', 1), x.get('distance_km', 0)))
            
            # Take top walks from each region
            selected_walks = region_walks[:limit_per_region]
            all_walks.extend(selected_walks)
            
            print(f"Found {len(selected_walks)} walks in {region}")
            time.sleep(2)  # Be respectful to the server
            
        return all_walks
        
    def save_walks_json(self, walks: List[Dict], filename: str = "popular_scottish_walks.json"):
        """Save walks data to JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(walks, f, indent=2, ensure_ascii=False)
        print(f"Saved {len(walks)} walks to {filename}")

def main():
    scraper = WalkHighlandsScraper()
    
    print("Starting to scrape popular Scottish walks...")
    print("Priority regions:", ", ".join(scraper.priority_regions))
    
    walks = scraper.scrape_popular_walks(limit_per_region=15)
    
    print(f"\\nTotal walks scraped: {len(walks)}")
    
    # Filter out walks without essential information
    valid_walks = [w for w in walks if w.get('title') and w.get('region')]
    
    print(f"Valid walks after filtering: {len(valid_walks)}")
    
    scraper.save_walks_json(valid_walks)
    
    # Show sample of scraped data
    if valid_walks:
        print("\\nSample walks:")
        for walk in valid_walks[:5]:
            print(f"- {walk['title']} ({walk['region']}) - {walk.get('difficulty', 'Unknown')} difficulty")

if __name__ == "__main__":
    main()