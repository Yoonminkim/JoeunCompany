"use client";

import type { ReactNode } from "react";

/** 브라우저 인쇄 창을 엽니다. 인쇄 창의 대상을 "PDF로 저장"으로 고르면 PDF 파일이 만들어집니다. */
export function PrintButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      {children}
    </button>
  );
}
