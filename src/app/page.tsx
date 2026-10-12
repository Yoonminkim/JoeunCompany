import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { JsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/service-card";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

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
            반도체 장비 후처리부터
            <br />
            주문제작, 크린룸 제품까지
            <br />
            {siteConfig.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
            {siteConfig.name}은 반도체 장비 후처리, 알루미늄·SUS403 제품
            주문제작, 용접·샌딩, 그리고 헤어캡·마스크·면봉·장갑 등 크린룸
            제품을 취급합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-blue-50"
            >
              제품·서비스 보기
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
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900">제품·서비스</h2>
          <Link
            href="/services"
            className="text-sm font-semibold text-brand-600 hover:underline"
          >
            전체 보기 →
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </section>

      <ContactCta />
    </>
  );
}
