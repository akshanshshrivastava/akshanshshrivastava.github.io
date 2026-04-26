import { formatPrice } from '../shopify';
import { MOCK_PRODUCTS } from '../mock-data';

describe('formatPrice', () => {
  it('formats INR prices correctly', () => {
    expect(formatPrice('1299', 'INR')).toBe('₹1,299');
    expect(formatPrice('999', 'INR')).toBe('₹999');
    expect(formatPrice('3499', 'INR')).toBe('₹3,499');
  });

  it('formats USD prices correctly', () => {
    expect(formatPrice('19.99', 'USD')).toBe('USD 19.99');
  });

  it('defaults to INR', () => {
    expect(formatPrice('1299')).toBe('₹1,299');
  });
});

describe('MOCK_PRODUCTS', () => {
  it('has correct structure', () => {
    expect(MOCK_PRODUCTS.length).toBeGreaterThan(0);
    MOCK_PRODUCTS.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.handle).toBeTruthy();
      expect(p.variants.length).toBeGreaterThan(0);
      expect(p.images.length).toBeGreaterThan(0);
      expect(p.priceRange.minVariantPrice.currencyCode).toBe('INR');
    });
  });

  it('all products have valid prices', () => {
    MOCK_PRODUCTS.forEach((p) => {
      const price = parseFloat(p.priceRange.minVariantPrice.amount);
      expect(price).toBeGreaterThan(0);
      expect(Number.isFinite(price)).toBe(true);
    });
  });

  it('all variants have size options', () => {
    MOCK_PRODUCTS.forEach((p) => {
      p.variants.forEach((v) => {
        const sizeOpt = v.selectedOptions.find((o) => o.name === 'Size');
        expect(sizeOpt).toBeTruthy();
      });
    });
  });

  it('some variants are sold out', () => {
    const soldOut = MOCK_PRODUCTS.flatMap((p) => p.variants).filter(
      (v) => !v.availableForSale
    );
    expect(soldOut.length).toBeGreaterThan(0);
  });
});
