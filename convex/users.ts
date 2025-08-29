import { internalMutation, query, QueryCtx } from "./_generated/server";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
    const userAttributes = {
      name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
      externalId: data.id,
      imageUrl: data.image_url,
      subscriptionTier: "free" as const,
      joinedAt: Date.now(),
      lastActive: Date.now(),
    };

    const user = await userByExternalId(ctx, data.id);
    if (user === null) {
      await ctx.db.insert("users", userAttributes);
    } else {
      await ctx.db.patch(user._id, {
        name: userAttributes.name,
        imageUrl: userAttributes.imageUrl,
        lastActive: Date.now(),
      });
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByExternalId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
      );
    }
  },
});



export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byExternalId", (q) => q.eq("externalId", externalId))
    .unique();
}

// Get user statistics for dashboard
export const getUserStats = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return null;

    let stats = await ctx.db
      .query("user_stats")
      .withIndex("byUser", (q) => q.eq("userId", user._id))
      .first();

    // Return default stats if none exist yet
    if (!stats) {
      stats = {
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
        lastWalkDate: undefined,
        achievementBadges: [],
        _id: "" as any,
        _creationTime: Date.now(),
      };
    }

    return stats;
  },
});

// Get user's completed walks for history page
export const getUserWalkHistory = query({
  args: {
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    const reports = await ctx.db
      .query("walk_reports")
      .withIndex("byAuthor", (q) => q.eq("authorId", user._id))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .take((args.limit || 20) + (args.offset || 0));

    // Apply offset if provided
    const offsetReports = args.offset ? reports.slice(args.offset) : reports;

    // Get walk and region details for each report
    const reportsWithWalk = await Promise.all(
      offsetReports.map(async (report) => {
        const walk = await ctx.db.get(report.walkId);
        let region = null;
        
        if (walk) {
          region = await ctx.db.get(walk.regionId);
        }

        return {
          ...report,
          walk: walk ? { ...walk, region } : null,
        };
      })
    );

    return reportsWithWalk;
  },
});

// Get walking activity data for charts
export const getUserWalkingActivity = query({
  args: {
    timeRange: v.optional(v.union(
      v.literal("week"),
      v.literal("month"), 
      v.literal("3months"),
      v.literal("6months"),
      v.literal("year")
    )),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    const timeRange = args.timeRange || "6months";
    const now = Date.now();
    let startTime: number;

    switch (timeRange) {
      case "week":
        startTime = now - (7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startTime = now - (30 * 24 * 60 * 60 * 1000);
        break;
      case "3months":
        startTime = now - (90 * 24 * 60 * 60 * 1000);
        break;
      case "6months":
        startTime = now - (180 * 24 * 60 * 60 * 1000);
        break;
      case "year":
        startTime = now - (365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startTime = now - (180 * 24 * 60 * 60 * 1000);
    }

    const reports = await ctx.db
      .query("walk_reports")
      .withIndex("byAuthor", (q) => q.eq("authorId", user._id))
      .filter((q) => 
        q.and(
          q.eq(q.field("isPublished"), true),
          q.gte(q.field("completedAt"), startTime)
        )
      )
      .order("asc")
      .collect();

    // Group by day/week/month depending on time range
    const activityData: { [key: string]: { date: string; walks: number; distance: number; time: number } } = {};
    
    for (const report of reports) {
      const walk = await ctx.db.get(report.walkId);
      if (!walk) continue;

      const date = new Date(report.completedAt);
      let groupKey: string;

      if (timeRange === "week") {
        groupKey = date.toISOString().split('T')[0]; // Daily
      } else if (timeRange === "month") {
        groupKey = date.toISOString().split('T')[0]; // Daily
      } else {
        // Weekly grouping for longer periods
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        groupKey = weekStart.toISOString().split('T')[0];
      }

      if (!activityData[groupKey]) {
        activityData[groupKey] = {
          date: groupKey,
          walks: 0,
          distance: 0,
          time: 0,
        };
      }

      activityData[groupKey].walks += 1;
      activityData[groupKey].distance += walk.distance;
      activityData[groupKey].time += report.actualTime || walk.estimatedTime;
    }

    return Object.values(activityData).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  },
});

// Get achievement progress and badges
export const getUserAchievements = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return null;

    const stats = await ctx.db
      .query("user_stats")
      .withIndex("byUser", (q) => q.eq("userId", user._id))
      .first();

    if (!stats) {
      return {
        badges: [],
        progress: {
          munros: { current: 0, total: 282, percentage: 0 },
          corbetts: { current: 0, total: 222, percentage: 0 },
          donalds: { current: 0, total: 89, percentage: 0 },
          distance: { current: 0, milestone: 1000, percentage: 0 }, // Next 1000km milestone
          walks: { current: 0, milestone: 100, percentage: 0 }, // Next 100 walks milestone
        }
      };
    }

    // Calculate next milestones
    const distanceMilestones = [100, 250, 500, 1000, 2000, 5000];
    const walkMilestones = [10, 25, 50, 100, 200, 500];
    
    const nextDistanceMilestone = distanceMilestones.find(m => m > stats.totalDistance) || distanceMilestones[distanceMilestones.length - 1];
    const nextWalkMilestone = walkMilestones.find(m => m > stats.totalWalks) || walkMilestones[walkMilestones.length - 1];

    return {
      badges: stats.achievementBadges,
      progress: {
        munros: { 
          current: stats.munrosClimbed, 
          total: 282, 
          percentage: Math.round((stats.munrosClimbed / 282) * 100) 
        },
        corbetts: { 
          current: stats.corbettsClimbed, 
          total: 222, 
          percentage: Math.round((stats.corbettsClimbed / 222) * 100) 
        },
        donalds: { 
          current: stats.donaldsClimbed, 
          total: 89, 
          percentage: Math.round((stats.donaldsClimbed / 89) * 100) 
        },
        distance: { 
          current: Math.round(stats.totalDistance), 
          milestone: nextDistanceMilestone, 
          percentage: Math.round((stats.totalDistance / nextDistanceMilestone) * 100) 
        },
        walks: { 
          current: stats.totalWalks, 
          milestone: nextWalkMilestone, 
          percentage: Math.round((stats.totalWalks / nextWalkMilestone) * 100) 
        },
      }
    };
  },
});