import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// generates dynamic xml sitemap for search engines
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ztoast.onrender.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
