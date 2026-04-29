import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-black tracking-tighter text-white">
              KRAVVY
            </h3>
            <p className="text-zinc-500 mt-3 max-w-sm leading-relaxed">
              Dark streetwear for those who move different. Not for the faint.
              Every piece tells a story of rebellion and raw energy.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/kravvy__/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-red-500/50 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 017.75 2v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.5a1 1 0 110 2 1 1 0 010-2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/shop">Shop All</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>
                <a
                  href="mailto:support@kravvy.com"
                  className="hover:text-red-400 transition-colors"
                >
                  support@kravvy.com
                </a>
              </li>
              <li>India</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-zinc-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 text-center sm:text-left">
            © {new Date().getFullYear()} KRAVVY. All rights reserved. Own Your Vibe.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            <Link
              href="/terms"
              className="text-zinc-500 hover:text-red-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-zinc-500 hover:text-red-400 transition-colors"
            >
              Privacy
            </Link>
            <span className="text-zinc-700 font-mono hidden sm:inline">
              BUILT DIFFERENT • WORN BOLD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-zinc-500 hover:text-red-400 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
