"use client";

import { useEffect } from "react";
import { useSelectedList } from "./SelectedListContext";
import { FunctionReturnType } from "convex/server";
import { api } from "../../convex/_generated/api";

interface ListDetailsProps {
  list: FunctionReturnType<typeof api.lists.getListById>;
}

export function ListDetails({ list }: ListDetailsProps) {
  const { setSelectedList } = useSelectedList();

  useEffect(() => {
    if (list) {
      setSelectedList(list);
    }
  }, [list, setSelectedList]);

  return list ? (
    <div>
      <h1 className="text-2xl font-bold capitalize truncate">{list.name}</h1>
    </div>
  ) : null;
}
