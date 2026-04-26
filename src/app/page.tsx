import Link from "next/link";
import { getAllProducts, formatPrice, ShopifyProduct } from "@/lib/shopify";

import { ProductCard } from "@/components/ProductCard";
import { HeroSection } from "@/components/HeroSection";

export const revalidate = 60;

export default async function HomePage() {
  let products: ShopifyProduct[];
  try {
    products = await getAllProducts();
  } catch {
    products = [];
  }

  const displayProducts = products;
  const featured = displayProducts.slice(0, 4);

  return (
    <>
      <HeroSection />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-500">
              // Fresh Drops
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-2">
              LATEST COLLECTION
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product, i) => (
            <div
              key={product.id}
              className={`animate-fade-in-up opacity-0 animate-delay-${(i + 1) * 100}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link href="/shop" className="btn-primary inline-block">
            View All Products
          </Link>
        </div>
      </section>

      {/* Vibe Section */}
      <section className="relative py-24 overflow-hidden spider-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <VibeCard
              icon="⚡"
              title="Premium Quality"
              description="Heavy-weight fabrics, precision stitching, and prints that outlast trends."
            />
            <VibeCard
              icon="🕷️"
              title="Dark Aesthetic"
              description="Designs born from the edge — where street culture meets dark art."
            />
            <VibeCard
              icon="🔥"
              title="Limited Drops"
              description="Small batches, big impact. Once it's gone, it's gone forever."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative gradient-border p-12 sm:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 spider-bg opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              READY TO{" "}
              <span className="text-red-500">OWN YOUR VIBE</span>?
            </h2>
            <p className="text-zinc-400 mt-4 max-w-lg mx-auto">
              Join the movement. Wear what speaks to your soul.
              Dark, bold, unapologetic.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop" className="btn-primary">
                Shop the Collection
              </Link>
              <Link href="/contact" className="btn-ghost">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function VibeCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="gradient-border p-8 text-center group hover:scale-[1.02] transition-transform">
      <span className="text-4xl mb-4 block">{icon}</span>
      <h3 className="text-lg font-bold tracking-tight text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}
