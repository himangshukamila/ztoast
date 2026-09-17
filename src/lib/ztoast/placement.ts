import type { CSSProperties } from "react";
import type { ToastOffsets, ToastPosition } from "./types";

export interface Placement {
  key: string;
  fromBottom: boolean;
  style: CSSProperties;
}

// splits an anchor name into its vertical and horizontal halves
function axes(position: ToastPosition): [string, string] {
  if (position === "center") return ["center", "center"];
  const [vertical, horizontal] = position.split("-");
  return [vertical, horizontal];
}

// turns an anchor plus any explicit coordinates into a fixed stack container,
// explicit top/right/bottom/left always win over the anchor
export function resolvePlacement(
  position: ToastPosition,
  offsets: ToastOffsets,
  gap: number,
  edge: number | string
): Placement {
  const [vertical, horizontal] = axes(position);

  const hasTop = offsets.top !== undefined;
  const hasBottom = !hasTop && offsets.bottom !== undefined;
  const hasLeft = offsets.left !== undefined;
  const hasRight = !hasLeft && offsets.right !== undefined;

  const fromBottom = hasBottom || (!hasTop && vertical === "bottom");
  const translate: string[] = [];

  const style: CSSProperties = {
    position: "fixed",
    zIndex: 2147483647,
    display: "flex",
    flexDirection: fromBottom ? "column-reverse" : "column",
    gap,
    pointerEvents: "none",
  };

  if (hasTop) style.top = offsets.top;
  else if (hasBottom) style.bottom = offsets.bottom;
  else if (vertical === "top") style.top = edge;
  else if (vertical === "bottom") style.bottom = edge;
  else {
    style.top = "50%";
    translate.push("translateY(-50%)");
  }

  if (hasLeft) style.left = offsets.left;
  else if (hasRight) style.right = offsets.right;
  else if (horizontal === "left") style.left = edge;
  else if (horizontal === "right") style.right = edge;
  else {
    style.left = "50%";
    translate.push("translateX(-50%)");
  }

  if (hasLeft) style.alignItems = "flex-start";
  else if (hasRight) style.alignItems = "flex-end";
  else if (horizontal === "right") style.alignItems = "flex-end";
  else if (horizontal === "center") style.alignItems = "center";
  else style.alignItems = "flex-start";

  if (translate.length > 0) style.transform = translate.join(" ");

  // toasts landing on the same spot share one stack
  const key = [
    style.top,
    style.right,
    style.bottom,
    style.left,
    style.transform,
    style.alignItems,
    style.flexDirection,
  ].join("|");

  return { key, fromBottom, style };
}
