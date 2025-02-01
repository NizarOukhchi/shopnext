"use client";

import { Id } from "../../convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ listId }: { listId: Id<"lists"> }) {
  const products = usePaginatedQuery(
    api.products.getPaginatedProducts,
    { listId },
    { initialNumItems: 9 }
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-6">
      {products?.results.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
