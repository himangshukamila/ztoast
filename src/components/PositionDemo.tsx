"use client";

import { useState } from "react";
import { toast, type ToastPosition } from "@/lib/ztoast";
import { CodeSnippet } from "./CodeSnippet";

// position switching section showing the nine anchors plus free coordinates
export function PositionDemo() {
  const [position, setPosition] = useState<ToastPosition>("top-center");
  const [custom, setCustom] = useState(false);

  const positions: ToastPosition[] = [
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

  const handleSelectPosition = (pos: ToastPosition) => {
    setPosition(pos);
    setCustom(false);
    toast(`Toast at ${pos}`, {
      position: pos,
      duration: 3000,
      description: "Anchored to this viewport coordinate.",
    });
  };

  const handleCustomPosition = () => {
    setCustom(true);
    toast("Exactly where I asked", "📍", {
      top: 300,
      left: 120,
      duration: 3000,
      description: "top: 300, left: 120",
    });
  };

  const code = custom
    ? `// or forget the anchors and pass coordinates
toast("Exactly where I asked", "📍", {
  top: 300,
  left: 120,
});`
    : `// one default for the whole app
<Toaster position="${position}" />

// or per toast
toast("Over here", { position: "${position}" });`;

  return (
    <section id="positions" style={{ padding: "40px 0 60px 0" }}>
      <div className="container-custom">
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
            color: "var(--text-main)",
          }}
        >
          Change Position
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
            alignItems: "stretch",
          }}
        >
          {/* code on left */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CodeSnippet code={code} language="jsx" filename="layout.tsx" />
          </div>

          {/* 3x3 grid of anchors on right */}
          <div
            className="clean-card"
            style={{
              padding: "16px",
              background: "var(--bg-subtle)",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              alignContent: "center",
            }}
          >
            {positions.map((pos) => {
              const active = !custom && position === pos;
              return (
                <button
                  key={pos}
                  type="button"
                  onClick={() => handleSelectPosition(pos)}
                  className="toast-btn"
                  style={{
                    fontSize: "12px",
                    padding: "12px 6px",
                    background: active ? "#1c1917" : "#ffffff",
                    color: active ? "#ffffff" : "var(--text-main)",
                    borderColor: active ? "#1c1917" : "var(--border-subtle)",
                    fontWeight: active ? 700 : 500,
                    boxShadow: active ? "0 2px 6px rgba(0,0,0,0.15)" : "var(--button-shadow)",
                  }}
                >
                  {pos}
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleCustomPosition}
              className="toast-btn"
              style={{
                gridColumn: "span 3",
                fontSize: "12px",
                padding: "12px 6px",
                background: custom ? "#1c1917" : "#ffffff",
                color: custom ? "#ffffff" : "var(--text-main)",
                borderColor: custom ? "#1c1917" : "var(--border-subtle)",
                fontWeight: custom ? 700 : 500,
                boxShadow: custom ? "0 2px 6px rgba(0,0,0,0.15)" : "var(--button-shadow)",
              }}
            >
              📍 custom coordinates
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
