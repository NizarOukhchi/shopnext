import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkAuth } from "./lib/auth";

export const getLists = query({
  args: {},
  handler: async (ctx) => {
    const identity = await checkAuth(ctx);

    // Fetch created lists
    const createdLists = await ctx.db
      .query("lists")
      .withIndex("by_creator", (q) => q.eq("creatorId", identity.subject))
      .collect();

    // Fetch shared lists
    const sharedEntries = await ctx.db
      .query("shares")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const sharedLists = await Promise.all(
      sharedEntries.map((entry) => ctx.db.get(entry.listId))
    ).then((lists) => lists.filter((l) => l !== null));

    // Filter out any null values from deleted lists
    return [...createdLists, ...sharedLists].sort(
      (a, b) => b._creationTime - a._creationTime
    );
  },
});

export const getListById = query({
  args: { id: v.id("lists") },
  handler: async (ctx, { id }) => {
    const identity = await checkAuth(ctx);

    const list = await ctx.db.get(id);
    if (!list) throw new Error("List not found");

    if (list.creatorId !== identity.subject) {
      throw new Error("You are not authorized to view this list");
    }

    return list;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await checkAuth(ctx);

    return await ctx.db.insert("lists", {
      name: args.name,
      creatorId: identity.subject,
    });
  },
});

export const deleteList = mutation({
  args: {
    listId: v.id("lists"),
  },
  handler: async (ctx, { listId }) => {
    const identity = await checkAuth(ctx);

    const list = await ctx.db.get(listId);
    if (!list) throw new Error("List not found");

    // Only creator can delete the list
    if (list.creatorId !== identity.subject) {
      throw new Error("Only the creator can delete the list");
    }

    // Delete all shares for this list
    await ctx.db
      .query("shares")
      .withIndex("by_list", (q) => q.eq("listId", listId))
      .collect()
      .then((shares) => {
        shares.forEach((share) => ctx.db.delete(share._id));
      });

    // Delete all products in the list
    await ctx.db
      .query("products")
      .withIndex("by_list", (q) => q.eq("listId", listId))
      .collect()
      .then((products) => {
        products.forEach((product) => ctx.db.delete(product._id));
      });

    // Delete the list
    await ctx.db.delete(listId);
    return true;
  },
});

export const shareList = mutation({
  args: {
    listId: v.id("lists"),
    userId: v.string(),
    access: v.union(v.literal("read"), v.literal("write")),
  },
  handler: async (ctx, { listId, userId, access }) => {
    const identity = await checkAuth(ctx);

    const list = await ctx.db.get(listId);
    if (!list) throw new Error("List not found");

    // Only creator can share the list
    if (list.creatorId !== identity.subject) {
      throw new Error("Only the creator can share the list");
    }

    // Remove existing share if any
    const existingShare = await ctx.db
      .query("shares")
      .withIndex("by_list", (q) => q.eq("listId", listId).eq("userId", userId))
      .first();

    if (existingShare) {
      await ctx.db.delete(existingShare._id);
    }

    // Create new share
    await ctx.db.insert("shares", { listId, userId, access });
    return true;
  },
});

export const removeShare = mutation({
  args: {
    listId: v.id("lists"),
    userId: v.string(),
  },
  handler: async (ctx, { listId, userId }) => {
    const identity = await checkAuth(ctx);

    const list = await ctx.db.get(listId);
    if (!list) throw new Error("List not found");

    // Only creator can modify shares
    if (list.creatorId !== identity.subject) {
      throw new Error("Only the creator can modify shares");
    }

    // Delete the share
    const share = await ctx.db
      .query("shares")
      .withIndex("by_list", (q) => q.eq("listId", listId).eq("userId", userId))
      .first();

    if (share) {
      await ctx.db.delete(share._id);
    }
    return true;
  },
});

export const getSharedLists = query({
  args: {},
  handler: async (ctx) => {
    const identity = await checkAuth(ctx);

    const sharedEntries = await ctx.db
      .query("shares")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const lists = await Promise.all(
      sharedEntries.map((entry) => ctx.db.get(entry.listId))
    );

    return lists.filter(Boolean);
  },
});

export const getOwnedLists = query({
  args: {},
  handler: async (ctx) => {
    const identity = await checkAuth(ctx);

    return await ctx.db
      .query("lists")
      .filter((q) => q.eq(q.field("creatorId"), identity.subject))
      .collect();
  },
});
