"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/shopify";

interface Order {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: { amount: string; currencyCode: string };
  lineItems: {
    title: string;
    quantity: number;
    variant?: {
      price: { amount: string; currencyCode: string };
      image?: { url: string; altText: string | null };
    };
  }[];
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  defaultAddress?: {
    address1: string;
    address2: string | null;
    city: string;
    province: string;
    zip: string;
    country: string;
  };
  orders: Order[];
}

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.customer) {
          router.push("/login");
          return;
        }
        setCustomer(data.customer);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  if (loading || !customer) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ paddingTop: "calc(var(--bar-height) + 80px)", background: "var(--color-bg)" }}
      >
        <div className="animate-spin h-8 w-8 border-2 border-t-transparent rounded-full" style={{ borderColor: "var(--color-accent)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text-primary)",
        paddingTop: "calc(var(--bar-height) + 80px + 40px)",
        paddingBottom: 80,
      }}
    >
      <div className="container-k">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <span className="text-eyebrow">// My Account</span>
            <h1 className="text-section-heading mt-2">
              Hey, {customer.firstName}
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
              {customer.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-ghost text-sm px-6 py-3"
          >
            Log Out
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile & Address */}
          <div
            className="p-6"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <h2
              className="text-lg font-bold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Profile
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span style={{ color: "var(--color-text-muted)" }}>Name</span>
                <p>{customer.firstName} {customer.lastName}</p>
              </div>
              <div>
                <span style={{ color: "var(--color-text-muted)" }}>Email</span>
                <p>{customer.email}</p>
              </div>
              {customer.phone && (
                <div>
                  <span style={{ color: "var(--color-text-muted)" }}>Phone</span>
                  <p>{customer.phone}</p>
                </div>
              )}
            </div>

            {customer.defaultAddress && (
              <>
                <h3
                  className="text-base font-bold tracking-tight mt-6 mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Default Address
                </h3>
                <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  <p>{customer.defaultAddress.address1}</p>
                  {customer.defaultAddress.address2 && <p>{customer.defaultAddress.address2}</p>}
                  <p>{customer.defaultAddress.city}, {customer.defaultAddress.province} {customer.defaultAddress.zip}</p>
                  <p>{customer.defaultAddress.country}</p>
                </div>
              </>
            )}
          </div>

          {/* Orders */}
          <div className="lg:col-span-2">
            <h2
              className="text-lg font-bold tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Order History ({customer.orders.length})
            </h2>

            {customer.orders.length === 0 ? (
              <div
                className="p-10 text-center"
                style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <p style={{ color: "var(--color-text-muted)" }}>No orders yet.</p>
                <Link href="/shop" className="btn-primary mt-4 inline-block text-sm">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {customer.orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5"
                    style={{
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-card)",
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div>
                        <span className="text-[15px] font-bold">
                          Order #{order.orderNumber}
                        </span>
                        <span className="ml-3 text-[12px]" style={{ color: "var(--color-text-muted)" }}>
                          {new Date(order.processedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <StatusBadge label={order.financialStatus} />
                        <StatusBadge label={order.fulfillmentStatus || "Unfulfilled"} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.lineItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          {item.variant?.image && (
                            <div className="relative w-12 h-14 flex-shrink-0 overflow-hidden" style={{ borderRadius: "var(--radius-sm)", background: "var(--color-bg-elevated)" }}>
                              <Image src={item.variant.image.url} alt={item.variant.image.altText || ""} fill className="object-cover" sizes="48px" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                            <p className="text-[12px]" style={{ color: "var(--color-text-muted)" }}>
                              Qty: {item.quantity}
                              {item.variant && (
                                <> · {formatPrice(item.variant.price.amount)}</>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end mt-4 pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
                      <span className="text-[15px] font-bold" style={{ color: "var(--color-accent)" }}>
                        {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ label }: { label: string }) {
  const normalized = label.toUpperCase().replace(/_/g, " ");
  const isPositive = ["PAID", "FULFILLED"].includes(normalized);
  return (
    <span
      className="text-[10px] font-semibold tracking-[0.06em] uppercase px-2 py-1"
      style={{
        borderRadius: "var(--radius-sm)",
        background: isPositive ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)",
        color: isPositive ? "#22c55e" : "var(--color-text-muted)",
        border: `1px solid ${isPositive ? "rgba(34,197,94,0.2)" : "var(--color-border)"}`,
      }}
    >
      {normalized}
    </span>
  );
}
