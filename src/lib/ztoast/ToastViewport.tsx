"use client";

import { useContext, useMemo, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { ToastContext, type ToastContextValue } from "./ToastProvider";
import { Toast } from "./Toast";
import type { ToastPosition, ToastRecord } from "./types";
import { sanitizeDimension, sanitizeTransform } from "./sanitize";

interface ResolvedViewportGroup {
  key: string;
  isBottom: boolean;
  style: CSSProperties;
  toasts: ToastRecord[];
}

const DEFAULT_EDGE_OFFSET = 16;

const KNOWN_POSITIONS = new Set<string>([
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
]);

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

// resolves a candidate position with a fallback
function resolvePosition(
  candidate: ToastPosition | undefined,
  fallback: ToastPosition | undefined
): ToastPosition {
  if (candidate && KNOWN_POSITIONS.has(candidate)) return candidate;
  if (fallback && KNOWN_POSITIONS.has(fallback)) return fallback;
  return "top-right";
}

// computes the viewport container style and grouping key for a given toast
function computeViewportStyle(
  toast: ToastRecord,
  ctx: ToastContextValue
): { key: string; isBottom: boolean; style: CSSProperties } {
  const position = resolvePosition(toast.position, ctx.defaultPosition);
  const isBottom = position.startsWith("bottom");
  const isCenter = position.endsWith("center");
  const isRightAnchored = position.endsWith("right");

  const rawTop =
    toast.top ??
    toast.offset?.top ??
    (isBottom ? undefined : toast.offset?.y) ??
    ctx.top ??
    ctx.offset?.top ??
    (isBottom ? undefined : ctx.offset?.y);

  const rawBottom =
    toast.bottom ??
    toast.offset?.bottom ??
    (isBottom ? toast.offset?.y : undefined) ??
    ctx.bottom ??
    ctx.offset?.bottom ??
    (isBottom ? ctx.offset?.y : undefined);

  const rawLeft =
    toast.left ??
    toast.offset?.left ??
    (isRightAnchored ? undefined : toast.offset?.x) ??
    ctx.left ??
    ctx.offset?.left ??
    (isRightAnchored ? undefined : ctx.offset?.x);

  const rawRight =
    toast.right ??
    toast.offset?.right ??
    (isRightAnchored ? toast.offset?.x : undefined) ??
    ctx.right ??
    ctx.offset?.right ??
    (isRightAnchored ? ctx.offset?.x : undefined);

  const top = sanitizeDimension(rawTop).value;
  const bottom = sanitizeDimension(rawBottom).value;
  const left = sanitizeDimension(rawLeft).value;
  const right = sanitizeDimension(rawRight).value;
  const transform = sanitizeTransform(toast.transform).value;

  const gap = Number.isFinite(ctx.gap) ? ctx.gap : 12;

  const style: CSSProperties = {
    position: "fixed",
    zIndex: 2147483647,
    display: "flex",
    flexDirection: isBottom ? "column-reverse" : "column",
    gap: `${gap}px`,
    pointerEvents: "none",
  };

  if (isBottom) {
    style.bottom = bottom ?? DEFAULT_EDGE_OFFSET;
    if (top !== undefined) style.top = top;
  } else {
    if (top !== undefined || bottom === undefined) {
      style.top = top ?? DEFAULT_EDGE_OFFSET;
    }
    if (bottom !== undefined) style.bottom = bottom;
  }

  if (isCenter) {
    style.left = left ?? "50%";
    if (right !== undefined) style.right = right;
    style.alignItems = "center";
    style.transform = transform ?? (left !== undefined ? undefined : "translateX(-50%)");
  } else if (isRightAnchored) {
    style.right = right ?? DEFAULT_EDGE_OFFSET;
    if (left !== undefined) style.left = left;
    style.alignItems = "flex-end";
    if (transform) style.transform = transform;
  } else {
    style.left = left ?? DEFAULT_EDGE_OFFSET;
    if (right !== undefined) style.right = right;
    style.alignItems = "flex-start";
    if (transform) style.transform = transform;
  }

  const key = `${position}__t:${String(style.top)}__b:${String(style.bottom)}__l:${String(
    style.left
  )}__r:${String(style.right)}__tr:${String(style.transform)}`;

  return { key, isBottom, style };
}

// groups toasts by container positioning key
function groupToasts(
  toasts: ToastRecord[],
  ctx: ToastContextValue
): ResolvedViewportGroup[] {
  const map = new Map<string, ResolvedViewportGroup>();

  for (const toast of toasts) {
    const { key, isBottom, style } = computeViewportStyle(toast, ctx);
    const existing = map.get(key);
    if (existing) {
      existing.toasts.push(toast);
    } else {
      map.set(key, { key, isBottom, style, toasts: [toast] });
    }
  }

  return Array.from(map.values());
}

// viewport component rendered into a portal attached to document body
export function ToastViewport() {
  const ctx = useContext(ToastContext);
  const isMounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  const groups = useMemo(() => (ctx ? groupToasts(ctx.toasts, ctx) : []), [ctx]);

  if (!ctx) {
    return null;
  }

  if (!isMounted || typeof document === "undefined" || !document.body) return null;

  return createPortal(
    <>
      {groups.map((group) => (
        <div key={group.key} style={group.style}>
          {group.toasts.map((t) => (
            <Toast key={t.id} toast={t} onDismiss={ctx.remove} isBottom={group.isBottom} />
          ))}
        </div>
      ))}
    </>,
    document.body
  );
}
