import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Get all published walks
export const getPublishedWalks = query({
  args: {
    limit: v.optional(v.number()),
    regionId: v.optional(v.id("regions")),
    difficulty: v.optional(v.union(v.literal("Easy"), v.literal("Moderate"), v.literal("Hard"), v.literal("Strenuous"))),
  },
  handler: async (ctx, args) => {
    let query;

    if (args.regionId) {
      query = ctx.db
        .query("walks")
        .withIndex("byRegion", (q) => q.eq("regionId", args.regionId!))
        .filter((q) => q.eq(q.field("isPublished"), true));
    } else {
      query = ctx.db
        .query("walks")
        .withIndex("byPublished", (q) => q.eq("isPublished", true));
    }

    if (args.difficulty) {
      query = query.filter((q) => q.eq(q.field("difficulty"), args.difficulty));
    }

    const walks = await query.order("desc").take(args.limit ?? 50);

    // Get region info for each walk
    const walksWithRegion = await Promise.all(
      walks.map(async (walk) => {
        const region = await ctx.db.get(walk.regionId);
        return {
          ...walk,
          region,
        };
      })
    );

    return walksWithRegion;
  },
});

// Get a single walk by slug
export const getWalkBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const walk = await ctx.db
      .query("walks")
      .withIndex("bySlug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .first();

    if (!walk) {
      return null;
    }

    // Get region info
    const region = await ctx.db.get(walk.regionId);
    
    // Get author info
    const author = await ctx.db.get(walk.authorId);

    return {
      ...walk,
      region,
      author,
    };
  },
});

// Get walks by region
export const getWalksByRegion = query({
  args: { 
    regionId: v.id("regions"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const walks = await ctx.db
      .query("walks")
      .withIndex("byRegion", (q) => q.eq("regionId", args.regionId))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .take(args.limit ?? 20);

    return walks;
  },
});

// Search walks
export const searchWalks = query({
  args: {
    searchTerm: v.string(),
    limit: v.optional(v.number()),
    difficulty: v.optional(v.union(v.literal("Easy"), v.literal("Moderate"), v.literal("Hard"), v.literal("Strenuous"))),
    minDistance: v.optional(v.number()),
    maxDistance: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let walks = await ctx.db
      .query("walks")
      .withIndex("byPublished", (q) => q.eq("isPublished", true))
      .collect();

    // Filter by search term (simple text search)
    if (args.searchTerm) {
      const searchLower = args.searchTerm.toLowerCase();
      walks = walks.filter(walk => 
        walk.title.toLowerCase().includes(searchLower) ||
        walk.description.toLowerCase().includes(searchLower) ||
        walk.shortDescription.toLowerCase().includes(searchLower) ||
        walk.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by difficulty
    if (args.difficulty) {
      walks = walks.filter(walk => walk.difficulty === args.difficulty);
    }

    // Filter by distance range
    if (args.minDistance !== undefined) {
      walks = walks.filter(walk => walk.distance >= args.minDistance!);
    }
    if (args.maxDistance !== undefined) {
      walks = walks.filter(walk => walk.distance <= args.maxDistance!);
    }

    // Sort by popularity (view count)
    walks.sort((a, b) => b.viewCount - a.viewCount);

    // Apply limit
    if (args.limit) {
      walks = walks.slice(0, args.limit);
    }

    // Get region info for each walk
    const walksWithRegion = await Promise.all(
      walks.map(async (walk) => {
        const region = await ctx.db.get(walk.regionId);
        return {
          ...walk,
          region,
        };
      })
    );

    return walksWithRegion;
  },
});

// Create a new walk
export const createWalk = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    shortDescription: v.string(),
    regionId: v.id("regions"),
    distance: v.number(),
    ascent: v.number(),
    difficulty: v.union(v.literal("Easy"), v.literal("Moderate"), v.literal("Hard"), v.literal("Strenuous")),
    estimatedTime: v.number(),
    latitude: v.number(),
    longitude: v.number(),
    maxElevation: v.number(),
    routeType: v.union(v.literal("Circular"), v.literal("Linear"), v.literal("Out and Back")),
    featuredImageUrl: v.string(),
    tags: v.array(v.string()),
    gpxStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get user from database
    const user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const walkId = await ctx.db.insert("walks", {
      title: args.title,
      slug: args.slug,
      description: args.description,
      shortDescription: args.shortDescription,
      regionId: args.regionId,
      distance: args.distance,
      ascent: args.ascent,
      difficulty: args.difficulty,
      estimatedTime: args.estimatedTime,
      latitude: args.latitude,
      longitude: args.longitude,
      maxElevation: args.maxElevation,
      routeType: args.routeType,
      gpxStorageId: args.gpxStorageId,
      authorId: user._id,
      featuredImageUrl: args.featuredImageUrl,
      tags: args.tags,
      isPublished: false,
      viewCount: 0,
      likeCount: 0,
      reportCount: 0,
      averageRating: 0,
    });

    return walkId;
  },
});

// Publish a walk
export const publishWalk = mutation({
  args: { walkId: v.id("walks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const walk = await ctx.db.get(args.walkId);
    if (!walk) {
      throw new Error("Walk not found");
    }

    await ctx.db.patch(args.walkId, {
      isPublished: true,
      publishedAt: Date.now(),
    });

    // Update region walk count
    const region = await ctx.db.get(walk.regionId);
    if (region) {
      await ctx.db.patch(walk.regionId, {
        walkCount: region.walkCount + 1,
      });
    }
  },
});

// Increment view count
export const incrementViewCount = mutation({
  args: { walkId: v.id("walks") },
  handler: async (ctx, args) => {
    const walk = await ctx.db.get(args.walkId);
    if (walk) {
      await ctx.db.patch(args.walkId, {
        viewCount: walk.viewCount + 1,
      });
    }
  },
});

// Update walk rating
export const updateWalkRating = mutation({
  args: { 
    walkId: v.id("walks"),
    newRating: v.number(),
    newReportCount: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.walkId, {
      averageRating: args.newRating,
      reportCount: args.newReportCount,
    });
  },
});