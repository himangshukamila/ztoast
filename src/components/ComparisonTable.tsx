"use client";

interface ComparisonRow {
  feature: string;
  ztoast: string | boolean;
  reactHotToast: string | boolean;
  sonner: string | boolean;
  reactToastify: string | boolean;
}

// renders a badge or icon based on feature support state
function CheckStatus({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: highlight ? "rgba(99, 102, 241, 0.2)" : "rgba(16, 185, 129, 0.15)" }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={highlight ? "#818cf8" : "#10b981"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    ) : (
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.1)" }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    );
  }

  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        fontWeight: highlight ? 700 : 500,
        color: highlight ? "#a5b4fc" : "var(--text-secondary)",
      }}
    >
      {value}
    </span>
  );
}

// feature comparison table between ztoast and other libraries
export function ComparisonTable() {
  const rows: ComparisonRow[] = [
    {
      feature: "Zero Runtime Dependencies",
      ztoast: true,
      reactHotToast: true,
      sonner: false,
      reactToastify: false,
    },
    {
      feature: "Gzipped Bundle Size",
      ztoast: "~3.4 KB",
      reactHotToast: "~4.5 KB",
      sonner: "~5.8 KB",
      reactToastify: "~16.2 KB",
    },
    {
      feature: "Built-in Countdown Progress Bar",
      ztoast: true,
      reactHotToast: false,
      sonner: false,
      reactToastify: true,
    },
    {
      feature: "Synchronized Pause on Hover / Focus",
      ztoast: true,
      reactHotToast: false,
      sonner: false,
      reactToastify: false,
    },
    {
      feature: "Strict Allowlist CSS Sanitization",
      ztoast: true,
      reactHotToast: false,
      sonner: false,
      reactToastify: false,
    },
    {
      feature: "Zero CSS Import Needed",
      ztoast: true,
      reactHotToast: true,
      sonner: false,
      reactToastify: false,
    },
    {
      feature: "Promise Lifecycle (toast.promise)",
      ztoast: true,
      reactHotToast: true,
      sonner: true,
      reactToastify: true,
    },
    {
      feature: "Next.js App Router SSR Safe",
      ztoast: true,
      reactHotToast: true,
      sonner: true,
      reactToastify: true,
    },
    {
      feature: "Custom In-Place Popover Gradients",
      ztoast: true,
      reactHotToast: false,
      sonner: false,
      reactToastify: false,
    },
  ];

  return (
    <section id="comparison" style={{ padding: "80px 0", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="container-custom">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="badge-pill" style={{ marginBottom: "12px" }}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
            <span>Benchmark &amp; Comparison</span>
          </div>
          <h2 style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "12px" }}>
            How ztoast compares to the alternatives.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
            See why developers choose ztoast for lightweight, secure, and zero-configuration notification stacks.
          </p>
        </div>

        <div className="glass-panel" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(255, 255, 255, 0.02)" }}>
                <th style={{ padding: "16px 20px", fontSize: "14px", color: "var(--text-muted)" }}>Feature / Capability</th>
                <th style={{ padding: "16px 20px", fontSize: "14px", color: "#a5b4fc", background: "rgba(99, 102, 241, 0.1)", fontWeight: 700 }}>
                  ztoast
                </th>
                <th style={{ padding: "16px 20px", fontSize: "14px", color: "var(--text-secondary)" }}>react-hot-toast</th>
                <th style={{ padding: "16px 20px", fontSize: "14px", color: "var(--text-secondary)" }}>sonner</th>
                <th style={{ padding: "16px 20px", fontSize: "14px", color: "var(--text-secondary)" }}>react-toastify</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "14px 20px", fontSize: "13px", fontWeight: 500, color: "#ffffff" }}>
                    {r.feature}
                  </td>
                  <td style={{ padding: "14px 20px", background: "rgba(99, 102, 241, 0.05)" }}>
                    <CheckStatus value={r.ztoast} highlight />
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <CheckStatus value={r.reactHotToast} />
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <CheckStatus value={r.sonner} />
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <CheckStatus value={r.reactToastify} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
