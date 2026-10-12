/**
 * 사이트 전역 설정. SEO 메타데이터, JSON-LD, 내비게이션이 모두 이 파일을 참조합니다.
 * 회사 정보가 확정되면 이 파일만 수정하면 됩니다.
 */

/** 배포 도메인. 확정되면 NEXT_PUBLIC_SITE_URL 환경변수에 넣어 주세요. (예: https://joeun.co.kr) */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  return "http://localhost:3000";
}

/** Vercel 프리뷰 배포가 검색에 노출되지 않도록, 프로덕션(또는 비-Vercel 환경)에서만 색인 허용 */
export const isIndexable =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

export const siteConfig = {
  name: "조은상사",
  nameEn: "JoeunCompany",
  /** 검색엔진이 같은 회사로 인식하도록 알려주는 다른 이름들 */
  alternateNames: ["JoeunCompany", "Joeun Company", "JJ"],
  url: resolveSiteUrl(),
  locale: "ko_KR",
  language: "ko",

  /** 기본 title (홈) */
  title: "조은상사 | 크린룸 제품 · 반도체 후처리",
  /** 각 페이지 title 에 붙는 접미사 */
  titleTemplate: "%s | 조은상사",
  description:
    "조은상사(JoeunCompany, JJ)는 크린룸 관련 제품 공급과 반도체 후처리 서비스를 제공합니다. 반도체 산업 현장에 필요한 크린룸 제품과 후처리 솔루션을 상담해 보세요.",

  keywords: [
    "조은상사",
    "JoeunCompany",
    "Joeun Company",
    "JJ",
    "크린룸",
    "클린룸",
    "크린룸 제품",
    "크린룸 관련 제품",
    "반도체",
    "반도체 후처리",
    "반도체 후처리 서비스",
  ],

  /** 콘텐츠를 실제로 수정한 날짜. sitemap 의 lastModified 에 사용 (빌드 시각이 아니라 실제 변경일을 쓰는 게 SEO 상 정확) */
  lastUpdated: "2026-10-12",

  /** 외부 노출 연락처. 비워 두면 화면/JSON-LD 에서 자동으로 생략됩니다. */
  contact: {
    phone: "",
    email: "",
    address: "",
  } as { phone: string; email: string; address: string },

  /** 공식 SNS·블로그·네이버 플레이스 등 URL (JSON-LD sameAs 에 사용) */
  sameAs: [] as string[],

  /** 검색엔진 소유 확인 코드 (환경변수로 주입) */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION,
  },
} as const;

export const navigation = [
  { href: "/about", label: "회사소개" },
  { href: "/products", label: "크린룸 제품" },
  { href: "/semiconductor", label: "반도체 후처리" },
  { href: "/contact", label: "문의하기" },
] as const;

/**
 * 크린룸 제품 카테고리 (초안).
 * TODO: 실제 취급 품목으로 교체하세요.
 */
export const productCategories = [
  {
    name: "크린룸 소모품",
    description: "크린룸 작업 환경에서 사용하는 소모성 용품",
  },
  {
    name: "크린룸 보호구·의류",
    description: "작업자와 공정을 보호하기 위한 착용 용품",
  },
  {
    name: "크린룸 청소·세정 용품",
    description: "청정 환경 유지를 위한 청소 및 세정 용품",
  },
] as const;
