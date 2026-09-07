// this module provides core sanitization helpers and validation guards

export const MAX_VALUE_LENGTH = 500;
export const MAX_FONT_FAMILY_LENGTH = 200;

export const FORBIDDEN_SUBSTRINGS = [
  "javascript:",
  "vbscript:",
  "data:text/html",
  "data:application",
  "expression(",
  "behavior:",
  "-moz-binding",
  "@import",
  "@charset",
  "<script",
  "</",
  "eval(",
  "\\",
  "\0",
];

export interface SanitizeResult {
  value: string | undefined;
  rejected: boolean;
}

export type PreparedInput =
  | { kind: "absent" }
  | { kind: "invalid" }
  | { kind: "value"; value: string };

// strips css comments in a bounded loop to prevent comment splitting bypasses
export function stripComments(input: string): string {
  let result = input;
  for (let pass = 0; pass < 8; pass += 1) {
    const next = result.replace(/\/\*[\s\S]*?\*\//g, "");
    if (next === result) break;
    result = next;
  }
  return result;
}

// strips control characters and collapses whitespace
export function normalize(value: string): string {
  return stripComments(value)
    .replace(/[\x00-\x1f\x7f-\x9f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// checks whether a normalized string contains any forbidden injection sequences
export function containsForbidden(value: string): boolean {
  const lowered = value.toLowerCase();

  for (const forbidden of FORBIDDEN_SUBSTRINGS) {
    if (lowered.includes(forbidden)) return true;
  }

  if (lowered.includes("{") || lowered.includes("}")) return true;

  if (lowered.includes(";")) {
    const isSafeDataImage =
      /^url\((['"]?)data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64,[a-zA-Z0-9+/=]+\1\)$/.test(
        lowered
      );
    if (!isSafeDataImage) return true;
  }

  return false;
}

// shared front door for every string validator
export function prepare(input: unknown, maxLength = MAX_VALUE_LENGTH): PreparedInput {
  if (input == null) return { kind: "absent" };
  if (typeof input !== "string") return { kind: "invalid" };
  if (input.length > maxLength) return { kind: "invalid" };
  const value = normalize(input);
  if (!value || value.length > maxLength) return { kind: "invalid" };
  if (containsForbidden(value)) return { kind: "invalid" };
  return { kind: "value", value };
}
