"use client";

import { useMemo, useState } from "react";
import { toast, type NamedPosition, type ToastConfig } from "ztoast";
import { CodeSnippet } from "./CodeSnippet";

type Creator = "show" | "success" | "error" | "info" | "warning" | "warn" | "loading";
type PositionMode = "default" | "named" | "edge" | "free";

const CREATORS: Creator[] = [
  "show",
  "success",
  "error",
  "info",
  "warning",
  "warn",
  "loading",
];

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

const FONTS = [
  { label: "System (default)", value: "" },
  { label: "Monospace", value: "ui-monospace, SFMono-Regular, Menlo, monospace" },
  { label: "Serif", value: "Georgia, 'Times New Roman', serif" },
  { label: "Inherit from page", value: "inherit" },
];

// library defaults, anything equal to these is left out of the generated call
const DEFAULTS = {
  duration: 4000,
  closable: true,
  progress: true,
  pauseOnHover: true,
  theme: "dark" as const,
  radius: 14,
  fontSize: 14,
  motion: { enter: 520, exit: 340, slide: 22, scale: 0.94, blur: 2, from: "auto" as const },
};

// renders a value as javascript source
function literal(value: unknown): string {
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "Infinity";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean") return String(value);
  if (value && typeof value === "object") {
    const inner = Object.entries(value)
      .map(([key, val]) => `${key}: ${literal(val)}`)
      .join(", ");
    return `{ ${inner} }`;
  }
  return String(value);
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--text-secondary)",
  marginBottom: "6px",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 11px",
  borderRadius: "8px",
  border: "1px solid var(--border-subtle)",
  background: "#ffffff",
  fontSize: "13px",
  color: "var(--text-main)",
};

const checkboxRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--text-main)",
  cursor: "pointer",
};

