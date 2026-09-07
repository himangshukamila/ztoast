"use client";

import { useState } from "react";
import { toast, type ToastVariant, type ToastPosition } from "@/lib/ztoast";
import { CodeSnippet } from "./CodeSnippet";

interface GradientPreset {
  name: string;
  gradient: string;
  borderColor: string;
  progressColor: string;
  textColor: string;
}

const GRADIENT_PRESETS: GradientPreset[] = [
  {
    name: "Obsidian Dark",
    gradient: "",
    borderColor: "#27272a",
    progressColor: "#6366f1",
    textColor: "#f4f4f5",
  },
  {
    name: "Neon Violet",
    gradient: "linear-gradient(135deg, #1e1b4b, #312e81)",
    borderColor: "#6366f1",
    progressColor: "#818cf8",
    textColor: "#e0e7ff",
  },
  {
    name: "Midnight Azure",
    gradient: "linear-gradient(135deg, #082f49, #0c4a6e)",
    borderColor: "#0284c7",
    progressColor: "#38bdf8",
    textColor: "#f0f9ff",
  },
  {
    name: "Emerald Forest",
    gradient: "linear-gradient(135deg, #064e3b, #065f46)",
    borderColor: "#059669",
    progressColor: "#34d399",
    textColor: "#ecfdf5",
  },
  {
    name: "Sunset Flare",
    gradient: "linear-gradient(135deg, #4c0519, #881337)",
    borderColor: "#e11d48",
    progressColor: "#fb7185",
    textColor: "#fff1f2",
  },
];

