"use client";

import { useState, useCallback } from "react";
import {
  CustomerInfo,
  ValidationErrors,
  validateCustomerInfo,
  hasErrors,
  sanitizeCustomerInfo,
  INDIAN_STATES,
} from "@/lib/checkout-validation";

interface CheckoutFormProps {
  totalLabel: string;
  onSubmit: (customer: CustomerInfo) => void;
  onBack: () => void;
  disabled?: boolean;
}

const EMPTY: CustomerInfo = {
  fullName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
};

export function CheckoutForm({ totalLabel, onSubmit, onBack, disabled }: CheckoutFormProps) {
  const [form, setForm] = useState<CustomerInfo>(EMPTY);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const update = useCallback((field: keyof CustomerInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched.has(field)) {
      const updated = { ...form, [field]: value };
      const sanitized = sanitizeCustomerInfo(updated);
      const fieldErrors = validateCustomerInfo(sanitized);
      setErrors((prev) => {
        const next = { ...prev };
        if (fieldErrors[field as keyof ValidationErrors]) {
          next[field as keyof ValidationErrors] = fieldErrors[field as keyof ValidationErrors];
        } else {
          delete next[field as keyof ValidationErrors];
        }
        return next;
      });
    }
  }, [form, touched]);

  const blur = useCallback((field: keyof CustomerInfo) => {
    setTouched((prev) => new Set(prev).add(field));
    const sanitized = sanitizeCustomerInfo(form);
    const fieldErrors = validateCustomerInfo(sanitized);
    setErrors((prev) => {
      const next = { ...prev };
      if (fieldErrors[field as keyof ValidationErrors]) {
        next[field as keyof ValidationErrors] = fieldErrors[field as keyof ValidationErrors];
      } else {
        delete next[field as keyof ValidationErrors];
      }
      return next;
    });
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = sanitizeCustomerInfo(form);
    const allErrors = validateCustomerInfo(sanitized);
    setErrors(allErrors);
    setTouched(new Set(["fullName", "email", "phone", "address1", "city", "state", "pincode"]));
    if (hasErrors(allErrors)) return;
    onSubmit(sanitized);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--color-bg-card)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    padding: "10px 14px",
    fontSize: "14px",
    color: "var(--color-text-primary)",
    outline: "none",
    transition: "border-color var(--dur-fast)",
    minHeight: 44,
  };

  const errorInputStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: "var(--color-accent)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "var(--color-text-muted)",
    marginBottom: 4,
  };

  const errorTextStyle: React.CSSProperties = {
    fontSize: "11px",
    color: "var(--color-accent)",
    marginTop: 2,
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="on">
      <div className="flex items-center gap-3 mb-5">
        <button
          type="button"
          onClick={onBack}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center"
          style={{ color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer" }}
          aria-label="Back to cart"
        >
          ←
        </button>
        <span className="text-[13px] font-bold tracking-[0.1em] uppercase" style={{ color: "var(--color-text-primary)" }}>
          Shipping Details
        </span>
      </div>

      <div className="space-y-3">
        {/* Full Name */}
        <div>
          <label style={labelStyle} htmlFor="co-name">Full Name *</label>
          <input
            id="co-name"
            type="text"
            autoComplete="name"
            maxLength={100}
            placeholder="Akshansh Shrivastava"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            onBlur={() => blur("fullName")}
            style={errors.fullName && touched.has("fullName") ? errorInputStyle : inputStyle}
            disabled={disabled}
          />
          {errors.fullName && touched.has("fullName") && <p style={errorTextStyle}>{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle} htmlFor="co-email">Email *</label>
          <input
            id="co-email"
            type="email"
            autoComplete="email"
            maxLength={200}
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            style={errors.email && touched.has("email") ? errorInputStyle : inputStyle}
            disabled={disabled}
          />
          {errors.email && touched.has("email") && <p style={errorTextStyle}>{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle} htmlFor="co-phone">Phone *</label>
          <input
            id="co-phone"
            type="tel"
            autoComplete="tel"
            maxLength={15}
            placeholder="9876543210"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value.replace(/[^\d+]/g, ''))}
            onBlur={() => blur("phone")}
            style={errors.phone && touched.has("phone") ? errorInputStyle : inputStyle}
            disabled={disabled}
          />
          {errors.phone && touched.has("phone") && <p style={errorTextStyle}>{errors.phone}</p>}
        </div>

        {/* Address line 1 */}
        <div>
          <label style={labelStyle} htmlFor="co-addr1">Address Line 1 *</label>
          <input
            id="co-addr1"
            type="text"
            autoComplete="address-line1"
            maxLength={200}
            placeholder="House no, Building, Street"
            value={form.address1}
            onChange={(e) => update("address1", e.target.value)}
            onBlur={() => blur("address1")}
            style={errors.address1 && touched.has("address1") ? errorInputStyle : inputStyle}
            disabled={disabled}
          />
          {errors.address1 && touched.has("address1") && <p style={errorTextStyle}>{errors.address1}</p>}
        </div>

        {/* Address line 2 */}
        <div>
          <label style={labelStyle} htmlFor="co-addr2">Address Line 2</label>
          <input
            id="co-addr2"
            type="text"
            autoComplete="address-line2"
            maxLength={200}
            placeholder="Area, Landmark (optional)"
            value={form.address2}
            onChange={(e) => update("address2", e.target.value)}
            style={inputStyle}
            disabled={disabled}
          />
        </div>

        {/* City + State row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label style={labelStyle} htmlFor="co-city">City *</label>
            <input
              id="co-city"
              type="text"
              autoComplete="address-level2"
              maxLength={100}
              placeholder="Jabalpur"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              onBlur={() => blur("city")}
              style={errors.city && touched.has("city") ? errorInputStyle : inputStyle}
              disabled={disabled}
            />
            {errors.city && touched.has("city") && <p style={errorTextStyle}>{errors.city}</p>}
          </div>
          <div>
            <label style={labelStyle} htmlFor="co-state">State *</label>
            <select
              id="co-state"
              autoComplete="address-level1"
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              onBlur={() => blur("state")}
              style={errors.state && touched.has("state") ? errorInputStyle : inputStyle}
              disabled={disabled}
            >
              <option value="">Select…</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.state && touched.has("state") && <p style={errorTextStyle}>{errors.state}</p>}
          </div>
        </div>

        {/* PIN code */}
        <div>
          <label style={labelStyle} htmlFor="co-pin">PIN Code *</label>
          <input
            id="co-pin"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            placeholder="482001"
            value={form.pincode}
            onChange={(e) => update("pincode", e.target.value.replace(/\D/g, ''))}
            onBlur={() => blur("pincode")}
            style={errors.pincode && touched.has("pincode") ? errorInputStyle : inputStyle}
            disabled={disabled}
          />
          {errors.pincode && touched.has("pincode") && <p style={errorTextStyle}>{errors.pincode}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="btn-primary w-full mt-5"
        style={{ height: 56 }}
      >
        {disabled ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing…
          </span>
        ) : (
          `Pay ${totalLabel}`
        )}
      </button>

      <p className="text-[11px] text-center mt-3 tracking-[0.05em]" style={{ color: "var(--color-text-muted)" }}>
        SECURE PAYMENT • 256-BIT ENCRYPTION
      </p>
    </form>
  );
}
