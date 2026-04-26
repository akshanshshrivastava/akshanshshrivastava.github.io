import { getAllProducts, ShopifyProduct } from "@/lib/shopify";

import { ShopClient } from "./ShopClient";

export const revalidate = 60;

export const metadata = {
  title: "Shop — KRAVVY",
  description: "Browse the full KRAVVY collection. Dark streetwear, edgy graphics, premium quality.",
};

export default async function ShopPage() {
  let products: ShopifyProduct[];
  try {
    products = await getAllProducts();
  } catch {
    products = [];
  }

  const displayProducts = products;

  return <ShopClient products={displayProducts} />;
}
