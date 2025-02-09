"use client";

import { Id, Doc } from "../../convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ProductCard } from "./ProductCard";
import { AnimatePresence } from "motion/react";
interface ProductGridProps {
  listId: Id<"lists">;
}

export function ProductGrid({ listId }: ProductGridProps) {
  const { results: products } = usePaginatedQuery(
    api.products.getPaginatedProducts,
    { listId },
    { initialNumItems: 9 }
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <AnimatePresence>
        {products.map((product: Doc<"products">, index: number) => (
          <ProductCard key={product._id} product={product} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
}
