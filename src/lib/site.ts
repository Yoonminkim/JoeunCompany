/**
 * 사이트 전역 설정. SEO 메타데이터, JSON-LD, 내비게이션이 모두 이 파일을 참조합니다.
 * 회사 정보가 확정되면 이 파일만 수정하면 됩니다.
 */

/** 공식 도메인 (www 없는 주소가 기준. www 는 이 주소로 리다이렉트해 주세요) */
const PRODUCTION_URL = "https://joeunill.com";

/**
 * 사이트 기준 URL (canonical, sitemap, Open Graph, JSON-LD 에 사용).
 * NEXT_PUBLIC_SITE_URL 로 덮어쓸 수 있고, 지정하지 않으면
 * 프로덕션 빌드는 공식 도메인, 개발 모드는 localhost 를 사용합니다.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  return process.env.NODE_ENV === "production"
    ? PRODUCTION_URL
    : "http://localhost:3000";
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
  title: "조은상사 | 반도체 장비 후처리 · 주문제작 · 크린룸 관련 제품",
  /** 각 페이지 title 에 붙는 접미사 */
  titleTemplate: "%s | 조은상사",
  description:
    "조은상사(JoeunCompany, JJ)는 반도체 장비 후처리, 알루미늄·SUS403 제품 주문제작, 용접·샌딩, 크린룸 관련 제품(마스크, 면봉, 테프론·세라믹 제작, 특수 테이프, 각종 약품)을 취급합니다.",

  keywords: [
    "조은상사",
    "JoeunCompany",
    "Joeun Company",
    "JJ",
    "반도체",
    "반도체 장비 후처리",
    "반도체 후처리",
    "알루미늄 주문제작",
    "SUS403",
    "용접",
    "샌딩",
    "크린룸",
    "클린룸",
    "크린룸 제품",
    "크린룸 관련 제품",
    "테프론 제작",
    "PTFE",
    "세라믹 제작",
    "특수 테이프",
  ],

  /** 콘텐츠를 실제로 수정한 날짜. sitemap 의 lastModified 에 사용 (빌드 시각이 아니라 실제 변경일을 쓰는 게 SEO 상 정확) */
  lastUpdated: "2026-10-12",

  /** 외부 노출 연락처. 비워 두면 화면/JSON-LD 에서 자동으로 생략됩니다. */
  contact: {
    phone: "02-478-3514",
    fax: "02-478-3525",
    email: "joeunill1@naver.com",
    address: "서울특별시 송파구 올림픽로51길 32",
    /** 구조화 데이터(PostalAddress)용 주소 구성요소 */
    addressParts: {
      region: "서울특별시",
      locality: "송파구",
      street: "올림픽로51길 32",
    },
  } as {
    phone: string;
    fax: string;
    email: string;
    address: string;
    addressParts?: { region: string; locality: string; street: string };
  },

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
  { href: "/services", label: "제품·서비스" },
  { href: "/contact", label: "문의하기" },
] as const;
