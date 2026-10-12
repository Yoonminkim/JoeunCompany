# 조은상사 (JoeunCompany) 홈페이지

Next.js (App Router) + TypeScript + Tailwind CSS 기반 회사 홈페이지입니다.
모든 페이지가 정적으로 생성되어 검색엔진이 완성된 HTML 을 바로 읽을 수 있습니다.

```bash
npm run dev     # 개발 서버 http://localhost:3000
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행
```

## 구조

| 경로 | 내용 |
| --- | --- |
| `src/lib/site.ts` | **회사명·설명·키워드·연락처·내비게이션 등 사이트 전역 설정 (여기만 고치면 SEO 전체에 반영)** |
| `src/lib/seo.ts` | 페이지 메타데이터 / JSON-LD(Organization, WebSite, BreadcrumbList) 생성 헬퍼 |
| `src/app/layout.tsx` | 전역 메타데이터, 소유확인 태그, 폰트 |
| `src/app/sitemap.ts`, `robots.ts` | `/sitemap.xml`, `/robots.txt` 자동 생성 |
| `src/app/{about,products,semiconductor,contact}` | 서브 페이지 |
| `public/og-image.png`, `public/logo.png`, `src/app/favicon.ico` | 임시 브랜드 이미지 (실제 로고로 교체 필요) |

새 페이지를 추가할 때는 `createMetadata()` 로 메타데이터를 만들고, `src/app/sitemap.ts` 의 `routes` 에 경로를 추가하세요.

## 배포 전 체크리스트

1. **도메인 설정** – `NEXT_PUBLIC_SITE_URL` 환경변수에 실제 도메인을 넣습니다. (`.env.example` 참고)
   빌드 시점에 반영되므로 배포 환경에도 빌드 전에 등록해야 합니다.
2. **연락처 입력** – `src/lib/site.ts` 의 `contact` (전화/이메일/주소). 입력하면 푸터·문의 페이지·JSON-LD 에 자동 반영됩니다.
3. **콘텐츠 확정** – 각 페이지 문구와 `productCategories` 는 초안입니다. 실제 취급 품목·서비스 내용으로 교체하세요.
4. **이미지 교체** – 로고, OG 이미지(1200×630), 파비콘.
5. **검색엔진 등록**
   - Google Search Console: 소유 확인 후 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 설정, `/sitemap.xml` 제출
   - 네이버 서치어드바이저: 소유 확인 후 `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` 설정, 사이트맵 제출 및 수집 요청
6. **구조화 데이터 검사** – [Rich Results Test](https://search.google.com/test/rich-results) 로 홈 URL 확인.

## 색인 정책

`VERCEL_ENV` 가 `production` 이 아닌 환경(Vercel 프리뷰 배포)에서는 `robots.txt` 와 `<meta name="robots">` 가
자동으로 크롤링을 차단합니다. 프로덕션 배포에서만 검색 노출됩니다.
