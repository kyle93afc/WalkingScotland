import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Seed the database with initial regions
export const seedRegions = mutation({
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
        name: "Ullapool & Assynt",
        slug: "ullapool-assynt",
        description: "Ancient mountains and stunning lochs in northwest Scotland, featuring unique geological formations.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 80,
      },
      {
        name: "Torridon & Gairloch",
        slug: "torridon-gairloch",
        description: "Dramatic sandstone peaks and pristine beaches in the heart of the northwest Highlands.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 85,
      },
      {
        name: "Kintail & Lochalsh",
        slug: "kintail-lochalsh",
        description: "Home to the Five Sisters of Kintail and gateway to Skye, offering challenging mountain walks.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 88,
      },
      {
        name: "Loch Ness & Affric",
        slug: "loch-ness-affric",
        description: "Famous loch and pristine glens with ancient Caledonian forest and mountain wilderness.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 90,
      },
      {
        name: "Moray",
        slug: "moray",
        description: "Coastal walks, whisky trails, and gentle hills in Scotland's northeast.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 65,
      },
      {
        name: "Fort William",
        slug: "fort-william",
        description: "Home to Ben Nevis and Glen Nevis, the outdoor capital of Scotland.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 95,
      },
      {
        name: "Cairngorms & Aviemore",
        slug: "cairngorms-aviemore",
        description: "Britain's largest national park with ancient forests, high plateaus, and excellent wildlife watching.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 92,
      },
      {
        name: "Perthshire",
        slug: "perthshire",
        description: "Gateway to the Highlands with beautiful glens, historic castles, and accessible peaks.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 78,
      },
      {
        name: "Argyll & Oban",
        slug: "argyll-oban",
        description: "Western Highlands with stunning sea lochs, historic sites, and island-hopping opportunities.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 82,
      },
      {
        name: "Loch Lomond",
        slug: "loch-lomond",
        description: "Scotland's most famous loch with Ben Lomond and the West Highland Way.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 85,
      },
      {
        name: "Aberdeenshire",
        slug: "aberdeenshire",
        description: "Royal Deeside and eastern Cairngorms with castle trails and granite peaks.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 70,
      },
      {
        name: "Angus",
        slug: "angus",
        description: "Glen Clova and the Angus Glens with dramatic corries and accessible hill walking.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 68,
      },

      // Island Regions
      {
        name: "Isle of Skye",
        slug: "isle-of-skye",
        description: "Dramatic landscapes, iconic rock formations, and otherworldly scenery on Scotland's most famous island.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 98,
      },
      {
        name: "Isle of Mull",
        slug: "isle-of-mull",
        description: "Diverse landscapes from coastal walks to mountain peaks, with excellent wildlife spotting opportunities.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 85,
      },
      {
        name: "Outer Hebrides",
        slug: "outer-hebrides",
        description: "Remote islands with pristine beaches, ancient culture, and rugged Atlantic coastlines.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 75,
      },
      {
        name: "Isle of Arran",
        slug: "isle-of-arran",
        description: "Scotland in miniature with Highland peaks in the north and gentle lowlands in the south.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 88,
      },
      {
        name: "Coll, Tiree and Small Isles",
        slug: "coll-tiree-small-isles",
        description: "Windswept islands with spectacular beaches, unique geology, and peaceful walking.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 65,
      },
      {
        name: "Islay, Jura & Colonsay",
        slug: "islay-jura-colonsay",
        description: "Whisky islands with dramatic coastlines, ancient sites, and the famous Paps of Jura.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 78,
      },
      {
        name: "Orkney",
        slug: "orkney",
        description: "Northern archipelago with Neolithic sites, dramatic sea cliffs, and unique island culture.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 72,
      },
      {
        name: "Shetland",
        slug: "shetland",
        description: "Scotland's northernmost islands with spectacular sea cliffs, wildlife, and Nordic heritage.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 68,
      },
      {
        name: "Isle of Bute",
        slug: "isle-of-bute",
        description: "Accessible island with gentle hills, beautiful gardens, and Victorian seaside charm.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 60,
      },
      {
        name: "Isle of Gigha",
        slug: "isle-of-gigha",
        description: "Small peaceful island known for its gardens, beaches, and community-owned status.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 55,
      },
      {
        name: "Isle of Lismore",
        slug: "isle-of-lismore",
        description: "Fertile island in Loch Linnhe with historic sites and beautiful views of surrounding mountains.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 58,
      },
      {
        name: "Isle of Raasay",
        slug: "isle-of-raasay",
        description: "Skye's quiet neighbor with excellent walking, industrial heritage, and stunning views.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 62,
      },
      {
        name: "Isle of Ulva",
        slug: "isle-of-ulva",
        description: "Small tidal island off Mull with basalt columns, fossils, and peaceful walking trails.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 52,
      },

      // Lowland Regions
      {
        name: "Fife & Stirling",
        slug: "fife-stirling",
        description: "Historic kingdom with coastal paths, gentle hills, and Scotland's ancient capital.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 75,
      },
      {
        name: "Edinburgh & Lothian",
        slug: "edinburgh-lothian",
        description: "Scotland's capital region with Arthur's Seat, Pentland Hills, and coastal walks.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 85,
      },
      {
        name: "Glasgow & Ayrshire",
        slug: "glasgow-ayrshire",
        description: "Urban walking opportunities and Burns country with accessible hills and coastal paths.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 72,
      },
      {
        name: "Dumfries & Galloway",
        slug: "dumfries-galloway",
        description: "Southern Scotland's hidden gem with the Galloway Hills, forests, and peaceful countryside.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 68,
      },
      {
        name: "Scottish Borders",
        slug: "scottish-borders",
        description: "Rolling countryside, historic abbeys, and the Southern Upland Way long-distance path.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 65,
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

// Seed the database with sample walks
export const seedWalks = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get the user to be the author
    const user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Get all regions
    const regions = await ctx.db.query("regions").collect();
    const regionMap = Object.fromEntries(regions.map(r => [r.slug, r._id]));

    const walks = [
      // Highlands
      {
        title: "Ben Nevis via Tourist Path",
        slug: "ben-nevis-tourist-path",
        description: "Ben Nevis, the highest mountain in Scotland and the whole of the UK, stands at 1,345 metres (4,413 feet) above sea level. This challenging but rewarding walk takes you via the well-maintained Tourist Path (also known as the Pony Track) to the summit.\n\nThe route starts from the Glen Nevis Visitor Centre and follows a zigzag path up the western slopes of the mountain. The initial section is relatively gentle, but the gradient increases significantly as you gain height. The path is well-marked but can be challenging in poor weather conditions.\n\nFrom the summit, on a clear day, you'll be rewarded with spectacular panoramic views across the Scottish Highlands, including views to the Isle of Skye and the surrounding peaks. The summit plateau features the ruins of the old weather observatory and a trig point marking the highest point in Britain.",
        shortDescription: "Scotland's highest mountain offering spectacular views from the summit.",
        regionId: regionMap["fort-william"],
        distance: 17.2,
        ascent: 1352,
        difficulty: "Strenuous" as const,
        estimatedTime: 8,
        latitude: 56.7969,
        longitude: -5.0036,
        maxElevation: 1345,
        routeType: "Out and Back" as const,
        authorId: user._id,
        featuredImageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        tags: ["munro", "iconic", "challenging", "summit", "highest"],
        isPublished: true,
        publishedAt: Date.now(),
        viewCount: 15234,
        likeCount: 428,
        reportCount: 84,
        averageRating: 4.7,
      },
      {
        title: "Cairngorms National Park - Loch an Eilein",
        slug: "cairngorms-loch-an-eilein",
        description: "A beautiful and relatively easy circular walk around Loch an Eilein in the heart of the Cairngorms National Park. This scenic walk takes you through ancient Caledonian pine forest with stunning views of the loch and its historic island castle.\n\nThe well-maintained path is suitable for families and offers excellent opportunities for wildlife spotting, including red squirrels, deer, and various bird species. The highlight is the 13th-century castle ruins on the small island in the loch, which once served as a stronghold for the powerful Wolf of Badenoch.",
        shortDescription: "Scenic loch walk through ancient Caledonian forest with castle ruins.",
        regionId: regionMap["cairngorms-aviemore"],
        distance: 4.3,
        ascent: 45,
        difficulty: "Easy" as const,
        estimatedTime: 1.5,
        latitude: 57.1341,
        longitude: -3.8247,
        maxElevation: 355,
        routeType: "Circular" as const,
        authorId: user._id,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["family-friendly", "forest", "historic", "wildlife", "loch"],
        isPublished: true,
        publishedAt: Date.now() - 86400000, // 1 day ago
        viewCount: 8756,
        likeCount: 234,
        reportCount: 45,
        averageRating: 4.5,
      },
      {
        title: "Glen Coe - Lost Valley (Coire Gabhail)",
        slug: "glen-coe-lost-valley",
        description: "One of Scotland's most dramatic and historically significant walks, the Lost Valley in Glen Coe offers a challenging hike through some of the most spectacular Highland scenery. The valley was once used by the MacDonalds to hide their cattle from raiders.\n\nThe walk begins at the car park near the Three Sisters and follows a rough path that can be demanding, especially in wet conditions. You'll cross the River Coe via stepping stones and scramble over boulder fields before reaching the hidden valley floor, surrounded by towering peaks including Bidean nam Bian, Scotland's highest peak in Argyll.",
        shortDescription: "Historic hidden valley walk through dramatic Glen Coe scenery.",
        regionId: regionMap["fort-william"],
        distance: 5.5,
        ascent: 350,
        difficulty: "Hard" as const,
        estimatedTime: 4,
        latitude: 56.6656,
        longitude: -4.9656,
        maxElevation: 450,
        routeType: "Out and Back" as const,
        authorId: user._id,
        featuredImageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
        tags: ["historic", "dramatic", "challenging", "glen-coe", "scrambling"],
        isPublished: true,
        publishedAt: Date.now() - 172800000, // 2 days ago
        viewCount: 12453,
        likeCount: 356,
        reportCount: 67,
        averageRating: 4.8,
      },

      // Islands
      {
        title: "Old Man of Storr Circuit",
        slug: "old-man-of-storr-circuit",
        description: "The Old Man of Storr is one of the most photographed locations in Scotland, featuring dramatic rocky pinnacles formed by an ancient landslide. This moderately challenging walk on the Isle of Skye rewards hikers with otherworldly landscapes and stunning views across the Sound of Raasay.\n\nThe path begins steeply from the car park but levels out as you approach the iconic rock formations. The area has been featured in numerous films and is particularly spectacular at sunrise or sunset when the light catches the jagged peaks.",
        shortDescription: "Iconic rock formations with otherworldly landscapes on the Isle of Skye.",
        regionId: regionMap["isle-of-skye"],
        distance: 3.8,
        ascent: 430,
        difficulty: "Moderate" as const,
        estimatedTime: 2.5,
        latitude: 57.5067,
        longitude: -6.1803,
        maxElevation: 719,
        routeType: "Circular" as const,
        authorId: user._id,
        featuredImageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        tags: ["iconic", "photography", "skye", "rock-formations", "film-location"],
        isPublished: true,
        publishedAt: Date.now() - 259200000, // 3 days ago
        viewCount: 9876,
        likeCount: 445,
        reportCount: 78,
        averageRating: 4.8,
      },
      {
        title: "Quiraing Walk, Isle of Skye",
        slug: "quiraing-walk-skye",
        description: "The Quiraing is a landslip on the eastern face of Meall na Suiramach, the northernmost summit of the Trotternish Ridge on Skye. This dramatic landscape was formed by the collapse of the eastern side of the ridge, creating a spectacular amphitheatre of sheer cliffs, hidden plateaus, and towering rock pinnacles.\n\nThe circular walk takes you through this surreal landscape, including the famous features like the Needle, the Table (a hidden grassy plateau), and the Prison. The route can be challenging in places with some scrambling required.",
        shortDescription: "Dramatic landslip landscape with hidden plateaus and towering pinnacles.",
        regionId: regionMap["isle-of-skye"],
        distance: 6.8,
        ascent: 290,
        difficulty: "Moderate" as const,
        estimatedTime: 3,
        latitude: 57.6436,
        longitude: -6.2679,
        maxElevation: 543,
        routeType: "Circular" as const,
        authorId: user._id,
        featuredImageUrl: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&h=600&fit=crop",
        tags: ["skye", "dramatic", "geology", "scrambling", "unique"],
        isPublished: true,
        publishedAt: Date.now() - 345600000, // 4 days ago
        viewCount: 7234,
        likeCount: 298,
        reportCount: 52,
        averageRating: 4.6,
      },

      // Central Belt
      {
        title: "Loch Katrine Circuit",
        slug: "loch-katrine-circuit",
        description: "Loch Katrine in the Trossachs National Park offers one of Scotland's most beautiful and peaceful walks. This relatively easy circular route takes you around the entire loch through mixed woodland and open moorland, with constant views over the pristine waters.\n\nThe loch was made famous by Sir Walter Scott's poem 'The Lady of the Lake' and has been Glasgow's main water supply since 1859. The route is well-maintained and suitable for cyclists as well as walkers, with several rest stops and viewpoints along the way.",
        shortDescription: "Peaceful loch-side walk through pristine Scottish wilderness.",
        regionId: regionMap["loch-lomond"],
        distance: 12.5,
        ascent: 125,
        difficulty: "Easy" as const,
        estimatedTime: 4,
        latitude: 56.2667,
        longitude: -4.5833,
        maxElevation: 185,
        routeType: "Circular" as const,
        authorId: user._id,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["family-friendly", "loch", "trossachs", "cycling", "peaceful"],
        isPublished: true,
        publishedAt: Date.now() - 432000000, // 5 days ago
        viewCount: 5643,
        likeCount: 187,
        reportCount: 34,
        averageRating: 4.5,
      },
      {
        title: "Ben Lomond via Ptarmigan Route",
        slug: "ben-lomond-ptarmigan-route",
        description: "Ben Lomond is one of the most popular Munros in Scotland, offering a challenging but achievable climb with spectacular views over Loch Lomond and the surrounding Trossachs. The Ptarmigan Route is the standard path to the summit, starting from the Rowardennan car park.\n\nThe initial section through woodland gives way to open moorland and then a steeper rocky path to the summit pyramid. From the top at 974m, you'll enjoy panoramic views extending from the Highlands to the Central Belt on clear days.",
        shortDescription: "Popular Munro with spectacular views over Loch Lomond.",
        regionId: regionMap["loch-lomond"],
        distance: 11.2,
        ascent: 974,
        difficulty: "Hard" as const,
        estimatedTime: 6,
        latitude: 56.1925,
        longitude: -4.6341,
        maxElevation: 974,
        routeType: "Out and Back" as const,
        authorId: user._id,
        featuredImageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        tags: ["munro", "loch-lomond", "popular", "views", "challenging"],
        isPublished: true,
        publishedAt: Date.now() - 518400000, // 6 days ago
        viewCount: 11234,
        likeCount: 356,
        reportCount: 89,
        averageRating: 4.6,
      },

      // Southern Uplands
      {
        title: "The Merrick - Southern Scotland's Highest Peak",
        slug: "the-merrick-highest-peak",
        description: "The Merrick stands at 843m as the highest peak in the Southern Uplands and offers an excellent introduction to Scottish hill walking. Located in the Galloway Hills, this well-defined route provides outstanding views over the Galloway countryside and, on clear days, extends to the Isle of Man and Ireland.\n\nThe path is well-marked and relatively straightforward, making it suitable for those new to Munro bagging or looking for a less demanding high-level walk. The approach through Glen Trool showcases some of Scotland's most beautiful forest and moorland scenery.",
        shortDescription: "Southern Scotland's highest peak with panoramic countryside views.",
        regionId: regionMap["dumfries-galloway"],
        distance: 8.5,
        ascent: 650,
        difficulty: "Moderate" as const,
        estimatedTime: 4.5,
        latitude: 55.1594,
        longitude: -4.4547,
        maxElevation: 843,
        routeType: "Out and Back" as const,
        authorId: user._id,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["highest-peak", "southern-uplands", "galloway", "moderate", "views"],
        isPublished: true,
        publishedAt: Date.now() - 604800000, // 7 days ago
        viewCount: 4567,
        likeCount: 145,
        reportCount: 28,
        averageRating: 4.4,
      },
    ];

    let createdCount = 0;

    for (const walk of walks) {
      // Check if walk already exists
      const existing = await ctx.db
        .query("walks")
        .withIndex("bySlug", (q) => q.eq("slug", walk.slug))
        .first();

      if (!existing) {
        await ctx.db.insert("walks", walk);
        createdCount++;
        console.log(`Created walk: ${walk.title}`);

        // Update region walk count
        const region = await ctx.db.get(walk.regionId);
        if (region) {
          await ctx.db.patch(walk.regionId, {
            walkCount: region.walkCount + 1,
          });
        }
      } else {
        console.log(`Walk already exists: ${walk.title}`);
      }
    }

    return { message: `Created ${createdCount} walks`, totalWalks: walks.length };
  },
});

