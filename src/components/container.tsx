import type { ReactNode } from "react";

/** 사이트 공통 폭/좌우 여백 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
