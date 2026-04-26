"use client";

import { useState, useMemo } from "react";
import { ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

interface ShopClientProps {
  products: ShopifyProduct[];
}

export function ShopClient({ products }: ShopClientProps) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Extract unique types and colors from tags
  const productTypes = useMemo(() => {
    const types = new Set<string>();
    products.forEach((p) => {
      if (p.productType) types.add(p.productType);
    });
    return Array.from(types).sort();
  }, [products]);

  const colorTags = useMemo(() => {
    const colors = new Set<string>();
    const colorKeywords = ["black", "white", "red", "blue", "grey", "gray", "green", "navy", "cream", "beige", "brown"];
    products.forEach((p) => {
      p.tags.forEach((tag) => {
        if (colorKeywords.includes(tag.toLowerCase())) {
          colors.add(tag.toLowerCase());
        }
      });
    });
    return Array.from(colors).sort();
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];

    // Search by title and tags
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.productType.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Filter by type
    if (selectedType !== "all") {
      result = result.filter((p) => p.productType === selectedType);
    }

    // Filter by color (from tags)
    if (selectedColor !== "all") {
      result = result.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === selectedColor)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) =>
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-high":
        result.sort(
          (a, b) =>
            parseFloat(b.priceRange.minVariantPrice.amount) -
            parseFloat(a.priceRange.minVariantPrice.amount)
        );
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [products, search, selectedType, selectedColor, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedType("all");
    setSelectedColor("all");
    setSortBy("newest");
  };

  const hasFilters =
    search || selectedType !== "all" || selectedColor !== "all" || sortBy !== "newest";

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-red-500">
            // The Collection
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-2">
            SHOP ALL
          </h1>
          <p className="text-zinc-500 mt-2">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/30">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name, tag, style..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
            />
          </div>

          {/* Type filter */}
          {productTypes.length > 0 && (
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-sm text-white focus:outline-none focus:border-red-500/50 appearance-none cursor-pointer"
            >
              <option value="all">All Types</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          )}

          {/* Color filter */}
          {colorTags.length > 0 && (
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="px-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-sm text-white focus:outline-none focus:border-red-500/50 appearance-none cursor-pointer"
            >
              <option value="all">All Colors</option>
              {colorTags.map((color) => (
                <option key={color} value={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </option>
              ))}
            </select>
          )}

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-sm text-white focus:outline-none focus:border-red-500/50 appearance-none cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="name">Name</option>
          </select>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 border border-red-500/20 rounded-lg hover:bg-red-500/5 transition-colors whitespace-nowrap"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🕸️</span>
            <h3 className="text-xl font-bold text-zinc-400">No products found</h3>
            <p className="text-zinc-500 mt-2">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="btn-ghost mt-6 inline-block text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
