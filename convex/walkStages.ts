import { v } from "convex/values";
import { query } from "./_generated/server";

// Get stages for a specific walk
export const getStagesByWalkId = query({
  args: { walkId: v.id("walks") },
  handler: async (ctx, args) => {
    const stages = await ctx.db
      .query("walk_stages")
      .withIndex("byWalk", (q) => q.eq("walkId", args.walkId))
      .collect();

    // Sort stages by stage number
    return stages.sort((a, b) => a.stageNumber - b.stageNumber);
  },
});

// Get all walk stages for testing
export const getAllStages = query({
  args: {},
  handler: async (ctx, args) => {
    const stages = await ctx.db
      .query("walk_stages")
      .collect();

    return stages.sort((a, b) => a.stageNumber - b.stageNumber);
  },
});