"use client";

import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "calc(var(--bar-height) + 80px)", paddingBottom: 80 }}
    >
      {/* Banner: keep art crisp; only a light bottom scrim to blend into the next section + CTAs */}
      <div className="absolute inset-0">
        <Image
          src="/hero-banner.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          quality={100}
          placeholder="empty"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,13,13,0) 0%, rgba(13,13,13,0) 50%, rgba(13,13,13,0.2) 78%, rgba(13,13,13,0.55) 100%)",
          }}
        />
      </div>

      {/* Content — bottom-left aligned */}
      <div className="relative z-10 container-k w-full">
        <div className="max-w-2xl">
          {/* Preserve CTA placement after removing hero copy */}
          <div className="h-[220px] sm:h-[250px]" aria-hidden="true" />

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
