"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { dismiss, EXIT_MS } from "./store";
import type { ToastRecord, ToastVariant } from "./types";

const ENTER_MS = 280;

const ACCENTS: Record<ToastVariant, string> = {
  default: "#3b82f6",
  success: "#10b981",
  error: "#ef4444",
  info: "#3b82f6",
  warning: "#f59e0b",
  loading: "#a1a1aa",
};

interface ToastProps {
  toast: ToastRecord;
  duration: number;
  closable: boolean;
  progressBar: boolean;
  fromBottom: boolean;
  baseStyle?: CSSProperties;
}

// the glyph drawn inside the default status badge
function badgeGlyph(variant: ToastVariant): ReactNode {
  switch (variant) {
    case "success":
      return <polyline points="20 6 9 17 4 12" />;
    case "error":
      return (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      );
    case "warning":
      return (
        <>
          <line x1="12" y1="8" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </>
      );
    case "info":
      return (
        <>
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </>
      );
    default:
      return null;
  }
}

// a caller supplied icon always wins, null or false means no icon at all,
// undefined falls back to the variant badge
function ToastIcon({ variant, icon }: { variant: ToastVariant; icon?: ReactNode }) {
  if (icon === null || icon === false) return null;
  if (icon !== undefined) return <span className="ztoast-icon">{icon}</span>;

  if (variant === "loading") {
    return (
      <span className="ztoast-icon">
        <svg
          className="ztoast-spin"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke={ACCENTS.loading}
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </span>
    );
  }

  const glyph = badgeGlyph(variant);
  if (!glyph) return null;

  return (
    <span className="ztoast-icon ztoast-badge" style={{ background: ACCENTS[variant] }}>
      <svg
        width={12}
        height={12}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {glyph}
      </svg>
    </span>
  );
}

// a single notification card, owns its countdown and pause on hover
export function Toast({
  toast,
  duration,
  closable,
  progressBar,
  fromBottom,
  baseStyle,
}: ToastProps) {
  const { id, variant, leaving, createdAt } = toast;

  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remaining = useRef(duration);
  const startedAt = useRef(0);

  // restarts the countdown whenever the toast is created or updated in place
  useEffect(() => {
    remaining.current = duration;
    startedAt.current = Date.now();

    if (pausedRef.current || !Number.isFinite(duration) || duration <= 0) return;

    timer.current = setTimeout(() => dismiss(id), duration);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [id, duration, createdAt]);

  const pause = () => {
    if (pausedRef.current) return;
    pausedRef.current = true;
    setPaused(true);

    if (!timer.current) return;
    clearTimeout(timer.current);
    timer.current = null;
    remaining.current = remaining.current - (Date.now() - startedAt.current);
  };

  const resume = () => {
    if (!pausedRef.current) return;
    pausedRef.current = false;
    setPaused(false);

    if (!Number.isFinite(remaining.current)) return;
    startedAt.current = Date.now();
    timer.current = setTimeout(() => dismiss(id), Math.max(remaining.current, 0));
  };

  const showProgress = progressBar && Number.isFinite(duration) && duration > 0;
  const direction = fromBottom ? "bottom" : "top";
  const custom: CSSProperties = { ...baseStyle, ...toast.style };

  const style: CSSProperties = {
    animation: leaving
      ? `ztoast-out-${direction} ${EXIT_MS}ms cubic-bezier(0.06, 0.71, 0.55, 1) forwards`
      : `ztoast-in-${direction} ${ENTER_MS}ms cubic-bezier(0.21, 1.02, 0.73, 1)`,
    ...custom,
  };

  // a caller supplied font weight should reach the title too
  const titleStyle =
    custom.fontWeight === undefined ? undefined : { fontWeight: "inherit" as const };

  return (
    <div
      className="ztoast"
      style={style}
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <ToastIcon variant={variant} icon={toast.icon} />

      <div className="ztoast-body">
        <div className="ztoast-title" style={titleStyle}>
          {toast.message}
        </div>
        {toast.description ? (
          <div className="ztoast-desc">{toast.description}</div>
        ) : null}
      </div>

      {closable ? (
        <button
          type="button"
          className="ztoast-close"
          onClick={() => dismiss(id)}
          aria-label="Close notification"
        >
          <svg
            width={13}
            height={13}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ) : null}

      {showProgress ? (
        <span className="ztoast-progress">
          <span
            key={createdAt}
            className="ztoast-progress-fill"
            style={{
              background: toast.progressColor ?? ACCENTS[variant],
              animationDuration: `${duration}ms`,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </span>
      ) : null}
    </div>
  );
}
