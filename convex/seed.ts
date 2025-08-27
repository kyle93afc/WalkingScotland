import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Seed the database with initial regions
export const seedRegions = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    // Allow unauthenticated access for initial seeding
    if (!identity) {
      console.log("Running unauthenticated region seeding");
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

// Seed scraped WalkHighlands walks with original descriptions
export const seedScrapedWalks = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // For initial seeding, allow unauthenticated access
    let authUser = null;
    if (identity) {
      authUser = identity;
    } else {
      // Create a system user for seeding purposes
      console.log("Running unauthenticated seed - creating system user for walks");
    }

    // Get or create user
    let user = null;
    
    if (identity) {
      // Authenticated user
      user = await ctx.db
        .query("users")
        .withIndex("byExternalId", (q) => q.eq("externalId", identity.subject))
        .first();

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
      }
    } else {
      // Unauthenticated - create or find system user
      user = await ctx.db
        .query("users")
        .withIndex("byExternalId", (q) => q.eq("externalId", "system-seed"))
        .first();

      if (!user) {
        console.log("Creating system seed user...");
        const userId = await ctx.db.insert("users", {
          name: "System Seed User",
          externalId: "system-seed",
          imageUrl: undefined,
          subscriptionTier: "free",
          joinedAt: Date.now(),
          lastActive: Date.now(),
        });
        user = await ctx.db.get(userId);
      }
    }

    if (!user) {
      throw new Error("Failed to create or retrieve user");
    }

    // Get all regions for mapping
    const allRegions = await ctx.db.query("regions").collect();
    const regionMap = Object.fromEntries(allRegions.map(r => [r.slug, r._id]));

    // Original walk descriptions (completely rewritten from the scraped data)
    const popularWalks = [
      {
        title: "Fairy Glen Adventure",
        slug: "fairy-glen-adventure-skye",
        description: "Venture into the mystical Fairy Glen near Uig, where legend meets reality in one of Skye's most enchanting landscapes. This gentle ramble takes you through a collection of miniature conical hills and peculiar rock formations that seem plucked from a fairy tale.\n\nThe glen's unusual topography creates an almost alien landscape, with small grassy mounds arranged in mysterious patterns. Local folklore suggests these formations are the work of fairies, adding an element of magic to your Highland adventure. The short distance makes this perfect for families or those seeking a unique Skye experience without strenuous hiking.",
        shortDescription: "Explore mystical cone-shaped hills and rock formations in Skye's enchanting Fairy Glen.",
        regionSlug: "isle-of-skye",
        distance: 1.5,
        ascent: 50,
        difficulty: "Easy" as const,
        estimatedTime: 1.0,
        latitude: 57.5830,
        longitude: -6.3950,
        maxElevation: 150,
        routeType: "Circular" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        tags: ["mystical", "skye", "family-friendly", "unique", "photography"],
      },
      {
        title: "Neist Point Sunset Walk",
        slug: "neist-point-sunset-walk",
        description: "Journey to Scotland's westernmost point on the Isle of Skye for one of the country's most spectacular lighthouse walks. This clifftop adventure rewards visitors with sweeping Atlantic views and a historic lighthouse perched dramatically above crashing waves.\n\nThe route follows well-worn paths across rugged moorland before descending to the lighthouse built in 1909. On clear days, the Outer Hebrides stretch across the horizon, while seabirds wheel overhead. The return journey offers constantly changing perspectives of Skye's dramatic coastline, making every step a photo opportunity.",
        shortDescription: "Clifftop walk to Scotland's westernmost lighthouse with Atlantic views and sunset vistas.",
        regionSlug: "isle-of-skye",
        distance: 3.2,
        ascent: 80,
        difficulty: "Easy" as const,
        estimatedTime: 1.5,
        latitude: 57.4237,
        longitude: -6.7868,
        maxElevation: 180,
        routeType: "Out and Back" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        tags: ["lighthouse", "sunset", "clifftop", "atlantic", "skye"],
      },
      {
        title: "Talisker Beach Adventure",
        slug: "talisker-beach-adventure",
        description: "Discover one of Scotland's most dramatic beaches on this coastal walk through Skye's rugged landscape. Black volcanic sand contrasts with towering sea cliffs, while a spectacular waterfall tumbles directly onto the shore creating a scene of raw Highland beauty.\n\nThe approach winds through Glen Talisker, offering glimpses of traditional crofting life before revealing the beach's full drama. Sea stacks guard the bay like ancient sentinels, and the ever-changing interplay of light on dark sand creates endless photographic opportunities. This location has captured the imagination of filmmakers and photographers worldwide.",
        shortDescription: "Dramatic black sand beach with waterfall and sea stacks on Skye's Atlantic coast.",
        regionSlug: "isle-of-skye",
        distance: 3.8,
        ascent: 75,
        difficulty: "Easy" as const,
        estimatedTime: 2.0,
        latitude: 57.3021,
        longitude: -6.4619,
        maxElevation: 175,
        routeType: "Out and Back" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        tags: ["beach", "waterfall", "dramatic", "photography", "skye"],
      },
      {
        title: "Glen Nevis Waterfall Walk",
        slug: "glen-nevis-waterfall-walk",
        description: "Follow the crystal-clear waters of the River Nevis through one of Scotland's most beautiful glens, culminating at thundering waterfalls that cascade through ancient granite gorges. This accessible Highland walk offers mountain grandeur without requiring mountaineering skills.\n\nThe well-maintained path winds through native woodland of birch, rowan, and oak, with Ben Nevis towering overhead. Wildlife is abundant, from red deer to golden eagles, while the river provides a constant soundtrack of rushing water. The finale at the Lower Falls showcases nature's power as the river plunges through narrow rock channels.",
        shortDescription: "Beautiful glen walk to spectacular waterfalls in the shadow of Ben Nevis.",
        regionSlug: "fort-william",
        distance: 4.2,
        ascent: 60,
        difficulty: "Easy" as const,
        estimatedTime: 2.0,
        latitude: 56.8019,
        longitude: -5.0514,
        maxElevation: 160,
        routeType: "Out and Back" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["waterfall", "glen", "ben-nevis", "family-friendly", "wildlife"],
      },
      {
        title: "Glencoe Valley Vista",
        slug: "glencoe-valley-vista",
        description: "Immerse yourself in the legendary beauty of Glencoe with this gentle walk to Signal Rock, offering one of Scotland's most iconic mountain vistas. The route combines clan history with breathtaking Highland scenery, making it perfect for those seeking Glencoe's drama without extreme challenges.\n\nSignal Rock served as a communication point for Clan MacDonald, and today provides an unparalleled viewpoint of the Three Sisters - Glencoe's famous trio of peaks. The walk showcases why this glen is considered Scotland's most beautiful, with every turn revealing new perspectives on these ancient mountains carved by ice and time.",
        shortDescription: "Historic walk to Signal Rock for iconic views of Glencoe's Three Sisters peaks.",
        regionSlug: "fort-william",
        distance: 2.8,
        ascent: 120,
        difficulty: "Easy" as const,
        estimatedTime: 1.5,
        latitude: 56.6656,
        longitude: -4.9656,
        maxElevation: 220,
        routeType: "Circular" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
        tags: ["glencoe", "historic", "viewpoint", "three-sisters", "iconic"],
      },
      {
        title: "Loch Vaa Forest Circuit",
        slug: "loch-vaa-forest-circuit",
        description: "Explore pristine Caledonian forest on this peaceful circuit of Loch Vaa, where ancient Scots pines create perfect mirror reflections in still Highland waters. This gentle walk through the Cairngorms National Park offers exceptional wildlife viewing in one of Scotland's most beautiful woodland settings.\n\nThe route circles through remnants of the great Caledonian Forest, home to red squirrels, pine martens, and numerous bird species. Several viewpoints provide opportunities to photograph the loch's perfect reflections, while interpretive signs explain the forest's ecological importance. This is Highland walking at its most serene.",
        shortDescription: "Peaceful forest circuit around pristine Loch Vaa with wildlife and ancient pines.",
        regionSlug: "cairngorms-aviemore",
        distance: 3.8,
        ascent: 40,
        difficulty: "Easy" as const,
        estimatedTime: 1.8,
        latitude: 57.1755,
        longitude: -3.8842,
        maxElevation: 240,
        routeType: "Circular" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["forest", "loch", "wildlife", "cairngorms", "peaceful"],
      },
      {
        title: "Falls of Bruar Cascade",
        slug: "falls-of-bruar-cascade",
        description: "Experience Scotland's most celebrated waterfall on this woodland walk to the Falls of Bruar, where multiple cascades create a natural symphony in the Perthshire hills. Robert Burns himself was inspired by these falls, calling them among Scotland's finest natural attractions.\n\nThe path winds upward through mixed woodland, revealing each tier of the falls in succession. Multiple viewing platforms allow visitors to appreciate the water's power as it tumbles through rocky gorges. In autumn, the surrounding trees create a spectacular backdrop of gold and crimson, while spring brings the rush of snowmelt adding extra drama to the cascades.",
        shortDescription: "Multi-tiered waterfall walk through woodland, celebrated by Robert Burns.",
        regionSlug: "perthshire",
        distance: 2.8,
        ascent: 140,
        difficulty: "Easy" as const,
        estimatedTime: 1.6,
        latitude: 56.8074,
        longitude: -3.8456,
        maxElevation: 340,
        routeType: "Circular" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["waterfall", "robert-burns", "woodland", "cascade", "perthshire"],
      },
      {
        title: "Luss Village Heritage Walk",
        slug: "luss-village-heritage-walk",
        description: "Stroll through Scotland's most photographed village on this gentle heritage trail that combines Loch Lomond's natural beauty with centuries of Highland history. Traditional stone cottages and an ancient kirk create the perfect Highland village scene.\n\nThe trail weaves between rose-covered cottages that have remained virtually unchanged for generations. Information boards reveal stories of clan warfare, Victorian tourism, and modern conservation efforts. Views across Loch Lomond to the towering Ben Lomond provide a stunning backdrop to this journey through Scottish heritage.",
        shortDescription: "Heritage walk through Scotland's most beautiful village on Loch Lomond shores.",
        regionSlug: "loch-lomond",
        distance: 2.5,
        ascent: 35,
        difficulty: "Easy" as const,
        estimatedTime: 1.2,
        latitude: 56.1064,
        longitude: -4.6381,
        maxElevation: 85,
        routeType: "Circular" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["heritage", "village", "loch-lomond", "traditional", "photogenic"],
      },
      {
        title: "Flowerdale Glen Nature Trail",
        slug: "flowerdale-glen-nature-trail",
        description: "Journey through one of Scotland's most biodiverse glens on this moderate walk near Gairloch, where native oakwood meets Highland moorland. The trail showcases the incredible variety of landscapes found in the northwest Highlands, from ancient woodland to mountain vistas.\n\nFlowerdale Glen represents one of the finest examples of Atlantic oakwood in Scotland, supporting rare plants, birds, and insects. The path climbs gently through this precious ecosystem before emerging onto higher ground with panoramic views toward the Torridon mountains and across to the Isle of Skye.",
        shortDescription: "Diverse glen walk through native oakwood with mountain views toward Torridon.",
        regionSlug: "torridon-gairloch",
        distance: 5.2,
        ascent: 180,
        difficulty: "Moderate" as const,
        estimatedTime: 2.5,
        latitude: 57.7125,
        longitude: -5.6942,
        maxElevation: 280,
        routeType: "Circular" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["glen", "oakwood", "biodiversity", "torridon", "nature"],
      },
      {
        title: "Knockan Crag Geological Trail",
        slug: "knockan-crag-geological-trail",
        description: "Uncover 500 million years of Earth's history on this fascinating geological trail through Assynt's ancient landscape. This educational walk combines stunning Highland scenery with world-class geological features that have shaped our understanding of how mountains form.\n\nThe trail features an extraordinary geological phenomenon where ancient rocks sit atop much younger layers - evidence of massive tectonic forces. Interpretive displays explain this complex geology in accessible terms, while cliff-top viewpoints provide spectacular panoramas across Assynt's unique mountain landscape.",
        shortDescription: "Educational geological trail with world-class rock formations and Assynt views.",
        regionSlug: "ullapool-assynt",
        distance: 2.4,
        ascent: 110,
        difficulty: "Easy" as const,
        estimatedTime: 1.8,
        latitude: 58.0394,
        longitude: -5.2031,
        maxElevation: 210,
        routeType: "Circular" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["geology", "educational", "assynt", "science", "interpretive"],
      },
      {
        title: "Puck's Glen Gorge Walk",
        slug: "pucks-glen-gorge-walk",
        description: "Step into a fairy-tale world on this enchanting walk through Puck's Glen, where wooden walkways lead through a deep gorge filled with cascading waterfalls and moss-draped rocks. Named after Shakespeare's mischievous sprite, this Argyll gem offers Highland magic in miniature.\n\nCarefully constructed boardwalks and bridges allow safe passage through terrain that would otherwise be inaccessible. The combination of filtered sunlight, tumbling water, and lush green vegetation creates an almost mystical atmosphere. Every corner reveals new compositions of water, rock, and forest that seem designed by nature's finest artist.",
        shortDescription: "Enchanting gorge walk with waterfalls and boardwalks through magical woodland.",
        regionSlug: "argyll-oban",
        distance: 2.8,
        ascent: 95,
        difficulty: "Easy" as const,
        estimatedTime: 1.5,
        latitude: 56.0847,
        longitude: -4.9847,
        maxElevation: 195,
        routeType: "Circular" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["gorge", "waterfalls", "magical", "boardwalks", "argyll"],
      },
    ];

    let createdWalks = 0;

    for (const walkData of popularWalks) {
      // Check if walk already exists
      const existing = await ctx.db
        .query("walks")
        .withIndex("bySlug", (q) => q.eq("slug", walkData.slug))
        .first();

      if (existing) {
        console.log(`Walk already exists: ${walkData.title}`);
        continue;
      }

      // Get region ID
      const regionId = regionMap[walkData.regionSlug];
      if (!regionId) {
        console.log(`Region not found for slug: ${walkData.regionSlug}`);
        continue;
      }

      // Create walk object matching schema
      const walk = {
        title: walkData.title,
        slug: walkData.slug,
        description: walkData.description,
        shortDescription: walkData.shortDescription,
        regionId: regionId,
        distance: walkData.distance,
        ascent: walkData.ascent,
        difficulty: walkData.difficulty,
        estimatedTime: walkData.estimatedTime,
        latitude: walkData.latitude,
        longitude: walkData.longitude,
        maxElevation: walkData.maxElevation,
        routeType: walkData.routeType,
        authorId: user._id,
        featuredImageUrl: walkData.featuredImageUrl,
        tags: walkData.tags,
        isPublished: true,
        publishedAt: Date.now() - (createdWalks * 86400000), // Spread over days
        viewCount: Math.max(5, 120 - createdWalks * 8),
        likeCount: Math.max(1, 35 - createdWalks * 2),
        reportCount: Math.floor(createdWalks / 8),
        averageRating: Number((4.2 + Math.random() * 0.6).toFixed(1)), // 4.2 - 4.8
      };

      try {
        await ctx.db.insert("walks", walk);
        createdWalks++;
        console.log(`Created walk: ${walkData.title}`);

        // Update region walk count
        const region = await ctx.db.get(regionId);
        if (region) {
          await ctx.db.patch(regionId, {
            walkCount: region.walkCount + 1,
          });
        }
      } catch (error) {
        console.error(`Failed to create walk ${walkData.title}:`, error);
      }
    }

    return {
      message: `Successfully added ${createdWalks} popular Scottish walks to the database`,
      totalProcessed: popularWalks.length,
      createdWalks,
      regions: Object.keys(regionMap).length,
    };
  },
});

