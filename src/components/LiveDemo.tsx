"use client";

import { useState } from "react";
import { toast, type ToastPosition } from "@/lib/ztoast";
import { CodeSnippet } from "./CodeSnippet";

interface DemoItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "basic" | "lifecycle" | "styling";
  code: string;
  trigger: (position: ToastPosition) => void;
}

// card component for triggering a demo toast
function DemoCard({
  item,
  isActive,
  onSelect,
  position,
}: {
  item: DemoItem;
  isActive: boolean;
  onSelect: () => void;
  position: ToastPosition;
}) {
  return (
    <div
      onClick={() => {
        onSelect();
        item.trigger(position);
      }}
      className="glass-panel-interactive"
      style={{
        padding: "16px",
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        borderColor: isActive ? "var(--border-active)" : undefined,
        background: isActive ? "rgba(99, 102, 241, 0.08)" : undefined,
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: isActive ? "#a5b4fc" : "var(--text-secondary)",
        }}
      >
        {item.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "4px",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "14px", color: "#ffffff" }}>
            {item.title}
          </span>
          <span
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              background: "rgba(255, 255, 255, 0.04)",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            Click to test
          </span>
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-secondary)",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

// interactive demo section featuring position switching and live code sync
export function LiveDemo() {
  const [currentPosition, setCurrentPosition] = useState<ToastPosition>("top-right");
  const [activeDemoId, setActiveDemoId] = useState<string>("success");

  const positions: ToastPosition[] = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  const demoItems: DemoItem[] = [
    {
      id: "success",
      title: "Success Toast",
      description: "Standard success notification with emerald badge",
      category: "basic",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      code: `toast.success("Project deployed successfully", {
  position: "${currentPosition}",
  duration: 4000,
});`,
      trigger: (pos) => {
        toast.success("Project deployed successfully", {
          position: pos,
          duration: 4000,
        });
      },
    },
    {
      id: "error",
      title: "Error Notification",
      description: "Assertive alert with red accent and aria-live='assertive'",
      category: "basic",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
      code: `toast.error("Build failed with 2 errors", {
  description: "Check typescript compilation logs.",
  position: "${currentPosition}",
  duration: 5000,
});`,
      trigger: (pos) => {
        toast.error("Build failed with 2 errors", {
          description: "Check typescript compilation logs.",
          position: pos,
          duration: 5000,
        });
      },
    },
    {
      id: "info",
      title: "Info Notice",
      description: "Informative notice for non-critical app updates",
      category: "basic",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
      code: `toast.info("New update available", {
  description: "Version 2.4 is ready to install.",
  position: "${currentPosition}",
});`,
      trigger: (pos) => {
        toast.info("New update available", {
          description: "Version 2.4 is ready to install.",
          position: pos,
        });
      },
    },
    {
      id: "warning",
      title: "Warning Alert",
      description: "Attention notice for expiring sessions or limits",
      category: "basic",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      code: `toast.warning("Approaching storage limit", {
  description: "You have used 88% of your available disk space.",
  position: "${currentPosition}",
});`,
      trigger: (pos) => {
        toast.warning("Approaching storage limit", {
          description: "You have used 88% of your available disk space.",
          position: pos,
        });
      },
    },
    {
      id: "loading",
      title: "Loading Spinner",
      description: "Persistent spinner that remains active until dismissed",
      category: "basic",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "ztoast-spin 1s linear infinite" }}>
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ),
      code: `const id = toast.loading("Processing transaction...", {
  position: "${currentPosition}",
});

// dismiss later with:
// toast.dismiss(id);`,
      trigger: (pos) => {
        toast.loading("Processing transaction...", {
          position: pos,
        });
      },
    },
    {
      id: "progress",
      title: "Countdown Progress Bar",
      description: "Animated countdown bar with frame-perfect pause on hover",
      category: "lifecycle",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      code: `toast.success("File uploaded to S3", {
  description: "Hover over this toast to pause countdown.",
  progressBar: true,
  progressColor: "#a855f7",
  duration: 6000,
  position: "${currentPosition}",
});`,
      trigger: (pos) => {
        toast.success("File uploaded to S3", {
          description: "Hover over this toast to pause countdown.",
          progressBar: true,
          progressColor: "#a855f7",
          duration: 6000,
          position: pos,
        });
      },
    },
    {
      id: "promise",
      title: "Promise Lifecycle",
      description: "Seamless loading to success or error state transition",
      category: "lifecycle",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2v6h-6" />
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M3 22v-6h6" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        </svg>
      ),
      code: `await toast.promise(
  api.uploadDocument(file),
  {
    loading: "Saving document...",
    success: (doc) => \`Saved "\${doc.title}" successfully\`,
    error: (err) => \`Upload failed: \${err.message}\`,
  },
  {
    position: "${currentPosition}",
    progressBar: true,
    duration: 4000,
  }
);`,
      trigger: (pos) => {
        const dummyPromise = new Promise<{ title: string }>((resolve, reject) => {
          setTimeout(() => {
            const isOk = Math.random() > 0.35;
            if (isOk) resolve({ title: "Invoice_2026.pdf" });
            else reject(new Error("Network timeout after 1500ms"));
          }, 1600);
        });

        toast.promise(
          dummyPromise,
          {
            loading: "Saving document...",
            success: (doc) => `Saved "${doc.title}" successfully`,
            error: (err) => `Upload failed: ${(err as Error).message}`,
          },
          {
            position: pos,
            progressBar: true,
            duration: 4000,
          }
        );
      },
    },
    {
      id: "inplace",
      title: "In-Place Update via ID",
      description: "Replaces existing toast in place without layout jumps",
      category: "lifecycle",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
      code: `const syncId = "database-sync";

// 1. start with loading state
toast.loading("Syncing database tables...", {
  id: syncId,
  position: "${currentPosition}",
});

// 2. update in place when done
setTimeout(() => {
  toast.success("All 14 tables synced!", {
    id: syncId,
    duration: 3000,
    progressBar: true,
  });
}, 1500);`,
      trigger: (pos) => {
        const syncId = "database-sync-demo";
        toast.loading("Syncing database tables...", {
          id: syncId,
          position: pos,
        });
        setTimeout(() => {
          toast.success("All 14 tables synced!", {
            id: syncId,
            duration: 3000,
            progressBar: true,
          });
        }, 1500);
      },
    },
    {
      id: "actions",
      title: "Interactive Action Buttons",
      description: "Embed JSX buttons and callbacks directly inside message",
      category: "styling",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 9 5 12 1.8-5.2L21 14Z" />
          <path d="M7.2 2.2 8 5.1" />
          <path d="m5.1 8-2.9-.8" />
          <path d="M14 4.1 12 6" />
          <path d="m6 12-1.9 2" />
        </svg>
      ),
      code: `toast.show(
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: "12px" }}>
    <span>Item archived</span>
    <button
      onClick={() => toast.success("Undo successful!")}
      style={{
        background: "#6366f1",
        color: "#ffffff",
        border: "none",
        padding: "4px 10px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "12px",
      }}
    >
      Undo
    </button>
  </div>,
  {
    position: "${currentPosition}",
    duration: 6000,
    progressBar: true,
  }
);`,
      trigger: (pos) => {
        toast.show(
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: "12px",
            }}
          >
            <span>Item archived</span>
            <button
              type="button"
              onClick={() => toast.success("Undo successful!")}
              style={{
                background: "#6366f1",
                color: "#ffffff",
                border: "none",
                padding: "4px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "12px",
              }}
            >
              Undo
            </button>
          </div>,
          {
            position: pos,
            duration: 6000,
            progressBar: true,
          }
        );
      },
    },
    {
      id: "gradient",
      title: "Gradient & Custom Popover",
      description: "Rich custom background gradient, glowing border and shadow",
      category: "styling",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      ),
      code: `toast.show("Pro plan unlocked", {
  description: "Unlimited cloud sync and audit logs enabled.",
  backgroundGradient: "linear-gradient(135deg, #2e0854, #18052b)",
  borderColor: "#a855f7",
  borderWidth: "1px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px -5px rgba(168, 85, 247, 0.4)",
  textColor: "#faf5ff",
  progressColor: "#c084fc",
  progressBar: true,
  duration: 5000,
  position: "${currentPosition}",
});`,
      trigger: (pos) => {
        toast.show("Pro plan unlocked", {
          description: "Unlimited cloud sync and audit logs enabled.",
          backgroundGradient: "linear-gradient(135deg, #2e0854, #18052b)",
          borderColor: "#a855f7",
          borderWidth: "1px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px -5px rgba(168, 85, 247, 0.4)",
          textColor: "#faf5ff",
          progressColor: "#c084fc",
          progressBar: true,
          duration: 5000,
          position: pos,
        });
      },
    },
  ];

  const activeDemo = demoItems.find((d) => d.id === activeDemoId) || demoItems[0];

  return (
    <section id="demos" style={{ padding: "80px 0", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="container-custom">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="badge-pill" style={{ marginBottom: "12px" }}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            <span>Interactive Demo Suite</span>
          </div>
          <h2 style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Test all toast varieties live.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
            Select any position anchor below, then click a card to trigger the notification and inspect the exact snippet.
          </p>
        </div>

        {/* position selector matrix */}
        <div
          className="glass-panel"
          style={{
            padding: "20px",
            marginBottom: "36px",
            maxWidth: "680px",
            margin: "0 auto 36px auto",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: "12px",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Viewport Anchor Position: <span style={{ color: "#a5b4fc" }}>{currentPosition}</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
            }}
          >
            {positions.map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => {
                  setCurrentPosition(pos);
                  toast.info(`Switched anchor to ${pos}`, {
                    position: pos,
                    duration: 2000,
                  });
                }}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  background: currentPosition === pos ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                  border: currentPosition === pos ? "1px solid #6366f1" : "1px solid var(--border-subtle)",
                  color: currentPosition === pos ? "#ffffff" : "var(--text-secondary)",
                  fontWeight: currentPosition === pos ? 600 : 500,
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "center",
                }}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* grid layout: demo cards on left, code preview on right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* list of demo trigger cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", paddingLeft: "4px" }}>
              CLICK ANY DEMO CARD TO TRIGGER:
            </div>
            {demoItems.map((item) => (
              <DemoCard
                key={item.id}
                item={item}
                isActive={activeDemoId === item.id}
                onSelect={() => setActiveDemoId(item.id)}
                position={currentPosition}
              />
            ))}
          </div>

          {/* sticky live code display */}
          <div style={{ position: "sticky", top: "84px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "12px", paddingLeft: "4px" }}>
              SYNCHRONIZED CODE SNIPPET:
            </div>
            <CodeSnippet
              code={activeDemo.code}
              filename={`${activeDemo.id}.tsx`}
              language="tsx"
            />
            <div
              className="glass-panel"
              style={{
                marginTop: "16px",
                padding: "16px",
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              <div style={{ fontWeight: 600, color: "#ffffff", marginBottom: "4px" }}>
                Feature Details: {activeDemo.title}
              </div>
              <div>{activeDemo.description}. All styles are applied via sanitized inline styles with zero external CSS dependencies.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
