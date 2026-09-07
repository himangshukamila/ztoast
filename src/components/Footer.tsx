"use client";

import Image from "next/image";

// clean footer component with logo and navigation links
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-subtle)",
        padding: "36px 0",
        marginTop: "60px",
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* logo and description */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image
              src="/logo.png"
              alt="ztoast logo"
              width={26}
              height={26}
              style={{ borderRadius: "5px" }}
            />
            <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--text-main)" }}>
              ztoast
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              — Zero-dependency notifications for React
            </span>
          </div>

          {/* navigation links and scroll to top */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <a
              href="#quickstart"
              style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}
            >
              Quickstart
            </a>
            <a
              href="#examples"
              style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}
            >
              Examples
            </a>
            <a
              href="#docs"
              style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}
            >
              Docs
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="toast-btn"
              style={{
                padding: "6px 12px",
                fontSize: "13px",
              }}
            >
              <span>Back to top</span>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
