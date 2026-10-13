import type { CSSProperties } from "react";

/**
 * `.hero-in` 효과의 등장 순서를 지정합니다. (0, 1, 2 ... 순서대로 90ms 간격)
 * 사용 예: <h1 className="hero-in" style={heroDelay(1)}>
 */
export const heroDelay = (order: number): CSSProperties =>
  ({ "--d": order }) as CSSProperties;
