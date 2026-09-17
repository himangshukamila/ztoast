"use client";

import { useState } from "react";
import { CodeSnippet } from "./CodeSnippet";

type Tab = "api" | "config" | "motion" | "toaster" | "behaviour";

interface Row {
  name: string;
  type: string;
  def: string;
  desc: string;
}

// api reference, rebuilt from the exported types
export function DocsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("api");

  const apiMethods = [
    {
      name: "toast.show(message, icon?, config?)",
      returns: "string | number",
      badge: "core",
      desc: "The neutral variant, with no built-in icon. Every creator has this same signature: only the message is required, and the second argument can be either the icon or the config.",
      code: `import { toast } from "ztoast";

toast.show("Your changes have been saved.");
toast.show("Saved", "💾");
toast.show("Saved", { width: 360 });
toast.show("Saved", "💾", { width: 360 });`,
    },
    {
      name: "toast.success(message, icon?, config?)",
      returns: "string | number",
      badge: "variant",
      desc: "A success toast with the green check icon, replaced by anything you pass as the icon argument.",
      code: `toast.success("Profile updated successfully");

toast.success("Profile updated", "🎉", { duration: 3500 });`,
    },
    {
      name: "toast.error(message, icon?, config?)",
      returns: "string | number",
      badge: "variant",
      desc: 'Rendered as role="alert" with aria-live="assertive", so screen readers announce it immediately.',
      code: `toast.error("Could not connect to database", {
  description: "Check your network settings and try again.",
});`,
    },
    {
      name: "toast.info(message, icon?, config?)",
      returns: "string | number",
      badge: "variant",
      desc: "An informational toast.",
      code: `toast.info("A new version is available");`,
    },
    {
      name: "toast.warning(message, icon?, config?)",
      returns: "string | number",
      badge: "variant",
      desc: "A warning toast.",
      code: `toast.warning("Approaching your storage limit");`,
    },
    {
      name: "toast.warn(message, icon?, config?)",
      returns: "string | number",
      badge: "alias",
      desc: "An alias of toast.warning. Identical behaviour, shorter to type.",
      code: `toast.warn("Login failed");`,
    },
    {
      name: "toast.loading(message, icon?, config?)",
      returns: "string | number",
      badge: "variant",
      desc: "Defaults to duration: Infinity, so it stays until you dismiss it or replace it by reusing its id. Pass a duration to override that.",
      code: `const id = toast.loading("Deploying application...");

// later
toast.dismiss(id);`,
    },
    {
      name: "toast.promise(promise, messages, config?)",
      returns: "Promise<T>",
      badge: "async",
      desc: "Tracks a promise through loading, resolved and rejected in a single toast. It returns the original promise, so you can still await it. success and error accept a node or a function of the resolved value / error.",
      code: `const data = await toast.promise(uploadFile(file), {
  loading: "Uploading file...",
  success: (data) => \`Uploaded \${data.filename}\`,
  error: (err) => \`Failed: \${(err as Error).message}\`,
});`,
    },
    {
      name: "toast.dismiss(id?)",
      returns: "void",
      badge: "control",
      desc: "Plays the exit animation, then removes the toast. Called with no argument it dismisses every toast.",
      code: `toast.dismiss(myToastId);

// everything
toast.dismiss();`,
    },
    {
      name: "toast.dismissAll()",
      returns: "void",
      badge: "control",
      desc: "The same as calling toast.dismiss() with no argument.",
      code: `toast.dismissAll();`,
    },
    {
      name: "useToast()",
      returns: "{ toasts, ...methods }",
      badge: "hook",
      desc: "Optional hook for components that want to read the live toast list. It returns the imperative api alongside it, works anywhere in the tree, and never throws — there is no provider to be inside of.",
      code: `import { useToast } from "ztoast";

function Counter() {
  const { toasts, success } = useToast();

  return (
    <button onClick={() => success("One more")}>
      {toasts.length} on screen
    </button>
  );
}`,
    },
  ];

  const configRows: Row[] = [
    { name: "id", type: "string | number", def: "auto", desc: "Reuse an id to replace a toast in place: it keeps its slot in the stack and restarts the countdown. Per toast only." },
    { name: "duration", type: "number", def: "4000", desc: "Milliseconds before auto dismiss. Infinity, 0, NaN or a negative number all mean keep it until dismissed." },
    { name: "description", type: "ReactNode", def: "—", desc: "A second line under the message. Per toast only." },
    { name: "icon", type: "ToastIcon", def: "variant icon", desc: "An element, a plain function component, a string or number, or false to remove the icon. Same as the second argument — see the note above it." },
    { name: "closable", type: "boolean", def: "true", desc: "Show the ✕ dismiss button." },
    { name: "progress", type: "boolean", def: "true", desc: "Show the countdown bar. A toast with a non-finite duration never shows one, since there is nothing to count down." },
    { name: "pauseOnHover", type: "boolean", def: "true", desc: "Freeze the bar and the timer while the toast is hovered or keyboard focused." },
    { name: "onClose", type: "() => void", def: "—", desc: "Fires exactly once, when the toast starts leaving. Per toast only." },
    { name: "position", type: "ToastPosition", def: '"top-right"', desc: "A named spot, an edge offset string, or a coordinate object. See the Positioning section." },
    { name: "gap", type: "number", def: "14", desc: "Pixels between stacked toasts." },
    { name: "stack", type: '"down" | "up"', def: "from position", desc: "Overrides which way a stack grows. New toasts always appear away from the anchor, so nothing already on screen moves." },
    { name: "zIndex", type: "number", def: "2147483000", desc: "Stacking order of the container." },
    { name: "textColor / color", type: "string", def: "theme text", desc: "Aliases of each other." },
    { name: "bgColor / background", type: "string", def: "theme surface", desc: "Aliases. Takes anything CSS background takes: a colour, a gradient, or url(...)." },
    { name: "width", type: "number | string", def: "fits content", desc: "Without it the card sits between 240px and min(92vw, 440px); setting it replaces that range exactly." },
    { name: "height", type: "number | string", def: "fits content", desc: "Fixed height instead of hugging the content." },
    { name: "font", type: "string", def: "system stack", desc: "Font family." },
    { name: "fontSize", type: "number | string", def: "14", desc: "Numbers mean pixels." },
    { name: "fontWeight", type: "number | string", def: "600", desc: "Applies to the message line." },
    { name: "radius", type: "number | string", def: "14", desc: "Corner radius." },
    { name: "padding", type: "number | string", def: '"13px 15px"', desc: "Inner spacing." },
    { name: "border", type: "string", def: "theme hairline", desc: "Border shorthand." },
    { name: "shadow", type: "string", def: "theme shadow", desc: "Box shadow." },
    { name: "progressColor", type: "string", def: "variant accent", desc: "Colour of the countdown bar." },
    { name: "iconColor", type: "string", def: "variant accent", desc: "Colour of the built-in icons only." },
    { name: "theme", type: '"dark" | "light"', def: '"dark"', desc: "The palette used for anything you do not set explicitly." },
    { name: "style", type: "CSSProperties", def: "—", desc: "Escape hatch: raw css merged last, for anything without its own option." },
    { name: "motion", type: "ToastMotion", def: "see Motion", desc: "Every timing knob of the enter and exit animation." },
  ];

  const motionRows: Row[] = [
    { name: "enter", type: "number", def: "520", desc: "Enter duration in ms." },
    { name: "exit", type: "number", def: "340", desc: "Exit duration in ms." },
    { name: "easing", type: "string", def: "cubic-bezier(0.16, 1, 0.3, 1)", desc: "Enter easing." },
    { name: "exitEasing", type: "string", def: "cubic-bezier(0.4, 0, 0.2, 1)", desc: "Exit easing." },
    { name: "slide", type: "number", def: "22", desc: "Pixels travelled inwards on enter." },
    { name: "scale", type: "number", def: "0.94", desc: "Starting scale." },
    { name: "blur", type: "number", def: "2", desc: "Starting blur in px." },
    { name: "from", type: '"auto" | "top" | "bottom" | "left" | "right" | "none"', def: '"auto"', desc: "Slide direction. auto follows the position." },
  ];

  const toasterRows: Row[] = [
    { name: "max", type: "number", def: "unlimited", desc: "How many toasts to show per position at once. Extras queue and appear as room frees up. This prop is unique to <Toaster />." },
    { name: "…every config option", type: "ToastConfig", def: "see Config", desc: "Everything except id, description and onClose can be set here as the default for all toasts. A toast's own value always wins." },
  ];

  const tabs: { id: Tab; label: string }[] = [
    { id: "api", label: "Methods" },
    { id: "config", label: "Config" },
    { id: "motion", label: "Motion" },
    { id: "toaster", label: "<Toaster />" },
    { id: "behaviour", label: "Behaviour" },
  ];

  const renderTable = (rows: Row[], firstHeader: string) => (
    <div className="clean-card" style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-subtle)" }}>
            {[firstHeader, "Type", "Default", "Description"].map((header) => (
              <th
                key={header}
                style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, color: "#1c1917", whiteSpace: "nowrap" }}>
                {row.name}
              </td>
              <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "#6b7280" }}>
                {row.type}
              </td>
              <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                {row.def}
              </td>
              <td style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, minWidth: "260px" }}>
                {row.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
            API reference
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", maxWidth: "640px" }}>
            Every method, every config option and every default. Numbers mean pixels
            everywhere, and colours accept hex, rgb(), hsl(), oklch(), rgb(0 0 0 / 50%) and
            css variables.
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
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="toast-btn"
              style={{
                fontSize: "13px",
                padding: "8px 16px",
                background: activeTab === tab.id ? "#1c1917" : "#ffffff",
                color: activeTab === tab.id ? "#ffffff" : "var(--text-main)",
                borderColor: activeTab === tab.id ? "#1c1917" : "var(--border-subtle)",
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontFamily: tab.id === "toaster" ? "var(--font-mono)" : undefined,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* methods */}
        {activeTab === "api" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {apiMethods.map((method) => (
              <div
                key={method.name}
                className="clean-card"
                style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
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
                      {method.name}
                    </code>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background:
                          method.badge === "core"
                            ? "#f4f4f5"
                            : method.badge === "variant"
                            ? "#ecfdf5"
                            : method.badge === "alias"
                            ? "#fef3c7"
                            : method.badge === "hook"
                            ? "#f5f3ff"
                            : "#eff6ff",
                        color:
                          method.badge === "core"
                            ? "#52525b"
                            : method.badge === "variant"
                            ? "#059669"
                            : method.badge === "alias"
                            ? "#b45309"
                            : method.badge === "hook"
                            ? "#7c3aed"
                            : "#2563eb",
                      }}
                    >
                      {method.badge}
                    </span>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
                    returns: {method.returns}
                  </span>
                </div>

                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {method.desc}
                </p>

                <CodeSnippet code={method.code} language="tsx" />
              </div>
            ))}
          </div>
        )}

        {/* config */}
        {activeTab === "config" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="clean-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "var(--text-main)" }}>
                The third argument
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
                Every option is optional. Everything except <code>id</code>,{" "}
                <code>description</code> and <code>onClose</code> can also be passed to{" "}
                <code>&lt;Toaster /&gt;</code> as a default for all toasts, and a toast&apos;s own
                value always wins.
              </p>
              <CodeSnippet
                code={`toast.success("Project saved", "💾", {
  description: "Every option here is optional.",
  duration: 6000,
  position: "bottom-center",
  bgColor: "#052e16",
  textColor: "#dcfce7",
  width: 360,
  radius: 18,
});`}
                language="tsx"
              />
            </div>

            <div className="clean-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "var(--text-main)" }}>
                The icon argument
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
                A string, a number, an element, or a plain function component — which is
                called for you with <code>{"{ size: 18, color }"}</code> so it picks up the
                variant colour. Pass <code>false</code> to remove the icon entirely, or leave
                the argument out to keep the built-in variant icon.
              </p>
              <CodeSnippet
                code={`toast.success("Saved", "🎉");                    // emoji or any string
toast.success("Saved", <Check size={18} />);     // a rendered element
toast.success("Saved", MyIcon);                  // called with { size, color }
toast.success("Saved", false);                   // no icon at all
toast.success("Saved");                          // the built-in variant icon`}
                language="tsx"
              />
              <div
                style={{
                  marginTop: "14px",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  background: "#fffbeb",
                  border: "1px solid #fcd34d",
                  fontSize: "13px",
                  color: "#78350f",
                  lineHeight: 1.55,
                }}
              >
                <strong>Watch out:</strong> only a <em>plain function</em> component is called
                for you. Icon sets that wrap their components in{" "}
                <code>forwardRef</code> — <code>lucide-react</code> and{" "}
                <code>@heroicons/react</code> among them — are objects at runtime, not
                functions, so pass those as elements:{" "}
                <code>&lt;Check size={18} /&gt;</code>, not <code>Check</code>. TypeScript
                accepts both, so this one only shows up when it renders.
              </div>
            </div>

            {renderTable(configRows, "Option")}
          </div>
        )}

        {/* motion */}
        {activeTab === "motion" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="clean-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "var(--text-main)" }}>
                Motion
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
                The enter animation is a fade, slide, unblur and scale on a decelerating curve.
                On exit the toast fades out and the stack&apos;s height collapses just behind it, so
                nothing jumps. When the operating system asks for reduced motion, travel, scale
                and blur are dropped automatically.
              </p>
              <CodeSnippet
                code={`toast.show("Slow, from the left", {
  motion: { enter: 900, exit: 500, slide: 40, scale: 0.8, blur: 6, from: "left" },
});`}
                language="tsx"
              />
            </div>
            {renderTable(motionRows, "Key")}
          </div>
        )}

        {/* toaster */}
        {activeTab === "toaster" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="clean-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "var(--text-main)" }}>
                Mounting the Toaster
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
                Mount it once, anywhere in the tree. There is no provider to wrap your app in
                and no stylesheet to import. Props are defaults for every toast, so you can set
                your house style in one place.
              </p>
              <CodeSnippet
                code={`import { Toaster } from "ztoast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}`}
                language="tsx"
                filename="app/layout.tsx"
              />
              <div style={{ marginTop: "16px" }}>
                <CodeSnippet
                  code={`// or set your house defaults once
<Toaster
  position="bottom-center"
  theme="light"
  duration={6000}
  max={3}
  radius={18}
/>`}
                  language="tsx"
                />
              </div>
            </div>
            {renderTable(toasterRows, "Prop")}
          </div>
        )}

        {/* behaviour */}
        {activeTab === "behaviour" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              {
                title: "Fire before the Toaster mounts",
                body: "A toast fired before <Toaster /> has mounted is queued and appears as soon as it does. Nothing is dropped.",
                code: `// module scope, long before React renders
toast.info("Session restored");`,
              },
              {
                title: "Works outside React",
                body: "toast.* is not a hook. Call it from api clients, fetch interceptors, stores, or anywhere else.",
                code: `// api/client.ts
import { toast } from "ztoast";

export async function request(url: string) {
  const res = await fetch(url);
  if (!res.ok) toast.error(\`Request failed: \${res.status}\`);
  return res;
}`,
              },
              {
                title: "SSR safe",
                body: "The build carries a \"use client\" banner, and <Toaster /> renders nothing on the server or on the first client render, so there is no hydration mismatch in the Next.js App Router.",
                code: `// app/layout.tsx — no dynamic import, no ssr: false needed
<Toaster />`,
              },
              {
                title: "Replace a toast in place",
                body: "Reuse an id and the toast keeps its slot in the stack while the content and countdown restart.",
                code: `const id = "sync";

toast.loading("Fetching latest changes...", { id });
await syncData();
toast.success("All data synchronized", { id });`,
              },
              {
                title: "Unsafe style values are dropped",
                body: "Style values are validated before they reach the DOM. A value containing ; { } a backslash, a css comment, javascript:, or a url() that is not https, relative or data:image is dropped and the default is used instead.",
                code: `// the bgColor is ignored, the theme default is used
toast.show("Nice try", { bgColor: "red; position: fixed" });`,
              },
              {
                title: "Unparseable positions fall back",
                body: "A position string that cannot be parsed falls back to top-right and logs a development-only console warning.",
                code: `toast.show("Still visible", { position: "diagonally-ish" });
// → renders at top-right, warns in development`,
              },
            ].map((item) => (
              <div key={item.title} className="clean-card" style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "var(--text-main)" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
                  {item.body}
                </p>
                <CodeSnippet code={item.code} language="tsx" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
