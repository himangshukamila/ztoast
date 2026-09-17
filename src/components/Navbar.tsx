"use client";

import { useState } from "react";
import Image from "next/image";

// clean top navigation bar with logo and section links
export function Navbar() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npm i ztoast");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard fallback
    }
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(252, 251, 250, 0.92)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div
        className="container-custom"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
        }}
      >
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "var(--text-main)",
            fontWeight: 700,
            fontSize: "18px",
            letterSpacing: "-0.01em",
          }}
        >
          <Image
            src="/logo.png"
            alt="ztoast logo"
            width={30}
            height={30}
            style={{ borderRadius: "6px" }}
            priority
          />
          <span>ztoast</span>
        </a>

        <nav
          style={{
            display: "none",
            gap: "24px",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          <a
            href="#examples"
            style={{
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 0.15s ease",
            }}
          >
            Examples
          </a>
          <a
            href="#positions"
            style={{
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 0.15s ease",
            }}
          >
            Positioning
          </a>
          <a
            href="#playground"
            style={{
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 0.15s ease",
            }}
          >
            Playground
          </a>
          <a
            href="#docs"
            style={{
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 0.15s ease",
            }}
          >
            Documentation
          </a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            onClick={handleCopy}
            className="toast-btn"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              padding: "6px 12px",
            }}
          >
            <span>npm i ztoast</span>
            {copied ? (
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
