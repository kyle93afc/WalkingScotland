import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Seed the database with Walk Highlands accurate regions
export const seedWalkHighlandsRegions = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const regions = [
      // Northern Scotland
      {
        name: "Sutherland & Caithness",
        slug: "sutherland-caithness",
        description: "Northernmost mainland Scotland with dramatic coastal cliffs, pristine wilderness, and the renowned NC500 route.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 75,
      },
      {
        name: "Ullapool, Assynt, E Ross",
        slug: "ullapool-assynt-ross",
        description: "Northwest Highlands featuring ancient mountains, stunning lochs, and unique geological formations.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 80,
      },
      {
        name: "Torridon and Gairloch",
        slug: "torridon-gairloch",
        description: "West Highlands coastal region with dramatic sandstone peaks and pristine beaches.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 85,
      },
      {
        name: "Loch Ness and Affric",
        slug: "loch-ness-affric",
        description: "Central Highlands around Loch Ness with pristine glens, ancient Caledonian forest, and mountain wilderness.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 90,
      },
      {
        name: "Kintail and Lochalsh",
        slug: "kintail-lochalsh",
        description: "West Highlands near Skye, home to the Five Sisters of Kintail and gateway to the islands.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 88,
      },

      // Northeast Scotland
      {
        name: "Moray and Nairn",
        slug: "moray-nairn",
        description: "Northeast Scotland coastal area with whisky trails, coastal walks, and gentle hills.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 65,
      },
      {
        name: "Aberdeenshire",
        slug: "aberdeenshire",
        description: "Northeast Scotland with coastline and farmland, Royal Deeside, and eastern Cairngorms with castle trails and granite peaks.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 70,
      },

      // West Highlands
      {
        name: "Fort William",
        slug: "fort-william",
        description: "Western Highlands outdoor capital, home to Ben Nevis and Glen Nevis.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 95,
      },

      // Central Highlands
      {
        name: "Cairngorms and Aviemore",
        slug: "cairngorms-aviemore",
        description: "Britain's largest National Park with ancient forests, high plateaus, and excellent wildlife watching.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 92,
      },
      {
        name: "Perthshire",
        slug: "perthshire",
        description: "Central Scotland transitional region, gateway to the Highlands with beautiful glens, historic castles, and accessible peaks.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 78,
      },

      // West Coast
      {
        name: "Argyll, Oban & Bute",
        slug: "argyll-oban-bute",
        description: "West coast gateway to the islands with stunning sea lochs, historic sites, and island-hopping opportunities.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 82,
      },
      {
        name: "Loch Lomond & Trossachs",
        slug: "loch-lomond-trossachs",
        description: "Scotland's first National Park featuring Scotland's most famous loch with Ben Lomond and the West Highland Way.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 85,
      },

      // East Central Scotland
      {
        name: "Angus",
        slug: "angus",
        description: "East central Scotland with Glen Clova and the Angus Glens, featuring dramatic corries and accessible hill walking.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 68,
      },
      {
        name: "Fife and Stirling",
        slug: "fife-stirling",
        description: "Central Scotland historic regions with coastal paths, gentle hills, and Scotland's ancient capital.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 75,
      },

      // Southwest Scotland
      {
        name: "Glasgow, Ayrshire, Lanark",
        slug: "glasgow-ayrshire-lanark",
        description: "Southwest Scotland urban and rural areas with accessible hills, Burns country, and coastal paths.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 72,
      },
      {
        name: "Edinburgh and Lothian",
        slug: "edinburgh-lothian",
        description: "Capital region and surrounding areas with Arthur's Seat, Pentland Hills, and coastal walks.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 85,
      },
      {
        name: "Dumfries and Galloway",
        slug: "dumfries-galloway",
        description: "Southwest Scotland rural region, southern Scotland's hidden gem with the Galloway Hills, forests, and peaceful countryside.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 68,
      },

      // Southern Scotland
      {
        name: "Borders",
        slug: "borders",
        description: "Southern Scotland border country with rolling countryside, historic abbeys, and the Southern Upland Way long-distance path.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 65,
      },

      // Inner Hebrides Islands
      {
        name: "Isle of Skye (& Raasay)",
        slug: "isle-of-skye",
        description: "Famous Inner Hebrides island with dramatic landscapes, iconic rock formations, and otherworldly scenery.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 98,
      },
      {
        name: "Isle of Mull (& Ulva, Iona)",
        slug: "isle-of-mull",
        description: "Inner Hebrides island group with diverse landscapes from coastal walks to mountain peaks, and excellent wildlife spotting opportunities.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 85,
      },
      {
        name: "Isle of Arran",
        slug: "isle-of-arran",
        description: "Scotland in miniature island with Highland peaks in the north and gentle lowlands in the south.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 88,
      },
      {
        name: "Small Isles, Coll, Tiree",
        slug: "small-isles-coll-tiree",
        description: "Inner Hebrides small island group with windswept islands, spectacular beaches, unique geology, and peaceful walking.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 65,
      },
      {
        name: "Islay, Jura & Colonsay",
        slug: "islay-jura-colonsay",
        description: "Southern Inner Hebrides whisky islands with dramatic coastlines, ancient sites, and the famous Paps of Jura.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 78,
      },

      // Other Islands
      {
        name: "Outer Hebrides",
        slug: "outer-hebrides",
        description: "Western island chain with remote islands, pristine beaches, ancient culture, and rugged Atlantic coastlines.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 75,
      },
      {
        name: "Orkney",
        slug: "orkney",
        description: "Northern islands with Neolithic sites, dramatic sea cliffs, and unique island culture.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 72,
      },
      {
        name: "Shetland",
        slug: "shetland",
        description: "Northernmost islands with spectacular sea cliffs, wildlife, and Nordic heritage.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 68,
      },
    ];

    const regionIds: Record<string, string> = {};

    for (const region of regions) {
      // Check if region already exists
      const existing = await ctx.db
        .query("regions")
        .withIndex("bySlug", (q) => q.eq("slug", region.slug))
        .first();

      if (!existing) {
        const regionId = await ctx.db.insert("regions", region);
        regionIds[region.slug] = regionId;
        console.log(`Created region: ${region.name}`);
      } else {
        regionIds[region.slug] = existing._id;
        console.log(`Region already exists: ${region.name}`);
      }
    }

    return regionIds;
  },
});