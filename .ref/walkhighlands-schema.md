# Walkhighlands.co.uk Regional Hierarchy Schema

This document provides the complete hierarchical structure for the walkhighlands.co.uk website, organized by regions and their subdivisions.

## Overview

Walkhighlands.co.uk organizes Scotland's walking regions into:
- **18 Mainland Regions** (some with subdivisions)
- **8 Island Regions** 
- **Long Distance Routes**

## Mainland Regions

### Northern Scotland

#### Sutherland & Caithness
- **Description**: Northernmost mainland Scotland
- **Subdivisions**: None

#### Ullapool, Assynt, E Ross  
- **Description**: Northwest Highlands
- **Subdivisions**: None

#### Torridon and Gairloch
- **Description**: West Highlands coastal region  
- **Subdivisions**: None

#### Loch Ness and Affric
- **Description**: Central Highlands around Loch Ness
- **Subdivisions**: None

#### Kintail and Lochalsh
- **Description**: West Highlands near Skye
- **Subdivisions**: None

### Northeast Scotland

#### Moray and Nairn
- **Description**: Northeast Scotland coastal area
- **Subdivisions**: None

#### Aberdeenshire
- **Description**: Northeast Scotland with coastline and farmland
- **Subdivisions**:
  - Banff and Buchan
  - Huntly, Alford and Inverurie: Gordon
  - Stonehaven and Lower Deeside  
  - City of Aberdeen

### West Highlands

#### Fort William
- **Description**: Western Highlands outdoor capital
- **Subdivisions**: None

### Central Highlands

#### Cairngorms and Aviemore
- **Description**: Britain's largest National Park
- **Subdivisions**:
  - Kingussie, Newtonmore and Dalwhinnie
  - Aviemore, Rothiemurchus and Carrbridge
  - Grantown, Nethy Bridge and Boat of Garten
  - Braemar and Upper Deeside
  - Ballater and Balmoral
  - Glenlivet and Tomintoul

#### Perthshire
- **Description**: Central Scotland transitional region
- **Subdivisions**: None

### West Coast

#### Argyll, Oban & Bute
- **Description**: West coast gateway to the islands
- **Subdivisions**:
  - Oban and North Lorn
  - Tyndrum and Dalmally
  - Inveraray and Lochgilphead
  - Cowal and Dunoon
  - Kintyre, Tarbert, Campbeltown
  - Isle of Bute
  - Isle of Gigha
  - Isle of Lismore

#### Loch Lomond & Trossachs
- **Description**: Scotland's first National Park
- **Subdivisions**:
  - The Trossachs and Callander
  - Arrochar Alps & Crianlarich
  - Drymen, Balloch & Balmaha
  - Strathyre and Lochearnhead

### East Central Scotland

#### Angus
- **Description**: East central Scotland
- **Subdivisions**: None

#### Fife and Stirling
- **Description**: Central Scotland historic regions
- **Subdivisions**: None

### Southwest Scotland

#### Glasgow, Ayrshire, Lanark
- **Description**: Southwest Scotland urban and rural areas
- **Subdivisions**: None

#### Edinburgh and Lothian
- **Description**: Capital region and surrounding areas  
- **Subdivisions**: None

#### Dumfries and Galloway
- **Description**: Southwest Scotland rural region
- **Subdivisions**: None

### Southern Scotland

#### Borders
- **Description**: Southern Scotland border country
- **Subdivisions**:
  - Peebles and Innerleithen
  - Melrose, Selkirk and Kelso
  - Hawick and Newcastleton
  - Eyemouth and Coldstream

## Island Regions

### Inner Hebrides

#### Isle of Skye (& Raasay)
- **Description**: Famous Inner Hebrides island
- **Subdivisions**: None

#### Isle of Mull (& Ulva, Iona)
- **Description**: Inner Hebrides island group
- **Subdivisions**: None

#### Isle of Arran
- **Description**: Scotland in miniature island
- **Subdivisions**: None

#### Small Isles, Coll, Tiree
- **Description**: Inner Hebrides small island group
- **Subdivisions**: None

#### Islay, Jura & Colonsay
- **Description**: Southern Inner Hebrides whisky islands
- **Subdivisions**: None

### Other Islands

#### Outer Hebrides
- **Description**: Western island chain
- **Subdivisions**: None

#### Orkney
- **Description**: Northern islands
- **Subdivisions**: None

#### Shetland
- **Description**: Northernmost islands  
- **Subdivisions**: None

## Long Distance Routes

Multi-day walking routes across Scotland:

- West Highland Way
- Great Glen Way  
- Southern Upland Way
- Speyside Way
- Fife Coastal Path
- John Muir Way
- Cape Wrath Trail

## Schema Implementation Notes

### For Claude Code Integration

```json
{
  "mainland_regions": {
    "region_name": {
      "description": "string",
      "subdivisions": ["array of subdivision names"]
    }
  },
  "island_regions": {
    "region_name": {
      "description": "string", 
      "subdivisions": ["array of subdivision names"]
    }
  }
}
```

### Database Structure Suggestions

For a competitive walkhighlands site, consider this hierarchical structure:

1. **Region** (top level)
2. **Sub-region** (where applicable)  
3. **Walk/Route** (individual walking routes)
4. **Difficulty Grades** (1-5 scale as per walkhighlands)
5. **Walk Types** (circular, linear, multi-day)

### Geographic Coverage

The schema covers all of Scotland's administrative and natural geographic regions:
- **Total Regions**: 26 (18 mainland + 8 island)
- **Regions with Subdivisions**: 6 
- **Total Subdivisions**: 26
- **Long Distance Routes**: 7

This hierarchical structure provides comprehensive geographic organization suitable for a modern walking website competitor to walkhighlands.co.uk.