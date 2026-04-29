export function TrustRow() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        paddingTop: "16px",
        paddingBottom: "16px",
        borderTop: "1px solid var(--color-border)",
        marginTop: "16px",
      }}
    >
      <TrustItem
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="7" width="10" height="6" rx="1" />
            <path d="M3 7V5a3 3 0 0 1 6 0v2" />
            <circle cx="6" cy="10.5" r="1" />
            <path d="M11 10h3l1 3h-4" />
            <circle cx="12.5" cy="13.5" r="1.5" />
            <circle cx="4.5" cy="13.5" r="1.5" />
          </svg>
        }
        label="Free shipping ₹999+"
      />
      <TrustItem
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8h8" />
            <path d="M7 5L4 8l3 3" />
            <rect x="1" y="3" width="14" height="10" rx="2" />
          </svg>
        }
        label="Easy Returns"
      />
      <TrustItem
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 1L2 4v4c0 3.5 2.5 6.2 6 7 3.5-.8 6-3.5 6-7V4L8 1z" />
            <path d="M6 8l1.5 1.5L10 7" />
          </svg>
        }
        label="Made in India"
      />
      <TrustItem
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="12" height="7" rx="1.5" />
            <path d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2" />
            <circle cx="8" cy="11" r="1" />
          </svg>
        }
        label="Secure Payment"
      />
    </div>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "11px",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: "var(--color-text-muted)",
      }}
    >
      {icon}
      {label}
    </span>
  );
}
