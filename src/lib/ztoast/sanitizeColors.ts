import {
  prepare,
  MAX_FONT_FAMILY_LENGTH,
  type SanitizeResult,
} from "./sanitizeCore";

// regular expression for color strings including hex rgb hsl oklch named colors and var
const COLOR_PATTERN =
  /^(#[0-9a-fA-F]{3,8}|(rgba?|hsla?|oklch|oklab)\([^()]*\)|var\(--[a-zA-Z0-9-]+(,\s*[^()]*)?\)|[a-zA-Z]+)$/;

// regular expression for gradient strings
const GRADIENT_PATTERN =
  /^(linear|radial|conic)-gradient\(\s*[a-zA-Z0-9#%.,\s()-]*\)$/;

// regular expression for background image url values
const SAFE_URL_PATTERN =
  /^url\((['"]?)(https?:\/\/[^'")]+|\/[^'")]+|\.\/?[^'")]+|data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64,[a-zA-Z0-9+/=]+)\1\)$/;

// regular expression for font family declarations
const FONT_FAMILY_PATTERN = /^[a-zA-Z0-9\s,'"-]+$/;

// validates color strings
export function sanitizeColor(input: string | undefined): SanitizeResult {
  const prepared = prepare(input);
  if (prepared.kind === "absent") return { value: undefined, rejected: false };
  if (prepared.kind === "invalid") return { value: undefined, rejected: true };
  return COLOR_PATTERN.test(prepared.value)
    ? { value: prepared.value, rejected: false }
    : { value: undefined, rejected: true };
}

// validates gradient definitions
export function sanitizeGradient(input: string | undefined): SanitizeResult {
  const prepared = prepare(input);
  if (prepared.kind === "absent") return { value: undefined, rejected: false };
  if (prepared.kind === "invalid") return { value: undefined, rejected: true };
  return GRADIENT_PATTERN.test(prepared.value)
    ? { value: prepared.value, rejected: false }
    : { value: undefined, rejected: true };
}

// validates background image urls
export function sanitizeBackgroundImage(input: string | undefined): SanitizeResult {
  const prepared = prepare(input);
  if (prepared.kind === "absent") return { value: undefined, rejected: false };
  if (prepared.kind === "invalid") return { value: undefined, rejected: true };
  return SAFE_URL_PATTERN.test(prepared.value)
    ? { value: prepared.value, rejected: false }
    : { value: undefined, rejected: true };
}

// validates font family lists
export function sanitizeFontFamily(input: string | undefined): SanitizeResult {
  const prepared = prepare(input, MAX_FONT_FAMILY_LENGTH);
  if (prepared.kind === "absent") return { value: undefined, rejected: false };
  if (prepared.kind === "invalid") return { value: undefined, rejected: true };
  return FONT_FAMILY_PATTERN.test(prepared.value)
    ? { value: prepared.value, rejected: false }
    : { value: undefined, rejected: true };
}
