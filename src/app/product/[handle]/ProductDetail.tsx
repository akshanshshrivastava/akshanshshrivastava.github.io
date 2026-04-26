"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct, ShopifyVariant, formatPrice } from "@/lib/shopify";
import { addToCart } from "@/lib/cart-store";
import { ProductCard } from "@/components/ProductCard";

interface ProductDetailProps {
  product: ShopifyProduct;
  relatedProducts: ShopifyProduct[];
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant>(
    product.variants.find(v => v.availableForSale) || product.variants[0]
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      variantId: selectedVariant.id,
      productHandle: product.handle,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price.amount,
      image: product.images[0]?.url || "",
      quantity: 1,
      size: selectedVariant.selectedOptions.find(o => o.name === "Size")?.value || selectedVariant.title,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = async () => {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Payment system is still loading. Please try again in a moment.");
      return;
    }

    setBuyingNow(true);
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(selectedVariant.price.amount),
          currency: selectedVariant.price.currencyCode || "INR",
        }),
      });
      const order = await res.json();
      if (!res.ok || !order.id) {
        throw new Error(order.error || "Could not create payment order.");
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "KRAVVY",
        description: product.title,
        order_id: order.id,
        handler: async (response: unknown) => {
          const r = response as {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          };
          try {
            const vRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...r,
                product: {
                  variantId: selectedVariant.id,
                  price: selectedVariant.price.amount,
                  quantity: 1,
                  title: product.title,
                },
              }),
            });
            const data = await vRes.json();
            if (!vRes.ok || !data.success) {
              throw new Error(data.error || "Payment verification failed.");
            }
            window.location.href = `/thank-you?payment_id=${encodeURIComponent(r.razorpay_payment_id)}`;
          } catch (err) {
            const msg =
              err instanceof Error ? err.message : "Verification failed.";
            alert(msg);
          }
        },
        modal: {
          ondismiss: () => setBuyingNow(false),
        },
        theme: { color: "#ef4444" },
      });

      rzp.on("payment.failed", (response: unknown) => {
        const r = response as { error?: { description?: string } };
        alert(r.error?.description || "Payment failed. Please try again.");
        setBuyingNow(false);
      });

      rzp.open();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Checkout error.";
      console.error("Razorpay error:", err);
      alert(msg);
      setBuyingNow(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="relative aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
            <Image src={product.images[selectedImage]?.url} alt={product.title} fill className="object-cover" priority />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-black mb-2">{product.title}</h1>
            <p className="text-2xl text-red-500 font-bold mb-8">{formatPrice(selectedVariant.price.amount)}</p>

            {/* Sizes */}
            <div className="mb-8">
              <p className="text-sm uppercase font-bold text-zinc-500 mb-4">Select Size</p>
              <div className="flex gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-6 py-3 border-2 rounded-lg font-bold transition-all ${
                      selectedVariant.id === v.id ? "border-red-500 bg-red-500/10" : "border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    {v.selectedOptions.find(o => o.name === "Size")?.value || v.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-lg font-black uppercase tracking-widest transition-all ${
                  addedToCart ? "bg-green-600" : "bg-red-600 hover:bg-red-500"
                }`}
              >
                {addedToCart ? "Added!" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 border-2 border-zinc-800 rounded-lg font-black uppercase tracking-widest hover:border-red-500 transition-all"
              >
                {buyingNow ? "Wait..." : "Buy Now"}
              </button>
            </div>
            
            <div className="mt-10 prose prose-invert" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          </div>
        </div>
      </div>
    </div>
  );
}
