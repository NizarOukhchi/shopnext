import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkAccess, checkAuth } from "./lib/auth";
import { paginationOptsValidator } from "convex/server";

export const getPaginatedProducts = query({
  args: {
    paginationOpts: paginationOptsValidator,
    listId: v.id("lists"),
  },
  handler: async (ctx, { listId, paginationOpts }) => {
    return await ctx.db
      .query("products")
      .withIndex("by_list", (q) => q.eq("listId", listId))
      .order("desc")
      .paginate(paginationOpts);
  },
});

export const create = mutation({
  args: {
    listId: v.id("lists"),
    name: v.string(),
    price: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await checkAuth(ctx);

    await checkAccess(ctx, args.listId, identity.subject, "write");
    return await ctx.db.insert("products", args);
  },
});

export const scrapeAndCreate = mutation({
  args: {
    listId: v.id("lists"),
    url: v.string(),
  },
  handler: async (ctx, { listId, url }) => {
    const identity = await checkAuth(ctx);

    await checkAccess(ctx, listId, identity.subject, "write");

    return await ctx.db.insert("products", {
      listId,
      url,
      name: "fake product",
    });
  },
});

export const deleteProduct = mutation({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, { productId }) => {
    const identity = await checkAuth(ctx);

    const product = await ctx.db.get(productId);
    if (!product) throw new Error("Product not found");

    await checkAccess(ctx, product.listId, identity.subject, "write");
    await ctx.db.delete(productId);
    return true;
  },
});

export const transferProduct = mutation({
  args: {
    productId: v.id("products"),
    newListId: v.id("lists"),
  },
  handler: async (ctx, { productId, newListId }) => {
    // Verify both the product and target list exist
    const [product, targetList] = await Promise.all([
      ctx.db.get(productId),
      ctx.db.get(newListId),
    ]);

    if (!product) {
      throw new ConvexError("Product not found");
    }

    if (!targetList) {
      throw new ConvexError("Target list not found");
    }

    // Don't transfer if product is already in the target list
    if (product.listId === newListId) {
      throw new ConvexError("Product is already in this list");
    }

    // Update the product's listId
    await ctx.db.patch(productId, {
      listId: newListId,
    });

    return true;
  },
});

export const searchProducts = query({
  args: {
    searchQuery: v.string(),
  },
  handler: async (ctx, { searchQuery }) => {
    const identity = await checkAuth(ctx);

    // Get all lists the user has access to
    const accessibleLists = await ctx.db
      .query("lists")
      .withIndex("by_creator", (q) => q.eq("creatorId", identity.subject))
      .collect();

    // Get lists shared with the user
    const sharedLists = await ctx.db
      .query("shares")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    // Combine all list IDs the user has access to
    const listIds = [
      ...accessibleLists.map((list) => list._id),
      ...sharedLists.map((access) => access.listId),
    ];

    if (listIds.length === 0) {
      return [];
    }

    // Search products in all accessible lists that match the search query
    const products = await ctx.db
      .query("products")
      .withSearchIndex("search_name", (q) => q.search("name", searchQuery))
      .take(100);

    const filteredProducts = products.filter((product) =>
      listIds.includes(product.listId)
    );

    return filteredProducts;
  },
});
