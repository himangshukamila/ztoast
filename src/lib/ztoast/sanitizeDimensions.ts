import { prepare, type SanitizeResult } from "./sanitizeCore";
import { sanitizeColor } from "./sanitizeColors";

const BORDER_SHORTHAND_PATTERN =
  /^([0-9.]+(?:px|em|rem|%))\s+(solid|dashed|dotted|double|groove|ridge|inset|outset|none|hidden)(?:\s+(.+))?$/;

const DIMENSION_PATTERN = /^-?[0-9.]+(px|em|rem|%|vh|vw|vmin|vmax|dvh|svh|lvh|ch|ex)$/;

const CALC_PATTERN = /^calc\(\s*[-0-9.a-zA-Z%+\s/*()]+\s*\)$/;

const TRANSFORM_FUNCTIONS = new Set([
  "translate",
  "translatex",
  "translatey",
  "translate3d",
  "scale",
  "scalex",
  "scaley",
  "scale3d",
  "rotate",
  "rotatex",
  "rotatey",
  "rotatez",
  "skew",
  "skewx",
  "skewy",
  "matrix",
  "matrix3d",
  "perspective",
]);

const TRANSFORM_TOKEN_PATTERN = /^([a-zA-Z0-9]+)\(([^()]*)\)$/;
const TRANSFORM_ARGS_PATTERN = /^-?[0-9.]+[a-z%]*(\s*,\s*-?[0-9.]+[a-z%]*)*$/;
const BOX_SHADOW_PATTERN = /^[a-zA-Z0-9#%.,\s()-]+$/;

// validates border shorthand strings
export function sanitizeBorderShorthand(input: string | undefined): SanitizeResult {
  const prepared = prepare(input);
  if (prepared.kind === "absent") return { value: undefined, rejected: false };
  if (prepared.kind === "invalid") return { value: undefined, rejected: true };

  const match = BORDER_SHORTHAND_PATTERN.exec(prepared.value);
  if (!match) return { value: undefined, rejected: true };

  const [, width, lineStyle, colorPart] = match;
  if (colorPart === undefined) return { value: `${width} ${lineStyle}`, rejected: false };

  const color = sanitizeColor(colorPart);
  if (color.rejected || !color.value) return { value: undefined, rejected: true };
  return { value: `${width} ${lineStyle} ${color.value}`, rejected: false };
}

// validates dimension values like widths padding and coordinates
export function sanitizeDimension(input: number | string | undefined): SanitizeResult {
  if (input == null) return { value: undefined, rejected: false };
  if (typeof input === "number") {
    return Number.isFinite(input) ? { value: `${input}px`, rejected: false } : { value: undefined, rejected: true };
  }

  const prepared = prepare(input);
  if (prepared.kind === "absent") return { value: undefined, rejected: false };
  if (prepared.kind === "invalid") return { value: undefined, rejected: true };

  const { value } = prepared;
  if (DIMENSION_PATTERN.test(value) || value === "auto" || value === "0") {
    return { value, rejected: false };
  }
  if (CALC_PATTERN.test(value)) return { value, rejected: false };
  return { value: undefined, rejected: true };
}

// validates css transform strings
export function sanitizeTransform(input: string | undefined): SanitizeResult {
  const prepared = prepare(input);
  if (prepared.kind === "absent") return { value: undefined, rejected: false };
  if (prepared.kind === "invalid") return { value: undefined, rejected: true };

  const { value } = prepared;
  const tokens = value.match(/[a-zA-Z0-9]+\([^()]*\)/g);
  if (!tokens) return { value: undefined, rejected: true };
  if (tokens.join(" ") !== value) return { value: undefined, rejected: true };

  for (const token of tokens) {
    const match = TRANSFORM_TOKEN_PATTERN.exec(token);
    if (!match) return { value: undefined, rejected: true };
    const [, name, args] = match;
    if (!TRANSFORM_FUNCTIONS.has(name.toLowerCase())) return { value: undefined, rejected: true };
    if (!TRANSFORM_ARGS_PATTERN.test(args.trim())) return { value: undefined, rejected: true };
  }

  return { value, rejected: false };
}

// validates box shadow values
export function sanitizeBoxShadow(input: string | undefined): SanitizeResult {
  const prepared = prepare(input, 300);
  if (prepared.kind === "absent") return { value: undefined, rejected: false };
  if (prepared.kind === "invalid") return { value: undefined, rejected: true };
  return BOX_SHADOW_PATTERN.test(prepared.value)
    ? { value: prepared.value, rejected: false }
    : { value: undefined, rejected: true };
}
