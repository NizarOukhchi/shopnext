"use client";

import { AnimatedBackground } from "@/components/ui/animated-background";
import { FolderIcon } from "lucide-react";
import Link from "next/link";
import { api } from "../../convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Doc } from "../../convex/_generated/dataModel";
interface UsersListsProps {
  preloadedLists: Preloaded<typeof api.lists.getLists>;
}

export function UsersLists({ preloadedLists }: UsersListsProps) {
  const lists = usePreloadedQuery(preloadedLists);
  const { _id } = useParams<{ _id: string }>();
  const selectedList = lists.find((list: Doc<"lists">) => list._id === _id);
  return (
    <div className="flex flex-col space-y-1 z-0">
      <AnimatedBackground
        defaultValue={`nav-item-${selectedList?._id}`}
        className="rounded-lg bg-white shadow-1"
        childrenClassName="flex items-center gap-2"
        titleClassName="flex items-center mt-5 mb-1 text-sm font-medium ml-4 text-tertiary"
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.3,
        }}
      >
        {lists.map((item: Doc<"lists">) => (
          <div
            key={item._id}
            data-id={`nav-item-${item._id}`}
            className="text-foreground data-[checked=true]:text-primary rounded-md text-md z-0"
          >
            <Link
              href={`/lists/${item._id}`}
              className="flex items-center w-full gap-2 px-3 py-2"
            >
              <span className="w-4 h-4">
                <FolderIcon size={20} />
              </span>
              <span className="relative top-[1px] ml-1 truncate capitalize">
                {item.name}
              </span>
            </Link>
          </div>
        ))}
        <div
          key="nav-item-shared-title"
          data-id="nav-item-shared-title"
          data-is-title
        >
          Shared lists
        </div>
      </AnimatedBackground>
    </div>
  );
}