// visual toast customizer allowing dynamic attribute editing and live test triggers
export function Playground() {
  const [message, setMessage] = useState("Custom toast notification");
  const [description, setDescription] = useState("Configure styles with real-time feedback.");
  const [variant, setVariant] = useState<ToastVariant>("default");
  const [position, setPosition] = useState<ToastPosition>("top-right");
  const [duration, setDuration] = useState(4000);
  const [isInfinite, setIsInfinite] = useState(false);
  const [progressBar, setProgressBar] = useState(true);
  const [closable, setClosable] = useState(true);
  const [borderRadius, setBorderRadius] = useState(14);
  const [selectedPreset, setSelectedPreset] = useState<GradientPreset>(GRADIENT_PRESETS[1]);
  const [customBg, setCustomBg] = useState(GRADIENT_PRESETS[1].gradient);
  const [customBorderColor, setCustomBorderColor] = useState(GRADIENT_PRESETS[1].borderColor);
  const [customProgressColor, setCustomProgressColor] = useState(GRADIENT_PRESETS[1].progressColor);
  const [customTextColor, setCustomTextColor] = useState(GRADIENT_PRESETS[1].textColor);

  const applyPreset = (preset: GradientPreset) => {
    setSelectedPreset(preset);
    setCustomBg(preset.gradient);
    setCustomBorderColor(preset.borderColor);
    setCustomProgressColor(preset.progressColor);
    setCustomTextColor(preset.textColor);
  };

  const handleFireToast = () => {
    toast.show(message, {
      variant,
      description: description || undefined,
      position,
      duration: isInfinite ? Infinity : duration,
      progressBar,
      closable,
      borderRadius,
      backgroundGradient: customBg || undefined,
      background: customBg ? undefined : "#18181b",
      borderColor: customBorderColor,
      textColor: customTextColor,
      progressColor: customProgressColor,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
    });
  };

  const generatedCode = `toast.${variant === "default" ? "show" : variant}("${message}", {
  description: "${description}",
  position: "${position}",
  duration: ${isInfinite ? "Infinity" : duration},
  progressBar: ${progressBar},
  closable: ${closable},
  borderRadius: ${borderRadius},
  ${customBg ? `backgroundGradient: "${customBg}",` : `background: "#18181b",`}
  borderColor: "${customBorderColor}",
  textColor: "${customTextColor}",
  progressColor: "${customProgressColor}",
});`;

  return (
    <section id="playground" style={{ padding: "80px 0", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="container-custom">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="badge-pill" style={{ marginBottom: "12px" }}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
            <span>Interactive Customizer</span>
          </div>
          <h2 style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Build your custom toast in real-time.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
            Tweak properties, color schemes, and progress bar options, then preview the result instantly.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* control panel */}
          <div className="glass-panel" style={{ padding: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
                borderBottom: "1px solid var(--border-subtle)",
                paddingBottom: "12px",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "16px", color: "#ffffff" }}>
                Customizer Controls
              </span>
              <button
                type="button"
                onClick={() => applyPreset(GRADIENT_PRESETS[0])}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  cursor: "pointer",
                }}
              >
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span>Reset</span>
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* message input */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Toast Title
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-subtle)",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* description input */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Description (optional)
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-subtle)",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* variant & position row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Variant
                  </label>
                  <select
                    value={variant}
                    onChange={(e) => setVariant(e.target.value as ToastVariant)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="default">Default</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="loading">Loading</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Position
                  </label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value as ToastPosition)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-subtle)",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="top-left">top-left</option>
                    <option value="top-center">top-center</option>
                    <option value="top-right">top-right</option>
                    <option value="bottom-left">bottom-left</option>
                    <option value="bottom-center">bottom-center</option>
                    <option value="bottom-right">bottom-right</option>
                  </select>
                </div>
              </div>

              {/* duration slider */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)" }}>
                    Duration: {isInfinite ? "Infinity" : `${duration}ms`}
                  </label>
                  <label style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={isInfinite}
                      onChange={(e) => setIsInfinite(e.target.checked)}
                    />
                    <span>Persist forever</span>
                  </label>
                </div>
                {!isInfinite && (
                  <input
                    type="range"
                    min={1000}
                    max={10000}
                    step={500}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#6366f1" }}
                  />
                )}
              </div>

              {/* gradient theme presets */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>
                  Color & Theme Preset
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {GRADIENT_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 500,
                        background: selectedPreset.name === preset.name ? "rgba(99, 102, 241, 0.25)" : "rgba(255, 255, 255, 0.04)",
                        border: selectedPreset.name === preset.name ? "1px solid #6366f1" : "1px solid var(--border-subtle)",
                        color: selectedPreset.name === preset.name ? "#ffffff" : "var(--text-secondary)",
                        cursor: "pointer",
                      }}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* toggles row */}
              <div style={{ display: "flex", gap: "20px", paddingTop: "6px" }}>
                <label style={{ fontSize: "13px", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={progressBar}
                    onChange={(e) => setProgressBar(e.target.checked)}
                  />
                  <span>Show Progress Bar</span>
                </label>

                <label style={{ fontSize: "13px", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={closable}
                    onChange={(e) => setClosable(e.target.checked)}
                  />
                  <span>Show Close Button</span>
                </label>
              </div>

              {/* border radius slider */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Corner Radius: {borderRadius}px
                </label>
                <input
                  type="range"
                  min={0}
                  max={28}
                  step={2}
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#6366f1" }}
                />
              </div>

              {/* fire button */}
              <button
                type="button"
                onClick={handleFireToast}
                className="btn-primary"
                style={{ width: "100%", padding: "12px", marginTop: "10px" }}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
                <span>Test Custom Toast Live</span>
              </button>
            </div>
          </div>

          {/* generated code preview */}
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "12px", paddingLeft: "4px" }}>
              LIVE GENERATED TSX CODE:
            </div>
            <CodeSnippet code={generatedCode} language="tsx" filename="customToast.tsx" />

            <div
              className="glass-panel"
              style={{
                marginTop: "20px",
                padding: "20px",
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              <div style={{ fontWeight: 600, color: "#ffffff", marginBottom: "6px" }}>
                Sanitization & Safety Guarantee
              </div>
              <p style={{ margin: 0 }}>
                Any string provided to <code>backgroundGradient</code>, <code>borderColor</code>, or <code>progressColor</code> is passed through the allowlist sanitizer before entering the CSSOM. Dangerous sequences (such as <code>expression()</code> or script injection) are dropped silently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