// Seed detailed walks with stage-by-stage navigation from WalkHighlands scraping
export const seedDetailedWalks = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // Allow unauthenticated access for initial seeding
    let authUser = null;
    if (identity) {
      authUser = identity;
    } else {
      console.log("Running unauthenticated detailed walk seeding");
    }

    // Get or create user
    let user = null;
    
    if (identity) {
      user = await ctx.db
        .query("users")
        .withIndex("byExternalId", (q) => q.eq("externalId", identity.subject))
        .first();

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
      }
    } else {
      // Find or create system user for seeding
      user = await ctx.db
        .query("users")
        .withIndex("byExternalId", (q) => q.eq("externalId", "system-detailed-seed"))
        .first();

      if (!user) {
        console.log("Creating system detailed seed user...");
        const userId = await ctx.db.insert("users", {
          name: "System Detailed Seed User",
          externalId: "system-detailed-seed",
          imageUrl: undefined,
          subscriptionTier: "free",
          joinedAt: Date.now(),
          lastActive: Date.now(),
        });
        user = await ctx.db.get(userId);
      }
    }

    if (!user) {
      throw new Error("Failed to create or retrieve user");
    }

    // Get all regions for mapping
    const allRegions = await ctx.db.query("regions").collect();
    const regionMap = Object.fromEntries(allRegions.map(r => [r.slug, r._id]));

    // Priority detailed walks (first batch - Skye, Cairngorms, Fort William)
    const detailedWalks = [
      {
        title: "Fairy Glen Mystical Walk",
        slug: "fairy-glen-mystical-walk-skye",
        description: "Step into a world of legend and mystery at Skye's famous Fairy Glen, where ancient geological forces have created an otherworldly landscape of miniature hills and peculiar rock formations that seem crafted by supernatural hands.\n\nThis enchanting short walk takes you through cone-shaped grassy mounds arranged in mysterious patterns, creating an almost alien terrain that has captivated visitors for generations. Local folklore attributes these formations to fairy magic, adding an element of Celtic mystique to your Highland adventure.",
        shortDescription: "Explore mystical cone-shaped hills and ancient rock formations in Skye's legendary Fairy Glen.",
        regionSlug: "isle-of-skye",
        distance: 1.5,
        ascent: 45,
        difficulty: "Easy" as const,
        estimatedTime: 1.0,
        latitude: 57.5830,
        longitude: -6.3950,
        maxElevation: 145,
        routeType: "Circular" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        tags: ["mystical", "skye", "family-friendly", "unique", "photography", "geological"],
        terrain: "Grassy hills and paths with some uneven ground",
        startGridRef: "NG411632",
        sourceUrl: "https://www.walkhighlands.co.uk/skye/fairyglen.shtml",
        stages: [
          {
            stageNumber: 1,
            description: "Begin at the designated parking area off the A87 near Uig. The Fairy Glen becomes visible as you descend the approach road, offering your first glimpse of its unique miniature landscape.",
          },
          {
            stageNumber: 2,
            description: "Follow the main path that descends between the distinctive grassy conical hills. The well-worn route reveals the full extent of this geological wonder, with each mound offering a different perspective.",
          },
          {
            stageNumber: 3,
            description: "The path leads past a small lochan nestled among the formations, then emerges at the road. Cross carefully and continue on the path that bends left, running parallel to the road briefly before diverging.",
          },
          {
            stageNumber: 4,
            description: "Approach Castle Ewen, the sharp rocky peak that dominates this section of the glen. For the adventurous, a steep scramble leads to the summit, but take extreme care on the exposed rock.",
          },
          {
            stageNumber: 5,
            description: "From the grassy hollow below Castle Ewen, take the path through the gap to explore more formations. This section has been carefully managed to protect the grazing land - please respect any restoration work.",
          },
          {
            stageNumber: 6,
            description: "Complete the circuit by returning to the road and turning left to walk back to the parking area. The final views across the loch show Castle Ewen to magnificent effect.",
          }
        ],
      },
      {
        title: "Neist Point Lighthouse Adventure",
        slug: "neist-point-lighthouse-adventure",
        description: "Journey to Scotland's westernmost point on this spectacular clifftop walk to Neist Point lighthouse, where dramatic sea cliffs meet the vast Atlantic Ocean in one of Skye's most iconic locations.\n\nThe route takes you across wild moorland to a lighthouse built in 1909, perched dramatically above crashing waves 43 meters below sea level. On clear days, views extend to the Outer Hebrides, while the surrounding waters offer excellent opportunities for whale and dolphin watching, especially during summer months.",
        shortDescription: "Clifftop walk to Scotland's westernmost lighthouse with Atlantic views and wildlife watching.",
        regionSlug: "isle-of-skye",
        distance: 3.2,
        ascent: 80,
        difficulty: "Easy" as const,
        estimatedTime: 1.5,
        latitude: 57.4237,
        longitude: -6.7868,
        maxElevation: 180,
        routeType: "Out and Back" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1573160103600-4c2b8c2b49c9?w=800&h=600&fit=crop",
        tags: ["lighthouse", "sunset", "clifftop", "atlantic", "skye", "wildlife", "westernmost"],
        terrain: "Moorland paths with some steep descent, unprotected cliff edges",
        startGridRef: "NG132478",
        sourceUrl: "https://www.walkhighlands.co.uk/skye/neistpoint.shtml",
        stages: [
          {
            stageNumber: 1,
            description: "Start from the car park at the end of the road. Pass through the gate and immediately turn left on the path. The route begins with a well-graded descent aided by metal handrails for most of the way down.",
          },
          {
            stageNumber: 2,
            description: "Continue along the level clifftop path, enjoying views of the aerial ropeway used to transport supplies to the lighthouse. This area featured in Lars Von Trier's film 'Breaking the Waves'.",
          },
          {
            stageNumber: 3,
            description: "At the highest point of the path, a grassy track branches right toward An t-Aigeach (The Stallion's Head). This optional detour leads to dramatic cliff views but requires extreme caution near the edges.",
          },
          {
            stageNumber: 4,
            description: "Round the corner to get your first full view of Neist Point lighthouse and the former keepers' cottages. The lighthouse complex was built in 1909 by David A Stevenson of the famous lighthouse engineering family.",
          },
          {
            stageNumber: 5,
            description: "Explore the lighthouse area and continue beyond the buildings to reach the true westernmost point of Skye. Watch for whale blows and dolphin fins in the surrounding waters - this is one of the best cetacean-watching spots on the island.",
          },
          {
            stageNumber: 6,
            description: "For the classic lighthouse photograph, continue northwest from the car park on the boggy clifftop path. This vantage point offers the definitive view of the lighthouse beyond the dramatic cliffs, especially spectacular at sunset.",
          }
        ],
      },
      {
        title: "Loch Vaa Ancient Forest Circuit",
        slug: "loch-vaa-ancient-forest-circuit",
        description: "Discover one of Scotland's hidden gems on this peaceful circuit through pristine Caledonian forest surrounding beautiful Loch Vaa. This tranquil walk showcases remnants of the great ancient woodland that once covered the Highlands, now home to red squirrels, pine martens, and diverse birdlife.\n\nThe route winds through mature Scots pines and silver birches that create perfect mirror reflections in the still Highland waters. Several viewpoints provide opportunities for wildlife photography and quiet contemplation, while interpretive features explain the ecological importance of this precious forest habitat.",
        shortDescription: "Peaceful forest circuit around pristine Highland loch with ancient pines and exceptional wildlife.",
        regionSlug: "cairngorms-aviemore",
        distance: 3.8,
        ascent: 40,
        difficulty: "Easy" as const,
        estimatedTime: 1.8,
        latitude: 57.1755,
        longitude: -3.8842,
        maxElevation: 240,
        routeType: "Circular" as const,
        featuredImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        tags: ["forest", "loch", "wildlife", "cairngorms", "peaceful", "ancient", "caledonian"],
        terrain: "Forest paths and tracks, can be muddy in places",
        startGridRef: "NH910174",
        sourceUrl: "https://www.walkhighlands.co.uk/cairngorms/loch-vaa.shtml",
        stages: [
          {
            stageNumber: 1,
            description: "Begin from the parking area near Laggantrygown Cemetery off the A95. Take the clear path outside the cemetery's left edge, which climbs through woodland along an ancient glacial esker ridge.",
          },
          {
            stageNumber: 2,
            description: "Follow the main path as it curves left and descends to reveal the beautiful shores of Loch Vaa. The loch sits serenely among stunning pine and birch woods, despite being close to the busy main road.",
          },
          {
            stageNumber: 3,
            description: "Continue along the lochshore toward the attractive Victorian boathouse, one of the most photographed features of the walk. The building reflects perfectly in calm waters, especially in early morning light.",
          },
          {
            stageNumber: 4,
            description: "Enter the forest to the left of the boathouse, following the track through mixed woodland. Stay on the main route, ignoring smaller paths, until you reach a locked gate - pass to its right and turn right along the track.",
          },
          {
            stageNumber: 5,
            description: "After 1km from the gate, watch for a track branching right marked by a small boulder among rocks. This leads back toward Loch Vaa through some of the finest remnant Caledonian forest in the area.",
          },
          {
            stageNumber: 6,
            description: "Cross a stile over the fence and climb the low wooded hill for excellent views over the loch. The path eventually rejoins your outward route near the start - turn left to return to the cemetery parking area.",
          }
        ],
      },
    ];

    let createdWalks = 0;
    let createdStages = 0;

    for (const walkData of detailedWalks) {
      try {
        // Check if walk already exists
        const existing = await ctx.db
          .query("walks")
          .withIndex("bySlug", (q) => q.eq("slug", walkData.slug))
          .first();

        if (existing) {
          console.log(`Walk already exists: ${walkData.title}`);
          continue;
        }

        // Get region ID
        const regionId = regionMap[walkData.regionSlug];
        if (!regionId) {
          console.log(`Region not found for slug: ${walkData.regionSlug}`);
          continue;
        }

        // Create walk object matching schema
        const walk = {
          title: walkData.title,
          slug: walkData.slug,
          description: walkData.description,
          shortDescription: walkData.shortDescription,
          regionId: regionId,
          distance: walkData.distance,
          ascent: walkData.ascent,
          difficulty: walkData.difficulty,
          estimatedTime: walkData.estimatedTime,
          latitude: walkData.latitude,
          longitude: walkData.longitude,
          maxElevation: walkData.maxElevation,
          routeType: walkData.routeType,
          authorId: user._id,
          featuredImageUrl: walkData.featuredImageUrl,
          tags: walkData.tags,
          isPublished: true,
          publishedAt: Date.now() - (createdWalks * 86400000), // Spread over days
          viewCount: Math.max(5, 200 - createdWalks * 15),
          likeCount: Math.max(1, 50 - createdWalks * 3),
          reportCount: Math.floor(createdWalks / 10),
          averageRating: Number((4.3 + Math.random() * 0.5).toFixed(1)), // 4.3 - 4.8
          // Enhanced fields
          terrain: walkData.terrain,
          startGridRef: walkData.startGridRef,
          sourceUrl: walkData.sourceUrl,
        };

        // Insert the walk
        const walkId = await ctx.db.insert("walks", walk);
        createdWalks++;
        console.log(`Created detailed walk: ${walkData.title}`);

        // Insert stages for this walk
        for (const stageData of walkData.stages) {
          const stage = {
            walkId: walkId,
            stageNumber: stageData.stageNumber,
            description: stageData.description,
            createdAt: Date.now(),
          };

          await ctx.db.insert("walk_stages", stage);
          createdStages++;
        }

        console.log(`  Added ${walkData.stages.length} stages`);

        // Update region walk count
        const region = await ctx.db.get(regionId);
        if (region) {
          await ctx.db.patch(regionId, {
            walkCount: region.walkCount + 1,
          });
        }

      } catch (error) {
        console.error(`Failed to create detailed walk ${walkData.title}:`, error);
      }
    }

    return {
      message: `Successfully added ${createdWalks} detailed walks with ${createdStages} stages to the database`,
      totalProcessed: detailedWalks.length,
      createdWalks,
      createdStages,
      regions: Object.keys(regionMap).length,
    };
  },
});

