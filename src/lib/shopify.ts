const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: ShopifyPrice;
  image?: ShopifyImage;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  productType: string;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
}

export interface CartItem {
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
}

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  const json = await res.json();
  if (json.errors) {
    console.error('Shopify API errors:', json.errors);
    throw new Error(json.errors[0]?.message || 'Shopify API error');
  }
  return json.data;
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    tags
    productType
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 10) {
      edges { node { url altText } }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions { name value }
          price { amount currencyCode }
          image { url altText }
        }
      }
    }
  }
`;

function flattenProduct(node: any): ShopifyProduct {
  return {
    ...node,
    images: node.images.edges.map((e: any) => e.node),
    variants: node.variants.edges.map((e: any) => e.node),
  };
}

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<any>(`
    ${PRODUCT_FRAGMENT}
    query { products(first: 100, sortKey: CREATED_AT, reverse: true) { edges { node { ...ProductFields } } } }
  `);
  return data.products.edges.map((e: any) => flattenProduct(e.node));
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<any>(`
    ${PRODUCT_FRAGMENT}
    query($handle: String!) { productByHandle(handle: $handle) { ...ProductFields } }
  `, { handle });
  return data.productByHandle ? flattenProduct(data.productByHandle) : null;
}

export async function searchProducts(query: string): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<any>(`
    ${PRODUCT_FRAGMENT}
    query($query: String!) { products(first: 50, query: $query) { edges { node { ...ProductFields } } } }
  `, { query });
  return data.products.edges.map((e: any) => flattenProduct(e.node));
}

export async function createCheckout(lineItems: { variantId: string; quantity: number }[]): Promise<string> {
  const data = await shopifyFetch<any>(`
    mutation($lineItems: [CheckoutLineItemInput!]!) {
      checkoutCreate(input: { lineItems: $lineItems }) {
        checkout { webUrl }
        checkoutUserErrors { message field }
      }
    }
  `, { lineItems });

  if (data.checkoutCreate.checkoutUserErrors?.length > 0) {
    throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
  }
  return data.checkoutCreate.checkout.webUrl;
}

export function formatPrice(amount: string, currencyCode: string = 'INR'): string {
  const num = parseFloat(amount);
  if (currencyCode === 'INR') {
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  return `${currencyCode} ${num.toFixed(2)}`;
}
