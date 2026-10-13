import type { ReactNode } from "react";

/**
 * 섹션 제목: 굵은 상단 룰 + 영문 라벨 + 제목.
 * 사이트 전체의 섹션 구분을 이 한 가지 형태로 통일합니다.
 * (상단 룰은 스크롤 시 그려지듯 나타나고, 제목은 떠오르듯 나타납니다.)
 */
export function SectionHeading({
  eyebrow,
  title,
  id,
  children,
}: {
  /** 영문/숫자 라벨 (예: "SERVICES", "01 / OVERVIEW") */
  eyebrow: string;
  title: string;
  id?: string;
  /** 제목 오른쪽에 둘 요소 (링크 등) */
  children?: ReactNode;
}) {
  return (
    <div className="section-rule flex flex-wrap items-end justify-between gap-4 pt-5">
      <div className="reveal">
        <p className="label">{eyebrow}</p>
        <h2
          id={id}
          className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
