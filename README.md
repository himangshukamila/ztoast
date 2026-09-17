# ztoast

Smoking hot, zero-dependency React notifications.

One call, three arguments, no configuration:

```tsx
toast.success("Payment received", "💸", { background: "#101014", color: "#fff" });
//            └ message          └ icon  └ plain css + a few options
//                                 (optional)   (optional)
```

The toast is only as wide as its content until you say otherwise, and it can sit
on any of nine anchors or at exact coordinates you pass yourself.

---

## Installation

```bash
npm i ztoast
```

## Quickstart

Mount `<Toaster />` once, anywhere in your tree. It brings its own CSS, so there
is nothing to import and no provider to wrap around your app.

```tsx
// app/layout.tsx
import { Toaster } from "ztoast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" duration={4000} />
        {children}
      </body>
    </html>
  );
}
```

Then call `toast` from anywhere, including files that are not React components:

```tsx
import { toast } from "ztoast";

toast("Saved");
toast.success("Payment received");
toast.error("Could not reach the server");
```

---

## The three arguments

Every method has the same shape: `toast.x(message, icon?, style?)`. The icon and
the style object are both optional, and you can skip the icon and pass the style
object second.

```tsx
toast("Deploy finished");                       // message only
toast("Deploy finished", "🚀");                 // message + icon
toast("Deploy finished", "🚀", { width: 340 }); // message + icon + css
toast("Deploy finished", { width: 340 });       // message + css, no icon
```

The icon can be an emoji, a string, or any JSX. Pass `null` to drop the default
badge entirely:

```tsx
import { Rocket } from "lucide-react";

toast("Deploy finished", <Rocket size={18} color="#6366f1" />);
toast.success("No badge, just text", null);
```

---

## Styling is just CSS

The third argument is a React style object. Every css property you already know
works, and it is applied inline, so it always beats the default card look.

```tsx
toast.success("Plan upgraded", "✨", {
  background: "linear-gradient(135deg, #1e1b4b, #4338ca)",
  color: "#e0e7ff",
  fontFamily: "ui-monospace, monospace",
  fontSize: 15,
  width: 360,
  height: 84,
  borderRadius: 18,
  border: "1px solid #6366f1",
  boxShadow: "0 18px 40px -12px rgba(67, 56, 202, 0.6)",
});
```

Sizing rules:

- **No width given** → the card hugs its text, up to `min(92vw, 420px)`.
- **`width` / `height` given** → exactly that size.

To theme every toast at once, pass `style` to the `Toaster`. Per-toast styles
still win over it.

```tsx
<Toaster style={{ background: "#18181b", color: "#fafafa", borderRadius: 14 }} />
```

---

## Put it anywhere

Nine anchors are available:

```
top-left      top-center      top-right
center-left   center          center-right
bottom-left   bottom-center   bottom-right
```

```tsx
<Toaster position="bottom-center" />      // default for the whole app
toast("Over here", { position: "center" }); // just this toast
```

Not enough? Pass coordinates instead. Any side you give (`top`, `right`,
`bottom`, `left`) replaces that half of the anchor, and toasts landing on the
same spot stack together.

```tsx
toast("Right here", "📍", { top: 300, left: 120 });
toast("Above the tab bar", { bottom: 96 });
toast("Dead center, huge", { top: "50%", left: "50%", width: 420 });
```

---

## Options

Anything that is not a css property is one of these:

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `position` | `ToastPosition` | `"top-right"` | One of the nine anchors. |
| `top` / `right` / `bottom` / `left` | `number \| string` | — | Exact coordinates, they override the matching half of the anchor. |
| `duration` | `number` | `4000` | Milliseconds before auto dismiss. `Infinity` keeps it on screen. |
| `icon` | `ReactNode` | variant icon | Same as the second argument. |
| `description` | `ReactNode` | — | Secondary line under the message. |
| `progressBar` | `boolean` | `false` | Countdown bar that pauses on hover. |
| `progressColor` | `string` | accent | Color of that bar. |
| `closable` | `boolean` | `true` | Show the close button. |
| `id` | `string` | auto | Reusing an id replaces that toast in place. |
| `onClose` | `() => void` | — | Fires when the toast starts leaving. |

Everything else in the object is treated as css.

---

## Methods

| Method | Returns | Description |
| :--- | :--- | :--- |
| `toast(message, icon?, style?)` | `string` | Plain notification. |
| `toast.success(...)` | `string` | Green check badge. |
| `toast.error(...)` | `string` | Red badge, `role="alert"`. |
| `toast.info(...)` | `string` | Blue badge. |
| `toast.warning(...)` | `string` | Amber badge. |
| `toast.loading(...)` | `string` | Spinner, stays until replaced or dismissed. |
| `toast.promise(promise, messages, style?)` | `Promise<T>` | Loading → success / error in one card. |
| `toast.dismiss(id?)` | `void` | Dismiss one toast, or all of them. |
| `toast.dismissAll()` | `void` | Dismiss everything. |

### Promises

```tsx
toast.promise(saveSettings(), {
  loading: "Saving your preferences...",
  success: (data) => `Saved at ${data.timestamp}`,
  error: (err) => `Failed: ${err.message}`,
});
```

### Updating a toast in place

```tsx
const id = "sync";

toast.loading("Syncing records...", { id });
await syncRecords();
toast.success("All records up to date", { id });
```

---

## `<Toaster />` props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `position` | `ToastPosition` | `"top-right"` | Default anchor. |
| `duration` | `number` | `4000` | Default auto dismiss time. |
| `gap` | `number` | `12` | Space between stacked cards. |
| `offset` | `number \| string` | `16` | Distance from the screen edge. |
| `closable` | `boolean` | `true` | Default close button. |
| `progressBar` | `boolean` | `false` | Default countdown bar. |
| `style` | `CSSProperties` | — | Base css merged into every toast. |

---

## Development

```bash
npm install
npm run dev
npm run build
```

## License

MIT
