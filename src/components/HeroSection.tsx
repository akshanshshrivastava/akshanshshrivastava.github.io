"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden scanlines"
      style={{ minHeight: "100vh", paddingTop: "calc(var(--bar-height) + 80px)" }}
    >
      {/* Background layers */}
      <div className="absolute inset-0" style={{ background: "var(--color-bg)" }} />
      <div className="absolute inset-0 spider-bg" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(229,57,53,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(229,57,53,0.2) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: "rgba(229,57,53,0.06)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px]" style={{ background: "rgba(229,57,53,0.03)" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up opacity-0">
          <span className="text-eyebrow">// Streetwear Redefined</span>
        </div>

        <h1 className="text-hero mt-6 animate-fade-in-up opacity-0 animate-delay-100" style={{ color: "var(--color-text-primary)" }}>
          KRAVVY
        </h1>

        <p className="mt-6 text-xl sm:text-2xl lg:text-3xl font-light tracking-wide animate-fade-in-up opacity-0 animate-delay-200" style={{ color: "var(--color-text-muted)" }}>
          OWN YOUR{" "}
          <span className="font-bold" style={{ color: "var(--color-accent)" }}>VIBE</span>
        </p>

        <p className="prose-block mx-auto mt-4 text-sm sm:text-base leading-relaxed animate-fade-in-up opacity-0 animate-delay-300">
          Dark aesthetics. Raw energy. Premium streetwear for those who refuse to blend in.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up opacity-0 animate-delay-400">
          <Link href="/shop" className="btn-primary text-base px-8 py-4">
            Explore Collection
          </Link>
          <Link href="/contact" className="btn-ghost text-base px-8 py-4">
            Contact Us
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" style={{ color: "var(--color-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