// Seed the database with all 90 converted walks
export const seedAll90Walks = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // Allow unauthenticated access for initial seeding
    let user = null;
    if (identity) {
      user = await ctx.db
        .query("users")
        .withIndex("byExternalId", (q) => q.eq("externalId", identity.subject))
        .first();

      if (!user) {
        const userId = await ctx.db.insert("users", {
          name: identity.name || "Admin User",
          externalId: identity.subject,
          imageUrl: identity.pictureUrl,
          subscriptionTier: "free",
          joinedAt: Date.now(),
          lastActive: Date.now(),
        });
        user = await ctx.db.get(userId);
      }
    } else {
      // Find or create system user for seeding
      user = await ctx.db
        .query("users")
        .withIndex("byExternalId", (q) => q.eq("externalId", "system-all-90-seed"))
        .first();

      if (!user) {
        console.log("Creating system user for all 90 walks seeding...");
        const userId = await ctx.db.insert("users", {
          name: "System All-90 Seed User",
          externalId: "system-all-90-seed",
          imageUrl: undefined,
          subscriptionTier: "free",
          joinedAt: Date.now(),
          lastActive: Date.now(),
        });
        user = await ctx.db.get(userId);
      }
    }

    if (!user) {
      throw new Error("Failed to create or find user for seeding");
    }

    // Get region map
    const regions = await ctx.db.query("regions").collect();
    const regionMap: Record<string, any> = {};
    regions.forEach((region) => {
      regionMap[region.slug] = region._id;
    });

    console.log("Available regions:", Object.keys(regionMap));

    // This function is deprecated - use importSingleWalk instead
    return {
      message: "This bulk function is deprecated. Use the admin interface to import walks individually.",
      error: "Use importSingleWalk function instead",
    };
  },
});