// interactive customiser, every control maps to a real config option
export function Playground() {
  const [creator, setCreator] = useState<Creator>("success");
  const [message, setMessage] = useState("Project saved");
  const [description, setDescription] = useState("");
  const [showIcon, setShowIcon] = useState(true);
  const [icon, setIcon] = useState("💾");

  const [duration, setDuration] = useState(4000);
  const [persist, setPersist] = useState(false);
  const [progress, setProgress] = useState(true);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [closable, setClosable] = useState(true);

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [useColors, setUseColors] = useState(false);
  const [bgColor, setBgColor] = useState("#052e16");
  const [textColor, setTextColor] = useState("#dcfce7");
  const [useWidth, setUseWidth] = useState(false);
  const [width, setWidth] = useState(360);
  const [radius, setRadius] = useState(14);
  const [font, setFont] = useState("");

  const [positionMode, setPositionMode] = useState<PositionMode>("default");
  const [named, setNamed] = useState<NamedPosition>("top-right");
  const [edge, setEdge] = useState("top-10vh");
  const [freeX, setFreeX] = useState("62%");
  const [freeY, setFreeY] = useState("80%");
  const [anchor, setAnchor] = useState<NamedPosition>("center");

  const [useMotion, setUseMotion] = useState(false);
  const [enter, setEnter] = useState(520);
  const [exit, setExit] = useState(340);
  const [slide, setSlide] = useState(22);
  const [scale, setScale] = useState(0.94);
  const [blur, setBlur] = useState(2);
  const [from, setFrom] = useState<"auto" | "top" | "bottom" | "left" | "right" | "none">("auto");

  // only the options that differ from the library defaults end up in the call
  const config = useMemo(() => {
    const next: ToastConfig = {};

    if (description.trim()) next.description = description.trim();
    if (persist) next.duration = Infinity;
    else if (duration !== DEFAULTS.duration) next.duration = duration;
    if (progress !== DEFAULTS.progress) next.progress = progress;
    if (pauseOnHover !== DEFAULTS.pauseOnHover) next.pauseOnHover = pauseOnHover;
    if (closable !== DEFAULTS.closable) next.closable = closable;
    if (theme !== DEFAULTS.theme) next.theme = theme;

    if (useColors) {
      next.bgColor = bgColor;
      next.textColor = textColor;
    }
    if (useWidth) next.width = width;
    if (radius !== DEFAULTS.radius) next.radius = radius;
    if (font) next.font = font;

    if (positionMode === "named") next.position = named;
    else if (positionMode === "edge" && edge.trim()) next.position = edge.trim();
    else if (positionMode === "free") {
      next.position = { x: freeX, y: freeY, anchor };
    }

    if (useMotion) {
      const motion: NonNullable<ToastConfig["motion"]> = {};
      if (enter !== DEFAULTS.motion.enter) motion.enter = enter;
      if (exit !== DEFAULTS.motion.exit) motion.exit = exit;
      if (slide !== DEFAULTS.motion.slide) motion.slide = slide;
      if (scale !== DEFAULTS.motion.scale) motion.scale = scale;
      if (blur !== DEFAULTS.motion.blur) motion.blur = blur;
      if (from !== DEFAULTS.motion.from) motion.from = from;
      if (Object.keys(motion).length > 0) next.motion = motion;
    }

    return next;
  }, [
    description,
    persist,
    duration,
    progress,
    pauseOnHover,
    closable,
    theme,
    useColors,
    bgColor,
    textColor,
    useWidth,
    width,
    radius,
    font,
    positionMode,
    named,
    edge,
    freeX,
    freeY,
    anchor,
    useMotion,
    enter,
    exit,
    slide,
    scale,
    blur,
    from,
  ]);

  const iconArg = showIcon ? icon : false;

  const fire = () => {
    if (showIcon) toast[creator](message, icon, config);
    else toast[creator](message, false, config);
  };

  const generated = useMemo(() => {
    const entries = Object.entries(config);
    const args = [JSON.stringify(message)];

    if (!showIcon) args.push("false");
    else if (icon) args.push(JSON.stringify(icon));

    if (entries.length === 0) {
      return `toast.${creator}(${args.join(", ")});`;
    }

    const body = entries.map(([key, value]) => `  ${key}: ${literal(value)},`).join("\n");
    return `toast.${creator}(${args.join(", ")}, {\n${body}\n});`;
  }, [config, creator, message, icon, showIcon]);

  return (
    <section
      id="playground"
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
          Playground
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "15px",
            maxWidth: "640px",
            marginBottom: "20px",
          }}
        >
          Every control below is a real option. Only what you change from the defaults ends
          up in the generated call, so you can copy it straight into your code.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
            gap: "20px",
            alignItems: "start",
          }}
        >
          {/* controls */}
          <div
            className="clean-card"
            style={{
              padding: "20px",
              background: "var(--bg-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* content */}
            <div>
              <label style={labelStyle}>Method</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {CREATORS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCreator(item)}
                    className="toast-btn"
                    style={{
                      fontSize: "12px",
                      padding: "6px 10px",
                      fontFamily: "var(--font-mono)",
                      background: creator === item ? "#1c1917" : "#ffffff",
                      color: creator === item ? "#ffffff" : "var(--text-main)",
                      borderColor: creator === item ? "#1c1917" : "var(--border-subtle)",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                style={fieldStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Description (optional)</label>
              <input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="second line under the message"
                style={fieldStyle}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>Icon</label>
                <input
                  type="text"
                  value={icon}
                  onChange={(event) => setIcon(event.target.value)}
                  disabled={!showIcon}
                  style={{ ...fieldStyle, opacity: showIcon ? 1 : 0.5 }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "9px" }}>
                <label style={checkboxRowStyle}>
                  <input
                    type="checkbox"
                    checked={showIcon}
                    onChange={(event) => setShowIcon(event.target.checked)}
                  />
                  <span>Show icon</span>
                </label>
              </div>
            </div>

            {/* behaviour */}
            <div>
              <label style={labelStyle}>
                Duration: {persist ? "Infinity" : `${duration}ms`}
              </label>
              <input
                type="range"
                min={1000}
                max={12000}
                step={500}
                value={duration}
                disabled={persist}
                onChange={(event) => setDuration(Number(event.target.value))}
                style={{ width: "100%", accentColor: "#1c1917", opacity: persist ? 0.4 : 1 }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <label style={checkboxRowStyle}>
                <input
                  type="checkbox"
                  checked={persist}
                  onChange={(event) => setPersist(event.target.checked)}
                />
                <span>Keep until dismissed</span>
              </label>
              <label style={checkboxRowStyle}>
                <input
                  type="checkbox"
                  checked={progress}
                  onChange={(event) => setProgress(event.target.checked)}
                />
                <span>progress</span>
              </label>
              <label style={checkboxRowStyle}>
                <input
                  type="checkbox"
                  checked={pauseOnHover}
                  onChange={(event) => setPauseOnHover(event.target.checked)}
                />
                <span>pauseOnHover</span>
              </label>
              <label style={checkboxRowStyle}>
                <input
                  type="checkbox"
                  checked={closable}
                  onChange={(event) => setClosable(event.target.checked)}
                />
                <span>closable</span>
              </label>
            </div>

            {/* appearance */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>Theme</label>
                <select
                  value={theme}
                  onChange={(event) => setTheme(event.target.value as "dark" | "light")}
                  style={fieldStyle}
                >
                  <option value="dark">dark (default)</option>
                  <option value="light">light</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Font</label>
                <select
                  value={font}
                  onChange={(event) => setFont(event.target.value)}
                  style={fieldStyle}
                >
                  {FONTS.map((item) => (
                    <option key={item.label} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={checkboxRowStyle}>
                <input
                  type="checkbox"
                  checked={useColors}
                  onChange={(event) => setUseColors(event.target.checked)}
                />
                <span>Custom colours (bgColor / textColor)</span>
              </label>
              {useColors && (
                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <label style={{ ...checkboxRowStyle, gap: "6px" }}>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(event) => setBgColor(event.target.value)}
                    />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}>
                      {bgColor}
                    </span>
                  </label>
                  <label style={{ ...checkboxRowStyle, gap: "6px" }}>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(event) => setTextColor(event.target.value)}
                    />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}>
                      {textColor}
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={checkboxRowStyle}>
                  <input
                    type="checkbox"
                    checked={useWidth}
                    onChange={(event) => setUseWidth(event.target.checked)}
                  />
                  <span>width: {width}</span>
                </label>
                <input
                  type="range"
                  min={200}
                  max={520}
                  step={10}
                  value={width}
                  disabled={!useWidth}
                  onChange={(event) => setWidth(Number(event.target.value))}
                  style={{ width: "100%", accentColor: "#1c1917", opacity: useWidth ? 1 : 0.4 }}
                />
              </div>
              <div>
                <label style={labelStyle}>radius: {radius}</label>
                <input
                  type="range"
                  min={0}
                  max={32}
                  step={1}
                  value={radius}
                  onChange={(event) => setRadius(Number(event.target.value))}
                  style={{ width: "100%", accentColor: "#1c1917" }}
                />
              </div>
            </div>

            {/* position */}
            <div>
              <label style={labelStyle}>Position</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
                {[
                  { id: "default", label: "default" },
                  { id: "named", label: "named" },
                  { id: "edge", label: "edge offset" },
                  { id: "free", label: "coordinate" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPositionMode(item.id as PositionMode)}
                    className="toast-btn"
                    style={{
                      fontSize: "12px",
                      padding: "6px 10px",
                      background: positionMode === item.id ? "#1c1917" : "#ffffff",
                      color: positionMode === item.id ? "#ffffff" : "var(--text-main)",
                      borderColor:
                        positionMode === item.id ? "#1c1917" : "var(--border-subtle)",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {positionMode === "named" && (
                <select
                  value={named}
                  onChange={(event) => setNamed(event.target.value as NamedPosition)}
                  style={fieldStyle}
                >
                  {NAMED.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              )}

              {positionMode === "edge" && (
                <input
                  type="text"
                  value={edge}
                  onChange={(event) => setEdge(event.target.value)}
                  placeholder="top-10vh left-10vw"
                  style={{ ...fieldStyle, fontFamily: "var(--font-mono)" }}
                />
              )}

              {positionMode === "free" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.4fr", gap: "8px" }}>
                  <input
                    type="text"
                    value={freeX}
                    onChange={(event) => setFreeX(event.target.value)}
                    placeholder="x"
                    style={{ ...fieldStyle, fontFamily: "var(--font-mono)" }}
                  />
                  <input
                    type="text"
                    value={freeY}
                    onChange={(event) => setFreeY(event.target.value)}
                    placeholder="y"
                    style={{ ...fieldStyle, fontFamily: "var(--font-mono)" }}
                  />
                  <select
                    value={anchor}
                    onChange={(event) => setAnchor(event.target.value as NamedPosition)}
                    style={fieldStyle}
                  >
                    {NAMED.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* motion */}
            <div>
              <label style={checkboxRowStyle}>
                <input
                  type="checkbox"
                  checked={useMotion}
                  onChange={(event) => setUseMotion(event.target.checked)}
                />
                <span>Custom motion</span>
              </label>

              {useMotion && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>enter: {enter}ms</label>
                    <input
                      type="range"
                      min={0}
                      max={1500}
                      step={20}
                      value={enter}
                      onChange={(event) => setEnter(Number(event.target.value))}
                      style={{ width: "100%", accentColor: "#1c1917" }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>exit: {exit}ms</label>
                    <input
                      type="range"
                      min={0}
                      max={1500}
                      step={20}
                      value={exit}
                      onChange={(event) => setExit(Number(event.target.value))}
                      style={{ width: "100%", accentColor: "#1c1917" }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>slide: {slide}px</label>
                    <input
                      type="range"
                      min={0}
                      max={120}
                      step={2}
                      value={slide}
                      onChange={(event) => setSlide(Number(event.target.value))}
                      style={{ width: "100%", accentColor: "#1c1917" }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>scale: {scale}</label>
                    <input
                      type="range"
                      min={0.5}
                      max={1}
                      step={0.01}
                      value={scale}
                      onChange={(event) => setScale(Number(event.target.value))}
                      style={{ width: "100%", accentColor: "#1c1917" }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>blur: {blur}px</label>
                    <input
                      type="range"
                      min={0}
                      max={16}
                      step={1}
                      value={blur}
                      onChange={(event) => setBlur(Number(event.target.value))}
                      style={{ width: "100%", accentColor: "#1c1917" }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>from</label>
                    <select
                      value={from}
                      onChange={(event) =>
                        setFrom(
                          event.target.value as
                            | "auto"
                            | "top"
                            | "bottom"
                            | "left"
                            | "right"
                            | "none"
                        )
                      }
                      style={fieldStyle}
                    >
                      {["auto", "top", "bottom", "left", "right", "none"].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* generated call */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <CodeSnippet code={generated} language="tsx" filename="playground.tsx" />

            <button
              type="button"
              onClick={fire}
              className="toast-btn-primary"
              style={{ width: "100%", padding: "13px" }}
            >
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
              <span>Fire this toast</span>
            </button>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => {
                  for (let i = 1; i <= 3; i += 1) {
                    setTimeout(() => {
                      if (showIcon) toast[creator](`${message} ${i}`, icon, config);
                      else toast[creator](`${message} ${i}`, false, config);
                    }, i * 180);
                  }
                }}
                className="toast-btn"
                style={{ flex: 1, justifyContent: "center", fontSize: "13px" }}
              >
                Fire three (see the stack)
              </button>
              <button
                type="button"
                onClick={() => toast.dismissAll()}
                className="toast-btn"
                style={{ flex: 1, justifyContent: "center", fontSize: "13px" }}
              >
                Dismiss all
              </button>
            </div>

            <div
              className="clean-card"
              style={{ padding: "16px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}
            >
              <div style={{ fontWeight: 700, color: "var(--text-main)", marginBottom: "4px" }}>
                Reading the call
              </div>
              <p style={{ margin: 0 }}>
                The icon argument is {showIcon ? <code>{JSON.stringify(iconArg)}</code> : <code>false</code>}
                , which {showIcon ? "replaces the built-in variant icon" : "removes the icon entirely"}.
                Drop the second argument completely and you get the variant icon back.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
