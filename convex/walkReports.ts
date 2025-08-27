import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get reports for a specific walk
export const getReportsByWalk = query({
  args: { 
    walkId: v.id("walks"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const reports = await ctx.db
      .query("walk_reports")
      .withIndex("byWalk", (q) => q.eq("walkId", args.walkId))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .take(args.limit ?? 20);

    // Get author info for each report
    const reportsWithAuthor = await Promise.all(
      reports.map(async (report) => {
        const author = await ctx.db.get(report.authorId);
        return {
          ...report,
          author,
        };
      })
    );

    return reportsWithAuthor;
  },
});

// Get reports by a specific user
export const getReportsByUser = query({
  args: { 
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const reports = await ctx.db
      .query("walk_reports")
      .withIndex("byAuthor", (q) => q.eq("authorId", args.userId))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .take(args.limit ?? 10);

    // Get walk info for each report
    const reportsWithWalk = await Promise.all(
      reports.map(async (report) => {
        const walk = await ctx.db.get(report.walkId);
        const region = walk ? await ctx.db.get(walk.regionId) : null;
        return {
          ...report,
          walk: walk ? { ...walk, region } : null,
        };
      })
    );

    return reportsWithWalk;
  },
});

// Get recent reports for activity feed
export const getRecentReports = query({
  args: { 
    limit: v.optional(v.number()),
    regionId: v.optional(v.id("regions")),
  },
  handler: async (ctx, args) => {
    let reports = await ctx.db
      .query("walk_reports")
      .withIndex("byPublished", (q) => q.eq("isPublished", true))
      .order("desc")
      .take(args.limit ?? 20);

    // Filter by region if specified
    if (args.regionId) {
      const filteredReports = [];
      for (const report of reports) {
        const walk = await ctx.db.get(report.walkId);
        if (walk && walk.regionId === args.regionId) {
          filteredReports.push(report);
        }
      }
      reports = filteredReports;
    }

    // Get author and walk info for each report
    const reportsWithDetails = await Promise.all(
      reports.map(async (report) => {
        const [author, walk] = await Promise.all([
          ctx.db.get(report.authorId),
          ctx.db.get(report.walkId)
        ]);
        
        let region = null;
        if (walk) {
          region = await ctx.db.get(walk.regionId);
        }

        return {
          ...report,
          author,
          walk: walk ? { ...walk, region } : null,
        };
      })
    );

    return reportsWithDetails;
  },
});

// Create a new walk report
export const createWalkReport = mutation({
  args: {
    walkId: v.id("walks"),
    title: v.string(),
    content: v.string(),
    rating: v.number(),
    completedAt: v.number(),
    weatherConditions: v.optional(v.string()),
    trailConditions: v.optional(v.string()),
    difficulty: v.optional(v.union(v.literal("Easy"), v.literal("Moderate"), v.literal("Hard"), v.literal("Strenuous"))),
    actualTime: v.optional(v.number()),
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

    // Validate rating
    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const reportId = await ctx.db.insert("walk_reports", {
      walkId: args.walkId,
      authorId: user._id,
      title: args.title,
      content: args.content,
      rating: args.rating,
      completedAt: args.completedAt,
      weatherConditions: args.weatherConditions,
      trailConditions: args.trailConditions,
      difficulty: args.difficulty,
      actualTime: args.actualTime,
      isPublished: false, // Require moderation or auto-publish
      likeCount: 0,
      commentCount: 0,
    });

    return reportId;
  },
});

// Publish a walk report
export const publishWalkReport = mutation({
  args: { reportId: v.id("walk_reports") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const report = await ctx.db.get(args.reportId);
    if (!report) {
      throw new Error("Report not found");
    }

    // Check if user is the author or admin
    const user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", identity.subject))
      .first();

    if (!user || user._id !== report.authorId) {
      throw new Error("Not authorized");
    }

    await ctx.db.patch(args.reportId, {
      isPublished: true,
      publishedAt: Date.now(),
    });

    // Update walk's report count and average rating
    const allReports = await ctx.db
      .query("walk_reports")
      .withIndex("byWalk", (q) => q.eq("walkId", report.walkId))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();

    if (allReports.length > 0) {
      const totalRating = allReports.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / allReports.length;

      await ctx.db.patch(report.walkId, {
        reportCount: allReports.length,
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      });
    }

    return args.reportId;
  },
});

// Update report like count
export const updateReportLikeCount = mutation({
  args: { 
    reportId: v.id("walk_reports"),
    increment: v.number(),
  },
  handler: async (ctx, args) => {
    const report = await ctx.db.get(args.reportId);
    if (!report) {
      throw new Error("Report not found");
    }

    await ctx.db.patch(args.reportId, {
      likeCount: Math.max(0, report.likeCount + args.increment),
    });
  },
});

// Update report comment count
export const updateReportCommentCount = mutation({
  args: { 
    reportId: v.id("walk_reports"),
    increment: v.number(),
  },
  handler: async (ctx, args) => {
    const report = await ctx.db.get(args.reportId);
    if (!report) {
      throw new Error("Report not found");
    }

    await ctx.db.patch(args.reportId, {
      commentCount: Math.max(0, report.commentCount + args.increment),
    });
  },
});