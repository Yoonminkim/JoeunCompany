/**
 * 제품·서비스 콘텐츠 (데이터 기반 페이지).
 *
 * - 이 배열에 항목을 추가/수정하면 `/services` 목록, `/services/[slug]` 상세 페이지,
 *   sitemap.xml, JSON-LD 구조화 데이터가 자동으로 함께 반영됩니다.
 * - 항목마다 `seo` 로 검색 노출용 title / description / keywords / 공유 이미지를 따로 지정할 수 있습니다.
 *   (생략하면 `name` 과 `summary` 가 기본값으로 쓰입니다.)
 *
 * TODO: 아래 문구는 초안입니다. 실제 작업 범위, 규격, 가능 소재 등에 맞게 수정해 주세요.
 */

export type ServiceCategoryId = "semiconductor" | "fabrication" | "cleanroom";

export const serviceCategories: Record<
  ServiceCategoryId,
  { label: string; description: string }
> = {
  semiconductor: {
    label: "쉴드 세정·정밀세척",
    description: "반도체 장비 부품의 쉴드 세정과 정밀세척",
  },
  fabrication: {
    label: "금속 제작·가공",
    description: "알루미늄·SUS403 제품 주문제작과 용접, 샌딩, 용사코팅 작업",
  },
  cleanroom: {
    label: "크린룸 관련 제품",
    description: "크린룸 소모품, 테프론·세라믹 제작, 특수 테이프, 각종 약품",
  },
};

export type ServiceSection = {
  heading: string;
  body?: string;
  items?: string[];
};

export type ServiceImage = {
  /** public 기준 경로 */
  src: string;
  /** 대체 텍스트 (이미지 내용을 설명) */
  alt: string;
  width: number;
  height: number;
  /** 출처 기록 (아래 라이선스상 표기 의무는 없지만 추적을 위해 남깁니다) */
  credit: string;
  source: string;
  license: string;
  /** 실제 취급 제품과 형태/색상이 다른 스톡 이미지이면 true. 화면에는 표시하지 않으며, 실제 사진으로 교체할 대상을 추적하는 용도입니다. */
  approximate?: boolean;
};

export type Service = {
  /** URL 경로. /services/{slug} (영문 소문자와 하이픈 권장, 공개 후에는 변경하지 않는 것이 좋습니다) */
  slug: string;
  category: ServiceCategoryId;
  /** 페이지 제목(h1)과 카드 제목 */
  name: string;
  /** 부제목. 페이지 상단과 카드에 표시됩니다. */
  subtitle: string;
  /** 목록 카드용 한두 문장 요약. seo.description 의 기본값으로도 쓰입니다. */
  summary: string;
  /** 대표 이미지 (1600×700, 21:9). 회사의 실제 사진이 생기면 교체하세요. */
  image: ServiceImage;
  /** 본문 소개 단락 */
  intro: string[];
  sections: ServiceSection[];
  /** 취급 품목 (물품형 항목용). image 는 800×600(4:3) 이미지 */
  products?: { name: string; description: string; image?: ServiceImage }[];
  /** 함께 보면 좋은 항목의 slug */
  related: string[];
  /** 검색엔진/공유용 SEO 설정. 생략한 값은 name / summary 로 대체됩니다. */
  seo: {
    /** 검색결과 제목. 뒤에 " | 조은상사" 가 자동으로 붙습니다. */
    title?: string;
    description?: string;
    keywords?: string[];
    /** 공유 이미지(public 기준 경로, 1200×630 권장). 생략하면 사이트 기본 이미지 */
    image?: string;
  };
};

/** 작업형 서비스 상세 페이지 하단의 진행 안내 (물품형 항목에는 표시하지 않음) */
export const processSteps = [
  {
    title: "문의 및 사양 확인",
    description: "도면, 소재, 수량, 요구 사항을 확인합니다.",
  },
  {
    title: "견적 및 일정 안내",
    description: "확인한 내용을 바탕으로 견적과 작업 일정을 안내합니다.",
  },
  {
    title: "작업 진행",
    description: "합의한 사양에 맞춰 작업을 진행합니다.",
  },
  {
    title: "검수 및 납품",
    description: "작업 결과를 확인한 뒤 납품합니다.",
  },
] as const;

