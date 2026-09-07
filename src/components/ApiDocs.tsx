"use client";

import { useState } from "react";
import { useToast } from "@/lib/ztoast";
import { CodeSnippet } from "./CodeSnippet";

type DocTab = "toast" | "toaster" | "options" | "usetoast" | "integration";

interface ApiRow {
  name: string;
  type: string;
  defaultVal?: string;
  description: string;
}

// table row for api documentation properties
function DocTableRow({ row }: { row: ApiRow }) {
  return (
    <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#a5b4fc", fontWeight: 600 }}>
        {row.name}
      </td>
      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "#f472b6" }}>
        {row.type}
      </td>
      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
        {row.defaultVal || "—"}
      </td>
      <td style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
        {row.description}
      </td>
    </tr>
  );
}

// comprehensive documentation section with tabbed views
export function ApiDocs() {
  const [activeTab, setActiveTab] = useState<DocTab>("toast");
  const { toasts, dismissAll } = useToast();

  const toastMethods: ApiRow[] = [
    {
      name: "toast.show(msg, opts?)",
      type: "(ReactNode, ToastOptions?) => string | number",
      description: "Triggers a default neutral toast notification and returns its unique id.",
    },
    {
      name: "toast.success(msg, opts?)",
      type: "(ReactNode, ToastOptions?) => string | number",
      description: "Triggers a success notification with an emerald icon and accent.",
    },
    {
      name: "toast.error(msg, opts?)",
      type: "(ReactNode, ToastOptions?) => string | number",
      description: "Triggers an error notification rendered with role='alert' and assertive aria-live.",
    },
    {
      name: "toast.info(msg, opts?)",
      type: "(ReactNode, ToastOptions?) => string | number",
      description: "Triggers an informational notification with a blue badge.",
    },
    {
      name: "toast.warning(msg, opts?)",
      type: "(ReactNode, ToastOptions?) => string | number",
      description: "Triggers a warning notification with an amber badge.",
    },
    {
      name: "toast.loading(msg, opts?)",
      type: "(ReactNode, ToastOptions?) => string | number",
      description: "Triggers a persistent loading spinner toast (default duration: Infinity).",
    },
    {
      name: "toast.promise(p, msgs, opts?)",
      type: "<T>(Promise<T>, PromiseMessages<T>, ToastOptions?) => Promise<T>",
      description: "Tracks an async promise and automatically updates from loading to success or error.",
    },
    {
      name: "toast.dismiss(id)",
      type: "(string | number) => void",
      description: "Plays the 200ms exit transition on the specified toast, then unmounts it.",
    },
    {
      name: "toast.dismissAll()",
      type: "() => void",
      description: "Immediately removes all active toasts and executes their onClose callbacks.",
    },
  ];

  const toasterProps: ApiRow[] = [
    {
      name: "defaultPosition",
      type: "ToastPosition",
      defaultVal: '"top-right"',
      description: "Default anchor position: 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'.",
    },
    {
      name: "defaultDuration",
      type: "number",
      defaultVal: "4000",
      description: "Default auto-dismiss timeout in milliseconds. Use Infinity to persist until closed.",
    },
    {
      name: "defaultProgressBar",
      type: "boolean",
      defaultVal: "false",
      description: "When true, displays the animated countdown progress bar on every toast by default.",
    },
    {
      name: "gap",
      type: "number",
      defaultVal: "12",
      description: "Pixel gap between stacked toast items in each viewport container.",
    },
    {
      name: "offset",
      type: "ToastOffsetOptions",
      defaultVal: "undefined",
      description: "Custom coordinate offsets object ({ top, bottom, left, right, x, y }).",
    },
    {
      name: "top / bottom / left / right",
      type: "number | string",
      defaultVal: "undefined",
      description: "Exact viewport coordinates (e.g. '50vh', '32px', 40).",
    },
  ];

  const toastOptionsProps: ApiRow[] = [
    {
      name: "id",
      type: "string | number",
      defaultVal: "auto generated",
      description: "Explicit identifier. Re-triggering with the same id updates the toast in place.",
    },
    {
      name: "duration",
      type: "number",
      defaultVal: "provider default",
      description: "Auto-dismiss timer in milliseconds. Infinity persists indefinitely.",
    },
    {
      name: "description",
      type: "ReactNode",
      defaultVal: "undefined",
      description: "Secondary descriptive text or JSX node placed underneath the title.",
    },
    {
      name: "progressBar",
      type: "boolean",
      defaultVal: "provider default",
      description: "Enable or disable the synchronized countdown progress bar.",
    },
    {
      name: "progressColor",
      type: "string",
      defaultVal: "variant accent",
      description: "Sanitized fill color for the countdown progress bar.",
    },
    {
      name: "closable",
      type: "boolean",
      defaultVal: "true",
      description: "Controls visibility of the close dismiss button.",
    },
    {
      name: "icon",
      type: "ReactNode",
      defaultVal: "variant icon",
      description: "Custom ReactNode or SVG to replace the built-in variant icon.",
    },
    {
      name: "onClose",
      type: "() => void",
      defaultVal: "undefined",
      description: "Callback invoked exactly once when the toast is dismissed.",
    },
    {
      name: "backgroundGradient",
      type: "string",
      defaultVal: "undefined",
      description: "Sanitized linear/radial/conic gradient background string.",
    },
    {
      name: "borderColor",
      type: "string",
      defaultVal: "#27272a",
      description: "Sanitized border color applied to the toast popover container.",
    },
    {
      name: "borderRadius",
      type: "number | string",
      defaultVal: "14px",
      description: "Corner radius in pixels or css dimension string.",
    },
    {
      name: "boxShadow",
      type: "string",
      defaultVal: "popover shadow",
      description: "Sanitized box shadow definition.",
    },
  ];

  return (
    <section id="docs" style={{ padding: "80px 0", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="container-custom">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="badge-pill" style={{ marginBottom: "12px" }}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
            <span>API Reference &amp; Guides</span>
          </div>
          <h2 style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Complete Documentation.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
            Explore every method, configuration option, and framework setup snippet.
          </p>
        </div>

        {/* tab switcher */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            borderBottom: "1px solid var(--border-subtle)",
            marginBottom: "32px",
            overflowX: "auto",
            paddingBottom: "8px",
          }}
        >
          {[
            { id: "toast", label: "toast.* API" },
            { id: "toaster", label: "<Toaster /> Props" },
            { id: "options", label: "ToastOptions" },
            { id: "usetoast", label: "useToast() Hook" },
            { id: "integration", label: "Framework Setup" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as DocTab)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                background: activeTab === tab.id ? "rgba(99, 102, 241, 0.2)" : "transparent",
                color: activeTab === tab.id ? "#ffffff" : "var(--text-secondary)",
                fontWeight: activeTab === tab.id ? 600 : 500,
                fontSize: "14px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* tab 1: toast methods */}
        {activeTab === "toast" && (
          <div className="glass-panel" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(255, 255, 255, 0.02)" }}>
                  <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Method</th>
                  <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Type Signature</th>
                  <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Default</th>
                  <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {toastMethods.map((m, idx) => (
                  <DocTableRow key={idx} row={m} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* tab 2: toaster props */}
        {activeTab === "toaster" && (
          <div className="glass-panel" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(255, 255, 255, 0.02)" }}>
                  <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Prop</th>
                  <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Type</th>
                  <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Default</th>
                  <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {toasterProps.map((p, idx) => (
                  <DocTableRow key={idx} row={p} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* tab 3: toast options */}
        {activeTab === "options" && (
          <div className="glass-panel" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(255, 255, 255, 0.02)" }}>
                  <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Option</th>
                  <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Type</th>
                  <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Default</th>
                  <th style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-muted)" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {toastOptionsProps.map((o, idx) => (
                  <DocTableRow key={idx} row={o} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* tab 4: usetoast hook */}
        {activeTab === "usetoast" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            <div>
              <CodeSnippet
                filename="NotificationCenter.tsx"
                code={`import { useToast } from "ztoast";

export function NotificationCenter() {
  const { toasts, dismiss, dismissAll } = useToast();

  return (
    <div>
      <p>Active alerts: {toasts.length}</p>
      {toasts.map((t) => (
        <div key={t.id}>
          <span>{t.message}</span>
          <button onClick={() => dismiss(t.id)}>Dismiss</button>
        </div>
      ))}
      <button onClick={dismissAll}>Clear All</button>
    </div>
  );
}`}
              />
            </div>

            {/* live hook state inspector */}
            <div className="glass-panel" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  <span style={{ fontWeight: 600, fontSize: "15px", color: "#ffffff" }}>Live Hook Inspector</span>
                </div>
                <button
                  type="button"
                  onClick={dismissAll}
                  style={{
                    background: "rgba(239, 68, 68, 0.15)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#f87171",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                  }}
                >
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  <span>dismissAll()</span>
                </button>
              </div>

              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>
                Currently active toasts on screen: <strong style={{ color: "#ffffff" }}>{toasts.length}</strong>
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "220px", overflowY: "auto" }}>
                {toasts.length === 0 ? (
                  <div style={{ padding: "20px", textAlign: "center", color: "var(--text-muted)", fontSize: "13px" }}>
                    No toasts active right now. Click any demo button to trigger one!
                  </div>
                ) : (
                  toasts.map((t) => (
                    <div
                      key={t.id}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid var(--border-subtle)",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", color: "#a5b4fc" }}>{String(t.id)}</span>
                      <span style={{ color: "var(--text-secondary)" }}>{String(t.message)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* tab 5: framework setup */}
        {activeTab === "integration" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>
                Next.js App Router (app/layout.tsx)
              </div>
              <CodeSnippet
                filename="app/layout.tsx"
                code={`import { Toaster } from "ztoast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster defaultPosition="top-right" defaultProgressBar />
        {children}
      </body>
    </html>
  );
}`}
              />
            </div>

            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>
                Axios / Fetch Interceptor (Outside React)
              </div>
              <CodeSnippet
                filename="apiClient.ts"
                code={`import { toast } from "ztoast";

export async function fetchWithToast(url: string, opts?: RequestInit) {
  try {
    const res = await fetch(url, opts);
    if (!res.ok) {
      toast.error("Request failed", { description: \`HTTP \${res.status}\` });
    }
    return res;
  } catch (error) {
    toast.error("Network error", { description: "Server is unreachable" });
    throw error;
  }
}`}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
