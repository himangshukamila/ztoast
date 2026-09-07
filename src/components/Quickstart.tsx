"use client";

// three step quickstart guide matching the clean layout of react-hot-toast
export function Quickstart() {
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
          {/* step 1 */}
          <div
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
              1
            </div>
            <div style={{ fontWeight: 700, fontSize: "16px", color: "var(--text-main)" }}>
              Install package
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Weighs less than 3.5kb gzipped
            </div>
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
              }}
            >
              npm i ztoast
            </code>
          </div>

          {/* step 2 */}
          <div
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
              2
            </div>
            <div style={{ fontWeight: 700, fontSize: "16px", color: "var(--text-main)" }}>
              Add Toaster to your app
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Mount once at your root layout
            </div>
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
              }}
            >
              {"<Toaster />"}
            </code>
          </div>

          {/* step 3 */}
          <div
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
              3
            </div>
            <div style={{ fontWeight: 700, fontSize: "16px", color: "var(--text-main)" }}>
              Start toasting
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Call it from anywhere in your codebase
            </div>
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
              }}
            >
              toast(&quot;Hello World&quot;)
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
