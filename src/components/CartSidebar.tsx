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
} from "@/lib/cart-store";

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

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setCheckingOut(true);

    // Check if items are mock (IDs starting with 'mock-')
    const isMock = items.some((i) => i.variantId.startsWith("mock-"));
    if (isMock) {
      alert("Demo mode: In production, this will redirect to Shopify Checkout.");
      setCheckingOut(false);
      return;
    }

    try {
      const { createCheckout } = await import("@/lib/shopify");
      const lineItems = items.map((i) => ({
        variantId: i.variantId,
        quantity: i.quantity,
      }));
      const checkoutUrl = await createCheckout(lineItems);
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong creating checkout. Please try again.");
      setCheckingOut(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800/50 z-[70] transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
            <h2 className="text-xl font-bold tracking-tight">
              YOUR CART
              {items.length > 0 && (
                <span className="ml-2 text-sm font-mono text-red-500">
                  ({items.length})
                </span>
              )}
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-zinc-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-zinc-500 font-medium">Your cart is empty</p>
                <p className="text-zinc-600 text-sm mt-1">Time to own your vibe</p>
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-6 text-sm"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-4 p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/30 group"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-zinc-800">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                        No img
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.productHandle}`}
                      onClick={() => setOpen(false)}
                      className="text-sm font-semibold text-white hover:text-red-400 transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    {item.variantTitle && item.variantTitle !== "Default Title" && (
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Size: {item.variantTitle}
                      </p>
                    )}
                    <p className="text-sm font-bold text-red-400 mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          handleQuantity(item.variantId, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-white transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm font-mono w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantity(item.variantId, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-white transition-colors text-sm"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(item.variantId)}
                        className="ml-auto p-1 text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-zinc-800/50 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-white">
                  {formatPrice(total.toString())}
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Shipping & taxes calculated at checkout
              </p>
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkingOut ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Processing...
                  </span>
                ) : (
                  "Checkout"
                )}
              </button>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="block text-center text-sm text-zinc-400 hover:text-white transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
