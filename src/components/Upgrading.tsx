"use client";

import { CodeSnippet } from "./CodeSnippet";

const MIGRATION: { before: string; after: string }[] = [
  { before: "<ToastProvider>…<ToastViewport /></ToastProvider>", after: "<Toaster />" },
  { before: "defaultPosition / defaultDuration / defaultProgressBar", after: "position / duration / progress" },
  { before: 'toast.show(msg, { icon: <I /> })', after: "toast.show(msg, <I />) — the object form still works" },
  { before: "background / borderRadius / boxShadow / progressBar", after: "bgColor / radius / shadow / progress" },
  { before: "backgroundGradient / backgroundImage", after: "bgColor — it takes gradients and urls" },
  { before: '{ position: "top-center", top: "50vh" }', after: '{ position: "top-50vh" }' },
  { before: "{ offset: { bottom: 40, right: 32 } }", after: '{ position: "bottom-40px right-32px" }' },
  { before: "progressBar was off by default", after: "progress is on by default" },
  { before: "useToast() threw outside a provider", after: "useToast() works anywhere and never throws" },
  { before: "toasts fired before mount were dropped", after: "they are queued and appear when the Toaster mounts" },
];

const REMOVED = [
  "ToastProvider",
  "ToastViewport",
  "ToastContextValue",
  "ToastProviderProps",
  "ToastOptions",
  "ToastStyleOptions",
  "ToastOffsetOptions",
  "PromiseToastMessages",
  "offset",
  "top / bottom / left / right",
  "transform",
  "borderColor",
  "borderWidth",
];

// upgrade guide from the provider based releases
export function Upgrading() {
  return (
    <section
      id="upgrading"
      style={{ padding: "40px 0 60px 0", borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="container-custom">
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: "8px",
            color: "var(--text-main)",
          }}
        >
          Upgrading from 0.1.7
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "15px",
            maxWidth: "640px",
            marginBottom: "20px",
          }}
        >
          0.1.8 replaced the provider and the raw css option names, and later releases
          keep that same api. Most apps are a two-line change: swap the provider for{" "}
          <code>&lt;Toaster /&gt;</code>, then rename the handful of options below.
        </p>

        {/* setup before and after */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "8px" }}>
              BEFORE
            </div>
            <CodeSnippet
              code={`import { ToastProvider, ToastViewport } from "ztoast";

<ToastProvider defaultPosition="top-right" defaultDuration={4000}>
  {children}
  <ToastViewport />
</ToastProvider>

toast.show("Saved", {
  icon: <FiCheck />,
  background: "#052e16",
  borderRadius: 18,
  progressBar: true,
});`}
              language="tsx"
              filename="0.1.7"
            />
          </div>

          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "8px" }}>
              AFTER
            </div>
            <CodeSnippet
              code={`import { Toaster } from "ztoast";

<Toaster />
{children}

toast.show("Saved", <FiCheck />, {
  bgColor: "#052e16",
  radius: 18,
});`}
              language="tsx"
              filename="0.1.8+"
            />
          </div>
        </div>

        {/* migration table */}
        <div className="clean-card" style={{ overflowX: "auto", marginBottom: "20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-subtle)" }}>
                <th style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>
                  0.1.7
                </th>
                <th style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>
                  0.1.8 and later
                </th>
              </tr>
            </thead>
            <tbody>
              {MIGRATION.map((row) => (
                <tr key={row.before} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td
                    style={{
                      padding: "13px 16px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "12.5px",
                      color: "var(--text-muted)",
                      textDecoration: "line-through",
                      minWidth: "260px",
                    }}
                  >
                    {row.before}
                  </td>
                  <td
                    style={{
                      padding: "13px 16px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "12.5px",
                      color: "var(--text-main)",
                      fontWeight: 600,
                      minWidth: "260px",
                    }}
                  >
                    {row.after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* removed exports */}
        <div className="clean-card" style={{ padding: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "var(--text-main)" }}>
            Gone for good
          </h3>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "14px", lineHeight: 1.5 }}>
            These exports and options no longer exist. If your editor still autocompletes
            them, delete your build cache and reinstall.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {REMOVED.map((item) => (
              <code
                key={item}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-muted)",
                  textDecoration: "line-through",
                }}
              >
                {item}
              </code>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
