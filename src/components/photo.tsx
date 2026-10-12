import Image from "next/image";
import type { ServiceImage } from "@/lib/services";

/**
 * 참고 이미지 표시. 회사의 실제 사진이 아닌 스톡 이미지이므로
 * 캡션에 "참고 이미지"임을 밝혀 오해를 막습니다.
 */
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
    <figure>
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
      <figcaption className="label mt-3 flex items-center justify-between gap-4">
        <span>Reference image</span>
        <span>참고 이미지</span>
      </figcaption>
    </figure>
  );
}
