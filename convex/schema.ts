import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { paymentAttemptSchemaValidator } from "./paymentAttemptTypes";

export default defineSchema({
    users: defineTable({
      name: v.string(),
      // this the Clerk ID, stored in the subject JWT field
      externalId: v.string(),
      imageUrl: v.optional(v.string()),
      subscriptionTier: v.union(v.literal("free"), v.literal("premium")),
      stripeCustomerId: v.optional(v.string()),
      joinedAt: v.number(),
      lastActive: v.number(),
    }).index("byExternalId", ["externalId"])
      .index("bySubscriptionTier", ["subscriptionTier"]),
    
    paymentAttempts: defineTable(paymentAttemptSchemaValidator)
      .index("byPaymentId", ["payment_id"])
      .index("byUserId", ["userId"])
      .index("byPayerUserId", ["payer.user_id"]),

    regions: defineTable({
      name: v.string(),
      slug: v.string(),
      description: v.string(),
      imageUrl: v.string(),
      walkCount: v.number(),
      popularityScore: v.number(),
    }).index("bySlug", ["slug"])
      .index("byPopularity", ["popularityScore"]),

    walks: defineTable({
      title: v.string(),
      slug: v.string(),
      description: v.string(),
      shortDescription: v.string(),
      regionId: v.id("regions"),
      distance: v.number(), // in kilometers
      ascent: v.number(), // in meters
      difficulty: v.union(v.literal("Easy"), v.literal("Moderate"), v.literal("Hard"), v.literal("Strenuous")),
      estimatedTime: v.number(), // in hours
      latitude: v.number(),
      longitude: v.number(),
      maxElevation: v.number(), // in meters
      routeType: v.union(v.literal("Circular"), v.literal("Linear"), v.literal("Out and Back")),
      gpxStorageId: v.optional(v.id("_storage")),
      authorId: v.id("users"),
      featuredImageUrl: v.string(),
      tags: v.array(v.string()), // e.g., ["waterfall", "historic", "family-friendly"]
      isPublished: v.boolean(),
      publishedAt: v.optional(v.number()),
      viewCount: v.number(),
      likeCount: v.number(),
      reportCount: v.number(),
      averageRating: v.number(),
      // Enhanced fields for detailed walks
      terrain: v.optional(v.string()), // Terrain description from WalkHighlands
      startGridRef: v.optional(v.string()), // OS Grid Reference (e.g., "NG342359")
      parkingInfo: v.optional(v.string()), // Parking and access information
      publicTransport: v.optional(v.string()), // Bus/train access info
      bogFactor: v.optional(v.number()), // 1-5 rating of bog/mud conditions
      detailedDescription: v.optional(v.string()), // Longer description with more detail
      sourceUrl: v.optional(v.string()), // Original WalkHighlands URL for reference
    }).index("bySlug", ["slug"])
      .index("byRegion", ["regionId"])
      .index("byDifficulty", ["difficulty"])
      .index("byDistance", ["distance"])
      .index("byPopularity", ["viewCount"])
      .index("byRating", ["averageRating"])
      .index("byLocation", ["latitude", "longitude"])
      .index("byPublished", ["isPublished", "publishedAt"])
      .index("byTerrain", ["terrain"])
      .index("byBogFactor", ["bogFactor"]),

    walk_stages: defineTable({
      walkId: v.id("walks"),
      stageNumber: v.number(), // 1, 2, 3, etc.
      title: v.optional(v.string()), // Optional stage title (e.g., "Parking to Trailhead")
      description: v.string(), // Detailed stage directions
      distance: v.optional(v.number()), // Distance for this stage in km (if available)
      duration: v.optional(v.number()), // Estimated time for this stage in minutes
      elevation: v.optional(v.number()), // Elevation gain/loss for this stage
      imageUrl: v.optional(v.string()), // Optional image for this stage
      gpsCoordinates: v.optional(v.object({
        lat: v.number(),
        lng: v.number()
      })), // GPS coordinates for this stage waypoint
      terrain: v.optional(v.string()), // Specific terrain for this stage
      landmarks: v.optional(v.array(v.string())), // Key landmarks/features in this stage
      warnings: v.optional(v.array(v.string())), // Safety warnings for this stage
      createdAt: v.number(),
    }).index("byWalk", ["walkId"])
      .index("byWalkAndStage", ["walkId", "stageNumber"]),

    walk_reports: defineTable({
      walkId: v.id("walks"),
      authorId: v.id("users"),
      title: v.string(),
      content: v.string(),
      rating: v.number(), // 1-5 stars
      completedAt: v.number(),
      weatherConditions: v.optional(v.string()),
      trailConditions: v.optional(v.string()),
      difficulty: v.optional(v.union(v.literal("Easy"), v.literal("Moderate"), v.literal("Hard"), v.literal("Strenuous"))),
      actualTime: v.optional(v.number()), // actual time taken in hours
      isPublished: v.boolean(),
      publishedAt: v.optional(v.number()),
      likeCount: v.number(),
      commentCount: v.number(),
    }).index("byWalk", ["walkId"])
      .index("byAuthor", ["authorId"])
      .index("byPublished", ["isPublished", "publishedAt"])
      .index("byRating", ["rating"]),

    photos: defineTable({
      storageId: v.id("_storage"),
      caption: v.optional(v.string()),
      uploaderId: v.id("users"),
      walkId: v.optional(v.id("walks")),
      reportId: v.optional(v.id("walk_reports")),
      latitude: v.optional(v.number()),
      longitude: v.optional(v.number()),
      takenAt: v.optional(v.number()),
      uploadedAt: v.number(),
    }).index("byUploader", ["uploaderId"])
      .index("byWalk", ["walkId"])
      .index("byReport", ["reportId"]),

    likes: defineTable({
      userId: v.id("users"),
      targetId: v.string(), // ID of liked item (walk or report)
      targetType: v.union(v.literal("walk"), v.literal("report")),
      likedAt: v.number(),
    }).index("byUser", ["userId"])
      .index("byTarget", ["targetId", "targetType"])
      .index("byUserAndTarget", ["userId", "targetId"]),

    comments: defineTable({
      userId: v.id("users"),
      reportId: v.id("walk_reports"),
      content: v.string(),
      parentCommentId: v.optional(v.id("comments")), // for replies
      isDeleted: v.boolean(),
      createdAt: v.number(),
      updatedAt: v.optional(v.number()),
    }).index("byReport", ["reportId"])
      .index("byUser", ["userId"])
      .index("byParent", ["parentCommentId"]),

    user_stats: defineTable({
      userId: v.id("users"),
      totalWalks: v.number(),
      totalDistance: v.number(),
      totalAscent: v.number(),
      totalTime: v.number(),
      munrosClimbed: v.number(),
      corbettsClimbed: v.number(),
      donaldsClimbed: v.number(),
      reportsWritten: v.number(),
      photosUploaded: v.number(),
      lastWalkDate: v.optional(v.number()),
      achievementBadges: v.array(v.string()),
    }).index("byUser", ["userId"]),

    live_locations: defineTable({
      userId: v.id("users"),
      walkId: v.optional(v.id("walks")),
      latitude: v.number(),
      longitude: v.number(),
      altitude: v.optional(v.number()),
      accuracy: v.optional(v.number()),
      timestamp: v.number(),
      isActive: v.boolean(),
      sharedWith: v.array(v.string()), // array of user IDs
    }).index("byUser", ["userId"])
      .index("byWalk", ["walkId"])
      .index("byActive", ["isActive"])
      .index("byLocation", ["latitude", "longitude"]),
  });