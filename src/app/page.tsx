import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { JsonLd } from "@/components/json-ld";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

const businessAreas = [
  {
    href: "/products",
    title: "크린룸 관련 제품",
    description:
      "반도체를 비롯해 청정 환경이 요구되는 현장에서 사용하는 크린룸 관련 제품을 공급합니다.",
  },
  {
    href: "/semiconductor",
    title: "반도체 후처리",
    description:
      "반도체 공정 이후 단계의 후처리 작업을 제공합니다. 공정과 요구 사양에 맞춰 상담해 드립니다.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="bg-linear-to-br from-brand-900 to-brand-700 text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <p className="text-sm font-semibold tracking-widest text-blue-200">
            {siteConfig.nameEn} · JJ
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            크린룸 관련 제품과
            <br />
            반도체 후처리, {siteConfig.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
            {siteConfig.name}은 반도체 산업 현장에 필요한 크린룸 제품과 반도체
            후처리 서비스를 제공합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-blue-50"
            >
              크린룸 제품 보기
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold text-slate-900">사업 분야</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {businessAreas.map((area) => (
            <li key={area.href}>
              <Link
                href={area.href}
                className="block h-full rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {area.description}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-brand-600">
                  자세히 보기 →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ContactCta />
    </>
  );
}
