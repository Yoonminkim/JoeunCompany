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
| `src/lib/services.ts` | **제품·서비스 콘텐츠 (이름·부제목·설명·취급 품목·항목별 SEO). 여기에 항목을 추가하면 목록/상세 페이지, sitemap, 구조화 데이터가 자동 생성됩니다.** |
| `src/app/services`, `src/app/services/[slug]` | 제품·서비스 목록 / 상세 페이지 |
| `src/app/{about,contact}` | 회사소개, 문의하기 |
| `src/app/contact/actions.ts`, `src/components/contact-form.tsx` | 문의 폼 (서버 액션 + 서버 측 검증 + 스팸 방지 허니팟) |
| `src/lib/contact.ts`, `src/lib/mail.ts` | 문의 항목/검증 규칙, 메일 발송 (Resend) |
| `public/brand/logo-original.png` | 조은상사 공식 로고 원본 (투명 배경, 브랜드 색 `#492EA7`) |
| `public/brand/logo.png`, `logo-mark.png` | 원본에서 여백을 제거한 가로형 로고 / JJ 모노그램. 헤더·푸터에서 사용 |
| `public/logo.png`, `public/og-image.png`, `src/app/{favicon.ico,apple-icon.png}` | 로고에서 파생한 구조화 데이터용 로고, 공유(OG) 이미지, 아이콘 |

디자인 토큰(색상·폰트)은 `src/app/globals.css` 에서 관리합니다. 포인트 색은 로고의 보라색 한 가지만 사용합니다.

### 제품·서비스 항목 추가/수정

`src/lib/services.ts` 의 `services` 배열에 항목을 추가하면 됩니다. 항목마다 아래 값으로 검색 노출을 따로 설정할 수 있습니다.

```ts
seo: {
  title: "검색결과 제목",          // 뒤에 " | 조은상사" 자동 추가. 생략하면 name
  description: "검색결과 설명",     // 생략하면 summary
  keywords: ["키워드1", "키워드2"],
  image: "/og/welding.png",        // 공유 이미지(선택, public 기준, 1200×630)
}
```

그 밖의 일반 페이지를 추가할 때는 `createMetadata()` 로 메타데이터를 만들고, `src/app/sitemap.ts` 의 `staticRoutes` 에 경로를 추가하세요.

## 배포 전 체크리스트

1. **도메인 연결** – 공식 도메인은 `joeunill.com` 이며 프로덕션 빌드의 기준 URL 로 이미 설정돼 있습니다. (`src/lib/site.ts`)
   배포 후 호스팅에 `joeunill.com` 을 연결하고 DNS 를 설정하세요. `www.joeunill.com` 은 `joeunill.com` 으로 리다이렉트하는 것을 권장합니다.
   (다른 주소로 빌드하려면 `NEXT_PUBLIC_SITE_URL` 환경변수를 사용)
