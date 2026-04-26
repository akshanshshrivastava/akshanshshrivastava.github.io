"use client";

import { CartItem } from './shopify';

const CART_KEY = 'kravvy-cart';

function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cart-updated'));
}

export function getCartItems(): CartItem[] {
  return getCart();
}

export function addToCart(item: CartItem): CartItem[] {
  const cart = getCart();
  const existing = cart.find(c => c.variantId === item.variantId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push({ ...item });
  }
  saveCart(cart);
  return cart;
}

export function updateCartQuantity(variantId: string, quantity: number): CartItem[] {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter(c => c.variantId !== variantId);
  } else {
    const item = cart.find(c => c.variantId === variantId);
    if (item) item.quantity = quantity;
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(variantId: string): CartItem[] {
  const cart = getCart().filter(c => c.variantId !== variantId);
  saveCart(cart);
  return cart;
}

export function clearCart(): void {
  saveCart([]);
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
