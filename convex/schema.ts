import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  lists: defineTable({
    name: v.string(),
    creatorId: v.string(), // Clerk user ID
    isPublic: v.boolean(),
  }).index("by_creator", ["creatorId"]),

  shares: defineTable({
    listId: v.id("lists"),
    userId: v.string(), // Clerk user ID
    access: v.union(v.literal("read"), v.literal("write")),
  })
    .index("by_user", ["userId", "listId"])
    .index("by_list", ["listId", "userId"]),

  products: defineTable({
    listId: v.id("lists"),
    name: v.string(),
    price: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    url: v.string(),
  })
    .index("by_list", ["listId"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["listId"],
    }),
});
