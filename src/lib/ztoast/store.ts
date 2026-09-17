import { isValidElement } from "react";
import type { CSSProperties, ReactNode } from "react";
import type {
  PromiseMessages,
  ToastOptions,
  ToastRecord,
  ToastVariant,
} from "./types";

// how long the exit animation runs before the record is dropped
export const EXIT_MS = 200;

type Listener = () => void;

const listeners = new Set<Listener>();
const exitTimers = new Map<string, ReturnType<typeof setTimeout>>();
const EMPTY: ToastRecord[] = [];

let toasts: ToastRecord[] = EMPTY;
let counter = 0;

function emit(): void {
  for (const listener of listeners) listener();
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getToasts(): ToastRecord[] {
  return toasts;
}

// the server never has toasts, this keeps hydration stable
export function getEmptyToasts(): ToastRecord[] {
  return EMPTY;
}

// a plain object is options, anything renderable is an icon
function isOptions(value: unknown): value is ToastOptions {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !isValidElement(value)
  );
}

// splits one flat object into controls, placement offsets and plain css
function split(options: ToastOptions) {
  const {
    id,
    position,
    duration,
    icon,
    description,
    closable,
    progressBar,
    progressColor,
    onClose,
    top,
    right,
    bottom,
    left,
    ...style
  } = options;

  return {
    controls: {
      id,
      position,
      duration,
      icon,
      description,
      closable,
      progressBar,
      progressColor,
      onClose,
    },
    offsets: { top, right, bottom, left },
    style: style as CSSProperties,
  };
}

// adds a toast, or replaces the existing one when the id is reused
function push(
  variant: ToastVariant,
  message: ReactNode,
  icon: ReactNode,
  options: ToastOptions
): string {
  const { controls, offsets, style } = split(options);

  counter += 1;
  const id = controls.id ?? `ztoast-${counter}`;

  const record: ToastRecord = {
    ...controls,
    id,
    variant,
    message,
    // a positional null means "no icon", undefined falls back to the option
    icon: icon === undefined ? controls.icon : icon,
    offsets,
    style,
    leaving: false,
    createdAt: Date.now(),
  };

  const pending = exitTimers.get(id);
  if (pending) {
    clearTimeout(pending);
    exitTimers.delete(id);
  }

  toasts = toasts.some((item) => item.id === id)
    ? toasts.map((item) => (item.id === id ? record : item))
    : [...toasts, record];

  emit();
  return id;
}

export interface ToastFn {
  (message: ReactNode, options?: ToastOptions): string;
  (message: ReactNode, icon: ReactNode, options?: ToastOptions): string;
}

// builds one variant helper accepting (message, icon?, options?)
function make(variant: ToastVariant, defaults?: ToastOptions): ToastFn {
  const fire = (
    message: ReactNode,
    a?: ReactNode | ToastOptions,
    b?: ToastOptions
  ): string => {
    const options = (isOptions(a) ? a : b) ?? {};
    const icon = isOptions(a) ? undefined : a;
    return push(variant, message, icon, { ...defaults, ...options });
  };

  return fire as ToastFn;
}

// dismisses one toast by id, or every toast when no id is given
export function dismiss(id?: string): void {
  const closing = toasts.filter(
    (item) => !item.leaving && (id === undefined || item.id === id)
  );
  if (closing.length === 0) return;

  const ids = new Set(closing.map((item) => item.id));
  toasts = toasts.map((item) =>
    ids.has(item.id) ? { ...item, leaving: true } : item
  );
  emit();

  for (const item of closing) {
    exitTimers.set(
      item.id,
      setTimeout(() => {
        exitTimers.delete(item.id);
        toasts = toasts.filter((live) => live.id !== item.id);
        emit();
      }, EXIT_MS)
    );
  }

  for (const item of closing) item.onClose?.();
}

// resolves a message that may be a function of the settled value
function resolveMessage<T>(
  value: ReactNode | ((arg: T) => ReactNode),
  arg: T
): ReactNode {
  return typeof value === "function" ? value(arg) : value;
}

// tracks a promise from loading to success or error in a single toast
function promise<T>(
  input: Promise<T>,
  messages: PromiseMessages<T>,
  options: ToastOptions = {}
): Promise<T> {
  counter += 1;
  const id = options.id ?? `ztoast-promise-${counter}`;

  toast.loading(messages.loading, { ...options, id, duration: Infinity });

  input.then(
    (data) => {
      toast.success(resolveMessage(messages.success, data), {
        ...options,
        id,
      });
    },
    (error: unknown) => {
      toast.error(resolveMessage(messages.error, error), { ...options, id });
    }
  );

  return input;
}

export const toast = Object.assign(make("default"), {
  show: make("default"),
  success: make("success"),
  error: make("error"),
  info: make("info"),
  warning: make("warning"),
  loading: make("loading", { duration: Infinity }),
  promise,
  dismiss,
  dismissAll: () => dismiss(),
});