const stockPhoto = (
  file: string,
  alt: string,
  credit: string,
  source: string,
  license: string,
  size: { width: number; height: number } = { width: 1600, height: 700 },
): ServiceImage => ({
  src: `/images/${file}.jpg`,
  alt,
  width: size.width,
  height: size.height,
  credit,
  source,
  license,
});

/**
 * 참고용 스톡 이미지 (모두 상업적 이용 가능, 출처 표기 의무 없음).
 * 회사의 실제 작업 사진이 아니므로, 실제 사진이 생기면 교체하세요.
 */
export const images = {
  cleanroomFab: stockPhoto(
    "cleanroom-fab",
    "반도체 크린룸에서 장비를 다루는 작업자",
    "NASA Glenn Research Center (via Wikimedia Commons)",
    "https://commons.wikimedia.org/wiki/File:Clean_room.jpg",
    "Public domain (NASA)",
  ),
  /** 홈 메인 배너 (2400×1050, 21:9) */
  homeBanner: stockPhoto(
    "home-banner",
    "크린룸에서 작업 중인 작업자",
    "Mufid Majnun (Pexels)",
    "https://www.pexels.com/photo/man-wearing-uniform-in-a-lab-9485592/",
    "Pexels License",
    { width: 2400, height: 1050 },
  ),
  fabrication: stockPhoto(
    "fabrication-cutting",
    "금속 판재를 절단하는 장면",
    "Ana Victoria Valverde (Pexels)",
    "https://www.pexels.com/photo/plasma-cutting-in-factory-17180807/",
    "Pexels License",
  ),
  welding: stockPhoto(
    "welding",
    "금속을 용접하는 장면",
    "Valentin Saumon (Pexels)",
    "https://www.pexels.com/photo/a-person-wearing-a-protective-head-shield-welding-metals-9130186/",
    "Pexels License",
  ),
  sanding: stockPhoto(
    "sanding-grinder",
    "그라인더로 금속 표면을 연마하는 장면",
    "Guduru Ajay bhargav (Pexels)",
    "https://www.pexels.com/photo/person-using-green-and-grey-angle-grinder-on-sheet-of-metal-977526/",
    "Pexels License",
  ),
  /** 용사코팅 (NASA 플라즈마 용사 공정 사진, 2400×1050) */
  thermalSpray: stockPhoto(
    "thermal-spray",
    "플라즈마 용사 코팅 공정",
    "NASA/Marvin G. Smith (via Wikimedia Commons)",
    "https://commons.wikimedia.org/wiki/File:Plasma_Spray-Physical_Vapor_Deposition.jpg",
    "Public domain (NASA)",
    { width: 2400, height: 1050 },
  ),
  supplies: stockPhoto(
    "cleanroom-supplies",
    "마스크 등 크린룸 소모품",
    "Polina Tankilevitch (Pexels)",
    "https://www.pexels.com/photo/pastel-colored-face-masks-on-white-background-7337879/",
    "Pexels License",
  ),
} as const;

const productPhoto = (
  file: string,
  alt: string,
  credit: string,
  source: string,
  license: string,
  approximate = false,
): ServiceImage => ({
  src: `/images/products/${file}.jpg`,
  alt,
  width: 800,
  height: 600,
  credit,
  source,
  license,
  ...(approximate ? { approximate } : {}),
});

