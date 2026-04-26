const SHOP = "kravvy.myshopify.com";

async function getAccessToken() {
    const clientId = process.env.SHOPIFY_ADMIN_CLIENT_ID;
    const clientSecret = process.env.SHOPIFY_ADMIN_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error(
            'SHOPIFY_ADMIN_CLIENT_ID and SHOPIFY_ADMIN_CLIENT_SECRET must be set'
        );
    }

    const url = `https://${SHOP}/admin/oauth/access_token`;
    const payload: Record<string, string> = {
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload),
    });
    const data = await response.json();
    return data.access_token;
}

export async function createShopifyOrder(orderData: any) {
    const token = await getAccessToken();
    const url = `https://${SHOP}/admin/api/2024-04/orders.json`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': token
        },
        body: JSON.stringify({ order: orderData })
    });
    
    return await response.json();
}
