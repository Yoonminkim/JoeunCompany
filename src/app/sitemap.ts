import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "yearly", priority: 0.7 },
  { path: "/products", changeFrequency: "monthly", priority: 0.9 },
  { path: "/semiconductor", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    // 빌드 시각이 아닌 실제 콘텐츠 수정일 (lib/site.ts 의 lastUpdated)
    lastModified: siteConfig.lastUpdated,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
