"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode, CSSProperties } from "react";
import type { ToastRecord, ToastVariant } from "./types";
import { resolveToastStyle } from "./resolveStyle";
import { sanitizeColor } from "./sanitize";

export const TOAST_EXIT_DURATION_MS = 220;

interface ToastProps {
  toast: ToastRecord;
  onDismiss: (id: string | number) => void;
  isBottom?: boolean;
}

// renders clean inline status icons matching react hot toast
function renderToastIcon(variant: ToastVariant, customIcon?: ReactNode): ReactNode {
  if (customIcon) {
    return <span style={{ display: "flex", flexShrink: 0 }}>{customIcon}</span>;
  }

  const iconBadgeStyle: CSSProperties = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  switch (variant) {
    case "success":
      return (
        <div style={{ ...iconBadgeStyle, background: "#10b981" }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      );
    case "error":
      return (
        <div style={{ ...iconBadgeStyle, background: "#ef4444" }}>
          <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      );
    case "warning":
      return (
        <div style={{ ...iconBadgeStyle, background: "#f59e0b" }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
      );
    case "info":
      return (
        <div style={{ ...iconBadgeStyle, background: "#3b82f6" }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
      );
    case "loading":
      return (
        <div style={{ width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#71717a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ animation: "ztoast-spin 1s linear infinite" }}
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

// toast notification card with smooth enter transition and stable hover pause
export function Toast({ toast, onDismiss, isBottom = false }: ToastProps) {
  const { id, duration, isLeaving, createdAt } = toast;
  const showProgress = Boolean(toast.progressBar && Number.isFinite(duration) && duration > 0);

  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const remainingRef = useRef<number>(duration);
  const startRef = useRef<number>(createdAt);
  const isPausedRef = useRef<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // manages timer setup and cleanup when duration or toast instance changes
  useEffect(() => {
    if (!Number.isFinite(duration) || duration <= 0) return;

    startRef.current = Date.now();
    remainingRef.current = duration;
    isPausedRef.current = false;

    timerRef.current = setTimeout(() => {
      onDismiss(id);
    }, duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [id, duration, createdAt, onDismiss]);

  // pauses countdown when mouse hovers over notification card
  const pause = useCallback(() => {
    if (!Number.isFinite(duration) || duration <= 0 || isPausedRef.current) return;
    isPausedRef.current = true;
    setIsPaused(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const elapsed = Date.now() - startRef.current;
    remainingRef.current = Math.max(remainingRef.current - elapsed, 0);
  }, [duration]);

  // resumes countdown when mouse leaves notification card
  const resume = useCallback(() => {
    if (!isPausedRef.current) return;
    isPausedRef.current = false;
    setIsPaused(false);
    startRef.current = Date.now();

    if (Number.isFinite(remainingRef.current) && remainingRef.current > 0) {
      timerRef.current = setTimeout(() => {
        onDismiss(id);
      }, remainingRef.current);
    }
  }, [id, onDismiss]);

  const enterAnimation = isBottom
    ? "ztoast-enter-bottom 350ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards"
    : "ztoast-enter-top 350ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards";

  const exitAnimation = isBottom
    ? `ztoast-exit-bottom ${TOAST_EXIT_DURATION_MS}ms cubic-bezier(0.06, 0.71, 0.55, 1) forwards`
    : `ztoast-exit-top ${TOAST_EXIT_DURATION_MS}ms cubic-bezier(0.06, 0.71, 0.55, 1) forwards`;

  const defaultProgressColor =
    toast.variant === "success"
      ? "#10b981"
      : toast.variant === "error"
      ? "#ef4444"
      : toast.variant === "warning"
      ? "#f59e0b"
      : toast.variant === "info"
      ? "#3b82f6"
      : "#3b82f6";

  const progressColor = sanitizeColor(toast.progressColor).value ?? defaultProgressColor;
  const resolvedStyle = resolveToastStyle(toast);

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: "260px",
    maxWidth: "420px",
    backgroundColor: "#ffffff",
    color: "#1c1917",
    padding: "12px 16px",
    borderRadius: "10px",
    border: isHovered ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(0, 0, 0, 0.06)",
    boxShadow: isHovered
      ? "0 10px 25px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.06)"
      : "0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)",
    fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
    fontSize: "14px",
    lineHeight: 1.4,
    pointerEvents: "auto",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    animation: isLeaving ? exitAnimation : enterAnimation,
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
    willChange: "transform, opacity",
    cursor: "default",
    ...resolvedStyle,
  };

  return (
    <div
      role={toast.variant === "error" ? "alert" : "status"}
      aria-live={toast.variant === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      style={containerStyle}
      onMouseEnter={() => {
        setIsHovered(true);
        pause();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        resume();
      }}
      onFocus={pause}
      onBlur={resume}
    >
      {renderToastIcon(toast.variant, toast.icon)}

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
        <div style={{ fontWeight: 600, fontSize: "14px", color: "inherit", wordBreak: "break-word" }}>
          {toast.message}
        </div>
        {toast.description && (
          <div style={{ fontSize: "13px", color: "#57534e", lineHeight: 1.35, wordBreak: "break-word" }}>
            {toast.description}
          </div>
        )}
      </div>

      {toast.closable && (
        <button
          type="button"
          onClick={() => onDismiss(id)}
          aria-label="Dismiss notification"
          style={{
            background: "transparent",
            border: "none",
            color: "#a1a1aa",
            cursor: "pointer",
            fontSize: "16px",
            lineHeight: 1,
            padding: "4px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.06)";
            e.currentTarget.style.color = "#1c1917";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#a1a1aa";
          }}
        >
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {showProgress && (
        <div
          data-testid="ztoast-progress-track"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              background: progressColor,
              animation: `ztoast-progress ${duration}ms linear forwards`,
              animationPlayState: isPaused ? "paused" : "running",
              transformOrigin: "left",
            }}
          />
        </div>
      )}
    </div>
  );
}