/** 취급 품목별 이미지 (스톡 사진). 실제 제품 사진이 생기면 같은 이름으로 교체하세요. */
const productImages = {
  mask: productPhoto(
    "mask-white",
    "흰색 일회용 마스크",
    "Media Studio Hong Kong (Pexels)",
    "https://www.pexels.com/photo/a-white-face-mask-on-a-white-surface-8264728/",
    "Pexels License",
  ),
  swab: productPhoto(
    "swab-clean",
    "클린면봉",
    "Daniel Dan (Pexels)",
    "https://www.pexels.com/photo/close-up-shot-of-cotton-buds-7612836/",
    "Pexels License",
    true,
  ),
  teflon: productPhoto(
    "teflon",
    "테프론(PTFE) 제작품",
    "bing-lab (Pixabay)",
    "https://pixabay.com/photos/laboratory-chemistry-teflon-7978199/",
    "Pixabay Content License",
    true,
  ),
  ceramic: productPhoto(
    "ceramic",
    "세라믹 부품",
    "Retired electrician (Wikimedia Commons)",
    "https://commons.wikimedia.org/wiki/File:Locktal_ceramic_tube_socket_01.jpg",
    "CC0 (Public domain)",
  ),
  tape: productPhoto(
    "tape-special",
    "특수 테이프",
    "Ksenia Chernaya (Pexels)",
    "https://www.pexels.com/photo/masking-tapes-on-table-against-white-wall-5691615/",
    "Pexels License",
    true,
  ),
  chemicals: productPhoto(
    "chemicals",
    "각종 약품",
    "Ivan S (Pexels)",
    "https://www.pexels.com/photo/brown-bottles-on-white-wooden-shelf-9628834/",
    "Pexels License",
  ),
} as const;

