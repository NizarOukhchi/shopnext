"use client";

import { CreateProductPopover } from "@/components/CreateProductPopover";
import { DeleteListPopover } from "@/components/DeleteListPopover";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useEffect } from "react";

type ListPageHeaderProps = {
  list: Doc<"lists">;
};

export function ListHeader({ list }: ListPageHeaderProps) {
  useEffect(() => {
    console.log("rendered list header", list.name);
  }, [list]);
  return (
    <div className="flex items-center gap-4 z-10">
      <div className="flex items-center gap-2 max-w-[500px]">
        <h1
          aria-label={list.name}
          className="text-2xl font-bold capitalize truncate text-tertiary"
        >
          {list.name}
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <DeleteListPopover listId={list._id} />
        <CreateProductPopover />
      </div>
    </div>
  );
}
