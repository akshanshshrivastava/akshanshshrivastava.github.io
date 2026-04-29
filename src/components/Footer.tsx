import Link from "next/link";

const MARQUEE_TEXT = "KRAVVY • BUILT DIFFERENT • WORN BY THE BOLD • OWN YOUR VIBE • DARK AESTHETICS • RAW ENERGY • PREMIUM STREETWEAR • ";

export function Footer() {
  return (
    <footer style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-border)", marginTop: 0 }}>
      {/* Marquee strip */}
      <div className="overflow-hidden py-5" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-[14px] sm:text-[18px] font-black tracking-[0.1em] uppercase whitespace-nowrap"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-muted)" }}
            >
              {MARQUEE_TEXT.split("•").map((segment, j) => (
                <span key={j}>
                  {segment}
                  {j < MARQUEE_TEXT.split("•").length - 1 && (
                    <span style={{ color: "var(--color-accent)", margin: "0 8px", fontSize: "18px" }}>✦</span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="container-k py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3
              className="text-3xl font-black tracking-tighter"
              style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
            >
              KRAVVY
            </h3>
            <p className="mt-3 max-w-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Dark streetwear for those who move different. Not for the faint.
              Every piece tells a story of rebellion and raw energy.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/kravvy__/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all min-w-[44px] min-h-[44px]"
                style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.5a1 1 0 110 2 1 1 0 010-2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] mb-4" style={{ color: "var(--color-text-muted)" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/shop">Shop All</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/refund-policy">Refund Policy</FooterLink>
              <FooterLink href="/cancellation-policy">Cancellation Policy</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] mb-4" style={{ color: "var(--color-text-muted)" }}>
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:support@kravvy.com" className="hover:text-[var(--color-accent)] transition-colors" style={{ color: "var(--color-text-muted)" }}>
                  support@kravvy.com
                </a>
              </li>
              <li style={{ color: "var(--color-text-muted)" }}>India</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--color-border)" }}>
          <p className="text-xs text-center sm:text-left" style={{ color: "var(--color-text-muted)" }}>
            © {new Date().getFullYear()} KRAVVY. All rights reserved. Own Your Vibe.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            <FooterBottomLink href="/terms">Terms</FooterBottomLink>
            <FooterBottomLink href="/privacy">Privacy</FooterBottomLink>
            <FooterBottomLink href="/refund-policy">Refunds</FooterBottomLink>
            <FooterBottomLink href="/cancellation-policy">Cancellations</FooterBottomLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm hover:text-[var(--color-accent)] transition-colors" style={{ color: "var(--color-text-muted)" }}>
        {children}
      </Link>
    </li>
  );
}

function FooterBottomLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-[var(--color-accent)] transition-colors" style={{ color: "var(--color-text-muted)" }}>
      {children}
    </Link>
  );
}
