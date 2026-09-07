"use client";

import { useContext } from "react";
import { ToastContext } from "./ToastProvider";
import { toast } from "./toastStore";

// hook to access active toasts and bulk operations
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      toasts: [],
      show: toast.show,
      dismiss: toast.dismiss,
      dismissAll: toast.dismissAll,
    };
  }
  return {
    toasts: ctx.toasts,
    show: ctx.add,
    dismiss: ctx.remove,
    dismissAll: ctx.removeAll,
  };
}
