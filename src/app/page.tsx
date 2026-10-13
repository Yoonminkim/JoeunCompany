import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { Photo } from "@/components/photo";
import { SectionHeading } from "@/components/section-heading";
import { ServiceRow } from "@/components/service-row";
import { createMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { capabilities, images, services } from "@/lib/services";
import { heroDelay } from "@/lib/motion";
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

      <section className="border-b border-line">
        <Container className="grid gap-14 pb-16 pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-7">
            <p className="label hero-in" style={heroDelay(0)}>
              Joeun Company · JJ
            </p>
            <h1
              className="hero-in mt-6 text-[2.5rem] font-bold leading-[1.15] tracking-tight sm:text-6xl"
              style={heroDelay(1)}
            >
              <span className="mb-4 block text-xl font-semibold tracking-normal text-accent sm:text-2xl">
                {siteConfig.name}
              </span>
              반도체 장비 후처리,
              <br />
              금속 주문제작,
              <br />
              크린룸 제품.
            </h1>
            <p
              className="hero-in mt-8 max-w-xl text-lg leading-8 text-ink-soft"
              style={heroDelay(2)}
            >
              알루미늄·SUS403 제품 주문제작과 용접·샌딩, 반도체 장비 후처리,
              그리고 헤어캡·마스크·면봉·장갑 등 크린룸 제품을 취급합니다.
            </p>
            <div
              className="hero-in mt-10 flex flex-wrap gap-3"
              style={heroDelay(3)}
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-3 bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                제품·서비스 보기
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center border border-ink px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
              >
                문의하기
              </Link>
            </div>
          </div>

          <aside
            aria-label="취급 범위 요약"
            className="hero-in self-end lg:col-span-5"
            style={heroDelay(2)}
          >
            <p className="label mb-3">Spec sheet · 취급 범위</p>
            <dl className="border-t-2 border-ink">
              {capabilities.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-5"
                >
                  <dt>
                    <span className="label block">{item.label}</span>
                    <span className="mt-1 block text-sm font-semibold">
                      {item.title}
                    </span>
                  </dt>
                  <dd className="text-lg font-medium leading-7">
                    {item.values.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
        <div className="ruler" aria-hidden="true" />
      </section>

      <section className="pt-16">
        <Container>
          <Photo image={images.homeBanner} priority />
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Services" title="제품·서비스">
            <Link
              href="/services"
              className="text-sm font-semibold text-accent hover:underline"
            >
              전체 보기 →
            </Link>
          </SectionHeading>
          <ul className="mt-8 border-t border-line">
            {services.map((service) => (
              <li key={service.slug} className="reveal">
                <ServiceRow service={service} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
