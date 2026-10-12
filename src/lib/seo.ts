import type { Metadata } from "next";
import { servicePath, services, type Service } from "./services";
import { siteConfig } from "./site";

export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} - 반도체 장비 후처리 · 주문제작 · 크린룸 제품`,
};

type PageSeo = {
  title: string;
  description: string;
  /** 사이트 루트 기준 경로. canonical / og:url 에 사용됩니다. (예: "/about") */
  path: string;
  keywords?: string[];
  /** 공유 이미지 경로(public 기준, 1200×630 권장). 생략하면 사이트 기본 이미지 */
  image?: string;
  /** true 이면 title 템플릿("%s | 조은상사")을 적용하지 않습니다. (홈 전용) */
  absoluteTitle?: boolean;
};

/**
 * 페이지별 메타데이터 생성 헬퍼.
 *
 * Next.js 는 자식 세그먼트가 `openGraph` 를 정의하면 부모의 openGraph 를 통째로 덮어씁니다.
 * siteName / locale / images 가 누락되지 않도록 모든 페이지가 이 함수를 통해 만들게 합니다.
 */
export function createMetadata({
  title,
  description,
  path,
  keywords,
  image,
  absoluteTitle = false,
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const shareImage = image ? { ...ogImage, url: image } : ogImage;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords && { keywords }),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  };
}

const absoluteUrl = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`;

/** 회사(조직) 구조화 데이터 */
export function organizationJsonLd() {
  const { contact, sameAs } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: [...siteConfig.alternateNames],
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    knowsAbout: services.map((service) => service.name),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: contact.address,
            addressCountry: "KR",
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs: [...sameAs] } : {}),
  };
}

/** 웹사이트 구조화 데이터. 구글 검색결과의 "사이트 이름" 판단에 쓰입니다. (홈에만 배치) */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: [...siteConfig.alternateNames],
    url: siteConfig.url,
    inLanguage: "ko-KR",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

/** 빵부스러기(breadcrumb) 구조화 데이터. 홈은 자동으로 첫 항목에 추가됩니다. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const all = [{ name: siteConfig.name, path: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** 제품·서비스 상세 페이지용 Service 구조화 데이터 (취급 품목이 있으면 OfferCatalog 로 함께 표기) */
export function serviceJsonLd(service: Service) {
  const url = absoluteUrl(servicePath(service.slug));

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.seo.description ?? service.summary,
    url,
    provider: { "@id": `${siteConfig.url}/#organization` },
    ...(service.products && service.products.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.name} 취급 품목`,
            itemListElement: service.products.map((product) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: product.name,
                description: product.description,
              },
            })),
          },
        }
      : {}),
  };
}
