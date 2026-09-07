"use client";

import { useState } from "react";
import { toast, type ToastPosition } from "@/lib/ztoast";
import { CodeSnippet } from "./CodeSnippet";

// position switching section matching the interactive position matrix in react-hot-toast
export function PositionDemo() {
  const [position, setPosition] = useState<ToastPosition>("top-center");

  const positions: ToastPosition[] = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  const handleSelectPosition = (pos: ToastPosition) => {
    setPosition(pos);
    toast.show(`Toast at ${pos}`, {
      position: pos,
      duration: 3000,
      description: "Anchored to this viewport coordinate.",
    });
  };

  const code = `<Toaster
  position="${position}"
/>`;

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

          {/* 3x2 grid of buttons on right */}
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
            {positions.map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => handleSelectPosition(pos)}
                className="toast-btn"
                style={{
                  fontSize: "12px",
                  padding: "12px 6px",
                  background: position === pos ? "#1c1917" : "#ffffff",
                  color: position === pos ? "#ffffff" : "var(--text-main)",
                  borderColor: position === pos ? "#1c1917" : "var(--border-subtle)",
                  fontWeight: position === pos ? 700 : 500,
                  boxShadow: position === pos ? "0 2px 6px rgba(0,0,0,0.15)" : "var(--button-shadow)",
                }}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
