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
    label: "반도체 장비 후처리",
    description: "반도체 장비 제품의 가공 이후 마감과 후처리 작업",
  },
  fabrication: {
    label: "금속 제작·가공",
    description: "알루미늄·SUS403 제품 주문제작과 용접, 샌딩 작업",
  },
  cleanroom: {
    label: "크린룸 제품",
    description: "헤어캡, 마스크, 면봉, 장갑 등 크린룸 소모품",
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
  supplies: stockPhoto(
    "cleanroom-supplies",
    "마스크와 장갑 등 크린룸 소모품",
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
  haircap: productPhoto(
    "haircap",
    "헤어캡",
    "kaboompics.com (Pexels)",
    "https://www.pexels.com/photo/person-holding-a-bouffant-cap-8538701/",
    "Pexels License",
    true,
  ),
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
  gloveCotton: productPhoto(
    "glove-cotton",
    "목장갑",
    "gadaji66 (Pixabay)",
    "https://pixabay.com/photos/work-gloves-gloves-red-gloves-865500/",
    "Pixabay Content License",
    true,
  ),
  gloveCoated: productPhoto(
    "glove-coated",
    "반코팅 목장갑",
    "gadaji66 (Pixabay)",
    "https://pixabay.com/photos/work-gloves-gloves-red-gloves-865500/",
    "Pixabay Content License",
  ),
  gloveNitrile: productPhoto(
    "glove-nitrile",
    "니트릴 장갑",
    "Callum Hilton (Pexels)",
    "https://www.pexels.com/photo/a-pair-of-blue-latex-gloves-7856715/",
    "Pexels License",
  ),
} as const;

export const services: Service[] = [
  {
    slug: "semiconductor-equipment-post-processing",
    category: "semiconductor",
    image: images.cleanroomFab,
    name: "반도체 장비 후처리",
    subtitle: "반도체 장비 제품의 가공 이후 마감과 표면 정리",
    summary:
      "반도체 장비에 사용되는 제품의 가공·용접 이후 마감과 표면 정리 등 후처리 작업을 요구 사양에 맞춰 진행합니다.",
    intro: [
      "반도체 장비에 들어가는 제품은 가공과 용접을 마친 뒤에도 표면 상태와 마감 상태를 정리하는 후속 작업이 필요한 경우가 많습니다. 조은상사는 반도체 장비 후처리 작업을 요구 사양에 맞춰 진행합니다.",
      "크린룸 환경에서 사용되는 제품일수록 작업 이후의 마감 상태가 중요합니다. 제품의 소재와 형상, 사용 환경을 확인한 뒤 필요한 후처리 범위를 상담해 드립니다.",
    ],
    sections: [
      {
        heading: "이런 경우 문의해 주세요",
        items: [
          "가공·용접을 마친 반도체 장비 제품의 후속 마감 작업이 필요한 경우",
          "알루미늄·SUS 소재 제품의 표면 정리가 필요한 경우",
          "제작부터 용접, 샌딩, 후처리까지 한 곳에서 상담받고 싶은 경우",
        ],
      },
    ],
    related: ["custom-metal-fabrication", "welding", "sanding"],
    seo: {
      title: "반도체 장비 후처리",
      description:
        "조은상사의 반도체 장비 후처리 안내. 반도체 장비 제품의 가공·용접 이후 마감과 표면 정리 등 후처리 작업을 요구 사양에 맞춰 상담해 드립니다.",
      keywords: [
        "반도체 장비 후처리",
        "반도체 후처리",
        "반도체 장비",
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
      "조은상사는 알루미늄과 SUS403 소재를 사용해 고객의 도면과 사양에 맞는 제품을 주문제작합니다. 용도와 수량에 맞춰 제작 방식을 상담해 드리며, 용접과 샌딩, 후처리까지 이어서 문의하실 수 있습니다.",
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
    related: ["welding", "sanding", "semiconductor-equipment-post-processing"],
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
    related: ["sanding", "custom-metal-fabrication", "semiconductor-equipment-post-processing"],
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
    related: ["welding", "custom-metal-fabrication", "semiconductor-equipment-post-processing"],
    seo: {
      title: "샌딩 작업",
      description:
        "용접과 가공 이후의 표면을 고르게 정리하는 샌딩 작업을 진행합니다. 제품의 소재와 용도에 맞춰 조은상사에 상담하세요.",
      keywords: ["샌딩", "샌딩 작업", "금속 샌딩", "표면 마감", "용접 후 샌딩"],
    },
  },
  {
    slug: "cleanroom-products",
    category: "cleanroom",
    image: images.supplies,
    name: "크린룸 제품",
    subtitle: "헤어캡·마스크·면봉·장갑 등 크린룸 소모품",
    summary:
      "크린룸 작업 환경에서 사용하는 헤어캡, 마스크, 면봉, 장갑 등 크린룸 소모품을 취급합니다.",
    intro: [
      "크린룸에서는 작업자와 소모품에서 발생하는 먼지와 이물이 제품 품질에 영향을 줄 수 있습니다. 조은상사는 반도체를 비롯한 청정 환경 현장에서 사용하는 헤어캡, 마스크, 면봉, 장갑 등 크린룸(클린룸) 제품을 취급합니다.",
    ],
    products: [
      {
        name: "헤어캡",
        description:
          "작업자의 머리카락과 비듬 등이 작업 환경으로 떨어지는 것을 줄이기 위해 착용하는 용품입니다.",
        image: productImages.haircap,
      },
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
        name: "목장갑",
        description:
          "면사로 짜서 만든 작업용 장갑으로, 일반 작업 시 손을 보호하는 데 사용합니다.",
        image: productImages.gloveCotton,
      },
      {
        name: "반코팅 목장갑",
        description:
          "목장갑의 손바닥 쪽에 코팅을 입혀 미끄럼을 줄이고 내구성을 높인 작업용 장갑입니다.",
        image: productImages.gloveCoated,
      },
      {
        name: "니트릴 장갑",
        description:
          "니트릴 소재의 일회용 장갑으로, 손에서 발생하는 오염과 이물을 줄이기 위해 착용합니다.",
        image: productImages.gloveNitrile,
      },
    ],
    sections: [
      {
        heading: "그 밖의 품목",
        body: "위 품목 외에도 크린룸에서 사용하는 소모품을 취급합니다. 필요한 품목과 규격, 수량을 문의해 주세요.",
      },
    ],
    related: ["semiconductor-equipment-post-processing"],
    seo: {
      title: "크린룸 제품 - 헤어캡·마스크·클린면봉·장갑",
      description:
        "크린룸(클린룸)에서 사용하는 헤어캡, 마스크, 클린면봉, 목장갑, 반코팅 목장갑, 니트릴 장갑 등 크린룸 소모품을 취급합니다. 필요한 품목과 규격을 조은상사에 문의하세요.",
      keywords: [
        "크린룸 제품",
        "클린룸 제품",
        "크린룸 소모품",
        "크린룸 헤어캡",
        "크린룸 마스크",
        "크린룸 면봉",
        "클린면봉",
        "크린룸 장갑",
        "목장갑",
        "반코팅 목장갑",
        "니트릴 장갑",
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
    values: ["주문제작", "용접", "샌딩", "장비 후처리"],
  },
  {
    label: "Supplies",
    title: "크린룸 물품",
    values: ["헤어캡", "마스크", "클린면봉", "목장갑·니트릴 장갑 등"],
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
