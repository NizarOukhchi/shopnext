import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { ListDetails } from "@/components/ListDetails";
import { CreateProductPopover } from "@/components/CreateProductPopover";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { getAuthToken } from "@/app/auth";
import { redirect } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
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
    <div className="flex flex-col h-full">
      <div className="flex items-start gap-4 py-5 h-32 sticky top-0 z-10 bg-background">
        {list && <ListDetails list={list} />}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Trash2Icon size={25} />
          </Button>
          <CreateProductPopover />
        </div>
      </div>

      <ProductGrid listId={_id} />
    </div>
  );
}
