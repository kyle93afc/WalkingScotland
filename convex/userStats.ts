import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser } from "./users";

// Get current user's walking statistics
export const getUserStats = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return null;

    const stats = await ctx.db
      .query("user_stats")
      .withIndex("byUser", (q) => q.eq("userId", user._id))
      .first();

    return stats;
  },
});

// Get user's recent walking activity for charts
export const getWalkingActivity = query({
  args: { 
    days: v.optional(v.number()) // defaults to 90 days
  },
  handler: async (ctx, { days = 90 }) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    const startDate = Date.now() - (days * 24 * 60 * 60 * 1000);

    // Get walk reports from the user in the last X days
    const reports = await ctx.db
      .query("walk_reports")
      .withIndex("byAuthor", (q) => q.eq("authorId", user._id))
      .filter((q) => q.gte(q.field("completedAt"), startDate))
      .collect();

    // Group by date and count walks and route views
    const activityByDate = new Map();
    
    // Initialize all dates with 0 values
    for (let i = 0; i < days; i++) {
      const date = new Date(Date.now() - (i * 24 * 60 * 60 * 1000));
      const dateStr = date.toISOString().split('T')[0];
      activityByDate.set(dateStr, {
        date: dateStr,
        walksLogged: 0,
        routeViews: 0,
      });
    }

    // Count actual walks completed
    reports.forEach(report => {
      const date = new Date(report.completedAt).toISOString().split('T')[0];
      if (activityByDate.has(date)) {
        const day = activityByDate.get(date);
        day.walksLogged += 1;
        // Simulate route views (in a real app, you'd track these separately)
        day.routeViews += Math.floor(Math.random() * 3) + 1;
      }
    });

    return Array.from(activityByDate.values()).reverse();
  },
});

// Initialize user stats when they sign up
export const initializeUserStats = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("User not authenticated");

    // Check if stats already exist
    const existingStats = await ctx.db
      .query("user_stats")
      .withIndex("byUser", (q) => q.eq("userId", user._id))
      .first();

    if (existingStats) return existingStats._id;

    // Create initial stats
    const statsId = await ctx.db.insert("user_stats", {
      userId: user._id,
      totalWalks: 0,
      totalDistance: 0,
      totalAscent: 0,
      totalTime: 0,
      munrosClimbed: 0,
      corbettsClimbed: 0,
      donaldsClimbed: 0,
      reportsWritten: 0,
      photosUploaded: 0,
      achievementBadges: [],
    });

    return statsId;
  },
});

// Update user stats when they complete a walk
export const updateStatsAfterWalk = mutation({
  args: {
    walkId: v.id("walks"),
    distance: v.number(),
    ascent: v.number(),
    time: v.number(),
    walkType: v.optional(v.string()), // "Munro", "Corbett", "Donald", etc.
  },
  handler: async (ctx, { walkId, distance, ascent, time, walkType }) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("User not authenticated");

    let stats = await ctx.db
      .query("user_stats")
      .withIndex("byUser", (q) => q.eq("userId", user._id))
      .first();

    if (!stats) {
      // Initialize stats if they don't exist
      const statsId = await ctx.db.insert("user_stats", {
        userId: user._id,
        totalWalks: 1,
        totalDistance: distance,
        totalAscent: ascent,
        totalTime: time,
        munrosClimbed: walkType === "Munro" ? 1 : 0,
        corbettsClimbed: walkType === "Corbett" ? 1 : 0,
        donaldsClimbed: walkType === "Donald" ? 1 : 0,
        reportsWritten: 0,
        photosUploaded: 0,
        lastWalkDate: Date.now(),
        achievementBadges: [],
      });
      return statsId;
    }

    // Update existing stats
    await ctx.db.patch(stats._id, {
      totalWalks: stats.totalWalks + 1,
      totalDistance: stats.totalDistance + distance,
      totalAscent: stats.totalAscent + ascent,
      totalTime: stats.totalTime + time,
      munrosClimbed: walkType === "Munro" ? stats.munrosClimbed + 1 : stats.munrosClimbed,
      corbettsClimbed: walkType === "Corbett" ? stats.corbettsClimbed + 1 : stats.corbettsClimbed,
      donaldsClimbed: walkType === "Donald" ? stats.donaldsClimbed + 1 : stats.donaldsClimbed,
      lastWalkDate: Date.now(),
    });

    return stats._id;
  },
});