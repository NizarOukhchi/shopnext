import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { getAuthToken } from "@/app/auth";
import { redirect } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { ListHeader } from "./ListHeader";
export default async function ListPage({
  params,
}: {
  params: Promise<{ _id: Id<"lists"> }>;
}) {
  const _id = (await params)._id;
  const token = await getAuthToken();
  if (!token) {
    redirect("/sign-in");
  }
  const list = await fetchQuery(
    api.lists.getListById,
    {
      id: _id,
    },
    { token }
  );
  return (
    <div className="flex flex-col gap-8 h-full">
      <ListHeader list={list} />
      <ProductGrid listId={_id} />
    </div>
  );
}
