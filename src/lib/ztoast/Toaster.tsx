"use client";

import { useMemo, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { resolvePlacement, type Placement } from "./placement";
import { getEmptyToasts, getToasts, subscribe } from "./store";
import type { ToasterProps, ToastRecord } from "./types";

// the card look lives in a class so any inline style from the caller wins
const STYLES = `
.ztoast {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  max-width: min(92vw, 420px);
  box-sizing: border-box;
  padding: 12px 16px;
  background: #ffffff;
  color: #1c1917;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);
  font-size: 14px;
  line-height: 1.45;
  overflow: hidden;
  pointer-events: auto;
}
.ztoast-body { flex: 1; min-width: 0; word-break: break-word; }
.ztoast-title { font-weight: 600; }
.ztoast-desc { font-size: 0.9em; opacity: 0.72; margin-top: 2px; }
.ztoast-icon { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ztoast-badge { width: 20px; height: 20px; border-radius: 50%; }
.ztoast-close {
  flex-shrink: 0;
  display: flex;
  padding: 4px;
  margin: -4px -6px -4px 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: inherit;
  opacity: 0.45;
  cursor: pointer;
  transition: opacity 0.15s ease, background 0.15s ease;
}
.ztoast-close:hover { opacity: 1; background: rgba(128, 128, 128, 0.18); }
.ztoast-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: rgba(128, 128, 128, 0.16);
}
.ztoast-progress-fill {
  display: block;
  height: 100%;
  width: 100%;
  transform-origin: left;
  animation-name: ztoast-progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
.ztoast-spin { animation: ztoast-spin 1s linear infinite; }
@keyframes ztoast-spin { to { transform: rotate(360deg); } }
@keyframes ztoast-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes ztoast-in-top { from { opacity: 0; transform: translateY(-18px) scale(0.94); } }
@keyframes ztoast-in-bottom { from { opacity: 0; transform: translateY(18px) scale(0.94); } }
@keyframes ztoast-out-top { to { opacity: 0; transform: translateY(-14px) scale(0.92); } }
@keyframes ztoast-out-bottom { to { opacity: 0; transform: translateY(14px) scale(0.92); } }
@media (prefers-reduced-motion: reduce) {
  .ztoast, .ztoast-spin, .ztoast-progress-fill { animation: none !important; }
}
`;

// false on the server and during hydration, true once the client has mounted
const noopSubscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

// mount once, anywhere, it renders every toast into a portal on document.body
export function Toaster({
  position = "top-right",
  duration = 4000,
  gap = 12,
  offset = 16,
  closable = true,
  progressBar = false,
  style,
}: ToasterProps) {
  const toasts = useSyncExternalStore(subscribe, getToasts, getEmptyToasts);
  const mounted = useSyncExternalStore(noopSubscribe, onClient, onServer);

  const groups = useMemo(() => {
    const map = new Map<string, { placement: Placement; items: ToastRecord[] }>();

    for (const item of toasts) {
      const placement = resolvePlacement(
        item.position ?? position,
        item.offsets,
        gap,
        offset
      );
      const group = map.get(placement.key);
      if (group) group.items.push(item);
      else map.set(placement.key, { placement, items: [item] });
    }

    return Array.from(map.values());
  }, [toasts, position, gap, offset]);

  if (!mounted) return null;

  return createPortal(
    <>
      <style>{STYLES}</style>
      {groups.map(({ placement, items }) => (
        <div key={placement.key} style={placement.style}>
          {items.map((item) => (
            <Toast
              key={item.id}
              toast={item}
              fromBottom={placement.fromBottom}
              duration={item.duration ?? duration}
              closable={item.closable ?? closable}
              progressBar={item.progressBar ?? progressBar}
              baseStyle={style}
            />
          ))}
        </div>
      ))}
    </>,
    document.body
  );
}
