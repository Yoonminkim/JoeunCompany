import { ContactCta } from "@/components/contact-cta";
import { PageHeader } from "@/components/page-header";
import { createMetadata } from "@/lib/seo";

const title = "반도체 후처리";
const description =
  "반도체 공정 이후 단계의 후처리 서비스를 제공합니다. 크린룸 환경에 맞춘 반도체 후처리를 상담해 보세요.";

export const metadata = createMetadata({
  title,
  description,
  path: "/semiconductor",
  keywords: ["반도체 후처리", "반도체 후처리 서비스", "반도체", "크린룸"],
});

const inquiryCases = [
  "반도체 후처리를 맡길 협력 업체를 찾고 계신 경우",
  "크린룸 환경에 맞는 제품과 후처리를 함께 상담받고 싶은 경우",
  "요구 사양과 물량에 맞는 진행 방식이 궁금하신 경우",
];

export default function SemiconductorPage() {
  return (
    <>
      <PageHeader title={title} description={description} path="/semiconductor" />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold text-slate-900">서비스 안내</h2>
        <p className="mt-4 max-w-3xl leading-8 text-slate-700">
          조은상사는 반도체 산업 현장의 요구 사양에 맞춰 후처리를 진행합니다.
          세부 공정과 가능 범위는 상담을 통해 확인 후 안내드립니다.
        </p>

        <h2 className="mt-14 text-2xl font-bold text-slate-900">
          이런 경우 문의해 주세요
        </h2>
        <ul className="mt-6 max-w-3xl list-disc space-y-3 pl-5 leading-7 text-slate-700">
          {inquiryCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <ContactCta />
    </>
  );
}
