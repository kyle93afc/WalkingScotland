import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all regions ordered by popularity
export const getAllRegions = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("regions")
      .withIndex("byPopularity", (q) => q.gt("popularityScore", 0))
      .order("desc")
      .collect();
  },
});

// Get a single region by slug
export const getRegionBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("regions")
      .withIndex("bySlug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Create a new region (admin function)
export const createRegion = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("regions", {
      name: args.name,
      slug: args.slug,
      description: args.description,
      imageUrl: args.imageUrl,
      walkCount: 0,
      popularityScore: 0,
    });
  },
});

// Update region walk count
export const updateRegionWalkCount = mutation({
  args: {
    regionId: v.id("regions"),
    increment: v.number(),
  },
  handler: async (ctx, args) => {
    const region = await ctx.db.get(args.regionId);
    if (!region) {
      throw new Error("Region not found");
    }

    await ctx.db.patch(args.regionId, {
      walkCount: Math.max(0, region.walkCount + args.increment),
    });
  },
});

// Update region popularity score
export const updateRegionPopularity = mutation({
  args: {
    regionId: v.id("regions"),
    newScore: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.regionId, {
      popularityScore: args.newScore,
    });
  },
});