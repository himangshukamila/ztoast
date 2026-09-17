import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "ztoast";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ztoast.onrender.com";

const description =
  "Zero-dependency React toasts. Mount <Toaster /> once, then call toast.success(text, icon, style) from anywhere. Place a toast at any point on screen, with smooth motion and a countdown bar that pauses on hover.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ztoast — Toasts you can put anywhere",
  description,
  keywords: [
    "react toast",
    "toast notification",
    "react toaster",
    "ztoast",
    "zero dependency toast",
    "toast position",
    "react hot toast alternative",
  ],
  authors: [{ name: "Himangshu Kamila" }],
  openGraph: {
    title: "ztoast — Toasts you can put anywhere",
    description,
    url: siteUrl,
    siteName: "ztoast",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ztoast — Toasts you can put anywhere",
    description,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/fevicon.svg",
    shortcut: "/fevicon.svg",
    apple: "/fevicon.svg",
  },
};

// root layout, the whole setup is this single <Toaster /> mounted once
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