// Convenience function to seed everything
export const seedAll = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    console.log("Starting database seeding...");
    
    // First seed regions - inline the region seeding logic
    const regions = [
      // Highlands Regions
      {
        name: "Sutherland & Caithness",
        slug: "sutherland-caithness",
        description: "Scotland's far north featuring dramatic coastal cliffs, pristine wilderness, and the renowned NC500 route.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 75,
      },
      {
        name: "Ullapool & Assynt",
        slug: "ullapool-assynt",
        description: "Ancient mountains and stunning lochs in northwest Scotland, featuring unique geological formations.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 80,
      },
      {
        name: "Torridon & Gairloch",
        slug: "torridon-gairloch",
        description: "Dramatic sandstone peaks and pristine beaches in the heart of the northwest Highlands.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 85,
      },
      {
        name: "Kintail & Lochalsh",
        slug: "kintail-lochalsh",
        description: "Home to the Five Sisters of Kintail and gateway to Skye, offering challenging mountain walks.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 88,
      },
      {
        name: "Loch Ness & Affric",
        slug: "loch-ness-affric",
        description: "Famous loch and pristine glens with ancient Caledonian forest and mountain wilderness.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 90,
      },
      {
        name: "Moray",
        slug: "moray",
        description: "Coastal walks, whisky trails, and gentle hills in Scotland's northeast.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 65,
      },
      {
        name: "Fort William",
        slug: "fort-william",
        description: "Home to Ben Nevis and Glen Nevis, the outdoor capital of Scotland.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 95,
      },
      {
        name: "Cairngorms & Aviemore",
        slug: "cairngorms-aviemore",
        description: "Britain's largest national park with ancient forests, high plateaus, and excellent wildlife watching.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 92,
      },
      {
        name: "Perthshire",
        slug: "perthshire",
        description: "Gateway to the Highlands with beautiful glens, historic castles, and accessible peaks.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 78,
      },
      {
        name: "Argyll & Oban",
        slug: "argyll-oban",
        description: "Western Highlands with stunning sea lochs, historic sites, and island-hopping opportunities.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 82,
      },
      {
        name: "Loch Lomond",
        slug: "loch-lomond",
        description: "Scotland's most famous loch with Ben Lomond and the West Highland Way.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 85,
      },
      {
        name: "Aberdeenshire",
        slug: "aberdeenshire",
        description: "Royal Deeside and eastern Cairngorms with castle trails and granite peaks.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 70,
      },
      {
        name: "Angus",
        slug: "angus",
        description: "Glen Clova and the Angus Glens with dramatic corries and accessible hill walking.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 68,
      },

      // Island Regions
      {
        name: "Isle of Skye",
        slug: "isle-of-skye",
        description: "Dramatic landscapes, iconic rock formations, and otherworldly scenery on Scotland's most famous island.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 98,
      },
      {
        name: "Isle of Mull",
        slug: "isle-of-mull",
        description: "Diverse landscapes from coastal walks to mountain peaks, with excellent wildlife spotting opportunities.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 85,
      },
      {
        name: "Outer Hebrides",
        slug: "outer-hebrides",
        description: "Remote islands with pristine beaches, ancient culture, and rugged Atlantic coastlines.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 75,
      },
      {
        name: "Isle of Arran",
        slug: "isle-of-arran",
        description: "Scotland in miniature with Highland peaks in the north and gentle lowlands in the south.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 88,
      },
      {
        name: "Coll, Tiree and Small Isles",
        slug: "coll-tiree-small-isles",
        description: "Windswept islands with spectacular beaches, unique geology, and peaceful walking.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 65,
      },
      {
        name: "Islay, Jura & Colonsay",
        slug: "islay-jura-colonsay",
        description: "Whisky islands with dramatic coastlines, ancient sites, and the famous Paps of Jura.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 78,
      },
      {
        name: "Orkney",
        slug: "orkney",
        description: "Northern archipelago with Neolithic sites, dramatic sea cliffs, and unique island culture.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 72,
      },
      {
        name: "Shetland",
        slug: "shetland",
        description: "Scotland's northernmost islands with spectacular sea cliffs, wildlife, and Nordic heritage.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 68,
      },
      {
        name: "Isle of Bute",
        slug: "isle-of-bute",
        description: "Accessible island with gentle hills, beautiful gardens, and Victorian seaside charm.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 60,
      },
      {
        name: "Isle of Gigha",
        slug: "isle-of-gigha",
        description: "Small peaceful island known for its gardens, beaches, and community-owned status.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 55,
      },
      {
        name: "Isle of Lismore",
        slug: "isle-of-lismore",
        description: "Fertile island in Loch Linnhe with historic sites and beautiful views of surrounding mountains.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 58,
      },
      {
        name: "Isle of Raasay",
        slug: "isle-of-raasay",
        description: "Skye's quiet neighbor with excellent walking, industrial heritage, and stunning views.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 62,
      },
      {
        name: "Isle of Ulva",
        slug: "isle-of-ulva",
        description: "Small tidal island off Mull with basalt columns, fossils, and peaceful walking trails.",
        imageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 52,
      },

      // Lowland Regions
      {
        name: "Fife & Stirling",
        slug: "fife-stirling",
        description: "Historic kingdom with coastal paths, gentle hills, and Scotland's ancient capital.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 75,
      },
      {
        name: "Edinburgh & Lothian",
        slug: "edinburgh-lothian",
        description: "Scotland's capital region with Arthur's Seat, Pentland Hills, and coastal walks.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 85,
      },
      {
        name: "Glasgow & Ayrshire",
        slug: "glasgow-ayrshire",
        description: "Urban walking opportunities and Burns country with accessible hills and coastal paths.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 72,
      },
      {
        name: "Dumfries & Galloway",
        slug: "dumfries-galloway",
        description: "Southern Scotland's hidden gem with the Galloway Hills, forests, and peaceful countryside.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 68,
      },
      {
        name: "Scottish Borders",
        slug: "scottish-borders",
        description: "Rolling countryside, historic abbeys, and the Southern Upland Way long-distance path.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        walkCount: 0,
        popularityScore: 65,
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

    console.log("Regions seeded:", regionIds);

    // Then seed walks - inline the walks seeding logic
    let user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", identity.subject))
      .first();

    // If user doesn't exist, create them
    if (!user) {
      console.log("User not found, creating user...");
      const userId = await ctx.db.insert("users", {
        name: identity.name || "Admin User",
        externalId: identity.subject,
        imageUrl: identity.pictureUrl,
        subscriptionTier: "free",
        joinedAt: Date.now(),
        lastActive: Date.now(),
      });
      user = await ctx.db.get(userId);
      console.log("Created user:", user);
    }

    if (!user) {
      throw new Error("Failed to create or retrieve user");
    }

    // Get all regions for mapping
    const allRegions = await ctx.db.query("regions").collect();
    const regionMap = Object.fromEntries(allRegions.map(r => [r.slug, r._id]));

    const walks = [
      // Highlands
      {
        title: "Ben Nevis via Tourist Path",
        slug: "ben-nevis-tourist-path",
        description: "Ben Nevis, the highest mountain in Scotland and the whole of the UK, stands at 1,345 metres (4,413 feet) above sea level. This challenging but rewarding walk takes you via the well-maintained Tourist Path (also known as the Pony Track) to the summit.\n\nThe route starts from the Glen Nevis Visitor Centre and follows a zigzag path up the western slopes of the mountain. The initial section is relatively gentle, but the gradient increases significantly as you gain height. The path is well-marked but can be challenging in poor weather conditions.\n\nFrom the summit, on a clear day, you'll be rewarded with spectacular panoramic views across the Scottish Highlands, including views to the Isle of Skye and the surrounding peaks. The summit plateau features the ruins of the old weather observatory and a trig point marking the highest point in Britain.",
        shortDescription: "Scotland's highest mountain offering spectacular views from the summit.",
        regionId: regionMap["fort-william"],
        distance: 17.2,
        ascent: 1352,
        difficulty: "Strenuous" as const,
        estimatedTime: 8,
        latitude: 56.7969,
        longitude: -5.0036,
        maxElevation: 1345,
        routeType: "Out and Back" as const,
        authorId: user._id,
        featuredImageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        tags: ["munro", "iconic", "challenging", "summit", "highest"],
        isPublished: true,
        publishedAt: Date.now(),
        viewCount: 15234,
        likeCount: 428,
        reportCount: 84,
        averageRating: 4.7,
      },
      {
        title: "Old Man of Storr Circuit",
        slug: "old-man-of-storr-circuit",
        description: "The Old Man of Storr is one of the most photographed locations in Scotland, featuring dramatic rocky pinnacles formed by an ancient landslide. This moderately challenging walk on the Isle of Skye rewards hikers with otherworldly landscapes and stunning views across the Sound of Raasay.",
        shortDescription: "Iconic rock formations with otherworldly landscapes on the Isle of Skye.",
        regionId: regionMap["isle-of-skye"],
        distance: 3.8,
        ascent: 430,
        difficulty: "Moderate" as const,
        estimatedTime: 2.5,
        latitude: 57.5067,
        longitude: -6.1803,
        maxElevation: 719,
        routeType: "Circular" as const,
        authorId: user._id,
        featuredImageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        tags: ["iconic", "photography", "skye", "rock-formations"],
        isPublished: true,
        publishedAt: Date.now() - 259200000, // 3 days ago
        viewCount: 9876,
        likeCount: 445,
        reportCount: 78,
        averageRating: 4.8,
      },
      {
        title: "Loch Katrine Circuit",
        slug: "loch-katrine-circuit",
        description: "Loch Katrine in the Trossachs National Park offers one of Scotland's most beautiful and peaceful walks. This relatively easy circular route takes you around the entire loch through mixed woodland and open moorland, with constant views over the pristine waters.",
        shortDescription: "Peaceful loch-side walk through pristine Scottish wilderness.",
        regionId: regionMap["loch-lomond"],
        distance: 12.5,
        ascent: 125,
        difficulty: "Easy" as const,
        estimatedTime: 4,
        latitude: 56.2667,
        longitude: -4.5833,
        maxElevation: 185,
        routeType: "Circular" as const,
        authorId: user._id,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["family-friendly", "loch", "trossachs", "peaceful"],
        isPublished: true,
        publishedAt: Date.now() - 432000000, // 5 days ago
        viewCount: 5643,
        likeCount: 187,
        reportCount: 34,
        averageRating: 4.5,
      },
      {
        title: "The Merrick - Southern Scotland's Highest Peak",
        slug: "the-merrick-highest-peak",
        description: "The Merrick stands at 843m as the highest peak in the Southern Uplands and offers an excellent introduction to Scottish hill walking. Located in the Galloway Hills, this well-defined route provides outstanding views over the Galloway countryside and, on clear days, extends to the Isle of Man and Ireland.",
        shortDescription: "Southern Scotland's highest peak with panoramic countryside views.",
        regionId: regionMap["dumfries-galloway"],
        distance: 8.5,
        ascent: 650,
        difficulty: "Moderate" as const,
        estimatedTime: 4.5,
        latitude: 55.1594,
        longitude: -4.4547,
        maxElevation: 843,
        routeType: "Out and Back" as const,
        authorId: user._id,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["highest-peak", "southern-uplands", "galloway", "moderate"],
        isPublished: true,
        publishedAt: Date.now() - 604800000, // 7 days ago
        viewCount: 4567,
        likeCount: 145,
        reportCount: 28,
        averageRating: 4.4,
      },
    ];

    let createdWalks = 0;

    for (const walk of walks) {
      // Check if walk already exists
      const existing = await ctx.db
        .query("walks")
        .withIndex("bySlug", (q) => q.eq("slug", walk.slug))
        .first();

      if (!existing) {
        await ctx.db.insert("walks", walk);
        createdWalks++;
        console.log(`Created walk: ${walk.title}`);

        // Update region walk count
        const region = await ctx.db.get(walk.regionId);
        if (region) {
          await ctx.db.patch(walk.regionId, {
            walkCount: region.walkCount + 1,
          });
        }
      } else {
        console.log(`Walk already exists: ${walk.title}`);
      }
    }

    console.log("Walks seeded:", { createdWalks, totalWalks: walks.length });

    return {
      message: "Database seeding completed successfully",
      regions: Object.keys(regionIds).length,
      walks: walks.length,
      createdWalks,
    };
  },
});