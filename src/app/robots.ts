import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// defines crawl permissions for search engines
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ztoast.dev/sitemap.xml",
  };
}
