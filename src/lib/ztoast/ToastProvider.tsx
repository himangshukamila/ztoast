"use client";

import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type {
  ToastOptions,
  ToastProviderProps,
  ToastRecord,
  ToastPosition,
  ToastOffsetOptions,
} from "./types";
import {
  registerToastHandlers,
  unregisterToastHandlers,
  type ToastHandlers,
} from "./toastStore";
import { TOAST_EXIT_DURATION_MS } from "./Toast";

export interface ToastContextValue {
  toasts: ToastRecord[];
  add: (message: ReactNode, options?: ToastOptions) => string | number;
  remove: (id: string | number) => void;
  removeAll: () => void;
  gap: number;
  defaultPosition: ToastPosition;
  offset?: ToastOffsetOptions;
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

let localIdCounter = 0;

// generates a unique id for a toast record
function generateId(): string {
  localIdCounter += 1;
  return `ztoast-${Date.now()}-${localIdCounter}`;
}

// normalizes duration values to positive numbers or infinity
function normalizeDuration(value: unknown): number {
  if (typeof value !== "number" || Number.isNaN(value)) return Infinity;
  if (!Number.isFinite(value)) return Infinity;
  return Math.max(value, 0);
}

// invokes callbacks safely to prevent crashing
function safeInvoke(callback: () => void): void {
  try {
    callback();
  } catch (error) {
    if (typeof console !== "undefined" && console.warn) {
      console.warn(`[ztoast] onClose callback threw: ${String(error)}`);
    }
  }
}

// root state provider component for toast state management
export function ToastProvider({
  children,
  defaultPosition = "top-right",
  defaultDuration = 4000,
  defaultProgressBar = false,
  gap = 12,
  offset,
  top,
  bottom,
  left,
  right,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const exitTimers = useRef<Map<string | number, ReturnType<typeof setTimeout>>>(new Map());
  const closeCallbacks = useRef<Map<string | number, () => void>>(new Map());

  const clearExitTimer = useCallback((id: string | number) => {
    const timer = exitTimers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      exitTimers.current.delete(id);
    }
  }, []);

  const remove = useCallback(
    (id: string | number) => {
      const onClose = closeCallbacks.current.get(id);
      if (onClose) {
        closeCallbacks.current.delete(id);
        safeInvoke(onClose);
      }

      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, isLeaving: true } : t)));
      clearExitTimer(id);

      const exitTimer = setTimeout(() => {
        exitTimers.current.delete(id);
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, TOAST_EXIT_DURATION_MS);
      exitTimers.current.set(id, exitTimer);
    },
    [clearExitTimer]
  );

  const removeAll = useCallback(() => {
    exitTimers.current.forEach((timer) => clearTimeout(timer));
    exitTimers.current.clear();

    const callbacks = Array.from(closeCallbacks.current.values());
    closeCallbacks.current.clear();
    callbacks.forEach(safeInvoke);

    setToasts([]);
  }, []);

  const add = useCallback(
    (message: ReactNode, options: ToastOptions = {}) => {
      const id = options.id ?? generateId();
      const duration = normalizeDuration(options.duration ?? defaultDuration);
      const progressBar = options.progressBar ?? defaultProgressBar;

      const record: ToastRecord = {
        id,
        message,
        description: options.description,
        variant: options.variant ?? "default",
        position: options.position ?? defaultPosition,
        duration,
        closable: options.closable ?? true,
        progressBar,
        isLeaving: false,
        icon: options.icon,
        onClose: options.onClose,
        offset: options.offset,
        top: options.top,
        bottom: options.bottom,
        left: options.left,
        right: options.right,
        transform: options.transform,
        width: options.width,
        height: options.height,
        background: options.background,
        backgroundGradient: options.backgroundGradient,
        backgroundImage: options.backgroundImage,
        textColor: options.textColor,
        fontFamily: options.fontFamily,
        fontSize: options.fontSize,
        fontWeight: options.fontWeight,
        border: options.border,
        borderColor: options.borderColor,
        borderWidth: options.borderWidth,
        borderRadius: options.borderRadius,
        boxShadow: options.boxShadow,
        padding: options.padding,
        progressColor: options.progressColor,
        createdAt: Date.now(),
      };

      clearExitTimer(id);

      if (options.onClose) {
        closeCallbacks.current.set(id, options.onClose);
      } else {
        closeCallbacks.current.delete(id);
      }

      setToasts((prev) => {
        const withoutExisting = prev.filter((t) => t.id !== id);
        return [...withoutExisting, record];
      });

      return id;
    },
    [defaultDuration, defaultPosition, defaultProgressBar, clearExitTimer]
  );

  useEffect(() => {
    const api: ToastHandlers = { add, remove, removeAll };
    registerToastHandlers(api);
    const pendingExitTimers = exitTimers.current;
    const pendingCallbacks = closeCallbacks.current;
    return () => {
      unregisterToastHandlers(api);
      pendingExitTimers.forEach((timer) => clearTimeout(timer));
      pendingExitTimers.clear();
      pendingCallbacks.clear();
    };
  }, [add, remove, removeAll]);

  const value = useMemo(
    () => ({
      toasts,
      add,
      remove,
      removeAll,
      gap,
      defaultPosition,
      offset,
      top,
      bottom,
      left,
      right,
    }),
    [toasts, add, remove, removeAll, gap, defaultPosition, offset, top, bottom, left, right]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