// Simple function to import a single walk directly
export const importSingleWalk = mutation({
  args: { walkData: v.string() }, // JSON string of walk data
  handler: async (ctx, args) => {
    // Allow unauthenticated access for seeding
    let user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", "system-import"))
      .first();

    if (!user) {
      const userId = await ctx.db.insert("users", {
        name: "System Import User",
        externalId: "system-import",
        imageUrl: undefined,
        subscriptionTier: "free",
        joinedAt: Date.now(),
        lastActive: Date.now(),
      });
      user = await ctx.db.get(userId);
    }

    if (!user) {
      throw new Error("Failed to create user for import");
    }

    // Parse the walk data
    const walkData = JSON.parse(args.walkData);

    // Get regions
    const regions = await ctx.db.query("regions").collect();
    const regionMap: Record<string, any> = {};
    regions.forEach((region) => {
      regionMap[region.slug] = region._id;
    });

    // Check if walk already exists
    const existing = await ctx.db
      .query("walks")
      .withIndex("bySlug", (q) => q.eq("slug", walkData.slug))
      .first();

    if (existing) {
      return { created: false, skipped: true, message: `Walk already exists: ${walkData.title}` };
    }

    // Get region ID
    const regionId = regionMap[walkData.regionSlug];
    if (!regionId) {
      return { created: false, error: true, message: `Region not found: ${walkData.regionSlug}` };
    }

    try {
      // Create walk
      const walk = {
        title: walkData.title,
        slug: walkData.slug,
        description: walkData.description,
        shortDescription: walkData.shortDescription,
        regionId: regionId,
        distance: walkData.distance,
        ascent: walkData.ascent,
        difficulty: walkData.difficulty,
        estimatedTime: walkData.estimatedTime,
        latitude: walkData.latitude,
        longitude: walkData.longitude,
        maxElevation: walkData.maxElevation,
        routeType: walkData.routeType,
        authorId: user._id,
        featuredImageUrl: walkData.featuredImageUrl,
        tags: walkData.tags,
        isPublished: walkData.isPublished,
        publishedAt: Date.now(),
        viewCount: walkData.viewCount || 0,
        likeCount: walkData.likeCount || 0,
        reportCount: walkData.reportCount || 0,
        averageRating: walkData.averageRating || 4.0,
      };

      const walkId = await ctx.db.insert("walks", walk);

      // Create stages if they exist
      let stageCount = 0;
      if (walkData.stages && walkData.stages.length > 0) {
        for (const stageData of walkData.stages) {
          const stage = {
            walkId: walkId,
            stageNumber: stageData.stage,
            description: stageData.description,
            createdAt: Date.now(),
          };
          await ctx.db.insert("walk_stages", stage);
          stageCount++;
        }
      }

      // Update region walk count
      const region = await ctx.db.get(regionId);
      if (region && 'walkCount' in region) {
        await ctx.db.patch(regionId, {
          walkCount: (region as any).walkCount + 1,
        });
      }

      return { 
        created: true, 
        message: `Successfully imported ${walkData.title} with ${stageCount} stages`,
        walkId: walkId,
        stageCount: stageCount
      };

    } catch (error) {
      return { 
        created: false, 
        error: true, 
        message: `Failed to import ${walkData.title}: ${String(error)}`
      };
    }
  },
});