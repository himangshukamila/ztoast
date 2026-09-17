"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { toast } from "ztoast";

// hero section with the logo, the new call shape and a live trigger
export function Hero() {
  const triggerToast = () => {
    toast.success("Project saved", <Check size={18} />, {
      bgColor: "#052e16",
      width: 360,
      description: "Icon and styling both go into the call.",
    });
  };

  const checklist = [
    "One component to mount",
    "Then call it from anywhere",
    "Put a toast anywhere on screen",
    "Smooth motion by default",
    "Countdown bar, pauses on hover",
    "No CSS file to import",
    "Zero runtime dependencies",
    "Works outside React too",
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
          Toasts you can put anywhere.
        </h1>

        {/* subtitle */}
        <p
          style={{
            fontSize: "clamp(18px, 2.5vw, 24px)",
            fontWeight: 600,
            color: "var(--text-secondary)",
            marginBottom: "28px",
          }}
        >
          Zero-dependency React notifications.
        </p>

        {/* the call shape, message then icon then style */}
        <div
          className="code-box"
          style={{
            maxWidth: "720px",
            margin: "0 auto 24px auto",
            padding: "16px 18px",
            fontSize: "13.5px",
            lineHeight: 1.7,
            textAlign: "left",
            overflowX: "auto",
          }}
        >
          <code style={{ whiteSpace: "pre", fontFamily: "var(--font-mono)" }}>
            <span style={{ color: "#a5b4fc" }}>toast</span>
            <span style={{ color: "#f5f5f4" }}>.</span>
            <span style={{ color: "#7dd3fc" }}>success</span>
            <span style={{ color: "#f5f5f4" }}>(</span>
            <span style={{ color: "#bef264" }}>&quot;Project saved&quot;</span>
            <span style={{ color: "#f5f5f4" }}>, </span>
            <span style={{ color: "#fcd34d" }}>&lt;FiCheck /&gt;</span>
            <span style={{ color: "#f5f5f4" }}>, {"{"} bgColor: </span>
            <span style={{ color: "#bef264" }}>&quot;#052e16&quot;</span>
            <span style={{ color: "#f5f5f4" }}>, width: </span>
            <span style={{ color: "#fda4af" }}>360</span>
            <span style={{ color: "#f5f5f4" }}> {"}"});</span>
          </code>
        </div>

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
          <span> &bull; v0.1.9</span>
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
