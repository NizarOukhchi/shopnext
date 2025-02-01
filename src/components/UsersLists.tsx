"use client";

import { AnimatedBackground } from "@/components/ui/animated-background";
import { FolderIcon } from "lucide-react";
import Link from "next/link";
import { useSelectedList } from "./SelectedListContext";
import { api } from "../../convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";

interface UsersListsProps {
  preloadedLists: Preloaded<typeof api.lists.getLists>;
}

export default function UsersLists({ preloadedLists }: UsersListsProps) {
  const lists = usePreloadedQuery(preloadedLists);
  const { selectedList } = useSelectedList();
  return (
    <div className="flex flex-col space-y-1 z-0">
      <AnimatedBackground
        defaultValue={`nav-item-${selectedList?._id}`}
        className="rounded-lg bg-white shadow-1"
        childrenClassName="flex items-center gap-2"
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.3,
        }}
      >
        {lists.map((item) => (
          <div
            key={item._id}
            data-id={`nav-item-${item._id}`}
            className="text-foreground data-[checked=true]:text-primary font-semibold rounded-md text-md z-0"
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
      </AnimatedBackground>
    </div>
  );
}
