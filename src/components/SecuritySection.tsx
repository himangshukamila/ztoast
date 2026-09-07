"use client";

interface SecurityVector {
  feature: string;
  allowedSyntax: string;
  blockedAttacks: string;
}

// table row for security rule demonstration
function VectorRow({ vector }: { vector: SecurityVector }) {
  return (
    <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      <td style={{ padding: "14px 16px", fontWeight: 600, color: "#ffffff", fontSize: "13px" }}>
        {vector.feature}
      </td>
      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "#34d399" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{vector.allowedSyntax}</span>
        </div>
      </td>
      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "#f87171" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <span>{vector.blockedAttacks}</span>
        </div>
      </td>
    </tr>
  );
}

// security deep dive section explaining allowlist sanitization
export function SecuritySection() {
  const vectors: SecurityVector[] = [
    {
      feature: "Colors & Fills",
      allowedSyntax: "#hex, rgb(), rgba(), hsl(), hsla(), oklch(), var(--custom)",
      blockedAttacks: "javascript:, vbscript:, url(xss), unclosed functions",
    },
    {
      feature: "Background Gradients",
      allowedSyntax: "linear-gradient(...), radial-gradient(...), conic-gradient(...)",
      blockedAttacks: "expression(...), -moz-binding, @import, script breakouts",
    },
    {
      feature: "Background Images",
      allowedSyntax: "http(s)://, relative paths, validated data:image/*;base64",
      blockedAttacks: "data:text/html, data:application, javascript: protocol",
    },
    {
      feature: "Transforms & Offsets",
      allowedSyntax: "translate, rotate, scale, matrix with strict numeric units",
      blockedAttacks: "backslash escapes (\\6a avascript), arbitrary calc() injections",
    },
    {
      feature: "Box Shadows & Borders",
      allowedSyntax: "length offsets, safe color values, inset keyword",
      blockedAttacks: "semicolon rule breakout (; color: red), nested curly braces",
    },
    {
      feature: "ReDoS & Performance",
      allowedSyntax: "strictly linear regex with pre-validation 500-char length cap",
      blockedAttacks: "catastrophic backtracking strings, nested regex quantifiers",
    },
  ];

  return (
    <section id="security" style={{ padding: "80px 0", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="container-custom">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="badge-pill" style={{ marginBottom: "12px" }}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Strict Allowlist Security Model</span>
          </div>
          <h2 style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Bulletproof against CSS injection attacks.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "650px", margin: "0 auto" }}>
            Most notification libraries pass raw styles directly to the DOM. ztoast validates every style prop through an allowlist sanitizer before it reaches the CSSOM.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "36px" }}>
          <div className="glass-panel" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#ffffff" }}>
                Why Allowlist instead of Denylist?
              </h3>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
              Denylists always fail because attackers use CSS escape sequences (such as <code>\6a avascript:</code>), character splitting via comments (<code>{"/* */"}</code>), or newly added browser features. ztoast only accepts known-safe pattern shapes, dropping anything unrecognized.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#ffffff" }}>
                ReDoS Defense &amp; Length Bounds
              </h3>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
              Every input string is capped to 500 characters and normalized before any pattern evaluation. Regular expressions are strictly linear without nested quantifiers, guaranteeing that malicious payloads cannot freeze the JavaScript main thread.
            </p>
          </div>
        </div>

        <div className="glass-panel" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(255, 255, 255, 0.02)" }}>
                <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Property</th>
                <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Accepted Allowlist Syntax</th>
                <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Blocked Exploits</th>
              </tr>
            </thead>
            <tbody>
              {vectors.map((vec, idx) => (
                <VectorRow key={idx} vector={vec} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
