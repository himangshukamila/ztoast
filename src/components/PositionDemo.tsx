"use client";

import { useState } from "react";
import { toast, type NamedPosition } from "ztoast";
import { CodeSnippet } from "./CodeSnippet";

const NAMED: NamedPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const EDGE_PRESETS = [
  "top-10vh",
  "left-10vw",
  "bottom-24px right-5%",
  "top-2rem left-calc(50% - 120px)",
  "top-40",
  "bottom",
];

type Mode = "named" | "edge" | "free";

// positioning section, the three forms a position can take
export function PositionDemo() {
  const [mode, setMode] = useState<Mode>("named");
  const [named, setNamed] = useState<NamedPosition>("top-center");
  const [edge, setEdge] = useState("top-10vh");
  const [anchor, setAnchor] = useState<NamedPosition>("center");
  const [point, setPoint] = useState({ x: 62, y: 80 });

  const fireNamed = (position: NamedPosition) => {
    setNamed(position);
    toast.show(position, "🧭", { position, duration: 3000 });
  };

  const fireEdge = (value: string) => {
    setEdge(value);
    toast.show(value, "📏", { position: value, duration: 3000 });
  };

  // maps a click on the diagram onto the same percentage of the real screen
  const fireAtPoint = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.round(((event.clientX - rect.left) / rect.width) * 1000) / 10;
    const y = Math.round(((event.clientY - rect.top) / rect.height) * 1000) / 10;
    setPoint({ x, y });
    toast.show(`x: ${x}% · y: ${y}%`, "📍", {
      position: { x: `${x}%`, y: `${y}%`, anchor },
      duration: 3000,
    });
  };

  const code =
    mode === "named"
      ? `// 1. one of the nine named spots, each inset 16px from the edges it touches
toast.show("Over here", { position: "${named}" });

// or set the default for every toast
<Toaster position="${named}" />`
      : mode === "edge"
      ? `// 2. a distance from one or both edges, one token per axis
toast.show("Over here", { position: "${edge}" });

// an axis you do not mention is centred:
//   "top-10vh"              10vh down, horizontally centred
//   "bottom-24px right-5%"  both edges
//   "top-40"                bare number means px
//   "bottom"                bare edge means the default 16px inset`
      : `// 3. a free coordinate, anywhere on screen
toast.show("Over here", {
  position: { x: "${point.x}%", y: "${point.y}%", anchor: "${anchor}" },
});

// anchor names which point of the toast lands on the coordinate and
// defaults to "center", so { x: "50%", y: "50%" } is the dead centre`;

  return (
    <section id="positions" style={{ padding: "40px 0 60px 0" }}>
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
          Positioning
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "15px",
            maxWidth: "640px",
            marginBottom: "20px",
          }}
        >
          A position can be a named spot, a distance from the edges, or a coordinate.
          Toasts that resolve to the same spot share a stack; different spots stack
          independently. Nothing is clamped to the viewport, so a coordinate can hang a
          toast off the edge on purpose.
        </p>

        {/* form switcher */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "20px",
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: "12px",
          }}
        >
          {[
            { id: "named", label: "1. Named spots" },
            { id: "edge", label: "2. Edge offsets" },
            { id: "free", label: "3. Free coordinates" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id as Mode)}
              className="toast-btn"
              style={{
                fontSize: "13px",
                padding: "8px 16px",
                background: mode === tab.id ? "#1c1917" : "#ffffff",
                color: mode === tab.id ? "#ffffff" : "var(--text-main)",
                borderColor: mode === tab.id ? "#1c1917" : "var(--border-subtle)",
                fontWeight: mode === tab.id ? 700 : 500,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
            alignItems: "stretch",
          }}
        >
          {/* code on the left */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CodeSnippet code={code} language="tsx" filename="position.tsx" />
          </div>

          {/* controls on the right */}
          <div className="clean-card" style={{ padding: "16px", background: "var(--bg-subtle)" }}>
            {mode === "named" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                }}
              >
                {NAMED.map((position) => {
                  const active = named === position;
                  return (
                    <button
                      key={position}
                      type="button"
                      onClick={() => fireNamed(position)}
                      className="toast-btn"
                      style={{
                        fontSize: "12px",
                        padding: "12px 6px",
                        background: active ? "#1c1917" : "#ffffff",
                        color: active ? "#ffffff" : "var(--text-main)",
                        borderColor: active ? "#1c1917" : "var(--border-subtle)",
                        fontWeight: active ? 700 : 500,
                      }}
                    >
                      {position}
                    </button>
                  );
                })}
              </div>
            )}

            {mode === "edge" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {EDGE_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => fireEdge(preset)}
                      className="toast-btn"
                      style={{
                        fontSize: "12px",
                        padding: "10px 8px",
                        fontFamily: "var(--font-mono)",
                        background: edge === preset ? "#1c1917" : "#ffffff",
                        color: edge === preset ? "#ffffff" : "var(--text-main)",
                        borderColor: edge === preset ? "#1c1917" : "var(--border-subtle)",
                      }}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
                  Or type your own
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    value={edge}
                    onChange={(event) => setEdge(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") fireEdge(edge);
                    }}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-subtle)",
                      background: "#ffffff",
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      color: "var(--text-main)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fireEdge(edge)}
                    className="toast-btn-primary"
                    style={{ fontSize: "13px", padding: "10px 16px" }}
                  >
                    Fire
                  </button>
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  Units: px % em rem ex ch vh vw vmin vmax dvh dvw svh svw lvh lvw cm mm in pt
                  pc q, plus calc(). Anything unparseable falls back to top-right and warns in
                  development.
                </p>
              </div>
            )}

            {mode === "free" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
                  Click anywhere on the screen below
                </div>

                {/* clickable screen diagram */}
                <div
                  onClick={fireAtPoint}
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 10",
                    borderRadius: "10px",
                    border: "1px solid var(--border-strong)",
                    background:
                      "linear-gradient(to right, rgba(28,25,23,0.06) 1px, transparent 1px) 0 0 / 10% 100%, linear-gradient(to bottom, rgba(28,25,23,0.06) 1px, transparent 1px) 0 0 / 100% 10%, #ffffff",
                    cursor: "crosshair",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      width: "12px",
                      height: "12px",
                      marginLeft: "-6px",
                      marginTop: "-6px",
                      borderRadius: "50%",
                      background: "#1c1917",
                      boxShadow: "0 0 0 4px rgba(28,25,23,0.15)",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: "8px",
                      bottom: "6px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--text-muted)",
                    }}
                  >
                    x: {point.x}% · y: {point.y}%
                  </span>
                </div>

                <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)" }}>
                  anchor — which point of the toast lands there
                </label>
                <select
                  value={anchor}
                  onChange={(event) => setAnchor(event.target.value as NamedPosition)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-subtle)",
                    background: "#ffffff",
                    fontSize: "13px",
                    color: "var(--text-main)",
                  }}
                >
                  {NAMED.map((value) => (
                    <option key={value} value={value}>
                      {value}
                      {value === "center" ? " (default)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
