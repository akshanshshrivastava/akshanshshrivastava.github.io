import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartSidebar } from "@/components/CartSidebar";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "KRAVVY — Own Your Vibe",
//   description: "Dark streetwear for those who move different. Edgy graphics, premium quality, unapologetic style.",
//   keywords: ["streetwear", "dark fashion", "graphic tees", "urban clothing", "kravvy"],
//   openGraph: {
//     title: "KRAVVY — Own Your Vibe",
//     description: "Dark streetwear for those who move different.",
//     type: "website",
//   },
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body className="antialiased noise">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <AnnouncementBar />
        <Navbar />
        <CartSidebar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
