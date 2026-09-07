"use client";

import { useState } from "react";
import { CodeSnippet } from "./CodeSnippet";

// comprehensive documentation section with descriptive api guides, options, and recipes
export function DocsSection() {
  const [activeTab, setActiveTab] = useState<"api" | "options" | "props" | "promise">("api");

  const apiMethods = [
    {
      name: "toast(message, options?)",
      returns: "string | number",
      badge: "core",
      desc: "Creates a standard notification card with a clean white appearance and automatic unique id assignment.",
      code: `import { toast } from "ztoast";

// basic message
toast("Your changes have been saved.");

// with secondary description and countdown bar
toast("Backup completed", {
  description: "Stored securely in cloud storage.",
  progressBar: true,
  duration: 4000,
});`,
    },
    {
      name: "toast.success(message, options?)",
      returns: "string | number",
      badge: "variant",
      desc: "Displays a positive success notification accompanied by an emerald checkmark badge.",
      code: `toast.success("Profile updated successfully", {
  duration: 3500,
});`,
    },
    {
      name: "toast.error(message, options?)",
      returns: "string | number",
      badge: "variant",
      desc: "Displays an assertive error alert with a coral red badge and accessible alert aria role.",
      code: `toast.error("Could not connect to database", {
  description: "Please check your network settings and try again.",
});`,
    },
    {
      name: "toast.loading(message, options?)",
      returns: "string | number",
      badge: "variant",
      desc: "Displays an ongoing action with a spinning loader icon that remains on screen until resolved or dismissed.",
      code: `const toastId = toast.loading("Deploying application...");

// dismiss later when task completes
toast.dismiss(toastId);`,
    },
    {
      name: "toast.promise(promise, messages, options?)",
      returns: "Promise<T>",
      badge: "async",
      desc: "Seamlessly tracks any javascript promise from pending state to resolution or rejection.",
      code: `const uploadTask = uploadFile(file);

toast.promise(uploadTask, {
  loading: "Uploading file...",
  success: (data) => \`Uploaded \${data.filename} successfully!\`,
  error: "Upload failed. Try again later.",
});`,
    },
    {
      name: "toast.dismiss(id?)",
      returns: "void",
      badge: "control",
      desc: "Dismisses a notification card with an exit animation. If called without an id, all active toasts are dismissed.",
      code: `// dismiss one specific toast
toast.dismiss(myToastId);

// dismiss all active toasts at once
toast.dismiss();`,
    },
  ];

  const toastOptions = [
    {
      option: "duration",
      type: "number",
      def: "4000",
      desc: "Time in milliseconds before the toast dismisses automatically. Set to Infinity to keep the notification persistent until manually closed.",
    },
    {
      option: "description",
      type: "ReactNode",
      def: "undefined",
      desc: "Secondary descriptive text or custom JSX rendered beneath the headline message for additional context.",
    },
    {
      option: "progressBar",
      type: "boolean",
      def: "false",
      desc: "Renders an animated countdown progress bar at the bottom edge. Automatically pauses when the user hovers over the card.",
    },
    {
      option: "position",
      type: "ToastPosition",
      def: '"top-right"',
      desc: "Overrides the global anchor position for this specific toast ('top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right').",
    },
    {
      option: "icon",
      type: "ReactNode",
      def: "variant icon",
      desc: "Custom JSX element or emoji icon to replace the default circular status badge.",
    },
    {
      option: "id",
      type: "string | number",
      def: "auto generated",
      desc: "Custom identifier string. Reusing an existing id allows you to smoothly update a notification in place without creating a duplicate.",
    },
    {
      option: "closable",
      type: "boolean",
      def: "true",
      desc: "Whether to render the subtle close button on the top right of the notification card.",
    },
    {
      option: "onClose",
      type: "() => void",
      def: "undefined",
      desc: "Lifecycle callback function invoked when the notification begins its exit animation.",
    },
    {
      option: "progressColor",
      type: "string",
      def: "accent color",
      desc: "Custom color for the animated countdown bar. Accepts hex, rgb, hsl, or css variable tokens.",
    },
    {
      option: "background",
      type: "string",
      def: '"#ffffff"',
      desc: "Custom background color override for the toast container card.",
    },
    {
      option: "textColor",
      type: "string",
      def: '"#1c1917"',
      desc: "Custom text color override for the title and content.",
    },
  ];

  const toasterProps = [
    {
      prop: "defaultPosition",
      type: "ToastPosition",
      def: '"top-right"',
      desc: "Default screen anchor coordinate for all notifications. Supports 6 positions across top and bottom screen edges.",
    },
    {
      prop: "defaultDuration",
      type: "number",
      def: "4000",
      desc: "Default time in milliseconds before notifications dismiss automatically.",
    },
    {
      prop: "defaultProgressBar",
      type: "boolean",
      def: "false",
      desc: "When enabled, every toast renders an animated countdown bar that pauses on mouse hover.",
    },
    {
      prop: "gap",
      type: "number",
      def: "12",
      desc: "Vertical pixel spacing between stacked notification cards in the viewport.",
    },
    {
      prop: "top / bottom / left / right",
      type: "number | string",
      def: "16px",
      desc: "Pixel or CSS dimension distance from screen edges to the viewport container.",
    },
  ];

  return (
    <section id="docs" style={{ padding: "40px 0 80px 0" }}>
      <div className="container-custom">
        {/* header */}
        <div style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--text-main)",
              marginBottom: "8px",
            }}
          >
            Documentation
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", maxWidth: "600px" }}>
            Comprehensive guide covering API methods, configuration options, viewport props, and async promise lifecycles.
          </p>
        </div>

        {/* navigation tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "24px",
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: "12px",
          }}
        >
          {[
            { id: "api", label: "API Methods" },
            { id: "options", label: "Toast Options" },
            { id: "props", label: "Toaster Props" },
            { id: "promise", label: "Promise Guide" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "api" | "options" | "props" | "promise")}
              className="toast-btn"
              style={{
                fontSize: "13px",
                padding: "8px 16px",
                background: activeTab === tab.id ? "#1c1917" : "#ffffff",
                color: activeTab === tab.id ? "#ffffff" : "var(--text-main)",
                borderColor: activeTab === tab.id ? "#1c1917" : "var(--border-subtle)",
                fontWeight: activeTab === tab.id ? 700 : 500,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* tab 1: api methods */}
        {activeTab === "api" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {apiMethods.map((m, idx) => (
              <div
                key={idx}
                className="clean-card"
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <code
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "var(--text-main)",
                        background: "var(--bg-subtle)",
                        padding: "3px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      {m.name}
                    </code>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background: m.badge === "core" ? "#f4f4f5" : m.badge === "variant" ? "#ecfdf5" : "#eff6ff",
                        color: m.badge === "core" ? "#52525b" : m.badge === "variant" ? "#059669" : "#2563eb",
                      }}
                    >
                      {m.badge}
                    </span>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
                    returns: {m.returns}
                  </span>
                </div>

                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {m.desc}
                </p>

                <CodeSnippet code={m.code} language="tsx" />
              </div>
            ))}
          </div>
        )}

        {/* tab 2: toast options */}
        {activeTab === "options" && (
          <div className="clean-card" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-subtle)" }}>
                  <th style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Option</th>
                  <th style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Type</th>
                  <th style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Default</th>
                  <th style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {toastOptions.map((opt, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, color: "#1c1917" }}>
                      {opt.option}
                    </td>
                    <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "#6b7280" }}>
                      {opt.type}
                    </td>
                    <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
                      {opt.def}
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, minWidth: "260px" }}>
                      {opt.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* tab 3: toaster props */}
        {activeTab === "props" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="clean-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "var(--text-main)" }}>
                Mounting the Toaster Viewport
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
                Mount the Toaster component once in your root layout. It renders an accessible viewport portal attached directly to the document body and listens to all toast events.
              </p>
              <CodeSnippet
                code={`import { Toaster } from "ztoast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          defaultPosition="top-right"
          defaultDuration={4000}
          defaultProgressBar={false}
          gap={12}
        />
        {children}
      </body>
    </html>
  );
}`}
                language="tsx"
                filename="app/layout.tsx"
              />
            </div>

            <div className="clean-card" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-subtle)" }}>
                    <th style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Prop</th>
                    <th style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Type</th>
                    <th style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Default</th>
                    <th style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {toasterProps.map((p, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, color: "#1c1917" }}>
                        {p.prop}
                      </td>
                      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "#6b7280" }}>
                        {p.type}
                      </td>
                      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
                        {p.def}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, minWidth: "260px" }}>
                        {p.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* tab 4: promise guide */}
        {activeTab === "promise" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="clean-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "var(--text-main)" }}>
                Promise Lifecycle Tracking
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
                Pass any promise to toast.promise. It displays an animated loading spinner while pending, and automatically transitions to a success or error notification when the promise settles.
              </p>
              <CodeSnippet
                code={`// example with dynamic messages based on resolved response data
const saveSettings = async () => {
  const response = await fetch("/api/settings", { method: "POST" });
  if (!response.ok) throw new Error("Failed to save");
  return response.json();
};

toast.promise(saveSettings(), {
  loading: "Saving your preferences...",
  success: (data) => \`Saved successfully! Updated at \${data.timestamp}\`,
  error: (err) => \`Failed: \${err.message}\`,
});`}
                language="tsx"
              />
            </div>

            <div className="clean-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "var(--text-main)" }}>
                In-Place Updates with Custom IDs
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
                If you are managing custom async flows, you can assign an id to update any toast in place without jarring layout jumps or duplicates.
              </p>
              <CodeSnippet
                code={`const syncId = "data-sync";

// step 1: trigger loading notification
toast.loading("Fetching latest changes...", { id: syncId });

try {
  await syncData();
  // step 2: replace with success notification in place
  toast.success("All data synchronized!", { id: syncId, duration: 4000 });
} catch (error) {
  // step 3: or replace with error notification
  toast.error("Sync failed. Check network.", { id: syncId });
}`}
                language="tsx"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
