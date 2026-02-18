import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/caseStudies";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rvldo-porto.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const study of caseStudies) {
    pages.push({
      url: `${siteUrl}/work/${study.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return pages;
}
