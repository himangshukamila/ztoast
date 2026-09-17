"use client";

import { useState } from "react";
import { Rocket } from "lucide-react";
import { toast } from "ztoast";
import { CodeSnippet } from "./CodeSnippet";

interface ExampleItem {
  id: string;
  name: string;
  icon: string;
  code: string;
  trigger: () => void;
}

// a plain function component, ztoast calls it with { size, color }
function SparkIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2Z" />
    </svg>
  );
}

// interactive examples, every snippet is exactly what the button runs
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
      name: "Icon",
      icon: "👏",
      code: `// the icon is the optional second argument
toast.success("Good job!", "👏");`,
      trigger: () => {
        toast.success("Good job!", "👏");
      },
    },
    {
      id: "element-icon",
      name: "Icon element",
      icon: "🚀",
      code: `import { Rocket } from "lucide-react";

// icon sets built on forwardRef (lucide, heroicons) go in as elements
toast.info("New version available", <Rocket size={18} />);`,
      trigger: () => {
        toast.info("New version available", <Rocket size={18} />);
      },
    },
    {
      id: "component-icon",
      name: "Icon component",
      icon: "✨",
      code: `// a plain function component is called for you with { size: 18, color }
function SparkIcon({ size, color }: { size?: number; color?: string }) {
  return <svg width={size} height={size} stroke={color} {...} />;
}

toast.success("Rendered with the variant colour", SparkIcon);`,
      trigger: () => {
        toast.success("Rendered with the variant colour", SparkIcon);
      },
    },
    {
      id: "no-icon",
      name: "No icon",
      icon: "🫥",
      code: `toast.show("Clean and quiet", false);`,
      trigger: () => {
        toast.show("Clean and quiet", false);
      },
    },
    {
      id: "styled",
      name: "Styled",
      icon: "🎨",
      code: `toast.success("Project saved", "💾", {
  bgColor: "#052e16",
  textColor: "#dcfce7",
  radius: 18,
  width: 360,
});`,
      trigger: () => {
        toast.success("Project saved", "💾", {
          bgColor: "#052e16",
          textColor: "#dcfce7",
          radius: 18,
          width: 360,
        });
      },
    },
    {
      id: "gradient",
      name: "Gradient",
      icon: "🌈",
      code: `// bgColor takes anything css background takes
toast.show("Plan upgraded", "✨", {
  bgColor: "linear-gradient(135deg, #1e1b4b, #4338ca)",
  textColor: "#e0e7ff",
  border: "1px solid #6366f1",
  description: "Gradients, colours and url() all work.",
});`,
      trigger: () => {
        toast.show("Plan upgraded", "✨", {
          bgColor: "linear-gradient(135deg, #1e1b4b, #4338ca)",
          textColor: "#e0e7ff",
          border: "1px solid #6366f1",
          description: "Gradients, colours and url() all work.",
        });
      },
    },
    {
      id: "light",
      name: "Light theme",
      icon: "☀️",
      code: `// theme is the palette for anything you do not set, default "dark"
toast.warning("Approaching your storage limit", {
  theme: "light",
  duration: 6000,
});`,
      trigger: () => {
        toast.warning("Approaching your storage limit", {
          theme: "light",
          duration: 6000,
        });
      },
    },
    {
      id: "size",
      name: "Size & font",
      icon: "📐",
      code: `toast.show("Sized exactly how I want it", "📐", {
  width: 380,
  height: 92,
  fontSize: 15,
  fontWeight: 700,
  padding: "18px 20px",
});`,
      trigger: () => {
        toast.show("Sized exactly how I want it", "📐", {
          width: 380,
          height: 92,
          fontSize: 15,
          fontWeight: 700,
          padding: "18px 20px",
        });
      },
    },
    {
      id: "progress",
      name: "Countdown",
      icon: "⏱",
      code: `// progress and pauseOnHover are both on by default
toast.success("File uploaded", {
  duration: 6000,
  progressColor: "#6366f1",
  description: "Hover me, the countdown freezes.",
});`,
      trigger: () => {
        toast.success("File uploaded", {
          duration: 6000,
          progressColor: "#6366f1",
          description: "Hover me, the countdown freezes.",
        });
      },
    },
    {
      id: "no-progress",
      name: "No countdown",
      icon: "🚫",
      code: `toast.show("No bar, no pause", {
  progress: false,
  pauseOnHover: false,
});`,
      trigger: () => {
        toast.show("No bar, no pause", {
          progress: false,
          pauseOnHover: false,
        });
      },
    },
    {
      id: "motion",
      name: "Motion",
      icon: "🎞",
      code: `toast.show("Slow, from the left", "🎞", {
  motion: {
    enter: 900,
    exit: 500,
    slide: 40,
    scale: 0.8,
    blur: 6,
    from: "left",
  },
});`,
      trigger: () => {
        toast.show("Slow, from the left", "🎞", {
          motion: {
            enter: 900,
            exit: 500,
            slide: 40,
            scale: 0.8,
            blur: 6,
            from: "left",
          },
        });
      },
    },
    {
      id: "promise",
      name: "Promise",
      icon: "⏳",
      code: `// returns the original promise, so you can await it
toast.promise(uploadFile(), {
  loading: "Uploading file...",
  success: (data) => \`Uploaded \${data.name}\`,
  error: (err) => \`Failed: \${(err as Error).message}\`,
});`,
      trigger: () => {
        const uploadFile = () =>
          new Promise<{ name: string }>((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 0.3) resolve({ name: "report.pdf" });
              else reject(new Error("network down"));
            }, 1600);
          });

        toast.promise(uploadFile(), {
          loading: "Uploading file...",
          success: (data) => `Uploaded ${data.name}`,
          error: (err) => `Failed: ${(err as Error).message}`,
        });
      },
    },
    {
      id: "inplace",
      name: "Replace in place",
      icon: "🔄",
      code: `const id = "sync";

toast.loading("Syncing records...", { id });

// later, same id keeps the slot and restarts the countdown
toast.success("All records up to date", { id });`,
      trigger: () => {
        const id = "sync-demo";
        toast.loading("Syncing records...", { id });
        setTimeout(() => {
          toast.success("All records up to date", { id });
        }, 1600);
      },
    },
    {
      id: "action",
      name: "Action button",
      icon: "🔩",
      code: `toast.show(
  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
    Saved to archive
    <button onClick={() => toast.success("Undone!")}>Undo</button>
  </span>,
  { duration: 6000 }
);`,
      trigger: () => {
        toast.show(
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            Saved to archive
            <button
              type="button"
              onClick={() => toast.success("Undone!")}
              style={{
                background: "#f5f5f4",
                color: "#1c1917",
                border: "none",
                padding: "4px 8px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Undo
            </button>
          </span>,
          { duration: 6000 }
        );
      },
    },
    {
      id: "persistent",
      name: "Persistent",
      icon: "📌",
      code: `const id = toast.loading("Deploying application...");

// nothing counts down, dismiss it yourself
toast.dismiss(id);`,
      trigger: () => {
        const id = toast.loading("Deploying application...");
        setTimeout(() => toast.dismiss(id), 3200);
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
