import Link from "next/link";
import { getAllProducts, ShopifyProduct } from "@/lib/shopify";
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

  const featured = products.slice(0, 4);

  return (
    <>
      <HeroSection />

      {/* Featured Products */}
      <section className="section">
        <div className="container-k">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-eyebrow">// Fresh Drops</span>
              <h2 className="text-section-heading mt-2">Latest Collection</h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] hover:text-white transition-colors group"
              style={{ color: "var(--color-text-muted)" }}
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((product, i) => (
              <div key={product.id} className={`animate-fade-in-up opacity-0 animate-delay-${(i + 1) * 100}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="sm:hidden mt-8 text-center">
            <Link href="/shop" className="btn-primary inline-block">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="section spider-bg">
        <div className="container-k">
          <div className="text-center mb-16">
            <span className="text-eyebrow">// Why Kravvy</span>
            <h2 className="text-section-heading mt-2">Built Different</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <PillarCard
              icon={<QualityIcon />}
              title="Premium Quality"
              description="Heavy-weight fabrics, precision stitching, and prints that outlast trends."
            />
            <PillarCard
              icon={<AestheticIcon />}
              title="Dark Aesthetic"
              description="Designs born from the edge — where street culture meets dark art."
            />
            <PillarCard
              icon={<LimitedIcon />}
              title="Limited Drops"
              description="Small batches, big impact. Once it's gone, it's gone forever."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-k">
          <div
            className="relative p-12 sm:p-16 text-center overflow-hidden"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div className="absolute inset-0 spider-bg opacity-50" />
            <div className="relative z-10">
              <h2 className="text-section-heading">
                Ready To{" "}
                <span style={{ color: "var(--color-accent)" }}>Own Your Vibe</span>?
              </h2>
              <p className="prose-block mx-auto mt-4">
                Join the movement. Wear what speaks to your soul. Dark, bold, unapologetic.
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
        </div>
      </section>
    </>
  );
}

function PillarCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div
      className="gradient-border p-10 text-center group"
      style={{ transition: "border-color var(--dur-base) ease" }}
    >
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-5 rounded-lg" style={{ background: "rgba(229,57,53,0.08)" }}>
        {icon}
      </div>
      <h3
        className="text-lg font-bold tracking-tight mb-2"
        style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        {description}
      </p>
    </div>
  );
}

function QualityIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="var(--color-accent)" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function AestheticIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="var(--color-accent)" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function LimitedIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="var(--color-accent)" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
    </svg>
  );
}
