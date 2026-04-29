/**
 * Shopify Storefront API — Customer Auth
 * Uses the same storefront token as shopify.ts.
 */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function customerFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'Shopify API error');
  }
  return json.data;
}

// ── Create Customer ──

export async function customerCreate(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}) {
  const data = await customerFetch<any>(`
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id firstName lastName email phone }
        customerUserErrors { code field message }
      }
    }
  `, { input });

  const errors = data.customerCreate.customerUserErrors;
  if (errors?.length > 0) {
    throw new Error(errors[0].message);
  }
  return data.customerCreate.customer;
}

// ── Login (get access token) ──

export async function customerLogin(email: string, password: string) {
  const data = await customerFetch<any>(`
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors { code field message }
      }
    }
  `, { input: { email, password } });

  const errors = data.customerAccessTokenCreate.customerUserErrors;
  if (errors?.length > 0) {
    throw new Error(errors[0].message);
  }
  return data.customerAccessTokenCreate.customerAccessToken;
}

// ── Recover Password ──

export async function customerRecover(email: string) {
  const data = await customerFetch<any>(`
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors { code field message }
      }
    }
  `, { email });

  const errors = data.customerRecover.customerUserErrors;
  if (errors?.length > 0) {
    throw new Error(errors[0].message);
  }
  return true;
}

// ── Get Customer by Access Token ──

export async function getCustomer(accessToken: string) {
  const data = await customerFetch<any>(`
    query customer($token: String!) {
      customer(customerAccessToken: $token) {
        id
        firstName
        lastName
        email
        phone
        defaultAddress {
          address1
          address2
          city
          province
          zip
          country
        }
        orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice { amount currencyCode }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      price { amount currencyCode }
                      image { url altText }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, { token: accessToken });

  if (!data.customer) return null;

  return {
    ...data.customer,
    orders: data.customer.orders.edges.map((e: any) => ({
      ...e.node,
      lineItems: e.node.lineItems.edges.map((li: any) => li.node),
    })),
  };
}

// ── Delete Access Token (logout) ──

export async function customerLogout(accessToken: string) {
  await customerFetch(`
    mutation customerAccessTokenDelete($token: String!) {
      customerAccessTokenDelete(customerAccessToken: $token) {
        deletedAccessToken
        userErrors { field message }
      }
    }
  `, { token: accessToken });
  return true;
}
