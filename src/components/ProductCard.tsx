"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const [hovered, setHovered] = useState(false);
  const frontImage = product.images[0];
  const backImage = product.images[1];
  const price = product.priceRange.minVariantPrice;
  const hasMultiplePrices =
    product.priceRange.minVariantPrice.amount !==
    product.priceRange.maxVariantPrice.amount;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="product-card">
        {/* Image area */}
        <div className="relative aspect-[3/4] overflow-hidden" style={{ background: "var(--color-bg-elevated)" }}>
          {/* Badge */}
          {product.productType && (
            <span
              className="absolute top-3 left-3 z-10 text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-1"
              style={{
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
                color: "var(--color-text-primary)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {product.productType}
            </span>
          )}

          {/* Front image */}
          {frontImage ? (
            <Image
              src={frontImage.url}
              alt={frontImage.altText || product.title}
              fill
              className="object-cover"
              style={{
                opacity: hovered && backImage ? 0 : 1,
                transition: "opacity 350ms cubic-bezier(0.215,0.61,0.355,1)",
              }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ color: "var(--color-text-muted)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
          )}

          {/* Back image (hover swap) */}
          {backImage && (
            <Image
              src={backImage.url}
              alt={`${product.title} — back`}
              fill
              className="object-cover"
              style={{
                opacity: hovered ? 1 : 0,
                transition: "opacity 350ms cubic-bezier(0.215,0.61,0.355,1)",
              }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
              transition: "opacity var(--dur-base) ease",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-sm font-semibold uppercase tracking-widest text-white">
              View Product →
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 sm:px-5 sm:pb-5">
          <p
            className="text-[15px] font-semibold leading-tight line-clamp-1 group-hover:text-[var(--color-accent)]"
            style={{
              color: "var(--color-text-primary)",
              transition: "color var(--dur-fast)",
            }}
          >
            {product.title}
          </p>

          <p
            className="mt-2 text-[17px] font-bold"
            style={{ color: "var(--color-accent)" }}
          >
            {hasMultiplePrices && "From "}
            {formatPrice(price.amount, price.currencyCode)}
          </p>

          {/* Size pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.variants.slice(0, 5).map((v) => (
              <span
                key={v.id}
                className={`text-[11px] font-medium tracking-[0.05em] px-2 py-0.5 ${
                  v.availableForSale ? "" : "line-through opacity-40"
                }`}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--color-text-muted)",
                }}
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
