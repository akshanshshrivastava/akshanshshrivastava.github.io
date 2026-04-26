const SHOP = "kravvy.myshopify.com";
const CLIENT_ID = process.env.SHOPIFY_ADMIN_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_ADMIN_CLIENT_SECRET;

async function getAccessToken() {
    const url = `https://${SHOP}/admin/oauth/access_token`;
    const payload = {
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload)
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
