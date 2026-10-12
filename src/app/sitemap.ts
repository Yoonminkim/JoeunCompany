import type { MetadataRoute } from "next";
import { servicePath, services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

const staticRoutes: {
  path: string;
  changeFrequency: Entry["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "yearly", priority: 0.7 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = services.map((service) => ({
    path: servicePath(service.slug),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    // 빌드 시각이 아닌 실제 콘텐츠 수정일 (lib/site.ts 의 lastUpdated)
    lastModified: siteConfig.lastUpdated,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