2. **연락처** – `src/lib/site.ts` 의 `contact` (전화/팩스/이메일/주소). 푸터·문의 페이지·JSON-LD 에 자동 반영됩니다. 현재 대표 이메일은 `joeunill1@naver.com` 입니다.
3. **콘텐츠 확정** – `src/lib/services.ts` 의 설명 문구는 초안입니다. 실제 작업 범위·규격·가능 소재에 맞게 확인/수정하세요.
4. **이미지 확인** – 로고 원본이 바뀌면 `public/brand/` 의 파일과 OG 이미지, 파비콘을 다시 생성해야 합니다. 벡터(SVG) 원본이 있으면 더 선명하게 쓸 수 있습니다.
5. **문의 폼 메일 설정** – 아래 환경변수를 등록해야 프로덕션에서 문의가 접수됩니다. 미설정 시 폼은 "접수 불가" 안내를 보여 줍니다.
   - `RESEND_API_KEY`: [Resend](https://resend.com) API 키 (필수)
   - `CONTACT_TO_EMAIL`: 문의를 받을 이메일 (선택, 쉼표로 여러 명 가능). 비워 두면 대표 이메일로 받습니다.
   - `CONTACT_FROM_EMAIL`: 발신자 (선택). Resend 에서 `joeunill.com` 도메인을 인증한 뒤 `조은상사 홈페이지 <noreply@joeunill.com>` 형태로 사용하세요.
   - 개인정보 수집·이용 안내 문구는 `src/lib/contact.ts` 의 `privacyNotice` 에 있으며, 회사 방침에 맞게 확인이 필요합니다.
6. **검색엔진 등록**
   - Google Search Console: 소유 확인 후 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 설정, `/sitemap.xml` 제출
   - 네이버 서치어드바이저: 소유 확인 후 `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` 설정, 사이트맵 제출 및 수집 요청
7. **구조화 데이터 검사** – [Rich Results Test](https://search.google.com/test/rich-results) 로 홈 URL 확인.

## 이미지 출처

`public/images/` 의 사진은 **회사의 실제 작업 사진이 아닌 참고용 스톡 이미지**입니다. 모두 상업적 이용이 가능하고
출처 표기 의무가 없는 라이선스이며, 사이트에는 "참고 이미지"로 표시됩니다. (출처 데이터는 `src/lib/services.ts` 의 `images`)

| 파일 | 용도 | 출처 | 라이선스 |
| --- | --- | --- | --- |
| `cleanroom-fab.jpg` | 반도체 장비 후처리 | [NASA Glenn Research Center / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Clean_room.jpg) | Public domain |
| `cleanroom-corridor.jpg` | 홈 배너 | [Tima Miroshnichenko / Pexels](https://www.pexels.com/photo/man-technology-tiles-white-9574538/) | Pexels License |
| `fabrication-cutting.jpg` | 제품 주문제작 | [Ana Victoria Valverde / Pexels](https://www.pexels.com/photo/plasma-cutting-in-factory-17180807/) | Pexels License |
| `welding.jpg` | 용접 | [Valentin Saumon / Pexels](https://www.pexels.com/photo/a-person-wearing-a-protective-head-shield-welding-metals-9130186/) | Pexels License |
| `sanding-grinder.jpg` | 샌딩 | [Guduru Ajay bhargav / Pexels](https://www.pexels.com/photo/person-using-green-and-grey-angle-grinder-on-sheet-of-metal-977526/) | Pexels License |
| `cleanroom-supplies.jpg` | 크린룸 제품 | [Polina Tankilevitch / Pexels](https://www.pexels.com/photo/pastel-colored-face-masks-on-white-background-7337879/) | Pexels License |

취급 품목(크린룸 제품)의 예시 이미지는 `public/images/products/` 에 있습니다. (800×600, 4:3)

| 파일 | 품목 | 출처 | 라이선스 |
| --- | --- | --- | --- |
| `haircap.jpg` | 헤어캡 (청록색, 유사 예시) | [kaboompics.com / Pexels](https://www.pexels.com/photo/person-holding-a-bouffant-cap-8538701/) | Pexels License |
| `mask-white.jpg` | 마스크 | [Media Studio Hong Kong / Pexels](https://www.pexels.com/photo/a-white-face-mask-on-a-white-surface-8264728/) | Pexels License |
| `swab-clean.jpg` | 클린면봉 (일반 면봉, 유사 예시) | [Daniel Dan / Pexels](https://www.pexels.com/photo/close-up-shot-of-cotton-buds-7612836/) | Pexels License |
| `glove-cotton.jpg` | 목장갑 (코팅 장갑 사진, 유사 예시) | [gadaji66 / Pixabay](https://pixabay.com/photos/work-gloves-gloves-red-gloves-865500/) | Pixabay Content License |
| `glove-coated.jpg` | 반코팅 목장갑 | [gadaji66 / Pixabay](https://pixabay.com/photos/work-gloves-gloves-red-gloves-865500/) | Pixabay Content License |
| `glove-nitrile.jpg` | 니트릴 장갑 | [Callum Hilton / Pexels](https://www.pexels.com/photo/a-pair-of-blue-latex-gloves-7856715/) | Pexels License |

"유사 예시"는 실제 취급 제품과 색상·형태가 다른 이미지로, 화면에 "유사 예시 이미지"로 표시됩니다.
실제 제품 사진이 생기면 같은 파일명으로 교체하고 `src/lib/services.ts` 의 `approximate` 값을 제거하세요.

실제 작업 사진으로 교체할 때는 같은 비율(1600×700, 21:9)의 이미지를 `public/images/` 에 넣고
`src/lib/services.ts` 의 `images` 항목(경로, 대체 텍스트, 출처)을 수정하세요. 교체 후에는 "참고 이미지" 캡션을
`src/components/photo.tsx` 에서 제거해도 됩니다.

## 색인 정책

`VERCEL_ENV` 가 `production` 이 아닌 환경(Vercel 프리뷰 배포)에서는 `robots.txt` 와 `<meta name="robots">` 가
자동으로 크롤링을 차단합니다. 프로덕션 배포에서만 검색 노출됩니다.
