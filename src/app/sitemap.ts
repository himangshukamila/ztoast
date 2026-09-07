import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// generates dynamic xml sitemap for search engines
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ztoast.dev",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
