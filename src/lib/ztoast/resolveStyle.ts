import type { CSSProperties } from "react";
import type { ToastStyleOptions } from "./types";
import {
  sanitizeColor,
  sanitizeGradient,
  sanitizeBackgroundImage,
  sanitizeFontFamily,
  sanitizeBorderShorthand,
  sanitizeDimension,
  sanitizeBoxShadow,
  type SanitizeResult,
} from "./sanitize";

// applies a sanitized result onto the style object if valid
function applyStyleProperty(
  style: CSSProperties,
  key: keyof CSSProperties,
  result: SanitizeResult
): void {
  if (result.rejected || result.value === undefined) return;
  (style as Record<string, string>)[key as string] = result.value;
}

// checks if font weight is safe
function isSafeFontWeight(value: number | string): boolean {
  if (typeof value === "number") return Number.isFinite(value);
  return typeof value === "string" && /^[a-zA-Z0-9]{1,20}$/.test(value);
}

// resolves a toast style options object into a sanitized css properties object
export function resolveToastStyle(options: ToastStyleOptions): CSSProperties {
  const style: CSSProperties = {};

  applyStyleProperty(style, "width", sanitizeDimension(options.width));
  applyStyleProperty(style, "height", sanitizeDimension(options.height));
  applyStyleProperty(style, "padding", sanitizeDimension(options.padding));
  applyStyleProperty(style, "borderRadius", sanitizeDimension(options.borderRadius));
  applyStyleProperty(style, "borderWidth", sanitizeDimension(options.borderWidth));
  applyStyleProperty(style, "fontSize", sanitizeDimension(options.fontSize));

  const gradient = sanitizeGradient(options.backgroundGradient);
  const bgImage = sanitizeBackgroundImage(options.backgroundImage);

  const layers: string[] = [];
  if (!bgImage.rejected && bgImage.value) layers.push(bgImage.value);
  if (!gradient.rejected && gradient.value) layers.push(gradient.value);
  if (layers.length > 0) {
    style.backgroundImage = layers.join(", ");
  }

  applyStyleProperty(style, "backgroundColor", sanitizeColor(options.background));
  applyStyleProperty(style, "color", sanitizeColor(options.textColor));
  applyStyleProperty(style, "fontFamily", sanitizeFontFamily(options.fontFamily));

  if (options.fontWeight !== undefined && isSafeFontWeight(options.fontWeight)) {
    style.fontWeight = options.fontWeight;
  }

  applyStyleProperty(style, "border", sanitizeBorderShorthand(options.border));
  applyStyleProperty(style, "borderColor", sanitizeColor(options.borderColor));
  applyStyleProperty(style, "boxShadow", sanitizeBoxShadow(options.boxShadow));

  return style;
}
