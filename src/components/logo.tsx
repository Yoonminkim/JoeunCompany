import Image from "next/image";

/**
 * 조은상사 공식 로고 (JJ 모노그램 + 상호).
 * 원본: public/brand/logo-original.png → 여백을 제거한 public/brand/logo.png 사용.
 * 로고 이미지 안에 이미 "조은상사" 글자가 포함되어 있으므로 별도 텍스트를 붙이지 않습니다.
 */
export function Logo({
  className = "h-8 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/logo.png"
      alt="조은상사 JJ"
      width={1157}
      height={208}
      priority={priority}
      className={className}
    />
  );
}
