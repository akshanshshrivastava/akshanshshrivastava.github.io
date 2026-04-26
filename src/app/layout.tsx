import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartSidebar } from "@/components/CartSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KRAVVY — Own Your Vibe",
  description: "Dark streetwear for those who move different. Edgy graphics, premium quality, unapologetic style.",
  keywords: ["streetwear", "dark fashion", "graphic tees", "urban clothing", "kravvy"],
  openGraph: {
    title: "KRAVVY — Own Your Vibe",
    description: "Dark streetwear for those who move different.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-[family-name:var(--font-inter)] antialiased noise">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <Navbar />
        <CartSidebar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
