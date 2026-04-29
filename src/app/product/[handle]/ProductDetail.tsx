"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct, ShopifyVariant, formatPrice } from "@/lib/shopify";
import { addToCart } from "@/lib/cart-store";
import { ProductCard } from "@/components/ProductCard";
import { TrustRow } from "@/components/TrustRow";
import { CheckoutForm } from "@/components/CheckoutForm";
import { CustomerInfo } from "@/lib/checkout-validation";

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
  const [showBuyForm, setShowBuyForm] = useState(false);

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

  const handleBuyNowClick = () => setShowBuyForm(true);

  const handleBuyFormSubmit = async (customer: CustomerInfo) => {
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
        prefill: {
          name: customer.fullName,
          email: customer.email,
          contact: customer.phone,
        },
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
                customer,
              }),
            });
            const data = await vRes.json();
            if (!vRes.ok || !data.success) {
              throw new Error(data.error || "Payment verification failed.");
            }
            setShowBuyForm(false);
            window.location.href = `/thank-you?payment_id=${encodeURIComponent(r.razorpay_payment_id)}`;
          } catch (err) {
            const msg = err instanceof Error ? err.message : "Verification failed.";
            alert(msg);
          }
        },
        modal: { ondismiss: () => setBuyingNow(false) },
        theme: { color: "#E53935" },
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
    <div style={{ background: "var(--color-bg)", color: "var(--color-text-primary)", paddingTop: "calc(var(--bar-height) + 80px + 40px)", paddingBottom: 64 }}>
      <div className="container-k">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div>
            <div
              className="relative aspect-[3/4] overflow-hidden"
              style={{ background: "var(--color-bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}
            >
              <Image src={product.images[selectedImage]?.url} alt={product.title} fill className="object-cover" priority />
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="relative w-16 h-20 overflow-hidden flex-shrink-0"
                    style={{
                      borderRadius: "var(--radius-md)",
                      border: i === selectedImage ? "2px solid var(--color-accent)" : "1px solid var(--color-border)",
                      opacity: i === selectedImage ? 1 : 0.6,
                      transition: "opacity var(--dur-fast), border-color var(--dur-fast)",
                    }}
                  >
                    <Image src={img.url} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span className="text-eyebrow">// {product.productType || "T-Shirt"}</span>
            <h1 className="text-section-heading mt-2">{product.title}</h1>
            <p className="text-2xl font-bold mt-3" style={{ color: "var(--color-accent)" }}>
              {formatPrice(selectedVariant.price.amount)}
            </p>

            {/* Sizes */}
            <div className="mt-8">
              <p className="text-[11px] uppercase font-semibold tracking-[0.1em] mb-3" style={{ color: "var(--color-text-muted)" }}>
                Select Size
              </p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={!v.availableForSale}
                    className={`size-btn ${selectedVariant.id === v.id ? "active" : ""}`}
                  >
                    {v.selectedOptions.find(o => o.name === "Size")?.value || v.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1"
                style={{
                  background: addedToCart ? "#16a34a" : undefined,
                  height: 56,
                }}
              >
                {addedToCart ? "Added!" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNowClick}
                disabled={buyingNow}
                className="btn-ghost flex-1"
                style={{ height: 56 }}
              >
                {buyingNow ? "Wait..." : "Buy Now"}
              </button>
            </div>

            {/* Buy Now form overlay */}
            {showBuyForm && (
              <div
                className="mt-6 p-5"
                style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <CheckoutForm
                  totalLabel={formatPrice(selectedVariant.price.amount)}
                  onSubmit={handleBuyFormSubmit}
                  onBack={() => { setShowBuyForm(false); setBuyingNow(false); }}
                  disabled={buyingNow}
                />
              </div>
            )}

            {/* Trust Row */}
            <TrustRow />

            {/* Description */}
            {product.descriptionHtml && (
              <div
                className="mt-8 prose prose-invert prose-sm"
                style={{ color: "var(--color-text-secondary)" }}
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 lg:mt-32">
            <span className="text-eyebrow">// You May Also Like</span>
            <h2 className="text-section-heading mt-2 mb-10">More Drops</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
