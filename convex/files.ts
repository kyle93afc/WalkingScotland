import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Generate an upload URL for GPX files
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

// Get GPX file download URL
export const getGpxDownloadUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// Store GPX file metadata after upload
export const storeGpxFile = mutation({
  args: {
    storageId: v.id("_storage"),
    walkId: v.optional(v.id("walks")),
    filename: v.string(),
    fileSize: v.number(),
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

    // Store file metadata (you might want to create a separate files table)
    return {
      storageId: args.storageId,
      uploadedBy: user._id,
      uploadedAt: Date.now(),
      filename: args.filename,
      fileSize: args.fileSize,
    };
  },
});

// Parse and validate GPX file content
export const validateGpxFile = mutation({
  args: { 
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    try {
      // Get the file content
      const fileUrl = await ctx.storage.getUrl(args.storageId);
      if (!fileUrl) {
        throw new Error("File not found");
      }

      // In a real implementation, you would:
      // 1. Fetch the file content
      // 2. Parse the GPX XML
      // 3. Extract track points, waypoints, metadata
      // 4. Validate the format
      // 5. Calculate statistics (distance, elevation gain, etc.)
      
      // For now, return mock validation data
      return {
        isValid: true,
        trackPoints: 245,
        distance: 17.2, // km
        elevationGain: 1352, // m
        bounds: {
          north: 56.8123,
          south: 56.7815,
          east: -4.9890,
          west: -5.0182,
        },
        metadata: {
          name: "Ben Nevis via Tourist Path",
          description: "GPS track for Ben Nevis climb",
          time: "2024-01-15T09:00:00Z",
        }
      };
    } catch (error) {
      return {
        isValid: false,
        error: "Failed to parse GPX file",
      };
    }
  },
});

// Get file metadata
export const getFileMetadata = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    // In a real app, you'd have a files table to store metadata
    // For now, return basic info from storage
    const url = await ctx.storage.getUrl(args.storageId);
    return {
      storageId: args.storageId,
      downloadUrl: url,
      uploadedAt: Date.now(),
    };
  },
});