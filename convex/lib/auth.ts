import { QueryCtx, MutationCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { ConvexError } from "convex/values";

export async function checkAuth(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new ConvexError("Unauthenticated");
  return identity;
}

export async function checkAccess(
  ctx: QueryCtx | MutationCtx,
  listId: Id<"lists">,
  userId: string,
  requiredAccess: "read" | "write" = "read"
) {
  const list = await ctx.db.get(listId);
  if (!list) throw new ConvexError("List not found");

  // Creator has full access
  if (list.creatorId === userId) return true;

  // Check shared access
  const share = await ctx.db
    .query("shares")
    .withIndex("by_list", (q) => q.eq("listId", listId).eq("userId", userId))
    .first();

  if (!share) throw new ConvexError("Access denied");
  if (requiredAccess === "write" && share.access !== "write") {
    throw new ConvexError("Write access required");
  }

  return true;
}
