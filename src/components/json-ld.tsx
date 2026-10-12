/**
 * JSON-LD 구조화 데이터 출력.
 * JSON.stringify 는 `<` 를 이스케이프하지 않으므로 XSS 방지를 위해 직접 치환합니다.
 * (구조화 데이터는 실행 코드가 아니므로 next/script 가 아닌 네이티브 script 태그를 사용)
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
