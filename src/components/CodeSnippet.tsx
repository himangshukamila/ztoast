"use client";

import { useState } from "react";

interface CodeSnippetProps {
  code: string;
  language?: string;
  filename?: string;
}

// displays formatted code with a one click copy button
export function CodeSnippet({
  code,
  language = "tsx",
  filename,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback in case clipboard api is unavailable
    }
  };

  return (
    <div
      style={{
        background: "#0c0c0e",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          background: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          fontSize: "12px",
          color: "var(--text-muted)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#ef4444",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#f59e0b",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
              display: "inline-block",
            }}
          />
          {filename && (
            <span style={{ marginLeft: "6px", color: "var(--text-secondary)" }}>
              {filename}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.05em" }}>
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            style={{
              background: "transparent",
              border: "none",
              color: copied ? "#10b981" : "var(--text-secondary)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              padding: "4px 8px",
              borderRadius: "6px",
              transition: "all 0.15s ease",
            }}
            title="copy code to clipboard"
          >
            {copied ? (
              <>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ color: "#10b981" }}>copied</span>
              </>
            ) : (
              <>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <span>copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <pre
        style={{
          margin: 0,
          padding: "16px",
          overflowX: "auto",
          fontSize: "13px",
          lineHeight: 1.6,
          color: "#e4e4e7",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
