import Image from "next/image";
import type { ServiceImage } from "@/lib/services";

/** 대표 이미지 표시 (홈 배너, 제품·서비스 상세 상단) */
export function Photo({
  image,
  priority = false,
  sizes = "(min-width: 1264px) 1136px, 100vw",
}: {
  image: ServiceImage;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="overflow-hidden bg-paper-deep">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  );
}
