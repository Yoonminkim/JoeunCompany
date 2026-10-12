import { ContactCta } from "@/components/contact-cta";
import { PageHeader } from "@/components/page-header";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const title = "회사소개";
const description =
  "조은상사(JoeunCompany, JJ)는 크린룸 관련 제품과 반도체 후처리를 중심으로 반도체 산업 현장을 지원합니다.";

export const metadata = createMetadata({
  title,
  description,
  path: "/about",
});

const overview = [
  { label: "상호", value: siteConfig.name },
  { label: "영문명", value: siteConfig.nameEn },
  { label: "약칭", value: "JJ" },
  { label: "사업 분야", value: "크린룸 관련 제품, 반도체 후처리" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title={title} description={description} path="/about" />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold text-slate-900">
          {siteConfig.name}을 소개합니다
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-slate-700">
          {siteConfig.name}({siteConfig.nameEn})은 크린룸 관련 제품 공급과 반도체
          후처리를 주력으로 하는 기업입니다. 청정도가 중요한 반도체 산업
          현장에서 필요한 제품과 서비스를 제공하기 위해 노력합니다.
        </p>

        <h2 className="mt-14 text-2xl font-bold text-slate-900">회사 개요</h2>
        <dl className="mt-6 max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
          {overview.map((row) => (
            <div key={row.label} className="grid grid-cols-3 gap-4 py-4">
              <dt className="text-sm font-semibold text-slate-500">
                {row.label}
              </dt>
              <dd className="col-span-2 text-slate-900">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <ContactCta />
    </>
  );
}
