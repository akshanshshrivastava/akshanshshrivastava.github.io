"use client";

import { useState, useEffect } from "react";

const messages = [
  "FREE SHIPPING OVER ₹999 • LIMITED DROPS • MADE IN INDIA",
  "NEW DROP EVERY MONTH • OWN YOUR VIBE",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#E53935",
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          color: "#fff",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: visible ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
      >
        {messages[index]}
      </span>
    </div>
  );
}
