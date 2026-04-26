import { getProductByHandle, getAllProducts, ShopifyProduct } from "@/lib/shopify";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ProductDetail } from "./ProductDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  let product = await getProductByHandle(handle).catch(() => null);
  if (!product) {
    product = MOCK_PRODUCTS.find((p) => p.handle === handle) || null;
  }
  if (!product) return { title: "Product Not Found — KRAVVY" };
  return {
    title: `${product.title} — KRAVVY`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;

  let product = await getProductByHandle(handle).catch(() => null);
  if (!product) {
    product = MOCK_PRODUCTS.find((p) => p.handle === handle) || null;
  }

  if (!product) notFound();

  // Related products
  let allProducts: ShopifyProduct[];
  try {
    allProducts = await getAllProducts();
  } catch {
    allProducts = [];
  }
  const pool = allProducts.length > 0 ? allProducts : MOCK_PRODUCTS;
  const related = pool
    .filter((p) => p.id !== product!.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return <ProductDetail product={product} relatedProducts={related} />;
}
