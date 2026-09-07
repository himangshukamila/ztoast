import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/lib/ztoast";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ztoast.onrender.com"
  ),
  title: "ztoast — The Best Toast in Town",
  description:
    "Smoking hot, zero-dependency React notifications with countdown progress bars, pause on hover, promise lifecycles, and customizable styles.",
  keywords: [
    "react toast",
    "toast notification",
    "react toaster",
    "ztoast",
    "zero dependency toast",
    "react hot toast alternative",
  ],
  authors: [{ name: "Himangshu Kamila" }],
  openGraph: {
    title: "ztoast — The Best Toast in Town",
    description:
      "Smoking hot, zero-dependency React notifications with countdown progress bars, pause on hover, and promise tracking.",
    type: "website",
  },
  icons: {
    icon: "/fevicon.svg",
    shortcut: "/fevicon.svg",
    apple: "/fevicon.svg",
  },
};

// root layout mounting global toaster and fonts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Toaster defaultPosition="top-right" defaultDuration={4000}>
          {children}
        </Toaster>
      </body>
    </html>
  );
}
