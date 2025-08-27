import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Check if user has liked a specific item
export const getUserLike = query({
  args: {
    targetId: v.string(),
    targetType: v.union(v.literal("walk"), v.literal("report")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", identity.subject))
      .first();

    if (!user) {
      return null;
    }

    return await ctx.db
      .query("likes")
      .withIndex("byUserAndTarget", (q) => 
        q.eq("userId", user._id).eq("targetId", args.targetId)
      )
      .filter((q) => q.eq(q.field("targetType"), args.targetType))
      .first();
  },
});

// Get all likes for an item
export const getLikesForTarget = query({
  args: {
    targetId: v.string(),
    targetType: v.union(v.literal("walk"), v.literal("report")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const likes = await ctx.db
      .query("likes")
      .withIndex("byTarget", (q) => 
        q.eq("targetId", args.targetId).eq("targetType", args.targetType)
      )
      .order("desc")
      .take(args.limit ?? 50);

    // Get user info for each like
    const likesWithUsers = await Promise.all(
      likes.map(async (like) => {
        const user = await ctx.db.get(like.userId);
        return {
          ...like,
          user,
        };
      })
    );

    return likesWithUsers;
  },
});

// Get like count for an item
export const getLikeCount = query({
  args: {
    targetId: v.string(),
    targetType: v.union(v.literal("walk"), v.literal("report")),
  },
  handler: async (ctx, args) => {
    const likes = await ctx.db
      .query("likes")
      .withIndex("byTarget", (q) => 
        q.eq("targetId", args.targetId).eq("targetType", args.targetType)
      )
      .collect();

    return likes.length;
  },
});

// Toggle like on an item
export const toggleLike = mutation({
  args: {
    targetId: v.string(),
    targetType: v.union(v.literal("walk"), v.literal("report")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Check if user has already liked this item
    const existingLike = await ctx.db
      .query("likes")
      .withIndex("byUserAndTarget", (q) => 
        q.eq("userId", user._id).eq("targetId", args.targetId)
      )
      .filter((q) => q.eq(q.field("targetType"), args.targetType))
      .first();

    if (existingLike) {
      // Remove like
      await ctx.db.delete(existingLike._id);

      // Update like count in target item
      if (args.targetType === "walk") {
        const walk = await ctx.db.get(args.targetId as any);
        if (walk && 'likeCount' in walk) {
          await ctx.db.patch(args.targetId as any, {
            likeCount: Math.max(0, walk.likeCount - 1),
          });
        }
      } else if (args.targetType === "report") {
        const report = await ctx.db.get(args.targetId as any);
        if (report && 'likeCount' in report) {
          await ctx.db.patch(args.targetId as any, {
            likeCount: Math.max(0, report.likeCount - 1),
          });
        }
      }

      return { liked: false };
    } else {
      // Add like
      await ctx.db.insert("likes", {
        userId: user._id,
        targetId: args.targetId,
        targetType: args.targetType,
        likedAt: Date.now(),
      });

      // Update like count in target item
      if (args.targetType === "walk") {
        const walk = await ctx.db.get(args.targetId as any);
        if (walk && 'likeCount' in walk) {
          await ctx.db.patch(args.targetId as any, {
            likeCount: walk.likeCount + 1,
          });
        }
      } else if (args.targetType === "report") {
        const report = await ctx.db.get(args.targetId as any);
        if (report && 'likeCount' in report) {
          await ctx.db.patch(args.targetId as any, {
            likeCount: report.likeCount + 1,
          });
        }
      }

      return { liked: true };
    }
  },
});

// Get user's recent likes (for activity feed)
export const getUserRecentLikes = query({
  args: { 
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const likes = await ctx.db
      .query("likes")
      .withIndex("byUser", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(args.limit ?? 20);

    // Get target details for each like
    const likesWithTargets = await Promise.all(
      likes.map(async (like) => {
        let target = null;
        if (like.targetType === "walk") {
          target = await ctx.db.get(like.targetId as any);
          if (target && 'regionId' in target) {
            const region = await ctx.db.get(target.regionId);
            target = { ...target, region };
          }
        } else if (like.targetType === "report") {
          target = await ctx.db.get(like.targetId as any);
          if (target && 'walkId' in target && target.walkId) {
            const walk = await ctx.db.get(target.walkId);
            let region = null;
            if (walk && 'regionId' in walk) {
              region = await ctx.db.get(walk.regionId);
            }
            target = { ...target, walk: walk ? { ...walk, region } : null };
          }
        }
        
        return {
          ...like,
          target,
        };
      })
    );

    return likesWithTargets;
  },
});