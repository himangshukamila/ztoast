"use client";

// three step quickstart, this is the entire setup
export function Quickstart() {
  const steps = [
    {
      n: "1",
      title: "Install package",
      sub: "Zero runtime dependencies",
      code: "npm i ztoast",
    },
    {
      n: "2",
      title: "Mount the Toaster",
      sub: "Once, at your root layout",
      code: "<Toaster />",
    },
    {
      n: "3",
      title: "Start toasting",
      sub: "From any file in your codebase",
      code: 'toast.success("Hello World")',
    },
  ];

  return (
    <section id="quickstart" style={{ padding: "40px 0 60px 0" }}>
      <div className="container-custom">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {steps.map((step) => (
            <div
              key={step.n}
              className="clean-card"
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#1c1917",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                {step.n}
              </div>
              <div style={{ fontWeight: 700, fontSize: "16px", color: "var(--text-main)" }}>
                {step.title}
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{step.sub}</div>
              <code
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "12px",
                  padding: "8px 12px",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "var(--text-main)",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflowX: "auto",
                }}
              >
                {step.code}
              </code>
            </div>
          ))}
        </div>

        {/* the entire setup note */}
        <div
          className="clean-card"
          style={{
            marginTop: "20px",
            padding: "18px 20px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            background: "var(--bg-subtle)",
          }}
        >
          <div style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "620px" }}>
            <strong style={{ color: "var(--text-main)" }}>That is the entire setup.</strong>{" "}
            No provider, no context, no stylesheet to import. Icons, styling, position and
            motion are all optional and go in the same call.
          </div>
          <a href="#upgrading" className="toast-btn" style={{ fontSize: "13px", padding: "8px 14px" }}>
            <span>Upgrading from 0.1.7?</span>
          </a>
        </div>
      </div>
    </section>
  );
}
