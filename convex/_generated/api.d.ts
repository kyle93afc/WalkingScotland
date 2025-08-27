/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as likes from "../likes.js";
import type * as paymentAttemptTypes from "../paymentAttemptTypes.js";
import type * as paymentAttempts from "../paymentAttempts.js";
import type * as regions from "../regions.js";
import type * as seed from "../seed.js";
import type * as seed_new from "../seed_new.js";
import type * as users from "../users.js";
import type * as walkReports from "../walkReports.js";
import type * as walkStages from "../walkStages.js";
import type * as walks from "../walks.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  files: typeof files;
  http: typeof http;
  likes: typeof likes;
  paymentAttemptTypes: typeof paymentAttemptTypes;
  paymentAttempts: typeof paymentAttempts;
  regions: typeof regions;
  seed: typeof seed;
  seed_new: typeof seed_new;
  users: typeof users;
  walkReports: typeof walkReports;
  walkStages: typeof walkStages;
  walks: typeof walks;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
