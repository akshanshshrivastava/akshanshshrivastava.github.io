/**
 * @jest-environment jsdom
 */

import { addToCart, getCartItems, updateCartQuantity, removeFromCart, clearCart, getCartTotal, getCartCount } from '../cart-store';

beforeEach(() => {
  localStorage.clear();
});

describe('cart-store', () => {
  const mockItem = {
    variantId: 'v-1',
    productHandle: 'test-product',
    title: 'Test Product',
    variantTitle: 'M',
    price: '1299',
    image: 'https://example.com/img.jpg',
    quantity: 1,
    size: 'M',
  };

  it('starts with empty cart', () => {
    expect(getCartItems()).toEqual([]);
    expect(getCartCount()).toBe(0);
    expect(getCartTotal()).toBe(0);
  });

  it('adds items to cart', () => {
    addToCart(mockItem);
    const items = getCartItems();
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe('Test Product');
    expect(getCartCount()).toBe(1);
  });

  it('increments quantity for duplicate variant', () => {
    addToCart(mockItem);
    addToCart({ ...mockItem, quantity: 2 });
    const items = getCartItems();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
    expect(getCartCount()).toBe(3);
  });

  it('calculates total correctly', () => {
    addToCart({ ...mockItem, quantity: 2 });
    expect(getCartTotal()).toBe(2598);
  });

  it('updates quantity', () => {
    addToCart(mockItem);
    updateCartQuantity('v-1', 5);
    expect(getCartItems()[0].quantity).toBe(5);
    expect(getCartCount()).toBe(5);
  });

  it('removes item when quantity <= 0', () => {
    addToCart(mockItem);
    updateCartQuantity('v-1', 0);
    expect(getCartItems()).toHaveLength(0);
  });

  it('removes specific item', () => {
    addToCart(mockItem);
    addToCart({ ...mockItem, variantId: 'v-2', title: 'Other Product' });
    removeFromCart('v-1');
    const items = getCartItems();
    expect(items).toHaveLength(1);
    expect(items[0].variantId).toBe('v-2');
  });

  it('clears cart', () => {
    addToCart(mockItem);
    addToCart({ ...mockItem, variantId: 'v-2' });
    clearCart();
    expect(getCartItems()).toHaveLength(0);
    expect(getCartTotal()).toBe(0);
  });
});
