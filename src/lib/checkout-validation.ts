/**
 * Shared checkout validation used on both client and server.
 *
 * Security considerations (OWASP Top 10):
 * - A03 Injection: strict regex whitelists, HTML tag stripping
 * - A07 XSS: all values are sanitized before use
 * - A04 Insecure Design: server re-validates everything client sent
 * - A08 Integrity: field length caps prevent payload inflation
 */

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address1?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

const MAX_FIELD = 200;
const STRIP_HTML = /<[^>]*>/g;
const STRIP_CONTROL = /[\x00-\x1F\x7F]/g;

export function sanitize(value: string): string {
  return value
    .replace(STRIP_HTML, '')
    .replace(STRIP_CONTROL, '')
    .trim()
    .slice(0, MAX_FIELD);
}

export function sanitizeCustomerInfo(raw: Record<string, unknown> | CustomerInfo): CustomerInfo {
  return {
    fullName: sanitize(String(raw.fullName ?? '')),
    email: sanitize(String(raw.email ?? '')).toLowerCase(),
    phone: sanitize(String(raw.phone ?? '')).replace(/\s/g, ''),
    address1: sanitize(String(raw.address1 ?? '')),
    address2: sanitize(String(raw.address2 ?? '')),
    city: sanitize(String(raw.city ?? '')),
    state: sanitize(String(raw.state ?? '')),
    pincode: sanitize(String(raw.pincode ?? '')).replace(/\s/g, ''),
  };
}

// Indian phone: 10 digits, optionally prefixed with +91 or 0
const PHONE_RE = /^(?:\+91|0)?[6-9]\d{9}$/;
// Standard email (simplified but effective)
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
// Indian PIN code
const PIN_RE = /^[1-9]\d{5}$/;
// Names: allow letters, spaces, hyphens, apostrophes, dots (Unicode-friendly)
const NAME_RE = /^[\p{L}\s'.\-]{2,100}$/u;

export function validateCustomerInfo(info: CustomerInfo): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!info.fullName || !NAME_RE.test(info.fullName)) {
    errors.fullName = 'Enter a valid name (2–100 characters).';
  }

  if (!info.email || !EMAIL_RE.test(info.email)) {
    errors.email = 'Enter a valid email address.';
  }

  const phone = info.phone.replace(/^(\+91|0)/, '');
  if (!phone || !PHONE_RE.test(info.phone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  }

  if (!info.address1 || info.address1.length < 5) {
    errors.address1 = 'Enter your full street address (min 5 characters).';
  }

  if (!info.city || info.city.length < 2) {
    errors.city = 'Enter your city name.';
  }

  if (!info.state) {
    errors.state = 'Select your state.';
  }

  if (!info.pincode || !PIN_RE.test(info.pincode)) {
    errors.pincode = 'Enter a valid 6-digit PIN code.';
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman & Nicobar', 'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];
