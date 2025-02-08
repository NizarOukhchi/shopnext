import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { CreateProductPopover } from "@/components/CreateProductPopover";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { getAuthToken } from "@/app/auth";
import { redirect } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { Suspense } from "react";

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
      <div className="flex items-center gap-4 z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold capitalize truncate">
            {list.name}
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="secondary" size="icon">
            <Trash2Icon size={25} />
          </Button>
          <CreateProductPopover />
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductGrid listId={_id} />
      </Suspense>
    </div>
  );
}
