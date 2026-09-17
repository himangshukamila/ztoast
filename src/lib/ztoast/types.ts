import type { CSSProperties, ReactNode } from "react";

// the nine screen anchors a toast can snap to
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastVariant =
  | "default"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "loading";

// free coordinates, pulled out of the style object and used to place the toast
export interface ToastOffsets {
  top?: CSSProperties["top"];
  right?: CSSProperties["right"];
  bottom?: CSSProperties["bottom"];
  left?: CSSProperties["left"];
}

// the only keys that are not plain css, everything else is passed straight through
interface ToastControls {
  id?: string;
  position?: ToastPosition;
  duration?: number;
  icon?: ReactNode;
  description?: ReactNode;
  closable?: boolean;
  progressBar?: boolean;
  progressColor?: string;
  onClose?: () => void;
}

// options are css properties plus the handful of controls above
export interface ToastOptions
  extends Omit<CSSProperties, keyof ToastControls>,
    ToastControls {}

// internal shape stored for each live toast
export interface ToastRecord extends ToastControls {
  id: string;
  variant: ToastVariant;
  message: ReactNode;
  offsets: ToastOffsets;
  style: CSSProperties;
  leaving: boolean;
  createdAt: number;
}

export interface ToasterProps {
  position?: ToastPosition;
  duration?: number;
  gap?: number;
  offset?: number | string;
  closable?: boolean;
  progressBar?: boolean;
  style?: CSSProperties;
}

export interface PromiseMessages<T> {
  loading: ReactNode;
  success: ReactNode | ((data: T) => ReactNode);
  error: ReactNode | ((error: unknown) => ReactNode);
}
