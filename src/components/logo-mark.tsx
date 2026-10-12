/** 임시 로고 마크 ("JJ"). 실제 로고가 나오면 교체하세요. */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="조은상사 로고"
    >
      <rect width="64" height="64" rx="14" fill="#0b2545" />
      <g
        fill="none"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M27 14V38Q27 48 18 48" />
        <path d="M47 14V38Q47 48 38 48" />
      </g>
    </svg>
  );
}
