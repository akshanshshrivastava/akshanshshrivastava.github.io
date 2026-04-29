"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const [tab, setTab] = useState<"login" | "signup" | "recover">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Recover
  const [recoverEmail, setRecoverEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: signupEmail,
          password: signupPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await fetch("/api/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: recoverEmail }),
      });
      setSuccess("If that email exists, you'll receive a password reset link from Shopify.");
    } catch {
      setSuccess("If that email exists, you'll receive a password reset link from Shopify.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--color-bg-card)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    padding: "12px 16px",
    fontSize: "14px",
    color: "var(--color-text-primary)",
    outline: "none",
    minHeight: 48,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--color-text-muted)",
    marginBottom: 6,
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        paddingTop: "calc(var(--bar-height) + 80px + 40px)",
        paddingBottom: 80,
        background: "var(--color-bg)",
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-eyebrow">// Account</span>
          <h1 className="text-section-heading mt-2">
            {tab === "login" ? "Log In" : tab === "signup" ? "Sign Up" : "Reset Password"}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-lg" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
          {(["login", "signup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); setSuccess(""); }}
              className="flex-1 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] rounded-md transition-all min-h-[44px]"
              style={{
                background: tab === t ? "var(--color-accent)" : "transparent",
                color: tab === t ? "white" : "var(--color-text-muted)",
              }}
            >
              {t === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-5 p-4 rounded-lg text-sm" style={{ background: "rgba(229,57,53,0.1)", border: "1px solid rgba(229,57,53,0.3)", color: "var(--color-accent)" }}>
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 p-4 rounded-lg text-sm" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
            {success}
          </div>
        )}

        {/* Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
                disabled={loading}
              />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
                disabled={loading}
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full" style={{ height: 56 }}>
              {loading ? "Logging in…" : "Log In"}
            </button>
            <button
              type="button"
              onClick={() => { setTab("recover"); setError(""); }}
              className="w-full text-center text-sm mt-2"
              style={{ color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer" }}
            >
              Forgot password?
            </button>
          </form>
        )}

        {/* Signup Form */}
        {tab === "signup" && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label style={labelStyle}>First Name *</label>
                <input
                  type="text"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  style={inputStyle}
                  disabled={loading}
                />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  style={inputStyle}
                  disabled={loading}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
                disabled={loading}
              />
            </div>
            <div>
              <label style={labelStyle}>Password *</label>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Min. 8 characters"
                style={inputStyle}
                disabled={loading}
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full" style={{ height: 56 }}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
        )}

        {/* Recover Form */}
        {tab === "recover" && (
          <form onSubmit={handleRecover} className="space-y-4">
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Enter your email and we&rsquo;ll send you a link to reset your password.
            </p>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={recoverEmail}
                onChange={(e) => setRecoverEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
                disabled={loading}
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full" style={{ height: 56 }}>
              {loading ? "Sending…" : "Send Reset Link"}
            </button>
            <button
              type="button"
              onClick={() => { setTab("login"); setError(""); setSuccess(""); }}
              className="w-full text-center text-sm"
              style={{ color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer" }}
            >
              ← Back to login
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-8" style={{ color: "var(--color-text-muted)" }}>
          <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageInner />
    </Suspense>
  );
}
