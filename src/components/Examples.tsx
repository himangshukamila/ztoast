"use client";

import { useState } from "react";
import { toast } from "@/lib/ztoast";
import { CodeSnippet } from "./CodeSnippet";

interface ExampleItem {
  id: string;
  name: string;
  icon: string;
  code: string;
  trigger: () => void;
}

// interactive examples section matching the layout from react-hot-toast
export function Examples() {
  const [selectedId, setSelectedId] = useState<string>("success");

  const examples: ExampleItem[] = [
    {
      id: "success",
      name: "Success",
      icon: "✅",
      code: `toast.success("Successfully toasted!");`,
      trigger: () => {
        toast.success("Successfully toasted!");
      },
    },
    {
      id: "error",
      name: "Error",
      icon: "❌",
      code: `toast.error("This did not work.");`,
      trigger: () => {
        toast.error("This did not work.");
      },
    },
    {
      id: "icon",
      name: "Custom Icon",
      icon: "👏",
      code: `// the icon is just an optional second argument
toast.success("Good job!", "👏");`,
      trigger: () => {
        toast.success("Good job!", "👏");
      },
    },
    {
      id: "styled",
      name: "Any CSS",
      icon: "🎨",
      code: `// third argument is plain css, use any property you like
toast("Hello darkness!", "🌙", {
  background: "#18181b",
  color: "#f4f4f5",
  border: "1px solid #3f3f46",
  borderRadius: 16,
  fontFamily: "var(--font-mono)",
});`,
      trigger: () => {
        toast("Hello darkness!", "🌙", {
          background: "#18181b",
          color: "#f4f4f5",
          border: "1px solid #3f3f46",
          borderRadius: 16,
          fontFamily: "var(--font-mono)",
        });
      },
    },
    {
      id: "size",
      name: "Custom Size",
      icon: "📐",
      code: `// by default the card is only as wide as its content
toast("Sized exactly how I want it", "📐", {
  width: 380,
  height: 90,
  fontSize: 16,
  background: "linear-gradient(135deg, #1e1b4b, #4338ca)",
  color: "#e0e7ff",
});`,
      trigger: () => {
        toast("Sized exactly how I want it", "📐", {
          width: 380,
          height: 90,
          fontSize: 16,
          background: "linear-gradient(135deg, #1e1b4b, #4338ca)",
          color: "#e0e7ff",
        });
      },
    },
    {
      id: "anywhere",
      name: "Anywhere",
      icon: "📍",
      code: `// pass coordinates instead of an anchor name
toast("Dropped at 260px / 80px", "📍", {
  top: 260,
  left: 80,
  duration: 4000,
});`,
      trigger: () => {
        toast("Dropped at 260px / 80px", "📍", {
          top: 260,
          left: 80,
          duration: 4000,
        });
      },
    },
    {
      id: "promise",
      name: "Promise",
      icon: "⏳",
      code: `const myPromise = fetchData();

toast.promise(myPromise, {
  loading: "Loading data...",
  success: "Data loaded successfully!",
  error: "Error loading data",
});`,
      trigger: () => {
        const dummy = new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() > 0.3) resolve("done");
            else reject(new Error("Network failed"));
          }, 1500);
        });

        toast.promise(dummy, {
          loading: "Loading data...",
          success: "Data loaded successfully!",
          error: "Error loading data",
        });
      },
    },
    {
      id: "progress",
      name: "Progress Bar",
      icon: "⏱",
      code: `toast.success("File uploaded", {
  duration: 5000,
  progressBar: true,
  description: "Hover over this toast to pause countdown.",
});`,
      trigger: () => {
        toast.success("File uploaded", {
          duration: 5000,
          progressBar: true,
          description: "Hover over this toast to pause countdown.",
        });
      },
    },
    {
      id: "multiline",
      name: "Multi Line",
      icon: "↕️",
      code: `toast("This toast has multiple lines of text.", {
  description: "You can provide a secondary description line or any custom jsx component.",
  duration: 6000,
});`,
      trigger: () => {
        toast("This toast has multiple lines of text.", {
          description: "You can provide a secondary description line or any custom jsx component.",
          duration: 6000,
        });
      },
    },
    {
      id: "action",
      name: "Action Button",
      icon: "🔩",
      code: `toast(
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <span>Saved to archive</span>
    <button
      onClick={() => toast.success("Undone!")}
      style={{
        background: "#1c1917",
        color: "#ffffff",
        border: "none",
        padding: "4px 8px",
        borderRadius: "6px",
        fontSize: "12px",
        cursor: "pointer",
      }}
    >
      Undo
    </button>
  </div>
);`,
      trigger: () => {
        toast(
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>Saved to archive</span>
            <button
              type="button"
              onClick={() => toast.success("Undone successfully!")}
              style={{
                background: "#1c1917",
                color: "#ffffff",
                border: "none",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Undo
            </button>
          </div>,
          { duration: 5000 }
        );
      },
    },
    {
      id: "inplace",
      name: "In-Place Update",
      icon: "🔄",
      code: `const id = "sync-id";

toast.loading("Syncing...", { id });

// later in your async flow
toast.success("Synced successfully!", { id });`,
      trigger: () => {
        const syncId = "inplace-sync-demo";
        toast.loading("Syncing data...", { id: syncId });
        setTimeout(() => {
          toast.success("Synced successfully!", { id: syncId, duration: 3000 });
        }, 1500);
      },
    },
  ];

  const currentExample = examples.find((e) => e.id === selectedId) || examples[0];

  return (
    <section id="examples" style={{ padding: "40px 0 60px 0" }}>
      <div className="container-custom">
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
            color: "var(--text-main)",
          }}
        >
          Examples
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
            alignItems: "stretch",
          }}
        >
          {/* buttons column */}
          <div
            className="clean-card"
            style={{
              padding: "16px",
              background: "var(--bg-subtle)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              alignContent: "start",
            }}
          >
            {examples.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedId(item.id);
                  item.trigger();
                }}
                className="toast-btn"
                style={{
                  justifyContent: "flex-start",
                  padding: "10px 14px",
                  fontSize: "13px",
                  borderColor: selectedId === item.id ? "#1c1917" : "var(--border-subtle)",
                  backgroundColor: "#ffffff",
                  boxShadow: selectedId === item.id ? "0 2px 6px rgba(0,0,0,0.08)" : "var(--button-shadow)",
                  fontWeight: selectedId === item.id ? 700 : 600,
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* code column */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CodeSnippet code={currentExample.code} language="jsx" filename="example.tsx" />
          </div>
        </div>
      </div>
    </section>
  );
}