export const services: Service[] = [
  {
    slug: "shield-precision-cleaning",
    category: "semiconductor",
    image: images.cleanroomFab,
    name: "쉴드 세정·정밀세척",
    subtitle: "반도체 장비 부품의 쉴드 세정과 정밀세척",
    summary:
      "반도체 장비에 사용되는 쉴드(Shield) 등의 부품에 쌓인 증착물과 오염물을 제거하는 쉴드 세정과, 크린룸 환경에 맞춘 정밀세척을 진행합니다.",
    intro: [
      "반도체 장비의 챔버 안에서 사용되는 쉴드(Shield) 같은 부품에는 공정을 거치며 증착물과 오염물이 쌓입니다. 이를 제거해 부품을 다시 사용할 수 있는 상태로 만드는 작업이 쉴드 세정입니다.",
      "조은상사는 반도체 장비 부품의 쉴드 세정과 정밀세척을 진행합니다. 미세한 오염과 입자가 문제가 되는 크린룸 환경에 맞춰, 부품의 소재와 형상, 오염 상태를 확인한 뒤 적합한 세정 방식을 상담해 드립니다.",
    ],
    sections: [
      {
        heading: "이런 경우 문의해 주세요",
        items: [
          "사용한 쉴드 등 장비 부품의 증착물·오염물 제거가 필요한 경우",
          "크린룸 환경에 맞춰 미세 오염과 입자를 정밀하게 세척해야 하는 경우",
          "세정 이후 필요한 표면 작업(샌딩, 용사코팅 등)까지 함께 상담받고 싶은 경우",
        ],
      },
      {
        heading: "상담 시 알려 주세요",
        items: [
          "세정 대상 부품의 종류와 소재, 크기 (사진 또는 도면)",
          "오염 상태 (증착물의 종류, 사용 이력 등)",
          "요구하는 청정도 기준과 포장·납품 조건",
          "수량과 희망 납기",
        ],
      },
    ],
    related: [
      "custom-metal-fabrication",
      "welding",
      "sanding",
      "thermal-spray-coating",
    ],
    seo: {
      title: "쉴드 세정·정밀세척",
      description:
        "반도체 장비 부품의 쉴드 세정과 정밀세척을 크린룸 환경에 맞춰 상담해 드립니다. 증착물과 오염물 제거가 필요하다면 조은상사에 문의하세요.",
      keywords: [
        "쉴드 세정",
        "쉴드세정",
        "정밀세척",
        "정밀 세정",
        "반도체 장비 세정",
        "반도체 부품 세정",
        "반도체",
        "조은상사",
      ],
    },
  },
  {
    slug: "custom-metal-fabrication",
    category: "fabrication",
    image: images.fabrication,
    name: "알루미늄·SUS403 제품 주문제작",
    subtitle: "도면과 사양에 맞춘 금속 제품 주문제작",
    summary:
      "알루미늄과 SUS403 소재로 고객이 요구하는 도면과 사양에 맞춰 제품을 주문제작합니다.",
    intro: [
      "조은상사는 알루미늄과 SUS403 소재를 사용해 고객의 도면과 사양에 맞는 제품을 주문제작합니다. 용도와 수량에 맞춰 제작 방식을 상담해 드리며, 용접과 샌딩, 용사코팅, 세정까지 이어서 문의하실 수 있습니다.",
      "알루미늄은 가볍고 가공이 쉬운 소재이고, 스테인리스강(SUS)은 강도와 내식성이 요구되는 제품에 사용됩니다. 제품의 사용 환경에 맞는 소재를 선택할 수 있도록 상담해 드립니다.",
    ],
    sections: [
      {
        heading: "취급 소재",
        items: ["알루미늄", "SUS403 (스테인리스강)"],
      },
      {
        heading: "제작 상담 시 알려 주세요",
        items: [
          "도면 또는 스케치, 사진 등 제작 참고 자료",
          "원하시는 소재와 수량",
          "제품의 사용 환경 (크린룸 사용 여부 등)",
          "희망 납기",
        ],
      },
    ],
    related: [
      "welding",
      "sanding",
      "thermal-spray-coating",
      "shield-precision-cleaning",
    ],
    seo: {
      title: "알루미늄·SUS403 제품 주문제작",
      description:
        "알루미늄과 SUS403 소재 제품을 도면과 사양에 맞춰 주문제작합니다. 용접·샌딩까지 조은상사에 문의하세요.",
      keywords: [
        "알루미늄 주문제작",
        "알루미늄 제품 제작",
        "SUS403",
        "SUS403 주문제작",
        "스테인리스 주문제작",
        "금속 주문제작",
      ],
    },
  },
  {
    slug: "welding",
    category: "fabrication",
    image: images.welding,
    name: "용접",
    subtitle: "소재와 형상에 맞춘 금속 용접",
    summary:
      "금속 제품의 용접 작업을 소재와 형상, 사용 목적에 맞춰 진행합니다.",
    intro: [
      "용접은 제품의 강도와 외관, 사용 환경에 직접 영향을 주는 작업입니다. 조은상사는 제품의 소재와 형상, 사용 목적을 확인한 뒤 용접 작업을 진행합니다.",
      "주문제작 제품의 용접부터 용접 이후의 샌딩과 마감까지 이어서 상담하실 수 있습니다.",
    ],
    sections: [
      {
        heading: "이런 경우 문의해 주세요",
        items: [
          "도면에 맞춘 금속 제품의 용접이 필요한 경우",
          "제작과 용접, 마감까지 이어서 맡기고 싶은 경우",
          "소재와 형상에 맞는 용접 방식을 상담받고 싶은 경우",
        ],
      },
    ],
    related: [
      "sanding",
      "thermal-spray-coating",
      "custom-metal-fabrication",
      "shield-precision-cleaning",
    ],
    seo: {
      title: "금속 용접",
      description:
        "소재와 형상, 사용 목적에 맞춰 금속 제품의 용접 작업을 진행합니다. 주문제작·샌딩과 함께 조은상사에 상담하세요.",
      keywords: ["용접", "금속 용접", "알루미늄 용접", "SUS 용접", "용접 작업"],
    },
  },
  {
    slug: "sanding",
    category: "fabrication",
    image: images.sanding,
    name: "샌딩",
    subtitle: "표면 상태를 고르게 정리하는 샌딩 작업",
    summary:
      "용접과 가공 이후의 표면을 고르게 정리하는 샌딩 작업을 진행합니다.",
    intro: [
      "샌딩은 가공과 용접 이후 남은 표면의 거칠기와 흔적을 정리해 제품의 마감 상태를 고르게 만드는 작업입니다. 제품의 소재와 용도에 맞춰 마감 정도를 상담해 드립니다.",
    ],
    sections: [
      {
        heading: "이런 경우 문의해 주세요",
        items: [
          "용접 이후 용접부와 표면 마감이 필요한 경우",
          "제품의 외관과 표면 상태를 균일하게 정리하고 싶은 경우",
          "주문제작 제품의 최종 마감까지 함께 맡기고 싶은 경우",
        ],
      },
    ],
    related: [
      "welding",
      "thermal-spray-coating",
      "custom-metal-fabrication",
      "shield-precision-cleaning",
    ],
    seo: {
      title: "샌딩 작업",
      description:
        "용접과 가공 이후의 표면을 고르게 정리하는 샌딩 작업을 진행합니다. 제품의 소재와 용도에 맞춰 조은상사에 상담하세요.",
      keywords: ["샌딩", "샌딩 작업", "금속 샌딩", "표면 마감", "용접 후 샌딩"],
    },
  },
  {
    slug: "thermal-spray-coating",
    category: "fabrication",
    image: images.thermalSpray,
    name: "용사코팅",
    subtitle: "표면에 기능성 코팅층을 입히는 용사코팅",
    summary:
      "제품 표면에 재료를 분사해 내마모·내식·내열 등의 기능을 더하는 용사코팅을 소재와 사용 목적에 맞춰 상담해 드립니다.",
    intro: [
      "용사코팅은 금속이나 세라믹 등의 재료를 녹이거나 가열해 제품 표면에 분사하고, 그 입자가 쌓여 코팅층을 이루게 하는 표면 처리 방식입니다. 제품 표면에 내마모성, 내식성, 내열성, 절연성 같은 기능을 더하거나 마모된 부분을 복원하는 데 사용됩니다.",
      "조은상사는 제작과 용접, 샌딩 이후의 표면 요구 사항에 맞춰 용사코팅을 상담해 드립니다. 제품의 소재와 형상, 사용 환경을 알려 주시면 적합한 방식을 안내합니다.",
    ],
    sections: [
      {
        heading: "이런 경우 문의해 주세요",
        items: [
          "내마모성, 내식성, 내열성 등 표면 기능을 더하고 싶은 경우",
          "마모되거나 손상된 부품의 표면을 복원하고 싶은 경우",
          "제작과 용접, 샌딩, 코팅까지 한 곳에서 상담받고 싶은 경우",
        ],
      },
      {
        heading: "상담 시 알려 주세요",
        items: [
          "제품의 소재와 크기, 형상 (도면 또는 사진)",
          "코팅 목적과 사용 환경 (온도, 마찰, 부식 환경 등)",
          "수량과 희망 납기",
        ],
      },
    ],
    related: [
      "custom-metal-fabrication",
      "welding",
      "sanding",
      "shield-precision-cleaning",
    ],
    seo: {
      title: "용사코팅",
      description:
        "금속 제품 표면에 내마모·내식·내열 기능을 더하는 용사코팅을 소재와 사용 목적에 맞춰 상담해 드립니다. 주문제작·용접·샌딩과 함께 조은상사에 문의하세요.",
      keywords: [
        "용사코팅",
        "용사 코팅",
        "금속 표면 코팅",
        "내마모 코팅",
        "내열 코팅",
        "조은상사",
      ],
    },
  },
  {
    slug: "cleanroom-products",
    category: "cleanroom",
    image: images.supplies,
    name: "크린룸 관련 제품",
    subtitle: "마스크·면봉부터 테프론·세라믹 제작, 특수 테이프, 각종 약품까지",
    summary:
      "크린룸과 반도체 현장에서 필요한 마스크, 면봉, 테프론(PTFE)·세라믹 제작품, 특수 테이프, 각종 약품을 취급합니다.",
    intro: [
      "크린룸(클린룸)과 반도체 현장에서는 소모품부터 소재 가공품, 부자재, 약품까지 다양한 품목이 필요합니다. 조은상사는 마스크와 면봉 같은 크린룸 소모품, 테프론(PTFE)과 세라믹 제작, 특수 테이프, 각종 약품을 취급합니다.",
      "필요한 품목과 사양을 알려 주시면 용도와 사용 환경에 맞춰 상담해 드립니다.",
    ],
    products: [
      {
        name: "마스크",
        description:
          "작업자의 호흡과 비말 등이 작업 환경에 영향을 주는 것을 줄이기 위해 착용하는 용품입니다.",
        image: productImages.mask,
      },
      {
        name: "클린면봉",
        description:
          "좁은 부위의 닦기와 청소에 사용하는 크린룸용 면봉입니다.",
        image: productImages.swab,
      },
      {
        name: "테프론(PTFE) 제작",
        description:
          "PTFE(테프론) 소재를 도면과 사양에 맞춰 제작합니다. 내화학성과 내열성이 필요하고 마찰이 적어야 하는 부품과 제품에 사용됩니다.",
        image: productImages.teflon,
      },
      {
        name: "세라믹 제작",
        description:
          "세라믹 소재 제품을 도면과 사양에 맞춰 제작합니다. 내열성, 내마모성, 절연성이 요구되는 부품에 사용됩니다.",
        image: productImages.ceramic,
      },
      {
        name: "특수 테이프",
        description:
          "사용 환경과 용도에 맞는 특수 테이프를 공급합니다. 소재와 접착 방식, 사용 온도 등 필요한 사양을 알려 주시면 상담해 드립니다.",
        image: productImages.tape,
      },
      {
        name: "각종 약품",
        description:
          "현장에서 사용하는 각종 약품을 취급합니다. 품목과 용도, 수량에 맞춰 상담해 드립니다.",
        image: productImages.chemicals,
      },
    ],
    sections: [
      {
        heading: "제작 품목 상담 시 알려 주세요",
        items: [
          "도면 또는 샘플, 사진 등 제작 참고 자료",
          "소재와 요구 사양 (치수, 사용 환경 등)",
          "수량과 희망 납기",
        ],
      },
      {
        heading: "그 밖의 품목",
        body: "위 품목 외에도 크린룸과 반도체 현장에서 필요한 제품을 상담해 드립니다. 필요한 품목과 규격, 수량을 문의해 주세요.",
      },
    ],
    related: ["shield-precision-cleaning"],
    seo: {
      title: "크린룸 관련 제품 - 테프론·세라믹 제작, 특수 테이프, 약품",
      description:
        "마스크, 클린면봉 등 크린룸 소모품과 테프론(PTFE)·세라믹 제작, 특수 테이프, 각종 약품을 취급합니다. 필요한 품목과 사양을 조은상사에 문의하세요.",
      keywords: [
        "크린룸 관련 제품",
        "크린룸 제품",
        "클린룸 제품",
        "크린룸 소모품",
        "크린룸 마스크",
        "클린면봉",
        "크린룸 면봉",
        "테프론 제작",
        "PTFE 제작",
        "세라믹 제작",
        "특수 테이프",
        "크린룸 약품",
      ],
    },
  },
];

/** 홈 등에서 한눈에 보여 주는 취급 범위 요약 */
export const capabilities = [
  { label: "Material", title: "소재", values: ["알루미늄", "SUS403"] },
  {
    label: "Process",
    title: "공정",
    values: ["쉴드 세정", "정밀세척", "주문제작", "용접", "샌딩", "용사코팅"],
  },
  {
    label: "Supplies",
    title: "크린룸 관련 제품",
    values: ["마스크", "면봉", "테프론(PTFE)·세라믹 제작", "특수 테이프", "각종 약품"],
  },
] as const;

export const servicePath = (slug: string) => `/services/${slug}`;

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug);

export const getRelatedServices = (service: Service) =>
  service.related
    .map((slug) => getService(slug))
    .filter((related): related is Service => related !== undefined);

/** 카테고리 순서대로 묶은 목록 (빈 카테고리는 제외) */
export function getServicesByCategory() {
  return (Object.keys(serviceCategories) as ServiceCategoryId[])
    .map((id) => ({
      id,
      ...serviceCategories[id],
      services: services.filter((service) => service.category === id),
    }))
    .filter((group) => group.services.length > 0);
}
