"use client";

import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.images[0];
  const price = product.priceRange.minVariantPrice;
  const hasMultiplePrices =
    product.priceRange.minVariantPrice.amount !==
    product.priceRange.maxVariantPrice.amount;

  return (
    <Link href={`/product/${product.handle}`} className="group block">
      <div className="product-card gradient-border overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick view label */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-sm font-semibold uppercase tracking-widest text-white">
              View Product →
            </span>
          </div>

          {/* Tags badge */}
          {product.productType && (
            <div className="absolute top-3 left-3">
              <span className="bg-zinc-950/80 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider text-zinc-300 px-2 py-1 rounded border border-zinc-800/50">
                {product.productType}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-white text-sm sm:text-base leading-tight line-clamp-1 group-hover:text-red-400 transition-colors">
            {product.title}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-black text-red-400">
              {hasMultiplePrices && "From "}
              {formatPrice(price.amount, price.currencyCode)}
            </span>
          </div>
          {/* Size preview */}
          <div className="mt-2 flex gap-1">
            {product.variants.slice(0, 5).map((v) => (
              <span
                key={v.id}
                className={`text-[10px] px-1.5 py-0.5 rounded border ${
                  v.availableForSale
                    ? "border-zinc-700 text-zinc-400"
                    : "border-zinc-800 text-zinc-600 line-through"
                }`}
              >
                {v.selectedOptions.find((o) => o.name === "Size")?.value || v.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
