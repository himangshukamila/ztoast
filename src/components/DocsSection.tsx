"use client";

import { useState } from "react";
import { CodeSnippet } from "./CodeSnippet";

// comprehensive documentation section with descriptive api guides, options, and recipes
export function DocsSection() {
  const [activeTab, setActiveTab] = useState<"api" | "options" | "props" | "promise">("api");

  const apiMethods = [
    {
      name: "toast(message, icon?, style?)",
      returns: "string",
      badge: "core",
      desc: "Every method takes the same three arguments: the message, an optional icon, and an optional object holding plain css plus a few controls. The icon and the style object can both be skipped.",
      code: `import { toast } from "ztoast";

// just a message
toast("Your changes have been saved.");

// message + icon
toast("Backup completed", "💾");

// message + icon + css
toast("Backup completed", "💾", {
  background: "#18181b",
  color: "#fafafa",
  borderRadius: 16,
  duration: 4000,
});

// the icon is optional, skip straight to the css
toast("Backup completed", { width: 320 });`,
    },
    {
      name: "toast.success(message, icon?, style?)",
      returns: "string",
      badge: "variant",
      desc: "Displays a positive success notification accompanied by an emerald checkmark badge, unless you pass your own icon.",
      code: `toast.success("Profile updated successfully");

toast.success("Profile updated", "🎉", { duration: 3500 });`,
    },
    {
      name: "toast.error(message, icon?, style?)",
      returns: "string",
      badge: "variant",
      desc: "Displays an assertive error alert with a coral red badge and accessible alert aria role.",
      code: `toast.error("Could not connect to database", {
  description: "Please check your network settings and try again.",
});`,
    },
    {
      name: "toast.loading(message, icon?, style?)",
      returns: "string",
      badge: "variant",
      desc: "Displays an ongoing action with a spinning loader icon. It stays on screen until you dismiss or replace it.",
      code: `const toastId = toast.loading("Deploying application...");

// dismiss later when task completes
toast.dismiss(toastId);`,
    },
    {
      name: "toast.promise(promise, messages, style?)",
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
      option: "any css property",
      type: "CSSProperties",
      def: "—",
      desc: "Everything React accepts in a style object works here: background, color, width, height, fontFamily, fontSize, padding, border, borderRadius, boxShadow, backdropFilter and so on. It is applied inline, so it always wins over the default card look.",
    },
    {
      option: "top / right / bottom / left",
      type: "number | string",
      def: "undefined",
      desc: "Drop the toast at exact coordinates instead of an anchor. Any side you pass overrides that half of the anchor, so { top: 300, left: 120 } places it there and { bottom: 40 } only changes the vertical edge.",
    },
    {
      option: "position",
      type: "ToastPosition",
      def: '"top-right"',
      desc: "One of the nine anchors: top-left, top-center, top-right, center-left, center, center-right, bottom-left, bottom-center, bottom-right.",
    },
    {
      option: "duration",
      type: "number",
      def: "4000",
      desc: "Time in milliseconds before the toast dismisses automatically. Set to Infinity to keep the notification until it is closed.",
    },
    {
      option: "icon",
      type: "ReactNode",
      def: "variant icon",
      desc: "Same as the optional second argument, an emoji or any JSX element replacing the default status badge. Handy when you skip the positional form.",
    },
    {
      option: "description",
      type: "ReactNode",
      def: "undefined",
      desc: "Secondary text or custom JSX rendered beneath the headline message.",
    },
    {
      option: "progressBar",
      type: "boolean",
      def: "false",
      desc: "Renders an animated countdown bar at the bottom edge. It pauses while the pointer is over the card.",
    },
    {
      option: "progressColor",
      type: "string",
      def: "accent color",
      desc: "Color of the countdown bar. Any css color value.",
    },
    {
      option: "closable",
      type: "boolean",
      def: "true",
      desc: "Whether to render the close button on the card.",
    },
    {
      option: "id",
      type: "string",
      def: "auto generated",
      desc: "Reusing an id replaces that toast in place instead of stacking a duplicate.",
    },
    {
      option: "onClose",
      type: "() => void",
      def: "undefined",
      desc: "Called when the notification starts its exit animation.",
    },
  ];

  const toasterProps = [
    {
      prop: "position",
      type: "ToastPosition",
      def: '"top-right"',
      desc: "Default anchor for every toast, overridable per toast. Nine anchors are available across the top, middle and bottom of the screen.",
    },
    {
      prop: "duration",
      type: "number",
      def: "4000",
      desc: "Default time in milliseconds before notifications dismiss automatically.",
    },
    {
      prop: "gap",
      type: "number",
      def: "12",
      desc: "Vertical pixel spacing between stacked notification cards.",
    },
    {
      prop: "offset",
      type: "number | string",
      def: "16",
      desc: "Distance between the anchored stack and the edge of the screen.",
    },
    {
      prop: "closable",
      type: "boolean",
      def: "true",
      desc: "Default for the close button, overridable per toast.",
    },
    {
      prop: "progressBar",
      type: "boolean",
      def: "false",
      desc: "Turns the countdown bar on for every toast, overridable per toast.",
    },
    {
      prop: "style",
      type: "CSSProperties",
      def: "undefined",
      desc: "Base css merged into every toast, so you can theme the whole app once. Per toast styles still win over it.",
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
                Mount the Toaster component once in your root layout. It renders an accessible portal attached directly to the document body, ships its own css, and listens to every toast call in your app.
              </p>
              <CodeSnippet
                code={`import { Toaster } from "ztoast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" duration={4000} />
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
