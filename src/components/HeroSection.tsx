"use client";

import Link from "next/link";
import { SpiderGraphic } from "./SpiderGraphic";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines">
      {/* Background layers */}
      <div className="absolute inset-0 bg-kravvy-black" />
      <div className="absolute inset-0 spider-bg" />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,45,85,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,85,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Spider graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] spider-glow opacity-30">
        <SpiderGraphic className="w-full h-full" />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-red-500/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up opacity-0">
          <span className="inline-block text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-red-500 mb-6 px-4 py-2 border border-red-500/20 rounded-full bg-red-500/5">
            ⚡ Streetwear Redefined
          </span>
        </div>

        <h1
          className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] glitch-text animate-fade-in-up opacity-0 animate-delay-100"
          data-text="KRAVVY"
        >
          KRAVVY
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-400 mt-6 tracking-wide animate-fade-in-up opacity-0 animate-delay-200">
          OWN YOUR{" "}
          <span className="font-bold text-white neon-red">VIBE</span>
        </p>

        <p className="text-sm sm:text-base text-zinc-500 mt-4 max-w-md mx-auto leading-relaxed animate-fade-in-up opacity-0 animate-delay-300">
          Dark aesthetics. Raw energy. Premium streetwear for those who refuse to blend in.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up opacity-0 animate-delay-400">
          <Link href="/shop" className="btn-primary text-lg px-8 py-4">
            Explore Collection
          </Link>
          <Link href="/contact" className="btn-ghost text-lg px-8 py-4">
            Contact Us
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-auto text-zinc-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
