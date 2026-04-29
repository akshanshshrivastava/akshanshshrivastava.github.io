"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/lib/shopify";
import { formatPrice } from "@/lib/shopify";
import {
  getCartItems,
  updateCartQuantity,
  removeFromCart,
  getCartTotal,
  clearCart,
} from "@/lib/cart-store";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

const FREE_SHIPPING_THRESHOLD = 999;

export function CartSidebar() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [checkingOut, setCheckingOut] = useState(false);

  const refresh = useCallback(() => {
    setItems(getCartItems());
    setTotal(getCartTotal());
  }, []);

  useEffect(() => {
    refresh();
    const toggleHandler = () => {
      setOpen((prev) => !prev);
      refresh();
    };
    const cartHandler = () => refresh();
    window.addEventListener("toggle-cart-sidebar", toggleHandler);
    window.addEventListener("cart-updated", cartHandler);
    return () => {
      window.removeEventListener("toggle-cart-sidebar", toggleHandler);
      window.removeEventListener("cart-updated", cartHandler);
    };
  }, [refresh]);

  const handleQuantity = (variantId: string, qty: number) => {
    updateCartQuantity(variantId, qty);
    refresh();
  };

  const handleRemove = (variantId: string) => {
    removeFromCart(variantId);
    refresh();
  };

  // ── Razorpay checkout (unchanged business logic) ──
  const handleCheckout = async () => {
    if (items.length === 0) return;

    if (items.some((i) => i.variantId.startsWith("mock-"))) {
      alert("Demo mode: connect a real Shopify product to checkout.");
      return;
    }

    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Payment system is still loading. Please try again in a moment.");
      return;
    }

    setCheckingOut(true);
    try {
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, currency: "INR" }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok || !order.id) {
        throw new Error(order.error || "Could not create payment order.");
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "KRAVVY",
        description: `${items.length} item${items.length === 1 ? "" : "s"}`,
        order_id: order.id,
        handler: async (response: unknown) => {
          const r = response as {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          };
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...r,
                items: items.map((i) => ({
                  variantId: i.variantId,
                  quantity: i.quantity,
                  price: i.price,
                  title: i.title,
                })),
              }),
            });
            const data = await verifyRes.json();
            if (!verifyRes.ok || !data.success) {
              throw new Error(data.error || "Payment verification failed.");
            }
            clearCart();
            window.location.href = `/thank-you?payment_id=${encodeURIComponent(r.razorpay_payment_id)}`;
          } catch (err) {
            const msg = err instanceof Error ? err.message : "Verification failed.";
            alert(msg);
          }
        },
        modal: { ondismiss: () => setCheckingOut(false) },
        theme: { color: "#E53935" },
      });

      rzp.on("payment.failed", (response: unknown) => {
        const r = response as { error?: { description?: string } };
        alert(r.error?.description || "Payment failed. Please try again.");
        setCheckingOut(false);
      });

      rzp.open();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Checkout error.";
      console.error("Razorpay checkout error:", err);
      alert(msg);
      setCheckingOut(false);
    }
  };

  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - total;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60]"
        onClick={() => setOpen(false)}
        style={{
          background: "rgba(0,0,0,0.6)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity var(--dur-base) ease",
        }}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[70] flex flex-col"
        style={{
          width: "min(100vw, 440px)",
          background: "var(--color-bg-elevated)",
          borderLeft: "1px solid var(--color-border)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: `transform var(--dur-base) var(--ease-premium)`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <span className="text-[13px] font-bold tracking-[0.1em] uppercase" style={{ color: "var(--color-text-primary)" }}>
            Your Cart ({items.length})
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-[var(--color-text-muted)] hover:text-white transition-colors text-xl min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Free shipping bar */}
        {items.length > 0 && (
          <div className="px-6 py-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
            <p className="text-[12px] mb-2" style={{ color: "var(--color-text-muted)" }}>
              {progress >= 100
                ? "You unlocked free shipping!"
                : `Add ${formatPrice(remaining.toString())} more for free shipping`}
            </p>
            <div className="h-[3px] rounded-full" style={{ background: "var(--color-border)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "var(--color-accent)",
                  transition: "width 400ms var(--ease-soft)",
                }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" style={{ color: "var(--color-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="font-medium" style={{ color: "var(--color-text-muted)" }}>Your cart is empty</p>
              <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>Time to own your vibe</p>
              <Link href="/shop" onClick={() => setOpen(false)} className="btn-primary mt-6 text-sm">
                Shop Now
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variantId}
                className="flex gap-4 mb-5 pb-5 group"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                {/* Image */}
                <div className="relative w-20 h-[100px] flex-shrink-0 overflow-hidden" style={{ borderRadius: "var(--radius-md)", background: "var(--color-bg-card)" }}>
                  {item.image ? (
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs" style={{ color: "var(--color-text-muted)" }}>
                      No img
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.productHandle}`}
                    onClick={() => setOpen(false)}
                    className="text-[14px] font-semibold hover:text-[var(--color-accent)] transition-colors line-clamp-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {item.title}
                  </Link>
                  {item.variantTitle && item.variantTitle !== "Default Title" && (
                    <p className="text-[12px] mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                      Size: {item.variantTitle}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty stepper */}
                    <div
                      className="flex items-center gap-3 px-3 py-1"
                      style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)" }}
                    >
                      <button
                        onClick={() => handleQuantity(item.variantId, item.quantity - 1)}
                        className="text-[16px] min-w-[24px] min-h-[24px] flex items-center justify-center"
                        style={{ color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer" }}
                      >
                        −
                      </button>
                      <span className="text-[14px] min-w-[16px] text-center" style={{ color: "var(--color-text-primary)" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantity(item.variantId, item.quantity + 1)}
                        className="text-[16px] min-w-[24px] min-h-[24px] flex items-center justify-center"
                        style={{ color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer" }}
                      >
                        +
                      </button>
                    </div>

                    <span className="text-[15px] font-bold" style={{ color: "var(--color-accent)" }}>
                      {formatPrice((parseFloat(item.price) * item.quantity).toString())}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(item.variantId)}
                    className="mt-2 text-[11px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout CTA */}
        {items.length > 0 && (
          <div className="px-6 py-4" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="flex justify-between mb-4">
              <span className="text-[13px]" style={{ color: "var(--color-text-muted)" }}>Subtotal</span>
              <span className="text-[17px] font-bold" style={{ color: "var(--color-text-primary)" }}>
                {formatPrice(total.toString())}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="btn-primary w-full"
              style={{ height: 56 }}
            >
              {checkingOut ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                `Checkout — ${formatPrice(total.toString())}`
              )}
            </button>
            <p className="text-[11px] text-center mt-3 tracking-[0.05em]" style={{ color: "var(--color-text-muted)" }}>
              SECURE PAYMENT • FREE SHIPPING ₹999+
            </p>
          </div>
        )}
      </div>
    </>
  );
}
