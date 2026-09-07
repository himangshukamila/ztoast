"use client";

import type { ReactNode } from "react";
import type { ToastProviderProps } from "./types";
import { ToastProvider } from "./ToastProvider";
import { ToastViewport } from "./ToastViewport";

export interface ToasterProps extends Omit<ToastProviderProps, "children"> {
  children?: ReactNode;
}

// all in one drop in toaster component
export function Toaster({ children, ...providerProps }: ToasterProps) {
  return (
    <ToastProvider {...providerProps}>
      {children}
      <ToastViewport />
    </ToastProvider>
  );
}
