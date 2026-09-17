"use client";

import Image from "next/image";
import { toast } from "@/lib/ztoast";

// hero section inspired by react-hot-toast with logo and quick trigger
export function Hero() {
  const triggerToast = () => {
    toast.success("Fresh toast ready to serve!", {
      description: "Zero runtime dependencies with a built-in progress bar.",
      progressBar: true,
      duration: 4000,
    });
  };

  const checklist = [
    "Hot by default",
    "0 Dependencies",
    "Accessible",
    "Progress countdown",
    "Pause on hover",
    "Promise API",
    "Style with plain CSS",
    "Place it anywhere",
    "Next.js SSR safe",
  ];

  return (
    <section style={{ padding: "50px 0 40px 0", textAlign: "center" }}>
      <div className="container-custom">
        {/* logo */}
        <div style={{ display: "inline-block", marginBottom: "16px" }} className="animate-float">
          <Image
            src="/logo.png"
            alt="ztoast logo"
            width={110}
            height={110}
            priority
          />
        </div>

        {/* headline */}
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            color: "var(--text-main)",
            marginBottom: "8px",
          }}
        >
          The Best Toast in Town.
        </h1>

        {/* subtitle */}
        <p
          style={{
            fontSize: "clamp(18px, 2.5vw, 24px)",
            fontWeight: 600,
            color: "var(--text-secondary)",
            marginBottom: "32px",
          }}
        >
          Smoking hot, zero-dependency React notifications.
        </p>

        {/* action buttons container */}
        <div
          style={{
            display: "inline-flex",
            justifyContent: "center",
            padding: "6px",
            background: "var(--bg-subtle)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "14px",
            marginBottom: "20px",
            width: "100%",
            maxWidth: "260px",
          }}
        >
          <button
            type="button"
            onClick={triggerToast}
            className="toast-btn-primary"
            style={{ width: "100%" }}
          >
            <span>Make me a toast</span>
          </button>
        </div>

        {/* doc link */}
        <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "40px" }}>
          <a
            href="#docs"
            style={{ color: "var(--text-secondary)", textDecoration: "underline", fontWeight: 500 }}
          >
            Documentation
          </a>
          <span> &bull; v0.1.6</span>
        </div>

        {/* checklist */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px 24px",
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          {checklist.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-secondary)",
              }}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--toast-brown)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
