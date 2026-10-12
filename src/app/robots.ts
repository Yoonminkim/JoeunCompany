import type { MetadataRoute } from "next";
import { isIndexable, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // 프리뷰 배포 등 프로덕션이 아닌 환경은 크롤링 전체 차단
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
