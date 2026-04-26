import type { ShopifyProduct } from './shopify';

export const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: 'mock-1',
    title: 'Venom Drip Oversized Tee',
    handle: 'venom-drip-oversized-tee',
    description: 'Unleash the darkness with this oversized drop-shoulder tee featuring a hand-drawn venom spider graphic on heavy 240GSM cotton.',
    descriptionHtml: '<p>Unleash the darkness with this oversized drop-shoulder tee featuring a hand-drawn venom spider graphic on heavy 240GSM cotton. Acid-washed for that perfectly worn-in feel.</p><ul><li>240 GSM Heavy Cotton</li><li>Oversized Drop-Shoulder Fit</li><li>Acid Wash Finish</li><li>Screen Printed Graphics</li></ul>',
    tags: ['spider', 'venom', 'oversized', 'black', 'graphic-tee', 'streetwear'],
    productType: 'T-Shirt',
    priceRange: {
      minVariantPrice: { amount: '1299', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1299', currencyCode: 'INR' },
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80', altText: 'Venom Drip Tee Front' },
      { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', altText: 'Venom Drip Tee Back' },
    ],
    variants: [
      { id: 'mock-v-1-s', title: 'S', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'S' }], price: { amount: '1299', currencyCode: 'INR' } },
      { id: 'mock-v-1-m', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'M' }], price: { amount: '1299', currencyCode: 'INR' } },
      { id: 'mock-v-1-l', title: 'L', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'L' }], price: { amount: '1299', currencyCode: 'INR' } },
      { id: 'mock-v-1-xl', title: 'XL', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'XL' }], price: { amount: '1299', currencyCode: 'INR' } },
      { id: 'mock-v-1-xxl', title: 'XXL', availableForSale: false, selectedOptions: [{ name: 'Size', value: 'XXL' }], price: { amount: '1299', currencyCode: 'INR' } },
    ],
  },
  {
    id: 'mock-2',
    title: 'Neon Glitch Hoodie',
    handle: 'neon-glitch-hoodie',
    description: 'Cyberpunk meets streetwear. This heavyweight hoodie features a glitch-effect neon graphic that glows under UV light.',
    descriptionHtml: '<p>Cyberpunk meets streetwear. This heavyweight hoodie features a glitch-effect neon graphic that glows under UV light.</p><ul><li>380 GSM French Terry</li><li>Oversized Fit</li><li>UV-Reactive Ink</li><li>Kangaroo Pocket</li></ul>',
    tags: ['hoodie', 'neon', 'glitch', 'black', 'cyberpunk', 'streetwear'],
    productType: 'Hoodie',
    priceRange: {
      minVariantPrice: { amount: '2499', currencyCode: 'INR' },
      maxVariantPrice: { amount: '2499', currencyCode: 'INR' },
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', altText: 'Neon Glitch Hoodie Front' },
      { url: 'https://images.unsplash.com/photo-1578768079470-0a4536e2b7c8?w=800&q=80', altText: 'Neon Glitch Hoodie Detail' },
    ],
    variants: [
      { id: 'mock-v-2-s', title: 'S', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'S' }], price: { amount: '2499', currencyCode: 'INR' } },
      { id: 'mock-v-2-m', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'M' }], price: { amount: '2499', currencyCode: 'INR' } },
      { id: 'mock-v-2-l', title: 'L', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'L' }], price: { amount: '2499', currencyCode: 'INR' } },
      { id: 'mock-v-2-xl', title: 'XL', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'XL' }], price: { amount: '2499', currencyCode: 'INR' } },
    ],
  },
  {
    id: 'mock-3',
    title: 'Phantom Web Cargo Joggers',
    handle: 'phantom-web-cargo-joggers',
    description: 'Tactical vibes with a streetwear edge. These cargo joggers feature web-print panels and deep utility pockets.',
    descriptionHtml: '<p>Tactical vibes with a streetwear edge. These cargo joggers feature web-print panels and deep utility pockets.</p><ul><li>Twill Cotton Blend</li><li>Tapered Fit</li><li>6 Utility Pockets</li><li>Elastic Cuffs</li></ul>',
    tags: ['cargo', 'joggers', 'black', 'spider', 'tactical', 'streetwear'],
    productType: 'Joggers',
    priceRange: {
      minVariantPrice: { amount: '1899', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1899', currencyCode: 'INR' },
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', altText: 'Phantom Cargo Joggers' },
      { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', altText: 'Phantom Cargo Detail' },
    ],
    variants: [
      { id: 'mock-v-3-s', title: 'S', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'S' }], price: { amount: '1899', currencyCode: 'INR' } },
      { id: 'mock-v-3-m', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'M' }], price: { amount: '1899', currencyCode: 'INR' } },
      { id: 'mock-v-3-l', title: 'L', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'L' }], price: { amount: '1899', currencyCode: 'INR' } },
      { id: 'mock-v-3-xl', title: 'XL', availableForSale: false, selectedOptions: [{ name: 'Size', value: 'XL' }], price: { amount: '1899', currencyCode: 'INR' } },
    ],
  },
  {
    id: 'mock-4',
    title: 'Dark Signal Graphic Tee',
    handle: 'dark-signal-graphic-tee',
    description: 'Distorted frequency waves meet bold typography. A statement tee for those who move in silence.',
    descriptionHtml: '<p>Distorted frequency waves meet bold typography. A statement tee for those who move in silence.</p><ul><li>200 GSM Combed Cotton</li><li>Regular Fit</li><li>DTG Print</li><li>Pre-Shrunk</li></ul>',
    tags: ['graphic-tee', 'signal', 'white', 'minimalist', 'streetwear'],
    productType: 'T-Shirt',
    priceRange: {
      minVariantPrice: { amount: '999', currencyCode: 'INR' },
      maxVariantPrice: { amount: '999', currencyCode: 'INR' },
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', altText: 'Dark Signal Tee Front' },
      { url: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80', altText: 'Dark Signal Tee Back' },
    ],
    variants: [
      { id: 'mock-v-4-s', title: 'S', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'S' }], price: { amount: '999', currencyCode: 'INR' } },
      { id: 'mock-v-4-m', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'M' }], price: { amount: '999', currencyCode: 'INR' } },
      { id: 'mock-v-4-l', title: 'L', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'L' }], price: { amount: '999', currencyCode: 'INR' } },
      { id: 'mock-v-4-xl', title: 'XL', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'XL' }], price: { amount: '999', currencyCode: 'INR' } },
    ],
  },
  {
    id: 'mock-5',
    title: 'Symbiote Mesh Tank',
    handle: 'symbiote-mesh-tank',
    description: 'Breathable mesh meets dark aesthetics. Perfect for layering or solo when the vibe calls for it.',
    descriptionHtml: '<p>Breathable mesh meets dark aesthetics. Perfect for layering or solo when the vibe calls for it.</p><ul><li>Polyester Mesh</li><li>Relaxed Fit</li><li>Contrast Stitching</li></ul>',
    tags: ['tank', 'mesh', 'black', 'spider', 'streetwear', 'red'],
    productType: 'Tank Top',
    priceRange: {
      minVariantPrice: { amount: '799', currencyCode: 'INR' },
      maxVariantPrice: { amount: '799', currencyCode: 'INR' },
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=80', altText: 'Symbiote Mesh Tank' },
    ],
    variants: [
      { id: 'mock-v-5-s', title: 'S', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'S' }], price: { amount: '799', currencyCode: 'INR' } },
      { id: 'mock-v-5-m', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'M' }], price: { amount: '799', currencyCode: 'INR' } },
      { id: 'mock-v-5-l', title: 'L', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'L' }], price: { amount: '799', currencyCode: 'INR' } },
      { id: 'mock-v-5-xl', title: 'XL', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'XL' }], price: { amount: '799', currencyCode: 'INR' } },
    ],
  },
  {
    id: 'mock-6',
    title: 'Void Walker Bomber Jacket',
    handle: 'void-walker-bomber-jacket',
    description: 'Step through dimensions in this satin-finish bomber with reflective web detailing on the back panel.',
    descriptionHtml: '<p>Step through dimensions in this satin-finish bomber with reflective web detailing on the back panel.</p><ul><li>Satin Shell</li><li>Quilted Lining</li><li>Ribbed Cuffs & Hem</li><li>Reflective Print</li></ul>',
    tags: ['jacket', 'bomber', 'black', 'reflective', 'premium', 'streetwear'],
    productType: 'Jacket',
    priceRange: {
      minVariantPrice: { amount: '3499', currencyCode: 'INR' },
      maxVariantPrice: { amount: '3499', currencyCode: 'INR' },
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80', altText: 'Void Walker Bomber Front' },
      { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', altText: 'Void Walker Bomber Back' },
    ],
    variants: [
      { id: 'mock-v-6-s', title: 'S', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'S' }], price: { amount: '3499', currencyCode: 'INR' } },
      { id: 'mock-v-6-m', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'M' }], price: { amount: '3499', currencyCode: 'INR' } },
      { id: 'mock-v-6-l', title: 'L', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'L' }], price: { amount: '3499', currencyCode: 'INR' } },
      { id: 'mock-v-6-xl', title: 'XL', availableForSale: false, selectedOptions: [{ name: 'Size', value: 'XL' }], price: { amount: '3499', currencyCode: 'INR' } },
    ],
  },
];
