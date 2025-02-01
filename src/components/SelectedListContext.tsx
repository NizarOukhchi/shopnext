// context/SelectedListContext.tsx
"use client";

import { List } from "@/types/list.type";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface SelectedListContextType {
  selectedList: List | null;
  setSelectedList: (list: List | null) => void;
}

const SelectedListContext = createContext<SelectedListContextType | undefined>(
  undefined
);

export const SelectedListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedList, setSelectedList] = useState<List | null>(null);

  return (
    <SelectedListContext.Provider value={{ selectedList, setSelectedList }}>
      {children}
    </SelectedListContext.Provider>
  );
};

export const useSelectedList = (): SelectedListContextType => {
  const context = useContext(SelectedListContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedList must be used within a SelectedListProvider"
    );
  }
  return context;
};
