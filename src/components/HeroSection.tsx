"use client";

import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "calc(var(--bar-height) + 80px)", paddingBottom: 80 }}
    >
      {/* Banner background (faded) */}
      <div className="absolute inset-0">
        <Image
          src="/hero-banner.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.7) 40%, rgba(13,13,13,0.92) 80%, var(--color-bg) 100%)",
          }}
        />
      </div>

      {/* Content — bottom-left aligned */}
      <div className="relative z-10 container-k w-full">
        <div className="max-w-2xl">
          <span className="text-eyebrow animate-fade-in-up opacity-0">
            // Streetwear Redefined
          </span>

          <h1
            className="text-hero mt-4 animate-fade-in-up opacity-0 animate-delay-100"
            style={{ color: "var(--color-text-primary)" }}
          >
            Own Your Vibe
          </h1>

          <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-lg animate-fade-in-up opacity-0 animate-delay-200" style={{ color: "var(--color-text-secondary)" }}>
            Dark aesthetics. Raw energy. Premium streetwear for those who refuse to blend in.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mt-8 animate-fade-in-up opacity-0 animate-delay-300">
            <Link href="/shop" className="btn-primary text-base px-8 py-4">
              Shop Now
            </Link>
            <Link href="/contact" className="btn-ghost text-base px-8 py-4">
              Contact Us
            </Link>
          </div>
        </div>

        {/* KRAVVY wordmark — bottom right on desktop */}
        <div className="hidden lg:block absolute bottom-0 right-12" style={{ writingMode: "vertical-rl" }}>
          <span
            className="text-[80px] font-black tracking-tighter leading-none"
            style={{
              fontFamily: "var(--font-display)",
              color: "rgba(255,255,255,0.04)",
              userSelect: "none",
            }}
          >
            KRAVVY
          </span>
        </div>
      </div>
    </section>
  );
}
