"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ExternalLink, Check } from "lucide-react";
import { Doc } from "../../convex/_generated/dataModel";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Doc<"products">;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="group flex flex-col bg-card rounded-xl shadow-1 overflow-hidden">
        <div className="relative aspect-[6/7] w-full overflow-hidden">
          <Image
            src={product.imageUrl ?? ""}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-base line-clamp-2">
              {product.name}
            </h3>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 -mr-2"
              onClick={() => {
                window.open(product.url, "_blank");
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-auto pt-3">
            <span className="font-semibold">{product.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
