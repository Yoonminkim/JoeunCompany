import type { ReactNode } from "react";

/**
 * 섹션 제목: 굵은 상단 룰 + 영문 라벨 + 제목.
 * 사이트 전체의 섹션 구분을 이 한 가지 형태로 통일합니다.
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
    <div className="flex flex-wrap items-end justify-between gap-4 border-t-2 border-ink pt-5">
      <div>
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
