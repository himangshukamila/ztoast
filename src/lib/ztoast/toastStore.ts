import type { ReactNode } from "react";
import type { PromiseToastMessages, ToastOptions, ToastVariant } from "./types";

export interface ToastHandlers {
  add: (message: ReactNode, options?: ToastOptions) => string | number;
  remove: (id: string | number) => void;
  removeAll: () => void;
}

let handlers: ToastHandlers | null = null;
let promiseIdCounter = 0;
let warnedNotMounted = false;

// registers the mounted toast provider handlers
export function registerToastHandlers(next: ToastHandlers): void {
  handlers = next;
}

// unregisters the provider handlers if matching
export function unregisterToastHandlers(previous: ToastHandlers): void {
  if (handlers === previous) handlers = null;
}

// warns in development if toast is called before mounting
function warnNotMounted(): void {
  if (warnedNotMounted) return;
  warnedNotMounted = true;
  if (typeof console !== "undefined" && console.warn) {
    console.warn(
      "[ztoast] toast() was called before a <ToastProvider> mounted. " +
        "Render <Toaster /> at the root of your application."
    );
  }
}

// creates a helper function for a specific toast variant
function withVariant(variant: ToastVariant) {
  return (message: ReactNode, options: ToastOptions = {}) => {
    if (!handlers) {
      warnNotMounted();
      return "";
    }
    return handlers.add(message, { ...options, variant });
  };
}

// handles promise lifecycles from loading to success or error
function handlePromise<T>(
  promise: Promise<T>,
  messages: PromiseToastMessages<T>,
  options: ToastOptions = {}
): Promise<T> {
  if (!promise || typeof promise.then !== "function") {
    return promise;
  }

  if (!handlers) {
    warnNotMounted();
    return promise;
  }

  promiseIdCounter += 1;
  const id = options.id ?? `ztoast-promise-${Date.now()}-${promiseIdCounter}`;
  const resolvedDuration = options.duration ?? 4000;

  handlers.add(messages.loading, {
    ...options,
    id,
    variant: "loading",
    duration: Infinity,
  });

  promise.then(
    (data) => {
      const resolvedSuccess =
        typeof messages.success === "function"
          ? messages.success(data)
          : messages.success;
      handlers?.add(resolvedSuccess, {
        ...options,
        id,
        variant: "success",
        duration: resolvedDuration,
      });
    },
    (err: unknown) => {
      const resolvedError =
        typeof messages.error === "function"
          ? messages.error(err)
          : messages.error;
      handlers?.add(resolvedError, {
        ...options,
        id,
        variant: "error",
        duration: resolvedDuration,
      });
    }
  );

  return promise;
}

export const toast = {
  show: withVariant("default"),
  success: withVariant("success"),
  error: withVariant("error"),
  info: withVariant("info"),
  warning: withVariant("warning"),
  loading: (message: ReactNode, options: ToastOptions = {}) =>
    withVariant("loading")(message, { duration: Infinity, ...options }),
  promise: handlePromise,
  dismiss: (id: string | number) => handlers?.remove(id),
  dismissAll: () => handlers?.removeAll(),
};
