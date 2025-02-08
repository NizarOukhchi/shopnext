"use client";

import { Id, Doc } from "../../convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  listId: Id<"lists">;
}

export function ProductGrid({ listId }: ProductGridProps) {
  const { results: products, isLoading } = usePaginatedQuery(
    api.products.getPaginatedProducts,
    { listId },
    { initialNumItems: 9 }
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {isLoading ? (
        <ProductGridSkeleton />
      ) : (
        products.map((product: Doc<"products">) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
}

const ProductGridSkeleton = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <div
      key={index}
      className="group flex flex-col bg-card rounded-xl shadow-1 overflow-hidden p-4 space-y-4 animate-pulse"
    >
      <div className="h-60 bg-gray-200 rounded-md" />
      <div className="h-12 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  ));
};
