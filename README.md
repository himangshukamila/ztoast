# ztoast

Smoking hot, zero-dependency React notifications.

`ztoast` is a lightweight, accessible, and highly customizable toast notification engine for React and Next.js. Weighing under 3.5kb gzipped, it delivers silky-smooth spring transitions, countdown progress bars, hardware-accelerated pause on hover, and full promise tracking with zero external dependencies.

---

## Features

- **Zero dependencies**: Built from scratch with vanilla React, zero third-party packages required.
- **Hot by default**: Clean, tactile card design with accessible ARIA roles (`status` and `alert`).
- **Smooth spring transitions**: Position-aware entrance and exit animations with natural physics.
- **Countdown progress bar**: Animated duration countdown that pauses automatically when the user hovers over the notification card.
- **Promise lifecycle tracking**: Automatically guides an asynchronous task from loading to success or failure.
- **Position matrix**: Supports 6 viewport coordinates (`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`).
- **In-place updates**: Pass an `id` to update any existing notification in place without jarring layout jumps.
- **Next.js & SSR safe**: Hydration-safe portal mounting compatible with React 19 and Next.js App Router.

---

## Installation

```bash
npm i ztoast
```

Alternatively with other package managers:

```bash
pnpm add ztoast
# or
yarn add ztoast
# or
bun add ztoast
```

---

## Quickstart

### 1. Add the Toaster to your root layout

Mount the `<Toaster />` component once at the top level of your application (for example, in your `app/layout.tsx` for Next.js App Router):

```tsx
import { Toaster } from "ztoast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster
          defaultPosition="top-right"
          defaultDuration={4000}
          defaultProgressBar={false}
          gap={12}
        />
        {children}
      </body>
    </html>
  );
}
```

### 2. Start toasting anywhere in your code

Trigger notifications from any client component or event handler:

```tsx
"use client";

import { toast } from "ztoast";

export function ActionButtons() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* default toast */}
      <button onClick={() => toast("Your draft has been saved.")}>
        Save Draft
      </button>

      {/* success toast with countdown bar */}
      <button
        onClick={() =>
          toast.success("Payment received!", {
            description: "Receipt sent to your email address.",
            progressBar: true,
            duration: 5000,
          })
        }
      >
        Pay Now
      </button>

      {/* error toast */}
      <button
        onClick={() =>
          toast.error("Unable to connect to server.", {
            description: "Please check your network settings.",
          })
        }
      >
        Simulate Error
      </button>
    </div>
  );
}
```

---

## API Reference

### `toast` Methods

| Method | Returns | Description |
| :--- | :--- | :--- |
| `toast(message, options?)` | `string \| number` | Fires a standard notification card with automatic id assignment. |
| `toast.success(message, options?)` | `string \| number` | Fires a success notification with an emerald checkmark badge. |
| `toast.error(message, options?)` | `string \| number` | Fires an assertive error notification with a coral red badge. |
| `toast.loading(message, options?)` | `string \| number` | Fires a persistent notification with a spinning loader arc. |
| `toast.promise(promise, messages, options?)` | `Promise<T>` | Tracks a promise through pending, resolved, and rejected states. |
| `toast.dismiss(id?)` | `void` | Dismisses a specific notification with an exit animation, or all active notifications if no id is passed. |

---

### `ToastOptions`

Pass an optional options object as the second argument to any `toast` method:

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `duration` | `number` | `4000` | Duration in milliseconds before automatic dismissal. Set to `Infinity` to keep persistent. |
| `description` | `ReactNode` | `undefined` | Secondary text or custom JSX rendered beneath the headline message. |
| `progressBar` | `boolean` | `false` | Renders a countdown bar at the bottom edge that pauses on hover. |
| `position` | `ToastPosition` | `defaultPosition` | Overrides the anchor coordinate (`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`). |
| `icon` | `ReactNode` | `variant icon` | Custom JSX element or emoji replacing the default status badge. |
| `id` | `string \| number` | `auto-generated` | Custom identifier. Reusing an existing id updates the notification in place. |
| `closable` | `boolean` | `true` | Renders a subtle close button on the top right of the card. |
| `onClose` | `() => void` | `undefined` | Callback invoked as soon as the toast begins its exit transition. |
| `progressColor` | `string` | `accent color` | Custom fill color for the countdown progress bar. |
| `background` | `string` | `"#ffffff"` | Custom background color for the toast card container. |
| `textColor` | `string` | `"#1c1917"` | Custom text color for the title and description content. |

---

### `<Toaster />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `defaultPosition` | `ToastPosition` | `"top-right"` | Global anchor coordinate across the 6 screen positions. |
| `defaultDuration` | `number` | `4000` | Global auto-dismiss duration in milliseconds. |
| `defaultProgressBar` | `boolean` | `false` | When enabled, every toast displays a countdown progress bar. |
| `gap` | `number` | `12` | Vertical spacing in pixels between stacked notifications. |
| `top` / `bottom` / `left` / `right` | `number \| string` | `16` | Pixel distance or CSS dimension from viewport boundaries. |

---

## Asynchronous Promise Tracking

`toast.promise` provides an intuitive way to track asynchronous workflows:

```tsx
import { toast } from "ztoast";

const updateUserData = async () => {
  const res = await fetch("/api/user", { method: "PUT" });
  if (!res.ok) throw new Error("Could not update user");
  return res.json();
};

// tracks pending state, resolved state, and rejected state
toast.promise(updateUserData(), {
  loading: "Saving updates to database...",
  success: (data) => `Profile for ${data.name} saved!`,
  error: (err) => `Failed: ${err.message}`,
});
```

---

## Updating Notifications In-Place

You can supply a custom `id` to replace an active notification without creating duplicates:

```tsx
import { toast } from "ztoast";

const syncId = "data-sync-task";

// step 1: show initial loading alert
toast.loading("Synchronizing records...", { id: syncId });

try {
  await syncRecords();
  // step 2: replace in place with success alert
  toast.success("All records up to date!", { id: syncId, duration: 4000 });
} catch (err) {
  // step 3: or replace in place with error alert
  toast.error("Sync failed. Check network.", { id: syncId });
}
```

---

## Development

Run the showcase and documentation site locally:

```bash
# install dependencies
npm install

# run development server
npm run dev

# build optimized production bundle
npm run build
```

---

## License

MIT
