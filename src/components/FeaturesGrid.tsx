"use client";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
}

// card component displaying an individual feature highlight
function FeatureCard({ feature }: { feature: FeatureItem }) {
  return (
    <div
      className="glass-panel"
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "rgba(99, 102, 241, 0.12)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#818cf8",
          }}
        >
          {feature.icon}
        </div>
        <span className="badge-pill" style={{ fontSize: "11px", padding: "2px 8px" }}>
          {feature.badge}
        </span>
      </div>

      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em" }}>
        {feature.title}
      </h3>

      <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
        {feature.description}
      </p>
    </div>
  );
}

// feature highlights grid covering the core strengths of ztoast
export function FeaturesGrid() {
  const features: FeatureItem[] = [
    {
      icon: (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
      ),
      title: "Zero Runtime Dependencies",
      description:
        "Built purely on React with zero external packages. Ships inline SVGs and standalone logic with an ultra-compact bundle footprint under 3.5KB.",
      badge: "0 Dependencies",
    },
    {
      icon: (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Frame-Perfect Progress Bar",
      description:
        "The animated countdown bar stays synchronized with user interaction. Freezes on hover or keyboard focus and smoothly resumes on leave.",
      badge: "Smart Timing",
    },
    {
      icon: (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2v6h-6" />
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M3 22v-6h6" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        </svg>
      ),
      title: "Native Promise Lifecycle",
      description:
        "Pass any async promise to toast.promise. Shows a loading spinner immediately, then replaces it in-place with the resolved or rejected result.",
      badge: "Async Ready",
    },
    {
      icon: (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: "Styled With Plain CSS",
      description:
        "The third argument is a normal React style object. Any css property you know already works, and explicit coordinates drop the toast exactly where you want it.",
      badge: "Full Control",
    },
    {
      icon: (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="16" x="4" y="4" rx="2" />
          <rect width="6" height="6" x="9" y="9" rx="1" />
          <path d="M15 2v2" />
          <path d="M15 20v2" />
          <path d="M2 15h2" />
          <path d="M2 9h2" />
          <path d="M20 15h2" />
          <path d="M20 9h2" />
          <path d="M9 2v2" />
          <path d="M9 20v2" />
        </svg>
      ),
      title: "Works Outside React",
      description:
        "Module-level store singleton allows firing notifications from plain TypeScript files, Axios interceptors, TanStack Query hooks, or Zustand stores.",
      badge: "Universal Store",
    },
    {
      icon: (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
          <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
      title: "Next.js & SSR Hydration Safe",
      description:
        "Portals mount on the client only, ensuring identical server and client markup to eliminate hydration mismatches in Next.js App Router and Remix.",
      badge: "SSR Safe",
    },
  ];

  return (
    <section id="features" style={{ padding: "80px 0", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="container-custom">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="badge-pill" style={{ marginBottom: "12px" }}>
            <span>Engine Architecture</span>
          </div>
          <h2 style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Engineered for reliability, speed, and security.
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
            Explore why ztoast provides the cleanest developer experience and the strongest security guarantees.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
